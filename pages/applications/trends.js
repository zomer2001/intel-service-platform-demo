(function () {
  "use strict";

  var components = window.PlatformComponents;
  var tabs = [
    { id: "monitor", label: "前沿技术动态监测" },
    { id: "trends", label: "技术领域总体趋势" },
    { id: "routes", label: "关键技术路线演化" },
    { id: "gaps", label: "关键技术差距分析" }
  ];
  var requested = new URLSearchParams(window.location.search).get("tab") || "monitor";
  var active = tabs.some(function (tab) { return tab.id === requested; }) ? requested : "monitor";
  var shell = window.renderPlatform({
    projectTitle: "Lattice 平台专项分析",
    analysisLevel: "平台级分析",
    currentObject: "Lattice",
    taskStatus: "成果已形成",
    activeNavigation: "技术发展态势研判",
    logoPath: "../../assets/brand/vernal-institute-logo.png",
    enterpriseHref: "../workspace/enterprise.html",
    lineageHref: "./lineage.html",
    trendsHref: "./trends.html",
    restorationHref: "./restoration.html"
  });

  var content = components.element("div", "content-stack intel-page");
  var header = components.element("header", "intel-page__header");
  var heading = components.element("div");
  heading.appendChild(components.element("h1", "", "技术发展态势研判"));
  heading.appendChild(components.element("p", "", "持续监测技术对象，研判领域趋势、路线演化与关键能力差距。"));
  header.appendChild(heading);
  header.appendChild(components.element("div", "intel-disclaimer", "样例研判数据／公开资料研判，仅供分析参考"));
  content.appendChild(header);

  var card = components.element("section", "card intel-tabs-card");
  var viewport = components.element("div", "tabs-viewport");
  var tablist = components.element("div", "tabs");
  var buttons = {};
  var panels = {};
  tablist.setAttribute("role", "tablist");
  tablist.setAttribute("aria-label", "技术发展态势研判成果分类");

  function updateUrl(tabId) {
    try {
      var url = new URL(window.location.href);
      url.searchParams.set("tab", tabId);
      if (tabId !== "routes") url.searchParams.delete("focus");
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
    control.id = "trend-tab-" + tab.id;
    control.setAttribute("role", "tab");
    control.setAttribute("aria-controls", "trend-panel-" + tab.id);
    panel.id = "trend-panel-" + tab.id;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", control.id);
    mount.id = "trend-mount-" + tab.id;
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
  tabs.forEach(function (tab) { window.PlatformModules.trendAnalysis.render(tab.id, "trend-mount-" + tab.id); });
  selectTab(active, false);
}());
