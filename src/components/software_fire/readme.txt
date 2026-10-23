
VTOL/docs/pc-software.md
現在 vibe coding 還有 產生說明書

新 model Astra (高) 效果不好 & cost high
最好不要 直接改 VSC \ 檔案會超過 我的理解
我只是要 Fn \ 但不希望 手冊 分散 &
使用 5.6 Sol 中 就很好了

----- ----- ----- ----- ----- 

檔案分工

| 檔案 | 用途 |
| --- | --- |
| `src/data/pc-software.defaults.json` | `defaultPcs`、`defaultRoles`、`seedSoftware`、`osOptions`、`categoryChoices`、`priorityOptions`。保留原有 4 台 PC、5 個職位與 38 筆軟體，範本 ID 固定。 |
| `src/data/pc-software.columns.json` | 四張表格的欄位定義，屬於畫面設定。 |
| `src/config/firebase-pc-software.json` | 沿用原本 `software-ffea6` 專案的 Web 設定與 `pc-software-config` 路徑。 |
| `src/models/pcSoftware.js` | JSON 驗證、舊格式轉換、關聯一致性與 CRUD 操作。 |
| `src/services/pcSoftwareRepository.js` | 即時讀取、首次初始化與交易操作。可注入測試用傳輸層。 |
| `src/services/pcSoftwareService.js` | Firebase SDK 與具名 app `pc-software`，避免其他頁面的預設 Firebase app 衝突。 |
| `src/composables/usePcSoftware.js` | Vue 資料狀態、連線狀態、儲存狀態與解除訂閱。 |
| `tests/pcSoftware.test.mjs` | 資料轉換、CRUD、交易重試與錯誤處理測試。

雲端資料

Realtime Database 路徑維持 `pc-software-config`。版本 2 將 PC、職位與軟體存成以 ID 為鍵的物件，表單與匯出的 JSON 則使用陣列：

```text
pc-software-config
├─ version: 2
├─ pcs/{pcId}
├─ roles/{roleId}
├─ software/{softwareId}
├─ installedByPc/{pcId}: [softwareId, ...]
└─ options
   ├─ osOptions: [...]
   ├─ categoryChoices: [...]
   └─ priorityOptions: [...]

----- ----- ----- ----- ----- 
安裝建議 如何修改 ?	
尋找關聯的段子,	找到了 : 	
他是先分類 軟體 \ Then
roles \ role-dev \ softwareIds	
安裝建議 PC 再抓 roleId :"role-dev"	

跟我想的不一樣 (PC 包含 美工 程式 ...) \ 但是可以先試看看 \ 反正都有縮小 範圍	
Then is Android 要怎麼 放進去 ?	
也是會有很多台 android & iPad ex 美術 andr \ Bank andr ....	
** 先試看看 \ 反正都有縮小 範圍