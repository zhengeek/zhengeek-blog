<template>
  <div class="lab-container">
    <!-- 页面头部：夸张的标题与标语 -->
    <header class="page-header">
      <h1 class="main-title">CREATIVE LAB</h1>
      <h2 class="sub-title">// 创意实验室</h2>
      <div class="header-desc-box">
        <p>这里会收集视觉实验、交互设计、算法 demo、创意编码和未来硬件可视化想法。</p>
      </div>
    </header>

    <!-- 实验卡片网格 -->
    <div class="lab-grid">
      
      <!-- 实验 1 -->
      <article class="brutalist-card lab-card">
        <div class="card-header bg-magenta text-white">
          <div class="header-top">
            <h3>Orbit of Growth</h3>
            <span class="status-badge bg-white text-black border-black">Idea</span>
          </div>
        </div>
        <div class="card-content">
          <p class="experiment-desc">A future interactive hero scene with birds flying around a central sphere.</p>
          <div class="tech-stack">
            <span class="tech-tag">Three.js</span>
            <span class="tech-tag">Canvas</span>
            <span class="tech-tag">Mouse Interaction</span>
          </div>
          <div class="card-footer">
            <button class="launch-btn" disabled>[ BOOT_SEQ ]</button>
          </div>
        </div>
      </article>

      <!-- 实验 2 -->
      <article class="brutalist-card lab-card">
        <div class="card-header bg-cyan text-black">
          <div class="header-top">
            <h3>Mouse Ripple Effect</h3>
            <span class="status-badge bg-yellow text-black border-black">Planned</span>
          </div>
        </div>
        <div class="card-content">
          <p class="experiment-desc">A mouse movement effect that creates soft neon ripples on the page.</p>
          <div class="tech-stack">
            <span class="tech-tag">CSS</span>
            <span class="tech-tag">Canvas</span>
            <span class="tech-tag">JavaScript</span>
          </div>
          <div class="card-footer">
            <button class="launch-btn" disabled>[ BOOT_SEQ ]</button>
          </div>
        </div>
      </article>

      <!-- 实验 3 -->
      <article class="brutalist-card lab-card">
        <div class="card-header bg-yellow text-black">
          <div class="header-top">
            <h3>Algorithm Visualizer</h3>
            <span class="status-badge bg-white text-black border-black">Planned</span>
          </div>
        </div>
        <div class="card-content">
          <p class="experiment-desc">Interactive visualization for sorting, searching and graph algorithms.</p>
          <div class="tech-stack">
            <span class="tech-tag">Vue3</span>
            <span class="tech-tag">Canvas</span>
            <span class="tech-tag">Algorithms</span>
          </div>
          <div class="card-footer">
            <button class="launch-btn" disabled>[ BOOT_SEQ ]</button>
          </div>
        </div>
      </article>

      <!-- 实验 4 -->
      <article class="brutalist-card lab-card">
        <div class="card-header bg-black text-white">
          <div class="header-top">
            <h3>FPGA / Hardware Visualization</h3>
            <span class="status-badge bg-magenta text-white border-white">Future</span>
          </div>
        </div>
        <div class="card-content">
          <p class="experiment-desc">A future idea for visualizing hardware signals or embedded system data.</p>
          <div class="tech-stack">
            <span class="tech-tag tag-outline">FPGA</span>
            <span class="tech-tag tag-outline">Embedded</span>
            <span class="tech-tag tag-outline">Web Visualization</span>
          </div>
          <div class="card-footer">
            <button class="launch-btn btn-white" disabled>[ BOOT_SEQ ]</button>
          </div>
        </div>
      </article>

    </div>

    <!-- 底部滚动警告条 -->
    <div class="dev-status-banner">
      <div class="marquee-content">
        <span>⚠️ [SYSTEM_NOTICE]: EXPERIMENTS WILL BE ADDED STEP BY STEP // 实验逐步添加中 // ZHENGEEK V1.0 ⚠️</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 静态的 Lab 展示组件。未来的迭代将会在这里引入真正的 Canvas 和 WebGL 组件。
</script>

<style scoped>
/* 基础布局与背景纹理 */
.lab-container {
  min-height: 100vh;
  padding: 4rem 2rem;
  background-color: #f4f4f0; /* 米白底色 */
  background-image: 
    linear-gradient(#e5e5df 1px, transparent 1px),
    linear-gradient(90deg, #e5e5df 1px, transparent 1px);
  background-size: 40px 40px;
  font-family: 'Inter', system-ui, sans-serif;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 头部排版 */
.page-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  width: 100%;
  max-width: 800px;
}

.main-title {
  font-size: 5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  margin: 0;
  line-height: 1;
  text-shadow: 6px 6px 0px #00ffff; /* 电离蓝阴影 */
}

.sub-title {
  font-family: 'Fira Code', monospace;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
  background-color: #000;
  color: #fff;
  display: inline-block;
  padding: 0.5rem 1rem;
  border: 3px solid #000;
  transform: rotate(-1deg);
}

.header-desc-box {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #fff;
  border: 4px solid #000;
  box-shadow: 8px 8px 0px 0px #000;
  font-size: 1.2rem;
  font-weight: bold;
  transform: rotate(1deg); /* 轻微倾斜增加拼贴感 */
}

/* 实验卡片网格布局 */
.lab-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  width: 100%;
  margin-bottom: 5rem;
}

/* 新粗野主义卡片基座 */
.brutalist-card {
  background-color: #fff;
  border: 4px solid #000;
  box-shadow: 12px 12px 0px 0px #000;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.brutalist-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 16px 16px 0px 0px #000;
}

.card-header {
  padding: 1.5rem;
  border-bottom: 4px solid #000;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.card-header h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 900;
  line-height: 1.2;
}

.status-badge {
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  font-weight: bold;
  padding: 0.3rem 0.6rem;
  border: 2px solid;
}

.card-content {
  padding: 2rem 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.experiment-desc {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-weight: 500;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 2rem;
}

.tech-tag {
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  font-weight: bold;
  padding: 0.3rem 0.6rem;
  border: 2px solid #000;
  background-color: #eee;
  color: #000;
}

.tech-tag.tag-outline {
  background-color: transparent;
  border-style: dashed;
}

/* 操作按钮 */
.card-footer {
  margin-top: auto;
}

.launch-btn {
  width: 100%;
  font-family: 'Fira Code', monospace;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.8rem;
  border: 3px solid #000;
  background-color: #000;
  color: #fff;
  cursor: not-allowed;
  transition: all 0.2s ease;
  box-shadow: 4px 4px 0px 0px #000;
}

.launch-btn.btn-white {
  background-color: #fff;
  color: #000;
}

.launch-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px 0px #000;
}

/* 颜色工具类 */
.bg-cyan { background-color: #00ffff; }
.bg-magenta { background-color: #ff00ff; }
.bg-yellow { background-color: #fffa00; }
.bg-black { background-color: #000; }
.bg-white { background-color: #fff; }
.text-white { color: #fff; }
.text-black { color: #000; }
.border-black { border-color: #000; }
.border-white { border-color: #fff; }

/* 底部滚动状态条 (Marquee) */
.dev-status-banner {
  width: 100%;
  background-color: #00ffff; /* 青色代表实验室 */
  color: #000;
  border-top: 4px solid #000;
  border-bottom: 4px solid #000;
  padding: 0.8rem 0;
  overflow: hidden;
  position: relative;
  margin-top: auto;
}

.marquee-content {
  display: inline-block;
  white-space: nowrap;
  animation: marquee 15s linear infinite;
  font-family: 'Fira Code', monospace;
  font-weight: 900;
  font-size: 1.2rem;
}

@keyframes marquee {
  0% { transform: translateX(100vw); }
  100% { transform: translateX(-100%); }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .main-title {
    font-size: 3.5rem;
  }
}
</style>
