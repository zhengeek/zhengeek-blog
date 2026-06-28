<script setup lang="ts">
const principles = [
  {
    word: 'Clarity',
    cn: '清晰',
    text: '先把目标、受众和内容结构讲清楚，再进入页面设计和工程实现。'
  },
  {
    word: 'Craft',
    cn: '制作',
    text: '重视界面完成度、响应式体验、组件拆分和真实可用的交互细节。'
  },
  {
    word: 'System',
    cn: '系统',
    text: '不只做漂亮页面，也关注后台内容流、数据结构和长期维护方式。'
  },
  {
    word: 'Record',
    cn: '复盘',
    text: '用博客和项目文档记录过程，让能力不只停留在结果截图里。'
  }
]

const learningTracks = [
  '前端制作：Vue3、TypeScript、响应式布局、CSS 视觉系统与交互动效',
  '内容型网站：个人品牌页、作品集、博客系统、项目案例与联系转化',
  '全栈基础：Spring Boot、REST API、MySQL、后台文章管理与错误反馈',
  '创意表达：页面转场、自定义光标、可视化实验和更有辨识度的界面语言'
]

const timeline = [
  {
    stage: 'Now',
    title: 'v0.9 稳定后台',
    detail: '先把 Admin 保存、发布、删除、错误提示和列表布局打磨稳定。'
  },
  {
    stage: 'Next',
    title: '工作室门面升级',
    detail: '把首页、About、Projects 改成更适合合作和展示的叙事结构。'
  },
  {
    stage: 'Later',
    title: 'v1.0 登录鉴权',
    detail: '在内容管理稳定后，再做管理员登录、JWT、路由守卫和接口鉴权。'
  }
]
</script>

<template>
  <main class="about-page">
    <section class="about-hero about-shell">
      <p class="eyebrow">ABOUT // STUDIO OPERATOR</p>
      <div class="about-hero-grid">
        <div>
          <h1>我是 ZhenGeek，一个正在成长的前端与全栈个人工作室。</h1>
          <p class="hero-lead">
            我用 <strong>ZhenGeek</strong> 训练并展示真实项目能力：从页面视觉、交互体验、
            内容结构，到 Spring Boot + MySQL 的后台文章管理。它既是作品集，也是我的长期工作台。
          </p>
        </div>
        <aside class="identity-card">
          <span class="card-label">CURRENT PROFILE</span>
          <strong>Frontend Maker / Full-stack Learner</strong>
          <p>目标：做出能吸引人、能维护内容、能长期迭代的个人品牌与内容型网站。</p>
          <div class="identity-tags">
            <span>Vue3</span>
            <span>TypeScript</span>
            <span>Studio Site</span>
            <span>Admin System</span>
          </div>
        </aside>
      </div>
    </section>

    <section class="about-shell story-section">
      <div class="section-title-block">
        <p class="eyebrow">WHY // THIS PROJECT EXISTS</p>
        <h2>ZhenGeek 是我的第一个工作室产品。</h2>
      </div>
      <div class="story-grid">
        <article class="story-panel large-panel">
          <h3>它不是只给自己看的博客。</h3>
          <p>
            我希望访客打开网站时，能快速看见我的审美、前端完成度、项目推进能力和表达能力。
            所以公开页面负责吸引人，Projects 负责展示案例，Blog 负责沉淀过程。
          </p>
          <p>
            “ZhenGeek”来自名字里的“蓁”，也有“真极客”的意思。它提醒我把想法变成页面、
            代码、文档和可持续维护的系统，而不是只停留在灵感里。
          </p>
        </article>
        <article class="story-panel mission-panel">
          <span class="card-label">MISSION</span>
          <h3>把“会做网页”升级成“能交付一个完整网站体验”。</h3>
          <p>先稳后台内容管理，再让公开站具备更清晰的定位、案例、联系方式和持续更新能力。</p>
        </article>
      </div>
    </section>

    <section class="about-shell principles-section">
      <p class="eyebrow">WORK STYLE // HOW I BUILD</p>
      <h2>Clarity. Craft. System. Record.</h2>
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
        <p class="eyebrow">CAPABILITY // WHAT I CAN BUILD</p>
        <h2>我优先做能被真实访问、真实维护、真实展示的东西。</h2>
        <p>
          如果把 ZhenGeek 看成我的第一个客户项目，它的需求很清楚：展示个人能力、管理内容、
          吸引合作、持续更新。我的学习路线也围绕这些真实需求展开。
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
      <p class="eyebrow">ROADMAP // STABILIZE THEN EXPAND</p>
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
  border: 1px solid var(--vg-card-border);
  background: var(--vg-panel);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.36), 0 0 34px rgba(0, 243, 255, 0.08);
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
  border: 1px solid rgba(176, 38, 255, 0.26);
  border-radius: 999px;
  background: rgba(176, 38, 255, 0.08);
  color: #eef7ff;
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
    linear-gradient(135deg, rgba(0, 243, 255, 0.1), var(--vg-panel-strong));
}

.mission-panel {
  background:
    linear-gradient(135deg, rgba(176, 38, 255, 0.18), rgba(255, 0, 127, 0.1), var(--vg-panel-strong));
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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

@media (max-width: 640px) {
  .about-shell {
    width: min(100% - 1rem, 1120px);
    padding: clamp(2.75rem, 12vw, 4rem) 0;
  }

  h1 {
    font-size: 3.4rem;
  }

  h2 {
    font-size: 2.55rem;
  }

  .identity-card,
  .story-panel,
  .principle-card,
  .track-list,
  .timeline-card {
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.32), 0 0 26px rgba(0, 243, 255, 0.07);
  }

  .identity-card strong {
    font-size: 1.65rem;
  }
}
</style>
