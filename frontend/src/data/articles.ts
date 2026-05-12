export const categories = [
  {
    name: 'Devlog',
    desc: '记录 ZhenGeek 每一次重要迭代：为什么改、改了什么、下一步是什么。'
  },
  {
    name: 'Frontend',
    desc: '记录 Vue3、TypeScript、CSS、组件化、路由和页面工程实践。'
  },
  {
    name: 'Git',
    desc: '记录 Git、GitHub、提交、分支、冲突处理和工程协作基础。'
  },
  {
    name: 'Learning Notes',
    desc: '整理计算机基础、算法、后端、数据库和长期学习复盘。'
  }
]

export const articles = [
  {
    category: 'Devlog',
    date: '2026-05',
    title: 'ZhenGeek Devlog 01：为什么我把博客升级成个人网站',
    summary: '记录 ZhenGeek 从个人博客升级为个人数字平台的原因：它不只是展示页，而是长期成长系统。',
    tags: ['定位', '个人品牌', '项目路线'],
    status: 'Draft Planned'
  },
  {
    category: 'Frontend',
    date: '2026-05',
    title: 'Vue3 + Vite 项目初始化踩坑记录',
    summary: '整理 Node.js、npm、Vite 初始化过程中的环境问题、安装卡顿、脚本权限和启动方式。',
    tags: ['Vue3', 'Vite', '环境配置'],
    status: 'Outline Ready'
  },
  {
    category: 'Vue',
    date: '2026-05',
    title: '从 App.vue 到组件化首页：我现在到底在写什么',
    summary: '用初学者视角解释 .vue 单文件组件、template/script/style 的关系，以及页面如何被组织起来。',
    tags: ['SFC', '组件化', '路由'],
    status: 'Draft Planned'
  },
  {
    category: 'Git',
    date: '2026-05',
    title: 'Git add / commit / push 到底做了什么',
    summary: '把版本控制理解成工程存档系统：暂存、提交、推送、拉取和冲突分别解决什么问题。',
    tags: ['Git', 'GitHub', '工程习惯'],
    status: 'Outline Ready'
  },
  {
    category: 'Project Notes',
    date: '2026-05',
    title: 'ZhenGeek V1 静态前端阶段验收标准',
    summary: '明确当前阶段不是上后端，而是先完成 About、Projects、Blog、Lab 的内容骨架与视觉统一。',
    tags: ['项目管理', '阶段验收', '路线图'],
    status: 'New Idea'
  }
]

export const writingRules = [
  '每次文章只解决一个问题，不写成大而空的总结。',
  '每篇文章都包含：背景、踩坑/过程、理解、下一步。',
  '优先记录真实项目中遇到的问题，而不是为了更新而更新。',
  '先写短文章，保持连续输出，再逐步提高质量。'
]
