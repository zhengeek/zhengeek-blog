<script setup lang="ts">
import heroImage from '../assets/hero.png'

const projectCards = [
  {
    index: '01',
    title: '个人工作室门面',
    status: 'Studio Site',
    description: '用清晰首屏、项目案例、联系入口和稳定视觉系统，把个人能力包装成可合作的工作室入口。',
    tags: ['Vue3', 'Responsive UI', 'Visual Design'],
    to: '/projects'
  },
  {
    index: '02',
    title: '全栈内容系统',
    status: 'Admin MVP',
    description: 'Spring Boot + MySQL 支撑文章持久化，Admin 管理台负责新建、保存、发布和删除。',
    tags: ['Spring Boot', 'MySQL', 'REST API'],
    to: '/blog'
  },
  {
    index: '03',
    title: '前端交互实验',
    status: 'Visual Lab',
    description: '沉淀自定义光标、幕布转场、动效卡片和可视化实验，展示前端制作能力。',
    tags: ['CSS Motion', 'Creative Coding', 'UX'],
    to: '/lab'
  }
]

const milestones = [
  '先稳住 Admin 内容管理闭环',
  '补齐 3 个高质量项目案例',
  '把公开页改成合作型工作室叙事',
  'v1.0 再进入登录鉴权和后台权限'
]

const blogSeeds = [
  'ZhenGeek Devlog：从个人博客到工作室网站',
  'Admin 文章管理：保存、发布、删除反馈如何稳定',
  'Vue3 + TypeScript 页面结构复盘',
  '如何把项目案例写得像真正的作品集'
]

const serviceLines = ['前端页面制作', '个人品牌网站', '全栈内容系统', '交互原型与视觉实验']
</script>

<template>
  <div class="home-page">
    <section id="top" class="hero-section section-shell">
      <div class="hero-copy">
        <p class="eyebrow">ZHENGEEK STUDIO // FRONTEND & FULL-STACK</p>
        <h1>
          <span class="glitch-text" data-text="ZhenGeek">ZhenGeek</span>
          <span class="hero-outline">Studio.</span>
        </h1>
        <p class="hero-lead">
          一个正在成长中的个人工作室网站。我用它展示前端制作能力、全栈项目进度、
          技术复盘和可合作方向，让每一次迭代都变成能被看见的作品。
        </p>
        <div class="service-strip" aria-label="Studio services">
          <span v-for="item in serviceLines" :key="item">{{ item }}</span>
        </div>
        <div class="hero-actions">
          <RouterLink class="primary-action" to="/projects">查看项目案例</RouterLink>
          <RouterLink class="secondary-action" to="/about">了解工作方式</RouterLink>
        </div>
      </div>

      <div class="hero-panel" aria-label="ZhenGeek studio status panel">
        <div class="visual-card">
          <img :src="heroImage" alt="ZhenGeek layered interface visual" />
          <div>
            <span>STUDIO SIGNAL</span>
            <strong>Design the interface. Ship the system.</strong>
          </div>
        </div>
        <div class="terminal-card">
          <div class="terminal-bar">
            <span></span><span></span><span></span>
          </div>
          <pre><code>&gt; boot studio
[OK] focus: frontend craft + full-stack content
[OK] current: Admin article workflow
[OK] cases: studio site / blog system / visual lab
[RUN] next: polish, document, attract</code></pre>
        </div>
      </div>
    </section>

    <section id="about" class="about-section section-shell">
      <div class="section-kicker">ABOUT // STUDIO OPERATOR</div>
      <div class="split-grid">
        <div>
          <h2>我把 ZhenGeek 当成自己的第一个长期工作室产品来打磨。</h2>
        </div>
        <div class="story-card">
          <p>
            这里不是简单的自我介绍页，而是一个持续进化的能力展示场：页面设计、组件组织、
            后台内容管理、项目复盘和视觉实验都会在这里留下痕迹。
          </p>
          <p>
            当前阶段我先把 Admin 文章管理稳定下来，再把公开页面升级成更适合合作、展示和吸引他人的工作室门面。
          </p>
          <RouterLink class="text-link" to="/about">查看可信度与工作方式 →</RouterLink>
        </div>
      </div>
    </section>

    <section id="projects" class="projects-section section-shell">
      <div class="section-heading-row">
        <div>
          <div class="section-kicker">PROJECTS // CASE STUDIES</div>
          <h2>用 3 个高质量案例，展示前端制作能力和全栈推进能力。</h2>
        </div>
        <RouterLink class="small-action" to="/projects">查看完整案例</RouterLink>
      </div>

      <div class="project-grid">
        <article v-for="project in projectCards" :key="project.title" class="feature-card">
          <div class="card-topline">
            <span>{{ project.index }}</span>
            <span>{{ project.status }}</span>
          </div>
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <div class="tag-row">
            <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
          </div>
          <RouterLink class="card-link" :to="project.to">Open detail →</RouterLink>
        </article>
      </div>
    </section>

    <section id="blog" class="blog-section section-shell">
      <div class="section-kicker">BLOG // BUILD IN PUBLIC</div>
      <div class="split-grid reverse">
        <div class="blog-list-panel">
          <article v-for="seed in blogSeeds" :key="seed" class="blog-seed">
            <span>DEVLOG</span>
            <strong>{{ seed }}</strong>
          </article>
        </div>
        <div>
          <h2>博客保留为长期内容沉淀，不抢走工作室门面的主线。</h2>
          <p class="section-text">
            项目案例负责吸引人，Blog 负责证明我真的在持续构建。这里会记录技术复盘、页面迭代、
            后台稳定化过程和每个案例背后的工程判断。
          </p>
          <RouterLink class="primary-action inline" to="/blog">阅读构建记录</RouterLink>
        </div>
      </div>
    </section>

    <section id="lab" class="lab-section section-shell">
      <div class="section-heading-row">
        <div>
          <div class="section-kicker">LAB // FRONTEND CRAFT</div>
          <h2>实验室用于沉淀动效、交互、可视化和未来更有辨识度的前端作品。</h2>
        </div>
        <RouterLink class="small-action" to="/lab">进入 Lab</RouterLink>
      </div>
      <div class="milestone-rail">
        <div v-for="(item, index) in milestones" :key="item" class="milestone-item">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <p>{{ item }}</p>
        </div>
      </div>
    </section>

    <section id="contact" class="contact-section section-shell">
      <p class="eyebrow">CONTACT // OPEN FOR COLLABORATION</p>
      <h2>如果你想看一个人如何把想法做成网站，这里会持续更新。</h2>
      <p>
        我目前适合参与个人品牌页、作品集、前端交互原型、内容型网站和小型全栈系统的制作。
        ZhenGeek 会持续展示我的作品、复盘和可合作能力。
      </p>
      <div class="hero-actions center-actions">
        <RouterLink class="primary-action" to="/projects">先看项目案例</RouterLink>
        <a class="secondary-action" href="mailto:hello@zhengeek.local">hello@zhengeek.local</a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  overflow: hidden;
}

.section-shell {
  width: min(1180px, calc(100% - 2rem));
  margin: 0 auto;
  padding: clamp(4rem, 8vw, 7rem) 0;
  scroll-margin-top: 92px;
}

.hero-section {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
  align-items: center;
  gap: clamp(2rem, 6vw, 5rem);
  min-height: calc(100vh - 76px);
}

.hero-copy {
  min-width: 0;
}

.eyebrow,
.section-kicker {
  margin: 0 0 1rem;
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  max-width: 100%;
  margin-bottom: 1.4rem;
  font-family: var(--font-display);
  font-size: clamp(4.8rem, 11vw, 10rem);
  line-height: 0.84;
  letter-spacing: -0.08em;
}

.hero-outline {
  display: block;
  color: transparent;
  -webkit-text-stroke: 1px rgba(250, 250, 250, 0.55);
}

.hero-lead,
.section-text,
.contact-section p,
.story-card p {
  color: #d4d4d8;
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  line-height: 1.9;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-top: 2rem;
}

.service-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.3rem;
}

.service-strip span {
  border: 1px solid rgba(204, 255, 0, 0.34);
  border-radius: 999px;
  background: rgba(204, 255, 0, 0.08);
  color: #f4ff9b;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  font-weight: 800;
  padding: 0.42rem 0.66rem;
}

.primary-action,
.secondary-action,
.small-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0.85rem 1.2rem;
  border: 2px solid #fafafa;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 900;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.primary-action {
  background: var(--vg-accent);
  color: #09090b;
  box-shadow: 5px 5px 0 #fafafa;
}

.secondary-action,
.small-action {
  background: rgba(250, 250, 250, 0.04);
  color: #fafafa;
}

.primary-action:hover,
.secondary-action:hover,
.small-action:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 rgba(204, 255, 0, 0.5);
}

.primary-action.inline {
  margin-top: 1rem;
}

.hero-panel {
  display: grid;
  gap: clamp(1.1rem, 3vw, 1.8rem);
  align-items: center;
  justify-items: end;
  min-width: 0;
}

.visual-card,
.terminal-card,
.story-card,
.feature-card,
.blog-list-panel,
.milestone-item,
.contact-section {
  border: 2px solid rgba(250, 250, 250, 0.9);
  background: rgba(24, 24, 27, 0.74);
  box-shadow: 10px 10px 0 rgba(250, 250, 250, 0.12);
  backdrop-filter: blur(16px);
}

.visual-card {
  display: grid;
  grid-template-columns: minmax(120px, 180px) minmax(0, 1fr);
  gap: 1rem;
  width: min(100%, 520px);
  align-items: center;
  border-radius: 28px;
  padding: 1rem;
  background:
    linear-gradient(135deg, rgba(204, 255, 0, 0.12), rgba(176, 0, 255, 0.16)),
    rgba(24, 24, 27, 0.78);
}

.visual-card img {
  width: 100%;
  max-height: 180px;
  object-fit: contain;
}

.visual-card span {
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 800;
}

.visual-card strong {
  display: block;
  margin-top: 0.8rem;
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  line-height: 1;
}

.terminal-card {
  width: min(100%, 500px);
  border-radius: 28px;
  overflow: hidden;
  transform: rotate(1.5deg);
}

.terminal-bar {
  display: flex;
  gap: 0.45rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(250, 250, 250, 0.12);
}

.terminal-bar span {
  width: 12px;
  height: 12px;
  border: 1px solid #fafafa;
  border-radius: 999px;
  background: var(--vg-accent);
}

pre {
  margin: 0;
  padding: 1.25rem;
  white-space: pre-wrap;
  color: #e4e4e7;
  font-family: var(--font-mono);
  font-size: 0.88rem;
  line-height: 1.8;
}

.split-grid,
.section-heading-row {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: clamp(1.5rem, 5vw, 4rem);
  align-items: start;
}

.split-grid.reverse {
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
}

h2 {
  font-family: var(--font-display);
  font-size: clamp(2.3rem, 5vw, 5rem);
  line-height: 1;
  letter-spacing: -0.05em;
}

.story-card,
.blog-list-panel,
.contact-section {
  border-radius: 32px;
  padding: clamp(1.3rem, 3vw, 2rem);
}

.text-link,
.card-link {
  color: var(--vg-accent);
  font-weight: 900;
  text-decoration: none;
}

.section-heading-row {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  margin-bottom: 2rem;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.feature-card {
  display: flex;
  min-height: 380px;
  flex-direction: column;
  border-radius: 30px;
  padding: 1.4rem;
}

.card-topline {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.8rem;
}

.feature-card h3 {
  margin: 2.5rem 0 1rem;
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2.5vw, 2.15rem);
  line-height: 1.05;
}

.feature-card p {
  color: #d4d4d8;
  line-height: 1.75;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: auto 0 1.4rem;
}

.tag-row span {
  padding: 0.35rem 0.6rem;
  border: 1px solid rgba(250, 250, 250, 0.2);
  border-radius: 999px;
  color: #f4f4f5;
  font-family: var(--font-mono);
  font-size: 0.72rem;
}

.blog-seed {
  display: grid;
  gap: 0.4rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(250, 250, 250, 0.12);
}

.blog-seed:last-child {
  border-bottom: 0;
}

.blog-seed span,
.milestone-item span {
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.blog-seed strong {
  font-size: 1.05rem;
  line-height: 1.55;
}

.milestone-rail {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.milestone-item {
  min-height: 180px;
  border-radius: 26px;
  padding: 1.2rem;
}

.milestone-item p {
  margin-top: 2.5rem;
  color: #f4f4f5;
  font-weight: 800;
  line-height: 1.6;
}

.contact-section {
  width: min(900px, calc(100% - 2rem));
  margin-bottom: 5rem;
  text-align: center;
}

.contact-section h2 {
  margin-inline: auto;
}

.contact-section p {
  max-width: 680px;
  margin-inline: auto;
}

.center-actions {
  justify-content: center;
}

@media (max-width: 980px) {
  .hero-section,
  .split-grid,
  .split-grid.reverse,
  .project-grid,
  .milestone-rail {
    grid-template-columns: 1fr;
  }

  .section-heading-row {
    grid-template-columns: 1fr;
    align-items: start;
  }
}

@media (max-width: 640px) {
  .section-shell {
    width: min(100% - 1rem, 1180px);
  }

  h1 {
    font-size: 4rem;
  }

  .terminal-card {
    transform: none;
    margin-bottom: 1rem;
  }

  .visual-card {
    grid-template-columns: 1fr;
  }

  .hero-panel {
    justify-items: stretch;
  }

  .hero-actions {
    flex-direction: column;
  }
}
</style>
