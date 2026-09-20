# 技术产品目录模块

## 使用方式

直接双击 `pages/applications/lineage.html`。页面使用相对路径和原生 JavaScript，可通过 `file://` 运行，无需安装依赖或启动服务。

模块通过以下接口挂载：

```js
window.PlatformModules.productCatalog.render("catalog-mount", {
  selectedProductId: "ghost-x"
});
```

`destroy()` 用于清理当前挂载内容。产品数据集中保存在 `product-data.js`，样式统一使用 `pc-` 前缀，产品详情中的“查看证据”复用公共 `openEvidence(id)`。

本轮只实现“技术产品目录”。可视化技术/事件图谱、技术成熟度分析和研究对象本体库仅保留占位。
