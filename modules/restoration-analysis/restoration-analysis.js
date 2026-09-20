(function () {
  "use strict";

  var data = window.RestorationAnalysisData;
  var components = window.PlatformComponents;
  var runtime = {
    opensource: { index: -1, timer: null, running: false, finished: false, views: [] },
    parameters: { index: -1, timer: null, running: false, finished: false, views: [] }
  };

  function el(tag, className, text) { return components.element(tag, className, text); }

  function formalText(value) {
    return String(value === undefined || value === null ? "—" : value)
      .replace(/DEMO/gi, "样例")
      .replace(/演示数据/g, "样例研判数据")
      .replace(/演示研判/g, "公开资料研判")
      .replace(/演示参数/g, "样例参数")
      .replace(/演示假设/g, "待验证假设")
      .replace(/演示状态/g, "样例运行状态")
      .replace(/演示/g, "样例");
  }

  function toneFor(value) {
    var text = String(value || "");
    if (/已|可直接|完整|高|形成|确认/.test(text)) return "success";
    if (/运行|适配|发布|动态/.test(text)) return "running";
    if (/待|部分|继续|参考|校准/.test(text)) return "warning";
    if (/缺口|冲突|自研/.test(text)) return "danger";
    return "primary";
  }

  function badge(value, tone) {
    var node = el("span", "intel-badge", formalText(value));
    node.dataset.tone = tone || toneFor(value);
    return node;
  }

  function metric(label, value) {
    var node = el("article", "intel-metric");
    node.appendChild(el("span", "", label));
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

  function button(label, tone, onClick) {
    return components.createButton({ label: label, tone: tone || "secondary", onClick: onClick });
  }

  function downloadLink(label, filename, content, type) {
    var link = el("a", "button button--secondary", label);
    link.href = "data:" + (type || "text/plain;charset=utf-8") + "," + encodeURIComponent(content);
    link.download = filename;
    return link;
  }

  function list(items, ordered) {
    var node = el(ordered ? "ol" : "ul");
    items.forEach(function (item) { node.appendChild(el("li", "", formalText(item))); });
    return node;
  }

  function openPrinciple(principle) {
    components.openDrawer({
      kicker: principle.id + " · " + principle.level,
      title: principle.name,
      sections: [
        { title: "原理说明", content: el("p", "", principle.description) },
        { title: "输入输出", content: definitionList([
          { label: "输入", value: principle.inputs },
          { label: "输出", value: principle.outputs },
          { label: "支撑依据", value: principle.evidence },
          { label: "当前状态", value: principle.status },
          { label: "研判置信度", value: principle.confidence }
        ]) },
        { title: "后续验证", content: definitionList([
          { label: "开源映射", value: principle.opensource_count + " 项" },
          { label: "验证参数", value: principle.parameter_count + " 项" },
          { label: "待回答问题", value: "能否在弱网、资源受限和异构接口条件下保持预期功能。" }
        ]) },
        { title: "结论边界", content: el("p", "", "公开资料研判，仅呈现候选原理与验证路径，不代表对真实系统内部实现的确认。") }
      ]
    });
  }

  function openScenario(scenario) {
    var principleList = el("div", "intel-actions");
    scenario.principles.forEach(function (id) {
      var principle = data.principles.find(function (item) { return item.id === id; });
      if (principle) principleList.appendChild(button(id + " " + principle.name, "secondary", function () { openPrinciple(principle); }));
    });
    components.openDrawer({
      kicker: scenario.id + " · " + scenario.category,
      title: scenario.name,
      sections: [
        { title: "推演目标", content: el("p", "", scenario.goal) },
        { title: "场景环境", content: el("p", "", scenario.environment) },
        { title: "参与对象", content: list(scenario.actors, false) },
        { title: "执行步骤", content: list(scenario.steps, true) },
        { title: "评价判据", content: list(scenario.criteria, false) },
        { title: "关联原理", content: principleList },
        { title: "参数包", content: definitionList([{ label: "关联参数包", value: scenario.parameter_pack }, { label: "数据说明", value: "样例研判数据／公开资料研判，仅供分析参考" }]) }
      ]
    });
  }

  function renderScenarios(mount) {
    var panel = el("div", "intel-tab-panel");
    panel.appendChild(metrics([
      { label: "推演场景", value: data.scenarios.length + " 个" },
      { label: "覆盖类别", value: new Set(data.scenarios.map(function (item) { return item.category; })).size + " 类" },
      { label: "关联原理", value: data.principles.length + " 项" },
      { label: "方案版本", value: data.meta.scenario_version }
    ]));
    var grid = el("div", "rest-scenarios");
    data.scenarios.forEach(function (scenario) {
      var card = el("button", "rest-scenario"); card.type = "button";
      var top = el("div", "intel-actions"); top.appendChild(badge(scenario.id, "primary")); top.appendChild(badge(scenario.status));
      card.appendChild(top);
      card.appendChild(el("h3", "", scenario.name));
      card.appendChild(el("p", "", scenario.goal));
      var foot = el("div", "rest-scenario__foot");
      foot.appendChild(el("small", "", scenario.category));
      foot.appendChild(el("small", "", scenario.principles.length + " 项关联原理"));
      card.appendChild(foot);
      card.addEventListener("click", function () { openScenario(scenario); });
      grid.appendChild(card);
    });
    panel.appendChild(section("业务场景推演方案集", "从业务目标、运行环境、执行步骤和评价判据组织可验证方案。", grid));
    var summary = el("div", "intel-grid-equal");
    summary.appendChild(section("方案组织方式", "场景与原理、参数包保持可追溯关联。", definitionList([
      { label: "输入", value: "任务目标、网络约束、数据负载" },
      { label: "处理", value: "场景拆分、步骤编排、判据生成" },
      { label: "输出", value: "可执行推演方案与参数包引用" }
    ])));
    summary.appendChild(section("使用说明", "点击任一场景查看完整方案。", el("p", "", "场景中的定量判据属于样例参数，需要在后续仿真或专家复核中校准。")));
    panel.appendChild(summary);
    mount.replaceChildren(panel);
  }

  function principleEdges() {
    var seen = {};
    var edges = [];
    data.scenarios.forEach(function (scenario) {
      for (var i = 0; i < scenario.principles.length - 1; i += 1) {
        var key = scenario.principles[i] + "-" + scenario.principles[i + 1];
        if (!seen[key]) { seen[key] = true; edges.push([scenario.principles[i], scenario.principles[i + 1]]); }
      }
    });
    return edges;
  }

  function renderPrinciples(mount) {
    var panel = el("div", "intel-tab-panel");
    panel.appendChild(metrics([
      { label: "节点类型", value: "4 类" },
      { label: "原理节点", value: data.principles.length + " 个" },
      { label: "关系路径", value: principleEdges().length + " 条" },
      { label: "图谱版本", value: data.meta.principle_version }
    ]));
    var layout = el("div", "rest-principle-layout");
    var overflow = el("div", "intel-overflow");
    var graph = el("div", "rest-graph");
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "rest-graph__lines"); svg.setAttribute("viewBox", "0 0 100 100"); svg.setAttribute("preserveAspectRatio", "none");
    var levels = ["目标能力", "关键原理", "功能模块", "实现单元"];
    var positions = {};
    levels.forEach(function (level, levelIndex) {
      var items = data.principles.filter(function (item) { return item.level === level; });
      items.forEach(function (item, itemIndex) {
        positions[item.id] = { x: [12, 38, 65, 88][levelIndex], y: 14 + (itemIndex * (72 / Math.max(1, items.length - 1))) };
      });
    });
    principleEdges().forEach(function (edge) {
      if (!positions[edge[0]] || !positions[edge[1]]) return;
      var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", positions[edge[0]].x); line.setAttribute("y1", positions[edge[0]].y);
      line.setAttribute("x2", positions[edge[1]].x); line.setAttribute("y2", positions[edge[1]].y); svg.appendChild(line);
    });
    graph.appendChild(svg);
    var detail = el("aside", "intel-section rest-detail-sticky");
    function selectPrinciple(principle, control) {
      graph.querySelectorAll("button").forEach(function (item) { item.setAttribute("aria-pressed", item === control ? "true" : "false"); });
      detail.replaceChildren();
      detail.appendChild(el("span", "intel-kicker", principle.id + " · " + principle.level));
      detail.appendChild(el("h3", "", principle.name));
      detail.appendChild(el("p", "", principle.description));
      detail.appendChild(definitionList([
        { label: "输入", value: principle.inputs },
        { label: "输出", value: principle.outputs },
        { label: "状态", value: principle.status },
        { label: "置信度", value: principle.confidence }
      ]));
      detail.appendChild(button("查看完整节点详情", "secondary", function () { openPrinciple(principle); }));
    }
    data.principles.forEach(function (principle, index) {
      var pos = positions[principle.id];
      var control = el("button", "rest-graph__node"); control.type = "button"; control.dataset.level = principle.level;
      control.style.left = pos.x + "%"; control.style.top = pos.y + "%";
      control.appendChild(el("strong", "", principle.id + " " + principle.name));
      control.appendChild(el("small", "", principle.level + " · " + principle.confidence));
      control.setAttribute("aria-pressed", index === 0 ? "true" : "false");
      control.addEventListener("click", function () { selectPrinciple(principle, control); });
      graph.appendChild(control);
    });
    overflow.appendChild(graph); layout.appendChild(overflow); layout.appendChild(detail);
    panel.appendChild(section("技术原理网状图", "节点表示目标能力、关键原理、功能模块与实现单元；连线来自场景中的关联路径。", layout));
    selectPrinciple(data.principles[0], graph.querySelector("button"));
    mount.replaceChildren(panel);
  }

  function getPath(nodeId) {
    var result = [];
    var current = data.opensource_nodes.find(function (item) { return item.id === nodeId; });
    while (current) {
      result.push(current.id);
      current = current.parent ? data.opensource_nodes.find(function (item) { return item.id === current.parent; }) : null;
    }
    return result;
  }

  function projectDrawer(project) {
    var node = data.opensource_nodes.find(function (item) { return item.id === project.node; });
    var nodeName = node ? node.name : project.node;
    var resourceTypes = {
      O04: "轻量发布订阅组件",
      O05: "断连缓存与恢复组件",
      O06: "节点发现与邻接管理组件",
      O07: "Schema注册与演化组件",
      O08: "接口网关与协议适配组件",
      O10: "本地持久化队列",
      O11: "分布式状态同步库",
      O12: "边缘资源监测组件",
      O13: "约束任务调度组件",
      O14: "任务迁移与恢复原型"
    };
    var manifest = project.manifest || (project.language === "Rust" ? "Cargo.toml" : (project.language === "Go" ? "go.mod" : (project.language === "Python" ? "pyproject.toml" : "build.config")));
    var grade = project.match >= 85 ? "A级重点候选" : (project.match >= 75 ? "B级工程参考" : "C级分析参考");
    var tabs = [
      { id: "overview", label: "项目概览" },
      { id: "files", label: "文件与代码" },
      { id: "architecture", label: "代码架构" },
      { id: "mapping", label: "技术映射" }
    ];
    var wrapper = el("div", "rest-repo-drawer");
    var metrics = el("div", "rest-repo-metrics");
    [["匹配度（研判）", project.match, "blue"], ["可信度（研判）", project.credibility, "green"], [grade, "", "gray"], ["公开仓库", "", "gray"]].forEach(function (item) {
      var metric = el("span"); metric.dataset.tone = item[2]; metric.appendChild(document.createTextNode(item[0] + (item[1] === "" ? "" : " "))); if (item[1] !== "") metric.appendChild(el("strong", "", item[1])); metrics.appendChild(metric);
    });
    var tablist = el("div", "rest-repo-tabs");
    tablist.setAttribute("role", "tablist");
    var content = el("div", "rest-repo-content");
    var note = el("p", "rest-repo-note", "许可、语言、目录和仓库链接来自公开仓库快照；匹配度、可信度、复用判断和覆盖率是本系统研判，不代表 Lattice Mesh 的真实内部代码。");

    function overviewPanel() {
      var fragment = document.createDocumentFragment();
      var summary = el("section", "rest-repo-summary"); summary.appendChild(el("span", "", "项目摘要")); summary.appendChild(el("p", "", project.name + " 是面向“" + nodeName + "”的公开候选资源。索引智能体依据代码目录、接口说明、测试覆盖和维护状态，将其映射为“" + project.reuse + "”资源；当前评估重点不是项目名称本身，而是其中可独立提取、验证和替换的工程模块。")); fragment.appendChild(summary);
      var overview = el("div", "rest-repo-overview-grid");
      [["资源类型", resourceTypes[project.node] || "开源工程候选资源"], ["对应技术单元", nodeName], ["工程利用判断", project.reuse], ["开发语言", project.language], ["开源许可", project.license], ["维护 / 测试", project.activity + " / " + project.tests], ["来源快照", (project.sourceRef || "main") + " · " + (project.snapshotDate || "—")]].forEach(function (item) {
        var card = el("div"); card.appendChild(el("span", "", item[0])); card.appendChild(el("strong", "", item[1])); overview.appendChild(card);
      });
      fragment.appendChild(overview);
      var fact = el("section", "rest-repo-summary"); fact.appendChild(el("span", "", "公开仓库事实")); fact.appendChild(el("p", "", project.publicFact || project.note)); fragment.appendChild(fact);
      fragment.appendChild(el("span", "rest-repo-section-title", "可提取能力"));
      var capabilities = el("div", "rest-repo-capabilities"); (project.capabilities || [nodeName, "接口适配", "状态与异常处理", "最小样例验证"]).forEach(function (label) { capabilities.appendChild(badge(label)); }); fragment.appendChild(capabilities);
      var advice = el("section", "rest-repo-advice"); advice.appendChild(el("span", "", "建议利用方式")); advice.appendChild(el("p", "", project.extractionAdvice || "先运行最小样例完成基线复现，再从核心目录中提取独立机制，通过适配层接入验证环境。")); var link = el("a", "", "打开公开仓库"); link.href = project.url; link.target = "_blank"; link.rel = "noreferrer"; advice.appendChild(link); fragment.appendChild(advice);
      return fragment;
    }

    function filesPanel() {
      var fragment = document.createDocumentFragment();
      var summary = el("section", "rest-repo-summary"); summary.appendChild(el("span", "", "文件扫描结论")); summary.appendChild(el("p", "", "智能体已识别构建入口、核心实现、适配层、最小样例、测试目录和架构文档，并标注其在技术还原中的用途。")); fragment.appendChild(summary);
      var list = el("div", "rest-repo-files");
      (project.files || [[manifest, "依赖、构建目标与特性开关；用于判断运行环境和第三方依赖边界。", "构建配置"], ["src/core/", nodeName + "的核心实现目录；包含关键状态机、数据结构或处理策略。", "原理参考"], ["examples/", "最小可运行样例；用于快速复现基本能力并提取默认配置。", "直接验证"], ["tests/", "测试目录与异常场景用例；用于评估边界条件。", "可信核验"]]).forEach(function (item) {
        var row = el("div"); row.appendChild(el("code", "", item[0])); row.appendChild(el("p", "", item[1])); row.appendChild(el("span", "", item[2])); list.appendChild(row);
      });
      fragment.appendChild(list); return fragment;
    }

    function architecturePanel() {
      var fragment = document.createDocumentFragment();
      var block = el("section", "rest-repo-architecture"); block.appendChild(el("span", "rest-repo-section-title", "代码调用与依赖结构"));
      var architecture = project.architecture || { flow: [["接入与接口层", "公开接口和配置入口"], ["核心机制层", "围绕“" + nodeName + "”实现核心逻辑"], ["适配与运行层", "连接网络、存储和测试环境"]], notes: [["主要入口", "从构建文件、入口目录和 examples/ 定位启动路径。"], ["核心调用链", "接口请求 → 核心处理器 → 适配器 → 运行状态回传。"], ["主要依赖", "运行时、序列化、网络和存储依赖需要单独核验。"], ["替换边界", "核心机制与适配层分离，可替换协议、数据模型和运行约束。"]] };
      var flow = el("div", "rest-repo-architecture__flow"); architecture.flow.forEach(function (item, index) { if (index) flow.appendChild(el("i", "", "→")); var card = el("div"); card.appendChild(el("strong", "", item[0])); card.appendChild(el("span", "", item[1])); flow.appendChild(card); }); block.appendChild(flow);
      var notes = el("div", "rest-repo-architecture__notes"); architecture.notes.forEach(function (item) { var card = el("div"); card.appendChild(el("span", "", item[0])); card.appendChild(el("p", "", item[1])); notes.appendChild(card); }); block.appendChild(notes); fragment.appendChild(block); return fragment;
    }

    function mappingPanel() {
      var fragment = document.createDocumentFragment();
      var fact = el("section", "rest-repo-summary"); fact.appendChild(el("span", "", "公开事实与系统研判分界")); fact.appendChild(el("p", "", "许可、语言、目录和仓库活跃度来自公开仓库快照；下面的覆盖比例、匹配度和复用等级是索引智能体结合目标节点做出的工程研判。")); fragment.appendChild(fact);
      var list = el("div", "rest-repo-map-list"); [["直接覆盖", nodeName + "的通用处理流程、基本数据结构和最小运行样例。", (node ? node.coverage : project.match) + "%", "green"], ["二次适配", "接口定义、消息格式、资源约束和验证环境连接方式。", "重点工作", "blue"], ["仅供参考", "异常恢复、分布式一致性和性能优化策略，需要结合场景重新验证。", "原理参考", "gray"], ["继续自研", "Lattice Mesh 专有接口语义、任务规则和内部实现不可由公开仓库直接推定。", "明确缺口", "red"]].forEach(function (item) { var row = el("div"); row.dataset.tone = item[3]; row.appendChild(el("strong", "", item[0])); row.appendChild(el("p", "", item[1])); row.appendChild(el("span", "", item[2])); list.appendChild(row); }); fragment.appendChild(list);
      fragment.appendChild(el("span", "rest-repo-section-title", "系统研判评分构成")); var scores = el("div", "rest-repo-scores"); [["代码可读性", Math.min(96, project.credibility + 5)], ["测试完整性", Math.min(94, project.credibility + 2)], ["维护活跃度", project.credibility], ["技术映射一致性", project.match]].forEach(function (item) { var card = el("div"); card.appendChild(el("span", "", item[0])); card.appendChild(el("strong", "", item[1])); scores.appendChild(card); }); fragment.appendChild(scores);
      var advice = el("section", "rest-repo-advice"); advice.appendChild(el("span", "", "推荐验证场景")); advice.appendChild(el("p", "", "将项目最小样例接入“弱网多节点数据同步”场景，观察其可复用机制与目标场景之间的接口、数据模型和异常恢复差距。")); fragment.appendChild(advice); return fragment;
    }

    function paint(tabId) {
      tablist.querySelectorAll("button").forEach(function (item) { var active = item.dataset.tab === tabId; item.setAttribute("aria-selected", active ? "true" : "false"); item.dataset.active = active ? "true" : "false"; });
      content.replaceChildren();
      if (tabId === "overview") content.appendChild(overviewPanel());
      else if (tabId === "files") content.appendChild(filesPanel());
      else if (tabId === "architecture") content.appendChild(architecturePanel());
      else content.appendChild(mappingPanel());
      content.appendChild(note.cloneNode(true));
    }
    tabs.forEach(function (tab, index) {
      var control = el("button", "", tab.label); control.type = "button"; control.dataset.tab = tab.id; control.setAttribute("role", "tab");
      control.setAttribute("aria-selected", index === 0 ? "true" : "false");
      control.addEventListener("click", function () { paint(tab.id); }); tablist.appendChild(control);
    });
    wrapper.appendChild(metrics); wrapper.appendChild(tablist); wrapper.appendChild(content); paint("overview");
    components.openDrawer({
      kicker: "‹/› 开源项目工程详情 · " + project.id,
      title: project.name,
      sections: [{ title: "", content: wrapper }]
    });
    var shell = document.querySelector("#overlay-host .drawer");
    if (shell) {
      shell.classList.add("rest-repository-shell");
      var heading = shell.querySelector(".drawer__header > div");
      if (heading) heading.appendChild(el("p", "rest-repo-subtitle", "项目概览、文件内容、代码架构与目标技术映射"));
    }
  }

  function versionDrawer(title, versions) {
    if (title.indexOf("开源项目索引矩阵") === 0) {
      openSourceVersionDrawer(versions);
      return;
    }
    if (title.indexOf("仿真参数包") === 0) {
      openParameterVersionDrawer(versions);
      return;
    }
    var listNode = el("div", "rest-version-list");
    versions.slice().reverse().forEach(function (version) {
      var item = el("article", "rest-version");
      item.appendChild(el("span", "intel-kicker", version.date + " · " + version.type));
      item.appendChild(el("strong", "", version.version));
      item.appendChild(el("p", "", version.summary));
      item.appendChild(el("p", "", version.delta));
      item.appendChild(badge(version.review));
      listNode.appendChild(item);
    });
    components.openDrawer({
      kicker: "版本时间轴",
      title: title,
      sections: [
        { title: "历史版本", content: listNode },
        { title: "更新原则", content: el("p", "", "定时任务与新线索事件均可触发新版本；所有变更保留触发来源、智能体和人工复核状态。") }
      ]
    });
  }

  function openSourceVersionDrawer(versions) {
    var ordered = versions.slice().reverse();
    var wrapper = el("div", "rest-source-version-drawer");
    var overview = el("div", "rest-source-version-overview");
    [["累计版本", versions.length], ["自动生成", Math.max(0, versions.length - 1)], ["待人工复核", versions.length]].forEach(function (item) { var card = el("div"); card.appendChild(el("span", "", item[0])); card.appendChild(el("strong", "", item[1])); overview.appendChild(card); });
    var list = el("div", "rest-source-version-list");
    var detail = el("div", "rest-source-version-detail");
    function formal(value) { return String(value || "").replace(/示例/g, "样例").replace(/（演示）/g, "").replace(/演示/g, "样例"); }
    function selectVersion(version, control) {
      list.querySelectorAll("button").forEach(function (item) { item.dataset.active = item === control ? "true" : "false"; });
      detail.replaceChildren();
      var tags = el("div", "rest-source-version-tags"); [version.type, version.agent, formal(version.review)].forEach(function (value, index) { var tag = el("span", "", value); tag.dataset.tone = index === 2 ? "red" : (index === 1 ? "green" : "blue"); tags.appendChild(tag); }); detail.appendChild(tags);
      detail.appendChild(definitionList([{ label: "版本号", value: version.version }, { label: "触发条件", value: formal(version.trigger) }, { label: "执行智能体", value: version.agent }, { label: "变化摘要", value: formal(version.delta) }]));
      var audit = el("section", "rest-source-version-audit"); audit.appendChild(el("strong", "", "无人化执行审计")); audit.appendChild(el("p", "", "该版本由任务调度器自动触发，智能体完成读取、分析、校核和版本写入；仅异常或规则冲突进入人工复核队列。")); detail.appendChild(audit);
    }
    ordered.forEach(function (version, index) {
      var control = el("button", "rest-source-version-entry"); control.type = "button";
      var axis = el("span", "rest-source-version-axis"); axis.appendChild(el("i")); if (index < ordered.length - 1) axis.appendChild(el("em")); control.appendChild(axis);
      var copy = el("div"); copy.appendChild(el("small", "", version.date + " · " + version.type)); copy.appendChild(el("strong", "", version.version)); copy.appendChild(el("p", "", version.summary)); control.appendChild(copy);
      control.addEventListener("click", function () { selectVersion(version, control); }); list.appendChild(control); if (index === 0) window.setTimeout(function () { selectVersion(version, control); }, 0);
    });
    wrapper.appendChild(overview); wrapper.appendChild(list); wrapper.appendChild(detail);
    components.openDrawer({ kicker: "↶ 版本控制与智能体执行记录", title: "开源项目索引矩阵版本时间轴", sections: [{ title: "", content: wrapper }] });
    var shell = document.querySelector("#overlay-host .drawer");
    if (shell) {
      shell.classList.add("rest-source-version-shell");
      var heading = shell.querySelector(".drawer__header > div");
      if (heading) heading.appendChild(el("p", "rest-repo-subtitle", "每个版本记录触发方式、执行智能体、变化内容和人工复核状态"));
    }
  }

  function openParameterVersionDrawer(versions) {
    var ordered = versions.slice().reverse();
    var wrapper = el("div", "rest-source-version-drawer");
    var overview = el("div", "rest-source-version-overview");
    [["累计版本", versions.length], ["自动生成", Math.max(0, versions.length - 1)], ["待人工复核", 4]].forEach(function (item) { var card = el("div"); card.appendChild(el("span", "", item[0])); card.appendChild(el("strong", "", item[1])); overview.appendChild(card); });
    var list = el("div", "rest-source-version-list");
    var detail = el("div", "rest-source-version-detail");
    function formal(value) { return String(value || "").replace(/演示/g, "样例"); }
    function selectVersion(version, control) {
      list.querySelectorAll("button").forEach(function (item) { item.dataset.active = item === control ? "true" : "false"; });
      detail.replaceChildren();
      var tags = el("div", "rest-source-version-tags"); [version.type, version.agent, formal(version.review)].forEach(function (value, index) { var tag = el("span", "", value); tag.dataset.tone = index === 2 ? "red" : (index === 1 ? "green" : "blue"); tags.appendChild(tag); }); detail.appendChild(tags);
      detail.appendChild(definitionList([{ label: "版本号", value: version.version }, { label: "触发条件", value: formal(version.trigger) }, { label: "执行智能体", value: version.agent }, { label: "变化摘要", value: formal(version.delta) }]));
      var audit = el("section", "rest-source-version-audit"); audit.appendChild(el("strong", "", "无人化执行审计")); audit.appendChild(el("p", "", "该版本由任务调度器自动触发，智能体完成读取、分析、校核和版本写入；仅异常或规则冲突进入人工复核队列。")); detail.appendChild(audit);
    }
    ordered.forEach(function (version, index) {
      var control = el("button", "rest-source-version-entry"); control.type = "button";
      var axis = el("span", "rest-source-version-axis"); axis.appendChild(el("i")); if (index < ordered.length - 1) axis.appendChild(el("em")); control.appendChild(axis);
      var copy = el("div"); copy.appendChild(el("small", "", version.date + " · " + version.type)); copy.appendChild(el("strong", "", version.version)); copy.appendChild(el("p", "", version.summary)); control.appendChild(copy);
      control.addEventListener("click", function () { selectVersion(version, control); }); list.appendChild(control); if (index === 0) window.setTimeout(function () { selectVersion(version, control); }, 0);
    });
    wrapper.appendChild(overview); wrapper.appendChild(list); wrapper.appendChild(detail);
    components.openDrawer({ kicker: "↶ 版本控制与智能体执行记录", title: "仿真参数包版本时间轴", sections: [{ title: "", content: wrapper }] });
    var shell = document.querySelector("#overlay-host .drawer");
    if (shell) {
      shell.classList.add("rest-source-version-shell");
      var heading = shell.querySelector(".drawer__header > div");
      if (heading) heading.appendChild(el("p", "rest-repo-subtitle", "每个版本记录触发方式、执行智能体、变化内容和人工复核状态"));
    }
  }

  function createDynamic(kind, names) {
    var state = runtime[kind];
    var box = el("section", "intel-dynamic");
    var head = el("div", "intel-dynamic__head");
    var status = el("div", "intel-dynamic__status");
    status.appendChild(el("i", "intel-dynamic__dot"));
    var statusText = el("span", "", state.finished ? "本轮任务已完成" : (state.running ? "自主任务运行中" : "等待启动自主任务"));
    status.appendChild(statusText);
    var start = button(state.finished ? "重新运行" : "开始自主运行", "primary", function () { startDynamic(kind, names); });
    head.appendChild(status); head.appendChild(start); box.appendChild(head);
    var progress = el("div", "intel-progress"); var bar = el("div", "intel-progress__bar"); progress.appendChild(bar); box.appendChild(progress);
    var steps = el("div", "intel-agent-steps");
    names.forEach(function (name) { steps.appendChild(el("div", "intel-agent-step", name)); });
    box.appendChild(steps);
    var view = { status: statusText, start: start, bar: bar, steps: Array.from(steps.children) };
    state.views.push(view); updateDynamicView(kind, names);
    return box;
  }

  function updateDynamicView(kind, names) {
    var state = runtime[kind];
    state.views.forEach(function (view) {
      view.status.textContent = state.finished ? "本轮任务已完成" : (state.running ? "自主任务运行中" : "等待启动自主任务");
      view.start.textContent = state.finished ? "重新运行" : (state.running ? "运行中" : "开始自主运行");
      view.start.disabled = state.running;
      view.bar.style.width = ((Math.max(0, state.index + 1) / names.length) * 100) + "%";
      view.steps.forEach(function (step, index) {
        step.dataset.state = index < state.index ? "done" : (index === state.index && state.running ? "running" : (state.finished ? "done" : "waiting"));
      });
    });
  }

  function startDynamic(kind, names) {
    var state = runtime[kind];
    if (state.timer) window.clearInterval(state.timer);
    state.index = -1; state.running = true; state.finished = false; updateDynamicView(kind, names);
    state.timer = window.setInterval(function () {
      state.index += 1;
      if (state.index >= names.length) {
        window.clearInterval(state.timer); state.timer = null; state.index = names.length - 1; state.running = false; state.finished = true;
      }
      updateDynamicView(kind, names);
    }, 650);
  }

  function renderOpenSource(mount) {
    var panel = el("div", "rest-os-page");
    var state = runtime.opensource;
    var selectedNodeId = "O00";
    var sortMode = "combined";
    var levels = ["目标技术", "关键能力", "功能模块", "实现单元", "开源 / 自研结果"];
    var stepDefinitions = [
      { label: "拆解智能体", note: "识别未覆盖单元", trace: "输入：当前 O11 增量状态 · 动作：拆解为状态合并与边缘数据协同 · 输出：检索目标" },
      { label: "发现智能体", note: "检索代码与文档", trace: "输入：检索目标 · 动作：比对公开仓库描述、目录和语言 · 输出：Eclipse Zenoh 候选" },
      { label: "核验智能体", note: "检查许可、维护与测试", trace: "输入：候选仓库 · 动作：核对 LICENSE、分支、测试和核心目录 · 输出：事实字段" },
      { label: "映射智能体", note: "评估复用和适配程度", trace: "输入：事实字段 + O11 技术单元 · 动作：计算匹配与复用判断 · 输出：80 分 / 原理参考" },
      { label: "版本智能体", note: "写入索引与变更记录", trace: "输入：候选与评分 · 动作：写入索引版本并标记人工复核 · 输出：index_v_2026_m8.3" }
    ];
    var discoveredProject = {
      id: "R12",
      node: "O11",
      name: "Eclipse Zenoh",
      url: "https://github.com/eclipse-zenoh/zenoh",
      language: "Rust",
      license: "Apache-2.0",
      reuse: "原理参考",
      match: 80,
      credibility: 90,
      activity: "高",
      tests: "完整",
      note: "Eclipse Zenoh 公开仓库作为新增候选，支持对数据路由、查询和边缘存储的进一步核验。",
      manifest: "Cargo.toml",
      sourceRef: "main",
      snapshotDate: "2026-09-20",
      sourceKind: "公开 GitHub 仓库",
      publicFact: "Eclipse Zenoh 公开 Rust 实现及 examples、plugins 和测试目录，适合进一步核对边缘数据协同能力。",
      capabilities: ["数据路由", "查询与订阅", "边缘存储", "Rust实现参考"],
      extractionAdvice: "本轮仅纳入候选索引，下一轮应先核验其协议、存储和安全边界，再决定是否进入组合验证。",
      files: [["zenoh/", "核心协议、路由和会话实现。", "核心实现"], ["plugins/", "存储、网关和扩展插件。", "扩展参考"], ["examples/", "发布、订阅、查询和存储示例。", "直接验证"], ["tests/", "协议与运行行为测试。", "可信核验"], ["Cargo.toml", "Rust workspace 与依赖入口。", "构建入口"]],
      architecture: {"flow": [["API与会话层", "应用通过订阅、查询和会话接口接入"], ["路由与协议层", "节点发现、路由、查询和数据分发"], ["插件与存储层", "边缘存储、网关和扩展运行能力"]], "notes": [["公开入口", "zenoh/、plugins/ 和 examples/ 可定位核心与扩展边界。"], ["核心调用链", "数据发布 → 路由 / 查询 → 订阅消费或边缘存储。"], ["适配边界", "本轮仅作新增候选，协议兼容、安全和资源约束需要复核。"], ["后续动作", "进入下一轮许可、版本和最小样例核验。"]]}
    };

    function currentProjects() {
      var projects = data.opensource_projects.slice();
      if (state.finished) {
        var deltaIndex = projects.findIndex(function (project) { return project.id === "R08"; });
        projects.splice(deltaIndex < 0 ? projects.length : deltaIndex + 1, 0, discoveredProject);
      }
      return projects;
    }

    function findNode(nodeId) {
      return data.opensource_nodes.find(function (item) { return item.id === nodeId; });
    }

    function createStat(label, initialValue) {
      var item = el("span", "rest-os-banner__stat");
      var value = el("b", "", initialValue);
      item.appendChild(value);
      item.appendChild(document.createTextNode(label));
      return { node: item, value: value };
    }

    function createPanelHeader(title, subtitle, actions) {
      var head = el("header", "rest-os-panel__head");
      var copy = el("div");
      copy.appendChild(el("h2", "", title));
      if (subtitle) copy.appendChild(el("p", "", subtitle));
      head.appendChild(copy);
      if (actions) head.appendChild(actions);
      return head;
    }

    var banner = el("section", "rest-os-banner");
    var bannerCopy = el("div", "rest-os-banner__copy");
    bannerCopy.appendChild(badge("动态运行能力", "success"));
    bannerCopy.appendChild(el("h2", "", "Lattice Mesh 开源项目索引矩阵"));
    bannerCopy.appendChild(el("p", "", "对未覆盖技术持续向下拆解，直至映射到可复用代码或形成明确的自研最小单元。"));
    var bannerStats = el("div", "rest-os-banner__stats");
    var coverageStat = createStat("开源覆盖率", "68%");
    var projectStat = createStat("个候选项目", String(data.opensource_projects.length));
    var selfStat = createStat("个自研单元", "7");
    bannerStats.appendChild(coverageStat.node);
    bannerStats.appendChild(projectStat.node);
    bannerStats.appendChild(selfStat.node);
    banner.appendChild(bannerCopy);
    banner.appendChild(bannerStats);
    panel.appendChild(banner);

    var dataNotice = el("div", "rest-os-notice");
    dataNotice.appendChild(el("span", "", "△"));
    dataNotice.appendChild(el("p", "", "样例研判数据／公开资料研判，仅供分析参考；项目地址、评分及映射关系用于呈现分析方法。"));
    panel.appendChild(dataNotice);

    var autonomy = el("section", "rest-os-autonomy");
    var autonomyLive = el("div", "rest-os-autonomy__live");
    var liveMark = el("span", "rest-os-autonomy__mark", "◎");
    var liveCopy = el("div");
    var liveTitle = el("strong", "", "无人化智能体自主运行中");
    var liveNote = el("small", "", "样例运行状态 · 定时任务与新线索事件双触发");
    liveCopy.appendChild(liveTitle);
    liveCopy.appendChild(liveNote);
    autonomyLive.appendChild(liveMark);
    autonomyLive.appendChild(liveCopy);
    var autonomyMetrics = el("div", "rest-os-autonomy__metrics");
    var completedValue;
    var interventionValue;
    [["在线智能体", "5个"], ["本轮自动完成", "0 / 18"], ["人工介入", "0项"], ["下次定时运行", "02:00"]].forEach(function (entry, index) {
      var item = el("span");
      var value = el("b", "", entry[1]);
      item.appendChild(document.createTextNode(entry[0]));
      item.appendChild(value);
      autonomyMetrics.appendChild(item);
      if (index === 1) completedValue = value;
      if (index === 2) interventionValue = value;
    });
    autonomy.appendChild(autonomyLive);
    autonomy.appendChild(autonomyMetrics);
    panel.appendChild(autonomy);

    var discoveryPanel = el("section", "rest-os-panel rest-os-discovery");
    var discoveryActions = el("div", "rest-os-panel__actions");
    var historyButton = button("查看版本时间轴", "secondary", function () { versionDrawer("开源项目索引矩阵版本", data.opensource_versions); });
    var runButton = button("开始索引更新", "secondary", runDiscovery);
    discoveryActions.appendChild(historyButton);
    discoveryActions.appendChild(runButton);
    var discoverySubtitle = el("span", "", data.meta.opensource_version + " · 本轮由任务调度器自动启动，无需人工下发");
    discoveryPanel.appendChild(createPanelHeader("多智能体递归发现与索引更新", "", discoveryActions));
    discoveryPanel.querySelector(".rest-os-panel__head > div").appendChild(discoverySubtitle);
    var discoveryFlow = el("div", "rest-os-discovery__flow");
    var stepNodes = [];
    stepDefinitions.forEach(function (definition, index) {
      var step = el("div", "rest-os-discovery__step");
      step.appendChild(el("span", "rest-os-discovery__icon", String(index + 1)));
      var copy = el("div");
      copy.appendChild(el("strong", "", definition.label));
      copy.appendChild(el("small", "", definition.note));
      step.appendChild(copy);
      if (index < stepDefinitions.length - 1) step.appendChild(el("i", "rest-os-discovery__arrow", "›"));
      discoveryFlow.appendChild(step);
      stepNodes.push(step);
    });
    discoveryPanel.appendChild(discoveryFlow);
    var traceBox = el("div", "rest-os-agent-trace");
    var traceHead = el("div", "rest-os-agent-trace__head");
    traceHead.appendChild(el("strong", "", "可审计执行记录"));
    traceHead.appendChild(el("span", "", "展示输入、动作与输出，不展示不可复核的内部思维内容"));
    traceBox.appendChild(traceHead);
    var traceNodes = [];
    stepDefinitions.forEach(function (definition, index) {
      var trace = el("div", "rest-os-agent-trace__item");
      trace.dataset.state = "waiting";
      trace.appendChild(el("i", "", "0" + (index + 1)));
      var traceCopy = el("div");
      traceCopy.appendChild(el("strong", "", definition.label));
      traceCopy.appendChild(el("span", "", definition.trace));
      trace.appendChild(traceCopy);
      traceBox.appendChild(trace);
      traceNodes.push(trace);
    });
    discoveryPanel.appendChild(traceBox);
    var discoveryUpdate = el("div", "rest-os-discovery__update");
    discoveryUpdate.hidden = true;
    discoveryUpdate.appendChild(el("strong", "", "发现 Eclipse Zenoh"));
    discoveryUpdate.appendChild(el("span", "", "智能体完成发现、核验、映射和版本发布 · 覆盖率 68% → 74% · 新增候选进入待复核"));
    discoveryPanel.appendChild(discoveryUpdate);
    panel.appendChild(discoveryPanel);

    var positionMap = {
      O00: [0, 390], O01: [300, 130], O02: [300, 390], O03: [300, 650],
      O04: [600, 60], O05: [600, 185], O06: [600, 300], O07: [600, 390], O08: [600, 495], O09: [600, 650],
      O10: [900, 145], O11: [900, 245], O12: [900, 525], O13: [900, 645], O14: [900, 745]
    };
    var edges = [
      ["O00", "O01", "M 230 390 H 265 V 130 H 300"], ["O00", "O02", "M 230 390 H 265 V 390 H 300"], ["O00", "O03", "M 230 390 H 265 V 650 H 300"],
      ["O01", "O04", "M 530 130 H 565 V 60 H 600"], ["O01", "O05", "M 530 130 H 565 V 185 H 600"], ["O01", "O06", "M 530 130 H 565 V 300 H 600"],
      ["O02", "O07", "M 530 390 H 565 V 390 H 600"], ["O02", "O08", "M 530 390 H 565 V 495 H 600"], ["O03", "O09", "M 530 650 H 565 V 650 H 600"],
      ["O05", "O10", "M 830 185 H 865 V 145 H 900"], ["O05", "O11", "M 830 185 H 865 V 245 H 900"],
      ["O09", "O12", "M 830 650 H 865 V 525 H 900"], ["O09", "O13", "M 830 650 H 865 V 645 H 900"], ["O09", "O14", "M 830 650 H 865 V 745 H 900"]
    ];
    var resultDefinitions = [
      { node: "O04", top: 60 }, { node: "O10", top: 145 }, { node: "O11", top: 245 },
      { node: "O06", top: 300 }, { node: "O07", top: 390 }, { node: "O08", top: 495 },
      { node: "O12", top: 525 }, { node: "O13", top: 645, gap: true }, { node: "O14", top: 745, gap: true }
    ];
    var treePanel = el("section", "rest-os-panel rest-os-tree-panel");
    treePanel.appendChild(createPanelHeader("Lattice Mesh 递归技术拆解树", "从目标技术逐层下钻至可映射开源资源或自研最小单元；点击任一节点可高亮完整路径并联动下方项目索引"));
    var treeScroll = el("div", "rest-os-tree__scroll");
    var treeStage = el("div", "rest-os-tree__stage");
    var layerHeads = el("div", "rest-os-tree__heads");
    levels.forEach(function (level, index) {
      var head = el("div");
      head.appendChild(el("span", "", String(index + 1).padStart(2, "0")));
      head.appendChild(el("strong", "", level));
      layerHeads.appendChild(head);
    });
    treeStage.appendChild(layerHeads);
    var canvas = el("div", "rest-os-tree__canvas");
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 1430 790");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("aria-label", "递归技术拆解关系连线");
    var edgeNodes = [];
    edges.forEach(function (edge) {
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", edge[2]);
      path.dataset.from = edge[0];
      path.dataset.to = edge[1];
      svg.appendChild(path);
      edgeNodes.push(path);
    });
    resultDefinitions.forEach(function (definition) {
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M 1130 " + definition.top + " H 1200");
      path.dataset.from = definition.node;
      path.dataset.to = "result-" + definition.node;
      if (definition.gap) path.dataset.gap = "true";
      svg.appendChild(path);
      edgeNodes.push(path);
    });
    canvas.appendChild(svg);
    var treeButtons = [];
    data.opensource_nodes.forEach(function (node) {
      var position = positionMap[node.id];
      var control = el("button", "rest-os-tree__node");
      control.type = "button";
      control.dataset.node = node.id;
      control.dataset.tone = /自研|缺口/.test(node.state) ? "gap" : (/部分|继续|参考/.test(node.state) ? "partial" : "mapped");
      control.style.left = position[0] + "px";
      control.style.top = position[1] + "px";
      control.appendChild(el("span", "", node.id + " · " + (node.level === 0 ? "破解目标" : levels[node.level])));
      control.appendChild(el("strong", "", node.name));
      control.appendChild(el("small", "", node.state));
      control.appendChild(el("em", "", node.coverage + "%"));
      control.addEventListener("click", function () { selectNode(node.id); });
      canvas.appendChild(control);
      treeButtons.push(control);
    });
    var resultButtons = [];
    resultDefinitions.forEach(function (definition) {
      var result = el("button", "rest-os-tree__result");
      result.type = "button";
      result.dataset.resultFor = definition.node;
      result.dataset.tone = definition.gap ? "gap" : "mapped";
      result.style.left = "1200px";
      result.style.top = definition.top + "px";
      result.appendChild(el("span", "", definition.gap ? "自研任务" : "开源映射"));
      result.appendChild(el("strong", "", definition.gap ? "自研最小单元" : "0 个候选项目"));
      result.appendChild(el("small", "", definition.gap ? "进入独立研发与仿真验证" : "适配可用"));
      result.addEventListener("click", function () { selectNode(definition.node); });
      canvas.appendChild(result);
      resultButtons.push(result);
    });
    treeStage.appendChild(canvas);
    treeScroll.appendChild(treeStage);
    treePanel.appendChild(treeScroll);
    var treeFooter = el("footer", "rest-os-tree__footer");
    var pathCopy = el("div");
    pathCopy.appendChild(el("strong", "", "当前路径"));
    var currentPathText = el("span", "", "Lattice Mesh技术破解目标");
    pathCopy.appendChild(currentPathText);
    var stopCopy = el("div");
    stopCopy.appendChild(el("strong", "", "停止条件"));
    stopCopy.appendChild(el("span", "", "功能边界单一、输入输出明确，且可映射代码或形成独立自研任务"));
    var legend = el("div", "rest-os-tree__legend");
    [["blue", "继续拆解"], ["green", "开源映射"], ["red", "自研缺口"]].forEach(function (item) {
      var label = el("span"); label.appendChild(el("i", item[0])); label.appendChild(document.createTextNode(item[1])); legend.appendChild(label);
    });
    treeFooter.appendChild(pathCopy);
    treeFooter.appendChild(stopCopy);
    treeFooter.appendChild(legend);
    treePanel.appendChild(treeFooter);
    panel.appendChild(treePanel);

    var workspace = el("div", "rest-os-workspace");

    var projectPanel = el("section", "rest-os-panel rest-os-projects");
    var sortActions = el("div", "rest-os-sort");
    var sortButtons = [];
    [["combined", "综合排序"], ["credibility", "可信度"], ["match", "匹配度"]].forEach(function (definition) {
      var control = el("button", "", definition[1]);
      control.type = "button";
      control.dataset.sort = definition[0];
      control.addEventListener("click", function () { sortMode = definition[0]; paintProjects(); });
      sortActions.appendChild(control);
      sortButtons.push(control);
    });
    var projectHeading = createPanelHeader("Lattice Mesh技术破解目标 · 开源项目映射", "当前覆盖率 68% · 共 11 个候选资源", sortActions);
    projectPanel.appendChild(projectHeading);
    var projectTitle = projectHeading.querySelector("h2");
    var projectSubtitle = projectHeading.querySelector("p");
    var tableWrap = el("div", "rest-os-table-wrap");
    var table = el("table", "rest-os-table");
    var thead = el("thead"); var headerRow = el("tr");
    ["项目与链接", "对应技术单元", "复用判断", "语言 / 许可", "匹配度", "可信度", ""].forEach(function (label) {
      var cell = el("th", "", label); cell.scope = "col"; headerRow.appendChild(cell);
    });
    thead.appendChild(headerRow);
    var tableBody = el("tbody");
    table.appendChild(thead); table.appendChild(tableBody); tableWrap.appendChild(table); projectPanel.appendChild(tableWrap);
    workspace.appendChild(projectPanel);

    var coveragePanel = el("section", "rest-os-panel rest-os-coverage");
    coveragePanel.appendChild(createPanelHeader("覆盖与自研缺口", "当前节点的工程可利用性判断"));
    var ring = el("div", "rest-os-coverage__ring");
    var ringCopy = el("span"); var ringValue = el("strong", "", "68%"); ringCopy.appendChild(ringValue); ringCopy.appendChild(document.createTextNode("开源覆盖")); ring.appendChild(ringCopy);
    coveragePanel.appendChild(ring);
    var bars = el("div", "rest-os-coverage__bars");
    [["可直接复用", 26, "green"], ["需要二次适配", 42, "blue"], ["仅供原理参考", 16, "gray"], ["需要自研", 16, "red"]].forEach(function (item) {
      var row = el("div"); var label = el("span"); label.appendChild(document.createTextNode(item[0])); label.appendChild(el("strong", "", item[1] + "%"));
      var track = el("i"); var fill = el("em", item[2]); fill.style.width = item[1] + "%"; track.appendChild(fill); row.appendChild(label); row.appendChild(track); bars.appendChild(row);
    });
    coveragePanel.appendChild(bars);
    var judgement = el("div", "rest-os-coverage__judgement");
    judgement.appendChild(el("strong", "", "系统判断"));
    judgement.appendChild(el("p", "", "已有资源可覆盖主要通用机制，仍需围绕接口、数据模型和运行约束进行适配。"));
    coveragePanel.appendChild(judgement);
    workspace.appendChild(coveragePanel);
    panel.appendChild(workspace);

    function paintResultNodes() {
      var projects = currentProjects();
      resultButtons.forEach(function (result) {
        if (result.dataset.tone === "gap") return;
        var count = projects.filter(function (project) { return project.node === result.dataset.resultFor; }).length;
        result.querySelector("strong").textContent = count + " 个候选项目";
        result.dataset.new = state.finished && result.dataset.resultFor === "O11" ? "true" : "false";
      });
    }

    function paintProjects() {
      var projects = currentProjects();
      var sourceOrder = projects.map(function (project) { return project.id; });
      var filtered = selectedNodeId === "O00" ? projects : projects.filter(function (project) { return project.node === selectedNodeId; });
      if (!filtered.length) filtered = projects;
      filtered.sort(function (left, right) {
        if (sortMode === "credibility") return right.credibility - left.credibility;
        if (sortMode === "match") return right.match - left.match;
        return sourceOrder.indexOf(left.id) - sourceOrder.indexOf(right.id);
      });
      var selectedNode = findNode(selectedNodeId);
      projectTitle.textContent = (selectedNode ? selectedNode.name : "全部技术单元") + " · 开源项目映射";
      projectSubtitle.textContent = "当前覆盖率 " + (state.finished ? "74%" : (selectedNode ? selectedNode.coverage + "%" : "68%")) + " · 共 " + filtered.length + " 个候选资源";
      sortButtons.forEach(function (control) { control.dataset.active = control.dataset.sort === sortMode ? "true" : "false"; });
      tableBody.replaceChildren();
      filtered.forEach(function (project) {
        var row = el("tr"); row.tabIndex = 0;
        var name = el("td"); var nameWrap = el("div", "rest-os-repo");
        nameWrap.appendChild(el("i", "", "‹/›"));
        var nameCopy = el("span"); nameCopy.appendChild(el("strong", "", project.name)); nameCopy.appendChild(el("small", "", project.url.replace(/^https?:\/\//, "").replace(/\/$/, "") + " · " + (project.sourceRef || "main") + " 快照"));
        nameWrap.appendChild(nameCopy); name.appendChild(nameWrap); row.appendChild(name);
        var node = findNode(project.node); row.appendChild(el("td", "", node ? node.name : project.node));
        var reuse = el("td"); reuse.appendChild(badge(project.reuse)); row.appendChild(reuse);
        var language = el("td", "", project.language); language.appendChild(el("small", "rest-os-license", project.license)); row.appendChild(language);
        row.appendChild(el("td", "rest-os-score", project.match)); row.appendChild(el("td", "", project.credibility));
        row.appendChild(el("td"));
        row.setAttribute("aria-label", "查看" + project.name + "工程详情");
        row.addEventListener("click", function () { projectDrawer(project); });
        row.addEventListener("keydown", function (event) { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); projectDrawer(project); } });
        tableBody.appendChild(row);
      });
    }

    function selectNode(nodeId) {
      selectedNodeId = nodeId;
      var path = getPath(nodeId);
      treeButtons.forEach(function (control) {
        control.dataset.active = control.dataset.node === nodeId ? "true" : "false";
        control.dataset.path = path.indexOf(control.dataset.node) >= 0 ? "true" : "false";
      });
      edgeNodes.forEach(function (edge) {
        edge.dataset.active = nodeId === "O00" || (path.indexOf(edge.dataset.from) >= 0 && path.indexOf(edge.dataset.to) >= 0) ? "true" : "false";
      });
      currentPathText.textContent = path.slice().reverse().map(function (id) { return findNode(id).name; }).join(" → ");
      paintProjects();
    }

    function updateRuntimeView() {
      var totalTasks = stepDefinitions.length * 4;
      var completed = state.finished ? totalTasks : Math.max(0, state.index + 1) * 4;
      coverageStat.value.textContent = state.finished ? "74%" : "68%";
      projectStat.value.textContent = state.finished ? String(data.opensource_projects.length + 1) : String(data.opensource_projects.length);
      selfStat.value.textContent = state.finished ? "6" : "7";
      completedValue.textContent = Math.min(totalTasks, completed) + " / " + totalTasks;
      interventionValue.textContent = state.finished ? "1项待核验" : "0项";
      liveTitle.textContent = state.finished ? "无人化智能体本轮任务已完成" : "无人化智能体自主运行中";
      liveNote.textContent = state.finished ? "新项目已映射，索引矩阵与覆盖率已更新" : "样例运行状态 · 定时任务与新线索事件双触发";
      discoverySubtitle.textContent = state.finished ? "index_v_2026_m8.3 · 新项目已映射，覆盖率已更新" : data.meta.opensource_version + " · 本轮由任务调度器自动启动，无需人工下发";
      runButton.textContent = state.running ? "执行中" : (state.finished ? "重新执行" : "开始索引更新");
      runButton.disabled = state.running;
      stepNodes.forEach(function (step, index) {
        step.dataset.state = state.finished || index < state.index ? "done" : (state.running && index === state.index ? "running" : "waiting");
      });
      discoveryUpdate.hidden = !state.finished;
      ringValue.textContent = state.finished ? "74%" : "68%";
      ring.style.setProperty("--coverage", state.finished ? "266.4deg" : "244.8deg");
      traceNodes.forEach(function (trace, index) {
        trace.dataset.state = state.finished || index < state.index ? "done" : (state.running && index === state.index ? "running" : "waiting");
      });
      paintResultNodes();
      paintProjects();
    }

    function runDiscovery() {
      if (state.timer) window.clearInterval(state.timer);
      state.index = 0;
      state.running = true;
      state.finished = false;
      updateRuntimeView();
      state.timer = window.setInterval(function () {
        state.index += 1;
        if (state.index >= stepDefinitions.length) {
          window.clearInterval(state.timer);
          state.timer = null;
          state.index = stepDefinitions.length - 1;
          state.running = false;
          state.finished = true;
        }
        updateRuntimeView();
      }, 650);
    }

    selectNode("O00");
    updateRuntimeView();
    mount.replaceChildren(panel);
    if (!state.running && !state.finished) window.setTimeout(runDiscovery, 300);
  }

  function parameterDrawer(parameter) {
    var wrapper = el("div", "rest-param-drawer");
    var tags = el("div", "rest-param-drawer__tags");
    [["可信度", parameter.confidence, "blue"], [parameter.status, "", /待|冲突/.test(parameter.status) ? "red" : "green"], ["样例参数", "", "gray"]].forEach(function (item) { var tag = el("span"); tag.dataset.tone = item[2]; tag.appendChild(document.createTextNode(item[0] + (item[1] === "" ? "" : " "))); if (item[1] !== "") tag.appendChild(el("strong", "", item[1])); tags.appendChild(tag); });
    var hero = el("section", "rest-param-drawer__hero"); hero.appendChild(el("span", "", "当前值 / 范围")); var heroValue = el("strong", "", parameter.value); heroValue.appendChild(el("small", "", parameter.unit)); hero.appendChild(heroValue);
    var grid = el("div", "rest-param-drawer__grid"); [["参数来源", formalText(parameter.source)], ["适用场景", parameter.scenario], ["上一版本", parameter.previous], ["更新候选值", parameter.updated]].forEach(function (item) { var card = el("div"); card.appendChild(el("span", "", item[0])); card.appendChild(el("strong", "", item[1])); grid.appendChild(card); });
    var formation = el("section", "rest-param-drawer__block"); formation.appendChild(el("span", "", "参数形成说明（样例内容）")); formation.appendChild(el("p", "", "该参数由场景约束、相似技术配置和开源组件默认设置共同形成。系统完成单位归一化后保留取值范围，并根据来源类型、交叉一致性和仿真可复现性计算可信度。"));
    var calibration = el("section", "rest-param-drawer__advice"); calibration.appendChild(el("span", "", "校准建议")); calibration.appendChild(el("p", "", "建议在低、中、高三组负载下执行敏感性试验，观察关键消息到达率、同步恢复时间和边缘资源占用的变化，再决定是否收窄参数范围。"));
    wrapper.appendChild(tags); wrapper.appendChild(hero); wrapper.appendChild(grid); wrapper.appendChild(formation); wrapper.appendChild(calibration); wrapper.appendChild(el("p", "rest-param-drawer__note", "该值为样例研判参数，仅供分析参考，不代表 Lattice Mesh 真实内部配置。"));
    components.openDrawer({
      kicker: "△ 仿真参数详情 · " + parameter.id,
      title: parameter.name,
      sections: [{ title: "", content: wrapper }]
    });
    var shell = document.querySelector("#overlay-host .drawer");
    if (shell) {
      shell.classList.add("rest-parameter-shell");
      var heading = shell.querySelector(".drawer__header > div");
      if (heading) heading.appendChild(el("p", "rest-repo-subtitle", "来源、适用范围与历史版本"));
    }
  }

  function renderParameters(mount) {
    var panel = el("div", "rest-param-page");
    var state = runtime.parameters;
    var steps = ["证据解析智能体", "参数抽取智能体", "标准化智能体", "冲突检测智能体", "校准智能体", "发布智能体"];
    var stepNotes = ["读取场景和公开资料", "识别参数与取值范围", "完成单位与格式归一", "隔离冲突候选值", "形成敏感性排序", "写入版本与审计记录"];

    function createPanelHeader(title, subtitle, actions) {
      var head = el("header", "rest-os-panel__head"); var copy = el("div"); copy.appendChild(el("h2", "", title)); if (subtitle) copy.appendChild(el("p", "", subtitle)); head.appendChild(copy); if (actions) head.appendChild(actions); return head;
    }
    function createStat(label, value) { var node = el("span", "rest-os-banner__stat"); var strong = el("b", "", value); node.appendChild(strong); node.appendChild(document.createTextNode(label)); return { node: node, value: strong }; }

    var banner = el("section", "rest-os-banner rest-param-banner"); var bannerCopy = el("div", "rest-os-banner__copy"); bannerCopy.appendChild(badge("动态运行能力", "success")); bannerCopy.appendChild(el("h2", "", "Lattice Mesh 仿真验证参数包")); bannerCopy.appendChild(el("p", "", "将场景、技术原理和开源组件转化为带来源、范围、可信度与版本状态的仿真配置。"));
    var bannerStats = el("div", "rest-os-banner__stats rest-param-banner__stats"); var countStat = createStat("项参数", data.parameters.length); var completenessStat = createStat("参数完整率", "84%"); var versionStat = createStat("当前版本", data.meta.parameter_version); bannerStats.appendChild(countStat.node); bannerStats.appendChild(completenessStat.node); bannerStats.appendChild(versionStat.node); banner.appendChild(bannerCopy); banner.appendChild(bannerStats); panel.appendChild(banner);
    var notice = el("div", "rest-os-notice"); notice.appendChild(el("span", "", "△")); notice.appendChild(el("p", "", "样例研判数据／公开资料研判，仅供分析参考；参数范围、评分与冲突状态用于呈现分析方法。")); panel.appendChild(notice);

    var autonomy = el("section", "rest-os-autonomy"); var autonomyLive = el("div", "rest-os-autonomy__live"); autonomyLive.appendChild(el("span", "rest-os-autonomy__mark", "◎")); var liveCopy = el("div"); var liveTitle = el("strong", "", "无人化智能体自主运行中"); var liveNote = el("small", "", "样例运行状态 · 定时任务与新线索事件双触发"); liveCopy.appendChild(liveTitle); liveCopy.appendChild(liveNote); autonomyLive.appendChild(liveCopy); autonomy.appendChild(autonomyLive);
    var autonomyMetrics = el("div", "rest-os-autonomy__metrics"); var completedValue; var interventionValue; [["在线智能体", "6个"], ["本轮自动完成", "0 / 18"], ["人工介入", "0项"], ["下次定时运行", "03:30"]].forEach(function (item, index) { var metric = el("span"); var value = el("b", "", item[1]); metric.appendChild(document.createTextNode(item[0])); metric.appendChild(value); autonomyMetrics.appendChild(metric); if (index === 1) completedValue = value; if (index === 2) interventionValue = value; }); autonomy.appendChild(autonomyMetrics); panel.appendChild(autonomy);

    var processPanel = el("section", "rest-os-panel"); var processActions = el("div", "rest-os-panel__actions"); processActions.appendChild(button("查看版本时间轴", "secondary", function () { versionDrawer("仿真参数包版本", data.parameter_versions); })); var runButton = button("模拟自主更新", "secondary", runUpdate); processActions.appendChild(runButton); var processHead = createPanelHeader("多智能体参数提取、校核与版本发布", "新证据进入后自动完成归一化、冲突检测、校准与版本发布", processActions); var processSubtitle = processHead.querySelector("p"); processPanel.appendChild(processHead);
    var flow = el("div", "rest-os-discovery__flow rest-param-flow"); var stepNodes = []; steps.forEach(function (step, index) { var node = el("div", "rest-os-discovery__step"); node.appendChild(el("span", "rest-os-discovery__icon", String(index + 1))); var copy = el("div"); copy.appendChild(el("strong", "", step)); copy.appendChild(el("small", "", stepNotes[index])); node.appendChild(copy); if (index < steps.length - 1) node.appendChild(el("i", "rest-os-discovery__arrow", "›")); flow.appendChild(node); stepNodes.push(node); }); processPanel.appendChild(flow);
    var updateNotice = el("div", "rest-os-discovery__update"); updateNotice.hidden = true; updateNotice.appendChild(el("strong", "", "智能体已发布 param_v_2026_m8.2")); updateNotice.appendChild(el("span", "", "链路时延范围 50—250ms → 40—300ms；1项冲突自动转入人工复核队列。")); processPanel.appendChild(updateNotice); panel.appendChild(processPanel);

    var tableBody = el("tbody");
    var currentGroup = data.parameter_groups[0].id;
    var workspace = el("div", "rest-param-workspace");
    var groupsPanel = el("section", "rest-os-panel rest-param-groups-panel"); groupsPanel.appendChild(createPanelHeader("参数分类", "按仿真配置结构组织")); var categories = el("div", "rest-param-groups");
    data.parameter_groups.forEach(function (group, index) {
      var control = el("button", ""); control.type = "button"; var copy = el("span"); copy.appendChild(el("strong", "", group.name)); copy.appendChild(el("small", "", group.count + "项参数")); control.appendChild(copy); control.appendChild(el("em", "", group.completeness + "%")); var track = el("i"); var fill = el("span"); fill.style.width = group.completeness + "%"; track.appendChild(fill); control.appendChild(track);
      control.setAttribute("aria-pressed", index === 0 ? "true" : "false");
      control.addEventListener("click", function () {
        currentGroup = group.id;
        categories.querySelectorAll("button").forEach(function (item) { item.setAttribute("aria-pressed", item === control ? "true" : "false"); });
        paintParameters();
      }); categories.appendChild(control);
    });
    groupsPanel.appendChild(categories); workspace.appendChild(groupsPanel);

    var exportPackage = { meta: Object.assign({}, data.meta, { data_note: "样例研判数据／公开资料研判，仅供分析参考。", parameter_version: "param_v_2026_m8.2" }), groups: data.parameter_groups, parameters: data.parameters.map(function (parameter) { return Object.assign({}, parameter, { source: formalText(parameter.source) }); }) };
    var tablePanel = el("section", "rest-os-panel rest-param-table-panel"); var exportAction = downloadLink("导出参数包", "param_v_2026_m8.2.json", JSON.stringify(exportPackage, null, 2), "application/json;charset=utf-8"); exportAction.classList.add("rest-param-export"); var tableHeading = createPanelHeader("网络环境参数", "点击参数查看来源、适用条件、历史版本和冲突状态", exportAction); tablePanel.appendChild(tableHeading);
    var tableWrap = el("div", "rest-param-table-wrap"); var table = el("table", "rest-param-table"); var thead = el("thead"); var trh = el("tr"); ["参数", "当前值 / 范围", "单位", "来源类型", "可信度", "状态", ""].forEach(function (label) { var th = el("th", "", label); th.scope = "col"; trh.appendChild(th); }); thead.appendChild(trh); table.appendChild(thead); table.appendChild(tableBody); tableWrap.appendChild(table); tablePanel.appendChild(tableWrap); workspace.appendChild(tablePanel);

    var packPanel = el("section", "rest-os-panel rest-param-pack"); packPanel.appendChild(createPanelHeader("参数包状态", "弱网多节点同步场景")); var packHero = el("div", "rest-param-pack__hero"); var packCopy = el("span"); packCopy.appendChild(el("strong", "", "pack_weaknet_v3")); packCopy.appendChild(el("small", "", "关联场景 S01 / S05")); packHero.appendChild(packCopy); packHero.appendChild(badge("可运行", "success")); packPanel.appendChild(packHero); var packStats = el("div", "rest-param-pack__stats"); var packCompleteness; [["参数完整率", "84%"], ["已确认", "16"], ["待校准", "6"], ["冲突待复核", "1"]].forEach(function (item, index) { var card = el("div"); card.appendChild(el("span", "", item[0])); var value = el("strong", index === 3 ? "red" : "", item[1]); card.appendChild(value); packStats.appendChild(card); if (index === 0) packCompleteness = value; }); packPanel.appendChild(packStats); var relation = el("div", "rest-param-pack__version"); relation.appendChild(el("span", "", "版本关系")); var relationFlow = el("div"); relationFlow.appendChild(el("strong", "", "scenario_v1.3")); relationFlow.appendChild(el("i", "", "→")); relationFlow.appendChild(el("strong", "", "param_v_2026_m8.2")); relation.appendChild(relationFlow); packPanel.appendChild(relation); var conflict = el("div", "rest-param-pack__conflict"); conflict.appendChild(el("strong", "", "当前冲突")); conflict.appendChild(el("p", "", "端到端时延存在“相似技术参考”与“场景推演值”两种范围，暂不自动覆盖，等待专家复核。")); packPanel.appendChild(conflict); workspace.appendChild(packPanel); panel.appendChild(workspace);

    function paintParameters() {
      var group = data.parameter_groups.find(function (item) { return item.id === currentGroup; });
      tableHeading.querySelector("h2").textContent = group.name + "参数";
      tableBody.replaceChildren();
      data.parameters.filter(function (item) { return item.group === currentGroup; }).forEach(function (parameter) {
        var row = el("tr"); row.tabIndex = 0; row.setAttribute("aria-label", "查看" + parameter.name + "参数详情");
        var name = el("td"); name.appendChild(el("span", "intel-table__title", parameter.name)); name.appendChild(el("span", "intel-table__sub", parameter.id)); row.appendChild(name);
        row.appendChild(el("td", "", parameter.value)); row.appendChild(el("td", "", parameter.unit)); row.appendChild(el("td", "", formalText(parameter.source)));
        var confidence = el("td"); var confidenceBar = el("div", "rest-param-confidence"); var confidenceFill = el("i"); confidenceFill.style.width = parameter.confidence + "%"; confidenceBar.appendChild(confidenceFill); confidenceBar.appendChild(el("strong", "", parameter.confidence)); confidence.appendChild(confidenceBar); row.appendChild(confidence); var status = el("td"); status.appendChild(badge(parameter.status)); row.appendChild(status); row.appendChild(el("td")); row.addEventListener("click", function () { parameterDrawer(parameter); }); row.addEventListener("keydown", function (event) { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); parameterDrawer(parameter); } }); tableBody.appendChild(row);
      });
    }
    paintParameters();

    var diffPanel = el("section", "rest-os-panel rest-param-diff-panel"); diffPanel.appendChild(createPanelHeader("版本差异与参数敏感性", "每次更新保留来源、旧值、新值及受影响场景")); var diff = el("div", "rest-param-diff"); var previous = el("div", "rest-param-diff__version"); previous.appendChild(el("span", "", "上一版本")); previous.appendChild(el("strong", "", "param_v_2026_m8.1")); previous.appendChild(el("small", "", "2026-08-12")); diff.appendChild(previous); diff.appendChild(el("i", "rest-param-diff__arrow", "→")); var current = el("div", "rest-param-diff__version current"); current.appendChild(el("span", "", "当前版本")); current.appendChild(el("strong", "", "param_v_2026_m8.2")); current.appendChild(el("small", "", "2026-08-30")); diff.appendChild(current); var changes = el("div", "rest-param-diff__changes"); [["链路时延", "50—250 → 40—300 ms", "red"], ["断连时长", "2—30 → 2—60 s", "blue"], ["到达率判据", "≥93% → ≥95%", "green"]].forEach(function (item) { var row = el("div"); row.appendChild(el("i", item[2])); var copy = el("span"); copy.appendChild(el("strong", "", item[0])); copy.appendChild(document.createTextNode(item[1])); row.appendChild(copy); changes.appendChild(row); }); diff.appendChild(changes); var sensitivity = el("div", "rest-param-sensitivity"); sensitivity.appendChild(el("span", "", "敏感性排序")); [["丢包率", 88], ["链路时延", 76], ["缓存上限", 61], ["重传次数", 48]].forEach(function (item) { var row = el("div"); row.appendChild(el("strong", "", item[0])); var track = el("i"); var fill = el("span"); fill.style.width = item[1] + "%"; track.appendChild(fill); row.appendChild(track); row.appendChild(el("em", "", item[1])); sensitivity.appendChild(row); }); diff.appendChild(sensitivity); diffPanel.appendChild(diff); panel.appendChild(diffPanel);

    function updateRuntimeView() {
      var completed = state.finished ? 18 : Math.max(0, state.index + 1) * 3;
      completenessStat.value.textContent = state.finished ? "89%" : "84%"; versionStat.value.textContent = state.finished ? "param_v_2026_m8.2" : data.meta.parameter_version; packCompleteness.textContent = state.finished ? "89%" : "84%"; completedValue.textContent = Math.min(18, completed) + " / 18"; interventionValue.textContent = state.finished ? "1项冲突" : "0项"; liveTitle.textContent = state.finished ? "无人化智能体本轮任务已完成" : "无人化智能体自主运行中"; liveNote.textContent = state.finished ? "参数版本已发布，冲突候选已进入人工复核" : "样例运行状态 · 定时任务与新线索事件双触发"; processSubtitle.textContent = state.finished ? "新证据已归一化，冲突参数自动进入复核队列，参数包版本已发布" : "新证据进入后自动完成归一化、冲突检测、校准与版本发布"; runButton.textContent = state.running ? "运行中" : (state.finished ? "重新运行" : "模拟自主更新"); runButton.disabled = state.running; stepNodes.forEach(function (step, index) { step.dataset.state = state.finished || index < state.index ? "done" : (state.running && index === state.index ? "running" : "waiting"); }); updateNotice.hidden = !state.finished;
    }
    function runUpdate() {
      if (state.timer) window.clearInterval(state.timer); state.index = 0; state.running = true; state.finished = false; updateRuntimeView(); state.timer = window.setInterval(function () { state.index += 1; if (state.index >= steps.length) { window.clearInterval(state.timer); state.timer = null; state.index = steps.length - 1; state.running = false; state.finished = true; } updateRuntimeView(); }, 500);
    }
    updateRuntimeView();
    mount.replaceChildren(panel);
    if (!state.running && !state.finished) window.setTimeout(runUpdate, 300);
  }

  function render(tabId, mountId) {
    var mount = typeof mountId === "string" ? document.getElementById(mountId) : mountId;
    if (!mount) return;
    if (tabId === "scenarios") renderScenarios(mount);
    else if (tabId === "principles") renderPrinciples(mount);
    else if (tabId === "opensource") renderOpenSource(mount);
    else renderParameters(mount);
  }

  window.PlatformModules = window.PlatformModules || {};
  window.PlatformModules.restorationAnalysis = { render: render };
}());
