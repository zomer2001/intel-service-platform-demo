(function () {
  "use strict";

  var components = window.PlatformComponents;
  var tabs = [
    { id: "scenarios", label: "业务场景推演方案集" },
    { id: "principles", label: "技术原理拆解图谱" },
    { id: "opensource", label: "开源项目索引矩阵" },
    { id: "parameters", label: "仿真验证参数包" }
  ];
  var query = new URLSearchParams(window.location.search);
  var requested = query.get("tab") || "scenarios";
  var active = tabs.some(function (tab) { return tab.id === requested; }) ? requested : "scenarios";
  var shell = window.renderPlatform({
    projectTitle: "Lattice Mesh 技术还原专项",
    analysisLevel: "技术级分析",
    currentObject: "Lattice Mesh",
    taskStatus: "成果已形成",
    activeNavigation: "技术辅助还原与破解",
    logoPath: "../../assets/brand/vernal-institute-logo.png",
    enterpriseHref: "../workspace/enterprise.html",
    lineageHref: "./lineage.html",
    trendsHref: "./trends.html",
    restorationHref: "./restoration.html"
  });

  var content = components.element("div", "content-stack intel-page");
  var header = components.element("header", "intel-page__header");
  var heading = components.element("div");
  heading.appendChild(components.element("h1", "", "技术辅助还原与破解"));
  heading.appendChild(components.element("p", "", "从业务场景、候选原理、开源资源和仿真参数逐层形成可验证的技术还原路径。"));
  header.appendChild(heading);
  header.appendChild(components.element("div", "intel-disclaimer", "样例研判数据／公开资料研判，仅供分析参考"));
  content.appendChild(header);

  var card = components.element("section", "card intel-tabs-card");
  var viewport = components.element("div", "tabs-viewport");
  var tablist = components.element("div", "tabs");
  var buttons = {};
  var panels = {};
  tablist.setAttribute("role", "tablist");
  tablist.setAttribute("aria-label", "技术辅助还原与破解成果分类");

  function updateUrl(tabId) {
    try {
      var url = new URL(window.location.href);
      url.searchParams.set("tab", tabId);
      window.history.replaceState({}, "", url.href);
    } catch (error) { /* file:// 下仍保留当前交互。 */ }
  }

  function selectTab(tabId, focus) {
    active = tabId;
    tabs.forEach(function (tab) {
      var selected = tab.id === tabId;
      buttons[tab.id].setAttribute("aria-selected", selected ? "true" : "false");
      buttons[tab.id].tabIndex = selected ? 0 : -1;
      panels[tab.id].hidden = !selected;
    });
    var selectedTab = tabs.find(function (tab) { return tab.id === tabId; });
    document.title = "情报服务平台｜" + selectedTab.label;
    updateUrl(tabId);
    if (focus) buttons[tabId].focus();
  }

  tabs.forEach(function (tab, index) {
    var control = components.element("button", "tab", tab.label);
    var panel = components.element("section", "tab-panel");
    var mount = components.element("div");
    control.type = "button";
    control.id = "restore-tab-" + tab.id;
    control.setAttribute("role", "tab");
    control.setAttribute("aria-controls", "restore-panel-" + tab.id);
    panel.id = "restore-panel-" + tab.id;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", control.id);
    mount.id = "restore-mount-" + tab.id;
    panel.appendChild(mount);
    control.addEventListener("click", function () { selectTab(tab.id, false); });
    control.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      var offset = event.key === "ArrowRight" ? 1 : -1;
      selectTab(tabs[(index + offset + tabs.length) % tabs.length].id, true);
    });
    buttons[tab.id] = control;
    panels[tab.id] = panel;
    tablist.appendChild(control);
    card.appendChild(panel);
  });

  viewport.appendChild(tablist);
  card.insertBefore(viewport, card.firstChild);
  content.appendChild(card);
  shell.workspace.appendChild(content);
  tabs.forEach(function (tab) { window.PlatformModules.restorationAnalysis.render(tab.id, "restore-mount-" + tab.id); });
  selectTab(active, false);
  if (active === "opensource" && query.get("project")) {
    window.setTimeout(function () { window.PlatformModules.restorationAnalysis.openProjectById(query.get("project")); }, 0);
  }
}());
