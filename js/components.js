(function () {
  "use strict";

  var activeDrawerClose = null;

  function element(tagName, className, text) {
    var node = document.createElement(tagName);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = String(text);
    return node;
  }

  function createButton(options) {
    var button = element("button", "button button--" + (options.tone || "secondary"), options.label);
    button.type = "button";
    if (typeof options.onClick === "function") button.addEventListener("click", options.onClick);
    return button;
  }

  function createTag(label, tone) {
    var tag = element("span", "tag", label);
    tag.dataset.tone = tone || "neutral";
    return tag;
  }

  function createCard(options) {
    var card = element("article", "card" + (options.className ? " " + options.className : ""));
    if (options.eyebrow) card.appendChild(element("p", "card__eyebrow", options.eyebrow));
    card.appendChild(element(options.headingLevel || "h2", "", options.title));
    if (options.description) card.appendChild(element("p", "card__description", options.description));
    if (options.body instanceof Node) card.appendChild(options.body);
    return card;
  }

  function createMetricCard(metric) {
    var body = element("div");
    body.appendChild(element("p", "metric-card__value", metric.value));
    body.appendChild(createTag(metric.note, "primary"));
    return createCard({ eyebrow: "框架状态", title: metric.label, body: body, className: "metric-card", headingLevel: "h3" });
  }

  function createTable(options) {
    var wrap = element("div", "table-wrap");
    var table = element("table", "data-table");
    var caption = element("caption", "", options.caption || "数据表格");
    var thead = element("thead");
    var headerRow = element("tr");
    var tbody = element("tbody");

    options.columns.forEach(function (column) {
      var th = element("th", "", column.label);
      th.scope = "col";
      headerRow.appendChild(th);
    });

    options.rows.forEach(function (row) {
      var tr = element("tr");
      options.columns.forEach(function (column) {
        tr.appendChild(element("td", "", row[column.key] === undefined ? "—" : row[column.key]));
      });
      tbody.appendChild(tr);
    });

    thead.appendChild(headerRow);
    table.appendChild(caption);
    table.appendChild(thead);
    table.appendChild(tbody);
    wrap.appendChild(table);
    return wrap;
  }

  function createLoadingState() {
    var box = element("section", "state-box");
    box.setAttribute("role", "status");
    box.appendChild(element("div", "loading-spinner"));
    box.appendChild(element("h3", "", "正在加载分析资源"));
    box.appendChild(element("p", "", "系统正在准备工作区，请稍候。"));
    return box;
  }

  function createEmptyState() {
    var box = element("section", "state-box");
    box.appendChild(element("h3", "", "暂无待处理内容"));
    box.appendChild(element("p", "", "任务启动后，相关成果将在这里集中展示。"));
    return box;
  }

  function createTabs(tabs) {
    var section = element("section", "card");
    var viewport = element("div", "tabs-viewport");
    var tablist = element("div", "tabs");
    var panel = element("div", "tab-panel");
    tablist.setAttribute("role", "tablist");
    tablist.setAttribute("aria-label", "公共框架示例分类");

    function selectTab(index, focus) {
      var buttons = Array.from(tablist.querySelectorAll(".tab"));
      buttons.forEach(function (button, buttonIndex) {
        var selected = buttonIndex === index;
        button.setAttribute("aria-selected", selected ? "true" : "false");
        button.tabIndex = selected ? 0 : -1;
      });
      panel.replaceChildren(tabs[index].render());
      if (focus) buttons[index].focus();
    }

    tabs.forEach(function (tab, index) {
      var button = element("button", "tab", tab.label);
      button.type = "button";
      button.setAttribute("role", "tab");
      button.addEventListener("click", function () { selectTab(index, false); });
      button.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        var offset = event.key === "ArrowRight" ? 1 : -1;
        selectTab((index + offset + tabs.length) % tabs.length, true);
      });
      tablist.appendChild(button);
    });

    viewport.appendChild(tablist);
    section.appendChild(viewport);
    section.appendChild(panel);
    selectTab(0, false);
    return section;
  }

  function createDefinitionList(entries) {
    var list = element("dl");
    entries.forEach(function (entry) {
      var row = element("div");
      row.appendChild(element("dt", "", entry.label));
      row.appendChild(element("dd", "", entry.value));
      list.appendChild(row);
    });
    return list;
  }

  function openDrawer(options) {
    if (activeDrawerClose) activeDrawerClose();
    var host = document.getElementById("overlay-host");
    if (!host) return function () {};

    var returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    var backdrop = element("div", "drawer-backdrop");
    var drawer = element("aside", "drawer");
    var header = element("header", "drawer__header");
    var heading = element("div");
    var closeButton = element("button", "drawer__close", "×");
    var body = element("div", "drawer__body");

    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");
    drawer.setAttribute("aria-label", options.title);
    heading.appendChild(element("p", "drawer__kicker", options.kicker));
    heading.appendChild(element("h2", "", options.title));
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "关闭");
    header.appendChild(heading);
    header.appendChild(closeButton);
    drawer.appendChild(header);
    drawer.appendChild(body);
    backdrop.appendChild(drawer);

    options.sections.forEach(function (section) {
      var block = element("section", "drawer__section");
      if (section.title) block.appendChild(element("h3", "", section.title));
      if (section.content instanceof Node) block.appendChild(section.content);
      body.appendChild(block);
    });

    function close() {
      if (!backdrop.isConnected) return;
      backdrop.remove();
      document.body.classList.remove("has-drawer");
      document.removeEventListener("keydown", handleKeydown);
      activeDrawerClose = null;
      if (returnFocus && returnFocus.isConnected) returnFocus.focus();
    }

    function handleKeydown(event) {
      if (event.key === "Escape") close();
    }

    closeButton.addEventListener("click", close);
    backdrop.addEventListener("click", function (event) {
      if (event.target === backdrop) close();
    });
    document.addEventListener("keydown", handleKeydown);
    host.replaceChildren(backdrop);
    document.body.classList.add("has-drawer");
    activeDrawerClose = close;
    closeButton.focus();
    return close;
  }

  window.PlatformComponents = {
    element: element,
    createButton: createButton,
    createTag: createTag,
    createCard: createCard,
    createMetricCard: createMetricCard,
    createTable: createTable,
    createTabs: createTabs,
    createLoadingState: createLoadingState,
    createEmptyState: createEmptyState,
    createDefinitionList: createDefinitionList,
    openDrawer: openDrawer
  };
}());
