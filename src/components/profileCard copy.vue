<template>
  <div class="card">
    <!-- 背景圖 -->
    <div class="card-bg"></div>

    <!-- 內容 -->
    <img src="../assets/img/joey.png" alt="Avatar" class="avatar" />
    <div class="container">
      <h4><b>Joey Yu</b></h4>
      <!-- <h4>Joey Yu</h4> -->
      <!-- <p>Class C Electrician</p> -->
      <h6> →    Class C Electrician</h6>
      <p STYLE="FONT-SIZE: 18pt">.      Mechanical Engineer</p>

      <!-- <h6 style = "float: left; right: 666px">Class C Electrician</h6> -->
      <!-- <div style="float: left; display: block; margin-top: 222px; visibility: hidden;"> -->
    </div>
  </div>

  <br />
</template>

<script>
export default {
  name: 'ProfileCard',
}
</script>

<style scoped>
.card {
  position: relative;
  width: 600px;
  height: 303px;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  color: white;
  font-family: Arial, sans-serif;
}

/* 背景圖 */
.card-bg {
  background-image: url('../assets/img/Mechanical.jpg'); /* 背景圖路徑 */
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 100%;
  z-index: 0;
  filter: brightness(0.6); /* 可加深背景對比文字 */
}

/* 內容置於上層 */
/* .card img.avatar {
  width: 100px;
  border-radius: 50%;
  margin-top: 16px;
  z-index: 1;
  position: relative;
  border: 2px solid white;
} */

/* 橢圓形頭像 */
.card img.avatar {
  position: absolute;
  top: 9px;
  left: 22px;

  width: 201px; /* 橫向尺寸 */
  height: 255px; /* 縱向尺寸 */
  border-radius: 66% / 66%; /* 橢圓形效果 */
  margin-top: 16px;
  z-index: 1;
  /* position: relative; */
  border: 2px solid white;
  object-fit: cover; /* 裁切適應橢圓框 */
}

.card .container {
  position: relative;
  z-index: 1;
  padding: 16px;
}
</style>
