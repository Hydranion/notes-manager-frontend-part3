import { ApiClient } from './ApiClient'
import { CategoriesService } from './CategoriesService'
import { NotesService } from './NotesService'
import { TagsService } from './TagsService'

export function createServices(apiUrl) {
  const api = new ApiClient(apiUrl)
  return {
    api,
    notes: new NotesService(api),
    categories: new CategoriesService(api),
    tags: new TagsService(api),
  }
}
