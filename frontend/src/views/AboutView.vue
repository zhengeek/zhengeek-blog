<script setup lang="ts">
const principles = [
  {
    word: 'Envision',
    cn: '梦想',
    text: '先看见自己想成为怎样的人，再把模糊的热情变成可以执行的路线。'
  },
  {
    word: 'Nurture',
    cn: '成长',
    text: '承认自己仍在起步阶段，用长期记录、复盘和练习持续积累。'
  },
  {
    word: 'Forge',
    cn: '锻造',
    text: '把知识放进真实项目里反复打磨，训练工程能力、表达能力和解决问题的耐心。'
  },
  {
    word: 'Pioneer',
    cn: '开拓',
    text: '不只满足于完成作业，而是探索软件、硬件、算法和创造力结合的可能性。'
  }
]

const learningTracks = [
  'Frontend Engineering：Vue3、TypeScript、CSS、交互体验与组件化开发',
  'Backend Foundation：Java、Spring Boot、API 设计、数据库与权限系统',
  'Computer Science Basics：数据结构、算法、操作系统、网络与工程常识',
  'Creative Engineering：Canvas、可视化、算法动画和个人网站视觉实验'
]

const timeline = [
  {
    stage: 'Now',
    title: '前端静态 V1',
    detail: '完成首页、多页面路由、About / Projects / Blog / Lab 的内容骨架。'
  },
  {
    stage: 'Next',
    title: '内容与组件整理',
    detail: '把项目、文章、时间线整理成清晰的数据结构，为后端接口做准备。'
  },
  {
    stage: 'Later',
    title: '全栈化升级',
    detail: '接入 Spring Boot、MySQL、文章 API、评论/留言和后台管理。'
  }
]
</script>

<template>
  <main class="about-page">
    <section class="about-hero about-shell">
      <p class="eyebrow">ABOUT // ZHENGEEK OPERATOR</p>
      <div class="about-hero-grid">
        <div>
          <h1>我正在把自己，锻造成一个能独立完成真实项目的工程型创作者。</h1>
          <p class="hero-lead">
            我是小蓁，一名正在通过 <strong>ZhenGeek</strong> 长期项目训练自己的大一学生。
            这个网站不是临时作业，而是我学习前端、后端、工程化、表达和个人品牌建设的主线项目。
          </p>
        </div>
        <aside class="identity-card">
          <span class="card-label">CURRENT PROFILE</span>
          <strong>Freshman / Big Data Major</strong>
          <p>目标：成长为理解软件与硬件、能独立完成完整项目的全栈工程师。</p>
          <div class="identity-tags">
            <span>Vue3</span>
            <span>TypeScript</span>
            <span>Full-stack</span>
            <span>Engineering Portfolio</span>
          </div>
        </aside>
      </div>
    </section>

    <section class="about-shell story-section">
      <div class="section-title-block">
        <p class="eyebrow">WHY // THIS PROJECT EXISTS</p>
        <h2>ZhenGeek 是我的长期成长容器。</h2>
      </div>
      <div class="story-grid">
        <article class="story-panel large-panel">
          <h3>它不只是博客。</h3>
          <p>
            ZhenGeek 会记录我的技术学习、项目作品、生活思考、审美实验和未来的社区互动。
            我希望它像一个公开的成长系统：别人能看到我做了什么，我自己也能通过复盘看见进步。
          </p>
          <p>
            “ZhenGeek”来自名字里的“蓁”，也有“真极客”的意思。它提醒我：不要只停留在想象里，
            要把想法变成页面、代码、文档和可以展示的结果。
          </p>
        </article>
        <article class="story-panel mission-panel">
          <span class="card-label">MISSION</span>
          <h3>用一个长期项目，串起我的大学成长路线。</h3>
          <p>先做出能看的前端，再逐步接入后端、数据库、文章系统、评论系统，最后形成完整作品集。</p>
        </article>
      </div>
    </section>

    <section class="about-shell principles-section">
      <p class="eyebrow">CORE WORDS // ENFP</p>
      <h2>Envision. Nurture. Forge. Pioneer.</h2>
      <div class="principle-grid">
        <article v-for="item in principles" :key="item.word" class="principle-card">
          <span>{{ item.cn }}</span>
          <h3>{{ item.word }}.</h3>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section class="about-shell route-section">
      <div class="route-copy">
        <p class="eyebrow">ROUTE // WHAT I AM BUILDING</p>
        <h2>我选择项目驱动，而不是只堆零散知识点。</h2>
        <p>
          当前阶段，我会先用 ZhenGeek 训练前端工程能力：页面结构、组件拆分、路由组织、视觉设计和内容表达。
          等静态内容稳定后，再接入后端 API 和数据库，把它升级成真正的全栈博客系统。
        </p>
      </div>
      <div class="track-list">
        <div v-for="track in learningTracks" :key="track" class="track-item">
          <span>►</span>
          <p>{{ track }}</p>
        </div>
      </div>
    </section>

    <section class="about-shell timeline-section">
      <p class="eyebrow">ROADMAP // FROM STATIC TO FULL-STACK</p>
      <div class="timeline-grid">
        <article v-for="item in timeline" :key="item.stage" class="timeline-card">
          <span>{{ item.stage }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.detail }}</p>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.about-page {
  padding-bottom: 5rem;
}

.about-shell {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
  padding: clamp(3.5rem, 7vw, 6rem) 0;
}

.eyebrow {
  margin: 0 0 1rem;
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.1em;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1,
h2 {
  font-family: var(--font-display);
  letter-spacing: -0.055em;
}

h1 {
  max-width: 820px;
  margin-bottom: 1.4rem;
  font-size: clamp(3rem, 8vw, 7.5rem);
  line-height: 0.92;
}

h2 {
  max-width: 780px;
  margin-bottom: 1.5rem;
  font-size: clamp(2.2rem, 5vw, 4.8rem);
  line-height: 1;
}

h3 {
  font-family: var(--font-display);
  font-size: clamp(1.45rem, 2.5vw, 2.2rem);
  line-height: 1.05;
}

.hero-lead,
.story-panel p,
.route-copy p,
.track-item p,
.timeline-card p,
.principle-card p,
.identity-card p {
  color: #d4d4d8;
  font-size: 1rem;
  line-height: 1.85;
}

.about-hero {
  min-height: calc(100vh - 76px);
  display: grid;
  align-items: center;
}

.about-hero-grid,
.story-grid,
.route-section,
.timeline-grid {
  display: grid;
  gap: 1rem;
}

.about-hero-grid {
  grid-template-columns: minmax(0, 1fr) minmax(300px, 380px);
  align-items: end;
}

.identity-card,
.story-panel,
.principle-card,
.track-list,
.timeline-card {
  border: 2px solid rgba(250, 250, 250, 0.9);
  background: rgba(24, 24, 27, 0.74);
  box-shadow: 10px 10px 0 rgba(250, 250, 250, 0.12);
  backdrop-filter: blur(16px);
}

.identity-card {
  border-radius: 32px;
  padding: 1.5rem;
  transform: rotate(1.5deg);
}

.card-label {
  display: inline-block;
  margin-bottom: 1rem;
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 800;
}

.identity-card strong {
  display: block;
  margin-bottom: 1rem;
  font-family: var(--font-display);
  font-size: 2rem;
  line-height: 1;
}

.identity-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.identity-tags span {
  padding: 0.38rem 0.65rem;
  border: 1px solid rgba(250, 250, 250, 0.22);
  border-radius: 999px;
  color: #f4f4f5;
  font-family: var(--font-mono);
  font-size: 0.72rem;
}

.section-title-block {
  margin-bottom: 1rem;
}

.story-grid {
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
}

.story-panel {
  border-radius: 30px;
  padding: clamp(1.4rem, 3vw, 2rem);
}

.large-panel {
  background:
    linear-gradient(135deg, rgba(204, 255, 0, 0.08), rgba(24, 24, 27, 0.78));
}

.mission-panel {
  background:
    linear-gradient(135deg, rgba(176, 0, 255, 0.2), rgba(24, 24, 27, 0.82));
}

.principle-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.principle-card {
  min-height: 260px;
  border-radius: 28px;
  padding: 1.25rem;
}

.principle-card span {
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.8rem;
}

.principle-card h3 {
  margin: 3rem 0 1rem;
}

.route-section {
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  align-items: start;
}

.track-list {
  border-radius: 32px;
  padding: 1.2rem;
}

.track-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.8rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(250, 250, 250, 0.12);
}

.track-item:last-child {
  border-bottom: 0;
}

.track-item span {
  color: var(--vg-accent);
}

.track-item p {
  margin-bottom: 0;
}

.timeline-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 1.5rem;
}

.timeline-card {
  min-height: 220px;
  border-radius: 28px;
  padding: 1.35rem;
}

.timeline-card span {
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-weight: 800;
}

.timeline-card h3 {
  margin: 2.5rem 0 1rem;
}

@media (max-width: 980px) {
  .about-hero-grid,
  .story-grid,
  .principle-grid,
  .route-section,
  .timeline-grid {
    grid-template-columns: 1fr;
  }

  .identity-card {
    transform: none;
  }

  .about-hero {
    min-height: auto;
  }
}
</style>
