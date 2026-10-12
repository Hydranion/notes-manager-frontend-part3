<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useServices } from '../composables/useServices'
import { usePreferences } from '../composables/usePreferences'
import InlineNotice from '../components/InlineNotice.vue'
import NoteCard from '../components/NoteCard.vue'
import NoteFilters from '../components/NoteFilters.vue'
import NoteFormModal from '../components/NoteFormModal.vue'

const { notes: notesService, categories: categoriesService, tags: tagsService } = useServices()
const preferences = usePreferences()
const notes = ref([])
const categories = ref([])
const tags = ref([])
const loading = ref(true)
const saving = ref(false)
const error = ref('')
const modalOpen = ref(false)
const editingNote = ref(null)
let searchTimer

const noteCount = computed(() => notes.value.length)

async function loadNotes() {
  loading.value = true
  error.value = ''
  try {
    notes.value = await notesService.list(preferences.value)
  } catch (cause) {
    error.value = cause.message
  } finally {
    loading.value = false
  }
}

async function loadLookups() {
  try {
    const [categoryRows, tagRows] = await Promise.all([categoriesService.list(), tagsService.list()])
    categories.value = categoryRows
    tags.value = tagRows
  } catch (cause) {
    error.value = cause.message
  }
}

function openCreate() { editingNote.value = null; modalOpen.value = true }
function openEdit(note) { editingNote.value = note; modalOpen.value = true }
function closeModal() { modalOpen.value = false; editingNote.value = null }

async function saveNote(data) {
  saving.value = true
  error.value = ''
  try {
    if (editingNote.value) await notesService.update(editingNote.value.id, data)
    else await notesService.create(data)
    closeModal()
    await loadNotes()
  } catch (cause) {
    error.value = cause.message
  } finally {
    saving.value = false
  }
}

async function deleteNote(note) {
  if (!window.confirm(`Видалити нотатку «${note.title}»?`)) return
  try {
    await notesService.remove(note.id)
    await loadNotes()
  } catch (cause) { error.value = cause.message }
}

watch(preferences, () => {
  window.clearTimeout(searchTimer)
  searchTimer = window.setTimeout(loadNotes, 250)
}, { deep: true })

onMounted(async () => {
  await Promise.all([loadLookups(), loadNotes()])
})
</script>

<template>
  <section class="notes-page">
    <div class="welcome-row">
      <div><p class="page-kicker">ПОНЕДІЛОК, НОВИЙ ПОЧАТОК</p><h2>З думки починається <em>ідея.</em></h2><p class="page-intro">Зберігайте важливе, знаходьте потрібне, звільняйте місце для нового.</p></div>
      <button class="button button-primary create-button" type="button" @click="openCreate"><span>＋</span> Нова нотатка</button>
    </div>

    <InlineNotice v-if="error" type="error" :message="error"><button class="text-button" @click="loadNotes">Повторити</button></InlineNotice>

    <div class="section-heading"><div><h2>Ваші нотатки <span class="count-badge">{{ loading ? '…' : noteCount }}</span></h2><p>Усе збережене — в одному місці.</p></div><span class="sort-label">Останні оновлені <span>⌄</span></span></div>
    <NoteFilters v-model:search="preferences.search" v-model:category-id="preferences.categoryId" v-model:tag-id="preferences.tagId" :categories="categories" :tags="tags" />

    <div v-if="loading" class="loading-state"><span class="loader"></span><span>Завантажуємо нотатки…</span></div>
    <div v-else-if="notes.length" class="note-grid"><NoteCard v-for="note in notes" :key="note.id" :note="note" @edit="openEdit" @delete="deleteNote" /></div>
    <div v-else class="empty-state"><div class="empty-illustration"><span>✎</span><i></i><b></b></div><h3>{{ preferences.search || preferences.categoryId || preferences.tagId ? 'Нічого не знайдено' : 'Тут поки тихо' }}</h3><p>{{ preferences.search || preferences.categoryId || preferences.tagId ? 'Спробуйте змінити пошук або фільтри.' : 'Створіть першу нотатку, щоб почати збирати свої ідеї.' }}</p><button v-if="!preferences.search && !preferences.categoryId && !preferences.tagId" class="button button-primary" @click="openCreate">Створити нотатку</button></div>

    <NoteFormModal :open="modalOpen" :note="editingNote" :categories="categories" :tags="tags" :saving="saving" @close="closeModal" @save="saveNote" />
  </section>
</template>
