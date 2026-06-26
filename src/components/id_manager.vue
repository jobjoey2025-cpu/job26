<template>
  <q-page class="q-pa-md">
    <q-table
      title="帳號管理"
      :rows="accounts"
      :columns="columns"
      row-key="id"
      flat
      bordered
      :pagination="{ rowsPerPage: 0 }"
    >
      <!-- Email -->
      <template v-slot:body-cell-email="props">
        <q-td :props="props">
          <strong>{{ props.row.email }}</strong>
        </q-td>
      </template>

      <!-- Services -->
      <template v-slot:body-cell-services="props">
        <q-td :props="props">
          <q-expansion-item icon="apps" label="Services" dense expand-separator>
            <div v-if="props.row.services?.length">
              <q-list dense>
                <q-item v-for="s in props.row.services" :key="s.id">
                  <q-item-section>
                    <!-- service name -->
                    <q-item-label>
                      {{ s.serviceName || s.name || s.service || "Unnamed" }}
                    </q-item-label>

                    <!-- optional account info -->
                    <q-item-label caption v-if="s.accountId">
                      Account ID: {{ s.accountId }}
                    </q-item-label>

                    <!-- profile -->
                    <q-item-label caption v-if="s.profile">
                      {{ s.profile }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <div v-else class="text-grey">No services</div>
          </q-expansion-item>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "src/boot/firebase";
import { ref as dbRef, onValue } from "firebase/database";

const accounts = ref([]);

/**
 * Firebase Realtime Database Listener
 */
onMounted(() => {
  const accountsRef = dbRef(db, "accounts");

  onValue(accountsRef, (snapshot) => {
    const data = snapshot.val();

    if (!data) {
      accounts.value = [];
      return;
    }

    accounts.value = Object.entries(data).map(([id, account]) => ({
      id,
      email: account.email,

      services: account.services
        ? Object.entries(account.services).map(([sid, service]) => ({
            id: sid,
            ...service,
          }))
        : [],
    }));
  });
});

const columns = [
  {
    name: "email",
    label: "Email / ID",
    field: "email",
    align: "left",
  },
  {
    name: "services",
    label: "Services",
    field: "services",
    align: "left",
  },
];
</script>
