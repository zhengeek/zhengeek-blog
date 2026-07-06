export type MessageTopic = 'creative' | 'studio' | 'technology' | 'casual'

export type ContactMessagePayload = {
  name: string
  email: string
  topic: MessageTopic
  content: string
}

export type ContactMessageResponse = {
  id: number
  createdAt: string
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api'

type ApiErrorResponse = {
  message?: string
}

export class MessageApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MessageApiError'
  }
}

export async function submitContactMessage(
  payload: ContactMessagePayload
): Promise<ContactMessageResponse> {
  let response: Response

  try {
    response = await fetch(`${API_BASE_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
  } catch {
    throw new MessageApiError('暂时无法连接留言服务，请稍后再试。')
  }

  if (!response.ok) {
    let error: ApiErrorResponse = {}
    try {
      error = await response.json() as ApiErrorResponse
    } catch {
      // Keep the user-facing fallback below when the server has no JSON body.
    }
    throw new MessageApiError(error.message || '留言发送失败，请检查内容后再试。')
  }

  return response.json() as Promise<ContactMessageResponse>
}
