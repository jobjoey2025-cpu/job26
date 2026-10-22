import defaults from "../data/pc-software.defaults.json" with { type: "json" };

export const OPTION_KEYS = ["osOptions", "categoryChoices", "priorityOptions"];
const COLLECTIONS = ["pcs", "roles", "software"];
const has = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
const object = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
export const cloneJson = (value) => JSON.parse(JSON.stringify(value));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
function validId(value, label) {
  assert(typeof value === "string" && value.length > 0 &&
    !/[.#$\[\]/\u0000-\u001f\u007f]/.test(value) &&
    !["__proto__", "prototype", "constructor"].includes(value), `${label} 的 ID 不合法`);
  return value;
}
function string(value, label, required = false) {
  if (value == null && !required) return "";
  assert(typeof value === "string", `${label} 必須是文字`);
  const result = value.trim();
  assert(!required || result.length > 0, `請填寫${label}`);
  return result;
}
function strings(value, label, firebase = false) {
  if (firebase && value == null) return [];
  assert(Array.isArray(value), `${label} 必須是陣列`);
  const result = value.map(v => string(v, label, true));
  assert(new Set(result).size === result.length, `${label} 不可重複`);
  return result;
}
function ids(value, label) {
  return strings(value ?? [], label).map(v => validId(v, label));
}
function rows(value, label, firebase, version) {
  if (value == null && firebase) return [];
  let entries;
  if (Array.isArray(value)) entries = value.map(row => [null, row]);
  else {
    assert(object(value) && version === 2, `${label} 必須是陣列或以 ID 為鍵的物件`);
    entries = Object.entries(value);
  }
  const seen = new Set();
  return entries.map(([key, row]) => {
    assert(object(row), `${label} 的每筆資料必須是物件`);
    validId(row.id, label);
    assert(key === null || key === row.id, `${label} 的鍵必須與 ID 相同`);
    assert(!seen.has(row.id), `${label} 的 ID 不可重複`);
    seen.add(row.id);
    return row;
  });
}

// The view/export uses arrays. Firebase v2 stores entities by ID; v1 arrays remain readable.
export function normalizeData(raw, { firebase = false } = {}) {
  assert(object(raw), "資料必須是 JSON 物件");
  const version = raw.version ?? 1;
  assert(version === 1 || version === 2, "不支援此資料版本");
  if (!firebase) COLLECTIONS.forEach(key => assert(has(raw, key), `JSON 必須包含 ${key}`));
  if (firebase && version === 1) {
    assert(has(raw, "version") || COLLECTIONS.some(key => has(raw, key)), "Firebase 資料格式不正確");
  }
  const pcs = rows(raw.pcs, "PC", firebase, version).map(row => ({
    id: row.id,
    name: string(row.name, "電腦名稱", true),
    assetTag: string(row.assetTag, "資產編號", true),
    roleId: validId(row.roleId, "PC 職位"),
    os: string(row.os, "作業系統", true),
    owner: string(row.owner, "使用者"),
    location: string(row.location, "位置"),
    notes: string(row.notes, "PC 備註"),
  }));
  const roles = rows(raw.roles, "職位", firebase, version).map(row => ({
    id: row.id,
    name: string(row.name, "職位名稱", true),
    description: string(row.description, "職位說明"),
    softwareIds: ids(row.softwareIds, "職位的軟體"),
  }));
  const software = rows(raw.software, "軟體", firebase, version).map(row => ({
    id: row.id,
    name: string(row.name, "軟體名稱", true),
    category: string(row.category, "分類", true),
    purpose: string(row.purpose, "用途"),
    priority: string(row.priority, "建議狀態", true),
    vendor: string(row.vendor, "供應商"),
    url: string(row.url, "網址"),
    roleGroup: string(row.roleGroup, "原始職位分類"),
    roleIds: ids(row.roleIds, "軟體的適用職位"),
    notes: string(row.notes, "軟體備註"),
  }));
  const pcIds = new Set(pcs.map(row => row.id));
  const roleIds = new Set(roles.map(row => row.id));
  const softwareIds = new Set(software.map(row => row.id));
  const tags = pcs.map(row => row.assetTag.toUpperCase());
  assert(new Set(tags).size === tags.length, "資產編號不可重複");
  pcs.forEach(row => assert(roleIds.has(row.roleId), `PC「${row.name}」的職位不存在`));
  roles.forEach(row => row.softwareIds.forEach(id => assert(softwareIds.has(id), `職位「${row.name}」含不存在的軟體`)));
  software.forEach(row => row.roleIds.forEach(id => assert(roleIds.has(id), `軟體「${row.name}」含不存在的職位`)));
  // Legacy recommendations used the union of both relationship lists. Preserve that union.
  roles.forEach(role => {
    software.forEach(sw => {
      if (role.softwareIds.includes(sw.id) || sw.roleIds.includes(role.id)) {
        if (!role.softwareIds.includes(sw.id)) role.softwareIds.push(sw.id);
        if (!sw.roleIds.includes(role.id)) sw.roleIds.push(role.id);
      }
    });
  });
  const options = {};
  const legacyOptions = version === 1 && raw.options == null;
  const optionSource = legacyOptions ? defaults : raw.options ?? {};
  assert(object(optionSource), "options 必須是物件");
  OPTION_KEYS.forEach(key => { options[key] = strings(optionSource[key], key, firebase); });
  if (legacyOptions) {
    options.osOptions = [...new Set([...options.osOptions, ...pcs.map(row => row.os)])];
    options.categoryChoices = [...new Set([...options.categoryChoices, ...software.map(row => row.category)])];
    options.priorityOptions = [...new Set([...options.priorityOptions, ...software.map(row => row.priority)])];
  }
  pcs.forEach(row => assert(options.osOptions.includes(row.os), `作業系統「${row.os}」仍在使用，請保留此選項`));
  software.forEach(row => {
    assert(options.categoryChoices.includes(row.category), `分類「${row.category}」仍在使用，請保留此選項`);
    assert(options.priorityOptions.includes(row.priority), `建議狀態「${row.priority}」仍在使用，請保留此選項`);
  });
  const installedByPc = {};
  assert(raw.installedByPc == null || object(raw.installedByPc), "installedByPc 必須是物件");
  Object.entries(raw.installedByPc ?? {}).forEach(([pcId, values]) => {
    validId(pcId, "安裝紀錄 PC");
    assert(pcIds.has(pcId), "安裝紀錄的 PC 不存在");
    const installed = ids(values, "安裝紀錄");
    installed.forEach(id => assert(softwareIds.has(id), "安裝紀錄含不存在的軟體"));
    if (installed.length) installedByPc[pcId] = installed;
  });
  return { version: 2, pcs, roles, software, installedByPc, options };
}

export function freshSeed() {
  return normalizeData({
    version: 2,
    pcs: defaults.defaultPcs,
    roles: defaults.defaultRoles,
    software: defaults.seedSoftware,
    installedByPc: {},
    options: Object.fromEntries(OPTION_KEYS.map(key => [key, defaults[key]])),
  });
}

export function toDatabase(data) {
  const result = cloneJson(data);
  COLLECTIONS.forEach(key => { result[key] = Object.fromEntries(result[key].map(row => [row.id, row])); });
  return result;
}

// Apply one user intent to the latest transaction state, never to a stale UI snapshot.
export function applyCommand(current, command) {
  const data = cloneJson(current);
  const { type, collection, id } = command;
  if (type === "replace") return normalizeData(command.data);
  if (type === "options") data.options = cloneJson(command.options);
  else if (type === "save") {
    assert(COLLECTIONS.includes(collection), "未知的資料種類");
    const row = cloneJson(command.row);
    validId(row.id, collection);
    const index = data[collection].findIndex(item => item.id === row.id);
    assert(command.create ? index < 0 : index >= 0, command.create ? "此 ID 已存在" : "資料已被刪除，請重新整理清單");
    if (index < 0) data[collection].push(row);
    else data[collection][index] = row;
    if (collection === "roles") {
      const selected = ids(row.softwareIds, "職位的軟體");
      data.software.forEach(sw => {
        sw.roleIds = sw.roleIds.filter(roleId => roleId !== row.id);
        if (selected.includes(sw.id)) sw.roleIds.push(row.id);
      });
    }
    if (collection === "software") {
      const selected = ids(row.roleIds, "軟體的適用職位");
      data.roles.forEach(role => {
        role.softwareIds = role.softwareIds.filter(swId => swId !== row.id);
        if (selected.includes(role.id)) role.softwareIds.push(row.id);
      });
      // Preserve the existing ability to enter a new category in the software form.
      const category = string(row.category, "分類", true);
      if (!data.options.categoryChoices.includes(category)) data.options.categoryChoices.push(category);
    }
  } else if (type === "delete") {
    assert(COLLECTIONS.includes(collection), "未知的資料種類");
    assert(data[collection].some(row => row.id === id), "資料已被刪除");
    if (collection === "roles") {
      assert(!data.pcs.some(pc => pc.roleId === id), "仍有 PC 使用此職位，請先調整 PC 職位");
      data.software.forEach(sw => { sw.roleIds = sw.roleIds.filter(roleId => roleId !== id); });
    } else if (collection === "software") {
      data.roles.forEach(role => { role.softwareIds = role.softwareIds.filter(swId => swId !== id); });
      Object.keys(data.installedByPc).forEach(pcId => {
        data.installedByPc[pcId] = data.installedByPc[pcId].filter(swId => swId !== id);
      });
    } else delete data.installedByPc[id];
    data[collection] = data[collection].filter(row => row.id !== id);
  } else if (type === "installed") {
    assert(data.pcs.some(pc => pc.id === command.pcId), "此 PC 已被刪除");
    assert(data.software.some(sw => sw.id === command.softwareId), "此軟體已被刪除");
    assert(typeof command.installed === "boolean", "安裝狀態不合法");
    const installed = new Set(data.installedByPc[command.pcId] ?? []);
    if (command.installed) installed.add(command.softwareId);
    else installed.delete(command.softwareId);
    data.installedByPc[command.pcId] = [...installed];
  } else if (type !== "options") throw new Error("未知的資料操作");
  return normalizeData(data);
}
