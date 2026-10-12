import { ref, watch } from 'vue'

const STORAGE_KEY = 'notes-manager-preferences-v1'
const defaults = { search: '', categoryId: '', tagId: '' }

function readPreferences() {
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }
  } catch {
    return { ...defaults }
  }
}

export function usePreferences() {
  const preferences = ref(readPreferences())
  watch(preferences, (value) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(value)) } catch { /* storage may be disabled */ }
  }, { deep: true })
  return preferences
}
