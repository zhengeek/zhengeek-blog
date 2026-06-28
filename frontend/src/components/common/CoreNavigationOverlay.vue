<script setup lang="ts">
import type { CoreNavItem } from '../../data/coreNavigation'

defineProps<{
  visible: boolean
  items: CoreNavItem[]
}>()

const emit = defineEmits<{
  select: [item: CoreNavItem]
}>()
</script>

<template>
  <Transition name="core-menu">
    <div v-if="visible" class="core-navigation" aria-label="Core navigation">
      <div class="core-navigation-field">
        <svg class="connector-field" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line
            v-for="item in items"
            :key="item.id"
            x1="50"
            y1="50"
            :x2="item.x"
            :y2="item.y"
          />
          <circle cx="50" cy="50" r="15" />
        </svg>

        <a
          v-for="(item, index) in items"
          :key="item.id"
          class="core-nav-node hoverable"
          :class="`theme-${item.theme}`"
          :href="item.to"
          :style="{ left: `${item.x}%`, top: `${item.y}%`, '--node-delay': `${index * 55}ms` }"
          @click.prevent="emit('select', item)"
        >
          <small>{{ item.eyebrow }}</small>
          <strong>{{ item.label }}</strong>
          <span>0{{ index + 1 }}</span>
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
  display: grid;
  place-items: center;
  pointer-events: none;
  background: radial-gradient(circle at center, rgba(5, 12, 31, 0.18) 0 20%, rgba(4, 3, 16, 0.72) 68%, rgba(4, 3, 16, 0.9) 100%);
  backdrop-filter: blur(4px);
}

.core-navigation-field {
  position: relative;
  width: min(94vw, 1080px);
  height: min(82vh, 760px);
}

.connector-field {
  position: absolute;
  inset: 0;
  overflow: visible;
}

.connector-field line,
.connector-field circle {
  fill: none;
  stroke: rgba(0, 240, 255, 0.58);
  stroke-width: 0.16;
  vector-effect: non-scaling-stroke;
  filter: drop-shadow(0 0 5px rgba(0, 240, 255, 0.7));
  stroke-dasharray: 120;
  animation: draw-connector 0.65s ease forwards;
}

.connector-field circle { stroke: rgba(255, 215, 0, 0.32); stroke-dasharray: 3 3; }

.core-nav-node {
  --node-color: #00f0ff;
  position: absolute;
  display: grid;
  width: clamp(132px, 15vw, 196px);
  min-height: 70px;
  align-content: center;
  padding: 0.7rem 1rem;
  border: 1px solid color-mix(in srgb, var(--node-color) 55%, transparent);
  background: linear-gradient(135deg, color-mix(in srgb, var(--node-color) 11%, rgba(7, 5, 20, 0.88)), rgba(7, 5, 20, 0.9));
  box-shadow: inset 0 0 22px color-mix(in srgb, var(--node-color) 5%, transparent), 0 0 22px color-mix(in srgb, var(--node-color) 14%, transparent);
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

@keyframes draw-connector { from { stroke-dashoffset: 120; opacity: 0; } to { stroke-dashoffset: 0; opacity: 1; } }
@keyframes deploy-node { to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }

@media (max-width: 680px) {
  .core-navigation-field { width: 100vw; height: 72vh; }
  .core-nav-node { width: 112px; min-height: 60px; padding: 0.55rem 0.65rem; }
  .core-nav-node small { display: none; }
  .core-nav-node strong { font-size: 0.72rem; letter-spacing: 0.08em; }
  .menu-hint { width: calc(100% - 2rem); text-align: center; font-size: 0.55rem; }
}

@media (prefers-reduced-motion: reduce) {
  .connector-field line,
  .connector-field circle,
  .core-nav-node { animation-duration: 0.01ms; }
}
</style>

