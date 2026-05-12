<script setup lang="ts">
const experiments = [
  {
    title: 'Algorithm Visualizer',
    status: 'Planned',
    desc: '用动画展示排序、搜索、图遍历等算法过程，让抽象逻辑变成可观察的运行轨迹。',
    stack: ['Vue3', 'Canvas', 'Algorithms'],
    value: '训练算法理解、交互设计和技术讲解能力。'
  },
  {
    title: 'Mouse Interaction System',
    status: 'Prototype',
    desc: '围绕自定义光标、悬停反馈、轨迹残影和页面微交互，形成 ZhenGeek 的专属操作手感。',
    stack: ['CSS', 'Pointer Events', 'Animation'],
    value: '提升网站记忆点，同时学习浏览器事件和动效性能。'
  },
  {
    title: 'Creative Canvas Playground',
    status: 'Idea Pool',
    desc: '收集粒子、波纹、噪声、几何图形和数据图案等 Canvas 小实验。',
    stack: ['Canvas', 'JavaScript', 'Math'],
    value: '把数学、视觉和代码连接起来，形成创意工程能力。'
  },
  {
    title: 'Data Visualization Notes',
    status: 'Later',
    desc: '把学习数据、项目进度和生活记录转化成可视化图表，服务于长期复盘。',
    stack: ['Charts', 'Data', 'Frontend'],
    value: '让个人网站不仅展示结果，也展示成长趋势。'
  },
  {
    title: 'FPGA / Embedded Web Monitor',
    status: 'Future',
    desc: '未来尝试把硬件信号、传感器数据或嵌入式系统状态用网页方式可视化。',
    stack: ['FPGA', 'Embedded', 'Web UI'],
    value: '连接软件与硬件方向，为后续工程路线埋点。'
  }
]

const labRules = [
  '每个实验都必须能解释：它练了什么能力。',
  '先做小 demo，不一开始追求大型复杂系统。',
  '实验结果可以失败，但必须留下记录和复盘。',
  '优秀实验会被升级为首页效果、博客素材或独立项目。'
]

const buildOrder = [
  '先整理实验列表和目标',
  '实现一个最小 Canvas / CSS 动效 demo',
  '为实验补充说明、截图和源码入口',
  '把成熟实验沉淀到 Projects 或 Blog 页面'
]
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
        <aside class="lab-panel">
          <span>LAB STATUS</span>
          <strong>Experiment Queue</strong>
          <p>当前任务：先建立实验规划页，后续逐个实现小 demo，并记录过程。</p>
        </aside>
      </div>
    </section>

    <section class="lab-shell experiments-section">
      <div class="section-title-row">
        <div>
          <p class="eyebrow">EXPERIMENTS // IDEA MAP</p>
          <h2>实验从小开始，但每一个都要服务于长期路线。</h2>
        </div>
        <span class="status-pill">Step by Step</span>
      </div>

      <div class="experiment-grid">
        <article v-for="item in experiments" :key="item.title" class="experiment-card">
          <div class="card-topline">
            <span>{{ item.status }}</span>
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
          <div class="stack-row">
            <span v-for="tech in item.stack" :key="tech">{{ tech }}</span>
          </div>
          <strong>{{ item.value }}</strong>
        </article>
      </div>
    </section>

    <section class="lab-shell method-section">
      <div class="method-copy">
        <p class="eyebrow">METHOD // HOW LAB WORKS</p>
        <h2>Lab 的重点不是“酷”，而是把探索变成可复用资产。</h2>
        <p>
          一个实验如果只是好看，很快就会被遗忘。真正有价值的实验应该能变成首页交互、博客文章、项目亮点，
          或者帮助我理解算法、图形、事件、性能和硬件数据表达。
        </p>
      </div>
      <div class="rules-card">
        <div v-for="(rule, index) in labRules" :key="rule" class="rule-item">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <p>{{ rule }}</p>
        </div>
      </div>
    </section>

    <section class="lab-shell build-section">
      <p class="eyebrow">BUILD ORDER // NEXT ACTIONS</p>
      <h2>下一步不做大而全，先做第一个能运行的小实验。</h2>
      <div class="build-grid">
        <article v-for="(item, index) in buildOrder" :key="item" class="build-card">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <p>{{ item }}</p>
        </article>
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

.stack-row span {
  padding: 0.38rem 0.65rem;
  border: 1px solid rgba(250, 250, 250, 0.22);
  border-radius: 999px;
  color: #f4f4f5;
  font-family: var(--font-mono);
  font-size: 0.72rem;
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
