<script setup lang="ts">
import InfoCard from '../components/common/InfoCard.vue'
import SectionHeader from '../components/common/SectionHeader.vue'
import StatusPill from '../components/common/StatusPill.vue'
import TagList from '../components/common/TagList.vue'
import { backendPlan, mainProject, sideProjects } from '../data/projects'
</script>

<template>
  <main class="projects-page">
    <section class="projects-hero project-shell">
      <p class="eyebrow">PROJECTS // STUDIO CASES</p>
      <div class="hero-grid">
        <div>
          <h1>这里展示的不是练习清单，而是我正在打磨的工作室案例。</h1>
          <p class="hero-lead">
            每个案例都围绕真实目标组织：页面要能吸引人，系统要能维护内容，交互要能体现前端制作能力。
            当前先放 3 个高质量方向，后续再补截图、文章和上线记录。
          </p>
        </div>
        <InfoCard class="status-panel">
          <span>STUDIO STATUS</span>
          <strong>可展示的 MVP</strong>
          <p>当前重点：先稳定 Admin 文章管理，再把公开站内容升级成能吸引合作的作品集。</p>
        </InfoCard>
      </div>
    </section>

    <section class="project-shell featured-project">
      <div class="featured-header">
        <SectionHeader eyebrow="FEATURED PROJECT // 01" :title="mainProject.name" :description="mainProject.summary" />
        <StatusPill :text="mainProject.status" />
      </div>

      <TagList class="stack-row main-stack" :tags="mainProject.stack" />

      <div class="progress-grid">
        <InfoCard class="progress-card">
          <h3>[ DONE ]</h3>
          <ul>
            <li v-for="item in mainProject.done" :key="item">{{ item }}</li>
          </ul>
        </InfoCard>
        <InfoCard class="progress-card accent-card">
          <h3>[ NEXT ]</h3>
          <ul>
            <li v-for="item in mainProject.next" :key="item">{{ item }}</li>
          </ul>
        </InfoCard>
      </div>
    </section>

    <section class="project-shell roadmap-section">
      <div class="section-title-row">
        <div>
          <SectionHeader eyebrow="CASE STUDIES // 03 DIRECTIONS" title="先准备 3 个能讲清楚能力的项目案例。" />
        </div>
      </div>

      <div class="side-project-grid">
        <InfoCard v-for="project in sideProjects" :key="project.title" class="side-project-card">
          <div class="case-visual" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="card-topline">
            <span>{{ project.status }}</span>
          </div>
          <h3>{{ project.title }}</h3>
          <p>{{ project.desc }}</p>
          <TagList class="mini-stack" :tags="project.stack" />
          <strong>{{ project.goal }}</strong>
        </InfoCard>
      </div>
    </section>

    <section class="project-shell backend-section">
      <div class="backend-copy">
        <SectionHeader eyebrow="ADMIN FLOW // V0.9 STABILIZATION" title="后台不是门面主角，但它决定内容能不能长期维护。" />
        <p>
          ZhenGeek 已经从静态页面推进到 Spring Boot + MySQL 的全栈雏形。
          当前最重要的是稳定文章保存、发布、删除、错误提示和列表布局，让公开站的内容可以持续更新。
        </p>
      </div>
      <InfoCard class="api-panel">
        <span class="panel-label">API DRAFT</span>
        <code v-for="item in backendPlan" :key="item">{{ item }}</code>
      </InfoCard>
    </section>
  </main>
</template>

<style scoped>
.projects-page {
  padding-bottom: 5rem;
}

.project-shell {
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
h2,
h3 {
  font-family: var(--font-display);
  letter-spacing: -0.055em;
}

h1 {
  max-width: 840px;
  margin-bottom: 1.4rem;
  font-size: clamp(3rem, 8vw, 7.2rem);
  line-height: 0.92;
}

h2 {
  max-width: 820px;
  margin-bottom: 1rem;
  font-size: clamp(2.2rem, 5vw, 4.8rem);
  line-height: 1;
}

h3 {
  font-size: clamp(1.4rem, 2.5vw, 2.1rem);
  line-height: 1.05;
}

.hero-lead,
.featured-header p,
.backend-copy p,
.status-panel p,
.side-project-card p,
.side-project-card strong {
  color: var(--vg-text-soft);
  font-size: 1rem;
  line-height: 1.85;
}

.projects-hero {
  min-height: calc(100vh - 76px);
  display: grid;
  align-items: center;
}

.hero-grid,
.backend-section {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 380px);
  gap: 1.5rem;
  align-items: end;
}

.status-panel,
.featured-project,
.progress-card,
.side-project-card,
.api-panel {
  border: 1px solid var(--vg-card-border);
  background: var(--vg-panel);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.36), 0 0 34px rgba(0, 210, 255, 0.08);
  backdrop-filter: blur(16px);
}

.status-panel {
  border-radius: 32px;
  padding: 1.5rem;
  transform: rotate(1.5deg);
}

.status-panel span,
.panel-label,
.card-topline span,
.project-badge {
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 800;
}

.status-panel strong {
  display: block;
  margin: 1rem 0;
  font-family: var(--font-display);
  font-size: 2rem;
  line-height: 1;
}

.featured-project {
  border-radius: 36px;
  padding: clamp(1.4rem, 4vw, 2.4rem);
}

.featured-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
}

.project-badge {
  flex: 0 0 auto;
  padding: 0.65rem 0.9rem;
  border: 1px solid rgba(0, 210, 255, 0.44);
  border-radius: 999px;
  background: rgba(0, 210, 255, 0.08);
}

.stack-row,
.mini-stack {
  --tag-padding: 0.42rem 0.72rem;
  --tag-font-size: 0.75rem;
}

.stack-row {
  margin: 2rem 0;
}

.progress-grid,
.side-project-grid {
  display: grid;
  gap: 1rem;
}

.progress-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.progress-card {
  border-radius: 28px;
  padding: 1.35rem;
}

.accent-card {
  background: linear-gradient(135deg, rgba(0, 210, 255, 0.12), rgba(176, 38, 255, 0.12), var(--vg-panel-strong));
}

.progress-card h3 {
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 1rem;
  letter-spacing: 0;
}

.progress-card ul {
  display: grid;
  gap: 0.85rem;
  margin: 1.2rem 0 0;
  padding-left: 1.2rem;
  color: #e7e9ff;
  line-height: 1.75;
}

.section-title-row {
  margin-bottom: 2rem;
}

.side-project-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.side-project-card {
  display: flex;
  min-height: 360px;
  flex-direction: column;
  border-radius: 30px;
  padding: 1.35rem;
}

.case-visual {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 0.5rem;
  min-height: 120px;
  margin-bottom: 1.2rem;
}

.case-visual span {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  background:
    linear-gradient(135deg, rgba(0, 210, 255, 0.18), rgba(176, 38, 255, 0.2), rgba(255, 42, 133, 0.14)),
    rgba(5, 5, 15, 0.72);
}

.case-visual span:first-child {
  grid-row: span 2;
}

.case-visual span:nth-child(2) {
  background: rgba(0, 210, 255, 0.12);
}

.side-project-card h3 {
  margin: 1rem 0;
}

.side-project-card strong {
  display: block;
  margin-top: auto;
  color: #ffffff;
}

.mini-stack {
  margin: 1.2rem 0;
}

.backend-section {
  align-items: start;
}

.api-panel {
  display: grid;
  gap: 0.7rem;
  border-radius: 32px;
  padding: 1.4rem;
}

.api-panel code {
  display: block;
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #e7e9ff;
  font-family: var(--font-mono);
  font-size: 0.85rem;
}

.api-panel code:last-child {
  border-bottom: 0;
}

@media (max-width: 980px) {
  .hero-grid,
  .progress-grid,
  .side-project-grid,
  .backend-section {
    grid-template-columns: 1fr;
  }

  .status-panel {
    transform: none;
  }

  .projects-hero {
    min-height: auto;
  }

  .featured-header {
    flex-direction: column;
  }
}

@media (max-width: 640px) {
  .project-shell {
    width: min(100% - 1rem, 1120px);
    padding: clamp(2.75rem, 12vw, 4rem) 0;
  }

  h1 {
    font-size: 3.25rem;
  }

  h2 {
    font-size: 2.45rem;
  }

  .status-panel,
  .featured-project,
  .progress-card,
  .side-project-card,
  .api-panel {
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.32), 0 0 26px rgba(0, 210, 255, 0.07);
  }

  .case-visual {
    min-height: 96px;
  }

  .api-panel code {
    white-space: normal;
    overflow-wrap: anywhere;
  }
}
</style>
