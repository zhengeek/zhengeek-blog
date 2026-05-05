import { computed, onMounted, onUnmounted, ref } from 'vue'

export function useParallax() {
  const scrollY = ref(0)

  const parallaxVars = computed(() => ({
    '--sky-shift': `${scrollY.value * 0.08}px`,
    '--moon-shift': `${scrollY.value * 0.18}px`,
    '--mountain-shift': `${scrollY.value * 0.28}px`,
    '--cloud-shift': `${scrollY.value * 0.42}px`,
  }))

  function updateScroll() {
    scrollY.value = window.scrollY
  }

  onMounted(() => {
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll)
  })

  return {
    parallaxVars,
  }
}