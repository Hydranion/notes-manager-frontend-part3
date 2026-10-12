export class NotesService {
  constructor(api) { this.api = api }

  list(filters = {}) {
    const query = new URLSearchParams()
    if (filters.q?.trim()) query.set('q', filters.q.trim())
    if (filters.categoryId) query.set('categoryId', filters.categoryId)
    if (filters.tagId) query.set('tagId', filters.tagId)
    const suffix = query.size ? `?${query}` : ''
    return this.api.get(`/notes${suffix}`)
  }
  create(note) { return this.api.post('/notes', note) }
  update(id, note) { return this.api.patch(`/notes/${id}`, note) }
  remove(id) { return this.api.delete(`/notes/${id}`) }
}
