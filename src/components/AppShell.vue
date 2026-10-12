<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppSidebar from './AppSidebar.vue'

const route = useRoute()
const title = computed(() => route.meta.title || 'Менеджер нотаток')
</script>

<template>
  <div class="app-shell">
    <AppSidebar />
    <main class="main-area">
      <header class="topbar">
        <div>
          <p class="eyebrow">ПРОСТІР ДЛЯ ДУМОК</p>
          <h1>{{ title }}</h1>
        </div>
        <div class="topbar-mark" aria-hidden="true">✦</div>
      </header>
      <div class="page-content"><slot /></div>
    </main>
  </div>
</template>
