<script setup lang="ts">
import { computed } from 'vue'
import InfoCard from '../../components/common/InfoCard.vue'
import SectionHeader from '../../components/common/SectionHeader.vue'
import StatusPill from '../../components/common/StatusPill.vue'
import { articles } from '../../data/articles'

const stats = computed(() => {
  const publishedCount = articles.filter((article) => {
    const status = article.status.toLowerCase()
    return status.includes('published') || article.status.includes('已发布')
  }).length
  const archivedCount = articles.filter((article) => {
    const status = article.status.toLowerCase()
    return status.includes('archived') || article.status.includes('已归档')
  }).length

  return [
    { label: '文章总数', value: articles.length },
    { label: '已发布', value: publishedCount },
    { label: '草稿', value: articles.length - publishedCount - archivedCount },
    { label: '置顶文章', value: articles.filter((article) => article.isPinned).length },
    { label: '总浏览量', value: articles.reduce((total, article) => total + article.viewCount, 0) }
  ]
})
</script>

<template>
  <main class="admin-page">
    <section class="admin-shell">
      <div class="admin-topbar">
        <RouterLink class="admin-link" to="/admin/login">登录页</RouterLink>
        <RouterLink class="admin-link" to="/blog">公开博客</RouterLink>
      </div>

      <div class="hero-row">
        <SectionHeader
          eyebrow="后台 // 数据看板"
          title="ZhenGeek 内容控制台"
          description="用于梳理文章管理流程的静态后台原型，暂时不接入 API、数据库或真实登录。"
        />
        <StatusPill text="v0.1 静态原型" />
      </div>

      <div class="stats-grid">
        <InfoCard v-for="item in stats" :key="item.label" class="stat-card">
          <span>{{ item.label }}</span>
          <strong>{{ item.value }}</strong>
        </InfoCard>
      </div>

      <InfoCard class="quick-card">
        <div>
          <span class="quick-label">快捷入口</span>
          <h2>文章工作流</h2>
        </div>
        <div class="quick-actions">
          <RouterLink to="/admin/articles">管理文章</RouterLink>
          <RouterLink to="/admin/articles/new">新建文章</RouterLink>
        </div>
      </InfoCard>
    </section>
  </main>
</template>

<style scoped>
.admin-page {
  padding-bottom: 5rem;
}

.admin-shell {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
  padding: clamp(3rem, 6vw, 5rem) 0;
}

.admin-topbar,
.hero-row,
.quick-card {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
}

.admin-topbar {
  justify-content: flex-end;
  margin-bottom: 2rem;
}

.admin-link,
.quick-actions a {
  color: #fafafa;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 800;
  text-decoration: none;
}

.admin-link:hover,
.quick-actions a:hover {
  color: var(--vg-accent);
  text-decoration: underline;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.stat-card,
.quick-card {
  border-radius: 24px;
  padding: 1.25rem;
}

.stat-card span,
.quick-label {
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.74rem;
  font-weight: 800;
}

.stat-card strong {
  display: block;
  margin-top: 1.2rem;
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 5vw, 4.2rem);
  line-height: 0.9;
}

h2 {
  margin: 0.75rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.8rem);
  line-height: 1;
  letter-spacing: -0.055em;
}

.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-end;
}

.quick-actions a {
  border: 1px solid rgba(204, 255, 0, 0.5);
  border-radius: 999px;
  background: rgba(204, 255, 0, 0.08);
  color: var(--vg-accent);
  padding: 0.75rem 0.9rem;
}

@media (max-width: 980px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hero-row,
  .quick-card {
    flex-direction: column;
  }

  .quick-actions {
    justify-content: flex-start;
  }
}

@media (max-width: 560px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
