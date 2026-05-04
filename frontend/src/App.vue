<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const now = ref(new Date())
let timer: number | undefined

const clockTime = computed(() => {
  const hours = String(now.value.getHours()).padStart(2, '0')
  const minutes = String(now.value.getMinutes()).padStart(2, '0')

  return { hours, minutes }
})

const dateLabel = computed(() => {
  const year = now.value.getFullYear()
  const month = String(now.value.getMonth() + 1).padStart(2, '0')
  const day = String(now.value.getDate()).padStart(2, '0')

  return `${year} / ${month} / ${day}`
})

const weekdayLabel = computed(() =>
  new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(now.value).toUpperCase(),
)

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (timer) {
    window.clearInterval(timer)
  }
})
</script>

<template>
  <div class="page-scroll">
    <section class="intro-hero" aria-labelledby="intro-title">
      <div class="intro-brand">ZhenGeek</div>
      <div class="intro-lines" aria-hidden="true"></div>
      <div class="intro-copy">
        <p class="intro-kicker">ZHENGEEK BLOG</p>
        <h1 id="intro-title" class="intro-title">Envision. Nurture. Forge. Pioneer.</h1>
      </div>
      <div class="scroll-cue" aria-hidden="true">
        <span></span>
        <p>SCROLL DOWN</p>
      </div>
    </section>

    <section class="cyber-home" aria-label="Cyberpunk widget homepage">
      <div class="grid-noise" aria-hidden="true"></div>

      <main class="desktop" aria-label="ZhenGeek Blog cyberpunk homepage">
        <section class="pixel-dog-card glass-panel" aria-label="Interactive pixel dog">
          <div class="pixel-dog" aria-hidden="true">
            <span class="dog-ear left"></span>
            <span class="dog-ear right"></span>
            <span class="dog-head">
              <i class="dog-eye left"></i>
              <i class="dog-eye right"></i>
              <i class="dog-nose"></i>
              <i class="dog-mouth"></i>
            </span>
            <span class="dog-body"></span>
            <span class="dog-tail"></span>
            <span class="dog-leg leg-one"></span>
            <span class="dog-leg leg-two"></span>
          </div>
          <span class="dog-hint">触摸我</span>
        </section>

        <aside class="dock-panel glass-panel">
          <div class="profile">
            <div class="avatar">ZG</div>
            <div>
              <strong>ZhenGeek</strong>
              <span>博客在线</span>
            </div>
          </div>

          <p class="panel-label">站点导航</p>
          <nav class="menu-list" aria-label="Homepage sections">
            <button class="active" type="button"><span>01</span> 近期文章</button>
            <button type="button"><span>02</span> 项目作品</button>
            <button type="button"><span>03</span> 关于本站</button>
            <button type="button"><span>04</span> 灵感实验室</button>
          </nav>
        </aside>

        <section class="hero-card glass-panel">
          <p class="kicker">ZHENGEEK BLOG</p>
          <h2>Envision. Nurture. Forge. Pioneer.</h2>
          <p class="slogan">在霓虹网格里记录技术、想象力与长期创造。</p>
        </section>

        <section class="clock-card glass-panel" aria-label="Neon clock widget">
          <div class="clock-top">
            <span>NEON CLOCK</span>
            <i></i>
          </div>
          <div class="clock-display">
            <span>{{ clockTime.hours }}</span>
            <em>:</em>
            <span>{{ clockTime.minutes }}</span>
          </div>
        </section>

        <section class="welcome-card glass-panel">
          <div class="orb-avatar">Z</div>
          <p>Good Evening</p>
          <strong>Nice to meet you in the neon grid.</strong>
        </section>

        <section class="calendar-card glass-panel" aria-label="Calendar widget">
          <div class="calendar-head">
            <span>{{ dateLabel }}</span>
            <strong>{{ weekdayLabel }}</strong>
          </div>
          <div class="calendar-grid">
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
            <span>S</span>
            <small>27</small>
            <small>28</small>
            <small>29</small>
            <small>30</small>
            <small class="hot">01</small>
            <small>02</small>
            <small>03</small>
            <small>04</small>
            <small class="today">05</small>
            <small>06</small>
            <small>07</small>
            <small>08</small>
            <small>09</small>
            <small>10</small>
          </div>
        </section>

        <section class="post-card glass-panel">
          <span>最新信号</span>
          <strong>正在搭建第一版静态首页</strong>
          <p>前端 / Vue / 赛博朋克界面</p>
        </section>

        <section class="status-card glass-panel">
          <span>System Mood</span>
          <strong>Creative mode: active</strong>
          <div class="progress"><i></i></div>
        </section>

        <section class="music-card glass-panel">
          <button type="button" aria-label="Play">▶</button>
          <div>
            <span>Now playing</span>
            <strong>Midnight Compile</strong>
          </div>
        </section>
      </main>
    </section>
  </div>
</template>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

:global(html) {
  background: #070713;
  scroll-behavior: smooth;
}

:global(body) {
  margin: 0;
  min-width: 320px;
  color: #ecfbff;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: #070713;
}

:global(#app) {
  width: 100%;
  max-width: none;
  min-height: 100vh;
  margin: 0;
  border: 0;
  text-align: left;
  display: block;
}

:global(button) {
  font: inherit;
}

.page-scroll {
  width: 100%;
  min-height: 100vh;
  background: #070713;
}

.intro-hero {
  min-height: 100svh;
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;
  padding: 40px;
  background:
    radial-gradient(circle at 6% 12%, rgba(102, 255, 87, 0.82), transparent 0 18%, rgba(102, 255, 87, 0.32) 19%, transparent 42%),
    radial-gradient(circle at 88% 82%, rgba(40, 255, 48, 0.76), transparent 0 17%, rgba(40, 255, 48, 0.28) 18%, transparent 40%),
    linear-gradient(135deg, #161616 0%, #101312 44%, #070908 100%);
}

.intro-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(115deg, transparent 0 22%, rgba(50, 255, 56, 0.18) 22.2% 22.5%, transparent 22.7% 100%),
    linear-gradient(158deg, transparent 0 45%, rgba(50, 255, 56, 0.16) 45.1% 45.3%, transparent 45.5% 100%),
    linear-gradient(8deg, transparent 0 64%, rgba(50, 255, 56, 0.11) 64.1% 64.4%, transparent 64.6% 100%);
  opacity: 0.92;
  pointer-events: none;
}

.intro-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(69, 255, 67, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(69, 255, 67, 0.04) 1px, transparent 1px);
  background-size: 68px 68px;
  mask-image: radial-gradient(circle at center, black 0 48%, transparent 78%);
}

.intro-brand {
  position: absolute;
  top: 34px;
  right: 42px;
  z-index: 2;
  color: #eaffea;
  border: 1px solid rgba(233, 255, 232, 0.82);
  border-radius: 999px;
  padding: 9px 18px;
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 0;
  text-shadow: 0 0 12px rgba(48, 255, 58, 0.72);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    0 0 24px rgba(48, 255, 58, 0.18);
}

.intro-lines {
  position: absolute;
  width: min(28vw, 320px);
  aspect-ratio: 1.18;
  right: 18%;
  top: 29%;
  opacity: 0.72;
  background:
    linear-gradient(29deg, transparent 0 47%, #f2fff2 47.4% 48.4%, transparent 48.8%),
    linear-gradient(148deg, transparent 0 48%, #f2fff2 48.4% 49.4%, transparent 49.8%),
    linear-gradient(90deg, transparent 0 11%, #f2fff2 11.5% 12.5%, transparent 13% 87%, #f2fff2 87.5% 88.5%, transparent 89%),
    linear-gradient(#f2fff2, #f2fff2);
  clip-path: polygon(0 52%, 86% 0, 100% 88%);
  filter: drop-shadow(0 0 12px rgba(48, 255, 58, 0.42));
}

.intro-copy {
  width: min(1040px, 100%);
  position: relative;
  z-index: 1;
}

.intro-kicker {
  margin: 0 0 18px;
  color: #31ff2f;
  font-size: clamp(14px, 1.4vw, 20px);
  font-weight: 900;
  letter-spacing: 0.16em;
  text-shadow: 0 0 18px rgba(48, 255, 58, 0.76);
}

.intro-title {
  max-width: 980px;
  margin: 0;
  color: #f7f7f7;
  font-size: clamp(58px, 10vw, 142px);
  line-height: 0.88;
  font-weight: 950;
  letter-spacing: 0;
  text-transform: uppercase;
  text-shadow:
    0 0 22px rgba(48, 255, 58, 0.2),
    4px 4px 0 rgba(49, 255, 47, 0.82);
}

.scroll-cue {
  position: absolute;
  left: 50%;
  bottom: 28px;
  z-index: 2;
  transform: translateX(-50%);
  display: grid;
  place-items: center;
  gap: 10px;
  color: #31ff2f;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-shadow: 0 0 14px rgba(48, 255, 58, 0.72);
}

.scroll-cue span {
  width: 18px;
  height: 34px;
  border: 2px solid #f4fff4;
  border-radius: 999px;
  position: relative;
}

.scroll-cue span::after {
  content: "";
  position: absolute;
  top: 7px;
  left: 50%;
  width: 4px;
  height: 7px;
  border-radius: 999px;
  background: #31ff2f;
  transform: translateX(-50%);
  animation: scroll-dot 1.4s ease-in-out infinite;
}

.scroll-cue p {
  margin: 0;
}

@keyframes scroll-dot {
  0%,
  100% {
    opacity: 0.35;
    transform: translate(-50%, 0);
  }

  50% {
    opacity: 1;
    transform: translate(-50%, 9px);
  }
}

.cyber-home {
  min-height: 100svh;
  overflow: hidden;
  position: relative;
  display: grid;
  place-items: center;
  padding: 44px 22px;
  background:
    radial-gradient(circle at 18% 78%, rgba(0, 255, 209, 0.22), transparent 32%),
    radial-gradient(circle at 76% 24%, rgba(255, 44, 214, 0.24), transparent 34%),
    linear-gradient(135deg, #080817 0%, #12102a 48%, #071a22 100%);
}

.cyber-home::before,
.cyber-home::after {
  content: "";
  position: absolute;
  width: 42vw;
  aspect-ratio: 1;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.5;
  pointer-events: none;
}

.cyber-home::before {
  left: -10vw;
  bottom: -16vw;
  background: #00ffd1;
}

.cyber-home::after {
  right: -12vw;
  top: -14vw;
  background: #ff2cd6;
}

.grid-noise {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(0, 255, 209, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 44, 214, 0.07) 1px, transparent 1px);
  background-size: 54px 54px;
  mask-image: radial-gradient(circle at center, black 0 52%, transparent 78%);
}

.desktop {
  width: min(1060px, 100%);
  min-height: 780px;
  position: relative;
  z-index: 1;
}

.glass-panel {
  position: absolute;
  border: 1px solid rgba(163, 255, 244, 0.22);
  border-radius: 28px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.04)),
    rgba(8, 10, 26, 0.62);
  box-shadow:
    0 28px 80px rgba(0, 0, 0, 0.34),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05),
    0 0 34px rgba(0, 255, 209, 0.08);
  backdrop-filter: blur(22px);
}

.pixel-dog-card {
  left: 398px;
  top: 0;
  width: 268px;
  height: 118px;
  display: grid;
  place-items: center;
  padding-top: 8px;
  border-radius: 26px;
}

.pixel-dog {
  width: 112px;
  height: 72px;
  position: relative;
  image-rendering: pixelated;
  cursor: pointer;
  transition: transform 0.22s ease;
}

.pixel-dog-card:hover .pixel-dog,
.pixel-dog-card:active .pixel-dog {
  transform: translateY(-5px) rotate(-2deg);
}

.dog-head,
.dog-body,
.dog-ear,
.dog-tail,
.dog-leg {
  position: absolute;
  background: #f8ffff;
  border: 3px solid #071014;
  box-shadow:
    0 0 0 2px rgba(0, 255, 209, 0.34),
    0 0 18px rgba(0, 255, 209, 0.45);
}

.dog-head {
  left: 18px;
  top: 10px;
  width: 56px;
  height: 46px;
  border-radius: 8px;
  z-index: 2;
}

.dog-body {
  right: 16px;
  top: 31px;
  width: 58px;
  height: 34px;
  border-radius: 8px;
  background: #e7fbff;
}

.dog-ear {
  top: 2px;
  width: 22px;
  height: 24px;
  background: #ff7be7;
  z-index: 1;
}

.dog-ear.left {
  left: 13px;
  border-radius: 7px 3px 3px 7px;
}

.dog-ear.right {
  left: 55px;
  border-radius: 3px 7px 7px 3px;
}

.dog-eye,
.dog-nose,
.dog-mouth {
  position: absolute;
  display: block;
  background: #071014;
}

.dog-eye {
  top: 16px;
  width: 6px;
  height: 8px;
  border-radius: 2px;
}

.dog-eye.left {
  left: 13px;
}

.dog-eye.right {
  right: 13px;
}

.dog-nose {
  left: 24px;
  top: 27px;
  width: 8px;
  height: 6px;
  border-radius: 2px;
}

.dog-mouth {
  left: 22px;
  top: 35px;
  width: 14px;
  height: 3px;
}

.dog-tail {
  right: 1px;
  top: 22px;
  width: 23px;
  height: 12px;
  border-radius: 3px 10px 10px 3px;
  transform-origin: left center;
  animation: tail-idle 0.86s steps(2, end) infinite;
}

.pixel-dog-card:hover .dog-tail,
.pixel-dog-card:active .dog-tail {
  animation-duration: 0.28s;
}

.dog-leg {
  bottom: 0;
  width: 13px;
  height: 18px;
  border-radius: 3px;
  background: #f8ffff;
}

.leg-one {
  left: 52px;
}

.leg-two {
  right: 22px;
}

.dog-hint {
  position: absolute;
  right: 18px;
  bottom: 14px;
  color: #fff35c;
  font-size: 12px;
  font-weight: 900;
  text-shadow: 0 0 14px rgba(255, 243, 92, 0.6);
  opacity: 0.82;
}

@keyframes tail-idle {
  0%,
  100% {
    transform: rotate(-18deg);
  }

  50% {
    transform: rotate(18deg);
  }
}

.dock-panel {
  left: 42px;
  top: 170px;
  width: 230px;
  min-height: 310px;
  padding: 24px 20px;
}

.profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar,
.orb-avatar {
  display: grid;
  place-items: center;
  font-weight: 900;
  color: #071014;
  background: linear-gradient(135deg, #00ffd1, #fff35c 48%, #ff2cd6);
  box-shadow: 0 0 28px rgba(0, 255, 209, 0.34);
}

.avatar {
  width: 40px;
  aspect-ratio: 1;
  border-radius: 14px;
  font-size: 13px;
}

.profile strong,
.profile span {
  display: block;
}

.profile strong {
  color: #f6ffff;
  font-size: 18px;
  line-height: 1.1;
}

.profile span {
  margin-top: 4px;
  color: #00ffd1;
  font-size: 12px;
  text-shadow: 0 0 12px rgba(0, 255, 209, 0.7);
}

.panel-label {
  margin: 24px 0 10px;
  color: #95a9b5;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.menu-list {
  display: grid;
  gap: 10px;
}

.menu-list button {
  min-height: 42px;
  border: 0;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  color: #b9ccd4;
  background: transparent;
  cursor: default;
}

.menu-list button span {
  color: #ff2cd6;
  font-size: 12px;
  font-weight: 900;
}

.menu-list .active,
.menu-list button:hover {
  color: #071014;
  background: linear-gradient(135deg, #00ffd1, #fff35c);
  box-shadow: 0 0 24px rgba(0, 255, 209, 0.3);
}

.hero-card {
  left: 306px;
  top: 158px;
  width: 365px;
  min-height: 226px;
  padding: 28px;
}

.kicker {
  margin: 0 0 10px;
  color: #00ffd1;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.16em;
  text-shadow: 0 0 16px rgba(0, 255, 209, 0.72);
}

.hero-card h2 {
  margin: 0;
  color: #ffffff;
  font-size: 40px;
  line-height: 1.04;
  font-weight: 900;
  letter-spacing: 0;
  text-shadow:
    0 0 14px rgba(0, 255, 209, 0.5),
    0 0 30px rgba(255, 44, 214, 0.3);
}

.slogan {
  margin: 18px 0 0;
  color: #fff35c;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.45;
  text-shadow: 0 0 14px rgba(255, 243, 92, 0.42);
}

.clock-card {
  right: 56px;
  top: 170px;
  width: 250px;
  padding: 18px;
  border-radius: 26px;
}

.clock-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.clock-top span {
  color: #00ffd1;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.12em;
}

.clock-top i {
  width: 9px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #ff2cd6;
  box-shadow: 0 0 18px #ff2cd6;
}

.clock-display {
  min-height: 86px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  color: #dffffa;
  background: rgba(2, 8, 16, 0.68);
  border: 1px solid rgba(0, 255, 209, 0.24);
  box-shadow:
    inset 0 0 22px rgba(0, 255, 209, 0.13),
    0 0 34px rgba(0, 255, 209, 0.16);
  font-family: "Courier New", ui-monospace, monospace;
  font-size: 54px;
  line-height: 1;
  letter-spacing: 0;
  text-shadow:
    0 0 8px #00ffd1,
    0 0 18px rgba(0, 255, 209, 0.9),
    2px 0 10px rgba(255, 44, 214, 0.6);
}

.clock-display em {
  color: #ff2cd6;
  font-style: normal;
}

.welcome-card {
  left: 328px;
  top: 420px;
  width: 300px;
  min-height: 210px;
  padding: 28px;
  display: grid;
  place-items: center;
  text-align: center;
}

.orb-avatar {
  width: 78px;
  aspect-ratio: 1;
  border-radius: 50%;
  margin-bottom: 16px;
  font-size: 34px;
}

.welcome-card p {
  margin: 0;
  color: #bcecf1;
  font-size: 18px;
  font-weight: 800;
}

.welcome-card strong {
  max-width: 220px;
  color: #ffffff;
  font-size: 19px;
  line-height: 1.45;
}

.calendar-card {
  right: 22px;
  top: 384px;
  width: 270px;
  padding: 22px;
}

.calendar-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #d6faff;
  margin-bottom: 18px;
}

.calendar-head span {
  font-size: 13px;
}

.calendar-head strong {
  color: #fff35c;
  font-size: 13px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px 8px;
  text-align: center;
}

.calendar-grid span {
  color: #00ffd1;
  font-size: 12px;
  font-weight: 900;
}

.calendar-grid small {
  min-height: 24px;
  display: grid;
  place-items: center;
  color: #aac0c7;
  border-radius: 9px;
  font-size: 12px;
}

.calendar-grid .today {
  color: #071014;
  background: #00ffd1;
  box-shadow: 0 0 18px rgba(0, 255, 209, 0.72);
}

.calendar-grid .hot {
  color: #fff35c;
}

.post-card {
  left: 62px;
  bottom: 72px;
  width: 245px;
  padding: 22px;
}

.status-card {
  left: 348px;
  bottom: 42px;
  width: 230px;
  padding: 20px;
}

.music-card {
  right: 96px;
  bottom: 74px;
  width: 270px;
  min-height: 72px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.post-card span,
.status-card span,
.music-card span {
  display: block;
  color: #8ea5af;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
}

.post-card strong,
.status-card strong,
.music-card strong {
  display: block;
  margin-top: 8px;
  color: #f9ffff;
  font-size: 17px;
  line-height: 1.35;
}

.post-card p {
  margin: 12px 0 0;
  color: #00ffd1;
  font-size: 13px;
}

.progress {
  height: 8px;
  margin-top: 16px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
}

.progress i {
  display: block;
  width: 72%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #00ffd1, #fff35c, #ff2cd6);
  box-shadow: 0 0 18px rgba(0, 255, 209, 0.6);
}

.music-card button {
  width: 46px;
  aspect-ratio: 1;
  border: 0;
  border-radius: 50%;
  color: #071014;
  background: #fff35c;
  box-shadow: 0 0 22px rgba(255, 243, 92, 0.5);
  cursor: default;
}

@media (max-width: 980px) {
  .intro-hero {
    padding: 26px;
  }

  .intro-brand {
    top: 24px;
    right: 24px;
  }

  .intro-lines {
    width: 260px;
    right: 10%;
    top: 35%;
  }

  .cyber-home {
    display: block;
    padding: 22px;
    overflow: visible;
  }

  .desktop {
    min-height: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  .glass-panel {
    position: static;
    width: auto;
  }

  .pixel-dog-card,
  .hero-card {
    grid-column: 1 / -1;
  }

  .dock-panel,
  .welcome-card,
  .calendar-card {
    min-height: auto;
  }
}

@media (max-width: 640px) {
  .intro-hero {
    padding: 22px;
    align-items: center;
    justify-items: start;
  }

  .intro-brand {
    right: 18px;
    top: 18px;
    font-size: 15px;
    padding: 8px 14px;
  }

  .intro-title {
    font-size: clamp(48px, 18vw, 78px);
  }

  .intro-lines {
    width: 220px;
    right: -24px;
    top: 42%;
  }

  .cyber-home {
    padding: 14px;
  }

  .desktop {
    grid-template-columns: 1fr;
  }

  .glass-panel {
    border-radius: 22px;
  }

  .dock-panel {
    order: 2;
  }

  .hero-card {
    padding: 24px;
  }

  .hero-card h2 {
    font-size: 36px;
  }

  .slogan {
    font-size: 15px;
  }

  .clock-display {
    min-height: 76px;
    font-size: 46px;
  }
}
</style>
