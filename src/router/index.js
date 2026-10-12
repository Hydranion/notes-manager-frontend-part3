import { createRouter, createWebHistory } from 'vue-router'
import NotesView from '../views/NotesView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import AboutView from '../views/AboutView.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/notes' },
    { path: '/notes', name: 'notes', component: NotesView, meta: { title: 'Мої нотатки' } },
    { path: '/categories', name: 'categories', component: CategoriesView, meta: { title: 'Категорії та теги' } },
    { path: '/about', name: 'about', component: AboutView, meta: { title: 'Про застосунок' } },
    { path: '/:pathMatch(.*)*', redirect: '/notes' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
