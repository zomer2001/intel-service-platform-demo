(function () {
  "use strict";

  var assetBase = "../../modules/product-catalog/assets/";
  var reportSourceId = "pc-source-product-report";

  function product(data) {
    return Object.assign({
      aliases: [],
      objectType: "product",
      firstPublicDate: "",
      developer: "Anduril Industries",
      publicStatus: "公开资料持续整理",
      capabilities: [],
      applications: [],
      parameters: [],
      relatedObjects: [],
      timeline: [],
      image: null,
      sourceIds: [reportSourceId],
      evidenceIds: [],
      dataStatus: "有限"
    }, data);
  }

  function image(fileName, sourceName, sourceUrl) {
    return { path: assetBase + fileName, sourceName: sourceName, sourceUrl: sourceUrl };
  }

  var products = [
    product({
      id: "bolt", name: "Bolt", category: "tactical-strike", type: "小型战术无人平台",
      summary: "项目研究资料收录的 Bolt 系列空中平台，适用于近距离任务场景；当前公开统一参数较少。",
      capabilities: ["小型化部署", "战术任务", "自主飞行"], applications: ["近距离侦察", "战术任务支援"],
      relatedObjects: ["Bolt-M"]
    }),
    product({
      id: "bolt-m", name: "Bolt-M", category: "tactical-strike", type: "小型战术效应平台",
      summary: "Bolt 系列中的任务效应型对象，现有资料可确认其产品归属，具体性能边界仍待补充。",
      capabilities: ["小型化部署", "自主任务", "战术效应"], applications: ["战术任务支援"],
      relatedObjects: ["Bolt"]
    }),
    product({
      id: "altius", name: "Altius", aliases: ["ALTIUS"], category: "tactical-strike", type: "可扩展无人航空系统",
      summary: "面向多任务载荷与协同运用的无人航空系统对象，公开资料侧重其平台扩展能力。",
      capabilities: ["多任务载荷", "空中部署", "协同运用"], applications: ["情报监视侦察", "任务载荷投送"]
    }),
    product({
      id: "ghost", name: "Ghost", category: "tactical-strike", type: "战术自主无人机",
      summary: "Ghost 系列强调续航、多载荷配置与自主飞行，可用于巡逻、警戒和重点区域监视。",
      capabilities: ["自主飞行", "多载荷配置", "持续监视", "快速部署"], applications: ["边境巡逻", "基地警戒", "重点区域监视"],
      parameters: [
        { name: "任务载荷", value: "支持多载荷配置", note: "公开资料为定性描述", source: "产品谱系研究报告" },
        { name: "飞行方式", value: "自主飞行", note: "未收录统一量化参数", source: "产品谱系研究报告" }
      ],
      image: image("ghost.png", "Anduril Ghost 官方页面公开图像", "https://www.anduril.com/ghost/"),
      sourceIds: [reportSourceId, "pc-source-ghost"], dataStatus: "较完整", relatedObjects: ["Ghost-X"]
    }),
    product({
      id: "ghost-x", name: "Ghost-X", aliases: ["Ghost X"], category: "tactical-strike", type: "战术自主无人机",
      summary: "Ghost 系列改型，公开研究资料确认其面向持续监视和多载荷任务；统一量化参数仍待核验。",
      capabilities: ["持续监视", "多载荷配置", "自主飞行", "战术部署"], applications: ["边境巡逻", "基地警戒", "重点区域监视"],
      parameters: [
        { name: "任务载荷", value: "支持多载荷配置", note: "系列级公开描述", source: "产品谱系研究报告" },
        { name: "飞行方式", value: "自主飞行", note: "系列级公开描述", source: "产品谱系研究报告" }
      ],
      image: image("ghost-x.jpeg", "项目产品谱系研究报告配图", ""), dataStatus: "一般", relatedObjects: ["Ghost"]
    }),
    product({
      id: "barracuda", name: "Barracuda", category: "tactical-strike", type: "模块化自主航空器",
      summary: "面向可扩展任务载荷与规模化运用的自主航空器产品族，公开页面可确认产品对象。",
      capabilities: ["模块化载荷", "自主飞行", "规模化运用"], applications: ["战术任务", "任务载荷投送"],
      image: image("barracuda.png", "Anduril Barracuda 官方页面公开图像", "https://www.anduril.com/barracuda/"),
      sourceIds: [reportSourceId, "pc-source-barracuda"], dataStatus: "较完整"
    }),
    product({
      id: "fury", name: "Fury", category: "air-dominance", type: "高性能自主航空器",
      summary: "高性能空中任务平台对象，现有公开资料主要支持其产品定位与自主任务方向。",
      capabilities: ["高性能飞行", "自主任务", "任务载荷集成"], applications: ["空中任务训练", "自主航空任务"],
      image: image("fury.png", "Anduril Fury 官方页面公开图像", "https://www.anduril.com/fury/"),
      sourceIds: [reportSourceId, "pc-source-fury"], dataStatus: "较完整", relatedObjects: ["Omen"]
    }),
    product({
      id: "omen", name: "Omen", category: "air-mobility", type: "高性能自主航空器",
      summary: "产品谱系中的高性能空中平台对象，当前资料可支持对象归类，详细技术参数尚未统一。",
      capabilities: ["自主航空", "高性能飞行", "任务扩展"], applications: ["自主航空任务"], relatedObjects: ["Fury"]
    }),

    product({
      id: "sentry", name: "Sentry", category: "ground-protection", type: "自主监控平台",
      summary: "地面系统中的自主监控平台，面向目标检测、识别和跟踪，可作为持续感知节点。",
      capabilities: ["目标检测", "目标识别", "持续跟踪", "边缘感知"], applications: ["周界监控", "基地防护", "重点区域警戒"],
      parameters: [
        { name: "核心任务", value: "目标检测、识别与跟踪", note: "公开资料为任务能力描述", source: "产品谱系研究报告" },
        { name: "部署形态", value: "自主监控平台", note: "未收录统一量化参数", source: "产品谱系研究报告" }
      ],
      image: image("sentry.png", "Anduril Sentry 官方页面公开图像", "https://www.anduril.com/sentry/"),
      sourceIds: [reportSourceId, "pc-source-sentry"], dataStatus: "较完整", relatedObjects: ["Pulsar", "Wisp"]
    }),
    product({
      id: "pulsar", name: "Pulsar", category: "ground-protection", type: "电子战与频谱感知系统",
      summary: "面向频谱感知与电子战任务的产品对象，公开页面和项目资料可确认其系统定位。",
      capabilities: ["频谱感知", "电子战支援", "信号处理"], applications: ["电磁环境感知", "电子战任务"],
      image: image("pulsar.png", "Anduril Pulsar 官方页面公开图像", "https://www.anduril.com/pulsar/"),
      sourceIds: [reportSourceId, "pc-source-pulsar"], dataStatus: "较完整", relatedObjects: ["Sentry"]
    }),
    product({
      id: "wisp", name: "Wisp", category: "ground-protection", type: "被动感知系统",
      summary: "用于持续环境与目标感知的地面系统对象；现有资料以能力定位为主，参数信息有限。",
      capabilities: ["被动感知", "持续监视", "目标发现"], applications: ["周界感知", "重点区域监控"], relatedObjects: ["Sentry"]
    }),
    product({
      id: "anvil", name: "Anvil", category: "counter-uas", type: "反无人机拦截系统",
      summary: "反无人机任务体系中的拦截对象，现有资料支持产品归类和任务方向，详细参数待补充。",
      capabilities: ["目标拦截", "反无人机", "自主任务"], applications: ["基地防护", "低空威胁处置"], relatedObjects: ["Anvil-M"]
    }),
    product({
      id: "anvil-m", name: "Anvil-M", category: "counter-uas", type: "反无人机效应系统",
      summary: "Anvil 系列任务效应型对象，当前公开资料主要支持其反无人机任务定位。",
      capabilities: ["反无人机", "任务效应", "目标处置"], applications: ["低空威胁处置"], relatedObjects: ["Anvil"]
    }),
    product({
      id: "roadrunner", name: "Roadrunner", category: "counter-uas", type: "可重复使用自主拦截平台",
      summary: "具备垂直起降和重复使用特征的自主平台，可作为低空防护体系中的机动拦截节点。",
      capabilities: ["垂直起降", "可重复使用", "自主飞行", "快速响应"], applications: ["低空防护", "目标拦截", "基地防护"],
      parameters: [
        { name: "起降方式", value: "垂直起降", note: "公开资料定性确认", source: "产品谱系研究报告" },
        { name: "使用方式", value: "可重复使用", note: "Roadrunner 基础型", source: "产品谱系研究报告" }
      ],
      image: image("roadrunner.jpeg", "项目产品谱系研究报告配图", ""),
      sourceIds: [reportSourceId, "pc-source-roadrunner"], dataStatus: "较完整", relatedObjects: ["Roadrunner-M"]
    }),
    product({
      id: "roadrunner-m", name: "Roadrunner-M", category: "counter-uas", type: "可重复使用拦截效应平台",
      summary: "Roadrunner 的任务效应改型，公开研究资料确认其强化拦截与摧毁能力。",
      capabilities: ["垂直起降", "目标拦截", "快速响应", "任务效应"], applications: ["低空防护", "威胁拦截"],
      parameters: [{ name: "起降方式", value: "垂直起降", note: "系列级公开描述", source: "产品谱系研究报告" }],
      dataStatus: "一般", relatedObjects: ["Roadrunner"]
    }),
    product({
      id: "spyglass", name: "Spyglass", category: "ground-protection", type: "地面感知与任务支撑对象",
      summary: "项目研究资料收录的陆地与防护类对象，当前公开统一介绍与技术参数较少。",
      capabilities: ["任务感知", "区域监视"], applications: ["区域感知", "任务支援"], relatedObjects: ["Spark"]
    }),
    product({
      id: "spark", name: "Spark", category: "ground-protection", type: "地面任务支撑对象",
      summary: "产品谱系中的陆地与防护类对象，现阶段仅保留可确认的对象记录，避免补充未经核验内容。",
      capabilities: ["任务支撑"], applications: ["地面任务支援"], relatedObjects: ["Spyglass"]
    }),

    product({
      id: "dive-ld", name: "Dive-LD", aliases: ["LD-AUV"], category: "maritime", type: "大型自主水下航行器",
      positioning: "面向长航时、深海任务的大型自主水下平台",
      summary: "面向长航时、深海任务的大型自主水下平台，可执行情报监视侦察、海底勘测、精准定位及关键基础设施巡检等任务。",
      capabilities: ["6000 m 最大深度", "约 10 天最大耐力", "模块化任务载荷"],
      functions: [
        { title: "情报监视侦察", description: "支撑水下环境 ISR 和长期自主任务。" },
        { title: "海底勘测", description: "面向海床、水道及海洋环境开展自主测绘。" },
        { title: "精准定位", description: "支撑水下目标或任务区域的精准定位。" },
        { title: "基础设施巡检", description: "可用于海底管道、电缆等关键设施检查。" },
        { title: "模块化任务载荷", description: "通过软件、机械和电气开放接口集成不同传感器与任务载荷。" }
      ],
      parameters: [
        { name: "产品类型", value: "LD-AUV", note: "大型自主水下航行器", source: "Anduril Dive-LD 官方页面" },
        { name: "长度", value: "约 5.8 m", note: "官方 General System Desc.", source: "Anduril Dive-LD 官方页面" },
        { name: "直径", value: "约 1.2 m", note: "官方 General System Desc.", source: "Anduril Dive-LD 官方页面" },
        { name: "最大耐力", value: "约 10 天", note: "官方页面标注为 Max Endurance", source: "Anduril Dive-LD 官方页面" },
        { name: "最大深度", value: "约 6000 m", note: "官方页面标注为 Max Depth", source: "Anduril Dive-LD 官方页面" },
        { name: "有效载荷空间", value: "> 1 m³", note: "Modular Free-Flooded Payload Interface", source: "Anduril Dive-LD 官方页面" },
        { name: "任务载荷", value: "模块化", note: "支持多类传感器和任务载荷快速集成", source: "Anduril Dive-LD 官方页面" }
      ],
      applicationGroups: {
        military: ["情报监视侦察", "海底环境勘测", "精准定位", "作战环境准备", "关键水下区域任务"],
        commercial: ["水道测绘", "海底管道检查", "海底电缆检查", "矿物探测", "环境监测"]
      },
      applications: ["情报监视侦察", "海底勘测", "精准定位", "基础设施巡检"],
      image: image("dive-ld.png", "Anduril Dive-LD 官方页面公开图像", "https://www.anduril.com/dive-ld/"),
      sourceIds: [reportSourceId, "pc-source-dive-ld", "pc-source-dive-diu", "pc-source-dive-cable"], dataStatus: "较完整", relatedObjects: ["Lattice", "Dive-XL"]
    }),
    product({
      id: "dive-xl", name: "Dive-XL", category: "maritime", type: "超大型自主水下航行器",
      summary: "XL-AUV 平台，强调更长航程、更大载荷空间和复杂任务扩展能力；公开资料未形成统一量化参数集。",
      capabilities: ["长航程任务", "大型载荷集成", "自主水下航行", "多传感器扩展"], applications: ["海底勘测", "情报监视侦察", "大型载荷运送"],
      parameters: [
        { name: "平台类别", value: "XL-AUV", note: "超大型自主水下航行器", source: "产品谱系研究报告" },
        { name: "载荷能力", value: "支持大型复杂载荷或多种传感器套件", note: "公开资料定性描述", source: "产品谱系研究报告" }
      ],
      dataStatus: "一般", relatedObjects: ["Dive-LD", "Copperhead", "Seabed Sentry"]
    }),
    product({
      id: "copperhead", name: "Copperhead", category: "maritime", type: "自主水下任务载具",
      summary: "水下体系中的任务载具对象，现有资料支持其产品归属和任务方向，详细参数仍待核验。",
      capabilities: ["自主水下任务", "载荷运用", "体系协同"], applications: ["水下任务", "海底体系协同"], relatedObjects: ["Dive-LD", "Dive-XL"]
    }),
    product({
      id: "seabed-sentry", name: "Seabed Sentry", category: "maritime", type: "海底感知与监控系统",
      summary: "面向海底持续感知与监控的体系对象，现有资料以系统定位和协同关系为主。",
      capabilities: ["海底感知", "持续监控", "水下协同"], applications: ["海底监控", "水下态势感知"], relatedObjects: ["Dive-XL"]
    }),

    product({
      id: "lattice", name: "Lattice", objectType: "technology", category: "software", type: "自主系统软件平台",
      summary: "面向多传感器、多平台和任务流程的自主系统软件平台，是产品体系中的软件协同底座。",
      capabilities: ["多源融合", "任务编排", "态势呈现", "自主系统协同"], applications: ["指挥控制", "跨平台协同", "任务态势管理"],
      image: image("lattice.png", "Anduril Lattice 官方页面公开图像", "https://www.anduril.com/lattice/"),
      sourceIds: [reportSourceId, "pc-source-lattice"], dataStatus: "较完整", relatedObjects: ["Lattice C2", "Mission Autonomy", "Lattice Mesh", "Lattice SDK"]
    }),
    product({
      id: "lattice-c2", name: "Lattice C2", objectType: "technology", category: "software", type: "指挥控制软件能力",
      summary: "Lattice 产品体系中的指挥控制能力对象，现有资料可支持其软件平台归类与任务方向。",
      capabilities: ["指挥控制", "态势融合", "任务协同"], applications: ["任务指挥", "跨域态势管理"], relatedObjects: ["Lattice", "Mission Autonomy"]
    }),
    product({
      id: "mission-autonomy", name: "Mission Autonomy", objectType: "technology", category: "software", type: "任务自主软件能力",
      summary: "面向任务规划、协同与自主执行的软件能力对象，公开资料主要支持其平台内定位。",
      capabilities: ["任务规划", "自主执行", "协同控制"], applications: ["多平台协同", "自主任务执行"], relatedObjects: ["Lattice", "Lattice C2"]
    }),
    product({
      id: "lattice-mesh", name: "Lattice Mesh", objectType: "technology", category: "software", type: "分布式任务网络能力",
      summary: "Lattice 体系中的公开研究对象，面向分布式节点连接、数据共享和任务协同；内部实现边界未完全公开。",
      capabilities: ["分布式连接", "数据共享", "任务协同", "边缘节点接入"], applications: ["跨平台协同", "分布式任务网络", "边缘数据分发"],
      image: image("lattice.png", "Lattice 平台官方公开图像（体系示意）", "https://www.anduril.com/lattice/"),
      sourceIds: [reportSourceId, "pc-source-lattice", "pc-source-lattice-mesh"], dataStatus: "较完整",
      relatedObjects: ["Lattice", "Lattice C2", "Mission Autonomy", "Lattice SDK"]
    }),
    product({
      id: "lattice-sdk", name: "Lattice SDK", objectType: "technology", category: "software", type: "开发者集成能力",
      summary: "Lattice 体系中的开发与集成对象，当前公开资料可支持其接口与能力扩展定位。",
      capabilities: ["能力集成", "接口扩展", "开发者支持"], applications: ["第三方能力接入", "任务应用扩展"], relatedObjects: ["Lattice", "Lattice Mesh"]
    })
  ];

  var sources = [
    {
      id: reportSourceId,
      title: "美国安杜里尔公司无人智能产品谱系研究报告",
      publisher: "项目研究资料",
      sourceType: "industry_report",
      date: "项目资料",
      supports: "产品对象收录、分类、公开能力与任务方向整理",
      url: ""
    },
    { id: "pc-source-sentry", title: "Sentry", publisher: "Anduril", sourceType: "first_party", date: "公开页面", supports: "产品对象与官方公开信息", url: "https://www.anduril.com/sentry/" },
    { id: "pc-source-pulsar", title: "Pulsar", publisher: "Anduril", sourceType: "first_party", date: "公开页面", supports: "产品对象与官方公开信息", url: "https://www.anduril.com/pulsar/" },
    { id: "pc-source-ghost", title: "Ghost", publisher: "Anduril", sourceType: "first_party", date: "公开页面", supports: "Ghost 产品对象与官方公开信息", url: "https://www.anduril.com/ghost/" },
    { id: "pc-source-roadrunner", title: "Roadrunner", publisher: "Anduril", sourceType: "first_party", date: "公开页面", supports: "产品对象与官方公开信息", url: "https://www.anduril.com/roadrunner/" },
    { id: "pc-source-barracuda", title: "Barracuda", publisher: "Anduril", sourceType: "first_party", date: "公开页面", supports: "产品对象与官方公开信息", url: "https://www.anduril.com/barracuda/" },
    { id: "pc-source-dive-ld", title: "Dive-LD", publisher: "Anduril Industries", sourceType: "first_party", date: "当前公开页面", supports: "产品类型、尺寸、耐力、深度、载荷空间、军事与商业任务", url: "https://www.anduril.com/dive-ld" },
    { id: "pc-source-dive-diu", title: "DIU awards Anduril contract to innovate new capabilities for undersea warfare", publisher: "Anduril Industries", sourceType: "first_party", date: "2024-02-08", supports: "Dive-LD 模块化载荷、长距离持续水下任务与 Lattice 远程任务监控", url: "https://www.anduril.com/news/diu-awards-anduril-contract-to-innovate-new-capabilities-for-undersea-warfare" },
    { id: "pc-source-dive-cable", title: "Anduril Announces Autonomous Undersea Cable Inspection Project", publisher: "Anduril Industries", sourceType: "first_party", date: "2023-03-26", supports: "海底电缆检查、测深与地球物理勘测、海底映射及基础设施健康监测", url: "https://www.anduril.com/news/anduril-announces-autonomous-undersea-cable-inspection-project" },
    { id: "pc-source-fury", title: "Fury", publisher: "Anduril", sourceType: "first_party", date: "公开页面", supports: "产品对象与官方公开信息", url: "https://www.anduril.com/fury/" },
    { id: "pc-source-lattice", title: "Lattice", publisher: "Anduril", sourceType: "first_party", date: "公开页面", supports: "Lattice 平台对象与官方公开信息", url: "https://www.anduril.com/lattice/" },
    { id: "pc-source-lattice-mesh", title: "Lattice Mesh", publisher: "Anduril", sourceType: "first_party", date: "公开页面", supports: "Lattice Mesh 公开对象确认", url: "https://www.anduril.com/lattice/lattice-mesh" }
  ];

  function reportEvidence(item) {
    return {
      id: "pc-evidence-report-" + item.id,
      productId: item.id,
      sourceId: reportSourceId,
      title: item.name + " 产品对象归档",
      publisher: "项目研究资料",
      sourceType: "行业研究报告",
      grade: "C 分析归纳",
      status: "已归档",
      summary: "项目产品谱系研究报告将 " + item.name + " 收录为研究对象，并用于当前目录的分类与公开信息整理。",
      supports: "研究对象目录收录",
      url: ""
    };
  }

  var officialEvidenceMappings = [
    ["sentry", "pc-source-sentry", "Sentry 产品对象与官方页面"],
    ["pulsar", "pc-source-pulsar", "Pulsar 产品对象与官方页面"],
    ["ghost", "pc-source-ghost", "Ghost 产品对象与官方页面"],
    ["roadrunner", "pc-source-roadrunner", "Roadrunner 产品对象与官方页面"],
    ["barracuda", "pc-source-barracuda", "Barracuda 产品对象与官方页面"],
    ["dive-ld", "pc-source-dive-ld", "Dive-LD 产品对象与官方页面"],
    ["dive-ld", "pc-source-dive-diu", "Dive-LD 水下任务、模块化载荷与 Lattice 联动"],
    ["dive-ld", "pc-source-dive-cable", "Dive-LD 海底电缆巡检与商业应用"],
    ["fury", "pc-source-fury", "Fury 产品对象与官方页面"],
    ["lattice", "pc-source-lattice", "Lattice 平台对象与官方页面"],
    ["lattice-mesh", "pc-source-lattice", "Lattice 体系归属与官方平台页面"],
    ["lattice-mesh", "pc-source-lattice-mesh", "Lattice Mesh 公开对象确认"]
  ];

  var evidence = products.map(reportEvidence);
  officialEvidenceMappings.forEach(function (mapping) {
    var source = sources.find(function (item) { return item.id === mapping[1]; });
    evidence.push({
      id: "pc-evidence-" + mapping[0] + "-" + mapping[1].replace("pc-source-", ""),
      productId: mapping[0],
      sourceId: mapping[1],
      title: mapping[2],
      publisher: source.publisher,
      sourceType: "企业第一方",
      grade: "A 官方确认",
      status: "已确认",
      summary: "Anduril 官方页面公开了对应产品或平台对象，当前记录仅用于确认对象与其公开定位。",
      supports: mapping[2],
      url: source.url
    });
  });

  products.forEach(function (item) {
    item.evidenceIds = evidence.filter(function (record) {
      return record.productId === item.id;
    }).map(function (record) {
      return record.id;
    });
  });

  window.PRODUCT_CATALOG_DATA = { products: products, sources: sources, evidence: evidence };

  if (window.PLATFORM_DATA) {
    window.PLATFORM_DATA.evidence = (window.PLATFORM_DATA.evidence || []).concat(evidence);
  }
}());
