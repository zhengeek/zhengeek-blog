<template>
  <nav class="home-nav">
    <a href="#" class="brand hoverable" aria-label="Back to top">
      root@ZhenGeek:~$<span class="blink-cursor cursor-block"></span>
    </a>

    <div class="nav-links">
      <a href="#work" class="nav-link hoverable">&gt;_ 颠覆性实践</a>
      <a href="#about" class="nav-link hoverable">&gt;_ 极客哲学</a>
      <a href="#services" class="nav-link hoverable">&gt;_ 技能矩阵</a>
      <a href="#contact" class="nav-link hoverable">&gt;_ 建立通信</a>
    </div>

    <button class="mobile-menu hoverable" type="button" aria-label="Menu">
      <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </nav>
</template>

<style scoped>
.home-nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--vg-light);
  font-family: var(--font-mono);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  mix-blend-mode: difference;
}

.brand {
  color: inherit;
  text-decoration: none;
  font-size: 20px;
  font-weight: 700;
  transition: color 0.25s ease;
}

.brand:hover {
  color: var(--vg-accent);
}

.cursor-block {
  width: 8px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  margin-left: 4px;
  background: var(--vg-accent);
}

.nav-links {
  display: flex;
  gap: 40px;
}

.nav-link {
  position: relative;
  color: inherit;
  text-decoration: none;
  display: inline-block;
  transition: color 0.25s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: -6px;
  left: 0;
  background-color: var(--vg-accent);
  transform-origin: bottom right;
  transition: transform 0.3s cubic-bezier(0.65, 0, 0.35, 1);
}

.nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.nav-link:hover {
  color: var(--vg-accent);
}

.mobile-menu {
  display: none;
  color: var(--vg-accent);
  background: transparent;
  border: 0;
  padding: 0;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .mobile-menu {
    display: block;
  }
}
</style>
