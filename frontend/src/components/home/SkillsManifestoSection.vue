<template>
  <section id="services" class="skills-section">
    <div class="skills-grid">
      <div>
        <h2 class="section-heading">
          [0x02] 技能矩阵<br />
          <span>// DEPENDENCIES LOADED</span>
        </h2>

        <ul class="skill-list">
          <li class="skill-item hoverable accent">
            <div class="skill-title-row">
              <span class="skill-code">JS / TS</span>
              <strong>前端前沿架构</strong>
            </div>
            <p>Vue / TypeScript / Vite — 拒绝臃肿，构建具备呼吸感与极速响应的超前 UI。</p>
          </li>

          <li class="skill-item hoverable purple">
            <div class="skill-title-row">
              <span class="skill-code">GLSL / 3D</span>
              <strong>创意视觉生成</strong>
            </div>
            <p>Three.js / WebGL / Shaders — 突破 2D 限制，用数学和算法在屏幕上绘制出宇宙。</p>
          </li>

          <li class="skill-item hoverable blue">
            <div class="skill-title-row">
              <span class="skill-code">ALGO / SYS</span>
              <strong>算法工程化与系统思维</strong>
            </div>
            <p>Algorithms / Backend / Hardware — 从前端交互延伸到底层逻辑，把学习路径变成真正的工程能力。</p>
          </li>
        </ul>
      </div>

      <div id="about" class="manifesto-wrap">
        <h2 class="section-heading manifesto-heading">
          [0x03] 极客宣言<br />
          <span>// THE MANIFESTO</span>
        </h2>

        <article class="manifesto-card">
          <i class="corner top-left"></i>
          <i class="corner bottom-right"></i>

          <p class="terminal-line">&gt; cat manifesto.md</p>
          <p>
            当大多数人忙着套用现成模板时，我选择了一条更陡峭的路：成为数字世界的<strong>造物者与重构者</strong>。
          </p>
          <p>
            我沉迷于敲击键盘的节奏，也享受排查 Bug 带来的解谜快感。从前端交互到后端架构，从算法工程化到创意可视化，技术不是冰冷工具，而是我表达创造力的媒介。
          </p>
          <blockquote>“我用项目锻造能力，用审美表达思考。”</blockquote>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-section {
  max-width: 1280px;
  margin: 0 auto;
  padding: 128px 24px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 96px;
}

.section-heading {
  margin: 0 0 48px;
  padding-bottom: 24px;
  border-bottom: 1px solid #27272a;
  color: var(--vg-light);
  font-family: var(--font-mono);
  font-size: clamp(32px, 4vw, 44px);
  line-height: 1.2;
}

.section-heading span {
  display: block;
  margin-top: 12px;
  color: var(--vg-accent);
  font-size: 14px;
  animation: pulse 1.6s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.skill-list {
  list-style: none;
  display: grid;
  gap: 32px;
  margin: 0;
  padding: 0;
  font-family: var(--font-mono);
}

.skill-item {
  padding: 0 0 8px 24px;
  border-left: 2px solid #27272a;
  transition: border-color 0.25s ease;
}

.skill-item.accent:hover { border-color: var(--vg-accent); }
.skill-item.purple:hover { border-color: var(--vg-purple); }
.skill-item.blue:hover { border-color: #60a5fa; }

.skill-title-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
}

.skill-code {
  padding: 4px 8px;
  color: var(--vg-accent);
  background: rgba(0, 210, 255, 0.1);
  font-size: 14px;
}

.purple .skill-code {
  color: var(--vg-purple);
  background: rgba(176, 38, 255, 0.1);
}

.blue .skill-code {
  color: #60a5fa;
  background: rgba(96, 165, 250, 0.1);
}

.skill-title-row strong {
  color: #fff;
  font-size: clamp(18px, 2vw, 22px);
  transition: color 0.25s ease;
}

.accent:hover strong { color: var(--vg-accent); }
.purple:hover strong { color: var(--vg-purple); }
.blue:hover strong { color: #60a5fa; }

.skill-item p {
  margin: 0;
  color: #71717a;
  font-family: var(--font-sans);
  font-size: 14px;
  letter-spacing: 0.04em;
  line-height: 1.7;
}

.manifesto-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.manifesto-heading span {
  color: #71717a;
}

.manifesto-card {
  position: relative;
  padding: clamp(32px, 5vw, 40px);
  border: 1px solid #27272a;
  background: #0c0c0e;
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.3);
  color: #d4d4d8;
  font-size: 18px;
  font-weight: 300;
  line-height: 1.9;
}

.manifesto-card strong {
  color: var(--vg-light);
}

.corner {
  position: absolute;
  width: 12px;
  height: 12px;
}

.top-left {
  top: 0;
  left: 0;
  border-top: 2px solid var(--vg-accent);
  border-left: 2px solid var(--vg-accent);
}

.bottom-right {
  right: 0;
  bottom: 0;
  border-right: 2px solid var(--vg-accent);
  border-bottom: 2px solid var(--vg-accent);
}

.terminal-line {
  margin: 0 0 24px;
  color: var(--vg-purple);
  font-family: var(--font-mono);
  font-size: 14px;
}

.manifesto-card blockquote {
  margin: 32px 0 0;
  padding: 8px 0 8px 20px;
  border-left: 4px solid var(--vg-accent);
  background: rgba(0, 210, 255, 0.06);
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-weight: 600;
}

@media (max-width: 960px) {
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 64px;
  }
}
</style>
