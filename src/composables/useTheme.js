import { ref, watch } from 'vue'

const theme = ref(localStorage.getItem('theme') || 'light')

watch(theme, (newTheme) => {
  localStorage.setItem('theme', newTheme)
})

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

export function useTheme() {
  return { theme, toggleTheme }
}
