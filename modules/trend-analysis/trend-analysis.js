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
    panel.appendChild(metrics([
      { label: "技术路线", value: "4 条" },
      { label: "路线节点", value: data.route_evolution.length },
      { label: "演化时段", value: "2024—2026" },
      { label: "汇聚方向", value: "共同数据底座" }
    ]));
    var overflow = el("div", "intel-overflow");
    var board = el("div", "intel-route-board");
    var detail = el("div", "intel-detail-panel");
    var routeNames = Array.from(new Set(data.route_evolution.map(function (item) { return item.技术路线; })));
    function selectNode(node, control) {
      board.querySelectorAll("button").forEach(function (item) { item.setAttribute("aria-pressed", item === control ? "true" : "false"); });
      detail.replaceChildren();
      detail.appendChild(el("span", "intel-kicker", node.技术路线 + " · " + node.时间));
      detail.appendChild(el("h3", "", node.节点名称));
      detail.appendChild(el("p", "", node.节点说明));
      detail.appendChild(badge(node.节点状态));
      var event = findEvent(node.关联事件);
      if (event) detail.appendChild(button("查看关联事件 " + node.关联事件, "secondary", function () { openEvent(event); }));
    }
    routeNames.forEach(function (routeName) {
      var row = el("div", "intel-route");
      row.appendChild(el("div", "intel-route__name", routeName));
      data.route_evolution.filter(function (item) { return item.技术路线 === routeName; }).sort(function (a, b) { return a.阶段 - b.阶段; }).forEach(function (node) {
        var control = el("button", "intel-route__node"); control.type = "button";
        control.appendChild(el("time", "", node.时间));
        control.appendChild(el("strong", "", node.节点名称));
        control.appendChild(el("small", "", node.节点状态));
        control.setAttribute("aria-pressed", "false");
        control.addEventListener("click", function () { selectNode(node, control); });
        row.appendChild(control);
      });
      board.appendChild(row);
    });
    overflow.appendChild(board);
    panel.appendChild(section("关键技术路线演化图", "网络、数据、边缘计算和开放集成四条路线持续汇聚；点击节点查看依据。", overflow));
    panel.appendChild(detail);
    var first = board.querySelector("button");
    if (first) selectNode(data.route_evolution[0], first);
    mount.replaceChildren(panel);
  }

  function renderGaps(mount) {
    var panel = el("div", "intel-tab-panel");
    panel.appendChild(metrics([
      { label: "能力维度", value: data.gap_analysis.length + " 项" },
      { label: "重点差距", value: data.gap_analysis.filter(function (item) { return item.差距级别 === "很大"; }).length + " 项" },
      { label: "高充分度证据", value: data.gap_analysis.filter(function (item) { return item.证据充分度 === "高"; }).length + " 项" },
      { label: "分析状态", value: "已形成" }
    ]));
    var board = el("div", "intel-gap-board");
    var radar = el("div", "intel-radar");
    radar.setAttribute("role", "img");
    radar.setAttribute("aria-label", "七项能力对标雷达示意图");
    [1, 2, 3].forEach(function () { radar.appendChild(el("i", "intel-radar__ring")); });
    radar.appendChild(el("i", "intel-radar__core"));
    board.appendChild(radar);
    var right = el("div");
    var gapList = el("div", "intel-gap-list");
    var detail = el("div", "intel-detail-panel");
    function selectGap(gap, control) {
      gapList.querySelectorAll("button").forEach(function (item) { item.setAttribute("aria-pressed", item === control ? "true" : "false"); });
      detail.replaceChildren();
      detail.appendChild(el("span", "intel-kicker", formalText(gap.差距级别) + " · 证据充分度 " + gap.证据充分度));
      detail.appendChild(el("h3", "", gap.能力维度));
      detail.appendChild(el("p", "", "Lattice 样例评分 " + gap.Lattice演示评分 + "；当前方案样例评分 " + gap.对标对象演示评分 + "。"));
      detail.appendChild(el("p", "", "关键依据：" + gap.关键依据));
      detail.appendChild(el("p", "", "建议关注：" + gap.建议关注方向));
    }
    data.gap_analysis.forEach(function (gap, index) {
      var control = el("button", "intel-gap"); control.type = "button";
      control.appendChild(el("strong", "", gap.能力维度));
      control.appendChild(el("small", "", "差值 +" + (gap.Lattice演示评分 - gap.对标对象演示评分) + " · " + formalText(gap.差距级别)));
      control.setAttribute("aria-pressed", index === 0 ? "true" : "false");
      control.addEventListener("click", function () { selectGap(gap, control); });
      gapList.appendChild(control);
    });
    right.appendChild(gapList); right.appendChild(detail); board.appendChild(right);
    panel.appendChild(section("能力雷达与差距矩阵", "评分用于呈现分析方法，不构成对任何真实机构或方案的正式技术评价。", board));
    selectGap(data.gap_analysis[0], gapList.firstElementChild);

    var tableWrap = el("div", "intel-table-wrap");
    var table = el("table", "intel-table");
    table.innerHTML = "<thead><tr><th>能力维度</th><th>Lattice</th><th>当前方案</th><th>差值</th><th>差距级别</th><th>证据充分度</th><th>建议关注方向</th></tr></thead>";
    var body = el("tbody");
    data.gap_analysis.forEach(function (gap) {
      var row = el("tr");
      [gap.能力维度, gap.Lattice演示评分, gap.对标对象演示评分, "+" + (gap.Lattice演示评分 - gap.对标对象演示评分), formalText(gap.差距级别), gap.证据充分度, gap.建议关注方向].forEach(function (value, index) {
        var cell = el("td");
        if (index === 4) cell.appendChild(badge(value)); else cell.textContent = value;
        row.appendChild(cell);
      });
      body.appendChild(row);
    });
    table.appendChild(body); tableWrap.appendChild(table);
    panel.appendChild(section("七项能力差距明细", "样例研判数据／公开资料研判，仅供分析参考。", tableWrap));
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
