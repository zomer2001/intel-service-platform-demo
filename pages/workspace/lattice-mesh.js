(function () {
  "use strict";

  var data = window.LATTICE_MESH_ANALYSIS_DATA;
  var fromLattice = new URLSearchParams(window.location.search).get("from") === "lattice";
  var shell = window.renderPlatform({
    projectTitle: "Lattice Mesh 技术还原与辅助破解",
    analysisLevel: "技术还原",
    currentObject: "Lattice Mesh",
    taskStatus: "待启动",
    activeNavigation: "技术辅助还原与破解",
    logoPath: "../../assets/brand/vernal-institute-logo.png",
    enterpriseHref: "./enterprise.html",
    lineageHref: "../applications/lineage.html"
  });

  var meshState = {
    started: false,
    running: false,
    currentStage: -1,
    viewingStage: -1,
    completedStages: [],
    autoFollow: true,
    stageTimer: null,
    stageRevealLevels: [],
    stageRevealTimers: [],
    stageJustRevealed: []
  };
  var refs = {};
  var revealPlans = [
    {
      events: ["读取对象与分析基准", "分解技术还原目标", "校验已知事实与等级", "固化结论边界"],
      groups: [".en-fact", ".mesh-goal", ".mesh-fact, .mesh-grade-legend__item", ".mesh-boundary-alert"]
    },
    {
      events: ["汇入首批多源证据", "补全代表性技术材料", "计算证据域覆盖", "形成证据汇聚结论"],
      groups: [".mesh-evidence-card:nth-child(-n+3)", ".mesh-evidence-card:nth-child(n+4)", ".mesh-coverage__row", ".en-stage-note"]
    },
    {
      events: ["识别上层应用边界", "还原三类核心能力域", "展开工程能力节点", "收敛技术体系判断"],
      groups: [".mesh-system-map__band[data-tone='top']", ".mesh-system-map__domain, .mesh-system-map__band:not([data-tone='top'])", ".mesh-domain-card", ".en-stage-note"]
    },
    {
      events: ["抽取首批解释缺口", "补全技术阻断点", "排序缺口优先级", "确定本轮重点未知"],
      groups: [".mesh-gap:nth-child(-n+3)", ".mesh-gap:nth-child(n+4)", ".stage-reveal-never", ".mesh-selected-gap, .en-stage-note"]
    },
    {
      events: ["生成首批候选机制", "补全备选技术解释", "建立双平面对照模型", "确定重点候选机制"],
      groups: [".mesh-hypothesis:nth-child(-n+2)", ".mesh-hypothesis:nth-child(n+3)", ".mesh-plane-model, .mesh-compare-wrap", ".en-stage-note"]
    },
    {
      events: ["建立候选证据对照维度", "比较首批关键证据", "完成全部证据筛选", "生成候选机制结论"],
      groups: [".mesh-compare thead", ".mesh-compare tbody tr:nth-child(-n+2)", ".mesh-compare tbody tr:nth-child(n+3)", ".mesh-candidate-decision, .mesh-boundary-alert"]
    },
    {
      events: ["生成工程近似建议", "组装混合节点任务", "完善验证指标与边界", "固化仿真验证方案"],
      groups: [".mesh-engineering", ".mesh-verification-note", ".mesh-node, .mesh-check-group", ".en-stage-note"]
    },
    {
      events: ["生成首批还原结论", "补全证据与推断边界", "归档最终成果对象", "发布技术还原成果"],
      groups: [".mesh-result:nth-child(-n+2)", ".mesh-result:nth-child(n+3)", ".mesh-artifact", ".mesh-verification-note, .mesh-final-actions"]
    }
  ];

  function element(tagName, className, text) {
    var node = document.createElement(tagName);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = String(text);
    return node;
  }

  function createButton(label, className, onClick) {
    var button = element("button", className, label);
    button.type = "button";
    button.addEventListener("click", onClick);
    return button;
  }

  function createList(items, className) {
    var list = element("ul", className || "en-simple-list");
    items.forEach(function (item) { list.appendChild(element("li", "", item)); });
    return list;
  }

  function createTags(items) {
    var tags = element("div", "en-tags");
    items.forEach(function (item) { tags.appendChild(element("span", "en-tag", item)); });
    return tags;
  }

  function createPanel(title, body, className) {
    var panel = element("section", "en-panel" + (className ? " " + className : ""));
    panel.appendChild(element("h3", "en-panel__title", title));
    panel.appendChild(body);
    return panel;
  }

  function createGrade(value, title) {
    var grade = element("span", "mesh-grade", title || value);
    grade.dataset.grade = value;
    return grade;
  }

  function createStageFrame(index, body) {
    var stage = data.stages[index];
    var view = element("section", "en-stage-view");
    var header = element("header", "en-stage-view__header");
    var title = element("div");
    title.appendChild(element("p", "en-stage-view__kicker", "TECHNICAL RECONSTRUCTION"));
    title.appendChild(element("h2", "en-stage-view__title", stage.title));
    header.appendChild(title);
    if (meshState.running && meshState.currentStage === index) {
      header.appendChild(element("span", "en-stage-view__live", "正在执行"));
    } else if (meshState.completedStages.indexOf(index) !== -1) {
      header.appendChild(element("span", "en-page-header__state", "已完成"));
    }
    view.appendChild(header);
    view.appendChild(body);
    return view;
  }

  function clearStageRevealTimers(index) {
    (meshState.stageRevealTimers[index] || []).forEach(function (timer) { window.clearTimeout(timer); });
    meshState.stageRevealTimers[index] = [];
  }

  function scheduleStageReveals(index) {
    var duration = data.stages[index].duration;
    var offsets = [0.18, 0.40, 0.63, 0.84];
    clearStageRevealTimers(index);
    meshState.stageRevealLevels[index] = 0;
    meshState.stageJustRevealed[index] = -1;
    meshState.stageRevealTimers[index] = offsets.map(function (ratio, offsetIndex) {
      return window.setTimeout(function () {
        if (!meshState.running || meshState.currentStage !== index || meshState.completedStages.indexOf(index) !== -1) return;
        meshState.stageRevealLevels[index] = offsetIndex + 1;
        meshState.stageJustRevealed[index] = offsetIndex + 1;
        if (meshState.viewingStage === index) renderStageArea();
      }, Math.round(duration * ratio));
    });
  }

  function applyStageReveal(view, index) {
    var completed = meshState.completedStages.indexOf(index) !== -1;
    var plan = revealPlans[index];
    if (completed || !plan) return view;
    var body = view.children[1];
    var level = meshState.stageRevealLevels[index] || 0;
    var justRevealed = meshState.stageJustRevealed[index];
    var status = element("section", "stage-reveal-status");
    var statusHead = element("div", "stage-reveal-status__head");
    var eventList = element("div", "stage-reveal-status__events");
    statusHead.appendChild(element("span", "stage-reveal-status__pulse"));
    statusHead.appendChild(element("strong", "", level < plan.events.length ? "正在" + plan.events[level] + "……" : "阶段结果已生成，等待流程切换"));
    status.appendChild(statusHead);
    plan.events.forEach(function (label, eventIndex) {
      var event = element("span", "stage-reveal-status__event", label);
      event.dataset.state = eventIndex < level ? "completed" : eventIndex === level && level < plan.events.length ? "running" : "pending";
      eventList.appendChild(event);
    });
    status.appendChild(eventList);
    if (level === 0) {
      var skeleton = element("div", "stage-reveal-skeleton");
      skeleton.appendChild(element("span", "stage-reveal-skeleton__line"));
      skeleton.appendChild(element("span", "stage-reveal-skeleton__line"));
      skeleton.appendChild(element("span", "stage-reveal-skeleton__line"));
      status.appendChild(skeleton);
    }
    view.insertBefore(status, body);
    body.hidden = level === 0;
    body.classList.add("stage-reveal-content");
    plan.groups.forEach(function (selector, groupIndex) {
      body.querySelectorAll(selector).forEach(function (node) {
        var revealLevel = groupIndex + 1;
        node.hidden = revealLevel > level;
        if (!node.hidden && justRevealed === revealLevel) node.classList.add("stage-reveal-enter");
      });
    });
    meshState.stageJustRevealed[index] = -1;
    return view;
  }

  function createPage() {
    var page = element("div", "en-page mesh-page");
    var header = element("header", "en-page-header");
    var titleGroup = element("div");
    var headerState = element("span", "en-page-header__state", "待启动");
    var taskSummary = element("section", "lt-task-summary mesh-task-summary");
    var source = element("div", "lt-task-summary__source");
    var questions = element("div", "lt-task-summary__goals");
    var action = element("div", "lt-task-summary__action");
    var facts = element("div", "lt-task-summary__facts");
    var boundaries = element("div", "mesh-task-summary__boundary");
    var progress = element("section", "en-stage-progress mesh-stage-progress");
    var context = element("section", "en-run-context");
    var stageHost = element("div", "en-stage-host");
    var startButton = createButton("开始技术还原", "lt-task-summary__start", startAnalysis);

    page.dataset.started = "false";
    refs.page = page;
    refs.headerState = headerState;
    refs.startButton = startButton;
    refs.progress = progress;
    refs.context = context;
    refs.stageHost = stageHost;

    titleGroup.appendChild(element("h1", "en-page-header__title", data.task.name));
    titleGroup.appendChild(element("p", "en-page-header__description", data.task.description));
    header.appendChild(titleGroup);
    header.appendChild(headerState);

    var sourceTitle = element("p", "lt-task-summary__eyebrow", "父任务与生成依据");
    if (fromLattice) sourceTitle.appendChild(element("span", "lt-source-badge", "来源已确认"));
    source.appendChild(sourceTitle);
    source.appendChild(element("h2", "lt-task-summary__title", "已生成的技术还原任务"));
    [
      ["父任务", data.parentTask.name],
      ["父任务结论", data.parentTask.conclusion],
      ["对象定位", data.parentTask.objectPosition],
      ["任务生成依据", data.parentTask.generationBasis]
    ].forEach(function (entry) {
      var fact = element("div", "lt-task-summary__fact");
      fact.appendChild(element("span", "lt-task-summary__label", entry[0]));
      fact.appendChild(element("span", "lt-task-summary__value", entry[1]));
      facts.appendChild(fact);
    });
    source.appendChild(facts);

    questions.appendChild(element("p", "lt-task-summary__eyebrow", "本层研究问题"));
    questions.appendChild(createList(data.task.questions, "lt-task-summary__goals-list"));
    [
      ["向上支撑", data.parentTask.upperBoundary.join(" / ")],
      ["向下连接", data.parentTask.lowerBoundary.join(" / ")]
    ].forEach(function (entry) {
      var block = element("div", "mesh-task-summary__boundary-block");
      block.appendChild(element("span", "mesh-task-summary__boundary-label", entry[0]));
      block.appendChild(element("span", "mesh-task-summary__boundary-value", entry[1]));
      boundaries.appendChild(block);
    });
    questions.appendChild(boundaries);
    action.appendChild(startButton);
    taskSummary.appendChild(source);
    taskSummary.appendChild(questions);
    taskSummary.appendChild(action);
    context.hidden = true;

    data.stages.forEach(function (stage, index) {
      var stageButton = createButton("", "en-stage", function () { viewStage(index); });
      stageButton.dataset.number = String(index + 1);
      stageButton.dataset.status = "pending";
      stageButton.dataset.viewing = "false";
      stageButton.setAttribute("aria-label", stage.title + "，未执行");
      stageButton.appendChild(element("span", "en-stage__label", stage.label));
      stageButton.appendChild(element("span", "en-stage__status", "未执行"));
      progress.appendChild(stageButton);
    });

    page.appendChild(header);
    page.appendChild(taskSummary);
    page.appendChild(progress);
    page.appendChild(context);
    page.appendChild(stageHost);
    shell.workspace.appendChild(page);
    renderStageArea();
  }

  function updateTopbar(completed) {
    var topbar = shell.shell.querySelector(".topbar");
    if (!topbar) return;
    topbar.querySelector(".topbar__project").textContent = data.task.name;
    topbar.querySelector(".topbar__level").textContent = "技术还原";
    topbar.querySelector(".topbar__object").textContent = "当前对象：" + data.task.object;
    topbar.querySelector(".topbar__status").textContent = "任务状态：" + (completed ? "还原完成" : meshState.running ? "还原中" : "待启动");
  }

  function startAnalysis() {
    if (meshState.started) return;
    meshState.started = true;
    meshState.running = true;
    meshState.currentStage = 0;
    meshState.viewingStage = 0;
    meshState.completedStages = [];
    meshState.autoFollow = true;
    refs.page.dataset.started = "true";
    refs.startButton.disabled = true;
    refs.startButton.textContent = "技术还原运行中";
    refs.headerState.textContent = "还原中";
    refs.headerState.dataset.state = "running";
    updateTopbar(false);
    runStage(0);
  }

  function runStage(index) {
    meshState.currentStage = index;
    if (meshState.autoFollow) meshState.viewingStage = index;
    scheduleStageReveals(index);
    updateInterface();
    meshState.stageTimer = window.setTimeout(function () { completeStage(index); }, data.stages[index].duration);
  }

  function completeStage(index) {
    clearStageRevealTimers(index);
    meshState.stageRevealLevels[index] = revealPlans[index].events.length;
    if (meshState.completedStages.indexOf(index) === -1) meshState.completedStages.push(index);
    if (index < data.stages.length - 1) {
      runStage(index + 1);
      return;
    }
    meshState.running = false;
    refs.startButton.textContent = "技术还原已完成";
    refs.headerState.textContent = "技术还原已完成";
    refs.headerState.dataset.state = "completed";
    if (meshState.autoFollow) meshState.viewingStage = index;
    updateTopbar(true);
    updateInterface();
  }

  function viewStage(index) {
    meshState.viewingStage = index;
    meshState.autoFollow = meshState.running && index === meshState.currentStage;
    updateInterface();
  }

  function returnToCurrent() {
    if (meshState.currentStage < 0) return;
    meshState.autoFollow = true;
    meshState.viewingStage = meshState.currentStage;
    updateInterface();
  }

  function updateProgress() {
    refs.progress.querySelectorAll(".en-stage").forEach(function (button, index) {
      var status = "pending";
      var text = "未执行";
      if (meshState.completedStages.indexOf(index) !== -1) {
        status = "completed";
        text = "已完成";
      } else if (meshState.running && meshState.currentStage === index) {
        status = "running";
        text = "正在执行";
      }
      var viewing = meshState.viewingStage === index;
      if (viewing && !meshState.autoFollow) text = "当前查看";
      button.dataset.status = status;
      button.dataset.viewing = viewing ? "true" : "false";
      button.querySelector(".en-stage__status").textContent = text;
      button.setAttribute("aria-label", data.stages[index].title + "，" + text);
    });
  }

  function updateContext() {
    var historyView = meshState.running && !meshState.autoFollow;
    refs.context.hidden = !historyView;
    refs.context.replaceChildren();
    if (!historyView) return;
    refs.context.appendChild(element("p", "en-run-context__text", "当前任务正在执行：" + data.stages[meshState.currentStage].title));
    refs.context.appendChild(createButton("返回当前执行", "en-run-context__return", returnToCurrent));
  }

  function renderIntro() {
    var intro = element("section", "en-intro");
    intro.appendChild(element("div", "en-intro__mark", "Ⅲ"));
    intro.appendChild(element("h2", "en-intro__title", "技术还原任务已加载"));
    intro.appendChild(element("p", "en-intro__text", "任务来自 Lattice 平台级专项分析，当前保持待启动。点击一次“开始技术还原”后，系统将按既定时长自动执行八个阶段。"));
    return intro;
  }

  function renderEmptyStage(index) {
    var empty = element("section", "en-stage-empty");
    empty.appendChild(element("div", "en-stage-empty__mark", String(index + 1)));
    empty.appendChild(element("h2", "en-stage-empty__title", "该阶段尚未执行"));
    empty.appendChild(element("p", "en-stage-empty__text", "系统将按照当前技术还原流程自动进入该阶段。"));
    return empty;
  }

  function renderDefinition() {
    var body = element("div");
    var info = element("div", "en-facts");
    var goals = element("div", "mesh-goal-grid");
    var facts = element("div", "mesh-fact-grid");
    var legend = element("div", "mesh-grade-legend");
    [
      ["目标对象", data.task.object],
      ["对象类型", data.boundaries.objectType],
      ["上位平台", data.boundaries.upperPlatform],
      ["分析基准", data.boundaries.baseline]
    ].forEach(function (entry) {
      var row = element("div", "en-fact");
      row.appendChild(element("span", "en-fact__label", entry[0]));
      row.appendChild(element("p", "en-fact__value", entry[1]));
      info.appendChild(row);
    });
    data.restorationGoals.forEach(function (item) {
      var card = element("article", "mesh-goal");
      card.appendChild(element("h4", "mesh-goal__title", item.title));
      card.appendChild(element("p", "mesh-goal__text", item.description));
      goals.appendChild(card);
    });
    data.knownFacts.forEach(function (text) { facts.appendChild(element("div", "mesh-fact", text)); });
    data.boundaries.grades.forEach(function (item) {
      var card = element("div", "mesh-grade-legend__item");
      var text = element("div", "mesh-grade-legend__text");
      card.appendChild(createGrade(item.grade));
      text.appendChild(element("strong", "", item.label));
      text.appendChild(element("span", "", item.description));
      card.appendChild(text);
      legend.appendChild(card);
    });
    body.appendChild(createPanel("对象信息与分析基准", info));
    body.appendChild(createPanel("还原目标", goals));
    body.lastChild.style.marginTop = "9px";
    body.appendChild(createPanel("当前已知事实", facts));
    body.lastChild.style.marginTop = "9px";
    var alert = element("div", "mesh-boundary-alert");
    alert.appendChild(element("strong", "", data.boundaries.constraint));
    alert.appendChild(element("p", "", "后续所有结论均保留证据等级和不确定性，工程近似方案不得反写为官方事实。"));
    body.appendChild(alert);
    alert.style.marginTop = "9px";
    body.appendChild(createPanel("证据与结论等级", legend));
    body.lastChild.style.marginTop = "9px";
    return createStageFrame(0, body);
  }

  function renderEvidence() {
    var body = element("div");
    var layout = element("div", "mesh-evidence-layout");
    var cards = element("div", "mesh-evidence-list");
    var coverage = element("div", "mesh-coverage");
    data.sources.slice(0, 6).forEach(function (item) {
      var card = element("article", "mesh-evidence-card");
      var text = element("div");
      card.appendChild(createGrade(item.grade.charAt(0), item.grade.charAt(0)));
      text.appendChild(element("h4", "mesh-evidence-card__title", item.title));
      text.appendChild(element("p", "mesh-evidence-card__supports", item.supports));
      card.appendChild(text);
      card.appendChild(createButton("查看证据", "mesh-evidence-card__button", function () { window.openEvidence(item.id); }));
      cards.appendChild(card);
    });
    data.evidenceCoverage.forEach(function (item) {
      var row = element("div", "mesh-coverage__row");
      row.appendChild(element("span", "mesh-coverage__domain", item.domain));
      row.appendChild(element("span", "mesh-coverage__status", item.status));
      row.appendChild(createGrade(item.grade));
      coverage.appendChild(row);
    });
    layout.appendChild(createPanel("代表性多源证据", cards));
    layout.appendChild(createPanel("证据覆盖矩阵", coverage));
    body.appendChild(layout);
    body.appendChild(element("p", "en-stage-note", "证据汇聚已区分官方确认、公开技术线索与关联材料；内部接口和算法仍保留为关键未知。"));
    return createStageFrame(1, body);
  }

  function renderSystem() {
    var body = element("div");
    var map = element("div", "mesh-system-map");
    var domains = element("div", "mesh-system-map__domains");
    var cards = element("div", "mesh-domain-grid");
    var top = element("div", "mesh-system-map__band");
    top.dataset.tone = "top";
    top.appendChild(element("strong", "", "Lattice Applications"));
    top.appendChild(element("span", "", "C2 / Mission Autonomy / Integrations"));
    map.appendChild(top);
    [data.capabilityDomains[0], data.capabilityDomains[1], data.capabilityDomains[2]].forEach(function (item) {
      var domain = element("div", "mesh-system-map__domain");
      domain.appendChild(element("strong", "", item.name));
      domain.appendChild(element("span", "", item.cn));
      domains.appendChild(domain);
    });
    map.appendChild(domains);
    var cross = element("div", "mesh-system-map__band");
    cross.appendChild(element("strong", "", "Security / Identity · Observability / Diagnostics · Simulation / Verification"));
    cross.appendChild(element("span", "", "身份与安全横向约束，可观测与验证提供工程保障"));
    map.appendChild(cross);
    var bottom = element("div", "mesh-system-map__band");
    bottom.dataset.tone = "bottom";
    bottom.appendChild(element("strong", "", "Heterogeneous Bearers"));
    bottom.appendChild(element("span", "", "Tactical RF / SATCOM / MANET / 5G / Wi-Fi / Ethernet"));
    map.appendChild(bottom);

    data.capabilityDomains.forEach(function (item) {
      var card = element("article", "mesh-domain-card");
      var header = element("div", "mesh-domain-card__header");
      header.appendChild(element("h4", "mesh-domain-card__name", item.name));
      header.appendChild(createGrade(item.grade));
      card.appendChild(header);
      card.appendChild(element("p", "mesh-domain-card__role", item.role));
      card.appendChild(createTags(item.clues));
      cards.appendChild(card);
    });
    body.appendChild(map);
    body.appendChild(cards);
    cards.style.marginTop = "9px";
    body.appendChild(element("p", "en-stage-note", "工程还原结论：Lattice Mesh 更合理地被理解为数据/服务平面、对象平面与网络连通平面的协同基础设施。六能力域属于 C 级工程还原模型，不是 Anduril 官方架构。"));
    return createStageFrame(2, body);
  }

  function renderGaps() {
    var body = element("div");
    var gaps = element("div", "mesh-gap-list");
    data.gaps.forEach(function (item) {
      var card = element("article", "mesh-gap");
      var head = element("div", "mesh-gap__head");
      card.dataset.selected = item.selected ? "true" : "false";
      head.appendChild(element("span", "mesh-gap__id", item.id));
      head.appendChild(element("span", "mesh-gap__priority", "优先级 " + item.priority));
      card.appendChild(head);
      card.appendChild(element("h4", "mesh-gap__title", item.title));
      card.appendChild(element("p", "mesh-gap__text", item.current));
      card.appendChild(element("p", "mesh-gap__text", "影响：" + item.impact));
      gaps.appendChild(card);
    });
    var selected = data.gaps.find(function (item) { return item.selected; });
    var callout = element("div", "mesh-selected-gap");
    callout.appendChild(element("strong", "", "本轮重点未知 · " + selected.id));
    callout.appendChild(element("p", "", selected.title + "——" + selected.impact));
    body.appendChild(gaps);
    body.appendChild(callout);
    callout.style.marginTop = "9px";
    body.appendChild(element("p", "en-stage-note", "缺口识别聚焦于阻断技术解释链的问题，而不是把“资料未找到”直接当作技术缺口。"));
    return createStageFrame(3, body);
  }

  function renderHypotheses() {
    var body = element("div");
    var grid = element("div", "mesh-hypothesis-grid");
    var comparison = element("div", "mesh-compare-wrap");
    var table = element("table", "mesh-compare");
    var head = element("thead");
    var headRow = element("tr");
    var tbody = element("tbody");
    data.hypotheses.forEach(function (item) {
      var card = element("article", "mesh-hypothesis");
      var cardHead = element("div", "mesh-hypothesis__head");
      card.dataset.primary = item.id === "H1" ? "true" : "false";
      cardHead.appendChild(element("span", "mesh-hypothesis__id", item.id));
      cardHead.appendChild(createGrade(item.grade));
      card.appendChild(cardHead);
      card.appendChild(element("h4", "mesh-hypothesis__title", item.name));
      card.appendChild(element("p", "mesh-hypothesis__status", item.status));
      card.appendChild(element("p", "mesh-hypothesis__text", item.summary));
      card.appendChild(element("p", "mesh-hypothesis__evidence", "证据解释：" + item.evidence));
      grid.appendChild(card);
    });
    ["候选", "证据一致性", "能力覆盖", "公开线索冲突", "工程可解释性"].forEach(function (text) { headRow.appendChild(element("th", "", text)); });
    data.hypotheses.forEach(function (item) {
      var row = element("tr");
      var values = [item.id + " " + item.name, item.consistency, item.coverage, item.conflict, item.explainability];
      values.forEach(function (value, index) {
        var cell = element("td", "", value);
        if (index > 0) cell.dataset.value = value;
        row.appendChild(cell);
      });
      tbody.appendChild(row);
    });
    head.appendChild(headRow);
    table.appendChild(head);
    table.appendChild(tbody);
    comparison.appendChild(table);
    body.appendChild(grid);

    var planes = element("div", "mesh-plane-model");
    var flux = element("div", "mesh-plane-model__plane");
    var dsb = element("div", "mesh-plane-model__plane");
    flux.appendChild(element("strong", "", "Flux-like Network Connectivity Plane"));
    flux.appendChild(element("span", "", "节点 / 链路 / 邻居 / 下一跳 / 承载"));
    dsb.appendChild(element("strong", "", "DSB-like Data & Service Plane"));
    dsb.appendChild(element("span", "", "Service / Topic / Key / Request / Stream / QoS"));
    planes.appendChild(flux);
    planes.appendChild(element("div", "mesh-plane-model__exchange", "⇄"));
    planes.appendChild(dsb);
    body.appendChild(planes);
    body.appendChild(comparison);
    comparison.style.marginTop = "9px";
    body.appendChild(element("p", "en-stage-note", "候选机制只做定性比较，不输出伪造的置信度百分比。H1 是当前重点候选，仍属于 C 级分析推断。"));
    return createStageFrame(4, body);
  }

  function renderScreening() {
    var body = element("div");
    var wrap = element("div", "mesh-compare-wrap");
    var table = element("table", "mesh-compare");
    var head = element("thead");
    var headRow = element("tr");
    var tbody = element("tbody");
    ["关键证据", "H1 双平面", "H2 DSB 一体化", "H3 Flux 主导"].forEach(function (text) { headRow.appendChild(element("th", "", text)); });
    data.hypothesisEvidence.forEach(function (item) {
      var row = element("tr");
      [item.evidence, item.h1, item.h2, item.h3].forEach(function (value, index) {
        var cell = element("td", "", value);
        if (index > 0) cell.dataset.value = value;
        row.appendChild(cell);
      });
      tbody.appendChild(row);
    });
    head.appendChild(headRow);
    table.appendChild(head);
    table.appendChild(tbody);
    wrap.appendChild(table);
    body.appendChild(wrap);
    var decision = element("div", "mesh-candidate-decision");
    decision.appendChild(element("strong", "", "筛选结论：保留 H1 逻辑双平面协同"));
    decision.appendChild(element("p", "", "H1 能同时解释 Flux 与 DSB 两组公开技术线索，不需要否定任一组强证据，并能解释上层业务为何不直接感知异构承载变化。H2 保留为备选，H3 降低优先级。"));
    body.appendChild(decision);
    decision.style.marginTop = "10px";
    var boundary = element("div", "mesh-boundary-alert");
    boundary.appendChild(element("strong", "", "结论边界 · C 级工程还原模型"));
    boundary.appendChild(element("p", "", "该筛选结果不是 Anduril 官方公开架构，也不能替代后续实验验证。"));
    body.appendChild(boundary);
    boundary.style.marginTop = "8px";
    return createStageFrame(5, body);
  }

  function renderVerification() {
    var body = element("div");
    var engineering = element("div", "mesh-engineering-grid");
    var layout = element("div", "mesh-verification-layout");
    data.engineeringApproximation.planes.forEach(function (item) {
      var card = element("article", "mesh-engineering");
      card.appendChild(element("h4", "mesh-engineering__title", item.title));
      card.appendChild(element("p", "mesh-engineering__stack", item.stack));
      card.appendChild(element("p", "mesh-engineering__goal", item.goal));
      engineering.appendChild(card);
    });
    body.appendChild(createPanel("D 级工程近似建议", engineering));
    var warning = element("div", "mesh-verification-note");
    warning.appendChild(element("strong", "", data.engineeringApproximation.warning));
    warning.appendChild(element("p", "", data.verificationPlan.statement));
    body.appendChild(warning);
    warning.style.marginTop = "8px";

    var nodePanel = element("div");
    var nodes = element("div", "mesh-node-flow");
    data.verificationPlan.nodes.forEach(function (item) {
      var node = element("div", "mesh-node");
      node.appendChild(element("span", "mesh-node__name", item.name));
      node.appendChild(element("span", "mesh-node__roles", item.roles));
      nodes.appendChild(node);
    });
    nodePanel.appendChild(element("p", "en-panel__description", data.verificationPlan.name));
    nodePanel.appendChild(nodes);
    nodePanel.appendChild(createList(data.verificationPlan.questions, "en-question-list"));

    var checks = element("div", "mesh-check-columns");
    [
      ["本次验证项", data.verificationPlan.currentChecks],
      ["后续可扩展指标", data.verificationPlan.futureChecks]
    ].forEach(function (entry) {
      var group = element("div", "mesh-check-group");
      group.appendChild(element("h4", "mesh-check-group__title", entry[0]));
      group.appendChild(createList(entry[1], "en-simple-list"));
      checks.appendChild(group);
    });
    layout.appendChild(createPanel("混合节点验证任务", nodePanel));
    layout.appendChild(createPanel("验证指标边界", checks));
    body.appendChild(layout);
    body.appendChild(element("p", "en-stage-note", data.verificationPlan.note));
    return createStageFrame(6, body);
  }

  function renderResults() {
    var body = element("div");
    var results = element("div", "mesh-result-grid");
    var artifacts = element("div", "mesh-artifact-grid");
    data.finalResults.conclusions.forEach(function (item) {
      var card = element("article", "mesh-result");
      var content = element("div", "mesh-result__content");
      card.appendChild(createGrade(item.grade));
      content.appendChild(element("h4", "mesh-result__title", item.title));
      content.appendChild(element("p", "mesh-result__text", item.text));
      card.appendChild(content);
      results.appendChild(card);
    });
    data.finalResults.artifacts.forEach(function (name) {
      var card = element("article", "mesh-artifact");
      card.appendChild(element("span", "mesh-artifact__name", name));
      card.appendChild(element("span", "mesh-artifact__status", "已生成"));
      artifacts.appendChild(card);
    });
    body.appendChild(createPanel("技术还原成果摘要", results));
    body.appendChild(createPanel("最终成果对象", artifacts));
    body.lastChild.style.marginTop = "9px";
    var note = element("div", "mesh-verification-note");
    note.appendChild(element("strong", "", "仿真验证参数包已生成"));
    note.appendChild(element("p", "", "网页流程到此结束，可切换到已有 Zenoh + ns-3 混合节点实际验证画面；网页本身未执行或伪造仿真结果。"));
    body.appendChild(note);
    note.style.marginTop = "9px";
    var actions = element("div", "mesh-final-actions");
    actions.appendChild(createButton("查看证据链", "mesh-action", function () { window.openEvidence("mesh-evidence-official"); }));
    var verifyButton = createButton("查看验证方案", "mesh-action", function () { viewStage(6); });
    verifyButton.dataset.primary = "true";
    actions.appendChild(verifyButton);
    body.appendChild(actions);
    return createStageFrame(7, body);
  }

  function renderStageArea() {
    if (!meshState.started && meshState.viewingStage < 0) {
      refs.stageHost.replaceChildren(renderIntro());
      return;
    }
    var index = meshState.viewingStage;
    if (index < 0) {
      refs.stageHost.replaceChildren(renderIntro());
      return;
    }
    var available = meshState.completedStages.indexOf(index) !== -1 || (meshState.running && meshState.currentStage === index);
    if (!available) {
      refs.stageHost.replaceChildren(renderEmptyStage(index));
      return;
    }
    var renderers = [renderDefinition, renderEvidence, renderSystem, renderGaps, renderHypotheses, renderScreening, renderVerification, renderResults];
    refs.stageHost.replaceChildren(applyStageReveal(renderers[index](), index));
  }

  function updateInterface() {
    updateProgress();
    updateContext();
    renderStageArea();
  }

  createPage();
}());
