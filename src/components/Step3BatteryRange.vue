<template>
  <q-step :name="3" title="電池與續航" icon="battery_charging_full">
    <div class="q-gutter-md">
      <q-select
        v-model="config.battery"
        label="電池 串聯（Series）"
        :options="['1S', '2S', '3S', '4S']"
      />

      <br />
      <br />
      <div>電池 放電倍率 (ex 35C)：{{ config.range }} C</div>
      <p>
        馬達電流需求 ≦ 電池最大放電能力 (馬達最大 60A 👉 電池至少： → 60 × 1.5 =
        90A)
      </p>
      <q-slider
        v-model="config.range"
        :min="20"
        :max="150"
        label
        label-always
        color="primary"
      />
    </div>

    <br /><br />
    <hr />
    <h6>Q : 後輪直徑78mm \ 齒輪比6 \ 轉速 (rpm)15000 求車子速度 ?</h6>
    <div class="row justify-center">
      <q-img
        src="./statics/speed_counter.jpg"
        spinner-color="white"
        style="width: 66%; height: auto"
      />
    </div>

    <br /><br />
    <hr />

    <div class="q-pa-md row items-start q-gutter-md flex justify-center">
      <q-card class="col-12 col-sm-6 col-md-3" flat bordered>
        <img src="./statics/motor.jpg" />

        <q-list>
          <q-item
            clickable
            tag="a"
            href="https://electric104.netlify.app/#/RCmotor"
            target="_blank"
          >
            <q-item-section avatar>
              <q-icon color="primary" name="home" />
            </q-item-section>

            <q-item-section>
              <q-item-label>馬達與電池簡介</q-item-label>
              <q-item-label caption>Have a drink.</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="red" name="blender" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Motor</q-item-label>
              <q-item-label caption>electric_rickshaw</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="amber" name="settings" />
            </q-item-section>

            <q-item-section>
              <q-item-label>改裝</q-item-label>
              <q-item-label caption
                >RC10
                的熱門改裝著重於現代化升級，包括：換裝無刷馬達和高容量電變，以提升速度和性能。
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>

      <!-- ----------- -->
      <q-card class="col-12 col-sm-6 col-md-3" flat bordered>
        <img src="./statics/CFD.png" />

        <q-list>
          <q-item
            clickable
            tag="a"
            href="https://joey20090710.blogspot.com/2025/02/cfd-in-colab-2d-car-silhouette.html"
            target="_blank"
          >
            <q-item-section avatar>
              <q-icon color="primary" name="home" />
            </q-item-section>

            <q-item-section>
              <q-item-label>CFD 流場</q-item-label>
              <q-item-label caption>Have a drink.</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="red" name="air" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Body</q-item-label>
              <q-item-label caption>electric_rickshaw</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="amber" name="settings" />
            </q-item-section>

            <q-item-section>
              <q-item-label>改裝</q-item-label>
              <q-item-label caption
                >Xtreme Aerodynamics 為知名義大利品牌，專注於
                高性能車殼與空力套件。</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
      <!-- ----------- -->

      <q-card class="col-12 col-sm-6 col-md-3" flat bordered>
        <img src="./statics/RACE Software.png" />

        <q-list>
          <q-item
            clickable
            tag="a"
            href="https://race.software/academy/design-with-race-guide/"
            target="_blank"
          >
            <q-item-section avatar>
              <q-icon color="primary" name="home" />
            </q-item-section>

            <q-item-section>
              <q-item-label>汽車底盤 \ 懸吊 \ 四輪定位</q-item-label>
              <q-item-label caption>Have a drink.</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            tag="a"
            href="https://60years.associatedelectrics.com/parts/factoryteam/?Product+Status=Active"
            target="_blank"
          >
            <q-item-section avatar>
              <q-icon color="red" name="car_repair" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Part Shop</q-item-label>
              <q-item-label caption>electric_rickshaw</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="amber" name="settings" />
            </q-item-section>

            <q-item-section>
              <q-item-label>改裝</q-item-label>
              <q-item-label caption
                >RC CAR
                的底盤與傳動系統決定車輛的「骨架與心臟」，懸吊與四輪定位則微調「操控手感與性能」。</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
      <!-- ----------- -->
    </div>

    <hr />
    <h6>Q : 如何從手冊找到零件資料 ?</h6>
    <h6 class="row justify-center">Team Associated</h6>

    <div class="row justify-center">
      <q-img
        src="./statics/ae_part.jpg"
        spinner-color="white"
        style="width: 66%; height: auto"
      />
    </div>
    <h6 class="row justify-center">Tamiya</h6>

    <div class="row justify-center">
      <q-img
        class="row justify-center"
        src="./statics/tamiya_part.jpg"
        spinner-color="white"
        style="width: 66%; height: auto"
      />
    </div>
  </q-step>
</template>

<script setup>
defineProps({ config: Object });
</script>
