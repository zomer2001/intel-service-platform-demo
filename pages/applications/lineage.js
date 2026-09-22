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
  var tabScroll = {};
  var lastProduct = query.get("fromProduct") || selectedProductId || null;

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
    var box = components.element("section", "lineage-ontology");
    box.appendChild(components.element("h2", "", "研究对象与关系索引"));
    box.appendChild(components.element("p", "page-header__description", "复用技术产品目录中的对象标识、别名与已整理关系，提供统一浏览入口。关系说明属于公开资料整理，不等同于正式本体推理结果。"));
    var grid = components.element("div", "lineage-ontology__list");
    window.PRODUCT_CATALOG_DATA.products.forEach(function (item) {
      var record = components.element("article", "lineage-ontology__item");
      record.appendChild(components.element("h3", "", item.name));
      record.appendChild(components.element("p", "", item.type + " · " + (item.aliases.length ? item.aliases.join(" / ") : "暂无其他公开别名")));
      record.appendChild(components.element("p", "", item.positioning || item.summary));
      record.appendChild(components.element("p", "", "已整理 " + (item.relations || []).length + " 条关联关系"));
      var open = components.element("button", "button", "查看对象档案");
      open.type = "button";
      open.addEventListener("click", function () { selectTab("catalog", false); window.PlatformModules.productCatalog.openDetail(item.id); });
      record.appendChild(open); grid.appendChild(record);
    });
    box.appendChild(grid);
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
      if (tabId !== "graph") {
        url.searchParams.delete("graphObject");
        url.searchParams.delete("event");
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
  var studyLinks = components.element("div", "lineage-links");
  studyLinks.hidden = true;

  titleGroup.appendChild(pageTitle);
  titleGroup.appendChild(pageDescription);
  var taskNote = components.element("p", "lineage-task-note", "研究任务：梳理产品与核心技术，追溯关键事件及来源。公开资料离线整理 · 核验日期 2026-09-20");
  titleGroup.appendChild(taskNote);
  header.appendChild(titleGroup);
  content.appendChild(header);
  content.appendChild(studyLinks);

  function setTopObject(name, level) {
    shell.shell.querySelector(".topbar__object").textContent = "当前对象：" + name;
    shell.shell.querySelector(".topbar__level").textContent = level;
  }

  function setObjectContext(object) {
    var id = object && object.id || "";
    setTopObject(object ? object.name : "Anduril Industries", id === "lattice-mesh" ? "技术级分析" : /^(lattice|lattice-c2|lattice-sdk|mission-autonomy)$/.test(id) ? "平台级分析" : "企业级分析");
  }

  function refreshStudyLinks(tabId) {
    studyLinks.replaceChildren();
    studyLinks.hidden = tabId !== "graph" && tabId !== "maturity";
    if (studyLinks.hidden) return;
    if (tabId === "graph") {
      studyLinks.appendChild(components.element("p", "", "从目录识别对象，再沿时间轴追溯事件。返回目录后可进入对应平台的动态监测。"));
      var back = components.element("button", "button", "返回技术产品目录");
      back.type = "button";
      back.addEventListener("click", function () { selectTab("catalog", false); if (lastProduct) window.PlatformModules.productCatalog.openDetail(lastProduct); });
      studyLinks.appendChild(back);
    } else {
      studyLinks.appendChild(components.element("p", "", "专项技术：Lattice Mesh ｜ 公开资料 TRL 研判。下一步可对比当前方案样例基线，定位拟补强方向。"));
      var backRoute = components.element("a", "button", "返回技术路线");
      backRoute.href = "./trends.html?tab=routes&object=lattice&tech=lattice-mesh" + (query.get("route") ? "&route=" + encodeURIComponent(query.get("route")) : "");
      studyLinks.appendChild(backRoute);
      var gaps = components.element("a", "button button--primary", "查看关键技术差距分析");
      gaps.href = "./trends.html?tab=gaps&object=lattice&tech=lattice-mesh&gap=G002" + (query.get("route") ? "&route=" + encodeURIComponent(query.get("route")) : "");
      studyLinks.appendChild(gaps);
    }
  }

  tablist.setAttribute("role", "tablist");
  tablist.setAttribute("aria-label", "产品技术谱系成果分类");

  function selectTab(tabId, focus) {
    tabScroll[activeTab] = window.scrollY;
    window.PlatformModules.productCatalog.closeDetail(false);
    activeTab = tabId;
    tabDefinitions.forEach(function (item) {
      var selected = item.id === tabId;
      buttons[item.id].setAttribute("aria-selected", selected ? "true" : "false");
      buttons[item.id].tabIndex = selected ? 0 : -1;
      panels[item.id].hidden = !selected;
    });
    if (tabId === "graph") {
      window.PlatformModules.fullStackGraph.resizeGraph();
      setObjectContext(window.PlatformModules.fullStackGraph.getFocusedObject());
      pageTitle.textContent = "可视化技术/事件图谱";
      pageDescription.textContent = "沿 2018—2026 公开里程碑呈现 Anduril 核心软件、网络能力与无人平台的技术演化关系，支持重点事件来源追溯。";
      document.title = "情报服务平台｜可视化技术/事件图谱";
      window.PlatformModules.maturityAnalysis.closeDrawer(false);
    } else if (tabId === "maturity") {
      pageTitle.textContent = "技术成熟度分析报告";
      pageDescription.textContent = "基于公开证据对 Lattice Mesh 的核心组网能力、网络弹性、安全机制、规模部署和开放集成等维度进行技术成熟度研判。";
      document.title = "情报服务平台｜技术成熟度分析报告";
      window.PlatformModules.fullStackGraph.closeDrawer(false);
      setTopObject("Lattice Mesh", "技术级分析");
    } else if (tabId === "ontology") {
      pageTitle.textContent = "研究对象本体库";
      pageDescription.textContent = "以统一对象档案组织产品、平台、别名与已整理关系。";
      document.title = "情报服务平台｜研究对象本体库";
      window.PlatformModules.fullStackGraph.closeDrawer(false);
      window.PlatformModules.maturityAnalysis.closeDrawer(false);
      setTopObject("Anduril Industries", "企业级分析");
    } else {
      pageTitle.textContent = "技术产品目录";
      pageDescription.textContent = "汇总 Anduril 已识别的技术产品、软件平台与关键能力对象，支持检索筛选、对象档案查看及证据追溯。";
      document.title = "情报服务平台｜技术产品目录";
      window.PlatformModules.fullStackGraph.closeDrawer(false);
      window.PlatformModules.maturityAnalysis.closeDrawer(false);
      setTopObject("Anduril Industries", "企业级分析");
    }
    refreshStudyLinks(tabId);
    updateUrl(tabId);
    taskNote.hidden = tabId !== "catalog" && tabId !== "graph";
    window.scrollTo(0, tabScroll[tabId] || 0);
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
    selectedProductId: null
  });
  window.PlatformModules.fullStackGraph.render("full-stack-graph-mount");
  window.PlatformModules.maturityAnalysis.render("maturity-analysis-mount");
  document.addEventListener("lineage:object", function (event) {
    if (!event.detail) return;
    if (activeTab === "catalog") lastProduct = event.detail.id;
    setObjectContext(event.detail);
  });
  selectTab(activeTab, false);
  if (selectedProductId) window.PlatformModules.productCatalog.openDetail(selectedProductId, true);
  if (activeTab === "graph" && query.get("graphObject")) {
    window.PlatformModules.fullStackGraph.focusObject(query.get("graphObject"), query.get("event"), lastProduct);
  }
  document.addEventListener("lineage:navigate", function (event) {
    var target = event.detail;
    if (!target || (target.tab !== "catalog" && target.tab !== "graph")) return;
    if (target.fromProduct) lastProduct = target.fromProduct;
    selectTab(target.tab, false);
    if (target.tab === "graph") window.PlatformModules.fullStackGraph.focusObject(target.objectId, target.eventId, target.fromProduct);
    else window.PlatformModules.productCatalog.openDetail(target.objectId || lastProduct);
  });
}());
