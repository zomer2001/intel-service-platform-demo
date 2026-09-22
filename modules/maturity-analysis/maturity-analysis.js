(function () {
  "use strict";

  var components = window.PlatformComponents;
  var state = null;

  function element(tagName, className, text) {
    return components.element(tagName, className, text);
  }

  function sourceMap(data) {
    return data.sources.reduce(function (result, source) {
      result[source.id] = source;
      return result;
    }, {});
  }

  function validateData(data) {
    if (!data || !data.target || !data.summary) throw new Error("成熟度分析缺少目标或摘要数据。 ");
    if (!data.report || !Array.isArray(data.report.highlights) || !Array.isArray(data.report.sourceIds)) throw new Error("成熟度分析缺少完整报告数据。 ");
    if (!Array.isArray(data.dimensions) || data.dimensions.length !== 7) throw new Error("成熟度分析必须包含 7 个评价维度。 ");
    if (!Array.isArray(data.trlEvidenceChain) || data.trlEvidenceChain.length !== 6) throw new Error("成熟度证据链必须包含 6 个分组阶段。 ");
    if (data.trlEvidenceChain.filter(function (row) { return row.interactive; }).length !== 1) throw new Error("成熟度分析只能配置 1 个重点交互阶段。 ");
    data.dimensions.forEach(function (dimension) {
      if (dimension.trlMin < 1 || dimension.trlMax > 9 || dimension.trlMin > dimension.trlMax) {
        throw new Error("成熟度维度的 TRL 范围无效：" + dimension.name);
      }
    });
  }

  function renderContext(data) {
    var context = element("dl", "ma-context");
    [
      ["当前专题", data.target.topic],
      ["研究对象", data.target.object],
      ["评价方法", data.target.method],
      ["评价性质", data.target.nature]
    ].forEach(function (item) {
      var block = element("div", "ma-context__item");
      block.appendChild(element("dt", "", item[0]));
      block.appendChild(element("dd", "", item[1]));
      context.appendChild(block);
    });
    return context;
  }

  function summaryCard(kicker, value, detail, modifier) {
    var card = element("article", "ma-summary-card " + modifier);
    card.appendChild(element("p", "ma-summary-card__kicker", kicker));
    card.appendChild(element("p", "ma-summary-card__value", value));
    card.appendChild(element("p", "ma-summary-card__detail", detail));
    return card;
  }

  function renderSummary(data) {
    var grid = element("section", "ma-summary-grid");
    grid.setAttribute("aria-label", "综合成熟度结论");
    grid.appendChild(summaryCard("主评级能力", data.summary.primaryCapability, "当前公开资料支撑的核心能力判断", "ma-summary-card--primary"));
    grid.appendChild(summaryCard("主评级结论", data.summary.rating, "基于当前公开证据的综合判断", "ma-summary-card--rating"));
    grid.appendChild(summaryCard("评价说明", data.summary.dimensionCount + " 个能力维度", data.summary.evidenceBasis + " · 非官方 TRL 认证", "ma-summary-card--method"));
    return grid;
  }

  function ratingLabel(dimension) {
    var label = dimension.trlMin === dimension.trlMax ? "TRL " + dimension.trlMax : "TRL " + dimension.trlMin + "–" + dimension.trlMax;
    return dimension.status === "validating" ? label + "（验证中）" : label;
  }

  var relatedGap = { "core-network": "G001", "resilient-network": "G002", deployment: "G005", security: "G007", scale: "G005", ecosystem: "G006" };

  function studyLink(label, tab, gap) {
    var link = element("a", "ma-study-link", label);
    var current = new URLSearchParams(window.location.search);
    var url = new URL("./trends.html", window.location.href);
    url.searchParams.set("tab", tab);
    url.searchParams.set("object", "lattice");
    url.searchParams.set("tech", "lattice-mesh");
    if (gap) url.searchParams.set("gap", gap);
    if (current.get("route")) url.searchParams.set("route", current.get("route"));
    link.href = url.href;
    return link;
  }

  function renderResearchActions() {
    var card = element("section", "ma-card ma-study-actions");
    var copy = element("div");
    copy.appendChild(element("h2", "", "从成熟度研判转向能力对标"));
    copy.appendChild(element("p", "", "本报告评估 Lattice Mesh 的公开证据成熟度；后续差距分析使用当前方案样例基线，不是实际测评，百分制样例评分也不等同于 TRL。"));
    card.appendChild(copy);
    var actions = element("div", "ma-study-buttons");
    actions.appendChild(studyLink("返回关键技术路线演化", "routes"));
    actions.appendChild(studyLink("对比当前方案：弱网与断连运行", "gaps", "G002"));
    actions.appendChild(studyLink("对比当前方案：数据标准化", "gaps", "G003"));
    actions.appendChild(studyLink("查看全部关键技术差距", "gaps"));
    card.appendChild(actions);
    return card;
  }

  function renderAxis() {
    var axis = element("div", "ma-axis");
    axis.appendChild(element("span", "ma-axis__label", "能力维度"));
    var ticks = element("div", "ma-axis__ticks");
    for (var index = 1; index <= 9; index += 1) ticks.appendChild(element("span", "", "TRL " + index));
    axis.appendChild(ticks);
    axis.appendChild(element("span", "ma-axis__result", "当前定位"));
    return axis;
  }

  function renderDimension(dimension) {
    var row = element("div", "ma-dimension");
    var name = element("div", "ma-dimension__name");
    var labelLine = element("div", "ma-dimension__label-line");
    labelLine.appendChild(element("strong", "", dimension.name));
    if (dimension.primary) labelLine.appendChild(element("span", "ma-primary-badge", "主评级"));
    name.appendChild(labelLine);
    name.appendChild(element("span", "ma-dimension__note", dimension.note));
    name.appendChild(studyLink(relatedGap[dimension.id] ? "对标相关能力 →" : "查看能力对标维度 →", "gaps", relatedGap[dimension.id]));

    var track = element("div", "ma-dimension__track");
    var fill = element("span", "ma-dimension__fill ma-dimension__fill--" + dimension.status);
    fill.style.width = (dimension.trlMax / 9 * 100) + "%";
    track.appendChild(fill);
    if (dimension.trlMin !== dimension.trlMax) {
      var range = element("span", "ma-dimension__range ma-dimension__range--" + dimension.status);
      range.style.left = ((dimension.trlMin - 1) / 9 * 100) + "%";
      range.style.width = ((dimension.trlMax - dimension.trlMin + 1) / 9 * 100) + "%";
      track.appendChild(range);
    }
    for (var index = 1; index <= 9; index += 1) track.appendChild(element("i", "ma-dimension__gridline"));

    row.appendChild(name);
    row.appendChild(track);
    row.appendChild(element("strong", "ma-dimension__rating ma-dimension__rating--" + dimension.status, ratingLabel(dimension)));
    return row;
  }

  function legendItem(className, label) {
    var item = element("span", "ma-legend__item");
    item.appendChild(element("i", "ma-legend__dot " + className));
    item.appendChild(document.createTextNode(label));
    return item;
  }

  function renderChart(data) {
    var card = element("section", "ma-card ma-chart-card");
    var header = element("header", "ma-section-header");
    var title = element("div");
    title.appendChild(element("p", "ma-section-header__eyebrow", "MATURITY POSITIONING"));
    title.appendChild(element("h2", "", "分维度 TRL 评级定位"));
    title.appendChild(element("p", "ma-section-header__description", "成熟度按能力维度分别研判，区间定位表示公开证据对相邻等级的支撑仍存在边界。"));
    var legend = element("div", "ma-legend");
    legend.appendChild(legendItem("is-operational", "实际部署 / 定型"));
    legend.appendChild(legendItem("is-transition", "定型过渡"));
    legend.appendChild(legendItem("is-ecosystem", "生态集成"));
    legend.appendChild(legendItem("is-validating", "验证中"));
    header.appendChild(title);
    header.appendChild(legend);
    card.appendChild(header);
    card.appendChild(renderAxis());
    data.dimensions.forEach(function (dimension) { card.appendChild(renderDimension(dimension)); });
    return card;
  }

  function sourceLinks(sourceIds, sources, className) {
    var links = element("div", className || "ma-report__inline-sources");
    (sourceIds || []).forEach(function (sourceId) {
      var source = sources[sourceId];
      if (!source) return;
      var link = element("a", "ma-report__source-link", source.title + " ↗");
      link.href = source.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      links.appendChild(link);
    });
    return links;
  }

  function renderReportSummary(data) {
    var report = data.report;
    var sources = sourceMap(data);
    var card = element("section", "ma-card ma-report-summary");
    var header = element("header", "ma-section-header ma-section-header--compact");
    var title = element("div");
    var meta = element("div", "ma-report-summary__meta");
    title.appendChild(element("p", "ma-section-header__eyebrow", "ANALYSIS REPORT"));
    title.appendChild(element("h2", "", "分析报告"));
    title.appendChild(element("p", "ma-section-header__description", "基于公开证据形成的技术成熟度综合研判，完整报告提供判断依据、风险边界和来源追溯。"));
    meta.appendChild(element("span", "ma-report-summary__status", "综合研判"));
    meta.appendChild(element("time", "", "更新于 " + report.updatedAt));
    header.appendChild(title);
    header.appendChild(meta);
    card.appendChild(header);
    card.appendChild(element("p", "ma-report-summary__abstract", report.abstract));

    var highlights = element("div", "ma-report-summary__grid");
    report.highlights.forEach(function (highlight) {
      var item = element("article", "ma-report-summary__item");
      item.appendChild(relationTag(data, highlight.type));
      item.appendChild(element("h3", "", highlight.title));
      item.appendChild(element("p", "", highlight.detail));
      item.appendChild(sourceLinks(highlight.sourceIds, sources, "ma-report-summary__sources"));
      highlights.appendChild(item);
    });
    card.appendChild(highlights);

    var footer = element("footer", "ma-report-summary__footer");
    var note = element("div");
    var button = element("button", "ma-report-button", "查看完整分析报告");
    note.appendChild(element("strong", "", "当前结论：" + data.summary.rating + " · 置信度 " + report.confidence));
    note.appendChild(element("span", "", "仍有 " + report.risks.length + " 项风险与关键未知项需要持续跟踪。"));
    button.type = "button";
    button.addEventListener("click", function () { openReportDrawer(button); });
    footer.appendChild(note);
    footer.appendChild(button);
    card.appendChild(footer);
    card.appendChild(renderResearchActions());
    return card;
  }

  function relationTag(data, relation) {
    return element("span", "ma-relation ma-relation--" + relation, data.relationLabels[relation]);
  }

  function renderEvidenceChain(data) {
    var card = element("section", "ma-card ma-chain-card");
    var header = element("header", "ma-section-header ma-section-header--compact");
    var title = element("div");
    title.appendChild(element("p", "ma-section-header__eyebrow", "EVIDENCE CHAIN"));
    title.appendChild(element("h2", "", "核心组网与分布式数据连接能力 — TRL 演进证据链"));
    title.appendChild(element("p", "ma-section-header__description", "分组展示从原理线索、相关环境验证到真实任务运行的公开证据演进。"));
    header.appendChild(title);
    card.appendChild(header);

    var viewport = element("div", "ma-table-viewport");
    var table = element("table", "ma-table");
    var thead = element("thead");
    var headRow = element("tr");
    ["TRL 阶段", "评级判据摘要", "Lattice Mesh 对应公开证据 / 工程映射", "证据性质", "判定"].forEach(function (label) {
      headRow.appendChild(element("th", "", label));
    });
    thead.appendChild(headRow);
    table.appendChild(thead);
    var tbody = element("tbody");
    data.trlEvidenceChain.forEach(function (entry) {
      var row = element("tr", entry.interactive ? "ma-table__featured-row" : "");
      var stage = element("td");
      stage.appendChild(element("strong", "ma-table__stage", entry.stage));
      var criterion = element("td", "", entry.criterion);
      var evidence = element("td", "ma-table__evidence", entry.evidence);
      var relation = element("td");
      relation.appendChild(relationTag(data, entry.evidenceRelation));
      var decision = element("td");
      decision.appendChild(element("strong", entry.interactive ? "ma-decision ma-decision--primary" : "ma-decision", entry.decision));
      if (entry.interactive) {
        var button = element("button", "ma-detail-button", "查看评级依据");
        button.type = "button";
        button.addEventListener("click", function () { openDrawer(button); });
        decision.appendChild(button);
      }
      row.appendChild(stage);
      row.appendChild(criterion);
      row.appendChild(evidence);
      row.appendChild(relation);
      row.appendChild(decision);
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    viewport.appendChild(table);
    card.appendChild(viewport);
    card.appendChild(element("p", "ma-footnote", "评级说明：TRL 结果基于截至当前已获取公开资料进行情报分析研判；当新的部署、测试、合同或官方资料进入后，系统可重新计算各能力维度的成熟度定位。"));
    return card;
  }

  function fact(label, value) {
    var row = element("div", "ma-drawer__fact");
    row.appendChild(element("dt", "", label));
    row.appendChild(element("dd", "", value));
    return row;
  }

  function evidenceCard(data, evidence, sources) {
    var card = element("article", "ma-drawer__evidence-card");
    var heading = element("div", "ma-drawer__evidence-heading");
    heading.appendChild(element("h4", "", evidence.title));
    heading.appendChild(element("time", "", evidence.date));
    card.appendChild(heading);
    card.appendChild(element("p", "", evidence.support));
    var links = element("div", "ma-drawer__source-list");
    evidence.sourceIds.forEach(function (sourceId) {
      var source = sources[sourceId];
      if (!source) return;
      var link = element("a", "ma-drawer__source-link", source.title + " ↗");
      link.href = source.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", "打开原始来源：" + source.title);
      links.appendChild(link);
    });
    card.appendChild(links);
    return card;
  }

  function evidenceGroup(data, relation, title, sources) {
    var section = element("section", "ma-drawer__section");
    var heading = element("div", "ma-drawer__section-heading");
    heading.appendChild(element("h3", "", title));
    heading.appendChild(relationTag(data, relation));
    section.appendChild(heading);
    data.evidence.filter(function (item) { return item.evidenceRelation === relation; }).forEach(function (item) {
      section.appendChild(evidenceCard(data, item, sources));
    });
    return section;
  }

  function reportSection(title, description) {
    var section = element("section", "ma-report__section");
    section.appendChild(element("h3", "", title));
    if (description) section.appendChild(element("p", "ma-report__section-intro", description));
    return section;
  }

  function mountDrawer(trigger, drawer, closeButton, ariaLabel) {
    closeDrawer(false);
    var host = document.getElementById("overlay-host");
    if (!host) return;
    var backdrop = element("div", "ma-drawer-backdrop");
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");
    drawer.setAttribute("aria-label", ariaLabel);
    backdrop.appendChild(drawer);
    backdrop.addEventListener("click", function (event) {
      if (event.target === backdrop) closeDrawer(true);
    });

    state.returnFocus = trigger;
    state.backdrop = backdrop;
    state.keyHandler = function (event) {
      if (event.key === "Escape") {
        closeDrawer(true);
        return;
      }
      if (event.key !== "Tab") return;
      var focusable = drawer.querySelectorAll("button:not([disabled]), a[href]");
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !drawer.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !drawer.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", state.keyHandler);
    host.replaceChildren(backdrop);
    document.body.classList.add("has-ma-drawer");
    closeButton.focus();
  }

  function openReportDrawer(trigger) {
    if (!state) return;
    var data = state.data;
    var report = data.report;
    var sources = sourceMap(data);
    var dimensions = data.dimensions.reduce(function (result, dimension) {
      result[dimension.id] = dimension;
      return result;
    }, {});
    var drawer = element("aside", "ma-drawer ma-drawer--report");
    var header = element("header", "ma-drawer__header");
    var heading = element("div");
    var closeButton = element("button", "ma-drawer__close", "×");
    var body = element("div", "ma-drawer__body ma-report");
    var facts = element("dl", "ma-drawer__facts ma-report__facts");

    heading.appendChild(element("p", "ma-drawer__kicker", "OPEN-SOURCE MATURITY REPORT"));
    heading.appendChild(element("h2", "", report.title));
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "关闭完整分析报告");
    closeButton.addEventListener("click", function () { closeDrawer(true); });
    header.appendChild(heading);
    header.appendChild(closeButton);
    facts.appendChild(fact("综合评级", data.summary.rating));
    facts.appendChild(fact("报告置信度", report.confidence));
    facts.appendChild(fact("更新时间", report.updatedAt));
    body.appendChild(facts);

    body.appendChild(renderResearchActions());

    var executive = reportSection("执行摘要");
    report.executiveSummary.forEach(function (paragraph) { executive.appendChild(element("p", "", paragraph)); });
    body.appendChild(executive);

    var judgments = reportSection("核心结论", "结论由多项公开证据综合形成，标签表示证据与判断的关系，而非官方认证属性。");
    var judgmentGrid = element("div", "ma-report__judgment-grid");
    report.keyJudgments.forEach(function (judgment) {
      var card = element("article", "ma-report__judgment");
      card.appendChild(relationTag(data, judgment.type));
      card.appendChild(element("h4", "", judgment.title));
      card.appendChild(element("p", "", judgment.detail));
      card.appendChild(sourceLinks(judgment.sourceIds, sources));
      judgmentGrid.appendChild(card);
    });
    judgments.appendChild(judgmentGrid);
    body.appendChild(judgments);

    var dimensionSection = reportSection("分维度成熟度研判");
    var dimensionList = element("div", "ma-report__dimension-list");
    report.dimensionAnalysis.forEach(function (analysis) {
      var dimension = dimensions[analysis.dimensionId];
      if (!dimension) return;
      var row = element("article", "ma-report__dimension");
      var label = element("div", "ma-report__dimension-label");
      label.appendChild(element("strong", "", dimension.name));
      label.appendChild(element("span", "ma-dimension__rating ma-dimension__rating--" + dimension.status, ratingLabel(dimension)));
      row.appendChild(label);
      row.appendChild(element("p", "", analysis.conclusion));
      row.appendChild(sourceLinks(analysis.sourceIds, sources));
      dimensionList.appendChild(row);
    });
    dimensionSection.appendChild(dimensionList);
    body.appendChild(dimensionSection);

    var evolution = reportSection("技术成熟度演进", "从原理形成、真实任务运行到生产部署和部队体系集成的关键演进节点。");
    var timeline = element("div", "ma-report__timeline");
    report.evolution.forEach(function (entry) {
      var item = element("article", "ma-report__timeline-item");
      item.appendChild(element("time", "", entry.period));
      item.appendChild(element("h4", "", entry.stage));
      item.appendChild(element("p", "", entry.assessment));
      item.appendChild(sourceLinks(entry.sourceIds, sources));
      timeline.appendChild(item);
    });
    evolution.appendChild(timeline);
    body.appendChild(evolution);

    var risks = reportSection("风险与关键未知项", "以下事项不否定当前主评级，但会影响具体部署边界与专项应用判断。");
    var riskGrid = element("div", "ma-report__risk-grid");
    report.risks.forEach(function (risk) {
      var card = element("article", "ma-report__risk");
      card.appendChild(relationTag(data, risk.type));
      card.appendChild(element("h4", "", risk.title));
      card.appendChild(element("p", "", risk.detail));
      riskGrid.appendChild(card);
    });
    risks.appendChild(riskGrid);
    body.appendChild(risks);

    var sourceSection = reportSection("资料来源", "点击来源标题可打开原始公开资料。企业公告、政府材料、技术文档和专利证据在报告中按性质分别使用。");
    var sourceList = element("div", "ma-report__source-list");
    report.sourceIds.forEach(function (sourceId, index) {
      var source = sources[sourceId];
      if (!source) return;
      var item = element("article", "ma-report__source");
      item.appendChild(element("span", "ma-report__source-index", String(index + 1).padStart(2, "0")));
      var copy = element("div");
      var link = element("a", "", source.title + " ↗");
      link.href = source.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      copy.appendChild(link);
      copy.appendChild(element("p", "", source.publisher + " · " + source.publishedAt));
      item.appendChild(copy);
      sourceList.appendChild(item);
    });
    sourceSection.appendChild(sourceList);
    body.appendChild(sourceSection);

    drawer.appendChild(header);
    drawer.appendChild(body);
    mountDrawer(trigger, drawer, closeButton, "Lattice Mesh 技术成熟度综合分析报告");
  }

  function openDrawer(trigger) {
    if (!state) return;
    var data = state.data;
    var sources = sourceMap(data);
    var drawer = element("aside", "ma-drawer");
    var header = element("header", "ma-drawer__header");
    var heading = element("div");
    var closeButton = element("button", "ma-drawer__close", "×");
    var body = element("div", "ma-drawer__body");
    var facts = element("dl", "ma-drawer__facts");
    var criterion = element("section", "ma-drawer__section ma-drawer__criterion");
    var explanation = element("section", "ma-drawer__section ma-drawer__explanation");

    heading.appendChild(element("p", "ma-drawer__kicker", "OPEN-SOURCE TRL ASSESSMENT"));
    heading.appendChild(element("h2", "", "TRL 9 评级依据"));
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "关闭 TRL 9 评级依据");
    closeButton.addEventListener("click", function () { closeDrawer(true); });
    header.appendChild(heading);
    header.appendChild(closeButton);

    facts.appendChild(fact("主评级能力", data.summary.primaryCapability));
    facts.appendChild(fact("当前判定", data.summary.rating));
    facts.appendChild(fact("评价性质", "基于公开资料研判"));
    criterion.appendChild(element("h3", "", "评级判据"));
    criterion.appendChild(element("p", "", "实际最终系统在真实任务条件下完成运行，并由持续部署或项目化使用证明其有效性。"));
    explanation.appendChild(element("h3", "", "评级说明"));
    explanation.appendChild(element("p", "", "当前结论主要由实际任务部署和持续运行证据支撑；体系内其他 Lattice 能力和装备部署仅作为成熟生态与平台兼容性的辅助佐证。"));
    body.appendChild(facts);
    body.appendChild(criterion);
    body.appendChild(evidenceGroup(data, "direct", "直接实证", sources));
    body.appendChild(evidenceGroup(data, "system_support", "体系关联佐证", sources));
    body.appendChild(explanation);
    drawer.appendChild(header);
    drawer.appendChild(body);
    mountDrawer(trigger, drawer, closeButton, "TRL 9 评级依据");
  }

  function closeDrawer(restoreFocus) {
    if (!state || !state.backdrop) return;
    if (state.keyHandler) document.removeEventListener("keydown", state.keyHandler);
    if (state.backdrop.parentNode) state.backdrop.remove();
    document.body.classList.remove("has-ma-drawer");
    var returnFocus = state.returnFocus;
    state.backdrop = null;
    state.keyHandler = null;
    state.returnFocus = null;
    if (restoreFocus && returnFocus && returnFocus.isConnected) returnFocus.focus();
  }

  function render(containerId) {
    destroy();
    var mount = document.getElementById(containerId);
    if (!mount) throw new Error("成熟度分析缺少挂载节点：" + containerId);
    var data = window.MATURITY_ANALYSIS_DATA;
    validateData(data);
    var root = element("div", "ma-root");
    var disclaimer = element("aside", "ma-disclaimer");
    disclaimer.appendChild(element("span", "ma-disclaimer__mark", "i"));
    disclaimer.appendChild(element("p", "", data.summary.disclaimer));
    root.appendChild(renderContext(data));
    root.appendChild(disclaimer);
    root.appendChild(renderSummary(data));
    root.appendChild(renderChart(data));
    root.appendChild(renderReportSummary(data));
    root.appendChild(renderEvidenceChain(data));
    mount.replaceChildren(root);
    state = { mount: mount, data: data, backdrop: null, keyHandler: null, returnFocus: null };
  }

  function destroy() {
    if (!state) return;
    closeDrawer(false);
    if (state.mount) state.mount.replaceChildren();
    state = null;
  }

  window.PlatformModules = window.PlatformModules || {};
  window.PlatformModules.maturityAnalysis = {
    render: render,
    destroy: destroy,
    closeDrawer: closeDrawer,
    getCounts: function () {
      var data = window.MATURITY_ANALYSIS_DATA;
      return { dimensions: data.dimensions.length, chainRows: data.trlEvidenceChain.length, interactiveRows: data.trlEvidenceChain.filter(function (row) { return row.interactive; }).length };
    }
  };
}());
