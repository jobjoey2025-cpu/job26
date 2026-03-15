<template>
  <q-step :name="2" title="選擇動力系統" icon="bolt">
    <div class="q-gutter-md">
      <!-- 馬達選擇 -->
      <q-select
        v-model="config.motor"
        label="組裝程度"
        :options="motorOptions"
        option-value="value"
        option-label="label"
        emit-value
        map-options
        filled
      >
        <!-- 自訂每一個 option 的樣式 -->
        <template v-slot:option="scope">
          <q-item clickable v-ripple @click="scope.toggleOption(scope.opt)">
            <q-item-section avatar>
              <q-img :src="scope.opt.img" style="width: 40px; height: 40px" />
            </q-item-section>
            <q-item-section>{{ scope.opt.label }}</q-item-section>
          </q-item>
        </template>

        <!-- 已選項顯示 -->
        <template v-slot:selected-item="scope">
          <q-item>
            <q-item-section avatar>
              <q-img :src="scope.opt.img" style="width: 32px; height: 32px" />
            </q-item-section>
            <q-item-section>{{ scope.opt.label }}</q-item-section>
          </q-item>
        </template>
      </q-select>

      <!-- 驅動方式選擇 -->
      <q-select
        v-model="config.drive"
        label="驅動方式"
        :options="driveOptions"
        option-value="value"
        option-label="label"
        emit-value
        map-options
        filled
      >
        <template v-slot:option="scope">
          <q-item clickable v-ripple @click="scope.toggleOption(scope.opt)">
            <q-item-section avatar>
              <q-img :src="scope.opt.img" style="width: 40px; height: 40px" />
            </q-item-section>
            <q-item-section>{{ scope.opt.label }}</q-item-section>
          </q-item>
        </template>

        <template v-slot:selected-item="scope">
          <q-item>
            <q-item-section avatar>
              <q-img :src="scope.opt.img" style="width: 32px; height: 32px" />
            </q-item-section>
            <q-item-section>{{ scope.opt.label }}</q-item-section>
          </q-item>
        </template>
      </q-select>

      <!-- <div class="flex justify-center">
        <q-btn label="去 MyPage" color="primary" to="/RCmotor" />
      </div> -->
    </div>
   <br><br><br>
    <!-- --------------------------------- -->
    <q-banner class="bg-grey-2 text-dark q-pa-md q-mb-md" rounded>
      <template v-slot:avatar>
        <q-icon name="electric_bolt" color="primary" size="lg" />
      </template>

      <!-- <div class="text-h6">驅動方式 : Electric Motor</div> -->
      <div class="text-subtitle2">1:10 Scale 電動車</div>

      <!-- 外層可收合 -->
      <q-expansion-item
        icon="shopping_cart"
        label="商店 RC 比價 : 價位分群"
        expand-separator
        dense
      >
        <!-- 入門組 -->
        <q-expansion-item
          icon="star_border"
          label="入門組（NT$6,000–12,000）"
          dense
        >
          <q-card>
            <q-card-section>
              RTR（Ready-to-Run）套裝，含車體、遙控器。<br />
              適合新手體驗，改裝空間有限。EX : TT-02 ; RC10 ;
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <!-- 中階組 -->
        <q-expansion-item icon="build" label="中階組（NT$15,000–30,000）" dense>
          <q-card>
            <q-card-section>
              Kit 車架（需自行組裝），搭配中階馬達/電池/遙控。<br />
              適合俱樂部賽或進階玩家。EX YOKOMO YD-2E ; MST TCR-M / RMX 2.5 ;
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <!-- 高階組 -->
        <q-expansion-item
          icon="emoji_events"
          label="高階組（NT$40,000 以上）"
          dense
        >
          <q-card>
            <q-card-section>
              比賽專用底盤（如 XRAY、Yokomo、Awesomatix）。<br />
              高階無感應馬達、競技電池、精準遙控器。EX B7 ; B74.2 ;
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-expansion-item>
    </q-banner>

    <!-- ------------------------ -->

    <div class="q-pa-md row items-start q-gutter-md flex justify-center">
      <q-card class="col-12 col-sm-6 col-md-3" flat bordered>
        <img src="/statics/RC10T Cliff Lett Edition Kit.jpg" />

        <q-list>
          <q-item
            clickable
            tag="a"
            href="https://60years.associatedelectrics.com/rc10t-cliff-lett-edition-kit/"
            target="_blank"
          >
            <q-item-section avatar>
              <q-icon color="primary" name="home" />
            </q-item-section>

            <q-item-section>
              <q-item-label>RC10T Cliff Lett Edition Kit</q-item-label>
              <q-item-label caption>Have a drink.</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="red" name="airport_shuttle" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Truck</q-item-label>
              <q-item-label caption>electric_rickshaw</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="amber" name="two_wheeler" />
            </q-item-section>

            <q-item-section>
              <q-item-label>2WD</q-item-label>
              <q-item-label caption>Watch a movie.</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>

      <!-- ----------- -->

      <q-card class="col-12 col-sm-6 col-md-3" flat bordered>
        <img src="/statics/RC10DS.jpg" />

        <q-list>
          <q-item
            clickable
            tag="a"
            href="https://60years.associatedelectrics.com/rc10ds-classic-kit/"
            target="_blank"
          >
            <q-item-section avatar>
              <q-icon color="primary" name="home" />
            </q-item-section>

            <q-item-section>
              <q-item-label>RC10DS Classic Kit</q-item-label>
              <q-item-label caption>Have a drink.</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="red" name="toys" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Touring Car</q-item-label>
              <q-item-label caption>Fill your gas tank.</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="amber" name="two_wheeler" />
            </q-item-section>

            <q-item-section>
              <q-item-label>2WD</q-item-label>
              <q-item-label caption>Watch a movie.</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>

      <!-- ----------- -->

      <q-card class="col-12 col-sm-6 col-md-3" flat bordered>
        <img src="/statics/RC10 Team Car Gold.jpg" />

        <q-list>
          <q-item
            clickable
            tag="a"
            href="https://60years.associatedelectrics.com/rc10-team-car-gold-edition-kit-kit/"
            target="_blank"
          >
            <q-item-section avatar>
              <q-icon color="primary" name="home" />
            </q-item-section>

            <q-item-section>
              <q-item-label>RC10 Team Car Gold</q-item-label>
              <q-item-label caption>Have a drink.</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="red" name="forest" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Buggy</q-item-label>
              <q-item-label caption>Fill your gas tank.</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="amber" name="two_wheeler" />
            </q-item-section>

            <q-item-section>
              <q-item-label>2WD</q-item-label>
              <q-item-label caption>Watch a movie.</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>

      <!-- ------------------- -->

      <q-card class="col-12 col-sm-6 col-md-3" flat bordered>
        <img src="/statics/RC10 4WD KIT.jpg" />

        <q-list>
          <q-item
            clickable
            tag="a"
            href="https://www.tamiyausa.com/shop/die-castfinished-model/16-honda-cb750-racing/semi-assembled-premium-model/"
            target="_blank"
          >
            <q-item-section avatar>
              <q-icon color="primary" name="home" />
            </q-item-section>

            <q-item-section>
              <q-item-label>RC10 4WD</q-item-label>
              <q-item-label caption>Have a drink.</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="red" name="two_wheeler" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Buggy</q-item-label>
              <q-item-label caption>Fill your gas tank.</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="amber" name="roller_skating" />
            </q-item-section>

            <q-item-section>
              <q-item-label>4WD</q-item-label>
              <q-item-label caption>Watch a movie.</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>

      <!-- ------------------- -->

      <q-card class="col-12 col-sm-6 col-md-3" flat bordered>
        <img src="/statics/Premium Model.jpg" />

        <q-list>
          <q-item
            clickable
            tag="a"
            href="https://www.tamiyausa.com/shop/die-castfinished-model/16-honda-cb750-racing/semi-assembled-premium-model/"
            target="_blank"
          >
            <q-item-section avatar>
              <q-icon color="primary" name="home" />
            </q-item-section>

            <q-item-section>
              <q-item-label>GTO Semi-Assembled Premium Model</q-item-label>
              <q-item-label caption>Have a drink.</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="red" name="sports_score" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Racing</q-item-label>
              <q-item-label caption>Fill your gas tank.</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="amber" name="roller_skating" />
            </q-item-section>

            <q-item-section>
              <q-item-label>2WD</q-item-label>
              <q-item-label caption>Watch a movie.</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>



      <q-card class="col-12 col-sm-6 col-md-3" flat bordered>
        <img src="/statics/tamiya_store.jpg" />

        <q-list>
          <q-item
            clickable
            tag="a"
            href="https://joey20090710.blogspot.com/2022/09/joey-html-22-09.html"
            target="_blank"
          >
            <q-item-section avatar>
              <q-icon color="primary" name="home" />
            </q-item-section>

            <q-item-section>
              <q-item-label>RC Car Store</q-item-label>
              <q-item-label caption>Have a drink.</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="red" name="airplane_ticket" />
            </q-item-section>
            <!-- airlines -->
            <q-item-section>
              <q-item-label>Racing</q-item-label>
              <q-item-label caption>Fill your gas tank.</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="amber" name="shopping_cart" />
            </q-item-section>

            <q-item-section>
              <q-item-label>shopping speed</q-item-label>
              <q-item-label caption>Watch a movie.</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>


    </div>
  </q-step>
</template>

<script setup>
defineProps({ config: Object });

// 可自行換成本地圖片
const motorOptions = [
  {
    label: "RTR",
    value: "single",
    img: "/statics/RC10DR Desert.jpg",
  },
  {
    label: "Kit",
    value: "dual",
    img: "/statics/RC10 2025 Metallic.jpg",
  },
  {
    label: "附近店面 ",
    value: "dual",
    img: "/statics/赤貧軍團.jpg",
  },
  {
    label: "semi Assem",
    value: "dual",
    img: "/statics/semi-assembled.jpg",
  },
];

const driveOptions = [
  {
    label: "2WD",
    value: "FWD",
    img: "/statics/2WD.jpg",
  },
  {
    label: "4WD",
    value: "RWD",
    img: "/statics/4WD.jpg",
  },
  {
    label: "6WD",
    value: "AWD",
    img: "/statics/6WD.jpg",
  },
];
</script>

<style scoped>
.q-img {
  object-fit: contain;
}
</style>
