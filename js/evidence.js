(function () {
  "use strict";

  var closeCurrent = function () {};

  function paragraph(text) {
    return window.PlatformComponents.element("p", "", text);
  }

  function openEvidence(id) {
    var records = window.PLATFORM_DATA && window.PLATFORM_DATA.evidence;
    var record = Array.isArray(records) ? records.find(function (item) { return item.id === id; }) : null;

    if (!record) {
      closeCurrent = window.PlatformComponents.openDrawer({
        kicker: "EVIDENCE",
        title: "证据详情",
        sections: [{ title: "当前状态", content: paragraph("未找到对应证据记录。") }]
      });
      return;
    }

    var details = window.PlatformComponents.createDefinitionList([
      { label: "发布方", value: record.publisher },
      { label: "来源类型", value: record.sourceType },
      { label: "证据等级", value: record.grade },
      { label: "核验状态", value: record.status },
      { label: "支撑主张", value: record.supports }
    ]);

    var source = window.PlatformComponents.element("div");
    source.appendChild(paragraph(record.url));
    source.appendChild(window.PlatformComponents.createTag("保留原始来源", "primary"));

    closeCurrent = window.PlatformComponents.openDrawer({
      kicker: "EVIDENCE",
      title: record.title,
      sections: [
        { title: "证据摘要", content: paragraph(record.summary) },
        { title: "证据属性", content: details },
        { title: "原始来源", content: source },
        { title: "结论边界", content: paragraph("当前记录仅支撑所列主张，不自动扩展为产品采用关系或已验证工程实现。") }
      ]
    });
  }

  function closeEvidence() {
    closeCurrent();
  }

  window.openEvidence = openEvidence;
  window.closeEvidence = closeEvidence;
}());
