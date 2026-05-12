<script setup lang="ts">
const categories = [
  {
    name: 'Devlog',
    desc: '记录 ZhenGeek 每一次重要迭代：为什么改、改了什么、下一步是什么。'
  },
  {
    name: 'Frontend',
    desc: '记录 Vue3、TypeScript、CSS、组件化、路由和页面工程实践。'
  },
  {
    name: 'Git',
    desc: '记录 Git、GitHub、提交、分支、冲突处理和工程协作基础。'
  },
  {
    name: 'Learning Notes',
    desc: '整理计算机基础、算法、后端、数据库和长期学习复盘。'
  }
]

const articles = [
  {
    category: 'Devlog',
    date: '2026-05',
    title: 'ZhenGeek Devlog 01：为什么我把博客升级成个人网站',
    summary: '记录 ZhenGeek 从个人博客升级为个人数字平台的原因：它不只是展示页，而是长期成长系统。',
    tags: ['定位', '个人品牌', '项目路线'],
    status: 'Draft Planned'
  },
  {
    category: 'Frontend',
    date: '2026-05',
    title: 'Vue3 + Vite 项目初始化踩坑记录',
    summary: '整理 Node.js、npm、Vite 初始化过程中的环境问题、安装卡顿、脚本权限和启动方式。',
    tags: ['Vue3', 'Vite', '环境配置'],
    status: 'Outline Ready'
  },
  {
    category: 'Vue',
    date: '2026-05',
    title: '从 App.vue 到组件化首页：我现在到底在写什么',
    summary: '用初学者视角解释 .vue 单文件组件、template/script/style 的关系，以及页面如何被组织起来。',
    tags: ['SFC', '组件化', '路由'],
    status: 'Draft Planned'
  },
  {
    category: 'Git',
    date: '2026-05',
    title: 'Git add / commit / push 到底做了什么',
    summary: '把版本控制理解成工程存档系统：暂存、提交、推送、拉取和冲突分别解决什么问题。',
    tags: ['Git', 'GitHub', '工程习惯'],
    status: 'Outline Ready'
  },
  {
    category: 'Project Notes',
    date: '2026-05',
    title: 'ZhenGeek V1 静态前端阶段验收标准',
    summary: '明确当前阶段不是上后端，而是先完成 About、Projects、Blog、Lab 的内容骨架与视觉统一。',
    tags: ['项目管理', '阶段验收', '路线图'],
    status: 'New Idea'
  }
]

const writingRules = [
  '每次文章只解决一个问题，不写成大而空的总结。',
  '每篇文章都包含：背景、踩坑/过程、理解、下一步。',
  '优先记录真实项目中遇到的问题，而不是为了更新而更新。',
  '先写短文章，保持连续输出，再逐步提高质量。'
]
</script>

<template>
  <main class="blog-page">
    <section class="blog-hero blog-shell">
      <p class="eyebrow">BLOG // LEARNING RECORDS</p>
      <div class="hero-grid">
        <div>
          <h1>博客不是装饰，是我的学习复盘系统。</h1>
          <p class="hero-lead">
            这里会记录 ZhenGeek 的开发日志、前端学习、Git 踩坑、计算机基础和项目复盘。
            当前阶段先做文章列表和分类结构，等内容模型稳定后再接入后端文章详情。
          </p>
        </div>
        <aside class="writing-panel">
          <span>WRITING MODE</span>
          <strong>Build in public</strong>
          <p>用公开记录倒逼自己持续复盘，把学习过程变成可展示、可回顾、可迭代的作品。</p>
        </aside>
      </div>
    </section>

    <section class="blog-shell categories-section">
      <p class="eyebrow">CATEGORIES // CONTENT MAP</p>
      <h2>先建立分类，再慢慢填充真实文章。</h2>
      <div class="category-grid">
        <article v-for="category in categories" :key="category.name" class="category-card">
          <h3>{{ category.name }}</h3>
          <p>{{ category.desc }}</p>
        </article>
      </div>
    </section>

    <section class="blog-shell articles-section">
      <div class="section-title-row">
        <div>
          <p class="eyebrow">ARTICLES // FIRST CONTENT SEEDS</p>
          <h2>第一批文章先服务于项目本身。</h2>
        </div>
        <span class="status-pill">Static List Now</span>
      </div>

      <div class="article-list">
        <article v-for="article in articles" :key="article.title" class="article-card">
          <div class="article-meta">
            <span>{{ article.category }}</span>
            <span>{{ article.date }}</span>
          </div>
          <h3>{{ article.title }}</h3>
          <p>{{ article.summary }}</p>
          <div class="article-bottom">
            <div class="tag-row">
              <span v-for="tag in article.tags" :key="tag">{{ tag }}</span>
            </div>
            <strong>{{ article.status }}</strong>
          </div>
        </article>
      </div>
    </section>

    <section class="blog-shell writing-section">
      <div class="writing-copy">
        <p class="eyebrow">RULES // HOW I WILL WRITE</p>
        <h2>写博客的目的，是把模糊经验变成清晰表达。</h2>
        <p>
          现在暂时不做文章详情页，是因为内容还在打磨。等文章标题、分类、摘要和数据字段稳定后，
          再把静态数组迁移到后端 API，正式支持文章详情、Markdown 渲染和后台管理。
        </p>
      </div>
      <div class="rules-card">
        <div v-for="(rule, index) in writingRules" :key="rule" class="rule-item">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <p>{{ rule }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.blog-page {
  padding-bottom: 5rem;
}

.blog-shell {
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
  max-width: 820px;
  margin-bottom: 1.4rem;
  font-size: clamp(3rem, 8vw, 7rem);
  line-height: 0.92;
}

h2 {
  max-width: 780px;
  margin-bottom: 1.5rem;
  font-size: clamp(2.2rem, 5vw, 4.7rem);
  line-height: 1;
}

h3 {
  font-size: clamp(1.35rem, 2.5vw, 2rem);
  line-height: 1.08;
}

.hero-lead,
.writing-panel p,
.category-card p,
.article-card p,
.writing-copy p,
.rule-item p {
  color: #d4d4d8;
  font-size: 1rem;
  line-height: 1.85;
}

.blog-hero {
  min-height: calc(100vh - 76px);
  display: grid;
  align-items: center;
}

.hero-grid,
.writing-section {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 380px);
  gap: 1.5rem;
  align-items: end;
}

.writing-panel,
.category-card,
.article-card,
.rules-card {
  border: 2px solid rgba(250, 250, 250, 0.9);
  background: rgba(24, 24, 27, 0.74);
  box-shadow: 10px 10px 0 rgba(250, 250, 250, 0.12);
  backdrop-filter: blur(16px);
}

.writing-panel {
  border-radius: 32px;
  padding: 1.5rem;
  transform: rotate(1.5deg);
}

.writing-panel span,
.status-pill,
.article-meta span,
.rule-item span {
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 800;
}

.writing-panel strong {
  display: block;
  margin: 1rem 0;
  font-family: var(--font-display);
  font-size: 2rem;
  line-height: 1;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.category-card {
  min-height: 240px;
  border-radius: 28px;
  padding: 1.25rem;
}

.category-card h3 {
  margin-bottom: 3rem;
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

.article-list {
  display: grid;
  gap: 1rem;
}

.article-card {
  border-radius: 30px;
  padding: clamp(1.25rem, 3vw, 1.8rem);
}

.article-meta {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.3rem;
}

.article-card h3 {
  max-width: 780px;
}

.article-bottom {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-end;
  margin-top: 1.5rem;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-row span {
  padding: 0.38rem 0.65rem;
  border: 1px solid rgba(250, 250, 250, 0.22);
  border-radius: 999px;
  color: #f4f4f5;
  font-family: var(--font-mono);
  font-size: 0.72rem;
}

.article-bottom strong {
  flex: 0 0 auto;
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.writing-section {
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

@media (max-width: 980px) {
  .hero-grid,
  .category-grid,
  .writing-section {
    grid-template-columns: 1fr;
  }

  .writing-panel {
    transform: none;
  }

  .blog-hero {
    min-height: auto;
  }

  .section-title-row,
  .article-bottom {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
