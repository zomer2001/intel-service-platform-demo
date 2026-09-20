(function () {
  "use strict";

  var data = window.VALUE_TECH_DATA;
  var shell = window.renderPlatform({
    projectTitle: "Lattice Mesh 技术还原专项",
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
    mode: "balanced",
    selectedId: "mesh",
    expertApplied: false,
    timer: null,
    phaseRevealLevels: [],
    phaseRevealTimers: [],
    phaseJustRevealed: -1
  };
  var refs = {};
  var revealPlans = [
    ["接收候选情报", "解析来源与对象", "建立候选条目", "形成待评估情报池"],
    ["计算任务相关性", "评估来源与技术密度", "判断信息增量", "形成六维分析结果"],
    ["汇总维度权重", "计算综合得分", "生成优先级序列", "确认综合研判排名"],
    ["读取还原目标", "调整评估权重", "重新计算候选价值", "形成技术还原优先序列"],
    ["应用专家聚焦", "补强关键未知维度", "比较排名变化", "确认动态价值判断"],
    ["提取高价值对象", "归纳关键未知", "关联后续行动", "生成价值研判结论"]
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
        var level = revealIndex + 1;
        if (!state.running || state.phase !== index || state.completed) return;
        state.phaseRevealLevels[index] = level;
        state.phaseJustRevealed = level;
        if (index === 3 && level >= 2) state.mode = "restoration";
        if (index === 4 && level >= 2) {
          state.expertApplied = true;
          state.mode = "restoration";
        }
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

  function selectedCandidate() {
    return data.candidates.find(function (candidate) { return candidate.id === state.selectedId; }) || data.candidates[0];
  }

  function adjustedScore(candidate, dimensionKey) {
    var base = candidate.scores[dimensionKey];
    if (!state.expertApplied) return base;
    return Math.min(5, base + (candidate.focusBoost[dimensionKey] || 0));
  }

  function weightedScore(candidate, modeName, expertApplied) {
    var mode = data.focusModes[modeName];
    var total = 0;
    data.dimensions.forEach(function (dimension) {
      var value = candidate.scores[dimension.key];
      if (expertApplied) value = Math.min(5, value + (candidate.focusBoost[dimension.key] || 0));
      total += value * mode.weights[dimension.key];
    });
    return Number(total.toFixed(2));
  }

  function ranking(modeName, expertApplied) {
    return data.candidates.map(function (candidate) {
      return { candidate: candidate, score: weightedScore(candidate, modeName, expertApplied) };
    }).sort(function (left, right) {
      return right.score - left.score || left.candidate.title.localeCompare(right.candidate.title, "zh-CN");
    });
  }

  function qualitative(score) {
    if (score >= 4.5) return "高";
    if (score >= 3.8) return "中高";
    if (score >= 3) return "中";
    return "低";
  }

  var baselineOrder = ranking("balanced", false).map(function (item) { return item.candidate.id; });

  function createHeader() {
    var header = element("header", "value-header");
    var title = element("div");
    var actions = element("div", "value-header__actions");
    refs.status = element("span", "value-status", "待启动");
    refs.start = button("开始价值研判", "value-action", startAnalysis);
    refs.start.dataset.primary = "true";
    title.appendChild(element("h1", "", data.task.title));
    title.appendChild(element("p", "", data.task.description));
    actions.appendChild(button("返回业务流程", "value-action", returnToFlow));
    actions.appendChild(refs.status);
    actions.appendChild(button("查看执行详情", "value-action", function () { window.openWorkflow("value"); }));
    actions.appendChild(refs.start);
    header.appendChild(title);
    header.appendChild(actions);
    return header;
  }

  function createControlBar() {
    var bar = element("section", "value-control-bar");
    var modePanel = element("article", "value-panel");
    var progressPanel = element("article", "value-panel");
    var switcher = element("div", "value-mode-switch");
    var expert = element("div", "value-expert");
    var expertCopy = element("div");

    modePanel.appendChild(element("p", "value-panel__eyebrow", "ASSESSMENT FOCUS"));
    modePanel.appendChild(element("h2", "value-panel__title", "价值研判重点"));
    modePanel.appendChild(element("p", "value-panel__description", "分数是针对当前任务的系统研判值，不是对信源的永久质量评级。"));
    Object.keys(data.focusModes).forEach(function (modeName) {
      var mode = data.focusModes[modeName];
      var item = button("", "value-mode", function () { setMode(modeName); });
      item.dataset.mode = modeName;
      item.appendChild(element("strong", "", mode.label));
      item.appendChild(element("span", "", mode.description));
      switcher.appendChild(item);
    });
    modePanel.appendChild(switcher);

    expertCopy.appendChild(element("strong", "", "专家聚焦：" + data.expertFocus.question));
    expertCopy.appendChild(element("span", "", data.expertFocus.description));
    refs.expertButton = button("应用专家聚焦", "", applyExpertFocus);
    expert.appendChild(expertCopy);
    expert.appendChild(refs.expertButton);
    modePanel.appendChild(expert);

    progressPanel.appendChild(element("p", "value-panel__eyebrow", "AUTOMATED ASSESSMENT"));
    progressPanel.appendChild(element("h2", "value-panel__title", "多维信息价值评估流程"));
    progressPanel.appendChild(element("p", "value-panel__description", "点击一次后系统按阶段自动执行；专家可在运行中调整任务语境。"));
    refs.progress = element("div", "value-progress");
    data.phases.forEach(function (phase) {
      var step = element("div", "value-progress__step", phase.label);
      step.dataset.state = "pending";
      refs.progress.appendChild(step);
    });
    progressPanel.appendChild(refs.progress);
    bar.appendChild(modePanel);
    bar.appendChild(progressPanel);
    return bar;
  }

  function panel(eyebrow, title) {
    var node = element("article", "value-panel");
    node.appendChild(element("p", "value-panel__eyebrow", eyebrow));
    node.appendChild(element("h3", "value-panel__title", title));
    return node;
  }

  function createWorkbench() {
    var workbench = element("section", "value-workbench");
    var candidates = panel("CANDIDATE INTELLIGENCE", "候选情报池");
    var assessment = panel("SIX-DIMENSION ASSESSMENT", "六维价值分析");
    var priority = panel("DYNAMIC PRIORITY", "综合优先级");
    refs.candidates = element("div", "value-candidate-list");
    refs.assessment = element("div");
    refs.ranking = element("div", "value-ranking");
    candidates.appendChild(refs.candidates);
    assessment.appendChild(refs.assessment);
    priority.appendChild(refs.ranking);
    workbench.appendChild(candidates);
    workbench.appendChild(assessment);
    workbench.appendChild(priority);
    return workbench;
  }

  function createOutput() {
    var output = panel("HIGH-VALUE OUTCOME", "高价值对象与关键未知");
    refs.output = element("div", "value-output");
    output.appendChild(refs.output);
    return output;
  }

  function updateTopbar() {
    var topbar = shell.shell.querySelector(".topbar");
    var status = state.completed ? "已完成" : state.running ? "研判中" : "待启动";
    topbar.querySelector(".topbar__project").textContent = "Lattice Mesh 技术还原专项";
    topbar.querySelector(".topbar__level").textContent = "技术级分析";
    topbar.querySelector(".topbar__object").textContent = "当前对象：" + data.task.object;
    topbar.querySelector(".topbar__status").textContent = "任务状态：" + status;
    refs.status.textContent = status;
    refs.status.dataset.state = state.completed ? "completed" : state.running ? "running" : "idle";
  }

  function renderProgress() {
    refs.progress.querySelectorAll(".value-progress__step").forEach(function (step, index) {
      step.dataset.state = index < state.phase || state.completed ? "completed" : index === state.phase ? "running" : "pending";
    });
  }

  function renderModes() {
    document.querySelectorAll(".value-mode").forEach(function (modeButton) {
      modeButton.setAttribute("aria-pressed", modeButton.dataset.mode === state.mode ? "true" : "false");
    });
    refs.expertButton.disabled = state.expertApplied;
    refs.expertButton.textContent = state.expertApplied ? "已应用专家聚焦" : "应用专家聚焦";
  }

  function selectCandidate(id) {
    state.selectedId = id;
    renderCandidates();
    renderAssessment();
    renderRanking();
  }

  function renderCandidates() {
    refs.candidates.replaceChildren();
    data.candidates.forEach(function (candidate, index) {
      var card = element("article", "value-candidate");
      var selector = button("", "value-candidate__button", function () { selectCandidate(candidate.id); });
      var threshold = revealThreshold(index, data.candidates.length);
      var visible = phaseReached(0, threshold);
      card.dataset.visible = visible ? "true" : "false";
      card.dataset.selected = candidate.id === state.selectedId ? "true" : "false";
      selector.disabled = !visible;
      if (visible && state.phase === 0 && state.phaseJustRevealed === threshold) card.classList.add("tech-reveal-enter");
      selector.appendChild(element("span", "value-candidate__title", candidate.title));
      selector.appendChild(element("span", "value-candidate__type", candidate.type));
      card.appendChild(selector);
      card.appendChild(element("span", "value-candidate__meta", candidate.source + " · " + candidate.date + " · " + candidate.object));
      card.appendChild(element("span", "value-candidate__summary", candidate.summary));
      card.appendChild(button("查看证据", "value-evidence-link", function () { window.openEvidence(candidate.evidenceId); }));
      refs.candidates.appendChild(card);
    });
  }

  function renderAssessment() {
    var candidate = selectedCandidate();
    var score = weightedScore(candidate, state.mode, state.expertApplied);
    var heading = element("div", "value-assessment-head");
    var dimensions = element("div", "value-dimensions");
    var why = element("div", "value-why");
    refs.assessment.replaceChildren();
    if (!phaseReached(1, 1)) {
      refs.assessment.appendChild(element("p", "value-panel__description", "等待候选情报进入后开始六维分析。"));
      return;
    }
    heading.appendChild(element("h4", "", candidate.object));
    heading.appendChild(element("span", "", phaseReached(1, 4) ? score.toFixed(2) + " / 5 · " + qualitative(score) : "分析中"));
    refs.assessment.appendChild(heading);
    data.dimensions.forEach(function (dimension, index) {
      var value = adjustedScore(candidate, dimension.key);
      var row = element("div", "value-dimension");
      var track = element("div", "value-dimension__track");
      var fill = element("div", "value-dimension__fill");
      var threshold = revealThreshold(index, data.dimensions.length);
      var visible = phaseReached(1, threshold);
      if (!visible) return;
      fill.style.width = visible ? String(value / 5 * 100) + "%" : "0";
      fill.title = dimension.description;
      track.appendChild(fill);
      row.appendChild(element("span", "value-dimension__label", dimension.label));
      row.appendChild(track);
      row.appendChild(element("span", "value-dimension__segment", visible ? qualitative(value) : "—"));
      if (visible && state.phase === 1 && state.phaseJustRevealed === threshold) row.classList.add("tech-reveal-enter");
      dimensions.appendChild(row);
    });
    refs.assessment.appendChild(dimensions);
    why.appendChild(element("strong", "", "为什么这条情报价值高？"));
    why.appendChild(element("p", "", phaseReached(1, 4) ? candidate.why : "系统正在逐维计算，并将在本环节末给出任务语境化解释。"));
    if (phaseReached(1, 4)) {
      refs.assessment.appendChild(why);
      refs.assessment.appendChild(element("p", "value-runtime-note", "说明：条形与排名为基于当前任务语境计算的系统运行值。"));
    }
  }

  function renderRanking() {
    refs.ranking.replaceChildren();
    if (!phaseReached(2, 1)) {
      refs.ranking.appendChild(element("p", "value-panel__description", "等待六维分析完成后生成综合优先级。"));
      return;
    }
    var items = phaseReached(2, 2) ? ranking(state.mode, state.expertApplied) : data.candidates.map(function (candidate) {
      return { candidate: candidate, score: weightedScore(candidate, state.mode, state.expertApplied) };
    });
    items.slice(0, 6).forEach(function (item, index) {
      var previous = baselineOrder.indexOf(item.candidate.id);
      var movement = previous - index;
      var threshold = revealThreshold(index, 6);
      var scoreVisible = phaseReached(2, threshold);
      if (!scoreVisible) return;
      var rank = button("", "value-rank-item", function () { selectCandidate(item.candidate.id); });
      rank.dataset.selected = item.candidate.id === state.selectedId ? "true" : "false";
      rank.appendChild(element("span", "value-rank-item__number", String(index + 1)));
      var copy = element("span");
      copy.appendChild(element("span", "value-rank-item__title", item.candidate.title));
      copy.appendChild(element("span", "value-rank-item__object", item.candidate.object + " · " + (scoreVisible ? item.score.toFixed(2) : "计算中")));
      rank.appendChild(copy);
      var move = element("span", "value-rank-item__move", phaseReached(4, 3) && movement !== 0 ? (movement > 0 ? "↑" : "↓") + String(Math.abs(movement)) : "—");
      move.dataset.direction = movement > 0 ? "up" : movement < 0 ? "down" : "same";
      rank.appendChild(move);
      if (scoreVisible && state.phase === 2 && state.phaseJustRevealed === threshold) rank.classList.add("tech-reveal-enter");
      refs.ranking.appendChild(rank);
    });
  }

  function renderOutput() {
    refs.output.replaceChildren();
    var objectGroup = element("section", "value-output__group");
    var unknownGroup = element("section", "value-output__group");
    objectGroup.appendChild(element("h4", "", "高价值对象"));
    unknownGroup.appendChild(element("h4", "", "关键未知"));
    if (!phaseReached(5, 1)) {
      objectGroup.appendChild(element("p", "value-panel__description", "等待综合优先级排序完成。"));
      unknownGroup.appendChild(element("p", "value-panel__description", "将从高价值证据中提取解释缺口。"));
    } else {
      var tags = element("div", "value-output__tags");
      var unknowns = element("ul", "value-output__unknowns");
      var objectCount = state.completed || state.phase > 5 ? data.highValueObjects.length : Math.ceil(data.highValueObjects.length * Math.min(revealLevel(), 2) / 2);
      var unknownCount = phaseReached(5, 3) ? (state.completed ? data.keyUnknowns.length : Math.ceil(data.keyUnknowns.length * (revealLevel() - 2) / 2)) : 0;
      data.highValueObjects.slice(0, objectCount).forEach(function (item) { tags.appendChild(element("span", "value-output__tag tech-reveal-enter", item)); });
      data.keyUnknowns.slice(0, unknownCount).forEach(function (item) { unknowns.appendChild(element("li", "tech-reveal-enter", item)); });
      objectGroup.appendChild(tags);
      unknownGroup.appendChild(unknowns);
    }
    refs.output.appendChild(objectGroup);
    refs.output.appendChild(unknownGroup);
  }

  function render() {
    updateTopbar();
    renderProgress();
    renderRevealStatus();
    renderModes();
    renderCandidates();
    renderAssessment();
    renderRanking();
    renderOutput();
    state.phaseJustRevealed = -1;
  }

  function setMode(modeName) {
    state.mode = modeName;
    renderModes();
    renderAssessment();
    renderRanking();
  }

  function applyExpertFocus() {
    state.expertApplied = true;
    state.mode = "restoration";
    renderModes();
    renderAssessment();
    renderRanking();
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
      refs.start.textContent = "本轮价值研判完成";
      render();
    }, data.phases[index].duration);
  }

  function startAnalysis() {
    if (state.started) return;
    state.started = true;
    state.running = true;
    refs.start.disabled = true;
    refs.start.textContent = "价值研判中";
    runPhase(0);
  }

  var page = element("div", "value-page");
  page.appendChild(createHeader());
  page.appendChild(createControlBar());
  page.appendChild(createRevealStatus());
  page.appendChild(createWorkbench());
  page.appendChild(createOutput());
  shell.workspace.appendChild(page);
  render();
}());
