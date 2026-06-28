<template>
  <div class="lobby-hud" aria-hidden="true">
    <section class="studio-identity">
      <div class="level-row">
        <span class="level-badge">LV.18</span>
        <span class="online-dot"></span>
        <span>CORE OPERATOR ONLINE</span>
      </div>
      <h1>CATTOCAKE <b>STUDIO</b></h1>
      <p>INTERACTIVE NEXUS // GAME DEVELOPMENT UNIT</p>

      <div class="identity-line"><i></i></div>

      <div class="core-telemetry">
        <div>
          <span>ENERGY OUTPUT</span>
          <strong>100.4%</strong>
        </div>
        <div>
          <span>CORE STATUS</span>
          <strong>STABLE</strong>
        </div>
        <div>
          <span>NAV SYSTEM</span>
          <strong>READY</strong>
        </div>
      </div>
    </section>

    <div class="corner-mark top-left"></div>
    <div class="corner-mark top-right"></div>
    <div class="corner-mark bottom-left"></div>
    <div class="corner-mark bottom-right"></div>

    <div class="sector-readout">
      <span>SECTOR // 01</span>
      <strong>CATTOCAKE_NEXUS</strong>
      <small>COORD: 31.2304N / 121.4737E</small>
    </div>

    <div class="interaction-hint">
      <span class="hint-reticle"><i></i></span>
      <div>
        <strong>CORE LINK AVAILABLE</strong>
        <small>CLICK THE CORE TO DEPLOY NAVIGATION</small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lobby-hud {
  position: fixed;
  inset: 0;
  z-index: 12;
  overflow: hidden;
  pointer-events: none;
  color: #e7faff;
  font-family: var(--font-mono);
  animation: hud-deploy 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.studio-identity {
  position: absolute;
  top: clamp(2rem, 6vh, 4.5rem);
  left: clamp(1.5rem, 5vw, 5.5rem);
  width: min(520px, calc(100vw - 3rem));
}

.level-row {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: rgba(148, 223, 235, 0.48);
  font-size: 0.64rem;
  letter-spacing: 0.18em;
}

.level-badge {
  padding: 0.25rem 0.55rem;
  border: 1px solid rgba(255, 215, 0, 0.58);
  color: var(--vg-gold);
  box-shadow: inset 0 0 12px rgba(255, 215, 0, 0.05), 0 0 12px rgba(255, 215, 0, 0.12);
}

.online-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #71f6c4;
  box-shadow: 0 0 10px #71f6c4;
  animation: online-pulse 1.8s ease-in-out infinite;
}

h1 {
  margin: 0.85rem 0 0;
  color: #fff;
  font-family: var(--font-display);
  font-size: clamp(2rem, 4.2vw, 4.4rem);
  letter-spacing: 0.055em;
  line-height: 0.95;
  text-shadow: 0 0 28px rgba(0, 240, 255, 0.15);
}

h1 b { color: var(--vg-accent); font-weight: 900; }
.studio-identity > p { margin: 0.75rem 0 0; color: rgba(148, 163, 184, 0.58); font-size: 0.68rem; letter-spacing: 0.16em; }

.identity-line {
  position: relative;
  width: min(100%, 440px);
  height: 1px;
  margin: 1.25rem 0 1rem;
  background: linear-gradient(90deg, var(--vg-accent), rgba(0, 240, 255, 0.08), transparent);
  box-shadow: 0 0 8px rgba(0, 240, 255, 0.42);
}
.identity-line::before { content: ''; position: absolute; top: -3px; left: 0; width: 7px; height: 7px; background: var(--vg-gold); transform: rotate(45deg); box-shadow: 0 0 10px var(--vg-gold); }
.identity-line i { display: block; width: 36%; height: 1px; background: #fff; animation: data-scan 3.2s ease-in-out infinite; }

.core-telemetry { display: flex; flex-wrap: wrap; gap: clamp(1.25rem, 3vw, 2.8rem); }
.core-telemetry div { display: grid; gap: 0.22rem; }
.core-telemetry span { color: rgba(0, 240, 255, 0.48); font-size: 0.6rem; letter-spacing: 0.15em; }
.core-telemetry strong { color: rgba(255, 255, 255, 0.82); font-size: 0.88rem; letter-spacing: 0.08em; }

.corner-mark { position: absolute; width: 58px; height: 58px; border-color: rgba(0, 240, 255, 0.24); }
.top-left { top: 1.1rem; left: 1.1rem; border-top: 1px solid; border-left: 1px solid; }
.top-right { top: 1.1rem; right: 1.1rem; border-top: 1px solid; border-right: 1px solid; }
.bottom-left { bottom: 1.1rem; left: 1.1rem; border-bottom: 1px solid; border-left: 1px solid; }
.bottom-right { right: 1.1rem; bottom: 1.1rem; border-right: 1px solid; border-bottom: 1px solid; }

.sector-readout {
  position: absolute;
  bottom: clamp(1.8rem, 5vh, 4rem);
  left: clamp(1.5rem, 5vw, 5.5rem);
  display: grid;
  gap: 0.25rem;
  color: rgba(148, 163, 184, 0.42);
  font-size: 0.58rem;
  letter-spacing: 0.14em;
}
.sector-readout strong { color: rgba(0, 240, 255, 0.62); font-size: 0.72rem; }

.interaction-hint {
  position: absolute;
  right: clamp(1.5rem, 5vw, 5.5rem);
  bottom: clamp(1.8rem, 5vh, 4rem);
  display: flex;
  align-items: center;
  gap: 0.9rem;
  text-align: right;
}
.interaction-hint > div { display: grid; gap: 0.25rem; }
.interaction-hint strong { color: rgba(0, 240, 255, 0.7); font-size: 0.68rem; letter-spacing: 0.14em; }
.interaction-hint small { color: rgba(148, 163, 184, 0.4); font-size: 0.56rem; letter-spacing: 0.11em; }
.hint-reticle { position: relative; display: grid; width: 38px; height: 38px; place-items: center; border: 1px solid rgba(0, 240, 255, 0.4); border-radius: 50%; animation: reticle-spin 7s linear infinite; }
.hint-reticle::before,
.hint-reticle::after { content: ''; position: absolute; background: var(--vg-accent); box-shadow: 0 0 8px var(--vg-accent); }
.hint-reticle::before { width: 48px; height: 1px; }
.hint-reticle::after { width: 1px; height: 48px; }
.hint-reticle i { width: 5px; height: 5px; border-radius: 50%; background: var(--vg-gold); box-shadow: 0 0 9px var(--vg-gold); }

@keyframes hud-deploy { from { opacity: 0; filter: blur(6px); transform: scale(1.015); } to { opacity: 1; filter: blur(0); transform: scale(1); } }
@keyframes online-pulse { 50% { opacity: 0.35; transform: scale(0.72); } }
@keyframes data-scan { 0%, 100% { transform: translateX(0); opacity: 0; } 20%, 70% { opacity: 0.7; } 85% { transform: translateX(270%); opacity: 0; } }
@keyframes reticle-spin { to { transform: rotate(360deg); } }

@media (max-width: 720px) {
  .studio-identity { top: 2.5rem; }
  h1 { font-size: clamp(1.7rem, 9vw, 2.8rem); }
  .studio-identity > p { max-width: 280px; line-height: 1.6; }
  .core-telemetry div:nth-child(3) { display: none; }
  .interaction-hint { right: 1.25rem; bottom: 1.6rem; }
  .interaction-hint small { display: none; }
  .sector-readout { left: 1.25rem; bottom: 1.6rem; }
  .corner-mark { width: 34px; height: 34px; }
}

@media (prefers-reduced-motion: reduce) {
  .lobby-hud,
  .online-dot,
  .identity-line i,
  .hint-reticle { animation: none; }
}
</style>
