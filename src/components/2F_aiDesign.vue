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
      * 先蒐集 閱讀相關的分析範例 & SQL <br />→ 學會 有一版 work flow 比較保險
      mvp <br />→ 再做「精準設計」「表達方案」發表取得意見<br />→
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
          label="ai 工具 list (banana SD blender)"
          to="/2F_aiToolComparisonDB"
          target="_blank"
          icon="open_in_new"
        />
        <br />
        <a href="https://www.flag.com.tw/bk/t/f6392">* F6392 服務專區</a>
        <br />
        <a href="http://127.0.0.1:18789/">* 龍蝦 webUI</a>
        <br />
        <a href="https://www.jianzhuxuezhang.com/tools">* 建築學長</a>
        <br />
        <a
          href="https://deevid.ai/zh-TW/model/nano-banana2?utm_source=google&utm_medium=cpc&utm_campaign=tw-im-model-nanobanana&utm_term=nanobanana2&utm_content=pc&gad_source=1&gad_campaignid=23605675085&gbraid=0AAAAAq898mNEpYVJcnM5iDNXRLPc3gWxl&gclid=Cj0KCQjwornRBhCrARIsAON5exEBrU6WHpVk0faUeRhTnCB4Q1y0OMnBnGWDy3-5waRc-2M42UZRD3saAmdnEALw_wcB"
          >* Nano Banana Pro</a
        >
        <br />
        <a href="https://manus.im/zh-tw/playbook/interior-design">* manus</a>
        <br />
        <q-separator />
        <q-btn
          flat
          color="primary"
          label="室內設計展板 (出圖智能描述 設計概念封面 文化底蘊分析)"
          to="/2F_PresentationBoard"
          target="_blank"
          icon="open_in_new"
        />
        <p>圖轉文字 then db in Table (批次 Loop)</p>
        <q-btn
          flat
          color="primary"
          label="ai相簿 (範例)"
          to="/2F_aiGallery"
          target="_blank"
          icon="open_in_new"
        />
        <p>🎨 Concept 概念發想 |📊 Analysis 分析圖 | 🖼 Render 效果圖 | 🧠 AI Edit AI 修改 | 🏗 BIM BIM / 建模 </p>
        <br />
        <q-btn
          flat
          color="primary"
          label="GPT"
          to="/2F_aiAnalysis"
          target="_blank"
          icon="open_in_new"
        />
      vs
      <q-btn
          flat
          color="primary"
          label="Gemini"
          to="/2F_gemini"
          target="_blank"
          icon="open_in_new"
        />
        <br>
        <q-separator />
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
      <q-btn
        flat
        color="primary"
        label="推論 組合邏輯 OK? (組合邏輯 - 不能衝突 \ 現場對齊)"
        to="/2F_layoutInference"
        target="_blank"
        icon="open_in_new"
      />
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
          <!-- <li>空間配置</li> -->
          <!-- <li>材質搭配</li> -->
          <!-- <li>色彩搭配</li> -->
          <!-- <li>家具配置</li> -->
          <li>概念初稿</li>
          <li>手繪線搞 轉 效果圖</li>
          <li>室內意象圖</li>
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
        <div class="text-h5">Phase 2｜方案表達（最重要）工程圖 施工圖</div>
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
        <div class="text-h5">Phase 3｜方案修改 (工程變更)</div>
        <p>
          BIM revit - 價格估算 變化速度 & 設計變更 (專案太大 need cowork so
          隨經濟預算變化 是常有的)
        </p>
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
        <div class="text-h5">
          Phase 4｜精準設計(要堅持的點 \ 康康高樓裝窗型冷氣NG)
        </div>
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
        <div class="text-h5">Phase 5｜後期分析 (CICD 複盤 下一個案子用)</div>
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
