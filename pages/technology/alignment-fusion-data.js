(function () {
  "use strict";

  var evidence = [
    {
      id: "alignment-mesh-page",
      title: "Lattice Mesh 官方页面",
      publisher: "Anduril Industries",
      sourceType: "企业第一方",
      grade: "A 官方确认",
      status: "已核验",
      summary: "同一官方页面包含正文、工作流示意和功能结构等不同模态内容，均归属于同一发布来源。",
      supports: "Lattice Mesh 对象、能力名称与工作流关系",
      url: "https://www.anduril.com/lattice/lattice-mesh"
    },
    {
      id: "alignment-ssn-anduril",
      title: "Commercial Data Transport Resilience to SSN",
      publisher: "Anduril Industries",
      sourceType: "企业第一方",
      grade: "A 官方确认",
      status: "已核验",
      summary: "2023 年官方部署说明记录 Lattice Mesh networking layer 在多个 SSN 资产间的应用。",
      supports: "SSN 初始部署、能力应用与 2022 年合作背景",
      url: "https://www.anduril.com/news/anduril-delivers-commercial-data-transport-resilience-to-space-surveillance-network"
    },
    {
      id: "alignment-dod-2024",
      title: "Contracts For Sep. 27, 2024",
      publisher: "U.S. Department of Defense",
      sourceType: "政府公开合同",
      grade: "A 政府公开资料",
      status: "已核验",
      summary: "2537.5 万美元固定价格合同用于 Latticed Mesh network 与更多 SSN 站点集成。",
      supports: "追加部署站点与政府合同事实",
      url: "https://www.defense.gov/News/Contracts/Contract/Article/3919852/"
    },
    {
      id: "alignment-por-2024",
      title: "Program of Record Contract to Modernize SSN",
      publisher: "Anduril Industries",
      sourceType: "企业第一方",
      grade: "A 官方确认",
      status: "已核验",
      summary: "2024 年公告披露 9970 万美元 IDIQ 合同及五年 Program of Record。",
      supports: "SSN 项目化与更大范围现代化部署",
      url: "https://www.anduril.com/news/anduril-awarded-program-of-record-space-surveillance-network"
    },
    {
      id: "alignment-flux-paper",
      title: "Resilient Networking Keeps Critical Sensors Connected",
      publisher: "AMOS Conference",
      sourceType: "公开技术论文",
      grade: "B 公开技术线索",
      status: "语境已保留",
      summary: "2023 年联合署名论文提供 Flux 网络连通、邻居集合、连接图与下一跳等技术线索。",
      supports: "Flux 技术对象与网络连通能力",
      url: "https://amostech.com/TechnicalPapers/2023/Poster/Pruden.pdf"
    },
    {
      id: "alignment-objects-doc",
      title: "Objects Overview",
      publisher: "Lattice Developer Documentation",
      sourceType: "官方开发者文档",
      grade: "A 官方确认",
      status: "已核验",
      summary: "文档公开了 Lattice Mesh 部署中的每节点 CDN、Peer Lookup 与 Tiered Lookup。",
      supports: "Objects 对象分发事实",
      url: "https://developer.anduril.com/guides/objects/overview"
    }
  ];

  window.ALIGNMENT_FUSION_DATA = {
    task: {
      title: "多源跨模态情报对齐融合与动态演化关联分析",
      object: "Lattice Mesh",
      name: "多源跨模态证据融合",
      description: "对文本、图片、表格和结构化记录进行对象级对齐，识别来源独立性与条件约束，形成可追溯的融合事实和动态演化关系。"
    },
    phases: [
      { label: "多模态解析", duration: 2900 },
      { label: "对象对齐", duration: 3400 },
      { label: "来源独立性", duration: 2900 },
      { label: "事实融合", duration: 4000 },
      { label: "条件与冲突", duration: 2900 },
      { label: "演化关联", duration: 3900 }
    ],
    sourceFamilies: [
      { id: "family-anduril", label: "Family A", publisher: "Anduril Industries", sourceType: "First Party", independent: true },
      { id: "family-dod", label: "Family B", publisher: "U.S. Department of Defense", sourceType: "Government", independent: true },
      { id: "family-amos", label: "Family C", publisher: "AMOS Conference", sourceType: "Technical Paper", independent: true },
      { id: "family-docs", label: "Family D", publisher: "Lattice Developer Documentation", sourceType: "Official Documentation", independent: true }
    ],
    evidenceItems: [
      { id: "mesh-text", evidenceId: "alignment-mesh-page", sourceFamilyId: "family-anduril", title: "官方页面正文", publisher: "Anduril Industries", modality: "文本", date: "检索于 2026-08-19", sourceType: "企业第一方", availableAt: 0 },
      { id: "mesh-image", evidenceId: "alignment-mesh-page", sourceFamilyId: "family-anduril", title: "Lattice Mesh Workflow 示意", publisher: "Anduril Industries", modality: "图片", date: "检索于 2026-08-19", sourceType: "同页视觉内容", availableAt: 0 },
      { id: "mesh-table", evidenceId: "alignment-mesh-page", sourceFamilyId: "family-anduril", title: "Features 结构字段", publisher: "Anduril Industries", modality: "表格", date: "检索于 2026-08-19", sourceType: "同页结构内容", availableAt: 0 },
      { id: "ssn-official", evidenceId: "alignment-ssn-anduril", sourceFamilyId: "family-anduril", title: "SSN 部署说明", publisher: "Anduril Industries", modality: "文本", date: "2023-07-21", sourceType: "企业第一方", availableAt: 0 },
      { id: "ssn-dod", evidenceId: "alignment-dod-2024", sourceFamilyId: "family-dod", title: "SSN 追加站点合同", publisher: "U.S. Department of Defense", modality: "结构化记录", date: "2024-09-27", sourceType: "政府合同", availableAt: 0 },
      { id: "ssn-por", evidenceId: "alignment-por-2024", sourceFamilyId: "family-anduril", title: "SSN Program of Record 公告", publisher: "Anduril Industries", modality: "文本", date: "2024-11-21", sourceType: "企业第一方", availableAt: 0 },
      { id: "flux-paper", evidenceId: "alignment-flux-paper", sourceFamilyId: "family-amos", title: "AMOS Flux 论文", publisher: "AMOS Conference", modality: "文本", date: "2023", sourceType: "公开技术论文", availableAt: 0 },
      { id: "objects-doc", evidenceId: "alignment-objects-doc", sourceFamilyId: "family-docs", title: "Objects Overview", publisher: "Lattice Developer Documentation", modality: "结构化记录", date: "检索于 2026-08-19", sourceType: "官方开发者文档", availableAt: 0 }
    ],
    alignmentGroups: [
      {
        id: "group-mesh",
        name: "Lattice Mesh",
        type: "同源多模态对齐",
        itemIds: ["mesh-text", "mesh-image", "mesh-table"],
        evidenceIds: ["alignment-mesh-page"],
        criteria: ["名称与能力对象一致", "同一页面上下文", "工作流步骤关系一致", "功能字段可相互映射"],
        strength: "强",
        independentSources: 1,
        availableAt: 1
      },
      {
        id: "group-ssn",
        name: "Space Surveillance Network 部署",
        type: "多源事实对齐",
        itemIds: ["ssn-official", "ssn-dod", "ssn-por"],
        evidenceIds: ["alignment-ssn-anduril", "alignment-dod-2024", "alignment-por-2024"],
        criteria: ["同一 SSN 项目上下文", "时间连续", "Mesh networking 能力描述重合", "部署与合同关系一致"],
        strength: "强",
        independentSources: 2,
        availableAt: 1
      },
      {
        id: "group-flux",
        name: "Flux",
        type: "技术对象对齐",
        itemIds: ["flux-paper", "mesh-text"],
        evidenceIds: ["alignment-flux-paper", "alignment-mesh-page"],
        criteria: ["网络连通上下文一致", "Mesh networking 能力关联", "邻居与路径描述重合", "内部实现仍保留未知"],
        strength: "中",
        independentSources: 2,
        availableAt: 1
      }
    ],
    fusedFacts: [
      {
        id: "fact-mesh",
        statement: "Lattice Mesh 公开提供去中心化连接、异构数据处理、智能路由和安全传输能力。",
        groupId: "group-mesh",
        evidenceIds: ["alignment-mesh-page"],
        sourceFamilyIds: ["family-anduril"],
        date: "当前公开页面",
        condition: "仅支撑官方公开能力描述",
        status: "同源多模态支持",
        availableAt: 3
      },
      {
        id: "fact-ssn",
        statement: "Lattice 的 Mesh networking 能力持续进入 Space Surveillance Network 的部署和现代化项目。",
        groupId: "group-ssn",
        evidenceIds: ["alignment-ssn-anduril", "alignment-dod-2024", "alignment-por-2024"],
        sourceFamilyIds: ["family-anduril", "family-dod"],
        date: "2022–2024",
        condition: "不同时间、不同采购上下文保持区分",
        status: "独立来源交叉支持",
        availableAt: 3
      },
      {
        id: "fact-flux",
        statement: "Flux 公开线索可用于解释 Mesh 网络连通与路径调整，但不确认其完整内部实现。",
        groupId: "group-flux",
        evidenceIds: ["alignment-flux-paper", "alignment-mesh-page"],
        sourceFamilyIds: ["family-amos", "family-anduril"],
        date: "2023–当前",
        condition: "B 级技术线索，内部接口仍待验证",
        status: "条件性融合",
        availableAt: 3
      }
    ],
    conditionChecks: [
      { label: "同一对象、不同时间", result: "建立演化关系", tone: "relation" },
      { label: "不同项目 / 合同", result: "保持并列，不合并", tone: "parallel" },
      { label: "同一事实、不同独立来源", result: "交叉支持", tone: "support" },
      { label: "条件不明确", result: "保留条件缺口", tone: "unknown" },
      { label: "信息无法确认", result: "低置信，不强制融合", tone: "unknown" }
    ],
    conflicts: [
      {
        title: "2537.5 万美元固定价格合同",
        context: "2024-09-27 · 追加 SSN 站点集成",
        evidenceId: "alignment-dod-2024"
      },
      {
        title: "9970 万美元 IDIQ / Program of Record",
        context: "2024-11-21 · 五年 SSN 现代化项目",
        evidenceId: "alignment-por-2024"
      }
    ],
    evolutionEvents: [
      { id: "event-2022", date: "2022-11", event: "与 Space Systems Command 开展韧性网络能力合作", relation: "首次合作", sourceIds: ["alignment-ssn-anduril"], objectIds: ["Lattice Mesh", "SSN"], availableAt: 5 },
      { id: "event-2023", date: "2023-07", event: "公开说明 Mesh networking layer 在多个 SSN 资产间部署", relation: "初始部署", sourceIds: ["alignment-ssn-anduril"], objectIds: ["Lattice Mesh", "SDANet"], availableAt: 5 },
      { id: "event-2024-contract", date: "2024-09", event: "政府合同支持 Mesh network 向更多 SSN 站点扩展", relation: "合同追加", sourceIds: ["alignment-dod-2024"], objectIds: ["SSN", "Mesh network"], availableAt: 5 },
      { id: "event-2024-por", date: "2024-11", event: "IDIQ 与 Program of Record 推动 SSN 现代化", relation: "项目化", sourceIds: ["alignment-por-2024"], objectIds: ["SSN", "Lattice"], availableAt: 5 }
    ],
    evidence: evidence
  };

  if (window.PLATFORM_DATA) {
    window.PLATFORM_DATA.evidence = (window.PLATFORM_DATA.evidence || []).concat(evidence);
  }
}());
