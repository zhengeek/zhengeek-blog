<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { CoreNavItem } from '../../data/coreNavigation'

const props = defineProps<{
  visible: boolean
  items: CoreNavItem[]
}>()

const emit = defineEmits<{
  select: [item: CoreNavItem]
}>()

const lineColors = {
  cyan: '#00f0ff',
  violet: '#a78bfa',
  red: '#ff5a72',
  blue: '#4d91ff',
  gold: '#ffd24a',
  pink: '#ff62bd'
}

const CORE_CENTER = { x: 50, y: 50 }
const CORE_RADIUS_HEIGHT_RATIO = 0.188

const fieldSize = ref({ width: 1440, height: 900 })
let resizeFrame = 0

function updateFieldSize() {
  cancelAnimationFrame(resizeFrame)
  resizeFrame = requestAnimationFrame(() => {
    fieldSize.value = {
      width: window.innerWidth || 1440,
      height: window.innerHeight || 900
    }
  })
}

function setFieldSize() {
  fieldSize.value = {
    width: window.innerWidth || 1440,
    height: window.innerHeight || 900
  }
}

function layoutFrame() {
  const { width, height } = fieldSize.value
  const mobile = width <= 680
  const frameWidth = mobile ? width : Math.min(width * 0.94, 1080)
  const frameHeight = mobile ? height * 0.72 : Math.min(height * 0.82, 760)

  return {
    left: (width - frameWidth) / 2 / width * 100,
    top: (height - frameHeight) / 2 / height * 100,
    width: frameWidth / width * 100,
    height: frameHeight / height * 100
  }
}

const coreRadius = computed(() => {
  const { width, height } = fieldSize.value
  const radius = height * CORE_RADIUS_HEIGHT_RATIO
  return {
    px: radius,
    x: radius / width * 100,
    y: radius / height * 100
  }
})

function nodePoint(item: CoreNavItem) {
  const frame = layoutFrame()
  return {
    x: frame.left + item.x * frame.width / 100,
    y: frame.top + item.y * frame.height / 100
  }
}

type DecoratedNavItem = CoreNavItem & {
  color: string
  delay: string
  number: string
  nodeX: number
  nodeY: number
  startX: number
  startY: number
  path: string
  pulseX: number
  pulseY: number
}

const decoratedItems = computed<DecoratedNavItem[]>(() => {
  const { width, height } = fieldSize.value
  const radius = coreRadius.value.px

  return props.items.map((item, index) => {
    const node = nodePoint(item)
    const deltaX = (node.x - CORE_CENTER.x) * width / 100
    const deltaY = (node.y - CORE_CENTER.y) * height / 100
    const length = Math.hypot(deltaX, deltaY) || 1
    const startX = CORE_CENTER.x + deltaX / length * radius / width * 100
    const startY = CORE_CENTER.y + deltaY / length * radius / height * 100

    return {
      ...item,
      color: lineColors[item.theme],
      delay: `${index * 55}ms`,
      number: `0${index + 1}`,
      nodeX: node.x,
      nodeY: node.y,
      startX,
      startY,
      path: `M ${startX} ${startY} L ${node.x} ${node.y}`,
      pulseX: startX + (node.x - startX) * 0.66,
      pulseY: startY + (node.y - startY) * 0.66
    }
  })
})

onMounted(() => {
  setFieldSize()
  window.addEventListener('resize', updateFieldSize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(resizeFrame)
  window.removeEventListener('resize', updateFieldSize)
})
</script>

<template>
  <Transition name="core-menu">
    <div v-if="visible" class="core-navigation" aria-label="Core navigation">
      <div class="core-navigation-field">
        <svg class="connector-field" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <ellipse class="core-orbit core-orbit-outer" cx="50" cy="50" :rx="coreRadius.x * 1.2" :ry="coreRadius.y * 1.2" />
          <ellipse class="core-orbit" cx="50" cy="50" :rx="coreRadius.x" :ry="coreRadius.y" />
          <g
            v-for="item in decoratedItems"
            :key="item.id"
            :style="{ '--line-color': item.color }"
          >
            <path
              class="connector-glow"
              :d="item.path"
            />
            <path
              class="connector-beam"
              :d="item.path"
            />
            <circle class="connector-pulse" :cx="item.pulseX" :cy="item.pulseY" r="0.28" />
            <circle class="connector-joint core-joint" :cx="item.startX" :cy="item.startY" r="0.46" />
            <circle class="connector-joint panel-joint" :cx="item.nodeX" :cy="item.nodeY" r="0.56" />
          </g>
        </svg>

        <a
          v-for="item in decoratedItems"
          :key="item.id"
          class="core-nav-node hoverable"
          :class="`theme-${item.theme}`"
          :href="item.to"
          :style="{ left: `${item.nodeX}%`, top: `${item.nodeY}%`, '--node-delay': item.delay }"
          @click.prevent="emit('select', item)"
        >
          <small>{{ item.eyebrow }}</small>
          <strong>{{ item.label }}</strong>
          <span>{{ item.number }}</span>
        </a>
      </div>
      <p class="menu-hint">SELECT A CORE LINK // CLICK CORE OR PRESS ESC TO CLOSE</p>
    </div>
  </Transition>
</template>

<style scoped>
.core-navigation {
  position: fixed;
  inset: 0;
  z-index: 80;
  pointer-events: none;
}

.core-navigation-field {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
}

.core-navigation-field::before {
  content: '';
  position: absolute;
  inset: 7% 3%;
  background:
    linear-gradient(rgba(0, 240, 255, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 240, 255, 0.05) 1px, transparent 1px);
  background-size: 100% 34px, 62px 100%;
  opacity: 0.18;
  pointer-events: none;
}

.connector-field {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.connector-field path,
.core-orbit {
  --line-opacity: 1;
  fill: none;
  stroke: var(--line-color, rgba(0, 240, 255, 0.58));
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
  stroke-dasharray: 120;
  animation: draw-connector 0.65s ease forwards;
}

.connector-glow {
  --line-opacity: 0.16;
  stroke-width: 5.5;
}

.connector-beam {
  --line-opacity: 0.88;
  stroke-width: 1.45;
}

.connector-pulse {
  fill: var(--line-color);
  opacity: 0.82;
  vector-effect: non-scaling-stroke;
}

.connector-joint {
  fill: #fff;
  stroke: var(--line-color);
  stroke-width: 0.55;
  vector-effect: non-scaling-stroke;
  animation: joint-deploy 0.3s ease 0.42s both;
}

.panel-joint { fill: var(--line-color); }
.core-orbit { --line-color: rgba(0, 240, 255, 0.5); --line-opacity: 0.5; stroke-width: 1; stroke-dasharray: 5 6; }
.core-orbit-outer { --line-color: rgba(255, 210, 74, 0.34); --line-opacity: 0.48; stroke-width: 0.75; stroke-dasharray: 1 7; }

.core-nav-node {
  --node-color: #00f0ff;
  position: absolute;
  display: grid;
  width: clamp(132px, 15vw, 196px);
  min-height: 70px;
  align-content: center;
  padding: 0.7rem 1rem;
  border: 1px solid color-mix(in srgb, var(--node-color) 55%, transparent);
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--node-color) 16%, transparent), transparent 34%),
    linear-gradient(135deg, color-mix(in srgb, var(--node-color) 13%, rgba(7, 5, 20, 0.9)), rgba(7, 5, 20, 0.88));
  box-shadow: inset 0 0 24px color-mix(in srgb, var(--node-color) 8%, transparent), 0 0 26px color-mix(in srgb, var(--node-color) 18%, transparent);
  color: #fff;
  font-family: var(--font-mono);
  text-decoration: none;
  clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
  pointer-events: auto;
  transform: translate(-50%, -50%) scale(0.72);
  opacity: 0;
  animation: deploy-node 0.42s cubic-bezier(0.16, 1, 0.3, 1) var(--node-delay) forwards;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
}

.core-nav-node::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 3px;
  height: 34px;
  background: var(--node-color);
  box-shadow: 0 0 14px var(--node-color);
  transform: translateY(-50%);
}

.core-nav-node::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, transparent 0 76%, color-mix(in srgb, var(--node-color) 42%, transparent) 76% 77%, transparent 77%),
    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 100% 100%, 100% 9px;
  opacity: 0.18;
  pointer-events: none;
}

.core-nav-node small { color: rgba(203, 213, 225, 0.55); font-size: 0.58rem; letter-spacing: 0.14em; }
.core-nav-node strong { margin-top: 0.2rem; color: var(--node-color); font-size: clamp(0.86rem, 1.25vw, 1.05rem); letter-spacing: 0.13em; }
.core-nav-node > span { position: absolute; right: 0.55rem; bottom: 0.35rem; color: rgba(255, 255, 255, 0.26); font-size: 0.58rem; }
.core-nav-node:hover,
.core-nav-node:focus-visible { outline: none; border-color: var(--node-color); box-shadow: inset 0 0 26px color-mix(in srgb, var(--node-color) 12%, transparent), 0 0 32px color-mix(in srgb, var(--node-color) 38%, transparent); filter: brightness(1.22); }
.theme-violet { --node-color: #a78bfa; }
.theme-red { --node-color: #ff5a72; }
.theme-blue { --node-color: #4d91ff; }
.theme-gold { --node-color: #ffd24a; }
.theme-pink { --node-color: #ff62bd; }

.menu-hint {
  position: absolute;
  bottom: 1.35rem;
  margin: 0;
  color: rgba(0, 240, 255, 0.48);
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
}

.core-menu-enter-active,
.core-menu-leave-active { transition: opacity 0.25s ease; }
.core-menu-enter-from,
.core-menu-leave-to { opacity: 0; }

@keyframes draw-connector { from { stroke-dashoffset: 120; opacity: 0; } to { stroke-dashoffset: 0; opacity: var(--line-opacity); } }
@keyframes joint-deploy { from { opacity: 0; transform: scale(0); transform-origin: center; } to { opacity: 1; transform: scale(1); transform-origin: center; } }
@keyframes deploy-node { to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }

@media (max-width: 680px) {
  .core-nav-node { width: 112px; min-height: 60px; padding: 0.55rem 0.65rem; }
  .core-nav-node small { display: none; }
  .core-nav-node strong { font-size: 0.72rem; letter-spacing: 0.08em; }
  .menu-hint { width: calc(100% - 2rem); text-align: center; font-size: 0.55rem; }
}

@media (prefers-reduced-motion: reduce) {
  .connector-field path,
  .connector-field circle,
  .core-nav-node { animation-duration: 0.01ms; }
}
</style>
