<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'

type TerminalLine = { kind: 'command' | 'output' | 'accent' | 'error'; text: string }

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits<{ close: [] }>()

const inputRef = ref<HTMLInputElement | null>(null)
const outputRef = ref<HTMLDivElement | null>(null)
const command = ref('')
const lines = ref<TerminalLine[]>([
  { kind: 'accent', text: 'CATTOCAKE DEVELOPER TERMINAL // SECURE CHANNEL' },
  { kind: 'output', text: 'Type "help" to list available commands.' }
])

const logs = [
  'v1.0.0  Core navigation system initialized.',
  'v0.9.4  Admin article workflow and token guard online.',
  'v0.9.1  Responsive HUD safeguards deployed.',
  'v0.8.0  Studio interface rebuilt as a playable world.'
]

const notes = [
  '[NOTE_01] Interfaces should feel operated, not merely viewed.',
  '[NOTE_02] The core remains persistent so navigation has spatial memory.',
  '[NOTE_03] Every visual effect must communicate state or intent.'
]

watch(
  () => props.visible,
  async (visible) => {
    if (!visible) return
    await nextTick()
    inputRef.value?.focus()
  }
)

async function scrollToLatest() {
  await nextTick()
  if (outputRef.value) outputRef.value.scrollTop = outputRef.value.scrollHeight
}

function appendOutput(items: string[], kind: TerminalLine['kind'] = 'output') {
  lines.value.push(...items.map((text) => ({ kind, text })))
}

function executeCommand() {
  const value = command.value.trim().toLowerCase()
  if (!value) return

  lines.value.push({ kind: 'command', text: `operator@nexus:~$ ${value}` })
  command.value = ''

  if (value === 'help') {
    appendOutput(['help   list commands', 'logs   show update history', 'notes  show development notes', 'clear  clear terminal', 'exit   close terminal'])
  } else if (value === 'logs') {
    appendOutput(logs, 'accent')
  } else if (value === 'notes') {
    appendOutput(notes)
  } else if (value === 'clear') {
    lines.value = []
  } else if (value === 'exit') {
    emit('close')
  } else {
    lines.value.push({ kind: 'error', text: `Unknown command: ${value}` })
  }

  scrollToLatest()
}
</script>

<template>
  <Transition name="terminal">
    <section v-if="visible" class="developer-terminal" role="dialog" aria-modal="true" aria-label="Developer terminal" @keydown.esc="emit('close')">
      <div class="terminal-window">
        <header>
          <div>
            <span class="status-dot"></span>
            <strong>DEV_TERMINAL // ROOT ACCESS</strong>
          </div>
          <button type="button" class="terminal-close hoverable" aria-label="Close terminal" @click="emit('close')">[ ESC ]</button>
        </header>

        <div ref="outputRef" class="terminal-output" aria-live="polite">
          <p v-for="(line, index) in lines" :key="`${index}-${line.text}`" :class="`is-${line.kind}`">{{ line.text }}</p>
        </div>

        <form class="terminal-prompt" @submit.prevent="executeCommand">
          <label for="terminal-command">operator@nexus:~$</label>
          <input id="terminal-command" ref="inputRef" v-model="command" type="text" autocomplete="off" spellcheck="false" />
        </form>
      </div>
    </section>
  </Transition>
</template>

<style scoped>
.developer-terminal {
  position: fixed;
  inset: 0;
  z-index: 20000;
  display: grid;
  place-items: center;
  padding: clamp(0.75rem, 3vw, 2rem);
  background: rgba(2, 4, 14, 0.94);
  backdrop-filter: blur(16px);
}

.developer-terminal::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(0deg, rgba(0, 240, 255, 0.025) 0 1px, transparent 1px 4px);
}

.terminal-window {
  position: relative;
  width: min(100%, 1060px);
  height: min(82vh, 720px);
  display: grid;
  grid-template-rows: auto 1fr auto;
  border: 1px solid rgba(0, 240, 255, 0.48);
  background: rgba(3, 8, 20, 0.94);
  box-shadow: 0 0 80px rgba(0, 240, 255, 0.12), inset 0 0 45px rgba(0, 240, 255, 0.025);
  clip-path: polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px);
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid rgba(0, 240, 255, 0.25);
  color: var(--vg-accent);
  font-family: var(--font-mono);
  letter-spacing: 0.12em;
}

header > div { display: flex; align-items: center; gap: 0.7rem; }
.status-dot { width: 8px; height: 8px; border-radius: 50%; background: #71f6c4; box-shadow: 0 0 12px #71f6c4; }
.terminal-close { border: 0; background: transparent; color: rgba(255, 255, 255, 0.55); font-family: var(--font-mono); }
.terminal-close:hover { color: var(--vg-gold); }

.terminal-output {
  overflow: auto;
  padding: clamp(1rem, 3vw, 2rem);
  color: #b9c7d9;
  font-family: var(--font-mono);
  font-size: clamp(0.78rem, 1.5vw, 0.98rem);
  line-height: 1.75;
}

.terminal-output p { margin: 0.18rem 0; white-space: pre-wrap; }
.terminal-output .is-command { color: #fff; }
.terminal-output .is-accent { color: var(--vg-accent); }
.terminal-output .is-error { color: #ff5a72; }

.terminal-prompt {
  display: flex;
  gap: 0.75rem;
  padding: 0.9rem 1rem;
  border-top: 1px solid rgba(0, 240, 255, 0.25);
  color: var(--vg-gold);
  font-family: var(--font-mono);
}

.terminal-prompt label { flex: 0 0 auto; }
.terminal-prompt input { min-width: 0; flex: 1; border: 0; outline: 0; background: transparent; color: #fff; font: inherit; caret-color: var(--vg-accent); }

.terminal-enter-active,
.terminal-leave-active { transition: opacity 0.28s ease; }
.terminal-enter-active .terminal-window,
.terminal-leave-active .terminal-window { transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease; }
.terminal-enter-from,
.terminal-leave-to { opacity: 0; }
.terminal-enter-from .terminal-window,
.terminal-leave-to .terminal-window { opacity: 0; transform: scale(0.94) translateY(18px); }
</style>

