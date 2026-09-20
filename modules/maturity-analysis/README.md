# 技术成熟度分析报告模块

该模块挂载在 `pages/applications/lineage.html?tab=maturity`，继续复用现有 AppShell、顶部栏和成果 Tab。

- `maturity-data.js`：7 个评价维度、6 组 TRL 演进证据链、完整分析报告、直接实证/体系关联佐证和原始来源。
- `maturity-analysis.js`：综合结论、横向 TRL 定位图、分析报告摘要、完整报告 Drawer、证据链表格及 TRL 9 评级依据 Drawer。
- `maturity-analysis.css`：局部白底蓝灰工作台样式、成熟度状态色、约 40% 宽度的评级 Drawer 和约 64% 宽度的报告 Drawer。

## 证据口径

- `direct`：直接指向 Lattice Mesh、Flux 或 Mesh 数据网在真实任务、部署和项目化使用中的公开证据。
- `system_support`：Lattice C2、SDK/API、Objects 等体系能力，仅用于辅助说明生态和平台兼容性。
- `historical_clue`：专利、早期概念或原理级线索，不作为当前 TRL 的独立认证。
- `analysis_mapping`：由多项公开资料综合形成的分析判断，不表述为官方结论。
- `unknown`：公开资料不足以确认的性能、安全或部署边界。
- 页面中的评级均为基于公开资料的情报研判，不是官方 TRL 认证。

## 运行方式

直接双击 `pages/applications/lineage.html`，或在地址后加 `?tab=maturity`。页面不依赖 CDN、`fetch`、ES Module 或构建工具。
