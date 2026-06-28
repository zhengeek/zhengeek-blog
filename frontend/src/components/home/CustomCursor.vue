<template>
  <div v-show="isVisible" ref="cursorRef" class="custom-cursor" :class="{ hovering: isHovering }" aria-hidden="true">
    <span class="cursor-dot"></span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const cursorRef = ref<HTMLDivElement | null>(null)
const isHovering = ref(false)
const isVisible = ref(false)
let mouseX = 0
let mouseY = 0
let cursorX = 0
let cursorY = 0
let animationId = 0

function handleMouseMove(event: MouseEvent) {
  mouseX = event.clientX
  mouseY = event.clientY
  isVisible.value = true
}

function handleMouseOver(event: MouseEvent) {
  const target = event.target as Element | null
  isHovering.value = Boolean(target?.closest('a, button, input, textarea, .hoverable, .hud-panel'))
}

function handleDocumentLeave() {
  isVisible.value = false
}

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.34
  cursorY += (mouseY - cursorY) * 0.34

  if (cursorRef.value) {
    cursorRef.value.style.left = `${cursorX}px`
    cursorRef.value.style.top = `${cursorY}px`
  }

  animationId = window.requestAnimationFrame(animateCursor)
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseover', handleMouseOver)
  document.addEventListener('mouseleave', handleDocumentLeave)
  animateCursor()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseover', handleMouseOver)
  document.removeEventListener('mouseleave', handleDocumentLeave)
  window.cancelAnimationFrame(animationId)
})
</script>

<style scoped>
.custom-cursor {
  position: fixed;
  z-index: 12000;
  width: 30px;
  height: 30px;
  pointer-events: none;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.7));
  transition: transform 0.12s ease, opacity 0.2s ease;
}

.custom-cursor::before,
.custom-cursor::after {
  content: '';
  position: absolute;
  background: var(--vg-accent);
  transition: background 0.15s ease;
}

.custom-cursor::before { top: 50%; left: 0; width: 100%; height: 2px; transform: translateY(-50%); }
.custom-cursor::after { top: 0; left: 50%; width: 2px; height: 100%; transform: translateX(-50%); }

.cursor-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--vg-gold);
  box-shadow: 0 0 8px var(--vg-gold);
  transform: translate(-50%, -50%);
}

.custom-cursor.hovering { transform: translate(-50%, -50%) rotate(45deg) scale(1.24); }
.custom-cursor.hovering::before,
.custom-cursor.hovering::after { background: var(--vg-gold); }

@media (max-width: 768px), (hover: none), (pointer: coarse) {
  .custom-cursor { display: none; }
}
</style>
