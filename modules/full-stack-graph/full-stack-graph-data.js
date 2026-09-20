(function () {
  "use strict";

  window.FULL_STACK_GRAPH_DATA = {
    context: {
      topic: "Anduril Industries",
      timeRange: "2018—2026",
      graphType: "可视化技术/事件图谱"
    },
    stages: [
      { start: 2018, end: 2021, label: "2018—2020 平台底座形成" },
      { start: 2021, end: 2023.5, label: "2021—2023 战术平台扩展" },
      { start: 2023.5, end: 2025, label: "2023H2—2025 任务化与武器化深化" },
      { start: 2025, end: 2027, label: "2025—至今 高性能平台与生态外延" }
    ],
    layers: [
      { id: "platform", index: "01", label: "核心平台与交互", english: "Core Platform & Interaction", objects: ["lattice"] },
      { id: "interface", index: "02", label: "开放接口与数据语义", english: "Open Interface & Data Semantics", objects: ["lattice-sdk"] },
      { id: "autonomy", index: "03", label: "指挥控制与任务自主", english: "Command, Control & Mission Autonomy", objects: ["lattice-c2", "mission-autonomy"] },
      { id: "mesh", index: "04", label: "分布式网络与数据基础", english: "Distributed Network & Data Foundation", objects: ["lattice-mesh"] },
      {
        id: "systems",
        index: "05",
        label: "无人平台与任务执行",
        english: "Unmanned Platforms & Mission Effects",
        sublanes: [
          { id: "recon", label: "战术侦察与感知", objects: ["ghost", "altius", "bolt"] },
          { id: "effects", label: "打击 / 拦截", objects: ["anvil", "altius-m", "roadrunner", "bolt-m", "barracuda"] },
          { id: "air", label: "高性能 / 机动", objects: ["fury", "omen"] }
        ]
      },
      { id: "external", index: "06", label: "异构承载与外部系统", english: "Heterogeneous Carriage & External Systems", objects: [] }
    ],
    externalSystems: [
      "战术电台", "SATCOM", "MANET", "5G", "Wi-Fi", "以太网", "传感器", "无人平台", "武器装备", "第三方任务系统"
    ],
    objects: [
      {
        id: "lattice",
        name: "Lattice",
        layer: "platform",
        events: [
          { id: "lattice-2018-11", date: "2018.11", title: "Lattice Platform Security System 公开测试" },
          { id: "lattice-2020-09", date: "2020.9", title: "ABMS 演示自动化 C2、感知融合与网络管理" },
          { id: "lattice-2022-01", date: "2022.1", title: "“Lattice Operating System”公开表述" },
          { id: "lattice-2022-12", date: "2022.12", title: "“Lattice OS”稳定命名" }
        ]
      },
      {
        id: "lattice-sdk",
        name: "Lattice SDK",
        layer: "interface",
        events: [
          { id: "lattice-sdk-2024-12", date: "2024.12", title: "SDK / Developer Program 公开" },
          { id: "lattice-sdk-2025-07", date: "2025.7", title: "SDK 向 v2 / REST / OpenAPI 升级" }
        ]
      },
      {
        id: "lattice-c2",
        name: "Lattice C2",
        layer: "autonomy",
        events: [
          { id: "lattice-c2-2018-11", date: "2018.11", title: "C2 雏形" },
          { id: "lattice-c2-2020-09", date: "2020.9", title: "ABMS 自动化 C2" },
          { id: "lattice-c2-2023-08", date: "2023.8", title: "“Lattice C2”明确出现" },
          { id: "lattice-c2-2024-04", date: "2024.4", title: "Menace-X" },
          {
            id: "lattice-c2-2024-06",
            date: "2024.6",
            title: "全球分布式 C2 演示",
            featured: true,
            eventType: "多域分布式指挥控制演示",
            summary: "2024 年 6 月的 Valiant Shield 联合演习中，Anduril 以 Lattice 为软件底座提供地理分布式指挥控制能力，将野外训练点、值班中心和各级指挥部等数十处节点接入同一体系，并面向美国海军陆战队、海军、空军和陆军形成共享作战态势图。",
            highlights: [
              "支持大规模数据接入、关联处理、通用作战态势图和机器到机器任务下达。",
              "跨越数十处地理位置连接训练场、值班中心与指挥部，验证跨军种信息共享。",
              "Menace 系列将计算、通信与 Lattice C2 带到 DDIL 条件下的战术边缘。"
            ],
            assessment: "该事件表明 Lattice C2 已从局部任务应用扩展到跨地域、跨军种的分布式 C2 演示，公开证据重点支持其集成规模、互操作性和战术边缘延伸能力；演习演示不等同于已完成全范围作战部署。",
            source: {
              title: "Anduril Industries Demonstrates Globally Distributed Command and Control Capabilities During INDOPACOM Exercise",
              publisher: "Anduril Industries",
              type: "官方新闻稿",
              publishedAt: "2024-06-19",
              url: "https://www.anduril.com/news/anduril-industries-demonstrates-globally-distributed-command-and-control-capabilities-during"
            }
          },
          { id: "lattice-c2-2025-07", date: "2025.7", title: "美国陆军 NGC2 原型项目" }
        ]
      },
      {
        id: "mission-autonomy",
        name: "Mission Autonomy",
        layer: "autonomy",
        events: [
          { id: "mission-autonomy-2023-05", date: "2023.5", title: "Mission Autonomy 正式发布" },
          { id: "mission-autonomy-2023-06", date: "2023.6", title: "EDGE23 实证演示" },
          { id: "mission-autonomy-2024-09", date: "2024.9", title: "向太空任务扩展" },
          { id: "mission-autonomy-2024-11", date: "2024.11", title: "Replicator 开放架构" },
          { id: "mission-autonomy-2025-03", date: "2025.3", title: "USSOCOM 系统集成" },
          { id: "mission-autonomy-2026-02", date: "2026.2", title: "YFQ-44A 飞行验证" }
        ]
      },
      {
        id: "lattice-mesh",
        name: "Lattice Mesh",
        layer: "mesh",
        events: [
          { id: "lattice-mesh-2021-06", date: "2021.6", title: "Mesh Networking 能力公开表述" },
          { id: "lattice-mesh-2023-07", date: "2023.7", title: "Mesh 网络层进一步明确" },
          { id: "lattice-mesh-2023-08", date: "2023.8", title: "Data Mesh 进入 C2 演示" },
          {
            id: "lattice-mesh-2024-12",
            date: "2024.12",
            title: "Lattice Mesh 对象边界进一步明确",
            featured: true,
            eventType: "平台能力命名与边界明确",
            summary: "该事件表明，Lattice Mesh 作为连接上层任务软件与底层设备/网络的分布式网络与数据基础能力，其对象边界进一步明确。",
            source: {
              title: "CDAO Awards Anduril Production Agreement to Deliver Edge Data Mesh",
              publisher: "Anduril Industries",
              type: "官方新闻稿",
              publishedAt: "2024-12-03",
              url: "https://www.anduril.com/news/cdao-awards-anduril-production-agreement-to-deliver-edge-data-mesh"
            }
          },
          {
            id: "lattice-mesh-2025-05",
            date: "2025.5",
            title: "实装 / 战术化应用",
            featured: true,
            eventType: "战术边缘实装与便携部署",
            summary: "2025 年 5 月，Anduril 发布紧凑型 Menace-T 战术 C4 系统。该系统基于 Voyager 计算与通信能力、由 Lattice Mesh 提供网络与数据支撑，可由单名操作员携行并在数分钟内投入运行，把任务软件、加密通信、情报采集和边缘计算能力带到基础设施薄弱的前沿环境。",
            highlights: [
              "采用双箱体便携形态，单名操作员即可部署，并可在数分钟内进入工作状态。",
              "能够运行 Lattice Mesh、任务关键软件及第三方软件栈，并支持边缘 AI 推理与学习。",
              "Anduril 披露其已用于实时目标数据回传，并部署到地面车辆、海上平台及联合与盟军环境。"
            ],
            assessment: "Menace-T 将 Lattice Mesh 从网络与数据能力描述进一步落到可携行、软硬一体的战术边缘载体上，是产品化和部署形态成熟的重要公开信号。具体使用范围与效果主要来自企业官方披露，仍需结合军方或用户侧资料交叉验证。",
            source: {
              title: "Anduril Introduces Menace-T: A Compact, Field-Deployable C4 System Designed for the Tactical Edge",
              publisher: "Anduril Industries",
              type: "官方新闻稿",
              publishedAt: "2025-05-05",
              url: "https://www.anduril.com/news/anduril-introduces-menace-t-a-compact-field-deployable-c4-system-designed-for-the-tactical-edge"
            }
          },
          { id: "lattice-mesh-2025-10", date: "2025.10", title: "DDIL resilient C2 / 战场网络扩展" }
        ]
      },
      {
        id: "ghost",
        name: "Ghost",
        layer: "systems",
        sublane: "recon",
        events: [
          { id: "ghost-2020-09", date: "2020.9", title: "Ghost 4 发布" },
          { id: "ghost-2023-09", date: "2023.9", title: "Ghost-X 发布" },
          { id: "ghost-2024-06", date: "2024.6", title: "Blue UAS Cleared List" },
          { id: "ghost-2024-09", date: "2024.9", title: "美陆军 Company Level sUAS" }
        ]
      },
      {
        id: "omen",
        name: "Omen",
        layer: "systems",
        sublane: "air",
        events: [
          { id: "omen-2025-11a", date: "2025.11", title: "Omen 正式公开" },
          { id: "omen-2025-11b", date: "2025.11", title: "EDGE 联合开发 / 采购框架" },
          { id: "omen-2025-11c", date: "2025.11", title: "Archer 提供电动动力系统" }
        ]
      },
      {
        id: "altius",
        name: "Altius",
        layer: "systems",
        sublane: "recon",
        events: [
          { id: "altius-2020-03", date: "2020.3", title: "Altius-600 公开演示" },
          { id: "altius-2021-04", date: "2021.4", title: "收购 Area-I" },
          { id: "altius-2021-11", date: "2021.11", title: "Altius-700 发布" },
          { id: "altius-2022-05", date: "2022.5", title: "EDGE2022 自主协同 / Air-Launched Effects" }
        ]
      },
      {
        id: "altius-m",
        name: "Altius-M",
        layer: "systems",
        sublane: "effects",
        events: [
          { id: "altius-m-2022-10", date: "2022.10", title: "Altius-500M / 700M loitering munition 公开" }
        ]
      },
      {
        id: "bolt",
        name: "Bolt",
        layer: "systems",
        sublane: "recon",
        events: [
          { id: "bolt-2024-10", date: "2024.10", title: "Bolt 发布" }
        ]
      },
      {
        id: "bolt-m",
        name: "Bolt-M",
        layer: "systems",
        sublane: "effects",
        events: [
          { id: "bolt-m-2024-10", date: "2024.10", title: "Bolt-M 发布" },
          { id: "bolt-m-2026-01", date: "2026.1", title: "Bolt-M 进入 USMC OPF-L 项目" }
        ]
      },
      {
        id: "anvil",
        name: "Anvil",
        layer: "systems",
        sublane: "effects",
        events: [
          { id: "anvil-2019-10", date: "2019.10", title: "Interceptor Drone 前身公开" },
          { id: "anvil-2022-03", date: "2022.3", title: "Anvil 命名稳定" },
          { id: "anvil-2023-10", date: "2023.10", title: "Anvil-M 发布" },
          { id: "anvil-2025-03", date: "2025.3", title: "USMC Program of Record" }
        ]
      },
      {
        id: "roadrunner",
        name: "Roadrunner / M",
        layer: "systems",
        sublane: "effects",
        events: [
          { id: "roadrunner-2023-12", date: "2023.12", title: "Roadrunner / Roadrunner-M 发布" },
          { id: "roadrunner-2024-10", date: "2024.10", title: "DoD 生产合同" }
        ]
      },
      {
        id: "barracuda",
        name: "Barracuda",
        layer: "systems",
        sublane: "effects",
        events: [
          { id: "barracuda-2024-09", date: "2024.9", title: "Barracuda 系列发布" },
          { id: "barracuda-2025-03", date: "2025.3", title: "Barracuda-500 进入 ETV 原型" }
        ]
      },
      {
        id: "fury",
        name: "Fury",
        layer: "systems",
        sublane: "air",
        events: [
          { id: "fury-2019", date: "2019", title: "Blue Force Technologies 开始研发" },
          { id: "fury-2023-09", date: "2023.9", title: "Anduril 收购 BFT" },
          { id: "fury-2025-10", date: "2025.10", title: "YFQ-44A 飞行测试" },
          { id: "fury-2026-01", date: "2026.1", title: "Arsenal-1 制造规划 / 首产产品确定" }
        ]
      }
    ],
    relations: [
      { type: "evolution", from: "altius-2022-05", to: "altius-m-2022-10", label: "Altius → Altius-M" },
      { type: "evolution", from: "bolt-2024-10", to: "bolt-m-2024-10", label: "Bolt → Bolt-M" },
      { type: "association", from: "ghost-2023-09", to: "lattice-2022-12", label: "接入 / 软件支撑（非继承）" },
      { type: "association", from: "ghost-2024-09", to: "mission-autonomy-2024-11", label: "调度 / 协同（非继承）" },
      { type: "association", from: "barracuda-2024-09", to: "mission-autonomy-2024-11", label: "调度 / 协同（非继承）" },
      { type: "association", from: "fury-2025-10", to: "mission-autonomy-2026-02", label: "软件支撑（非继承）" }
    ]
  };
}());
