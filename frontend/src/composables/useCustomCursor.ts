import { onMounted, onUnmounted, ref } from 'vue'

export function useCustomCursor() {
  const cursorX = ref(0)
  const cursorY = ref(0)
  const isHovering = ref(false)
  const isVisible = ref(true)

  let mouseX = 0
  let mouseY = 0
  let currentX = 0
  let currentY = 0
  let frameId = 0

  function handleMouseMove(event: MouseEvent) {
    mouseX = event.clientX
    mouseY = event.clientY
  }

  function handleMouseEnter() {
    isVisible.value = true
  }

  function handleMouseLeave() {
    isVisible.value = false
  }

  function handlePointerOver(event: Event) {
    const target = event.target as HTMLElement | null
    if (target?.closest('a, button, .hoverable')) {
      isHovering.value = true
    }
  }

  function handlePointerOut(event: Event) {
    const target = event.target as HTMLElement | null
    if (target?.closest('a, button, .hoverable')) {
      isHovering.value = false
    }
  }

  function animateCursor() {
    currentX += (mouseX - currentX) * 0.2
    currentY += (mouseY - currentY) * 0.2
    cursorX.value = currentX
    cursorY.value = currentY
    frameId = window.requestAnimationFrame(animateCursor)
  }

  onMounted(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handlePointerOver)
    document.addEventListener('mouseout', handlePointerOut)
    animateCursor()
  })

  onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseenter', handleMouseEnter)
    document.removeEventListener('mouseleave', handleMouseLeave)
    document.removeEventListener('mouseover', handlePointerOver)
    document.removeEventListener('mouseout', handlePointerOut)
    window.cancelAnimationFrame(frameId)
  })

  return {
    cursorX,
    cursorY,
    isHovering,
    isVisible,
  }
}
