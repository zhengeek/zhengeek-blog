<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ArticleEditorForm from '../../components/admin/ArticleEditorForm.vue'
import InfoCard from '../../components/common/InfoCard.vue'
import SectionHeader from '../../components/common/SectionHeader.vue'
import { type Article, fetchAdminArticleBySlug } from '../../services/articleApi'

const route = useRoute()

const slug = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? value[0] : value
})

const isNewArticle = computed(() => route.path.endsWith('/new'))
const article = ref<Article | null>(null)
const isLoading = ref(false)
const errorMessage = ref('')

watch(
  [isNewArticle, slug],
  async ([isNew, currentSlug]) => {
    article.value = null
    errorMessage.value = ''

    if (isNew) {
      isLoading.value = false
      return
    }

    if (!currentSlug) {
      errorMessage.value = 'Not Found'
      isLoading.value = false
      return
    }

    isLoading.value = true

    try {
      article.value = await fetchAdminArticleBySlug(currentSlug)
    } catch {
      errorMessage.value = 'Not Found. The article may not exist, or the backend service is unavailable.'
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
          <ArticleEditorForm
            :key="initialValue?.id ?? 'new'"
            :mode="isNewArticle ? 'new' : 'edit'"
            :initial-value="initialValue"
          />
        </InfoCard>
      </template>

      <InfoCard v-else class="not-found-card">
        <span>404 // ARTICLE NOT FOUND</span>
        <h1>Not Found</h1>
        <p>{{ errorMessage || 'The article does not exist.' }}</p>
        <RouterLink class="back-link inline-link" to="/admin/articles">Back to Articles</RouterLink>
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
</style>
