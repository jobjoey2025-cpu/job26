export function createChecklistSections() {
  return [
  {
    id: "cognition",
    title: "認知",
    icon: "psychology",
    color: "deep-purple",
    items: [
      { id: "c1", text: "目前範圍是否已經超過一頁？", checked: false },
      { id: "c2", text: "GDS 是否維持 One Page View？", checked: false },
      { id: "c3", text: "卡住是能力不足，還是資訊過載？", checked: false },
    ],
  },
  {
    id: "field",
    title: "現場",
    icon: "location_on",
    color: "blue",
    items: [
      {
        id: "f1",
        text: "這件事是否必須親自、現場或立即處理？",
        checked: false,
      },
      { id: "f2", text: "是否已定義觸發條件與一小時檢查點？", checked: false },
    ],
  },
  {
    id: "tools",
    title: "工具",
    icon: "build",
    color: "orange",
    items: [
      { id: "t1", text: "TD6 是否只顯示目前需要的資訊？", checked: false },
      { id: "t2", text: "GDS 是否維持單一入口與一頁視圖？", checked: false },
      { id: "t3", text: "AI 的時間與 Token 成本是否值得？", checked: false },
    ],
  },
  {
    id: "learning",
    title: "學習",
    icon: "school",
    color: "green",
    items: [
      { id: "l1", text: "這次結果能否整理成可重複的 SOP？", checked: false },
      { id: "l2", text: "是否已留下決策理由與下次入口？", checked: false },
      { id: "l3", text: "資訊密度是否足以支持下一個判斷？", checked: false },
    ],
  },
  {
    id: "roi",
    title: "ROI",
    icon: "payments",
    color: "red",
    items: [
      { id: "r1", text: "三個月後，這件事仍會產生價值嗎？", checked: false },
      { id: "r2", text: "維護成本是否低於預期收益？", checked: false },
      { id: "r3", text: "是否能先做更小、可逆的實驗？", checked: false },
      {
        id: "r4",
        text: "成果與素材是否已保存到可搜尋的位置？",
        checked: false,
      },
    ],
  },
  ];
}
