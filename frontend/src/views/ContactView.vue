<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import {
  MessageApiError,
  submitContactMessage,
  type MessageTopic
} from '../services/messageApi'

type SubmissionState = 'idle' | 'sending' | 'success' | 'error'

const visitorName = ref('')
const visitorEmail = ref('')
const messageTopic = ref<MessageTopic>('creative')
const messageContent = ref('')
const submissionState = ref<SubmissionState>('idle')
const feedbackMessage = ref('')
let feedbackTimer = 0

const contactChannels = [
  {
    code: '01',
    label: '我的 GitHub 账号',
    value: '@zhengeek',
    detail: '查看我的项目、代码和持续更新。',
    href: 'https://github.com/zhengeek',
    action: '访问 GitHub'
  },
  {
    code: '02',
    label: '我的电话号码',
    value: '暂未公开',
    detail: '需要电话沟通时，可以先通过邮件与我联系。',
    href: '',
    action: ''
  },
  {
    code: '03',
    label: '我的邮箱',
    value: 'hello@cattocake.studio',
    detail: '适合项目企划、技术交流和其他合作沟通。',
    href: 'mailto:hello@cattocake.studio',
    action: '发送邮件'
  }
]

async function sendMessage() {
  if (submissionState.value === 'sending') return

  window.clearTimeout(feedbackTimer)
  submissionState.value = 'sending'
  feedbackMessage.value = '正在发送信号...'

  try {
    const response = await submitContactMessage({
      name: visitorName.value,
      email: visitorEmail.value,
      topic: messageTopic.value,
      content: messageContent.value
    })

    submissionState.value = 'success'
    feedbackMessage.value = `信号已送达，留言编号 #${response.id}。`
    visitorName.value = ''
    visitorEmail.value = ''
    messageTopic.value = 'creative'
    messageContent.value = ''
    feedbackTimer = window.setTimeout(() => {
      submissionState.value = 'idle'
      feedbackMessage.value = ''
    }, 4200)
  } catch (error) {
    submissionState.value = 'error'
    feedbackMessage.value = error instanceof MessageApiError
      ? error.message
      : '留言发送失败，请稍后再试。'
  }
}

onBeforeUnmount(() => window.clearTimeout(feedbackTimer))
</script>

<template>
  <main class="contact-page">
    <section class="contact-hero page-shell">
      <p class="eyebrow">CONTACT // OPEN CHANNEL</p>
      <h1>把你的想法发过来，我们可以聊聊。</h1>
      <p class="hero-lead">
        很高兴你能逛到这里！无论你是想探讨技术细节、交流项目想法，还是有制作游戏的企划，我都非常欢迎。
      </p>
    </section>

    <section class="channel-section page-shell">
      <header>
        <p class="eyebrow">DIRECT LINKS // CONTACT</p>
        <h2>你可以通过这些方式找到我。</h2>
      </header>

      <div class="channel-grid">
        <component
          :is="channel.href ? 'a' : 'article'"
          v-for="channel in contactChannels"
          :key="channel.code"
          class="channel-card"
          :href="channel.href || undefined"
          :target="channel.href.startsWith('https://') ? '_blank' : undefined"
          :rel="channel.href.startsWith('https://') ? 'noreferrer' : undefined"
        >
          <span>{{ channel.code }}</span>
          <small>{{ channel.label }}</small>
          <strong>{{ channel.value }}</strong>
          <p>{{ channel.detail }}</p>
          <b v-if="channel.action">{{ channel.action }} →</b>
        </component>
      </div>
    </section>

    <section class="brief-section page-shell">
      <header>
        <p class="eyebrow">MESSAGE BOARD // LEAVE A SIGNAL</p>
        <h2>轻量留言板</h2>
        <p>留下你的想法，消息会安全送到后端并保存。我看到后会通过你填写的邮箱回复。</p>
      </header>

      <form
        class="contact-form"
        :class="`is-${submissionState}`"
        @submit.prevent="sendMessage"
      >
        <label>
          <span>你的名字 / 昵称 *</span>
          <input
            v-model="visitorName"
            type="text"
            autocomplete="name"
            maxlength="80"
            placeholder="怎么称呼你？"
            required
          />
        </label>
        <label>
          <span>你的邮箱 *（方便我回信）</span>
          <input
            v-model="visitorEmail"
            type="email"
            autocomplete="email"
            maxlength="254"
            placeholder="name@example.com"
            required
          />
        </label>
        <label class="topic-field">
          <span>你想聊点什么？</span>
          <select v-model="messageTopic">
            <option value="creative">创意探讨</option>
            <option value="studio">工作室合作</option>
            <option value="technology">技术研究</option>
            <option value="casual">随便聊聊</option>
          </select>
        </label>
        <label class="message-field">
          <span>留言内容 *</span>
          <textarea
            v-model="messageContent"
            rows="7"
            maxlength="4000"
            placeholder="写下你想说的话..."
            required
          ></textarea>
        </label>
        <button class="send-button" type="submit" :disabled="submissionState === 'sending'">
          <span>{{ submissionState === 'sending' ? '发送中...' : submissionState === 'success' ? '发送成功' : '发送留言' }}</span>
          <i v-for="spark in 6" :key="spark" :style="{ '--spark-index': spark }" aria-hidden="true"></i>
        </button>
        <p
          v-if="feedbackMessage"
          class="form-feedback"
          :class="`is-${submissionState}`"
          role="status"
          aria-live="polite"
        >{{ feedbackMessage }}</p>
      </form>
    </section>
  </main>
</template>

<style scoped>
.contact-page {
  min-height: 100vh;
  padding-bottom: 5rem;
  color: #e2e8f0;
}

.page-shell {
  width: min(1040px, calc(100% - 2rem));
  margin: 0 auto;
  padding: clamp(4rem, 8vw, 7rem) 0;
}

.contact-hero {
  display: grid;
  min-height: 100vh;
  align-content: center;
}

.eyebrow {
  margin: 0 0 1rem;
  color: #ff62bd;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}

h1,
h2,
p {
  margin-top: 0;
}

h1,
h2 {
  font-family: var(--font-display);
  letter-spacing: 0;
}

h1 {
  max-width: 920px;
  margin-bottom: 1.5rem;
  font-size: clamp(3rem, 7vw, 6.5rem);
  line-height: 0.98;
}

h2 {
  margin-bottom: 1rem;
  font-size: clamp(2.2rem, 5vw, 4.5rem);
  line-height: 1;
}

.hero-lead,
.brief-section header > p {
  color: #a8b3c7;
  font-size: 1rem;
  line-height: 1.85;
}

.hero-lead {
  max-width: 720px;
}

.channel-section {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.channel-section header {
  max-width: 760px;
  margin-bottom: 2.5rem;
}

.channel-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.channel-card {
  display: flex;
  min-height: 260px;
  flex-direction: column;
  padding: 1.25rem;
  border: 1px solid rgba(255, 98, 189, 0.26);
  border-radius: 6px;
  background: rgba(10, 7, 25, 0.82);
  color: inherit;
  text-decoration: none;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

.channel-card[href]:hover,
.channel-card[href]:focus-visible {
  outline: none;
  border-color: #ff62bd;
  background: rgba(255, 98, 189, 0.08);
  transform: translateY(-3px);
}

.channel-card > span,
.channel-card small,
.channel-card b {
  font-family: var(--font-mono);
}

.channel-card > span {
  align-self: flex-end;
  color: rgba(255, 255, 255, 0.18);
  font-size: 1.4rem;
  font-weight: 800;
}

.channel-card small {
  margin-top: 1.1rem;
  color: #ff9bd7;
  font-size: 0.7rem;
}

.channel-card strong {
  margin-top: 0.6rem;
  overflow-wrap: anywhere;
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.1vw, 1.8rem);
  letter-spacing: 0;
}

.channel-card p {
  margin: 1rem 0;
  color: #a8b3c7;
  line-height: 1.7;
}

.channel-card b {
  margin-top: auto;
  color: #ff62bd;
  font-size: 0.72rem;
}

.brief-section {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(420px, 1.2fr);
  gap: clamp(2rem, 6vw, 5rem);
  align-items: start;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.contact-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  padding: clamp(1.25rem, 3vw, 2rem);
  border: 1px solid rgba(255, 98, 189, 0.3);
  border-radius: 6px;
  background: rgba(10, 7, 25, 0.9);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.34);
}

.contact-form label {
  display: grid;
  gap: 0.55rem;
}

.contact-form label span {
  color: #ff9bd7;
  font-family: var(--font-mono);
  font-size: 0.72rem;
}

.contact-form input,
.contact-form textarea,
.contact-form select {
  width: 100%;
  border: 1px solid rgba(255, 98, 189, 0.24);
  border-radius: 4px;
  outline: 0;
  background: rgba(3, 4, 14, 0.82);
  color: #ffffff;
  font: inherit;
  padding: 0.85rem;
}

.contact-form textarea {
  resize: vertical;
}

.contact-form input:focus,
.contact-form textarea:focus,
.contact-form select:focus {
  border-color: #ff62bd;
  box-shadow: 0 0 18px rgba(255, 98, 189, 0.12);
}

.topic-field,
.message-field,
.send-button,
.form-feedback {
  grid-column: 1 / -1;
}

.contact-form select {
  appearance: none;
  background-image:
    linear-gradient(45deg, transparent 50%, #ff62bd 50%),
    linear-gradient(135deg, #ff62bd 50%, transparent 50%);
  background-position:
    calc(100% - 17px) calc(50% - 2px),
    calc(100% - 12px) calc(50% - 2px);
  background-repeat: no-repeat;
  background-size: 5px 5px, 5px 5px;
}

.send-button {
  position: relative;
  overflow: visible;
  min-height: 50px;
  border: 1px solid #ff62bd;
  border-radius: 4px;
  background: rgba(255, 98, 189, 0.1);
  color: #ffb4df;
  font-family: var(--font-mono);
  font-weight: 800;
  letter-spacing: 0.1em;
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.send-button:hover,
.send-button:focus-visible {
  outline: none;
  background: #ff62bd;
  color: #090611;
  box-shadow: 0 0 24px rgba(255, 98, 189, 0.3);
}

.send-button:disabled {
  cursor: wait;
  opacity: 0.72;
}

.send-button::after {
  content: '';
  position: absolute;
  inset: -1px;
  border: 1px solid #ff62bd;
  border-radius: 4px;
  opacity: 0;
  pointer-events: none;
}

.contact-form.is-sending .send-button::after {
  animation: signal-scan 0.8s ease-in-out infinite;
}

.contact-form.is-success .send-button {
  background: #ff62bd;
  color: #090611;
  box-shadow: 0 0 30px rgba(255, 98, 189, 0.42);
}

.contact-form.is-success .send-button::after {
  animation: signal-burst 0.65s ease-out both;
}

.send-button i {
  --spark-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #ffffff;
  opacity: 0;
  pointer-events: none;
}

.contact-form.is-success .send-button i {
  animation: signal-spark 0.7s ease-out both;
  animation-delay: calc(var(--spark-index) * 35ms);
}

.form-feedback {
  min-height: 1.2rem;
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.74rem;
}

.form-feedback.is-sending {
  color: #a8b3c7;
}

.form-feedback.is-success {
  color: #ff9bd7;
}

.form-feedback.is-error {
  color: #ff8a9d;
}

@keyframes signal-scan {
  0%, 100% { opacity: 0.15; transform: scaleX(0.9); }
  50% { opacity: 0.8; transform: scaleX(1.02); }
}

@keyframes signal-burst {
  from { opacity: 0.9; transform: scale(1); }
  to { opacity: 0; transform: scale(1.12, 1.7); }
}

@keyframes signal-spark {
  0% { opacity: 1; transform: translate(-50%, -50%) rotate(calc(var(--spark-index) * 60deg)) translateX(0); }
  100% { opacity: 0; transform: translate(-50%, -50%) rotate(calc(var(--spark-index) * 60deg)) translateX(54px); }
}

@media (max-width: 760px) {
  .page-shell {
    width: min(100% - 1rem, 1040px);
    padding: 3.5rem 0;
  }

  .contact-hero {
    min-height: 100svh;
  }

  h1 {
    font-size: 3.15rem;
  }

  .channel-grid,
  .brief-section,
  .contact-form {
    grid-template-columns: 1fr;
  }

  .topic-field,
  .message-field,
  .send-button,
  .form-feedback {
    grid-column: auto;
  }

  .channel-card {
    min-height: 220px;
  }
}
</style>
