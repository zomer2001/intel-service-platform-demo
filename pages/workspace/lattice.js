(function () {
  "use strict";

  var data = window.LATTICE_ANALYSIS_DATA;
  var fromEnterprise = new URLSearchParams(window.location.search).get("from") === "enterprise";
  var shell = window.renderPlatform({
    projectTitle: "Lattice 平台级专项分析",
    analysisLevel: "平台级专项分析",
    currentObject: "Lattice",
    taskStatus: "待启动",
    activeNavigation: "任务中心",
    logoPath: "../../assets/brand/vernal-institute-logo.png",
    enterpriseHref: "./enterprise.html",
    lineageHref: "../applications/lineage.html"
  });

  var latticeState = {
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
      events: ["读取父任务上下文", "展开专项研究问题", "校验本层分析边界", "确认专项任务范围"],
      groups: [".en-fact", ".en-question-list li", ".en-tag", ".en-stage-note"]
    },
    {
      events: ["启动平台专题信源", "汇入代表性资料", "识别平台组成对象", "形成专题资料集"],
      groups: [".en-source-category", ".en-source", ".lt-collection-object", ".en-stage-note"]
    },
    {
      events: ["识别上层任务能力", "建立平台分层关系", "展开能力与数据对象", "固化平台谱系结果"],
      groups: [".lt-platform-layer:nth-child(-n+2)", ".lt-platform-layer:nth-child(n+3)", ".lt-capability, .lt-model", ".en-stage-note"]
    },
    {
      events: ["定位早期公开事件", "补全平台发展脉络", "提取能力演进趋势", "收敛平台演进判断"],
      groups: [".lt-timeline__item:nth-child(-n+2)", ".lt-timeline__item:nth-child(n+3)", ".lt-trend", ".en-stage-note, .en-technology-entry"]
    },
    {
      events: ["建立关键技术维度", "计算首批候选对象", "完成全部候选比较", "生成技术还原建议"],
      groups: [".lt-candidate-table thead", ".lt-candidate-table tbody tr:nth-child(-n+2)", ".lt-candidate-table tbody tr:nth-child(n+3)", ".lt-mesh-decision, .en-technology-entry"]
    },
    {
      events: ["提取平台级研判结论", "组装技术还原参数", "生成验证问题清单", "发布技术还原任务"],
      groups: [".stage-reveal-never", ".stage-reveal-never", ".stage-reveal-never", ".en-next-task"]
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

  function createTags(items) {
    var tags = element("div", "en-tags");
    items.forEach(function (item) { tags.appendChild(element("span", "en-tag", item)); });
    return tags;
  }

  function createList(items, className) {
    var list = element("ul", className || "en-simple-list");
    items.forEach(function (item) { list.appendChild(element("li", "", item)); });
    return list;
  }

  function createPanel(title, body) {
    var panel = element("section", "en-panel");
    panel.appendChild(element("h3", "en-panel__title", title));
    panel.appendChild(body);
    return panel;
  }

  function createTechnologyEntry(name, href) {
    var entry = element("section", "en-technology-entry");
    var copy = element("div", "en-technology-entry__copy");
    var action = createButton("查看执行详情", "en-technology-entry__button", function () {
      window.location.href = href;
    });
    copy.appendChild(element("span", "en-technology-entry__label", "关键技术"));
    copy.appendChild(element("strong", "en-technology-entry__name", name));
    entry.appendChild(copy);
    entry.appendChild(action);
    return entry;
  }

  function createStageFrame(index, body) {
    var stage = data.stages[index];
    var view = element("section", "en-stage-view");
    var header = element("header", "en-stage-view__header");
    var title = element("div");
    title.appendChild(element("p", "en-stage-view__kicker", "PLATFORM ANALYSIS"));
    title.appendChild(element("h2", "en-stage-view__title", stage.title));
    header.appendChild(title);
    if (latticeState.running && latticeState.currentStage === index) {
      header.appendChild(element("span", "en-stage-view__live", "正在执行"));
    } else if (latticeState.completedStages.indexOf(index) !== -1) {
      header.appendChild(element("span", "en-page-header__state", "已完成"));
    }
    view.appendChild(header);
    view.appendChild(body);
    return view;
  }

  function clearStageRevealTimers(index) {
    (latticeState.stageRevealTimers[index] || []).forEach(function (timer) { window.clearTimeout(timer); });
    latticeState.stageRevealTimers[index] = [];
  }

  function scheduleStageReveals(index) {
    var duration = data.stages[index].duration;
    var offsets = [0.18, 0.40, 0.63, 0.84];
    clearStageRevealTimers(index);
    latticeState.stageRevealLevels[index] = 0;
    latticeState.stageJustRevealed[index] = -1;
    latticeState.stageRevealTimers[index] = offsets.map(function (ratio, offsetIndex) {
      return window.setTimeout(function () {
        if (!latticeState.running || latticeState.currentStage !== index || latticeState.completedStages.indexOf(index) !== -1) return;
        latticeState.stageRevealLevels[index] = offsetIndex + 1;
        latticeState.stageJustRevealed[index] = offsetIndex + 1;
        if (latticeState.viewingStage === index) renderStageArea();
      }, Math.round(duration * ratio));
    });
  }

  function applyStageReveal(view, index) {
    var completed = latticeState.completedStages.indexOf(index) !== -1;
    var plan = revealPlans[index];
    if (completed || !plan) return view;
    var body = view.children[1];
    var level = latticeState.stageRevealLevels[index] || 0;
    var justRevealed = latticeState.stageJustRevealed[index];
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
    body.querySelectorAll(".en-next-task__start").forEach(function (button) { button.hidden = true; });
    latticeState.stageJustRevealed[index] = -1;
    return view;
  }

  function createPage() {
    var page = element("div", "en-page");
    var header = element("header", "en-page-header");
    var titleGroup = element("div");
    var headerState = element("span", "en-page-header__state", "待启动");
    var taskSummary = element("section", "lt-task-summary");
    var source = element("div", "lt-task-summary__source");
    var goals = element("div", "lt-task-summary__goals");
    var action = element("div", "lt-task-summary__action");
    var facts = element("div", "lt-task-summary__facts");
    var progress = element("section", "en-stage-progress");
    var context = element("section", "en-run-context");
    var stageHost = element("div", "en-stage-host");
    var startButton = createButton("开始 Lattice 专项分析", "lt-task-summary__start", startAnalysis);

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

    var sourceTitle = element("p", "lt-task-summary__eyebrow", "任务来源与分析目标");
    if (fromEnterprise) sourceTitle.appendChild(element("span", "lt-source-badge", "来源已确认"));
    source.appendChild(sourceTitle);
    source.appendChild(element("h2", "lt-task-summary__title", "已生成的平台级专项任务"));
    var sourceFacts = [
      ["父任务", data.parentTask.name],
      ["发现对象", data.task.object],
      ["触发原因", data.parentTask.trigger]
    ];
    if (fromEnterprise) sourceFacts.push(["任务生成依据", data.parentTask.generationBasis]);
    sourceFacts.forEach(function (entry) {
      var fact = element("div", "lt-task-summary__fact");
      fact.appendChild(element("span", "lt-task-summary__label", entry[0]));
      fact.appendChild(element("span", "lt-task-summary__value", entry[1]));
      facts.appendChild(fact);
    });
    source.appendChild(facts);
    goals.appendChild(element("p", "lt-task-summary__eyebrow", "专项分析目标"));
    goals.appendChild(createList(data.task.goals, "lt-task-summary__goals-list"));
    action.appendChild(startButton);
    taskSummary.appendChild(source);
    taskSummary.appendChild(goals);
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
    topbar.querySelector(".topbar__project").textContent = "Lattice 平台级专项分析";
    topbar.querySelector(".topbar__level").textContent = "平台级专项分析";
    topbar.querySelector(".topbar__object").textContent = "当前对象：Lattice";
    topbar.querySelector(".topbar__status").textContent = "任务状态：" + (completed ? "分析完成" : latticeState.running ? "分析中" : "待启动");
  }

  function startAnalysis() {
    if (latticeState.started) return;
    latticeState.started = true;
    latticeState.running = true;
    latticeState.currentStage = 0;
    latticeState.viewingStage = 0;
    latticeState.completedStages = [];
    latticeState.autoFollow = true;
    refs.page.dataset.started = "true";
    refs.startButton.disabled = true;
    refs.startButton.textContent = "专项分析运行中";
    refs.headerState.textContent = "分析中";
    refs.headerState.dataset.state = "running";
    updateTopbar(false);
    runStage(0);
  }

  function runStage(index) {
    latticeState.currentStage = index;
    if (latticeState.autoFollow) latticeState.viewingStage = index;
    scheduleStageReveals(index);
    updateInterface();
    latticeState.stageTimer = window.setTimeout(function () { completeStage(index); }, data.stages[index].duration);
  }

  function completeStage(index) {
    clearStageRevealTimers(index);
    latticeState.stageRevealLevels[index] = revealPlans[index].events.length;
    if (latticeState.completedStages.indexOf(index) === -1) latticeState.completedStages.push(index);
    if (index < data.stages.length - 1) {
      runStage(index + 1);
      return;
    }
    latticeState.running = false;
    refs.startButton.textContent = "专项分析已完成";
    refs.headerState.textContent = "平台级分析已完成";
    refs.headerState.dataset.state = "completed";
    if (latticeState.autoFollow) latticeState.viewingStage = index;
    updateTopbar(true);
    updateInterface();
  }

  function viewStage(index) {
    latticeState.viewingStage = index;
    latticeState.autoFollow = latticeState.running && index === latticeState.currentStage;
    updateInterface();
  }

  function returnToCurrent() {
    if (latticeState.currentStage < 0) return;
    latticeState.autoFollow = true;
    latticeState.viewingStage = latticeState.currentStage;
    updateInterface();
  }

  function updateProgress() {
    refs.progress.querySelectorAll(".en-stage").forEach(function (button, index) {
      var status = "pending";
      var text = "未执行";
      if (latticeState.completedStages.indexOf(index) !== -1) {
        status = "completed";
        text = "已完成";
      } else if (latticeState.running && latticeState.currentStage === index) {
        status = "running";
        text = "正在执行";
      }
      var viewing = latticeState.viewingStage === index;
      if (viewing && !latticeState.autoFollow) text = "当前查看";
      button.dataset.status = status;
      button.dataset.viewing = viewing ? "true" : "false";
      button.querySelector(".en-stage__status").textContent = text;
      button.setAttribute("aria-label", data.stages[index].title + "，" + text);
    });
  }

  function updateContext() {
    var historyView = latticeState.running && !latticeState.autoFollow;
    refs.context.hidden = !historyView;
    refs.context.replaceChildren();
    if (!historyView) return;
    refs.context.appendChild(element("p", "en-run-context__text", "当前任务正在执行：" + data.stages[latticeState.currentStage].title));
    refs.context.appendChild(createButton("返回当前执行", "en-run-context__return", returnToCurrent));
  }

  function renderIntro() {
    var intro = element("section", "en-intro");
    intro.appendChild(element("div", "en-intro__mark", "Ⅱ"));
    intro.appendChild(element("h2", "en-intro__title", "Lattice 专项任务已加载"));
    intro.appendChild(element("p", "en-intro__text", "当前任务由上层企业级分析生成，处于待启动状态。点击一次“开始 Lattice 专项分析”后，系统将自动执行六个阶段。"));
    return intro;
  }

  function renderEmptyStage(index) {
    var empty = element("section", "en-stage-empty");
    empty.appendChild(element("div", "en-stage-empty__mark", String(index + 1)));
    empty.appendChild(element("h2", "en-stage-empty__title", "该阶段尚未执行"));
    empty.appendChild(element("p", "en-stage-empty__text", "系统将按照当前专项任务流程自动进入该阶段。"));
    return empty;
  }

  function renderLoad() {
    var body = element("div");
    var grid = element("div", "en-grid-2");
    var facts = element("div", "en-facts");
    [
      ["父任务", data.parentTask.name],
      ["父任务结论", data.parentTask.conclusion],
      ["当前研究对象", data.task.object],
      ["分析类型", data.task.level]
    ].forEach(function (entry) {
      var row = element("div", "en-fact");
      row.appendChild(element("span", "en-fact__label", entry[0]));
      row.appendChild(element("p", "en-fact__value", entry[1]));
      facts.appendChild(row);
    });
    grid.appendChild(createPanel("来源任务与研究对象", facts));
    grid.appendChild(createPanel("当前专项研究问题", createList(data.task.questions, "en-question-list")));
    body.appendChild(grid);
    body.appendChild(createPanel("本层分析边界", createTags(data.task.boundaries)));
    body.lastChild.style.marginTop = "11px";
    body.appendChild(element("p", "en-stage-note", "专项任务范围已确认，开始围绕 Lattice 平台能力组织资料。"));
    return createStageFrame(0, body);
  }

  function renderCollection() {
    var body = element("div");
    var grid = element("div", "en-grid-3");
    var categories = element("div");
    var sources = element("div", "en-source-list");
    var objects = element("div", "lt-collection-object-list");
    var completed = latticeState.completedStages.indexOf(1) !== -1;

    data.sourceCategories.forEach(function (name) {
      var row = element("div", "en-source-category");
      row.appendChild(element("span", "en-source-category__name", name));
      row.appendChild(element("span", "en-source-category__status", completed ? "已完成" : "定向采集中"));
      categories.appendChild(row);
    });
    data.sources.forEach(function (item) {
      var card = element("article", "en-source");
      card.appendChild(element("p", "en-source__title", item.title));
      card.appendChild(element("p", "en-source__meta", item.type + " · " + item.focus));
      if (item.evidenceId) card.appendChild(createButton("查看证据", "en-source__evidence", function () { window.openEvidence(item.evidenceId); }));
      sources.appendChild(card);
    });
    data.discoveredObjects.forEach(function (name) { objects.appendChild(element("div", "lt-collection-object", name)); });
    grid.appendChild(createPanel("专题信源结构", categories));
    grid.appendChild(createPanel("代表性专题资料", sources));
    grid.appendChild(createPanel("已识别平台对象", objects));
    body.appendChild(grid);
    body.appendChild(element("p", "en-stage-note", "已形成覆盖任务能力、统一数据语义、开放接口和底层分布式连接能力的 Lattice 专题资料集合。"));
    return createStageFrame(1, body);
  }

  function evidenceForLayer(layerId) {
    if (layerId === "ui" || layerId === "api") return "lattice-evidence-platform";
    if (layerId === "model") return "lattice-evidence-objects";
    if (layerId === "mesh") return "lattice-evidence-mesh";
    return "";
  }

  function renderLineage() {
    var body = element("div");
    var layout = element("div", "lt-platform-layout");
    var map = element("section", "lt-platform-map");
    var details = element("div", "lt-platform-details");
    data.platformLayers.forEach(function (layer) {
      var row = element("article", "lt-platform-layer");
      var evidenceId = evidenceForLayer(layer.id);
      row.dataset.layer = layer.id;
      row.appendChild(element("span", "lt-platform-layer__title", layer.title));
      row.appendChild(element("span", "lt-platform-layer__subtitle", layer.subtitle));
      if (evidenceId) row.appendChild(createButton("查看证据", "lt-platform-layer__evidence", function () { window.openEvidence(evidenceId); }));
      map.appendChild(row);
    });
    data.capabilities.forEach(function (capability) {
      var card = element("section", "lt-capability");
      card.appendChild(element("h3", "lt-capability__title", capability.name));
      card.appendChild(createTags(capability.items));
      card.appendChild(element("p", "lt-capability__description", capability.description));
      details.appendChild(card);
    });
    var modelPanel = element("section", "lt-capability");
    var models = element("div", "lt-models");
    modelPanel.appendChild(element("h3", "lt-capability__title", "统一数据模型"));
    data.dataModels.forEach(function (model) {
      var card = element("article", "lt-model");
      card.appendChild(element("p", "lt-model__name", model.name));
      card.appendChild(element("p", "lt-model__description", model.description));
      models.appendChild(card);
    });
    modelPanel.appendChild(models);
    details.appendChild(modelPanel);
    layout.appendChild(map);
    layout.appendChild(details);
    body.appendChild(layout);
    body.appendChild(element("p", "en-stage-note", "公开可观察结构表明：异构承载形成物理基础，Lattice Mesh 提供分布式通信与数据基础，统一数据模型建立共享语义，C2 与 Mission Autonomy 完成上层任务闭环，SDK / API 负责外部接入。"));
    return createStageFrame(2, body);
  }

  function renderEvolution() {
    var body = element("div");
    var timeline = element("div", "lt-timeline");
    var trends = element("div", "lt-trend-grid");
    data.timeline.forEach(function (item) {
      var card = element("article", "lt-timeline__item");
      card.appendChild(element("span", "lt-timeline__date", item.date));
      card.appendChild(element("strong", "lt-timeline__title", item.title));
      card.appendChild(element("span", "lt-timeline__description", item.description));
      timeline.appendChild(card);
    });
    data.trends.forEach(function (item) {
      var card = element("article", "lt-trend");
      card.appendChild(element("h3", "lt-trend__title", item.title));
      card.appendChild(element("p", "lt-trend__description", item.description));
      trends.appendChild(card);
    });
    body.appendChild(timeline);
    body.appendChild(trends);
    body.appendChild(createTechnologyEntry("多源跨模态情报对齐融合与动态演化关联分析", "../technology/alignment-fusion.html?from=lattice"));
    var note = element("p", "en-stage-note", "Lattice 的发展不是简单增加功能，而是在形成“任务软件—统一数据—开放接口—分布式连接”的完整平台体系。 ");
    note.appendChild(createButton("查看公开项目证据", "en-evidence-link", function () { window.openEvidence("lattice-evidence-dod"); }));
    body.appendChild(note);
    return createStageFrame(3, body);
  }

  function renderAssessment() {
    var body = element("div");
    var layout = element("div", "lt-assessment-layout");
    var tableWrap = element("div", "lt-candidate-table-wrap");
    var table = element("table", "lt-candidate-table");
    var head = element("thead");
    var headerRow = element("tr");
    var tbody = element("tbody");
    ["候选对象", "平台基础性", "跨模块支撑", "技术深度", "证据追溯", "还原价值"].forEach(function (label) { headerRow.appendChild(element("th", "", label)); });
    data.candidates.forEach(function (candidate) {
      var row = element("tr");
      var nameCell = element("td");
      var name = element("span", "lt-candidate-name", candidate.name + (candidate.recommended ? " · 推荐" : ""));
      nameCell.appendChild(name);
      nameCell.appendChild(element("span", "lt-candidate-position", candidate.position));
      row.dataset.recommended = candidate.recommended ? "true" : "false";
      row.appendChild(nameCell);
      [candidate.foundation, candidate.support, candidate.depth, candidate.evidence, candidate.researchValue].forEach(function (value) {
        var cell = element("td");
        var level = element("span", "en-level", value);
        level.dataset.level = value;
        cell.appendChild(level);
        row.appendChild(cell);
      });
      tbody.appendChild(row);
    });
    head.appendChild(headerRow);
    table.appendChild(head);
    table.appendChild(tbody);
    tableWrap.appendChild(table);

    var decision = element("section", "lt-mesh-decision");
    decision.appendChild(element("p", "lt-mesh-decision__eyebrow", "推荐进入技术还原"));
    decision.appendChild(element("h3", "lt-mesh-decision__title", "Lattice Mesh"));
    decision.appendChild(createList(data.meshReasons));
    var questions = element("div", "lt-mesh-decision__questions");
    questions.appendChild(element("h4", "lt-mesh-decision__questions-title", "下一层待回答的关键问题"));
    questions.appendChild(createList(data.meshQuestions));
    decision.appendChild(questions);
    var evidenceActions = element("div", "en-tags");
    evidenceActions.appendChild(createButton("查看官方定位证据", "en-evidence-link", function () { window.openEvidence("lattice-evidence-mesh"); }));
    evidenceActions.appendChild(createButton("查看公开技术线索", "en-evidence-link", function () { window.openEvidence("lattice-evidence-flux"); }));
    decision.appendChild(evidenceActions);
    layout.appendChild(tableWrap);
    layout.appendChild(decision);
    body.appendChild(layout);
    body.appendChild(createTechnologyEntry("多维信息价值评估", "../technology/value.html?from=lattice"));
    return createStageFrame(4, body);
  }

  function showMeshTaskNotice() {
    window.location.href = "./lattice-mesh.html?from=lattice";
  }

  function renderNextTask() {
    var item = data.nextTask;
    var body = element("div");
    var card = element("section", "en-next-task");
    var main = element("div");
    var side = element("div", "en-next-task__side");
    var meta = element("div", "en-next-task__meta");
    var sideContent = element("div", "lt-next-task-side");
    var questions = element("div", "lt-next-task-questions");
    main.appendChild(element("p", "en-next-task__eyebrow", "已识别高价值关键技术 · Lattice Mesh"));
    main.appendChild(element("h3", "en-next-task__title", item.name));
    main.appendChild(element("p", "en-panel__description", "当前平台级分析结果已自动生成下一层技术还原任务，等待人工确认启动。"));
    [
      ["父任务", item.parent],
      ["触发依据", item.trigger],
      ["研究对象", item.object],
      ["对象类型", item.objectType],
      ["分析层级", item.level],
      ["任务状态", item.status]
    ].forEach(function (entry) {
      var row = element("div", "en-next-task__meta-item");
      row.appendChild(element("span", "en-next-task__meta-label", entry[0]));
      row.appendChild(element("span", "en-next-task__meta-value", entry[1]));
      meta.appendChild(row);
    });
    main.appendChild(meta);
    sideContent.appendChild(createPanel("下一层研究目标", createList(item.goals, "en-task-goals")));
    item.verificationQuestions.forEach(function (question) { questions.appendChild(element("div", "lt-next-task-question", question)); });
    sideContent.appendChild(createPanel("重点验证问题", questions));
    side.appendChild(sideContent);
    side.appendChild(createButton("开始 Lattice Mesh 技术还原", "en-next-task__start", showMeshTaskNotice));
    card.appendChild(main);
    card.appendChild(side);
    body.appendChild(card);
    return createStageFrame(5, body);
  }

  function renderStageArea() {
    if (!latticeState.started && latticeState.viewingStage < 0) {
      refs.stageHost.replaceChildren(renderIntro());
      return;
    }
    var index = latticeState.viewingStage;
    if (index < 0) {
      refs.stageHost.replaceChildren(renderIntro());
      return;
    }
    var available = latticeState.completedStages.indexOf(index) !== -1 || (latticeState.running && latticeState.currentStage === index);
    if (!available) {
      refs.stageHost.replaceChildren(renderEmptyStage(index));
      return;
    }
    var renderers = [renderLoad, renderCollection, renderLineage, renderEvolution, renderAssessment, renderNextTask];
    refs.stageHost.replaceChildren(applyStageReveal(renderers[index](), index));
  }

  function updateInterface() {
    updateProgress();
    updateContext();
    renderStageArea();
  }

  createPage();
}());
