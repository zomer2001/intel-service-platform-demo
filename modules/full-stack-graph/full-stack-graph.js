(function () {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";
  var GRAPH_WIDTH = 1540;
  var GRAPH_HEIGHT = 842;
  var BODY_TOP = 84;
  var START_X = 110;
  var YEAR_WIDTH = 152;
  var layerGeometry = {
    platform: { y: 84, height: 72 },
    interface: { y: 156, height: 72 },
    autonomy: { y: 228, height: 96 },
    mesh: { y: 324, height: 82 },
    systems: { y: 406, height: 360 },
    external: { y: 766, height: 76 }
  };
  var rowY = {
    lattice: 121,
    "lattice-sdk": 192,
    "lattice-c2": 256,
    "mission-autonomy": 299,
    "lattice-mesh": 365,
    ghost: 430,
    altius: 460,
    bolt: 490,
    anvil: 528,
    "altius-m": 557,
    roadrunner: 586,
    "bolt-m": 615,
    barracuda: 644,
    fury: 700,
    omen: 737
  };
  var state = null;

  function element(tagName, className, text) {
    var node = document.createElement(tagName);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = String(text);
    return node;
  }

  function svgElement(tagName, attributes, text) {
    var node = document.createElementNS(SVG_NS, tagName);
    Object.keys(attributes || {}).forEach(function (name) {
      node.setAttribute(name, attributes[name]);
    });
    if (text !== undefined) node.textContent = String(text);
    return node;
  }

  function eventCount(data) {
    return data.objects.reduce(function (count, item) { return count + item.events.length; }, 0);
  }

  function validateData(data) {
    if (!data || !Array.isArray(data.objects) || !Array.isArray(data.relations)) {
      throw new Error("可视化技术/事件图谱数据未加载");
    }
    if (data.objects.length !== 15 || eventCount(data) !== 51) {
      throw new Error("可视化技术/事件图谱数据计数异常：应为 15 个对象、51 个里程碑");
    }
    var ids = {};
    var featured = 0;
    data.objects.forEach(function (item) {
      item.events.forEach(function (event) {
        if (ids[event.id]) throw new Error("里程碑 ID 重复：" + event.id);
        ids[event.id] = true;
        if (event.featured) featured += 1;
      });
    });
    data.relations.forEach(function (relation) {
      if (!ids[relation.from] || !ids[relation.to]) throw new Error("关系线端点不存在：" + relation.label);
    });
    if (featured !== 3 || !ids["lattice-c2-2024-06"] || !ids["lattice-mesh-2024-12"] || !ids["lattice-mesh-2025-05"]) {
      throw new Error("重点互动节点配置异常");
    }
  }

  function parseDate(date) {
    var parts = String(date).split(".");
    return { year: Number(parts[0]), month: parts[1] ? Number(parts[1]) : 1 };
  }

  function dateX(date) {
    var parsed = parseDate(date);
    return START_X + (parsed.year - 2018 + (parsed.month - 1) / 12) * YEAR_WIDTH;
  }

  function stageX(year) {
    return START_X + (year - 2018) * YEAR_WIDTH;
  }

  function buildEventPositions(data) {
    var positions = {};
    data.objects.forEach(function (item) {
      var duplicateTotals = {};
      var duplicateSeen = {};
      item.events.forEach(function (event) {
        duplicateTotals[event.date] = (duplicateTotals[event.date] || 0) + 1;
      });
      item.events.forEach(function (event, eventIndex) {
        var duplicateIndex = duplicateSeen[event.date] || 0;
        var duplicateCount = duplicateTotals[event.date];
        duplicateSeen[event.date] = duplicateIndex + 1;
        positions[event.id] = {
          id: event.id,
          x: dateX(event.date) + (duplicateIndex - (duplicateCount - 1) / 2) * 18,
          y: rowY[item.id],
          event: event,
          object: item,
          eventIndex: eventIndex,
          duplicateIndex: duplicateIndex,
          duplicateCount: duplicateCount
        };
      });
    });
    return positions;
  }

  function renderContext(data) {
    var context = element("section", "fsg-context");
    [
      ["当前专题", data.context.topic],
      ["时间范围", data.context.timeRange],
      ["图谱类型", data.context.graphType]
    ].forEach(function (item) {
      var block = element("div", "fsg-context__item");
      block.appendChild(element("span", "fsg-context__label", item[0]));
      block.appendChild(element("strong", "fsg-context__value", item[1]));
      context.appendChild(block);
    });
    var metrics = element("div", "fsg-context__metrics");
    metrics.appendChild(element("span", "fsg-count", "15 个对象"));
    metrics.appendChild(element("span", "fsg-count", "51 个里程碑"));
    context.appendChild(metrics);
    return context;
  }

  function renderLegend() {
    var legend = element("section", "fsg-legend");
    legend.setAttribute("aria-label", "图例");
    [
      ["fsg-legend__sample fsg-legend__sample--object", "核心对象"],
      ["fsg-legend__sample fsg-legend__sample--event", "可点击里程碑节点"],
      ["fsg-legend__sample fsg-legend__sample--evolution", "演化 / 派生（明确依据）"],
      ["fsg-legend__sample fsg-legend__sample--association", "接入 / 调度 / 协同 / 软件支撑（非继承）"]
    ].forEach(function (item) {
      var legendItem = element("span", "fsg-legend__item");
      legendItem.appendChild(element("i", item[0]));
      legendItem.appendChild(element("span", "", item[1]));
      legend.appendChild(legendItem);
    });
    return legend;
  }

  function objectNames(data, ids) {
    return ids.map(function (id) {
      var item = data.objects.find(function (record) { return record.id === id; });
      return item ? item.name : id;
    });
  }

  function renderLayerRail(data) {
    var rail = element("aside", "fsg-layer-rail");
    rail.setAttribute("aria-label", "能力层级");
    var corner = element("div", "fsg-layer-rail__corner");
    corner.appendChild(element("span", "fsg-layer-rail__corner-label", "能力层级"));
    corner.appendChild(element("strong", "", "公开资料逻辑重组"));
    rail.appendChild(corner);

    data.layers.forEach(function (layer) {
      var geometry = layerGeometry[layer.id];
      var block = element("section", "fsg-layer fsg-layer--" + layer.id);
      var heading = element("div", "fsg-layer__heading");
      heading.appendChild(element("span", "fsg-layer__index", layer.index));
      heading.appendChild(element("strong", "fsg-layer__title", layer.label));
      block.style.height = geometry.height + "px";
      block.appendChild(heading);
      block.appendChild(element("span", "fsg-layer__english", layer.english));
      if (layer.sublanes) {
        layer.sublanes.forEach(function (sublane) {
          var group = element("div", "fsg-layer__sublane fsg-layer__sublane--" + sublane.id);
          group.appendChild(element("span", "fsg-layer__sublane-label", sublane.label));
          group.appendChild(element("span", "fsg-layer__objects", objectNames(data, sublane.objects).join(" · ")));
          block.appendChild(group);
        });
      } else if (layer.id === "external") {
        block.appendChild(element("span", "fsg-layer__objects", "静态承载 / 设备 / 外部系统"));
      } else {
        block.appendChild(element("span", "fsg-layer__objects", objectNames(data, layer.objects).join(" · ")));
      }
      rail.appendChild(block);
    });
    return rail;
  }

  function addDefinitions(svg) {
    var defs = svgElement("defs");
    var evolutionArrow = svgElement("marker", {
      id: "fsg-arrow-evolution", markerWidth: "8", markerHeight: "8", refX: "7", refY: "4", orient: "auto", markerUnits: "strokeWidth"
    });
    evolutionArrow.appendChild(svgElement("path", { d: "M0,0 L8,4 L0,8 Z", fill: "#1f2937" }));
    var associationArrow = svgElement("marker", {
      id: "fsg-arrow-association", markerWidth: "8", markerHeight: "8", refX: "7", refY: "4", orient: "auto", markerUnits: "strokeWidth"
    });
    associationArrow.appendChild(svgElement("path", { d: "M0,0 L8,4 L0,8 Z", fill: "#7c8ca4" }));
    defs.appendChild(evolutionArrow);
    defs.appendChild(associationArrow);
    svg.appendChild(defs);
  }

  function renderTimeline(svg, data) {
    data.stages.forEach(function (stage, index) {
      var x = stageX(stage.start);
      var width = stageX(stage.end) - x;
      svg.appendChild(svgElement("rect", {
        x: x, y: 0, width: width, height: 38,
        class: "fsg-svg-stage fsg-svg-stage--" + (index % 2 ? "even" : "odd")
      }));
      svg.appendChild(svgElement("text", { x: x + 16, y: 24, class: "fsg-svg-stage-label" }, stage.label));
    });

    for (var year = 2018; year <= 2026; year += 1) {
      var yearPosition = stageX(year);
      svg.appendChild(svgElement("line", { x1: yearPosition, y1: 38, x2: yearPosition, y2: GRAPH_HEIGHT, class: "fsg-svg-year-line" }));
      svg.appendChild(svgElement("text", { x: yearPosition + 10, y: 67, class: "fsg-svg-year" }, year));
    }
    svg.appendChild(svgElement("line", { x1: stageX(2027), y1: 38, x2: stageX(2027), y2: GRAPH_HEIGHT, class: "fsg-svg-year-line" }));
    svg.appendChild(svgElement("line", { x1: 0, y1: BODY_TOP, x2: GRAPH_WIDTH, y2: BODY_TOP, class: "fsg-svg-header-rule" }));
  }

  function renderLayerBands(svg) {
    Object.keys(layerGeometry).forEach(function (layerId, index) {
      var geometry = layerGeometry[layerId];
      svg.appendChild(svgElement("rect", {
        x: 0, y: geometry.y, width: GRAPH_WIDTH, height: geometry.height,
        class: "fsg-svg-layer fsg-svg-layer--" + (index % 2 ? "even" : "odd")
      }));
      svg.appendChild(svgElement("line", {
        x1: 0, y1: geometry.y + geometry.height, x2: GRAPH_WIDTH, y2: geometry.y + geometry.height,
        class: "fsg-svg-layer-rule"
      }));
    });
    [496, 651].forEach(function (y) {
      svg.appendChild(svgElement("line", { x1: 0, y1: y, x2: GRAPH_WIDTH, y2: y, class: "fsg-svg-sublane-rule" }));
    });
  }

  function renderRelations(svg, data, positions) {
    data.relations.forEach(function (relation) {
      var from = positions[relation.from];
      var to = positions[relation.to];
      var path;
      if (relation.type === "evolution") {
        path = "M" + from.x + "," + from.y + " C" + (from.x + 36) + "," + from.y + " " + (to.x - 36) + "," + to.y + " " + to.x + "," + to.y;
      } else {
        var bend = Math.max(80, Math.abs(to.y - from.y) * 0.34);
        path = "M" + from.x + "," + from.y + " C" + (from.x + bend) + "," + from.y + " " + (to.x + bend) + "," + to.y + " " + to.x + "," + to.y;
      }
      var relationPath = svgElement("path", {
        d: path,
        class: "fsg-relation fsg-relation--" + relation.type,
        "marker-end": relation.type === "evolution" ? "url(#fsg-arrow-evolution)" : "url(#fsg-arrow-association)"
      });
      relationPath.appendChild(svgElement("title", {}, relation.label));
      svg.appendChild(relationPath);
    });
  }

  function renderLifeLines(svg, data, positions) {
    data.objects.forEach(function (item) {
      var itemPositions = item.events.map(function (event) { return positions[event.id]; });
      if (itemPositions.length > 1) {
        svg.appendChild(svgElement("line", {
          x1: Math.min.apply(null, itemPositions.map(function (position) { return position.x; })),
          y1: rowY[item.id],
          x2: Math.max.apply(null, itemPositions.map(function (position) { return position.x; })),
          y2: rowY[item.id],
          class: "fsg-lifeline"
        }));
      }
    });
  }

  function renderObjectNodes(svg, data, positions) {
    data.objects.forEach(function (item) {
      var firstPosition = item.events.map(function (event) { return positions[event.id]; }).reduce(function (first, position) {
        return !first || position.x < first.x ? position : first;
      }, null);
      var nodeWidth = Math.max(64, Math.min(132, item.name.length * 7 + 28));
      var nodeHeight = 20;
      var nodeRight = firstPosition.x - 16;
      var nodeX = nodeRight - nodeWidth;
      var nodeY = rowY[item.id] - nodeHeight / 2;
      var group = svgElement("g", { class: "fsg-object-node", "data-object-id": item.id });
      svg.appendChild(svgElement("line", {
        x1: nodeRight,
        y1: rowY[item.id],
        x2: firstPosition.x - 6,
        y2: rowY[item.id],
        class: "fsg-object-connector"
      }));
      group.appendChild(svgElement("title", {}, "核心对象｜" + item.name));
      group.appendChild(svgElement("rect", {
        x: nodeX,
        y: nodeY,
        width: nodeWidth,
        height: nodeHeight,
        rx: 3,
        class: "fsg-object-node__rect"
      }));
      group.appendChild(svgElement("text", {
        x: nodeX + nodeWidth / 2,
        y: rowY[item.id] + 3.5,
        class: "fsg-object-node__text",
        "text-anchor": "middle"
      }, item.name));
      svg.appendChild(group);
    });
  }

  function renderEvent(svg, position) {
    var event = position.event;
    var group = svgElement("g", { class: "fsg-event" });
    group.setAttribute("data-event-id", event.id);
    group.setAttribute("data-has-detail", event.featured ? "true" : "false");
    group.setAttribute("role", "button");
    group.setAttribute("tabindex", "0");
    group.setAttribute("focusable", "true");
    group.setAttribute("aria-pressed", "false");
    group.setAttribute("aria-label", event.date + "，" + event.title + "，打开事件详情");
    group.appendChild(svgElement("title", {}, event.date + "｜" + event.title));
    group.appendChild(svgElement("circle", { cx: position.x, cy: position.y, r: 15, class: "fsg-event__hit" }));
    group.appendChild(svgElement("circle", {
      cx: position.x, cy: position.y, r: 6, class: "fsg-event__node"
    }));
    if (position.duplicateIndex === 0) {
      var labelY = position.eventIndex % 2 ? position.y + 17 : position.y - 11;
      group.appendChild(svgElement("text", {
        x: position.x, y: labelY, class: "fsg-event__date", "text-anchor": "middle"
      }, event.date));
    }
    group.addEventListener("click", function () { openDrawer(position, group); });
    group.addEventListener("keydown", function (keyboardEvent) {
      if (keyboardEvent.key !== "Enter" && keyboardEvent.key !== " ") return;
      keyboardEvent.preventDefault();
      openDrawer(position, group);
    });
    svg.appendChild(group);
  }

  function renderExternalStrip(svg, data) {
    var y = layerGeometry.external.y + 19;
    var x = 52;
    data.externalSystems.forEach(function (label) {
      var width = Math.max(104, label.length * 15 + 34);
      var group = svgElement("g", { class: "fsg-external-item" });
      group.appendChild(svgElement("rect", { x: x, y: y, width: width, height: 38, rx: 4 }));
      group.appendChild(svgElement("circle", { cx: x + 15, cy: y + 19, r: 3 }));
      group.appendChild(svgElement("text", { x: x + 27, y: y + 24 }, label));
      svg.appendChild(group);
      x += width + 12;
    });
  }

  function renderSvg(data) {
    var svg = svgElement("svg", {
      class: "fsg-svg",
      viewBox: "0 0 " + GRAPH_WIDTH + " " + GRAPH_HEIGHT,
      width: GRAPH_WIDTH,
      height: GRAPH_HEIGHT,
      role: "group",
      "aria-label": "Anduril Industries 2018 至 2026 可视化技术/事件图谱"
    });
    var positions = buildEventPositions(data);
    addDefinitions(svg);
    renderLayerBands(svg);
    renderTimeline(svg, data);
    renderRelations(svg, data, positions);
    renderLifeLines(svg, data, positions);
    renderObjectNodes(svg, data, positions);
    data.objects.forEach(function (item) {
      item.events.forEach(function (event) { renderEvent(svg, positions[event.id]); });
    });
    renderExternalStrip(svg, data);
    return svg;
  }

  function detailRow(label, value) {
    var row = element("div", "fsg-drawer__fact");
    row.appendChild(element("dt", "", label));
    row.appendChild(element("dd", "", value));
    return row;
  }

  function openDrawer(position, trigger) {
    if (!state) return;
    closeDrawer(false);
    var event = position.event;
    var source = event.source;
    var host = document.getElementById("overlay-host");
    if (!host) return;
    var backdrop = element("div", "fsg-drawer-backdrop");
    var drawer = element("aside", "fsg-drawer");
    var header = element("header", "fsg-drawer__header");
    var heading = element("div");
    var closeButton = element("button", "fsg-drawer__close", "×");
    var body = element("div", "fsg-drawer__body");
    var facts = element("dl", "fsg-drawer__facts");

    heading.appendChild(element("p", "fsg-drawer__kicker", "TIMELINE MILESTONE"));
    heading.appendChild(element("h2", "fsg-drawer__title", event.title));
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "关闭事件详情");
    closeButton.addEventListener("click", function () { closeDrawer(true); });
    header.appendChild(heading);
    header.appendChild(closeButton);

    facts.appendChild(detailRow("日期", event.date));
    facts.appendChild(detailRow("关联对象", position.object.name));
    facts.appendChild(detailRow(event.featured ? "事件类型" : "详情状态", event.featured ? event.eventType : "待补充"));
    body.appendChild(facts);
    if (event.featured) {
      var summary = element("section", "fsg-drawer__section");
      var sourceSection = element("section", "fsg-drawer__section fsg-drawer__section--source");
      var sourceLink = element("a", "fsg-drawer__source-link", "打开原始来源 ↗");
      summary.appendChild(element("h3", "", "事件摘要"));
      summary.appendChild(element("p", "", event.summary));
      if (Array.isArray(event.highlights) && event.highlights.length) {
        var highlights = element("section", "fsg-drawer__section");
        var highlightList = element("ul", "fsg-drawer__highlights");
        highlights.appendChild(element("h3", "", "关键信息"));
        event.highlights.forEach(function (item) {
          highlightList.appendChild(element("li", "", item));
        });
        highlights.appendChild(highlightList);
        body.appendChild(summary);
        body.appendChild(highlights);
      } else {
        body.appendChild(summary);
      }
      if (event.assessment) {
        var assessment = element("section", "fsg-drawer__section");
        assessment.appendChild(element("h3", "", "研判说明"));
        assessment.appendChild(element("p", "", event.assessment));
        body.appendChild(assessment);
      }
      sourceSection.appendChild(element("h3", "", "真实来源"));
      sourceSection.appendChild(element("p", "fsg-drawer__source-title", source.title));
      var sourceMeta = element("dl", "fsg-drawer__source-meta");
      sourceMeta.appendChild(detailRow("发布主体", source.publisher));
      sourceMeta.appendChild(detailRow("来源类型", source.type));
      sourceMeta.appendChild(detailRow("发布日期", source.publishedAt));
      sourceLink.href = source.url;
      sourceLink.target = "_blank";
      sourceLink.rel = "noopener noreferrer";
      sourceSection.appendChild(sourceMeta);
      sourceSection.appendChild(sourceLink);
      body.appendChild(sourceSection);
    } else {
      var empty = element("section", "fsg-drawer__empty");
      empty.appendChild(element("strong", "", "详细内容尚未接入"));
      empty.appendChild(element("p", "", "该里程碑已纳入可视化技术/事件图谱，详细证据与来源将在后续数据整理阶段补充。"));
      body.appendChild(empty);
    }
    drawer.appendChild(header);
    drawer.appendChild(body);
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");
    drawer.setAttribute("aria-label", event.title + "详情");
    backdrop.appendChild(drawer);
    backdrop.addEventListener("click", function (mouseEvent) {
      if (mouseEvent.target === backdrop) closeDrawer(true);
    });

    state.scrollLeft = state.scroller.scrollLeft;
    state.returnFocus = trigger;
    state.selectedNode = trigger;
    state.selectedNode.setAttribute("aria-pressed", "true");
    state.selectedNode.classList.add("is-selected");
    state.drawerKeyHandler = function (keyboardEvent) {
      if (keyboardEvent.key === "Escape") {
        closeDrawer(true);
        return;
      }
      if (keyboardEvent.key !== "Tab") return;
      var focusable = drawer.querySelectorAll("button:not([disabled]), a[href]");
      if (!focusable.length) return;
      var firstFocusable = focusable[0];
      var lastFocusable = focusable[focusable.length - 1];
      if (keyboardEvent.shiftKey && (document.activeElement === firstFocusable || !drawer.contains(document.activeElement))) {
        keyboardEvent.preventDefault();
        lastFocusable.focus();
      } else if (!keyboardEvent.shiftKey && (document.activeElement === lastFocusable || !drawer.contains(document.activeElement))) {
        keyboardEvent.preventDefault();
        firstFocusable.focus();
      }
    };
    document.addEventListener("keydown", state.drawerKeyHandler);
    host.replaceChildren(backdrop);
    state.backdrop = backdrop;
    document.body.classList.add("has-fsg-drawer");
    closeButton.focus();
  }

  function closeDrawer(restoreFocus) {
    if (!state || !state.backdrop) return;
    if (state.drawerKeyHandler) document.removeEventListener("keydown", state.drawerKeyHandler);
    if (state.backdrop && state.backdrop.parentNode) state.backdrop.remove();
    if (state.selectedNode) {
      state.selectedNode.setAttribute("aria-pressed", "false");
      state.selectedNode.classList.remove("is-selected");
    }
    document.body.classList.remove("has-fsg-drawer");
    var focusTarget = state.returnFocus;
    var savedScrollLeft = state.scrollLeft;
    state.backdrop = null;
    state.drawerKeyHandler = null;
    state.selectedNode = null;
    state.returnFocus = null;
    window.requestAnimationFrame(function () {
      if (!state) return;
      state.scroller.scrollLeft = savedScrollLeft;
      if (restoreFocus && focusTarget && focusTarget.isConnected) focusTarget.focus();
    });
  }

  function render(containerId) {
    destroy();
    var mount = document.getElementById(containerId);
    if (!mount) throw new Error("可视化技术/事件图谱缺少挂载节点：" + containerId);
    var data = window.FULL_STACK_GRAPH_DATA;
    validateData(data);
    var root = element("div", "fsg-root");
    var graphFrame = element("section", "fsg-frame");
    var graphGrid = element("div", "fsg-graph-grid");
    var scroller = element("div", "fsg-scroll");
    var note = element("p", "fsg-method-note", "说明：分层为基于公开资料的能力逻辑重组，不代表官方内部部署架构或逐层调用顺序。C2 与 Mission Autonomy 为并列核心能力；SDK / API 负责进入语义体系，Mesh 负责跨节点到达。全部里程碑均可点击查看节点状态。");
    scroller.tabIndex = 0;
    scroller.setAttribute("aria-label", "可横向滚动的技术演化时间轴");
    scroller.appendChild(renderSvg(data));
    graphGrid.appendChild(renderLayerRail(data));
    graphGrid.appendChild(scroller);
    graphFrame.appendChild(graphGrid);
    graphFrame.appendChild(note);
    root.appendChild(renderContext(data));
    root.appendChild(renderLegend());
    root.appendChild(graphFrame);
    mount.replaceChildren(root);
    state = {
      mount: mount,
      scroller: scroller,
      backdrop: null,
      drawerKeyHandler: null,
      selectedNode: null,
      returnFocus: null,
      scrollLeft: 0
    };
  }

  function destroy() {
    if (!state) return;
    closeDrawer(false);
    if (state.mount) state.mount.replaceChildren();
    state = null;
  }

  window.PlatformModules = window.PlatformModules || {};
  window.PlatformModules.fullStackGraph = {
    render: render,
    destroy: destroy,
    closeDrawer: closeDrawer,
    getCounts: function () {
      var data = window.FULL_STACK_GRAPH_DATA;
      return { objects: data.objects.length, milestones: eventCount(data) };
    }
  };
}());
