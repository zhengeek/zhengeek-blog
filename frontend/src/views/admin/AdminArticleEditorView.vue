<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ArticleEditorForm from '../../components/admin/ArticleEditorForm.vue'
import InfoCard from '../../components/common/InfoCard.vue'
import SectionHeader from '../../components/common/SectionHeader.vue'
import { articles } from '../../data/articles'

const route = useRoute()

const slug = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? value[0] : value
})

const isNewArticle = computed(() => route.path.endsWith('/new'))
const article = computed(() => articles.find((item) => item.slug === slug.value))

const toFormStatus = (status: string) => {
  const normalized = status.toLowerCase()

  if (normalized.includes('published') || status.includes('已发布')) {
    return 'published'
  }

  if (normalized.includes('archived') || status.includes('已归档')) {
    return 'archived'
  }

  return 'draft'
}

const initialValue = computed(() => {
  if (!article.value) {
    return undefined
  }

  return {
    title: article.value.title,
    slug: article.value.slug,
    summary: article.value.summary,
    category: article.value.category,
    tags: article.value.tags.join(', '),
    status: toFormStatus(article.value.status),
    isPinned: article.value.isPinned,
    content: article.value.content.trim()
  }
})
</script>

<template>
  <main class="admin-page">
    <section class="admin-shell">
      <div class="admin-topbar">
        <RouterLink class="back-link" to="/admin/articles">&lt;- 返回文章管理</RouterLink>
      </div>

      <template v-if="isNewArticle || article">
        <SectionHeader
          eyebrow="后台 // 文章编辑器"
          :title="isNewArticle ? '新建文章' : '编辑文章'"
          description="当前只是前端原型，保存草稿和发布按钮会把表单数据打印到控制台。"
        />

        <InfoCard class="editor-card">
          <ArticleEditorForm :mode="isNewArticle ? 'new' : 'edit'" :initial-value="initialValue" />
        </InfoCard>
      </template>

      <InfoCard v-else class="not-found-card">
        <span>404 // 未找到文章</span>
        <h1>文章不存在</h1>
        <p>当前 slug 没有匹配到静态文章数据，请返回文章管理页重新选择。</p>
        <RouterLink class="back-link inline-link" to="/admin/articles">返回文章管理</RouterLink>
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
