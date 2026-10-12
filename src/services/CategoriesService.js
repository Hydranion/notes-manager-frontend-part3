export class CategoriesService {
  constructor(api) { this.api = api }
  list() { return this.api.get('/categories') }
  create(category) { return this.api.post('/categories', category) }
  update(id, category) { return this.api.patch(`/categories/${id}`, category) }
  remove(id) { return this.api.delete(`/categories/${id}`) }
}
