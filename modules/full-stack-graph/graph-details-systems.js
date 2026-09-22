(function () {
  "use strict";
  var data = window.FULL_STACK_GRAPH_DATA;
  if (!data || !Array.isArray(data.objects)) return;
  function source(title, publishedAt, url, summary, supports, publisher, type) {
    return { title: title, publisher: publisher || "Anduril Industries", type: type || "官方新闻稿", publishedAt: publishedAt, url: url, summary: summary, supports: supports, checkedAt: "2026-09-20" };
  }
  var omenSource = source("EDGE Group and Anduril to Form UAE-US Joint Venture to Develop Autonomous Systems", "2025-11-13", "https://www.anduril.com/news/edge-group-and-anduril-to-form-uae-us-joint-venture-to-develop-autonomous-systems", "双方公布合资生产安排，以 Omen 为首个联合开发产品，并披露阿联酋首批采购承诺。", "Omen公开、合作框架及50套采购承诺；不证明交付完成。");
  var boltSource = source("Anduril Unveils Bolt & Bolt-M", "2024-10-10", "https://www.anduril.com/news/anduril-unveils-bolt-and-bolt-m", "同一公告区分面向侦察与搜救的 Bolt 基础构型和 Bolt-M 弹药构型。", "两构型同步发布、家族关系及Bolt-M的Lattice软件支持。");
  var altiusMSource = source("Anduril Announces Best In Class Loitering Munition", "2022-10-06", "https://blog.anduril.com/anduril-announces-best-in-class-loitering-munition-8b00a72aba2a", "公告明确600M与700M由ALTIUS 600和700平台发展而来。", "600M/700M名称、发布时间及平台衍生关系。", "Anduril Industries", "官方博客");
  var furyAcquisition = source("Anduril Industries Acquires UAS Developer Blue Force Technologies", "2023-09-07", "https://www.prnewswire.com/news-releases/anduril-industries-acquires-uas-developer-blue-force-technologies-301919963.html", "企业收购公告披露 Blue Force Technologies 自2019年开发Fury，并说明该收购扩展其大型无人机产品组合。", "2019年起研的回溯记载、2023年收购；不是2019年首飞证据。", "Anduril Industries（PR Newswire发布）", "企业原始新闻稿");
  var furyFlight = source("Anduril’s YFQ-44A Begins Flight Testing for the Collaborative Combat Aircraft Program", "2025-10-31", "https://www.anduril.com/news/anduril-yfq-44a-begins-flight-testing-for-the-collaborative-combat-aircraft-program", "公告披露YFQ-44A已开始飞行测试，并计划作为Arsenal-1首个入厂项目生产原型机。", "飞测启动及当时生产规划；不证明所有测试或量产交付已经完成。");
  var etvSource = source("Barracuda-500 Selected to Move Forward on the Enterprise Test Vehicle Prototype Project", "2025-03-04", "https://www.asdnews.com/news/defense/2025/03/04/barracuda500-selected-move-forward-enterprise-test-vehicle-prototype-project", "Anduril原稿披露Barracuda-500获选进入ETV下一阶段，后续拟验证协同自主与生产能力。", "ETV阶段进展和拟采用Mission Autonomy的后续测试；不证明计划已完成。", "Anduril Industries（ASDNews原稿转载）", "企业新闻稿转载");
  etvSource.originalUrl = "https://www.anduril.com/news/barracuda-500-selected-to-move-forward-on-the-enterprise-test-vehicle-prototype-project";
  var patches = {
    "omen-2025-11a": {
      eventType: "产品公开", summary: "2025年11月13日，Anduril与EDGE在联合公告中公开Omen，定位为无需跑道的自主航空平台，拟面向监测、通信及物流等多种用途。它是合作计划中的首个产品。",
      assessment: "产品公开确立了Omen的名称与合作定位；公告使用开发和未来生产表述，不能据此判定已经批量服役。", source: omenSource
    },
    "omen-2025-11b": {
      eventType: "合作与采购承诺", summary: "双方宣布拟设立EDGE-Anduril Production Alliance，负责范围内自主系统的生产、销售与保障；公告披露阿联酋首批采购50套Omen的承诺。",
      assessment: "这是产业合作和需求牵引信号。公告所述2028年底全面生产属于当时目标，首批采购承诺不等于50套已经交付。", source: omenSource,
      scopeNote: "与Omen公开为同日同一公告的不同信息点，不是另一次独立产品发布。"
    },
    "omen-2025-11c": {
      eventType: "供应商合作公告", summary: "2025年11月17日，Archer宣布向Anduril和EDGE供应其电动动力系统，用于Omen联合开发。该协议是Archer首次向第三方提供此类自有技术的商业安排。",
      assessment: "来源直接支持供应合作关系，但未证明具体交付批次、集成验收或Omen最终产品成熟度。",
      source: source("Archer to Supply Its Proprietary Electric Powertrain to Third Parties, Starting with Anduril and EDGE Group for their Recently Announced Omen Autonomous Air Vehicle", "2025-11-17", "https://investors.archer.com/news/news-details/2025/Archer-to-Supply-Its-Proprietary-Electric-Powertrain-to-Third-Parties-Starting-with-Anduril-and-EDGE-Group-for-their-Recently-Announced-Omen-Autonomous-Air-Vehicle/default.aspx", "Archer披露面向Omen的第三方动力系统供应协议。", "供应协议及合作对象，不含交付完成证明。", "Archer Aviation", "投资者关系公告")
    },
    "altius-2020-03": {
      eventType: "军方试验演示", summary: "美国陆军2020年3月30日报道了当月在尤马试验场开展的ALTIUS-600演示，展示该平台与直升机及地面载体的结合。报道配图注明3月4日的试验活动。",
      assessment: "这是可追溯到军方公开记录的演示节点，发生于Anduril收购Area-I之前；演示不代表Anduril在2020年已拥有该产品。",
      source: source("CCDC Aviation, Missile Center highlights forward-launched UAS technology", "2020-03-30", "https://www.army.mil/article-amp/234100/ccdc_aviation_missile_center_highlights_forward_launched_uas_technology", "陆军记录Area-I ALTIUS-600在尤马的试验展示。", "2020年3月ALTIUS-600演示及当时研发主体。", "U.S. Army", "军方新闻")
    },
    "altius-2021-04": {
      eventType: "企业收购", summary: "Anduril于2021年4月1日宣布收购Area-I，将ALTIUS系列纳入无人机产品组合；公告称Area-I将作为全资子公司继续沿用其品牌运营。",
      assessment: "该节点反映技术和团队的并购整合。ALTIUS此前已有研发与试验历史，收购不能被写成该系列的首次诞生。",
      source: source("Anduril Industries Acquires Area-I, Adds ALTIUS Capabilities to Hardware Portfolio", "2021-04-01", "https://www.anduril.com/news/anduril-industries-acquires-area-i-adds-altius-capabilities-to-hardware-portfolio", "收购公告说明ALTIUS加入Anduril产品组合和Area-I的子公司安排。", "收购日期、对象及产品组合整合。")
    },
    "altius-2021-11": {
      eventType: "系列型号发布", summary: "Area-I与Anduril于2021年11月2日公开ALTIUS-700，说明其是在ALTIUS-600基础上发展的较大型号，并强调开放系统与可配置任务载荷的产品定位。",
      assessment: "来源明确支撑600到700的产品迭代关系；发布稿中的能力描述属于厂商披露，不能自动视为用户验收结论。",
      source: source("Area-I, an Anduril Company, Unveils the ALTIUS 700", "2021-11-02", "https://blog.anduril.com/area-i-an-anduril-company-unveils-the-altius-700-2b8e856d48b5", "官方博客发布ALTIUS-700并说明它以600为迭代基础。", "700发布日、系列关系和开放系统定位。", "Anduril Industries", "官方博客")
    },
    "altius-2022-05": {
      eventType: "协同试验演示", summary: "2022年5月19日，Anduril与Area-I披露ALTIUS-600参加EDGE22，展示多平台协同与信息共享等能力。公告将此事置于美国陆军航空技术试验活动中。",
      assessment: "该节点支持ALTIUS由单平台展示向协同试验扩展；不能由此反推2023年正式发布的Mission Autonomy品牌在2022年已以同名产品部署。",
      source: source("ALTIUS Air Launched Effects Demonstrated Advanced Teaming at US Army Project Edge 2022", "2022-05-19", "https://www.anduril.com/news/altius-air-launched-effects-demonstrated-advanced-teaming-at-us-army-project-edge-2022", "企业报告ALTIUS-600在EDGE22完成协同能力展示。", "参与EDGE22及厂商披露的协同演示，不含独立验收数据。")
    },
    "altius-m-2022-10": {
      title: "Altius-600M / 700M 构型公开", eventType: "产品构型扩展", summary: "2022年10月6日，Anduril官方博客公开ALTIUS-600M和700M，明确两者以ALTIUS 600、700平台为基础。M表示弹药构型，图谱以Altius-M汇总该分支。",
      assessment: "此处是同一家族的用途与构型扩展，不是独立于ALTIUS的全新平台起源。原图将600M误写为500M，现按原始公告更正。", source: altiusMSource,
      scopeNote: "保留旧事件ID altius-m-2022-10；修正型号500M为600M。"
    },
    "bolt-2024-10": {
      eventType: "产品发布", summary: "Anduril于2024年10月10日发布Bolt系列。基础型Bolt定位为便携式垂直起降自主航空平台，面向侦察和搜救等应用，与Bolt-M在同一公告中发布。",
      assessment: "Bolt与Bolt-M是同日公开的家族构型，不应把图上的箭头解释为先后两次研发完成或先后服役。", source: boltSource
    },
    "bolt-m-2024-10": {
      eventType: "产品构型发布", summary: "同一份2024年10月10日公告将Bolt-M定义为Bolt的弹药构型，并披露由Lattice软件支持。基础型与M构型具有不同用途，不能将两者的能力描述相互替代。",
      assessment: "来源可证实构型关系和软件支持的官方表述；该发布节点本身不说明采购规模或后续部队交付状态。", source: boltSource
    },
    "bolt-m-2026-01": {
      title: "Bolt-M 获OPF-L下一阶段合同公告", eventType: "项目采购进展", summary: "2026年1月15日，Anduril公布美国海军陆战队OPF-L下一阶段合同，涉及600余套Bolt-M及配套设备。企业公告安排自2026年2月起交付。",
      assessment: "这是试验后的采购推进，不能表述为2026年1月首次进入整个OPF-L项目，也不能把计划交付数量当成截至公告日已交付数量。",
      source: source("Anduril Awarded $23.9M Contract for USMC Organic Precision Fires-Light Program", "2026-01-15", "https://www.asdnews.com/news/defense/2026/01/15/anduril-awarded-239m-contract-usmc-organic-precision-fireslight-program", "企业原稿公布Bolt-M后续合同与计划交付阶段。", "2026年1月合同公告、600余套计划及后续交付安排。", "Anduril Industries（ASDNews原稿转载）", "企业新闻稿转载")
    },
    "anvil-2019-10": {
      eventType: "产品前身公开", summary: "2019年10月3日，Anduril发布名为Interceptor的反无人机平台，作为Lattice AI反无人机系统的一部分。原始新闻稿使用Interceptor名称，而非Anvil-M。",
      assessment: "该资料支撑早期产品谱系起点。此节点作为Anvil相关历史线索展示，但不能据此确定正式改名日期或证明后续构型在当时已经存在。",
      source: source("Anduril Industries Announces Release of Counter-Drone System", "2019-10-03", "https://www.prnewswire.com/news-releases/anduril-industries-announces-release-of-counter-drone-system-300930475.html", "Anduril原始新闻稿公开Interceptor及其与Lattice的系统关系。", "Interceptor公开日与早期系统定位，不支持Anvil改名日期。", "Anduril Industries（PR Newswire发布）", "企业原始新闻稿")
    },
    "anvil-2022-03": {
      title: "Anvil 产品名称与定位（原时间待核验）", eventType: "产品命名线索", summary: "Anduril官方产品页将Anvil列为自主航空平台，并区分Anvil和Anvil-M。资料能够说明产品名称与家族构型，但未标注首次采用Anvil名称的时间。",
      assessment: "原图的“2022年3月命名稳定”缺少可确认的原始时间依据。当前产品页不能用作2022年3月发生独立命名事件的证明。", verificationStatus: "部分核验", scopeNote: "保留旧时间坐标2022.3便于追溯；该日期不是已核实发布日期，待补历史网页或同期原始公告。",
      source: source("Anvil", "未标注", "https://www.anduril.com/hardware/anvil/", "官方产品页区分Anvil与Anvil-M，说明其产品家族定位。", "产品身份及构型关系；不支持2022年3月的命名时间。", "Anduril Industries", "官方产品页")
    },
    "anvil-2023-10": {
      eventType: "衍生构型发布", summary: "Anduril于2023年10月5日公布Anvil-M，明确其为既有Anvil平台的弹药构型，并将其纳入公司的反无人机系统家族。",
      assessment: "公告清楚区分基础平台与M构型，支撑产品分支扩展；厂商描述的适用场景不等同于所有环境下的独立效果验证。",
      source: source("Anduril Announces Anvil-M Munition Variant Of Interceptor Platform", "2023-10-05", "https://www.anduril.com/news/anvil-m-launch", "官方发布Anvil-M，说明其从Anvil衍生并与Lattice体系关联。", "Anvil-M发布日期、衍生关系与体系定位。")
    },
    "anvil-2025-03": {
      title: "USMC I-CsUAS 体系项目公告（非Anvil单品合同）", eventType: "相关体系项目进展", summary: "2025年3月13日，Anduril宣布获得美国海军陆战队I-CsUAS十年期IDIQ项目，围绕基地反无人机系统的提供、安装与保障展开，并由Lattice集成多种传感器和执行设备。",
      assessment: "项目归属是I-CsUAS体系。公告没有将全部合同金额或Program of Record身份单独授予Anvil，故此节点只能作为Anvil所属业务体系的相关背景。", verificationStatus: "关联边界已限定", scopeNote: "原标题USMC Program of Record过于宽泛，现明确项目层级；Anvil具体批次、数量与合同占比待核验。",
      source: source("Anduril Awarded 10-Year $642M Program of Record to Deliver CUAS Systems for USMC", "2025-03-13", "https://www.asdnews.com/news/defense/2025/03/13/anduril-awarded-10year-642m-program-record-deliver-cuas-systems-usmc", "企业原稿披露I-CsUAS体系级IDIQ项目与Lattice集成安排。", "体系级项目，不支持Anvil单品获6.42亿美元合同的说法。", "Anduril Industries（ASDNews原稿转载）", "企业新闻稿转载")
    },
    "roadrunner-2023-12": {
      eventType: "产品及构型发布", summary: "2023年12月1日的Anduril发布稿同时介绍Roadrunner与Roadrunner-M，将前者作为可配置自主航空平台，后者作为其面向防空用途的构型。",
      assessment: "应分别理解平台与任务构型；发布稿中的可回收定位不意味着执行每次任务后都能回收，也不能替代用户侧成熟度记录。",
      source: source("Anduril unveils Roadrunner & Roadrunner-M", "2023-12-01", "https://www.suasnews.com/2023/12/anduril-unveils-roadrunner-roadrunner-m/", "完整转载Anduril发布稿，区分Roadrunner平台和Roadrunner-M构型。", "同时发布与平台/构型边界。", "Anduril Industries（sUAS News发布稿转载）", "企业新闻稿转载")
    },
    "roadrunner-2024-10": {
      eventType: "生产合同公告", summary: "2024年10月公开的Anduril新闻稿披露约2.5亿美元合同，涵盖500余套Roadrunner-M及额外Pulsar设备，计划于2024年第四季度至2025年底交付。",
      assessment: "合同同时覆盖多个产品，不能把总金额简单当作Roadrunner-M单价计算依据；公告中的交付计划不是全部履约完成的证明。",
      source: source("Anduril Industries Awarded Air Defense Production Contract with DoD", "2024-10-09（转载日）", "https://www.asdnews.com/news/defense/2024/10/09/anduril-industries-awarded-air-defense-production-contract-with-dod", "企业原稿披露Roadrunner-M和Pulsar合并采购范围及交付计划。", "2024年10月合同公开、组合采购与计划；非履约验收。", "Anduril Industries（ASDNews原稿转载）", "企业新闻稿转载")
    },
    "barracuda-2024-09": {
      eventType: "产品家族公开", summary: "Anduril官方发布资料将Barracuda定义为包含100、250、500等型号的自主航空平台家族，并区分其弹药构型Barracuda-M。原图2024年9月节点对应这一家族公开阶段。",
      assessment: "官方账号可支撑系列组成和M构型边界。当前可读取页面仅给相对时间，因此不将具体发布日期补写成已核实事实，也不把厂商生产愿景当成当时产量。", verificationStatus: "产品事实已核验，精确日期待补", scopeNote: "保留原图2024.9月份；所用官方账号页面未提供可直接读取的绝对发布日期。",
      source: source("Introducing the Barracuda family of air-breathing Autonomous Air Vehicles", "未标注绝对日期", "https://www.linkedin.com/posts/anduril_introducing-the-barracuda-family-of-air-breathing-activity-7239988870459613184-yiov", "企业官方账号介绍Barracuda三个型号及M构型。", "型号组成和产品家族关系；本次页面不足以单独核实精确发布日。", "Anduril Industries", "企业官方账号")
    },
    "barracuda-2025-03": {
      title: "Barracuda-500 推进至ETV下一阶段", eventType: "原型项目阶段推进", summary: "2025年3月4日公开的企业原稿称，美国空军相关机构与DIU选择Barracuda-500推进至Enterprise Test Vehicle原型项目下一阶段，接下来将验证协同自主、可生产性与模块化能力。",
      assessment: "这不是首次进入ETV，公告回顾此前已有试验。后续验证目标属于计划，不能把阶段入选写成完成量产定型或全面部署。", source: etvSource
    },
    "fury-2019": {
      eventType: "研发起点（后续公告回溯）", summary: "Anduril在2023年的收购原始公告中记载，Blue Force Technologies自2019年起研发Fury。因此图谱将2019年列为研发起点，而不是产品发布或首飞时间。",
      assessment: "年份来自后续企业公告的回溯叙述；未获得2019年具体启动月份、首份合同或首飞证据，不向更细时间精度推断。", source: furyAcquisition
    },
    "fury-2023-09": {
      eventType: "企业收购与产品整合", summary: "2023年9月7日，Anduril宣布收购Blue Force Technologies，连同其Fury研发工作与航空结构能力加入公司的自主系统组合。交易金额未在该公告中披露。",
      assessment: "该事件体现Anduril向大型自主航空平台扩展。收购时的Fury研发状态不能等同于后来YFQ-44A项目原型机的完成状态。", source: furyAcquisition
    },
    "fury-2025-10": {
      eventType: "项目飞行测试启动", summary: "2025年10月31日，Anduril发布YFQ-44A已开始飞行测试的公告，将其置于美国空军CCA项目中，并以半自主飞行测试描述这一阶段。",
      assessment: "它是研发测试里程碑，不能写成全面自主能力验收或正式列装。公告发布日期与具体每架次飞行日期也应区分。", source: furyFlight
    },
    "fury-2026-01": {
      title: "Arsenal-1 首批产品规划（原时间待核验）", eventType: "生产规划线索", summary: "可核验的2025年10月官方飞测公告已经将YFQ-44A列为Arsenal-1首个入厂项目，并提出2026年上半年生产原型机的计划。原图以2026年1月记录这一制造规划的延续。",
      assessment: "Fury与Arsenal-1的规划关系有一手依据；2026年1月具体更新的完整原文本次未能读取，不能将原图日期称为首次确定生产产品的日期。", source: furyFlight, verificationStatus: "部分核验",
      scopeNote: "保留旧时间2026.1与ID；官网Arsenal-1: One Year In页面仅返回JavaScript提示。现提供可核验的此前规划，2026年1月节点细节待补。"
    }
  };
  data.objects.forEach(function (object) {
    (object.events || []).forEach(function (event) {
      if (patches[event.id]) Object.assign(event, { verificationStatus: "公开来源已核验" }, patches[event.id]);
    });
  });
  var relationPatches = {
    "altius-2022-05|altius-m-2022-10": {
      description: "官方2022年10月公告明确ALTIUS-600M/700M以600/700平台为基础。连线表达系列构型演化，不表示EDGE22演示直接导致M构型发布。", source: altiusMSource, verificationStatus: "产品演化已核验"
    },
    "bolt-2024-10|bolt-m-2024-10": {
      description: "Bolt与Bolt-M在同日公告中被定义为基础型与弹药构型。箭头表达产品家族衍生关系，不表达两次先后发生的独立发布。", source: boltSource, verificationStatus: "构型关系已核验"
    },
    "barracuda-2024-09|mission-autonomy-2024-11": {
      description: "2025年3月ETV公告明确将Lattice for Mission Autonomy列入Barracuda-500后续协同测试计划。连线是产品与软件关系的研判表达，不能证明2024年11月Replicator节点已完成该集成。", source: etvSource, verificationStatus: "关联研判；非同期集成实证"
    },
    "fury-2025-10|mission-autonomy-2026-02": {
      description: "Fury官方产品页将Lattice与Mission Autonomy作为其产品方向。该关系只支持产品级软件关联，不证明2026年2月某次YFQ-44A测试采用Lattice，也不排除第三方自主软件。", verificationStatus: "产品关联；具体测试软件待核验",
      source: source("Fury", "未标注", "https://www.anduril.com/fury/", "产品页描述Fury与Lattice及Mission Autonomy的研发关联。", "产品级关联，不支持指定测试架次或2026年2月事件的软件归属。", "Anduril Industries", "官方产品页")
    }
  };
  (data.relations || []).forEach(function (relation) {
    var patch = relationPatches[relation.from + "|" + relation.to];
    if (patch) Object.assign(relation, patch);
  });
}());
