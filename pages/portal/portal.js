(function () {
  "use strict";

  var ui = window.PlatformComponents;
  var element = ui.element;
  var href = window.PlatformLayout.resolveHref;
  var catalog = window.PRODUCT_CATALOG_DATA || { products: [], sources: [], evidence: [] };
  var trend = window.TrendAnalysisData || { sources: [], events: [] };
  var restoration = window.RestorationAnalysisData || { opensource_projects: [], parameters: [] };
  var query = new URLSearchParams(window.location.search);
  var views = {
    overview: { title: "综合工作台", nav: "综合工作台", description: "围绕 Anduril、Lattice 与 Lattice Mesh，贯通对象梳理、技术研判与验证准备。" },
    projects: { title: "项目 / 专题", nav: "项目 / 专题", description: "从企业专题进入平台与关键技术研究，逐层追溯对象、事件和来源。" },
    tasks: { title: "任务中心", nav: "任务中心", description: "按企业、平台和关键技术三个层级进入已有分析任务。" },
    search: { title: "知识检索", nav: "知识检索", description: "检索已载入的对象档案、本地来源摘要和分析成果，直接打开对应内容。" },
    results: { title: "成果中心", nav: "成果中心", description: "集中查看八类业务成果，并区分公开信息、分析判断与样例基线。" }
  };
  var viewId = Object.prototype.hasOwnProperty.call(views, query.get("view")) ? query.get("view") : "overview";
  var view = views[viewId];
  var scenarios = [
    { title: "技术产品目录", category: "产品技术谱系", description: "查看产品、软件平台和关键能力的对象档案，追溯公开来源。", path: "pages/applications/lineage.html?tab=catalog", scope: "公开信息 · 对象档案", terms: "目录 产品 Anduril Lattice Mesh", count: catalog.products.length + " 项对象" },
    { title: "可视化技术/事件图谱", category: "产品技术谱系", description: "沿公开事件与对象关系，梳理技术发展脉络和证据关联。", path: "pages/applications/lineage.html?tab=graph", scope: "公开事件 · 关系研判", terms: "谱系 图谱 技术 事件 Anduril Lattice Mesh" },
    { title: "前沿技术动态监测", category: "技术发展态势", description: "进入 Lattice 监测详情，查看关联事件及技术变化线索。", path: "pages/applications/trends.html?tab=monitor&object=lattice", scope: "离线资料 · 事件研判", terms: "动态 监测 平台 Lattice Mesh", count: trend.events.length + " 条已载入事件" },
    { title: "关键技术路线演化", category: "技术发展态势", description: "从路线阶段、能力节点和关联证据观察关键技术演进。", path: "pages/applications/trends.html?tab=routes", scope: "公开线索 · 路线归纳", terms: "技术 路线 演化 Lattice Mesh" },
    { title: "技术成熟度分析报告", category: "产品技术谱系", description: "查看 Lattice Mesh 的分维度成熟度判断和证据边界。", path: "pages/applications/lineage.html?tab=maturity&tech=lattice-mesh", scope: "证据驱动 · 分析判断", terms: "技术 成熟度 报告 TRL Lattice Mesh" },
    { title: "关键技术差距分析", category: "技术发展态势", description: "对照能力维度与样例基线，识别差距和后续验证方向。", path: "pages/applications/trends.html?tab=gaps", scope: "分析判断 · 样例基线", terms: "技术 差距 对标 能力 Lattice Mesh" },
    { title: "开源项目索引矩阵", category: "技术辅助还原", description: "查看候选开源资源与技术单元的映射，支持验证路径选择。", path: "pages/applications/restoration.html?tab=opensource", scope: "候选映射 · 样例基线", terms: "开源 项目 索引 矩阵 资源 Lattice Mesh", count: restoration.opensource_projects.length + " 项候选记录" },
    { title: "仿真验证参数包", category: "技术辅助还原", description: "从开源项目进入，查看项目概览、真实代码入口、架构、可提取能力与验证步骤。", path: "pages/applications/restoration.html?tab=parameters", scope: "项目级验证准备 · 公开仓库", terms: "仿真 验证 参数 包 代码 架构 Lattice Mesh", count: restoration.opensource_projects.length + " 个项目可生成" }
  ];

  function link(label, path, primary) {
    var node = element("a", "button portal-link button--" + (primary ? "primary" : "secondary"), label);
    node.href = href(path);
    return node;
  }

  function note(lines) {
    var node = element("aside", "portal-note");
    lines.forEach(function (line) { node.appendChild(element("p", "", line)); });
    return node;
  }

  function section(title, description) {
    var node = element("section");
    var heading = element("div", "portal-section-heading");
    heading.appendChild(element("h2", "", title));
    if (description) heading.appendChild(element("p", "", description));
    node.appendChild(heading);
    return node;
  }

  function navigationCard(item, label) {
    var body = element("div", "portal-card__body");
    body.appendChild(element("p", "portal-card__meta", [item.scope, item.count].filter(Boolean).join(" · ")));
    body.appendChild(link(label || "查看成果", item.path));
    return ui.createCard({ eyebrow: item.category, title: item.title, description: item.description, body: body, className: "portal-card", headingLevel: "h3" });
  }

  function resultGrid() {
    var grid = element("div", "portal-grid");
    scenarios.forEach(function (item) { grid.appendChild(navigationCard(item)); });
    return grid;
  }

  function facts(entries) {
    var list = element("dl", "portal-facts");
    entries.forEach(function (entry) {
      var row = element("div");
      row.appendChild(element("dt", "", entry[0]));
      row.appendChild(element("dd", "", entry[1]));
      list.appendChild(row);
    });
    return list;
  }

  function renderOverview(page) {
    var hero = element("section", "card portal-hero");
    var copy = element("div");
    copy.appendChild(element("p", "card__eyebrow", "当前研究专题"));
    copy.appendChild(element("h2", "", "Anduril 技术情报专项"));
    copy.appendChild(element("p", "portal-hero__copy", "从企业产品体系展开，聚焦 Lattice 平台，再下钻至 Lattice Mesh 关键技术，将来源证据与分析成果连成可追溯的研究路径。"));
    var actions = element("div", "button-row");
    actions.appendChild(link("进入技术产品目录", scenarios[0].path, true));
    actions.appendChild(link("查看研究专题", "pages/portal/portal.html?view=projects"));
    copy.appendChild(actions);
    hero.appendChild(copy);
    hero.appendChild(facts([["本地对象档案", catalog.products.length + " 项"], ["目录来源记录", catalog.sources.length + " 条"], ["业务成果入口", scenarios.length + " 类"], ["目录核验日期", catalog.checkedAt || "未标注"]]));
    page.appendChild(hero);
    var results = section("业务场景", "按研究环节打开已载入内容");
    results.appendChild(resultGrid());
    page.appendChild(results);
    page.appendChild(note(["资料范围：本地整理的公开信息、研究判断与样例基线。各页面的来源日期、核验状态和结论边界以具体记录为准。"]));
  }

  function renderProjects(page) {
    var grid = element("div", "portal-grid portal-grid--three");
    [
      { category: "企业专题", title: "Anduril 技术情报专项", description: "梳理产品组合、关键软件平台和公开发展事件，建立企业层面的对象与证据基础。", path: scenarios[0].path, scope: "研究对象：Anduril Industries", count: catalog.products.length + " 项对象档案" },
      { category: "平台专题", title: "Lattice 平台研究", description: "连接平台对象档案与动态监测，追踪开放接口、系统集成和数据协同能力。", path: "pages/applications/lineage.html?tab=catalog&object=lattice", scope: "研究对象：Lattice" },
      { category: "关键技术专题", title: "Lattice Mesh 研究", description: "围绕分布式数据网格，衔接成熟度研判、候选开源映射和仿真验证参数。", path: "pages/applications/lineage.html?tab=maturity&tech=lattice-mesh", scope: "研究对象：Lattice Mesh" }
    ].forEach(function (item) { grid.appendChild(navigationCard(item, "打开专题")); });
    page.appendChild(grid);
    var pathSection = section("研究路径", "企业 → 平台 → 关键技术");
    var path = element("div", "card portal-path");
    path.appendChild(link("Anduril 产品与技术", scenarios[0].path));
    path.appendChild(element("span", "", "→"));
    path.appendChild(link("Lattice 动态监测", scenarios[2].path));
    path.appendChild(element("span", "", "→"));
    path.appendChild(link("Lattice Mesh 成熟度", scenarios[4].path));
    path.appendChild(element("span", "", "→"));
    path.appendChild(link("开源映射与验证准备", scenarios[6].path));
    pathSection.appendChild(path);
    page.appendChild(pathSection);
    page.appendChild(note(["专题页面复用同一批本地对象和来源资料；关键技术的内部实现、实测性能和实际采用关系，以已公开且可追溯的证据为限。"]));
  }

  function renderTasks(page) {
    page.appendChild(note(["以下为离线任务样例，保留已有任务配置和分析流程。流程状态、进度及样例输出仅对应本地交互，不表示已接入实时采集或外部任务服务。"]));
    var grid = element("div", "portal-grid portal-grid--three");
    [
      { category: "企业级分析", title: "Anduril 企业情报分析", description: "从企业对象开始组织研究范围，进入产品、技术与证据梳理流程。", path: "pages/workspace/enterprise.html", scope: "离线任务样例 · 企业级" },
      { category: "平台级分析", title: "Lattice 平台专项分析", description: "聚焦平台能力及公开发展线索，连接动态监测、技术路线和差距研判。", path: "pages/workspace/lattice.html", scope: "离线任务样例 · 平台级" },
      { category: "关键技术分析", title: "Lattice Mesh 技术研究", description: "进入已有技术研究工作页，衔接资料、原理拆解、开源资源和验证准备。", path: "pages/workspace/lattice-mesh.html", scope: "离线任务样例 · 技术级" }
    ].forEach(function (item) { grid.appendChild(navigationCard(item, "打开任务工作页")); });
    page.appendChild(grid);
    var ready = ui.createCard({ title: "直接查看已有成果", description: "已整理的八类成果可从成果中心直接浏览，无需重新运行任务流程。", body: link("进入成果中心", "pages/portal/portal.html?view=results", true), className: "portal-card" });
    page.appendChild(ready);
  }

  function sourceRecords() {
    var seen = {};
    var records = [];
    catalog.sources.forEach(function (source) {
      var key = (source.url || source.id).replace(/\/$/, "").toLowerCase();
      seen[key] = true;
      records.push({ id: source.id, title: source.title, publisher: source.publisher, date: source.date, summary: source.summary, supports: source.supports, url: source.url, checkedAt: source.checkedAt, boundary: source.scopeNote || source.verification, origin: "目录来源", related: catalog.products.filter(function (product) { return (product.sourceIds || []).indexOf(source.id) >= 0; }) });
    });
    (trend.sources || []).forEach(function (source) {
      var key = (source.URL || source.source_id).replace(/\/$/, "").toLowerCase();
      if (seen[key]) return;
      seen[key] = true;
      records.push({ id: "trend-" + source.source_id, title: source["来源名称"], publisher: source["来源类型"], date: source["发布日期"], summary: source["支持内容"], supports: source["支持内容"], url: source.URL, origin: "态势来源", related: [], boundary: "本地来源摘要用于支持所列线索；分析判断与来源事实须分别核验。" });
    });
    return records;
  }

  function openSource(source) {
    function paragraph(text) { return element("p", "portal-source-copy", String(text || "未标注").replace(/演示/g, "展示")); }
    var sections = [
      { title: "来源信息", content: paragraph([source.publisher, source.date, "本地来源摘要"].filter(Boolean).join(" · ")) },
      { title: "摘要", content: paragraph(source.summary || source.supports) },
      { title: "支持内容", content: paragraph(source.supports) },
      { title: "结论边界", content: paragraph(source.boundary || "本地摘要仅支持所列公开信息。企业披露不等于独立测试结果，未公开的实现和性能不据此推定。") }
    ];
    if (source.checkedAt) sections.push({ title: "核验日期", content: paragraph(source.checkedAt) });
    if (source.related.length) {
      var related = element("div", "portal-related");
      source.related.forEach(function (product) { related.appendChild(link(product.name, "pages/applications/lineage.html?tab=catalog&object=" + encodeURIComponent(product.id))); });
      sections.push({ title: "关联对象", content: related });
    }
    if (source.url && /^https?:\/\//i.test(source.url)) {
      var original = element("a", "portal-source-link", "打开原始来源（需联网）");
      original.href = source.url;
      original.target = "_blank";
      original.rel = "noopener noreferrer";
      sections.push({ title: "原始来源", content: original });
    }
    ui.openDrawer({ title: source.title, kicker: source.origin, sections: sections });
  }

  function searchRecords() {
    var records = catalog.products.map(function (product) {
      return { kind: "objects", kindLabel: "对象档案", title: product.name, description: product.type + " · " + product.summary, keywords: [product.name, product.type, product.summary, product.developer].concat(product.aliases || []).join(" "), path: "pages/applications/lineage.html?tab=catalog&object=" + encodeURIComponent(product.id) };
    });
    sourceRecords().forEach(function (source) {
      records.push({ kind: "sources", kindLabel: "本地来源", title: source.title, description: [source.publisher, source.date, source.supports].filter(Boolean).join(" · "), keywords: [source.title, source.publisher, source.summary, source.supports].join(" "), source: source });
    });
    scenarios.forEach(function (item) {
      records.push({ kind: "results", kindLabel: "分析成果", title: item.title, description: item.description + " " + item.scope, keywords: item.title + " " + item.description + " " + item.terms, path: item.path });
    });
    return records;
  }

  function renderSearch(page) {
    var records = searchRecords();
    var form = element("form", "card portal-search");
    var searchLabel = element("label", "", "关键词");
    var input = element("input", "portal-query");
    input.type = "search";
    input.placeholder = "输入对象、技术方向、来源名称或成果名称";
    input.value = query.get("q") || "";
    searchLabel.appendChild(input);
    var kindLabel = element("label", "", "内容类型");
    var select = element("select", "portal-filter");
    [["all", "全部内容"], ["objects", "对象档案"], ["sources", "本地来源"], ["results", "分析成果"]].forEach(function (item) {
      var option = element("option", "", item[1]); option.value = item[0]; select.appendChild(option);
    });
    kindLabel.appendChild(select);
    var button = ui.createButton({ label: "检索", tone: "primary" });
    button.type = "submit";
    form.appendChild(searchLabel); form.appendChild(kindLabel); form.appendChild(button);
    var status = element("p", "portal-search-status");
    status.setAttribute("role", "status");
    var list = element("div", "portal-search-list");
    page.appendChild(form);
    page.appendChild(status);
    page.appendChild(list);
    page.appendChild(note(["检索范围为已载入的本地记录。来源按钮可离线查看摘要与支撑内容，原始网页另行标注为需联网；未加载的资料不纳入检索。"]));

    function update() {
      var terms = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      var matches = records.filter(function (record) {
        return (select.value === "all" || record.kind === select.value) && terms.every(function (term) { return record.keywords.toLowerCase().indexOf(term) >= 0; });
      });
      status.textContent = "找到 " + matches.length + " 条结果 · 对象 " + matches.filter(function (item) { return item.kind === "objects"; }).length + " · 本地来源 " + matches.filter(function (item) { return item.kind === "sources"; }).length + " · 成果 " + matches.filter(function (item) { return item.kind === "results"; }).length;
      list.replaceChildren();
      if (!matches.length) {
        var empty = element("section", "card portal-empty");
        empty.appendChild(element("h2", "", "未找到匹配内容"));
        empty.appendChild(element("p", "", "请调整关键词或内容类型；当前仅检索本地已有对象、来源和成果。"));
        list.appendChild(empty);
      }
      matches.forEach(function (record) {
        var row = element("article", "card portal-search-item");
        var copy = element("div", "portal-search-item__copy");
        copy.appendChild(element("span", "portal-search-kind", record.kindLabel));
        copy.appendChild(element("h2", "", record.title));
        copy.appendChild(element("p", "", record.description.replace(/演示/g, "展示")));
        row.appendChild(copy);
        row.appendChild(record.source ? ui.createButton({ label: "查看本地来源", onClick: function () { openSource(record.source); } }) : link(record.kind === "objects" ? "打开对象" : "查看成果", record.path));
        list.appendChild(row);
      });
    }
    form.addEventListener("submit", function (event) { event.preventDefault(); update(); });
    input.addEventListener("input", update);
    select.addEventListener("change", update);
    update();
  }

  function renderResults(page) {
    page.appendChild(resultGrid());
    var boundary = section("来源与成果边界", "公开信息、分析判断、样例基线分别使用");
    var grid = element("div", "portal-grid portal-grid--three");
    [
      { title: "公开信息", description: "目录及来源摘要保留出处与核验日期。厂商说明、计划和合同应按原记录解读，不等同于独立实测或全部交付。" },
      { title: "分析判断", description: "图谱关系、技术路线、成熟度与差距结论由公开线索归纳。证据不足的内容保留未公开、未核验或待补充边界。" },
      { title: "样例基线", description: "对标评分和候选项目映射用于展示研究方法；项目验证参数包来自公开仓库事实与系统研判，不代表真实系统内部实现、实际采用关系或实测性能。" }
    ].forEach(function (item) { grid.appendChild(ui.createCard({ title: item.title, description: item.description, className: "portal-card", headingLevel: "h3" })); });
    boundary.appendChild(grid);
    page.appendChild(boundary);
    page.appendChild(link("检索对象与本地来源", "pages/portal/portal.html?view=search"));
  }

  document.title = "情报服务平台｜" + view.title;
  var shell = window.renderPlatform({ projectTitle: "Anduril 技术情报专项", analysisLevel: "企业 · 平台 · 技术", currentObject: "Anduril / Lattice / Lattice Mesh", taskStatus: "本地资料可浏览", activeNavigation: view.nav });
  var page = element("div", "portal-page");
  var header = element("header", "page-header");
  var heading = element("div");
  heading.appendChild(element("h1", "", view.title));
  heading.appendChild(element("p", "page-header__description", view.description));
  header.appendChild(heading);
  page.appendChild(header);
  ({ overview: renderOverview, projects: renderProjects, tasks: renderTasks, search: renderSearch, results: renderResults })[viewId](page);
  shell.workspace.appendChild(page);
}());
