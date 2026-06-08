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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api'

type ApiErrorResponse = {
  code?: string
  message?: string
}

export class ArticleApiError extends Error {
  code?: string

  constructor(message: string, code?: string) {
    super(message)
    this.name = 'ArticleApiError'
    this.code = code
  }
}

const getErrorFallbackMessage = (status: number) => {
  if (status >= 500) {
    return '服务器出错，请稍后再试'
  }

  return '请求参数有误，请检查表单内容'
}

const parseApiError = async (response: Response) => {
  try {
    return (await response.json()) as ApiErrorResponse
  } catch {
    return {}
  }
}

const requestJson = async <T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> => {
  let response: Response

  try {
    response = await fetch(input, init)
  } catch {
    throw new ArticleApiError('无法连接后端服务，请确认后端已启动')
  }

  if (!response.ok) {
    const error = await parseApiError(response)
    throw new ArticleApiError(error.message || getErrorFallbackMessage(response.status), error.code)
  }

  return response.json()
}

const requestNoContent = async (input: RequestInfo | URL, init?: RequestInit): Promise<void> => {
  let response: Response

  try {
    response = await fetch(input, init)
  } catch {
    throw new ArticleApiError('无法连接后端服务，请确认后端已启动')
  }

  if (!response.ok) {
    const error = await parseApiError(response)
    throw new ArticleApiError(error.message || getErrorFallbackMessage(response.status), error.code)
  }
}

export const getArticleApiErrorMessage = (error: unknown) => {
  if (error instanceof ArticleApiError) {
    const labels: Record<string, string> = {
      ARTICLE_SLUG_DUPLICATED: '该 slug 已存在，请换一个',
      ARTICLE_NOT_FOUND: '文章不存在，可能已被删除',
      ARTICLE_STATUS_INVALID: '文章状态非法',
      REQUEST_INVALID: '请求参数有误，请检查表单内容',
      INTERNAL_ERROR: '服务器出错，请稍后再试'
    }

    return error.code ? labels[error.code] ?? error.message : error.message
  }

  return '服务器出错，请稍后再试'
}

export const fetchPublishedArticles = async (): Promise<Article[]> => {
  return requestJson(`${API_BASE_URL}/articles`)
}

export const fetchPublishedArticleBySlug = async (slug: string): Promise<Article> => {
  return requestJson(`${API_BASE_URL}/articles/${encodeURIComponent(slug)}`)
}

export const fetchAdminArticles = async (): Promise<Article[]> => {
  return requestJson(`${API_BASE_URL}/admin/articles`)
}

export const fetchAdminArticleBySlug = async (slug: string): Promise<Article> => {
  return requestJson(`${API_BASE_URL}/admin/articles/slug/${encodeURIComponent(slug)}`)
}

export const createAdminArticle = async (article: Article): Promise<Article> => {
  return requestJson(`${API_BASE_URL}/admin/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(article)
  })
}

export const updateAdminArticle = async (id: number, article: Article): Promise<Article> => {
  return requestJson(`${API_BASE_URL}/admin/articles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(article)
  })
}

export const updateAdminArticleStatus = async (id: number, status: ArticleStatus): Promise<Article> => {
  return requestJson(`${API_BASE_URL}/admin/articles/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status })
  })
}

export const updateAdminArticlePinned = async (id: number, isPinned: boolean): Promise<Article> => {
  return requestJson(`${API_BASE_URL}/admin/articles/${id}/pin`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ isPinned })
  })
}

export const deleteAdminArticle = async (id: number): Promise<void> => {
  return requestNoContent(`${API_BASE_URL}/admin/articles/${id}`, {
    method: 'DELETE'
  })
}

export const getArticleStatusLabel = (status: ArticleStatus | string) => {
  const labels: Record<ArticleStatus, string> = {
    draft: 'Draft',
    published: 'Published',
    archived: 'Archived'
  }

  return labels[status as ArticleStatus] ?? labels.draft
}
