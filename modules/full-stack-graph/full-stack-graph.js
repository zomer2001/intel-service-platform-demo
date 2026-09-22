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
    var ids = {};
    data.objects.forEach(function (item) {
      item.events.forEach(function (event) {
        if (ids[event.id]) throw new Error("里程碑 ID 重复：" + event.id);
        ids[event.id] = true;
        if (!event.summary || !event.source) throw new Error("里程碑缺少本地资料：" + event.id);
      });
    });
    data.relations.forEach(function (relation) {
      if (!ids[relation.from] || !ids[relation.to]) throw new Error("关系线端点不存在：" + relation.label);
    });
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
    metrics.appendChild(element("span", "fsg-count", data.objects.length + " 个对象"));
    metrics.appendChild(element("span", "fsg-count", eventCount(data) + " 个里程碑"));
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
      var stageLabel = GRAPH_WIDTH < 1200 ? ["平台底座形成", "战术平台扩展", "任务化深化", "生态外延"][index] : stage.label;
      svg.appendChild(svgElement("text", { x: x + 8, y: 24, class: "fsg-svg-stage-label" }, stageLabel));
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
      makeInteractive(group, "查看 " + item.name + " 对象", function () { openObject(item, group); });
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
    group.setAttribute("data-has-detail", event.summary ? "true" : "false");
    group.setAttribute("data-object-id", position.object.id);
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
    var columns = GRAPH_WIDTH < 1200 ? 5 : 10;
    var cellWidth = (GRAPH_WIDTH - 24) / columns;
    data.externalSystems.forEach(function (label, index) {
      var x = 12 + (index % columns) * cellWidth;
      var y = layerGeometry.external.y + 7 + Math.floor(index / columns) * 33;
      var width = cellWidth - 8;
      var group = svgElement("g", { class: "fsg-external-item" });
      makeInteractive(group, "查看 " + label + " 概念", function () { openExternal(label, group); });
      group.appendChild(svgElement("rect", { x: x, y: y, width: width, height: 29, rx: 4 }));
      group.appendChild(svgElement("text", { x: x + width / 2, y: y + 19, "text-anchor": "middle" }, label));
      svg.appendChild(group);
    });
  }

  function renderSvg(data) {
    var svg = svgElement("svg", {
      class: "fsg-svg",
      viewBox: "0 0 " + GRAPH_WIDTH + " " + GRAPH_HEIGHT,
      width: GRAPH_WIDTH,
      height: GRAPH_HEIGHT,
      preserveAspectRatio: "none",
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

  function makeInteractive(node, label, action) {
    node.setAttribute("role", "button"); node.setAttribute("tabindex", "0");
    node.setAttribute("aria-label", label);
    node.addEventListener("click", action);
    node.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); action(); }
    });
  }

  function paragraphSection(title, text) {
    var section = element("section", "fsg-drawer__section");
    section.appendChild(element("h3", "", title));
    section.appendChild(element("p", "", text));
    return section;
  }

  function actionButton(label, action) {
    var button = element("button", "fsg-drawer__source-link", label);
    button.type = "button"; button.addEventListener("click", action); return button;
  }

  function catalogueObject(id) {
    return window.PRODUCT_CATALOG_DATA.products.find(function (item) { return item.id === id; });
  }

  function openObject(item, trigger) {
    var product = catalogueObject(item.id);
    var source = product && window.PRODUCT_CATALOG_DATA.sources.find(function (record) {
      return product.sourceIds.indexOf(record.id) >= 0 && record.url;
    });
    openDrawer({ object: item, kind: "object", event: {
      title: item.name + " 对象档案", date: "对象概览", eventType: product ? product.type : "图谱对象",
      summary: product ? product.summary : item.name + " 的公开事件索引。",
      assessment: product && product.scopeNote, source: source
    } }, trigger);
  }

  var externalNotes = {
    "战术电台": ["通信承载", "用于在现场节点之间传送语音或数据的无线电设备类别。具体波形、频段和加密能力取决于型号。", "图中仅表示潜在承载类别，不确认任何特定电台已接入 Lattice。"],
    SATCOM: ["卫星通信", "通过卫星链路提供连接的通信方式，可作为地面网络之外的承载选项。", "覆盖、容量、时延与终端条件相关，不能由该标签推断目标系统的链路性能。"],
    MANET: ["移动自组织网络", "由移动节点协同形成、拓扑可能变化的网络类型。它是通信组织方式，不是某个厂商产品。", "自组织网络与应用层数据 Mesh 不是同一概念，不据同名认定技术实现相同。"],
    "5G": ["蜂窝网络承载", "第五代移动通信体系，可为移动终端提供数据连接。部署形态、覆盖和业务能力需按实际网络核验。", "图谱没有说明 Anduril 使用了哪种专网、公网或具体5G设备。"],
    "Wi-Fi": ["无线局域网", "常见的本地无线接入方式，主要用于一定覆盖范围内的设备连接。", "表示承载类别，不代表公开确认了特定协议版本或安全配置。"],
    "以太网": ["有线局域网", "通过有线接口连接设备、计算节点和网络设施的一类数据链路技术。", "不能据此推定接口速率、拓扑或设备兼容性。"],
    "传感器": ["数据来源类别", "把环境或对象观测转为数据的设备总称，例如成像、雷达或环境测量设备。", "传感器输出通常还需要接口适配、时间与语义处理，不能认为任意传感器自动兼容。"],
    "无人平台": ["任务载体类别", "包括无人航空器、地面平台和水下航行器等不同载体，承载软件、传感器或任务载荷。", "图中是跨类概念，不是具体平台的能力或集成清单。"],
    "武器装备": ["外部任务系统类别", "图谱中表示可能与指挥控制体系发生信息关联的装备类别，仅用于整理公开的系统边界。", "不包含控制接口、操作方法或目标系统实际接入关系的确认。"],
    "第三方任务系统": ["外部软件系统", "由其他开发主体提供的业务应用或任务系统，公开接口是研究互操作性的入口之一。", "开放接口不代表所有第三方系统已完成集成；实际采用关系需要单独证据。"]
  };

  function openExternal(label, trigger) {
    var entry = externalNotes[label];
    openDrawer({ object: { name: label }, kind: "concept", event: {
      title: label + " 概念说明", date: "通用概念", eventType: entry[0], summary: entry[1], assessment: entry[2],
      source: { title: "图谱术语与表达边界说明", publisher: "本项目分析整理", type: "概念释义（非集成证据）", publishedAt: "2026-09-20", summary: entry[1], supports: "仅解释图中标签含义，不证明产品采用关系。" }
    } }, trigger);
  }

  function openDrawer(position, trigger) {
    if (!state) return;
    closeDrawer(false);
    var event = position.event;
    if (position.object.id) document.dispatchEvent(new CustomEvent("lineage:object", { detail: { id: position.object.id, name: position.object.name } }));
    try {
      var drawerUrl = new URL(window.location.href);
      if (position.object.id) drawerUrl.searchParams.set("graphObject", position.object.id);
      if (event.id) drawerUrl.searchParams.set("event", event.id); else drawerUrl.searchParams.delete("event");
      window.history.replaceState({}, "", drawerUrl.href);
    } catch (error) { /* URL 持久化不可用时仍支持本地浏览。 */ }
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

    facts.appendChild(detailRow(position.kind ? "查看范围" : "时间定位", event.date));
    facts.appendChild(detailRow("关联对象", position.object.name));
    facts.appendChild(detailRow("记录类型", event.eventType || "公开事件"));
    body.appendChild(facts);
    if (event.summary) {
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
      if (event.scopeNote) body.appendChild(paragraphSection("核验说明", event.scopeNote));
      if (event.verificationStatus) body.appendChild(paragraphSection("资料状态", event.verificationStatus));
      source = source || { title: "对象目录中的公开资料", publisher: "项目整理", type: "对象概要", publishedAt: "见对象档案" };
      sourceSection.appendChild(element("h3", "", "本地来源摘要"));
      sourceSection.appendChild(element("p", "fsg-drawer__source-title", source.title));
      var sourceMeta = element("dl", "fsg-drawer__source-meta");
      sourceMeta.appendChild(detailRow("发布主体", source.publisher));
      sourceMeta.appendChild(detailRow("来源类型", source.type || source.sourceType || "公开来源"));
      sourceMeta.appendChild(detailRow("发布日期", source.publishedAt || source.date || "未标注发布日期"));
      sourceMeta.appendChild(detailRow("核验日期", source.checkedAt || "2026-09-20"));
      sourceLink.textContent = "打开原始来源（需联网） ↗";
      sourceLink.href = source.url || "#";
      sourceLink.target = "_blank";
      sourceLink.rel = "noopener noreferrer";
      sourceSection.appendChild(sourceMeta);
      sourceSection.appendChild(element("p", "", source.summary || source.supports || event.summary));
      if (source.supports) sourceSection.appendChild(element("p", "", "支持信息：" + source.supports));
      if (source.url) sourceSection.appendChild(sourceLink);
      body.appendChild(sourceSection);
    }
    if (position.object.id) {
      var origin = catalogueObject(state.originProduct);
      if (origin) body.appendChild(actionButton("返回 " + origin.name + " 原对象档案", function () {
        closeDrawer(false);
        document.dispatchEvent(new CustomEvent("lineage:navigate", { detail: { tab: "catalog", objectId: origin.id, fromGraph: true } }));
      }));
      body.appendChild(actionButton("查看 " + position.object.name + " 产品档案", function () {
        closeDrawer(false);
        document.dispatchEvent(new CustomEvent("lineage:navigate", { detail: { tab: "catalog", objectId: position.object.id, fromGraph: true } }));
      }));
      if (position.kind === "object") {
        var events = element("section", "fsg-drawer__section");
        events.appendChild(element("h3", "", "公开事件索引"));
        position.object.events.forEach(function (record) {
          events.appendChild(actionButton(record.date + " · " + record.title, function () {
            var node = Array.from(state.root.querySelectorAll(".fsg-event")).find(function (item) { return item.dataset.eventId === record.id; });
            openDrawer({ object: position.object, event: record }, node);
          }));
        });
        body.appendChild(events);
      }
      window.FULL_STACK_GRAPH_DATA.relations.filter(function (relation) {
        return position.object.events.some(function (record) { return record.id === relation.from || record.id === relation.to; });
      }).forEach(function (relation) {
        var section = paragraphSection("关系说明 · " + relation.label, relation.description || "图中为公开资料关联索引，不据事件先后推定因果。");
        if (relation.source) {
          section.appendChild(element("p", "", "依据：" + relation.source.title + " · " + (relation.source.summary || relation.source.supports || "仅支撑所列关系")));
          if (relation.source.url) {
            var relationLink = element("a", "fsg-drawer__source-link", "打开关系原始来源（需联网） ↗");
            relationLink.href = relation.source.url;
            relationLink.target = "_blank";
            relationLink.rel = "noopener noreferrer";
            section.appendChild(relationLink);
          }
        }
        body.appendChild(section);
      });
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
    if (state.selectedNode) {
      state.selectedNode.setAttribute("aria-pressed", "true");
      state.selectedNode.classList.add("is-selected");
    }
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
    try {
      var drawerUrl = new URL(window.location.href);
      drawerUrl.searchParams.delete("event");
      window.history.replaceState({}, "", drawerUrl.href);
    } catch (error) { /* 不影响关闭抽屉。 */ }
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
      if (restoreFocus && focusTarget && focusTarget.isConnected) focusTarget.focus({ preventScroll: true });
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
    var note = element("p", "fsg-method-note", "说明：分层与关系为公开资料整理，不代表官方内部架构。对象框、事件圆点及外部系统标签均可查看详情；历史日期的核验边界以详情说明为准。来源摘要保存在本地，原文链接需联网。");
    scroller.tabIndex = 0;
    scroller.setAttribute("aria-label", "可横向滚动的技术演化时间轴");
    scroller.appendChild(renderSvg(data));
    graphGrid.appendChild(renderLayerRail(data));
    graphGrid.appendChild(scroller);
    graphFrame.appendChild(graphGrid);
    graphFrame.appendChild(note);
    root.appendChild(renderContext(data));
    root.appendChild(renderLegend());
    var toolbar = element("div", "fsg-toolbar");
    var searchLabel = element("label", "", "定位研究对象");
    var search = element("input", "fsg-search");
    search.type = "search"; search.placeholder = "输入对象名称，如 Ghost 或 Lattice Mesh";
    search.setAttribute("aria-label", "定位图谱对象");
    search.setAttribute("list", "graph-object-options");
    var options = element("datalist"); options.id = "graph-object-options";
    data.objects.forEach(function (item) { var option = element("option"); option.value = item.name; options.appendChild(option); });
    searchLabel.appendChild(search); toolbar.appendChild(searchLabel); toolbar.appendChild(options);
    function searchObject() {
      var term = search.value.trim().toLowerCase();
      if (!term) { focusObject(null); return; }
      var found = data.objects.find(function (item) { return item.name.toLowerCase() === term || item.id === term; }) || data.objects.find(function (item) { return item.name.toLowerCase().indexOf(term) >= 0; });
      if (term === "ghost-x" || term === "ghost x") found = data.objects.find(function (item) { return item.id === "ghost"; });
      if (found) focusObject(found.id);
      else state.status.textContent = "未找到该对象，请从当前图谱对象中选择。";
    }
    search.addEventListener("keydown", function (event) { if (event.key === "Enter") searchObject(); });
    toolbar.appendChild(actionButton("定位", searchObject));
    toolbar.appendChild(actionButton("查看全图", function () { search.value = ""; focusObject(null); }));
    toolbar.appendChild(actionButton("适应窗口", function () { state.scroller.classList.remove("is-actual-size"); resizeGraph(); state.scroller.scrollLeft = 0; }));
    toolbar.appendChild(actionButton("原始比例", function () { state.scroller.classList.add("is-actual-size"); resizeGraph(); }));
    var status = element("p", "fsg-search-status", "点击对象查看档案，点击圆点查看事件。");
    status.setAttribute("role", "status"); toolbar.appendChild(status);
    root.appendChild(toolbar);
    root.appendChild(graphFrame);
    mount.replaceChildren(root);
    state = {
      mount: mount,
      root: root,
      status: status,
      search: search,
      scroller: scroller,
      backdrop: null,
      drawerKeyHandler: null,
      selectedNode: null,
      returnFocus: null,
      scrollLeft: 0
    };
  }

  function resizeGraph() {
    if (!state || !state.scroller.clientWidth) return;
    var width = state.scroller.classList.contains("is-actual-size") ? 1540 : Math.max(700, state.scroller.clientWidth);
    if (Math.abs(width - GRAPH_WIDTH) < 2) return;
    GRAPH_WIDTH = width;
    START_X = 145;
    YEAR_WIDTH = (GRAPH_WIDTH - START_X - 24) / 9;
    state.scroller.replaceChildren(renderSvg(window.FULL_STACK_GRAPH_DATA));
  }

  function focusObject(objectId, eventId, originProduct) {
    if (!state) return;
    resizeGraph();
    if (originProduct !== undefined) state.originProduct = originProduct;
    var data = window.FULL_STACK_GRAPH_DATA;
    var selected = data.objects.find(function (item) { return item.id === objectId; });
    state.focusedObject = selected || null;
    document.dispatchEvent(new CustomEvent("lineage:object", { detail: selected || { id: "anduril", name: "Anduril Industries" } }));
    state.root.querySelectorAll(".fsg-object-node,.fsg-event").forEach(function (node) {
      node.classList.toggle("is-highlighted", !!selected && node.dataset.objectId === selected.id);
    });
    state.status.textContent = selected ? "已定位：" + selected.name + " · " + selected.events.length + " 个事件" : "全部对象与事件 · 点击查看本地详情";
    state.search.value = selected ? selected.name : "";
    try {
      var url = new URL(window.location.href);
      if (selected) url.searchParams.set("graphObject", selected.id); else url.searchParams.delete("graphObject");
      if (eventId) url.searchParams.set("event", eventId); else url.searchParams.delete("event");
      if (state.originProduct) url.searchParams.set("fromProduct", state.originProduct);
      window.history.replaceState({}, "", url.href);
    } catch (error) { /* file:// 的浏览状态不依赖 History API。 */ }
    if (!selected) { state.scroller.scrollLeft = 0; return; }
    var event = selected.events.find(function (item) { return item.id === eventId; });
    var target = event ? state.root.querySelector('[data-event-id="' + event.id + '"]') : state.root.querySelector('.fsg-object-node[data-object-id="' + selected.id + '"]');
    if (target) target.scrollIntoView({ block: "center", inline: "center", behavior: "instant" });
    if (event) openDrawer({ object: selected, event: event }, target);
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
    focusObject: focusObject,
    getFocusedObject: function () { return state && state.focusedObject || null; },
    resizeGraph: resizeGraph,
    getCounts: function () {
      var data = window.FULL_STACK_GRAPH_DATA;
      return { objects: data.objects.length, milestones: eventCount(data) };
    }
  };
}());
