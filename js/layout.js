(function () {
  "use strict";

  var layoutScript = document.currentScript;
  var rootUrl = inferRootUrl();

  function inferRootUrl() {
    if (layoutScript && layoutScript.src) return new URL("../", layoutScript.src).href;
    var current = new URL(window.location.href);
    var pagesAt = current.pathname.lastIndexOf("/pages/");
    if (pagesAt >= 0) {
      current.pathname = current.pathname.slice(0, pagesAt + 1);
      current.search = "";
      current.hash = "";
      return current.href;
    }
    return new URL("./", current).href;
  }

  function resolveHref(path) {
    return new URL(path, rootUrl).href;
  }

  var portalViews = {
    "综合工作台": "overview",
    "项目 / 专题": "projects",
    "任务中心": "tasks",
    "知识检索": "search",
    "成果中心": "results"
  };

  var navigationGroups = [
    { label: "工作区", items: ["综合工作台", "项目 / 专题", "任务中心"] },
    { label: "业务应用", items: ["产品技术谱系构建", "技术发展态势研判", "技术辅助还原与破解"] },
    { label: "支撑", items: ["知识检索", "成果中心"] }
  ];

  function element(tagName, className, text) {
    var node = document.createElement(tagName);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = String(text);
    return node;
  }

  function createBrand(assetPath) {
    var brand = element("div", "brand");
    brand.setAttribute("aria-label", "春天研究院 情报服务平台");

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "brand__mark");
    svg.setAttribute("viewBox", "0 0 88 88");
    svg.setAttribute("aria-hidden", "true");

    var image = document.createElementNS("http://www.w3.org/2000/svg", "image");
    image.setAttribute("href", assetPath);
    image.setAttribute("x", "-166");
    image.setAttribute("y", "-8");
    image.setAttribute("width", "265");
    image.setAttribute("height", "152");
    svg.appendChild(image);

    var text = element("div", "brand__text");
    text.appendChild(element("p", "brand__name", "春天研究院"));
    text.appendChild(element("p", "brand__product", "情报服务平台"));
    brand.appendChild(svg);
    brand.appendChild(text);
    return brand;
  }

  function createNavigation(activeLabel, onSelect) {
    var nav = element("nav", "navigation");
    nav.setAttribute("aria-label", "应用导航");

    navigationGroups.forEach(function (group) {
      var section = element("section", "navigation__group");
      section.appendChild(element("h2", "navigation__title", group.label));
      var list = element("ul", "navigation__list");

      group.items.forEach(function (label) {
        var item = element("li");
        var button = element("button", "navigation__item", label);
        button.type = "button";
        if (label === activeLabel) button.setAttribute("aria-current", "page");
        button.addEventListener("click", function () {
          nav.querySelectorAll("[aria-current='page']").forEach(function (current) {
            current.removeAttribute("aria-current");
          });
          button.setAttribute("aria-current", "page");
          if (typeof onSelect === "function") onSelect(label);
        });
        item.appendChild(button);
        list.appendChild(item);
      });

      section.appendChild(list);
      nav.appendChild(section);
    });

    return nav;
  }

  function renderPlatform(options) {
    options = options || {};
    var root = document.getElementById(options.rootId || "app");
    if (!root) throw new Error("缺少页面挂载节点");

    var shell = element("div", "app-shell");
    var sidebar = element("aside", "sidebar");
    var body = element("div", "shell-body");
    var topbar = element("header", "topbar");
    var workspace = element("main", "workspace");
    var overlayHost = element("div", "overlay-host");
    overlayHost.id = "overlay-host";

    var project = element("p", "topbar__project", options.projectTitle || "情报分析工作台");
    var level = element("p", "topbar__level", options.analysisLevel || "企业级分析");
    var object = element("p", "topbar__object", "当前对象：" + (options.currentObject || "公共框架预览"));
    var status = element("p", "topbar__status", "任务状态：" + (options.taskStatus || "框架就绪"));

    topbar.appendChild(project);
    topbar.appendChild(level);
    topbar.appendChild(object);
    topbar.appendChild(status);

    sidebar.appendChild(createBrand(options.logoPath || resolveHref("assets/brand/vernal-institute-logo.png")));
    sidebar.appendChild(createNavigation(options.activeNavigation || "综合工作台", function (label) {
      if (portalViews[label]) {
        window.location.href = resolveHref("pages/portal/portal.html?view=" + portalViews[label]);
        return;
      }
      if (label === "产品技术谱系构建") {
        window.location.href = options.lineageHref || resolveHref("pages/applications/lineage.html");
        return;
      }
      if (label === "技术发展态势研判") {
        window.location.href = options.trendsHref || inferApplicationHref("trends.html");
        return;
      }
      if (label === "技术辅助还原与破解") {
        window.location.href = options.restorationHref || inferApplicationHref("restoration.html");
        return;
      }
    }));

    body.appendChild(topbar);
    body.appendChild(workspace);
    shell.appendChild(sidebar);
    shell.appendChild(body);
    shell.appendChild(overlayHost);
    root.replaceChildren(shell);

    return { shell: shell, workspace: workspace, overlayHost: overlayHost };
  }

  function inferApplicationHref(filename) {
    return resolveHref("pages/applications/" + filename);
  }

  window.PlatformLayout = { navigationGroups: navigationGroups, renderPlatform: renderPlatform, resolveHref: resolveHref };
  window.renderPlatform = renderPlatform;
}());
