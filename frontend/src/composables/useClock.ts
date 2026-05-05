import { computed, onMounted, onUnmounted, ref } from 'vue'

export function useClock() {
  const now = ref(new Date())
  let timer: number | undefined

  const clockTime = computed(() => {
    const hours = String(now.value.getHours()).padStart(2, '0')
    const minutes = String(now.value.getMinutes()).padStart(2, '0')

    return { hours, minutes }
  })

  const dateLabel = computed(() => {
    const year = now.value.getFullYear()
    const month = String(now.value.getMonth() + 1).padStart(2, '0')
    const day = String(now.value.getDate()).padStart(2, '0')

    return `${year} / ${month} / ${day}`
  })

  const weekdayLabel = computed(() =>
    new Intl.DateTimeFormat('zh-CN', { weekday: 'short' }).format(now.value),
  )

  onMounted(() => {
    timer = window.setInterval(() => {
      now.value = new Date()
    }, 1000)
  })

  onUnmounted(() => {
    if (timer) {
      window.clearInterval(timer)
    }
  })

  return {
    clockTime,
    dateLabel,
    weekdayLabel,
  }
}