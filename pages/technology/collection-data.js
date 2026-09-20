(function () {
  "use strict";

  var evidence = [
    {
      id: "collection-mesh-official",
      title: "Lattice Mesh 官方页面",
      publisher: "Anduril Industries",
      sourceType: "企业第一方",
      grade: "A 官方确认",
      status: "已核验",
      summary: "官方页面公开描述 Lattice Mesh 的去中心化连接、异构数据规范化、智能路由和安全传输能力。",
      supports: "Lattice Mesh 公开能力定位",
      url: "https://www.anduril.com/lattice/lattice-mesh"
    },
    {
      id: "collection-ssn-deployment",
      title: "Commercial Data Transport Resilience to SSN",
      publisher: "Anduril Industries",
      sourceType: "企业第一方",
      grade: "A 官方确认",
      status: "已核验",
      summary: "2023 年公开部署说明记录了 Lattice 的 Mesh networking layer 在 Space Surveillance Network 资产间的应用。",
      supports: "SSN 初始部署与应用背景",
      url: "https://www.anduril.com/news/anduril-delivers-commercial-data-transport-resilience-to-space-surveillance-network"
    },
    {
      id: "collection-dod-contract",
      title: "Contracts For Sep. 27, 2024",
      publisher: "U.S. Department of Defense",
      sourceType: "政府公开合同",
      grade: "A 政府公开资料",
      status: "已核验",
      summary: "合同记录披露 Anduril 获得 2537.5 万美元固定价格合同，用于 Mesh network 及更多 SSN 站点集成。",
      supports: "持续扩展部署与追加站点",
      url: "https://www.defense.gov/News/Contracts/Contract/Article/3919852/"
    },
    {
      id: "collection-program-record",
      title: "Program of Record Contract to Modernize SSN",
      publisher: "Anduril Industries",
      sourceType: "企业第一方",
      grade: "A 官方确认",
      status: "已核验",
      summary: "2024 年公告披露 9970 万美元 IDIQ 合同及五年 Program of Record，用于 SSN 现代化。",
      supports: "项目化扩展与后续部署",
      url: "https://www.anduril.com/news/anduril-awarded-program-of-record-space-surveillance-network"
    },
    {
      id: "collection-flux-paper",
      title: "Resilient Networking Keeps Critical Sensors Connected",
      publisher: "AMOS Conference",
      sourceType: "公开技术论文",
      grade: "B 公开技术线索",
      status: "语境已保留",
      summary: "2023 年联合署名论文提供 Flux 的邻居集合、网络连接图、下一跳与路径调整线索。",
      supports: "网络连通机制与 Flux 新研究对象",
      url: "https://amostech.com/TechnicalPapers/2023/Poster/Pruden.pdf"
    },
    {
      id: "collection-objects-doc",
      title: "Objects Overview",
      publisher: "Lattice Developer Documentation",
      sourceType: "官方开发者文档",
      grade: "A 官方确认",
      status: "已核验",
      summary: "官方开发者文档公开了每节点 CDN、Local Cache、Peer Lookup、Tiered Lookup 和流式缓存行为。",
      supports: "Objects / CDN 对象分发机制",
      url: "https://developer.anduril.com/guides/objects/overview"
    }
  ];

  window.COLLECTION_TECH_DATA = {
    task: {
      title: "动态信息采集",
      topic: "Lattice Mesh 技术情报专项",
      name: "公开证据动态采集",
      description: "围绕技术情报任务按信源类型组织采集路径，并根据新发现线索动态扩展搜索范围，持续补齐关键未知。",
      objective: "围绕 Lattice Mesh 的公开技术资料，识别支撑其分布式网络与数据能力的高价值证据，并发现可进一步扩展的情报线索。"
    },
    gaps: [
      { id: "deployment", label: "公开部署背景", question: "Lattice Mesh 的公开应用和部署背景是什么？", initial: "待补充", final: "已获得多源支持", finalAt: 5 },
      { id: "continuity", label: "持续部署证据", question: "哪些政府项目可证明其持续扩展？", initial: "待补充", final: "已补强", finalAt: 5 },
      { id: "mechanism", label: "Mesh 内部技术机制", question: "哪些技术资料能解释其网络与数据能力？", initial: "待补充", final: "仍存在缺口", finalAt: 5 },
      { id: "objects", label: "对象分发机制", question: "哪些新对象值得进一步定向搜索？", initial: "待补充", final: "新增 Objects / CDN 线索", finalAt: 4 }
    ],
    sourceGroups: [
      { id: "official", name: "企业官方", status: "定向采集", lastClue: "Space Surveillance Network", evidenceIds: ["collection-mesh-official", "collection-ssn-deployment", "collection-program-record"] },
      { id: "government", name: "政府 / 军方", status: "定向采集", lastClue: "追加 SSN 站点", evidenceIds: ["collection-dod-contract"] },
      { id: "developer", name: "Developer Documentation", status: "定向采集", lastClue: "Objects / CDN", evidenceIds: ["collection-objects-doc"] },
      { id: "paper", name: "论文 / 专利", status: "定向采集", lastClue: "Flux", evidenceIds: ["collection-flux-paper"] },
      { id: "jobs", name: "官方招聘 / 技术岗位", status: "线索保留", lastClue: "Distributed Service Bus", evidenceIds: [] },
      { id: "media", name: "专业媒体 / 行业资料", status: "低优先级", lastClue: "未触发扩展", evidenceIds: [] }
    ],
    evidenceTimeline: [
      { evidenceId: "collection-mesh-official", availableAt: 1 },
      { evidenceId: "collection-ssn-deployment", availableAt: 1 },
      { evidenceId: "collection-flux-paper", availableAt: 2 },
      { evidenceId: "collection-dod-contract", availableAt: 4 },
      { evidenceId: "collection-program-record", availableAt: 4 },
      { evidenceId: "collection-objects-doc", availableAt: 4 }
    ],
    clues: [
      { id: "ssn", name: "Space Surveillance Network", value: "高", reason: "直接关联公开部署背景，可生成政府合同检索路径。", availableAt: 2, expand: true },
      { id: "data-mesh", name: "Data Mesh", value: "中", reason: "与分布式 C2 部署相关，但当前任务证据链较间接。", availableAt: 2, expand: false },
      { id: "flux", name: "Flux", value: "高", reason: "公开论文可补充网络连通机制线索。", availableAt: 2, expand: true },
      { id: "objects", name: "Objects CDN", value: "高", reason: "官方开发者文档可解释大对象分发与缓存。", availableAt: 3, expand: true },
      { id: "distributed", name: "Distributed Network", value: "低", reason: "概念范围过宽，暂不扩展。", availableAt: 3, expand: false }
    ],
    routes: [
      { clueId: "ssn", path: "Space Surveillance Network → government contract", result: "政府合同 / 后续部署", availableAt: 3 },
      { clueId: "flux", path: "Flux → paper / author / mesh networking", result: "AMOS 论文技术线索", availableAt: 3 },
      { clueId: "objects", path: "Objects → developer documentation / cache / CDN", result: "Objects Overview", availableAt: 3 }
    ],
    flow: [
      { phase: 0, kind: "任务与缺口定义", title: "Lattice Mesh", detail: "确认对象、公开证据范围和四项关键未知。" },
      { phase: 1, kind: "初始检索", title: "官方资料与公开部署说明", detail: "按企业官方、政府、开发文档、论文等信源类型组织首轮采集。" },
      { phase: 2, kind: "发现线索", title: "Space Surveillance Network", detail: "从官方部署说明识别新的项目对象与政府合同检索方向。" },
      { phase: 3, kind: "新路径生成", title: "DoD Contract + SSN + Mesh Networking", detail: "分析结果驱动新路径，而非预先固定全部关键词。" },
      { phase: 4, kind: "新增证据", title: "政府合同与后续 Program of Record", detail: "新来源进入证据池，同时补入 Flux 与 Objects 技术线索。" },
      { phase: 5, kind: "缺口更新", title: "部署持续性已补强", detail: "核心部署事实获得交叉支撑，内部机制仍保留缺口。" }
    ],
    phases: [
      { label: "任务 / 信源组织", duration: 3000 },
      { label: "首轮采集", duration: 4400 },
      { label: "新线索识别", duration: 3700 },
      { label: "检索路径扩展", duration: 3700 },
      { label: "新证据进入", duration: 3000 },
      { label: "缺口更新 / 停止", duration: 2200 }
    ],
    stopConditions: [
      "核心部署事实已有独立来源支撑",
      "重点未知已获得新的技术线索",
      "新增检索路径的边际信息增量下降"
    ],
    finalSummary: {
      isDemoValue: true,
      fields: [
        { key: "sources", label: "新增高价值来源" },
        { key: "objects", label: "新增研究对象" },
        { key: "routes", label: "生成新检索路径" },
        { key: "gaps", label: "已补强关键未知" },
        { key: "remaining", label: "仍待进一步分析" }
      ]
    },
    evidence: evidence
  };

  if (window.PLATFORM_DATA) {
    window.PLATFORM_DATA.evidence = (window.PLATFORM_DATA.evidence || []).concat(evidence);
  }
}());
