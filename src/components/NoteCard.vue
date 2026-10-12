<script setup>
defineProps({ note: { type: Object, required: true } })
defineEmits(['edit', 'delete'])

function shortDate(value) {
  if (!value) return ''
  return new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: 'short' }).format(new Date(value))
}
</script>

<template>
  <article class="note-card">
    <div class="note-card-top">
      <span v-if="note.category" class="category-chip"><i></i>{{ note.category.name }}</span>
      <div class="card-actions">
        <button class="icon-button" type="button" :aria-label="`Редагувати ${note.title}`" title="Редагувати" @click="$emit('edit', note)">✎</button>
        <button class="icon-button danger-action" type="button" :aria-label="`Видалити ${note.title}`" title="Видалити" @click="$emit('delete', note)">×</button>
      </div>
    </div>
    <h3>{{ note.title }}</h3>
    <p class="note-excerpt">{{ note.content }}</p>
    <div class="note-card-bottom">
      <div class="tag-list"><span v-for="tag in (note.tags || [])" :key="tag.id" class="tag-chip"># {{ tag.name }}</span></div>
      <time>{{ shortDate(note.updatedAt || note.createdAt) }}</time>
    </div>
  </article>
</template>
