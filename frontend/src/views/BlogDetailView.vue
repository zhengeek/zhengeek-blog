<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import InfoCard from '../components/common/InfoCard.vue'
import StatusPill from '../components/common/StatusPill.vue'
import TagList from '../components/common/TagList.vue'
import { articles } from '../data/articles'

const route = useRoute()

const slug = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? value[0] : value
})

const article = computed(() => articles.find((item) => item.slug === slug.value))
</script>

<template>
  <main class="blog-detail-page">
    <section v-if="article" class="detail-shell">
      <RouterLink class="back-link" to="/blog">&lt;- Back to Blog</RouterLink>

      <header class="article-hero">
        <div class="article-meta">
          <span>{{ article.category }}</span>
          <span>{{ article.date }}</span>
        </div>
        <h1>{{ article.title }}</h1>
        <p class="summary">{{ article.summary }}</p>
        <div class="article-tools">
          <TagList class="tag-list" :tags="article.tags" />
          <StatusPill :text="article.status" />
        </div>
      </header>

      <InfoCard class="content-card">
        <article class="article-content">{{ article.content.trim() }}</article>
      </InfoCard>
    </section>

    <section v-else class="detail-shell not-found-section">
      <InfoCard class="not-found-card">
        <span class="not-found-label">404 // ARTICLE NOT FOUND</span>
        <h1>这篇文章还没有进入 ZhenGeek 的记录系统。</h1>
        <p>可能是链接写错了，也可能是这篇文章还在草稿阶段。先回到 Blog 页面看看已有内容。</p>
        <RouterLink class="back-link inline-link" to="/blog">Back to Blog</RouterLink>
      </InfoCard>
    </section>
  </main>
</template>

<style scoped>
.blog-detail-page {
  padding-bottom: 5rem;
}

.detail-shell {
  width: min(940px, calc(100% - 2rem));
  margin: 0 auto;
  padding: clamp(3.5rem, 7vw, 6rem) 0;
}

.back-link {
  display: inline-flex;
  margin-bottom: 2rem;
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.82rem;
  font-weight: 800;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.article-hero {
  margin-bottom: 2rem;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1.3rem;
}

.article-meta span,
.not-found-label {
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 800;
}

h1,
p {
  margin-top: 0;
}

h1 {
  max-width: 900px;
  margin-bottom: 1.25rem;
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 7vw, 6.8rem);
  line-height: 0.95;
  letter-spacing: -0.055em;
}

.summary,
.not-found-card p {
  color: #d4d4d8;
  font-size: 1.05rem;
  line-height: 1.85;
}

.article-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-top: 1.6rem;
}

.content-card,
.not-found-card {
  border-radius: 32px;
  padding: clamp(1.4rem, 4vw, 2.4rem);
}

.article-content {
  color: #e4e4e7;
  font-size: 1rem;
  line-height: 1.85;
  white-space: pre-wrap;
}

.not-found-section {
  min-height: calc(100vh - 76px);
  display: grid;
  align-items: center;
}

.not-found-card {
  max-width: 760px;
}

.inline-link {
  margin: 1rem 0 0;
}

@media (max-width: 720px) {
  .article-tools {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
