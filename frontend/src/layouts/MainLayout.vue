<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import PageTransitionOverlay from '../components/common/PageTransitionOverlay.vue'

defineProps<{
  gameStarted: boolean
}>()

type TransitionPhase = 'idle' | 'leaving' | 'entering'

const router = useRouter()
const transitionPhase = ref<TransitionPhase>('idle')
const isTransitioning = ref(false)
const mobileMenuOpen = ref(false)
const wait = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration))

const isSamePageHashNavigation = (to: { path: string; query: unknown; hash: string }, from: { path: string; query: unknown; hash: string }) => {
  return to.path === from.path && JSON.stringify(to.query) === JSON.stringify(from.query) && to.hash !== from.hash
}

const getRouteViewKey = (fullPath: string) => fullPath.split('#')[0]

const removeBeforeGuard = router.beforeEach(async (to, from) => {
  mobileMenuOpen.value = false
  if (!from.name || isSamePageHashNavigation(to, from)) return true

  isTransitioning.value = true
  transitionPhase.value = 'leaving'
  await wait(520)
  return true
})

const removeAfterHook = router.afterEach(async (to, from) => {
  if (!from.name || isSamePageHashNavigation(to, from)) return

  transitionPhase.value = 'entering'
  await wait(560)
  transitionPhase.value = 'idle'
  isTransitioning.value = false
})

onBeforeUnmount(() => {
  removeBeforeGuard()
  removeAfterHook()
})
</script>

<template>
  <div class="main-layout" :class="{ 'is-started': gameStarted }">
    <header class="site-header hud-panel" :class="{ 'is-visible': gameStarted }">
      <RouterLink class="brand-lockup hoverable" to="/" aria-label="CattoCake Studio home">
        <span class="brand-reactor"><i></i></span>
        <span class="brand-text">
          <strong>LV.99 <b>CATTOCAKE</b></strong>
          <small>GAME STUDIO // ONLINE</small>
        </span>
      </RouterLink>

      <nav class="site-nav" :class="{ 'is-open': mobileMenuOpen }" aria-label="Game HUD navigation">
        <RouterLink to="/#about">GUILD_LORE</RouterLink>
        <RouterLink class="gold-link" to="/#projects">REALMS</RouterLink>
        <RouterLink to="/projects">MAIN_QUEST</RouterLink>
        <RouterLink to="/#lab">TECH_TREE</RouterLink>
        <RouterLink to="/#blog">PATCH_NOTES</RouterLink>
        <RouterLink class="coop-link" to="/#contact">CO_OP</RouterLink>
      </nav>

      <button class="menu-toggle hoverable" type="button" aria-label="Toggle game menu" @click="mobileMenuOpen = !mobileMenuOpen">
        <span></span><span></span><span></span>
      </button>
    </header>

    <main>
      <RouterView v-slot="{ Component, route }">
        <Transition name="page-fade" mode="out-in">
          <component :is="Component" :key="getRouteViewKey(route.fullPath)" />
        </Transition>
      </RouterView>
    </main>

    <PageTransitionOverlay :active="isTransitioning" :phase="transitionPhase" />
  </div>
</template>

<style scoped>
.main-layout {
  position: relative;
  z-index: 5;
  min-height: 100vh;
  color: #e2e8f0;
}

.site-header {
  position: fixed;
  top: 1rem;
  right: clamp(1rem, 2.5vw, 2rem);
  left: clamp(1rem, 2.5vw, 2rem);
  z-index: 100;
  display: flex;
  min-height: 62px;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0.65rem 1.4rem;
  opacity: 0;
  transform: translateY(-140%);
  transition: opacity 0.7s ease 0.18s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.18s;
}

.site-header::before,
.site-header::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 32px;
  height: 1px;
  background: var(--vg-accent);
  box-shadow: 0 0 10px var(--vg-accent);
}
.site-header::before { left: -18px; }
.site-header::after { right: -18px; }
.site-header.is-visible { opacity: 1; transform: translateY(0); }

.brand-lockup {
  display: inline-flex;
  min-width: max-content;
  align-items: center;
  gap: 0.8rem;
  color: inherit;
  text-decoration: none;
}

.brand-reactor {
  position: relative;
  display: grid;
  width: 38px;
  height: 38px;
  flex: 0 0 38px;
  place-items: center;
  border: 2px solid var(--vg-accent);
  border-radius: 50%;
  box-shadow: inset 0 0 12px rgba(0, 240, 255, 0.2), 0 0 14px rgba(0, 240, 255, 0.24);
  animation: reactor-spin 5s linear infinite;
}
.brand-reactor::before {
  content: '';
  position: absolute;
  inset: 4px;
  border: 1px dashed rgba(255, 215, 0, 0.55);
  border-radius: 50%;
}
.brand-reactor i {
  width: 11px;
  height: 11px;
  background: var(--vg-accent);
  box-shadow: 0 0 12px var(--vg-accent);
  transform: rotate(45deg);
}

.brand-text { display: flex; flex-direction: column; line-height: 1; }
.brand-text strong {
  font-family: var(--font-mono);
  font-size: 1.12rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}
.brand-text strong b { color: var(--vg-accent); font-weight: 700; }
.brand-text small {
  margin-top: 0.3rem;
  color: rgba(148, 163, 184, 0.72);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
}

.site-nav { display: flex; align-items: center; justify-content: flex-end; gap: clamp(0.8rem, 2vw, 2.1rem); }
.site-nav a {
  position: relative;
  padding: 0.65rem 0;
  color: #94a3b8;
  font-family: var(--font-mono);
  font-size: 0.79rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-decoration: none;
  transition: color 0.2s ease, text-shadow 0.2s ease;
}
.site-nav a::after {
  content: '';
  position: absolute;
  right: 50%;
  bottom: 0.25rem;
  left: 50%;
  height: 1px;
  background: currentColor;
  box-shadow: 0 0 8px currentColor;
  transition: right 0.2s ease, left 0.2s ease;
}
.site-nav a:hover,
.site-nav a.router-link-active { color: var(--vg-accent); text-shadow: 0 0 12px rgba(0, 240, 255, 0.55); }
.site-nav a:hover::after,
.site-nav a.router-link-active::after { right: 0; left: 0; }
.site-nav .gold-link:hover { color: var(--vg-gold); }
.site-nav .coop-link { color: var(--vg-amber); }
.site-nav .coop-link:hover { color: #ffffff; }

.menu-toggle {
  display: none;
  width: 42px;
  height: 38px;
  border: 1px solid rgba(0, 240, 255, 0.35);
  background: rgba(0, 240, 255, 0.04);
}
.menu-toggle span { display: block; width: 21px; height: 1px; margin: 5px auto; background: var(--vg-accent); }

main {
  min-height: 100vh;
  opacity: 0;
  transition: opacity 0.9s ease 0.35s;
}
.main-layout.is-started main { opacity: 1; }

.page-fade-enter-active,
.page-fade-leave-active { transition: opacity 0.18s ease; }
.page-fade-enter-from,
.page-fade-leave-to { opacity: 0; }

@keyframes reactor-spin { to { transform: rotate(360deg); } }

@media (max-width: 1050px) {
  .site-nav { gap: 0.8rem; }
  .site-nav a { font-size: 0.7rem; letter-spacing: 0.1em; }
}

@media (max-width: 820px) {
  .site-header { align-items: center; padding: 0.65rem 0.85rem; }
  .menu-toggle { display: block; }
  .site-nav {
    position: absolute;
    top: calc(100% + 0.55rem);
    right: 0;
    left: 0;
    display: grid;
    padding: 1rem 1.25rem;
    border: 1px solid rgba(0, 240, 255, 0.28);
    background: rgba(7, 5, 20, 0.94);
    backdrop-filter: blur(16px);
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
    transition: opacity 0.2s ease, transform 0.2s ease;
  }
  .site-nav.is-open { opacity: 1; pointer-events: auto; transform: translateY(0); }
  .site-nav a { padding: 0.7rem; text-align: center; }
}

@media (max-width: 480px) {
  .brand-text strong { font-size: 0.92rem; }
  .brand-text small { display: none; }
  .brand-reactor { width: 32px; height: 32px; flex-basis: 32px; }
}
</style>