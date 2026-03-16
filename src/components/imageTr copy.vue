<template>
  <div>


    <!-- <div class="background">
      <div class="transbox">
        <p>这段文本被放置在一个透明框中。</p>
      </div>
    </div> -->

    <h1>產品透視圖</h1>
    <hr class="my-3" color="white" />
    <v-responsive align="middle">
      <div class="container">
      <!-- <div class="container" style="margin: 2%;"> -->
        <!-- <div style="float: right;"> -->
        <!-- <div style="margin:0% 20%"> -->
        <!-- style=" display: flex; justify-content: center;" -->
        <div class="background">
          <div class="transbox" style="padding-top:40px">
            <!-- <v-img cover src="@/assets/img/joey.png"></v-img> -->
            <!-- <v-img cover src="@/assets/img/Drawing2.svg" height="100"></v-img> -->
            <v-img cover src="@/assets/img/reflector3.png" width="170" height="170" ></v-img>
            <p style="float:right; font-size: 2.5em;">光機位置</p>
          </div>
        </div>
      </div>
    </v-responsive>
  </div>
</template>

<script>
export default {
  name: 'imageTr',
  // props: {
  //   msg: String
  // }
} //export default
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  background-color: rgba(0, 0, 0, );
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
  background: url(@/assets/img/G1200light.png);
  /* background-position: center; */
  /* border: 2px solid black; */
  /* border: 2px black; */
  background-size: 100% 100%;
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
