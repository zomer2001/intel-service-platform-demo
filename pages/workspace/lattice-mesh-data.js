(function () {
  "use strict";

  var evidence = [
    {
      id: "mesh-evidence-official",
      title: "Lattice Mesh 官方功能定位",
      publisher: "Anduril Industries",
      sourceType: "企业第一方",
      grade: "A 官方确认",
      status: "已核验",
      summary: "官方页面公开描述去中心化 Mesh、异构数据处理、有限带宽下的数据优先级以及认证、加密和访问授权能力。",
      supports: "Lattice Mesh 的公开能力定位与 DDIL 适用边界",
      url: "https://www.anduril.com/lattice/lattice-mesh"
    },
    {
      id: "mesh-evidence-objects",
      title: "Lattice Objects Overview",
      publisher: "Lattice Developer Documentation",
      sourceType: "官方开发者文档",
      grade: "A 官方确认",
      status: "已核验",
      summary: "公开文档说明每个 Mesh 节点具有 CDN instance，并通过 Local Cache、Peer Lookup 与 Tiered Lookup 按需获取对象。",
      supports: "大对象缓存、查找、流式获取和分发机制",
      url: "https://developer.anduril.com/guides/objects/overview"
    },
    {
      id: "mesh-evidence-flux",
      title: "AMOS 2023 Flux 联合署名论文",
      publisher: "AMOS Conference",
      sourceType: "公开技术论文",
      grade: "B 公开技术线索",
      status: "语境已保留",
      summary: "论文提供透明网络层、邻居集合、连接图、下一跳与链路故障后路径调整等公开技术线索。",
      supports: "Network Overlay / Flux 的网络连通职责",
      url: "https://amostech.com/TechnicalPapers/2023/Poster/Pruden.pdf"
    },
    {
      id: "mesh-evidence-dsb",
      title: "Distributed Service Bus 公开招聘线索",
      publisher: "Anduril 招聘信息公开镜像",
      sourceType: "公开招聘技术线索",
      grade: "B 公开技术线索",
      status: "需保留时效性",
      summary: "公开岗位线索涉及 Pub/Sub、请求响应、双向流、gRPC Proxy、多路径、Gossip、链路状态、流控、压缩与优先级 QoS。",
      supports: "Data Overlay / DSB 的服务与数据分发能力边界",
      url: "https://simplify.jobs/p/6752d9fc-6c8f-4470-8a2a-4db5cfefcf07/Senior-Software-Engineer"
    },
    {
      id: "mesh-evidence-patent",
      title: "Lattice Mesh 公开专利",
      publisher: "Google Patents / USPTO 公开记录",
      sourceType: "公开专利",
      grade: "B 历史技术线索",
      status: "仅作历史线索",
      summary: "公开专利为 Host、Asset、Resource Authority、CA/PKI、Key Store 与证书生命周期提供历史技术线索。",
      supports: "Security / Identity 的身份、授权与密钥管理线索",
      url: "https://patents.google.com/patent/US12143819B2/en"
    },
    {
      id: "mesh-evidence-menace",
      title: "Menace-T 官方安全能力线索",
      publisher: "Anduril Industries",
      sourceType: "企业第一方",
      grade: "B 关联技术线索",
      status: "关联边界已标注",
      summary: "官方公开资料可辅助理解远程部署环境中的安全与任务计算需求，但不直接证明 Mesh 内部实现。",
      supports: "安全、远程部署与边缘运行的关联需求",
      url: "https://www.anduril.com/menace-t"
    },
    {
      id: "mesh-evidence-zenoh",
      title: "Eclipse Zenoh 官方技术资料",
      publisher: "Eclipse Zenoh",
      sourceType: "开源组件官方资料",
      grade: "D 工程近似依据",
      status: "待验证方案",
      summary: "Zenoh 可为 Pub/Sub、Query/Reply、Storage、Key Expression 与基础 QoS 提供工程复现基础。",
      supports: "数据与服务平面的能力接近方案，不代表 Anduril 实际采用",
      url: "https://zenoh.io/docs/overview/what-is-zenoh/"
    },
    {
      id: "mesh-evidence-simulation",
      title: "CORE 与 ns-3 官方技术资料",
      publisher: "CORE / ns-3",
      sourceType: "开源仿真工具资料",
      grade: "D 工程近似依据",
      status: "待验证方案",
      summary: "CORE 可承载真实 Linux 进程的网络仿真，ns-3 可用于离散事件网络场景研究。",
      supports: "故障注入、网络分区、带宽限制和拓扑变化的验证方案",
      url: "https://coreemu.github.io/core/architecture.html"
    }
  ];

  window.LATTICE_MESH_ANALYSIS_DATA = {
    parentTask: {
      name: "Lattice 平台级专项分析",
      conclusion: "Lattice Mesh 被识别为适合进一步技术还原的高价值关键对象",
      generationBasis: "平台能力谱系、发展演进与高价值关键技术研判结果",
      objectPosition: "面向 DDIL 环境的分布式通信、数据与网络基础能力",
      upperBoundary: ["Entities / Tasks / Objects", "Command & Control", "Mission Autonomy"],
      lowerBoundary: ["战术电台", "SATCOM", "MANET", "5G / Wi-Fi", "以太网"]
    },
    task: {
      name: "Lattice Mesh 技术还原与辅助破解",
      object: "Lattice Mesh",
      level: "技术还原与辅助破解",
      status: "待启动",
      description: "基于多源公开证据，对 Lattice Mesh 的能力边界、技术体系和关键机制开展还原分析，识别关键未知并形成可验证的工程候选方案。",
      questions: [
        "Lattice Mesh 的技术体系由哪些能力域构成？",
        "服务、状态和大对象如何在 DDIL 网络中持续分发？",
        "异构链路、路由和网络变化如何被上层业务屏蔽？",
        "哪些内部机制仍无法由公开证据直接确定，应如何构建候选方案并验证？"
      ]
    },
    boundaries: {
      objectType: "分布式通信、数据与网络基础能力",
      upperPlatform: "Lattice",
      baseline: "公开资料可观察能力与技术线索",
      constraint: "公开资料不足以逐行还原 Anduril 私有实现。",
      grades: [
        { grade: "A", label: "官方确认", description: "企业产品页、开发者文档与官方公告" },
        { grade: "B", label: "公开技术线索", description: "论文、招聘、专利与公开案例" },
        { grade: "C", label: "分析推断", description: "由多源证据与逻辑交叉形成的工程模型" },
        { grade: "D", label: "工程近似建议", description: "用于能力接近与验证，不代表真实内部实现" }
      ]
    },
    stages: [
      { label: "目标定义", title: "还原目标定义", duration: 900 },
      { label: "证据汇聚", title: "多源技术证据汇聚", duration: 1700 },
      { label: "体系还原", title: "技术体系与机理还原", duration: 1800 },
      { label: "缺口识别", title: "关键技术缺口识别", duration: 1400 },
      { label: "候选机制", title: "候选技术机制生成", duration: 1400 },
      { label: "证据筛选", title: "候选证据汇总与筛选", duration: 1200 },
      { label: "验证设计", title: "仿真与验证方案设计", duration: 1200 },
      { label: "还原成果", title: "技术还原成果生成", duration: 1400 }
    ],
    restorationGoals: [
      { title: "技术体系", description: "识别主要能力域及层次关系。" },
      { title: "数据与服务机制", description: "解释 Entity、Task、Service 等如何跨节点分发。" },
      { title: "网络与对象机制", description: "解释网络 Overlay、大对象缓存与断续环境下的获取机制。" },
      { title: "工程复现路径", description: "在不假设私有实现的前提下，提出能力接近且可验证的工程方案。" }
    ],
    knownFacts: [
      "Lattice Mesh 面向远程、降级、低带宽及 DDIL 环境",
      "位于上层 Lattice 业务与异构网络之间",
      "Objects 使用 resilient CDN / cache 机制",
      "官方强调去中心化、安全传输、数据优先级与异构连接"
    ],
    sources: evidence,
    evidenceCoverage: [
      { domain: "数据 / 服务分发", status: "已有较强线索", grade: "B" },
      { domain: "大对象分发", status: "官方确认较充分", grade: "A" },
      { domain: "网络 Overlay", status: "已有公开技术线索", grade: "B" },
      { domain: "安全与身份", status: "已有确认与线索", grade: "B" },
      { domain: "可观测性", status: "存在技术线索", grade: "B" },
      { domain: "仿真与验证", status: "存在技术线索", grade: "B" },
      { domain: "内部接口 / 算法", status: "仍存在明显缺口", grade: "C" }
    ],
    capabilityDomains: [
      { id: "dsb", name: "Data Overlay / DSB", cn: "服务与数据分发", role: "服务通信与数据分发平面", grade: "B+C", clues: ["Pub/Sub", "Request / Response", "Streaming", "gRPC Proxy", "Multi-path / Gossip", "Priority QoS"] },
      { id: "object", name: "Cache / Object CDN", cn: "大对象缓存与分发", role: "大对象持久化、缓存与按需分发", grade: "A", clues: ["Local Cache", "Peer Lookup", "Tiered Lookup", "流式获取", "checksum", "TTL / expiry"] },
      { id: "flux", name: "Network Overlay / Flux", cn: "网络连通与路径选择", role: "异构 IP 承载之上的网络连通与路径平面", grade: "B", clues: ["邻居集合", "连接图", "下一跳", "链路变化", "多承载", "故障绕行"] },
      { id: "security", name: "Security / Identity", cn: "安全与身份", role: "去中心化环境下的身份、授权、加密和可信传输", grade: "A+B", clues: ["认证", "授权", "加密", "PKI", "签名", "可信传输"] },
      { id: "observability", name: "Observability / Diagnostics", cn: "可观测与诊断", role: "跨层回答“数据为什么没到”", grade: "B", clues: ["Metrics", "Logs", "Traces", "拓扑", "路径", "队列"] },
      { id: "simulation", name: "Simulation / Verification", cn: "仿真与验证", role: "可复现地验证故障和协议行为", grade: "B", clues: ["故障序列", "可重放", "CORE", "ns-3", "协议正确性", "场景库"] }
    ],
    gaps: [
      { id: "G1", title: "DSB 与 Flux 的内部协同接口", current: "二者都存在路由相关线索，但拓扑、链路状态和路径决策如何共享未公开。", impact: "数据分发与网络连通之间的核心接口无法完全闭合。", priority: "高", selected: true },
      { id: "G2", title: "DSB 的持久化与一致性语义", current: "服务通信能力已有线索，断链恢复、持久队列与一致性边界未完整公开。", impact: "难以确定断续条件下的交付与恢复语义。", priority: "高" },
      { id: "G3", title: "Flux 的内部 Overlay 与路由实现", current: "邻居、连接图、下一跳和动态路径已有线索，具体格式、算法与控制比例未公开。", impact: "无法直接确定网络平面的实际实现。", priority: "高" },
      { id: "G4", title: "DDIL 下 QoS 与业务优先级联动", current: "数据分类、优先级、流控和链路感知已有线索，任务优先级映射仍不明确。", impact: "业务意图到队列、复制和选路的闭环尚未解释。", priority: "中高" },
      { id: "G5", title: "断网条件下的授权连续性", current: "认证、PKI 和签名存在公开线索，离线授权材料和撤销同步未公开。", impact: "离线信任与撤销时效仍需验证。", priority: "中" }
    ],
    hypotheses: [
      { id: "H1", name: "逻辑双平面协同", status: "重点候选", grade: "C", summary: "Flux-like 负责节点、链路、邻居、下一跳与承载；DSB-like 负责 Service、Topic、Request、Stream 与 QoS，双方交换拓扑健康和流意图。", evidence: "可同时解释 Flux 与 DSB 两组公开线索。", consistency: "强", coverage: "强", conflict: "弱", explainability: "强" },
      { id: "H2", name: "DSB 主导的一体化数据与路由平面", status: "保留候选", grade: "C", summary: "DSB 同时承担数据语义和大部分路径选择。", evidence: "DSB 线索包含 Multi-path、Gossip 与 Link-State Routing。", consistency: "中", coverage: "中", conflict: "中", explainability: "中" },
      { id: "H3", name: "Flux 主导 Mesh 路由，DSB 仅作消息中间件", status: "弱候选", grade: "C", summary: "Flux 完成主要网络路由，DSB 只提供消息交换。", evidence: "Flux 的公开路径描述较明确，但 DSB 线索明显超出普通中间件。", consistency: "弱", coverage: "弱", conflict: "强", explainability: "中" }
    ],
    hypothesisEvidence: [
      { evidence: "Flux 邻居 / 连接图 / 下一跳", h1: "支持", h2: "部分冲突", h3: "支持" },
      { evidence: "DSB Pub/Sub / RPC / Streaming", h1: "支持", h2: "支持", h3: "部分冲突" },
      { evidence: "DSB Multi-path / Link-State", h1: "支持", h2: "支持", h3: "冲突" },
      { evidence: "Object CDN 独立对象平面", h1: "支持", h2: "中性", h3: "中性" },
      { evidence: "上层业务需要屏蔽网络变化", h1: "支持", h2: "支持", h3: "部分支持" }
    ],
    engineeringApproximation: {
      grade: "D",
      warning: "以下组件组合仅用于能力接近与后续验证，不代表 Anduril 已确认内部实现。",
      planes: [
        { title: "数据 / 服务平面", stack: "Zenoh + Envoy / gRPC Bridge + 自定义 DSB Agent", goal: "近似 Pub/Sub、Query/Reply、服务发现、Streaming 与基础 QoS" },
        { title: "对象分发", stack: "本地对象存储 + Cache + Peer / Tiered Lookup", goal: "近似分块、checksum、断点续传与按需获取" },
        { title: "网络连通", stack: "WireGuard / IPsec + FRR/Babel + BFD + DLEP / LinkMetric", goal: "近似 Overlay、动态路由、链路感知与故障恢复" },
        { title: "仿真环境", stack: "CORE + ns-3", goal: "设计链路中断、网络分区、带宽限制、时延、丢包与拓扑变化场景" }
      ]
    },
    verificationPlan: {
      name: "Zenoh + ns-3 混合节点验证任务",
      statement: "验证候选工程机制能否复现公开能力需求，不验证“Zenoh 就是 Lattice Mesh”。",
      nodes: [
        { name: "Node 0", roles: "Router + Publisher" },
        { name: "Node 3", roles: "Publisher + Subscriber" },
        { name: "Node 5", roles: "Router + Subscriber" }
      ],
      questions: [
        "多角色节点能否在混合拓扑中完成发布、转发与订阅？",
        "不同节点位置和角色配置下，订阅数据是否可以跨节点到达？"
      ],
      currentChecks: ["消息是否到达", "订阅接收节点", "不同源节点接收数量"],
      futureChecks: ["链路中断前后连通变化", "恢复时间", "关键业务流是否持续"],
      note: "页面只生成验证配置，不在网页中伪造实验成功结果。"
    },
    finalResults: {
      conclusions: [
        { title: "平台定位", grade: "A", text: "Lattice Mesh 是 Lattice 面向 DDIL 环境的分布式通信、数据与网络基础能力。" },
        { title: "技术体系", grade: "C", text: "六能力域构成当前工程还原模型，不是官方六层架构。" },
        { title: "核心机制判断", grade: "C", text: "逻辑双平面协同是当前最具解释力的候选模型，Object CDN 形成独立对象平面。" },
        { title: "关键未知", grade: "C", text: "内部接口、具体 Overlay、持久化一致性、DDIL QoS 与离线授权仍需验证。" },
        { title: "工程近似路线", grade: "D", text: "Zenoh、Envoy、对象缓存、FRR/Babel、WireGuard/IPsec、DLEP、CORE 与 ns-3 仅作为能力接近建议。" }
      ],
      artifacts: [
        "技术体系图",
        "关键事实与证据链",
        "关键未知清单",
        "候选机制比较",
        "仿真验证参数包",
        "Lattice Mesh 技术还原分析报告"
      ]
    },
    evidence: evidence
  };

  if (window.PLATFORM_DATA) {
    window.PLATFORM_DATA.evidence = (window.PLATFORM_DATA.evidence || []).concat(evidence);
  }
}());
