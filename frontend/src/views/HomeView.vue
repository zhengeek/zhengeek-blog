<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const now = ref(new Date())
const scrollY = ref(0)
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
  new Intl.DateTimeFormat('zh-CN', { weekday: 'short' }).format(now.value),
)

const parallaxVars = computed(() => ({
  '--sky-shift': `${scrollY.value * 0.08}px`,
  '--moon-shift': `${scrollY.value * 0.18}px`,
  '--mountain-shift': `${scrollY.value * 0.28}px`,
  '--cloud-shift': `${scrollY.value * 0.42}px`,
}))

function updateScroll() {
  scrollY.value = window.scrollY
}

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = new Date()
  }, 1000)

  updateScroll()
  window.addEventListener('scroll', updateScroll, { passive: true })
})

onUnmounted(() => {
  if (timer) {
    window.clearInterval(timer)
  }

  window.removeEventListener('scroll', updateScroll)
})
</script>

<template>
  <div class="dream-page" :style="parallaxVars">
    <div class="dream-backdrop" aria-hidden="true">
      <div class="star-field"></div>
      <div class="anime-glow"></div>
      <div class="petals"></div>
      <div class="moon"></div>
      <div class="mountains mountain-back"></div>
      <div class="mountains mountain-front"></div>
      <div class="cloud cloud-one"></div>
      <div class="cloud cloud-two"></div>
      <div class="mist"></div>
    </div>

    <section class="title-section" aria-labelledby="main-title">
      <p class="brand-chip">ZhenGeek Blog</p>
      <h1 id="main-title">ZhenGeek</h1>
      <p class="scroll-note">Scroll into the dream</p>
    </section>

    <section class="slogan-section" aria-labelledby="slogan-title">
      <p class="section-kicker">MY CREATIVE RULE</p>
      <h2 id="slogan-title">Envision. Nurture. Forge. Pioneer.</h2>
      <p>把灵感养成作品，把技术写成旅途。</p>
    </section>

    <section class="modules-section" aria-label="ZhenGeek Blog modules">
      <main class="dream-desktop">
        <section class="pixel-dog-card glass-card" aria-label="Interactive pixel dog">
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
          <span class="dog-hint">摸摸像素狗</span>
        </section>

        <aside class="dock-panel glass-card">
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

        <section class="hero-card glass-card">
          <p class="kicker">ZHENGEEK ANIME LOG</p>
          <h3>梦境放映室</h3>
          <p class="hero-text">这里收纳代码、灵感分镜、二次元脑洞和长期创造。</p>
        </section>

        <section class="clock-card glass-card" aria-label="Clock widget">
          <div class="clock-top">
            <span>MOON CLOCK</span>
            <i></i>
          </div>
          <div class="clock-display">
            <span>{{ clockTime.hours }}</span>
            <em>:</em>
            <span>{{ clockTime.minutes }}</span>
          </div>
        </section>

        <section class="welcome-card glass-card">
          <div class="orb-avatar">夢</div>
          <p>Good Evening</p>
          <strong>今晚也适合慢慢写一点东西。</strong>
        </section>

        <section class="calendar-card glass-card" aria-label="Calendar widget">
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
            <small>01</small>
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

        <section class="post-card glass-card">
          <span>最新信号</span>
          <strong>正在搭建二次元梦核首页</strong>
          <p>前端 / Vue / Anime Glass UI</p>
        </section>

        <section class="status-card glass-card">
          <span>System Mood</span>
          <strong>想象力加载中</strong>
          <div class="progress"><i></i></div>
        </section>

        <section class="music-card glass-card">
          <button type="button" aria-label="Play">▶</button>
          <div>
            <span>Now playing</span>
            <strong>White River in a Dream</strong>
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
  background: #09152b;
  scroll-behavior: smooth;
}

:global(body) {
  margin: 0;
  min-width: 320px;
  color: #f7fbff;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: #09152b;
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

.dream-page {
  --sky-shift: 0px;
  --moon-shift: 0px;
  --mountain-shift: 0px;
  --cloud-shift: 0px;
  min-height: 300vh;
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(8, 18, 42, 0.28), rgba(45, 54, 98, 0.34) 52%, #142b4a 100%),
    #09152b;
}

.dream-backdrop {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background:
    radial-gradient(circle at 50% calc(18% + var(--sky-shift)), #ffffff 0 1px, transparent 1.6px),
    radial-gradient(circle at 18% calc(28% + var(--sky-shift)), rgba(255, 255, 255, 0.9) 0 1px, transparent 1.5px),
    radial-gradient(circle at 68% 36%, rgba(255, 184, 130, 0.26), transparent 0 23%),
    radial-gradient(circle at 22% 18%, rgba(177, 210, 255, 0.22), transparent 0 25%),
    linear-gradient(180deg, #08132b 0%, #192d5a 42%, #455f93 72%, #e3c5d9 100%);
}

.star-field {
  position: absolute;
  inset: 0;
  opacity: 0.86;
  transform: translateY(calc(var(--sky-shift) * -1));
  background-image:
    radial-gradient(circle, rgba(255, 255, 255, 0.95) 0 1px, transparent 1.8px),
    radial-gradient(circle, rgba(255, 227, 249, 0.9) 0 1px, transparent 1.6px),
    radial-gradient(circle, rgba(183, 226, 255, 0.8) 0 1px, transparent 1.5px);
  background-position:
    20px 36px,
    100px 90px,
    44px 140px;
  background-size:
    130px 120px,
    190px 170px,
    260px 210px;
}

.anime-glow {
  position: absolute;
  inset: 0;
  opacity: 0.72;
  transform: translateY(calc(var(--sky-shift) * -0.7));
  background:
    radial-gradient(ellipse at 68% 35%, rgba(255, 197, 128, 0.42), transparent 0 28%),
    radial-gradient(ellipse at 35% 18%, rgba(173, 205, 255, 0.24), transparent 0 26%),
    linear-gradient(115deg, transparent 0 40%, rgba(255, 255, 255, 0.12) 40.2% 40.7%, transparent 41% 100%);
  mix-blend-mode: screen;
}

.petals {
  position: absolute;
  inset: 0;
  opacity: 0.5;
  transform: translateY(calc(var(--cloud-shift) * -0.35));
  background-image:
    radial-gradient(ellipse at center, rgba(255, 186, 222, 0.86) 0 34%, transparent 36%),
    radial-gradient(ellipse at center, rgba(255, 226, 244, 0.82) 0 32%, transparent 34%),
    radial-gradient(ellipse at center, rgba(186, 218, 255, 0.72) 0 30%, transparent 33%);
  background-position:
    9vw 24vh,
    74vw 20vh,
    82vw 62vh;
  background-size:
    18px 10px,
    14px 8px,
    16px 9px;
  background-repeat: no-repeat;
  filter: blur(0.2px);
}

.moon {
  position: absolute;
  right: clamp(48px, 12vw, 170px);
  top: calc(42px + var(--moon-shift));
  width: clamp(118px, 16vw, 210px);
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle at 36% 30%, rgba(255, 255, 255, 0.86) 0 8%, transparent 9%),
    radial-gradient(circle at 64% 62%, rgba(126, 159, 190, 0.2) 0 10%, transparent 11%),
    linear-gradient(145deg, #fff9ed, #d8e8ff 70%, #b5c5ee);
  box-shadow:
    0 0 44px rgba(255, 244, 220, 0.74),
    0 0 120px rgba(255, 182, 124, 0.34);
}

.mountains {
  position: absolute;
  left: -7vw;
  right: -7vw;
  bottom: 0;
  height: 44vh;
  transform: translateY(var(--mountain-shift));
}

.mountain-back {
  bottom: 13vh;
  opacity: 0.84;
  background:
    linear-gradient(135deg, transparent 0 49%, rgba(255, 192, 121, 0.72) 49.2% 55%, transparent 55.3%),
    linear-gradient(180deg, #f7fbff 0%, #a8c8ec 42%, #31537b 100%);
  clip-path: polygon(0 84%, 12% 48%, 22% 68%, 34% 28%, 47% 72%, 60% 36%, 70% 62%, 82% 24%, 94% 66%, 100% 50%, 100% 100%, 0 100%);
  filter:
    drop-shadow(0 -12px 34px rgba(255, 180, 91, 0.2))
    saturate(1.12);
}

.mountain-front {
  bottom: -3vh;
  opacity: 0.95;
  background:
    linear-gradient(123deg, transparent 0 41%, rgba(255, 194, 118, 0.88) 41.3% 48%, transparent 48.3%),
    linear-gradient(154deg, transparent 0 55%, rgba(255, 225, 164, 0.82) 55.2% 60%, transparent 60.4%),
    linear-gradient(180deg, #fff8ef 0%, #d7edff 22%, #7aa4d4 58%, #17375d 100%);
  clip-path: polygon(0 74%, 10% 46%, 19% 64%, 30% 30%, 42% 70%, 54% 38%, 67% 68%, 79% 32%, 91% 62%, 100% 42%, 100% 100%, 0 100%);
  filter:
    drop-shadow(0 -16px 40px rgba(255, 172, 71, 0.24))
    saturate(1.16);
}

.cloud {
  position: absolute;
  width: clamp(280px, 34vw, 520px);
  height: 120px;
  border-radius: 999px;
  background: rgba(236, 246, 255, 0.28);
  filter: blur(20px);
  transform: translateY(var(--cloud-shift));
}

.cloud-one {
  left: 5vw;
  top: 27vh;
}

.cloud-two {
  right: 4vw;
  top: 56vh;
  opacity: 0.64;
}

.mist {
  position: absolute;
  inset: auto 0 0;
  height: 42vh;
  background: linear-gradient(180deg, transparent, rgba(79, 111, 150, 0.42) 58%, rgba(15, 39, 70, 0.76));
}

.title-section,
.slogan-section,
.modules-section {
  min-height: 100svh;
  position: relative;
  z-index: 1;
}

.title-section {
  display: grid;
  place-items: center;
  padding: 40px;
}

.brand-chip {
  position: absolute;
  top: 32px;
  right: 38px;
  margin: 0;
  padding: 10px 18px;
  border: 1px solid rgba(255, 255, 255, 0.64);
  border-radius: 999px;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(16px);
  box-shadow: 0 18px 48px rgba(61, 102, 140, 0.22);
  font-size: 16px;
  font-weight: 850;
}

.title-section h1 {
  margin: 0;
  color: rgba(255, 255, 255, 0.94);
  font-size: clamp(76px, 14vw, 210px);
  line-height: 0.82;
  font-weight: 950;
  letter-spacing: 0;
  text-align: center;
  text-shadow:
    0 10px 42px rgba(36, 79, 120, 0.44),
    0 0 80px rgba(255, 255, 255, 0.5),
    5px 5px 0 rgba(255, 188, 224, 0.24);
}

.scroll-note {
  position: absolute;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  margin: 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.slogan-section {
  display: grid;
  align-content: center;
  justify-items: start;
  padding: 80px min(8vw, 110px);
}

.section-kicker {
  margin: 0 0 18px;
  color: rgba(255, 205, 135, 0.78);
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 0.18em;
}

.slogan-section h2 {
  max-width: 1050px;
  margin: 0;
  color: rgba(255, 255, 255, 0.96);
  font-size: clamp(54px, 10vw, 144px);
  line-height: 0.96;
  font-weight: 950;
  letter-spacing: 0;
  text-shadow:
    0 10px 48px rgba(77, 111, 160, 0.36),
    0 0 60px rgba(255, 255, 255, 0.38);
}

.slogan-section p:last-child {
  max-width: 640px;
  margin: 28px 0 0;
  color: rgba(231, 242, 255, 0.86);
  font-size: 22px;
  line-height: 1.7;
  font-weight: 700;
}

.modules-section {
  display: grid;
  place-items: center;
  padding: 64px 22px;
}

.dream-desktop {
  width: min(1060px, 100%);
  min-height: 780px;
  position: relative;
}

.glass-card {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.58);
  border-radius: 30px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 221, 241, 0.18)),
    rgba(42, 67, 112, 0.26);
  box-shadow:
    0 28px 80px rgba(2, 11, 23, 0.24),
    inset 0 0 0 1px rgba(255, 255, 255, 0.32);
  backdrop-filter: blur(24px) saturate(1.18);
}

.pixel-dog-card {
  left: 398px;
  top: 0;
  width: 268px;
  height: 118px;
  display: grid;
  place-items: center;
  padding-top: 8px;
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
  background: #fff8fd;
  border: 3px solid #5e79ad;
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.72),
    0 12px 26px rgba(100, 128, 170, 0.22);
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
  background: #f0f8ff;
}

.dog-ear {
  top: 2px;
  width: 22px;
  height: 24px;
  background: #ffc3e6;
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
  background: #4f6696;
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
  color: #fff4fb;
  text-shadow: 0 0 14px rgba(255, 187, 226, 0.52);
  font-size: 12px;
  font-weight: 900;
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
  color: #4d6287;
  background: linear-gradient(135deg, #ffffff, #d8edff 42%, #ffd1eb);
  box-shadow: 0 18px 38px rgba(104, 135, 174, 0.22);
}

.avatar {
  width: 42px;
  aspect-ratio: 1;
  border-radius: 15px;
  font-size: 13px;
}

.profile strong,
.profile span {
  display: block;
}

.profile strong {
  color: #f7fbff;
  font-size: 18px;
  line-height: 1.1;
}

.profile span {
  margin-top: 4px;
  color: #f0dcff;
  font-size: 12px;
}

.panel-label {
  margin: 24px 0 10px;
  color: #ffe6f6;
  font-size: 11px;
  font-weight: 900;
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
  color: #edf6ff;
  background: transparent;
  cursor: default;
}

.menu-list button span {
  color: #ffc3e6;
  font-size: 12px;
  font-weight: 900;
}

.menu-list .active,
.menu-list button:hover {
  color: #23415f;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.82), rgba(255, 210, 235, 0.66));
  box-shadow: 0 14px 28px rgba(111, 143, 176, 0.18);
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
  color: #ffe6f6;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.16em;
}

.hero-card h3 {
  margin: 0;
  color: #f3f8ff;
  text-shadow: 0 0 24px rgba(255, 203, 233, 0.36);
  font-size: 44px;
  line-height: 1.04;
  font-weight: 930;
  letter-spacing: 0;
}

.hero-text {
  margin: 18px 0 0;
  color: #edf7ff;
  font-size: 16px;
  font-weight: 750;
  line-height: 1.7;
}

.clock-card {
  right: 56px;
  top: 170px;
  width: 250px;
  padding: 18px;
}

.clock-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.clock-top span {
  color: #ffe6f6;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.12em;
}

.clock-top i {
  width: 10px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #ffc3e6;
  box-shadow: 0 0 18px rgba(255, 195, 230, 0.76);
}

.clock-display {
  min-height: 86px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  color: #f8fcff;
  background: rgba(18, 42, 76, 0.36);
  border: 1px solid rgba(255, 255, 255, 0.62);
  font-family: "Courier New", ui-monospace, monospace;
  font-size: 54px;
  line-height: 1;
  letter-spacing: 0;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.72);
}

.clock-display em {
  color: #ffc3e6;
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
  font-size: 30px;
}

.welcome-card p {
  margin: 0;
  color: #ffe6f6;
  font-size: 18px;
  font-weight: 850;
}

.welcome-card strong {
  max-width: 220px;
  color: #f3f8ff;
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
  color: #e3f0ff;
  margin-bottom: 18px;
}

.calendar-head span,
.calendar-head strong {
  font-size: 13px;
}

.calendar-head strong {
  color: #ffc3e6;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px 8px;
  text-align: center;
}

.calendar-grid span {
  color: #d5e5f6;
  font-size: 12px;
  font-weight: 900;
}

.calendar-grid small {
  min-height: 24px;
  display: grid;
  place-items: center;
  color: #dbe8f6;
  border-radius: 9px;
  font-size: 12px;
}

.calendar-grid .today {
  color: #244361;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.84), rgba(255, 210, 235, 0.74));
  box-shadow: 0 12px 24px rgba(113, 145, 181, 0.18);
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
  color: #d5e5f6;
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
}

.post-card strong,
.status-card strong,
.music-card strong {
  display: block;
  margin-top: 8px;
  color: #f3f8ff;
  font-size: 17px;
  line-height: 1.35;
}

.post-card p {
  margin: 12px 0 0;
  color: #dce9f7;
  font-size: 13px;
}

.progress {
  height: 8px;
  margin-top: 16px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.4);
}

.progress i {
  display: block;
  width: 72%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #ffffff, #cfeaff, #ffc3e6);
}

.music-card button {
  width: 46px;
  aspect-ratio: 1;
  border: 0;
  border-radius: 50%;
  color: #5d7596;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.84), rgba(255, 210, 235, 0.74));
  box-shadow: 0 16px 30px rgba(113, 145, 181, 0.2);
  cursor: default;
}

@media (max-width: 980px) {
  .modules-section {
    display: block;
    padding: 22px;
  }

  .dream-desktop {
    min-height: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  .glass-card {
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
  .title-section,
  .slogan-section {
    padding: 24px;
  }

  .brand-chip {
    top: 18px;
    right: 18px;
    font-size: 14px;
  }

  .title-section h1 {
    font-size: clamp(64px, 22vw, 104px);
  }

  .slogan-section h2 {
    font-size: clamp(46px, 16vw, 78px);
  }

  .slogan-section p:last-child {
    font-size: 18px;
  }

  .modules-section {
    padding: 14px;
  }

  .dream-desktop {
    grid-template-columns: 1fr;
  }

  .glass-card {
    border-radius: 24px;
  }

  .dock-panel {
    order: 2;
  }

  .hero-card {
    padding: 24px;
  }

  .hero-card h3 {
    font-size: 36px;
  }

  .clock-display {
    min-height: 76px;
    font-size: 46px;
  }
}
</style>
