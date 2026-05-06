<template>
  <section class="modules-section" aria-label="ZhenGeek site navigation">
    <main class="dream-desktop">
      <aside class="dock-panel glass-card">
        <div class="profile">
          <div class="avatar">ZG</div>
          <div>
            <strong>ZhenGeek</strong>
            <span>个人网站开发中</span>
          </div>
        </div>

        <p class="panel-label">Explore ZhenGeek</p>

        <nav class="menu-list" aria-label="Homepage sections">
          <RouterLink class="menu-button active" to="/">
           <span>01</span> Home
          </RouterLink>

          <RouterLink class="menu-button" to="/blog">
           <span>02</span> Blog
          </RouterLink>

          <RouterLink class="menu-button" to="/projects">
           <span>03</span> Projects
          </RouterLink>

          <RouterLink class="menu-button" to="/about">
            <span>04</span> About
          </RouterLink>

          <RouterLink class="menu-button" to="/lab">
           <span>05</span> Lab
          </RouterLink>
</nav>
      </aside>
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
  width: min(520px, 100%);
  min-height: 520px;
  position: relative;
  display: grid;
  place-items: center;
}

.glass-card {
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

.dock-panel {
  width: min(420px, 100%);
  padding: 28px 24px;
}

.profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 46px;
  aspect-ratio: 1;
  border-radius: 16px;
  display: grid;
  place-items: center;
  font-size: 13px;
  font-weight: 900;
  color: #4d6287;
  background: linear-gradient(135deg, #ffffff, #d8edff 42%, #ffd1eb);
  box-shadow: 0 18px 38px rgba(104, 135, 174, 0.22);
}

.profile strong,
.profile span {
  display: block;
}

.profile strong {
  color: #f7fbff;
  font-size: 20px;
  line-height: 1.1;
}

.profile span {
  margin-top: 5px;
  color: #f0dcff;
  font-size: 13px;
}

.panel-label {
  margin: 28px 0 14px;
  color: #ffe6f6;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.menu-list {
  display: grid;
  gap: 12px;
}

.menu-button {
  min-height: 46px;
  border: 0;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  color: #edf6ff;
  background: transparent;
  cursor: pointer;
  text-align: left;
  text-decoration: none;
}

.menu-button span {
  color: #ffc3e6;
  font-size: 12px;
  font-weight: 900;
}

.menu-list .active,
.menu-button:hover {
  color: #23415f;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.82), rgba(255, 210, 235, 0.66));
  box-shadow: 0 14px 28px rgba(111, 143, 176, 0.18);
}

@media (max-width: 640px) {
  .modules-section {
    padding: 24px;
  }

  .dream-desktop {
    min-height: 420px;
  }

  .dock-panel {
    width: 100%;
    padding: 24px 20px;
  }
}
</style>