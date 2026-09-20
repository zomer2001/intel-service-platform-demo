(function () {
  "use strict";

  var components = window.PlatformComponents;
  var tabDefinitions = [
    { id: "catalog", label: "技术产品目录" },
    { id: "graph", label: "可视化技术/事件图谱" },
    { id: "maturity", label: "技术成熟度分析报告" },
    { id: "ontology", label: "研究对象本体库" }
  ];
  var query = new URLSearchParams(window.location.search);
  var requestedTab = query.get("tab") || "catalog";
  var activeTab = tabDefinitions.some(function (item) { return item.id === requestedTab; }) ? requestedTab : "catalog";
  var selectedProductId = activeTab === "catalog" ? (query.get("object") || query.get("product")) : null;

  var shell = window.renderPlatform({
    projectTitle: "当前专题：Anduril 技术情报专项",
    analysisLevel: "企业级分析",
    currentObject: "Anduril Industries",
    taskStatus: "成果可浏览",
    activeNavigation: "产品技术谱系构建",
    logoPath: "../../assets/brand/vernal-institute-logo.png",
    enterpriseHref: "../workspace/enterprise.html",
    lineageHref: "./lineage.html"
  });

  function createPlaceholder() {
    var box = components.element("section", "pc-placeholder");
    box.appendChild(components.element("h2", "pc-placeholder__title", "当前成果模块将在后续接入。"));
    return box;
  }

  function updateUrl(tabId) {
    try {
      var url = new URL(window.location.href);
      url.searchParams.set("tab", tabId);
      if (tabId !== "catalog") {
        url.searchParams.delete("object");
        url.searchParams.delete("product");
      }
      window.history.replaceState({}, "", url.href);
    } catch (error) {
      /* 不影响 file:// 页面本身的 Tab 切换。 */
    }
  }

  var content = components.element("div", "content-stack");
  var header = components.element("header", "page-header");
  var titleGroup = components.element("div");
  var pageTitle = components.element("h1", "", "技术产品目录");
  var pageDescription = components.element("p", "page-header__description", "汇总 Anduril 已识别的技术产品、软件平台与关键能力对象，支持检索筛选、对象档案查看及证据追溯。");
  var tabCard = components.element("section", "card");
  var viewport = components.element("div", "tabs-viewport");
  var tablist = components.element("div", "tabs");
  var panels = {};
  var buttons = {};

  titleGroup.appendChild(pageTitle);
  titleGroup.appendChild(pageDescription);
  header.appendChild(titleGroup);
  content.appendChild(header);

  tablist.setAttribute("role", "tablist");
  tablist.setAttribute("aria-label", "产品技术谱系成果分类");

  function selectTab(tabId, focus) {
    activeTab = tabId;
    tabDefinitions.forEach(function (item) {
      var selected = item.id === tabId;
      buttons[item.id].setAttribute("aria-selected", selected ? "true" : "false");
      buttons[item.id].tabIndex = selected ? 0 : -1;
      panels[item.id].hidden = !selected;
    });
    if (tabId === "graph") {
      pageTitle.textContent = "可视化技术/事件图谱";
      pageDescription.textContent = "沿 2018—2026 公开里程碑呈现 Anduril 核心软件、网络能力与无人平台的技术演化关系，支持重点事件来源追溯。";
      document.title = "情报服务平台｜可视化技术/事件图谱";
      window.PlatformModules.maturityAnalysis.closeDrawer(false);
    } else if (tabId === "maturity") {
      pageTitle.textContent = "技术成熟度分析报告";
      pageDescription.textContent = "基于公开证据对 Lattice Mesh 的核心组网能力、网络弹性、安全机制、规模部署和开放集成等维度进行技术成熟度研判。";
      document.title = "情报服务平台｜技术成熟度分析报告";
      window.PlatformModules.fullStackGraph.closeDrawer(false);
    } else {
      pageTitle.textContent = "技术产品目录";
      pageDescription.textContent = "汇总 Anduril 已识别的技术产品、软件平台与关键能力对象，支持检索筛选、对象档案查看及证据追溯。";
      document.title = "情报服务平台｜技术产品目录";
      window.PlatformModules.fullStackGraph.closeDrawer(false);
      window.PlatformModules.maturityAnalysis.closeDrawer(false);
    }
    updateUrl(tabId);
    if (focus) buttons[tabId].focus();
  }

  tabDefinitions.forEach(function (item, index) {
    var button = components.element("button", "tab", item.label);
    var panel = components.element("section", "tab-panel");
    button.type = "button";
    button.id = "lineage-tab-" + item.id;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-controls", "lineage-panel-" + item.id);
    panel.id = "lineage-panel-" + item.id;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", button.id);

    if (item.id === "catalog") {
      var mount = components.element("div");
      mount.id = "catalog-mount";
      panel.appendChild(mount);
    } else if (item.id === "graph") {
      var graphMount = components.element("div");
      graphMount.id = "full-stack-graph-mount";
      panel.appendChild(graphMount);
    } else if (item.id === "maturity") {
      var maturityMount = components.element("div");
      maturityMount.id = "maturity-analysis-mount";
      panel.appendChild(maturityMount);
    } else {
      panel.appendChild(createPlaceholder());
    }

    button.addEventListener("click", function () { selectTab(item.id, false); });
    button.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      var offset = event.key === "ArrowRight" ? 1 : -1;
      var next = tabDefinitions[(index + offset + tabDefinitions.length) % tabDefinitions.length];
      selectTab(next.id, true);
    });
    buttons[item.id] = button;
    panels[item.id] = panel;
    tablist.appendChild(button);
    tabCard.appendChild(panel);
  });

  viewport.appendChild(tablist);
  tabCard.insertBefore(viewport, tabCard.firstChild);
  content.appendChild(tabCard);
  shell.workspace.appendChild(content);

  window.PlatformModules.productCatalog.render("catalog-mount", {
    selectedProductId: selectedProductId
  });
  window.PlatformModules.fullStackGraph.render("full-stack-graph-mount");
  window.PlatformModules.maturityAnalysis.render("maturity-analysis-mount");
  selectTab(activeTab, false);
}());
