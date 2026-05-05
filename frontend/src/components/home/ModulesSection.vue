<script setup lang="ts">
import { useClock } from '../../composables/useClock'

const { clockTime, dateLabel, weekdayLabel } = useClock()
</script>
 
<template>
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
</template>

<style scoped>
.modules-section {
  min-height: 100svh;
  position: relative;
  z-index: 1;
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