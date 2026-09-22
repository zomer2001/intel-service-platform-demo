# Colleague Business Pages Integration Implementation Plan

> **For agentic workers:** Implement inline in this session. The user explicitly excluded automated test frameworks, multi-round commits, and an expanded engineering process.

**Goal:** 原生迁移“技术发展态势研判”和“技术辅助还原与破解”的全部 8 个成果页及二级交互，并统一到当前纯 HTML 平台视觉与导航。

**Architecture:** 新增两个应用入口页，各自使用四个可持久化 Tab；源 JSON 转为 `file://` 可加载的 JavaScript 数据对象；各应用模块独立渲染，复用现有 AppShell、组件 Token 和右侧抽屉视觉。

**Tech Stack:** HTML5、CSS3、原生 JavaScript。

---

### Task 1：建立数据与通用成果页基础

**Files:**
- Create: `modules/trend-analysis/trend-data.js`
- Create: `modules/trend-analysis/trend-analysis.css`
- Create: `modules/trend-analysis/trend-analysis.js`
- Create: `modules/restoration-analysis/restoration-data.js`
- Create: `modules/restoration-analysis/restoration-analysis.css`
- Create: `modules/restoration-analysis/restoration-analysis.js`

- [ ] 将源 JSON 完整转换为只读全局数据对象，不使用 `fetch`。
- [ ] 建立统一的指标、表格、状态标签、图表容器、图谱节点、详情抽屉和本地下载样式。
- [ ] 为两个应用分别提供四个 Tab 的渲染入口，并保留筛选、排序、详情、节点联动、版本与动态过程。

### Task 2：建立两个正式业务应用入口

**Files:**
- Create: `pages/applications/trends.html`
- Create: `pages/applications/trends.js`
- Create: `pages/applications/restoration.html`
- Create: `pages/applications/restoration.js`

- [ ] 接入现有 CSS、AppShell、组件脚本、数据模块和应用模块。
- [ ] 建立四个单行 Tab、键盘切换和 `?tab=` 刷新保留。
- [ ] 设置正确的当前对象、分析层级、页面标题和说明文字。

### Task 3：接通导航并清理正式措辞

**Files:**
- Modify: `js/layout.js`
- Modify only if required for link options: existing page bootstrap scripts under `pages/`

- [ ] 为“技术发展态势研判”和“技术辅助还原与破解”增加真实页面跳转。
- [ ] 保证不同目录深度下任务中心、谱系、态势研判和辅助还原均能往返。
- [ ] 将迁移内容中的 `Demo`、`演示` 等字样替换为正式样例数据提示，不改变证据边界。

### Task 4：人工检查并收尾

- [ ] 依次打开 8 个 Tab，检查筛选、排序、Drawer、节点联动、报告下载、版本时间轴、项目详情和动态过程。
- [ ] 检查刷新保留 Tab、页面无主体横向滚动、浏览器控制台无明显错误。
- [ ] 检查任务中心和三个业务应用入口双向跳转。
- [ ] 检查 `file://` 所需资源均为相对路径且无网络依赖。
- [ ] 更新 `README.md` 的新增页面入口说明并停止，不扩展其他页面。
