export class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = (baseUrl || 'http://localhost:3000/api').replace(/\/$/, '')
  }

  async request(path, options = {}) {
    let response
    try {
      response = await fetch(`${this.baseUrl}${path}`, {
        ...options,
        headers: {
          ...(options.body ? { 'Content-Type': 'application/json' } : {}),
          ...options.headers,
        },
      })
    } catch {
      throw new Error('Не вдалося зʼєднатися із сервером. Перевірте, чи запущено API.')
    }

    if (response.status === 204) return null
    const payload = await response.json().catch(() => ({}))
    if (!response.ok) {
      throw new Error(payload?.error?.message || `Помилка сервера (${response.status})`)
    }
    return payload.data
  }

  get(path) { return this.request(path) }
  post(path, data) { return this.request(path, { method: 'POST', body: JSON.stringify(data) }) }
  patch(path, data) { return this.request(path, { method: 'PATCH', body: JSON.stringify(data) }) }
  delete(path) { return this.request(path, { method: 'DELETE' }) }
}
