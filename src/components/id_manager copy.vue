<template>
  <q-page class="q-pa-md">
    <q-table
      title="帳號管理"
      :rows="accounts"
      :columns="columns"
      row-key="email"
      flat
      bordered
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
                <q-item v-for="(s, index) in props.row.services" :key="index">
                  <q-item-section>
                    <!-- service name -->
                    <q-item-label>
                      {{ s.name || s.service }}
                    </q-item-label>

                    <!-- accountId -->
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
 * 🔥 讀取 Firebase Realtime Database
 * 同時把 services (object) 轉成 array
 */
onMounted(() => {
  const accountsRef = dbRef(db, "accounts");

  onValue(accountsRef, (snapshot) => {
    const data = snapshot.val() || {};

    accounts.value = Object.values(data).map((account) => ({
      ...account,
      services: account.services ? Object.values(account.services) : [],
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
