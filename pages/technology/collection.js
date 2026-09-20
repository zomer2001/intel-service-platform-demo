(function () {
  "use strict";

  var data = window.COLLECTION_TECH_DATA;
  var shell = window.renderPlatform({
    projectTitle: data.task.topic,
    analysisLevel: "技术级分析",
    currentObject: "Lattice Mesh",
    taskStatus: "待启动",
    activeNavigation: "技术辅助还原与破解",
    logoPath: "../../assets/brand/vernal-institute-logo.png",
    enterpriseHref: "../workspace/enterprise.html",
    lineageHref: "../applications/lineage.html"
  });
  var state = {
    started: false,
    running: false,
    phase: -1,
    completed: false,
    timer: null,
    phaseRevealLevels: [],
    phaseRevealTimers: [],
    phaseJustRevealed: -1
  };
  var refs = {};
  var revealPlans = [
    ["解析采集任务", "装载信源策略", "启动定向采集器", "确认首轮采集范围"],
    ["接入首批资料", "提取来源元数据", "建立证据入口", "形成首轮采集结果"],
    ["识别新增对象", "判断对象相关性", "筛选高价值线索", "形成扩展建议"],
    ["生成检索组合", "匹配目标信源", "扩展采集路径", "确认定向检索任务"],
    ["接收增量证据", "核验发布主体", "更新对象证据链", "完成本轮证据补强"],
    ["更新解释缺口", "汇总采集增量", "检查停止条件", "生成阶段采集结论"]
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
    if (source === "enterprise" && window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.href = "../workspace/enterprise.html";
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

  function evidenceRecord(id) {
    return data.evidence.find(function (item) { return item.id === id; });
  }

  function availableEvidenceIds() {
    return data.evidenceTimeline.filter(function (item) {
      return itemAvailable(item, data.evidenceTimeline, "availableAt");
    }).map(function (item) { return item.evidenceId; });
  }

  function createHeader() {
    var header = element("header", "tech-header");
    var title = element("div");
    var actions = element("div", "tech-header__actions");
    refs.status = element("span", "tech-status", "待启动");
    refs.start = button("开始动态采集", "tech-action", startCollection);
    refs.start.dataset.primary = "true";
    title.appendChild(element("h1", "", data.task.title));
    title.appendChild(element("p", "", data.task.description));
    actions.appendChild(button("返回业务流程", "tech-action", returnToFlow));
    actions.appendChild(refs.status);
    actions.appendChild(button("查看执行详情", "tech-action", function () { window.openWorkflow("collection"); }));
    actions.appendChild(refs.start);
    header.appendChild(title);
    header.appendChild(actions);
    return header;
  }

  function createBrief() {
    var brief = element("section", "collection-brief");
    var objective = element("article", "collection-card");
    var gaps = element("article", "collection-card");
    refs.gaps = element("div", "collection-gap-strip");
    objective.appendChild(element("p", "collection-card__eyebrow", "当前任务"));
    objective.appendChild(element("h2", "collection-card__title", data.task.name));
    objective.appendChild(element("p", "collection-card__text", data.task.objective));
    gaps.appendChild(element("p", "collection-card__eyebrow", "当前关键未知"));
    gaps.appendChild(element("h2", "collection-card__title", "采集围绕解释缺口收敛"));
    gaps.appendChild(refs.gaps);
    brief.appendChild(objective);
    brief.appendChild(gaps);
    return brief;
  }

  function createProgress() {
    refs.progress = element("section", "collection-progress");
    data.phases.forEach(function (phase, index) {
      var step = element("div", "collection-progress__step", phase.label);
      step.dataset.number = String(index + 1);
      step.dataset.state = "pending";
      refs.progress.appendChild(step);
    });
    return refs.progress;
  }

  function createWorkbench() {
    var workbench = element("section", "collection-workbench");
    var sourcePanel = element("article", "collection-panel");
    var flowPanel = element("article", "collection-panel");
    var insightPanel = element("article", "collection-panel");
    refs.sources = element("div", "collection-source-list");
    refs.flow = element("div", "collection-flow");
    refs.insights = element("div", "collection-insights");
    sourcePanel.appendChild(element("p", "collection-panel__eyebrow", "SOURCE ORCHESTRATION"));
    sourcePanel.appendChild(element("h3", "collection-panel__title", "信源与采集器"));
    sourcePanel.appendChild(refs.sources);
    flowPanel.appendChild(element("p", "collection-panel__eyebrow", "RESULT-DRIVEN COLLECTION"));
    flowPanel.appendChild(element("h3", "collection-panel__title", "动态采集主链"));
    flowPanel.appendChild(refs.flow);
    insightPanel.appendChild(element("p", "collection-panel__eyebrow", "DYNAMIC CLUES"));
    insightPanel.appendChild(element("h3", "collection-panel__title", "新线索与检索路径"));
    insightPanel.appendChild(refs.insights);
    workbench.appendChild(sourcePanel);
    workbench.appendChild(flowPanel);
    workbench.appendChild(insightPanel);
    return workbench;
  }

  function createSummary() {
    var panel = element("section", "collection-panel");
    refs.summary = element("div", "collection-summary");
    panel.appendChild(element("p", "collection-panel__eyebrow", "COLLECTION OUTCOME"));
    panel.appendChild(element("h3", "collection-panel__title", "本轮采集结果摘要"));
    panel.appendChild(refs.summary);
    refs.summary.style.marginTop = "8px";
    return panel;
  }

  function updateTopbar() {
    var topbar = shell.shell.querySelector(".topbar");
    var status = state.completed ? "已完成" : state.running ? "采集中" : "待启动";
    topbar.querySelector(".topbar__project").textContent = data.task.topic;
    topbar.querySelector(".topbar__level").textContent = "技术级分析";
    topbar.querySelector(".topbar__object").textContent = "当前任务：" + data.task.name;
    topbar.querySelector(".topbar__status").textContent = "任务状态：" + status;
    refs.status.textContent = status;
    refs.status.dataset.state = state.completed ? "completed" : state.running ? "running" : "idle";
  }

  function renderGaps() {
    refs.gaps.replaceChildren();
    data.gaps.forEach(function (item) {
      var complete = phaseReached(item.finalAt, 4);
      var card = element("div", "collection-gap");
      card.dataset.complete = complete ? "true" : "false";
      card.title = item.question;
      card.appendChild(element("span", "collection-gap__label", item.label));
      card.appendChild(element("span", "collection-gap__status", complete ? item.final : item.initial));
      refs.gaps.appendChild(card);
    });
  }

  function renderProgress() {
    refs.progress.querySelectorAll(".collection-progress__step").forEach(function (step, index) {
      step.dataset.state = index < state.phase || state.completed ? "completed" : index === state.phase ? "running" : "pending";
    });
  }

  function renderSources() {
    var ids = availableEvidenceIds();
    var visibleGroupCount = !state.started
      ? 0
      : state.phase === 0 && !state.completed
        ? Math.ceil(data.sourceGroups.length * revealLevel() / 4)
        : data.sourceGroups.length;
    refs.sources.replaceChildren();
    data.sourceGroups.slice(0, visibleGroupCount).forEach(function (group, groupIndex) {
      var count = group.evidenceIds.filter(function (id) { return ids.indexOf(id) !== -1; }).length;
      var card = element("div", "collection-source");
      if (state.phase === 0 && state.phaseJustRevealed === revealThreshold(groupIndex, data.sourceGroups.length)) card.classList.add("tech-reveal-enter");
      card.appendChild(element("span", "collection-source__name", group.name));
      card.appendChild(element("span", "collection-source__count", String(count)));
      card.appendChild(element("span", "collection-source__status", state.running ? group.status : state.completed ? "本轮已停止" : "待启动"));
      card.appendChild(element("span", "collection-source__clue", "最近线索：" + (count || state.phase >= 2 ? group.lastClue : "—")));
      refs.sources.appendChild(card);
    });
  }

  function renderFlow() {
    refs.flow.replaceChildren();
    data.flow.forEach(function (item) {
      var node = element("article", "collection-flow-node");
      node.dataset.state = item.phase < state.phase || state.completed
        ? "visible"
        : item.phase === state.phase && phaseReached(item.phase, 1)
          ? "active"
          : "pending";
      node.appendChild(element("span", "collection-flow-node__kind", item.kind));
      node.appendChild(element("span", "collection-flow-node__title", item.title));
      node.appendChild(element("span", "collection-flow-node__detail", item.phase === state.phase && !phaseReached(item.phase, 2) ? "正在形成环节结果……" : item.detail));
      if (item.phase === state.phase && state.phaseJustRevealed === 1) node.classList.add("tech-reveal-enter");
      refs.flow.appendChild(node);
    });
  }

  function renderInsights() {
    refs.insights.replaceChildren();
    var cluesGroup = element("section", "collection-insight-group");
    var clueList = element("div", "collection-clue-list");
    var routesGroup = element("section", "collection-insight-group");
    var routeList = element("div", "collection-route-list");
    var evidenceGroup = element("section", "collection-insight-group");
    var evidenceActions = element("div", "collection-evidence-actions");
    var visibleClues = data.clues.filter(function (item) { return itemAvailable(item, data.clues, "availableAt"); });
    var visibleRoutes = data.routes.filter(function (item) { return itemAvailable(item, data.routes, "availableAt"); });
    cluesGroup.appendChild(element("h4", "", "新发现对象 · 轻量价值判断"));
    if (!visibleClues.length) clueList.appendChild(element("p", "collection-card__text", "等待首轮采集结果。"));
    visibleClues.forEach(function (item) {
      var clue = element("div", "collection-clue");
      var peers = data.clues.filter(function (candidate) { return candidate.availableAt === item.availableAt; });
      if (item.availableAt === state.phase && state.phaseJustRevealed === revealThreshold(peers.indexOf(item), peers.length)) clue.classList.add("tech-reveal-enter");
      clue.title = item.reason;
      clue.appendChild(element("span", "collection-clue__name", item.name + (item.expand ? " · 扩展" : " · 保留")));
      var value = element("span", "collection-clue__value", item.value);
      value.dataset.value = item.value;
      clue.appendChild(value);
      clueList.appendChild(clue);
    });
    cluesGroup.appendChild(clueList);
    routesGroup.appendChild(element("h4", "", "新检索路径"));
    if (!visibleRoutes.length) routeList.appendChild(element("p", "collection-card__text", "尚未生成新的定向检索路径。"));
    visibleRoutes.forEach(function (item) {
      var route = element("div", "collection-route");
      var peers = data.routes.filter(function (candidate) { return candidate.availableAt === item.availableAt; });
      if (item.availableAt === state.phase && state.phaseJustRevealed === revealThreshold(peers.indexOf(item), peers.length)) route.classList.add("tech-reveal-enter");
      route.appendChild(element("strong", "", item.path));
      route.appendChild(element("span", "", "预期结果：" + item.result));
      routeList.appendChild(route);
    });
    routesGroup.appendChild(routeList);
    evidenceGroup.appendChild(element("h4", "", "当前代表性证据"));
    availableEvidenceIds().slice(-4).forEach(function (id) {
      var record = evidenceRecord(id);
      evidenceActions.appendChild(button(record.title, "collection-evidence-button", function () { window.openEvidence(id); }));
    });
    if (!evidenceActions.children.length) evidenceActions.appendChild(element("span", "collection-card__text", "尚未形成证据入口。"));
    evidenceGroup.appendChild(evidenceActions);
    refs.insights.appendChild(cluesGroup);
    refs.insights.appendChild(routesGroup);
    refs.insights.appendChild(evidenceGroup);
  }

  function summaryValues() {
    var ids = availableEvidenceIds();
    var newlyAdded = data.evidenceTimeline.filter(function (item) { return item.availableAt >= 2 && ids.indexOf(item.evidenceId) !== -1; });
    var publishers = {};
    newlyAdded.forEach(function (item) { publishers[evidenceRecord(item.evidenceId).publisher] = true; });
    var visibleClues = data.clues.filter(function (item) { return itemAvailable(item, data.clues, "availableAt") && item.expand; });
    var visibleRoutes = data.routes.filter(function (item) { return itemAvailable(item, data.routes, "availableAt"); });
    var strengthened = data.gaps.filter(function (item) { return phaseReached(item.finalAt, 4) && item.final.indexOf("缺口") === -1; });
    return {
      sources: Object.keys(publishers).length,
      objects: visibleClues.length,
      routes: visibleRoutes.length,
      gaps: strengthened.length,
      remaining: data.gaps.length - strengthened.length
    };
  }

  function renderSummary() {
    refs.summary.replaceChildren();
    if (!phaseReached(5, 1)) {
      refs.summary.appendChild(element("p", "collection-card__text", "等待各采集环节完成后生成结果摘要。"));
      return;
    }
    var values = summaryValues();
    var visibleMetricCount = state.completed || state.phase > 5 ? data.finalSummary.fields.length : Math.ceil(data.finalSummary.fields.length * Math.min(revealLevel(), 3) / 3);
    data.finalSummary.fields.slice(0, visibleMetricCount).forEach(function (field) {
      var metric = element("div", "collection-summary__metric");
      if (state.phase === 5 && state.phaseJustRevealed > 0) metric.classList.add("tech-reveal-enter");
      metric.appendChild(element("span", "collection-summary__value", String(values[field.key])));
      metric.appendChild(element("span", "collection-summary__label", field.label + " · 系统运行值"));
      refs.summary.appendChild(metric);
    });
    if (!phaseReached(5, 4)) return;
    var stop = element("div", "collection-stop tech-reveal-enter");
    stop.appendChild(element("h4", "", state.completed ? "停止条件已满足" : "停止判断"));
    stop.appendChild((function () {
      var list = element("ul");
      data.stopConditions.forEach(function (text) { list.appendChild(element("li", "", text)); });
      return list;
    }()));
    refs.summary.appendChild(stop);
  }

  function render() {
    updateTopbar();
    renderGaps();
    renderProgress();
    renderRevealStatus();
    renderSources();
    renderFlow();
    renderInsights();
    renderSummary();
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
      refs.start.textContent = "本轮动态采集完成";
      render();
    }, data.phases[index].duration);
  }

  function startCollection() {
    if (state.started) return;
    state.started = true;
    state.running = true;
    refs.start.disabled = true;
    refs.start.textContent = "动态采集中";
    runPhase(0);
  }

  var page = element("div", "tech-page");
  page.appendChild(createHeader());
  page.appendChild(createBrief());
  page.appendChild(createProgress());
  page.appendChild(createRevealStatus());
  page.appendChild(createWorkbench());
  page.appendChild(createSummary());
  shell.workspace.appendChild(page);
  render();
}());
