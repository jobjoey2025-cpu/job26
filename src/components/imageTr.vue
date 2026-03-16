<template>
  <div>
    <!-- <p>这段文本被放置在一个透明框中。</p> -->
    <div class="q-pa-lg">
      <!-- <h1>產品透視圖</h1> -->
      <h4 class="text-center">產品透視圖</h4>

      <!-- <hr class="my-3" color="white" /> -->

      <!-- <q-separator spaced /> -->

      <div class="row justify-center">
        <div class="container">
          <div class="background">
            <!-- <div class="transbox" style="padding-top:40px"> -->
            <div class="transbox row items-center q-pa-md">
              <!-- <v-img cover src="@/assets/img/reflector3.png" width="170" height="170" ></v-img> -->
              <q-img
                src="/src/assets/img/reflector3.png"
                style="width: 170px; height: 170px"
                fit="cover"
              />
              <!-- <p style="float:right; font-size: 2.5em;">光機位置</p> -->
              <div class="text-h4 q-ml-lg">光機位置</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "imageTr",
  // props: {
  //   msg: String
  // }
}; //export default
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  background-color: rgba(0, 0, 0);
  width: 400px;
  height: 400px;
  text-align: center;
}

/* .container {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: nowrap;
    align-content: stretch;
} */

div.background {
  /* background: url(/i/photo/tulip_peach_blossom_s.jpg) repeat; */
  /* background: url(https://picsum.photos/536/354) repeat; */
  width: 400px;
  height: 400px;
  /* background: url(@/assets/img/G1200light.png) center center no-repeat ; */
  /* @/assets/img/G1200light.png */
  /* background: url(@/assets/img/G1200light.png) center center repeat; */
  /* background: url(@/assets/img/G1200light.png); */
  background: url("../assets/img/G1200light.png");

  /* background-position: center; */
  /* border: 2px solid black; */
  /* border: 2px black; */
  /* background-size: 100% 100%; */
  background-size: cover;

}

div.transbox {
  margin: 30px 40px 30px 70px;
  /* margin: 70px; */
  background-color: #ffffff;
  /* border: 1px solid black; */
  opacity: 0.4;
  animation: taadaa 8s infinite;
}

div.transbox p {
  margin: 5%;
  font-weight: bold;
  color: #000000;
}

/* background: rgba(213, 34, 160, .2); */
@keyframes taadaa {
  0% {
    opacity: 0.1;
  }
  20% {
    opacity: 0.1;
  }
  40% {
    opacity: 0.3;
  }
  60% {
    opacity: 0.4;
  }
  80% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.2;
  }
}
</style>
