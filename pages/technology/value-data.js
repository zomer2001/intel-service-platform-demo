(function () {
  "use strict";

  var evidence = [
    {
      id: "value-mesh-official",
      title: "Lattice Mesh 官方页面",
      publisher: "Anduril Industries",
      sourceType: "企业第一方",
      grade: "A 官方确认",
      status: "已核验",
      summary: "官方页面提供 Lattice Mesh 的能力定位、特征和工作流描述。",
      supports: "产品定位、任务相关性与公开能力边界",
      url: "https://www.anduril.com/lattice/lattice-mesh"
    },
    {
      id: "value-dod-contract",
      title: "Contracts For Sep. 27, 2024",
      publisher: "U.S. Department of Defense",
      sourceType: "政府公开合同",
      grade: "A 政府公开资料",
      status: "已核验",
      summary: "政府合同记录支持 Mesh network 向更多 SSN 站点扩展的事实。",
      supports: "部署持续性与项目行动价值",
      url: "https://www.defense.gov/News/Contracts/Contract/Article/3919852/"
    },
    {
      id: "value-northern-edge",
      title: "Lattice C2 at Northern Edge 23-2",
      publisher: "Anduril Industries",
      sourceType: "企业第一方",
      grade: "A 官方确认",
      status: "已核验",
      summary: "2023 年官方说明记录了由四个地理分布 C2 节点组成的 resilient data mesh network。",
      supports: "多节点部署与 Data Mesh 应用线索",
      url: "https://www.anduril.com/news/anduril-industries-marine-corps-northern-edge-lattice-c2"
    },
    {
      id: "value-flux-paper",
      title: "Resilient Networking Keeps Critical Sensors Connected",
      publisher: "AMOS Conference",
      sourceType: "公开技术论文",
      grade: "B 公开技术线索",
      status: "语境已保留",
      summary: "论文提供邻居集合、连接图、下一跳和链路故障后路径调整等 Flux 技术线索。",
      supports: "Network Overlay 技术还原与关键未知补全",
      url: "https://amostech.com/TechnicalPapers/2023/Poster/Pruden.pdf"
    },
    {
      id: "value-dsb-job",
      title: "Distributed Service Bus 公开招聘技术线索",
      publisher: "Anduril 招聘信息公开镜像",
      sourceType: "公开招聘技术线索",
      grade: "B 公开技术线索",
      status: "需保留时效性",
      summary: "公开岗位线索涉及 Pub/Sub、请求响应、双向流、gRPC Proxy、多路径、Gossip、流控和优先级 QoS。",
      supports: "DSB 技术对象及其与网络平面的协同未知",
      url: "https://simplify.jobs/p/6752d9fc-6c8f-4470-8a2a-4db5cfefcf07/Senior-Software-Engineer"
    },
    {
      id: "value-patent",
      title: "US12143819B2: Lattice Mesh",
      publisher: "Google Patents / USPTO 公开记录",
      sourceType: "公开专利",
      grade: "B 历史技术线索",
      status: "仅作历史线索",
      summary: "公开专利为 Host、Asset、Resource Authority、PKI 与 Key Store 提供历史技术线索。",
      supports: "Security / Identity 技术未知补全",
      url: "https://patents.google.com/patent/US12143819B2/en"
    },
    {
      id: "value-objects-doc",
      title: "Objects Overview",
      publisher: "Lattice Developer Documentation",
      sourceType: "官方开发者文档",
      grade: "A 官方确认",
      status: "已核验",
      summary: "官方文档公开了每节点 CDN、Local Cache、Peer Lookup、Tiered Lookup 与流式缓存。",
      supports: "Object CDN 机制与对象分发未知补全",
      url: "https://developer.anduril.com/guides/objects/overview"
    },
    {
      id: "value-aalyria",
      title: "Anduril & Aalyria Partner to Enhance National Security Capabilities",
      publisher: "Anduril Industries",
      sourceType: "企业合作公告",
      grade: "A 官方确认",
      status: "已核验",
      summary: "2023 年合作公告说明 Lattice 与外部网络编排能力的集成背景。",
      supports: "外部协作与网络编排应用背景",
      url: "https://www.anduril.com/news/anduril-and-aalyria-partner-to-integrate-technologies-to-enhance-national-security-capabilities"
    }
  ];

  window.VALUE_TECH_DATA = {
    task: {
      title: "多维信息价值评估",
      object: "Lattice Mesh",
      description: "围绕当前分析任务，从多源候选情报中综合判断其任务相关性、证据质量、技术信息增量、关键未知补全能力和后续行动价值。"
    },
    phases: [
      { label: "候选情报进入", duration: 3600 },
      { label: "六维价值分析", duration: 4300 },
      { label: "综合优先级排序", duration: 3600 },
      { label: "切换技术还原优先", duration: 3600 },
      { label: "排名动态变化", duration: 2800 },
      { label: "高价值结果输出", duration: 2100 }
    ],
    dimensions: [
      { key: "relevance", label: "任务相关性", description: "是否直接回答当前情报任务" },
      { key: "authority", label: "来源权威性", description: "发布主体、原始程度和可核验性" },
      { key: "density", label: "技术信息密度", description: "是否提供机制、接口、架构或工程细节" },
      { key: "increment", label: "信息增量", description: "相比已有证据是否带来新的理解" },
      { key: "gap", label: "关键未知补全", description: "是否直接缩小当前最重要的解释缺口" },
      { key: "action", label: "后续行动价值", description: "能否触发检索、还原、验证或任务下钻" }
    ],
    focusModes: {
      balanced: {
        label: "综合研判",
        description: "相对均衡考虑来源权威、任务相关、技术支撑和行动价值。",
        weights: { relevance: 0.22, authority: 0.20, density: 0.15, increment: 0.15, gap: 0.14, action: 0.14 }
      },
      restoration: {
        label: "技术还原优先",
        description: "提高技术信息密度、信息增量和关键未知补全的权重。",
        weights: { relevance: 0.18, authority: 0.10, density: 0.22, increment: 0.18, gap: 0.20, action: 0.12 }
      }
    },
    candidates: [
      {
        id: "mesh", evidenceId: "value-mesh-official", title: "Lattice Mesh 官方页面", source: "Anduril Industries", type: "企业第一方", date: "检索于 2026-08-19", object: "Lattice Mesh", summary: "公开能力定位、特征和工作流。",
        scores: { relevance: 5, authority: 5, density: 3, increment: 3, gap: 3, action: 4 }, focusBoost: { relevance: 0, gap: 0 }, why: "权威性和任务相关性很高，但对内部协同机制提供的技术细节有限。"
      },
      {
        id: "contract", evidenceId: "value-dod-contract", title: "SSN 追加部署政府合同", source: "U.S. Department of Defense", type: "政府合同", date: "2024-09-27", object: "SSN / Mesh network", summary: "支持更多 SSN 站点集成。",
        scores: { relevance: 4, authority: 5, density: 2, increment: 4, gap: 2, action: 4 }, focusBoost: { relevance: 0, gap: 0 }, why: "能够补强部署持续性和项目行动背景，但不直接解释内部技术机制。"
      },
      {
        id: "data-mesh", evidenceId: "value-northern-edge", title: "Northern Edge Data Mesh 部署说明", source: "Anduril Industries", type: "官方部署资料", date: "2023-08-29", object: "Data Mesh", summary: "四个地理分布 C2 节点构成韧性数据网。",
        scores: { relevance: 4, authority: 5, density: 3, increment: 3, gap: 3, action: 3 }, focusBoost: { relevance: 0, gap: 0 }, why: "提供真实部署结构线索，但与 DSB—Flux 内部协同仍存在距离。"
      },
      {
        id: "flux", evidenceId: "value-flux-paper", title: "AMOS Flux 论文", source: "AMOS Conference", type: "公开技术论文", date: "2023", object: "Flux", summary: "邻居、连接图、下一跳和路径调整。",
        scores: { relevance: 4, authority: 4, density: 5, increment: 5, gap: 5, action: 5 }, focusBoost: { relevance: 1, gap: 0.5 }, why: "提供普通宣传材料中缺失的网络连接图、邻居关系、下一跳和链路变化线索，可直接支撑 Network Overlay 技术还原。"
      },
      {
        id: "dsb", evidenceId: "value-dsb-job", title: "DSB 招聘技术线索", source: "Anduril 招聘信息公开镜像", type: "公开招聘线索", date: "检索于 2026-08-19", object: "Distributed Service Bus", summary: "Pub/Sub、RPC、Streaming、多路径和 QoS。",
        scores: { relevance: 4, authority: 3, density: 5, increment: 5, gap: 5, action: 5 }, focusBoost: { relevance: 1, gap: 0.5 }, why: "来源权威性不及官方文档，但技术密度和对核心协同未知的补全价值很高。"
      },
      {
        id: "patent", evidenceId: "value-patent", title: "Lattice Mesh 相关专利", source: "Google Patents / USPTO", type: "公开专利", date: "2024-11-12", object: "Security / Identity", summary: "Host、Asset、Resource Authority、PKI 与 Key Store。",
        scores: { relevance: 4, authority: 4, density: 5, increment: 4, gap: 4, action: 4 }, focusBoost: { relevance: 0.5, gap: 0.5 }, why: "可补充身份、安全和授权机制线索，但属于历史技术材料，不能直接等同当前实现。"
      },
      {
        id: "objects", evidenceId: "value-objects-doc", title: "Objects Overview", source: "Lattice Developer Documentation", type: "官方开发者文档", date: "检索于 2026-08-19", object: "Object CDN", summary: "每节点 CDN、缓存、Peer/Tiered Lookup。",
        scores: { relevance: 5, authority: 5, density: 5, increment: 5, gap: 5, action: 4 }, focusBoost: { relevance: 0.5, gap: 0 }, why: "官方文档同时具有高权威和高技术密度，可直接补全对象分发机制。"
      },
      {
        id: "aalyria", evidenceId: "value-aalyria", title: "Anduril × Aalyria 合作公告", source: "Anduril Industries", type: "企业合作公告", date: "2023-05-09", object: "网络编排集成", summary: "Lattice 与外部网络编排技术的合作背景。",
        scores: { relevance: 3, authority: 5, density: 2, increment: 3, gap: 2, action: 3 }, focusBoost: { relevance: 0, gap: 0 }, why: "来源权威但更多用于应用背景说明，对当前内部技术未知的直接补全有限。"
      }
    ],
    expertFocus: {
      question: "DSB 与 Network Overlay 如何协同？",
      description: "专家修改当前任务语境，系统据此重新判断任务相关性和关键未知补全能力；不直接手工修改某条资料最终分数。"
    },
    highValueObjects: ["Flux", "Distributed Service Bus", "Object CDN", "Security / Identity"],
    keyUnknowns: ["DSB ↔ Flux 协同接口", "服务语义如何映射到路径选择", "DDIL 下 QoS 与业务优先级联动"],
    isDemoValue: true,
    evidence: evidence
  };

  if (window.PLATFORM_DATA) {
    window.PLATFORM_DATA.evidence = (window.PLATFORM_DATA.evidence || []).concat(evidence);
  }
}());
