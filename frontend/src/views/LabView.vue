<script setup lang="ts">
import InfoCard from '../components/common/InfoCard.vue'
import SectionHeader from '../components/common/SectionHeader.vue'
import StatusPill from '../components/common/StatusPill.vue'
import TagList from '../components/common/TagList.vue'
import { buildOrder, experiments, labRules } from '../data/lab'
</script>

<template>
  <main class="lab-page">
    <section class="lab-hero lab-shell">
      <p class="eyebrow">LAB // CREATIVE ENGINEERING</p>
      <div class="hero-grid">
        <div>
          <h1>这里不是玩具箱，而是我训练创造力和工程能力的实验场。</h1>
          <p class="hero-lead">
            Lab 会收集算法可视化、鼠标交互、Canvas 小实验、数据可视化和未来硬件可视化想法。
            它暂时不追求完整产品，而是用小实验探索技术边界，最后把成熟想法升级成项目或文章。
          </p>
        </div>
        <InfoCard class="lab-panel">
          <span>LAB STATUS</span>
          <strong>Experiment Queue</strong>
          <p>当前任务：先建立实验规划页，后续逐个实现小 demo，并记录过程。</p>
        </InfoCard>
      </div>
    </section>

    <section class="lab-shell experiments-section">
      <div class="section-title-row">
        <div>
          <SectionHeader eyebrow="EXPERIMENTS // IDEA MAP" title="实验从小开始，但每一个都要服务于长期路线。" />
        </div>
        <StatusPill text="Step by Step" />
      </div>

      <div class="experiment-grid">
        <InfoCard v-for="item in experiments" :key="item.title" class="experiment-card">
          <div class="card-topline">
            <span>{{ item.status }}</span>
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
          <TagList class="stack-row" :tags="item.stack" />
          <strong>{{ item.value }}</strong>
        </InfoCard>
      </div>
    </section>

    <section class="lab-shell method-section">
      <div class="method-copy">
        <SectionHeader eyebrow="METHOD // HOW LAB WORKS" title="Lab 的重点不是“酷”，而是把探索变成可复用资产。" />
        <p>
          一个实验如果只是好看，很快就会被遗忘。真正有价值的实验应该能变成首页交互、博客文章、项目亮点，
          或者帮助我理解算法、图形、事件、性能和硬件数据表达。
        </p>
      </div>
      <InfoCard class="rules-card">
        <div v-for="(rule, index) in labRules" :key="rule" class="rule-item">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <p>{{ rule }}</p>
        </div>
      </InfoCard>
    </section>

    <section class="lab-shell build-section">
      <SectionHeader eyebrow="BUILD ORDER // NEXT ACTIONS" title="下一步不做大而全，先做第一个能运行的小实验。" />
      <div class="build-grid">
        <InfoCard v-for="(item, index) in buildOrder" :key="item" class="build-card">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <p>{{ item }}</p>
        </InfoCard>
      </div>
    </section>
  </main>
</template>

<style scoped>
.lab-page {
  padding-bottom: 5rem;
}

.lab-shell {
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
  margin-bottom: 1.5rem;
  font-size: clamp(2.2rem, 5vw, 4.7rem);
  line-height: 1;
}

h3 {
  font-size: clamp(1.35rem, 2.5vw, 2rem);
  line-height: 1.08;
}

.hero-lead,
.lab-panel p,
.experiment-card p,
.experiment-card strong,
.method-copy p,
.rule-item p,
.build-card p {
  color: #d4d4d8;
  font-size: 1rem;
  line-height: 1.85;
}

.lab-hero {
  min-height: calc(100vh - 76px);
  display: grid;
  align-items: center;
}

.hero-grid,
.method-section {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 380px);
  gap: 1.5rem;
  align-items: end;
}

.lab-panel,
.experiment-card,
.rules-card,
.build-card {
  border: 2px solid rgba(250, 250, 250, 0.9);
  background: rgba(24, 24, 27, 0.74);
  box-shadow: 10px 10px 0 rgba(250, 250, 250, 0.12);
  backdrop-filter: blur(16px);
}

.lab-panel {
  border-radius: 32px;
  padding: 1.5rem;
  transform: rotate(1.5deg);
}

.lab-panel span,
.status-pill,
.card-topline span,
.rule-item span,
.build-card span {
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 800;
}

.lab-panel strong {
  display: block;
  margin: 1rem 0;
  font-family: var(--font-display);
  font-size: 2rem;
  line-height: 1;
}

.section-title-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-end;
  margin-bottom: 2rem;
}

.status-pill {
  flex: 0 0 auto;
  padding: 0.65rem 0.9rem;
  border: 1px solid rgba(204, 255, 0, 0.55);
  border-radius: 999px;
  background: rgba(204, 255, 0, 0.08);
}

.experiment-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.experiment-card {
  display: flex;
  min-height: 360px;
  flex-direction: column;
  border-radius: 30px;
  padding: 1.35rem;
}

.experiment-card h3 {
  margin: 2.4rem 0 1rem;
}

.experiment-card strong {
  display: block;
  margin-top: auto;
  color: #fafafa;
}

.stack-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.2rem 0;
}

.method-section {
  align-items: start;
}

.rules-card {
  border-radius: 32px;
  padding: 1.2rem;
}

.rule-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.85rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(250, 250, 250, 0.12);
}

.rule-item:last-child {
  border-bottom: 0;
}

.rule-item p {
  margin-bottom: 0;
}

.build-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.build-card {
  min-height: 180px;
  border-radius: 28px;
  padding: 1.2rem;
}

.build-card p {
  margin: 2.5rem 0 0;
  color: #fafafa;
  font-weight: 800;
}

@media (max-width: 980px) {
  .hero-grid,
  .method-section,
  .experiment-grid,
  .build-grid {
    grid-template-columns: 1fr;
  }

  .lab-panel {
    transform: none;
  }

  .lab-hero {
    min-height: auto;
  }

  .section-title-row {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
