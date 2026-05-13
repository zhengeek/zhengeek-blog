export type ArticleStatus = 'draft' | 'published' | 'archived'

export type Article = {
  id?: number
  slug: string
  category: string
  date: string
  title: string
  summary: string
  tags: string[]
  status: ArticleStatus
  viewCount: number
  isPinned: boolean
  content: string
}

const API_BASE_URL = 'http://localhost:8080/api'

export const fetchPublishedArticles = async (): Promise<Article[]> => {
  const response = await fetch(`${API_BASE_URL}/articles`)

  if (!response.ok) {
    throw new Error('Failed to fetch published articles')
  }

  return response.json()
}

export const fetchPublishedArticleBySlug = async (slug: string): Promise<Article> => {
  const response = await fetch(`${API_BASE_URL}/articles/${encodeURIComponent(slug)}`)

  if (!response.ok) {
    throw new Error('Failed to fetch published article')
  }

  return response.json()
}

export const getArticleStatusLabel = (status: ArticleStatus | string) => {
  const labels: Record<ArticleStatus, string> = {
    draft: 'Draft',
    published: 'Published',
    archived: 'Archived'
  }

  return labels[status as ArticleStatus] ?? labels.draft
}
