(function () {
  "use strict";

  window.TrendAnalysisData = Object.freeze({
  "meta": {
    "name": "Lattice前端演示数据包",
    "updated_at": "2026-08-30",
    "note": "KPI、活跃度、评分和对标值仅用于演示。"
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
  "route_evolution": [
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
      "时间范围": "2024-2026",
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

