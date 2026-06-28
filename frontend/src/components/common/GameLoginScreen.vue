<template>
  <div class="login-screen" :class="{ 'is-leaving': isLeaving }" role="dialog" aria-label="CattoCake Studio game start screen">
    <div class="login-corners" aria-hidden="true">
      <span></span><span></span><span></span><span></span>
    </div>

    <div class="login-content">
      <div class="title-lockup">
        <p class="system-label">System Initialized</p>
        <h1>CATTOCAKE</h1>
        <p class="studio-label">GAME STUDIO</p>
      </div>

      <button class="start-button hoverable" type="button" @click="startGame">
        <span class="button-bracket left"></span>
        <span class="button-frame"></span>
        <span>Press To Start</span>
        <span class="button-bracket right"></span>
      </button>
    </div>

    <div class="system-meta">
      <span>v1.0.0 // SERVER: ASIA_01</span>
      <span>CORE STATUS: ONLINE</span>
    </div>
    <p class="key-hint">CLICK OR PRESS ANY KEY</p>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const emit = defineEmits<{
  started: []
}>()

const isLeaving = ref(false)
let finishTimer = 0

function startGame() {
  if (isLeaving.value) return

  isLeaving.value = true
  window.dispatchEvent(new CustomEvent('catto-game-start'))
  window.setTimeout(() => document.body.classList.add('game-start-flash'), 20)
  window.setTimeout(() => document.body.classList.remove('game-start-flash'), 150)

  finishTimer = window.setTimeout(() => {
    document.body.classList.remove('game-locked')
    emit('started')
  }, 3500)
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'F5' || event.key === 'F12' || event.ctrlKey || event.metaKey || event.altKey) return
  startGame()
}

onMounted(() => {
  document.body.classList.add('game-locked')
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.clearTimeout(finishTimer)
  window.removeEventListener('keydown', handleKeydown)
  document.body.classList.remove('game-locked')
})
</script>

<style scoped>
.login-screen {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: rgba(7, 5, 20, 0.52);
  backdrop-filter: blur(3px);
}

.login-screen::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(0, 240, 255, 0.05), transparent 18%, transparent 82%, rgba(0, 240, 255, 0.05)),
    radial-gradient(circle at 50% 50%, transparent 0 24%, rgba(7, 5, 20, 0.2) 62%, rgba(7, 5, 20, 0.72) 100%);
  pointer-events: none;
}

.login-screen.is-leaving {
  background: transparent;
  backdrop-filter: none;
}

.login-screen.is-leaving::before {
  opacity: 0;
}

.login-screen.is-leaving .login-content,
.login-screen.is-leaving .login-corners,
.login-screen.is-leaving .system-meta,
.login-screen.is-leaving .key-hint {
  opacity: 0;
  visibility: hidden;
}

.login-content {
  position: relative;
  z-index: 2;
  width: min(100% - 2rem, 1040px);
  text-align: center;
}

.title-lockup {
  transform: translateY(-31vh);
}

.system-label,
.studio-label,
.system-meta,
.key-hint,
.start-button {
  font-family: var(--font-mono);
  text-transform: uppercase;
}

.system-label {
  margin: 0 0 0.8rem;
  padding-left: 0.8em;
  color: var(--vg-gold);
  font-size: clamp(0.72rem, 1.4vw, 1.15rem);
  font-weight: 600;
  letter-spacing: 0.8em;
  text-shadow: 0 0 18px rgba(255, 215, 0, 0.5);
}

h1 {
  position: relative;
  max-width: 100%;
  margin: 0;
  background: linear-gradient(180deg, #ffffff 5%, #bafaff 42%, #00b8d8 67%, #12245c 100%);
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 24px rgba(0, 240, 255, 0.48));
  font-family: var(--font-display);
  font-size: clamp(3.45rem, 9vw, 8.4rem);
  font-weight: 900;
  letter-spacing: 0.06em;
  line-height: 0.95;
  text-indent: 0.06em;
}

.studio-label {
  margin: 1rem 0 clamp(3.25rem, 7vh, 5rem);
  padding-left: 0.55em;
  color: var(--vg-accent);
  font-size: clamp(1rem, 2.5vw, 2rem);
  font-weight: 600;
  letter-spacing: 0.55em;
  text-shadow: 0 0 20px rgba(0, 240, 255, 0.55);
}

.start-button {
  position: relative;
  display: inline-flex;
  min-width: min(360px, calc(100vw - 3rem));
  min-height: 64px;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  color: #ffffff;
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-weight: 700;
  letter-spacing: 0.28em;
  text-indent: 0.28em;
  text-transform: uppercase;
  animation: breathe 3s ease-in-out infinite;
}

.button-frame {
  position: absolute;
  inset: 0;
  border: 1px solid var(--vg-accent);
  background: rgba(0, 240, 255, 0.025);
  clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);
  transition: background 0.25s ease, box-shadow 0.25s ease;
}

.start-button:hover {
  color: var(--vg-gold);
  animation: none;
}

.start-button:hover .button-frame {
  background: rgba(0, 240, 255, 0.14);
  box-shadow: inset 0 0 30px rgba(0, 240, 255, 0.08), 0 0 28px rgba(0, 240, 255, 0.35);
}

.button-bracket {
  position: absolute;
  top: 50%;
  width: 28px;
  height: 2px;
  background: var(--vg-accent);
  box-shadow: 0 0 12px var(--vg-accent);
}

.button-bracket.left { left: -14px; }
.button-bracket.right { right: -14px; }

.system-meta {
  position: absolute;
  bottom: 1.8rem;
  left: clamp(1rem, 3vw, 2rem);
  z-index: 2;
  display: grid;
  gap: 0.35rem;
  color: rgba(0, 240, 255, 0.52);
  font-size: 0.7rem;
  letter-spacing: 0.16em;
}

.key-hint {
  position: absolute;
  right: clamp(1rem, 3vw, 2rem);
  bottom: 1.8rem;
  z-index: 2;
  margin: 0;
  color: rgba(255, 255, 255, 0.36);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
}

.login-corners span {
  position: absolute;
  z-index: 3;
  width: 52px;
  height: 52px;
  border-color: rgba(0, 240, 255, 0.4);
}

.login-corners span:nth-child(1) { top: 1.5rem; left: 1.5rem; border-top: 1px solid; border-left: 1px solid; }
.login-corners span:nth-child(2) { top: 1.5rem; right: 1.5rem; border-top: 1px solid; border-right: 1px solid; }
.login-corners span:nth-child(3) { bottom: 1.5rem; right: 1.5rem; border-bottom: 1px solid; border-right: 1px solid; }
.login-corners span:nth-child(4) { bottom: 1.5rem; left: 1.5rem; border-bottom: 1px solid; border-left: 1px solid; }

@keyframes breathe {
  0%, 100% { opacity: 0.48; text-shadow: 0 0 10px rgba(0, 240, 255, 0.18); }
  50% { opacity: 1; text-shadow: 0 0 28px rgba(0, 240, 255, 0.8), 0 0 56px rgba(0, 240, 255, 0.32); }
}

@media (max-width: 640px) {
  .title-lockup { transform: translateY(-16vh); }

  h1 {
    font-size: 8.8vw;
    letter-spacing: 0.035em;
    text-indent: 0.035em;
  }

  .system-label { letter-spacing: 0.45em; }
  .studio-label { letter-spacing: 0.38em; }
  .start-button {
    min-width: calc(100vw - 4rem);
    font-size: 0.92rem;
    letter-spacing: 0.2em;
    text-indent: 0.2em;
  }
  .key-hint { display: none; }
  .system-meta { font-size: 0.6rem; }
}

</style>
