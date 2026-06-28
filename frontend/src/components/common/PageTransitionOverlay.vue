<script setup lang="ts">
withDefaults(
  defineProps<{
    active: boolean
    phase?: 'leaving' | 'entering' | 'idle'
    text?: string
  }>(),
  {
    phase: 'idle',
    text: '> LOADING_MODULE...'
  }
)
</script>

<template>
  <div
    class="page-transition-overlay"
    :class="[`is-${phase}`, { 'is-active': active }]"
    aria-hidden="true"
  >
    <div class="overlay-scanlines"></div>
    <div class="loader-wrapper">
      <div class="orb-system">
        <div class="orb-wrapper orb-one">
          <span class="orb"></span>
          <span class="shadow"></span>
        </div>
        <div class="orb-wrapper orb-two">
          <span class="orb"></span>
          <span class="shadow"></span>
        </div>
        <div class="orb-wrapper orb-three">
          <span class="orb"></span>
          <span class="shadow"></span>
        </div>
      </div>
      <p class="loading-text">{{ text }}</p>
    </div>
  </div>
</template>

<style scoped>
.page-transition-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: grid;
  place-items: center;
  overflow: hidden;
  pointer-events: none;
  background: #05030a;
  opacity: 0;
  transform: translateY(-100%);
  transition:
    transform 0.72s cubic-bezier(0.77, 0, 0.175, 1),
    opacity 0.18s ease;
}

.page-transition-overlay.is-active {
  opacity: 1;
}

.page-transition-overlay.is-leaving {
  transform: translateY(0);
}

.page-transition-overlay.is-entering {
  transform: translateY(100%);
}

.overlay-scanlines {
  position: absolute;
  inset: 0;
  opacity: 0.34;
  background:
    linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    radial-gradient(circle at 50% 42%, rgba(0, 243, 255, 0.12), transparent 22rem),
    radial-gradient(circle at 58% 52%, rgba(176, 38, 255, 0.13), transparent 18rem),
    radial-gradient(circle at 45% 58%, rgba(255, 0, 127, 0.08), transparent 20rem);
  background-size: 100% 4px, auto, auto;
  animation: scanline-drift 1.1s linear infinite;
}

.loader-wrapper {
  position: relative;
  display: grid;
  gap: 1.3rem;
  justify-items: center;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.24s ease 0.18s, transform 0.24s ease 0.18s;
}

.page-transition-overlay.is-leaving .loader-wrapper {
  opacity: 1;
  transform: translateY(0);
}

.orb-system {
  display: flex;
  gap: clamp(1rem, 4vw, 2rem);
  align-items: end;
  min-height: 112px;
}

.orb-wrapper {
  display: grid;
  justify-items: center;
  gap: 0.55rem;
}

.orb {
  display: block;
  width: clamp(34px, 8vw, 56px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--orb-color);
  box-shadow:
    0 0 18px var(--orb-glow),
    0 0 48px var(--orb-glow);
  animation: orb-bounce 0.9s ease-in-out infinite;
}

.shadow {
  display: block;
  width: clamp(34px, 8vw, 54px);
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  filter: blur(3px);
  animation: shadow-pulse 0.9s ease-in-out infinite;
}

.orb-one {
  --orb-color: #00f3ff;
  --orb-glow: rgba(0, 243, 255, 0.58);
}

.orb-two {
  --orb-color: #b026ff;
  --orb-glow: rgba(176, 38, 255, 0.58);
}

.orb-three {
  --orb-color: #ff007f;
  --orb-glow: rgba(255, 0, 127, 0.52);
}

.orb-two .orb,
.orb-two .shadow {
  animation-delay: 0.12s;
}

.orb-three .orb,
.orb-three .shadow {
  animation-delay: 0.24s;
}

.loading-text {
  margin: 0;
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: clamp(0.82rem, 2.4vw, 1rem);
  font-weight: 800;
  letter-spacing: 0.08em;
  text-shadow: 0 0 22px rgba(0, 243, 255, 0.36);
}

@keyframes orb-bounce {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }

  45% {
    transform: translateY(-42px) scale(1.04);
  }
}

@keyframes shadow-pulse {
  0%,
  100% {
    opacity: 0.42;
    transform: scaleX(1);
  }

  45% {
    opacity: 0.16;
    transform: scaleX(0.62);
  }
}

@keyframes scanline-drift {
  from {
    background-position: 0 0, center, center;
  }

  to {
    background-position: 0 12px, center, center;
  }
}
</style>
