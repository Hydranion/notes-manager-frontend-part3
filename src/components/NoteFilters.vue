<script setup>
defineProps({
  search: { type: String, default: '' },
  categoryId: { type: [String, Number], default: '' },
  tagId: { type: [String, Number], default: '' },
  categories: { type: Array, default: () => [] },
  tags: { type: Array, default: () => [] },
})
const emit = defineEmits(['update:search', 'update:categoryId', 'update:tagId'])
</script>

<template>
  <div class="filter-panel">
    <label class="search-box">
      <span class="search-icon" aria-hidden="true">⌕</span>
      <input :value="search" type="search" placeholder="Знайти нотатку..." aria-label="Пошук нотаток" @input="emit('update:search', $event.target.value)" />
      <kbd>⌘ K</kbd>
    </label>
    <label class="select-wrap"><span class="sr-only">Фільтр за категорією</span>
      <select :value="categoryId" @change="emit('update:categoryId', $event.target.value)"><option value="">Усі категорії</option><option v-for="item in categories" :key="item.id" :value="item.id">{{ item.name }}</option></select>
    </label>
    <label class="select-wrap"><span class="sr-only">Фільтр за тегом</span>
      <select :value="tagId" @change="emit('update:tagId', $event.target.value)"><option value="">Усі теги</option><option v-for="item in tags" :key="item.id" :value="item.id"># {{ item.name }}</option></select>
    </label>
  </div>
</template>
