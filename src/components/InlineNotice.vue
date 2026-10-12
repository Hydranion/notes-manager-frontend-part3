<script setup>
defineProps({ type: { type: String, default: 'info' }, message: { type: String, required: true } })
</script>

<template><div class="notice" :class="`notice-${type}`" role="status"><span aria-hidden="true">{{ type === 'error' ? '!' : 'i' }}</span><p>{{ message }}</p><slot /></div></template>
