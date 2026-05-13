<script setup lang="ts">
import { reactive } from 'vue'

type ArticleFormValue = {
  title: string
  slug: string
  summary: string
  category: string
  tags: string
  status: string
  isPinned: boolean
  content: string
}

const props = withDefaults(
  defineProps<{
    initialValue?: Partial<ArticleFormValue>
    mode?: 'new' | 'edit'
  }>(),
  {
    initialValue: () => ({}),
    mode: 'new'
  }
)

const form = reactive<ArticleFormValue>({
  title: props.initialValue.title ?? '',
  slug: props.initialValue.slug ?? '',
  summary: props.initialValue.summary ?? '',
  category: props.initialValue.category ?? '',
  tags: props.initialValue.tags ?? '',
  status: props.initialValue.status ?? 'draft',
  isPinned: props.initialValue.isPinned ?? false,
  content: props.initialValue.content ?? ''
})

const getPayload = (action: 'save-draft' | 'publish') => ({
  ...form,
  action,
  tags: form.tags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
})

const saveDraft = () => {
  console.log('保存草稿', getPayload('save-draft'))
}

const publish = () => {
  console.log('发布文章', getPayload('publish'))
}
</script>

<template>
  <form class="editor-form" @submit.prevent="saveDraft">
    <div class="form-grid">
      <label>
        <span>标题</span>
        <input v-model="form.title" type="text" placeholder="请输入文章标题" />
      </label>

      <label>
        <span>链接标识</span>
        <input v-model="form.slug" type="text" placeholder="article-slug" :disabled="mode === 'edit'" />
      </label>

      <label>
        <span>分类</span>
        <input v-model="form.category" type="text" placeholder="例如：开发日志" />
      </label>

      <label>
        <span>状态</span>
        <select v-model="form.status">
          <option value="draft">草稿</option>
          <option value="published">已发布</option>
          <option value="archived">已归档</option>
        </select>
      </label>
    </div>

    <label>
      <span>文章简介</span>
      <textarea v-model="form.summary" rows="3" placeholder="请输入一段简短的文章简介" />
    </label>

    <label>
      <span>标签</span>
      <input v-model="form.tags" type="text" placeholder="Vue3, Vite, 开发日志" />
    </label>

    <label class="pin-toggle">
      <input v-model="form.isPinned" type="checkbox" />
      <span>置顶这篇文章</span>
    </label>

    <label>
      <span>正文内容</span>
      <textarea v-model="form.content" class="content-input" rows="14" placeholder="在这里编写文章正文..." />
    </label>

    <div class="form-actions">
      <button type="submit">保存草稿</button>
      <button type="button" class="primary-action" @click="publish">发布文章</button>
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
  border: 1px solid rgba(250, 250, 250, 0.18);
  border-radius: 12px;
  background: rgba(9, 9, 11, 0.76);
  color: #fafafa;
  font: inherit;
  padding: 0.9rem 1rem;
  outline: none;
}

input:focus,
select:focus,
textarea:focus {
  border-color: rgba(204, 255, 0, 0.72);
  box-shadow: 0 0 0 3px rgba(204, 255, 0, 0.08);
}

input:disabled {
  color: #a1a1aa;
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

.form-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  justify-content: flex-end;
}

button {
  border: 1px solid rgba(250, 250, 250, 0.22);
  border-radius: 999px;
  background: rgba(250, 250, 250, 0.08);
  color: #fafafa;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 800;
  padding: 0.8rem 1rem;
}

.primary-action {
  border-color: rgba(204, 255, 0, 0.58);
  background: rgba(204, 255, 0, 0.12);
  color: var(--vg-accent);
}

button:hover {
  transform: translateY(-1px);
}

@media (max-width: 720px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    justify-content: flex-start;
  }
}
</style>
