(function () {
  "use strict";

  // Offline catalog snapshot. No runtime network requests; dates below identify sources, not inferred deployments.
  var products = [
    {
      "id": "bolt",
      "name": "Bolt",
      "aliases": [],
      "objectType": "product",
      "category": "tactical-strike",
      "type": "便携垂直起降侦察航空器",
      "positioning": "便携垂直起降侦察航空器",
      "summary": "Bolt 是 Bolt 家族的基础型，公开定位为便携侦察、监视与搜救；与弹药型 Bolt-M 分开归档。",
      "firstPublicDate": "2024-10-10",
      "developer": "Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "侦察与搜救",
        "垂直起降"
      ],
      "functions": [
        {
          "title": "侦察与搜救",
          "description": "基础配置用于观察和搜救任务。",
          "sourceId": "pc-source-bolt"
        },
        {
          "title": "垂直起降",
          "description": "采用便携式 VTOL 平台形态。",
          "sourceId": "pc-source-bolt"
        }
      ],
      "applications": [
        "侦察监视",
        "搜索救援"
      ],
      "parameters": [
        {
          "name": "起降方式",
          "value": "VTOL",
          "note": "系列级公开描述",
          "sourceId": "pc-source-bolt",
          "source": "Anduril Unveils Bolt & Bolt-M"
        },
        {
          "name": "基础型量化性能",
          "value": "未核验",
          "note": "发布稿中的 Bolt-M 数值不归入基础型",
          "sourceId": "pc-source-bolt",
          "source": "Anduril Unveils Bolt & Bolt-M"
        }
      ],
      "timeline": [
        {
          "date": "2024-10-10",
          "title": "Bolt 家族发布",
          "summary": "官方发布稿同时区分 Bolt 与 Bolt-M。",
          "sourceId": "pc-source-bolt"
        }
      ],
      "relations": [
        {
          "targetId": "bolt-m",
          "type": "同系列改型",
          "description": "Bolt-M 是同一家族的弹药改型。",
          "sourceId": "pc-source-bolt"
        },
        {
          "targetId": "lattice",
          "type": "软件关联",
          "description": "发布稿说明 Bolt 家族通过 Lattice 共享数据。",
          "sourceId": "pc-source-bolt"
        }
      ],
      "relatedObjects": [
        "Bolt-M",
        "Lattice"
      ],
      "image": null,
      "sourceIds": [
        "pc-source-bolt"
      ],
      "evidenceIds": [
        "pc-evidence-bolt-bolt"
      ],
      "scopeNote": "2024 发布稿同时介绍两个型号，Bolt-M 的续航、航程及弹药载荷不能套用给 Bolt。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验"
    },
    {
      "id": "bolt-m",
      "name": "Bolt-M",
      "aliases": [],
      "objectType": "product",
      "category": "tactical-strike",
      "type": "便携垂直起降巡飞弹",
      "positioning": "便携垂直起降巡飞弹",
      "summary": "Bolt-M 是 Bolt 的弹药改型，机载软件承担飞行自动化；目录只记录产品定位与公开人机分工。",
      "firstPublicDate": "2024-10-10",
      "developer": "Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "飞行自动化",
        "人工决策"
      ],
      "functions": [
        {
          "title": "飞行自动化",
          "description": "公开稿描述自主航点飞行与对象跟踪。",
          "sourceId": "pc-source-bolt"
        },
        {
          "title": "人工决策",
          "description": "厂商说明操作人员保留关键使用决策。",
          "sourceId": "pc-source-bolt"
        }
      ],
      "applications": [
        "战术任务效应"
      ],
      "parameters": [
        {
          "name": "平台形态",
          "value": "便携 VTOL",
          "note": "弹药改型",
          "sourceId": "pc-source-bolt",
          "source": "Anduril Unveils Bolt & Bolt-M"
        },
        {
          "name": "控制平台",
          "value": "Lattice 战术版本",
          "note": "发布稿明确关联",
          "sourceId": "pc-source-bolt",
          "source": "Anduril Unveils Bolt & Bolt-M"
        }
      ],
      "timeline": [
        {
          "date": "2024-10-10",
          "title": "Bolt-M 发布",
          "summary": "与 Bolt 同批发布，明确为弹药改型。",
          "sourceId": "pc-source-bolt"
        }
      ],
      "relations": [
        {
          "targetId": "bolt",
          "type": "同系列基础型",
          "description": "Bolt 提供系列基础平台。",
          "sourceId": "pc-source-bolt"
        },
        {
          "targetId": "lattice",
          "type": "软件关联",
          "description": "使用战术版 Lattice 控制和共享数据。",
          "sourceId": "pc-source-bolt"
        }
      ],
      "relatedObjects": [
        "Bolt",
        "Lattice"
      ],
      "image": null,
      "sourceIds": [
        "pc-source-bolt"
      ],
      "evidenceIds": [
        "pc-evidence-bolt-m-bolt"
      ],
      "scopeNote": "与基础侦察型 Bolt 区分；公开能力为厂商描述，未独立验证实际任务表现。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验"
    },
    {
      "id": "altius",
      "name": "Altius",
      "aliases": [
        "ALTIUS"
      ],
      "objectType": "product",
      "category": "tactical-strike",
      "type": "管式发射自主航空器家族",
      "positioning": "管式发射自主航空器家族",
      "summary": "ALTIUS 由 Area-I 发展，2021 年随收购进入 Anduril；家族面向可换载荷与多平台部署。",
      "firstPublicDate": "",
      "developer": "Area-I / Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "载荷模块化",
        "多平台部署",
        "协同演示"
      ],
      "functions": [
        {
          "title": "载荷模块化",
          "description": "公开稿介绍按任务配置传感器与载荷。",
          "sourceId": "pc-source-altius"
        },
        {
          "title": "多平台部署",
          "description": "管式发射设计适配不同载体。",
          "sourceId": "pc-source-altius"
        },
        {
          "title": "协同演示",
          "description": "2022 年以 ALTIUS-600 演示多机协作。",
          "sourceId": "pc-source-altius"
        }
      ],
      "applications": [
        "分布式感知",
        "自主协作研究"
      ],
      "parameters": [
        {
          "name": "条目层级",
          "value": "产品家族",
          "note": "含多个具体型号",
          "sourceId": "pc-source-altius",
          "source": "ALTIUS Air Launched Effects Demonstrated Advanced Teaming at US Army Project Edge 2022"
        },
        {
          "name": "统一性能表",
          "value": "不适用",
          "note": "应按具体子型号查询",
          "sourceId": "pc-source-altius",
          "source": "ALTIUS Air Launched Effects Demonstrated Advanced Teaming at US Army Project Edge 2022"
        }
      ],
      "timeline": [
        {
          "date": "2021-04-01",
          "title": "Area-I 收购公告",
          "summary": "ALTIUS 纳入 Anduril 产品组合。",
          "sourceId": "pc-source-altius-origin"
        },
        {
          "date": "2022-05-19",
          "title": "EDGE22 协作演示",
          "summary": "官方报道 ALTIUS-600 协同演示。",
          "sourceId": "pc-source-altius"
        }
      ],
      "relations": [
        {
          "targetId": "altius-m",
          "type": "型号分组",
          "description": "M 型在本目录单列为聚合条目。",
          "sourceId": "pc-source-altius-m"
        }
      ],
      "relatedObjects": [
        "Altius-M"
      ],
      "image": null,
      "sourceIds": [
        "pc-source-altius",
        "pc-source-altius-origin",
        "pc-source-altius-m"
      ],
      "evidenceIds": [
        "pc-evidence-altius-altius",
        "pc-evidence-altius-altius-origin",
        "pc-evidence-altius-altius-m"
      ],
      "scopeNote": "本条是家族对象，不把 600、700、600M 或 700M 的性能混为统一参数。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验"
    },
    {
      "id": "ghost",
      "name": "Ghost",
      "aliases": [],
      "objectType": "product",
      "category": "tactical-strike",
      "type": "模块化自主侦察无人机",
      "positioning": "模块化自主侦察无人机",
      "summary": "Ghost 面向侦察、安保与防护，使用 Lattice 自动化任务规划和飞行管理；Ghost-X 是该平台的后续改型。",
      "firstPublicDate": "",
      "developer": "Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "任务自动化",
        "通用载荷接口",
        "开放自主软件"
      ],
      "functions": [
        {
          "title": "任务自动化",
          "description": "Lattice 支持规划、空域管理和飞行操作。",
          "sourceId": "pc-source-ghost"
        },
        {
          "title": "通用载荷接口",
          "description": "可集成传感器、通信与导航模块。",
          "sourceId": "pc-source-ghost"
        },
        {
          "title": "开放自主软件",
          "description": "2023 年空军合作面向政府软件的修改与集成。",
          "sourceId": "pc-source-ghost"
        }
      ],
      "applications": [
        "侦察监视",
        "安保",
        "区域防护"
      ],
      "parameters": [
        {
          "name": "载荷接口",
          "value": "模块化通用接口",
          "note": "官方公告定性说明",
          "sourceId": "pc-source-ghost",
          "source": "U.S. Air Force Selects Anduril’s Ghost and Ghost-X to Enhance Autonomy Capabilities"
        },
        {
          "name": "基础型续航/重量",
          "value": "未核验",
          "note": "未将 X 型参数作为基础型参数",
          "sourceId": "pc-source-ghost",
          "source": "U.S. Air Force Selects Anduril’s Ghost and Ghost-X to Enhance Autonomy Capabilities"
        }
      ],
      "timeline": [
        {
          "date": "2023-09-29",
          "title": "空军自主能力合同公布",
          "summary": "公告同时涵盖 Ghost 与 Ghost-X，研发内容含开放架构软件集成。",
          "sourceId": "pc-source-ghost"
        }
      ],
      "relations": [
        {
          "targetId": "ghost-x",
          "type": "后续改型",
          "description": "官方将 Ghost-X 定义为 Ghost 新改型。",
          "sourceId": "pc-source-ghost"
        },
        {
          "targetId": "lattice",
          "type": "软件关联",
          "description": "Ghost 以 Lattice 支持规划和飞行管理。",
          "sourceId": "pc-source-ghost"
        }
      ],
      "relatedObjects": [
        "Ghost-X",
        "Lattice"
      ],
      "image": {
        "path": "../../modules/product-catalog/assets/ghost.png",
        "sourceName": "Anduril Ghost 官方页面公开图像",
        "sourceUrl": "https://www.anduril.com/ghost/"
      },
      "sourceIds": [
        "pc-source-ghost"
      ],
      "evidenceIds": [
        "pc-evidence-ghost-ghost"
      ],
      "scopeNote": "Ghost 基础型与 Ghost-X 独立展示。80 分钟等 X 型规格不转移至基础型；此处不宣称具体战果。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验"
    },
    {
      "id": "ghost-x",
      "name": "Ghost-X",
      "aliases": [
        "Ghost X"
      ],
      "objectType": "product",
      "category": "tactical-strike",
      "type": "Ghost 系列增强型自主无人机",
      "positioning": "Ghost 系列增强型自主无人机",
      "summary": "Ghost-X 延续 Ghost 的模块化架构，并增强推进、通信与双电池配置；官方页提供独立规格，另有 Mesh 演习集成记录。",
      "firstPublicDate": "",
      "developer": "Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "多载荷配置",
        "可替换模块",
        "增强飞行配置",
        "数据网络演示"
      ],
      "functions": [
        {
          "title": "多载荷配置",
          "description": "可在同一平台安装多种载荷与传感器。",
          "sourceId": "pc-source-ghost-x"
        },
        {
          "title": "可替换模块",
          "description": "标准导轨及可换载荷支持能力更新。",
          "sourceId": "pc-source-ghost-x"
        },
        {
          "title": "增强飞行配置",
          "description": "官方说明推进、通信和双电池配置升级。",
          "sourceId": "pc-source-ghost-x"
        },
        {
          "title": "数据网络演示",
          "description": "2025 年演习报道确认通过 Mesh 共享视频。",
          "sourceId": "pc-source-ghost-mesh"
        }
      ],
      "applications": [
        "侦察监视",
        "多传感器集成",
        "分布式数据共享演示"
      ],
      "parameters": [
        {
          "name": "巡航续航",
          "value": "80 分钟",
          "note": "官方页标注 cruise",
          "sourceId": "pc-source-ghost-x",
          "source": "Ghost-X — Anduril Armory"
        },
        {
          "name": "范围",
          "value": "25 km",
          "note": "原文 Range；不解释为特定任务半径",
          "sourceId": "pc-source-ghost-x",
          "source": "Ghost-X — Anduril Armory"
        },
        {
          "name": "有效载荷",
          "value": "11 kg（25 lb）",
          "note": "按官方公制标注",
          "sourceId": "pc-source-ghost-x",
          "source": "Ghost-X — Anduril Armory"
        },
        {
          "name": "双电池重量",
          "value": "25 kg（55 lb）",
          "note": "官方页 Weight (Dual Batteries)",
          "sourceId": "pc-source-ghost-x",
          "source": "Ghost-X — Anduril Armory"
        }
      ],
      "timeline": [
        {
          "date": "2023-09-29",
          "title": "增强自主能力合同",
          "summary": "空军合同公告确认 Ghost-X 改型及开放软件方向。",
          "sourceId": "pc-source-ghost"
        },
        {
          "date": "2025-11-19",
          "title": "Ivy Sting 2 集成报道",
          "summary": "企业报道 Ghost-X 经 Lattice Mesh 向 NGC2 提供视频。",
          "sourceId": "pc-source-ghost-mesh"
        }
      ],
      "relations": [
        {
          "targetId": "ghost",
          "type": "系列基础型",
          "description": "Ghost-X 是 Ghost 平台改型。",
          "sourceId": "pc-source-ghost"
        },
        {
          "targetId": "lattice-mesh",
          "type": "演示集成",
          "description": "Ivy Sting 2 展示视频数据经 Mesh 共享。",
          "sourceId": "pc-source-ghost-mesh"
        },
        {
          "targetId": "lattice",
          "type": "软件关联",
          "description": "自主能力合作公告说明系列的软件平台。",
          "sourceId": "pc-source-ghost"
        }
      ],
      "relatedObjects": [
        "Ghost",
        "Lattice Mesh",
        "Lattice"
      ],
      "image": {
        "path": "../../modules/product-catalog/assets/ghost-x.jpeg",
        "sourceName": "原项目研究报告配图（不用于型号参数证明）",
        "sourceUrl": ""
      },
      "sourceIds": [
        "pc-source-ghost-x",
        "pc-source-ghost",
        "pc-source-ghost-mesh"
      ],
      "evidenceIds": [
        "pc-evidence-ghost-x-ghost-x",
        "pc-evidence-ghost-x-ghost",
        "pc-evidence-ghost-x-ghost-mesh"
      ],
      "scopeNote": "规格取自 Ghost-X 官方 Armory 页，为厂商标称值，工况与载荷影响未独立测试。演习报道只证明该实例，不能证明所有配置已常态部署。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验"
    },
    {
      "id": "barracuda",
      "name": "Barracuda",
      "aliases": [],
      "objectType": "product",
      "category": "air-dominance",
      "type": "吸气式自主航空器家族",
      "positioning": "吸气式自主航空器家族",
      "summary": "Barracuda 是以规模生产为设计目标的吸气式自主航空器家族，包含任务效应改型；本条按家族层级展示。",
      "firstPublicDate": "",
      "developer": "Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "家族化平台",
        "规模生产设计",
        "改型发展"
      ],
      "functions": [
        {
          "title": "家族化平台",
          "description": "官方将其归入空中优势与打击体系。",
          "sourceId": "pc-source-barracuda"
        },
        {
          "title": "规模生产设计",
          "description": "企业强调可制造性和量产扩展。",
          "sourceId": "pc-source-barracuda"
        },
        {
          "title": "改型发展",
          "description": "2026 年公告披露地面发射 500M 生产框架协议。",
          "sourceId": "pc-source-barracuda-production"
        }
      ],
      "applications": [
        "自主航空任务",
        "任务效应载荷"
      ],
      "parameters": [
        {
          "name": "动力类别",
          "value": "吸气式",
          "note": "家族级描述",
          "sourceId": "pc-source-barracuda",
          "source": "Air Dominance & Strike"
        },
        {
          "name": "统一航程/载荷",
          "value": "不适用",
          "note": "按具体改型核验",
          "sourceId": "pc-source-barracuda",
          "source": "Air Dominance & Strike"
        }
      ],
      "timeline": [
        {
          "date": "2026-05-13",
          "title": "地面发射 500M 生产协议公告",
          "summary": "企业披露框架协议，计划 2027 年上半年开始交付。",
          "sourceId": "pc-source-barracuda-production"
        }
      ],
      "relations": [
        {
          "targetId": "fury",
          "type": "同领域产品",
          "description": "官方空中体系页并列两个产品，非派生关系。",
          "sourceId": "pc-source-barracuda"
        }
      ],
      "relatedObjects": [
        "Fury"
      ],
      "image": {
        "path": "../../modules/product-catalog/assets/barracuda.png",
        "sourceName": "Anduril 官方公开图像",
        "sourceUrl": "https://www.anduril.com/barracuda/"
      },
      "sourceIds": [
        "pc-source-barracuda",
        "pc-source-barracuda-production"
      ],
      "evidenceIds": [
        "pc-evidence-barracuda-barracuda",
        "pc-evidence-barracuda-barracuda-production"
      ],
      "scopeNote": "各尺寸和发射构型不同，不提供统一航程或载荷。2027 首批交付是公告计划，不记为已交付。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验"
    },
    {
      "id": "fury",
      "name": "Fury",
      "aliases": [],
      "objectType": "product",
      "category": "air-dominance",
      "type": "高性能多任务自主航空器",
      "positioning": "高性能多任务自主航空器",
      "summary": "Fury 是官方空中体系中的高性能多任务航空器；公开设计采用商业现成喷气发动机，并涵盖仿真和训练方向。",
      "firstPublicDate": "",
      "developer": "Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "自主航空任务",
        "商业发动机路线",
        "训练与仿真"
      ],
      "functions": [
        {
          "title": "自主航空任务",
          "description": "官方明确高性能、多任务定位。",
          "sourceId": "pc-source-barracuda"
        },
        {
          "title": "商业发动机路线",
          "description": "产品页说明采用现成喷气发动机。",
          "sourceId": "pc-source-fury"
        },
        {
          "title": "训练与仿真",
          "description": "产品页涉及机载智能飞行仿真。",
          "sourceId": "pc-source-fury"
        }
      ],
      "applications": [
        "自主航空任务",
        "空中训练与仿真"
      ],
      "parameters": [
        {
          "name": "动力类别",
          "value": "喷气式",
          "note": "官方页面设计说明",
          "sourceId": "pc-source-fury",
          "source": "Fury"
        },
        {
          "name": "统一速度/载荷",
          "value": "未核验",
          "note": "具体配置与试验批次需单独来源",
          "sourceId": "pc-source-fury",
          "source": "Fury"
        }
      ],
      "timeline": [],
      "relations": [
        {
          "targetId": "barracuda",
          "type": "同领域产品",
          "description": "两者在官方空中体系页并列。",
          "sourceId": "pc-source-barracuda"
        }
      ],
      "relatedObjects": [
        "Barracuda"
      ],
      "image": {
        "path": "../../modules/product-catalog/assets/fury.png",
        "sourceName": "Anduril 官方公开图像",
        "sourceUrl": "https://www.anduril.com/fury/"
      },
      "sourceIds": [
        "pc-source-fury",
        "pc-source-barracuda"
      ],
      "evidenceIds": [
        "pc-evidence-fury-fury",
        "pc-evidence-fury-barracuda"
      ],
      "scopeNote": "本条为 Fury 产品档案；不把不同研制批次、CCA 试验机或其他航空器的参数混用。未找到证据支持 Fury 与 Omen 为改型关系。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验",
      "timelineNote": "当前可读取资料为无发布日期的产品介绍；首次公开时间及独立发展节点未核验，不以本次核验日期冒充首发日期。"
    },
    {
      "id": "omen",
      "name": "Omen",
      "aliases": [],
      "objectType": "product",
      "category": "air-mobility",
      "type": "悬停转巡航自主航空器",
      "positioning": "悬停转巡航自主航空器",
      "summary": "Omen 是 Anduril 与 EDGE 公告合作开发的无跑道 Group 3 飞行器，面向海上监视、补给和通信等用途。",
      "firstPublicDate": "2025-11-13",
      "developer": "Anduril Industries / EDGE Group",
      "publicStatus": "已公布联合开发计划",
      "capabilities": [
        "无跑道起降",
        "模块化任务",
        "任务自主软件"
      ],
      "functions": [
        {
          "title": "无跑道起降",
          "description": "公告定义为 hover-to-cruise 航空器。",
          "sourceId": "pc-source-omen"
        },
        {
          "title": "模块化任务",
          "description": "公开规划包括监视、补给与通信中继。",
          "sourceId": "pc-source-omen"
        },
        {
          "title": "任务自主软件",
          "description": "公告说明使用 Lattice for Mission Autonomy。",
          "sourceId": "pc-source-omen"
        }
      ],
      "applications": [
        "海上监视",
        "物流补给",
        "通信中继",
        "救灾通信"
      ],
      "parameters": [
        {
          "name": "公开分类",
          "value": "Group 3",
          "note": "企业公告分类",
          "sourceId": "pc-source-omen",
          "source": "EDGE Group and Anduril to Form UAE-US Joint Venture to Develop Autonomous Systems"
        },
        {
          "name": "起降形态",
          "value": "无跑道；悬停转巡航",
          "note": "设计定位",
          "sourceId": "pc-source-omen",
          "source": "EDGE Group and Anduril to Form UAE-US Joint Venture to Develop Autonomous Systems"
        }
      ],
      "timeline": [
        {
          "date": "2025-11-13",
          "title": "联合开发计划公布",
          "summary": "EDGE 与 Anduril 公布 Omen 合作及首批采购安排。",
          "sourceId": "pc-source-omen"
        }
      ],
      "relations": [
        {
          "targetId": "mission-autonomy",
          "type": "计划软件集成",
          "description": "公告称将使用 Lattice for Mission Autonomy。",
          "sourceId": "pc-source-omen"
        }
      ],
      "relatedObjects": [
        "Mission Autonomy"
      ],
      "image": null,
      "sourceIds": [
        "pc-source-omen"
      ],
      "evidenceIds": [
        "pc-evidence-omen-omen"
      ],
      "scopeNote": "来源为联合开发公告，2028 年底全面生产属于计划。暂无本次可核验的统一航程、载荷或量产完成证据；Omen 不是 Fury 改型。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验"
    },
    {
      "id": "sentry",
      "name": "Sentry",
      "aliases": [],
      "objectType": "product",
      "category": "ground-protection",
      "type": "自主监视塔家族",
      "positioning": "自主监视塔家族",
      "summary": "Sentry 使用边缘传感器融合和人工智能探测、分类、跟踪对象；标准型与增程型等配置具有不同覆盖能力。",
      "firstPublicDate": "",
      "developer": "Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "边缘感知",
        "昼夜监视",
        "模块化配置"
      ],
      "functions": [
        {
          "title": "边缘感知",
          "description": "标准型在本地处理传感器数据。",
          "sourceId": "pc-source-sentry"
        },
        {
          "title": "昼夜监视",
          "description": "标准型公开定位包括地面对象昼夜观察。",
          "sourceId": "pc-source-sentry"
        },
        {
          "title": "模块化配置",
          "description": "可按任务配置传感器和供电。",
          "sourceId": "pc-source-sentry"
        }
      ],
      "applications": [
        "周界监控",
        "边境与区域感知"
      ],
      "parameters": [
        {
          "name": "产品层级",
          "value": "监视塔家族",
          "note": "包含不同塔体和传感器配置",
          "sourceId": "pc-source-sentry",
          "source": "Standard Range Sentry — Anduril Armory"
        },
        {
          "name": "数据处理",
          "value": "边缘融合",
          "note": "标准型公开说明",
          "sourceId": "pc-source-sentry",
          "source": "Standard Range Sentry — Anduril Armory"
        }
      ],
      "timeline": [],
      "relations": [],
      "relatedObjects": [],
      "image": {
        "path": "../../modules/product-catalog/assets/sentry.png",
        "sourceName": "Anduril 官方公开图像",
        "sourceUrl": "https://www.anduril.com/sentry/"
      },
      "sourceIds": [
        "pc-source-sentry",
        "pc-source-sentry-xr"
      ],
      "evidenceIds": [
        "pc-evidence-sentry-sentry",
        "pc-evidence-sentry-sentry-xr"
      ],
      "scopeNote": "此处是 Sentry 家族。标准型和增程型的塔高、范围不互换；未提供可跨地形、天气通用的探测效果保证。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验",
      "timelineNote": "当前可读取资料为无发布日期的产品介绍；首次公开时间及独立发展节点未核验，不以本次核验日期冒充首发日期。"
    },
    {
      "id": "pulsar",
      "name": "Pulsar",
      "aliases": [],
      "objectType": "product",
      "category": "ground-protection",
      "type": "软件定义电子战系统家族",
      "positioning": "软件定义电子战系统家族",
      "summary": "Pulsar 将软件定义无线电、边缘计算与机器学习结合，用于频谱感知等电子战任务，并提供多种部署形态。",
      "firstPublicDate": "",
      "developer": "Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "频谱感知",
        "软件更新",
        "分布式协同"
      ],
      "functions": [
        {
          "title": "频谱感知",
          "description": "公开能力包括信号发现、测向和定位。",
          "sourceId": "pc-source-pulsar"
        },
        {
          "title": "软件更新",
          "description": "通过边缘计算与算法更新适应信号变化。",
          "sourceId": "pc-source-pulsar"
        },
        {
          "title": "分布式协同",
          "description": "官方描述多个系统可联网协同。",
          "sourceId": "pc-source-pulsar"
        }
      ],
      "applications": [
        "电磁环境感知",
        "电子战支援"
      ],
      "parameters": [
        {
          "name": "技术组成",
          "value": "SDR、边缘计算与机器学习",
          "note": "官方定性说明",
          "sourceId": "pc-source-pulsar",
          "source": "Pulsar — Anduril Armory"
        },
        {
          "name": "配置形态",
          "value": "固定式及机动配置",
          "note": "家族级",
          "sourceId": "pc-source-pulsar",
          "source": "Pulsar — Anduril Armory"
        }
      ],
      "timeline": [],
      "relations": [],
      "relatedObjects": [],
      "image": {
        "path": "../../modules/product-catalog/assets/pulsar.png",
        "sourceName": "Anduril 官方公开图像",
        "sourceUrl": "https://www.anduril.com/pulsar/"
      },
      "sourceIds": [
        "pc-source-pulsar"
      ],
      "evidenceIds": [
        "pc-evidence-pulsar-pulsar"
      ],
      "scopeNote": "固定式、便携式、车载与机载配置不能共用一张重量和距离表；不记录未公开频率、波形或操作方法。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验",
      "timelineNote": "当前可读取资料为无发布日期的产品介绍；首次公开时间及独立发展节点未核验，不以本次核验日期冒充首发日期。"
    },
    {
      "id": "wisp",
      "name": "Wisp",
      "aliases": [
        "WISP",
        "Wide-Area Infrared Sensing with Persistence"
      ],
      "objectType": "product",
      "category": "ground-protection",
      "type": "被动红外成像传感器",
      "positioning": "被动红外成像传感器",
      "summary": "Wisp 使用被动红外成像进行持续目标检测与跟踪；其技术源自 Copious Imaging，不是未明确类型的通用地面系统。",
      "firstPublicDate": "",
      "developer": "Copious Imaging / Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "被动红外成像",
        "全向水平观察",
        "持续检测跟踪"
      ],
      "functions": [
        {
          "title": "被动红外成像",
          "description": "利用红外信号观测对象。",
          "sourceId": "pc-source-wisp"
        },
        {
          "title": "全向水平观察",
          "description": "产品页标注水平 360° 视场。",
          "sourceId": "pc-source-wisp"
        },
        {
          "title": "持续检测跟踪",
          "description": "面向安保、反无人机和海事感知。",
          "sourceId": "pc-source-wisp"
        }
      ],
      "applications": [
        "周界感知",
        "海事感知",
        "反无人机感知"
      ],
      "parameters": [
        {
          "name": "水平视场",
          "value": "360°",
          "note": "官方产品页",
          "sourceId": "pc-source-wisp",
          "source": "Wisp"
        },
        {
          "name": "垂直视场",
          "value": "125°",
          "note": "官方产品页",
          "sourceId": "pc-source-wisp",
          "source": "Wisp"
        },
        {
          "name": "感知类型",
          "value": "被动红外",
          "note": "不同于主动雷达",
          "sourceId": "pc-source-wisp",
          "source": "Wisp"
        }
      ],
      "timeline": [
        {
          "date": "2021-09-28",
          "title": "Copious Imaging 收购",
          "summary": "WISP 技术纳入 Anduril 产品体系。",
          "sourceId": "pc-source-wisp-origin"
        }
      ],
      "relations": [],
      "relatedObjects": [],
      "image": null,
      "sourceIds": [
        "pc-source-wisp",
        "pc-source-wisp-origin"
      ],
      "evidenceIds": [
        "pc-evidence-wisp-wisp",
        "pc-evidence-wisp-wisp-origin"
      ],
      "scopeNote": "不同官方页面的外形和探测距离存在配置差异，本条只保留一致的视场值，不把厂商抗干扰措辞写成绝对保证。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验"
    },
    {
      "id": "anvil",
      "name": "Anvil",
      "aliases": [],
      "objectType": "product",
      "category": "counter-uas",
      "type": "自主反无人机拦截航空器",
      "positioning": "自主反无人机拦截航空器",
      "summary": "Anvil 是地面发射的旋翼拦截平台，提供自主导航和视觉反馈，公开流程包含人工正面识别。",
      "firstPublicDate": "",
      "developer": "Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "自主导航",
        "视觉反馈",
        "系列差异"
      ],
      "functions": [
        {
          "title": "自主导航",
          "description": "Lattice 提供目标线索后平台执行自主飞行。",
          "sourceId": "pc-source-anvil"
        },
        {
          "title": "视觉反馈",
          "description": "向人员提供对象识别信息。",
          "sourceId": "pc-source-anvil"
        },
        {
          "title": "系列差异",
          "description": "基础型为动能拦截，M 型为弹药配置。",
          "sourceId": "pc-source-anvil"
        }
      ],
      "applications": [
        "反无人机防护"
      ],
      "parameters": [
        {
          "name": "基础型类别",
          "value": "动能拦截",
          "note": "与 M 型区分",
          "sourceId": "pc-source-anvil",
          "source": "Anvil"
        },
        {
          "name": "人员角色",
          "value": "正面识别与授权",
          "note": "官网公开描述",
          "sourceId": "pc-source-anvil",
          "source": "Anvil"
        }
      ],
      "timeline": [],
      "relations": [
        {
          "targetId": "anvil-m",
          "type": "弹药改型",
          "description": "同系列的 M 型以独立条目记录。",
          "sourceId": "pc-source-anvil-m"
        },
        {
          "targetId": "lattice",
          "type": "软件关联",
          "description": "发布公告说明与 Lattice 关联。",
          "sourceId": "pc-source-anvil-m"
        }
      ],
      "relatedObjects": [
        "Anvil-M",
        "Lattice"
      ],
      "image": null,
      "sourceIds": [
        "pc-source-anvil",
        "pc-source-anvil-m"
      ],
      "evidenceIds": [
        "pc-evidence-anvil-anvil",
        "pc-evidence-anvil-anvil-m"
      ],
      "scopeNote": "仅描述公开产品类型与人机分工；不将拦截宣传当作任何环境下有效性的保证。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验",
      "timelineNote": "当前可读取资料为无发布日期的产品介绍；首次公开时间及独立发展节点未核验，不以本次核验日期冒充首发日期。"
    },
    {
      "id": "anvil-m",
      "name": "Anvil-M",
      "aliases": [],
      "objectType": "product",
      "category": "counter-uas",
      "type": "Anvil 系列弹药拦截改型",
      "positioning": "Anvil 系列弹药拦截改型",
      "summary": "Anvil-M 于 2023 年公开，是 Anvil 的弹药改型，纳入 Anduril 反无人机系统组合。",
      "firstPublicDate": "2023-10-05",
      "developer": "Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "弹药改型",
        "体系接入"
      ],
      "functions": [
        {
          "title": "弹药改型",
          "description": "公开稿说明在 Anvil 平台基础上增加任务效应配置。",
          "sourceId": "pc-source-anvil-m"
        },
        {
          "title": "体系接入",
          "description": "公告描述利用 Lattice 接收多源感知信息。",
          "sourceId": "pc-source-anvil-m"
        }
      ],
      "applications": [
        "反无人机防护"
      ],
      "parameters": [
        {
          "name": "平台关系",
          "value": "Anvil 改型",
          "note": "官方发布稿明确",
          "sourceId": "pc-source-anvil-m",
          "source": "Anduril Announces Anvil-M Munition Variant Of Interceptor Platform"
        },
        {
          "name": "量化性能",
          "value": "未核验",
          "note": "不从基础型推导",
          "sourceId": "pc-source-anvil-m",
          "source": "Anduril Announces Anvil-M Munition Variant Of Interceptor Platform"
        }
      ],
      "timeline": [
        {
          "date": "2023-10-05",
          "title": "Anvil-M 公布",
          "summary": "企业宣布弹药改型。",
          "sourceId": "pc-source-anvil-m"
        }
      ],
      "relations": [
        {
          "targetId": "anvil",
          "type": "系列基础型",
          "description": "官方发布稿的改型关系。",
          "sourceId": "pc-source-anvil-m"
        },
        {
          "targetId": "lattice",
          "type": "软件关联",
          "description": "通过 Lattice 汇聚轨迹支持人员决策。",
          "sourceId": "pc-source-anvil-m"
        }
      ],
      "relatedObjects": [
        "Anvil",
        "Lattice"
      ],
      "image": null,
      "sourceIds": [
        "pc-source-anvil-m",
        "pc-source-anvil"
      ],
      "evidenceIds": [
        "pc-evidence-anvil-m-anvil-m",
        "pc-evidence-anvil-m-anvil"
      ],
      "scopeNote": "型号归属和公开任务已确认；速度、续航与效果评估未在本次来源中独立核验。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验"
    },
    {
      "id": "roadrunner",
      "name": "Roadrunner",
      "aliases": [],
      "objectType": "product",
      "category": "counter-uas",
      "type": "可重复使用垂直起降自主航空器",
      "positioning": "可重复使用垂直起降自主航空器",
      "summary": "Roadrunner 基础型是有人监督的双涡喷自主航空器，支持垂直起降和模块化载荷；防空弹药改型单列为 Roadrunner-M。",
      "firstPublicDate": "",
      "developer": "Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "垂直起降",
        "可重复使用",
        "载荷模块化"
      ],
      "functions": [
        {
          "title": "垂直起降",
          "description": "官方任务页明确 VTOL 形态。",
          "sourceId": "pc-source-roadrunner"
        },
        {
          "title": "可重复使用",
          "description": "基础平台设计包括重复使用。",
          "sourceId": "pc-source-roadrunner"
        },
        {
          "title": "载荷模块化",
          "description": "公开介绍包含模块化任务载荷。",
          "sourceId": "pc-source-roadrunner"
        }
      ],
      "applications": [
        "自主航空任务",
        "防护体系任务"
      ],
      "parameters": [
        {
          "name": "起降方式",
          "value": "VTOL",
          "note": "官方任务页",
          "sourceId": "pc-source-roadrunner",
          "source": "Counter UAS"
        },
        {
          "name": "动力",
          "value": "双涡喷",
          "note": "官方任务页",
          "sourceId": "pc-source-roadrunner",
          "source": "Counter UAS"
        }
      ],
      "timeline": [],
      "relations": [
        {
          "targetId": "roadrunner-m",
          "type": "弹药改型",
          "description": "企业原帖并列介绍基础型与 M 型。",
          "sourceId": "pc-source-roadrunner-m"
        }
      ],
      "relatedObjects": [
        "Roadrunner-M"
      ],
      "image": {
        "path": "../../modules/product-catalog/assets/roadrunner.jpeg",
        "sourceName": "原项目研究报告配图",
        "sourceUrl": ""
      },
      "sourceIds": [
        "pc-source-roadrunner",
        "pc-source-roadrunner-m"
      ],
      "evidenceIds": [
        "pc-evidence-roadrunner-roadrunner",
        "pc-evidence-roadrunner-roadrunner-m"
      ],
      "scopeNote": "基础型和 M 型须区分。返回和再用是符合条件时的能力，不意味着已执行毁伤后的弹药能够回收。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验",
      "timelineNote": "当前可读取资料为无发布日期的产品介绍；首次公开时间及独立发展节点未核验，不以本次核验日期冒充首发日期。"
    },
    {
      "id": "roadrunner-m",
      "name": "Roadrunner-M",
      "aliases": [],
      "objectType": "product",
      "category": "counter-uas",
      "type": "Roadrunner 系列防空弹药改型",
      "positioning": "Roadrunner 系列防空弹药改型",
      "summary": "Roadrunner-M 是 Roadrunner 的防空任务改型；企业公开帖说明其可执行拦截，或在未实施处置时返回再用。",
      "firstPublicDate": "",
      "developer": "Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "防空任务定位",
        "条件式回收"
      ],
      "functions": [
        {
          "title": "防空任务定位",
          "description": "企业原帖明确 M 型拦截定位。",
          "sourceId": "pc-source-roadrunner-m"
        },
        {
          "title": "条件式回收",
          "description": "企业描述可返回与重复使用；不代表执行毁伤后回收。",
          "sourceId": "pc-source-roadrunner-m"
        }
      ],
      "applications": [
        "反无人机防护"
      ],
      "parameters": [
        {
          "name": "系列归属",
          "value": "Roadrunner 的 M 型",
          "note": "企业原帖",
          "sourceId": "pc-source-roadrunner-m",
          "source": "Anduril Industries introduces Roadrunner and Roadrunner-M（企业公开帖）"
        },
        {
          "name": "详细性能",
          "value": "未核验",
          "note": "无完整可核验参数表",
          "sourceId": "pc-source-roadrunner-m",
          "source": "Anduril Industries introduces Roadrunner and Roadrunner-M（企业公开帖）"
        }
      ],
      "timeline": [],
      "relations": [
        {
          "targetId": "roadrunner",
          "type": "系列基础平台",
          "description": "与基础平台相关，但任务配置不同。",
          "sourceId": "pc-source-roadrunner-m"
        }
      ],
      "relatedObjects": [
        "Roadrunner"
      ],
      "image": null,
      "sourceIds": [
        "pc-source-roadrunner-m",
        "pc-source-roadrunner"
      ],
      "evidenceIds": [
        "pc-evidence-roadrunner-m-roadrunner-m",
        "pc-evidence-roadrunner-m-roadrunner"
      ],
      "scopeNote": "本次企业原帖经公开页面内嵌内容核验；未取得完整独立型号参数表。速度、航程、载荷质量及批次状态不作推测。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验",
      "timelineNote": "当前可读取资料为无发布日期的产品介绍；首次公开时间及独立发展节点未核验，不以本次核验日期冒充首发日期。"
    },
    {
      "id": "spyglass",
      "name": "Spyglass",
      "aliases": [],
      "objectType": "product",
      "category": "ground-protection",
      "type": "Ku 波段相控阵雷达",
      "positioning": "Ku 波段相控阵雷达",
      "summary": "Spyglass 是 Ku 波段相控阵雷达，用于对象探测、跟踪和高度信息输出；应按雷达传感器归类。",
      "firstPublicDate": "",
      "developer": "Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "雷达探测跟踪",
        "高度信息"
      ],
      "functions": [
        {
          "title": "雷达探测跟踪",
          "description": "公开产品页描述高精度对象检测与跟踪。",
          "sourceId": "pc-source-spyglass"
        },
        {
          "title": "高度信息",
          "description": "雷达软件提供目标高度数据。",
          "sourceId": "pc-source-spyglass"
        }
      ],
      "applications": [
        "空中对象感知",
        "区域防护感知"
      ],
      "parameters": [
        {
          "name": "工作频段",
          "value": "Ku",
          "note": "官方 Armory 页",
          "sourceId": "pc-source-spyglass",
          "source": "Spyglass — Anduril Armory"
        },
        {
          "name": "扫描范围",
          "value": "90° × 55°",
          "note": "官方产品页",
          "sourceId": "pc-source-spyglass",
          "source": "Spyglass — Anduril Armory"
        }
      ],
      "timeline": [],
      "relations": [],
      "relatedObjects": [],
      "image": null,
      "sourceIds": [
        "pc-source-spyglass"
      ],
      "evidenceIds": [
        "pc-evidence-spyglass-spyglass"
      ],
      "scopeNote": "探测范围与目标类别、工况有关；本条不合并不同版本的探测距离，不将名称与其他公司的同名产品混淆。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验",
      "timelineNote": "当前可读取资料为无发布日期的产品介绍；首次公开时间及独立发展节点未核验，不以本次核验日期冒充首发日期。"
    },
    {
      "id": "spark",
      "name": "Spark",
      "aliases": [],
      "objectType": "product",
      "category": "ground-protection",
      "type": "X/Ku 双波段半球覆盖雷达",
      "positioning": "X/Ku 双波段半球覆盖雷达",
      "summary": "Spark 是面向机动平台的双波段雷达，通过半球覆盖观察空中和地面对象，不是泛指地面任务支撑软件。",
      "firstPublicDate": "",
      "developer": "Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "双波段感知",
        "行进间观察",
        "半球覆盖"
      ],
      "functions": [
        {
          "title": "双波段感知",
          "description": "X/Ku 雷达在同一设备中支持感知任务。",
          "sourceId": "pc-source-spark"
        },
        {
          "title": "行进间观察",
          "description": "官方明确 on-the-move sensing 定位。",
          "sourceId": "pc-source-spark"
        },
        {
          "title": "半球覆盖",
          "description": "扫描体积为半球形。",
          "sourceId": "pc-source-spark"
        }
      ],
      "applications": [
        "机动平台感知",
        "空中与地面对象检测"
      ],
      "parameters": [
        {
          "name": "工作频段",
          "value": "X/Ku",
          "note": "官方产品页",
          "sourceId": "pc-source-spark",
          "source": "Spark"
        },
        {
          "name": "扫描体积",
          "value": "半球覆盖",
          "note": "非单一平面角度",
          "sourceId": "pc-source-spark",
          "source": "Spark"
        }
      ],
      "timeline": [],
      "relations": [],
      "relatedObjects": [],
      "image": null,
      "sourceIds": [
        "pc-source-spark"
      ],
      "evidenceIds": [
        "pc-evidence-spark-spark"
      ],
      "scopeNote": "厂商公开探测距离依目标类别而异；本条不提供未经工况说明的通用距离或效果保证。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验",
      "timelineNote": "当前可读取资料为无发布日期的产品介绍；首次公开时间及独立发展节点未核验，不以本次核验日期冒充首发日期。"
    },
    {
      "id": "dive-ld",
      "name": "Dive-LD",
      "aliases": [
        "LD-AUV"
      ],
      "objectType": "product",
      "category": "maritime",
      "type": "大型自主水下航行器",
      "positioning": "大型自主水下航行器",
      "summary": "Dive-LD 通过开放接口和模块化载荷支持海底勘测、基础设施检查等任务；官方公开最长约 10 天耐力和最大约 6000 m 深度。",
      "firstPublicDate": "",
      "developer": "Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "海底勘测",
        "基础设施巡检",
        "精确布放",
        "模块化载荷",
        "远程监控演示"
      ],
      "functions": [
        {
          "title": "海底勘测",
          "description": "支持海床测绘、水道测量等公开任务。",
          "sourceId": "pc-source-dive-ld"
        },
        {
          "title": "基础设施巡检",
          "description": "2023 年公告提出海底电缆检查合作计划。",
          "sourceId": "pc-source-dive-cable"
        },
        {
          "title": "精确布放",
          "description": "官方任务名为 Precision Placement，指任务载荷布放，不等同于导航定位精度。",
          "sourceId": "pc-source-dive-ld"
        },
        {
          "title": "模块化载荷",
          "description": "开放软件、机械和电气接口可集成不同传感器。",
          "sourceId": "pc-source-dive-ld"
        },
        {
          "title": "远程监控演示",
          "description": "DIU 评估报道说明通过 Lattice 共享位置。",
          "sourceId": "pc-source-dive-diu"
        }
      ],
      "applications": [
        "海底测绘",
        "海底电缆/管道检查",
        "环境监测",
        "水下侦察"
      ],
      "parameters": [
        {
          "name": "长度",
          "value": "约 5.8 m",
          "note": "官方 General System Desc.",
          "sourceId": "pc-source-dive-ld",
          "source": "Dive-LD"
        },
        {
          "name": "直径",
          "value": "约 1.2 m",
          "note": "官方 General System Desc.",
          "sourceId": "pc-source-dive-ld",
          "source": "Dive-LD"
        },
        {
          "name": "最大耐力",
          "value": "约 10 天",
          "note": "Max Endurance；工况未详述",
          "sourceId": "pc-source-dive-ld",
          "source": "Dive-LD"
        },
        {
          "name": "最大深度",
          "value": "约 6000 m",
          "note": "Max Depth",
          "sourceId": "pc-source-dive-ld",
          "source": "Dive-LD"
        },
        {
          "name": "载荷空间",
          "value": "> 1 m³",
          "note": "自由进水模块化载荷接口",
          "sourceId": "pc-source-dive-ld",
          "source": "Dive-LD"
        },
        {
          "name": "载荷接口",
          "value": "软件、机械及电气开放接口",
          "note": "公开定性说明",
          "sourceId": "pc-source-dive-ld",
          "source": "Dive-LD"
        }
      ],
      "timeline": [
        {
          "date": "2023-03-26",
          "title": "电缆检查合作公告",
          "summary": "与 NOWRDC 宣布使用 Dive-LD 开展海底电力电缆检查的计划。",
          "sourceId": "pc-source-dive-cable"
        },
        {
          "date": "2024-02-08",
          "title": "DIU 原型合同公告",
          "summary": "官方描述评估演示与 Lattice 远程位置共享。",
          "sourceId": "pc-source-dive-diu"
        }
      ],
      "relations": [
        {
          "targetId": "lattice",
          "type": "演示集成",
          "description": "DIU 评估中以 Lattice 远程共享平台位置。",
          "sourceId": "pc-source-dive-diu"
        },
        {
          "targetId": "dive-xl",
          "type": "设计沿用",
          "description": "官方海上体系页称 Dive-XL 沿用 Dive-LD 模块化软件优先设计。",
          "sourceId": "pc-source-seapower"
        }
      ],
      "relatedObjects": [
        "Lattice",
        "Dive-XL"
      ],
      "image": {
        "path": "../../modules/product-catalog/assets/dive-ld.png",
        "sourceName": "Anduril Dive-LD 官方公开图像",
        "sourceUrl": "https://www.anduril.com/dive-ld"
      },
      "sourceIds": [
        "pc-source-dive-ld",
        "pc-source-dive-diu",
        "pc-source-dive-cable",
        "pc-source-seapower"
      ],
      "evidenceIds": [
        "pc-evidence-dive-ld-dive-ld",
        "pc-evidence-dive-ld-dive-diu",
        "pc-evidence-dive-ld-dive-cable",
        "pc-evidence-dive-ld-seapower"
      ],
      "scopeNote": "尺寸、耐力和深度为官网标称值，不能推断最大载荷、最长耐力与最大深度可同时达到。2023 电缆检查为合作计划，当前材料不证明已完成。",
      "checkedAt": "2026-09-20",
      "dataStatus": "较完整",
      "applicationGroups": {
        "military": [
          "水下环境信息准备",
          "情报监视侦察",
          "精确布放"
        ],
        "commercial": [
          "水道测量",
          "海底管道与电缆检查",
          "矿物探测",
          "环境监测"
        ]
      }
    },
    {
      "id": "dive-xl",
      "name": "Dive-XL",
      "aliases": [],
      "objectType": "product",
      "category": "maritime",
      "type": "超大型自主水下航行器",
      "positioning": "超大型自主水下航行器",
      "summary": "Dive-XL 是公开介绍的商用基线 XL-AUV，延续 Dive-LD 模块化设计，用于远距离信息采集和多样载荷任务。",
      "firstPublicDate": "",
      "developer": "Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "多样载荷",
        "模块化设计",
        "自主水下航行"
      ],
      "functions": [
        {
          "title": "多样载荷",
          "description": "官方介绍强调信息采集与多种载荷。",
          "sourceId": "pc-source-dive-xl"
        },
        {
          "title": "模块化设计",
          "description": "海上体系页明确沿用 Dive-LD 模块化设计。",
          "sourceId": "pc-source-seapower"
        },
        {
          "title": "自主水下航行",
          "description": "官方将其归类为超大型自主水下航行器。",
          "sourceId": "pc-source-dive-xl"
        }
      ],
      "applications": [
        "海洋信息采集",
        "水下载荷任务"
      ],
      "parameters": [
        {
          "name": "平台类别",
          "value": "XL-AUV",
          "note": "官方产品介绍",
          "sourceId": "pc-source-dive-xl",
          "source": "Introducing: Dive-XL（官方视频介绍）"
        },
        {
          "name": "航程/耐力/载荷",
          "value": "未核验",
          "note": "不套用 Dive-LD 或 Ghost Shark 数值",
          "sourceId": "pc-source-dive-xl",
          "source": "Introducing: Dive-XL（官方视频介绍）"
        }
      ],
      "timeline": [
        {
          "date": "2024-12-09",
          "title": "官方 Dive-XL 介绍发布",
          "summary": "Anduril 官方频道公开其商用基线和任务定位。",
          "sourceId": "pc-source-dive-xl"
        }
      ],
      "relations": [
        {
          "targetId": "dive-ld",
          "type": "设计关联",
          "description": "公开体系页说明沿用模块化、软件优先设计。",
          "sourceId": "pc-source-seapower"
        }
      ],
      "relatedObjects": [
        "Dive-LD"
      ],
      "image": null,
      "sourceIds": [
        "pc-source-dive-xl",
        "pc-source-seapower"
      ],
      "evidenceIds": [
        "pc-evidence-dive-xl-dive-xl",
        "pc-evidence-dive-xl-seapower"
      ],
      "scopeNote": "不直接把澳大利亚 Ghost Shark 项目、Dive-LD 或其他批次的参数迁入 Dive-XL。当前列出资料未提供统一可核验的航程和载荷表。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验"
    },
    {
      "id": "copperhead",
      "name": "Copperhead",
      "aliases": [],
      "objectType": "product",
      "category": "maritime",
      "type": "高速自主水下航行器家族",
      "positioning": "高速自主水下航行器家族",
      "summary": "Copperhead 是面向时效性海上任务的高速 AUV 家族；基础型搭载感知或通信等模块，M 型属于独立任务效应配置。",
      "firstPublicDate": "",
      "developer": "Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "水下任务载具",
        "多种任务载荷",
        "区分型号"
      ],
      "functions": [
        {
          "title": "水下任务载具",
          "description": "官方将其定义为从自主平台提供任务能力的高速 AUV。",
          "sourceId": "pc-source-copperhead"
        },
        {
          "title": "多种任务载荷",
          "description": "基础型公开例子包括感知、通信及磁力计。",
          "sourceId": "pc-source-copperhead"
        },
        {
          "title": "区分型号",
          "description": "官方页分别列出 100、100M 与 500。",
          "sourceId": "pc-source-copperhead"
        }
      ],
      "applications": [
        "水下感知",
        "水下通信支援"
      ],
      "parameters": [
        {
          "name": "产品层级",
          "value": "高速 AUV 家族",
          "note": "非单一统一配置",
          "sourceId": "pc-source-copperhead",
          "source": "Copperhead"
        },
        {
          "name": "公开型号",
          "value": "100 / 100M / 500",
          "note": "按本次官网可读取条目",
          "sourceId": "pc-source-copperhead",
          "source": "Copperhead"
        }
      ],
      "timeline": [],
      "relations": [],
      "relatedObjects": [],
      "image": null,
      "sourceIds": [
        "pc-source-copperhead",
        "pc-source-seapower"
      ],
      "evidenceIds": [
        "pc-evidence-copperhead-copperhead",
        "pc-evidence-copperhead-seapower"
      ],
      "scopeNote": "本条是家族对象。100、100M 与 500 的尺寸、载荷和用途不同，不把 M 型特征套到全系列。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验",
      "timelineNote": "当前可读取资料为无发布日期的产品介绍；首次公开时间及独立发展节点未核验，不以本次核验日期冒充首发日期。"
    },
    {
      "id": "seabed-sentry",
      "name": "Seabed Sentry",
      "aliases": [],
      "objectType": "product",
      "category": "maritime",
      "type": "自主海底感知节点网络",
      "positioning": "自主海底感知节点网络",
      "summary": "Seabed Sentry 是移动式海底传感节点网络，公开介绍包含自主感知、处理与通信，并通过 Lattice 支持跨域态势连接。",
      "firstPublicDate": "",
      "developer": "Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "海底感知",
        "本地处理与通信",
        "软件网络关联"
      ],
      "functions": [
        {
          "title": "海底感知",
          "description": "节点面向持续水下环境监测。",
          "sourceId": "pc-source-seabed-sentry"
        },
        {
          "title": "本地处理与通信",
          "description": "企业原帖描述自主感知、数据处理和无线交流。",
          "sourceId": "pc-source-seabed-sentry"
        },
        {
          "title": "软件网络关联",
          "description": "企业明确称通过 Lattice 连接节点。",
          "sourceId": "pc-source-seabed-sentry"
        }
      ],
      "applications": [
        "海底监视",
        "关键水下设施感知"
      ],
      "parameters": [
        {
          "name": "系统类别",
          "value": "海底传感节点网络",
          "note": "并非 Sentry 地面塔的同一型号",
          "sourceId": "pc-source-seabed-sentry",
          "source": "Introducing Seabed Sentry（Anduril 企业原帖）"
        },
        {
          "name": "量化网络性能",
          "value": "未核验",
          "note": "未填写带宽、间距与续航推测值",
          "sourceId": "pc-source-seabed-sentry",
          "source": "Introducing Seabed Sentry（Anduril 企业原帖）"
        }
      ],
      "timeline": [],
      "relations": [
        {
          "targetId": "lattice",
          "type": "软件关联",
          "description": "Anduril 企业原帖明确以 Lattice 联接节点。",
          "sourceId": "pc-source-seabed-sentry"
        }
      ],
      "relatedObjects": [
        "Lattice"
      ],
      "image": null,
      "sourceIds": [
        "pc-source-seabed-sentry",
        "pc-source-seapower"
      ],
      "evidenceIds": [
        "pc-evidence-seabed-sentry-seabed-sentry",
        "pc-evidence-seabed-sentry-seapower"
      ],
      "scopeNote": "本次核验材料未提供可通用的节点间距、通信吞吐、续航或探测距离。节点网络定位已确认，具体部署规模未核验。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验",
      "timelineNote": "当前可读取资料为无发布日期的产品介绍；首次公开时间及独立发展节点未核验，不以本次核验日期冒充首发日期。"
    },
    {
      "id": "lattice",
      "name": "Lattice",
      "aliases": [],
      "objectType": "technology",
      "category": "software",
      "type": "跨平台数据与自主系统软件平台",
      "positioning": "跨平台数据与自主系统软件平台",
      "summary": "Lattice 为传感器、平台及第三方系统提供数据集成与任务协作底座；本目录将 C2、Mission Autonomy、Mesh 与 SDK 分别归档。",
      "firstPublicDate": "",
      "developer": "Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "异构系统集成",
        "共同态势",
        "伙伴生态"
      ],
      "functions": [
        {
          "title": "异构系统集成",
          "description": "公开公告说明可接入传感器、第三方 C2 和数据源。",
          "sourceId": "pc-source-lattice"
        },
        {
          "title": "共同态势",
          "description": "以融合数据支持共享态势和任务管理。",
          "sourceId": "pc-source-lattice"
        },
        {
          "title": "伙伴生态",
          "description": "SDK 与开发资源支持第三方应用接入。",
          "sourceId": "pc-source-lattice"
        }
      ],
      "applications": [
        "跨平台数据集成",
        "任务态势管理",
        "自主系统协作"
      ],
      "parameters": [
        {
          "name": "对象类型",
          "value": "软件平台",
          "note": "包含多个产品能力",
          "sourceId": "pc-source-lattice",
          "source": "The Contours of War are Changing — Interoperability at the Edge"
        },
        {
          "name": "平台通用延迟/容量",
          "value": "未核验",
          "note": "随部署配置而变，不生成统一指标",
          "sourceId": "pc-source-lattice",
          "source": "The Contours of War are Changing — Interoperability at the Edge"
        }
      ],
      "timeline": [
        {
          "date": "2023-05-02",
          "title": "Mission Autonomy 发布",
          "summary": "Lattice 扩展公开任务自主软件能力。",
          "sourceId": "pc-source-mission-autonomy"
        },
        {
          "date": "2024-12-10",
          "title": "SDK 与伙伴计划发布",
          "summary": "企业公布开发接口与资源。",
          "sourceId": "pc-source-lattice"
        }
      ],
      "relations": [
        {
          "targetId": "lattice-c2",
          "type": "平台能力",
          "description": "C2 提供指挥控制界面与任务管理。",
          "sourceId": "pc-source-lattice-c2"
        },
        {
          "targetId": "mission-autonomy",
          "type": "平台能力",
          "description": "Mission Autonomy 面向机器人团队协作。",
          "sourceId": "pc-source-mission-autonomy"
        },
        {
          "targetId": "lattice-mesh",
          "type": "平台能力",
          "description": "Mesh 提供数据分发与连接。",
          "sourceId": "pc-source-lattice-mesh"
        },
        {
          "targetId": "lattice-sdk",
          "type": "开发集成",
          "description": "SDK 使第三方能力接入平台。",
          "sourceId": "pc-source-lattice"
        }
      ],
      "relatedObjects": [
        "Lattice C2",
        "Mission Autonomy",
        "Lattice Mesh",
        "Lattice SDK"
      ],
      "image": {
        "path": "../../modules/product-catalog/assets/lattice.png",
        "sourceName": "Lattice 官方体系图",
        "sourceUrl": "https://www.anduril.com/lattice/"
      },
      "sourceIds": [
        "pc-source-lattice",
        "pc-source-lattice-c2",
        "pc-source-mission-autonomy",
        "pc-source-lattice-mesh"
      ],
      "evidenceIds": [
        "pc-evidence-lattice-lattice",
        "pc-evidence-lattice-lattice-c2",
        "pc-evidence-lattice-mission-autonomy",
        "pc-evidence-lattice-lattice-mesh"
      ],
      "scopeNote": "平台能力、产品模块与具体部署实例须分开；官方规模与速度宣传不能视为本平台已实现或已独立测量的性能。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验"
    },
    {
      "id": "lattice-c2",
      "name": "Lattice C2",
      "aliases": [
        "Lattice for Command & Control"
      ],
      "objectType": "technology",
      "category": "software",
      "type": "指挥控制与共同态势软件",
      "positioning": "指挥控制与共同态势软件",
      "summary": "Lattice for Command & Control 汇集传感器与系统数据，生成共同态势并支持人员管理异构资产的任务。",
      "firstPublicDate": "",
      "developer": "Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "数据融合",
        "决策辅助",
        "任务管理"
      ],
      "functions": [
        {
          "title": "数据融合",
          "description": "将多源信息汇入共同态势。",
          "sourceId": "pc-source-lattice-c2"
        },
        {
          "title": "决策辅助",
          "description": "向操作人员呈现建议与决策点。",
          "sourceId": "pc-source-lattice-c2"
        },
        {
          "title": "任务管理",
          "description": "支持对接多个域内的人控、无人及自主系统。",
          "sourceId": "pc-source-lattice-c2"
        }
      ],
      "applications": [
        "态势呈现",
        "任务指挥",
        "多系统管理"
      ],
      "parameters": [
        {
          "name": "对象类型",
          "value": "C2 软件能力",
          "note": "官方页面命名",
          "sourceId": "pc-source-lattice-c2",
          "source": "Lattice for Command & Control"
        },
        {
          "name": "部署终端",
          "value": "笔记本、平板等",
          "note": "页面公开示例",
          "sourceId": "pc-source-lattice-c2",
          "source": "Lattice for Command & Control"
        }
      ],
      "timeline": [],
      "relations": [
        {
          "targetId": "lattice",
          "type": "平台归属",
          "description": "Lattice for C2 属于 Lattice 产品体系。",
          "sourceId": "pc-source-lattice-c2"
        },
        {
          "targetId": "lattice-mesh",
          "type": "数据网络依赖",
          "description": "官方 C2 页明确使用 Mesh。",
          "sourceId": "pc-source-lattice-c2"
        },
        {
          "targetId": "lattice-sdk",
          "type": "集成接口",
          "description": "官方 C2 页明确第三方经 SDK 双向接入。",
          "sourceId": "pc-source-lattice-c2"
        }
      ],
      "relatedObjects": [
        "Lattice",
        "Lattice Mesh",
        "Lattice SDK"
      ],
      "image": null,
      "sourceIds": [
        "pc-source-lattice-c2"
      ],
      "evidenceIds": [
        "pc-evidence-lattice-c2-lattice-c2"
      ],
      "scopeNote": "C2 是软件能力条目，不是单一硬件设备；具体接入规模和任务权限取决于部署。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验",
      "timelineNote": "当前可读取资料为无发布日期的产品介绍；首次公开时间及独立发展节点未核验，不以本次核验日期冒充首发日期。"
    },
    {
      "id": "mission-autonomy",
      "name": "Mission Autonomy",
      "aliases": [
        "Lattice for Mission Autonomy"
      ],
      "objectType": "technology",
      "category": "software",
      "type": "人工监督下的多平台任务自主软件",
      "positioning": "人工监督下的多平台任务自主软件",
      "summary": "Lattice for Mission Autonomy 支持不同机器人在人工监督下协作，覆盖任务前规划、执行和事后复盘。",
      "firstPublicDate": "2023-05-02",
      "developer": "Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "异构团队协作",
        "任务生命周期",
        "人工监督"
      ],
      "functions": [
        {
          "title": "异构团队协作",
          "description": "硬件无关架构面向不同厂商平台。",
          "sourceId": "pc-source-mission-autonomy"
        },
        {
          "title": "任务生命周期",
          "description": "公开说明包含规划、训练、执行和复盘。",
          "sourceId": "pc-source-mission-autonomy"
        },
        {
          "title": "人工监督",
          "description": "平台发布稿明确人在监督与任务指挥中的角色。",
          "sourceId": "pc-source-mission-autonomy"
        }
      ],
      "applications": [
        "多平台协作",
        "任务规划",
        "仿真与复盘"
      ],
      "parameters": [
        {
          "name": "对象类型",
          "value": "任务自主软件",
          "note": "Lattice 子能力",
          "sourceId": "pc-source-mission-autonomy",
          "source": "Anduril Unveils Lattice for Mission Autonomy"
        },
        {
          "name": "架构定位",
          "value": "硬件无关、开放",
          "note": "官方定性描述",
          "sourceId": "pc-source-mission-autonomy",
          "source": "Anduril Unveils Lattice for Mission Autonomy"
        }
      ],
      "timeline": [
        {
          "date": "2023-05-02",
          "title": "平台发布",
          "summary": "企业公布 Lattice for Mission Autonomy。",
          "sourceId": "pc-source-mission-autonomy"
        }
      ],
      "relations": [
        {
          "targetId": "lattice",
          "type": "平台归属",
          "description": "任务自主软件属于 Lattice。",
          "sourceId": "pc-source-mission-autonomy"
        },
        {
          "targetId": "omen",
          "type": "计划软件集成",
          "description": "Omen 联合开发公告说明拟使用此软件。",
          "sourceId": "pc-source-omen"
        }
      ],
      "relatedObjects": [
        "Lattice",
        "Omen"
      ],
      "image": null,
      "sourceIds": [
        "pc-source-mission-autonomy",
        "pc-source-omen"
      ],
      "evidenceIds": [
        "pc-evidence-mission-autonomy-mission-autonomy",
        "pc-evidence-mission-autonomy-omen"
      ],
      "scopeNote": "自主能力描述为软件产品定位；不能据此推断任意平台无需适配即可协同，或将人工计划当作完全无人决策。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验"
    },
    {
      "id": "lattice-mesh",
      "name": "Lattice Mesh",
      "aliases": [],
      "objectType": "technology",
      "category": "software",
      "type": "去中心化数据分发与互联能力",
      "positioning": "去中心化数据分发与互联能力",
      "summary": "Lattice Mesh 在异构节点之间分发、规范化并优先传输数据，定位于低带宽和断续连接环境。",
      "firstPublicDate": "",
      "developer": "Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "分布式架构",
        "异构数据规范化",
        "优先级路由",
        "安全传输与访问"
      ],
      "functions": [
        {
          "title": "分布式架构",
          "description": "去中心化节点间共享信息。",
          "sourceId": "pc-source-lattice-mesh"
        },
        {
          "title": "异构数据规范化",
          "description": "为不同平台的数据提供转换。",
          "sourceId": "pc-source-lattice-mesh"
        },
        {
          "title": "优先级路由",
          "description": "受限带宽下按数据重要性安排传输。",
          "sourceId": "pc-source-lattice-mesh"
        },
        {
          "title": "安全传输与访问",
          "description": "公开功能包括认证、加密和访问授权。",
          "sourceId": "pc-source-lattice-mesh"
        }
      ],
      "applications": [
        "边缘数据分发",
        "第三方系统互联",
        "跨平台协作"
      ],
      "parameters": [
        {
          "name": "架构类别",
          "value": "去中心化数据网络",
          "note": "官方页面",
          "sourceId": "pc-source-lattice-mesh",
          "source": "Lattice Mesh"
        },
        {
          "name": "通用带宽/延迟",
          "value": "未核验",
          "note": "产品页无适用于全部部署的值",
          "sourceId": "pc-source-lattice-mesh",
          "source": "Lattice Mesh"
        }
      ],
      "timeline": [
        {
          "date": "2024-12-03",
          "title": "CDAO 生产协议公告",
          "summary": "企业称获得三年协议扩展边缘数据网络。",
          "sourceId": "pc-source-mesh-cdao"
        },
        {
          "date": "2025-11-19",
          "title": "Ghost-X 演习接入报道",
          "summary": "Ivy Sting 2 报道视频数据通过 Mesh 共享。",
          "sourceId": "pc-source-ghost-mesh"
        }
      ],
      "relations": [
        {
          "targetId": "lattice",
          "type": "平台归属",
          "description": "Mesh 属于 Lattice 数据互联能力。",
          "sourceId": "pc-source-lattice-mesh"
        },
        {
          "targetId": "lattice-sdk",
          "type": "集成接口",
          "description": "CDAO 协议公告说明经 SDK 与开放 API 接入。",
          "sourceId": "pc-source-mesh-cdao"
        },
        {
          "targetId": "ghost-x",
          "type": "演示接入",
          "description": "特定演习中接收 Ghost-X 视频流。",
          "sourceId": "pc-source-ghost-mesh"
        }
      ],
      "relatedObjects": [
        "Lattice",
        "Lattice SDK",
        "Ghost-X"
      ],
      "image": {
        "path": "../../modules/product-catalog/assets/lattice.png",
        "sourceName": "Lattice 官方体系图（非独立 Mesh 硬件照片）",
        "sourceUrl": "https://www.anduril.com/lattice/"
      },
      "sourceIds": [
        "pc-source-lattice-mesh",
        "pc-source-mesh-cdao",
        "pc-source-ghost-mesh"
      ],
      "evidenceIds": [
        "pc-evidence-lattice-mesh-lattice-mesh",
        "pc-evidence-lattice-mesh-mesh-cdao",
        "pc-evidence-lattice-mesh-ghost-mesh"
      ],
      "scopeNote": "Mesh 是软件/数据连接能力，不等同于一种特定无线电。具体协议实现、极限带宽和延迟未全部公开。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验"
    },
    {
      "id": "lattice-sdk",
      "name": "Lattice SDK",
      "aliases": [],
      "objectType": "technology",
      "category": "software",
      "type": "第三方开发与数据集成工具",
      "positioning": "第三方开发与数据集成工具",
      "summary": "Lattice SDK 提供数据模型、接口绑定、代码示例和参考实现，使伙伴应用与平台交换实体和任务相关数据。",
      "firstPublicDate": "2024-12-10",
      "developer": "Anduril Industries",
      "publicStatus": "已有公开产品或项目资料",
      "capabilities": [
        "实体数据接入",
        "接口协议",
        "开发支持"
      ],
      "functions": [
        {
          "title": "实体数据接入",
          "description": "官方文档示例发布和更新资产、轨迹等实体。",
          "sourceId": "pc-source-lattice-sdk"
        },
        {
          "title": "接口协议",
          "description": "开发文档提供 HTTP 与 gRPC 入口。",
          "sourceId": "pc-source-lattice-sdk"
        },
        {
          "title": "开发支持",
          "description": "发布公告列出示例、参考实现与伙伴资源。",
          "sourceId": "pc-source-lattice"
        }
      ],
      "applications": [
        "第三方能力接入",
        "数据模型对接",
        "应用开发"
      ],
      "parameters": [
        {
          "name": "接口类别",
          "value": "HTTP / gRPC",
          "note": "官方文档入口",
          "sourceId": "pc-source-lattice-sdk",
          "source": "Publish entities to Lattice — 官方开发文档"
        },
        {
          "name": "模型示例",
          "value": "资产、轨迹等实体",
          "note": "官方文档示例",
          "sourceId": "pc-source-lattice-sdk",
          "source": "Publish entities to Lattice — 官方开发文档"
        }
      ],
      "timeline": [
        {
          "date": "2024-12-10",
          "title": "SDK 与伙伴计划发布",
          "summary": "官方公告发布 SDK、接口绑定和开发资源。",
          "sourceId": "pc-source-lattice"
        }
      ],
      "relations": [
        {
          "targetId": "lattice",
          "type": "开发集成",
          "description": "SDK 用于与 Lattice 数据模型与接口对接。",
          "sourceId": "pc-source-lattice"
        },
        {
          "targetId": "lattice-mesh",
          "type": "网络接入",
          "description": "Mesh 协议公告明确 SDK 为开放接入方式之一。",
          "sourceId": "pc-source-mesh-cdao"
        }
      ],
      "relatedObjects": [
        "Lattice",
        "Lattice Mesh"
      ],
      "image": null,
      "sourceIds": [
        "pc-source-lattice-sdk",
        "pc-source-lattice",
        "pc-source-mesh-cdao"
      ],
      "evidenceIds": [
        "pc-evidence-lattice-sdk-lattice-sdk",
        "pc-evidence-lattice-sdk-lattice",
        "pc-evidence-lattice-sdk-mesh-cdao"
      ],
      "scopeNote": "公开接口文档证明开发方式，不代表所有 API 无需认证或所有第三方硬件已完成适配；本离线 Demo 没有调用线上 SDK。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验"
    },
    {
      "id": "altius-m",
      "name": "Altius-M",
      "aliases": [
        "ALTIUS-M",
        "ALTIUS-600M",
        "ALTIUS-700M"
      ],
      "objectType": "product",
      "category": "tactical-strike",
      "type": "ALTIUS 弹药改型聚合对象",
      "positioning": "ALTIUS 弹药改型聚合对象",
      "summary": "本目录以 Altius-M 聚合公开的 ALTIUS-600M 与 700M，便于对应图谱；它不代表一种拥有统一规格的独立型号。",
      "firstPublicDate": "",
      "developer": "Anduril Industries",
      "publicStatus": "已见政府采购公告",
      "capabilities": [
        "改型归档",
        "公开任务类型"
      ],
      "functions": [
        {
          "title": "改型归档",
          "description": "英国政府公告明确列出 600M 与 700M。",
          "sourceId": "pc-source-altius-m"
        },
        {
          "title": "公开任务类型",
          "description": "公告将二者归类为巡飞弹。",
          "sourceId": "pc-source-altius-m"
        }
      ],
      "applications": [
        "巡飞弹产品研究"
      ],
      "parameters": [
        {
          "name": "包含型号",
          "value": "ALTIUS-600M / ALTIUS-700M",
          "note": "英国政府采购公告",
          "sourceId": "pc-source-altius-m",
          "source": "Advanced attack drones for Ukraine in new deal struck by UK government and Anduril UK"
        },
        {
          "name": "统一规格",
          "value": "不适用",
          "note": "两个具体型号分开核验",
          "sourceId": "pc-source-altius-m",
          "source": "Advanced attack drones for Ukraine in new deal struck by UK government and Anduril UK"
        }
      ],
      "timeline": [
        {
          "date": "2025-03-06",
          "title": "英国采购公告",
          "summary": "英国政府公开 600M 与 700M 供应合同。",
          "sourceId": "pc-source-altius-m"
        }
      ],
      "relations": [
        {
          "targetId": "altius",
          "type": "系列归属",
          "description": "M 型属于 ALTIUS 系列，按改型聚合展示。",
          "sourceId": "pc-source-altius-m"
        }
      ],
      "relatedObjects": [
        "Altius"
      ],
      "image": null,
      "sourceIds": [
        "pc-source-altius-m",
        "pc-source-altius"
      ],
      "evidenceIds": [
        "pc-evidence-altius-m-altius-m",
        "pc-evidence-altius-m-altius"
      ],
      "scopeNote": "Altius-M 是目录层级名称；采购公告不提供两型号可合并的速度、载荷与航程。供应计划不等于全部交付确认。",
      "checkedAt": "2026-09-20",
      "dataStatus": "已核验"
    }
  ];

  var sources = [
    {
      "id": "pc-source-bolt",
      "title": "Anduril Unveils Bolt & Bolt-M",
      "date": "2024-10-10",
      "url": "https://www.anduril.com/news/anduril-unveils-bolt-and-bolt-m",
      "summary": "区分 Bolt 侦察/搜救基础型与 Bolt-M 弹药型；两者属于便携垂直起降系列。",
      "supports": "系列定位、基础型与改型区别、Lattice 软件关联",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-altius",
      "title": "ALTIUS Air Launched Effects Demonstrated Advanced Teaming at US Army Project Edge 2022",
      "date": "2022-05-19",
      "url": "https://www.anduril.com/news/altius-air-launched-effects-demonstrated-advanced-teaming-at-us-army-project-edge-2022",
      "summary": "ALTIUS-600 在 EDGE22 演示多平台协作；平台采用模块化载荷和管式发射设计。",
      "supports": "ALTIUS-600 示例、多载荷、协同演示",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-altius-origin",
      "title": "Anduril Industries Acquires Area-I",
      "date": "2021-04-01",
      "url": "https://www.anduril.com/news/anduril-industries-acquires-area-i-adds-altius-capabilities-to-hardware-portfolio",
      "summary": "Anduril 宣布收购 Area-I，将 ALTIUS 纳入产品组合。",
      "supports": "研发来源、并购时间与归属",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-altius-m",
      "title": "Advanced attack drones for Ukraine in new deal struck by UK government and Anduril UK",
      "date": "2025-03-06",
      "url": "https://www.gov.uk/government/news/advanced-attack-drones-for-ukraine-in-new-deal-struck-by-uk-government-and-anduril-uk",
      "summary": "英国政府公告明确列出 Altius 600m 和 700m 两种巡飞弹及供应合同；没有给出两型号通用性能表。",
      "supports": "600M/700M 名称、巡飞弹归类、采购公告",
      "publisher": "UK Ministry of Defence",
      "sourceType": "government",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-ghost",
      "title": "U.S. Air Force Selects Anduril’s Ghost and Ghost-X to Enhance Autonomy Capabilities",
      "date": "2023-09-29",
      "url": "https://www.anduril.com/article/air-force-ghost-selection/",
      "summary": "公告将 Ghost-X 说明为 Ghost 新改型，并说明 Ghost 使用 Lattice 进行任务规划、空域管理和飞行控制。",
      "supports": "Ghost/X 关系、模块化载荷、Lattice、空军自主能力合同",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-ghost-x",
      "title": "Ghost-X — Anduril Armory",
      "date": "未标注发布日期",
      "url": "https://armory.anduril.com/products/ghost-x",
      "summary": "Ghost-X 页面列示巡航续航 80 分钟、范围 25 km、载荷 11 kg、双电池重量 25 kg，并描述多载荷与可换模块设计。",
      "supports": "Ghost-X 独立规格、模块化配置",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-ghost-mesh",
      "title": "How NGC2 Is Expanding the Battlefield Network at Ivy Sting 2",
      "date": "2025-11-19",
      "url": "https://www.anduril.com/news/how-ngc2-is-expanding-the-battlefield-network-at-ivy-sting-2",
      "summary": "企业报道 Ghost-X 在 Ivy Sting 2 通过 Lattice Mesh 向 NGC2 提供视频数据；属于特定演习集成实例。",
      "supports": "Ghost-X 与 Lattice Mesh 的演示关联",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-barracuda",
      "title": "Air Dominance & Strike",
      "date": "未标注发布日期",
      "url": "https://www.anduril.com/air/air-dominance-and-strike",
      "summary": "官方任务页面把 Barracuda 定义为面向规模生产的吸气式自主航空器家族，并将 Fury 列为高性能多任务航空器。",
      "supports": "Barracuda 家族定位、Fury 定位、空中体系归类",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-barracuda-production",
      "title": "Surface-Launched Barracuda-500M Production Agreement",
      "date": "2026-05-13",
      "url": "https://www.anduril.com/news/anduril-department-of-war-sign-production-agreement-for-surface-launched-barracuda-500m",
      "summary": "企业公告披露地面发射 Barracuda-500M 生产框架协议，首批交付计划在 2027 年上半年。",
      "supports": "特定 500M 改型生产协议；计划不等于交付完成",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-fury",
      "title": "Fury",
      "date": "未标注发布日期",
      "url": "https://www.anduril.com/fury/",
      "summary": "Fury 官方页面描述高性能自主航空任务、商业现成喷气发动机和飞行仿真相关用途。",
      "supports": "Fury 产品定位与动力设计路线",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-omen",
      "title": "EDGE Group and Anduril to Form UAE-US Joint Venture to Develop Autonomous Systems",
      "date": "2025-11-13",
      "url": "https://www.anduril.com/news/edge-group-and-anduril-to-form-uae-us-joint-venture-to-develop-autonomous-systems",
      "summary": "联合开发公告将 Omen 定义为无跑道、悬停转巡航的 Group 3 飞行器，面向监视、补给与通信；2028 年底量产为计划。",
      "supports": "Omen 归类、合作方、用途、Mission Autonomy 与计划边界",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-sentry",
      "title": "Standard Range Sentry — Anduril Armory",
      "date": "未标注发布日期",
      "url": "https://armory.anduril.com/products/standard-range-sentry",
      "summary": "标准型 Sentry 使用边缘传感器融合识别、分类和跟踪地面对象，支持昼夜监视和模块化传感器/电源。",
      "supports": "标准型能力；不外推到所有塔型",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-sentry-xr",
      "title": "Extended Range Sentry — Anduril Armory",
      "date": "未标注发布日期",
      "url": "https://armory.anduril.com/products/extended-range-sentry",
      "summary": "增程型 Sentry 采用更高塔体和长距离传感器头，说明该家族不同型号具有不同配置。",
      "supports": "Sentry 家族存在标准型/增程型配置差异",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-pulsar",
      "title": "Pulsar — Anduril Armory",
      "date": "未标注发布日期",
      "url": "https://armory.anduril.com/products/pulsar",
      "summary": "Pulsar 以软件定义无线电、边缘计算与机器学习支持频谱感知等电子战任务，覆盖固定和机动部署形态。",
      "supports": "软件定义电子战、模块化形态、网络协同",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-wisp",
      "title": "Wisp",
      "date": "未标注发布日期",
      "url": "https://www.anduril.com/wisp",
      "summary": "Wisp 是被动红外成像传感器，支持持续探测跟踪；页面列出水平 360°、垂直 125° 视场。",
      "supports": "传感机理、视场、持续监视",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-wisp-origin",
      "title": "Anduril Industries Acquires Copious Imaging",
      "date": "2021-09-28",
      "url": "https://www.anduril.com/news/anduril-industries-acquires-copius-imaging",
      "summary": "Copious Imaging 的 WISP 长波红外被动成像技术随收购进入 Anduril 产品组合。",
      "supports": "WISP 名称来源、研发沿革、被动红外归类",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-anvil",
      "title": "Anvil",
      "date": "未标注发布日期",
      "url": "https://www.anduril.com/anvil/",
      "summary": "Anvil 页面区分动能拦截基础型与 Anvil-M 弹药型；自主导航与人工正面识别共同构成公开描述。",
      "supports": "Anvil/Anvil-M 区别、人机分工",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-anvil-m",
      "title": "Anduril Announces Anvil-M Munition Variant Of Interceptor Platform",
      "date": "2023-10-05",
      "url": "https://www.anduril.com/news/anvil-m-launch",
      "summary": "Anvil-M 作为 Anvil 弹药改型公布；公告描述 Lattice 汇聚传感器轨迹并支持人工选择处置。",
      "supports": "改型发布时间、系列关联、Lattice 关联",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-roadrunner",
      "title": "Counter UAS",
      "date": "未标注发布日期",
      "url": "https://www.anduril.com/counter-uas/",
      "summary": "Roadrunner 在官方任务页被描述为有人监督、双涡喷、可重复使用的垂直起降自主航空器。",
      "supports": "Roadrunner 基础型起降、动力与可重复使用特征",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-roadrunner-m",
      "title": "Anduril Industries introduces Roadrunner and Roadrunner-M（企业公开帖）",
      "date": "未标注绝对发布日期",
      "url": "https://www.linkedin.com/posts/adnanesmail_introducing-roadrunner-a-vtol-uav-with-twin-activity-7136221891966509057-LxR2",
      "summary": "页面内嵌 Anduril 企业原帖介绍 Roadrunner 与 Roadrunner-M，并说明 M 型可执行防空拦截或返回再用。",
      "supports": "Roadrunner-M 定位与未执行处置时返回再用；未核验详细性能",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-spyglass",
      "title": "Spyglass — Anduril Armory",
      "date": "未标注发布日期",
      "url": "https://armory.anduril.com/products/spyglass",
      "summary": "Spyglass 是 Ku 波段相控阵雷达，产品页描述目标探测、跟踪与高度信息，扫描范围 90° × 55°。",
      "supports": "雷达类别、频段、扫描范围",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-spark",
      "title": "Spark",
      "date": "未标注发布日期",
      "url": "https://www.anduril.com/spark",
      "summary": "Spark 是 X/Ku 双波段雷达，采用半球覆盖并面向行进间空中与地面对象感知。",
      "supports": "雷达类别、双波段、半球覆盖、机动感知",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-dive-ld",
      "title": "Dive-LD",
      "date": "未标注发布日期",
      "url": "https://www.anduril.com/dive-ld",
      "summary": "页面给出约 5.8 m 长、1.2 m 直径、最长约 10 天耐力、最大约 6000 m 深度及超过 1 m³ 载荷空间。",
      "supports": "Dive-LD 尺寸、标称耐力与深度、模块化载荷、公开任务",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-dive-diu",
      "title": "DIU awards Anduril contract to innovate new capabilities for undersea warfare",
      "date": "2024-02-08",
      "url": "https://www.anduril.com/news/diu-awards-anduril-contract-to-innovate-new-capabilities-for-undersea-warfare",
      "summary": "Dive-LD 在 DIU 评估中演示任务并通过 Lattice 向远程操作人员共享位置，随后获原型合同。",
      "supports": "DIU 原型项目、Dive-LD/Lattice 远程监控关联",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-dive-cable",
      "title": "Anduril Announces Autonomous Undersea Cable Inspection Project",
      "date": "2023-03-26",
      "url": "https://www.anduril.com/news/anduril-announces-autonomous-undersea-cable-inspection-project",
      "summary": "公告提出与 NOWRDC 合作，计划以 Dive-LD 检查海底电力电缆，使用 Metron 自主软件识别异常。",
      "supports": "海底电缆检查应用与合作计划；不证明计划已完成",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-seapower",
      "title": "Seapower",
      "date": "未标注发布日期",
      "url": "https://www.anduril.com/sea/seapower",
      "summary": "官方海上体系页分别列出 Dive-LD、基于其模块化设计的 Dive-XL、Copperhead 高速 AUV 家族和 Seabed Sentry 传感网络。",
      "supports": "四种海上对象的类型与体系定位",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-dive-xl",
      "title": "Introducing: Dive-XL（官方视频介绍）",
      "date": "2024-12-09",
      "url": "https://www.youtube.com/watch?v=_-kZpxUf_ys",
      "summary": "Anduril 官方频道介绍商用基线 Dive-XL，定位为采集海洋信息与携带多样载荷的超大型自主水下航行器。",
      "supports": "Dive-XL 独立公开介绍、XL-AUV 分类、任务方向",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-copperhead",
      "title": "Copperhead",
      "date": "未标注发布日期",
      "url": "https://www.anduril.com/copperhead",
      "summary": "官方页面区分 Copperhead-100、100M 和 500，基础型例示感知、通信、磁力计等载荷，M 型为弹药配置。",
      "supports": "高速 AUV 家族、型号区别、公开载荷类别",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-seabed-sentry",
      "title": "Introducing Seabed Sentry（Anduril 企业原帖）",
      "date": "未标注绝对发布日期",
      "url": "https://www.linkedin.com/posts/andurilindustries_we-must-fortify-the-autonomous-subsea-dominance-activity-7313582247847047168-AqAO",
      "summary": "企业原帖介绍移动式海底感知节点网络，支持自主感知、处理与通信，并通过 Lattice 联接。",
      "supports": "海底传感节点、无线网络、Lattice 关联",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-lattice",
      "title": "The Contours of War are Changing — Interoperability at the Edge",
      "date": "2024-12-10",
      "url": "https://www.anduril.com/news/the-contours-of-war-are-changing-we-must-prepare-for-interoperability-at-the-edge",
      "summary": "公告描述 Lattice 连接异构系统及分布式数据，发布 SDK 与合作伙伴计划，并列出开发文档、示例与接口资源。",
      "supports": "Lattice 平台结构、Mesh/SDK 关联、SDK 发布",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-lattice-c2",
      "title": "Lattice for Command & Control",
      "date": "未标注发布日期",
      "url": "https://www.anduril.com/lattice/command-and-control",
      "summary": "C2 页面描述传感器数据融合、共同态势显示和任务管理，并明确与 Mesh 及 SDK 协同。",
      "supports": "C2 能力、Mesh/SDK 关联",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-mission-autonomy",
      "title": "Anduril Unveils Lattice for Mission Autonomy",
      "date": "2023-05-02",
      "url": "https://www.anduril.com/news/anduril-unveils-lattice-for-mission-autonomy",
      "summary": "平台面向人工监督下的多种机器人协作，覆盖任务前规划、执行与事后复盘，采用硬件无关开放架构。",
      "supports": "Mission Autonomy 发布、生命周期、异构协作",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-lattice-mesh",
      "title": "Lattice Mesh",
      "date": "未标注发布日期",
      "url": "https://www.anduril.com/lattice/lattice-mesh",
      "summary": "Mesh 提供去中心化数据分发、异构数据规范化、路由优先级及安全访问，面向受限带宽环境。",
      "supports": "分布式数据网络及公开功能",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-mesh-cdao",
      "title": "CDAO Awards Anduril Production Agreement to Deliver Edge Data Mesh",
      "date": "2024-12-03",
      "url": "https://www.anduril.com/news/cdao-awards-anduril-production-agreement-to-deliver-edge-data-mesh",
      "summary": "企业公告称 CDAO 签订三年生产协议扩展由 Lattice Mesh 支持的边缘数据网络，并通过 SDK 和开放 API 接入伙伴系统。",
      "supports": "Mesh 生产协议、SDK 接入关系",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    },
    {
      "id": "pc-source-lattice-sdk",
      "title": "Publish entities to Lattice — 官方开发文档",
      "date": "未标注发布日期",
      "url": "https://docs.anduril.com/guide/entity/publish",
      "summary": "官方文档介绍通过 Lattice SDK 的 HTTP/gRPC 接口发布和更新实体，区分资产、轨迹等实体模型。",
      "supports": "SDK 接口与实体数据集成；不证明所有硬件即插即用",
      "publisher": "Anduril Industries",
      "sourceType": "first_party",
      "checkedAt": "2026-09-20",
      "verification": "已核验公开正文或检索索引；企业能力描述未作独立实测"
    }
  ];

  var evidence = [
    {
      "id": "pc-evidence-bolt-bolt",
      "productId": "bolt",
      "sourceId": "pc-source-bolt",
      "title": "Bolt｜系列定位、基础型与改型区别、Lattice 软件关联",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "区分 Bolt 侦察/搜救基础型与 Bolt-M 弹药型；两者属于便携垂直起降系列。",
      "supports": "系列定位、基础型与改型区别、Lattice 软件关联",
      "url": "https://www.anduril.com/news/anduril-unveils-bolt-and-bolt-m",
      "date": "2024-10-10",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-bolt-m-bolt",
      "productId": "bolt-m",
      "sourceId": "pc-source-bolt",
      "title": "Bolt-M｜系列定位、基础型与改型区别、Lattice 软件关联",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "区分 Bolt 侦察/搜救基础型与 Bolt-M 弹药型；两者属于便携垂直起降系列。",
      "supports": "系列定位、基础型与改型区别、Lattice 软件关联",
      "url": "https://www.anduril.com/news/anduril-unveils-bolt-and-bolt-m",
      "date": "2024-10-10",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-altius-altius",
      "productId": "altius",
      "sourceId": "pc-source-altius",
      "title": "Altius｜ALTIUS-600 示例、多载荷、协同演示",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "ALTIUS-600 在 EDGE22 演示多平台协作；平台采用模块化载荷和管式发射设计。",
      "supports": "ALTIUS-600 示例、多载荷、协同演示",
      "url": "https://www.anduril.com/news/altius-air-launched-effects-demonstrated-advanced-teaming-at-us-army-project-edge-2022",
      "date": "2022-05-19",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-altius-altius-origin",
      "productId": "altius",
      "sourceId": "pc-source-altius-origin",
      "title": "Altius｜研发来源、并购时间与归属",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "Anduril 宣布收购 Area-I，将 ALTIUS 纳入产品组合。",
      "supports": "研发来源、并购时间与归属",
      "url": "https://www.anduril.com/news/anduril-industries-acquires-area-i-adds-altius-capabilities-to-hardware-portfolio",
      "date": "2021-04-01",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-altius-altius-m",
      "productId": "altius",
      "sourceId": "pc-source-altius-m",
      "title": "Altius｜600M/700M 名称、巡飞弹归类、采购公告",
      "publisher": "UK Ministry of Defence",
      "sourceType": "政府第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "英国政府公告明确列出 Altius 600m 和 700m 两种巡飞弹及供应合同；没有给出两型号通用性能表。",
      "supports": "600M/700M 名称、巡飞弹归类、采购公告",
      "url": "https://www.gov.uk/government/news/advanced-attack-drones-for-ukraine-in-new-deal-struck-by-uk-government-and-anduril-uk",
      "date": "2025-03-06",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-ghost-ghost",
      "productId": "ghost",
      "sourceId": "pc-source-ghost",
      "title": "Ghost｜Ghost/X 关系、模块化载荷、Lattice、空军自主能力合同",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "公告将 Ghost-X 说明为 Ghost 新改型，并说明 Ghost 使用 Lattice 进行任务规划、空域管理和飞行控制。",
      "supports": "Ghost/X 关系、模块化载荷、Lattice、空军自主能力合同",
      "url": "https://www.anduril.com/article/air-force-ghost-selection/",
      "date": "2023-09-29",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-ghost-x-ghost-x",
      "productId": "ghost-x",
      "sourceId": "pc-source-ghost-x",
      "title": "Ghost-X｜Ghost-X 独立规格、模块化配置",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "Ghost-X 页面列示巡航续航 80 分钟、范围 25 km、载荷 11 kg、双电池重量 25 kg，并描述多载荷与可换模块设计。",
      "supports": "Ghost-X 独立规格、模块化配置",
      "url": "https://armory.anduril.com/products/ghost-x",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-ghost-x-ghost",
      "productId": "ghost-x",
      "sourceId": "pc-source-ghost",
      "title": "Ghost-X｜Ghost/X 关系、模块化载荷、Lattice、空军自主能力合同",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "公告将 Ghost-X 说明为 Ghost 新改型，并说明 Ghost 使用 Lattice 进行任务规划、空域管理和飞行控制。",
      "supports": "Ghost/X 关系、模块化载荷、Lattice、空军自主能力合同",
      "url": "https://www.anduril.com/article/air-force-ghost-selection/",
      "date": "2023-09-29",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-ghost-x-ghost-mesh",
      "productId": "ghost-x",
      "sourceId": "pc-source-ghost-mesh",
      "title": "Ghost-X｜Ghost-X 与 Lattice Mesh 的演示关联",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "企业报道 Ghost-X 在 Ivy Sting 2 通过 Lattice Mesh 向 NGC2 提供视频数据；属于特定演习集成实例。",
      "supports": "Ghost-X 与 Lattice Mesh 的演示关联",
      "url": "https://www.anduril.com/news/how-ngc2-is-expanding-the-battlefield-network-at-ivy-sting-2",
      "date": "2025-11-19",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-barracuda-barracuda",
      "productId": "barracuda",
      "sourceId": "pc-source-barracuda",
      "title": "Barracuda｜Barracuda 家族定位、Fury 定位、空中体系归类",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "官方任务页面把 Barracuda 定义为面向规模生产的吸气式自主航空器家族，并将 Fury 列为高性能多任务航空器。",
      "supports": "Barracuda 家族定位、Fury 定位、空中体系归类",
      "url": "https://www.anduril.com/air/air-dominance-and-strike",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-barracuda-barracuda-production",
      "productId": "barracuda",
      "sourceId": "pc-source-barracuda-production",
      "title": "Barracuda｜特定 500M 改型生产协议；计划不等于交付完成",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "企业公告披露地面发射 Barracuda-500M 生产框架协议，首批交付计划在 2027 年上半年。",
      "supports": "特定 500M 改型生产协议；计划不等于交付完成",
      "url": "https://www.anduril.com/news/anduril-department-of-war-sign-production-agreement-for-surface-launched-barracuda-500m",
      "date": "2026-05-13",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-fury-fury",
      "productId": "fury",
      "sourceId": "pc-source-fury",
      "title": "Fury｜Fury 产品定位与动力设计路线",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "Fury 官方页面描述高性能自主航空任务、商业现成喷气发动机和飞行仿真相关用途。",
      "supports": "Fury 产品定位与动力设计路线",
      "url": "https://www.anduril.com/fury/",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-fury-barracuda",
      "productId": "fury",
      "sourceId": "pc-source-barracuda",
      "title": "Fury｜Barracuda 家族定位、Fury 定位、空中体系归类",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "官方任务页面把 Barracuda 定义为面向规模生产的吸气式自主航空器家族，并将 Fury 列为高性能多任务航空器。",
      "supports": "Barracuda 家族定位、Fury 定位、空中体系归类",
      "url": "https://www.anduril.com/air/air-dominance-and-strike",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-omen-omen",
      "productId": "omen",
      "sourceId": "pc-source-omen",
      "title": "Omen｜Omen 归类、合作方、用途、Mission Autonomy 与计划边界",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "联合开发公告将 Omen 定义为无跑道、悬停转巡航的 Group 3 飞行器，面向监视、补给与通信；2028 年底量产为计划。",
      "supports": "Omen 归类、合作方、用途、Mission Autonomy 与计划边界",
      "url": "https://www.anduril.com/news/edge-group-and-anduril-to-form-uae-us-joint-venture-to-develop-autonomous-systems",
      "date": "2025-11-13",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-sentry-sentry",
      "productId": "sentry",
      "sourceId": "pc-source-sentry",
      "title": "Sentry｜标准型能力；不外推到所有塔型",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "标准型 Sentry 使用边缘传感器融合识别、分类和跟踪地面对象，支持昼夜监视和模块化传感器/电源。",
      "supports": "标准型能力；不外推到所有塔型",
      "url": "https://armory.anduril.com/products/standard-range-sentry",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-sentry-sentry-xr",
      "productId": "sentry",
      "sourceId": "pc-source-sentry-xr",
      "title": "Sentry｜Sentry 家族存在标准型/增程型配置差异",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "增程型 Sentry 采用更高塔体和长距离传感器头，说明该家族不同型号具有不同配置。",
      "supports": "Sentry 家族存在标准型/增程型配置差异",
      "url": "https://armory.anduril.com/products/extended-range-sentry",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-pulsar-pulsar",
      "productId": "pulsar",
      "sourceId": "pc-source-pulsar",
      "title": "Pulsar｜软件定义电子战、模块化形态、网络协同",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "Pulsar 以软件定义无线电、边缘计算与机器学习支持频谱感知等电子战任务，覆盖固定和机动部署形态。",
      "supports": "软件定义电子战、模块化形态、网络协同",
      "url": "https://armory.anduril.com/products/pulsar",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-wisp-wisp",
      "productId": "wisp",
      "sourceId": "pc-source-wisp",
      "title": "Wisp｜传感机理、视场、持续监视",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "Wisp 是被动红外成像传感器，支持持续探测跟踪；页面列出水平 360°、垂直 125° 视场。",
      "supports": "传感机理、视场、持续监视",
      "url": "https://www.anduril.com/wisp",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-wisp-wisp-origin",
      "productId": "wisp",
      "sourceId": "pc-source-wisp-origin",
      "title": "Wisp｜WISP 名称来源、研发沿革、被动红外归类",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "Copious Imaging 的 WISP 长波红外被动成像技术随收购进入 Anduril 产品组合。",
      "supports": "WISP 名称来源、研发沿革、被动红外归类",
      "url": "https://www.anduril.com/news/anduril-industries-acquires-copius-imaging",
      "date": "2021-09-28",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-anvil-anvil",
      "productId": "anvil",
      "sourceId": "pc-source-anvil",
      "title": "Anvil｜Anvil/Anvil-M 区别、人机分工",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "Anvil 页面区分动能拦截基础型与 Anvil-M 弹药型；自主导航与人工正面识别共同构成公开描述。",
      "supports": "Anvil/Anvil-M 区别、人机分工",
      "url": "https://www.anduril.com/anvil/",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-anvil-anvil-m",
      "productId": "anvil",
      "sourceId": "pc-source-anvil-m",
      "title": "Anvil｜改型发布时间、系列关联、Lattice 关联",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "Anvil-M 作为 Anvil 弹药改型公布；公告描述 Lattice 汇聚传感器轨迹并支持人工选择处置。",
      "supports": "改型发布时间、系列关联、Lattice 关联",
      "url": "https://www.anduril.com/news/anvil-m-launch",
      "date": "2023-10-05",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-anvil-m-anvil-m",
      "productId": "anvil-m",
      "sourceId": "pc-source-anvil-m",
      "title": "Anvil-M｜改型发布时间、系列关联、Lattice 关联",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "Anvil-M 作为 Anvil 弹药改型公布；公告描述 Lattice 汇聚传感器轨迹并支持人工选择处置。",
      "supports": "改型发布时间、系列关联、Lattice 关联",
      "url": "https://www.anduril.com/news/anvil-m-launch",
      "date": "2023-10-05",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-anvil-m-anvil",
      "productId": "anvil-m",
      "sourceId": "pc-source-anvil",
      "title": "Anvil-M｜Anvil/Anvil-M 区别、人机分工",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "Anvil 页面区分动能拦截基础型与 Anvil-M 弹药型；自主导航与人工正面识别共同构成公开描述。",
      "supports": "Anvil/Anvil-M 区别、人机分工",
      "url": "https://www.anduril.com/anvil/",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-roadrunner-roadrunner",
      "productId": "roadrunner",
      "sourceId": "pc-source-roadrunner",
      "title": "Roadrunner｜Roadrunner 基础型起降、动力与可重复使用特征",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "Roadrunner 在官方任务页被描述为有人监督、双涡喷、可重复使用的垂直起降自主航空器。",
      "supports": "Roadrunner 基础型起降、动力与可重复使用特征",
      "url": "https://www.anduril.com/counter-uas/",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-roadrunner-roadrunner-m",
      "productId": "roadrunner",
      "sourceId": "pc-source-roadrunner-m",
      "title": "Roadrunner｜Roadrunner-M 定位与未执行处置时返回再用；未核验详细性能",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "页面内嵌 Anduril 企业原帖介绍 Roadrunner 与 Roadrunner-M，并说明 M 型可执行防空拦截或返回再用。",
      "supports": "Roadrunner-M 定位与未执行处置时返回再用；未核验详细性能",
      "url": "https://www.linkedin.com/posts/adnanesmail_introducing-roadrunner-a-vtol-uav-with-twin-activity-7136221891966509057-LxR2",
      "date": "未标注绝对发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-roadrunner-m-roadrunner-m",
      "productId": "roadrunner-m",
      "sourceId": "pc-source-roadrunner-m",
      "title": "Roadrunner-M｜Roadrunner-M 定位与未执行处置时返回再用；未核验详细性能",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "页面内嵌 Anduril 企业原帖介绍 Roadrunner 与 Roadrunner-M，并说明 M 型可执行防空拦截或返回再用。",
      "supports": "Roadrunner-M 定位与未执行处置时返回再用；未核验详细性能",
      "url": "https://www.linkedin.com/posts/adnanesmail_introducing-roadrunner-a-vtol-uav-with-twin-activity-7136221891966509057-LxR2",
      "date": "未标注绝对发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-roadrunner-m-roadrunner",
      "productId": "roadrunner-m",
      "sourceId": "pc-source-roadrunner",
      "title": "Roadrunner-M｜Roadrunner 基础型起降、动力与可重复使用特征",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "Roadrunner 在官方任务页被描述为有人监督、双涡喷、可重复使用的垂直起降自主航空器。",
      "supports": "Roadrunner 基础型起降、动力与可重复使用特征",
      "url": "https://www.anduril.com/counter-uas/",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-spyglass-spyglass",
      "productId": "spyglass",
      "sourceId": "pc-source-spyglass",
      "title": "Spyglass｜雷达类别、频段、扫描范围",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "Spyglass 是 Ku 波段相控阵雷达，产品页描述目标探测、跟踪与高度信息，扫描范围 90° × 55°。",
      "supports": "雷达类别、频段、扫描范围",
      "url": "https://armory.anduril.com/products/spyglass",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-spark-spark",
      "productId": "spark",
      "sourceId": "pc-source-spark",
      "title": "Spark｜雷达类别、双波段、半球覆盖、机动感知",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "Spark 是 X/Ku 双波段雷达，采用半球覆盖并面向行进间空中与地面对象感知。",
      "supports": "雷达类别、双波段、半球覆盖、机动感知",
      "url": "https://www.anduril.com/spark",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-dive-ld-dive-ld",
      "productId": "dive-ld",
      "sourceId": "pc-source-dive-ld",
      "title": "Dive-LD｜Dive-LD 尺寸、标称耐力与深度、模块化载荷、公开任务",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "页面给出约 5.8 m 长、1.2 m 直径、最长约 10 天耐力、最大约 6000 m 深度及超过 1 m³ 载荷空间。",
      "supports": "Dive-LD 尺寸、标称耐力与深度、模块化载荷、公开任务",
      "url": "https://www.anduril.com/dive-ld",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-dive-ld-dive-diu",
      "productId": "dive-ld",
      "sourceId": "pc-source-dive-diu",
      "title": "Dive-LD｜DIU 原型项目、Dive-LD/Lattice 远程监控关联",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "Dive-LD 在 DIU 评估中演示任务并通过 Lattice 向远程操作人员共享位置，随后获原型合同。",
      "supports": "DIU 原型项目、Dive-LD/Lattice 远程监控关联",
      "url": "https://www.anduril.com/news/diu-awards-anduril-contract-to-innovate-new-capabilities-for-undersea-warfare",
      "date": "2024-02-08",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-dive-ld-dive-cable",
      "productId": "dive-ld",
      "sourceId": "pc-source-dive-cable",
      "title": "Dive-LD｜海底电缆检查应用与合作计划；不证明计划已完成",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "公告提出与 NOWRDC 合作，计划以 Dive-LD 检查海底电力电缆，使用 Metron 自主软件识别异常。",
      "supports": "海底电缆检查应用与合作计划；不证明计划已完成",
      "url": "https://www.anduril.com/news/anduril-announces-autonomous-undersea-cable-inspection-project",
      "date": "2023-03-26",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-dive-ld-seapower",
      "productId": "dive-ld",
      "sourceId": "pc-source-seapower",
      "title": "Dive-LD｜四种海上对象的类型与体系定位",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "官方海上体系页分别列出 Dive-LD、基于其模块化设计的 Dive-XL、Copperhead 高速 AUV 家族和 Seabed Sentry 传感网络。",
      "supports": "四种海上对象的类型与体系定位",
      "url": "https://www.anduril.com/sea/seapower",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-dive-xl-dive-xl",
      "productId": "dive-xl",
      "sourceId": "pc-source-dive-xl",
      "title": "Dive-XL｜Dive-XL 独立公开介绍、XL-AUV 分类、任务方向",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "Anduril 官方频道介绍商用基线 Dive-XL，定位为采集海洋信息与携带多样载荷的超大型自主水下航行器。",
      "supports": "Dive-XL 独立公开介绍、XL-AUV 分类、任务方向",
      "url": "https://www.youtube.com/watch?v=_-kZpxUf_ys",
      "date": "2024-12-09",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-dive-xl-seapower",
      "productId": "dive-xl",
      "sourceId": "pc-source-seapower",
      "title": "Dive-XL｜四种海上对象的类型与体系定位",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "官方海上体系页分别列出 Dive-LD、基于其模块化设计的 Dive-XL、Copperhead 高速 AUV 家族和 Seabed Sentry 传感网络。",
      "supports": "四种海上对象的类型与体系定位",
      "url": "https://www.anduril.com/sea/seapower",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-copperhead-copperhead",
      "productId": "copperhead",
      "sourceId": "pc-source-copperhead",
      "title": "Copperhead｜高速 AUV 家族、型号区别、公开载荷类别",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "官方页面区分 Copperhead-100、100M 和 500，基础型例示感知、通信、磁力计等载荷，M 型为弹药配置。",
      "supports": "高速 AUV 家族、型号区别、公开载荷类别",
      "url": "https://www.anduril.com/copperhead",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-copperhead-seapower",
      "productId": "copperhead",
      "sourceId": "pc-source-seapower",
      "title": "Copperhead｜四种海上对象的类型与体系定位",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "官方海上体系页分别列出 Dive-LD、基于其模块化设计的 Dive-XL、Copperhead 高速 AUV 家族和 Seabed Sentry 传感网络。",
      "supports": "四种海上对象的类型与体系定位",
      "url": "https://www.anduril.com/sea/seapower",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-seabed-sentry-seabed-sentry",
      "productId": "seabed-sentry",
      "sourceId": "pc-source-seabed-sentry",
      "title": "Seabed Sentry｜海底传感节点、无线网络、Lattice 关联",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "企业原帖介绍移动式海底感知节点网络，支持自主感知、处理与通信，并通过 Lattice 联接。",
      "supports": "海底传感节点、无线网络、Lattice 关联",
      "url": "https://www.linkedin.com/posts/andurilindustries_we-must-fortify-the-autonomous-subsea-dominance-activity-7313582247847047168-AqAO",
      "date": "未标注绝对发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-seabed-sentry-seapower",
      "productId": "seabed-sentry",
      "sourceId": "pc-source-seapower",
      "title": "Seabed Sentry｜四种海上对象的类型与体系定位",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "官方海上体系页分别列出 Dive-LD、基于其模块化设计的 Dive-XL、Copperhead 高速 AUV 家族和 Seabed Sentry 传感网络。",
      "supports": "四种海上对象的类型与体系定位",
      "url": "https://www.anduril.com/sea/seapower",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-lattice-lattice",
      "productId": "lattice",
      "sourceId": "pc-source-lattice",
      "title": "Lattice｜Lattice 平台结构、Mesh/SDK 关联、SDK 发布",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "公告描述 Lattice 连接异构系统及分布式数据，发布 SDK 与合作伙伴计划，并列出开发文档、示例与接口资源。",
      "supports": "Lattice 平台结构、Mesh/SDK 关联、SDK 发布",
      "url": "https://www.anduril.com/news/the-contours-of-war-are-changing-we-must-prepare-for-interoperability-at-the-edge",
      "date": "2024-12-10",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-lattice-lattice-c2",
      "productId": "lattice",
      "sourceId": "pc-source-lattice-c2",
      "title": "Lattice｜C2 能力、Mesh/SDK 关联",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "C2 页面描述传感器数据融合、共同态势显示和任务管理，并明确与 Mesh 及 SDK 协同。",
      "supports": "C2 能力、Mesh/SDK 关联",
      "url": "https://www.anduril.com/lattice/command-and-control",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-lattice-mission-autonomy",
      "productId": "lattice",
      "sourceId": "pc-source-mission-autonomy",
      "title": "Lattice｜Mission Autonomy 发布、生命周期、异构协作",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "平台面向人工监督下的多种机器人协作，覆盖任务前规划、执行与事后复盘，采用硬件无关开放架构。",
      "supports": "Mission Autonomy 发布、生命周期、异构协作",
      "url": "https://www.anduril.com/news/anduril-unveils-lattice-for-mission-autonomy",
      "date": "2023-05-02",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-lattice-lattice-mesh",
      "productId": "lattice",
      "sourceId": "pc-source-lattice-mesh",
      "title": "Lattice｜分布式数据网络及公开功能",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "Mesh 提供去中心化数据分发、异构数据规范化、路由优先级及安全访问，面向受限带宽环境。",
      "supports": "分布式数据网络及公开功能",
      "url": "https://www.anduril.com/lattice/lattice-mesh",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-lattice-c2-lattice-c2",
      "productId": "lattice-c2",
      "sourceId": "pc-source-lattice-c2",
      "title": "Lattice C2｜C2 能力、Mesh/SDK 关联",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "C2 页面描述传感器数据融合、共同态势显示和任务管理，并明确与 Mesh 及 SDK 协同。",
      "supports": "C2 能力、Mesh/SDK 关联",
      "url": "https://www.anduril.com/lattice/command-and-control",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-mission-autonomy-mission-autonomy",
      "productId": "mission-autonomy",
      "sourceId": "pc-source-mission-autonomy",
      "title": "Mission Autonomy｜Mission Autonomy 发布、生命周期、异构协作",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "平台面向人工监督下的多种机器人协作，覆盖任务前规划、执行与事后复盘，采用硬件无关开放架构。",
      "supports": "Mission Autonomy 发布、生命周期、异构协作",
      "url": "https://www.anduril.com/news/anduril-unveils-lattice-for-mission-autonomy",
      "date": "2023-05-02",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-mission-autonomy-omen",
      "productId": "mission-autonomy",
      "sourceId": "pc-source-omen",
      "title": "Mission Autonomy｜Omen 归类、合作方、用途、Mission Autonomy 与计划边界",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "联合开发公告将 Omen 定义为无跑道、悬停转巡航的 Group 3 飞行器，面向监视、补给与通信；2028 年底量产为计划。",
      "supports": "Omen 归类、合作方、用途、Mission Autonomy 与计划边界",
      "url": "https://www.anduril.com/news/edge-group-and-anduril-to-form-uae-us-joint-venture-to-develop-autonomous-systems",
      "date": "2025-11-13",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-lattice-mesh-lattice-mesh",
      "productId": "lattice-mesh",
      "sourceId": "pc-source-lattice-mesh",
      "title": "Lattice Mesh｜分布式数据网络及公开功能",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "Mesh 提供去中心化数据分发、异构数据规范化、路由优先级及安全访问，面向受限带宽环境。",
      "supports": "分布式数据网络及公开功能",
      "url": "https://www.anduril.com/lattice/lattice-mesh",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-lattice-mesh-mesh-cdao",
      "productId": "lattice-mesh",
      "sourceId": "pc-source-mesh-cdao",
      "title": "Lattice Mesh｜Mesh 生产协议、SDK 接入关系",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "企业公告称 CDAO 签订三年生产协议扩展由 Lattice Mesh 支持的边缘数据网络，并通过 SDK 和开放 API 接入伙伴系统。",
      "supports": "Mesh 生产协议、SDK 接入关系",
      "url": "https://www.anduril.com/news/cdao-awards-anduril-production-agreement-to-deliver-edge-data-mesh",
      "date": "2024-12-03",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-lattice-mesh-ghost-mesh",
      "productId": "lattice-mesh",
      "sourceId": "pc-source-ghost-mesh",
      "title": "Lattice Mesh｜Ghost-X 与 Lattice Mesh 的演示关联",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "企业报道 Ghost-X 在 Ivy Sting 2 通过 Lattice Mesh 向 NGC2 提供视频数据；属于特定演习集成实例。",
      "supports": "Ghost-X 与 Lattice Mesh 的演示关联",
      "url": "https://www.anduril.com/news/how-ngc2-is-expanding-the-battlefield-network-at-ivy-sting-2",
      "date": "2025-11-19",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-lattice-sdk-lattice-sdk",
      "productId": "lattice-sdk",
      "sourceId": "pc-source-lattice-sdk",
      "title": "Lattice SDK｜SDK 接口与实体数据集成；不证明所有硬件即插即用",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "官方文档介绍通过 Lattice SDK 的 HTTP/gRPC 接口发布和更新实体，区分资产、轨迹等实体模型。",
      "supports": "SDK 接口与实体数据集成；不证明所有硬件即插即用",
      "url": "https://docs.anduril.com/guide/entity/publish",
      "date": "未标注发布日期",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-lattice-sdk-lattice",
      "productId": "lattice-sdk",
      "sourceId": "pc-source-lattice",
      "title": "Lattice SDK｜Lattice 平台结构、Mesh/SDK 关联、SDK 发布",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "公告描述 Lattice 连接异构系统及分布式数据，发布 SDK 与合作伙伴计划，并列出开发文档、示例与接口资源。",
      "supports": "Lattice 平台结构、Mesh/SDK 关联、SDK 发布",
      "url": "https://www.anduril.com/news/the-contours-of-war-are-changing-we-must-prepare-for-interoperability-at-the-edge",
      "date": "2024-12-10",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-lattice-sdk-mesh-cdao",
      "productId": "lattice-sdk",
      "sourceId": "pc-source-mesh-cdao",
      "title": "Lattice SDK｜Mesh 生产协议、SDK 接入关系",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "企业公告称 CDAO 签订三年生产协议扩展由 Lattice Mesh 支持的边缘数据网络，并通过 SDK 和开放 API 接入伙伴系统。",
      "supports": "Mesh 生产协议、SDK 接入关系",
      "url": "https://www.anduril.com/news/cdao-awards-anduril-production-agreement-to-deliver-edge-data-mesh",
      "date": "2024-12-03",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-altius-m-altius-m",
      "productId": "altius-m",
      "sourceId": "pc-source-altius-m",
      "title": "Altius-M｜600M/700M 名称、巡飞弹归类、采购公告",
      "publisher": "UK Ministry of Defence",
      "sourceType": "政府第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "英国政府公告明确列出 Altius 600m 和 700m 两种巡飞弹及供应合同；没有给出两型号通用性能表。",
      "supports": "600M/700M 名称、巡飞弹归类、采购公告",
      "url": "https://www.gov.uk/government/news/advanced-attack-drones-for-ukraine-in-new-deal-struck-by-uk-government-and-anduril-uk",
      "date": "2025-03-06",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    },
    {
      "id": "pc-evidence-altius-m-altius",
      "productId": "altius-m",
      "sourceId": "pc-source-altius",
      "title": "Altius-M｜ALTIUS-600 示例、多载荷、协同演示",
      "publisher": "Anduril Industries",
      "sourceType": "企业第一方",
      "grade": "A 公开出处",
      "status": "已核验出处",
      "summary": "ALTIUS-600 在 EDGE22 演示多平台协作；平台采用模块化载荷和管式发射设计。",
      "supports": "ALTIUS-600 示例、多载荷、协同演示",
      "url": "https://www.anduril.com/news/altius-air-launched-effects-demonstrated-advanced-teaming-at-us-army-project-edge-2022",
      "date": "2022-05-19",
      "checkedAt": "2026-09-20",
      "scopeNote": "仅支持本条所述公开事实；厂商能力与计划不等于独立实测或已交付。"
    }
  ];

  window.PRODUCT_CATALOG_DATA = { products: products, sources: sources, evidence: evidence, checkedAt: "2026-09-20" };
  if (window.PLATFORM_DATA) {
    window.PLATFORM_DATA.evidence = (window.PLATFORM_DATA.evidence || []).concat(evidence);
  }
}());
