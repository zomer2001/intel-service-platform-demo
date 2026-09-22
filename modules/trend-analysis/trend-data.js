(function () {
  "use strict";

  window.TrendAnalysisData = Object.freeze({
  "meta": {
    "name": "Lattice前端演示数据包",
    "updated_at": "2026-08-30",
    "note": "事件日期、事件标题和来源URL来自公开资料快照；KPI、活跃度、评分和对标值为本系统样例研判。"
  },
  "dashboard_metrics": [
    {
      "metric_id": "M001",
      "指标名称": "监测技术对象",
      "展示值": 12,
      "单位": "项",
      "数据属性": "演示数据",
      "前端说明": "工作台顶部KPI"
    },
    {
      "metric_id": "M002",
      "指标名称": "累计资料",
      "展示值": 3826,
      "单位": "条",
      "数据属性": "演示数据",
      "前端说明": "模拟系统历史累计采集量"
    },
    {
      "metric_id": "M003",
      "指标名称": "识别技术事件",
      "展示值": 247,
      "单位": "条",
      "数据属性": "演示数据",
      "前端说明": "模拟事件抽取与融合结果"
    },
    {
      "metric_id": "M004",
      "指标名称": "研判成果",
      "展示值": 36,
      "单位": "份",
      "数据属性": "演示数据",
      "前端说明": "趋势图/路线图/差距报告等成果数量"
    },
    {
      "metric_id": "M005",
      "指标名称": "Lattice Mesh累计资料",
      "展示值": 326,
      "单位": "条",
      "数据属性": "演示数据",
      "前端说明": "动态监测详情页"
    },
    {
      "metric_id": "M006",
      "指标名称": "Lattice Mesh近30日新增",
      "展示值": 27,
      "单位": "条",
      "数据属性": "演示数据",
      "前端说明": "动态监测详情页"
    },
    {
      "metric_id": "M007",
      "指标名称": "Lattice Mesh有效事件",
      "展示值": 47,
      "单位": "条",
      "数据属性": "演示数据",
      "前端说明": "动态监测详情页"
    },
    {
      "metric_id": "M008",
      "指标名称": "Lattice Mesh高价值事件",
      "展示值": 12,
      "单位": "条",
      "数据属性": "演示数据",
      "前端说明": "动态监测详情页"
    }
  ],
  "monitor_objects": [
    {
      "object_id": "T001",
      "技术对象": "Lattice Mesh",
      "对象类型": "关键技术",
      "所属领域": "战术边缘分布式数据网格",
      "当前状态": "快速发展",
      "近30日事件": 12,
      "活跃度": 92,
      "最新变化": "联合C2应用扩展",
      "是否重点": "是",
      "数据属性": "公开事实+演示研判"
    },
    {
      "object_id": "T002",
      "技术对象": "Lattice SDK",
      "对象类型": "开发生态",
      "所属领域": "开放接口与第三方集成",
      "当前状态": "快速发展",
      "近30日事件": 7,
      "活跃度": 88,
      "最新变化": "SDK Skills与Schema Registry更新",
      "是否重点": "是",
      "数据属性": "公开事实+演示研判"
    },
    {
      "object_id": "T003",
      "技术对象": "NGC2 Common Data Layer",
      "对象类型": "项目/数据底座",
      "所属领域": "下一代指挥控制",
      "当前状态": "规模扩展",
      "近30日事件": 10,
      "活跃度": 95,
      "最新变化": "Army宣布ready to scale",
      "是否重点": "是",
      "数据属性": "公开事实+演示研判"
    },
    {
      "object_id": "T004",
      "技术对象": "Lattice Battle Manager",
      "对象类型": "应用能力",
      "所属领域": "联合防空反导C2",
      "当前状态": "验证扩展",
      "近30日事件": 5,
      "活跃度": 86,
      "最新变化": "Valiant Shield 2026联合验证",
      "是否重点": "是",
      "数据属性": "公开事实+演示研判"
    },
    {
      "object_id": "T005",
      "技术对象": "Lattice Command & Control",
      "对象类型": "平台能力",
      "所属领域": "智能指挥控制",
      "当前状态": "持续发展",
      "近30日事件": 6,
      "活跃度": 78,
      "最新变化": "多域系统持续集成",
      "是否重点": "否",
      "数据属性": "演示研判"
    },
    {
      "object_id": "T006",
      "技术对象": "Mission Autonomy",
      "对象类型": "平台能力",
      "所属领域": "自主任务与多无人系统",
      "当前状态": "持续发展",
      "近30日事件": 5,
      "活跃度": 76,
      "最新变化": "与Lattice生态协同扩展",
      "是否重点": "否",
      "数据属性": "演示研判"
    },
    {
      "object_id": "T007",
      "技术对象": "Edge Data Mesh",
      "对象类型": "关键技术",
      "所属领域": "边缘数据共享",
      "当前状态": "规模应用",
      "近30日事件": 8,
      "活跃度": 90,
      "最新变化": "CDAO生产协议持续扩展",
      "是否重点": "是",
      "数据属性": "公开事实+演示研判"
    },
    {
      "object_id": "T008",
      "技术对象": "eAirC2 Data Platform",
      "对象类型": "项目/应用",
      "所属领域": "NATO空中指挥控制",
      "当前状态": "方案评估",
      "近30日事件": 4,
      "活跃度": 82,
      "最新变化": "NATO第一阶段合同启动",
      "是否重点": "是",
      "数据属性": "公开事实+演示研判"
    }
  ],
  "events": [
    {
      "event_id": "E001",
      "事件日期": "2024-11-12",
      "事件标题": "Desert Guardian 1.0中Lattice集成10余个第三方传感器",
      "技术对象": "Lattice / Lattice SDK",
      "事件类型": "演习验证",
      "来源主体": "Anduril",
      "重要度": "高",
      "可信度": "中高",
      "事件摘要": "CENTCOM Desert Guardian 1.0中，超过10个传感器团队将系统接入Lattice，部分团队使用开放API和SDK文档自行完成快速集成。",
      "技术影响研判": "开放接口与第三方集成能力获得实战相关环境验证，说明Lattice正由自有产品平台向开放C2集成平台扩展。",
      "关联能力": "开放API；SDK；异构传感器集成",
      "页面标签": "开放生态↑",
      "来源URL": "https://www.anduril.com/news/anduril-s-lattice-showcased-in-u-s-central-command-s-desert-guardian-1-0",
      "数据属性": "公开事实+研判"
    },
    {
      "event_id": "E002",
      "事件日期": "2024-11-21",
      "事件标题": "Anduril获美太空军空间监视网络现代化合同",
      "技术对象": "Lattice Mesh",
      "事件类型": "项目合同",
      "来源主体": "Anduril",
      "重要度": "高",
      "可信度": "中高",
      "事件摘要": "Anduril获得约9970万美元IDIQ合同并获Program of Record designation，用Lattice作为空间监视网络现代化的韧性Mesh网络能力。",
      "技术影响研判": "Lattice Mesh应用由战术边缘扩展到空间态势感知/空间C2网络现代化，体现跨域适配能力。",
      "关联能力": "Mesh；跨域网络；空间C2",
      "页面标签": "应用域扩展",
      "来源URL": "https://www.anduril.com/news/anduril-awarded-program-of-record-space-surveillance-network",
      "数据属性": "公开事实+研判"
    },
    {
      "event_id": "E003",
      "事件日期": "2024-12-03",
      "事件标题": "CDAO签署三年Edge Data Mesh生产协议",
      "技术对象": "Lattice Mesh / Edge Data Mesh",
      "事件类型": "生产协议",
      "来源主体": "Anduril / CDAO",
      "重要度": "极高",
      "可信度": "中高",
      "事件摘要": "CDAO授予Anduril三年生产协议，以Lattice Mesh为基础扩展战术Edge Data Mesh，官方称该Mesh已在多个军种和作战司令部运行。",
      "技术影响研判": "技术状态从原型/试验向持续生产与规模部署跃迁，Lattice Mesh成为战术边缘公共数据基础的重要候选。",
      "关联能力": "分布式Mesh；智能路由；数据转换；边缘部署",
      "页面标签": "规模化部署↑",
      "来源URL": "https://www.anduril.com/news/cdao-awards-anduril-production-agreement-to-deliver-edge-data-mesh",
      "数据属性": "公开事实+研判"
    },
    {
      "event_id": "E004",
      "事件日期": "2025-07-18",
      "事件标题": "美国陆军向Team Anduril授予NGC2原型架构任务",
      "技术对象": "NGC2 / Lattice",
      "事件类型": "项目合同",
      "来源主体": "U.S. Army",
      "重要度": "极高",
      "可信度": "高",
      "事件摘要": "美国陆军通过OTA向Team Anduril授予约9960万美元、11个月的NGC2原型任务，为第4步兵师提供可集成、可扩展的C2软硬件与共同数据层能力。",
      "技术影响研判": "Lattice进入美国陆军下一代C2核心原型体系，技术评价重点由单点集成转向师级可扩展架构。",
      "关联能力": "共同数据层；C2；开放架构；可扩展部署",
      "页面标签": "进入NGC2核心",
      "来源URL": "https://www.army.mil/article/287180/army_announces_next_generation_command_and_control_ngc2_prototype_award",
      "数据属性": "公开事实+研判"
    },
    {
      "event_id": "E005",
      "事件日期": "2026-04-10",
      "事件标题": "Ivy Sting 5将数据Mesh扩展至65+战术边缘节点",
      "技术对象": "NGC2 / Lattice Mesh",
      "事件类型": "演习验证",
      "来源主体": "Anduril",
      "重要度": "极高",
      "可信度": "中高",
      "事件摘要": "Ivy Sting系列验证中，Ivy Sting 5把数据Mesh扩展至65个以上战术边缘节点，并执行跨军种、跨安全域的完整sensor-to-effector链路。",
      "技术影响研判": "规模性、弱网环境运行和跨军种任务闭环得到强化验证，系统由“可连接”转向“可规模运行”。",
      "关联能力": "规模化Mesh；弱网韧性；跨域链路；sensor-to-effector",
      "页面标签": "规模与韧性↑",
      "来源URL": "https://www.anduril.com/news/scaling-next-generation-command-and-control-from-prototype-to-fight",
      "数据属性": "公开事实+研判"
    },
    {
      "event_id": "E006",
      "事件日期": "2026-05-21",
      "事件标题": "Ivy Mass将Lattice扩展到第4步兵师全师",
      "技术对象": "NGC2 / Lattice Mesh",
      "事件类型": "规模部署验证",
      "来源主体": "Anduril",
      "重要度": "极高",
      "可信度": "中高",
      "事件摘要": "Ivy Mass期间，NGC2扩展至第4步兵师全师；Anduril称连接士兵终端从约10台增长至2500余台，形成同一共享数据层。",
      "技术影响研判": "Lattice Mesh从节点级/旅营级试验进一步扩展到师级规模，终端节点类型由固定设备扩展到士兵终端。",
      "关联能力": "师级规模；终端节点；共享数据层；边缘计算",
      "页面标签": "师级规模↑",
      "来源URL": "https://www.anduril.com/news/ngc2-at-scale-how-team-anduril-and-the-army-took-lattice-across-the-4th-infantry-division",
      "数据属性": "公开事实+研判"
    },
    {
      "event_id": "E007",
      "事件日期": "2026-06-03",
      "事件标题": "美国陆军公开Ivy Mass师级NGC2验证",
      "技术对象": "NGC2",
      "事件类型": "军方验证",
      "来源主体": "U.S. Army",
      "重要度": "高",
      "可信度": "高",
      "事件摘要": "美国陆军报道Ivy Mass在第4步兵师开展师级NGC2验证，强调从概念验证向师级装备与持续改进推进。",
      "技术影响研判": "军方独立来源对NGC2规模验证形成交叉支撑，提高Lattice相关研判的证据可信度。",
      "关联能力": "师级验证；军方证据；持续改进",
      "页面标签": "双源验证",
      "来源URL": "https://www.army.mil/article/292999",
      "数据属性": "公开事实+研判"
    },
    {
      "event_id": "E008",
      "事件日期": "2026-06-09",
      "事件标题": "Lattice Developer Console与REST SDK等开发能力更新",
      "技术对象": "Lattice SDK",
      "事件类型": "开发者生态",
      "来源主体": "Anduril Developer",
      "重要度": "高",
      "可信度": "高",
      "事件摘要": "Lattice Developer Changelog发布Developer Console、新REST SDK、Buf Schema registry等更新。",
      "技术影响研判": "开放生态由API/SDK进一步走向统一开发者控制台、多语言REST访问和模式资产开放，集成门槛继续下降。",
      "关联能力": "Developer Console；REST SDK；Schema；开放生态",
      "页面标签": "开发生态↑",
      "来源URL": "https://developer.anduril.com/changelog",
      "数据属性": "公开事实+研判"
    },
    {
      "event_id": "E009",
      "事件日期": "2026-06-22",
      "事件标题": "美国陆军确定NGC2 Common Data Layer Baseline",
      "技术对象": "NGC2 / Lattice Mesh",
      "事件类型": "体系定型",
      "来源主体": "U.S. Army",
      "重要度": "极高",
      "可信度": "高",
      "事件摘要": "美国陆军宣布建立NGC2共同数据层基线，由Anduril牵头common data baseline，并与Palantir Foundry等形成edge-to-cloud data mesh。",
      "技术影响研判": "Lattice角色由C2应用/数据Mesh进一步向陆军下一代C2公共数据基础层延伸，是技术定位的重要跃迁。",
      "关联能力": "Common Data Layer；Edge-to-Cloud；数据基线；数据联邦",
      "页面标签": "数据底座跃迁",
      "来源URL": "https://www.army.mil/article/293409",
      "数据属性": "公开事实+研判"
    },
    {
      "event_id": "E010",
      "事件日期": "2026-07-07",
      "事件标题": "NATO eAirC2第一阶段合同启动",
      "技术对象": "eAirC2 / Lattice",
      "事件类型": "国际项目",
      "来源主体": "NATO NCIA",
      "重要度": "极高",
      "可信度": "高",
      "事件摘要": "NATO NCIA向Anduril、Palantir、Athea授予eAirC2首阶段合同，目标是构建基于开放标准、数据中心化架构的未来AirC2数字平台。",
      "技术影响研判": "Lattice相关能力进入NATO联盟级空中C2评估环境，应用范围从美国军种体系向联盟级多国体系扩展。",
      "关联能力": "联盟级C2；开放标准；数据中心化架构",
      "页面标签": "联盟级应用↑",
      "来源URL": "https://www.ncia.nato.int/newsroom/news/nato-accelerates-transformation-of-air-command-and-control-with-key-contract-awards",
      "数据属性": "公开事实+研判"
    },
    {
      "event_id": "E011",
      "事件日期": "2026-07-23",
      "事件标题": "Lattice Schema Registry正式可用",
      "技术对象": "Lattice SDK",
      "事件类型": "开发者生态",
      "来源主体": "Anduril Developer",
      "重要度": "高",
      "可信度": "高",
      "事件摘要": "Lattice Schema Registry上线，可用Protobuf IDL发布、共享和版本化集成Schema。",
      "技术影响研判": "数据模式从SDK内置定义进一步发展为可治理、可共享、可版本化的Schema生态，增强第三方平台能力表达与持续演进。",
      "关联能力": "Schema Registry；Protobuf；版本治理；第三方集成",
      "页面标签": "Schema生态↑",
      "来源URL": "https://developer.anduril.com/changelog/2026/7/23",
      "数据属性": "公开事实+研判"
    },
    {
      "event_id": "E012",
      "事件日期": "2026-07-31",
      "事件标题": "美国陆军宣布NGC2已ready to scale",
      "技术对象": "NGC2",
      "事件类型": "项目状态",
      "来源主体": "U.S. Army",
      "重要度": "极高",
      "可信度": "高",
      "事件摘要": "美国陆军宣布NGC2准备在全军范围扩展，并指出共同数据层是NGC2核心，生态已有60余家公司参与。",
      "技术影响研判": "NGC2由师级原型验证进入持续交付和更大范围扩展阶段，Lattice所处的数据生态规模继续扩大。",
      "关联能力": "持续交付；规模扩展；产业生态；Common Data Layer",
      "页面标签": "规模部署阶段",
      "来源URL": "https://www.army.mil/article/294284/army_leaders_next_generation_command_and_control_ready_to_scale",
      "数据属性": "公开事实+研判"
    },
    {
      "event_id": "E013",
      "事件日期": "2026-08-03",
      "事件标题": "Lattice SDK Skills发布",
      "技术对象": "Lattice SDK",
      "事件类型": "开发者生态",
      "来源主体": "Anduril Developer",
      "重要度": "中高",
      "可信度": "高",
      "事件摘要": "Anduril发布官方Lattice SDK Skills，用于指导coding agents依据最新最佳实践创建集成。",
      "技术影响研判": "开发生态开始面向AI辅助开发与智能编码代理优化，进一步降低Lattice集成开发成本。",
      "关联能力": "AI coding；SDK；集成开发；Developer Experience",
      "页面标签": "AI开发生态↑",
      "来源URL": "https://developer.anduril.com/changelog",
      "数据属性": "公开事实+研判"
    },
    {
      "event_id": "E014",
      "事件日期": "2026-08-21",
      "事件标题": "Valiant Shield 2026验证Lattice驱动的Battle Manager",
      "技术对象": "Lattice Battle Manager",
      "事件类型": "联合演习",
      "来源主体": "Anduril",
      "重要度": "极高",
      "可信度": "中高",
      "事件摘要": "Anduril在Valiant Shield 2026中展示Battle Manager原型，基于Lattice集成陆军、空军、海军和导弹防御局防空资产，并融合为联合航迹图。",
      "技术影响研判": "Lattice进一步从数据网格/基础软件向联合防空反导战斗管理支撑扩展，体现多军种实时数据融合和C2应用价值。",
      "关联能力": "联合防空反导；Battle Manager；多军种融合；共同航迹图",
      "页面标签": "联合C2应用↑",
      "来源URL": "https://www.anduril.com/news/anduril-demonstrates-battle-manager-at-valiant-shield-2026",
      "数据属性": "公开事实+研判"
    }
  ],
  "trend_lanes": [
    {
      "lane_id": "TR01",
      "趋势维度": "网络架构",
      "阶段1": "中心化/Hub-Spoke",
      "阶段2": "分布式Mesh",
      "阶段3": "DDIL韧性网络",
      "阶段4": "Edge-to-Cloud协同",
      "当前判断": "分布式与边云协同成为主线",
      "证据事件": "E003;E005;E009",
      "数据属性": "研判"
    },
    {
      "lane_id": "TR02",
      "趋势维度": "数据体系",
      "阶段1": "系统专有格式",
      "阶段2": "多源数据融合",
      "阶段3": "异构数据标准化",
      "阶段4": "Common Data Layer / Schema治理",
      "当前判断": "数据底座由接口集成走向统一数据层与模式治理",
      "证据事件": "E001;E008;E009;E011",
      "数据属性": "研判"
    },
    {
      "lane_id": "TR03",
      "趋势维度": "计算模式",
      "阶段1": "中心节点计算",
      "阶段2": "边缘节点处理",
      "阶段3": "Local-first运行",
      "阶段4": "大规模边缘设备协同",
      "当前判断": "边缘计算由少量固定节点扩展至大规模终端",
      "证据事件": "E005;E006",
      "数据属性": "研判"
    },
    {
      "lane_id": "TR04",
      "趋势维度": "开放生态",
      "阶段1": "封闭式系统集成",
      "阶段2": "Open API",
      "阶段3": "SDK / Developer Console",
      "阶段4": "Schema Registry / AI开发Skills",
      "当前判断": "开发生态持续开放并形成工具链",
      "证据事件": "E001;E008;E011;E013",
      "数据属性": "研判"
    },
    {
      "lane_id": "TR05",
      "趋势维度": "应用层级",
      "阶段1": "单平台/单任务",
      "阶段2": "多传感器融合",
      "阶段3": "跨军种师级C2",
      "阶段4": "联盟级/联合防空反导",
      "当前判断": "应用边界持续从单系统向多域和联盟级扩展",
      "证据事件": "E002;E006;E010;E014",
      "数据属性": "研判"
    }
  ],
  "route_chart": {
    "title": "分布式任务数据基础设施技术树（Lattice Mesh研究分支）",
    "target_id": "lattice-mesh",
    "target_name": "Lattice Mesh",
    "maturity_stages": [
      { "value": 1, "label": "初始架构" },
      { "value": 2, "label": "分布式/模块化" },
      { "value": 3, "label": "平台化/规模化" },
      { "value": 4, "label": "体系化/生态化" }
    ],
    "routes": [
      {
        "id": "distributed-network",
        "name": "分布式网络",
        "color": "#2563eb",
        "service": "在弱网、断连和多节点环境中保持数据连接与任务连续性。",
        "technology": "去中心化Mesh、动态发现、分布式状态同步与自适应路由。",
        "maturity_dimension": "resilient-network",
        "focus_branch": true
      },
      {
        "id": "data-processing",
        "name": "数据处理",
        "color": "#7c3aed",
        "service": "将多源异构数据转换为可共享、可计算、可治理的共同数据。",
        "technology": "数据转换、语义归一、多源融合、共同数据层与Schema治理。",
        "maturity_dimension": "core-network"
      },
      {
        "id": "edge-computing",
        "name": "边缘计算",
        "color": "#059669",
        "service": "把数据处理和任务协同能力下沉到战术边缘与终端设备。",
        "technology": "边缘节点运行、Local-first处理、资源治理与边云协同。",
        "maturity_dimension": "deployment"
      },
      {
        "id": "open-integration",
        "name": "开放集成",
        "color": "#ea580c",
        "service": "为第三方系统、传感器和开发者提供标准化接入能力。",
        "technology": "Open API、SDK、Developer Console、Schema Registry与AI开发工具。",
        "maturity_dimension": "ecosystem"
      }
    ],
    "node_overrides": {
      "R017": {
        "evidence_level": "高",
        "maturity_dimension": "resilient-network",
        "evidence_type": "专利",
        "evidence_label": "US10506436B1 · Lattice mesh",
        "evidence_publisher": "Google Patents / USPTO 元数据",
        "evidence_date": "优先权 2018-06-11 · 授权公开 2019-12-10",
        "evidence_summary": "专利公开了一种网格节点注册与可信接入机制：主机携带密钥和资产标识完成注册，由注册机构签发证书，随后更新资产数据库，并将编码后的消息发送或发布到网络节点。",
        "evidence_supports": "支持“Lattice Mesh 在早期已形成去中心化节点接入、身份授权、资产登记与消息发布”等架构原理判断。",
        "evidence_boundary": "专利权利要求用于证明架构思想和技术主张的存在，不等同于证明当时已经规模部署，也不能单独证明实际性能或完整产品实现。",
        "evidence_url": "https://patents.google.com/patent/US10506436B1/en",
        "evidence_materials": [
          {
            "type": "发明专利",
            "title": "US10506436B1 · Lattice mesh",
            "publisher": "Anduril Industries / USPTO",
            "date": "优先权 2018-06-11 · 授权 2019-12-10",
            "supports": "节点注册、证书签发、资产登记以及消息向网络节点发送或发布。",
            "url": "https://patents.google.com/patent/US10506436B1/en"
          },
          {
            "type": "会议论文",
            "title": "Resilient Networking Keeps Critical Sensors Connected",
            "publisher": "AMOS Conference · Anduril / U.S. Space Force",
            "date": "2023",
            "supports": "回溯早期方案并记录 Flux/Lattice Mesh 从原理走向多站点演示和任务运行的证据链。",
            "url": "https://amostech.com/TechnicalPapers/2023/Poster/Pruden.pdf"
          }
        ]
      },
      "R021": {
        "evidence_level": "中高",
        "maturity_dimension": "resilient-network",
        "evidence_type": "方案发布",
        "evidence_label": "Resilient Networking Keeps Critical Sensors Connected",
        "evidence_publisher": "AMOS Conference · Anduril / U.S. Space Force",
        "evidence_date": "首次提出 2019 · 回溯材料 2023",
        "evidence_summary": "AMOS 公开论文回溯说明，这项韧性网络工作最初在 2019 年 Space Pitch Day 提出，目标是为关键空间监视传感器提供多路径、可快速恢复的数据连接。",
        "evidence_supports": "支持“专利中的 Mesh 原理在 2019 年进入面向空间监视任务的方案化阶段”的判断。",
        "evidence_boundary": "该日期来自后续会议论文的回溯性陈述，能够说明方案提出时间，但不等同于当年完成产品部署或验收。",
        "evidence_url": "https://amostech.com/TechnicalPapers/2023/Poster/Pruden.pdf",
        "evidence_materials": [
          {
            "type": "会议论文",
            "title": "Resilient Networking Keeps Critical Sensors Connected",
            "publisher": "AMOS Conference · Anduril / U.S. Space Force",
            "date": "2023（回溯 2019 方案）",
            "supports": "论文明确说明韧性网络工作最初在 2019 年 Space Pitch Day 提出。",
            "url": "https://amostech.com/TechnicalPapers/2023/Poster/Pruden.pdf"
          }
        ]
      },
      "R022": {
        "time_value": 2026.75,
        "node_kind": "focus",
        "is_key_maturity": true,
        "evidence_level": "高",
        "maturity_dimension": "core-network",
        "evidence_type": "关键技术研究对象",
        "evidence_label": "Lattice Mesh · 成熟度分析对象",
        "evidence_publisher": "多源公开材料综合",
        "evidence_date": "当前研判",
        "evidence_summary": "该节点不是单一事件，而是本次调研选中的关键技术对象。其成熟度由专利原理、多站点演示、真实断链恢复、生产协议和体系集成等证据累计研判。",
        "evidence_supports": "用于将分布式网络分支上的连续演进证据汇聚到 Lattice Mesh 的分维度成熟度分析。",
        "evidence_boundary": "该节点表示分析对象及证据汇聚位置，不表示2026年8月发生了一次新的产品发布，也不代表其他通用技术被Lattice直接采用。",
        "evidence_materials": [
          {
            "type": "发明专利",
            "title": "US10506436B1 · Lattice mesh",
            "publisher": "Anduril Industries / USPTO",
            "date": "2018—2019",
            "supports": "支撑早期节点接入、身份授权、资产登记和消息发布原理。",
            "url": "https://patents.google.com/patent/US10506436B1/en"
          },
          {
            "type": "会议论文",
            "title": "Resilient Networking Keeps Critical Sensors Connected",
            "publisher": "AMOS Conference · Anduril / U.S. Space Force",
            "date": "2023",
            "supports": "支撑多站点传输、自动选路和真实断链恢复证据。",
            "url": "https://amostech.com/TechnicalPapers/2023/Poster/Pruden.pdf"
          },
          {
            "type": "官方产品资料",
            "title": "Lattice Mesh",
            "publisher": "Anduril Industries",
            "date": "持续更新",
            "supports": "支撑Distributed Mesh、Translate & Normalize和Intelligent Routing等公开能力描述。",
            "url": "https://www.anduril.com/lattice/lattice-mesh"
          }
        ]
      },
      "R018": {
        "evidence_level": "高",
        "maturity_dimension": "core-network",
        "evidence_type": "多站点演示",
        "evidence_label": "Resilient Networking Keeps Critical Sensors Connected",
        "evidence_publisher": "AMOS Conference · Anduril / U.S. Space Force",
        "evidence_date": "演示 2022-11 · 论文 2023",
        "evidence_summary": "Space Surveillance Network 多站点演示接入不同遗留任务系统，通过 NFS、TCP/IP 与专有信号接口交换任务、观测和星表更新，并向 Unified Data Library 发布数据。",
        "evidence_supports": "支持“异构任务数据已能被接入、透明分发并向统一数据环境汇聚”的工程验证判断。",
        "evidence_boundary": "会议论文和参与方材料能够证明演示范围，但不等同于通用数据标准已经覆盖全部系统，也不是第三方独立性能测评。",
        "evidence_url": "https://amostech.com/TechnicalPapers/2023/Poster/Pruden.pdf"
      },
      "R019": {
        "evidence_level": "高",
        "maturity_dimension": "resilient-network",
        "evidence_type": "多站点演示",
        "evidence_label": "Resilient Networking Keeps Critical Sensors Connected",
        "evidence_publisher": "AMOS Conference · Anduril / U.S. Space Force",
        "evidence_date": "演示 2022-11 · 论文 2023",
        "evidence_summary": "演示跨接 Maui GEODSS、Eglin 和 Dahlgren 等站点，在商业卫星通信与国防网络之间传送双向遗留任务数据；Flux 节点维护连通关系图并自动计算下一跳。",
        "evidence_supports": "支持“Mesh 已从架构原理进入多站点、多链路、双向任务数据传输验证”的判断。",
        "evidence_boundary": "材料由项目参与方发布，可证明演示环境和能力范围，但不应外推为所有复杂对抗环境下的性能结论。",
        "evidence_url": "https://amostech.com/TechnicalPapers/2023/Poster/Pruden.pdf"
      },
      "R020": {
        "evidence_level": "高",
        "maturity_dimension": "resilient-network",
        "evidence_type": "任务运行",
        "evidence_label": "Maui GEODSS 风暴断链恢复记录",
        "evidence_publisher": "AMOS Conference · Anduril / U.S. Space Force",
        "evidence_date": "事件 2022-12-19 · 论文 2023",
        "evidence_summary": "公开材料称，风暴导致 Maui GEODSS 传统通信中断后，Flux 在 24 小时内恢复双向任务通信，并连续 21 天承担主要运行通信链路。",
        "evidence_supports": "支持“边缘节点与替代链路能够在真实中断事件中恢复任务连接、维持业务连续性”的判断。",
        "evidence_boundary": "该记录反映一次特定站点和链路条件下的任务运行，不代表所有部署场景均可达到相同恢复时间。",
        "evidence_url": "https://amostech.com/TechnicalPapers/2023/Poster/Pruden.pdf"
      },
      "R001": { "阶段": 2, "evidence_level": "中高", "maturity_dimension": "resilient-network" },
      "R002": { "阶段": 3, "evidence_level": "高", "maturity_dimension": "scale" },
      "R003": { "阶段": 3, "evidence_level": "高", "maturity_dimension": "scale" },
      "R004": { "阶段": 4, "evidence_level": "高", "maturity_dimension": "deployment" },
      "R005": { "阶段": 2, "evidence_level": "中高", "maturity_dimension": "core-network" },
      "R006": { "阶段": 3, "evidence_level": "中高", "maturity_dimension": "core-network" },
      "R007": { "阶段": 4, "evidence_level": "高", "maturity_dimension": "deployment" },
      "R008": { "阶段": 4, "evidence_level": "高", "maturity_dimension": "ecosystem" },
      "R009": { "阶段": 3, "evidence_level": "中高", "maturity_dimension": "deployment" },
      "R010": { "阶段": 3, "evidence_level": "高", "maturity_dimension": "scale" },
      "R011": { "阶段": 3, "evidence_level": "高", "maturity_dimension": "scale" },
      "R012": { "阶段": 4, "evidence_level": "高", "maturity_dimension": "deployment" },
      "R013": { "阶段": 2, "evidence_level": "高", "maturity_dimension": "ecosystem" },
      "R014": { "阶段": 3, "evidence_level": "高", "maturity_dimension": "ecosystem" },
      "R015": { "阶段": 4, "evidence_level": "高", "maturity_dimension": "ecosystem" },
      "R016": { "阶段": 4, "evidence_level": "中高", "maturity_dimension": "ecosystem", "is_new": true }
    },
    "relations": [
      { "source": "R017", "target": "R021", "type": "原理到方案", "description": "专利中的去中心化连接与可信接入原理进入面向空间监视任务的韧性网络方案。" },
      { "source": "R021", "target": "R019", "type": "方案到验证", "description": "2019年提出的韧性网络方案在2022年进入多站点任务数据传输验证。" },
      { "source": "R019", "target": "R001", "type": "任务经验产品化", "description": "多站点与应急通信经验继续演化为面向边缘环境的数据Mesh能力。" },
      { "source": "R018", "target": "R005", "type": "融合能力演进", "description": "早期体系数据融合逐步演化为异构数据转换与共同数据层。" },
      { "source": "R004", "target": "R007", "type": "汇聚支撑", "description": "边云数据网为共同数据层提供网络底座。" },
      { "source": "R007", "target": "R012", "type": "体系协同", "description": "共同数据层在边缘与云端协同运行。" },
      { "source": "R008", "target": "R015", "type": "模式治理", "description": "数据处理侧的Schema能力转化为开放集成治理能力。" },
      { "source": "R006", "target": "R014", "type": "能力开放", "description": "多源融合能力通过开发工具链向第三方开放。" },
      { "source": "R015", "target": "R016", "type": "工具演进", "description": "Schema生命周期治理进一步支撑AI辅助开发。" }
    ],
    "common_nodes": [
      {
        "route_id": "C001",
        "阶段": 1,
        "时间": "2015",
        "节点名称": "DDS 数据中心发布订阅",
        "节点说明": "数据中心发布订阅、主题类型和QoS构成分布式实时数据交换的通用技术底座。",
        "节点状态": "通用标准",
        "数据属性": "公共技术背景",
        "node_kind": "common",
        "evidence_level": "高",
        "evidence_type": "国际标准",
        "evidence_label": "OMG Data Distribution Service v1.4",
        "evidence_publisher": "Object Management Group",
        "evidence_date": "2015",
        "evidence_summary": "DDS定义数据中心发布订阅模型，使应用围绕主题、类型和QoS共享数据。这里仅作为路线的公共技术背景。",
        "evidence_supports": "解释数据分发、实时发布订阅和QoS如何推动后续数据Mesh与异构数据路线。",
        "evidence_boundary": "表示通用技术推动关系，不表示Lattice使用或实现了特定DDS产品。",
        "evidence_url": "https://www.omg.org/spec/DDS/1.4/PDF/changebar"
      },
      {
        "route_id": "C002",
        "阶段": 1,
        "时间": "2018",
        "节点名称": "云边协同与边缘容器",
        "节点说明": "边缘应用管理、云边元数据同步和节点自治成为通用工程能力。",
        "节点状态": "通用开源技术",
        "数据属性": "公共技术背景",
        "node_kind": "common",
        "evidence_level": "高",
        "evidence_type": "开源技术",
        "evidence_label": "KubeEdge · Kubernetes Native Edge Computing Framework",
        "evidence_publisher": "Cloud Native Computing Foundation",
        "evidence_date": "2018起",
        "evidence_summary": "KubeEdge将容器编排扩展到边缘，并提供边缘应用管理、元数据同步和设备管理。这里作为边缘计算分支的公共背景。",
        "evidence_supports": "解释边缘节点自治、云边协同和大规模终端管理如何推动后续边缘路线。",
        "evidence_boundary": "不表示Lattice采用KubeEdge，仅表示同类工程问题已有公共技术路径。",
        "evidence_url": "https://www.cncf.io/projects/kubeedge/"
      },
      {
        "route_id": "C003",
        "阶段": 1,
        "时间": "2019",
        "节点名称": "工作负载身份与短期证书",
        "节点说明": "动态异构环境中的工作负载身份、证书签发与双向认证形成公共安全能力。",
        "节点状态": "通用规范",
        "数据属性": "公共技术背景",
        "node_kind": "common",
        "evidence_level": "高",
        "evidence_type": "开放规范",
        "evidence_label": "SPIFFE Overview",
        "evidence_publisher": "SPIFFE Project / CNCF",
        "evidence_date": "持续演进",
        "evidence_summary": "SPIFFE面向动态异构环境定义工作负载身份与短期身份文档，为分布式系统的可信接入提供通用参考。",
        "evidence_supports": "解释身份引导、证书签发与跨环境认证如何推动可信Mesh节点接入。",
        "evidence_boundary": "不表示Lattice采用SPIFFE；这里只建立通用技术概念与目标专利原理之间的分析关系。",
        "evidence_url": "https://spiffe.io/docs/latest/spiffe-about/overview/"
      },
      {
        "route_id": "C004",
        "阶段": 2,
        "时间": "2020",
        "节点名称": "JSON Schema 与版本治理",
        "节点说明": "Schema核心、校验和版本兼容机制推动异构数据标准化与开放集成。",
        "节点状态": "通用规范",
        "数据属性": "公共技术背景",
        "node_kind": "common",
        "evidence_level": "高",
        "evidence_type": "开放规范",
        "evidence_label": "JSON Schema 2020-12",
        "evidence_publisher": "JSON Schema Project",
        "evidence_date": "2020-12",
        "evidence_summary": "JSON Schema将数据结构描述和校验规则标准化，为Schema注册、兼容性检查和版本治理提供公共基础。",
        "evidence_supports": "解释Schema治理如何推动异构数据转换与开发者生态分支。",
        "evidence_boundary": "不表示Lattice内部Schema等同JSON Schema，仅表示公共方法对路线的推动作用。",
        "evidence_url": "https://json-schema.org/specification"
      },
      {
        "route_id": "C005",
        "阶段": 1,
        "时间": "2019",
        "节点名称": "Local-first 与CRDT状态合并",
        "节点说明": "离线优先、状态复制和无冲突合并研究推动断连自治与恢复后收敛。",
        "节点状态": "通用研究",
        "数据属性": "公共技术背景",
        "node_kind": "common",
        "evidence_level": "中高",
        "evidence_type": "研究论文",
        "evidence_label": "Local-first software",
        "evidence_publisher": "Ink & Switch",
        "evidence_date": "2019",
        "evidence_summary": "Local-first研究强调本地可用、跨设备同步和所有权，CRDT为并发状态的自动合并提供重要技术路径。",
        "evidence_supports": "解释断连期间可用、恢复同步和分布式状态收敛如何推动弱网与边缘路线。",
        "evidence_boundary": "不表示Lattice采用特定CRDT实现，仅作为分布式状态研究的公共技术背景。",
        "evidence_url": "https://www.inkandswitch.com/essay/local-first/"
      }
    ],
    "branch_relations": [
      { "source": "C001", "target": "R018", "type": "数据分发基础" },
      { "source": "C001", "target": "R005", "type": "发布订阅到数据Mesh" },
      { "source": "C002", "target": "R009", "type": "边缘工程基础" },
      { "source": "C002", "target": "R020", "type": "节点自治支撑" },
      { "source": "C003", "target": "R017", "type": "身份与可信接入" },
      { "source": "C003", "target": "R013", "type": "开放接入安全" },
      { "source": "C004", "target": "R005", "type": "Schema标准化" },
      { "source": "C004", "target": "R013", "type": "开放接口治理" },
      { "source": "C005", "target": "R001", "type": "断连状态收敛" },
      { "source": "C005", "target": "R009", "type": "边缘自治" }
    ]
  },
  "route_evolution": [
    {
      "route_id": "R017",
      "技术路线": "分布式网络",
      "阶段": 1,
      "时间": "2018-2019",
      "节点名称": "Lattice Mesh 原理与专利族",
      "节点说明": "形成去中心化连接、发布订阅和身份授权等早期架构原理。",
      "关联事件": "",
      "节点状态": "原理形成",
      "数据属性": "公开专利+归纳"
    },
    {
      "route_id": "R021",
      "技术路线": "分布式网络",
      "阶段": 1,
      "时间": "2019",
      "节点名称": "Space Pitch Day 韧性网络方案",
      "节点说明": "将 Mesh 原理面向关键空间监视传感器的多路径连接与快速恢复需求进行方案化。",
      "关联事件": "",
      "节点状态": "方案提出",
      "数据属性": "公开事实+归纳"
    },
    {
      "route_id": "R018",
      "技术路线": "数据处理",
      "阶段": 1,
      "时间": "2022-11",
      "节点名称": "遗留任务数据透明接入",
      "节点说明": "多站点演示验证异构任务接口接入、透明分发与统一数据环境发布。",
      "关联事件": "",
      "节点状态": "多站点演示",
      "数据属性": "公开事实+归纳"
    },
    {
      "route_id": "R019",
      "技术路线": "分布式网络",
      "阶段": 2,
      "时间": "2022-11",
      "节点名称": "SSN 多站点 Mesh 与自动选路",
      "节点说明": "在商业卫星通信与国防网络之间开展多站点双向任务数据传输，并自动计算下一跳。",
      "关联事件": "",
      "节点状态": "相关环境验证",
      "数据属性": "公开事实+归纳"
    },
    {
      "route_id": "R020",
      "技术路线": "边缘计算",
      "阶段": 2,
      "时间": "2022-12",
      "节点名称": "Maui GEODSS 应急通信恢复",
      "节点说明": "传统通信中断后恢复双向任务通信，并连续承担主要通信链路。",
      "关联事件": "",
      "节点状态": "真实任务运行",
      "数据属性": "公开事实+研判"
    },
    {
      "route_id": "R001",
      "技术路线": "分布式网络",
      "阶段": 1,
      "时间": "2024",
      "节点名称": "Distributed Mesh",
      "节点说明": "面向边缘与受限通信环境的去中心化Mesh",
      "关联事件": "E003",
      "节点状态": "基础能力",
      "数据属性": "事实+归纳"
    },
    {
      "route_id": "R002",
      "技术路线": "分布式网络",
      "阶段": 2,
      "时间": "2026-03",
      "节点名称": "65+ Tactical Edge Nodes",
      "节点说明": "Mesh规模扩展并验证跨军种任务链",
      "关联事件": "E005",
      "节点状态": "规模验证",
      "数据属性": "事实+归纳"
    },
    {
      "route_id": "R003",
      "技术路线": "分布式网络",
      "阶段": 3,
      "时间": "2026-05",
      "节点名称": "Division-scale Mesh",
      "节点说明": "扩展至第4步兵师和2500+终端设备",
      "关联事件": "E006",
      "节点状态": "师级扩展",
      "数据属性": "事实+归纳"
    },
    {
      "route_id": "R004",
      "技术路线": "分布式网络",
      "阶段": 4,
      "时间": "2026-06",
      "节点名称": "Edge-to-Cloud Data Mesh",
      "节点说明": "进入NGC2共同数据层基线",
      "关联事件": "E009",
      "节点状态": "体系底座",
      "数据属性": "事实+归纳"
    },
    {
      "route_id": "R005",
      "技术路线": "数据处理",
      "阶段": 1,
      "时间": "2024",
      "节点名称": "Translate & Normalize",
      "节点说明": "异构数据转换与标准化",
      "关联事件": "E003",
      "节点状态": "核心能力",
      "数据属性": "事实+归纳"
    },
    {
      "route_id": "R006",
      "技术路线": "数据处理",
      "阶段": 2,
      "时间": "2024-2026",
      "节点名称": "Multi-source Fusion",
      "节点说明": "多传感器/多平台数据融合",
      "关联事件": "E001;E014",
      "节点状态": "持续增强",
      "数据属性": "事实+归纳"
    },
    {
      "route_id": "R007",
      "技术路线": "数据处理",
      "阶段": 3,
      "时间": "2026-06",
      "节点名称": "Common Data Layer",
      "节点说明": "共同数据层成为NGC2核心",
      "关联事件": "E009",
      "节点状态": "体系化",
      "数据属性": "事实+归纳"
    },
    {
      "route_id": "R008",
      "技术路线": "数据处理",
      "阶段": 4,
      "时间": "2026-07",
      "节点名称": "Schema Registry",
      "节点说明": "Schema发布、共享与版本治理",
      "关联事件": "E011",
      "节点状态": "生态治理",
      "数据属性": "事实+归纳"
    },
    {
      "route_id": "R009",
      "技术路线": "边缘计算",
      "阶段": 1,
      "时间": "2024",
      "节点名称": "Edge Data Mesh",
      "节点说明": "面向战术边缘持续运行",
      "关联事件": "E003",
      "节点状态": "生产扩展",
      "数据属性": "事实+归纳"
    },
    {
      "route_id": "R010",
      "技术路线": "边缘计算",
      "阶段": 2,
      "时间": "2026-03",
      "节点名称": "Tactical Edge Nodes",
      "节点说明": "战术边缘节点规模增长",
      "关联事件": "E005",
      "节点状态": "规模验证",
      "数据属性": "事实+归纳"
    },
    {
      "route_id": "R011",
      "技术路线": "边缘计算",
      "阶段": 3,
      "时间": "2026-05",
      "节点名称": "Soldier End-user Devices",
      "节点说明": "士兵终端成为数据层节点",
      "关联事件": "E006",
      "节点状态": "节点泛化",
      "数据属性": "事实+归纳"
    },
    {
      "route_id": "R012",
      "技术路线": "边缘计算",
      "阶段": 4,
      "时间": "2026-06",
      "节点名称": "Edge-to-Cloud",
      "节点说明": "边缘与云端共同数据底座协同",
      "关联事件": "E009",
      "节点状态": "体系协同",
      "数据属性": "事实+归纳"
    },
    {
      "route_id": "R013",
      "技术路线": "开放集成",
      "阶段": 1,
      "时间": "2024-11",
      "节点名称": "Open API / SDK",
      "节点说明": "第三方传感器可自行快速接入",
      "关联事件": "E001",
      "节点状态": "开放接口",
      "数据属性": "事实+归纳"
    },
    {
      "route_id": "R014",
      "技术路线": "开放集成",
      "阶段": 2,
      "时间": "2026-06",
      "节点名称": "Developer Console / REST SDK",
      "节点说明": "统一开发入口和多语言REST访问",
      "关联事件": "E008",
      "节点状态": "开发工具链",
      "数据属性": "事实+归纳"
    },
    {
      "route_id": "R015",
      "技术路线": "开放集成",
      "阶段": 3,
      "时间": "2026-07",
      "节点名称": "Schema Registry",
      "节点说明": "开放集成能力进入Schema生命周期治理",
      "关联事件": "E011",
      "节点状态": "生态治理",
      "数据属性": "事实+归纳"
    },
    {
      "route_id": "R016",
      "技术路线": "开放集成",
      "阶段": 4,
      "时间": "2026-08",
      "节点名称": "SDK Skills",
      "节点说明": "面向coding agent提供官方开发Skills",
      "关联事件": "E013",
      "节点状态": "AI辅助开发",
      "数据属性": "事实+归纳"
    },
    {
      "route_id": "R022",
      "技术路线": "分布式网络",
      "阶段": 4,
      "时间": "当前",
      "节点名称": "Lattice Mesh（关键技术研究对象）",
      "节点说明": "位于分布式网络分支，汇聚专利、演示、真实运行和体系集成证据；仅该节点进入成熟度分析。",
      "关联事件": "E003;E005;E009",
      "节点状态": "研究对象",
      "数据属性": "多源证据综合研判"
    }
  ],
  "gap_analysis": [
    {
      "gap_id": "G001",
      "能力维度": "分布式Mesh架构",
      "Lattice表现": "强",
      "Lattice演示评分": 92,
      "对标对象演示评分": 68,
      "差距级别": "较大",
      "证据充分度": "高",
      "关键依据": "去中心化Mesh、师级规模和edge-to-cloud扩展",
      "建议关注方向": "分布式状态一致性；跨节点容错；网络自适应",
      "数据属性": "Lattice事实+对标演示"
    },
    {
      "gap_id": "G002",
      "能力维度": "弱网/断连环境运行",
      "Lattice表现": "强",
      "Lattice演示评分": 90,
      "对标对象演示评分": 70,
      "差距级别": "较大",
      "证据充分度": "中高",
      "关键依据": "官方强调remote/degraded/low-bandwidth，NGC2在受限条件验证",
      "建议关注方向": "DDIL同步机制；断连自治；恢复后数据一致性",
      "数据属性": "Lattice事实+对标演示"
    },
    {
      "gap_id": "G003",
      "能力维度": "异构数据转换与标准化",
      "Lattice表现": "强",
      "Lattice演示评分": 94,
      "对标对象演示评分": 64,
      "差距级别": "很大",
      "证据充分度": "高",
      "关键依据": "Translate & Normalize、Common Data Layer、Schema Registry",
      "建议关注方向": "统一数据模型；语义映射；Schema生命周期治理",
      "数据属性": "Lattice事实+对标演示"
    },
    {
      "gap_id": "G004",
      "能力维度": "智能路由与优先级管理",
      "Lattice表现": "强",
      "Lattice演示评分": 89,
      "对标对象演示评分": 66,
      "差距级别": "较大",
      "证据充分度": "中高",
      "关键依据": "官方明确Intelligent Routing并强调有限带宽下分类、评估、优先分发",
      "建议关注方向": "动态优先级；任务驱动路由；带宽资源编排",
      "数据属性": "Lattice事实+对标演示"
    },
    {
      "gap_id": "G005",
      "能力维度": "边缘计算与大规模终端协同",
      "Lattice表现": "强",
      "Lattice演示评分": 91,
      "对标对象演示评分": 75,
      "差距级别": "中等",
      "证据充分度": "高",
      "关键依据": "65+战术边缘节点、2500+终端、师级规模部署",
      "建议关注方向": "边缘容器化；终端资源治理；离线推理与数据同步",
      "数据属性": "Lattice事实+对标演示"
    },
    {
      "gap_id": "G006",
      "能力维度": "开放数据模型与SDK生态",
      "Lattice表现": "较强",
      "Lattice演示评分": 88,
      "对标对象演示评分": 60,
      "差距级别": "很大",
      "证据充分度": "高",
      "关键依据": "Open API/SDK、Developer Console、REST SDK、Schema Registry、SDK Skills",
      "建议关注方向": "开放SDK；开发者门户；Schema Registry；AI开发工具",
      "数据属性": "Lattice事实+对标演示"
    },
    {
      "gap_id": "G007",
      "能力维度": "跨域/联盟级系统集成",
      "Lattice表现": "强",
      "Lattice演示评分": 90,
      "对标对象演示评分": 62,
      "差距级别": "很大",
      "证据充分度": "中高",
      "关键依据": "NGC2跨军种、eAirC2、Valiant Shield联合防空反导",
      "建议关注方向": "跨军种数据标准；联盟接口；多安全域访问控制",
      "数据属性": "Lattice事实+对标演示"
    }
  ],
  "gap_chart": {
    "benchmark_label": "Lattice能力表现",
    "current_label": "当前方案",
    "target_label": "开源补强目标",
    "score_max": 100,
    "details": {
      "G001": {
        "short_label": "Mesh架构",
        "target_score": 82,
        "priority": "高",
        "impact": "影响多节点协同、链路恢复和体系扩展能力。",
        "cause": "当前方案具备基础消息与连接能力，但缺少统一的分布式状态模型、节点自治和故障恢复机制。",
        "path": "引入去中心化发现、状态复制和多路径路由，先完成小规模故障切换，再扩展到跨节点一致性验证。",
        "route_nodes": ["R001", "R002", "R004"],
        "projects": [{ "id": "R04", "name": "go-libp2p" }, { "id": "R01", "name": "NATS Server" }],
        "score_profile": { "benchmark": [95, 92, 94, 88, 90], "current": [72, 68, 65, 64, 72] },
        "score_basis": [
          "对标覆盖去中心化发现、状态同步与多路径；当前以基础消息连接为主。",
          "对标形成Mesh与自适应路由实现；当前缺少统一分布式状态模型。",
          "对标有多站点和真实断链记录；当前主要是受控演示。",
          "对标具有师级和edge-to-cloud证据；当前尚未形成同等规模。",
          "对标由专利、论文和项目材料交叉支撑；当前以内部样例数据为主。"
        ],
        "validation": "验证节点失联后的路由恢复时间、状态一致性和消息到达率。"
      },
      "G002": {
        "short_label": "弱网运行",
        "target_score": 81,
        "priority": "高",
        "impact": "决定断连、低带宽和高时延环境下的任务连续性。",
        "cause": "缺少断连自治、缓存重放、冲突合并与恢复后状态收敛的完整机制。",
        "path": "补充Local-first缓存、断点续传和冲突合并策略，并在多种丢包与时延组合下验证。",
        "route_nodes": ["R001", "R009", "R012"],
        "projects": [{ "id": "R08", "name": "Automerge" }, { "id": "R04", "name": "go-libp2p" }],
        "score_profile": { "benchmark": [92, 90, 94, 84, 88], "current": [74, 68, 65, 72, 74] },
        "score_basis": [
          "对标明确覆盖断连、低带宽和恢复；当前具备基本缓存但闭环不完整。",
          "对标包含动态选路与多链路机制；当前缺少冲突合并和自动收敛。",
          "对标存在风暴断链后的真实恢复记录；当前以实验室弱网测试为主。",
          "对标已进入跨节点部署；当前验证规模和网络组合较少。",
          "对标有会议论文和官方材料；当前测试记录可追溯性有限。"
        ],
        "validation": "验证断连期间可用性、恢复同步耗时、冲突合并正确率和重复消息率。"
      },
      "G003": {
        "short_label": "异构数据",
        "target_score": 80,
        "priority": "最高",
        "impact": "直接影响不同传感器、平台和任务系统之间的数据互操作。",
        "cause": "缺少统一数据模型、语义映射和Schema版本兼容机制，接口适配仍依赖逐项开发。",
        "path": "建立统一Schema注册中心，形成格式转换、语义映射、兼容性检查和版本发布流程。",
        "route_nodes": ["R005", "R007", "R008", "R015"],
        "projects": [{ "id": "R05", "name": "Apicurio Registry" }, { "id": "R02", "name": "Eclipse Cyclone DDS" }],
        "score_profile": { "benchmark": [96, 95, 92, 92, 94], "current": [68, 62, 58, 64, 72] },
        "score_basis": [
          "对标覆盖转换、归一、共同数据层和Schema治理；当前仅覆盖部分格式转换。",
          "对标具备数据模型与注册治理能力；当前语义映射和版本兼容机制不足。",
          "对标在多系统任务环境中验证；当前缺少跨源一致性验证。",
          "对标进入体系级共同数据层；当前仍以逐接口适配为主。",
          "对标有官方产品、项目与Schema材料；当前依据主要来自方案和样例。"
        ],
        "validation": "验证Schema兼容率、转换正确率、版本回滚和多源数据接入时延。"
      },
      "G004": {
        "short_label": "智能路由",
        "target_score": 79,
        "priority": "高",
        "impact": "决定有限带宽下关键任务数据能否优先、稳定到达。",
        "cause": "当前路由更多依赖静态规则，缺少结合任务优先级、链路状态和数据价值的动态决策。",
        "path": "增加任务优先级模型、链路质量感知和动态队列调度，并建立可解释的路由策略记录。",
        "route_nodes": ["R002", "R004", "R014"],
        "projects": [{ "id": "R06", "name": "Envoy" }, { "id": "R01", "name": "NATS Server" }],
        "score_profile": { "benchmark": [92, 91, 88, 82, 90], "current": [70, 67, 61, 62, 70] },
        "score_basis": [
          "对标覆盖链路状态、数据价值和优先分发；当前以静态规则为主。",
          "对标具有自动选路与策略执行能力；当前缺少动态调度闭环。",
          "对标有受限带宽环境证据；当前缺少复杂拥塞组合验证。",
          "对标已用于多节点网络；当前策略规模和队列数量有限。",
          "对标有论文及官方能力说明；当前策略日志和实验记录不足。"
        ],
        "validation": "验证带宽拥塞下高优先级消息的到达率、排队时延和策略切换稳定性。"
      },
      "G005": {
        "short_label": "边缘协同",
        "target_score": 85,
        "priority": "中高",
        "impact": "影响大规模终端接入、边缘计算负载和边云任务协同。",
        "cause": "已有边缘运行基础，但终端资源治理、离线任务和规模化可观测性仍不完整。",
        "path": "补充边缘任务编排、资源约束策略和统一遥测，逐步扩大节点规模与并发负载。",
        "route_nodes": ["R009", "R010", "R011", "R012"],
        "projects": [{ "id": "R10", "name": "Ray" }, { "id": "R09", "name": "node_exporter" }],
        "score_profile": { "benchmark": [92, 90, 93, 92, 86], "current": [78, 74, 72, 80, 72] },
        "score_basis": [
          "对标覆盖边缘节点、终端和边云协同；当前已有边缘能力但编排不完整。",
          "对标具备资源治理与数据网格实现；当前统一遥测和离线任务机制不足。",
          "对标有跨军种和师级演示；当前验证环境相对单一。",
          "对标公开65+节点和2500+终端；当前规模仍处于中小规模。",
          "对标规模数字有公开材料支撑；当前依据以演示统计为主。"
        ],
        "validation": "验证节点规模增长后的资源占用、任务成功率、遥测完整性和边云同步负载。"
      },
      "G006": {
        "short_label": "开放SDK",
        "target_score": 81,
        "priority": "最高",
        "impact": "决定第三方能力能否低成本接入并持续维护。",
        "cause": "缺少统一开发者入口、稳定SDK、Schema治理和自动化兼容测试。",
        "path": "建设API与SDK规范、开发者门户、Schema Registry和端到端示例，形成版本治理机制。",
        "route_nodes": ["R013", "R014", "R015", "R016"],
        "projects": [{ "id": "R05", "name": "Apicurio Registry" }, { "id": "R06", "name": "Envoy" }],
        "score_profile": { "benchmark": [92, 89, 82, 84, 92], "current": [64, 60, 52, 60, 72] },
        "score_basis": [
          "对标覆盖API、SDK、开发控制台和Schema Registry；当前入口与能力不统一。",
          "对标形成多语言工具链和版本治理；当前SDK稳定性与兼容测试不足。",
          "对标存在第三方接入演示；当前端到端接入样例和回归验证较少。",
          "对标已形成开发者生态基础；当前仍依赖项目制适配。",
          "对标有官方文档和公开案例；当前维护记录和外部验证有限。"
        ],
        "validation": "验证新系统接入时间、接口兼容率、升级回归通过率和示例覆盖度。"
      },
      "G007": {
        "short_label": "跨域集成",
        "target_score": 78,
        "priority": "最高",
        "impact": "影响跨军种、跨安全域和联盟级任务系统的协同范围。",
        "cause": "数据标准、身份边界、联盟接口和跨域审计机制尚未形成完整组合。",
        "path": "从跨系统数据契约入手，补充身份授权、流程编排和跨域审计，再开展多系统联合验证。",
        "route_nodes": ["R004", "R007", "R012", "R015"],
        "projects": [{ "id": "R02", "name": "Eclipse Cyclone DDS" }, { "id": "R06", "name": "Envoy" }, { "id": "R11", "name": "Temporal" }],
        "score_profile": { "benchmark": [92, 90, 90, 88, 90], "current": [66, 62, 56, 58, 72] },
        "score_basis": [
          "对标覆盖跨军种、联合防空反导和联盟接口；当前跨域功能组合不完整。",
          "对标形成数据、身份和流程协同能力；当前跨域审计与授权边界不足。",
          "对标有联合演习和体系验证；当前缺少多安全域联合验证。",
          "对标进入跨系统体系集成；当前仍以单域或少量系统联调为主。",
          "对标由军方和企业材料交叉支撑；当前依据以设计与局部演示为主。"
        ],
        "validation": "验证跨系统数据一致性、身份授权、流程恢复和审计链完整性。"
      }
    }
  },
  "reports": [
    {
      "report_id": "P001",
      "成果名称": "战术边缘数据网格与智能C2技术领域发展总体趋势",
      "分析对象": "技术领域",
      "成果类型": "总体趋势图",
      "时间范围": "2020-2026",
      "状态": "已生成",
      "核心结论摘要": "领域主线由集中式、专有数据架构向分布式Mesh、统一数据层、边缘计算和开放生态演进。",
      "前端入口": "/trend/P001"
    },
    {
      "report_id": "P002",
      "成果名称": "Lattice Mesh关键技术路线演化",
      "分析对象": "Lattice Mesh",
      "成果类型": "技术路线图",
      "时间范围": "2015-当前",
      "状态": "已生成",
      "核心结论摘要": "网络、数据、边缘计算和开放集成四条技术路线持续汇聚，技术定位逐步向共同数据底座演进。",
      "前端入口": "/route/P002"
    },
    {
      "report_id": "P003",
      "成果名称": "Lattice Mesh关键技术差距分析",
      "分析对象": "Lattice Mesh",
      "成果类型": "差距分析报告",
      "时间范围": "当前",
      "状态": "已生成",
      "核心结论摘要": "差距重点集中在统一数据模型、弱网数据协同、智能路由、开放SDK生态与跨域规模集成等方向。",
      "前端入口": "/gap/P003"
    }
  ],
  "sources": [
    {
      "source_id": "S001",
      "来源名称": "Lattice Mesh | Anduril",
      "来源类型": "企业官方",
      "发布日期": "持续更新",
      "支持内容": "核心能力：Distributed Mesh、Translate & Normalize、Intelligent Routing、Secure Transport",
      "URL": "https://www.anduril.com/lattice/lattice-mesh",
      "可信等级": "A-"
    },
    {
      "source_id": "S002",
      "来源名称": "Desert Guardian 1.0",
      "来源类型": "企业官方",
      "发布日期": "2024-11-12",
      "支持内容": "10+第三方传感器接入Lattice、开放API/SDK",
      "URL": "https://www.anduril.com/news/anduril-s-lattice-showcased-in-u-s-central-command-s-desert-guardian-1-0",
      "可信等级": "A-"
    },
    {
      "source_id": "S003",
      "来源名称": "Space Surveillance Network contract",
      "来源类型": "企业官方",
      "发布日期": "2024-11-21",
      "支持内容": "Lattice Mesh用于SSN现代化",
      "URL": "https://www.anduril.com/news/anduril-awarded-program-of-record-space-surveillance-network",
      "可信等级": "A-"
    },
    {
      "source_id": "S004",
      "来源名称": "CDAO Edge Data Mesh production agreement",
      "来源类型": "企业官方",
      "发布日期": "2024-12-03",
      "支持内容": "三年生产协议、多个军种/司令部运行",
      "URL": "https://www.anduril.com/news/cdao-awards-anduril-production-agreement-to-deliver-edge-data-mesh",
      "可信等级": "A-"
    },
    {
      "source_id": "S005",
      "来源名称": "Army NGC2 prototype award",
      "来源类型": "美国陆军官方",
      "发布日期": "2025-07-18",
      "支持内容": "Team Anduril获NGC2原型任务",
      "URL": "https://www.army.mil/article/287180/army_announces_next_generation_command_and_control_ngc2_prototype_award",
      "可信等级": "A"
    },
    {
      "source_id": "S006",
      "来源名称": "Scaling NGC2 from Prototype to Fight",
      "来源类型": "企业官方",
      "发布日期": "2026-04-10",
      "支持内容": "Ivy Sting 5、65+战术边缘节点等",
      "URL": "https://www.anduril.com/news/scaling-next-generation-command-and-control-from-prototype-to-fight",
      "可信等级": "A-"
    },
    {
      "source_id": "S007",
      "来源名称": "NGC2 at Scale / Ivy Mass",
      "来源类型": "企业官方",
      "发布日期": "2026-05-21",
      "支持内容": "第4步兵师全师、2500+终端",
      "URL": "https://www.anduril.com/news/ngc2-at-scale-how-team-anduril-and-the-army-took-lattice-across-the-4th-infantry-division",
      "可信等级": "A-"
    },
    {
      "source_id": "S008",
      "来源名称": "Ivy Mass exercises NGC2 at division scale",
      "来源类型": "美国陆军官方",
      "发布日期": "2026-06-03",
      "支持内容": "师级规模NGC2验证",
      "URL": "https://www.army.mil/article/292999",
      "可信等级": "A"
    },
    {
      "source_id": "S009",
      "来源名称": "Lattice Developer Changelog",
      "来源类型": "开发者官方",
      "发布日期": "持续更新",
      "支持内容": "Developer Console、REST SDK、SDK Skills",
      "URL": "https://developer.anduril.com/changelog",
      "可信等级": "A"
    },
    {
      "source_id": "S010",
      "来源名称": "Army common data baseline",
      "来源类型": "美国陆军官方",
      "发布日期": "2026-06-22",
      "支持内容": "NGC2共同数据层基线、Anduril牵头",
      "URL": "https://www.army.mil/article/293409",
      "可信等级": "A"
    },
    {
      "source_id": "S011",
      "来源名称": "NATO eAirC2 contracts",
      "来源类型": "NATO NCIA官方",
      "发布日期": "2026-07-07",
      "支持内容": "eAirC2第一阶段合同、数据中心化开放架构",
      "URL": "https://www.ncia.nato.int/newsroom/news/nato-accelerates-transformation-of-air-command-and-control-with-key-contract-awards",
      "可信等级": "A"
    },
    {
      "source_id": "S012",
      "来源名称": "Lattice Schema Registry",
      "来源类型": "开发者官方",
      "发布日期": "2026-07-23",
      "支持内容": "Schema发布、共享、版本化治理",
      "URL": "https://developer.anduril.com/changelog/2026/7/23",
      "可信等级": "A"
    },
    {
      "source_id": "S013",
      "来源名称": "Army leaders: NGC2 ready to scale",
      "来源类型": "美国陆军官方",
      "发布日期": "2026-07-31",
      "支持内容": "NGC2进入规模扩展与持续交付",
      "URL": "https://www.army.mil/article/294284/army_leaders_next_generation_command_and_control_ready_to_scale",
      "可信等级": "A"
    },
    {
      "source_id": "S014",
      "来源名称": "Valiant Shield 2026 Battle Manager",
      "来源类型": "企业官方",
      "发布日期": "2026-08-21",
      "支持内容": "Lattice驱动Battle Manager、联合航迹融合",
      "URL": "https://www.anduril.com/news/anduril-demonstrates-battle-manager-at-valiant-shield-2026",
      "可信等级": "A-"
    }
  ]
});
}());
