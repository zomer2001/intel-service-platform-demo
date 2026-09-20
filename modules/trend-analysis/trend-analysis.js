(function () {
  "use strict";

  var data = window.TrendAnalysisData;
  var components = window.PlatformComponents;
  var monitorFlowStages = [
    { label: "资料发现", note: "发现 1 条新增官方资料", trace: "输入：Anduril 公开资料 · 动作：抓取标题、日期和来源主体 · 输出：E014 候选" },
    { label: "事件识别", note: "识别联合演习验证事件", trace: "输入：正文与元数据 · 动作：抽取对象、事件类型和关联能力 · 输出：联合演习事件" },
    { label: "证据核验", note: "核对来源与技术事实", trace: "输入：事件候选 · 动作：校验公开 URL、来源等级和既有事件 · 输出：中高可信事件" },
    { label: "关联融合", note: "关联 Battle Manager 与 Lattice", trace: "输入：事件 + 技术对象 · 动作：关联能力、路线和差距条目 · 输出：联合 C2 证据" },
    { label: "报告更新", note: "形成 v_2026_m8.2 增量版", trace: "输入：核验后的证据 · 动作：写入版本差异与后续任务 · 输出：增量报告 + 复核任务" }
  ];
  var monitorReportVersions = [
    { version: "v_2026_m1", month: 1, kind: "regular", summary: "年度监测基线生成", diff: "建立年度能力、项目、证据与研判基线。" },
    { version: "v_2026_m2", month: 2, kind: "regular", summary: "月度例行监测", diff: "新增资料有限，技术状态与成熟度判断维持。" },
    { version: "v_2026_m3", month: 3, kind: "regular", summary: "规模验证线索跟踪", diff: "补充规模部署线索，证据覆盖度小幅提升。" },
    { version: "v_2026_m4", month: 4, kind: "regular", summary: "边缘部署月度更新", diff: "弱网运行与边缘节点资料进入持续观察清单。" },
    { version: "v_2026_m4.1", month: 4, kind: "emergency", summary: "Ivy Sting 5 增量报告", diff: "规模性、弱网运行与跨域链路判断同步上调。", eventId: "E005" },
    { version: "v_2026_m5", month: 5, kind: "regular", summary: "月度证据归并", diff: "吸收上月突发版本，形成新的月度稳定基线。" },
    { version: "v_2026_m5.1", month: 5, kind: "emergency", summary: "Ivy Mass 增量报告", diff: "新增师级规模与 2500+ 终端公开证据。", eventId: "E006" },
    { version: "v_2026_m6", month: 6, kind: "regular", summary: "开发生态月度更新", diff: "规模部署判断维持，开放生态进入重点跟踪。" },
    { version: "v_2026_m6.1", month: 6, kind: "emergency", summary: "陆军确认增量报告", diff: "师级规模验证由线索转为官方确认型证据。", eventId: "E007" },
    { version: "v_2026_m6.2", month: 6, kind: "emergency", summary: "开发工具链增量报告", diff: "REST SDK 与开发控制台信息补强开放集成判断。", eventId: "E008" },
    { version: "v_2026_m6.3", month: 6, kind: "emergency", summary: "数据层基线增量报告", diff: "技术定位向 C2 公共数据基础层进一步延伸。", eventId: "E009" },
    { version: "v_2026_m7", month: 7, kind: "regular", summary: "联盟应用月度更新", diff: "汇总数据治理、联盟应用与规模扩展证据。" },
    { version: "v_2026_m7.1", month: 7, kind: "emergency", summary: "NATO 合同增量报告", diff: "合同事件使应用边界扩展至联盟级空中 C2 评估。", eventId: "E010" },
    { version: "v_2026_m7.2", month: 7, kind: "emergency", summary: "Schema 治理增量报告", diff: "模式治理能力证据增强，数据标准化判断上调。", eventId: "E011" },
    { version: "v_2026_m7.3", month: 7, kind: "emergency", summary: "NGC2 扩展增量报告", diff: "从阶段验证向规模扩展的状态判断得到补充。", eventId: "E012" },
    { version: "v_2026_m8", month: 8, kind: "regular", summary: "开发生态月度归并", diff: "形成开放生态与联合 C2 应用的新月度基线。" },
    { version: "v_2026_m8.1", month: 8, kind: "emergency", summary: "SDK Skills 增量报告", diff: "AI 辅助开发生态证据增加，工具链判断上调。", eventId: "E013" },
    { version: "v_2026_m8.2", month: 8, kind: "emergency", summary: "联合演习增量报告", diff: "联合 C2 应用与多军种融合能力判断上调。", eventId: "E014" },
    { version: "v_2026_m9", month: 9, kind: "regular", summary: "月度监测计划", diff: "计划归并 9 月新增证据并形成稳定版本。", status: "planned" },
    { version: "v_2026_m10", month: 10, kind: "regular", summary: "月度监测计划", diff: "计划开展能力状态、合同与应用边界复核。", status: "planned" },
    { version: "v_2026_m11", month: 11, kind: "regular", summary: "月度监测计划", diff: "计划更新证据充分度与重点差距联动项。", status: "planned" },
    { version: "v_2026_m12", month: 12, kind: "regular", summary: "年度汇总计划", diff: "计划形成年度版本收口与下一周期基线。", status: "planned" }
  ];

  function el(tag, className, text) {
    return components.element(tag, className, text);
  }

  function svgElement(tag, className, attributes, text) {
    var node = document.createElementNS("http://www.w3.org/2000/svg", tag);
    if (className) node.setAttribute("class", className);
    Object.keys(attributes || {}).forEach(function (name) { node.setAttribute(name, attributes[name]); });
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function formalText(value) {
    return String(value === undefined || value === null ? "—" : value)
      .replace(/DEMO/gi, "样例")
      .replace(/演示数据/g, "样例研判数据")
      .replace(/演示研判/g, "公开资料研判")
      .replace(/演示评分/g, "样例评分")
      .replace(/演示参数/g, "样例参数")
      .replace(/演示/g, "样例");
  }

  function toneFor(value) {
    var text = String(value || "");
    if (/已|强|高|规模|快速|正常|形成/.test(text)) return "success";
    if (/运行|发展|扩展|验证/.test(text)) return "running";
    if (/差距|待|中/.test(text)) return "warning";
    return "primary";
  }

  function badge(value, tone) {
    var node = el("span", "intel-badge", formalText(value));
    node.dataset.tone = tone || toneFor(value);
    return node;
  }

  function metric(label, value) {
    var node = el("article", "intel-metric");
    node.appendChild(el("span", "", formalText(label)));
    node.appendChild(el("strong", "", formalText(value)));
    return node;
  }

  function metrics(items) {
    var grid = el("div", "intel-metrics");
    items.forEach(function (item) { grid.appendChild(metric(item.label, item.value)); });
    return grid;
  }

  function section(title, description, body, actions) {
    var card = el("section", "intel-section");
    var head = el("header", "intel-section__head");
    var text = el("div");
    text.appendChild(el("h2", "", title));
    if (description) text.appendChild(el("p", "", description));
    head.appendChild(text);
    if (actions) head.appendChild(actions);
    card.appendChild(head);
    if (body) card.appendChild(body);
    return card;
  }

  function definitionList(entries) {
    var list = el("dl", "intel-summary");
    entries.forEach(function (entry) {
      var row = el("div");
      row.appendChild(el("dt", "", entry.label));
      row.appendChild(el("dd", "", formalText(entry.value)));
      list.appendChild(row);
    });
    return list;
  }

  function score(value) {
    var wrap = el("span", "intel-score");
    var track = el("i", "intel-score__track");
    var fill = el("i", "intel-score__fill");
    fill.style.width = Math.max(0, Math.min(100, Number(value) || 0)) + "%";
    track.appendChild(fill);
    wrap.appendChild(track);
    wrap.appendChild(el("strong", "", value));
    return wrap;
  }

  function button(label, tone, onClick) {
    return components.createButton({ label: label, tone: tone || "secondary", onClick: onClick });
  }

  function downloadLink(label, filename, content, type) {
    var link = document.createElement("a");
    link.className = "button button--primary";
    link.textContent = label;
    link.download = filename;
    link.href = "data:" + (type || "text/plain;charset=utf-8") + "," + encodeURIComponent(content);
    return link;
  }

  function findEvent(id) {
    return data.events.find(function (item) { return item.event_id === id; });
  }

  function findSourceForEvent(event) {
    if (!event) return null;
    return data.sources.find(function (item) { return item.URL === event.来源URL; }) || null;
  }

  function openEvent(event) {
    if (!event) return;
    var source = findSourceForEvent(event);
    var sourceBody = definitionList([
      { label: "来源主体", value: event.来源主体 },
      { label: "来源类型", value: source ? source.来源类型 : "公开资料" },
      { label: "可信度", value: source ? source.可信等级 : event.可信度 },
      { label: "公开地址", value: event.来源URL }
    ]);
    components.openDrawer({
      kicker: "事件与证据",
      title: event.事件标题,
      sections: [
        { title: "事件摘要", content: el("p", "", formalText(event.事件摘要)) },
        { title: "技术影响研判", content: el("p", "", formalText(event.技术影响研判)) },
        { title: "事件属性", content: definitionList([
          { label: "事件日期", value: event.事件日期 },
          { label: "技术对象", value: event.技术对象 },
          { label: "事件类型", value: event.事件类型 },
          { label: "关联能力", value: event.关联能力 },
          { label: "数据属性", value: event.数据属性 }
        ]) },
        { title: "公开资料来源", content: sourceBody },
        { title: "研判边界", content: el("p", "", "公开资料研判，仅支撑本事件所列判断，不构成对未公开技术实现的确认。") }
      ]
    });
  }

  function reportContent(report) {
    var reportEvents = data.events.filter(function (event) {
      return report.分析对象 === "技术领域" || String(event.技术对象).indexOf(report.分析对象.replace("关键技术", "")) >= 0;
    }).slice(0, 5);
    return [
      "成果类型：" + report.成果类型,
      "分析对象：" + report.分析对象,
      "时间范围：" + report.时间范围,
      "## 核心结论\n" + report.核心结论摘要,
      "## 代表事件\n" + reportEvents.map(function (event) { return "- " + event.事件日期 + "｜" + event.事件标题; }).join("\n"),
      "## 说明\n样例研判数据／公开资料研判，仅供分析参考。"
    ];
  }

  function openReport(report) {
    var actions = el("div", "intel-drawer-actions");
    actions.appendChild(downloadLink(
      "下载报告",
      report.report_id + ".md",
      "# " + report.成果名称 + "\n\n" + reportContent(report).join("\n\n"),
      "text/markdown;charset=utf-8"
    ));
    components.openDrawer({
      kicker: "分析成果",
      title: report.成果名称,
      sections: [
        { title: "成果摘要", content: el("p", "", report.核心结论摘要) },
        { title: "成果属性", content: definitionList([
          { label: "分析对象", value: report.分析对象 },
          { label: "成果类型", value: report.成果类型 },
          { label: "时间范围", value: report.时间范围 },
          { label: "状态", value: report.状态 }
        ]) },
        { title: "文件操作", content: actions },
        { title: "研判说明", content: el("p", "", "样例研判数据／公开资料研判，仅供分析参考。") }
      ]
    });
  }

  function openReportTimeline() {
    var list = el("div", "intel-timeline");
    data.reports.forEach(function (report, index) {
      var item = el("article", "intel-timeline__item");
      item.appendChild(el("span", "intel-kicker", "版本 0" + (index + 1) + " · " + report.时间范围));
      item.appendChild(el("strong", "", report.成果名称));
      item.appendChild(el("p", "", report.核心结论摘要));
      list.appendChild(item);
    });
    components.openDrawer({
      kicker: "成果版本",
      title: "研判报告时间轴",
      sections: [
        { title: "已形成成果", content: list },
        { title: "更新机制", content: el("p", "", "按月度监测与重要事件触发生成新版本，历史版本保留原始时间范围与结论摘要。") }
      ]
    });
  }

  function openObject(object) {
    var related = data.events.filter(function (event) {
      var objectName = object.技术对象.replace(" Mesh", "");
      return String(event.技术对象).indexOf(objectName) >= 0;
    });
    var eventList = el("div", "intel-event-list");
    (related.length ? related : data.events.slice(0, 3)).slice(0, 5).forEach(function (event) {
      var eventButton = el("button", "intel-event");
      eventButton.type = "button";
      eventButton.appendChild(el("span", "intel-event__date", event.事件日期));
      eventButton.appendChild(el("strong", "", event.事件标题));
      eventButton.appendChild(el("p", "", event.技术影响研判));
      eventButton.addEventListener("click", function () { openEvent(event); });
      eventList.appendChild(eventButton);
    });
    components.openDrawer({
      kicker: "持续监测对象",
      title: object.技术对象,
      sections: [
        { title: "对象状态", content: definitionList([
          { label: "对象编号", value: object.object_id },
          { label: "对象类型", value: object.对象类型 },
          { label: "所属领域", value: object.所属领域 },
          { label: "当前状态", value: object.当前状态 },
          { label: "活跃度", value: object.活跃度 },
          { label: "最新变化", value: object.最新变化 }
        ]) },
        { title: "关联事件", content: eventList },
        { title: "数据说明", content: el("p", "", "样例研判数据／公开资料研判，仅供分析参考。") }
      ]
    });
  }

  function setMonitorViewUrl(view) {
    try {
      var url = new URL(window.location.href);
      if (view) url.searchParams.set("view", view);
      else url.searchParams.delete("view");
      window.history.replaceState({}, "", url.href);
    } catch (error) { /* file:// 下仍保留当前交互。 */ }
  }

  function openMonitorReport(report) {
    var index = monitorReportVersions.indexOf(report);
    var previous = index > 0 ? monitorReportVersions[index - 1] : null;
    var event = report.eventId ? findEvent(report.eventId) : null;
    var planned = report.status === "planned";
    var actions = el("div", "intel-drawer-actions");
    if (planned) {
      actions.appendChild(el("p", "", "该版本尚未生成，当前仅保留月度任务计划。"));
    } else {
      var reportLines = [
        "# Lattice 技术动态监测报告",
        "报告版本：" + report.version,
        "报告类型：" + (report.kind === "emergency" ? "突发事件驱动增量报告" : "月度定期监测报告"),
        "上一版本：" + (previous ? previous.version : "年度初始基线"),
        "## 执行摘要\n本报告围绕 Lattice 的技术定位、能力成熟度、应用边界和开放生态进行增量研判。",
        "## 相对上一版本的差异\n" + report.diff,
        "## 详细研判要点\n- 技术定位持续向分布式数据基础层与联合 C2 支撑能力延伸\n- 规模部署、数据治理与开放集成证据持续积累\n- 已标记可能受影响的技术路线和差距分析项",
        event ? "## 关联公开事实事件\n事件编号：" + event.event_id + "\n事件标题：" + event.事件标题 + "\n来源主体：" + event.来源主体 + "\n来源地址：" + event.来源URL : "",
        "样例研判数据／公开资料研判，仅供分析参考。"
      ].filter(Boolean).join("\n\n");
      actions.appendChild(downloadLink("下载完整监测报告", "Lattice_动态监测报告_" + report.version + ".md", reportLines, "text/markdown;charset=utf-8"));
    }
    if (event) actions.appendChild(button("查看事件证据与来源", "secondary", function () { openEvent(event); }));
    var audit = el("div", "intel-audit-list");
    monitorFlowStages.forEach(function (stage, stageIndex) {
      var item = el("div", "intel-audit-list__item");
      item.appendChild(el("i", "", "0" + (stageIndex + 1)));
      var copy = el("div");
      copy.appendChild(el("strong", "", stage.label));
      copy.appendChild(el("span", "", stage.trace));
      item.appendChild(copy);
      audit.appendChild(item);
    });
    components.openDrawer({
      kicker: "监测报告详情 · " + report.version,
      title: report.summary,
      sections: [
        { title: "报告属性", content: definitionList([
          { label: "报告版本", value: report.version },
          { label: "报告类型", value: report.kind === "emergency" ? "突发事件驱动增量报告" : "月度定期监测报告" },
          { label: "生成状态", value: planned ? "计划生成" : "已归档" },
          { label: "上一版本", value: previous ? previous.version : "年度初始基线" }
        ]) },
        { title: "相对上一版本的差异", content: el("p", "", report.diff) },
        { title: "执行摘要", content: el("p", "", planned ? "月度任务将在监测窗口结束后归并新增资料、事件与能力变化。" : "围绕技术定位、能力成熟度、应用边界和开放生态完成增量研判，并同步标记受影响成果。") },
        { title: "可审计执行记录", content: planned ? el("p", "", "计划版本尚未执行，生成后将记录资料发现、事件识别、证据核验、关联融合和报告更新。") : audit },
        { title: "报告操作", content: actions },
        { title: "研判说明", content: el("p", "", "样例研判数据／公开资料研判，仅供分析参考。") }
      ]
    });
  }

  function renderLatticeDetail(mount, onBack) {
    var panel = el("div", "intel-tab-panel intel-monitor-detail");
    var topActions = el("div", "intel-monitor-detail__actions");
    topActions.appendChild(button("返回监测对象列表", "secondary", onBack));
    panel.appendChild(topActions);

    var banner = el("section", "intel-original-object-banner");
    var mark = el("span", "intel-original-object-mark", "⌘");
    var objectTitle = el("div", "intel-original-object-title");
    var titleRow = el("div", "intel-actions");
    titleRow.appendChild(el("h2", "", "Lattice"));
    titleRow.appendChild(badge("重点监测", "success"));
    titleRow.appendChild(badge("软件体系", "primary"));
    objectTitle.appendChild(titleRow);
    objectTitle.appendChild(el("p", "", "分布式数据网格 · 智能指挥控制 · 开放集成生态"));
    var objectState = el("div", "intel-original-object-state");
    objectState.appendChild(el("span", "", "当前技术状态"));
    objectState.appendChild(el("strong", "", "快速发展 / 规模部署"));
    objectState.appendChild(el("small", "", "最新版本：v_2026_m8.2"));
    var live = el("div", "intel-original-object-live");
    live.appendChild(el("strong", "", "持续监测中"));
    live.appendChild(el("small", "", "月度定期 + 突发事件双驱动"));
    banner.appendChild(mark);
    banner.appendChild(objectTitle);
    banner.appendChild(objectState);
    banner.appendChild(live);
    panel.appendChild(banner);

    var kpis = el("div", "intel-original-kpis");
    data.dashboard_metrics.slice(4).forEach(function (item, index) {
      var card = el("article", "intel-original-kpi");
      card.appendChild(el("span", "", item.指标名称));
      var value = el("strong", "", item.展示值);
      value.appendChild(el("small", "", item.单位));
      card.appendChild(value);
      card.appendChild(el("em", "", ["累计", "+27 / 30日", "融合后", "需重点关注"][index]));
      kpis.appendChild(card);
    });
    var mechanism = el("article", "intel-original-kpi intel-original-kpi--mechanism");
    mechanism.appendChild(el("span", "", "报告生成机制"));
    mechanism.appendChild(el("strong", "", "双驱动"));
    mechanism.appendChild(el("em", "", "月度 + 突发增量"));
    kpis.appendChild(mechanism);
    panel.appendChild(kpis);

    var mainGrid = el("div", "intel-original-detail-grid");
    var timelinePanel = el("section", "intel-original-panel intel-original-timeline-panel");
    var timelineHead = el("header", "intel-original-panel__head");
    var timelineHeading = el("div");
    timelineHeading.appendChild(el("h2", "", "Lattice 持续监测与报告版本演化"));
    timelineHeading.appendChild(el("p", "", "同一时间轴串联定时报告、突发事件和差异摘要；点击任一节点查看证据或版本详情"));
    timelineHead.appendChild(timelineHeading);
    var legend = el("div", "intel-original-legend");
    [["emergency", "突发事件"], ["report", "定时报告"], ["diff", "差异摘要"]].forEach(function (item) {
      var key = el("span"); key.appendChild(el("i", "intel-original-legend__" + item[0])); key.appendChild(document.createTextNode(item[1])); legend.appendChild(key);
    });
    timelineHead.appendChild(legend);
    timelinePanel.appendChild(timelineHead);

    var timelineShell = el("div", "intel-original-timeline-shell");
    var laneLabels = el("div", "intel-original-lane-labels");
    laneLabels.appendChild(el("strong", "intel-original-year", "2026"));
    var eventLabel = el("div", "intel-original-lane-label intel-original-lane-label--event");
    eventLabel.appendChild(el("strong", "", "突发事件")); eventLabel.appendChild(el("small", "", "仅事件触发")); laneLabels.appendChild(eventLabel);
    var axisLabel = el("div", "intel-original-lane-label intel-original-lane-label--axis");
    axisLabel.appendChild(el("strong", "", "双驱动时间轴")); axisLabel.appendChild(el("small", "", "红上 / 蓝下")); laneLabels.appendChild(axisLabel);
    var reportLabel = el("div", "intel-original-lane-label intel-original-lane-label--report");
    reportLabel.appendChild(el("strong", "", "定时报告")); reportLabel.appendChild(el("small", "", "月度 + 增量")); laneLabels.appendChild(reportLabel);
    var diffLabel = el("div", "intel-original-lane-label intel-original-lane-label--diff");
    diffLabel.appendChild(el("strong", "", "版本差异摘要")); diffLabel.appendChild(el("small", "", "点击查看完整报告")); laneLabels.appendChild(diffLabel);
    timelineShell.appendChild(laneLabels);

    var timelineOverflow = el("div", "intel-original-timeline-overflow");
    var timelineInner = el("div", "intel-original-timeline-inner");
    var months = el("div", "intel-original-months");
    Array.from({ length: 12 }, function (_, monthIndex) {
      var count = monitorReportVersions.filter(function (report) { return report.month === monthIndex + 1; }).length;
      var month = el("span", "", String(monthIndex + 1).padStart(2, "0") + "月");
      month.style.gridColumn = "span " + count;
      if (monthIndex >= 8) month.appendChild(el("small", "", "计划"));
      months.appendChild(month);
    });
    timelineInner.appendChild(months);

    var track = el("div", "intel-original-track");
    var selectedVersion = "v_2026_m8.2";
    function selectVersion(report, openDrawer) {
      selectedVersion = report.version;
      panel.querySelectorAll("[data-report-version]").forEach(function (node) {
        node.dataset.selected = node.dataset.reportVersion === selectedVersion ? "true" : "false";
      });
      if (openDrawer) openMonitorReport(report);
    }
    monitorReportVersions.forEach(function (report) {
      var slot = el("div", "intel-original-timeline-slot");
      var eventZone = el("div", "intel-original-event-zone");
      var event = report.eventId ? findEvent(report.eventId) : null;
      if (event) {
        var eventCard = el("button", "intel-original-event-card"); eventCard.type = "button";
        eventCard.appendChild(el("span", "", event.事件类型.indexOf("合同") >= 0 ? "合同事件" : "突发事件"));
        eventCard.appendChild(el("strong", "", event.事件标题));
        eventCard.appendChild(el("small", "", event.事件日期));
        eventCard.addEventListener("click", function () { selectVersion(report, false); openEvent(event); });
        eventZone.appendChild(eventCard);
      }
      slot.appendChild(eventZone);
      var axisPoint = el("span", "intel-original-axis-point");
      axisPoint.dataset.kind = report.kind;
      slot.appendChild(axisPoint);
      var reportCard = el("button", "intel-original-report-card"); reportCard.type = "button";
      reportCard.dataset.reportVersion = report.version;
      reportCard.dataset.selected = report.version === selectedVersion ? "true" : "false";
      reportCard.dataset.kind = report.kind;
      reportCard.dataset.status = report.status || "complete";
      reportCard.appendChild(el("strong", "", report.version));
      reportCard.appendChild(el("span", "", "《Lattice监测报告》"));
      reportCard.appendChild(el("small", "", report.status === "planned" ? "计划生成" : report.kind === "emergency" ? "突发增量版" : "月度定期版"));
      reportCard.addEventListener("click", function () { selectVersion(report, true); });
      slot.appendChild(reportCard);
      track.appendChild(slot);
    });
    timelineInner.appendChild(track);

    var diffs = el("div", "intel-original-diffs");
    monitorReportVersions.forEach(function (report) {
      var diffCard = el("button", "intel-original-diff-card"); diffCard.type = "button";
      diffCard.dataset.reportVersion = report.version;
      diffCard.dataset.selected = report.version === selectedVersion ? "true" : "false";
      diffCard.dataset.kind = report.kind;
      diffCard.dataset.status = report.status || "complete";
      diffCard.appendChild(el("strong", "", report.version + "  Δ"));
      diffCard.appendChild(el("span", "", report.diff));
      diffCard.appendChild(el("small", "", "查看详细差异 ›"));
      diffCard.addEventListener("click", function () { selectVersion(report, true); });
      diffs.appendChild(diffCard);
    });
    timelineInner.appendChild(diffs);
    timelineOverflow.appendChild(timelineInner);
    timelineShell.appendChild(timelineOverflow);
    timelinePanel.appendChild(timelineShell);
    mainGrid.appendChild(timelinePanel);

    var flowPanel = el("section", "intel-original-panel intel-original-flow-panel");
    var flowHead = el("header", "intel-original-panel__head");
    var flowHeading = el("div");
    flowHeading.appendChild(el("h2", "", "多源新增情报流"));
    flowHeading.appendChild(el("p", "", "突发资料进入后的增量报告生成链路"));
    flowHead.appendChild(flowHeading);
    var flowTimer = null;
    var flowStartTimer = null;
    var flowIndex = -1;
    var runButton = button("重放 E014 事件链路", "secondary", runFlow);
    flowHead.appendChild(runButton);
    flowPanel.appendChild(flowHead);
    var flowWrap = el("div", "intel-original-flow");
    var flowSource = el("div", "intel-original-flow-source");
    var sourceText = el("div"); sourceText.appendChild(el("strong", "", "Valiant Shield 2026")); sourceText.appendChild(el("small", "", "Anduril 官方 · 新增资料"));
    flowSource.appendChild(sourceText); flowSource.appendChild(badge("突发", "danger")); flowWrap.appendChild(flowSource);
    var steps = el("div", "intel-original-flow-steps");
    var stepNodes = monitorFlowStages.map(function (stage) {
      var node = el("div", "intel-original-flow-step");
      node.dataset.state = "pending";
      node.appendChild(el("span", "intel-original-flow-step__mark", "✓"));
      var copy = el("div"); copy.appendChild(el("strong", "", stage.label)); copy.appendChild(el("small", "", stage.note)); node.appendChild(copy);
      steps.appendChild(node);
      return node;
    });
    flowWrap.appendChild(steps);
    var traceBox = el("div", "intel-original-flow-trace");
    var traceHead = el("div", "intel-original-flow-trace__head");
    traceHead.appendChild(el("strong", "", "可审计执行记录"));
    traceHead.appendChild(el("span", "", "输入 → 动作 → 输出 · 现场展示用执行轨迹"));
    traceBox.appendChild(traceHead);
    var traceNodes = monitorFlowStages.map(function (stage, index) {
      var trace = el("div", "intel-original-flow-trace__item");
      trace.dataset.state = "pending";
      trace.appendChild(el("i", "", "0" + (index + 1)));
      var copy = el("div");
      copy.appendChild(el("strong", "", stage.label));
      copy.appendChild(el("span", "", stage.trace));
      trace.appendChild(copy);
      traceBox.appendChild(trace);
      return trace;
    });
    flowWrap.appendChild(traceBox);
    var flowResult = el("div", "intel-original-flow-result");
    flowResult.hidden = true;
    flowResult.appendChild(el("strong", "", "E014 事件链路回放完成"));
    flowResult.appendChild(el("span", "", "v_2026_m8 → v_2026_m8.2"));
    flowWrap.appendChild(flowResult);
    flowWrap.appendChild(el("h3", "intel-original-recent-title", "近期报告版本"));
    var recent = el("div", "intel-original-recent-list");
    monitorReportVersions.slice(14, 18).reverse().forEach(function (report) {
      var item = el("button", "intel-original-recent-item"); item.type = "button";
      item.dataset.kind = report.kind;
      item.appendChild(el("i"));
      var copy = el("div"); copy.appendChild(el("strong", "", report.version + " · " + report.summary)); copy.appendChild(el("small", "", report.kind === "emergency" ? "突发事件驱动" : "月度定期生成")); item.appendChild(copy);
      item.appendChild(el("span", "", "›"));
      item.addEventListener("click", function () { selectVersion(report, true); });
      recent.appendChild(item);
    });
    flowWrap.appendChild(recent);
    flowPanel.appendChild(flowWrap);
    mainGrid.appendChild(flowPanel);
    panel.appendChild(mainGrid);

    function paintFlow() {
      stepNodes.forEach(function (node, index) {
        node.dataset.state = index < flowIndex ? "done" : index === flowIndex ? "running" : "pending";
      });
      traceNodes.forEach(function (node, index) {
        node.dataset.state = index < flowIndex ? "done" : index === flowIndex ? "running" : "pending";
      });
      flowResult.hidden = flowIndex < monitorFlowStages.length;
      runButton.textContent = flowIndex >= monitorFlowStages.length ? "重新回放" : "执行中";
      runButton.disabled = flowIndex >= 0 && flowIndex < monitorFlowStages.length;
    }

    function runFlow() {
      window.clearTimeout(flowStartTimer);
      window.clearInterval(flowTimer);
      flowIndex = 0;
      paintFlow();
      flowTimer = window.setInterval(function () {
        flowIndex += 1;
        paintFlow();
        if (flowIndex >= monitorFlowStages.length) window.clearInterval(flowTimer);
      }, 850);
    }

    var judgementGrid = el("div", "intel-grid-2");
    var judgements = el("div", "intel-card-list");
    [
      ["报告版本", "联合演习事件触发增量更新", "m8.2"],
      ["技术定位", "由数据网格向联合 C2 支撑能力延伸", "定位增强"],
      ["能力变化", "多军种实时数据融合证据得到补充", "能力上调"],
      ["应用边界", "联合防空反导场景验证范围扩大", "边界扩展"]
    ].forEach(function (item) {
      var card = el("button", "intel-list-card"); card.type = "button";
      card.appendChild(el("span", "intel-kicker", item[0]));
      card.appendChild(el("strong", "", item[1]));
      card.appendChild(badge(item[2], "success"));
      card.addEventListener("click", function () { openMonitorReport(monitorReportVersions[17]); });
      judgements.appendChild(card);
    });
    judgementGrid.appendChild(section("当前差异化态势摘要", "当前版本 v_2026_m8.2 相对上一版 v_2026_m8.1。", judgements));
    var links = el("div", "intel-card-list");
    [
      { tab: "routes", title: "关键技术路线", note: "根据 v_2026_m8.2 标记受影响路线节点", state: "建议更新" },
      { tab: "gaps", title: "关键技术差距", note: "跨域集成证据充分度提升", state: "查看影响" }
    ].forEach(function (item) {
      var link = el("button", "intel-list-card"); link.type = "button";
      link.appendChild(el("strong", "", item.title));
      link.appendChild(el("p", "", item.note));
      link.appendChild(badge(item.state, item.tab === "routes" ? "warning" : "primary"));
      link.addEventListener("click", function () {
        var tab = document.getElementById("trend-tab-" + item.tab);
        if (tab) tab.click();
      });
      links.appendChild(link);
    });
    judgementGrid.appendChild(section("研判成果联动", "报告版本变化同步影响其他成果。", links));
    panel.appendChild(judgementGrid);
    panel.appendChild(el("div", "intel-disclaimer", "样例研判数据／公开资料研判，仅供分析参考"));
    mount.replaceChildren(panel);
    flowStartTimer = window.setTimeout(runFlow, 500);

    return function () {
      window.clearTimeout(flowStartTimer);
      window.clearInterval(flowTimer);
    };
  }

  function renderMonitor(mount) {
    var detailCleanup = null;

    function showList() {
      if (detailCleanup) detailCleanup();
      detailCleanup = null;
      setMonitorViewUrl("");
      paintList();
    }

    function showDetail() {
      if (detailCleanup) detailCleanup();
      setMonitorViewUrl("lattice");
      detailCleanup = renderLatticeDetail(mount, showList);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function paintList() {
    var panel = el("div", "intel-tab-panel");
    panel.appendChild(metrics([
      { label: "计划监测对象", value: data.dashboard_metrics[0].展示值 + " 项" },
      { label: "累计资料", value: data.dashboard_metrics[1].展示值 + " 条" },
      { label: "近 30 日事件", value: data.monitor_objects.reduce(function (sum, item) { return sum + item.近30日事件; }, 0) + " 条" },
      { label: "数据状态", value: "正常" }
    ]));

    var toolbar = el("div", "intel-toolbar");
    var filters = el("div", "intel-toolbar__group");
    var tableBody = el("tbody");
    var currentFilter = "all";
    [
      { id: "all", label: "已载入 " + data.monitor_objects.length },
      { id: "focus", label: "重点对象" },
      { id: "fast", label: "快速发展" }
    ].forEach(function (filter, index) {
      var control = el("button", "intel-filter", filter.label);
      control.type = "button";
      control.setAttribute("aria-pressed", index === 0 ? "true" : "false");
      control.addEventListener("click", function () {
        currentFilter = filter.id;
        filters.querySelectorAll("button").forEach(function (item) { item.setAttribute("aria-pressed", item === control ? "true" : "false"); });
        paintRows();
      });
      filters.appendChild(control);
    });
    toolbar.appendChild(filters);
    toolbar.appendChild(button("查看报告时间轴", "secondary", openReportTimeline));

    var tableWrap = el("div", "intel-table-wrap");
    var table = el("table", "intel-table");
    var head = el("thead");
    var headRow = el("tr");
    ["技术对象", "对象类型", "所属领域", "当前状态", "近 30 日事件", "活跃度", "最新变化", "研判详情"].forEach(function (label) {
      var th = el("th", "", label); th.scope = "col"; headRow.appendChild(th);
    });
    head.appendChild(headRow); table.appendChild(head); table.appendChild(tableBody); tableWrap.appendChild(table);

    function paintRows() {
      tableBody.replaceChildren();
      data.monitor_objects.filter(function (item) {
        if (currentFilter === "focus") return item.是否重点 === "是";
        if (currentFilter === "fast") return item.当前状态 === "快速发展";
        return true;
      }).forEach(function (object) {
        var row = el("tr");
        var isLattice = object.object_id === "T001";
        if (isLattice) {
          row.className = "intel-monitor-row--available";
          row.tabIndex = 0;
          row.setAttribute("aria-label", "进入 Lattice 持续监测详情");
          row.addEventListener("click", showDetail);
          row.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              showDetail();
            }
          });
        }
        var name = el("td");
        name.appendChild(el("span", "intel-table__title", isLattice ? "Lattice" : object.技术对象));
        name.appendChild(el("span", "intel-table__sub", object.object_id + (object.是否重点 === "是" ? " · 重点对象" : " · 常规对象")));
        row.appendChild(name);
        row.appendChild(el("td", "", object.对象类型));
        row.appendChild(el("td", "", object.所属领域));
        var state = el("td"); state.appendChild(badge(object.当前状态)); row.appendChild(state);
        row.appendChild(el("td", "", object.近30日事件 + " 条"));
        var scoreCell = el("td"); scoreCell.appendChild(score(object.活跃度)); row.appendChild(scoreCell);
        row.appendChild(el("td", "", object.最新变化));
        var action = el("td");
        var detail = el("button", "intel-link", isLattice ? "进入监测详情" : "查看摘要"); detail.type = "button";
        detail.addEventListener("click", function (event) {
          event.stopPropagation();
          if (isLattice) showDetail();
          else openObject(object);
        });
        action.appendChild(detail); row.appendChild(action); tableBody.appendChild(row);
      });
    }
    paintRows();
    panel.appendChild(section("技术对象列表", "当前数据包已形成 " + data.monitor_objects.length + " 项对象记录；点击 Lattice 进入完整持续监测界面。", tableWrap, toolbar));

    var lower = el("div", "intel-grid-2");
    var events = el("div", "intel-event-list");
    data.events.slice().sort(function (a, b) { return b.事件日期.localeCompare(a.事件日期); }).slice(0, 6).forEach(function (event) {
      var card = el("button", "intel-event"); card.type = "button";
      card.appendChild(el("span", "intel-event__date", event.事件日期 + " · " + event.事件类型));
      card.appendChild(el("strong", "", event.事件标题));
      card.appendChild(el("p", "", event.页面标签 + "｜" + event.技术对象));
      card.addEventListener("click", function () { openEvent(event); });
      events.appendChild(card);
    });
    lower.appendChild(section("最新事件", "按时间倒序汇总公开动态。", events));
    var reports = el("div", "intel-report-list");
    data.reports.forEach(function (report) {
      var card = el("button", "intel-report"); card.type = "button";
      card.appendChild(el("span", "intel-kicker", report.成果类型 + " · " + report.状态));
      card.appendChild(el("strong", "", report.成果名称));
      card.appendChild(el("p", "", report.核心结论摘要));
      card.addEventListener("click", function () { openReport(report); });
      reports.appendChild(card);
    });
    lower.appendChild(section("已形成成果", "点击查看摘要与下载本地报告。", reports));
    panel.appendChild(lower);
    mount.replaceChildren(panel);
    }

    if (new URLSearchParams(window.location.search).get("view") === "lattice") showDetail();
    else showList();
  }

  function renderTrends(mount) {
    var panel = el("div", "intel-tab-panel");
    panel.appendChild(metrics([
      { label: "分析时段", value: "2020—2026" },
      { label: "趋势维度", value: data.trend_lanes.length + " 条" },
      { label: "关联事件", value: data.events.length + " 条" },
      { label: "成果状态", value: "已形成" }
    ]));
    var overflow = el("div", "intel-overflow");
    var lanes = el("div", "intel-lanes");
    var detail = el("div", "intel-detail-panel");
    function selectLane(lane, buttonNode) {
      lanes.querySelectorAll("button").forEach(function (node) { node.setAttribute("aria-pressed", node === buttonNode ? "true" : "false"); });
      detail.replaceChildren();
      detail.appendChild(el("span", "intel-kicker", "趋势研判 · " + lane.趋势维度));
      detail.appendChild(el("h3", "", lane.当前判断));
      detail.appendChild(el("p", "", "由多个公开事件交叉支撑，点击证据编号查看来源与研判边界。"));
      var evidence = el("div", "intel-actions");
      lane.证据事件.split(";").forEach(function (id) {
        var event = findEvent(id);
        if (!event) return;
        var control = button(id, "secondary", function () { openEvent(event); });
        evidence.appendChild(control);
      });
      detail.appendChild(evidence);
    }
    data.trend_lanes.forEach(function (lane, index) {
      var row = el("button", "intel-lane"); row.type = "button";
      [lane.趋势维度, lane.阶段1, lane.阶段2, lane.阶段3, lane.阶段4, lane.当前判断].forEach(function (value) { row.appendChild(el("span", "", value)); });
      row.setAttribute("aria-pressed", index === 0 ? "true" : "false");
      row.addEventListener("click", function () { selectLane(lane, row); });
      lanes.appendChild(row);
    });
    overflow.appendChild(lanes);
    panel.appendChild(section("领域五条发展趋势", "横向表示技术演进阶段，点击泳道查看判断与证据。", overflow));
    panel.appendChild(detail);
    selectLane(data.trend_lanes[0], lanes.firstElementChild);
    var products = el("div", "intel-card-list");
    data.monitor_objects.slice(0, 5).forEach(function (object) {
      var card = el("button", "intel-list-card"); card.type = "button";
      card.appendChild(el("strong", "", object.技术对象));
      card.appendChild(el("p", "", object.所属领域 + " · " + object.最新变化));
      card.addEventListener("click", function () { openObject(object); });
      products.appendChild(card);
    });
    panel.appendChild(section("代表性技术与产品", "从领域趋势下钻到持续监测对象。", products));
    mount.replaceChildren(panel);
  }

  function renderRoutes(mount) {
    var panel = el("div", "intel-tab-panel");
    var chartConfig = data.route_chart || {};
    var palette = ["#2563eb", "#7c3aed", "#059669", "#ea580c", "#0891b2", "#db2777"];
    var routeNames = Array.from(new Set(data.route_evolution.map(function (item) { return item.技术路线; })));
    var routeDefinitions = (chartConfig.routes || []).slice();
    routeNames.forEach(function (name, index) {
      if (routeDefinitions.some(function (route) { return route.name === name; })) return;
      routeDefinitions.push({ id: "route-" + (index + 1), name: name, color: palette[index % palette.length], service: "围绕" + name + "形成持续演进能力。", technology: "根据节点技术和公开证据动态归纳。", maturity_dimension: "core-network" });
    });
    var stages = (chartConfig.maturity_stages || [
      { value: 1, label: "能力形成" },
      { value: 2, label: "工程验证" },
      { value: 3, label: "规模应用" },
      { value: 4, label: "体系融合" }
    ]).slice().sort(function (a, b) { return a.value - b.value; });
    var overrides = chartConfig.node_overrides || {};
    var relations = chartConfig.relations || [];
    var routeMap = {};
    routeDefinitions.forEach(function (route, index) {
      route.color = route.color || palette[index % palette.length];
      route.chartOffset = (index - ((routeDefinitions.length - 1) / 2)) * 10;
      routeMap[route.name] = route;
    });

    function parseTime(value) {
      var values = [];
      var matcher = /(20\d{2})(?:-(0[1-9]|1[0-2]))?/g;
      var match;
      while ((match = matcher.exec(String(value || "")))) values.push(Number(match[1]) + ((Number(match[2] || 1) - 1) / 12));
      if (!values.length) return 0;
      return values.reduce(function (sum, item) { return sum + item; }, 0) / values.length;
    }

    function formatTime(value) {
      var year = Math.floor(value);
      var month = Math.round((value - year) * 12) + 1;
      if (month > 12) { year += 1; month = 1; }
      return month === 1 ? String(year) : year + "-" + String(month).padStart(2, "0");
    }

    var nodes = data.route_evolution.map(function (node) {
      var route = routeMap[node.技术路线];
      var detail = overrides[node.route_id] || {};
      return Object.assign({}, node, detail, {
        route: route,
        timeValue: Number(detail.time_value || node.时间值) || parseTime(node.时间),
        maturityDimension: detail.maturity_dimension || route.maturity_dimension
      });
    });
    var minTime = Math.min.apply(null, nodes.map(function (node) { return node.timeValue; }));
    var maxTime = Math.max.apply(null, nodes.map(function (node) { return node.timeValue; }));
    if (minTime === maxTime) maxTime = minTime + 1;
    var minStage = Math.min.apply(null, stages.map(function (stage) { return stage.value; }));
    var maxStage = Math.max.apply(null, stages.map(function (stage) { return stage.value; }));
    if (minStage === maxStage) maxStage = minStage + 1;

    panel.appendChild(metrics([
      { label: "技术路线", value: routeDefinitions.length + " 条" },
      { label: "路线节点", value: data.route_evolution.length },
      { label: "跨路线关系", value: relations.length + " 组" },
      { label: "汇聚方向", value: "共同数据底座" }
    ]));

    var actions = el("div", "intel-route-actions");
    var relationToggle = button("隐藏跨路线关系", "secondary", toggleRelations);
    relationToggle.setAttribute("aria-pressed", "true");
    var playButton = button("播放技术演化", "primary", playEvolution);
    actions.appendChild(relationToggle);
    actions.appendChild(playButton);

    var workspace = el("div", "intel-route-workspace");
    var chartColumn = el("div", "intel-route-chart-column");
    var legend = el("div", "intel-route-legend");
    var viewport = el("div", "intel-route-svg-viewport");
    var svg = svgElement("svg", "intel-route-svg", { viewBox: "0 0 1080 520", role: "img", "aria-label": "关键技术路线演化折线图" });
    var defs = svgElement("defs");
    var marker = svgElement("marker", "", { id: "intel-route-arrow", viewBox: "0 0 10 10", refX: "8", refY: "5", markerWidth: "6", markerHeight: "6", orient: "auto-start-reverse" });
    marker.appendChild(svgElement("path", "", { d: "M 0 0 L 10 5 L 0 10 z", fill: "#64748b" }));
    defs.appendChild(marker);
    svg.appendChild(defs);
    var gridLayer = svgElement("g", "intel-route-grid");
    var relationLayer = svgElement("g", "intel-route-relations");
    var lineLayer = svgElement("g", "intel-route-lines");
    var pointLayer = svgElement("g", "intel-route-points");
    svg.appendChild(gridLayer);
    svg.appendChild(relationLayer);
    svg.appendChild(lineLayer);
    svg.appendChild(pointLayer);
    viewport.appendChild(svg);
    chartColumn.appendChild(legend);
    chartColumn.appendChild(viewport);
    var chartNote = el("p", "intel-route-chart-note", "实线表示同一路线演化；虚线仅展示当前节点的跨路线支撑关系。节点外圈表示证据较充分，脉冲节点为本期新增。");
    chartColumn.appendChild(chartNote);
    var detail = el("aside", "intel-route-detail intel-detail-panel");
    workspace.appendChild(chartColumn);
    workspace.appendChild(detail);

    var left = 116;
    var right = 42;
    var top = 42;
    var bottom = 62;
    var width = 1080;
    var height = 520;
    function xFor(node) { return left + ((node.timeValue - minTime) / (maxTime - minTime)) * (width - left - right); }
    function yFor(node) { return height - bottom - ((Number(node.阶段) - minStage) / (maxStage - minStage)) * (height - top - bottom) + node.route.chartOffset; }
    var pointCoordinates = {};
    nodes.forEach(function (node) { pointCoordinates[node.route_id] = { x: xFor(node), y: yFor(node), node: node }; });

    stages.forEach(function (stage) {
      var y = height - bottom - ((stage.value - minStage) / (maxStage - minStage)) * (height - top - bottom);
      gridLayer.appendChild(svgElement("line", "intel-route-grid__line", { x1: left, y1: y, x2: width - right, y2: y }));
      gridLayer.appendChild(svgElement("text", "intel-route-grid__label", { x: left - 14, y: y + 4, "text-anchor": "end" }, stage.label));
    });
    for (var tick = 0; tick < 5; tick += 1) {
      var tickValue = minTime + ((maxTime - minTime) * tick / 4);
      var tickX = left + ((width - left - right) * tick / 4);
      gridLayer.appendChild(svgElement("line", "intel-route-grid__tick", { x1: tickX, y1: top, x2: tickX, y2: height - bottom }));
      gridLayer.appendChild(svgElement("text", "intel-route-grid__time", { x: tickX, y: height - 26, "text-anchor": "middle" }, formatTime(tickValue)));
    }
    gridLayer.appendChild(svgElement("text", "intel-route-grid__axis-title", { x: 18, y: 24 }, "技术成熟阶段"));
    gridLayer.appendChild(svgElement("text", "intel-route-grid__axis-title", { x: width - right, y: height - 8, "text-anchor": "end" }, "时间"));

    var routeGroups = {};
    var activeRoutes = {};
    routeDefinitions.forEach(function (route) {
      activeRoutes[route.id] = true;
      var routeNodes = nodes.filter(function (node) { return node.route.id === route.id; }).sort(function (a, b) { return a.timeValue - b.timeValue; });
      if (!routeNodes.length) return;
      var group = svgElement("g", "intel-route-series");
      group.dataset.route = route.id;
      var pathData = routeNodes.map(function (node, index) { return (index ? "L" : "M") + xFor(node) + " " + yFor(node); }).join(" ");
      group.appendChild(svgElement("path", "intel-route-series__path", { d: pathData, fill: "none", stroke: route.color, "stroke-width": "4", "stroke-linecap": "round", "stroke-linejoin": "round" }));
      lineLayer.appendChild(group);
      routeGroups[route.id] = { line: group, points: [] };

      routeNodes.forEach(function (node) {
        var point = svgElement("g", "intel-route-point", { role: "button", tabindex: "0", "aria-label": node.技术路线 + "，" + node.节点名称 + "，" + node.时间 });
        point.dataset.node = node.route_id;
        point.dataset.route = route.id;
        point.setAttribute("transform", "translate(" + xFor(node) + " " + yFor(node) + ")");
        if (node.evidence_level === "高") point.appendChild(svgElement("circle", "intel-route-point__evidence", { r: "13", fill: "none", stroke: route.color }));
        if (node.is_new) point.appendChild(svgElement("circle", "intel-route-point__pulse", { r: "18", fill: "none", stroke: route.color }));
        point.appendChild(svgElement("circle", "intel-route-point__hit", { r: "20", fill: "transparent" }));
        point.appendChild(svgElement("circle", "intel-route-point__dot", { r: "7", fill: node.节点状态.indexOf("验证") >= 0 || node.阶段 >= 3 ? route.color : "#fff", stroke: route.color, "stroke-width": "4" }));
        point.appendChild(svgElement("text", "intel-route-point__time", { y: "-18", "text-anchor": "middle", fill: route.color }, node.时间));
        point.appendChild(svgElement("title", "", {}, node.节点名称 + "｜" + node.节点说明));
        point.addEventListener("click", function () { stopPlayback(); selectNode(node, point); });
        point.addEventListener("keydown", function (event) { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); stopPlayback(); selectNode(node, point); } });
        pointLayer.appendChild(point);
        routeGroups[route.id].points.push(point);
      });

      var control = el("button", "intel-route-legend__item");
      control.type = "button";
      control.setAttribute("aria-pressed", "true");
      var dot = el("i"); dot.style.background = route.color;
      control.appendChild(dot);
      control.appendChild(document.createTextNode(route.name));
      control.addEventListener("click", function () {
        var enabledCount = Object.keys(activeRoutes).filter(function (id) { return activeRoutes[id]; }).length;
        if (activeRoutes[route.id] && enabledCount === 1) return;
        activeRoutes[route.id] = !activeRoutes[route.id];
        control.setAttribute("aria-pressed", activeRoutes[route.id] ? "true" : "false");
        routeGroups[route.id].line.hidden = !activeRoutes[route.id];
        routeGroups[route.id].points.forEach(function (point) { point.hidden = !activeRoutes[route.id]; });
        drawRelations(selectedNode);
      });
      legend.appendChild(control);
    });

    var showRelations = true;
    var selectedNode = null;
    var playbackTimer = null;
    function setFocusInUrl(nodeId) {
      try {
        var url = new URL(window.location.href);
        url.searchParams.set("tab", "routes");
        url.searchParams.set("focus", nodeId);
        window.history.replaceState({}, "", url.href);
      } catch (error) { /* file:// 下仍保留交互。 */ }
    }

    function drawRelations(node) {
      relationLayer.replaceChildren();
      if (!showRelations || !node) return;
      relations.filter(function (relation) { return relation.source === node.route_id || relation.target === node.route_id; }).forEach(function (relation) {
        var source = pointCoordinates[relation.source];
        var target = pointCoordinates[relation.target];
        if (!source || !target || !activeRoutes[source.node.route.id] || !activeRoutes[target.node.route.id]) return;
        var middleX = (source.x + target.x) / 2;
        var curve = "M" + source.x + " " + source.y + " C" + middleX + " " + source.y + " " + middleX + " " + target.y + " " + target.x + " " + target.y;
        relationLayer.appendChild(svgElement("path", "intel-route-relation", { d: curve, fill: "none", stroke: "#64748b", "stroke-width": "2", "stroke-dasharray": "7 6", "marker-end": "url(#intel-route-arrow)" }));
        relationLayer.appendChild(svgElement("text", "intel-route-relation__label", { x: middleX, y: ((source.y + target.y) / 2) - 7, "text-anchor": "middle" }, relation.type));
      });
    }

    function maturityUrl(node) {
      var params = new URLSearchParams();
      params.set("tab", "maturity");
      params.set("target", chartConfig.target_id || "lattice-mesh");
      params.set("dimension", node.maturityDimension || "core-network");
      params.set("node", node.route_id);
      params.set("nodeTitle", node.节点名称);
      params.set("from", "routes");
      return "./lineage.html?" + params.toString();
    }

    function selectNode(node, control, persistFocus) {
      selectedNode = node;
      pointLayer.querySelectorAll(".intel-route-point").forEach(function (item) { item.classList.toggle("is-selected", item === control); });
      lineLayer.querySelectorAll(".intel-route-series").forEach(function (item) { item.classList.toggle("is-muted", item.dataset.route !== node.route.id); });
      var nodeRelations = relations.filter(function (relation) { return relation.source === node.route_id || relation.target === node.route_id; });
      detail.replaceChildren();
      detail.appendChild(el("span", "intel-kicker", node.技术路线 + " · " + node.时间));
      detail.appendChild(el("h3", "", node.节点名称));
      detail.appendChild(el("p", "", node.节点说明));
      var stageDefinition = stages.find(function (stage) { return stage.value === Number(node.阶段); }) || { label: "阶段 " + node.阶段 };
      var badges = el("div", "intel-route-detail__badges");
      badges.appendChild(badge(node.节点状态));
      badges.appendChild(badge("证据充分度 " + (node.evidence_level || "中高"), node.evidence_level === "高" ? "success" : "running"));
      badges.appendChild(badge(stageDefinition.label));
      detail.appendChild(badges);
      var progression = el("div", "intel-route-progression");
      [["功能服务", node.route.service], ["核心技术", node.route.technology], ["形成成果", node.节点说明]].forEach(function (entry, index) {
        var item = el("article", "intel-route-progression__item");
        item.appendChild(el("span", "", "0" + (index + 1) + " · " + entry[0]));
        item.appendChild(el("p", "", entry[1]));
        progression.appendChild(item);
      });
      detail.appendChild(progression);
      if (nodeRelations.length) {
        var relationList = el("div", "intel-route-detail__relations");
        relationList.appendChild(el("strong", "", "跨路线联系"));
        nodeRelations.forEach(function (relation) {
          var otherId = relation.source === node.route_id ? relation.target : relation.source;
          var other = pointCoordinates[otherId] && pointCoordinates[otherId].node;
          relationList.appendChild(el("p", "", relation.type + "｜" + (other ? other.节点名称 : otherId) + "：" + relation.description));
        });
        detail.appendChild(relationList);
      }
      var links = el("div", "intel-route-detail__actions");
      String(node.关联事件 || "").split(";").filter(Boolean).forEach(function (eventId) {
        var event = findEvent(eventId);
        if (event) links.appendChild(button("查看事件 " + eventId, "secondary", function () { openEvent(event); }));
      });
      var maturityLink = el("a", "button button--primary", "进入成熟度分析");
      maturityLink.href = maturityUrl(node);
      links.appendChild(maturityLink);
      detail.appendChild(links);
      detail.appendChild(el("small", "intel-route-detail__note", "进入成熟度页后将自动定位到“" + node.route.name + "”对应的能力维度，并保留返回当前节点的入口。"));
      drawRelations(node);
      if (persistFocus !== false) setFocusInUrl(node.route_id);
      window.setTimeout(function () {
        var targetLeft = (xFor(node) / width) * viewport.scrollWidth - (viewport.clientWidth / 2);
        viewport.scrollLeft = Math.max(0, targetLeft);
      }, 0);
    }

    function toggleRelations() {
      showRelations = !showRelations;
      relationToggle.setAttribute("aria-pressed", showRelations ? "true" : "false");
      relationToggle.textContent = showRelations ? "隐藏跨路线关系" : "显示跨路线关系";
      drawRelations(selectedNode);
    }

    function stopPlayback() {
      if (!playbackTimer) return;
      window.clearInterval(playbackTimer);
      playbackTimer = null;
      playButton.disabled = false;
      playButton.textContent = "重新播放";
    }

    function playEvolution() {
      stopPlayback();
      Object.keys(activeRoutes).forEach(function (id) { activeRoutes[id] = true; });
      legend.querySelectorAll("button").forEach(function (control) { control.setAttribute("aria-pressed", "true"); });
      Object.keys(routeGroups).forEach(function (id) { routeGroups[id].line.hidden = false; routeGroups[id].points.forEach(function (point) { point.hidden = false; }); });
      var ordered = nodes.slice().sort(function (a, b) { return a.timeValue - b.timeValue || a.阶段 - b.阶段; });
      var index = 0;
      playButton.disabled = true;
      playButton.textContent = "演化播放中 1 / " + ordered.length;
      var firstControl = pointLayer.querySelector('[data-node="' + ordered[0].route_id + '"]');
      selectNode(ordered[0], firstControl);
      playbackTimer = window.setInterval(function () {
        index += 1;
        if (index >= ordered.length) { stopPlayback(); return; }
        playButton.textContent = "演化播放中 " + (index + 1) + " / " + ordered.length;
        var control = pointLayer.querySelector('[data-node="' + ordered[index].route_id + '"]');
        selectNode(ordered[index], control);
      }, 720);
    }

    var routeSection = section("关键技术路线演化图", "横轴表示时间，纵轴表示成熟阶段；点击节点查看功能、技术、成果及成熟度分析。", workspace, actions);
    panel.appendChild(routeSection);
    var requestedFocus = new URLSearchParams(window.location.search).get("focus");
    var initialNode = nodes.find(function (node) { return node.route_id === requestedFocus; }) || nodes.find(function (node) { return node.route_id === "R015"; }) || nodes[0];
    var initialControl = pointLayer.querySelector('[data-node="' + initialNode.route_id + '"]');
    var routeTabRequested = (new URLSearchParams(window.location.search).get("tab") || "monitor") === "routes";
    if (initialNode && initialControl) selectNode(initialNode, initialControl, routeTabRequested);
    mount.replaceChildren(panel);
  }

  function renderGaps(mount) {
    var panel = el("div", "intel-tab-panel");
    var chartConfig = data.gap_chart || {};
    var details = chartConfig.details || {};
    var gaps = data.gap_analysis.map(function (gap) { return Object.assign({}, gap, details[gap.gap_id] || {}); });
    var largest = gaps.slice().sort(function (a, b) { return (b.Lattice演示评分 - b.对标对象演示评分) - (a.Lattice演示评分 - a.对标对象演示评分); });
    var highestPriority = gaps.find(function (item) { return item.priority === "最高"; }) || largest[0];
    var highestEvidence = gaps.find(function (item) { return item.证据充分度 === "高"; }) || largest[0];
    panel.appendChild(metrics([
      { label: "能力维度", value: gaps.length + " 项" },
      { label: "最大差值", value: "+" + (largest[0].Lattice演示评分 - largest[0].对标对象演示评分) },
      { label: "最高优先级", value: gaps.filter(function (item) { return item.priority === "最高"; }).length + " 项" },
      { label: "可关联项目", value: Array.from(new Set([].concat.apply([], gaps.map(function (item) { return (item.projects || []).map(function (project) { return project.id; }); })))).length + " 个" }
    ]));

    var sectionActions = el("div", "intel-gap-actions");
    var targetToggle = button("显示开源补强目标", "secondary", toggleTarget);
    targetToggle.setAttribute("aria-pressed", "false");
    sectionActions.appendChild(targetToggle);
    var board = el("div", "intel-gap-board intel-gap-board--interactive");
    var radarPanel = el("div", "intel-radar-panel");
    var radarLegend = el("div", "intel-radar-legend");
    [["#2563eb", chartConfig.benchmark_label || "Lattice能力表现"], ["#f97316", chartConfig.current_label || "当前方案"], ["#16a34a", chartConfig.target_label || "开源补强目标", "target"]].forEach(function (entry) {
      var item = el("span", "intel-radar-legend__item" + (entry[2] ? " is-target" : ""));
      item.appendChild(el("i")); item.firstElementChild.style.background = entry[0];
      item.appendChild(document.createTextNode(entry[1]));
      if (entry[2]) { item.hidden = true; item.style.display = "none"; }
      radarLegend.appendChild(item);
    });
    radarPanel.appendChild(radarLegend);
    var radarSvg = svgElement("svg", "intel-radar-svg", { viewBox: "0 0 560 500", role: "img", "aria-label": gaps.length + "项能力对标雷达图" });
    var centerX = 280;
    var centerY = 245;
    var radius = 165;
    function radarPoint(index, value) {
      var angle = (-Math.PI / 2) + (Math.PI * 2 * index / gaps.length);
      var scale = Math.max(0, Math.min(Number(chartConfig.score_max || 100), Number(value) || 0)) / Number(chartConfig.score_max || 100);
      return { x: centerX + Math.cos(angle) * radius * scale, y: centerY + Math.sin(angle) * radius * scale, angle: angle };
    }
    function polygonPoints(values) { return values.map(function (value, index) { var point = radarPoint(index, value); return point.x + "," + point.y; }).join(" "); }
    for (var ring = 1; ring <= 5; ring += 1) {
      radarSvg.appendChild(svgElement("polygon", "intel-radar-svg__ring", { points: polygonPoints(gaps.map(function () { return ring * 20; })) }));
    }
    var axisGroups = [];
    gaps.forEach(function (gap, index) {
      var edge = radarPoint(index, 100);
      var labelPoint = radarPoint(index, 118);
      var axis = svgElement("g", "intel-radar-axis", { role: "button", tabindex: "0", "aria-label": "查看" + gap.能力维度 + "差距" });
      axis.dataset.gap = gap.gap_id;
      axis.appendChild(svgElement("line", "intel-radar-axis__line", { x1: centerX, y1: centerY, x2: edge.x, y2: edge.y }));
      var anchor = Math.cos(labelPoint.angle) > 0.28 ? "start" : (Math.cos(labelPoint.angle) < -0.28 ? "end" : "middle");
      axis.appendChild(svgElement("text", "intel-radar-axis__label", { x: labelPoint.x, y: labelPoint.y + 4, "text-anchor": anchor }, gap.short_label || gap.能力维度));
      axis.addEventListener("click", function () { selectGap(gap, axis); });
      axis.addEventListener("keydown", function (event) { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); selectGap(gap, axis); } });
      radarSvg.appendChild(axis);
      axisGroups.push(axis);
    });
    var benchmarkPolygon = svgElement("polygon", "intel-radar-series intel-radar-series--benchmark", { points: polygonPoints(gaps.map(function (gap) { return gap.Lattice演示评分; })) });
    var currentPolygon = svgElement("polygon", "intel-radar-series intel-radar-series--current", { points: polygonPoints(gaps.map(function (gap) { return gap.对标对象演示评分; })) });
    var targetPolygon = svgElement("polygon", "intel-radar-series intel-radar-series--target", { points: polygonPoints(gaps.map(function (gap) { return gap.target_score || gap.对标对象演示评分; })) });
    targetPolygon.style.display = "none";
    radarSvg.appendChild(benchmarkPolygon);
    radarSvg.appendChild(currentPolygon);
    radarSvg.appendChild(targetPolygon);
    var targetPoints = [];
    gaps.forEach(function (gap, index) {
      [[gap.Lattice演示评分, "benchmark"], [gap.对标对象演示评分, "current"], [gap.target_score || gap.对标对象演示评分, "target"]].forEach(function (series) {
        var pointValue = radarPoint(index, series[0]);
        var point = svgElement("circle", "intel-radar-point intel-radar-point--" + series[1], { cx: pointValue.x, cy: pointValue.y, r: series[1] === "current" ? "6" : "5", tabindex: series[1] === "current" ? "0" : "-1", role: series[1] === "current" ? "button" : "presentation" });
        point.dataset.gap = gap.gap_id;
        if (series[1] === "target") { point.style.display = "none"; targetPoints.push(point); }
        if (series[1] === "current") {
          point.setAttribute("aria-label", gap.能力维度 + "，当前方案" + series[0] + "分");
          point.addEventListener("click", function () { selectGap(gap, axisGroups[index]); });
          point.addEventListener("keydown", function (event) { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); selectGap(gap, axisGroups[index]); } });
        }
        point.appendChild(svgElement("title", "", {}, gap.能力维度 + "｜" + series[0] + "分"));
        radarSvg.appendChild(point);
      });
    });
    radarPanel.appendChild(radarSvg);
    radarPanel.appendChild(el("p", "intel-radar-note", "点击轴名称、橙色评分点或右侧排行，可查看差距原因、补强路径和验证目标。"));
    board.appendChild(radarPanel);

    var right = el("div", "intel-gap-side");
    right.appendChild(el("h3", "intel-gap-side__title", "差距优先级排行"));
    var gapList = el("div", "intel-gap-list");
    var detail = el("div", "intel-detail-panel");
    function selectGap(gap, control) {
      gapList.querySelectorAll("button").forEach(function (item) { item.setAttribute("aria-pressed", item === control ? "true" : "false"); });
      gapList.querySelectorAll("button").forEach(function (item) { item.setAttribute("aria-pressed", item.dataset.gap === gap.gap_id ? "true" : "false"); });
      axisGroups.forEach(function (axis) { axis.classList.toggle("is-selected", axis.dataset.gap === gap.gap_id); });
      radarSvg.querySelectorAll(".intel-radar-point").forEach(function (point) { point.classList.toggle("is-selected", point.dataset.gap === gap.gap_id); });
      tableBody.querySelectorAll("tr").forEach(function (row) { row.classList.toggle("is-selected", row.dataset.gap === gap.gap_id); });
      detail.replaceChildren();
      detail.appendChild(el("span", "intel-kicker", "优先级 " + (gap.priority || formalText(gap.差距级别)) + " · 证据充分度 " + gap.证据充分度));
      detail.appendChild(el("h3", "", gap.能力维度));
      var scoreGrid = el("div", "intel-gap-score-grid");
      [["对标表现", gap.Lattice演示评分, "blue"], ["当前方案", gap.对标对象演示评分, "orange"], ["补强目标", gap.target_score || "—", "green"], ["当前差值", "+" + (gap.Lattice演示评分 - gap.对标对象演示评分), "red"]].forEach(function (entry) {
        var card = el("div", "intel-gap-score intel-gap-score--" + entry[2]);
        card.appendChild(el("span", "", entry[0])); card.appendChild(el("strong", "", entry[1])); scoreGrid.appendChild(card);
      });
      detail.appendChild(scoreGrid);
      var analysis = el("div", "intel-gap-analysis");
      [["影响判断", gap.impact || gap.关键依据], ["差距原因", gap.cause || gap.关键依据], ["技术补强路径", gap.path || gap.建议关注方向], ["验证目标", gap.validation || gap.建议关注方向]].forEach(function (entry) {
        var item = el("article"); item.appendChild(el("strong", "", entry[0])); item.appendChild(el("p", "", entry[1])); analysis.appendChild(item);
      });
      detail.appendChild(analysis);
      var links = el("div", "intel-gap-links");
      if ((gap.route_nodes || []).length) {
        var routeGroup = el("div"); routeGroup.appendChild(el("strong", "", "关联路线节点"));
        var routeLinks = el("div");
        gap.route_nodes.forEach(function (nodeId) {
          var node = data.route_evolution.find(function (item) { return item.route_id === nodeId; });
          if (!node) return;
          var link = el("a", "button button--secondary", node.节点名称); link.href = "./trends.html?tab=routes&focus=" + encodeURIComponent(nodeId); routeLinks.appendChild(link);
        });
        routeGroup.appendChild(routeLinks); links.appendChild(routeGroup);
      }
      if ((gap.projects || []).length) {
        var projectGroup = el("div"); projectGroup.appendChild(el("strong", "", "可复用开源项目"));
        var projectLinks = el("div");
        gap.projects.forEach(function (project) {
          var link = el("a", "button button--secondary", project.name); link.href = "./restoration.html?tab=opensource&project=" + encodeURIComponent(project.id); projectLinks.appendChild(link);
        });
        projectGroup.appendChild(projectLinks); links.appendChild(projectGroup);
      }
      detail.appendChild(links);
      detail.appendChild(el("p", "intel-gap-evidence", "关键依据：" + gap.关键依据 + " · 数据属性：" + formalText(gap.数据属性)));
    }
    largest.forEach(function (gap, index) {
      var control = el("button", "intel-gap"); control.type = "button";
      control.dataset.gap = gap.gap_id;
      control.appendChild(el("span", "intel-gap__rank", String(index + 1).padStart(2, "0")));
      var copy = el("span", "intel-gap__copy");
      copy.appendChild(el("strong", "", gap.能力维度));
      copy.appendChild(el("small", "", "差值 +" + (gap.Lattice演示评分 - gap.对标对象演示评分) + " · 优先级 " + (gap.priority || formalText(gap.差距级别))));
      control.appendChild(copy);
      control.setAttribute("aria-pressed", index === 0 ? "true" : "false");
      control.addEventListener("click", function () { selectGap(gap, axisGroups[gaps.indexOf(gap)]); });
      gapList.appendChild(control);
    });
    right.appendChild(gapList); right.appendChild(detail); board.appendChild(right);
    panel.appendChild(section("能力雷达与差距矩阵", "真实绘制对标与当前方案评分；补强目标来自开源项目映射后的样例研判。", board, sectionActions));

    var insightGrid = el("div", "intel-gap-insights");
    [["最大差距", largest[0].能力维度, "+" + (largest[0].Lattice演示评分 - largest[0].对标对象演示评分)], ["优先补强", highestPriority.能力维度, highestPriority.priority || formalText(highestPriority.差距级别)], ["证据最充分", highestEvidence.能力维度, highestEvidence.证据充分度 + "充分度"]].forEach(function (entry) {
      var card = el("article", "intel-gap-insight"); card.appendChild(el("span", "", entry[0])); card.appendChild(el("strong", "", entry[1])); card.appendChild(el("small", "", entry[2])); insightGrid.appendChild(card);
    });
    panel.appendChild(insightGrid);

    var tableWrap = el("div", "intel-table-wrap");
    var table = el("table", "intel-table");
    table.innerHTML = "<thead><tr><th>能力维度</th><th>对标表现</th><th>当前方案</th><th>补强目标</th><th>差值</th><th>优先级</th><th>证据充分度</th></tr></thead>";
    var body = el("tbody");
    var tableBody = body;
    gaps.forEach(function (gap) {
      var row = el("tr"); row.dataset.gap = gap.gap_id; row.tabIndex = 0;
      [gap.能力维度, gap.Lattice演示评分, gap.对标对象演示评分, gap.target_score || "—", "+" + (gap.Lattice演示评分 - gap.对标对象演示评分), gap.priority || formalText(gap.差距级别), gap.证据充分度].forEach(function (value, index) {
        var cell = el("td");
        if (index === 5) cell.appendChild(badge(value)); else cell.textContent = value;
        row.appendChild(cell);
      });
      row.addEventListener("click", function () { selectGap(gap, axisGroups[gaps.indexOf(gap)]); });
      row.addEventListener("keydown", function (event) { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); selectGap(gap, axisGroups[gaps.indexOf(gap)]); } });
      body.appendChild(row);
    });
    table.appendChild(body); tableWrap.appendChild(table);
    panel.appendChild(section(gaps.length + "项能力差距明细", "点击任一行可与雷达图及详情卡同步定位。评分为样例研判，不构成正式技术评价。", tableWrap));

    var showTarget = false;
    function toggleTarget() {
      showTarget = !showTarget;
      targetPolygon.style.display = showTarget ? "" : "none";
      targetPoints.forEach(function (point) { point.style.display = showTarget ? "" : "none"; });
      radarLegend.querySelectorAll(".is-target").forEach(function (item) { item.hidden = !showTarget; item.style.display = showTarget ? "inline-flex" : "none"; });
      targetToggle.setAttribute("aria-pressed", showTarget ? "true" : "false");
      targetToggle.textContent = showTarget ? "隐藏开源补强目标" : "显示开源补强目标";
    }

    selectGap(largest[0], axisGroups[gaps.indexOf(largest[0])]);
    mount.replaceChildren(panel);
  }

  function render(tabId, mountId) {
    var mount = typeof mountId === "string" ? document.getElementById(mountId) : mountId;
    if (!mount) return;
    if (tabId === "monitor") renderMonitor(mount);
    else if (tabId === "trends") renderTrends(mount);
    else if (tabId === "routes") renderRoutes(mount);
    else renderGaps(mount);
  }

  window.PlatformModules = window.PlatformModules || {};
  window.PlatformModules.trendAnalysis = { render: render };
}());
