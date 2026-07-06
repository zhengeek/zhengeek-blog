<script setup lang="ts">
const skillStages = [
  {
    code: '01',
    title: '界面基础',
    subtitle: 'INTERFACE FOUNDATION',
    description: '建立清晰、稳定且适配不同设备的页面结构。',
    skills: ['HTML5', 'CSS3', '响应式布局', '可访问性基础']
  },
  {
    code: '02',
    title: '前端工程',
    subtitle: 'FRONTEND ENGINEERING',
    description: '将页面拆分为可维护的组件，并用类型系统约束数据与交互。',
    skills: ['Vue 3', 'TypeScript', 'Vue Router', 'Vite']
  },
  {
    code: '03',
    title: '视觉交互',
    subtitle: 'CREATIVE INTERACTION',
    description: '用克制的动态反馈和实时图形强化体验，而不牺牲性能。',
    skills: ['Three.js', 'GSAP', 'WebGL', '交互动效']
  },
  {
    code: '04',
    title: '全栈连接',
    subtitle: 'FULL-STACK CONNECTION',
    description: '连接内容、接口与数据库，让展示页面能够持续更新。',
    skills: ['Spring Boot', 'REST API', 'MySQL', '内容管理']
  },
  {
    code: '05',
    title: '交付与迭代',
    subtitle: 'DELIVERY AND ITERATION',
    description: '通过构建检查、性能优化和版本记录保持项目可持续演进。',
    skills: ['Git', '构建验证', '性能优化', '持续复盘']
  }
]
</script>

<template>
  <main class="skills-page">
    <section class="skills-hero page-shell">
      <p class="eyebrow">SKILLS // VERTICAL PROGRESSION</p>
      <h1>技能不是散落的标签，而是一条持续向下生长的路径。</h1>
      <p class="hero-lead">
        这棵纵向技能树从界面基础开始，依次连接前端工程、视觉交互、全栈能力和项目交付。
        每一层都服务于真实网站的设计、开发与长期维护。
      </p>
      <a class="scroll-link" href="#skill-tree">查看技能路径 <span>↓</span></a>
    </section>

    <section id="skill-tree" class="tree-section page-shell">
      <header class="section-heading">
        <p class="eyebrow">ABILITY GRID // 01-05</p>
        <h2>纵向技能树</h2>
      </header>

      <ol class="skill-tree">
        <li v-for="stage in skillStages" :key="stage.code" class="skill-stage">
          <div class="tree-node" aria-hidden="true"><span>{{ stage.code }}</span></div>
          <article class="skill-panel">
            <div class="stage-title">
              <div>
                <small>{{ stage.subtitle }}</small>
                <h3>{{ stage.title }}</h3>
              </div>
              <strong>{{ stage.code }}</strong>
            </div>
            <p>{{ stage.description }}</p>
            <ul class="skill-list" aria-label="技能列表">
              <li v-for="skill in stage.skills" :key="skill">{{ skill }}</li>
            </ul>
          </article>
        </li>
      </ol>
    </section>

    <section class="practice-section page-shell">
      <p class="eyebrow">PRACTICE // BUILD TO LEARN</p>
      <div class="practice-copy">
        <h2>学习结果最终要落到可运行、可维护的作品里。</h2>
        <p>技能树会随着项目继续更新：完成一个真实功能，补上一条可靠能力，而不是堆积没有上下文的技术名词。</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.skills-page {
  min-height: 100vh;
  padding-bottom: 5rem;
  color: #e2e8f0;
}

.page-shell {
  width: min(980px, calc(100% - 2rem));
  margin: 0 auto;
  padding: clamp(4rem, 8vw, 7rem) 0;
}

.skills-hero {
  display: grid;
  min-height: 100vh;
  align-content: center;
}

.eyebrow {
  margin: 0 0 1rem;
  color: #4d91ff;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.12em;
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
  letter-spacing: 0;
}

h1 {
  max-width: 900px;
  margin-bottom: 1.5rem;
  font-size: clamp(3rem, 7vw, 6.5rem);
  line-height: 0.98;
}

h2 {
  margin-bottom: 0;
  font-size: clamp(2.2rem, 5vw, 4.4rem);
  line-height: 1;
}

.hero-lead,
.skill-panel p,
.practice-copy p {
  color: #a8b3c7;
  font-size: 1rem;
  line-height: 1.85;
}

.hero-lead {
  max-width: 720px;
}

.scroll-link {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 0.7rem;
  margin-top: 1.5rem;
  color: #ffffff;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  text-decoration: none;
}

.scroll-link span {
  color: #4d91ff;
  font-size: 1.2rem;
}

.tree-section {
  scroll-margin-top: 1rem;
}

.section-heading {
  margin-bottom: 3rem;
}

.skill-tree {
  position: relative;
  display: grid;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.skill-tree::before {
  content: '';
  position: absolute;
  top: 28px;
  bottom: 28px;
  left: 31px;
  width: 1px;
  background: linear-gradient(#00f0ff, #4d91ff 52%, #ffd24a);
  box-shadow: 0 0 14px rgba(77, 145, 255, 0.65);
}

.skill-stage {
  position: relative;
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  gap: 1.25rem;
  align-items: start;
}

.tree-node {
  position: relative;
  z-index: 1;
  display: grid;
  width: 64px;
  aspect-ratio: 1;
  place-items: center;
  border: 1px solid rgba(77, 145, 255, 0.7);
  border-radius: 50%;
  background: #080716;
  box-shadow: 0 0 22px rgba(77, 145, 255, 0.25), inset 0 0 18px rgba(0, 240, 255, 0.08);
}

.tree-node span {
  color: #b9d4ff;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 800;
}

.skill-panel {
  min-height: 210px;
  padding: clamp(1.25rem, 3vw, 2rem);
  border: 1px solid rgba(77, 145, 255, 0.28);
  border-radius: 6px;
  background:
    linear-gradient(90deg, rgba(77, 145, 255, 0.09), transparent 38%),
    rgba(7, 8, 24, 0.88);
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.3);
}

.stage-title {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.stage-title small,
.stage-title strong {
  color: #4d91ff;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
}

.stage-title h3 {
  margin: 0.45rem 0 1rem;
  font-size: clamp(1.7rem, 3vw, 2.5rem);
}

.stage-title strong {
  color: rgba(255, 255, 255, 0.18);
  font-size: 1.8rem;
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin: 1.4rem 0 0;
  padding: 0;
  list-style: none;
}

.skill-list li {
  padding: 0.4rem 0.65rem;
  border: 1px solid rgba(0, 240, 255, 0.22);
  color: #d9faff;
  font-family: var(--font-mono);
  font-size: 0.72rem;
}

.practice-section {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.practice-copy {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
  gap: 2rem;
  align-items: start;
}

.practice-copy p {
  margin-bottom: 0;
}

@media (max-width: 680px) {
  .page-shell {
    width: min(100% - 1rem, 980px);
    padding: 3.5rem 0;
  }

  .skills-hero {
    min-height: 100svh;
  }

  h1 {
    font-size: 3.15rem;
  }

  .skill-tree::before {
    left: 21px;
  }

  .skill-stage {
    grid-template-columns: 44px minmax(0, 1fr);
    gap: 0.75rem;
  }

  .tree-node {
    width: 44px;
  }

  .skill-panel {
    min-height: 0;
    padding: 1rem;
  }

  .stage-title strong {
    display: none;
  }

  .practice-copy {
    grid-template-columns: 1fr;
  }
}
</style>
