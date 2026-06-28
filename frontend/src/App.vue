<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { gsap } from 'gsap'
import CoreNavigationOverlay from './components/common/CoreNavigationOverlay.vue'
import CoreLobbyHud from './components/common/CoreLobbyHud.vue'
import DeveloperTerminal from './components/common/DeveloperTerminal.vue'
import GameLoginScreen from './components/common/GameLoginScreen.vue'
import InteractiveCoreScene from './components/common/InteractiveCoreScene.vue'
import CustomCursor from './components/home/CustomCursor.vue'
import CoreMainLayout from './layouts/CoreMainLayout.vue'
import {
  coreNavItems,
  routeThemeMap,
  sectionThemeMap,
  type CoreMode,
  type CoreNavItem,
  type CoreTheme
} from './data/coreNavigation'

const route = useRoute()
const router = useRouter()
const freshPublicVisit = !route.path.startsWith('/admin')
const gateVisible = ref(freshPublicVisit)
const hasBooted = ref(!freshPublicVisit)
const coreMode = ref<CoreMode>(freshPublicVisit ? 'boot' : 'hidden')
const coreTheme = ref<CoreTheme>('cyan')
const menuVisible = ref(false)
const terminalVisible = ref(false)
const holdProgress = ref(0)
const webglFailed = ref(false)
const shaking = ref(false)
const transitioning = ref(false)
const flashRef = ref<HTMLDivElement | null>(null)
let flashTimeline: gsap.core.Timeline | undefined
let fallbackIntro: gsap.core.Tween | undefined
let sectionObserver: IntersectionObserver | undefined

const isAdminRoute = computed(() => route.path.startsWith('/admin'))
const fallbackNavVisible = computed(() => webglFailed.value && !gateVisible.value && !isAdminRoute.value && (route.path === '/' || menuVisible.value))

function shakeScreen() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  shaking.value = false
  requestAnimationFrame(() => {
    shaking.value = true
    gsap.delayedCall(0.24, () => { shaking.value = false })
  })
}

function beginIntro() {
  coreMode.value = 'intro'
  if (webglFailed.value) fallbackIntro = gsap.delayedCall(0.25, finishIntro)
}

function finishIntro() {
  if (!gateVisible.value) return
  gateVisible.value = false
  hasBooted.value = true
  coreMode.value = webglFailed.value ? 'menu' : 'lobby'
  menuVisible.value = webglFailed.value
}

function handleCoreClick() {
  if (coreMode.value === 'lobby' || coreMode.value === 'radar') {
    shakeScreen()
    menuVisible.value = false
    coreMode.value = 'menu'
  } else if (coreMode.value === 'menu') {
    closeMenu()
  }
}

function closeMenu() {
  menuVisible.value = false
  coreMode.value = route.path === '/' ? 'lobby' : 'radar'
}

function handleMenuReady() {
  if (coreMode.value === 'menu') menuVisible.value = true
}

function openFallbackMenu() {
  coreMode.value = 'menu'
  menuVisible.value = true
}

function selectNavigation(item: CoreNavItem) {
  if (transitioning.value) return
  transitioning.value = true
  menuVisible.value = false
  coreTheme.value = item.theme
  coreMode.value = 'transitioning'
  shakeScreen()

  flashTimeline?.kill()
  if (!flashRef.value) return
  flashTimeline = gsap.timeline({
    onComplete: () => {
      coreMode.value = 'radar'
      transitioning.value = false
    }
  })
  flashTimeline
    .to(flashRef.value, { autoAlpha: 1, duration: 0.18, ease: 'power3.in' })
    .call(() => { void router.push(item.to) })
    .to(flashRef.value, { autoAlpha: 0, duration: 0.27, ease: 'power2.out' })
    .to({}, { duration: 0.45 })
}

function openTerminal() {
  if (coreMode.value !== 'radar') return
  shakeScreen()
  holdProgress.value = 0
  terminalVisible.value = true
  coreMode.value = 'terminal'
  document.body.classList.add('terminal-locked')
}

function closeTerminal() {
  terminalVisible.value = false
  coreMode.value = 'radar'
  document.body.classList.remove('terminal-locked')
}

function routeTheme() {
  if (route.path === '/nexus') {
    coreTheme.value = sectionThemeMap[route.hash.replace('#', '')] ?? coreTheme.value
    return
  }
  const match = Object.entries(routeThemeMap).find(([path]) => route.path === path || route.path.startsWith(`${path}/`))
  coreTheme.value = match?.[1] ?? 'cyan'
}

function observeNexusSections() {
  sectionObserver?.disconnect()
  if (route.path !== '/nexus') return
  const sections = Array.from(document.querySelectorAll<HTMLElement>('#about, #projects, #quest, #lab, #blog, #contact'))
  sectionObserver = new IntersectionObserver((entries) => {
    const active = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
    if (active) coreTheme.value = sectionThemeMap[active.target.id] ?? coreTheme.value
  }, { rootMargin: '-28% 0px -52% 0px', threshold: [0, 0.2, 0.5, 0.8] })
  sections.forEach((section) => sectionObserver?.observe(section))
}

async function handleRouteChange() {
  if (gateVisible.value && !isAdminRoute.value) {
    coreMode.value = 'boot'
    menuVisible.value = false
    document.body.classList.add('core-lobby-locked')
    await nextTick()
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    return
  }

  routeTheme()
  if (isAdminRoute.value) {
    menuVisible.value = false
    terminalVisible.value = false
    coreMode.value = 'hidden'
  } else if (!transitioning.value && !terminalVisible.value) {
    if (route.path === '/') coreMode.value = hasBooted.value ? 'lobby' : 'boot'
    else coreMode.value = 'radar'
  }
  document.body.classList.toggle('core-lobby-locked', route.path === '/')
  await nextTick()
  requestAnimationFrame(() => requestAnimationFrame(observeNexusSections))
}

function handleEscape(event: KeyboardEvent) {
  if (event.key !== 'Escape') return
  if (terminalVisible.value) closeTerminal()
  else if (coreMode.value === 'menu') closeMenu()
}

watch(() => route.fullPath, handleRouteChange, { immediate: true })

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
  if (freshPublicVisit) {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    if (route.path !== '/') void router.replace('/')
  }
})
onBeforeUnmount(() => {
  flashTimeline?.kill()
  fallbackIntro?.kill()
  sectionObserver?.disconnect()
  window.removeEventListener('keydown', handleEscape)
  document.body.classList.remove('core-lobby-locked', 'terminal-locked')
})
</script>

<template>
  <div class="app-shell" :class="{ 'is-shaking': shaking }">
    <InteractiveCoreScene
      :mode="coreMode"
      :theme="coreTheme"
      @core-click="handleCoreClick"
      @hold-progress="holdProgress = $event"
      @hold-complete="openTerminal"
      @intro-complete="finishIntro"
      @menu-ready="handleMenuReady"
      @webgl-failed="webglFailed = true"
    />
    <div class="magic-bloom" aria-hidden="true"></div>
    <div class="crt-overlay" aria-hidden="true"></div>
    <div class="scanline" aria-hidden="true"></div>
    <GameLoginScreen v-if="gateVisible" @start="beginIntro" />
    <CoreMainLayout />
    <CoreLobbyHud v-if="route.path === '/' && !gateVisible && coreMode === 'lobby'" />
    <div v-if="coreMode === 'menu'" class="core-menu-dimmer" aria-hidden="true"></div>
    <CoreNavigationOverlay :visible="menuVisible || fallbackNavVisible" :items="coreNavItems" @select="selectNavigation" />
    <button
      v-if="webglFailed && !gateVisible && !isAdminRoute && route.path !== '/'"
      class="fallback-core-trigger hoverable"
      type="button"
      @click="openFallbackMenu"
    >CORE NAV</button>
    <div v-if="holdProgress > 0" class="core-charge-ring" :style="{ '--charge': `${holdProgress * 360}deg` }" aria-hidden="true"></div>
    <DeveloperTerminal :visible="terminalVisible" @close="closeTerminal" />
    <div ref="flashRef" class="core-transition-flash" aria-hidden="true"></div>
    <CustomCursor />
  </div>
</template>

<style>
* { box-sizing: border-box; }

html {
  background: #070514;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  overflow-x: hidden;
  background: #070514;
  color: #e2e8f0;
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: filter 0.1s ease;
}

body.game-locked { overflow: hidden; }
body.core-lobby-locked,
body.terminal-locked { overflow: hidden; }
body.game-start-flash { filter: brightness(2.6); }

#app {
  position: relative;
  min-height: 100vh;
}

.app-shell { min-height: 100vh; }
.app-shell.is-shaking { animation: core-screen-shake 0.22s linear; }

.core-transition-flash {
  position: fixed;
  inset: 0;
  z-index: 15000;
  visibility: hidden;
  pointer-events: none;
  background: #fff;
  opacity: 0;
}

.core-menu-dimmer {
  position: fixed;
  inset: 0;
  z-index: 30;
  pointer-events: none;
  background:
    radial-gradient(circle at center, rgba(7, 5, 20, 0.08) 0 19%, rgba(4, 3, 16, 0.68) 62%, rgba(4, 3, 16, 0.9) 100%),
    rgba(2, 2, 10, 0.38);
  animation: menu-dimmer-in 0.3s ease both;
}

.core-charge-ring {
  --charge: 0deg;
  position: fixed;
  top: 0.65rem;
  right: 0.65rem;
  z-index: 70;
  width: 146px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: conic-gradient(var(--vg-accent) var(--charge), rgba(0, 240, 255, 0.08) 0);
  filter: drop-shadow(0 0 12px rgba(0, 240, 255, 0.75));
  mask: radial-gradient(circle, transparent 61%, #000 63%);
  pointer-events: none;
}

.fallback-core-trigger {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 90;
  min-height: 42px;
  padding: 0 1rem;
  border: 1px solid var(--vg-accent);
  background: rgba(7,5,20,.9);
  color: var(--vg-accent);
  font-family: var(--font-mono);
  letter-spacing: .12em;
}

button,
a { font: inherit; }

.magic-bloom,
.crt-overlay,
.scanline {
  position: fixed;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

.magic-bloom {
  top: 50%;
  left: 50%;
  width: min(80vw, 850px);
  height: min(80vw, 850px);
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(0, 240, 255, 0.13) 0%, rgba(7, 5, 20, 0) 69%);
  mix-blend-mode: screen;
}

.crt-overlay {
  background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.14) 0, rgba(0, 0, 0, 0.14) 1px, transparent 1px, transparent 3px);
  opacity: 0.48;
}

.scanline {
  bottom: auto;
  height: 12px;
  background: linear-gradient(180deg, transparent, rgba(0, 240, 255, 0.2), transparent);
  opacity: 0.28;
  animation: global-scanline 8s linear infinite;
}

@keyframes global-scanline {
  from { transform: translateY(-20px); }
  to { transform: translateY(100vh); }
}

@keyframes core-screen-shake {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-3px, 2px); }
  40% { transform: translate(3px, -2px); }
  60% { transform: translate(-2px, -2px); }
  80% { transform: translate(2px, 1px); }
}

@keyframes menu-dimmer-in { from { opacity: 0; } to { opacity: 1; } }

@media (max-width: 720px) {
  .core-charge-ring { width: 108px; }
}

@media (prefers-reduced-motion: reduce) {
  .scanline { animation: none; }
  .app-shell.is-shaking { animation: none; }
}
</style>
