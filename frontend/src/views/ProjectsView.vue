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
      <p class="eyebrow">项目 // 工程作品集</p>
      <div class="hero-grid">
        <div>
          <h1>我不只是在做网页，我在积累一个长期可展示的工程作品集。</h1>
          <p class="hero-lead">
            这一页记录 ZhenGeek 的当前进度、技术栈、下一步计划，以及未来会逐渐加入的实验项目。
            每个项目都不是孤立练习，而是服务于“成为全栈工程师”的长期路线。
          </p>
        </div>
        <InfoCard class="status-panel">
          <span>V1 STATUS</span>
          <strong>前端静态原型</strong>
          <p>当前重点：先把内容、页面结构和作品集表达打磨清楚，再进入后端阶段。</p>
        </InfoCard>
      </div>
    </section>

    <section class="project-shell featured-project">
      <div class="featured-header">
        <SectionHeader eyebrow="重点项目 // 01" :title="mainProject.name" :description="mainProject.summary" />
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
          <SectionHeader eyebrow="未来模块 // 项目地图" title="接下来会围绕 ZhenGeek 拓展三个方向。" />
        </div>
      </div>

      <div class="side-project-grid">
        <InfoCard v-for="project in sideProjects" :key="project.title" class="side-project-card">
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
        <SectionHeader eyebrow="后端计划 // 不急，但会做" title="后端不会现在硬接，而是在内容模型稳定后接入。" />
        <p>
          当前阶段先用静态数据模拟真实内容。等 About、Projects、Blog 页面稳定后，
          再把这些静态数据迁移到后端 API 和数据库里。这样不会为了写后端而写后端，
          而是让后端真正服务于内容管理和网站扩展。
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
  color: #d4d4d8;
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
  border: 2px solid rgba(250, 250, 250, 0.9);
  background: rgba(24, 24, 27, 0.74);
  box-shadow: 10px 10px 0 rgba(250, 250, 250, 0.12);
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
  border: 1px solid rgba(204, 255, 0, 0.55);
  border-radius: 999px;
  background: rgba(204, 255, 0, 0.08);
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
  background: linear-gradient(135deg, rgba(204, 255, 0, 0.12), rgba(24, 24, 27, 0.8));
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
  color: #e4e4e7;
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

.side-project-card h3 {
  margin: 2.4rem 0 1rem;
}

.side-project-card strong {
  display: block;
  margin-top: auto;
  color: #fafafa;
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
  border-bottom: 1px solid rgba(250, 250, 250, 0.12);
  color: #e4e4e7;
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
</style>
