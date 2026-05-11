<template>
  <div
    v-show="isVisible"
    ref="cursorRef"
    class="custom-cursor"
    :class="{ hover: isHovering }"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const cursorRef = ref<HTMLDivElement | null>(null)
const isHovering = ref(false)
const isVisible = ref(true)

let mouseX = 0
let mouseY = 0
let cursorX = 0
let cursorY = 0
let animationId = 0
let hoverables: Element[] = []

function handleMouseMove(event: MouseEvent) {
  mouseX = event.clientX
  mouseY = event.clientY
}

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.2
  cursorY += (mouseY - cursorY) * 0.2

  if (cursorRef.value) {
    cursorRef.value.style.left = `${cursorX}px`
    cursorRef.value.style.top = `${cursorY}px`
  }

  animationId = window.requestAnimationFrame(animateCursor)
}

function handleMouseEnter() {
  isVisible.value = true
}

function handleMouseLeave() {
  isVisible.value = false
}

function enableHover() {
  isHovering.value = true
}

function disableHover() {
  isHovering.value = false
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseenter', handleMouseEnter)
  document.addEventListener('mouseleave', handleMouseLeave)

  hoverables = Array.from(document.querySelectorAll('.hoverable, a, button'))
  hoverables.forEach((element) => {
    element.addEventListener('mouseenter', enableHover)
    element.addEventListener('mouseleave', disableHover)
  })

  animateCursor()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseenter', handleMouseEnter)
  document.removeEventListener('mouseleave', handleMouseLeave)
  hoverables.forEach((element) => {
    element.removeEventListener('mouseenter', enableHover)
    element.removeEventListener('mouseleave', disableHover)
  })
  window.cancelAnimationFrame(animationId)
})
</script>

<style scoped>
.custom-cursor {
  width: 24px;
  height: 24px;
  border: 2px solid var(--vg-accent);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
  transition:
    width 0.2s,
    height 0.2s,
    background-color 0.2s,
    border-color 0.2s,
    opacity 0.2s;
}

.custom-cursor.hover {
  width: 60px;
  height: 60px;
  background-color: var(--vg-accent);
  border-color: transparent;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .custom-cursor {
    display: none;
  }
}
</style>
