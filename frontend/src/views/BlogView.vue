<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import InfoCard from '../components/common/InfoCard.vue'
import SectionHeader from '../components/common/SectionHeader.vue'
import StatusPill from '../components/common/StatusPill.vue'
import TagList from '../components/common/TagList.vue'
import { categories, writingRules } from '../data/articles'
import {
  type Article,
  fetchPublishedArticles,
  getArticleStatusLabel
} from '../services/articleApi'

const articles = ref<Article[]>([])
const isLoading = ref(true)
const errorMessage = ref('')

const sortedArticles = computed(() => {
  return [...articles.value].sort((a, b) => Number(b.isPinned) - Number(a.isPinned))
})

onMounted(async () => {
  try {
    articles.value = await fetchPublishedArticles()
  } catch {
    errorMessage.value = '文章加载失败，请确认后端服务是否已启动。'
  } finally {
    isLoading.value = false
  }
})
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
        <InfoCard class="writing-panel">
          <span>WRITING MODE</span>
          <strong>Build in public</strong>
          <p>用公开记录倒逼自己持续复盘，把学习过程变成可展示、可回顾、可迭代的作品。</p>
        </InfoCard>
      </div>
    </section>

    <section class="blog-shell categories-section">
      <SectionHeader eyebrow="CATEGORIES // CONTENT MAP" title="先建立分类，再慢慢填充真实文章。" />
      <div class="category-grid">
        <InfoCard v-for="category in categories" :key="category.name" class="category-card">
          <h3>{{ category.name }}</h3>
          <p>{{ category.desc }}</p>
        </InfoCard>
      </div>
    </section>

    <section class="blog-shell articles-section">
      <div class="section-title-row">
        <div>
          <SectionHeader eyebrow="ARTICLES // FIRST SEEDS" title="第一批文章先服务于项目本身。" />
        </div>
        <StatusPill text="API Feed" />
      </div>

      <InfoCard v-if="isLoading" class="article-state-card">
        <p>Loading articles...</p>
      </InfoCard>

      <InfoCard v-else-if="errorMessage" class="article-state-card error-card">
        <p>{{ errorMessage }}</p>
      </InfoCard>

      <div v-else class="article-list">
        <InfoCard v-for="article in sortedArticles" :key="article.slug" class="article-card">
          <div class="article-meta">
            <div class="article-meta-left">
              <span v-if="article.isPinned" class="pinned-badge">Pinned</span>
              <span>{{ article.category }}</span>
            </div>
            <div class="article-meta-right">
              <span>{{ article.viewCount }} 次浏览</span>
              <span>{{ article.date }}</span>
            </div>
          </div>
          <h3>
            <RouterLink class="article-title-link" :to="`/blog/${article.slug}`">{{ article.title }}</RouterLink>
          </h3>
          <p>{{ article.summary }}</p>
          <div class="article-bottom">
            <TagList class="tag-row" :tags="article.tags" />
            <div class="article-actions">
              <strong>{{ getArticleStatusLabel(article.status) }}</strong>
              <RouterLink class="read-more-link" :to="`/blog/${article.slug}`">阅读详情</RouterLink>
            </div>
          </div>
        </InfoCard>
      </div>
    </section>

    <section class="blog-shell writing-section">
      <div class="writing-copy">
        <SectionHeader eyebrow="RULES // WRITING SYSTEM" title="写博客的目的，是把模糊经验变成清晰表达。" />
        <p>
          现在暂时不做文章详情页，是因为内容还在打磨。等文章标题、分类、摘要和数据字段稳定后，
          再把静态数组迁移到后端 API，正式支持文章详情、Markdown 渲染和后台管理。
        </p>
      </div>
      <InfoCard class="rules-card">
        <div v-for="(rule, index) in writingRules" :key="rule" class="rule-item">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <p>{{ rule }}</p>
        </div>
      </InfoCard>
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
.article-state-card p,
.writing-copy p,
.rule-item p {
  color: var(--vg-text-soft);
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
.article-state-card,
.rules-card {
  border: 1px solid var(--vg-card-border);
  background: var(--vg-panel);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.36), 0 0 34px rgba(0, 210, 255, 0.08);
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
  border: 1px solid rgba(0, 210, 255, 0.44);
  border-radius: 999px;
  background: rgba(0, 210, 255, 0.08);
}

.article-list {
  display: grid;
  gap: 1rem;
}

.article-card {
  border-radius: 30px;
  padding: clamp(1.25rem, 3vw, 1.8rem);
}

.article-state-card {
  border-radius: 30px;
  padding: clamp(1.25rem, 3vw, 1.8rem);
}

.article-state-card p {
  margin-bottom: 0;
  font-family: var(--font-mono);
  font-size: 0.92rem;
  font-weight: 800;
}

.error-card p {
  color: var(--vg-accent);
}

.article-meta {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.3rem;
}

.article-meta-left,
.article-meta-right {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.article-card h3 {
  max-width: 780px;
}

.pinned-badge {
  padding: 0.28rem 0.48rem;
  border: 1px solid rgba(0, 210, 255, 0.44);
  border-radius: 999px;
  background: rgba(0, 210, 255, 0.08);
}

.article-title-link {
  color: inherit;
  text-decoration: none;
}

.article-title-link:hover {
  color: var(--vg-accent);
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

.article-bottom strong {
  flex: 0 0 auto;
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.article-actions {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 0.6rem;
  align-items: flex-end;
}

.read-more-link {
  color: #ffffff;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 800;
  text-decoration: none;
}

.read-more-link:hover {
  color: var(--vg-accent);
  text-decoration: underline;
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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

  .article-actions {
    align-items: flex-start;
  }
}

@media (max-width: 640px) {
  .blog-shell {
    width: min(100% - 1rem, 1120px);
    padding: clamp(2.75rem, 12vw, 4rem) 0;
  }

  h1 {
    font-size: 3.2rem;
  }

  h2 {
    font-size: 2.45rem;
  }

  .writing-panel,
  .category-card,
  .article-card,
  .article-state-card,
  .rules-card {
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.32), 0 0 26px rgba(0, 210, 255, 0.07);
  }

  .article-meta {
    align-items: flex-start;
    flex-direction: column;
  }

  .article-meta-right {
    gap: 0.5rem;
  }
}
</style>
