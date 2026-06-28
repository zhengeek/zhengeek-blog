<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  type Article,
  type ArticleStatus,
  createAdminArticle,
  getArticleApiErrorMessage,
  getArticleStatusLabel,
  updateAdminArticle
} from '../../services/articleApi'

type ArticleFormValue = {
  id?: number
  title: string
  slug: string
  summary: string
  category: string
  tags: string
  status: ArticleStatus
  isPinned: boolean
  content: string
  date: string
  viewCount: number
}

const props = withDefaults(
  defineProps<{
    initialValue?: Partial<Article>
    mode?: 'new' | 'edit'
  }>(),
  {
    initialValue: () => ({}),
    mode: 'new'
  }
)

const router = useRouter()
const isSaving = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const getCurrentMonth = () => new Date().toISOString().slice(0, 7)

const form = reactive<ArticleFormValue>({
  id: props.initialValue.id,
  title: props.initialValue.title ?? '',
  slug: props.initialValue.slug ?? '',
  summary: props.initialValue.summary ?? '',
  category: props.initialValue.category ?? '',
  tags: props.initialValue.tags?.join(', ') ?? '',
  status: props.initialValue.status ?? 'draft',
  isPinned: props.initialValue.isPinned ?? false,
  content: props.initialValue.content ?? '',
  date: props.initialValue.date ?? getCurrentMonth(),
  viewCount: props.initialValue.viewCount ?? 0
})

const statusOptions: ArticleStatus[] = ['draft', 'published', 'archived']

const getPayload = (status: ArticleStatus): Article => ({
  id: form.id,
  title: form.title.trim(),
  slug: form.slug.trim(),
  summary: form.summary.trim(),
  category: form.category.trim(),
  tags: form.tags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean),
  status,
  isPinned: form.isPinned,
  content: form.content,
  date: form.date || getCurrentMonth(),
  viewCount: form.viewCount ?? 0
})

const submitArticle = async (status: ArticleStatus) => {
  if (isSaving.value) {
    return
  }

  isSaving.value = true
  errorMessage.value = ''
  successMessage.value = ''
  form.status = status

  try {
    const payload = getPayload(status)
    const nextSuccessMessage = status === 'published' ? '文章已发布' : '文章已保存'

    if (props.mode === 'edit') {
      if (!payload.id) {
        throw new Error('Missing article id')
      }

      const savedArticle = await updateAdminArticle(payload.id, payload)
      form.viewCount = savedArticle.viewCount ?? form.viewCount
      form.status = savedArticle.status
      successMessage.value = nextSuccessMessage
      return
    } else {
      const savedArticle = await createAdminArticle(payload)
      form.id = savedArticle.id

      await router.replace({
        name: 'admin-article-edit',
        params: { slug: savedArticle.slug },
        query: { notice: status === 'published' ? 'published' : 'saved' }
      })
    }
  } catch (error) {
    errorMessage.value = getArticleApiErrorMessage(error)
  } finally {
    isSaving.value = false
  }
}

const saveDraft = () => submitArticle('draft')
const publish = () => submitArticle('published')
</script>

<template>
  <form class="editor-form" @submit.prevent="saveDraft">
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <div class="form-grid">
      <label>
        <span>Title</span>
        <input v-model="form.title" type="text" placeholder="Article title" />
      </label>

      <label>
        <span>Slug</span>
        <input v-model="form.slug" type="text" placeholder="article-slug" :disabled="mode === 'edit'" />
      </label>

      <label>
        <span>Category</span>
        <input v-model="form.category" type="text" placeholder="Devlog" />
      </label>

      <label>
        <span>Date</span>
        <input v-model="form.date" type="month" />
      </label>

      <label>
        <span>Status</span>
        <select v-model="form.status">
          <option v-for="status in statusOptions" :key="status" :value="status">
            {{ getArticleStatusLabel(status) }}
          </option>
        </select>
      </label>
    </div>

    <label>
      <span>Summary</span>
      <textarea v-model="form.summary" rows="3" placeholder="Short article summary" />
    </label>

    <label>
      <span>Tags</span>
      <input v-model="form.tags" type="text" placeholder="Vue3, Vite, Devlog" />
    </label>

    <label class="pin-toggle">
      <input v-model="form.isPinned" type="checkbox" />
      <span>Pinned</span>
    </label>

    <label>
      <span>Content</span>
      <textarea v-model="form.content" class="content-input" rows="14" placeholder="Write the article content..." />
    </label>

    <div class="form-actions">
      <button type="submit" :disabled="isSaving">{{ isSaving ? 'Saving...' : 'Save Draft' }}</button>
      <button type="button" class="primary-action" :disabled="isSaving" @click="publish">
        {{ isSaving ? 'Saving...' : 'Publish' }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.editor-form {
  display: grid;
  gap: 1.1rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

label {
  display: grid;
  gap: 0.55rem;
}

label span,
.pin-toggle span {
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 800;
  text-transform: uppercase;
}

input,
select,
textarea {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 12px;
  background: rgba(5, 5, 15, 0.76);
  color: #ffffff;
  font: inherit;
  padding: 0.9rem 1rem;
  outline: none;
}

input:focus,
select:focus,
textarea:focus {
  border-color: rgba(0, 243, 255, 0.72);
  box-shadow: 0 0 0 3px rgba(0, 243, 255, 0.08), 0 0 22px rgba(0, 243, 255, 0.14);
}

input:disabled,
button:disabled {
  color: var(--vg-muted);
  cursor: not-allowed;
}

textarea {
  resize: vertical;
  line-height: 1.65;
}

.content-input {
  min-height: 320px;
  font-family: var(--font-mono);
  font-size: 0.92rem;
}

.pin-toggle {
  display: inline-flex;
  width: fit-content;
  grid-template-columns: none;
  gap: 0.65rem;
  align-items: center;
}

.pin-toggle input {
  width: 1rem;
  height: 1rem;
  accent-color: var(--vg-accent);
}

.success-message,
.error-message {
  margin: 0;
  border-radius: 14px;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 800;
  padding: 0.85rem 1rem;
}

.success-message {
  border: 1px solid rgba(0, 243, 255, 0.42);
  background: rgba(0, 243, 255, 0.1);
  color: #b7f4ff;
}

.error-message {
  border: 1px solid rgba(248, 113, 113, 0.5);
  background: rgba(127, 29, 29, 0.34);
  color: #fecaca;
}

.form-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  justify-content: flex-end;
}

button {
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 800;
  padding: 0.8rem 1rem;
}

.primary-action {
  border-color: rgba(0, 243, 255, 0.5);
  background: rgba(0, 243, 255, 0.1);
  color: var(--vg-accent);
}

button:hover:not(:disabled) {
  transform: translateY(-1px);
}

@media (max-width: 720px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    justify-content: flex-start;
  }

  .form-actions button {
    width: 100%;
  }

  .content-input {
    min-height: 240px;
  }
}
</style>
