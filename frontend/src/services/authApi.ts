export type AdminProfile = {
  username: string
}

export type AdminLoginResponse = {
  token: string
  tokenType: string
  expiresAt: number
  admin: AdminProfile
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api'
const ADMIN_TOKEN_KEY = 'zhengeek_admin_token'
const ADMIN_TOKEN_EXPIRES_AT_KEY = 'zhengeek_admin_token_expires_at'

type ApiErrorResponse = {
  code?: string
  message?: string
}

export class AuthApiError extends Error {
  code?: string

  constructor(message: string, code?: string) {
    super(message)
    this.name = 'AuthApiError'
    this.code = code
  }
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
    throw new AuthApiError('无法连接后端服务，请确认后端已启动')
  }

  if (!response.ok) {
    const error = await parseApiError(response)
    throw new AuthApiError(error.message || '登录失败，请检查用户名和密码', error.code)
  }

  return response.json()
}

export const loginAdmin = async (username: string, password: string): Promise<AdminLoginResponse> => {
  const response = await requestJson<AdminLoginResponse>(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })

  saveAdminSession(response)
  return response
}

export const fetchAdminProfile = async (): Promise<AdminProfile> => {
  return requestJson(`${API_BASE_URL}/admin/me`, {
    headers: getAdminAuthHeaders()
  })
}

export const saveAdminSession = (response: AdminLoginResponse) => {
  localStorage.setItem(ADMIN_TOKEN_KEY, response.token)
  localStorage.setItem(ADMIN_TOKEN_EXPIRES_AT_KEY, String(response.expiresAt))
}

export const clearAdminSession = () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY)
  localStorage.removeItem(ADMIN_TOKEN_EXPIRES_AT_KEY)
}

export const getAdminAuthToken = () => {
  return localStorage.getItem(ADMIN_TOKEN_KEY)
}

export const getAdminAuthHeaders = (): Record<string, string> => {
  const token = getAdminAuthToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const isAdminAuthenticated = () => {
  const token = getAdminAuthToken()
  const expiresAt = Number(localStorage.getItem(ADMIN_TOKEN_EXPIRES_AT_KEY) ?? 0)

  return Boolean(token) && expiresAt > Math.floor(Date.now() / 1000)
}

export const getAuthApiErrorMessage = (error: unknown) => {
  if (error instanceof AuthApiError) {
    const labels: Record<string, string> = {
      AUTH_CONFIG_MISSING: '后台登录配置缺失，请检查后端环境变量',
      AUTH_INVALID: '用户名或密码错误，或登录已过期',
      AUTH_REQUIRED: '请先登录后台'
    }

    return error.code ? labels[error.code] ?? error.message : error.message
  }

  return '登录失败，请稍后再试'
}
