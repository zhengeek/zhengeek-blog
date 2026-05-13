export const experiments = [
  {
    title: '算法可视化器',
    status: '计划中',
    desc: '用动画展示排序、搜索、图遍历等算法过程，让抽象逻辑变成可观察的运行轨迹。',
    stack: ['Vue3', 'Canvas', 'Algorithms'],
    value: '训练算法理解、交互设计和技术讲解能力。'
  },
  {
    title: '鼠标交互系统',
    status: '原型中',
    desc: '围绕自定义光标、悬停反馈、轨迹残影和页面微交互，形成 ZhenGeek 的专属操作手感。',
    stack: ['CSS', 'Pointer Events', 'Animation'],
    value: '提升网站记忆点，同时学习浏览器事件和动效性能。'
  },
  {
    title: 'Canvas 创意练习场',
    status: '想法池',
    desc: '收集粒子、波纹、噪声、几何图形和数据图案等 Canvas 小实验。',
    stack: ['Canvas', 'JavaScript', 'Math'],
    value: '把数学、视觉和代码连接起来，形成创意工程能力。'
  },
  {
    title: '数据可视化笔记',
    status: '稍后',
    desc: '把学习数据、项目进度和生活记录转化成可视化图表，服务于长期复盘。',
    stack: ['Charts', 'Data', 'Frontend'],
    value: '让个人网站不仅展示结果，也展示成长趋势。'
  },
  {
    title: 'FPGA / 嵌入式网页监控',
    status: '未来计划',
    desc: '未来尝试把硬件信号、传感器数据或嵌入式系统状态用网页方式可视化。',
    stack: ['FPGA', 'Embedded', 'Web UI'],
    value: '连接软件与硬件方向，为后续工程路线埋点。'
  }
]

export const labRules = [
  '每个实验都必须能解释：它练了什么能力。',
  '先做小 demo，不一开始追求大型复杂系统。',
  '实验结果可以失败，但必须留下记录和复盘。',
  '优秀实验会被升级为首页效果、博客素材或独立项目。'
]

export const buildOrder = [
  '先整理实验列表和目标',
  '实现一个最小 Canvas / CSS 动效 demo',
  '为实验补充说明、截图和源码入口',
  '把成熟实验沉淀到 Projects 或 Blog 页面'
]
