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

export const fetchAdminArticles = async (): Promise<Article[]> => {
  const response = await fetch(`${API_BASE_URL}/admin/articles`)

  if (!response.ok) {
    throw new Error('Failed to fetch admin articles')
  }

  return response.json()
}

export const fetchAdminArticleBySlug = async (slug: string): Promise<Article> => {
  const response = await fetch(`${API_BASE_URL}/admin/articles/slug/${encodeURIComponent(slug)}`)

  if (!response.ok) {
    throw new Error('Failed to fetch admin article')
  }

  return response.json()
}

export const createAdminArticle = async (article: Article): Promise<Article> => {
  const response = await fetch(`${API_BASE_URL}/admin/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(article)
  })

  if (!response.ok) {
    throw new Error('Failed to create admin article')
  }

  return response.json()
}

export const updateAdminArticle = async (id: number, article: Article): Promise<Article> => {
  const response = await fetch(`${API_BASE_URL}/admin/articles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(article)
  })

  if (!response.ok) {
    throw new Error('Failed to update admin article')
  }

  return response.json()
}

export const updateAdminArticleStatus = async (id: number, status: ArticleStatus): Promise<Article> => {
  const response = await fetch(`${API_BASE_URL}/admin/articles/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status })
  })

  if (!response.ok) {
    throw new Error('Failed to update admin article status')
  }

  return response.json()
}

export const updateAdminArticlePinned = async (id: number, isPinned: boolean): Promise<Article> => {
  const response = await fetch(`${API_BASE_URL}/admin/articles/${id}/pin`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ isPinned })
  })

  if (!response.ok) {
    throw new Error('Failed to update admin article pinned state')
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
