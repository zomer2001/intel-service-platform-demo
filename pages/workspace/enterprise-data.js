(function () {
  "use strict";

  var evidence = [
    {
      id: "enterprise-evidence-lattice",
      title: "Lattice 平台公开对象确认",
      publisher: "Anduril",
      sourceType: "企业第一方",
      grade: "A 官方确认",
      status: "已确认",
      summary: "Anduril 官方页面将 Lattice 作为其自主系统软件平台进行公开介绍。",
      supports: "Lattice 平台对象与产品体系位置",
      url: "https://www.anduril.com/lattice/"
    },
    {
      id: "enterprise-evidence-lattice-mesh",
      title: "Lattice Mesh 公开对象确认",
      publisher: "Anduril",
      sourceType: "企业第一方",
      grade: "A 官方确认",
      status: "已确认",
      summary: "官方页面确认 Lattice Mesh 是 Lattice 体系中的公开研究对象。",
      supports: "Lattice 可继续拆分的高价值研究对象",
      url: "https://www.anduril.com/lattice/lattice-mesh"
    },
    {
      id: "enterprise-evidence-ghost",
      title: "Ghost 产品对象确认",
      publisher: "Anduril",
      sourceType: "企业第一方",
      grade: "A 官方确认",
      status: "已确认",
      summary: "Anduril 官方产品页面公开了 Ghost 自主无人机产品对象。",
      supports: "空中平台产品谱系",
      url: "https://www.anduril.com/ghost/"
    },
    {
      id: "enterprise-evidence-roadrunner",
      title: "Roadrunner 产品对象确认",
      publisher: "Anduril",
      sourceType: "企业第一方",
      grade: "A 官方确认",
      status: "已确认",
      summary: "Anduril 官方产品页面公开了 Roadrunner 产品对象。",
      supports: "陆地与防护产品谱系",
      url: "https://www.anduril.com/roadrunner/"
    },
    {
      id: "enterprise-evidence-dive-ld",
      title: "Dive-LD 产品对象确认",
      publisher: "Anduril",
      sourceType: "企业第一方",
      grade: "A 官方确认",
      status: "已确认",
      summary: "Anduril 官方产品页面公开了 Dive-LD 自主水下航行器对象。",
      supports: "海上与水下产品谱系",
      url: "https://www.anduril.com/dive-ld/"
    }
  ];

  window.ENTERPRISE_ANALYSIS_DATA = {
    taskTemplate: {
      placeholder: "请输入或粘贴需要开展的情报分析任务……",
      recordingInput: "调研 Anduril 公司的主要产品、核心技术体系及发展历程，识别支撑其产品体系的关键技术，并对具有重要研究价值的对象进一步开展深入分析。",
      recognizedObject: "Anduril Industries",
      objectType: "防务科技企业",
      analysisLevel: "企业级综合分析"
    },
    stages: [
      { id: "understanding", label: "任务理解", title: "任务理解与对象识别", duration: 900 },
      { id: "collection", label: "动态采集", title: "动态信息采集", duration: 1600 },
      { id: "lineage", label: "产品技术谱系", title: "产品技术谱系梳理", duration: 1600 },
      { id: "trends", label: "发展态势", title: "技术发展态势分析", duration: 1500 },
      { id: "candidates", label: "高价值研判", title: "高价值研究对象研判", duration: 1500 },
      { id: "next-task", label: "专项任务生成", title: "下层专项任务生成", duration: 1400 }
    ],
    researchQuestions: [
      "主要产品体系是什么？",
      "核心技术体系如何组织？",
      "技术与产品如何演进？",
      "哪些对象值得进一步下钻？"
    ],
    analysisScope: ["企业概况", "产品谱系", "核心平台", "关键技术", "发展演进", "公开项目", "高价值研究对象"],
    sourceStrategy: ["企业官方资料", "政府 / 军方公开资料", "开发者技术资料", "论文 / 专利", "专业媒体与行业资料"],
    sourceCategories: [
      { name: "Anduril 官方产品与新闻", status: "已接入", count: 12 },
      { name: "政府 / 军方公开资料", status: "采集中", count: 7 },
      { name: "Lattice Developer 文档", status: "已接入", count: 5 },
      { name: "论文 / 专利", status: "采集中", count: 9 },
      { name: "专业媒体与行业资料", status: "已接入", count: 8 }
    ],
    sources: [
      { title: "Anduril 公司官网", type: "企业第一方", focus: "企业与产品体系", evidenceId: "enterprise-evidence-lattice" },
      { title: "SeaPower 产品体系", type: "企业第一方", focus: "水下自主平台", evidenceId: "enterprise-evidence-dive-ld" },
      { title: "Counter-UAS 产品体系", type: "企业第一方", focus: "低空防护与拦截", evidenceId: "enterprise-evidence-roadrunner" },
      { title: "Tactical Reconnaissance and Strike", type: "企业第一方", focus: "战术侦察与任务平台", evidenceId: "enterprise-evidence-ghost" },
      { title: "Lattice Command & Control", type: "企业第一方", focus: "指挥控制" },
      { title: "Mission Autonomy", type: "企业第一方", focus: "任务自主" },
      { title: "Lattice Mesh", type: "企业第一方", focus: "分布式连接", evidenceId: "enterprise-evidence-lattice-mesh" }
    ],
    discoveries: [
      { name: "Lattice", signal: "跨产品体系反复出现", highlight: true },
      { name: "Lattice C2", signal: "指挥控制能力" },
      { name: "Mission Autonomy", signal: "任务自主能力" },
      { name: "Lattice Mesh", signal: "分布式组网能力" },
      { name: "Lattice SDK", signal: "开放集成能力" },
      { name: "Ghost-X", signal: "空中平台改型" },
      { name: "Roadrunner", signal: "自主拦截平台" },
      { name: "Dive-XL", signal: "超大型水下平台" }
    ],
    productDomains: [
      { name: "空中平台", products: ["Ghost / Ghost-X", "Altius", "Bolt / Bolt-M", "Barracuda", "Fury", "Omen"] },
      { name: "陆地与防护", products: ["Sentry", "Pulsar", "Wisp", "Anvil / Anvil-M", "Roadrunner / Roadrunner-M"] },
      { name: "海上与水下", products: ["Dive-LD", "Dive-XL", "Copperhead", "Seabed Sentry"] }
    ],
    latticeBranches: ["Lattice C2", "Mission Autonomy", "Lattice Mesh", "Lattice SDK"],
    evolution: [
      { phase: "能力起点", title: "传感器与自主防护平台", note: "形成持续感知、周界防护和自主装备基础。" },
      { phase: "平台形成", title: "Lattice 指挥控制平台", note: "多类产品开始围绕统一软件平台组织。" },
      { phase: "能力扩展", title: "任务自主能力深化", note: "从感知与控制向多平台自主任务协同延伸。" },
      { phase: "网络增强", title: "分布式组网与 Lattice Mesh", note: "连接、数据交换和边缘协同的重要性提升。" },
      { phase: "生态开放", title: "SDK 与多平台生态", note: "通过开发与集成能力支持外部系统接入。" },
      { phase: "规模拓展", title: "高性能与规模化无人平台", note: "空中、陆地、海上与水下产品持续扩展。" }
    ],
    trends: [
      { title: "软件中枢化", description: "多类产品与任务能力逐渐围绕 Lattice 组织。" },
      { title: "多域平台化", description: "能力由单一平台扩展至空中、陆地、海上与水下。" },
      { title: "任务自主深化", description: "由感知控制向多平台自主任务协同延伸。" },
      { title: "网络连接增强", description: "分布式网络和数据交换能力的重要性持续上升。" },
      { title: "开放生态扩展", description: "Developer 与 SDK 能力推动外部系统接入。" }
    ],
    candidates: [
      { name: "Lattice", relevance: "高", centrality: "高", extensibility: "高", evidence: "高", researchValue: "高", recommended: true },
      { name: "Mission Autonomy", relevance: "高", centrality: "中", extensibility: "高", evidence: "中", researchValue: "高" },
      { name: "Lattice Mesh", relevance: "高", centrality: "中", extensibility: "高", evidence: "中", researchValue: "高" },
      { name: "Roadrunner", relevance: "中", centrality: "中", extensibility: "中", evidence: "高", researchValue: "中" },
      { name: "Fury", relevance: "中", centrality: "低", extensibility: "中", evidence: "中", researchValue: "中" }
    ],
    latticeReasons: [
      "在企业产品和能力体系中具有明显的平台中枢作用。",
      "与指挥控制、任务自主、网络组网及开放接口等能力直接关联。",
      "可继续拆分为 Lattice C2、Mission Autonomy、Lattice Mesh、Lattice SDK 等研究对象。",
      "公开资料类型较丰富，适合继续开展平台级专项分析。"
    ],
    nextTask: {
      name: "Lattice 平台级专项分析",
      parent: "Anduril Industries 企业级综合分析",
      trigger: "企业产品技术谱系与高价值对象研判结果",
      status: "待启动",
      level: "平台级专项分析",
      object: "Lattice",
      goals: [
        "明确 Lattice 的平台定位和能力边界",
        "梳理 Lattice C2、Mission Autonomy、Lattice Mesh、Lattice SDK",
        "分析平台发展演进与典型项目",
        "识别值得进一步技术还原的关键对象"
      ]
    },
    evidence: evidence
  };

  if (window.PLATFORM_DATA) {
    window.PLATFORM_DATA.evidence = (window.PLATFORM_DATA.evidence || []).concat(evidence);
  }
}());
