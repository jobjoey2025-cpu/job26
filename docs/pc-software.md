# PC 軟體配置中心

`src/components/1.vue` 保留畫面與表單操作，資料範本、資料驗證、Firebase 操作與訂閱生命週期已拆開。原本的 `/1` 路由不需修改，Firebase 沿用專案既有套件。

為修復 Vite 7 匯入 JSON 時的 `orgTransform.apply is not a function` 錯誤，`@intlify/unplugin-vue-i18n` 已由 4.0.0 更新並固定為 11.0.7，並更新 npm 的 `package-lock.json`。這是 [Quasar 官方倉庫已確認的相容性問題](https://github.com/quasarframework/quasar/issues/18230)；重新安裝相依套件請使用 `npm ci`。

## 檔案分工

| 檔案 | 用途 |
| --- | --- |
| `src/data/pc-software.defaults.json` | `defaultPcs`、`defaultRoles`、`seedSoftware`、`osOptions`、`categoryChoices`、`priorityOptions`。保留原有 4 台 PC、5 個職位與 38 筆軟體，範本 ID 固定。 |
| `src/data/pc-software.columns.json` | 四張表格的欄位定義，屬於畫面設定。 |
| `src/config/firebase-pc-software.json` | 沿用原本 `software-ffea6` 專案的 Web 設定與 `pc-software-config` 路徑。 |
| `src/models/pcSoftware.js` | JSON 驗證、舊格式轉換、關聯一致性與 CRUD 操作。 |
| `src/services/pcSoftwareRepository.js` | 即時讀取、首次初始化與交易操作。可注入測試用傳輸層。 |
| `src/services/pcSoftwareService.js` | Firebase SDK 與具名 app `pc-software`，避免其他頁面的預設 Firebase app 衝突。 |
| `src/composables/usePcSoftware.js` | Vue 資料狀態、連線狀態、儲存狀態與解除訂閱。 |
| `tests/pcSoftware.test.mjs` | 資料轉換、CRUD、交易重試與錯誤處理測試。 |

## 雲端資料

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
```

第一次開啟頁面時，只有整個路徑不存在才會載入 JSON 範本。舊版陣列資料會在交易中轉換成版本 2，保留既有 ID、內容、安裝紀錄、自訂分類及有效的職位／軟體關聯。版本 2 的空集合不會重新填入範本；Firebase 省略空陣列或空物件時，讀取層會還原為空集合。

部署新版後，請重新載入仍開著的舊版頁面。舊版元件仍使用整包 `set()`，可能覆寫新版交易結果；不同版本不適合同時編輯同一路徑。

## 使用方式

- **安裝建議**：依 PC 職位顯示軟體，安裝狀態依 PC 分別儲存。
- **PC／職位／軟體管理**：新增、編輯、刪除均等待 Firebase 確認後才顯示成功。刪除軟體會清除職位及安裝紀錄中的關聯；仍被 PC 使用的職位不可刪除。
- **設定選項**：按「編輯選項」，輸入文字並按 Enter 新增，移除籤刪除選項。修改名稱可先移除再新增。使用中的名稱須先調整相關 PC 或軟體資料才能移除。`priorityOptions` 的排列順序決定建議清單排序。
- **職位與軟體關聯**：從職位的預設軟體或軟體的適用職位編輯，兩邊都會同步更新，取消勾選即可移除建議。
- **JSON 匯入／匯出**：包含 PC、職位、軟體、安裝紀錄與所有選項。可匯入舊版匯出檔及版本 2 格式；匯入前會檢查重複 ID／資產編號、欄位型別與失效關聯。
- **重設範本**：確認後用 JSON 範本覆蓋整個功能的資料與選項。修改本機範本檔不會自動覆寫既有雲端資料。
- **離線／權限失敗**：離線時停用修改。寫入失敗會顯示原因並保留表單，不會顯示成功；送出後斷線的交易會等待重新連線，確認前請保留頁面。

每次修改以最新雲端資料執行交易，避免不同 PC／軟體的更新互相覆蓋。同一筆資料若同時編輯，後完成的儲存仍可能取代先前的內容。

資料庫規則須允許目前使用者讀寫此路徑；交易需要讀取與寫入權限。本次不修改 Firebase Authentication 或規則。交易與即時訂閱的行為參考 [Firebase 官方讀寫文件](https://firebase.google.com/docs/database/web/read-and-write)。

## 驗證

在專案根目錄執行：

```sh
node --test tests/pcSoftware.test.mjs
npm run build
```

單元測試使用模擬傳輸層，涵蓋舊資料、空集合、CRUD、雙向關聯、選項管理、安裝紀錄、同時修改的交易重試、權限錯誤及訂閱清理，不會連線寫入正式 Firebase。瀏覽器檢查同樣使用本機模擬資料；正式資料庫的實際規則與讀寫權限須在部署環境確認。
