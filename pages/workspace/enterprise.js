(function () {
  "use strict";

  var data = window.ENTERPRISE_ANALYSIS_DATA;
  var shell = window.renderPlatform({
    projectTitle: "情报分析工作台 · 新建任务",
    analysisLevel: "待确定",
    currentObject: "—",
    taskStatus: "待创建",
    activeNavigation: "任务中心",
    logoPath: "../../assets/brand/vernal-institute-logo.png",
    enterpriseHref: "./enterprise.html",
    lineageHref: "../applications/lineage.html"
  });

  var enterpriseState = {
    started: false,
    running: false,
    currentStage: -1,
    viewingStage: -1,
    completedStages: [],
    autoFollow: true,
    recognized: false,
    stageStartedAt: 0,
    stageTimer: null,
    recognitionTimer: null,
    stageRevealLevels: [],
    stageRevealTimers: [],
    stageJustRevealed: []
  };

  var refs = {};
  var revealPlans = [
    {
      events: ["识别任务字段", "生成研究问题", "界定范围与信源", "固化任务理解结果"],
      groups: [".en-fact", ".en-question-list li", ".en-tag", ".en-stage-note"]
    },
    {
      events: ["启动专题信源", "汇入近期资料", "识别新对象与线索", "收敛本轮采集判断"],
      groups: [".en-source-category", ".en-source", ".en-discovery", ".en-stage-note, .en-technology-entry"]
    },
    {
      events: ["建立企业根节点", "识别平台与能力分支", "展开产品域节点", "形成谱系结论"],
      groups: [".en-lineage__company", ".en-lineage__platform, .en-lineage__branch", ".en-domain", ".en-stage-note"]
    },
    {
      events: ["定位早期演进事件", "补全近期发展脉络", "归纳能力趋势", "收敛发展态势判断"],
      groups: [".en-evolution__item:nth-child(-n+2)", ".en-evolution__item:nth-child(n+3)", ".en-trend", ".en-stage-note"]
    },
    {
      events: ["建立评价维度", "计算首批候选对象", "完成全部候选排序", "生成优先下钻建议"],
      groups: [".en-candidate-table thead", ".en-candidate-table tbody tr:nth-child(-n+2)", ".en-candidate-table tbody tr:nth-child(n+3)", ".en-recommendation"]
    },
    {
      events: ["提取父任务结论", "组装专项任务参数", "生成下一层研究目标", "发布平台级专项任务"],
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
    title.appendChild(element("p", "en-stage-view__kicker", "ENTERPRISE ANALYSIS"));
    title.appendChild(element("h2", "en-stage-view__title", stage.title));
    header.appendChild(title);
    if (enterpriseState.running && enterpriseState.currentStage === index) {
      header.appendChild(element("span", "en-stage-view__live", "正在执行"));
    } else if (enterpriseState.completedStages.indexOf(index) !== -1) {
      header.appendChild(element("span", "en-page-header__state", "已完成"));
    }
    view.appendChild(header);
    view.appendChild(body);
    return view;
  }

  function clearStageRevealTimers(index) {
    (enterpriseState.stageRevealTimers[index] || []).forEach(function (timer) { window.clearTimeout(timer); });
    enterpriseState.stageRevealTimers[index] = [];
  }

  function scheduleStageReveals(index) {
    var plan = revealPlans[index];
    var duration = data.stages[index].duration;
    var offsets = [0.18, 0.40, 0.63, 0.84];
    clearStageRevealTimers(index);
    enterpriseState.stageRevealLevels[index] = 0;
    enterpriseState.stageJustRevealed[index] = -1;
    enterpriseState.stageRevealTimers[index] = offsets.map(function (ratio, offsetIndex) {
      return window.setTimeout(function () {
        if (!enterpriseState.running || enterpriseState.currentStage !== index || enterpriseState.completedStages.indexOf(index) !== -1) return;
        enterpriseState.stageRevealLevels[index] = offsetIndex + 1;
        enterpriseState.stageJustRevealed[index] = offsetIndex + 1;
        if (enterpriseState.viewingStage === index) renderStageArea();
      }, Math.round(duration * ratio));
    });
  }

  function applyStageReveal(view, index) {
    var completed = enterpriseState.completedStages.indexOf(index) !== -1;
    var plan = revealPlans[index];
    if (completed || !plan) return view;
    var body = view.children[1];
    var level = enterpriseState.stageRevealLevels[index] || 0;
    var justRevealed = enterpriseState.stageJustRevealed[index];
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
    enterpriseState.stageJustRevealed[index] = -1;
    return view;
  }

  function createInitialPage() {
    var page = element("div", "en-page");
    page.dataset.started = "false";
    var pageHeader = element("header", "en-page-header");
    var titleGroup = element("div");
    var headerState = element("span", "en-page-header__state", "待创建");
    var task = element("section", "en-task");
    var inputGroup = element("div", "en-task__input");
    var label = element("label", "en-task__label", "情报分析需求");
    var textarea = element("textarea", "en-task__textarea");
    var actions = element("div", "en-task__actions");
    var startButton = createButton("开始分析", "en-task__start", startAnalysis);
    var recognition = element("div", "en-recognition");
    var progress = element("section", "en-stage-progress");
    var context = element("section", "en-run-context");
    var stageHost = element("div", "en-stage-host");

    refs.page = page;
    refs.title = element("h1", "en-page-header__title", "新建情报分析任务");
    refs.description = element("p", "en-page-header__description", "输入情报分析需求，系统将自动识别研究对象、分析范围并生成任务计划。");
    refs.headerState = headerState;
    refs.textarea = textarea;
    refs.startButton = startButton;
    refs.recognition = recognition;
    refs.progress = progress;
    refs.context = context;
    refs.stageHost = stageHost;

    textarea.id = "enterprise-task-input";
    textarea.placeholder = data.taskTemplate.placeholder;
    textarea.setAttribute("aria-describedby", "enterprise-task-error");
    label.htmlFor = textarea.id;
    recognition.hidden = true;
    context.hidden = true;

    titleGroup.appendChild(refs.title);
    titleGroup.appendChild(refs.description);
    pageHeader.appendChild(titleGroup);
    pageHeader.appendChild(headerState);
    inputGroup.appendChild(label);
    inputGroup.appendChild(textarea);
    actions.appendChild(startButton);
    task.appendChild(inputGroup);
    task.appendChild(actions);
    task.appendChild(recognition);
    page.appendChild(pageHeader);
    page.appendChild(task);
    page.appendChild(progress);
    page.appendChild(context);
    page.appendChild(stageHost);
    shell.workspace.appendChild(page);

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

    renderStageArea();
  }

  function updateTopbar(recognized, completed) {
    var topbar = shell.shell.querySelector(".topbar");
    if (!topbar) return;
    var project = topbar.querySelector(".topbar__project");
    var level = topbar.querySelector(".topbar__level");
    var object = topbar.querySelector(".topbar__object");
    var status = topbar.querySelector(".topbar__status");

    if (!recognized) {
      project.textContent = "情报分析工作台 · 新建任务";
      level.textContent = "待确定";
      object.textContent = "当前对象：—";
      status.textContent = "任务状态：" + (enterpriseState.running ? "正在解析任务需求……" : "待创建");
      return;
    }

    project.textContent = "Anduril Industries 企业级综合分析";
    level.textContent = "企业级分析";
    object.textContent = "当前对象：Anduril Industries";
    status.textContent = "任务状态：" + (completed ? "分析完成" : "分析中");
  }

  function renderRecognition() {
    refs.recognition.replaceChildren();
    [
      ["目标对象", data.taskTemplate.recognizedObject],
      ["对象类型", data.taskTemplate.objectType],
      ["分析层级", data.taskTemplate.analysisLevel]
    ].forEach(function (entry) {
      var item = element("div", "en-recognition__item");
      item.appendChild(element("span", "en-recognition__label", entry[0]));
      item.appendChild(element("span", "en-recognition__value", entry[1]));
      refs.recognition.appendChild(item);
    });
    refs.recognition.hidden = false;
  }

  function startAnalysis() {
    if (enterpriseState.started) return;
    var taskText = refs.textarea.value.trim();
    var priorError = refs.page.querySelector(".en-task__error");
    if (priorError) priorError.remove();

    if (!taskText) {
      var emptyError = element("p", "en-task__error", "请输入情报分析任务后再开始。");
      emptyError.id = "enterprise-task-error";
      refs.startButton.closest(".en-task").appendChild(emptyError);
      refs.textarea.focus();
      return;
    }
    if (!/anduril|安杜里尔/i.test(taskText)) {
      var objectError = element("p", "en-task__error", "未能从任务内容中识别明确研究对象，请补充企业名称。");
      objectError.id = "enterprise-task-error";
      refs.startButton.closest(".en-task").appendChild(objectError);
      refs.textarea.focus();
      return;
    }

    enterpriseState.started = true;
    enterpriseState.running = true;
    enterpriseState.currentStage = 0;
    enterpriseState.viewingStage = 0;
    enterpriseState.completedStages = [];
    enterpriseState.autoFollow = true;
    refs.page.dataset.started = "true";
    refs.textarea.readOnly = true;
    refs.startButton.disabled = true;
    refs.startButton.textContent = "分析运行中";
    refs.headerState.textContent = "正在解析任务需求……";
    refs.headerState.dataset.state = "running";
    refs.description.textContent = "正在解析任务需求，并生成企业级分析计划。";
    updateTopbar(false, false);
    updateInterface();

    enterpriseState.recognitionTimer = window.setTimeout(function () {
      enterpriseState.recognized = true;
      refs.title.textContent = "Anduril Industries 企业级综合分析";
      refs.description.textContent = "围绕企业产品体系、核心软件平台、技术演进和高价值研究对象开展自动分析。";
      refs.headerState.textContent = "分析中";
      renderRecognition();
      updateTopbar(true, false);
      updateInterface();
      document.title = "情报服务平台｜Anduril Industries 企业级综合分析";
    }, 750);

    runStage(0);
  }

  function runStage(index) {
    enterpriseState.currentStage = index;
    enterpriseState.stageStartedAt = Date.now();
    if (enterpriseState.autoFollow) enterpriseState.viewingStage = index;
    scheduleStageReveals(index);
    updateInterface();
    enterpriseState.stageTimer = window.setTimeout(function () {
      completeStage(index);
    }, data.stages[index].duration);
  }

  function completeStage(index) {
    clearStageRevealTimers(index);
    enterpriseState.stageRevealLevels[index] = revealPlans[index].events.length;
    if (enterpriseState.completedStages.indexOf(index) === -1) {
      enterpriseState.completedStages.push(index);
    }
    if (index < data.stages.length - 1) {
      runStage(index + 1);
      return;
    }

    enterpriseState.running = false;
    refs.startButton.textContent = "分析已完成";
    refs.headerState.textContent = "企业级分析已完成";
    refs.headerState.dataset.state = "completed";
    refs.description.textContent = "企业级分析已完成，并生成等待人工启动的 Lattice 平台级专项任务。";
    if (enterpriseState.autoFollow) enterpriseState.viewingStage = index;
    updateTopbar(true, true);
    updateInterface();
  }

  function viewStage(index) {
    enterpriseState.viewingStage = index;
    enterpriseState.autoFollow = enterpriseState.running && index === enterpriseState.currentStage;
    updateInterface();
  }

  function returnToCurrent() {
    if (enterpriseState.currentStage < 0) return;
    enterpriseState.autoFollow = true;
    enterpriseState.viewingStage = enterpriseState.currentStage;
    updateInterface();
  }

  function updateProgress() {
    var buttons = Array.from(refs.progress.querySelectorAll(".en-stage"));
    buttons.forEach(function (button, index) {
      var underlyingStatus = "pending";
      var statusText = "未执行";
      if (enterpriseState.completedStages.indexOf(index) !== -1) {
        underlyingStatus = "completed";
        statusText = "已完成";
      } else if (enterpriseState.running && enterpriseState.currentStage === index) {
        underlyingStatus = "running";
        statusText = "正在执行";
      }
      var currentView = enterpriseState.viewingStage === index;
      if (currentView && !enterpriseState.autoFollow) statusText = "当前查看";
      button.dataset.status = underlyingStatus;
      button.dataset.viewing = currentView ? "true" : "false";
      button.querySelector(".en-stage__status").textContent = statusText;
      button.setAttribute("aria-label", data.stages[index].title + "，" + statusText);
    });
  }

  function updateContext() {
    var historyView = enterpriseState.running && !enterpriseState.autoFollow;
    refs.context.hidden = !historyView;
    refs.context.replaceChildren();
    if (!historyView) return;
    refs.context.appendChild(element("p", "en-run-context__text", "当前任务正在执行：" + data.stages[enterpriseState.currentStage].title));
    refs.context.appendChild(createButton("返回当前执行", "en-run-context__return", returnToCurrent));
  }

  function renderIntro() {
    var intro = element("section", "en-intro");
    intro.appendChild(element("div", "en-intro__mark", "＋"));
    intro.appendChild(element("h2", "en-intro__title", "等待创建情报分析任务"));
    intro.appendChild(element("p", "en-intro__text", "输入任务后点击一次“开始分析”，系统将自动识别研究对象并依次执行六个分析阶段。"));
    return intro;
  }

  function renderEmptyStage(index) {
    var empty = element("section", "en-stage-empty");
    empty.appendChild(element("div", "en-stage-empty__mark", String(index + 1)));
    empty.appendChild(element("h2", "en-stage-empty__title", "该阶段尚未执行"));
    empty.appendChild(element("p", "en-stage-empty__text", "系统将按照当前任务流程自动进入该阶段。"));
    return empty;
  }

  function renderParsing() {
    var parsing = element("section", "en-stage-empty");
    parsing.appendChild(element("div", "en-stage-empty__mark", "…"));
    parsing.appendChild(element("h2", "en-stage-empty__title", "正在解析任务需求……"));
    parsing.appendChild(element("p", "en-stage-empty__text", "系统正在识别研究对象、对象类型、分析层级和任务范围。"));
    return parsing;
  }

  function renderUnderstanding() {
    var body = element("div");
    var grid = element("div", "en-grid-2");
    var facts = element("div", "en-facts");
    [
      ["研究对象", "Anduril Industries"],
      ["对象类型", "防务科技企业"],
      ["分析层级", "企业级综合分析"]
    ].forEach(function (entry) {
      var row = element("div", "en-fact");
      row.appendChild(element("span", "en-fact__label", entry[0]));
      row.appendChild(element("p", "en-fact__value", entry[1]));
      facts.appendChild(row);
    });
    grid.appendChild(createPanel("任务解析结果", facts));
    grid.appendChild(createPanel("研究问题与分析计划", createList(data.researchQuestions, "en-question-list")));

    var lower = element("div", "en-grid-2");
    lower.style.marginTop = "11px";
    lower.appendChild(createPanel("初始分析范围", createTags(data.analysisScope)));
    lower.appendChild(createPanel("初始信源策略", createTags(data.sourceStrategy)));
    body.appendChild(grid);
    body.appendChild(lower);
    body.appendChild(element("p", "en-stage-note", enterpriseState.completedStages.indexOf(0) !== -1 ? "已完成任务理解，正在生成企业级采集计划。" : "正在解析任务需求，识别研究对象、问题范围与信源策略。"));
    return createStageFrame(0, body);
  }

  function renderCollection() {
    var body = element("div");
    var grid = element("div", "en-grid-3");
    var categoryList = element("div");
    var sourceList = element("div", "en-source-list");
    var discoveryList = element("div", "en-discovery-list");
    var completed = enterpriseState.completedStages.indexOf(1) !== -1;

    data.sourceCategories.forEach(function (item) {
      var row = element("div", "en-source-category");
      row.appendChild(element("span", "en-source-category__name", item.name));
      row.appendChild(element("span", "en-source-category__status", completed ? "已完成" : item.status));
      categoryList.appendChild(row);
    });

    data.sources.forEach(function (item) {
      var card = element("article", "en-source");
      card.appendChild(element("p", "en-source__title", item.title));
      card.appendChild(element("p", "en-source__meta", item.type + " · " + item.focus));
      if (item.evidenceId) {
        card.appendChild(createButton("查看证据", "en-source__evidence", function () { window.openEvidence(item.evidenceId); }));
      }
      sourceList.appendChild(card);
    });

    data.discoveries.forEach(function (item) {
      var card = element("article", "en-discovery");
      card.dataset.highlight = item.highlight ? "true" : "false";
      card.appendChild(element("p", "en-discovery__name", item.name));
      card.appendChild(element("p", "en-discovery__signal", item.signal));
      discoveryList.appendChild(card);
    });

    grid.appendChild(createPanel("信源类别与采集状态", categoryList));
    grid.appendChild(createPanel("近期采集资料", sourceList));
    grid.appendChild(createPanel("新发现对象 / 情报线索", discoveryList));
    body.appendChild(grid);
    body.appendChild(createTechnologyEntry("动态信息采集", "../technology/collection.html?from=enterprise"));
    body.appendChild(element("p", "en-stage-note", "多源资料显示，Lattice 在多类产品、任务自主与网络协同能力中持续出现，需要进一步梳理其体系位置；当前仍属于待研判线索。"));
    return createStageFrame(1, body);
  }

  function renderLineage() {
    var body = element("div", "en-lineage");
    var company = element("div", "en-lineage__company", "Anduril Industries");
    var platform = element("div", "en-lineage__platform");
    var branches = element("div", "en-lineage__branches");
    var domains = element("div", "en-lineage__domains");
    platform.appendChild(element("strong", "", "Lattice"));
    platform.appendChild(element("span", "", "贯穿多域产品与任务能力的软件平台 / 核心软件中枢"));
    data.latticeBranches.forEach(function (item) { branches.appendChild(element("div", "en-lineage__branch", item)); });
    data.productDomains.forEach(function (domain) {
      var card = element("section", "en-domain");
      var products = element("div", "en-domain__products");
      card.appendChild(element("h3", "en-domain__title", domain.name));
      domain.products.forEach(function (item) { products.appendChild(element("span", "en-domain__product", item)); });
      card.appendChild(products);
      domains.appendChild(card);
    });
    body.appendChild(company);
    body.appendChild(platform);
    body.appendChild(branches);
    body.appendChild(domains);
    var note = element("p", "en-stage-note", "谱系分析表明，Lattice 并非与单一装备型号并列，而是在多个产品与能力方向之间发挥平台级组织作用。 ");
    note.appendChild(createButton("查看关键证据", "en-evidence-link", function () { window.openEvidence("enterprise-evidence-lattice"); }));
    body.appendChild(note);
    return createStageFrame(2, body);
  }

  function renderTrends() {
    var body = element("div");
    var evolution = element("div", "en-evolution");
    var trends = element("div", "en-grid-5");
    data.evolution.forEach(function (item) {
      var card = element("article", "en-evolution__item");
      card.appendChild(element("span", "en-evolution__phase", item.phase));
      card.appendChild(element("strong", "en-evolution__title", item.title));
      card.appendChild(element("span", "en-evolution__note", item.note));
      evolution.appendChild(card);
    });
    data.trends.forEach(function (item) {
      var card = element("article", "en-trend");
      card.appendChild(element("h3", "en-trend__title", item.title));
      card.appendChild(element("p", "en-trend__description", item.description));
      trends.appendChild(card);
    });
    body.appendChild(evolution);
    body.appendChild(trends);
    body.appendChild(element("p", "en-stage-note", "企业能力演进显示，软件中枢、任务自主和网络连接正在成为产品体系持续扩展的重要共同基础。"));
    return createStageFrame(3, body);
  }

  function renderCandidates() {
    var body = element("div");
    var grid = element("div", "en-grid-2");
    var tableWrap = element("div", "en-candidate-table-wrap");
    var table = element("table", "en-candidate-table");
    var head = element("thead");
    var headerRow = element("tr");
    var tbody = element("tbody");
    ["候选对象", "任务相关性", "体系中心性", "技术延展性", "证据丰富度", "下钻价值"].forEach(function (label) {
      headerRow.appendChild(element("th", "", label));
    });
    data.candidates.forEach(function (candidate) {
      var row = element("tr");
      row.dataset.recommended = candidate.recommended ? "true" : "false";
      row.appendChild(element("td", "", candidate.name + (candidate.recommended ? " · 推荐" : "")));
      [candidate.relevance, candidate.centrality, candidate.extensibility, candidate.evidence, candidate.researchValue].forEach(function (value) {
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

    var recommendation = element("section", "en-recommendation");
    recommendation.appendChild(element("p", "en-recommendation__label", "推荐优先下钻对象"));
    recommendation.appendChild(element("h3", "en-recommendation__object", "Lattice"));
    recommendation.appendChild(createList(data.latticeReasons));
    var evidenceRow = element("p", "en-stage-note", "下一层研究对象：Lattice。 ");
    evidenceRow.appendChild(createButton("查看研判证据", "en-evidence-link", function () { window.openEvidence("enterprise-evidence-lattice-mesh"); }));
    recommendation.appendChild(evidenceRow);
    grid.appendChild(tableWrap);
    grid.appendChild(recommendation);
    body.appendChild(grid);
    return createStageFrame(4, body);
  }

  function showNextTaskNotice() {
    window.location.href = "./lattice.html?from=enterprise";
  }

  function renderNextTask() {
    var item = data.nextTask;
    var body = element("div");
    var card = element("section", "en-next-task");
    var main = element("div");
    var side = element("div", "en-next-task__side");
    var meta = element("div", "en-next-task__meta");
    main.appendChild(element("p", "en-next-task__eyebrow", "已识别高价值研究对象 · Lattice"));
    main.appendChild(element("h3", "en-next-task__title", item.name));
    main.appendChild(element("p", "en-panel__description", "当前企业级分析结果已自动形成新的平台级研究任务，等待人工确认启动。"));
    [
      ["父任务", item.parent],
      ["触发原因", item.trigger],
      ["任务状态", item.status],
      ["分析层级", item.level],
      ["研究对象", item.object]
    ].forEach(function (entry) {
      var row = element("div", "en-next-task__meta-item");
      row.appendChild(element("span", "en-next-task__meta-label", entry[0]));
      row.appendChild(element("span", "en-next-task__meta-value", entry[1]));
      meta.appendChild(row);
    });
    main.appendChild(meta);
    side.appendChild(createPanel("下一层研究目标", createList(item.goals, "en-task-goals")));
    side.appendChild(createButton("开始 Lattice 专项分析", "en-next-task__start", showNextTaskNotice));
    card.appendChild(main);
    card.appendChild(side);
    body.appendChild(card);
    return createStageFrame(5, body);
  }

  function renderStageArea() {
    if (!enterpriseState.started && enterpriseState.viewingStage < 0) {
      refs.stageHost.replaceChildren(renderIntro());
      return;
    }
    var index = enterpriseState.viewingStage;
    if (index < 0) {
      refs.stageHost.replaceChildren(renderIntro());
      return;
    }
    if (enterpriseState.started && !enterpriseState.recognized && index === 0 && (enterpriseState.stageRevealLevels[0] || 0) === 0) {
      refs.stageHost.replaceChildren(renderParsing());
      return;
    }
    var available = enterpriseState.completedStages.indexOf(index) !== -1 || (enterpriseState.running && enterpriseState.currentStage === index);
    if (!available) {
      refs.stageHost.replaceChildren(renderEmptyStage(index));
      return;
    }
    var renderers = [renderUnderstanding, renderCollection, renderLineage, renderTrends, renderCandidates, renderNextTask];
    refs.stageHost.replaceChildren(applyStageReveal(renderers[index](), index));
  }

  function updateInterface() {
    updateProgress();
    updateContext();
    renderStageArea();
  }

  createInitialPage();
}());
