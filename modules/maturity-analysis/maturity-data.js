(function () {
  "use strict";

  window.MATURITY_ANALYSIS_DATA = {
    target: {
      topic: "Anduril Industries",
      object: "Lattice Mesh",
      method: "TRL 1—9",
      nature: "开源情报研判"
    },
    summary: {
      primaryCapability: "核心组网与分布式数据连接能力",
      rating: "TRL 9",
      dimensionCount: 7,
      evidenceBasis: "公开证据 + 体系关联佐证",
      disclaimer: "本报告为基于公开资料的技术成熟度研判，不等同于研发单位或政府机构的官方 TRL 认证结果。"
    },
    report: {
      title: "Lattice Mesh 技术成熟度综合分析报告",
      updatedAt: "2026.08",
      confidence: "较高",
      abstract: "公开资料显示，Lattice Mesh 已完成从早期去中心化网络构想、相关环境演示到真实任务通信恢复、跨军种生产部署和陆军体系集成的连续演进。综合直接实证、政府采购与项目化应用证据，核心组网与分布式数据连接能力可研判为 TRL 9；安全细节、极限性能和专项衍生能力仍需保持区间评价。",
      executiveSummary: [
        "本报告以 Lattice Mesh 的核心组网与分布式数据连接能力为主评价对象，采用 TRL 1—9 分级框架，对技术原理、相关环境演示、真实任务运行、生产协议和体系集成情况进行证据映射。",
        "2022 年 Maui GEODSS 通信中断事件提供了较强的真实任务实证：相关 Mesh 能力在传统通信失效后快速恢复双向任务通信，并持续承担主要通信。2024 年 CDAO 生产协议和公开采购材料进一步表明该能力已进入跨军种、跨作战司令部的规模化部署阶段。",
        "2025—2026 年美国陆军 NGC2 原型与共同数据基线材料继续验证 Lattice 在战术边缘数据层中的体系角色。基于上述证据，核心能力评为 TRL 9，整体报告置信度为较高；该判断属于开源情报综合研判，不等同于官方认证。"
      ],
      highlights: [
        {
          type: "direct",
          title: "真实任务环境形成直接实证",
          detail: "Maui GEODSS 在传统通信完全中断期间恢复双向任务数据传输，并连续运行 21 天，支持核心能力已跨越原型演示阶段。",
          sourceIds: ["amos-2023", "anduril-ssn-2023"]
        },
        {
          type: "direct",
          title: "生产协议支持规模部署判断",
          detail: "CDAO 三年生产协议及官方采购材料将 Edge Data Mesh 定位为战术层韧性数据基础设施，并说明其面向跨网络、跨域和跨层级低时延数据交换。",
          sourceIds: ["anduril-cdao-2024", "cdao-ai-rcc-2024"]
        },
        {
          type: "system_support",
          title: "陆军 NGC2 延续体系化验证",
          detail: "NGC2 原型合同、野外训练反馈与共同数据基线表明 Lattice 正作为边缘到云数据网的重要组成持续接受部队级验证。",
          sourceIds: ["army-ngc2-award-2025", "army-ngc2-baseline-2026"]
        }
      ],
      keyJudgments: [
        {
          type: "analysis_mapping",
          title: "核心能力达到 TRL 9",
          detail: "直接任务运行、持续部署与生产协议三类证据相互印证，满足最终系统在真实任务条件下运行的主要判据。",
          sourceIds: ["amos-2023", "anduril-cdao-2024", "cdao-ai-rcc-2024"]
        },
        {
          type: "analysis_mapping",
          title: "整体成熟度不是单一等级",
          detail: "核心网络和韧性连接已高度成熟，但安全公开细节、第三方集成一致性及专项衍生应用仍处于 TRL 6—8 区间。",
          sourceIds: ["lattice-api", "lattice-objects", "lattice-mesh-patent"]
        },
        {
          type: "analysis_mapping",
          title: "规模化能力正在继续扩展",
          detail: "从 CDAO 生产协议到陆军 NGC2 共同数据基线，证据指向 Lattice Mesh 已由单点任务保障转向跨组织、跨平台的数据基础设施。",
          sourceIds: ["anduril-cdao-2024", "army-ngc2-award-2025", "army-ngc2-baseline-2026"]
        }
      ],
      dimensionAnalysis: [
        { dimensionId: "core-network", conclusion: "真实任务运行与跨军种生产部署共同支撑 TRL 9。", sourceIds: ["amos-2023", "anduril-cdao-2024", "cdao-ai-rcc-2024"] },
        { dimensionId: "resilient-network", conclusion: "通信中断恢复和去中心化路径设计支撑 TRL 9。", sourceIds: ["amos-2023", "lattice-mesh-patent"] },
        { dimensionId: "deployment", conclusion: "生产协议、项目化合同及部队验证支持 TRL 8—9。", sourceIds: ["anduril-cdao-2024", "army-ngc2-award-2025", "army-ngc2-baseline-2026"] },
        { dimensionId: "security", conclusion: "身份授权与生产环境应用可见，但公开安全测评细节有限，定位 TRL 8。", sourceIds: ["lattice-mesh-patent", "anduril-cdao-2024"] },
        { dimensionId: "scale", conclusion: "跨军种、跨作战司令部和师级原型验证支持 TRL 8—9。", sourceIds: ["cdao-ai-rcc-2024", "army-ngc2-baseline-2026"] },
        { dimensionId: "ecosystem", conclusion: "SDK、开放 API 和分布式 Objects 能力支持 TRL 8。", sourceIds: ["lattice-api", "lattice-objects"] },
        { dimensionId: "derived", conclusion: "专项衍生场景仍需独立任务数据验证，维持 TRL 6—7。", sourceIds: ["army-ngc2-award-2025"] }
      ],
      evolution: [
        { period: "2018—2020", stage: "原理形成与体系演示", assessment: "专利族和早期 Lattice 演示表明去中心化连接、发布订阅和身份授权机制已经形成。", sourceIds: ["lattice-mesh-patent"] },
        { period: "2022—2023", stage: "真实任务环境运行", assessment: "SSN 多站点演示及 Maui GEODSS 应急通信恢复形成核心直接实证。", sourceIds: ["amos-2023", "anduril-ssn-2023"] },
        { period: "2024", stage: "项目化与生产部署", assessment: "SSN Program of Record、CDAO 三年生产协议及采购材料支持定型和规模部署判断。", sourceIds: ["anduril-ssn-por-2024", "anduril-cdao-2024", "cdao-ai-rcc-2024"] },
        { period: "2025—2026", stage: "陆军体系持续集成", assessment: "NGC2 原型和共同数据基线将 Lattice 纳入师级全栈体系，显示应用范围继续扩大。", sourceIds: ["army-ngc2-award-2025", "army-ngc2-baseline-2026"] }
      ],
      risks: [
        { type: "unknown", title: "极限网络性能尚未公开", detail: "缺少在强干扰、长期断续链路和超大节点规模下的统一吞吐、时延、丢包与恢复时间数据。" },
        { type: "unknown", title: "安全认证细节不足", detail: "公开资料未完整披露加密实现、零信任策略、红队测试结果及不同密级环境的认证边界。" },
        { type: "unknown", title: "第三方集成成熟度不均衡", detail: "开放 API 和 SDK 证明可扩展性，但不同供应商系统的适配深度、升级兼容性与维护成本仍需逐项验证。" },
        { type: "unknown", title: "来源独立性有限", detail: "关键部署细节较多来自企业第一方与项目相关公开材料，仍需更多独立测试数据交叉验证。" }
      ],
      sourceIds: [
        "amos-2023",
        "anduril-ssn-2023",
        "anduril-cdao-2024",
        "cdao-ai-rcc-2024",
        "army-ngc2-award-2025",
        "army-ngc2-baseline-2026",
        "lattice-objects",
        "lattice-api",
        "lattice-mesh-patent"
      ]
    },
    dimensions: [
      { id: "core-network", name: "核心组网与分布式数据连接能力", primary: true, trlMin: 9, trlMax: 9, status: "operational", note: "主评级" },
      { id: "resilient-network", name: "网络架构与弹性连接", trlMin: 9, trlMax: 9, status: "operational", note: "真实环境运行" },
      { id: "deployment", name: "实际部署与任务运行", trlMin: 8, trlMax: 9, status: "transition", note: "持续部署" },
      { id: "security", name: "安全与身份访问控制", trlMin: 8, trlMax: 8, status: "transition", note: "公开细节有限" },
      { id: "scale", name: "规模部署与跨平台兼容", trlMin: 8, trlMax: 9, status: "transition", note: "项目化扩展" },
      { id: "ecosystem", name: "开放生态与第三方集成", trlMin: 8, trlMax: 8, status: "ecosystem", note: "SDK / API" },
      { id: "derived", name: "专项衍生应用验证", trlMin: 6, trlMax: 7, status: "validating", note: "不计入主评级" }
    ],
    trlEvidenceChain: [
      {
        id: "trl-1-3",
        stage: "TRL 1–3",
        criterion: "基础原理观察、技术概念形成和关键功能概念验证。",
        evidence: "早期 Mesh 网络构想、去中心化连接及身份授权相关专利线索，说明关键原理已形成。",
        evidenceRelation: "historical_clue",
        decision: "已覆盖"
      },
      {
        id: "trl-4-5",
        stage: "TRL 4–5",
        criterion: "组件或代表性功能在受控相关环境中完成验证。",
        evidence: "2020 年 ABMS 等早期 Lattice 演示支撑体系级数据融合与连接能力，但不单独等同于 Mesh 本体实证。",
        evidenceRelation: "system_support",
        decision: "部分支撑"
      },
      {
        id: "trl-6",
        stage: "TRL 6",
        criterion: "代表性系统或子系统在相关环境中成功演示。",
        evidence: "2022 年 SSN 多站点演示以 Lattice Mesh / Flux 在商业 SATCOM 与国防网络间双向传输任务数据。",
        evidenceRelation: "direct",
        decision: "证据较充分"
      },
      {
        id: "trl-7",
        stage: "TRL 7",
        criterion: "系统原型在真实或高压力相关环境中演示。",
        evidence: "Maui GEODSS 传统通信中断后，Mesh 网络在 24 小时内恢复任务通信并连续承担 21 天主要通信。",
        evidenceRelation: "direct",
        decision: "证据较充分"
      },
      {
        id: "trl-8",
        stage: "TRL 8",
        criterion: "最终系统进入定型、项目化验证或稳定部署准备。",
        evidence: "2024 年 SSN 五年 Program of Record 与 CDAO 三年 Edge Data Mesh 生产协议，支持项目化与规模部署判断。",
        evidenceRelation: "direct",
        decision: "较充分"
      },
      {
        id: "trl-9",
        stage: "TRL 9",
        criterion: "实际最终系统在真实任务条件下运行，并由持续部署或项目化使用证明其有效性。",
        evidence: "公开资料显示 Mesh 已在 SSN 应急任务、多军种与作战司令部数据网及陆军实弹训练中投入实际运行。",
        evidenceRelation: "direct",
        decision: "当前主评级",
        interactive: true
      }
    ],
    evidence: [
      {
        id: "ssn-emergency-operation",
        title: "SSN Maui GEODSS 应急任务通信恢复",
        date: "2022.12",
        support: "传统通信中断后，Flux / Lattice Mesh 在 24 小时内恢复双向任务通信，并连续 21 天作为主要运行通信方式。",
        evidenceRelation: "direct",
        sourceIds: ["amos-2023", "anduril-ssn-2023"]
      },
      {
        id: "cdao-edge-data-mesh",
        title: "CDAO Edge Data Mesh 生产协议",
        date: "2024.12",
        support: "三年生产协议用于扩展由 Lattice Mesh 驱动的战术边缘数据网；官方资料称其已在多个军种和作战司令部运行。",
        evidenceRelation: "direct",
        sourceIds: ["anduril-cdao-2024"]
      },
      {
        id: "ngc2-live-fire",
        title: "4th Infantry Division NGC2 实弹训练",
        date: "2025.09",
        support: "师级目标处理流程在 Lattice Mesh 上从指挥部运行至炮线，并被采用为火力控制标准作业流程。",
        evidenceRelation: "direct",
        sourceIds: ["anduril-ngc2-2025"]
      },
      {
        id: "objects-cdn",
        title: "Lattice Objects 弹性内容分发机制",
        date: "持续公开",
        support: "开发者文档说明每个 Mesh 节点运行 CDN 实例，并通过分层查询、同层节点缓存和流式传输分发对象。",
        evidenceRelation: "system_support",
        sourceIds: ["lattice-objects"]
      },
      {
        id: "open-integration",
        title: "SDK / Open API 第三方集成能力",
        date: "2024.12",
        support: "生产协议资料说明 Edge Data Mesh 通过 Lattice SDK 与开放 API 集成政府及供应商系统；用于支撑成熟生态判断。",
        evidenceRelation: "system_support",
        sourceIds: ["anduril-cdao-2024", "lattice-api"]
      }
    ],
    sources: [
      { id: "amos-2023", title: "Resilient Networking Keeps Critical Sensors Connected", publisher: "AMOS Conference / Anduril Industries / U.S. Space Force", publishedAt: "2023", url: "https://amostech.com/TechnicalPapers/2023/Poster/Pruden.pdf" },
      { id: "anduril-ssn-2023", title: "Anduril Delivers Commercial Data Transport Resilience to Space Surveillance Network", publisher: "Anduril Industries", publishedAt: "2023-07-21", url: "https://www.anduril.com/news/anduril-delivers-commercial-data-transport-resilience-to-space-surveillance-network" },
      { id: "anduril-cdao-2024", title: "CDAO Awards Anduril Production Agreement to Deliver Edge Data Mesh", publisher: "Anduril Industries", publishedAt: "2024-12-03", url: "https://www.anduril.com/news/cdao-awards-anduril-production-agreement-to-deliver-edge-data-mesh" },
      { id: "anduril-ssn-por-2024", title: "Anduril Awarded Program of Record Contract to Modernize Space Surveillance Network", publisher: "Anduril Industries", publishedAt: "2024-11-21", url: "https://www.anduril.com/news/anduril-awarded-program-of-record-space-surveillance-network" },
      { id: "anduril-ngc2-2025", title: "How Anduril and the Army Are Rewriting Fire Missions with NGC2", publisher: "Anduril Industries", publishedAt: "2025-09-30", url: "https://www.anduril.com/news/how-anduril-and-the-army-are-rewriting-fire-missions-with-ngc2" },
      { id: "lattice-objects", title: "Objects overview — Data distribution", publisher: "Lattice Developers", publishedAt: "持续更新", url: "https://developer.anduril.com/guides/objects/overview" },
      { id: "lattice-api", title: "The Lattice API / Choose a Protocol", publisher: "Lattice Developers", publishedAt: "持续更新", url: "https://developer.anduril.com/reference/overview/overview" },
      { id: "lattice-mesh-patent", title: "US10506436B1 及延续专利族：Lattice mesh", publisher: "Google Patents / Anduril Industries", publishedAt: "2019-12-10", url: "https://patents.google.com/patent/US10506436B1/en" },
      { id: "cdao-ai-rcc-2024", title: "CDAO Artificial Intelligence Rapid Capabilities Cell", publisher: "U.S. Department of Defense Chief Digital and AI Office", publishedAt: "2024-12", url: "https://www.ai.mil/Portals/137/Documents/Resources%20Page/2024-12-CDAO-Artificial-Intelligence-Rapid-Capabilities-Cell.pdf" },
      { id: "army-ngc2-award-2025", title: "Army announces Next Generation Command and Control prototype award", publisher: "U.S. Army / PEO C3N", publishedAt: "2025-07-18", url: "https://www.army.mil/article/287180/army_announces_next_generation_command_and_control_ngc2_prototype_award" },
      { id: "army-ngc2-baseline-2026", title: "Army and industry align on common data baseline as NGC2 moves to delivery", publisher: "U.S. Army Public Affairs", publishedAt: "2026-06-22", url: "https://www.army.mil/article/293409" }
    ],
    relationLabels: {
      direct: "直接实证",
      system_support: "体系关联佐证",
      historical_clue: "历史技术线索",
      analysis_mapping: "分析映射",
      unknown: "关键未知项"
    }
  };
}());
