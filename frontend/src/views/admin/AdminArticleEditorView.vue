<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ArticleEditorForm from '../../components/admin/ArticleEditorForm.vue'
import InfoCard from '../../components/common/InfoCard.vue'
import SectionHeader from '../../components/common/SectionHeader.vue'
import { type Article, fetchAdminArticleBySlug } from '../../services/articleApi'

const route = useRoute()
const router = useRouter()

const slug = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? value[0] : value
})

const isNewArticle = computed(() => route.path.endsWith('/new'))
const noticeMessage = ref('')
const article = ref<Article | null>(null)
const isLoading = ref(false)
const errorMessage = ref('')
const lastRoutePath = ref(route.path)

watch(
  () => route.query.notice,
  (notice) => {
    if (notice !== 'saved' && notice !== 'published') {
      return
    }

    noticeMessage.value = notice === 'published' ? '文章已发布' : '文章已保存'

    const query = { ...route.query }
    delete query.notice

    void router.replace({
      path: route.path,
      query,
      hash: route.hash
    })
  },
  { immediate: true }
)

watch(
  [isNewArticle, slug],
  async ([isNew, currentSlug]) => {
    article.value = null
    errorMessage.value = ''

    if (route.path !== lastRoutePath.value) {
      lastRoutePath.value = route.path

      if (route.query.notice !== 'saved' && route.query.notice !== 'published') {
        noticeMessage.value = ''
      }
    }

    if (isNew) {
      isLoading.value = false
      return
    }

    if (!currentSlug) {
      errorMessage.value = '文章不存在，可能已被删除'
      isLoading.value = false
      return
    }

    isLoading.value = true

    try {
      article.value = await fetchAdminArticleBySlug(currentSlug)
    } catch {
      errorMessage.value = '文章不存在，可能已被删除，或后端服务未启动。'
    } finally {
      isLoading.value = false
    }
  },
  { immediate: true }
)

const initialValue = computed<Article | undefined>(() => {
  if (isNewArticle.value) {
    return undefined
  }

  return article.value ?? undefined
})
</script>

<template>
  <main class="admin-page">
    <section class="admin-shell">
      <div class="admin-topbar">
        <RouterLink class="back-link" to="/admin/articles">&lt;- Back to Articles</RouterLink>
      </div>

      <InfoCard v-if="isLoading" class="editor-card state-card">
        <p>Loading article...</p>
      </InfoCard>

      <template v-else-if="isNewArticle || article">
        <SectionHeader
          eyebrow="ADMIN // EDITOR"
          :title="isNewArticle ? 'New Article' : 'Edit Article'"
          description="Create or update articles through the in-memory admin API."
        />

        <InfoCard class="editor-card">
          <p v-if="noticeMessage" class="notice-message success-message">{{ noticeMessage }}</p>
          <ArticleEditorForm
            :key="initialValue?.id ?? 'new'"
            :mode="isNewArticle ? 'new' : 'edit'"
            :initial-value="initialValue"
          />
        </InfoCard>
      </template>

      <InfoCard v-else class="not-found-card">
        <span>404 // ARTICLE NOT FOUND</span>
        <h1>文章不存在</h1>
        <p>{{ errorMessage || '文章不存在，可能已被删除。' }}</p>
        <RouterLink class="back-link inline-link" to="/admin/articles">返回文章列表</RouterLink>
      </InfoCard>
    </section>
  </main>
</template>

<style scoped>
.admin-page {
  padding-bottom: 5rem;
}

.admin-shell {
  width: min(980px, calc(100% - 2rem));
  margin: 0 auto;
  padding: clamp(3rem, 6vw, 5rem) 0;
}

.admin-topbar {
  margin-bottom: 2rem;
}

.back-link {
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 800;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.editor-card,
.not-found-card {
  border-radius: 28px;
  padding: clamp(1.25rem, 4vw, 2rem);
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

.state-card p {
  margin: 0;
  color: #d4d4d8;
  font-family: var(--font-mono);
  font-size: 0.92rem;
  font-weight: 800;
}

.not-found-card {
  max-width: 720px;
}

.not-found-card span {
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 800;
}

h1 {
  margin: 1rem 0;
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 0.95;
  letter-spacing: -0.055em;
}

p {
  color: #d4d4d8;
  line-height: 1.8;
}

.inline-link {
  display: inline-flex;
  margin-top: 1rem;
}

@media (max-width: 640px) {
  .admin-shell {
    width: min(100% - 1rem, 980px);
    padding: clamp(2.5rem, 12vw, 4rem) 0;
  }

  .editor-card,
  .not-found-card {
    border-radius: 22px;
    padding: 1.1rem;
  }

  h1 {
    font-size: 3rem;
  }
}
</style>
