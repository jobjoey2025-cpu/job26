<template>
  <q-page class="flex flex-center">
    <q-card class="profile-card">
      <!-- 背景 -->
      <q-img src="../assets/img/Mechanical.jpg" class="bg-img" />

      <!-- Overlay -->
      <div class="overlay"></div>

      <!-- 內容 -->
      <div class="content">
        <!-- 頭像 -->
        <q-avatar size="160px" class="avatar">
          <img src="../assets/img/joey.png" />
        </q-avatar>

        <!-- 名字 -->
        <div class="text-h4 text-bold q-mt-md">Joey Yu</div>

        <!-- 技能標籤 -->
        <div class="q-mt-md column items-center">
          <q-chip color="primary" text-color="white" class="q-mb-sm">
            Mechanical Engineer
          </q-chip>

          <q-chip color="orange" text-color="white" class="q-mb-sm">
            Class C Electrician
          </q-chip>

          <q-chip color="teal" text-color="white"> Web Engineer </q-chip>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
// no logic needed
</script>

<style scoped>
.profile-card {
  position: relative;
  width: 700px;
  height: 380px;
  border-radius: 20px;
  overflow: hidden;
}

/* 背景 */
.bg-img {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* 遮罩（提升質感） */
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7));
}

/* 內容 */
.content {
  position: relative;
  z-index: 2;
  color: white;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
}

/* 頭像 */
.avatar {
  border: 3px solid white;
}

/* Hover 動畫 */
.profile-card {
  transition: transform 0.4s, box-shadow 0.4s;
}
.profile-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
</style>
