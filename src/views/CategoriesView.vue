<script setup>
import { onMounted, ref } from 'vue'
import { useServices } from '../composables/useServices'
import InlineNotice from '../components/InlineNotice.vue'

const { categories: categoryService, tags: tagService } = useServices()
const categories = ref([])
const tags = ref([])
const categoryName = ref('')
const categoryDescription = ref('')
const tagName = ref('')
const editing = ref(null)
const error = ref('')
const loading = ref(true)

async function load() {
  loading.value = true
  error.value = ''
  try {
    const [categoryRows, tagRows] = await Promise.all([categoryService.list(), tagService.list()])
    categories.value = categoryRows
    tags.value = tagRows
  } catch (cause) { error.value = cause.message } finally { loading.value = false }
}

async function saveCategory() {
  error.value = ''
  try {
    const payload = { name: categoryName.value.trim(), description: categoryDescription.value.trim() || null }
    if (editing.value) await categoryService.update(editing.value.id, payload)
    else await categoryService.create(payload)
    categoryName.value = ''; categoryDescription.value = ''; editing.value = null
    await load()
  } catch (cause) { error.value = cause.message }
}

function editCategory(item) { editing.value = item; categoryName.value = item.name; categoryDescription.value = item.description || '' }
function cancelEdit() { editing.value = null; categoryName.value = ''; categoryDescription.value = '' }

async function deleteCategory(item) {
  if (!window.confirm(`Видалити категорію «${item.name}»?`)) return
  try { await categoryService.remove(item.id); await load() } catch (cause) { error.value = cause.message }
}

async function saveTag() {
  error.value = ''
  try { await tagService.create({ name: tagName.value.trim() }); tagName.value = ''; await load() }
  catch (cause) { error.value = cause.message }
}

async function deleteTag(item) {
  if (!window.confirm(`Видалити тег «${item.name}»?`)) return
  try { await tagService.remove(item.id); await load() } catch (cause) { error.value = cause.message }
}

onMounted(load)
</script>

<template>
  <section class="manage-page">
    <div class="welcome-row compact-welcome"><div><p class="page-kicker">ОРГАНІЗАЦІЯ</p><h2>Наведіть лад у <em>думках.</em></h2><p class="page-intro">Категорії допомагають групувати нотатки, а теги — швидко їх знаходити.</p></div></div>
    <InlineNotice v-if="error" type="error" :message="error"><button class="text-button" @click="load">Повторити</button></InlineNotice>
    <div class="manage-grid">
      <section class="manage-panel"><div class="panel-heading"><div><span class="panel-icon lavender">◈</span><h2>Категорії</h2></div><span class="count-badge">{{ categories.length }}</span></div>
        <form class="compact-form" @submit.prevent="saveCategory"><label>Назва категорії<input v-model="categoryName" required maxlength="80" placeholder="Наприклад, Навчання" /></label><label>Опис <span class="optional-label">необов’язково</span><input v-model="categoryDescription" maxlength="500" placeholder="Короткий опис" /></label><div class="form-inline-actions"><button v-if="editing" class="button button-quiet" type="button" @click="cancelEdit">Скасувати</button><button class="button button-primary" type="submit">{{ editing ? 'Зберегти зміни' : 'Додати категорію' }}</button></div></form>
        <div class="managed-list"><div v-if="loading" class="list-placeholder">Завантаження…</div><div v-else-if="!categories.length" class="list-placeholder">Категорій ще немає. Додайте першу вище.</div><article v-for="item in categories" :key="item.id" class="managed-item"><span class="managed-dot"></span><div class="managed-copy"><strong>{{ item.name }}</strong><small>{{ item.description || 'Без опису' }}</small></div><span class="item-count">{{ item.notes?.length ?? item.noteCount ?? 0 }} нотаток</span><button class="icon-button" :aria-label="`Редагувати ${item.name}`" @click="editCategory(item)">✎</button><button class="icon-button danger-action" :aria-label="`Видалити ${item.name}`" @click="deleteCategory(item)">×</button></article></div>
      </section>
      <section class="manage-panel tags-panel"><div class="panel-heading"><div><span class="panel-icon mint">#</span><h2>Теги</h2></div><span class="count-badge">{{ tags.length }}</span></div>
        <form class="tag-create-form" @submit.prevent="saveTag"><input v-model="tagName" required maxlength="40" placeholder="Новий тег..." aria-label="Назва нового тегу" /><button class="button button-primary" type="submit">＋ Додати</button></form>
        <div v-if="loading" class="list-placeholder">Завантаження…</div><div v-else-if="!tags.length" class="list-placeholder">Тегів ще немає. Створіть тег для швидкого пошуку.</div><div v-else class="tag-cloud"><span v-for="item in tags" :key="item.id" class="tag-manage-chip"># {{ item.name }}<button :aria-label="`Видалити тег ${item.name}`" @click="deleteTag(item)">×</button></span></div>
        <div class="tag-hint"><span>✦</span><p>Одна нотатка може мати кілька тегів. Наприклад: <b>#ідеї</b>, <b>#важливо</b>, <b>#пізніше</b>.</p></div>
      </section>
    </div>
  </section>
</template>
