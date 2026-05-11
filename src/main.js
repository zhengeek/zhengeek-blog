import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import DetailView from './views/DetailView.vue'
import './styles.css'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  {
    path: '/about',
    name: 'about',
    component: DetailView,
    props: {
      eyebrow: 'About Zaz',
      title: '从零开始，把成长锻造成作品。',
      description:
        '这里将沉淀 z同学的个人介绍、成长路线、技术方向、阶段复盘和 ZhenGeek 的品牌故事。',
      items: ['个人路线：全栈工程 + 硬件理解', '关键词：梦想、成长、锻造、开拓', '目标：用长期工程项目积累面试作品集'],
    },
  },
  {
    path: '/projects',
    name: 'projects',
    component: DetailView,
    props: {
      eyebrow: 'Projects',
      title: '把每一次学习，都变成可展示的工程成果。',
      description:
        '这里将展示 ZhenGeek 主站、学习工具、实验性前端、未来的 FPGA / 嵌入式 / 算法项目。',
      items: ['ZhenGeek Blog：长期全栈个人平台', 'FocusCatto：专注与成长工具实验', 'CattoCakeLab：创意实验室方向'],
    },
  },
  {
    path: '/blog',
    name: 'blog',
    component: DetailView,
    props: {
      eyebrow: 'Blog & Notes',
      title: '记录学习，不是为了证明努力，而是为了留下轨迹。',
      description:
        '这里将存放技术周报、项目复盘、踩坑记录、读书笔记和未来公众号内容草稿。',
      items: ['Vue / 前端工程化笔记', '数据结构、算法、计算机基础', '每周技术总结与表达训练'],
    },
  },
  {
    path: '/lab',
    name: 'lab',
    component: DetailView,
    props: {
      eyebrow: 'Lab',
      title: '保留好奇心，允许实验、失败和重构。',
      description:
        '这里将作为 ZhenGeek 的实验室，放置小组件、视觉动效、交互原型和未来硬件实验入口。',
      items: ['视觉交互 Demo', '前端组件实验', '未来 FPGA / Embedded / AI 工程探索'],
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

createApp(App).use(router).mount('#app')
