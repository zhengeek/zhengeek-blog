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
    slug: 'zhengeek-devlog-01',
    category: 'Devlog',
    date: '2026-05',
    title: 'ZhenGeek Devlog 01：为什么我把博客升级成个人网站',
    summary: '记录 ZhenGeek 从个人博客升级为个人数字平台的原因：它不只是展示页，而是长期成长系统。',
    tags: ['定位', '个人品牌', '项目路线'],
    status: 'Draft Planned',
    viewCount: 128,
    isPinned: true,
    content: `
## 背景

一开始我只想做一个能展示学习记录的博客，但很快发现，单纯的文章列表不够承载 ZhenGeek 这个项目的长期目标。它需要同时展示我是谁、正在做什么、技术路线如何推进，以及每一次迭代为什么发生。

## 过程

所以我把博客升级成个人网站：About 负责介绍方向，Projects 负责沉淀工程作品，Blog 负责记录复盘，Lab 负责保存实验想法。这样每个页面都不是孤立内容，而是共同服务于一个成长系统。

## 下一步

当前阶段先把静态内容、页面结构和视觉风格打磨稳定。等 V1 的信息架构跑顺之后，再考虑把文章、项目和实验数据迁移到后端 API。
`
  },
  {
    slug: 'vue3-vite-init-notes',
    category: 'Frontend',
    date: '2026-05',
    title: 'Vue3 + Vite 项目初始化踩坑记录',
    summary: '整理 Node.js、npm、Vite 初始化过程中的环境问题、安装卡顿、脚本权限和启动方式。',
    tags: ['Vue3', 'Vite', '环境配置'],
    status: 'Outline Ready',
    viewCount: 96,
    isPinned: false,
    content: `
## 背景

Vue3 + Vite 的初始化看起来很简单，但真正落到本地环境时，会遇到 Node 版本、npm 安装速度、脚本启动方式和编辑器识别等一串细节问题。

## 过程

我先确认 Node 和 npm 能正常运行，再使用 Vite 创建前端项目。遇到依赖安装慢时，优先判断是网络问题还是命令本身的问题；启动失败时，则先看 package scripts，再看终端输出，而不是盲目重装。

## 下一步

后续会把这篇文章整理成一份更完整的初始化 checklist，包括推荐目录结构、常用脚本、路径别名和第一次提交前应该检查的内容。
`
  },
  {
    slug: 'app-vue-to-component-home',
    category: 'Vue',
    date: '2026-05',
    title: '从 App.vue 到组件化首页：我现在到底在写什么',
    summary: '用初学者视角解释 .vue 单文件组件、template/script/style 的关系，以及页面如何被组织起来。',
    tags: ['SFC', '组件化', '路由'],
    status: 'Draft Planned',
    viewCount: 74,
    isPinned: false,
    content: `
## 背景

刚开始写 Vue 项目时，最容易困惑的是：App.vue、views、components 到底分别负责什么。页面能跑起来不难，真正难的是知道代码应该放在哪里。

## 过程

我的理解是，App.vue 更像应用外壳，router 决定当前展示哪个页面，views 承载路由页面，components 则负责可复用的小块。template 写结构，script 组织数据和逻辑，style 控制当前组件的视觉。

## 下一步

接下来我会继续拆分首页和详情页中的重复结构，把组件化从“文件拆开”推进到“职责清楚”。这也是 ZhenGeek 从静态页面走向工程化项目的重要一步。
`
  },
  {
    slug: 'git-add-commit-push',
    category: 'Git',
    date: '2026-05',
    title: 'Git add / commit / push 到底做了什么',
    summary: '把版本控制理解成工程存档系统：暂存、提交、推送、拉取和冲突分别解决什么问题。',
    tags: ['Git', 'GitHub', '工程习惯'],
    status: 'Outline Ready',
    viewCount: 83,
    isPinned: false,
    content: `
## 背景

Git 命令很多，但初学阶段最核心的是理解 add、commit、push 这三步分别改变了什么。只背命令很容易忘，理解状态流转之后才会真正稳定。

## 过程

add 是把工作区的改动放进暂存区，commit 是把暂存区保存成一次本地版本，push 是把本地提交同步到远端仓库。它们不是一个动作的三种写法，而是三个明确的工程动作。

## 下一步

我会继续补充 pull、branch、merge 和 conflict 的例子，把 Git 从“能用”变成“敢用”。每一次提交也要尽量配合清晰的 commit message，让项目历史可以被回看。
`
  },
  {
    slug: 'zhengeek-v1-static-frontend-checklist',
    category: 'Project Notes',
    date: '2026-05',
    title: 'ZhenGeek V1 静态前端阶段验收标准',
    summary: '明确当前阶段不是上后端，而是先完成 About、Projects、Blog、Lab 的内容骨架与视觉统一。',
    tags: ['项目管理', '阶段验收', '路线图'],
    status: 'New Idea',
    viewCount: 57,
    isPinned: false,
    content: `
## 背景

项目很容易因为想做的东西太多而失焦。ZhenGeek V1 的目标不是一次性完成全栈系统，而是先把静态前端阶段做到可以展示、可以维护、可以继续扩展。

## 过程

这一阶段的验收重点包括：路由完整、页面结构稳定、静态数据拆分清楚、通用组件开始沉淀、视觉风格一致，并且构建流程没有明显报错。

## 下一步

当 V1 静态前端稳定后，再进入文章详情、项目详情、后端 API、数据库和管理后台。每一步都应该服务于真实内容管理，而不是为了技术栈清单而堆功能。
`
  }
]

export const writingRules = [
  '每次文章只解决一个问题，不写成大而空的总结。',
  '每篇文章都包含：背景、踩坑/过程、理解、下一步。',
  '优先记录真实项目中遇到的问题，而不是为了更新而更新。',
  '先写短文章，保持连续输出，再逐步提高质量。'
]
