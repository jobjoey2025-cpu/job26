export const timelineSections = [
  {
    id: "problem",
    navTitle: "先確認問題 \ room db NG",
    title: "先判斷真正的問題",
    subtitle: "Problem",
    icon: "priority_high",
    color: "negative",
    // ，避免直接把工具或 AI 當成答案
    summary:
      "思緒跑到 JPT，正要做 Su-Ao Project 沒動力， 更不要說 Room DB。<br>* 卡住時先確認現在要解決的是什麼。 <br>* 不要先判斷自己，先試著問 GPT。",
    details: [
      "情緒NG -- 執著自己的短版，解一些小問題，不接納自己的侷限性。",
      "準備不足 -- 很多時後就是健保卡 找不到，身體不適 起不了床，這些 很難繞過的阻礙。",
      "時間不夠 -- BLG 一寫就是四小時",
      "失敗複習 -- 除 TD6 (lose) 我又 YT Tomica LV \ TomyTec 412",
      "ROI過時 -- joey 已經不再開發 電動滑板了。",
      "忘記 -- 油箱蓋 關不起來，要修。\ 燃料費 記錯",
      "---",
      "recent 做 rule 比較能常用",
      "Today = next action -- 隨手寫 A4 \ recent 10mins or 快刀 Quasar",
      "1 week = execution -- GDS -- 中心值",
      "Long-term = direction -- P Areas RA \ quasar doc cards",
    ],
  },
  {
    id: "test",
    navTitle: "* 10 分鐘測試 或 快刀",
    title: "1☏ 10 分鐘測試，或快刀斬亂麻",
    subtitle: "Action",
    icon: "flash_on",
    color: "orange",
    summary: "* 水／廁所：5mins 可到 ;; 人不多、Parking 有位置 就 GO。",
    details: [
      "設定 10 分鐘上限，時間到就整理結果感覺。",
      "不能增加 {需要決策資訊} 的工作，只引用 db，if 要計算判斷的 則停止或延後。",
      "值得做: 確認 deadline ; 查 database ; 找實際價格 ; 找缺少的規格 ; 找關鍵 dependency。",
    ],
  },
  {
    id: "visibility",
    navTitle: "* 讓行動可見 - List (6 Level) \ 範本",
    title: "讓下一步看得見",
    subtitle: "Visibility",
    icon: "visibility",
    color: "primary",
    summary:
      "把 Function、Project、Task 與 List (有 Table 就算可以具體執行) 分層呈現，並依目前能量選擇合適工作。",
    details: [
      "最近失敗讓我看到什麼？{改不了 or 還不了解的。}",
      "一直有阻礙 -- 體力不好 \ 運氣不好 \ 準備不夠。",
      "recent 失敗 才能 體會自己的level，真正進入 組織的階級系統，ready 60y fired。主流 is 誰贏他們幫誰。",
      "接受自己的真實 level，看到組織與主流的階級規則。",
      "---",
      "最近失誤紀錄 (意外的) :",
      "事情多到 沒規劃完不敢睡。",
      "如果阻礙次數增加 (找不到東西) \ 就要先停下來做其他 \ 必要時收兵 or 縮小規模 (臨時改計畫 也很難)。",
    ],
  },
  {
    id: "space",
    navTitle: "保留空白",
    title: "留白：防止只見樹不見林",
    subtitle: "Reset",
    icon: "space_bar",
    color: "grey-7",
    summary: "停下來 \ 觀察環境 天空 \ 想想 GGB。",
    details: [
      "留出沒有輸入與任務的時間 {吃飯}，重新檢查方向、限制與優先順序。",
      "先處理睡眠、飲食、移動與環境。{冷氣 熱水}",
      "---",
      "清掉不再服務目前目標的項目。",
      "預留緩衝，馬斯克 先砍。",
    ],
  },
  {
    id: "energy",
    navTitle: "x 管理能量 (意志力消耗)",
    title: "🔋 意志力消耗管理",
    subtitle: "Energy",
    icon: "battery_alert",
    color: "amber-8",
    summary:
      "TD6 強制轉換心情 \ 減少內耗。<br> * 大規模 sys follow 大品牌 \ 自己想不贏大組織(choose NOT build) <br>* 不要用高能量處理低價值問題 ",
    details: [
      "增加時間尺度。",
      "如果 目前沒辦法完成，儘量先把 BOX 做出來。大綱 能常用的元素",
      "先看能量，再看任務；把最佳狀態保留給高價值、高不確定性的工作。<br>* 不要用高能量處理低價值問題",
      "低能量時以恢復與維持為主。",
      "高能量時處理判斷、創作與長期價值。",
      "很多時後就是健保卡 找不到，身體不適 起不了床，這些 很難繞過的阻礙。",
      "so 投資阻礙 solution 對即時解 is 有用的， ex recent sys page。",
      "大型系統 引用 穩定主流大牌 在緊急Bug出現時 比較好解。",
      "如果是突破 一定會跟預想的不一樣。所以留緩衝預算 is better",
      "不要用興趣判斷工作的價值（醫院宅 \ ROI）。。",
    ],
  },
  {
    id: "decision",
    navTitle: "x 設定否決條件(風險 超控)",
    title: "最後加入否決條件",
    subtitle: "Decision",
    icon: "gavel",
    color: "deep-orange",
    summary:
      "塞車 沒車位 沒辦法平躺 水廁 \\ 好選項不只要有優點，也要通過底線檢查；<br>* 任一重大風險成立就停止。",
    details: [
      "issue 規劃沒完 不敢睡",
      "事情太好 捨不得放棄",
      "是否傷害健康或基本生活？",
      "維護成本是否高於長期收益？",
      "是否擠壓更重要且不可逆的選擇？",
      "事情太好 捨不得放棄",
      "塞車 沒車位 沒辦法平躺 水廁",
      "頭痛就要停，maybe 脹氣的影響",
    ],
  },

  // 老婆花掉你一半以上的資產，小孩再花掉一半以上的資產，剩下的只有還到死的負債。一個男生，要活得很好，把爸媽照顧好，很簡單，...........但加上老婆小孩，基本上，注定負債一輩子。

  {
    id: "system",
    navTitle: "* 人腦記憶(印象 補腦)",
    title: "記憶&靈感 仍然是重要技能",
    subtitle: "System",
    icon: "memory",
    color: "deep-purple",
    summary:
      "🧠 記憶仍然是重要技能 \ 比 GPT 快 & 還有 30y 的身體連結。<br>* 系統負責保存脈絡、連結與決策理由，人只需要專注在目前這一步。<br>* 把記憶放進可回看的系統",
    details: [
      "所有入口集中到一個索引。",
      "每個專案保留狀態、下一步與最近決策。",
      "定期整理，不要求一次完成。",
      "只要一點文字 影像 joey 就很可能想起來。",
      "GPT is good \ joey 有投錢。",
      "sys 最好能解決人腦的疑問， 不然快刀亂麻損失會比較多。",
    ],
  },
];

export const testActions = [
  {
    title: "⏱先做10分鐘測試",
    description: "適合資訊不足、需要先看結果再決定的情況。",
  },
  {
    title: "⚔ 快刀亂麻，直接完成",
    description:
      "適合風險低、方向清楚，而且拖延成本較高的情況。just do it 突破 <br>* 水／廁所：5mins 可到 \\ 人不多、有位置 \\ 就 GO。 ",
  },
];
