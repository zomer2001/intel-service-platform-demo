(function () {
  "use strict";

  var data = window.ALIGNMENT_FUSION_DATA;
  var shell = window.renderPlatform({
    projectTitle: "Lattice Mesh 技术情报专项",
    analysisLevel: "技术级分析",
    currentObject: data.task.object,
    taskStatus: "待启动",
    activeNavigation: "技术辅助还原与破解",
    logoPath: "../../assets/brand/vernal-institute-logo.png",
    enterpriseHref: "../workspace/enterprise.html",
    lineageHref: "../applications/lineage.html"
  });
  var state = {
    started: false,
    running: false,
    completed: false,
    phase: -1,
    selectedGroupId: "group-mesh",
    highlightedEvidenceIds: [],
    timer: null,
    phaseRevealLevels: [],
    phaseRevealTimers: [],
    phaseJustRevealed: -1
  };
  var refs = {};
  var revealPlans = [
    ["接收多模态资料", "解析文本与视觉对象", "提取结构化字段", "形成模态对象集"],
    ["识别候选实体", "匹配对象名称与语境", "建立对齐分组", "确认对象一致性依据"],
    ["归并发布主体", "识别 Source Family", "计算独立来源数", "形成独立性判断"],
    ["汇聚同对象证据", "保留时间与条件", "生成融合事实", "确认事实支持状态"],
    ["检查适用条件", "识别并列记录", "核验潜在冲突", "形成条件化判断"],
    ["关联对象与事件", "补充时间节点", "连接能力与项目", "形成动态演化链"]
  ];

  function element(tagName, className, text) {
    var node = document.createElement(tagName);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = String(text);
    return node;
  }

  function button(label, className, handler) {
    var node = element("button", className, label);
    node.type = "button";
    node.addEventListener("click", handler);
    return node;
  }

  function returnToFlow() {
    var source = new URLSearchParams(window.location.search).get("from");
    if (source === "lattice" && window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.href = "../workspace/lattice.html";
  }

  function revealLevel() {
    return state.phaseRevealLevels[state.phase] || 0;
  }

  function phaseReached(phase, requiredLevel) {
    if (state.completed || state.phase > phase) return true;
    if (state.phase < phase) return false;
    return revealLevel() >= (requiredLevel || 1);
  }

  function revealThreshold(index, total) {
    return Math.min(4, Math.floor(index * 4 / Math.max(1, total)) + 1);
  }

  function itemAvailable(item, items, phaseKey) {
    var targetPhase = item[phaseKey];
    var peers = items.filter(function (candidate) { return candidate[phaseKey] === targetPhase; });
    return phaseReached(targetPhase, revealThreshold(peers.indexOf(item), peers.length));
  }

  function clearPhaseRevealTimers(index) {
    (state.phaseRevealTimers[index] || []).forEach(function (timer) { window.clearTimeout(timer); });
    state.phaseRevealTimers[index] = [];
  }

  function schedulePhaseReveals(index) {
    var offsets = [0.14, 0.36, 0.60, 0.84];
    clearPhaseRevealTimers(index);
    state.phaseRevealLevels[index] = 0;
    state.phaseJustRevealed = -1;
    state.phaseRevealTimers[index] = offsets.map(function (ratio, revealIndex) {
      return window.setTimeout(function () {
        if (!state.running || state.phase !== index || state.completed) return;
        state.phaseRevealLevels[index] = revealIndex + 1;
        state.phaseJustRevealed = revealIndex + 1;
        render();
      }, Math.round(data.phases[index].duration * ratio));
    });
  }

  function createRevealStatus() {
    refs.reveal = element("section", "tech-reveal");
    refs.reveal.hidden = true;
    return refs.reveal;
  }

  function renderRevealStatus() {
    refs.reveal.replaceChildren();
    refs.reveal.hidden = !state.running || state.phase < 0;
    if (refs.reveal.hidden) return;
    var events = revealPlans[state.phase];
    var level = revealLevel();
    var head = element("div", "tech-reveal__head");
    var eventList = element("div", "tech-reveal__events");
    head.appendChild(element("span", "tech-reveal__pulse"));
    head.appendChild(element("strong", "", level < events.length ? "正在" + events[level] + "……" : "本环节结果已形成，准备进入下一环节"));
    refs.reveal.appendChild(head);
    events.forEach(function (label, index) {
      var event = element("span", "tech-reveal__event", label);
      event.dataset.state = index < level ? "completed" : index === level && level < events.length ? "running" : "pending";
      eventList.appendChild(event);
    });
    refs.reveal.appendChild(eventList);
    if (level === 0) {
      var skeleton = element("div", "tech-reveal__skeleton");
      skeleton.appendChild(element("span"));
      skeleton.appendChild(element("span"));
      skeleton.appendChild(element("span"));
      refs.reveal.appendChild(skeleton);
    }
  }

  function sourceFamily(id) {
    return data.sourceFamilies.find(function (item) { return item.id === id; });
  }

  function evidenceItem(id) {
    return data.evidenceItems.find(function (item) { return item.id === id; });
  }

  function createHeader() {
    var header = element("header", "fusion-header");
    var title = element("div");
    var actions = element("div", "fusion-header__actions");
    refs.status = element("span", "fusion-status", "待启动");
    refs.start = button("开始对齐融合", "fusion-action", startFusion);
    refs.start.dataset.primary = "true";
    title.appendChild(element("h1", "", data.task.title));
    title.appendChild(element("p", "", data.task.description));
    actions.appendChild(button("返回业务流程", "fusion-action", returnToFlow));
    actions.appendChild(refs.status);
    actions.appendChild(button("查看执行详情", "fusion-action", function () { window.openWorkflow("alignment"); }));
    actions.appendChild(refs.start);
    header.appendChild(title);
    header.appendChild(actions);
    return header;
  }

  function createProgress() {
    refs.progress = element("section", "fusion-progress");
    data.phases.forEach(function (phase, index) {
      var step = element("div", "fusion-progress__step", phase.label);
      step.dataset.number = String(index + 1);
      step.dataset.state = "pending";
      refs.progress.appendChild(step);
    });
    return refs.progress;
  }

  function panel(kicker, title, description) {
    var node = element("article", "fusion-panel");
    node.appendChild(element("p", "fusion-panel__eyebrow", kicker));
    node.appendChild(element("h3", "fusion-panel__title", title));
    if (description) node.appendChild(element("p", "fusion-panel__description", description));
    return node;
  }

  function createWorkbench() {
    var workbench = element("section", "fusion-workbench");
    var sources = panel("MULTI-MODAL EVIDENCE", "多源 / 多模态证据", "文本、图片、表格和结构化记录先作为内容对象解析。 ");
    var groups = panel("ENTITY ALIGNMENT", "对象与事实对齐", "点击对齐组查看对象一致性依据和来源独立性。 ");
    var facts = panel("TRACEABLE FUSION", "融合事实", "融合保留来源、时间、条件与支持状态。 ");
    refs.sources = element("div", "fusion-source-list");
    refs.familyNote = element("div", "fusion-family-note");
    refs.groups = element("div", "fusion-group-list");
    refs.criteria = element("div", "fusion-criteria");
    refs.facts = element("div", "fusion-fact-list");
    sources.appendChild(refs.sources);
    sources.appendChild(refs.familyNote);
    groups.appendChild(refs.groups);
    groups.appendChild(refs.criteria);
    facts.appendChild(refs.facts);
    workbench.appendChild(sources);
    workbench.appendChild(groups);
    workbench.appendChild(facts);
    return workbench;
  }

  function createLower() {
    var lower = element("section", "fusion-lower");
    var conditions = panel("CONDITION & CONFLICT", "条件 / 冲突处理", "融合不是强行合并；不同采购与项目上下文保持并列。 ");
    var evolution = panel("DYNAMIC EVOLUTION", "对象—事件—能力—项目演化关系", "点击事件可高亮对应证据。 ");
    refs.conditions = element("div");
    refs.timeline = element("div", "fusion-timeline");
    conditions.appendChild(refs.conditions);
    evolution.appendChild(refs.timeline);
    lower.appendChild(conditions);
    lower.appendChild(evolution);
    return lower;
  }

  function statusText() {
    if (state.completed) return "已完成";
    if (!state.running) return "待启动";
    return ["解析中", "对齐中", "独立性核验", "融合中", "条件核验", "演化关联"][state.phase] || "处理中";
  }

  function updateTopbar() {
    var status = statusText();
    var topbar = shell.shell.querySelector(".topbar");
    topbar.querySelector(".topbar__project").textContent = "Lattice Mesh 技术情报专项";
    topbar.querySelector(".topbar__level").textContent = "技术级分析";
    topbar.querySelector(".topbar__object").textContent = "当前任务：" + data.task.name;
    topbar.querySelector(".topbar__status").textContent = "任务状态：" + status;
    refs.status.textContent = status;
    refs.status.dataset.state = state.completed ? "completed" : state.running ? "running" : "idle";
  }

  function renderProgress() {
    refs.progress.querySelectorAll(".fusion-progress__step").forEach(function (step, index) {
      step.dataset.state = index < state.phase || state.completed ? "completed" : index === state.phase ? "running" : "pending";
    });
  }

  function renderSources() {
    refs.sources.replaceChildren();
    data.evidenceItems.forEach(function (item) {
      var family = sourceFamily(item.sourceFamilyId);
      var visible = itemAvailable(item, data.evidenceItems, "availableAt");
      var highlighted = state.highlightedEvidenceIds.indexOf(item.evidenceId) !== -1;
      var card = element("article", "fusion-source");
      var text = element("div");
      card.dataset.visible = visible ? "true" : "false";
      var peers = data.evidenceItems.filter(function (candidate) { return candidate.availableAt === item.availableAt; });
      if (visible && item.availableAt === state.phase && state.phaseJustRevealed === revealThreshold(peers.indexOf(item), peers.length)) card.classList.add("tech-reveal-enter");
      card.dataset.highlight = highlighted ? "true" : "false";
      card.appendChild(element("span", "fusion-modality", item.modality));
      text.appendChild(element("span", "fusion-source__title", item.title));
      text.appendChild(element("span", "fusion-source__meta", item.publisher + " · " + item.date + " · " + item.sourceType));
      card.appendChild(text);
      card.appendChild(element("span", "fusion-source__family", family.label));
      refs.sources.appendChild(card);
    });
  }

  function selectedGroup() {
    return data.alignmentGroups.find(function (item) { return item.id === state.selectedGroupId; }) || data.alignmentGroups[0];
  }

  function renderFamilyNote() {
    var group = selectedGroup();
    var count = phaseReached(2, 3) ? group.independentSources : "—";
    refs.familyNote.replaceChildren();
    refs.familyNote.hidden = !phaseReached(1, 1);
    if (refs.familyNote.hidden) return;
    refs.familyNote.appendChild(element("span", "fusion-family-note__count", String(count)));
    var text = element("div");
    text.appendChild(element("strong", "", group.type === "同源多模态对齐" ? "同一发布来源" : "独立来源交叉核验"));
    text.appendChild(element("span", "", group.type === "同源多模态对齐" ? "正文、图片和表格可作为多个模态对象，但独立来源数只能计算为 1。" : "相同 Publisher 归入同一 Source Family，只有不同发布主体才增加独立来源。"));
    refs.familyNote.appendChild(text);
  }

  function selectGroup(id) {
    state.selectedGroupId = id;
    state.highlightedEvidenceIds = [];
    renderSources();
    renderGroups();
    renderFamilyNote();
    renderCriteria();
  }

  function renderGroups() {
    refs.groups.replaceChildren();
    data.alignmentGroups.forEach(function (group) {
      var visible = itemAvailable(group, data.alignmentGroups, "availableAt");
      var card = element("article", "fusion-group");
      var control = button("", "fusion-group__button", function () { selectGroup(group.id); });
      var head = element("div", "fusion-group__head");
      card.dataset.visible = visible ? "true" : "false";
      var peers = data.alignmentGroups.filter(function (candidate) { return candidate.availableAt === group.availableAt; });
      if (visible && group.availableAt === state.phase && state.phaseJustRevealed === revealThreshold(peers.indexOf(group), peers.length)) card.classList.add("tech-reveal-enter");
      card.dataset.selected = group.id === state.selectedGroupId ? "true" : "false";
      control.disabled = !visible;
      head.appendChild(element("span", "fusion-group__type", group.type));
      head.appendChild(element("span", "fusion-strength", "对齐依据 " + group.strength));
      control.appendChild(head);
      control.appendChild(element("h4", "fusion-group__name", group.name));
      control.appendChild(element("div", "fusion-group__items", group.itemIds.map(function (id) { return evidenceItem(id).title; }).join(" / ")));
      control.appendChild(element("div", "fusion-group__source-count", phaseReached(2, 3) ? "独立 Source Family：" + group.independentSources : "等待来源独立性判断"));
      card.appendChild(control);
      refs.groups.appendChild(card);
    });
  }

  function renderCriteria() {
    var group = selectedGroup();
    refs.criteria.replaceChildren();
    refs.criteria.hidden = !phaseReached(1, 1);
    if (refs.criteria.hidden) return;
    refs.criteria.appendChild(element("h4", "", "当前对齐依据 · " + group.name));
    var list = element("ul");
    var visibleCriteria = state.completed || state.phase > 1
      ? group.criteria.length
      : state.phase === 1
        ? Math.ceil(group.criteria.length * revealLevel() / 4)
        : 0;
    group.criteria.slice(0, visibleCriteria).forEach(function (text) { list.appendChild(element("li", "", text)); });
    if (!visibleCriteria) list.appendChild(element("li", "", "正在匹配对象名称、语境与关系……"));
    refs.criteria.appendChild(list);
  }

  function renderFacts() {
    refs.facts.replaceChildren();
    data.fusedFacts.forEach(function (fact) {
      var visible = itemAvailable(fact, data.fusedFacts, "availableAt");
      var card = element("article", "fusion-fact");
      var meta = element("div", "fusion-fact__meta");
      var evidenceActions = element("div");
      card.dataset.visible = visible ? "true" : "false";
      var peers = data.fusedFacts.filter(function (candidate) { return candidate.availableAt === fact.availableAt; });
      if (visible && fact.availableAt === state.phase && state.phaseJustRevealed === revealThreshold(peers.indexOf(fact), peers.length)) card.classList.add("tech-reveal-enter");
      card.appendChild(element("p", "fusion-fact__statement", fact.statement));
      [
        ["独立来源", String(fact.sourceFamilyIds.length)],
        ["时间", fact.date],
        ["支持状态", fact.status]
      ].forEach(function (entry) {
        var item = element("div");
        item.appendChild(element("span", "", entry[0]));
        item.appendChild(element("strong", "", entry[1]));
        meta.appendChild(item);
      });
      card.appendChild(meta);
      card.appendChild(element("p", "fusion-panel__description", "适用条件：" + fact.condition));
      fact.evidenceIds.forEach(function (id) {
        evidenceActions.appendChild(button("查看证据", "fusion-evidence-link", function () { window.openEvidence(id); }));
      });
      card.appendChild(evidenceActions);
      refs.facts.appendChild(card);
    });
  }

  function renderConditions() {
    refs.conditions.replaceChildren();
    var grid = element("div", "fusion-condition-grid");
    data.conditionChecks.forEach(function (item, index) {
      var card = element("div", "fusion-condition");
      var threshold = revealThreshold(index, data.conditionChecks.length);
      if (!phaseReached(4, threshold)) return;
      card.dataset.tone = item.tone;
      card.appendChild(element("strong", "", item.label));
      card.appendChild(element("span", "", "→ " + item.result));
      if (state.phase === 4 && state.phaseJustRevealed === threshold) card.classList.add("tech-reveal-enter");
      grid.appendChild(card);
    });
    refs.conditions.appendChild(grid);
    if (phaseReached(4, 4)) {
      var contracts = element("div", "fusion-contracts");
      data.conflicts.forEach(function (item) {
        var card = element("div", "fusion-contract");
        card.appendChild(element("strong", "", item.title));
        card.appendChild(element("span", "", item.context));
        card.appendChild(button("查看证据", "fusion-evidence-link", function () { window.openEvidence(item.evidenceId); }));
        contracts.appendChild(card);
      });
      refs.conditions.appendChild(contracts);
      refs.conditions.appendChild(element("p", "fusion-contract-note", "判断：两项记录属于不同采购 / 项目上下文，保持并列，不标记为金额冲突。"));
    }
  }

  function selectEvent(event) {
    state.highlightedEvidenceIds = event.sourceIds.slice();
    renderSources();
  }

  function renderTimeline() {
    refs.timeline.replaceChildren();
    data.evolutionEvents.forEach(function (event) {
      var card = element("article", "fusion-event");
      var control = button("", "fusion-event__button", function () { selectEvent(event); });
      var visible = itemAvailable(event, data.evolutionEvents, "availableAt");
      card.dataset.visible = visible ? "true" : "false";
      var peers = data.evolutionEvents.filter(function (candidate) { return candidate.availableAt === event.availableAt; });
      if (visible && event.availableAt === state.phase && state.phaseJustRevealed === revealThreshold(peers.indexOf(event), peers.length)) card.classList.add("tech-reveal-enter");
      control.disabled = !visible;
      control.appendChild(element("span", "fusion-event__date", event.date));
      control.appendChild(element("span", "fusion-event__relation", event.relation));
      control.appendChild(element("span", "fusion-event__text", event.event));
      card.appendChild(control);
      refs.timeline.appendChild(card);
    });
  }

  function render() {
    updateTopbar();
    renderProgress();
    renderRevealStatus();
    renderSources();
    renderGroups();
    renderFamilyNote();
    renderCriteria();
    renderFacts();
    renderConditions();
    renderTimeline();
    state.phaseJustRevealed = -1;
  }

  function runPhase(index) {
    state.phase = index;
    schedulePhaseReveals(index);
    render();
    state.timer = window.setTimeout(function () {
      clearPhaseRevealTimers(index);
      state.phaseRevealLevels[index] = revealPlans[index].length;
      if (index < data.phases.length - 1) {
        runPhase(index + 1);
        return;
      }
      state.running = false;
      state.completed = true;
      refs.start.textContent = "对齐融合已完成";
      render();
    }, data.phases[index].duration);
  }

  function startFusion() {
    if (state.started) return;
    state.started = true;
    state.running = true;
    refs.start.disabled = true;
    refs.start.textContent = "对齐融合运行中";
    runPhase(0);
  }

  var page = element("div", "fusion-page");
  page.appendChild(createHeader());
  page.appendChild(createProgress());
  page.appendChild(createRevealStatus());
  page.appendChild(createWorkbench());
  page.appendChild(createLower());
  shell.workspace.appendChild(page);
  render();
}());
