export const mainProject = {
  name: 'ZhenGeek Studio Site',
  status: 'Studio MVP',
  summary:
    '一个面向合作与展示的个人工作室网站：用前端视觉、全栈能力和长期内容，把“我能做什么”讲清楚。',
  stack: ['Vue3', 'TypeScript', 'Vite', 'Spring Boot', 'MySQL', 'Design System'],
  done: [
    '完成公开站首页、About、Projects、Blog、Lab 的路由与内容骨架',
    '建立黑色科技风视觉系统、动效转场、响应式布局和可复用组件',
    '接入 Spring Boot + MySQL 文章 API，公开 Blog 只展示 published 内容',
    '完成 Admin 文章列表、编辑、新建、发布、删除和统一错误提示的基础闭环',
    '把网站定位从学习记录升级为个人工作室与前端能力展示入口'
  ],
  next: [
    '补齐 3 个高质量项目案例的真实截图、过程记录和结果说明',
    '继续稳定 Admin 保存 / 发布 / 删除反馈与移动端布局',
    '把 Blog 作为长期复盘系统，持续沉淀项目文章和技术笔记',
    '在 v1.0 再进入管理员登录、JWT 与后台鉴权'
  ]
}

export const sideProjects = [
  {
    title: '个人工作室门面',
    status: 'Live Case',
    desc: '把 ZhenGeek 从普通个人网站调整为合作型工作室首页，首屏直接说明定位、能力和可合作方向。',
    stack: ['Vue3', 'Responsive UI', 'Content Strategy'],
    goal: '目标：让访客 5 秒内看懂我是谁、能做什么、为什么值得继续浏览。'
  },
  {
    title: 'Admin 文章管理台',
    status: 'Full-stack Case',
    desc: '用 Spring Boot + MySQL 支撑文章持久化，前端 Admin 负责新建、编辑、发布、删除和状态反馈。',
    stack: ['Spring Boot', 'MySQL', 'REST API', 'Vue Form'],
    goal: '结果：博客内容从静态展示进入可维护的全栈管理流程。'
  },
  {
    title: '创意交互实验室',
    status: 'Visual Case',
    desc: '沉淀自定义光标、幕布转场、视觉卡片、未来算法可视化等实验，展示前端表现力。',
    stack: ['CSS Motion', 'Creative Coding', 'Interaction'],
    goal: '结果：形成兼具工程结构和审美表达的个人前端风格。'
  }
]

export const backendPlan = [
  'GET /api/articles：公开 Blog 只返回 published 文章',
  'GET /api/admin/articles：Admin 查看 draft / published / archived',
  'POST /api/admin/articles：创建文章并返回新记录',
  'PUT /api/admin/articles/{id}：编辑已有文章，不重复跳转',
  'DELETE /api/admin/articles/{id}：删除文章并触发前端成功提示'
]
