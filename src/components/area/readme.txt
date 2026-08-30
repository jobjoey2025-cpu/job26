
----- 26-08 -----

BLG : https://joey20090710.blogspot.com/2026/08/areamanagervue-cicd.html


主資料夾 : VTOL\src\components\area
composables/useAreas.js
pages/AreaManager.vue

主頁：[AreaManager.vue](pages/AreaManager.vue)
UI：Header、Category、Card、List
Dialog：Edit、Add、Preview、Selector
Firebase 資料層：composables/useAreas.js

同時修正 Todo 未儲存、缺少元件、Dialog 無邏輯、Firebase 監聽未解除等問題。
所有 JavaScript 語法與相對匯入檢查均通過。原始兩個檔案未修改。

未重構 file
a2F_album_combine.vue
a2F_areaAlbum.vue
a2F_btnLink.vue

----- ----- -----

整合 a2F_album_combine.vue ;; a2F_areaAlbum.vue 兩個檔案 到 修改資料夾 "Refactoring"
把「畫面」與「資料操作」分離。  目標是  :

將下列 處理成 { path: '1', component: () => import('components/1.vue'), name: '1' }, 
routes 格式 : Refactoring/components/area/AreaAddDialog.vue+0-22

----- ----- -----
核心概念：
                AreaManager.vue
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
   Header          Category        Area View
                                      │
                              ┌───────┴───────┐
                              ↓               ↓
                           Card View       List View
                              │
                           AreaCard
                              │
                    ┌─────────┼─────────┐
                    ↓         ↓         ↓
                  Photo      Issue      Todo

----- ----- -----
建議的拆分架構 :
pages/
└─ AreaManager.vue                ← 主控 Page

components/area/
├─ AreaHeader.vue                 ← Header / Card/List
├─ AreaCategoryBar.vue            ← 分類
├─ AreaCardView.vue               ← Card View
├─ AreaCard.vue                   ← 單一 Area Card
├─ AreaListView.vue               ← List View
├─ AreaEditDialog.vue             ← 編輯 Area
├─ AreaAddDialog.vue              ← 新增 Area
├─ AreaPhotoPreview.vue           ← 圖片預覽
└─ AreaSelectorDialog.vue         ← 區域選擇器

composables/
└─ useAreas.js                    ← Firebase + CRUD

utils/
└─ area.js                        ← statusColor / default data

----- ----- -----
AreaManager.vue = 控制器
AreaCard.vue = Area 顯示單元
useAreas.js = Area 資料層

----- ----- -----

不只我想不到 \ 就算GPT出來 我也只能 稍微修改 \ 重構 要 $1.2USD + Free GPT
不知道對不對 \ 有沒有多餘的檔案 \ 方便 CICD 就好 \ 
