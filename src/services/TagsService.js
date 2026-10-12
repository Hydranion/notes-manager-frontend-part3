export class TagsService {
  constructor(api) { this.api = api }
  list() { return this.api.get('/tags') }
  create(tag) { return this.api.post('/tags', tag) }
  update(id, tag) { return this.api.patch(`/tags/${id}`, tag) }
  remove(id) { return this.api.delete(`/tags/${id}`) }
}
