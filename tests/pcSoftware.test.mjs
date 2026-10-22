import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { applyCommand, cloneJson, freshSeed, normalizeData, toDatabase } from "../src/models/pcSoftware.js";
import { createPcSoftwareRepository } from "../src/services/pcSoftwareRepository.js";

// Realtime Database drops empty arrays/objects; exercise the actual serialized shape.
function firebaseValue(value) {
  if (value === null || typeof value !== "object") return value;
  const entries = Object.entries(value).map(([key, child]) => [key, firebaseValue(child)]).filter(([, child]) => child !== null);
  if (!entries.length) return null;
  return Array.isArray(value) ? entries.map(([, child]) => child) : Object.fromEntries(entries);
}
function fakeDatabase(initial) {
  let value = firebaseValue(initial);
  const listeners = new Map();
  const snapshot = (data) => ({ val: () => cloneJson(data), exists: () => data !== null });
  let writes = 0;
  let fail;
  let beforeCommit;
  const adapter = {
    dataRef: "data", connectionRef: "connection", createId: () => "new-id",
    onValue(path, callback, error) {
      listeners.set(path, { callback, error });
      callback(snapshot(path === "connection" ? true : value));
      return () => listeners.delete(path);
    },
    async runTransaction(path, update, options) {
      assert.equal(path, "data");
      assert.equal(options.applyLocally, false);
      if (fail) throw fail;
      let next = update(cloneJson(value));
      if (beforeCommit) {
        value = firebaseValue(beforeCommit(cloneJson(value)));
        beforeCommit = null;
        next = update(cloneJson(value));
      }
      if (next === undefined) return { committed: false, snapshot: snapshot(value) };
      value = firebaseValue(next);
      writes++;
      listeners.get("data")?.callback(snapshot(value));
      return { committed: true, snapshot: snapshot(value) };
    },
  };
  return {
    repository: createPcSoftwareRepository(adapter),
    get value() { return cloneJson(value); },
    get writes() { return writes; },
    setFailure: error => { fail = error; },
    retryWith: change => { beforeCommit = change; },
    emit: raw => { value = raw; listeners.get("data")?.callback(snapshot(raw)); },
    get listenerCount() { return listeners.size; },
  };
}

test("JSON contains all extracted data and seed IDs are stable across resets", () => {
  const defaults = JSON.parse(readFileSync(new URL("../src/data/pc-software.defaults.json", import.meta.url), "utf8"));
  for (const key of ["defaultPcs", "defaultRoles", "seedSoftware", "osOptions", "categoryChoices", "priorityOptions"]) assert.ok(Array.isArray(defaults[key]));
  const seed = freshSeed();
  assert.equal(seed.pcs.length, 4);
  assert.equal(seed.roles.length, 5);
  assert.equal(seed.software.length, 38);
  seed.software[0].name = "changed";
  assert.notEqual(freshSeed().software[0].name, "changed");
  assert.deepEqual(freshSeed(), freshSeed());
});

test("v1 imports preserve IDs, custom options and the old recommendation union", () => {
  const legacy = freshSeed();
  legacy.version = 1;
  delete legacy.options;
  legacy.pcs[0].os = "Custom OS";
  legacy.roles[0].softwareIds = [];
  legacy.software[0].id = "legacy-id-123";
  legacy.software[0].category = "自訂分類";
  legacy.installedByPc[legacy.pcs[0].id] = ["legacy-id-123"];
  const migrated = normalizeData(legacy);
  assert.ok(migrated.roles[0].softwareIds.includes("legacy-id-123"));
  assert.ok(migrated.options.osOptions.includes("Custom OS"));
  assert.ok(migrated.options.categoryChoices.includes("自訂分類"));
  assert.deepEqual(migrated.installedByPc[legacy.pcs[0].id], ["legacy-id-123"]);
});

test("Firebase serialization and export/import round-trip including empty nested lists", () => {
  const seed = freshSeed();
  seed.roles.push({ id: "empty-role", name: "空職位", description: "", softwareIds: [] });
  const restored = normalizeData(firebaseValue(toDatabase(seed)), { firebase: true });
  assert.deepEqual(restored, seed);
  assert.deepEqual(normalizeData(JSON.parse(JSON.stringify(restored))), seed);
  const empty = { version: 2, pcs: [], roles: [], software: [], installedByPc: {}, options: { osOptions: [], categoryChoices: [], priorityOptions: [] } };
  assert.deepEqual(normalizeData(firebaseValue(toDatabase(empty)), { firebase: true }), empty);
});

test("PC create/update/delete preserves independent installations and validates assets", () => {
  const seed = freshSeed();
  const row = { ...seed.pcs[0], id: "new-pc", name: "NEW PC", assetTag: "PC-NEW" };
  let data = applyCommand(seed, { type: "save", collection: "pcs", row, create: true });
  assert.equal(seed.pcs.length, 4);
  assert.equal(data.pcs.length, 5);
  data = applyCommand(data, { type: "save", collection: "pcs", row: { ...row, owner: "Owner" }, create: false });
  data = applyCommand(data, { type: "installed", pcId: row.id, softwareId: seed.software[0].id, installed: true });
  data = applyCommand(data, { type: "installed", pcId: seed.pcs[0].id, softwareId: seed.software[0].id, installed: true });
  assert.equal(data.pcs.find(pc => pc.id === row.id).owner, "Owner");
  assert.throws(() => applyCommand(data, { type: "save", collection: "pcs", row: { ...row, id: "duplicate", assetTag: " pc-new " }, create: true }), /不可重複/);
  data = applyCommand(data, { type: "delete", collection: "pcs", id: row.id });
  assert.equal(data.installedByPc[row.id], undefined);
  assert.deepEqual(data.installedByPc[seed.pcs[0].id], [seed.software[0].id]);
  assert.throws(() => applyCommand(data, { type: "save", collection: "pcs", row, create: false }), /已被刪除/);
});

test("editing either side of role/software relationship actually removes recommendations", () => {
  const seed = freshSeed();
  const role = { ...seed.roles[0], softwareIds: [] };
  let data = applyCommand(seed, { type: "save", collection: "roles", row: role, create: false });
  assert.ok(data.software.every(sw => !sw.roleIds.includes(role.id)));
  const sw = { ...data.software[0], roleIds: [role.id] };
  data = applyCommand(data, { type: "save", collection: "software", row: sw, create: false });
  assert.ok(data.roles[0].softwareIds.includes(sw.id));
  data = applyCommand(data, { type: "save", collection: "software", row: { ...sw, roleIds: [] }, create: false });
  assert.ok(!data.roles[0].softwareIds.includes(sw.id));
});

test("role CRUD prevents deleting assigned roles and cleans both relationship lists", () => {
  const seed = freshSeed();
  assert.throws(() => applyCommand(seed, { type: "delete", collection: "roles", id: seed.pcs[0].roleId }), /仍有 PC/);
  const row = { id: "new-role", name: "新職位", description: "", softwareIds: [seed.software[0].id] };
  let data = applyCommand(seed, { type: "save", collection: "roles", row, create: true });
  data = applyCommand(data, { type: "save", collection: "roles", row: { ...row, name: "已更新" }, create: false });
  assert.equal(data.roles.at(-1).name, "已更新");
  data = applyCommand(data, { type: "delete", collection: "roles", id: row.id });
  assert.ok(data.software.every(sw => !sw.roleIds.includes(row.id)));
});

test("software CRUD and deleting the final item clean roles and installation records", () => {
  const seed = freshSeed();
  const row = { ...seed.software[0], id: "new-sw", name: "New App", category: "New category" };
  let data = applyCommand(seed, { type: "save", collection: "software", row, create: true });
  assert.ok(data.options.categoryChoices.includes("New category"));
  data = applyCommand(data, { type: "installed", pcId: data.pcs[0].id, softwareId: row.id, installed: true });
  for (const sw of [...data.software]) data = applyCommand(data, { type: "delete", collection: "software", id: sw.id });
  assert.deepEqual(data.software, []);
  assert.ok(data.roles.every(role => role.softwareIds.length === 0));
  assert.deepEqual(data.installedByPc, {});
  assert.deepEqual(normalizeData(firebaseValue(toDatabase(data)), { firebase: true }), data);
});

test("installation status can be cleared and repeated writes are idempotent", () => {
  const seed = freshSeed();
  const command = { type: "installed", pcId: seed.pcs[0].id, softwareId: seed.software[0].id, installed: true };
  const once = applyCommand(seed, command);
  assert.deepEqual(applyCommand(once, command), once);
  assert.deepEqual(applyCommand(once, { ...command, installed: false }), seed);
});

test("option CRUD persists sorting and rejects removing values still in use", () => {
  const seed = freshSeed();
  const options = cloneJson(seed.options);
  options.osOptions.push("New OS");
  options.priorityOptions.reverse();
  let data = applyCommand(seed, { type: "options", options });
  assert.deepEqual(data.options, options);
  options.osOptions[options.osOptions.indexOf("New OS")] = "Renamed OS";
  data = applyCommand(data, { type: "options", options });
  options.osOptions = options.osOptions.filter(os => os !== "Renamed OS");
  data = applyCommand(data, { type: "options", options });
  assert.ok(!data.options.osOptions.includes("Renamed OS"));
  options.osOptions = [];
  assert.throws(() => applyCommand(data, { type: "options", options }), /仍在使用/);
});

test("malformed imports, duplicate IDs and dangling references are rejected before writes", () => {
  for (const invalid of [null, [], {}, { version: 99 }, { version: 2, pcs: "invalid", roles: [], software: [] }]) {
    assert.throws(() => normalizeData(invalid));
  }
  const duplicate = freshSeed();
  duplicate.software.push(cloneJson(duplicate.software[0]));
  assert.throws(() => normalizeData(duplicate), /ID 不可重複/);
  const dangling = freshSeed();
  dangling.pcs[0].roleId = "missing-role";
  assert.throws(() => normalizeData(dangling), /職位不存在/);
  const unsafe = freshSeed();
  unsafe.pcs[0].id = "__proto__";
  assert.throws(() => normalizeData(unsafe), /ID 不合法/);
  const malformed = freshSeed();
  malformed.software[0].roleIds = "role-general";
  assert.throws(() => normalizeData(malformed), /陣列/);
});

test("first initialization seeds once; v2 empty state never regenerates defaults", async () => {
  const fake = fakeDatabase(null);
  await fake.repository.initialize();
  assert.equal(fake.writes, 1);
  await fake.repository.initialize();
  assert.equal(fake.writes, 1);
  assert.deepEqual(normalizeData(fake.value, { firebase: true }), freshSeed());
  const empty = fakeDatabase({ version: 2 });
  await empty.repository.initialize();
  assert.equal(empty.writes, 0);
});

test("initialization retry preserves an existing v1 user's data instead of seeding over it", async () => {
  const legacy = freshSeed();
  legacy.version = 1;
  delete legacy.options;
  legacy.pcs[0].owner = "Existing User";
  const fake = fakeDatabase(null);
  fake.retryWith(() => legacy);
  await fake.repository.initialize();
  assert.equal(fake.value.version, 2);
  assert.equal(fake.value.pcs[legacy.pcs[0].id].owner, "Existing User");
});

test("transaction retry preserves concurrent edits to other PCs", async () => {
  const seed = freshSeed();
  const fake = fakeDatabase(toDatabase(seed));
  fake.retryWith(raw => { raw.pcs[seed.pcs[1].id].owner = "Concurrent User"; return raw; });
  await fake.repository.execute({ type: "save", collection: "pcs", row: { ...seed.pcs[0], owner: "My User" }, create: false });
  assert.equal(fake.value.pcs[seed.pcs[0].id].owner, "My User");
  assert.equal(fake.value.pcs[seed.pcs[1].id].owner, "Concurrent User");
});

test("permissions failure rejects and does not emit successful local state", async () => {
  const seed = freshSeed();
  const fake = fakeDatabase(toDatabase(seed));
  const received = [];
  const stop = fake.repository.subscribe(value => received.push(value), () => {});
  fake.setFailure(new Error("PERMISSION_DENIED"));
  await assert.rejects(fake.repository.execute({ type: "delete", collection: "pcs", id: seed.pcs[0].id }), /PERMISSION_DENIED/);
  assert.equal(fake.writes, 0);
  assert.equal(received.length, 1);
  assert.deepEqual(received[0], seed);
  stop();
  assert.equal(fake.listenerCount, 0);
});

test("realtime subscriptions report invalid/deleted data and clean up listeners", () => {
  const fake = fakeDatabase(toDatabase(freshSeed()));
  const errors = [];
  const received = [];
  const stopData = fake.repository.subscribe(value => received.push(value), error => errors.push(error.message));
  const stopConnection = fake.repository.subscribeConnection(value => assert.equal(value, true));
  fake.emit({ invalid: true });
  fake.emit(null);
  assert.equal(received.length, 1);
  assert.equal(errors.length, 2);
  stopData();
  stopConnection();
  assert.equal(fake.listenerCount, 0);
});

test("replacement imports/reset use the validated schema", async () => {
  const seed = freshSeed();
  const fake = fakeDatabase(toDatabase(seed));
  const imported = freshSeed();
  imported.pcs[0].owner = "Imported";
  await fake.repository.execute({ type: "replace", data: imported });
  assert.equal(fake.value.pcs[seed.pcs[0].id].owner, "Imported");
  await fake.repository.execute({ type: "replace", data: freshSeed() });
  assert.deepEqual(normalizeData(fake.value, { firebase: true }), seed);
});
