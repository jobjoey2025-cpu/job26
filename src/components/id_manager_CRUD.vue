<template>
  <q-page class="q-pa-md">

    <!-- 工具列 -->
    <div class="row justify-between items-center q-mb-md">
      <div class="text-h5">帳號管理</div>

      <q-btn
        color="primary"
        icon="add"
        label="新增帳號"
        @click="showDialog = true"
      />
    </div>

    <!-- Table -->
    <q-table
      :rows="accounts"
      :columns="columns"
      row-key="id"
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

          <q-expansion-item
            icon="apps"
            label="Services"
            dense
            expand-separator
          >

            <div v-if="props.row.services && props.row.services.length">

              <q-list dense>

                <q-item
                  v-for="service in props.row.services"
                  :key="service.id"
                >
                  <q-item-section>

                    <!-- service name（統一防呆） -->
                    <q-item-label>
                      {{ service.serviceName || service.name || service.service || 'Unnamed' }}
                    </q-item-label>

                    <!-- accountId -->
                    <q-item-label caption v-if="service.accountId">
                      Account: {{ service.accountId }}
                    </q-item-label>

                    <!-- profile -->
                    <q-item-label caption v-if="service.profile">
                      {{ service.profile }}
                    </q-item-label>

                  </q-item-section>
                </q-item>

              </q-list>

            </div>

            <div v-else class="text-grey q-pa-sm">
              No Services
            </div>

          </q-expansion-item>

        </q-td>
      </template>

    </q-table>

    <!-- 新增帳號 Dialog -->
    <q-dialog v-model="showDialog">
      <q-card style="min-width: 500px">

        <q-card-section class="text-h6">
          新增帳號
        </q-card-section>

        <q-separator />

        <q-card-section>

          <q-input
            outlined
            v-model="newAccount.email"
            label="Email"
          />

          <q-input
            outlined
            class="q-mt-md"
            v-model="newAccount.service"
            label="Service Name"
          />

          <q-input
            outlined
            class="q-mt-md"
            v-model="newAccount.accountId"
            label="Account ID"
          />

          <q-input
            outlined
            class="q-mt-md"
            v-model="newAccount.profile"
            label="Profile"
          />

        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" v-close-popup />
          <q-btn color="primary" label="新增" @click="addAccount" />
        </q-card-actions>

      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "src/boot/firebase";
import { ref as dbRef, onValue, push, set } from "firebase/database";

const accounts = ref([]);
const showDialog = ref(false);

const newAccount = ref({
  email: "",
  service: "",
  accountId: "",
  profile: "",
});

const columns = [
  {
    name: "email",
    label: "Email",
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

/**
 * 🔥 Firebase 即時同步 + normalize schema
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
      email: account.email || "",

      services: account.services
        ? Object.entries(account.services).map(([sid, service]) => ({
            id: sid,

            // 🔥 統一欄位（避免舊資料爆掉）
            serviceName:
              service.serviceName ||
              service.name ||
              service.service ||
              "",

            accountId: service.accountId || "",
            profile: service.profile || "",
          }))
        : [],
    }));
  });
});

/**
 * ➕ 新增帳號
 */
async function addAccount() {
  if (!newAccount.value.email) return;

  const accountRef = push(dbRef(db, "accounts"));

  await set(accountRef, {
    email: newAccount.value.email,

    services: {
      service1: {
        serviceName: newAccount.value.service,
        accountId: newAccount.value.accountId,
        profile: newAccount.value.profile,
      },
    },
  });

  newAccount.value = {
    email: "",
    service: "",
    accountId: "",
    profile: "",
  };

  showDialog.value = false;
}
</script>