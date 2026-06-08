<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import InfoCard from '../../components/common/InfoCard.vue'
import SectionHeader from '../../components/common/SectionHeader.vue'
import StatusPill from '../../components/common/StatusPill.vue'
import {
  type Article,
  deleteAdminArticle,
  fetchAdminArticles,
  getArticleApiErrorMessage,
  getArticleStatusLabel
} from '../../services/articleApi'

const articles = ref<Article[]>([])
const isLoading = ref(true)
const errorMessage = ref('')
const successMessage = ref('')
const deletingArticleId = ref<number | null>(null)

const sortedArticles = computed(() => {
  return [...articles.value].sort((a, b) => Number(b.isPinned) - Number(a.isPinned))
})

onMounted(async () => {
  try {
    articles.value = await fetchAdminArticles()
  } catch (error) {
    errorMessage.value = getArticleApiErrorMessage(error)
  } finally {
    isLoading.value = false
  }
})

const deleteArticle = async (article: Article) => {
  if (!article.id || deletingArticleId.value !== null) {
    return
  }

  const confirmed = window.confirm(`确认删除文章「${article.title}」吗？`)

  if (!confirmed) {
    return
  }

  deletingArticleId.value = article.id
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await deleteAdminArticle(article.id)
    articles.value = articles.value.filter((item) => item.id !== article.id)
    successMessage.value = '文章已删除'
  } catch (error) {
    errorMessage.value = getArticleApiErrorMessage(error)
  } finally {
    deletingArticleId.value = null
  }
}
</script>

<template>
  <main class="admin-page">
    <section class="admin-shell">
      <div class="hero-row">
        <SectionHeader
          eyebrow="ADMIN // ARTICLES"
          title="管理文章"
          description="管理后台文章列表、编辑入口和公开页面预览。"
        />
        <RouterLink class="primary-link" to="/admin/articles/new">New Article</RouterLink>
      </div>

      <p v-if="successMessage" class="notice-message success-message">{{ successMessage }}</p>
      <p v-if="errorMessage && !isLoading" class="notice-message error-message">{{ errorMessage }}</p>

      <InfoCard v-if="isLoading" class="table-card state-card">
        <p>Loading articles...</p>
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

        <div v-for="article in sortedArticles" :key="article.id ?? article.slug" class="article-row">
          <strong>{{ article.title }}</strong>
          <span>{{ article.category }}</span>
          <StatusPill :text="getArticleStatusLabel(article.status)" />
          <span>{{ article.viewCount }}</span>
          <span>{{ article.isPinned ? 'Pinned' : '-' }}</span>
          <span>{{ article.date }}</span>
          <div class="row-actions">
            <RouterLink :to="`/admin/articles/${article.slug}/edit`">Edit</RouterLink>
            <RouterLink :to="`/blog/${article.slug}`">Preview</RouterLink>
            <button
              type="button"
              class="delete-button"
              :disabled="deletingArticleId !== null"
              @click="deleteArticle(article)"
            >
              {{ deletingArticleId === article.id ? 'Deleting...' : 'Delete' }}
            </button>
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
.row-actions a,
.delete-button {
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
  overflow-x: hidden;
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

.notice-message {
  margin: 0 0 1rem;
  border-radius: 14px;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 800;
  padding: 0.85rem 1rem;
}

.success-message {
  border: 1px solid rgba(204, 255, 0, 0.42);
  background: rgba(204, 255, 0, 0.12);
  color: #f4ff9b;
}

.error-message {
  border: 1px solid rgba(248, 113, 113, 0.5);
  background: rgba(127, 29, 29, 0.34);
  color: #fecaca;
}

.article-row {
  display: grid;
  grid-template-columns: minmax(180px, 1.45fr) minmax(88px, 0.62fr) minmax(116px, 0.72fr) minmax(54px, 0.38fr) minmax(64px, 0.42fr) minmax(74px, 0.46fr) minmax(230px, 1.15fr);
  gap: 0.85rem;
  align-items: center;
  min-width: 0;
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
  min-width: 0;
  overflow-wrap: anywhere;
}

.article-row span {
  color: #d4d4d8;
  font-size: 0.9rem;
  min-width: 0;
}

.row-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  align-items: center;
  min-width: 0;
}

.row-actions a,
.delete-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 1.85rem;
  border: 1px solid rgba(250, 250, 250, 0.16);
  border-radius: 999px;
  background: rgba(9, 9, 11, 0.72);
  padding: 0.36rem 0.6rem;
  white-space: nowrap;
}

.row-actions a:hover,
.primary-link:hover,
.delete-button:hover:not(:disabled) {
  border-color: rgba(204, 255, 0, 0.42);
  background: rgba(250, 250, 250, 0.1);
  text-decoration: none;
}

.delete-button {
  cursor: pointer;
}

.delete-button:hover:not(:disabled) {
  border-color: rgba(248, 113, 113, 0.5);
  background: rgba(127, 29, 29, 0.32);
  color: #fecaca;
}

.delete-button:disabled {
  color: #a1a1aa;
  cursor: not-allowed;
}

@media (max-width: 980px) {
  .hero-row {
    flex-direction: column;
  }

  .table-card {
    overflow-x: auto;
  }

  .article-row {
    min-width: 900px;
  }
}
</style>
