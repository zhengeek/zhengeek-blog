<script setup lang="ts">
import { ref } from 'vue'
import heroImage from '../assets/hero.png'

const realms = [
  {
    index: 'WORLD_01',
    title: 'CATTOCAKE NEXUS',
    rank: 'S-RANK',
    status: 'ONLINE',
    description: '工作室主站与世界观入口。以沉浸式视觉、清晰叙事和响应式界面建立品牌第一印象。',
    tags: ['VUE 3', 'GAME UI', 'RESPONSIVE'],
    to: '/projects',
    tone: 'gold'
  },
  {
    index: 'WORLD_02',
    title: 'ARCHIVE SYSTEM',
    rank: 'A-RANK',
    status: 'ACTIVE',
    description: 'Spring Boot、MySQL 与 Admin 管理台构成的内容系统，支持文章保存、发布与维护。',
    tags: ['SPRING BOOT', 'MYSQL', 'REST API'],
    to: '/blog',
    tone: 'cyan'
  },
  {
    index: 'WORLD_03',
    title: 'PROTOTYPE LAB',
    rank: 'EX-RANK',
    status: 'IN DEV',
    description: '用于实验 Three.js、WebGL、游戏化界面、交互动效和未来独立游戏原型的试验区域。',
    tags: ['THREE.JS', 'WEBGL', 'CREATIVE CODE'],
    to: '/lab',
    tone: 'violet'
  }
]

const skills = [
  { label: 'WORLD BUILDING', value: 'Vue / TypeScript', level: 92 },
  { label: 'SYSTEM ENGINE', value: 'Spring Boot / MySQL', level: 86 },
  { label: 'VISUAL MAGIC', value: 'Three.js / Motion', level: 89 }
]

const patchNotes = [
  { version: 'v1.0.0', title: '工作室主系统上线准备', type: 'MAJOR UPDATE' },
  { version: 'v0.9.4', title: 'Admin 文章管理与鉴权闭环', type: 'SYSTEM' },
  { version: 'v0.9.1', title: '响应式布局保底与移动端修复', type: 'HOTFIX' },
  { version: 'v0.8.0', title: '从个人博客升级为工作室入口', type: 'REBUILD' }
]

const playerName = ref('')
const playerEmail = ref('')
const missionBrief = ref('')

function sendInvite() {
  const subject = encodeURIComponent(`Co-op Invite from ${playerName.value || 'New Player'}`)
  const body = encodeURIComponent(`Player: ${playerName.value}\nComms: ${playerEmail.value}\n\nMission Brief:\n${missionBrief.value}`)
  window.location.href = `mailto:hello@cattocake.studio?subject=${subject}&body=${body}`
}
</script>

<template>
  <div class="home-page">
    <section id="top" class="core-observation" aria-label="Nexus core observation area">
      <div class="core-status-cluster">
        <div class="core-status">
          <span>ENERGY OUTPUT</span>
          <strong>98.7%</strong>
        </div>
        <div class="core-status">
          <span>CATTO CORE</span>
          <strong>STABLE</strong>
        </div>
      </div>
      <div class="scroll-cue">
        <span class="scroll-arrow">↓</span>
        <span>SCROLL TO EXPLORE</span>
      </div>
    </section>

    <section id="about" class="game-section section-shell">
      <header class="section-title">
        <span class="title-line"></span>
        <div>
          <p>PLAYER PROFILE // STUDIO DATA</p>
          <h2>Guild <b>Lore</b></h2>
        </div>
      </header>

      <div class="lore-grid">
        <article class="operator-card hud-panel">
          <div class="avatar-frame">
            <span class="avatar-ring"></span>
            <img :src="heroImage" alt="CattoCake Studio guild emblem" />
          </div>
          <h3>CATTOCAKE STUDIO</h3>
          <p class="class-label">CLASS: INDEPENDENT GAME MAKERS</p>

          <div class="player-stats">
            <div v-for="skill in skills" :key="skill.label" class="stat-row">
              <div><span>{{ skill.label }}</span><b>{{ skill.value }}</b></div>
              <div class="stat-track"><i :style="{ width: `${skill.level}%` }"></i></div>
            </div>
          </div>
        </article>

        <article class="lore-copy hud-panel">
          <span class="panel-code">LORE_FILE // 001</span>
          <blockquote>“我们不只制作网页。我们把界面、系统与游戏想象力组合成可以进入的数字世界。”</blockquote>
          <p>
            CattoCake Studio 是一个正在成长中的独立游戏工作室。这里既是作品展示入口，也是游戏原型、视觉实验和开发日志的长期基地。
          </p>
          <p>
            我们关注游戏化界面、WebGL 交互、完整的前后端内容系统，以及真正能够形成气氛和记忆点的数字体验。每一次点击像一次指令确认，每一次滚动像新地图逐步展开。
          </p>
          <div class="buff-row">
            <span>[ BUFF: CREATIVE IMPACT ]</span>
            <span>[ BUFF: FULL-STACK SYSTEM ]</span>
            <span>[ BUFF: GAME ATMOSPHERE ]</span>
          </div>
          <RouterLink class="data-link" to="/about">OPEN FULL PROFILE <b>→</b></RouterLink>
        </article>
      </div>
    </section>

    <section id="projects" class="game-section section-shell realms-section">
      <header class="section-title align-right">
        <div>
          <p>CHOOSE YOUR NEXT ADVENTURE // PORTFOLIO</p>
          <h2><b>Select</b> Realm</h2>
        </div>
        <span class="title-line gold"></span>
      </header>

      <div class="realm-grid">
        <RouterLink v-for="realm in realms" :key="realm.title" class="realm-card hud-panel" :class="realm.tone" :to="realm.to">
          <div class="realm-preview">
            <span class="map-grid"></span>
            <span class="realm-orb"></span>
            <span class="realm-index">{{ realm.index }}</span>
            <span class="realm-status">{{ realm.status }}</span>
          </div>
          <div class="realm-copy">
            <div class="rank-row"><span>{{ realm.rank }}</span><span>QUEST DATA</span></div>
            <h3>{{ realm.title }}</h3>
            <p>{{ realm.description }}</p>
            <div class="tag-row"><span v-for="tag in realm.tags" :key="tag">{{ tag }}</span></div>
            <strong class="enter-realm">ENTER REALM <b>⚡</b></strong>
          </div>
        </RouterLink>
      </div>
    </section>

    <section id="quest" class="game-section section-shell quest-section">
      <div class="quest-window hud-panel">
        <div class="quest-visual">
          <span class="quest-reticle"></span>
          <p>MAIN QUEST</p>
          <strong>SHIP THE<br />FIRST WORLD</strong>
        </div>
        <div class="quest-copy">
          <span class="quest-type">ACTIVE MISSION // V1.0</span>
          <h2>让 CattoCake Studio 成为可以正常上线、持续更新的游戏工作室基地。</h2>
          <p>完成前后端联动、后台鉴权、文章管理、生产配置与基础响应式，再把游戏项目和开发记录不断填入这张世界地图。</p>
          <div class="quest-objectives">
            <span class="done">✓ Admin authentication</span>
            <span class="done">✓ Article workflow</span>
            <span class="done">✓ Responsive safeguard</span>
            <span class="active">◆ Production launch check</span>
          </div>
          <RouterLink class="game-button" to="/projects">VIEW MISSION DATA</RouterLink>
        </div>
      </div>
    </section>

    <section id="lab" class="game-section section-shell tech-section">
      <header class="section-title">
        <span class="title-line"></span>
        <div>
          <p>ABILITIES // DEVELOPMENT STACK</p>
          <h2>Tech <b>Tree</b></h2>
        </div>
      </header>

      <div class="tech-tree">
        <RouterLink class="hex-node" to="/lab"><span>UI</span><small>GAME HUD</small></RouterLink>
        <RouterLink class="hex-node unlocked" to="/projects"><span>3D</span><small>THREE.JS</small></RouterLink>
        <RouterLink class="hex-node gold-node" to="/blog"><span>API</span><small>SPRING</small></RouterLink>
        <RouterLink class="hex-node unlocked" to="/projects"><span>DB</span><small>MYSQL</small></RouterLink>
        <RouterLink class="hex-node" to="/lab"><span>FX</span><small>MOTION</small></RouterLink>
      </div>
    </section>

    <section id="blog" class="game-section section-shell logs-section">
      <header class="section-title align-right">
        <div>
          <p>DEVELOPMENT LOG // SYSTEM HISTORY</p>
          <h2>Patch <b>Notes</b></h2>
        </div>
        <span class="title-line gold"></span>
      </header>

      <div class="log-console hud-panel">
        <article v-for="note in patchNotes" :key="note.version" class="log-row">
          <span class="log-version">{{ note.version }}</span>
          <strong>{{ note.title }}</strong>
          <span class="log-type">{{ note.type }}</span>
        </article>
        <RouterLink class="data-link log-link" to="/blog">OPEN ALL DEVELOPMENT LOGS <b>→</b></RouterLink>
      </div>
    </section>

    <section id="contact" class="game-section section-shell coop-section">
      <div class="coop-panel hud-panel">
        <div class="coop-icon">⌁</div>
        <p class="coop-label">MULTIPLAYER CHANNEL // AVAILABLE</p>
        <h2>Initiate <b>Co-op</b> Mode</h2>
        <p class="coop-intro">有新的游戏构想、网站体验或合作任务？发送组队邀请，开启下一段任务线。</p>

        <form class="invite-form" @submit.prevent="sendInvite">
          <label>
            <span>PLAYER NAME // 代号</span>
            <input v-model="playerName" type="text" placeholder="Enter name..." required />
          </label>
          <label>
            <span>COMMS CHANNEL // 邮箱</span>
            <input v-model="playerEmail" type="email" placeholder="Enter email..." required />
          </label>
          <label class="brief-field">
            <span>MISSION BRIEFING // 任务简报</span>
            <textarea v-model="missionBrief" rows="4" placeholder="描述你的创意与任务目标..." required></textarea>
          </label>
          <button class="invite-button hoverable" type="submit">SEND INVITE</button>
        </form>
      </div>
    </section>

    <footer class="system-footer">
      <span>SYSTEM RUNNING</span>
      <span>© 2026 CATTOCAKE STUDIO</span>
      <span>ALL CORES ONLINE</span>
    </footer>
  </div>
</template>

<style scoped>
.home-page { position: relative; overflow: clip; }
.section-shell { width: min(1180px, calc(100% - 2rem)); margin: 0 auto; scroll-margin-top: 110px; }
.core-observation { position: relative; min-height: 100vh; min-height: 100svh; pointer-events: none; }

.core-status-cluster {
  position: absolute;
  top: clamp(7rem, 12vh, 8.5rem);
  left: clamp(1.25rem, 4vw, 4rem);
  display: flex;
  gap: clamp(1.5rem, 3vw, 3rem);
}

.core-status {
  display: grid;
  gap: 0.2rem;
  color: rgba(0, 240, 255, 0.46);
  font-family: var(--font-mono);
  font-size: 0.64rem;
  letter-spacing: 0.18em;
}
.core-status strong { color: rgba(255, 255, 255, 0.7); font-size: 0.8rem; }

.scroll-cue {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  display: grid;
  place-items: center;
  gap: 0.45rem;
  color: rgba(0, 240, 255, 0.5);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.28em;
  transform: translateX(-50%);
}
.scroll-arrow { font-size: 1.8rem; animation: scroll-bounce 1.6s ease-in-out infinite; }

.game-section { position: relative; z-index: 8; padding: clamp(5rem, 10vw, 8rem) 0; }
.section-title { display: flex; align-items: center; gap: 1.1rem; margin-bottom: 2.5rem; }
.section-title.align-right { justify-content: flex-end; text-align: right; }
.title-line { width: 52px; height: 3px; background: var(--vg-accent); box-shadow: 0 0 10px rgba(0, 240, 255, 0.7); }
.title-line.gold { background: var(--vg-gold); box-shadow: 0 0 10px rgba(255, 215, 0, 0.62); }
.section-title p { margin: 0 0 0.3rem; color: #64748b; font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.18em; }
.section-title h2 { margin: 0; color: #fff; font-family: var(--font-mono); font-size: clamp(2.5rem, 6vw, 4.8rem); letter-spacing: 0.08em; line-height: 0.9; text-transform: uppercase; }
.section-title h2 b { color: var(--vg-accent); font-weight: 700; }
.align-right h2 b { color: var(--vg-gold); }

.lore-grid { display: grid; grid-template-columns: minmax(280px, 0.38fr) minmax(0, 0.62fr); gap: 1.5rem; }
.operator-card { padding: clamp(1.5rem, 3vw, 2rem); text-align: center; }
.avatar-frame { position: relative; width: 180px; height: 180px; margin: 0 auto 1.5rem; padding: 10px; border: 2px solid rgba(0, 240, 255, 0.25); border-radius: 50%; }
.avatar-frame img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; filter: saturate(0.8) contrast(1.08); }
.avatar-ring { position: absolute; inset: -4px; border: 3px solid transparent; border-top-color: var(--vg-accent); border-right-color: rgba(0, 240, 255, 0.35); border-radius: 50%; animation: reactor 8s linear infinite; }
.operator-card h3 { margin: 0; color: var(--vg-gold); font-family: var(--font-display); font-size: 1.35rem; letter-spacing: 0.08em; }
.class-label { margin: 0.45rem 0 1.5rem; color: var(--vg-accent); font-family: var(--font-mono); font-size: 0.78rem; letter-spacing: 0.1em; }
.player-stats { display: grid; gap: 1rem; padding: 1rem; border: 1px solid rgba(0, 240, 255, 0.18); background: rgba(7, 5, 20, 0.7); text-align: left; }
.stat-row > div:first-child { display: flex; justify-content: space-between; gap: 0.8rem; font-family: var(--font-mono); font-size: 0.68rem; }
.stat-row b { color: var(--vg-accent); font-weight: 600; }
.stat-track { height: 3px; margin-top: 0.45rem; background: #1e293b; }
.stat-track i { display: block; height: 100%; background: var(--vg-accent); box-shadow: 0 0 8px var(--vg-accent); }

.lore-copy { padding: clamp(1.6rem, 4vw, 3rem); }
.panel-code { color: rgba(0, 240, 255, 0.55); font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.18em; }
.lore-copy blockquote { margin: 1.5rem 0 2rem; color: #fff; font-size: clamp(1.35rem, 2.7vw, 2rem); font-weight: 500; line-height: 1.55; }
.lore-copy p { color: #b8c2d3; line-height: 1.9; }
.buff-row { display: flex; flex-wrap: wrap; gap: 0.65rem; margin: 2rem 0; }
.buff-row span { padding: 0.55rem 0.75rem; border: 1px solid rgba(0, 240, 255, 0.55); background: rgba(0, 240, 255, 0.06); color: var(--vg-accent); font-family: var(--font-mono); font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em; }
.buff-row span:nth-child(2) { border-color: rgba(255, 215, 0, 0.55); color: var(--vg-gold); }
.data-link { color: var(--vg-accent); font-family: var(--font-mono); font-weight: 700; letter-spacing: 0.14em; text-decoration: none; }
.data-link b { color: var(--vg-gold); }

.realm-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; }
.realm-card { display: block; overflow: hidden; color: inherit; text-decoration: none; transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease; }
.realm-card:hover { border-color: var(--vg-accent); box-shadow: 0 0 28px rgba(0, 240, 255, 0.24); transform: translateY(-8px); }
.realm-card.gold:hover { border-color: var(--vg-gold); box-shadow: 0 0 28px rgba(255, 215, 0, 0.18); }
.realm-preview { position: relative; height: 240px; overflow: hidden; border-bottom: 1px solid rgba(255, 255, 255, 0.08); background: radial-gradient(circle at 50% 55%, rgba(0, 240, 255, 0.2), rgba(7, 5, 20, 0.95) 55%); }
.gold .realm-preview { background: radial-gradient(circle at 50% 55%, rgba(255, 215, 0, 0.19), rgba(7, 5, 20, 0.95) 55%); }
.violet .realm-preview { background: radial-gradient(circle at 50% 55%, rgba(91, 61, 245, 0.3), rgba(7, 5, 20, 0.95) 55%); }
.map-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(0,240,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,.08) 1px, transparent 1px); background-size: 34px 34px; transform: perspective(300px) rotateX(58deg) scale(1.6) translateY(18%); }
.realm-orb { position: absolute; top: 50%; left: 50%; width: 90px; height: 90px; border: 1px solid var(--vg-accent); background: radial-gradient(circle at 35% 30%, #fff, var(--vg-accent) 8%, #164e63 40%, transparent 72%); border-radius: 50%; box-shadow: 0 0 30px rgba(0, 240, 255, 0.55), inset 0 0 24px rgba(255, 255, 255, 0.25); transform: translate(-50%, -50%); transition: transform 0.6s ease; }
.gold .realm-orb { border-color: var(--vg-gold); background: radial-gradient(circle at 35% 30%, #fff, var(--vg-gold) 8%, #78350f 40%, transparent 72%); box-shadow: 0 0 30px rgba(255, 215, 0, 0.46); }
.violet .realm-orb { background: radial-gradient(circle at 35% 30%, #fff, #9f7aea 8%, #312e81 42%, transparent 72%); box-shadow: 0 0 32px rgba(91, 61, 245, 0.66); }
.realm-card:hover .realm-orb { transform: translate(-50%, -50%) scale(1.18) rotate(22deg); }
.realm-index, .realm-status { position: absolute; top: 0.8rem; font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.12em; }
.realm-index { left: 0.8rem; color: rgba(255,255,255,.5); }
.realm-status { right: 0.8rem; padding: 0.25rem 0.45rem; border: 1px solid currentColor; color: var(--vg-accent); background: rgba(7,5,20,.7); }
.realm-copy { padding: 1.3rem; }
.rank-row { display: flex; justify-content: space-between; color: var(--vg-gold); font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.12em; }
.realm-copy h3 { margin: 1rem 0 0.75rem; color: #fff; font-family: var(--font-display); font-size: 1.35rem; letter-spacing: 0.05em; }
.realm-copy p { min-height: 88px; color: #94a3b8; font-size: 0.9rem; line-height: 1.7; }
.tag-row { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.tag-row span { padding: 0.28rem 0.42rem; border: 1px solid rgba(0,240,255,.25); color: #b7f7ff; font-family: var(--font-mono); font-size: 0.62rem; }
.enter-realm { display: flex; justify-content: space-between; margin-top: 1.4rem; color: var(--vg-accent); font-family: var(--font-mono); font-size: 0.78rem; letter-spacing: 0.15em; opacity: 0.65; }
.realm-card:hover .enter-realm { opacity: 1; }

.quest-window { display: grid; grid-template-columns: minmax(280px, .42fr) minmax(0, .58fr); min-height: 520px; overflow: hidden; }
.quest-visual { position: relative; display: flex; flex-direction: column; justify-content: flex-end; padding: 2rem; overflow: hidden; background: radial-gradient(circle at center, rgba(0,240,255,.22), transparent 42%), linear-gradient(145deg, rgba(91,61,245,.35), rgba(7,5,20,.9)); }
.quest-visual::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(0,240,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,.07) 1px, transparent 1px); background-size: 42px 42px; }
.quest-reticle { position: absolute; top: 50%; left: 50%; width: 180px; height: 180px; border: 1px solid rgba(0,240,255,.42); border-radius: 50%; transform: translate(-50%,-50%); box-shadow: 0 0 50px rgba(0,240,255,.14); }
.quest-reticle::before, .quest-reticle::after { content: ''; position: absolute; background: var(--vg-accent); }
.quest-reticle::before { top: 50%; left: -40px; width: calc(100% + 80px); height: 1px; }
.quest-reticle::after { top: -40px; left: 50%; width: 1px; height: calc(100% + 80px); }
.quest-visual p, .quest-visual strong { position: relative; z-index: 1; }
.quest-visual p { margin: 0 0 0.5rem; color: var(--vg-accent); font-family: var(--font-mono); letter-spacing: .2em; }
.quest-visual strong { color: #fff; font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3.6rem); line-height: 1; }
.quest-copy { padding: clamp(2rem,5vw,4rem); }
.quest-type { color: var(--vg-gold); font-family: var(--font-mono); font-size: .72rem; letter-spacing: .18em; }
.quest-copy h2 { margin: 1.2rem 0; color: #fff; font-size: clamp(1.8rem,3vw,3rem); line-height: 1.35; }
.quest-copy > p { color: #aab5c6; line-height: 1.9; }
.quest-objectives { display: grid; gap: .7rem; margin: 2rem 0; font-family: var(--font-mono); letter-spacing: .08em; }
.quest-objectives .done { color: #71f6c4; }
.quest-objectives .active { color: var(--vg-gold); animation: objective-pulse 1.8s ease-in-out infinite; }
.game-button { display: inline-flex; min-height: 48px; align-items: center; padding: 0 1.4rem; border: 1px solid var(--vg-accent); background: rgba(0,240,255,.08); color: var(--vg-accent); font-family: var(--font-mono); font-weight: 700; letter-spacing: .15em; text-decoration: none; }
.game-button:hover { background: var(--vg-accent); color: var(--vg-dark); box-shadow: 0 0 24px rgba(0,240,255,.35); }

.tech-tree { position: relative; display: grid; grid-template-columns: repeat(5, 150px); justify-content: center; gap: clamp(.3rem,2vw,2rem); padding: 4rem 0; }
.tech-tree::before { content: ''; position: absolute; top: 50%; left: 10%; width: 80%; height: 1px; background: linear-gradient(90deg, transparent, var(--vg-accent), var(--vg-gold), var(--vg-accent), transparent); opacity: .42; }
.hex-node { position: relative; z-index: 1; display: grid; width: 150px; aspect-ratio: 1; place-content: center; border: 1px solid rgba(0,240,255,.34); background: rgba(0,240,255,.06); color: #fff; clip-path: polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%); text-align: center; text-decoration: none; transition: transform .35s ease, background .35s ease, filter .35s ease; }
.hex-node span { font-family: var(--font-display); font-size: 2rem; }
.hex-node small { margin-top: .35rem; color: var(--vg-accent); font-family: var(--font-mono); letter-spacing: .1em; }
.hex-node:nth-child(even) { transform: translateY(45px); }
.hex-node:hover { background: rgba(0,240,255,.18); filter: drop-shadow(0 0 16px rgba(0,240,255,.55)); transform: scale(1.1); }
.hex-node:nth-child(even):hover { transform: translateY(45px) scale(1.1); }
.gold-node { border-color: rgba(255,215,0,.52); background: rgba(255,215,0,.08); }
.gold-node small { color: var(--vg-gold); }

.log-console { padding: 1rem clamp(1rem,3vw,2rem); }
.log-row { display: grid; grid-template-columns: 90px minmax(0,1fr) auto; gap: 1rem; align-items: center; min-height: 68px; border-bottom: 1px solid rgba(255,255,255,.08); }
.log-version, .log-type { font-family: var(--font-mono); font-size: .7rem; letter-spacing: .12em; }
.log-version { color: var(--vg-accent); }
.log-type { padding: .25rem .45rem; border: 1px solid rgba(255,215,0,.35); color: var(--vg-gold); }
.log-row strong { color: #dce4f0; font-size: .95rem; }
.log-link { display: inline-block; margin: 1.4rem 0 .5rem; }

.coop-panel { max-width: 920px; margin: 0 auto; padding: clamp(1.5rem,5vw,4rem); border-color: rgba(255,140,0,.42); text-align: center; }
.coop-icon { color: var(--vg-amber); font-size: 4rem; line-height: 1; text-shadow: 0 0 20px rgba(255,140,0,.6); }
.coop-label { margin: .8rem 0; color: rgba(255,140,0,.78); font-family: var(--font-mono); font-size: .72rem; letter-spacing: .18em; }
.coop-panel h2 { margin: 0; color: #fff; font-family: var(--font-mono); font-size: clamp(2.2rem,5vw,4.2rem); text-transform: uppercase; }
.coop-panel h2 b { color: var(--vg-amber); }
.coop-intro { color: #94a3b8; }
.invite-form { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 2.2rem; text-align: left; }
.invite-form label { display: grid; gap: .4rem; }
.invite-form label span { color: var(--vg-amber); font-family: var(--font-mono); font-size: .68rem; letter-spacing: .13em; }
.invite-form input, .invite-form textarea { width: 100%; border: 1px solid rgba(255,140,0,.3); border-radius: 0; outline: 0; background: rgba(7,5,20,.78); color: #fff; font: inherit; padding: .85rem; }
.invite-form input:focus, .invite-form textarea:focus { border-color: var(--vg-amber); box-shadow: 0 0 14px rgba(255,140,0,.12); }
.brief-field, .invite-button { grid-column: 1 / -1; }
.invite-button { min-height: 52px; border: 1px solid var(--vg-amber); background: rgba(255,140,0,.08); color: var(--vg-amber); font-family: var(--font-mono); font-weight: 700; letter-spacing: .22em; }
.invite-button:hover { background: var(--vg-amber); color: var(--vg-dark); box-shadow: 0 0 24px rgba(255,140,0,.32); }

.system-footer { position: relative; z-index: 8; display: flex; justify-content: space-between; gap: 1rem; padding: 1.5rem clamp(1rem,4vw,4rem); border-top: 1px solid rgba(255,255,255,.08); background: rgba(7,5,20,.88); color: #475569; font-family: var(--font-mono); font-size: .66rem; letter-spacing: .15em; }

@keyframes reactor { to { transform: rotate(360deg); } }
@keyframes scroll-bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(10px); } }
@keyframes objective-pulse { 50% { opacity: .48; } }

@media (max-width: 980px) {
  .lore-grid, .quest-window { grid-template-columns: 1fr; }
  .realm-grid { grid-template-columns: 1fr 1fr; }
  .tech-tree { grid-template-columns: repeat(3, 130px); }
  .hex-node { width: 130px; }
  .core-status-cluster { display: none; }
}

@media (max-width: 680px) {
  .section-shell { width: min(100% - 1rem, 1180px); }
  .core-observation { min-height: 100vh; min-height: 100svh; }
  .scroll-cue { width: 100%; font-size: .58rem; }
  .section-title { align-items: flex-start; }
  .section-title.align-right { align-items: flex-end; }
  .title-line { width: 28px; margin-top: 1rem; }
  .realm-grid { grid-template-columns: 1fr; }
  .realm-preview { height: 210px; }
  .realm-copy p { min-height: auto; }
  .tech-tree { grid-template-columns: repeat(2, 116px); gap: 1rem; }
  .hex-node { width: 116px; }
  .hex-node:nth-child(even) { transform: none; }
  .hex-node:nth-child(even):hover { transform: scale(1.08); }
  .invite-form { grid-template-columns: 1fr; }
  .brief-field, .invite-button { grid-column: auto; }
  .log-row { grid-template-columns: 64px minmax(0,1fr); padding: .8rem 0; }
  .log-type { grid-column: 2; justify-self: start; }
  .system-footer { flex-direction: column; text-align: center; }
}
</style>
