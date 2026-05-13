<script setup lang="ts">
import { onMounted, ref } from 'vue'
import InfoCard from '../../components/common/InfoCard.vue'
import SectionHeader from '../../components/common/SectionHeader.vue'
import StatusPill from '../../components/common/StatusPill.vue'
import {
  type Article,
  fetchAdminArticles,
  getArticleStatusLabel
} from '../../services/articleApi'

const articles = ref<Article[]>([])
const isLoading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  try {
    articles.value = await fetchAdminArticles()
  } catch {
    errorMessage.value = '文章管理列表加载失败，请确认后端服务是否已启动。'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <main class="admin-page">
    <section class="admin-shell">
      <div class="hero-row">
        <SectionHeader
          eyebrow="ADMIN // ARTICLES"
          title="管理文章"
          description="静态文章清单，用来预览后台列表、编辑入口和公开页面跳转流程。"
        />
        <RouterLink class="primary-link" to="/admin/articles/new">New Article</RouterLink>
      </div>

      <InfoCard v-if="isLoading" class="table-card state-card">
        <p>Loading articles...</p>
      </InfoCard>

      <InfoCard v-else-if="errorMessage" class="table-card state-card error-card">
        <p>{{ errorMessage }}</p>
      </InfoCard>

      <InfoCard v-else class="table-card">
        <div class="article-row table-head">
          <span>Title</span>
          <span>Category</span>
          <span>Status</span>
          <span>Views</span>
          <span>Pinned</span>
          <span>Updated</span>
          <span>Actions</span>
        </div>

        <div v-for="article in articles" :key="article.slug" class="article-row">
          <strong>{{ article.title }}</strong>
          <span>{{ article.category }}</span>
          <StatusPill :text="getArticleStatusLabel(article.status)" />
          <span>{{ article.viewCount }}</span>
          <span>{{ article.isPinned ? 'Pinned' : '-' }}</span>
          <span>{{ article.date }}</span>
          <div class="row-actions">
            <RouterLink :to="`/admin/articles/${article.slug}/edit`">Edit</RouterLink>
            <RouterLink :to="`/blog/${article.slug}`">Preview</RouterLink>
          </div>
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
  width: min(1180px, calc(100% - 2rem));
  margin: 0 auto;
  padding: clamp(3rem, 6vw, 5rem) 0;
}

.hero-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.primary-link,
.row-actions a {
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 800;
  text-decoration: none;
}

.primary-link {
  flex: 0 0 auto;
  border: 1px solid rgba(204, 255, 0, 0.5);
  border-radius: 999px;
  background: rgba(204, 255, 0, 0.08);
  padding: 0.75rem 0.9rem;
}

.table-card {
  overflow-x: auto;
  border-radius: 24px;
  padding: 1rem;
}

.state-card {
  overflow-x: visible;
  padding: 1.25rem;
}

.state-card p {
  margin: 0;
  color: #d4d4d8;
  font-family: var(--font-mono);
  font-size: 0.92rem;
  font-weight: 800;
}

.error-card p {
  color: var(--vg-accent);
}

.article-row {
  display: grid;
  grid-template-columns: minmax(280px, 1.8fr) minmax(110px, 0.8fr) minmax(150px, 0.9fr) minmax(70px, 0.45fr) minmax(80px, 0.5fr) minmax(90px, 0.55fr) minmax(130px, 0.65fr);
  gap: 1rem;
  align-items: center;
  min-width: 980px;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(250, 250, 250, 0.1);
}

.article-row:last-child {
  border-bottom: 0;
}

.table-head {
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
}

.article-row strong {
  color: #fafafa;
  font-size: 0.96rem;
  line-height: 1.45;
}

.article-row span {
  color: #d4d4d8;
  font-size: 0.9rem;
}

.row-actions {
  display: flex;
  gap: 0.75rem;
}

.row-actions a:hover,
.primary-link:hover {
  text-decoration: underline;
}

@media (max-width: 780px) {
  .hero-row {
    flex-direction: column;
  }
}
</style>
