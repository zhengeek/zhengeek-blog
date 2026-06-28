<template>
  <CyberDreamscapeBackground />
  <div class="magic-bloom" aria-hidden="true"></div>
  <div class="crt-overlay" aria-hidden="true"></div>
  <div class="scanline" aria-hidden="true"></div>
  <GameLoginScreen v-if="showGameGate" @started="finishGameStart" />
  <MainLayout :game-started="layoutStarted" />
  <CustomCursor />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import CyberDreamscapeBackground from './components/common/CyberDreamscapeBackground.vue'
import GameLoginScreen from './components/common/GameLoginScreen.vue'
import CustomCursor from './components/home/CustomCursor.vue'
import MainLayout from './layouts/MainLayout.vue'

const route = useRoute()
const gameStarted = ref(false)
const showGameGate = computed(() => route.path === '/' && !gameStarted.value)
const layoutStarted = computed(() => route.path !== '/' || gameStarted.value)

function finishGameStart() {
  gameStarted.value = true
}
</script>

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
body.game-start-flash { filter: brightness(2.6); }

#app {
  position: relative;
  min-height: 100vh;
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

@media (prefers-reduced-motion: reduce) {
  .scanline { animation: none; }
}
</style>