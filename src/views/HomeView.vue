<template>
  <main class="home-page">
    <section class="hero-section section-panel" id="top">
      <div class="hero-copy">
        <p class="eyebrow">Personal full-stack digital platform</p>
        <h1>
          ZhenGeek
          <span>Envision. Nurture. Forge. Pioneer.</span>
        </h1>
        <p class="hero-text">
          这里是 z同学从零成长为“真极客 / 蓁极客”的长期工程现场：记录学习，锻造项目，展示作品，连接未来。
        </p>
        <div class="hero-actions">
          <a class="primary-button" href="#projects">进入作品现场</a>
          <RouterLink class="ghost-button" to="/about">了解 z同学</RouterLink>
        </div>
      </div>

      <div class="hero-orbit" aria-label="ZhenGeek visual identity">
        <div class="orbit-card main-symbol">ZG</div>
        <div class="orbit-chip chip-one">⚡ Forge</div>
        <div class="orbit-chip chip-two">🐈 Lab</div>
        <div class="orbit-chip chip-three">⌁ Full Stack</div>
      </div>
    </section>

    <section class="section-panel manifesto-section" id="manifesto">
      <p class="eyebrow">Manifesto</p>
      <h2>不是普通博客，而是一座持续生长的个人数字平台。</h2>
      <div class="manifesto-grid">
        <article v-for="item in manifesto" :key="item.title" class="glass-card">
          <span>{{ item.index }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section class="section-panel split-section" id="about">
      <div>
        <p class="eyebrow">About</p>
        <h2>从 Big Data 新生开始，走工程化成长路线。</h2>
      </div>
      <div class="section-copy">
        <p>
          ZhenGeek 会记录前端、后端、计算机基础、表达训练，以及未来 FPGA、嵌入式和算法方向的探索。
          它的目标不是一次性做完，而是长期迭代成真正能展示能力的作品集。
        </p>
        <RouterLink class="text-link" to="/about">查看详细路线 →</RouterLink>
      </div>
    </section>

    <section class="section-panel" id="projects">
      <div class="section-heading">
        <p class="eyebrow">Projects</p>
        <h2>把学习变成作品，把作品变成证据。</h2>
      </div>
      <div class="project-grid">
        <article v-for="project in projects" :key="project.title" class="project-card">
          <p>{{ project.type }}</p>
          <h3>{{ project.title }}</h3>
          <span>{{ project.description }}</span>
        </article>
      </div>
      <RouterLink class="text-link" to="/projects">进入项目详情页 →</RouterLink>
    </section>

    <section class="section-panel split-section" id="blog">
      <div>
        <p class="eyebrow">Blog & Notes</p>
        <h2>每周复盘，是把经验沉淀成表达能力。</h2>
      </div>
      <div class="section-copy">
        <p>
          这里未来会放技术周报、项目踩坑、学习路线和公众号草稿。先从 Vue 首页开始，把“看得见的进步”做出来。
        </p>
        <RouterLink class="text-link" to="/blog">查看博客骨架 →</RouterLink>
      </div>
    </section>

    <section class="section-panel lab-section" id="lab">
      <p class="eyebrow">Lab</p>
      <h2>给好奇心一个实验场。</h2>
      <p>
        视觉动效、小工具、交互组件、未来硬件实验，都可以先放进 Lab。允许粗糙，但不允许停止迭代。
      </p>
      <RouterLink class="ghost-button" to="/lab">进入实验室</RouterLink>
    </section>
  </main>
</template>

<script setup>
const manifesto = [
  {
    index: '01',
    title: 'Envision 梦想',
    text: '先看见想成为的人，再把它拆成每周可执行的工程任务。',
  },
  {
    index: '02',
    title: 'Nurture 成长',
    text: '用学习记录、复盘和表达训练，把零散努力养成长期能力。',
  },
  {
    index: '03',
    title: 'Forge 锻造',
    text: '用真实项目承压：重构、调试、部署、展示，都是锻造。',
  },
  {
    index: '04',
    title: 'Pioneer 开拓',
    text: '从前端到后端，再到硬件与算法，逐步扩张自己的技术边界。',
  },
]

const projects = [
  {
    type: 'Main Platform',
    title: 'ZhenGeek Blog',
    description: '技术博客、学习记录、生活日志、项目作品集与未来社区互动的主站。',
  },
  {
    type: 'Focus Tool',
    title: 'FocusCatto',
    description: '面向专注、习惯和成长记录的小工具方向，承载产品化练习。',
  },
  {
    type: 'Creative Lab',
    title: 'CattoCakeLab',
    description: '视觉创意、交互动效和实验组件的游乐场。',
  },
]
</script>
