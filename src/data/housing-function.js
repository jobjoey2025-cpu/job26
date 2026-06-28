export default [
  {
    "id": "house",
    "label": "住宅",
    "children": [
      {
        "id": "core",
        "label": "核心目的",
        "children": [
          { "id": "core-survival", "label": "生存", "description": "提供基本居住條件" },
          { "id": "core-recovery", "label": "恢復", "description": "恢復體力與精神" },
          { "id": "core-protection", "label": "保護", "description": "保護人身與財產安全" },
          { "id": "core-social", "label": "社交", "description": "支援家庭與朋友交流" },
          { "id": "core-growth", "label": "成長", "description": "提供學習、工作與自我提升" }
        ]
      },

      {
        "id": "system",
        "label": "功能系統",
        "children": [
          {
            "id": "sleep",
            "label": "睡眠系統",
            "goal": "恢復體力",
            "children": [
              { "id": "sleep-bed", "label": "床" },
              { "id": "sleep-mattress", "label": "床墊" },
              { "id": "sleep-pillow", "label": "枕頭" },
              { "id": "sleep-ac", "label": "冷氣" },
              { "id": "sleep-heater", "label": "暖氣" },
              { "id": "sleep-shade", "label": "遮光" },
              { "id": "sleep-sound", "label": "隔音" },
              { "id": "sleep-vent", "label": "換氣" },
              { "id": "sleep-climate", "label": "溫濕度控制" }
            ]
          },

          {
            "id": "food",
            "label": "飲食系統",
            "goal": "烹飪與用餐",
            "children": [
              { "id": "food-kitchen", "label": "廚房" },
              { "id": "food-sink", "label": "流理台" },
              { "id": "food-gas", "label": "瓦斯爐" },
              { "id": "food-ih", "label": "IH爐" },
              { "id": "food-fridge", "label": "冰箱" },
              { "id": "food-table", "label": "餐桌" },
              { "id": "food-storage", "label": "食品儲藏" }
            ]
          },

          {
            "id": "hygiene",
            "label": "衛生系統",
            "goal": "保持人體清潔",
            "children": [
              { "id": "hyg-sink", "label": "洗手台" },
              { "id": "hyg-toilet", "label": "馬桶" },
              { "id": "hyg-shower", "label": "淋浴" },
              { "id": "hyg-bath", "label": "浴缸" },
              { "id": "hyg-wash", "label": "洗衣機" },
              { "id": "hyg-dryer", "label": "烘衣機" },
              { "id": "hyg-dry", "label": "曬衣區" }
            ]
          },

          {
            "id": "protection",
            "label": "保護系統",
            "goal": "保護居住者",
            "children": [
              { "id": "pro-door", "label": "大門" },
              { "id": "pro-lock", "label": "門鎖" },
              { "id": "pro-cam", "label": "監視器" },
              { "id": "pro-fire", "label": "防火" },
              { "id": "pro-water", "label": "防水" },
              { "id": "pro-mosquito", "label": "防蚊" },
              { "id": "pro-wind", "label": "防風" },
              { "id": "pro-sun", "label": "防曬" },
              { "id": "pro-thermal", "label": "保溫" }
            ]
          },

          {
            "id": "storage",
            "label": "收納系統",
            "goal": "有效管理物品",
            "children": [
              { "id": "st-clothes", "label": "衣物" },
              { "id": "st-tools", "label": "工具" },
              { "id": "st-food", "label": "食品" },
              { "id": "st-doc", "label": "文件" },
              { "id": "st-consumable", "label": "耗材" },
              { "id": "st-device", "label": "設備" },
              { "id": "st-camping", "label": "露營用品" }
            ]
          },

          {
            "id": "work",
            "label": "工作系統",
            "goal": "支援工作與創作",
            "children": [
              { "id": "wk-desk", "label": "書桌" },
              { "id": "wk-chair", "label": "人體工學椅" },
              { "id": "wk-pc", "label": "電腦" },
              { "id": "wk-cad", "label": "CAD工作站" },
              { "id": "wk-ai", "label": "AI工作站" },
              { "id": "wk-gpu", "label": "GPU伺服器" },
              { "id": "wk-net", "label": "網路" },
              { "id": "wk-printer", "label": "印表機" }
            ]
          },

          {
            "id": "social",
            "label": "社交系統",
            "goal": "交流與接待",
            "children": [
              { "id": "so-living", "label": "客廳" },
              { "id": "so-sofa", "label": "沙發" },
              { "id": "so-table", "label": "茶几" },
              { "id": "so-dining", "label": "餐桌" },
              { "id": "so-visit", "label": "訪客區" }
            ]
          },

          {
            "id": "entertainment",
            "label": "娛樂系統",
            "goal": "休閒放鬆",
            "children": [
              { "id": "en-tv", "label": "電視" },
              { "id": "en-projector", "label": "投影機" },
              { "id": "en-audio", "label": "音響" },
              { "id": "en-game", "label": "遊戲機" },
              { "id": "en-vr", "label": "VR" },
              { "id": "en-read", "label": "閱讀區" }
            ]
          }
        ]
      },

      {
        "id": "infra",
        "label": "基礎設施",
        "children": [
          { "id": "infra-power", "label": "供電系統" },
          { "id": "infra-water", "label": "供水系統" },
          { "id": "infra-drain", "label": "排水系統" },
          { "id": "infra-ac", "label": "空調系統" },
          { "id": "infra-light", "label": "照明系統" },
          { "id": "infra-net", "label": "網路系統" },
          { "id": "infra-fire", "label": "消防系統" },
          { "id": "infra-trash", "label": "垃圾處理" }
        ]
      },

      {
        "id": "space",
        "label": "空間組織",
        "children": [
          {
            "id": "sp-bedroom",
            "label": "臥室",
            "supports": ["睡眠系統"]
          },
          {
            "id": "sp-kitchen",
            "label": "廚房",
            "supports": ["飲食系統"]
          },
          {
            "id": "sp-bathroom",
            "label": "浴室",
            "supports": ["衛生系統"]
          },
          {
            "id": "sp-studio",
            "label": "工作室",
            "supports": ["工作系統"]
          },
          {
            "id": "sp-living",
            "label": "客廳",
            "supports": ["社交系統", "娛樂系統"]
          }
        ]
      },

      {
        "id": "flow",
        "label": "使用流程",
        "children": [
          {
            "id": "flow-home",
            "label": "回家流程",
            "children": [
              { "id": "f1", "label": "回家" },
              { "id": "f2", "label": "脫鞋" },
              { "id": "f3", "label": "洗手" },
              { "id": "f4", "label": "換衣服" },
              { "id": "f5", "label": "晚餐" },
              { "id": "f6", "label": "洗澡" },
              { "id": "f7", "label": "睡覺" }
            ]
          },

          {
            "id": "flow-workday",
            "label": "工作日流程",
            "children": [
              { "id": "w1", "label": "起床" },
              { "id": "w2", "label": "刷牙" },
              { "id": "w3", "label": "早餐" },
              { "id": "w4", "label": "工作" },
              { "id": "w5", "label": "休息" },
              { "id": "w6", "label": "晚餐" },
              { "id": "w7", "label": "睡眠" }
            ]
          }
        ]
      },

      {
        "id": "camping",
        "label": "露營宅擴充",
        "children": [
          {
            "id": "camp-env",
            "label": "環境保護",
            "children": [
              { "id": "c1", "label": "防雨" },
              { "id": "c2", "label": "防風" },
              { "id": "c3", "label": "防蚊" },
              { "id": "c4", "label": "防潮" },
              { "id": "c5", "label": "保溫" }
            ]
          },

          {
            "id": "camp-comfort",
            "label": "舒適系統",
            "children": [
              { "id": "c6", "label": "帳篷冷氣" },
              { "id": "c7", "label": "柴爐" },
              { "id": "c8", "label": "睡眠艙" }
            ]
          },

          {
            "id": "camp-work",
            "label": "工作系統",
            "children": [
              { "id": "c9", "label": "CAD" },
              { "id": "c10", "label": "AI" },
              { "id": "c11", "label": "GPU" },
              { "id": "c12", "label": "高速網路" }
            ]
          },

          {
            "id": "camp-module",
            "label": "模組化",
            "children": [
              { "id": "c13", "label": "快速組裝" },
              { "id": "c14", "label": "快速拆卸" },
              { "id": "c15", "label": "可替換模組" },
              { "id": "c16", "label": "低成本維護" }
            ]
          }
        ]
      }
    ]
  }
];