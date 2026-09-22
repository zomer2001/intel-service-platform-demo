(function () {
  "use strict";

  var categoryLabels = {
    all: "全部",
    "tactical-strike": "战术侦察与打击",
    "air-dominance": "空中优势与打击",
    "air-mobility": "空中机动",
    "ground-protection": "地面与防护",
    "counter-uas": "反无人机",
    maritime: "海上 / 水下",
    software: "软件与平台"
  };
  var objectTypeLabels = {
    all: "全部",
    product: "产品",
    technology: "技术 / 平台"
  };
  var sourceTypeLabels = {
    government: "政府来源",
    military_official: "军方官方",
    first_party: "企业第一方",
    developer_doc: "开发者文档",
    official_job: "官方招聘",
    paper: "论文",
    patent: "专利",
    industry_report: "行业研究报告",
    professional_media: "专业媒体",
    other: "其他"
  };
  var categoryOrder = [
    "tactical-strike",
    "air-dominance",
    "air-mobility",
    "ground-protection",
    "counter-uas",
    "maritime",
    "software"
  ];
  var state = null;

  function element(tagName, className, text) {
    var node = document.createElement(tagName);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = String(text);
    return node;
  }

  function setProductUrl(productId) {
    try {
      var url = new URL(window.location.href);
      url.searchParams.set("tab", "catalog");
      url.searchParams.delete("product");
      if (productId) url.searchParams.set("object", productId);
      else url.searchParams.delete("object");
      window.history.replaceState({}, "", url.href);
    } catch (error) {
      /* file:// 下旧版浏览器不支持 History API 时，交互仍保持可用。 */
    }
  }

  function statusLabel(status) {
    if (status === "已核验") return "已核验出处";
    if (status === "较完整" || status === "完整") return "较完整";
    if (status === "一般" || status === "部分") return "部分";
    return "有限";
  }

  function renderContext() {
    var context = element("section", "pc-context");
    [
      ["当前专题", "Anduril Industries"],
      ["成果类型", "技术产品目录"],
      ["对象范围", "技术平台 + 无人智能产品"]
    ].forEach(function (item) {
      var block = element("div", "pc-context__item");
      block.appendChild(element("span", "pc-context__label", item[0]));
      block.appendChild(element("strong", "pc-context__value", item[1]));
      context.appendChild(block);
    });
    return context;
  }

  function renderControl(labelText, className) {
    var control = element("label", "pc-control " + className);
    control.appendChild(element("span", "pc-control__label", labelText));
    return control;
  }

  function renderSelect(options, value, ariaLabel, onChange) {
    var select = element("select", "pc-control__select");
    select.setAttribute("aria-label", ariaLabel);
    Object.keys(options).forEach(function (key) {
      var option = element("option", "", options[key]);
      option.value = key;
      option.selected = key === value;
      select.appendChild(option);
    });
    select.addEventListener("change", function () { onChange(select.value); });
    return select;
  }

  function renderToolbar() {
    var toolbar = element("section", "pc-toolbar");
    var searchControl = renderControl("关键词检索", "pc-control--search");
    var search = element("input", "pc-control__input");
    var typeControl = renderControl("对象类型", "pc-control--select");
    var categoryControl = renderControl("应用场景", "pc-control--select");

    search.type = "search";
    search.placeholder = "搜索技术、产品、型号或能力关键词";
    search.value = state.query;
    search.setAttribute("aria-label", "搜索技术产品目录");
    search.addEventListener("input", function () {
      state.query = search.value.trim();
      applyFilters();
    });
    searchControl.appendChild(search);

    typeControl.appendChild(renderSelect(objectTypeLabels, state.objectType, "按对象类型筛选", function (value) {
      state.objectType = value;
      applyFilters();
    }));
    categoryControl.appendChild(renderSelect(categoryLabels, state.category, "按应用场景筛选", function (value) {
      state.category = value;
      applyFilters();
    }));

    toolbar.appendChild(searchControl);
    toolbar.appendChild(typeControl);
    toolbar.appendChild(categoryControl);
    state.searchNode = search;
    return toolbar;
  }

  function renderTags(items, limit) {
    var tags = element("div", "pc-tags");
    (items || []).slice(0, limit || 3).forEach(function (item) {
      tags.appendChild(element("span", "pc-tag", item));
    });
    return tags;
  }

  function renderNameCell(item) {
    var wrap = element("div", "pc-table__name-wrap");
    var button = element("button", "pc-table__name", item.name);
    button.type = "button";
    button.addEventListener("click", function () { openProductDetail(item.id); });
    wrap.appendChild(button);
    if (item.aliases && item.aliases.length) {
      wrap.appendChild(element("span", "pc-table__alias", item.aliases.join(" / ")));
    }
    return wrap;
  }

  function renderTable(items) {
    var wrap = element("div", "pc-table-wrap");
    var table = element("table", "pc-table");
    var head = element("thead");
    var headRow = element("tr");
    var body = element("tbody");
    ["对象名称", "对象类型", "场景 / 类别", "功能定位", "代表能力 / 指标", "资料状态", "来源"].forEach(function (label) {
      headRow.appendChild(element("th", "", label));
    });
    var activeCategory = "";
    items.forEach(function (item) {
      if (item.category !== activeCategory) {
        activeCategory = item.category;
        var groupRow = element("tr", "pc-table__group-row");
        var groupCell = element("td");
        var categoryCount = items.filter(function (record) { return record.category === item.category; }).length;
        groupCell.colSpan = 7;
        groupCell.appendChild(element("span", "pc-category pc-category--" + item.category, categoryLabels[item.category] || item.category));
        groupCell.appendChild(element("span", "pc-table__group-count", categoryCount + " 个对象"));
        groupRow.appendChild(groupCell);
        body.appendChild(groupRow);
      }
      var row = element("tr", "pc-table__row");
      var nameCell = element("td");
      var typeCell = element("td");
      var categoryCell = element("td");
      var positioningCell = element("td");
      var capabilityCell = element("td");
      var statusCell = element("td");
      var sourceCell = element("td", "pc-table__source-count", item.sourceIds.length);
      nameCell.appendChild(renderNameCell(item));
      typeCell.appendChild(element("span", "pc-object-type", objectTypeLabels[item.objectType] || item.objectType));
      categoryCell.appendChild(element("span", "pc-category pc-category--" + item.category, categoryLabels[item.category] || item.category));
      positioningCell.appendChild(element("p", "pc-table__positioning", item.positioning || item.type));
      capabilityCell.appendChild(renderTags(item.capabilities, 3));
      statusCell.appendChild(element("span", "pc-status pc-status--" + statusLabel(item.dataStatus), statusLabel(item.dataStatus)));
      row.appendChild(nameCell);
      row.appendChild(typeCell);
      row.appendChild(categoryCell);
      row.appendChild(positioningCell);
      row.appendChild(capabilityCell);
      row.appendChild(statusCell);
      row.appendChild(sourceCell);
      body.appendChild(row);
    });
    head.appendChild(headRow);
    table.appendChild(head);
    table.appendChild(body);
    wrap.appendChild(table);
    return wrap;
  }

  function renderResultsSummary(total) {
    return element("p", "pc-results__summary", "共 " + total + " 个对象，已按应用场景归组展示");
  }

  function renderEmpty() {
    var box = element("section", "pc-empty");
    var clear = element("button", "pc-empty__clear", "清除筛选");
    clear.type = "button";
    clear.addEventListener("click", function () {
      state.query = "";
      state.objectType = "all";
      state.category = "all";
      state.searchNode.value = "";
      state.root.querySelectorAll("select").forEach(function (item) { item.value = "all"; });
      applyFilters();
      state.searchNode.focus();
    });
    box.appendChild(element("h2", "pc-empty__title", "未找到符合当前筛选条件的技术或产品对象。"));
    box.appendChild(element("p", "pc-empty__description", "请更换关键词或放宽对象类型、应用场景筛选条件。"));
    box.appendChild(clear);
    return box;
  }

  function applyFilters() {
    var keyword = state.query.toLocaleLowerCase("zh-CN");
    var filtered = state.data.products.filter(function (item) {
      var inType = state.objectType === "all" || item.objectType === state.objectType;
      var inCategory = state.category === "all" || item.category === state.category;
      var searchText = [item.name, item.type, item.summary, item.positioning || ""]
        .concat(item.aliases || [], item.capabilities || [], item.applications || [])
        .join(" ")
        .toLocaleLowerCase("zh-CN");
      return inType && inCategory && (!keyword || searchText.indexOf(keyword) !== -1);
    });
    filtered.sort(function (left, right) {
      return categoryOrder.indexOf(left.category) - categoryOrder.indexOf(right.category);
    });
    if (!filtered.length) {
      state.resultsHost.replaceChildren(renderEmpty());
      return;
    }
    var results = element("section", "pc-results");
    results.setAttribute("aria-label", "技术产品目录结果");
    results.appendChild(renderResultsSummary(filtered.length));
    results.appendChild(renderTable(filtered));
    state.resultsHost.replaceChildren(results);
  }

  function renderSection(title, content) {
    var section = element("section", "pc-detail__section");
    section.appendChild(element("h3", "pc-detail__section-title", title));
    section.appendChild(content);
    return section;
  }

  function renderImage(item) {
    var figure = element("figure", "pc-detail__figure");
    if (!item.image || !item.image.path) {
      figure.appendChild(element("div", "pc-detail__no-image", item.name + "\n" + item.type));
      figure.appendChild(element("figcaption", "pc-detail__figure-source", "对象标识 · 未采用未经核实的配图"));
      return figure;
    }
    var picture = element("img", "pc-detail__image pc-detail__image--" + item.id);
    picture.src = item.image.path;
    picture.alt = item.name + " 公开资料图片";
    picture.addEventListener("error", function () {
      figure.replaceChildren(element("div", "pc-detail__no-image", "暂无公开图片"));
    });
    figure.appendChild(picture);
    var caption = element("figcaption", "pc-detail__figure-source");
    if (item.image.sourceUrl) {
      var link = element("a", "", "图片来源：" + item.image.sourceName + " ↗");
      link.href = item.image.sourceUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      caption.appendChild(link);
    } else {
      caption.textContent = "图片来源：" + item.image.sourceName;
    }
    figure.appendChild(caption);
    return figure;
  }

  function renderFacts(item) {
    var facts = element("dl", "pc-detail__facts");
    var values = [
      ["对象类型", objectTypeLabels[item.objectType] || item.objectType],
      ["应用场景", categoryLabels[item.category] || item.category],
      ["研发主体", item.developer],
      ["公开状态", item.publicStatus],
      ["资料状态", statusLabel(item.dataStatus)],
      ["来源记录", item.sourceIds.length + " 个"]
    ];
    values.forEach(function (fact) {
      var block = element("div", "pc-detail__fact");
      block.appendChild(element("dt", "pc-detail__fact-label", fact[0]));
      block.appendChild(element("dd", "pc-detail__fact-value", fact[1]));
      facts.appendChild(block);
    });
    return facts;
  }

  function renderList(items, className) {
    var list = element("ul", className || "pc-detail__list");
    items.forEach(function (item) { list.appendChild(element("li", "", item)); });
    return list;
  }

  function renderFunctions(item) {
    var grid = element("div", "pc-function-grid");
    item.functions.forEach(function (record, index) {
      var card = element("article", "pc-function");
      card.appendChild(element("span", "pc-function__index", String(index + 1).padStart(2, "0")));
      card.appendChild(element("h4", "pc-function__title", record.title));
      card.appendChild(element("p", "pc-function__description", record.description));
      grid.appendChild(card);
    });
    return grid;
  }

  function renderParameters(item) {
    if (!item.parameters.length) return element("p", "pc-detail__notice", "当前公开资料尚未形成可核验的统一参数集。");
    var wrap = element("div", "pc-detail__table-wrap");
    var table = element("table", "pc-detail__table");
    var head = element("thead");
    var headRow = element("tr");
    var body = element("tbody");
    ["参数", "公开值", "条件 / 说明", "来源"].forEach(function (label) { headRow.appendChild(element("th", "", label)); });
    item.parameters.forEach(function (parameter) {
      var row = element("tr");
      row.appendChild(element("td", "", parameter.name));
      row.appendChild(element("td", "pc-detail__parameter-value", parameter.value));
      row.appendChild(element("td", "", parameter.note));
      row.appendChild(element("td", "", parameter.source));
      body.appendChild(row);
    });
    head.appendChild(headRow);
    table.appendChild(head);
    table.appendChild(body);
    wrap.appendChild(table);
    return wrap;
  }

  function renderApplications(item) {
    var groups = element("div", "pc-application-grid");
    [
      ["军事应用", item.applicationGroups.military],
      ["商业应用", item.applicationGroups.commercial]
    ].forEach(function (group) {
      var card = element("article", "pc-application");
      card.appendChild(element("h4", "pc-application__title", group[0]));
      card.appendChild(renderList(group[1], "pc-application__list"));
      groups.appendChild(card);
    });
    return groups;
  }

  function renderRelations(item) {
    var list = element("div", "pc-relations");
    var relations = item.relations || item.relatedObjects.map(function (name) {
      var target = state.data.products.find(function (record) { return record.name === name; });
      return { targetId: target && target.id, name: name, type: "相关研究对象", description: "目录关联索引，不据此认定型号继承或直接集成。" };
    });
    if (!relations.length) return element("p", "pc-detail__notice", "当前档案未确认可直接建立的对象关系；不据产品同属一家企业推定集成或继承。");
    relations.forEach(function (record) {
      var target = state.data.products.find(function (other) { return other.id === record.targetId; });
      var relation = element("div", "pc-relation");
      var control = element(target ? "button" : "span", "pc-relation__node", target ? target.name : (record.name || record.targetId));
      if (target) {
        control.type = "button";
        control.addEventListener("click", function () { openProductDetail(target.id, false, true); });
      }
      relation.appendChild(control);
      relation.appendChild(element("span", "pc-relation__type", record.type || "关联对象"));
      if (record.description) relation.appendChild(element("p", "pc-source__supports", record.description));
      var source = state.data.sources.find(function (entry) { return entry.id === record.sourceId; });
      if (source) {
        var evidenceLink = element("button", "pc-source__evidence", "关系依据：" + source.title);
        evidenceLink.type = "button";
        evidenceLink.addEventListener("click", function () { openLocalEvidence(item, source); });
        relation.appendChild(evidenceLink);
      }
      list.appendChild(relation);
    });
    return list;
  }

  function renderSources(item) {
    var list = element("div", "pc-source-list");
    item.sourceIds.forEach(function (sourceId) {
      var source = state.data.sources.find(function (record) { return record.id === sourceId; });
      if (!source) return;
      var evidence = state.data.evidence.find(function (record) { return record.productId === item.id && record.sourceId === source.id; });
      var card = element("article", "pc-source");
      var copy = element("div", "pc-source__copy");
      var actions = element("div", "pc-source__actions");
      copy.appendChild(element("h4", "pc-source__title", source.title));
      copy.appendChild(element("p", "pc-source__meta", source.publisher + " · " + (sourceTypeLabels[source.sourceType] || source.sourceType) + " · " + source.date));
      copy.appendChild(element("p", "pc-source__supports", "支撑内容：" + source.supports));
      if (source.url) {
        var link = element("a", "pc-source__link", "打开原始来源 ↗");
        link.href = source.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        actions.appendChild(link);
      } else {
        actions.appendChild(element("span", "pc-source__local", "本地研究资料"));
      }
      if (evidence || source.summary) {
        var evidenceButton = element("button", "pc-source__evidence", "查看本地证据");
        evidenceButton.type = "button";
        evidenceButton.addEventListener("click", function () {
          openLocalEvidence(item, source, evidence);
        });
        actions.appendChild(evidenceButton);
      }
      card.appendChild(copy);
      card.appendChild(actions);
      list.appendChild(card);
    });
    return list;
  }

  function openLocalEvidence(item, source, evidence) {
    if (!state.drawerBackdrop) return;
    var drawer = state.drawerBackdrop.querySelector(".pc-drawer");
    var original = drawer.querySelector(".pc-detail");
    if (!original) return;
    var savedScroll = drawer.scrollTop;
    var trigger = document.activeElement;
    var view = element("div", "pc-detail pc-local-evidence");
    var back = element("button", "button button--secondary", "返回 " + item.name + " 档案");
    back.type = "button";
    function restore() {
      view.replaceWith(original);
      state.evidenceBack = null;
      drawer.scrollTop = savedScroll;
      if (trigger && trigger.isConnected) trigger.focus({ preventScroll: true });
    }
    back.addEventListener("click", restore);
    state.evidenceBack = restore;
    view.appendChild(back);
    view.appendChild(element("h2", "pc-detail__name", source.title));
    view.appendChild(element("p", "pc-source__meta", source.publisher + " · " + source.date + " · 本地资料摘要"));
    view.appendChild(renderSection("来源摘要", element("p", "pc-detail__summary", source.summary || (evidence && evidence.summary) || source.supports)));
    view.appendChild(renderSection("支持的信息", element("p", "pc-detail__summary", source.supports || (evidence && evidence.supports))));
    view.appendChild(renderSection("结论边界", element("p", "pc-detail__summary", source.scopeNote || "本地摘要仅支持所列事实。企业第一方披露不等同于独立测试结果，未公开的实现、性能和采用关系不据此推定。")));
    view.appendChild(element("p", "pc-source__meta", "资料核验日期：" + (source.checkedAt || item.checkedAt || "2026-09-20")));
    if (source.url) {
      var link = element("a", "pc-source__link", "打开原始来源（需联网） ↗");
      link.href = source.url; link.target = "_blank"; link.rel = "noopener noreferrer";
      view.appendChild(link);
    }
    original.replaceWith(view);
    drawer.scrollTop = 0;
    back.focus({ preventScroll: true });
  }

  function renderTimeline(item) {
    var list = element("div", "pc-timeline");
    (item.timeline || []).forEach(function (entry) {
      var row = element("article", "pc-timeline__item");
      row.appendChild(element("strong", "", entry.date + " · " + entry.title));
      if (entry.summary) row.appendChild(element("p", "", entry.summary));
      var source = state.data.sources.find(function (record) { return record.id === entry.sourceId; });
      if (source) {
        var button = element("button", "pc-source__evidence", "查看事件依据");
        button.type = "button";
        button.addEventListener("click", function () { openLocalEvidence(item, source); });
        row.appendChild(button);
      }
      list.appendChild(row);
    });
    return list;
  }

  function graphTarget(item) {
    var graph = window.FULL_STACK_GRAPH_DATA;
    if (!graph) return null;
    var aliases = { "ghost-x": ["ghost", "ghost-2023-09"], "anvil-m": ["anvil", "anvil-2023-10"], "roadrunner-m": ["roadrunner", "roadrunner-2023-12"] };
    if (aliases[item.id]) return { objectId: aliases[item.id][0], eventId: aliases[item.id][1] };
    return graph.objects.some(function (record) { return record.id === item.id; }) ? { objectId: item.id } : null;
  }

  function renderDetailHero(item) {
    var hero = element("section", "pc-detail__hero");
    var copy = element("div", "pc-detail__hero-copy");
    copy.appendChild(element("p", "pc-detail__eyebrow", item.positioning || "研究对象档案"));
    copy.appendChild(element("h2", "pc-detail__name", item.name));
    copy.appendChild(element("p", "pc-detail__type", item.type));
    if (item.aliases && item.aliases.length) copy.appendChild(element("p", "pc-detail__aliases", item.aliases.join(" / ")));
    copy.appendChild(element("p", "pc-detail__summary", item.summary));
    copy.appendChild(renderFacts(item));
    var actions = element("div", "pc-detail__actions");
    var target = graphTarget(item);
    if (target) {
      var graphButton = element("button", "button button--primary", "查看时间图谱");
      graphButton.type = "button";
      graphButton.addEventListener("click", function () {
        closeProductDetail(false);
        document.dispatchEvent(new CustomEvent("lineage:navigate", { detail: { tab: "graph", objectId: target.objectId, eventId: target.eventId, fromProduct: item.id } }));
      });
      actions.appendChild(graphButton);
    }
    var supportedMonitor = ["lattice", "lattice-c2", "lattice-mesh", "lattice-sdk", "mission-autonomy"].indexOf(item.id) >= 0;
    if (supportedMonitor) {
      var monitor = element("a", "button button--secondary", item.id === "lattice" ? "查看前沿技术动态监测" : "查看所属 Lattice 平台监测");
      var monitorUrl = new URL("./trends.html", window.location.href);
      monitorUrl.search = "tab=monitor&object=lattice&tech=lattice-mesh&fromProduct=" + encodeURIComponent(item.id);
      monitor.href = monitorUrl.href;
      actions.appendChild(monitor);
    }
    if (actions.children.length) copy.appendChild(actions);
    if (!supportedMonitor) copy.appendChild(element("p", "pc-detail__action-note", "本地专项监测当前覆盖 Lattice 平台；此对象仍可查看档案、关系与已收录事件。"));
    hero.appendChild(renderImage(item));
    hero.appendChild(copy);
    return hero;
  }

  function renderDiveDetail(item) {
    var detail = element("div", "pc-detail");
    detail.appendChild(renderDetailHero(item));
    detail.appendChild(renderSection("核心功能", renderFunctions(item)));
    detail.appendChild(renderSection("经来源核验的公开参数", renderParameters(item)));
    detail.appendChild(renderSection("典型应用", renderApplications(item)));
    detail.appendChild(renderSection("关联对象", renderRelations(item)));
    if (item.timeline && item.timeline.length) detail.appendChild(renderSection("公开事件", renderTimeline(item)));
    else if (item.timelineNote) detail.appendChild(renderSection("公开事件", element("p", "pc-detail__summary", item.timelineNote)));
    if (item.scopeNote) detail.appendChild(renderSection("资料边界", element("p", "pc-detail__summary", item.scopeNote)));
    detail.appendChild(renderSection("信息来源与证据", renderSources(item)));
    return detail;
  }

  function renderSimpleDetail(item) {
    var detail = element("div", "pc-detail");
    detail.appendChild(renderDetailHero(item));
    detail.appendChild(renderSection("核心能力", item.functions && item.functions.length ? renderFunctions(item) : renderList(item.capabilities.length ? item.capabilities : ["当前公开资料尚未形成完整能力清单。"])));
    detail.appendChild(renderSection("任务与应用", renderList(item.applications.length ? item.applications : ["当前公开资料尚未形成可核验的典型任务清单。"])));
    detail.appendChild(renderSection("公开技术参数", renderParameters(item)));
    detail.appendChild(renderSection("关联对象", renderRelations(item)));
    if (item.timeline && item.timeline.length) detail.appendChild(renderSection("公开事件", renderTimeline(item)));
    else if (item.timelineNote) detail.appendChild(renderSection("公开事件", element("p", "pc-detail__summary", item.timelineNote)));
    if (item.scopeNote) detail.appendChild(renderSection("资料边界", element("p", "pc-detail__summary", item.scopeNote)));
    detail.appendChild(renderSection("信息来源与证据", renderSources(item)));
    return detail;
  }

  function closeProductDetail(updateUrl) {
    if (!state || !state.drawerBackdrop) return;
    if (state.evidenceBack) state.evidenceBack();
    if (state.currentId) state.detailScrolls[state.currentId] = state.drawerBackdrop.querySelector(".pc-drawer").scrollTop;
    state.drawerBackdrop.remove();
    state.drawerBackdrop = null;
    state.evidenceBack = null;
    document.body.classList.remove("has-drawer");
    document.removeEventListener("keydown", state.drawerKeyHandler);
    if (updateUrl !== false) setProductUrl(null);
    if (updateUrl !== false && state.returnFocus && state.returnFocus.isConnected) state.returnFocus.focus({ preventScroll: true });
  }

  function openProductDetail(productId, skipUrlUpdate, related) {
    var item = state.data.products.find(function (record) { return record.id === productId; });
    if (!item) { setProductUrl(null); return; }
    if (related === true && state.currentId) state.objectHistory.push(state.currentId);
    else state.objectHistory = Array.isArray(related) ? related : [];
    closeProductDetail(false);
    state.currentId = item.id;
    document.dispatchEvent(new CustomEvent("lineage:object", { detail: { id: item.id, name: item.name } }));
    var host = document.getElementById("overlay-host");
    if (!host) return;
    var backdrop = element("div", "pc-drawer-backdrop");
    var drawer = element("aside", "pc-drawer");
    var header = element("header", "pc-drawer__header");
    var heading = element("div");
    var closeButton = element("button", "pc-drawer__close", "×");
    heading.appendChild(element("p", "pc-drawer__kicker", "OBJECT PROFILE"));
    heading.appendChild(element("h2", "pc-drawer__title", "技术产品详情"));
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "关闭技术产品详情");
    closeButton.addEventListener("click", function () { closeProductDetail(true); });
    header.appendChild(heading);
    if (state.objectHistory.length) {
      var previous = element("button", "pc-source__evidence", "返回上一对象");
      previous.type = "button";
      previous.addEventListener("click", function () {
        var history = state.objectHistory.slice();
        var previousId = history.pop();
        openProductDetail(previousId, false, history);
      });
      header.appendChild(previous);
    }
    header.appendChild(closeButton);
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");
    drawer.setAttribute("aria-label", item.name + " 详情");
    drawer.appendChild(header);
    drawer.appendChild(item.applicationGroups && item.functions ? renderDiveDetail(item) : renderSimpleDetail(item));
    backdrop.appendChild(drawer);
    backdrop.addEventListener("click", function (event) { if (event.target === backdrop) closeProductDetail(true); });
    if (!related) state.returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    state.drawerKeyHandler = function (event) {
      if (event.key === "Escape") {
        if (state.evidenceBack) state.evidenceBack(); else closeProductDetail(true);
      }
      if (event.key === "Tab") {
        var controls = Array.from(drawer.querySelectorAll("button:not([disabled]),a[href]"));
        var first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", state.drawerKeyHandler);
    host.replaceChildren(backdrop);
    state.drawerBackdrop = backdrop;
    document.body.classList.add("has-drawer");
    if (!skipUrlUpdate) setProductUrl(item.id);
    closeButton.focus({ preventScroll: true });
    drawer.scrollTop = state.detailScrolls[item.id] || 0;
  }

  function render(containerId, options) {
    destroy();
    options = options || {};
    var mount = document.getElementById(containerId);
    if (!mount) throw new Error("产品目录缺少挂载节点：" + containerId);
    var data = window.PRODUCT_CATALOG_DATA;
    if (!data || !Array.isArray(data.products)) throw new Error("产品目录数据未加载");
    var root = element("div", "pc-root");
    var resultsHost = element("div", "pc-results-host");
    state = {
      root: root,
      mount: mount,
      data: data,
      category: options.category || "all",
      objectType: options.objectType || "all",
      query: options.query || "",
      resultsHost: resultsHost,
      searchNode: null,
      drawerBackdrop: null,
      drawerKeyHandler: null,
      returnFocus: null
    };
    state.detailScrolls = {};
    state.objectHistory = [];
    root.appendChild(renderContext());
    root.appendChild(renderToolbar());
    root.appendChild(resultsHost);
    mount.replaceChildren(root);
    applyFilters();
    if (options.selectedProductId) openProductDetail(options.selectedProductId, true);
  }

  function destroy() {
    if (!state) return;
    closeProductDetail(false);
    if (state.mount) state.mount.replaceChildren();
    state = null;
  }

  window.PlatformModules = window.PlatformModules || {};
  window.PlatformModules.productCatalog = { render: render, destroy: destroy, openDetail: openProductDetail, closeDetail: closeProductDetail };
}());
