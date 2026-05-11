<template>
  <footer id="contact" class="contact-footer">
    <div class="ghost-words" aria-hidden="true">
      <span>GEEK</span>
      <span>HACKER</span>
    </div>

    <div class="contact-inner">
      <div class="contact-main">
        <p class="contact-kicker">&gt; 准备好制造点噪音了吗？</p>
        <h2>
          寻找下一个<br />
          <span class="glitch-text" data-text="颠覆性想法">颠覆性想法</span>
        </h2>
        <p class="contact-copy">
          如果你有一个足以改变规则的项目、想法，或者只是想一起讨论技术、审美与成长，建立连接吧。
        </p>

        <a href="mailto:hello@zhengeek.dev" class="mail-link hoverable">
          <span>hello</span><i>@zhengeek.dev</i>
          <b class="blink-cursor"></b>
        </a>
      </div>

      <div class="contact-side">
        <section>
          <h4>/* 联络协议 */</h4>
          <ul>
            <li><a class="hoverable" href="https://github.com/zhengeek" target="_blank" rel="noreferrer">⌁ GitHub 基地</a></li>
            <li><RouterLink class="hoverable" to="/blog">⌁ 技术博客</RouterLink></li>
            <li><RouterLink class="hoverable" to="/projects">⌁ 项目作品</RouterLink></li>
          </ul>
        </section>

        <section>
          <h4>/* 系统节点状态 */</h4>
          <p class="online"><span></span> 内核在线运行中</p>
          <p class="loc">LOC: 127.0.0.1 [LOCAL]</p>
        </section>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2026 ZhenGeek // CODE IS POETRY. HACK THE PLANET.</p>
      <span class="hoverable">END-TO-END ENCRYPTED</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.contact-footer {
  position: relative;
  margin-top: 80px;
  padding: 128px 24px 48px;
  overflow: hidden;
  border-top: 1px solid #18181b;
  background: #000;
}

.ghost-words {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.05;
  pointer-events: none;
}

.ghost-words span {
  font-family: var(--font-display);
  font-size: clamp(120px, 20vw, 280px);
  font-weight: 900;
  line-height: 0.85;
  letter-spacing: -0.08em;
}

.contact-inner {
  position: relative;
  z-index: 10;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 64px;
}

.contact-main {
  max-width: 720px;
}

.contact-kicker {
  margin: 0 0 16px;
  color: var(--vg-accent);
  font-family: var(--font-mono);
}

h2 {
  margin: 0 0 32px;
  font-family: var(--font-display);
  font-size: clamp(52px, 7vw, 92px);
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
}

h2 span {
  color: var(--vg-purple);
}

.contact-copy {
  max-width: 520px;
  margin: 0 0 48px;
  color: #a1a1aa;
  font-size: 18px;
  line-height: 1.8;
}

.mail-link {
  display: inline-block;
  padding-bottom: 8px;
  border-bottom: 2px solid #3f3f46;
  color: var(--vg-light);
  font-family: var(--font-mono);
  font-size: clamp(26px, 4vw, 44px);
  text-decoration: none;
  transition: color 0.25s ease, border-color 0.25s ease;
}

.mail-link:hover {
  color: var(--vg-accent);
  border-color: var(--vg-accent);
}

.mail-link i {
  color: #71717a;
  font-style: normal;
}

.mail-link b {
  width: 16px;
  height: 32px;
  display: inline-block;
  margin-left: 12px;
  vertical-align: middle;
  background: var(--vg-accent);
}

.contact-side {
  display: flex;
  flex-direction: column;
  gap: 40px;
  color: #71717a;
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: 0.12em;
}

h4 {
  display: inline-block;
  margin: 0 0 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #27272a;
  color: var(--vg-light);
}

ul {
  list-style: none;
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
}

li a {
  color: #71717a;
  text-decoration: none;
  transition: color 0.25s ease;
}

li a:hover {
  color: var(--vg-accent);
}

.online {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: #22c55e;
}

.online span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse 1.4s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}

.loc {
  margin: 4px 0 0;
  color: #52525b;
}

.footer-bottom {
  position: relative;
  z-index: 10;
  max-width: 1280px;
  margin: 128px auto 0;
  padding-top: 32px;
  border-top: 1px solid #18181b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  color: #52525b;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.14em;
}

.footer-bottom p {
  margin: 0;
}

.footer-bottom span:hover {
  color: var(--vg-accent);
}

@media (max-width: 900px) {
  .contact-inner,
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
