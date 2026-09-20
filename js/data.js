(function () {
  "use strict";

  window.PLATFORM_DATA = {
    metrics: [
      { label: "公共组件", value: "9 类", note: "已集中展示" },
      { label: "正式导航", value: "8 项", note: "3 个业务分组" },
      { label: "运行方式", value: "file://", note: "无需构建服务" }
    ],
    records: [
      { object: "Lattice Mesh", type: "公开研究对象", source: "企业第一方", grade: "A", status: "已核验对象" },
      { object: "Flux", type: "公开技术线索", source: "联合论文", grade: "B", status: "待进一步核验" },
      { object: "工程验证建议", type: "工程近似建议", source: "专利", grade: "D", status: "待人工验证" }
    ],
    evidence: [
      {
        id: "evidence-lattice-mesh",
        title: "Lattice Mesh 公开对象确认",
        publisher: "Anduril",
        sourceType: "企业第一方",
        grade: "A 官方确认",
        status: "已确认",
        summary: "官方页面确认 Lattice Mesh 是当前分析中的可追溯对象。",
        supports: "产品对象确认",
        url: "https://www.anduril.com/lattice/lattice-mesh"
      },
      {
        id: "evidence-flux",
        title: "Flux 技术线索",
        publisher: "AMOS Conference",
        sourceType: "联合论文",
        grade: "B 公开技术线索",
        status: "待核验",
        summary: "公开论文提供系统协同与数据分发的技术线索。",
        supports: "技术线索",
        url: "https://amostech.com/TechnicalPapers/2023/Poster/Pruden.pdf"
      }
    ],
    workflows: {
      collection: {
        title: "动态情报采集工作流",
        description: "用于展示从信源发现到证据入库的标准处理结构。",
        steps: ["信源范围确认", "公开信息采集", "内容去重与归档", "证据单元生成"]
      },
      alignment: {
        title: "多源证据对齐工作流",
        description: "用于展示对象、时间与技术主张之间的证据关联过程。",
        steps: ["对象实体识别", "时间线索对齐", "主张关系匹配", "冲突项人工复核"]
      },
      value: {
        title: "情报价值研判工作流",
        description: "用于展示证据分级、价值判断与后续任务生成结构。",
        steps: ["证据等级判定", "研究价值评估", "未知项识别", "后续任务建议"]
      }
    }
  };
}());
