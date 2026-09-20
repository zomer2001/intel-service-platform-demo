(function () {
  "use strict";

  window.RestorationAnalysisData = Object.freeze({
  "meta": {
    "object": "Lattice Mesh",
    "data_note": "本数据包用于前端功能演示。技术拆解、开源匹配、评分、参数和链接均为演示数据，不代表对真实系统内部实现的确认。",
    "scenario_version": "scenario_v1.3",
    "principle_version": "principle_v1.2",
    "opensource_version": "index_v_2026_m8.2",
    "parameter_version": "param_v_2026_m8.1"
  },
  "scenarios": [
    {
      "id": "S01",
      "name": "弱网条件下多节点数据同步",
      "category": "网络韧性",
      "status": "已形成",
      "goal": "验证链路间歇中断、带宽受限条件下的数据缓存、恢复与一致性维持能力。",
      "environment": "8个边缘节点、2个中继节点、1个中心节点；链路存在丢包和周期性断连。",
      "actors": [
        "中心节点",
        "中继节点",
        "移动边缘节点",
        "传感节点"
      ],
      "steps": [
        "节点建立主题订阅",
        "链路质量下降",
        "边缘节点本地缓存",
        "网络恢复并增量同步",
        "一致性状态核验"
      ],
      "criteria": [
        "关键消息到达率≥95%（演示）",
        "恢复后同步时间≤8s（演示）",
        "无重复写入或不可解释丢失"
      ],
      "principles": [
        "P01",
        "P03",
        "P05",
        "P08"
      ],
      "parameter_pack": "pack_weaknet_v3"
    },
    {
      "id": "S02",
      "name": "多源传感信息发布与融合",
      "category": "数据协同",
      "status": "已形成",
      "goal": "验证不同频率、格式和优先级的数据进入Mesh后的发布、订阅、转换与分发过程。",
      "environment": "雷达、光电与状态数据并发进入，消息频率和数据结构不同。",
      "actors": [
        "雷达节点",
        "光电节点",
        "融合节点",
        "任务应用"
      ],
      "steps": [
        "多源数据接入",
        "模式映射与时间对齐",
        "主题路由",
        "融合结果发布",
        "应用侧消费"
      ],
      "criteria": [
        "模式转换成功率≥98%（演示）",
        "高优先级数据时延受控",
        "来源与处理链可追溯"
      ],
      "principles": [
        "P02",
        "P04",
        "P06",
        "P09"
      ],
      "parameter_pack": "pack_fusion_v2"
    },
    {
      "id": "S03",
      "name": "边缘—中心协同处理",
      "category": "边云协同",
      "status": "已形成",
      "goal": "验证任务在边缘节点与中心节点之间的分配、状态回传和数据优先传输。",
      "environment": "边缘节点算力受限，中心节点具备汇总分析能力，链路质量动态变化。",
      "actors": [
        "边缘计算节点",
        "中心服务节点",
        "任务调度模块",
        "数据缓存模块"
      ],
      "steps": [
        "任务下发",
        "边缘预处理",
        "结果优先上传",
        "中心汇总",
        "策略更新回传"
      ],
      "criteria": [
        "任务分配结果可解释",
        "边缘资源占用不超过阈值",
        "关键结果优先到达"
      ],
      "principles": [
        "P01",
        "P07",
        "P10",
        "P11"
      ],
      "parameter_pack": "pack_edgecloud_v2"
    },
    {
      "id": "S04",
      "name": "异构系统接口接入与数据交换",
      "category": "开放集成",
      "status": "已形成",
      "goal": "验证外部系统通过适配接口加入数据交换过程，并保持模式、权限和调用状态可控。",
      "environment": "两个外部系统采用不同接口协议和数据模型，经适配层接入。",
      "actors": [
        "外部系统A",
        "外部系统B",
        "接口适配层",
        "Schema服务",
        "Mesh节点"
      ],
      "steps": [
        "接口注册",
        "身份校验",
        "Schema映射",
        "数据转换与发布",
        "异常回退"
      ],
      "criteria": [
        "接口调用可追踪",
        "错误数据能够隔离",
        "映射规则能够版本化"
      ],
      "principles": [
        "P02",
        "P06",
        "P09",
        "P12"
      ],
      "parameter_pack": "pack_integration_v1"
    },
    {
      "id": "S05",
      "name": "节点失效后的网络重组",
      "category": "故障恢复",
      "status": "已形成",
      "goal": "验证关键节点离线后，邻接关系、数据路由和订阅关系的重新建立过程。",
      "environment": "中继节点突然失效，部分节点需要经替代路径继续交换数据。",
      "actors": [
        "失效节点",
        "邻接节点",
        "替代中继",
        "网络监测模块"
      ],
      "steps": [
        "节点健康异常",
        "失效判定",
        "邻接关系重建",
        "路由切换",
        "订阅恢复"
      ],
      "criteria": [
        "故障能够被检测",
        "恢复过程状态可观测",
        "关键主题恢复时间可测量"
      ],
      "principles": [
        "P03",
        "P05",
        "P08",
        "P11"
      ],
      "parameter_pack": "pack_recovery_v2"
    }
  ],
  "principles": [
    {
      "id": "P01",
      "level": "目标能力",
      "name": "跨节点数据共享",
      "status": "已拆解",
      "confidence": 88,
      "description": "面向分布式节点提供数据发布、发现、订阅和消费能力。",
      "inputs": "节点数据、主题定义",
      "outputs": "可路由的数据主题",
      "evidence": "演示研判 E-P01",
      "opensource_count": 3,
      "parameter_count": 8
    },
    {
      "id": "P02",
      "level": "目标能力",
      "name": "异构数据互操作",
      "status": "已拆解",
      "confidence": 81,
      "description": "将不同来源的数据结构转换为可交换、可理解的数据对象。",
      "inputs": "外部数据与接口",
      "outputs": "统一模式数据",
      "evidence": "演示研判 E-P02",
      "opensource_count": 4,
      "parameter_count": 6
    },
    {
      "id": "P03",
      "level": "关键原理",
      "name": "分布式发布订阅",
      "status": "重点",
      "confidence": 86,
      "description": "通过主题和订阅关系解耦数据生产者与消费者。",
      "inputs": "主题、消息、订阅规则",
      "outputs": "按订阅分发的消息",
      "evidence": "演示推演 E-P03",
      "opensource_count": 4,
      "parameter_count": 9
    },
    {
      "id": "P04",
      "level": "关键原理",
      "name": "Schema驱动的数据治理",
      "status": "重点",
      "confidence": 78,
      "description": "使用可版本化的数据模式约束消息结构和转换规则。",
      "inputs": "Schema、原始消息",
      "outputs": "校验与转换后的消息",
      "evidence": "演示推演 E-P04",
      "opensource_count": 3,
      "parameter_count": 7
    },
    {
      "id": "P05",
      "level": "关键原理",
      "name": "断连容忍与增量同步",
      "status": "待验证",
      "confidence": 69,
      "description": "节点断连期间维持本地状态，并在恢复后进行增量补传。",
      "inputs": "缓存数据、版本向量",
      "outputs": "增量同步结果",
      "evidence": "演示假设 E-P05",
      "opensource_count": 2,
      "parameter_count": 11
    },
    {
      "id": "P06",
      "level": "功能模块",
      "name": "模式注册与转换",
      "status": "已拆解",
      "confidence": 80,
      "description": "维护数据模式、兼容关系和转换映射。",
      "inputs": "模式定义、版本",
      "outputs": "转换规则与校验结果",
      "evidence": "演示研判 E-P06",
      "opensource_count": 3,
      "parameter_count": 6
    },
    {
      "id": "P07",
      "level": "功能模块",
      "name": "任务与数据优先级调度",
      "status": "待验证",
      "confidence": 65,
      "description": "按照任务重要性、链路质量和资源状态调整数据处理顺序。",
      "inputs": "任务优先级、资源状态",
      "outputs": "调度与队列结果",
      "evidence": "演示假设 E-P07",
      "opensource_count": 1,
      "parameter_count": 10
    },
    {
      "id": "P08",
      "level": "功能模块",
      "name": "缓存、重传与状态恢复",
      "status": "重点",
      "confidence": 74,
      "description": "在不稳定链路下管理消息缓存、确认、重传和恢复。",
      "inputs": "消息队列、确认状态",
      "outputs": "恢复后的消息状态",
      "evidence": "演示推演 E-P08",
      "opensource_count": 3,
      "parameter_count": 12
    },
    {
      "id": "P09",
      "level": "功能模块",
      "name": "接口适配与访问控制",
      "status": "已拆解",
      "confidence": 77,
      "description": "统一外部接口、身份和数据访问边界。",
      "inputs": "API请求、身份信息",
      "outputs": "授权后的数据调用",
      "evidence": "演示研判 E-P09",
      "opensource_count": 4,
      "parameter_count": 7
    },
    {
      "id": "P10",
      "level": "实现单元",
      "name": "边缘任务执行器",
      "status": "自研缺口",
      "confidence": 58,
      "description": "在资源受限节点执行任务并维护运行状态。",
      "inputs": "任务包、资源约束",
      "outputs": "任务结果和状态",
      "evidence": "演示假设 E-P10",
      "opensource_count": 1,
      "parameter_count": 8
    },
    {
      "id": "P11",
      "level": "实现单元",
      "name": "节点健康与邻接管理",
      "status": "适配可用",
      "confidence": 72,
      "description": "维护节点发现、心跳、健康状态和邻接变化。",
      "inputs": "心跳与链路状态",
      "outputs": "节点可用性与邻接表",
      "evidence": "演示推演 E-P11",
      "opensource_count": 3,
      "parameter_count": 9
    },
    {
      "id": "P12",
      "level": "实现单元",
      "name": "轻量接口网关",
      "status": "适配可用",
      "confidence": 76,
      "description": "承担接口注册、路由、认证和协议转换。",
      "inputs": "外部请求与策略",
      "outputs": "标准化内部调用",
      "evidence": "演示推演 E-P12",
      "opensource_count": 4,
      "parameter_count": 5
    }
  ],
  "opensource_nodes": [
    {
      "id": "O00",
      "parent": null,
      "name": "Lattice Mesh技术破解目标",
      "level": 0,
      "state": "继续拆解",
      "coverage": 68
    },
    {
      "id": "O01",
      "parent": "O00",
      "name": "分布式数据交换",
      "level": 1,
      "state": "部分覆盖",
      "coverage": 76
    },
    {
      "id": "O02",
      "parent": "O00",
      "name": "异构接口接入",
      "level": 1,
      "state": "部分覆盖",
      "coverage": 72
    },
    {
      "id": "O03",
      "parent": "O00",
      "name": "边缘任务协同",
      "level": 1,
      "state": "自研缺口",
      "coverage": 44
    },
    {
      "id": "O04",
      "parent": "O01",
      "name": "发布订阅与消息路由",
      "level": 2,
      "state": "适配可用",
      "coverage": 86
    },
    {
      "id": "O05",
      "parent": "O01",
      "name": "缓存与断线重传",
      "level": 2,
      "state": "部分覆盖",
      "coverage": 63
    },
    {
      "id": "O06",
      "parent": "O01",
      "name": "节点发现与邻接管理",
      "level": 2,
      "state": "适配可用",
      "coverage": 79
    },
    {
      "id": "O07",
      "parent": "O02",
      "name": "Schema注册与演化",
      "level": 2,
      "state": "可直接复用",
      "coverage": 91
    },
    {
      "id": "O08",
      "parent": "O02",
      "name": "接口网关与协议转换",
      "level": 2,
      "state": "适配可用",
      "coverage": 82
    },
    {
      "id": "O09",
      "parent": "O03",
      "name": "资源感知任务调度",
      "level": 2,
      "state": "继续拆解",
      "coverage": 38
    },
    {
      "id": "O10",
      "parent": "O05",
      "name": "本地持久化队列",
      "level": 3,
      "state": "可直接复用",
      "coverage": 88
    },
    {
      "id": "O11",
      "parent": "O05",
      "name": "增量状态合并",
      "level": 3,
      "state": "仅供参考",
      "coverage": 57
    },
    {
      "id": "O12",
      "parent": "O09",
      "name": "资源状态采集",
      "level": 3,
      "state": "适配可用",
      "coverage": 74
    },
    {
      "id": "O13",
      "parent": "O09",
      "name": "约束任务分配",
      "level": 3,
      "state": "自研最小单元",
      "coverage": 21
    },
    {
      "id": "O14",
      "parent": "O09",
      "name": "任务迁移与恢复",
      "level": 3,
      "state": "自研最小单元",
      "coverage": 18
    }
  ],
  "opensource_projects": [
    {
      "id": "R01",
      "node": "O04",
      "name": "AsterMQ",
      "url": "https://github.com/demo-lab/aster-mq",
      "language": "Rust",
      "license": "Apache-2.0",
      "reuse": "二次适配",
      "match": 89,
      "credibility": 86,
      "activity": "高",
      "tests": "完整",
      "note": "提供主题路由、订阅匹配和持久化消息队列的演示映射。"
    },
    {
      "id": "R02",
      "node": "O04",
      "name": "EdgeDDS-Lite",
      "url": "https://github.com/demo-lab/edgedds-lite",
      "language": "C++",
      "license": "BSD-3-Clause",
      "reuse": "原理参考",
      "match": 83,
      "credibility": 80,
      "activity": "中",
      "tests": "较完整",
      "note": "用于演示轻量发布订阅与QoS配置能力。"
    },
    {
      "id": "R03",
      "node": "O05",
      "name": "StoreForward Mesh",
      "url": "https://github.com/demo-lab/storeforward-mesh",
      "language": "Go",
      "license": "MIT",
      "reuse": "二次适配",
      "match": 78,
      "credibility": 73,
      "activity": "中",
      "tests": "一般",
      "note": "用于演示断连缓存、确认和恢复后补传。"
    },
    {
      "id": "R04",
      "node": "O06",
      "name": "PeerScope",
      "url": "https://github.com/demo-lab/peerscope",
      "language": "Rust",
      "license": "Apache-2.0",
      "reuse": "可直接复用",
      "match": 86,
      "credibility": 84,
      "activity": "高",
      "tests": "完整",
      "note": "用于演示局域节点发现、心跳和邻接状态维护。"
    },
    {
      "id": "R05",
      "node": "O07",
      "name": "OpenSchema Registry",
      "url": "https://github.com/demo-lab/open-schema-registry",
      "language": "Java",
      "license": "Apache-2.0",
      "reuse": "可直接复用",
      "match": 92,
      "credibility": 88,
      "activity": "高",
      "tests": "完整",
      "note": "用于演示Schema注册、兼容性检查和版本演化。"
    },
    {
      "id": "R06",
      "node": "O08",
      "name": "Field API Gateway",
      "url": "https://github.com/demo-lab/field-api-gateway",
      "language": "Go",
      "license": "Apache-2.0",
      "reuse": "二次适配",
      "match": 84,
      "credibility": 81,
      "activity": "高",
      "tests": "较完整",
      "note": "用于演示接口路由、认证与协议转换。"
    },
    {
      "id": "R07",
      "node": "O10",
      "name": "DurableQueue Embedded",
      "url": "https://github.com/demo-lab/durablequeue-embedded",
      "language": "C",
      "license": "MIT",
      "reuse": "可直接复用",
      "match": 90,
      "credibility": 82,
      "activity": "中",
      "tests": "完整",
      "note": "用于演示边缘节点本地持久化队列。"
    },
    {
      "id": "R08",
      "node": "O11",
      "name": "DeltaState CRDT",
      "url": "https://github.com/demo-lab/deltastate-crdt",
      "language": "Rust",
      "license": "MPL-2.0",
      "reuse": "原理参考",
      "match": 72,
      "credibility": 76,
      "activity": "中",
      "tests": "较完整",
      "note": "用于演示离线状态合并与冲突收敛。"
    },
    {
      "id": "R09",
      "node": "O12",
      "name": "Edge Resource Probe",
      "url": "https://github.com/demo-lab/edge-resource-probe",
      "language": "Go",
      "license": "MIT",
      "reuse": "可直接复用",
      "match": 87,
      "credibility": 79,
      "activity": "中",
      "tests": "完整",
      "note": "用于演示CPU、内存、链路与任务状态采集。"
    },
    {
      "id": "R10",
      "node": "O13",
      "name": "ConstrainX Scheduler",
      "url": "https://github.com/demo-lab/constrainx-scheduler",
      "language": "Python",
      "license": "Apache-2.0",
      "reuse": "仅供参考",
      "match": 61,
      "credibility": 67,
      "activity": "低",
      "tests": "一般",
      "note": "可参考约束求解方式，但无法直接覆盖任务分配需求。"
    },
    {
      "id": "R11",
      "node": "O14",
      "name": "TaskHandoff Prototype",
      "url": "https://github.com/demo-lab/taskhandoff-prototype",
      "language": "Go",
      "license": "Research Only",
      "reuse": "待核验",
      "match": 55,
      "credibility": 52,
      "activity": "低",
      "tests": "缺失",
      "note": "仅作为任务迁移流程的原理性参考。"
    }
  ],
  "parameter_groups": [
    {
      "id": "G1",
      "name": "网络环境",
      "count": 6,
      "completeness": 92
    },
    {
      "id": "G2",
      "name": "数据负载",
      "count": 5,
      "completeness": 84
    },
    {
      "id": "G3",
      "name": "Mesh机制",
      "count": 6,
      "completeness": 76
    },
    {
      "id": "G4",
      "name": "节点资源",
      "count": 4,
      "completeness": 81
    },
    {
      "id": "G5",
      "name": "验证指标",
      "count": 5,
      "completeness": 88
    }
  ],
  "parameters": [
    {
      "id": "M01",
      "group": "G1",
      "name": "节点数量",
      "value": "8—32",
      "unit": "个",
      "source": "场景设定",
      "confidence": 90,
      "status": "已确认",
      "previous": "8—16",
      "updated": "8—32",
      "scenario": "S01/S05"
    },
    {
      "id": "M02",
      "group": "G1",
      "name": "链路带宽",
      "value": "1—20",
      "unit": "Mbps",
      "source": "演示参数",
      "confidence": 72,
      "status": "待校准",
      "previous": "2—20",
      "updated": "1—20",
      "scenario": "S01/S03"
    },
    {
      "id": "M03",
      "group": "G1",
      "name": "端到端时延",
      "value": "40—300",
      "unit": "ms",
      "source": "相似技术参考",
      "confidence": 68,
      "status": "待复核",
      "previous": "50—250",
      "updated": "40—300",
      "scenario": "S01/S05"
    },
    {
      "id": "M04",
      "group": "G1",
      "name": "丢包率",
      "value": "0—15",
      "unit": "%",
      "source": "场景设定",
      "confidence": 86,
      "status": "已确认",
      "previous": "0—10",
      "updated": "0—15",
      "scenario": "S01"
    },
    {
      "id": "M05",
      "group": "G1",
      "name": "断连持续时间",
      "value": "2—60",
      "unit": "s",
      "source": "演示参数",
      "confidence": 74,
      "status": "待校准",
      "previous": "2—30",
      "updated": "2—60",
      "scenario": "S01/S05"
    },
    {
      "id": "M06",
      "group": "G1",
      "name": "拓扑变化周期",
      "value": "5—120",
      "unit": "s",
      "source": "系统推演",
      "confidence": 63,
      "status": "待复核",
      "previous": "10—120",
      "updated": "5—120",
      "scenario": "S05"
    },
    {
      "id": "M07",
      "group": "G2",
      "name": "消息大小",
      "value": "0.5—512",
      "unit": "KB",
      "source": "开源项目默认值",
      "confidence": 79,
      "status": "已确认",
      "previous": "1—256",
      "updated": "0.5—512",
      "scenario": "S02"
    },
    {
      "id": "M08",
      "group": "G2",
      "name": "消息更新频率",
      "value": "1—50",
      "unit": "Hz",
      "source": "场景设定",
      "confidence": 82,
      "status": "已确认",
      "previous": "1—20",
      "updated": "1—50",
      "scenario": "S02"
    },
    {
      "id": "M09",
      "group": "G2",
      "name": "并发主题数量",
      "value": "10—200",
      "unit": "个",
      "source": "演示参数",
      "confidence": 70,
      "status": "待校准",
      "previous": "10—100",
      "updated": "10—200",
      "scenario": "S02/S04"
    },
    {
      "id": "M10",
      "group": "G2",
      "name": "高优先级消息占比",
      "value": "10—25",
      "unit": "%",
      "source": "系统推演",
      "confidence": 66,
      "status": "待复核",
      "previous": "10—20",
      "updated": "10—25",
      "scenario": "S02/S03"
    },
    {
      "id": "M11",
      "group": "G2",
      "name": "Schema版本数量",
      "value": "3—12",
      "unit": "个",
      "source": "场景设定",
      "confidence": 76,
      "status": "已确认",
      "previous": "3—8",
      "updated": "3—12",
      "scenario": "S04"
    },
    {
      "id": "M12",
      "group": "G3",
      "name": "本地缓存上限",
      "value": "128—1024",
      "unit": "MB",
      "source": "开源项目默认值",
      "confidence": 78,
      "status": "待校准",
      "previous": "128—512",
      "updated": "128—1024",
      "scenario": "S01/S05"
    },
    {
      "id": "M13",
      "group": "G3",
      "name": "确认超时",
      "value": "0.5—5",
      "unit": "s",
      "source": "相似技术参考",
      "confidence": 71,
      "status": "待复核",
      "previous": "1—5",
      "updated": "0.5—5",
      "scenario": "S01"
    },
    {
      "id": "M14",
      "group": "G3",
      "name": "最大重传次数",
      "value": "2—8",
      "unit": "次",
      "source": "开源项目默认值",
      "confidence": 80,
      "status": "已确认",
      "previous": "3—6",
      "updated": "2—8",
      "scenario": "S01"
    },
    {
      "id": "M15",
      "group": "G3",
      "name": "状态同步周期",
      "value": "1—15",
      "unit": "s",
      "source": "系统推演",
      "confidence": 64,
      "status": "待复核",
      "previous": "2—15",
      "updated": "1—15",
      "scenario": "S01/S05"
    },
    {
      "id": "M16",
      "group": "G3",
      "name": "Schema兼容策略",
      "value": "向后/双向",
      "unit": "枚举",
      "source": "开源项目默认值",
      "confidence": 83,
      "status": "已确认",
      "previous": "向后",
      "updated": "向后/双向",
      "scenario": "S02/S04"
    },
    {
      "id": "M17",
      "group": "G3",
      "name": "主题优先级等级",
      "value": "4",
      "unit": "级",
      "source": "演示参数",
      "confidence": 69,
      "status": "待校准",
      "previous": "3",
      "updated": "4",
      "scenario": "S02/S03"
    },
    {
      "id": "M18",
      "group": "G4",
      "name": "边缘节点CPU",
      "value": "2—8",
      "unit": "核",
      "source": "场景设定",
      "confidence": 85,
      "status": "已确认",
      "previous": "2—4",
      "updated": "2—8",
      "scenario": "S03"
    },
    {
      "id": "M19",
      "group": "G4",
      "name": "边缘节点内存",
      "value": "2—16",
      "unit": "GB",
      "source": "场景设定",
      "confidence": 85,
      "status": "已确认",
      "previous": "2—8",
      "updated": "2—16",
      "scenario": "S03"
    },
    {
      "id": "M20",
      "group": "G4",
      "name": "任务并发上限",
      "value": "2—12",
      "unit": "个",
      "source": "系统推演",
      "confidence": 61,
      "status": "待复核",
      "previous": "2—8",
      "updated": "2—12",
      "scenario": "S03"
    },
    {
      "id": "M21",
      "group": "G4",
      "name": "本地存储配额",
      "value": "1—20",
      "unit": "GB",
      "source": "演示参数",
      "confidence": 73,
      "status": "待校准",
      "previous": "1—10",
      "updated": "1—20",
      "scenario": "S01/S03"
    },
    {
      "id": "M22",
      "group": "G5",
      "name": "关键消息到达率",
      "value": "≥95",
      "unit": "%",
      "source": "验证判据",
      "confidence": 92,
      "status": "已确认",
      "previous": "≥93",
      "updated": "≥95",
      "scenario": "S01/S02"
    },
    {
      "id": "M23",
      "group": "G5",
      "name": "恢复后同步时间",
      "value": "≤8",
      "unit": "s",
      "source": "验证判据",
      "confidence": 88,
      "status": "已确认",
      "previous": "≤10",
      "updated": "≤8",
      "scenario": "S01/S05"
    },
    {
      "id": "M24",
      "group": "G5",
      "name": "模式转换成功率",
      "value": "≥98",
      "unit": "%",
      "source": "验证判据",
      "confidence": 90,
      "status": "已确认",
      "previous": "≥97",
      "updated": "≥98",
      "scenario": "S02/S04"
    },
    {
      "id": "M25",
      "group": "G5",
      "name": "路由重建时间",
      "value": "≤5",
      "unit": "s",
      "source": "演示指标",
      "confidence": 75,
      "status": "待校准",
      "previous": "≤8",
      "updated": "≤5",
      "scenario": "S05"
    },
    {
      "id": "M26",
      "group": "G5",
      "name": "边缘CPU占用率",
      "value": "≤70",
      "unit": "%",
      "source": "验证判据",
      "confidence": 82,
      "status": "已确认",
      "previous": "≤75",
      "updated": "≤70",
      "scenario": "S03"
    }
  ],
  "opensource_versions": [
    {
      "version": "index_v_2026_m5",
      "date": "2026-05-28",
      "type": "定时生成",
      "trigger": "月度自动任务",
      "agent": "索引版本智能体",
      "summary": "建立首期开源资源基线",
      "delta": "形成7个一级、二级技术单元与14项候选资源映射。",
      "review": "无需人工"
    },
    {
      "version": "index_v_2026_m6.1",
      "date": "2026-06-09",
      "type": "事件触发",
      "trigger": "发现新的开发工具链线索",
      "agent": "开源发现智能体",
      "summary": "新增接口开发类资源",
      "delta": "增加2项SDK和接口适配候选，开放集成覆盖率上调。",
      "review": "无需人工"
    },
    {
      "version": "index_v_2026_m6.2",
      "date": "2026-06-22",
      "type": "事件触发",
      "trigger": "数据层基线资料进入",
      "agent": "技术拆解智能体",
      "summary": "细化Schema与数据治理节点",
      "delta": "将统一数据层继续拆分为Schema注册、模式转换和兼容校核。",
      "review": "人工确认拆解边界"
    },
    {
      "version": "index_v_2026_m7",
      "date": "2026-07-28",
      "type": "定时生成",
      "trigger": "月度自动任务",
      "agent": "可信核验智能体",
      "summary": "月度许可证与活跃度复核",
      "delta": "2项低活跃项目降级为原理参考，1项许可不清项目转待核验。",
      "review": "无需人工"
    },
    {
      "version": "index_v_2026_m8.1",
      "date": "2026-08-12",
      "type": "自主迭代",
      "trigger": "未覆盖节点自动下钻",
      "agent": "技术拆解智能体",
      "summary": "任务调度缺口递归拆解",
      "delta": "形成资源采集、约束任务分配和任务迁移3个最小单元。",
      "review": "无需人工"
    },
    {
      "version": "index_v_2026_m8.2",
      "date": "2026-08-26",
      "type": "定时生成",
      "trigger": "周度自动任务",
      "agent": "代码映射智能体",
      "summary": "当前稳定索引版本",
      "delta": "完成11个项目的技术匹配和复用等级更新，开源覆盖率达到68%（演示）。",
      "review": "无需人工"
    },
    {
      "version": "index_v_2026_m8.3",
      "date": "2026-08-30",
      "type": "事件触发",
      "trigger": "发现MeshSync-Lite示例项目",
      "agent": "索引版本智能体",
      "summary": "增量状态合并覆盖提升",
      "delta": "新增1项候选资源，覆盖率由68%上调至74%（演示）。",
      "review": "待核验项目链接"
    }
  ],
  "parameter_versions": [
    {
      "version": "param_v_2026_m5",
      "date": "2026-05-30",
      "type": "定时生成",
      "trigger": "首期场景参数归并",
      "agent": "参数抽取智能体",
      "summary": "建立弱网仿真参数基线",
      "delta": "形成网络环境、数据负载和验证指标3组基础参数。",
      "review": "专家确认判据"
    },
    {
      "version": "param_v_2026_m6.1",
      "date": "2026-06-18",
      "type": "事件触发",
      "trigger": "开源组件默认配置进入",
      "agent": "标准化智能体",
      "summary": "补充缓存与重传参数",
      "delta": "完成容量、超时、重传次数的单位归一和范围合并。",
      "review": "无需人工"
    },
    {
      "version": "param_v_2026_m7",
      "date": "2026-07-29",
      "type": "定时生成",
      "trigger": "月度自动校准任务",
      "agent": "仿真校准智能体",
      "summary": "扩大数据负载验证范围",
      "delta": "并发主题、消息频率和Schema版本范围得到扩展。",
      "review": "无需人工"
    },
    {
      "version": "param_v_2026_m8.1",
      "date": "2026-08-12",
      "type": "自主迭代",
      "trigger": "场景S01/S05参数联动",
      "agent": "冲突检测智能体",
      "summary": "形成当前稳定参数包",
      "delta": "记录26项参数、2项待复核冲突和5组敏感性排序。",
      "review": "2项待复核"
    },
    {
      "version": "param_v_2026_m8.2",
      "date": "2026-08-30",
      "type": "事件触发",
      "trigger": "新证据与仿真结果进入",
      "agent": "发布智能体",
      "summary": "时延和断连范围增量更新",
      "delta": "端到端时延更新为40—300ms，断连时长扩展为2—60s；保留1项冲突。",
      "review": "1项待复核"
    }
  ]
});
}());

