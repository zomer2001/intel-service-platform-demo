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
      figure.appendChild(element("div", "pc-detail__no-image", "暂无公开图片"));
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
    var relations = item.id === "dive-ld" ? [
      ["Anduril Industries", "所属企业"],
      ["Lattice", "相关平台"],
      ["Dive-XL", "关联产品"],
      ["海上 / 水下", "所属场景"]
    ] : (item.relatedObjects.length ? item.relatedObjects.map(function (name) { return [name, "关联对象"]; }) : [["暂无已整理关联对象", "待补充"]]);
    relations.forEach(function (relationData) {
      var relation = element("div", "pc-relation");
      relation.appendChild(element("span", "pc-relation__node", relationData[0]));
      relation.appendChild(element("span", "pc-relation__type", relationData[1]));
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
      if (evidence) {
        var evidenceButton = element("button", "pc-source__evidence", "查看证据");
        evidenceButton.type = "button";
        evidenceButton.addEventListener("click", function () {
          closeProductDetail(true);
          if (typeof window.openEvidence === "function") window.openEvidence(evidence.id);
        });
        actions.appendChild(evidenceButton);
      }
      card.appendChild(copy);
      card.appendChild(actions);
      list.appendChild(card);
    });
    return list;
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
    detail.appendChild(renderSection("信息来源与证据", renderSources(item)));
    return detail;
  }

  function renderSimpleDetail(item) {
    var detail = element("div", "pc-detail");
    detail.appendChild(renderDetailHero(item));
    detail.appendChild(renderSection("核心能力", renderList(item.capabilities.length ? item.capabilities : ["当前公开资料尚未形成完整能力清单。"])));
    detail.appendChild(renderSection("任务与应用", renderList(item.applications.length ? item.applications : ["当前公开资料尚未形成可核验的典型任务清单。"])));
    detail.appendChild(renderSection("公开技术参数", renderParameters(item)));
    detail.appendChild(renderSection("关联对象", renderRelations(item)));
    detail.appendChild(renderSection("信息来源与证据", renderSources(item)));
    return detail;
  }

  function closeProductDetail(updateUrl) {
    if (!state || !state.drawerBackdrop) return;
    state.drawerBackdrop.remove();
    state.drawerBackdrop = null;
    document.body.classList.remove("has-drawer");
    document.removeEventListener("keydown", state.drawerKeyHandler);
    if (updateUrl !== false) setProductUrl(null);
    if (state.returnFocus && state.returnFocus.isConnected) state.returnFocus.focus();
  }

  function openProductDetail(productId, skipUrlUpdate) {
    var item = state.data.products.find(function (record) { return record.id === productId; });
    if (!item) { setProductUrl(null); return; }
    closeProductDetail(false);
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
    header.appendChild(closeButton);
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");
    drawer.setAttribute("aria-label", item.name + " 详情");
    drawer.appendChild(header);
    drawer.appendChild(item.id === "dive-ld" ? renderDiveDetail(item) : renderSimpleDetail(item));
    backdrop.appendChild(drawer);
    backdrop.addEventListener("click", function (event) { if (event.target === backdrop) closeProductDetail(true); });
    state.returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    state.drawerKeyHandler = function (event) { if (event.key === "Escape") closeProductDetail(true); };
    document.addEventListener("keydown", state.drawerKeyHandler);
    host.replaceChildren(backdrop);
    state.drawerBackdrop = backdrop;
    document.body.classList.add("has-drawer");
    if (!skipUrlUpdate) setProductUrl(item.id);
    closeButton.focus();
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
  window.PlatformModules.productCatalog = { render: render, destroy: destroy };
}());
