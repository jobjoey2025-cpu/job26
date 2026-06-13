<template>
  <q-page padding>
    ```
    <div class="text-h4 q-mb-lg">AI 建築 / 室內設計工作流</div>

    <!-- <q-banner class="bg-blue-1 q-mb-lg">
      核心原則：
      <br />
      先學會「表達方案」→ 再做「精準設計」→ 最後才做「分析優化」
    </q-banner> -->

    <q-banner class="bg-blue-1 q-mb-lg">
      核心原則：以一個 業餘 經驗缺乏 的順序調整
      <br />
      先蒐集 閱讀相關的分析範例 & SQL <br />→ 學會 有一版 work flow 比較保險 mvp
      <br />→ 再做「精準設計」「表達方案」發表取得意見<br />→
      最後才做「分析優化」(局部AI 修改) 工程變更 for 外包 cowork
    </q-banner>

    <!-- Phase 0 -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h5">Phase 0｜案例研究（最優先）</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-btn
          flat
          color="primary"
          label="ai 工具"
          to="/2F_aiToolComparisonDB"
          target="_blank"
          icon="open_in_new"
        />
        <q-list dense>
          <q-item>
            <q-item-section avatar> 📚 </q-item-section>
            <q-item-section> Revit / 景觀圖集 Book </q-item-section>
          </q-item>

          <q-item>
            <q-item-section> 建立案例資料庫： </q-item-section>
          </q-item>
        </q-list>

        <pre>
```

Case DB
├─ 現代風
├─ 北歐
├─ 日式
├─ 工業風
├─ 商業空間
├─ 景觀案例
└─ 建築外觀 </pre
        >

        ```
      </q-card-section>
    </q-card>

    <!-- Phase 1 -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h5">Phase 1｜前期概念設計</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="text-h6 q-mb-sm">圖紙資料庫（Project DB）</div>

        <pre>
```

Project DB
├─ CAD 平面圖
├─ CAD 立面圖
├─ 基地資料
├─ 法規資料
└─ 參考案例 </pre
        >

        ```
        <q-separator class="q-my-md" />

        <div class="text-h6 q-mb-sm">構思圖集</div>

        <ul>
          <li>空間配置</li>
          <li>材質搭配</li>
          <li>色彩搭配</li>
          <li>家具配置</li>
        </ul>

        <div class="text-h6 q-mt-lg q-mb-sm">AI 概念生成</div>

        <ul>
          <li>Nano Banana</li>
          <li>GPT 圖像生成</li>
          <li>Stable Diffusion</li>
        </ul>

        <div class="text-h6 q-mt-lg q-mb-sm">Style DB</div>

        <q-chip>現代極簡</q-chip>
        <q-chip>北歐</q-chip>
        <q-chip>侘寂</q-chip>
        <q-chip>工業風</q-chip>
        <q-chip>日式</q-chip>
        <q-chip>商業科技風</q-chip>
      </q-card-section>
    </q-card>

    <!-- Phase 2 -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h5">Phase 2｜方案表達（最重要）</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-list bordered separator>
          <q-item>
            <q-item-section> CAD → 效果圖 </q-item-section>
          </q-item>

          <q-item>
            <q-item-section> 黑白戶型 → 彩平圖 </q-item-section>
          </q-item>

          <q-item>
            <q-item-section> 平面圖 → SketchUp → AI優化 </q-item-section>
          </q-item>

          <q-item>
            <q-item-section> 室內軸測圖 / 爆炸圖 </q-item-section>
          </q-item>

          <q-item>
            <q-item-section> 圖轉影片 / 動態漫遊 </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- Phase 3 -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h5">Phase 3｜方案修改</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-list dense>
          <q-item>
            <q-item-section> 局部 AI 修改（Nano Banana） </q-item-section>
          </q-item>

          <q-item>
            <q-item-section> 材質替換 </q-item-section>
          </q-item>

          <q-item>
            <q-item-section> 家具替換 </q-item-section>
          </q-item>

          <q-item>
            <q-item-section> AI 拼貼改圖 </q-item-section>
          </q-item>

          <q-item>
            <q-item-section> 局部燈光與色溫調整 </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- Phase 4 -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h5">Phase 4｜精準設計</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-list dense>
          <q-item>
            <q-item-section> Revit BIM 建模 </q-item-section>
          </q-item>

          <q-item>
            <q-item-section> 軟硬裝整合 </q-item-section>
          </q-item>

          <q-item>
            <q-item-section> 施工圖產出 </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- Phase 5 -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h5">Phase 5｜後期分析</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-chip color="primary" text-color="white"> 日照分析 </q-chip>

        <q-chip color="primary" text-color="white"> 採光分析 </q-chip>

        <q-chip color="primary" text-color="white"> 動線分析 </q-chip>

        <q-chip color="primary" text-color="white"> 能耗分析 </q-chip>

        <q-chip color="primary" text-color="white"> 景觀視線分析 </q-chip>

        <div class="text-h6 q-mt-lg">BIM 造價管理</div>

        <pre>
```

設計修改
↓
模型同步更新
↓
數量同步更新
↓
預算同步更新 </pre
        >

        ```
      </q-card-section>
    </q-card>

    <!-- Final Workflow -->

    <q-card flat bordered class="bg-green-1">
      <q-card-section>
        <div class="text-h5">AI + BIM 最終工作流</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <pre>
```

案例圖集
↓
風格資料庫
↓
CAD圖紙資料庫
↓
AI概念生成
↓
方案表達
↓
客戶確認
↓
AI快速修改
↓
Revit BIM
↓
施工圖
↓
分析圖
↓
造價估算 </pre
        >

        ```
      </q-card-section>
    </q-card>
    ```
  </q-page>
</template>
