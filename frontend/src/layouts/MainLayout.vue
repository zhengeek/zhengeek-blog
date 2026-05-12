<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import PageTransitionOverlay from '../components/common/PageTransitionOverlay.vue'

type TransitionPhase = 'idle' | 'leaving' | 'entering'

const router = useRouter()
const transitionPhase = ref<TransitionPhase>('idle')
const isTransitioning = ref(false)

const wait = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration))

const isSamePageHashNavigation = (to: { path: string; query: unknown; hash: string }, from: { path: string; query: unknown; hash: string }) => {
  return to.path === from.path && JSON.stringify(to.query) === JSON.stringify(from.query) && to.hash !== from.hash
}

const shouldSkipCurtain = (to: { path: string; query: unknown; hash: string }, from: { path: string; query: unknown; hash: string }) => {
  return isSamePageHashNavigation(to, from)
}

const getRouteViewKey = (fullPath: string) => fullPath.split('#')[0]

const removeBeforeGuard = router.beforeEach(async (to, from) => {
  if (!from.name || shouldSkipCurtain(to, from)) {
    return true
  }

  isTransitioning.value = true
  transitionPhase.value = 'leaving'
  await wait(680)
  return true
})

const removeAfterHook = router.afterEach(async (to, from) => {
  if (!from.name || shouldSkipCurtain(to, from)) {
    return
  }

  transitionPhase.value = 'entering'
  await wait(720)
  transitionPhase.value = 'idle'
  isTransitioning.value = false
})

onBeforeUnmount(() => {
  removeBeforeGuard()
  removeAfterHook()
})
</script>

<template>
  <div class="main-layout">
    <header class="site-header">
      <RouterLink class="brand-lockup" to="/" aria-label="Go to ZhenGeek homepage">
        <span class="brand-mark">Z</span>
        <span class="brand-text">
          <strong>ZhenGeek</strong>
          <small>Envision · Nurture · Forge · Pioneer</small>
        </span>
      </RouterLink>

      <nav class="site-nav" aria-label="Primary navigation">
        <RouterLink to="/#about">About</RouterLink>
        <RouterLink to="/#projects">Projects</RouterLink>
        <RouterLink to="/#blog">Blog</RouterLink>
        <RouterLink to="/#lab">Lab</RouterLink>
      </nav>
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
  min-height: 100vh;
  background:
    radial-gradient(circle at 20% 0%, rgba(204, 255, 0, 0.12), transparent 26rem),
    radial-gradient(circle at 85% 12%, rgba(176, 0, 255, 0.18), transparent 28rem),
    #09090b;
  color: #fafafa;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  min-height: 76px;
  padding: 0.85rem clamp(1rem, 4vw, 4rem);
  border-bottom: 1px solid rgba(250, 250, 250, 0.12);
  background: rgba(9, 9, 11, 0.68);
  backdrop-filter: blur(18px);
  opacity: 0.86;
  transition: opacity 0.2s ease, background 0.2s ease;
}

.site-header:hover,
.site-header:focus-within {
  background: rgba(9, 9, 11, 0.82);
  opacity: 1;
}

.brand-lockup {
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  color: inherit;
  text-decoration: none;
}

.brand-mark {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 2px solid #fafafa;
  border-radius: 14px;
  background: #ccff00;
  color: #09090b;
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 900;
  box-shadow: 4px 4px 0 #fafafa;
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand-text strong {
  font-family: var(--font-display);
  font-size: 1.05rem;
  letter-spacing: 0.03em;
}

.brand-text small {
  margin-top: 0.2rem;
  color: var(--vg-muted);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.site-nav a {
  padding: 0.55rem 0.85rem;
  border: 1px solid rgba(250, 250, 250, 0.1);
  border-radius: 999px;
  background: rgba(250, 250, 250, 0.035);
  color: rgba(250, 250, 250, 0.76);
  font-size: 0.9rem;
  text-decoration: none;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease, opacity 0.2s ease;
}

.site-nav a:hover,
.site-nav a.router-link-active {
  border-color: rgba(250, 250, 250, 0.28);
  background: rgba(250, 250, 250, 0.09);
  color: #ccff00;
}

main {
  min-height: calc(100vh - 76px);
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.18s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}

@media (max-width: 760px) {
  .site-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .site-nav {
    width: 100%;
    justify-content: flex-start;
  }

  .brand-text small {
    display: none;
  }
}
</style>
