<script setup lang="ts">
const projectCards = [
  {
    index: '01',
    title: 'ZhenGeek 个人网站',
    status: 'In Progress',
    description: '从个人博客升级为长期作品集平台：展示学习记录、项目成长、生活思考与个人品牌。',
    tags: ['Vue3', 'TypeScript', 'Vite', 'Vue Router'],
    to: '/projects'
  },
  {
    index: '02',
    title: '全栈博客系统',
    status: 'Planned',
    description: '未来接入后端 API、数据库、文章管理、Markdown 写作与留言讨论系统。',
    tags: ['Spring Boot', 'MySQL', 'REST API', 'Markdown'],
    to: '/blog'
  },
  {
    index: '03',
    title: '创意工程实验室',
    status: 'Idea Pool',
    description: '用可视化、算法动画和交互实验，把抽象的技术知识变成看得见的作品。',
    tags: ['Canvas', 'Algorithms', 'Creative Coding'],
    to: '/lab'
  }
]

const milestones = [
  '完成单页面首页与多页面详情架构',
  '沉淀 Vue / TypeScript / 工程化学习记录',
  '逐步加入博客内容、项目文档和后端能力',
  '把 ZhenGeek 打磨成长期作品集和个人品牌'
]

const blogSeeds = [
  'ZhenGeek Devlog 01：为什么我把博客升级成个人网站',
  'Vue3 + Vite 项目初始化踩坑记录',
  '从 App.vue 到组件化首页',
  'Git add / commit / push 到底做了什么'
]
</script>

<template>
  <div class="home-page">
    <section id="top" class="hero-section section-shell">
      <div class="hero-copy">
        <p class="eyebrow">ZHENGEEK.OS // PERSONAL PLATFORM</p>
        <h1>
          <span class="glitch-text" data-text="ZhenGeek">ZhenGeek</span>
          <span class="hero-outline">is loading.</span>
        </h1>
        <p class="hero-lead">
          我正在把这个网站打造成自己的长期工程作品：记录学习、展示项目、沉淀表达，
          也见证我从零走向真正工程师的全过程。
        </p>
        <div class="hero-actions">
          <RouterLink class="primary-action" to="/projects">Explore Projects</RouterLink>
          <RouterLink class="secondary-action" to="/about">了解 About</RouterLink>
        </div>
      </div>

      <div class="hero-panel" aria-label="ZhenGeek status panel">
        <div class="terminal-card">
          <div class="terminal-bar">
            <span></span><span></span><span></span>
          </div>
          <pre><code>&gt; boot zhengeek
[OK] brand: Envision / Nurture / Forge / Pioneer
[OK] stack: Vue3 + TypeScript + Vite
[OK] mode: single-page home + detailed routes
[RUN] mission: become a full-stack engineer</code></pre>
        </div>
        <div class="orbit-card">
          <span class="orbit-core">蓁</span>
          <span class="orbit-dot dot-a"></span>
          <span class="orbit-dot dot-b"></span>
          <span class="orbit-dot dot-c"></span>
        </div>
      </div>
    </section>

    <section id="about" class="about-section section-shell">
      <div class="section-kicker">ABOUT // WHO AM I</div>
      <div class="split-grid">
        <div>
          <h2>不是只做一个博客，而是建立一个可持续成长的个人系统。</h2>
        </div>
        <div class="story-card">
          <p>
            ZhenGeek 来自“蓁”和“真极客”的双重含义。它会承载我的学习路线、技术文章、项目记录、
            审美实验和未来的讨论社区。
          </p>
          <p>
            当前阶段我先用前端把网站的骨架和品牌感做出来，再逐步进入后端、数据库、内容管理和交互功能。
          </p>
          <RouterLink class="text-link" to="/about">进入 About 详情页 →</RouterLink>
        </div>
      </div>
    </section>

    <section id="projects" class="projects-section section-shell">
      <div class="section-heading-row">
        <div>
          <div class="section-kicker">PROJECTS // VISIBLE OUTPUT</div>
          <h2>项目驱动学习，把每一步成长做成看得见的作品。</h2>
        </div>
        <RouterLink class="small-action" to="/projects">查看 Projects</RouterLink>
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
      <div class="section-kicker">BLOG // LEARNING RECORDS</div>
      <div class="split-grid reverse">
        <div class="blog-list-panel">
          <article v-for="seed in blogSeeds" :key="seed" class="blog-seed">
            <span>DEVLOG</span>
            <strong>{{ seed }}</strong>
          </article>
        </div>
        <div>
          <h2>博客不是装饰，是我的复盘系统。</h2>
          <p class="section-text">
            我会把踩坑、理解、阶段总结都写下来。未来这些内容会变成面试表达、项目文档和个人影响力的一部分。
          </p>
          <RouterLink class="primary-action inline" to="/blog">进入 Blog 详情页</RouterLink>
        </div>
      </div>
    </section>

    <section id="lab" class="lab-section section-shell">
      <div class="section-heading-row">
        <div>
          <div class="section-kicker">LAB // CREATIVE ENGINEERING</div>
          <h2>实验室用于探索算法可视化、交互效果和未来硬件方向。</h2>
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
      <p class="eyebrow">NEXT STEP</p>
      <h2>先把首页做漂亮，再让每个详情页逐渐变厚。</h2>
      <p>
        当前版本已经按照“单页面首页，多页面详细内容”的方向组织。后续每次迭代只需要继续填充文章、项目和实验即可。
      </p>
      <div class="hero-actions center-actions">
        <RouterLink class="primary-action" to="/projects">检查项目页</RouterLink>
        <RouterLink class="secondary-action" to="/#top">回到顶部</RouterLink>
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

.terminal-card,
.orbit-card,
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

.orbit-card {
  position: relative;
  display: grid;
  width: min(88vw, 320px);
  aspect-ratio: 1;
  justify-self: start;
  place-items: center;
  border-radius: 50%;
  background:
    linear-gradient(135deg, rgba(204, 255, 0, 0.92), rgba(176, 0, 255, 0.72)),
    #18181b;
  transform: translateX(1rem) rotate(-3deg);
}

.orbit-core {
  display: grid;
  width: 138px;
  height: 138px;
  place-items: center;
  border: 3px solid #09090b;
  border-radius: 50%;
  background: #fafafa;
  color: #09090b;
  font-size: 4rem;
  font-weight: 900;
  box-shadow: 0 0 0 28px rgba(9, 9, 11, 0.12);
}

.orbit-dot {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid #09090b;
  border-radius: 50%;
  background: #fafafa;
}

.dot-a { top: 18%; right: 20%; }
.dot-b { bottom: 19%; right: 14%; background: var(--vg-accent); }
.dot-c { left: 17%; top: 34%; background: #b000ff; }

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
    font-size: clamp(4rem, 21vw, 6rem);
  }

  .terminal-card,
  .orbit-card {
    transform: none;
    margin-bottom: 1rem;
  }

  .hero-panel {
    justify-items: stretch;
  }

  .hero-actions {
    flex-direction: column;
  }
}
</style>
