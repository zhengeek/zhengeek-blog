<template>
  <header class="hero-section">
    <div class="hero-inner">
      <p class="boot-line">
        <span class="pulse-dot"></span>
        // systemctl start core_innovation_engine
      </p>

      <h1 class="hero-title">
        <span>打破常规</span>
        <span class="accent glitch-text" data-text="重构边界">重构边界</span>
      </h1>

      <div class="hero-bottom">
        <div class="hero-copy">
          <p class="mono-line">&gt; 我是小蓁，一名正在构建 ZhenGeek 的开发者。</p>
          <p>
            在这里，代码不仅是枯燥的底层逻辑，更是我打破规则、创造视觉奇观与极致交互体验的武器。拒绝千篇一律的模板，用工程和审美重构自己的成长边界。
          </p>
        </div>

        <a href="#work" class="explore-button hoverable">
          <span>执行 / Explore</span>
          <svg class="arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>

    <div class="status-rotate">状态：全速运行 // 在线率：99.99%</div>
  </header>
</template>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 96px 24px 48px;
}

.hero-inner {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

.boot-line {
  margin: 0 0 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: clamp(14px, 1.5vw, 16px);
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--vg-accent);
  animation: pulse 1.6s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(1.35); }
}

.hero-title {
  margin: 0 0 32px;
  font-family: var(--font-display);
  font-size: clamp(72px, 14vw, 180px);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.08em;
  text-transform: uppercase;
}

.hero-title span {
  display: block;
}

.hero-title .accent {
  color: var(--vg-accent);
}

.hero-bottom {
  margin-top: clamp(32px, 7vw, 72px);
  padding-top: 32px;
  border-top: 1px solid #27272a;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 32px;
}

.hero-copy {
  max-width: 620px;
  padding-left: 16px;
  border-left: 2px solid var(--vg-purple);
  color: #a1a1aa;
  font-size: clamp(16px, 1.8vw, 18px);
  line-height: 1.8;
}

.hero-copy p {
  margin: 0;
}

.hero-copy p + p {
  margin-top: 8px;
}

.mono-line {
  color: var(--vg-light);
  font-family: var(--font-mono);
}

.explore-button {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border: 1px solid #27272a;
  background: var(--vg-gray);
  color: var(--vg-light);
  font-family: var(--font-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  transition: border-color 0.25s ease, color 0.25s ease;
}

.explore-button:hover {
  border-color: var(--vg-accent);
  color: var(--vg-accent);
}

.arrow {
  width: 20px;
  transition: transform 0.25s ease;
}

.explore-button:hover .arrow {
  transform: translateX(8px);
}

.status-rotate {
  position: absolute;
  right: 48px;
  bottom: 48px;
  transform: rotate(90deg);
  transform-origin: bottom right;
  display: none;
  color: #52525b;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.3em;
}

@media (min-width: 768px) {
  .hero-section {
    padding-left: 48px;
    padding-right: 48px;
  }

  .status-rotate {
    display: block;
  }
}

@media (max-width: 768px) {
  .hero-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
