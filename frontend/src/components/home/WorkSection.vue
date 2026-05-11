<template>
  <section id="work" class="work-section">
    <div class="work-inner">
      <h2 class="work-heading text-outline">
        [0x01] 颠覆性实践 <br />
        <span>&lt;开源与重构 /&gt;</span>
      </h2>

      <article class="project-row">
        <div class="project-visual reveal-image-container hoverable terminal-frame">
          <div class="terminal-bar">
            <i class="dot red"></i>
            <i class="dot yellow"></i>
            <i class="dot green"></i>
            <span>bash - root@zhengeek</span>
          </div>
          <img
            class="reveal-image project-image terminal-image"
            src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2000&auto=format&fit=crop"
            alt="Terminal Simulation"
          />
        </div>
        <div class="project-copy">
          <p class="eyebrow accent">/* 个人网站重构 */</p>
          <h3>ZHENGEEK.OS</h3>
          <p>
            用 Vue3、TypeScript 和长期主义构建的个人数字空间。它会承载作品集、技术博客、成长记录和创意实验，用工程结构保存每一次迭代。
          </p>
          <div class="button-row">
            <RouterLink to="/projects" class="ghost-button hoverable">完整项目集</RouterLink>
            <RouterLink to="/blog" class="link-button hoverable">开发日志 -&gt;</RouterLink>
          </div>
        </div>
      </article>

      <article class="project-row reverse">
        <div class="project-copy">
          <p class="eyebrow purple">/* WebGL / 视觉生成 */</p>
          <h3>Neural Canvas</h3>
          <p>
            未来的创意实验区。这里会放鼠标涟漪、飞鸟环绕球体、算法可视化与 Three.js 交互，把抽象的技术学习变成可感知的视觉体验。
          </p>
          <div class="button-row">
            <RouterLink to="/lab" class="ghost-button purple-hover hoverable">进入实验室</RouterLink>
          </div>
        </div>
        <div class="project-visual reveal-image-container hoverable">
          <img
            class="reveal-image project-image"
            src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop"
            alt="WebGL Generative Art"
          />
        </div>
      </article>

      <article class="wide-project">
        <p class="eyebrow blue">/* 工程能力 / 长期构建 */</p>
        <div class="wide-visual reveal-image-container hoverable">
          <img
            class="reveal-image wide-image"
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop"
            alt="Hardware Cyberdeck"
          />
          <div class="wide-overlay">
            <div class="wide-copy">
              <h3>CyberDeck Zero</h3>
              <p>
                未来这里会记录我的硬件、嵌入式、FPGA 与底层系统兴趣。ZhenGeek 不只是一张网页，而是一条从软件到硬件、从审美到工程的成长路线。
              </p>
              <RouterLink to="/about" class="wide-link hoverable">[ 查阅成长路线 ]</RouterLink>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useRevealOnScroll } from '../../composables/useRevealOnScroll'

useRevealOnScroll()
</script>

<style scoped>
.work-section {
  position: relative;
  padding: 128px 24px;
  border-top: 1px solid #18181b;
  background: #050505;
}

.work-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.work-heading {
  margin: 0 0 96px;
  font-family: var(--font-mono);
  font-size: clamp(38px, 5vw, 64px);
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
}

.work-heading span {
  color: var(--vg-light);
  -webkit-text-stroke: 0;
}

.project-row {
  display: grid;
  grid-template-columns: minmax(0, 8fr) minmax(280px, 4fr);
  gap: 64px;
  align-items: center;
  margin-bottom: 160px;
}

.project-row.reverse {
  grid-template-columns: minmax(280px, 4fr) minmax(0, 8fr);
}

.project-visual {
  position: relative;
  border: 1px solid #27272a;
  border-radius: 10px;
  overflow: hidden;
  background: #000;
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.45);
}

.terminal-frame {
  padding-top: 32px;
}

.terminal-bar {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  border-bottom: 1px solid #27272a;
  background: #111;
  color: #71717a;
  font-family: var(--font-mono);
  font-size: 12px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
}

.red { background: #ef4444; }
.yellow { background: #eab308; }
.green { background: #22c55e; }

.project-image {
  width: 100%;
  height: 55vh;
  object-fit: cover;
  display: block;
  filter: grayscale(1);
  opacity: 0.7;
  mix-blend-mode: luminosity;
  transition: filter 0.7s ease, opacity 0.7s ease, mix-blend-mode 0.7s ease, transform 1.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.project-visual:hover .project-image {
  filter: grayscale(0);
  opacity: 1;
  mix-blend-mode: normal;
}

.project-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.eyebrow {
  margin: 0 0 16px;
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: 0.16em;
}

.accent { color: var(--vg-accent); }
.purple { color: var(--vg-purple); }
.blue { color: #60a5fa; }

.project-copy h3 {
  margin: 0 0 24px;
  font-family: var(--font-display);
  font-size: clamp(40px, 5vw, 56px);
  line-height: 1;
  transition: color 0.25s ease;
}

.project-copy h3:hover {
  color: var(--vg-purple);
}

.project-copy p:not(.eyebrow) {
  margin: 0 0 32px;
  color: #a1a1aa;
  line-height: 1.9;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.ghost-button,
.link-button {
  padding: 10px 24px;
  color: var(--vg-light);
  font-family: var(--font-mono);
  font-size: 14px;
  text-decoration: none;
  border: 1px solid #52525b;
  transition: all 0.25s ease;
}

.ghost-button:hover {
  background: var(--vg-accent);
  color: var(--vg-dark);
  border-color: var(--vg-accent);
}

.purple-hover:hover {
  background: var(--vg-purple);
  color: #fff;
  border-color: var(--vg-purple);
}

.link-button {
  border-color: transparent;
}

.link-button:hover {
  color: var(--vg-accent);
}

.wide-project {
  margin-bottom: 64px;
}

.wide-visual {
  position: relative;
  width: 100%;
  height: 70vh;
  border: 1px solid #27272a;
  border-radius: 10px;
  overflow: hidden;
}

.wide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  opacity: 0.6;
  transition: filter 0.7s ease, opacity 0.7s ease, transform 1.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.wide-visual:hover .wide-image {
  filter: grayscale(0);
  opacity: 1;
}

.wide-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: clamp(32px, 6vw, 64px);
  background: linear-gradient(to top, var(--vg-dark), rgba(9, 9, 11, 0.6), transparent);
}

.wide-copy {
  max-width: 760px;
  padding-left: 32px;
  border-left: 4px solid #3b82f6;
}

.wide-copy h3 {
  margin: 0 0 24px;
  color: #fff;
  font-family: var(--font-display);
  font-size: clamp(52px, 7vw, 84px);
  line-height: 1;
}

.wide-copy p {
  color: #d4d4d8;
  font-size: clamp(17px, 2vw, 20px);
  line-height: 1.8;
}

.wide-link {
  color: #60a5fa;
  font-family: var(--font-mono);
  letter-spacing: 0.14em;
  text-decoration: none;
  transition: color 0.25s ease;
}

.wide-link:hover {
  color: #fff;
}

@media (max-width: 900px) {
  .project-row,
  .project-row.reverse {
    grid-template-columns: 1fr;
    gap: 32px;
    margin-bottom: 96px;
  }

  .project-row.reverse .project-copy {
    order: 2;
  }

  .project-row.reverse .project-visual {
    order: 1;
  }

  .work-section {
    padding: 96px 24px;
  }
}
</style>
