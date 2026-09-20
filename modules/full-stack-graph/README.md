# 可视化技术/事件图谱模块

`full-stack-graph` 为 `pages/applications/lineage.html` 第二个 Tab 提供原生 HTML / JavaScript / SVG 图谱，可直接通过 `file://` 打开，不依赖框架、CDN、网络请求或构建步骤。

## 文件职责

- `full-stack-graph-data.js`：15 个对象、51 个公开里程碑、4 个阶段、6 个能力层及 6 条克制关系线。
- `full-stack-graph.js`：15 个核心对象矩形、51 个统一可点击里程碑、紧凑时间轴及键盘/鼠标交互；普通节点显示待补充状态，已接入详情的节点显示事件摘要、研判说明和来源 Drawer。
- `full-stack-graph.css`：图谱、固定层级栏、图例和 Drawer 的局部样式。

## 接入方式

页面依次加载数据脚本、渲染脚本和 `lineage.js`，再调用：

```js
window.PlatformModules.fullStackGraph.render("full-stack-graph-mount");
```

模块启动时会校验对象数、里程碑数、关系端点和详情节点。每个核心对象以静态矩形名称节点与其首次里程碑衔接；所有里程碑均可点击，其中 `lattice-c2-2024-06`、`lattice-mesh-2024-12` 和 `lattice-mesh-2025-05` 已接入完整详情与公开来源。

## 表达边界

六层是基于公开资料的能力逻辑重组，不代表 Anduril 官方内部部署架构或逐层调用顺序。黑实线仅表示有明确依据的演化/派生；灰虚线仅表示接入、调度、协同或软件支撑，不表示继承。
