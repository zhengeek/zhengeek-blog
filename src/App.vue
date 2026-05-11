<template>
  <div class="site-shell">
    <header class="nav-bar">
      <RouterLink class="brand" to="/" aria-label="ZhenGeek home">
        <span class="brand-mark">⚡</span>
        <span>ZhenGeek</span>
      </RouterLink>

      <nav class="nav-links" aria-label="Main navigation">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/projects">Projects</RouterLink>
        <RouterLink to="/blog">Blog</RouterLink>
        <RouterLink to="/lab">Lab</RouterLink>
      </nav>
    </header>

    <RouterView />
  </div>
</template>
