# Lattice 原版持续监测详情恢复实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` inline. 本任务按用户要求不使用子智能体、自动测试框架或 Git 提交。

**Goal:** 保留当前 AppShell，将 Lattice 专属详情正文恢复为同事原版的内容、左右比例与交互。

**Architecture:** 继续使用 `trend-analysis.js` 的 `renderLatticeDetail()` 作为唯一入口，沿用现有 `TrendAnalysisData`、公共 Drawer 和 Tab。仅替换详情 DOM 和专属 CSS，不调整其他页面。

**Tech Stack:** 原生 HTML、CSS、JavaScript，支持 `file://`。

---

### Task 1：恢复原版详情正文

**Files:**
- Modify: `modules/trend-analysis/trend-analysis.js`

- [ ] 将 `renderLatticeDetail()` 改为原版结构：对象横幅、五项指标、左侧双轨时间轴、右侧多源情报流、底部两列联动。
- [ ] 报告卡、差异摘要和近期版本共用 `openMonitorReport(report)`；事件卡继续调用 `openEvent(event)`。
- [ ] 保留返回列表、`view=lattice`、报告下载、流程重播和现有 Tab 切换。
- [ ] 将“演示”类文案统一为“样例研判数据／公开资料研判，仅供分析参考”。

### Task 2：恢复原版版式

**Files:**
- Modify: `modules/trend-analysis/trend-analysis.css`

- [ ] 五项指标在 1920×1080 下一行展示。
- [ ] 主区采用原版左宽右窄布局，双轨时间轴以月份横向排列，右侧流程保持固定信息密度。
- [ ] 恢复原版报告卡、突发事件卡、时间轴、差异摘要、近期版本和底部联动的尺寸层级。
- [ ] 1180px 以下降为单列，避免正文横向溢出。

### Task 3：最终检查

- [ ] 运行 `node --check modules/trend-analysis/trend-analysis.js`，预期退出码为 0。
- [ ] 用 Chrome 以 1920×1080 打开 `pages/applications/trends.html?tab=monitor&view=lattice`，人工检查原版结构、返回列表、报告抽屉和 Tab 联动。
- [ ] 确认页面没有 `fetch()` 或 `XMLHttpRequest`，保持 `file://` 运行。
