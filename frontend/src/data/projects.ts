export const mainProject = {
  name: 'ZhenGeek Personal Digital Platform',
  status: 'Building V1',
  summary:
    '一个长期全栈个人网站项目，用来承载作品集、技术博客、学习记录、生活思考、创意实验和未来社区互动。',
  stack: ['Vue3', 'TypeScript', 'Vite', 'Vue Router', 'CSS', 'Git / GitHub'],
  done: [
    '完成 Vue3 + Vite + TypeScript 前端项目初始化',
    '建立“单页面首页 + 多页面详细内容”的网站架构',
    '完成首页 Hero、About、Projects、Blog、Lab、Contact 分区',
    '完成统一导航栏、锚点滚动和基础视觉系统',
    '开始完善 About / Projects / Blog / Lab 详情页内容'
  ],
  next: [
    '继续打磨 Projects / Blog / Lab 页面内容',
    '拆分通用组件，减少页面重复代码',
    '整理文章、项目、实验的数据结构',
    '准备 Spring Boot + MySQL 后端接口接入'
  ]
}

export const sideProjects = [
  {
    title: 'Algorithm Visualization Lab',
    status: 'Planned',
    desc: '用 Canvas 和交互动画展示排序、搜索、图遍历等算法，让抽象知识变得可视化。',
    stack: ['Vue3', 'Canvas', 'Algorithms'],
    goal: '训练算法理解、前端交互和技术表达能力。'
  },
  {
    title: 'Full-stack Blog System',
    status: 'Next Stage',
    desc: '把当前静态文章列表升级为真实后端驱动的博客系统，支持文章详情、分类和管理。',
    stack: ['Spring Boot', 'MySQL', 'REST API'],
    goal: '完成从前端页面到后端数据服务的全栈闭环。'
  },
  {
    title: 'Creative Interaction Playground',
    status: 'Idea Pool',
    desc: '收集鼠标效果、页面动效、数据可视化、未来硬件信号可视化等创意实验。',
    stack: ['CSS', 'JavaScript', 'Visualization'],
    goal: '形成兼具技术和审美的个人工程风格。'
  }
]

export const backendPlan = [
  'GET /api/articles：获取文章列表',
  'GET /api/articles/:id：获取文章详情',
  'GET /api/projects：获取项目列表',
  'POST /api/comments：提交留言或评论',
  'Admin Module：未来用于文章管理和内容维护'
]
