export const energyLevels = [
  {
    level: 1,
    title: "生存",
    description:
      "*最差裝況 \\ 生病醫院專心求生 other NG \\ 安全、補水、進食、睡眠與基本移動。\\ A4 paper + printer",
    color: "red-8",
  },
  {
    level: 2,
    title: "恢復",
    description:
      "*狀況不好 \\ relax TV TD6 wait 好轉睡好 \\ 休息、散步、低刺激活動與環境整理。",
    color: "orange-8",
  },
  {
    level: 3,
    title: "緊急",
    description:
      "*緊急處理 \\ team work，財產 旅行機會 \\ 處理有時限、會快速擴大的必要事項。\\ GKeep NB GDS",
    color: "amber-8",
  },
  {
    level: 4,
    title: "學習",
    description:
      "* 104 work 這個會很硬 學很多。\\ 為了飛行保養廠 GoPro ready \\ GKeep \\ NB GDS \\ 練習技能、整理 SOP 與吸收關鍵知識。",
    color: "light-green-8",
  },
  {
    level: 5,
    title: "興趣",
    description:
      "* ez hobby \\ pic video 球賽...hobby hobby hobby wait hobby money \\ 影像、創作、遊戲或其他能補充動力的活動。\\ cellPhone Firebase Quasar",
    color: "teal-7",
  },
  {
    level: 6,
    title: "創造價值",
    description:
      "* 賺錢 開發 \\ 認知 處理 watch 3DP，ez go life limit \\ 高判斷、高創造、可累積長期成果的工作。\\ NB GDS VSC",
    color: "deep-purple-7",
  },
];

export function createVisibilityItems() {
  return [
    {
      id: "function",
      title: "Function",
      description: "長期負責的功能或責任範圍，用來判斷投入的理由。",
      done: false,
    },
    {
      id: "project",
      title: "Project",
      description: "有清楚完成條件的階段性成果。",
      done: false,
    },
    {
      id: "task",
      title: "Task",
      description: "下一個可以直接執行、最好能在單次工作時段完成的動作。",
      done: false,
    },
    {
      id: "list",
      title: "List",
      description: "提醒、參考與待分類項目；不讓它們混入當下的下一步。",
      done: false,
    },
  ];
}
