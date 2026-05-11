<template>
  <div class="main-layout">
    <header class="site-header">
      <RouterLink class="brand-lockup" to="/" aria-label="Go to ZhenGeek homepage">
        <span class="brand-mark">Z</span>
        <span class="brand-text">
          <strong>ZhenGeek</strong>
          <small>Envision · Nurture · Forge · Pioneer</small>
        </span>
      </RouterLink>

      <nav class="site-nav" aria-label="Primary navigation">
        <RouterLink to="/#about">About</RouterLink>
        <RouterLink to="/#projects">Projects</RouterLink>
        <RouterLink to="/#blog">Blog</RouterLink>
        <RouterLink to="/#lab">Lab</RouterLink>
        <RouterLink class="nav-detail" to="/about">Detail</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.main-layout {
  min-height: 100vh;
  background:
    radial-gradient(circle at 20% 0%, rgba(204, 255, 0, 0.12), transparent 26rem),
    radial-gradient(circle at 85% 12%, rgba(176, 0, 255, 0.18), transparent 28rem),
    #09090b;
  color: #fafafa;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  min-height: 76px;
  padding: 0.85rem clamp(1rem, 4vw, 4rem);
  border-bottom: 1px solid rgba(250, 250, 250, 0.12);
  background: rgba(9, 9, 11, 0.78);
  backdrop-filter: blur(18px);
}

.brand-lockup {
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  color: inherit;
  text-decoration: none;
}

.brand-mark {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 2px solid #fafafa;
  border-radius: 14px;
  background: #ccff00;
  color: #09090b;
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 900;
  box-shadow: 4px 4px 0 #fafafa;
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand-text strong {
  font-family: var(--font-display);
  font-size: 1.05rem;
  letter-spacing: 0.03em;
}

.brand-text small {
  margin-top: 0.2rem;
  color: var(--vg-muted);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.site-nav a {
  padding: 0.55rem 0.85rem;
  border: 1px solid transparent;
  border-radius: 999px;
  color: #fafafa;
  font-size: 0.9rem;
  text-decoration: none;
  transition: 0.2s ease;
}

.site-nav a:hover,
.site-nav a.router-link-active {
  border-color: rgba(250, 250, 250, 0.2);
  background: rgba(250, 250, 250, 0.08);
  color: #ccff00;
}

.site-nav .nav-detail {
  border-color: #fafafa;
  background: #fafafa;
  color: #09090b;
  font-weight: 800;
}

main {
  min-height: calc(100vh - 76px);
}

@media (max-width: 760px) {
  .site-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .site-nav {
    width: 100%;
    justify-content: flex-start;
  }

  .brand-text small {
    display: none;
  }
}
</style>
