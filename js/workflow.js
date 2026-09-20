(function () {
  "use strict";

  var closeCurrent = function () {};

  function openWorkflow(type) {
    var workflows = window.PLATFORM_DATA && window.PLATFORM_DATA.workflows;
    var workflow = workflows ? workflows[type] : null;
    var components = window.PlatformComponents;

    if (!workflow) {
      closeCurrent = components.openDrawer({
        kicker: "WORKFLOW",
        title: "执行工作流",
        sections: [{ title: "当前状态", content: components.element("p", "", "未找到对应工作流。") }]
      });
      return;
    }

    var steps = components.element("ol");
    workflow.steps.forEach(function (step) {
      steps.appendChild(components.element("li", "", step));
    });

    var status = components.createDefinitionList([
      { label: "运行方式", value: "结构预览" },
      { label: "步骤数量", value: workflow.steps.length + " 个" },
      { label: "当前状态", value: "公共框架已就绪" }
    ]);

    closeCurrent = components.openDrawer({
      kicker: "WORKFLOW",
      title: workflow.title,
      sections: [
        { title: "流程说明", content: components.element("p", "", workflow.description) },
        { title: "处理步骤", content: steps },
        { title: "执行信息", content: status }
      ]
    });
  }

  function closeWorkflow() {
    closeCurrent();
  }

  window.openWorkflow = openWorkflow;
  window.closeWorkflow = closeWorkflow;
}());
