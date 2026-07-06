<script setup lang="ts">
import { ref } from 'vue'

const senderName = ref('')
const senderEmail = ref('')
const projectBrief = ref('')

function sendMessage() {
  const subject = encodeURIComponent(`Project inquiry from ${senderName.value || 'New visitor'}`)
  const body = encodeURIComponent(
    `Name: ${senderName.value}\nEmail: ${senderEmail.value}\n\nProject brief:\n${projectBrief.value}`
  )
  window.location.href = `mailto:hello@cattocake.studio?subject=${subject}&body=${body}`
}
</script>

<template>
  <main class="contact-page">
    <section class="contact-hero page-shell">
      <p class="eyebrow">CONTACT // OPEN CHANNEL</p>
      <h1>把你的想法发过来，我们从目标和范围开始聊。</h1>
      <p class="hero-lead">
        如果你正在计划个人网站、作品集、内容型站点或需要有辨识度的前端体验，可以通过下面的任务简报联系我。
      </p>
      <a class="direct-mail" href="mailto:hello@cattocake.studio">hello@cattocake.studio</a>
    </section>

    <section class="status-section page-shell">
      <div class="status-copy">
        <p class="eyebrow">STATUS // AVAILABLE</p>
        <h2>适合从一个清晰的小版本开始。</h2>
      </div>
      <dl class="status-list">
        <div>
          <dt>合作方向</dt>
          <dd>个人品牌、作品集、内容网站、交互原型</dd>
        </div>
        <div>
          <dt>工作方式</dt>
          <dd>远程沟通，分阶段确认设计与实现</dd>
        </div>
        <div>
          <dt>时区</dt>
          <dd>Asia / Shanghai</dd>
        </div>
      </dl>
    </section>

    <section class="brief-section page-shell">
      <header>
        <p class="eyebrow">MISSION BRIEF // START HERE</p>
        <h2>项目任务简报</h2>
        <p>简单说明你想做什么、面向谁，以及期望的时间范围。提交后会唤起你的邮件客户端。</p>
      </header>

      <form class="contact-form" @submit.prevent="sendMessage">
        <label>
          <span>你的称呼</span>
          <input v-model="senderName" type="text" autocomplete="name" placeholder="Name" required />
        </label>
        <label>
          <span>联系邮箱</span>
          <input v-model="senderEmail" type="email" autocomplete="email" placeholder="Email" required />
        </label>
        <label class="brief-field">
          <span>项目简报</span>
          <textarea v-model="projectBrief" rows="7" placeholder="项目目标、主要内容、时间范围..." required></textarea>
        </label>
        <button type="submit">发送任务简报</button>
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
.brief-section header > p,
.status-list dd {
  color: #a8b3c7;
  font-size: 1rem;
  line-height: 1.85;
}

.hero-lead {
  max-width: 720px;
}

.direct-mail {
  width: fit-content;
  margin-top: 1.4rem;
  color: #ffffff;
  font-family: var(--font-mono);
  font-size: clamp(0.9rem, 2vw, 1.15rem);
  text-decoration-color: #ff62bd;
  text-underline-offset: 0.45rem;
}

.status-section {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(360px, 1.1fr);
  gap: clamp(2rem, 6vw, 5rem);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.status-list {
  margin: 0;
  border-top: 1px solid rgba(255, 98, 189, 0.28);
}

.status-list div {
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr);
  gap: 1rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.status-list dt {
  color: #ff62bd;
  font-family: var(--font-mono);
  font-size: 0.74rem;
}

.status-list dd {
  margin: 0;
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
.contact-form textarea {
  width: 100%;
  border: 1px solid rgba(255, 98, 189, 0.24);
  border-radius: 4px;
  outline: 0;
  background: rgba(3, 4, 14, 0.82);
  color: #ffffff;
  font: inherit;
  padding: 0.85rem;
  resize: vertical;
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: #ff62bd;
  box-shadow: 0 0 18px rgba(255, 98, 189, 0.12);
}

.brief-field,
.contact-form button {
  grid-column: 1 / -1;
}

.contact-form button {
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

.contact-form button:hover,
.contact-form button:focus-visible {
  outline: none;
  background: #ff62bd;
  color: #090611;
  box-shadow: 0 0 24px rgba(255, 98, 189, 0.3);
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

  .status-section,
  .brief-section,
  .contact-form {
    grid-template-columns: 1fr;
  }

  .brief-field,
  .contact-form button {
    grid-column: auto;
  }

  .status-list div {
    grid-template-columns: 1fr;
    gap: 0.4rem;
  }
}
</style>
