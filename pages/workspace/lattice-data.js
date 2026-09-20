(function () {
  "use strict";

  var evidence = [
    {
      id: "lattice-evidence-platform",
      title: "Lattice 平台公开定位",
      publisher: "Anduril",
      sourceType: "企业第一方",
      grade: "A 官方证据",
      status: "已确认",
      summary: "Anduril 官方页面将 Lattice 作为其自主系统软件平台进行公开介绍。",
      supports: "Lattice 平台对象与公开能力边界",
      url: "https://www.anduril.com/lattice/"
    },
    {
      id: "lattice-evidence-mesh",
      title: "Lattice Mesh 公开功能定位",
      publisher: "Anduril",
      sourceType: "企业第一方",
      grade: "A 官方证据",
      status: "已确认",
      summary: "Anduril 官方页面确认 Lattice Mesh 是 Lattice 体系中的分布式连接能力对象。",
      supports: "Lattice Mesh 对象与功能定位",
      url: "https://www.anduril.com/lattice/lattice-mesh"
    },
    {
      id: "lattice-evidence-objects",
      title: "Lattice Objects Overview",
      publisher: "Anduril Developer Documentation",
      sourceType: "开发者技术资料",
      grade: "A 官方证据",
      status: "已确认",
      summary: "公开开发者文档说明了 Lattice Objects 的平台对象与分发语义。",
      supports: "统一数据模型与 Objects 公开边界",
      url: "https://developer.anduril.com/guides/objects/overview"
    },
    {
      id: "lattice-evidence-flux",
      title: "AMOS 2023 Flux 技术线索",
      publisher: "AMOS Conference",
      sourceType: "公开论文",
      grade: "B 公开技术线索",
      status: "待进一步核验",
      summary: "公开论文提供系统协同与数据分发的技术线索，但不代表 Lattice Mesh 内部实现已得到确认。",
      supports: "分布式数据能力的进一步研究价值",
      url: "https://amostech.com/TechnicalPapers/2023/Poster/Pruden.pdf"
    },
    {
      id: "lattice-evidence-dod",
      title: "美国国防部公开合同记录",
      publisher: "U.S. Department of Defense",
      sourceType: "政府公开资料",
      grade: "A 官方证据",
      status: "已确认",
      summary: "政府公开合同记录为平台能力进入公开项目提供可追溯背景。",
      supports: "公开项目与平台发展背景",
      url: "https://www.defense.gov/News/Contracts/Contract/Article/3919852/"
    }
  ];

  window.LATTICE_ANALYSIS_DATA = {
    parentTask: {
      name: "Anduril Industries 企业级综合分析",
      object: "Anduril Industries",
      conclusion: "Lattice 被识别为优先下钻的高价值平台对象",
      trigger: "在企业产品与技术体系中呈现明显的平台中枢作用，并具有进一步拆解价值。",
      generationBasis: "企业产品技术谱系与高价值研究对象研判结果"
    },
    task: {
      name: "Lattice 平台级专项分析",
      object: "Lattice",
      level: "平台级专项分析",
      status: "待启动",
      description: "基于 Anduril 企业级分析结果，对 Lattice 的平台定位、核心能力、开放接口、发展演进和关键技术进行专项分析。",
      goals: [
        "明确 Lattice 的平台定位与功能边界",
        "梳理主要能力模块及其关系",
        "分析平台能力的公开演进路径",
        "识别适合进一步技术还原的关键技术对象"
      ],
      questions: [
        "Lattice 在 Anduril 体系中的平台定位是什么？",
        "Lattice 由哪些主要能力和数据机制构成？",
        "平台能力如何从 C2 向任务自主、网络与开放生态扩展？",
        "哪一项底层能力最值得进入技术还原？"
      ],
      boundaries: ["平台定位", "Command & Control", "Mission Autonomy", "统一数据模型", "SDK / API", "Lattice Mesh", "公开项目与演进"]
    },
    stages: [
      { id: "load", label: "专项任务加载", title: "专项任务加载与范围确认", duration: 900 },
      { id: "collection", label: "平台资料采集", title: "Lattice 平台资料采集", duration: 1200 },
      { id: "lineage", label: "平台能力谱系", title: "平台能力与技术谱系梳理", duration: 1200 },
      { id: "evolution", label: "发展演进分析", title: "平台发展演进分析", duration: 1100 },
      { id: "assessment", label: "关键技术研判", title: "高价值关键技术研判", duration: 1100 },
      { id: "next-task", label: "还原任务生成", title: "技术还原任务生成", duration: 1000 }
    ],
    sourceCategories: [
      "Anduril Lattice 官方产品页",
      "Lattice Developer Documentation",
      "Anduril 官方项目与演示资料",
      "政府 / 军方公开项目资料",
      "论文、专利及技术线索"
    ],
    sources: [
      { title: "Lattice for Command & Control", type: "企业第一方", focus: "指挥控制", evidenceId: "lattice-evidence-platform" },
      { title: "Lattice for Mission Autonomy", type: "企业第一方", focus: "任务自主", evidenceId: "lattice-evidence-platform" },
      { title: "Lattice Mesh", type: "企业第一方", focus: "分布式连接", evidenceId: "lattice-evidence-mesh" },
      { title: "Building with Lattice", type: "开发者技术资料", focus: "平台集成" },
      { title: "Entities Overview", type: "开发者技术资料", focus: "实体语义" },
      { title: "Tasks Overview", type: "开发者技术资料", focus: "任务语义" },
      { title: "Objects Overview", type: "开发者技术资料", focus: "对象分发", evidenceId: "lattice-evidence-objects" },
      { title: "The Lattice API", type: "开发者技术资料", focus: "开放接口" }
    ],
    discoveredObjects: ["Command & Control", "Mission Autonomy", "Entities", "Tasks", "Objects", "Lattice SDK / API", "Lattice Mesh"],
    platformLayers: [
      { id: "ui", title: "Lattice UI", subtitle: "态势展示 / 任务规划 / 控制" },
      { id: "api", title: "开放接入接口 / Lattice SDK", subtitle: "REST / gRPC / 开放数据模型" },
      { id: "model", title: "统一数据模型", subtitle: "Entities / Tasks / Objects" },
      { id: "mission", title: "任务能力", subtitle: "Command & Control / Mission Autonomy" },
      { id: "mesh", title: "Lattice Mesh", subtitle: "分布式通信、数据与网络基础" },
      { id: "physical", title: "异构承载", subtitle: "网络、传感器、无人平台及外部系统" }
    ],
    capabilities: [
      { name: "Command & Control", items: ["Understand", "Decide", "Act"], description: "将多源状态形成态势，支撑决策并转化为面向有人 / 无人资产的任务。" },
      { name: "Mission Autonomy", items: ["任务意图转换", "任务分解", "资源分配", "多平台协同", "动态调整"], description: "面向复杂任务的分解、资源组织与协同自主能力。" }
    ],
    dataModels: [
      { name: "Entities", description: "描述有什么、状态如何。" },
      { name: "Tasks", description: "描述让谁做什么以及执行状态。" },
      { name: "Objects", description: "描述文件、图像及其他独立分发对象。" }
    ],
    timeline: [
      { date: "2018", title: "平台底座进入公开测试", description: "Lattice Platform Security System 进入公开测试，平台底座开始形成。" },
      { date: "2020", title: "自动化 C2 能力公开展示", description: "ABMS 演示体现感知融合、目标跟踪和网络管理等能力。" },
      { date: "2022", title: "平台化命名进一步稳定", description: "Lattice Operating System / Lattice OS 的平台定位逐步明确。" },
      { date: "2023", title: "任务化能力分化", description: "Lattice C2、Mission Autonomy 与 Mesh 等公开能力对象逐步明确。" },
      { date: "2024", title: "网络与开放生态扩展", description: "Lattice Mesh 与 Lattice SDK 的公开对象边界更加清晰。" },
      { date: "2025 以后", title: "分布式与多平台应用扩展", description: "分布式 C2、开放接口、DDIL 网络与多平台自主应用继续发展。" }
    ],
    trends: [
      { title: "平台底座 → 任务化能力", description: "从统一软件底座逐步扩展出 C2 与 Mission Autonomy。" },
      { title: "单节点能力 → 分布式协同", description: "网络连接与数据分发的重要性持续增强。" },
      { title: "内部平台 → 开放生态", description: "SDK、REST / gRPC 与开放数据模型强化第三方接入。" },
      { title: "功能应用 → 多域任务体系", description: "平台持续进入分布式指挥、自主系统和跨域集成场景。" }
    ],
    candidates: [
      { name: "Command & Control", foundation: "中", support: "中", depth: "中", evidence: "高", researchValue: "中", position: "更偏任务应用和作战管理层。" },
      { name: "Mission Autonomy", foundation: "中", support: "中", depth: "高", evidence: "中", researchValue: "高", position: "自主任务能力重要，但算法内部公开信息相对有限。" },
      { name: "Lattice SDK / API", foundation: "中", support: "高", depth: "中", evidence: "高", researchValue: "中", position: "对开放生态重要，但接口边界相对清晰。" },
      { name: "Lattice Mesh", foundation: "高", support: "高", depth: "高", evidence: "高", researchValue: "高", position: "位于异构承载与上层平台能力之间，具备基础设施属性。", recommended: true }
    ],
    meshReasons: [
      "位于异构设备 / 网络与上层 Lattice 软件能力之间，具有明显基础设施属性。",
      "直接支撑统一数据语义、Command & Control 与 Mission Autonomy 的跨节点运行。",
      "面向 DDIL 环境解决分布式数据、服务和网络连接问题。",
      "具备官方页面、开发者文档、公开论文与公开项目等多类可追溯证据。",
      "公开资料已暴露出值得技术还原的问题，但未完整公开内部实现。"
    ],
    meshQuestions: [
      "分布式服务与实时数据如何跨节点持续交换？",
      "Objects 等大对象如何在断续网络中分发和缓存？",
      "异构网络和链路变化如何被上层业务屏蔽？",
      "安全、身份和受限带宽条件下如何维持协同？"
    ],
    nextTask: {
      name: "Lattice Mesh 技术还原与辅助破解",
      parent: "Lattice 平台级专项分析",
      trigger: "平台能力谱系 + 发展演进 + 高价值关键技术研判",
      object: "Lattice Mesh",
      objectType: "分布式通信、数据与网络基础能力",
      level: "技术还原",
      status: "待启动",
      goals: [
        "明确 Lattice Mesh 的功能边界",
        "汇聚并分级技术证据",
        "还原关键能力与可能技术路线",
        "识别公开信息缺口和关键未知",
        "形成候选机制与工程近似方案",
        "提出仿真与人工验证建议"
      ],
      verificationQuestions: [
        "服务 / 数据分发机制",
        "大对象分发与缓存机制",
        "异构网络 Overlay 与动态连通机制",
        "DDIL 条件下的安全、优先级与故障恢复"
      ]
    },
    evidence: evidence
  };

  if (window.PLATFORM_DATA) {
    window.PLATFORM_DATA.evidence = (window.PLATFORM_DATA.evidence || []).concat(evidence);
  }
}());
