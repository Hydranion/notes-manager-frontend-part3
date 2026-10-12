<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({ open: Boolean, note: { type: Object, default: null }, categories: { type: Array, default: () => [] }, tags: { type: Array, default: () => [] }, saving: Boolean })
const emit = defineEmits(['close', 'save'])
const form = reactive({ title: '', content: '', categoryId: '', tagIds: [] })

watch(() => [props.open, props.note], () => {
  form.title = props.note?.title || ''
  form.content = props.note?.content || ''
  form.categoryId = props.note?.categoryId ? String(props.note.categoryId) : ''
  form.tagIds = (props.note?.tags || []).map((tag) => String(tag.id))
}, { immediate: true })

function submit() {
  emit('save', {
    title: form.title.trim(), content: form.content.trim(),
    categoryId: form.categoryId ? Number(form.categoryId) : null,
    tagIds: form.tagIds.map(Number),
  })
}
</script>

<template>
  <div v-if="open" class="modal-backdrop" @click.self="emit('close')">
    <section class="note-modal" role="dialog" aria-modal="true" :aria-label="note ? 'Редагування нотатки' : 'Нова нотатка'">
      <div class="modal-heading"><div><p class="eyebrow">ЗБЕРЕЖІТЬ СВОЮ ДУМКУ</p><h2>{{ note ? 'Редагувати нотатку' : 'Нова нотатка' }}</h2></div><button class="icon-button modal-close" type="button" aria-label="Закрити" @click="emit('close')">×</button></div>
      <form class="note-form" @submit.prevent="submit">
        <label>Назва<input v-model="form.title" maxlength="160" required autofocus placeholder="Наприклад, ідея для проєкту" /></label>
        <label>Текст<textarea v-model="form.content" rows="7" required placeholder="Запишіть усе, що не хочете забути..."></textarea></label>
        <div class="form-row">
          <label>Категорія<select v-model="form.categoryId"><option value="">Без категорії</option><option v-for="item in categories" :key="item.id" :value="String(item.id)">{{ item.name }}</option></select></label>
          <label>Теги<select v-model="form.tagIds" multiple size="3"><option v-for="item in tags" :key="item.id" :value="String(item.id)">{{ item.name }}</option></select></label>
        </div>
        <p v-if="tags.length" class="form-hint">Щоб обрати кілька тегів, утримуйте Ctrl (Windows) або ⌘ (Mac).</p>
        <div class="modal-actions"><button class="button button-quiet" type="button" @click="emit('close')">Скасувати</button><button class="button button-primary" type="submit" :disabled="saving">{{ saving ? 'Збереження…' : 'Зберегти нотатку' }}</button></div>
      </form>
    </section>
  </div>
</template>
