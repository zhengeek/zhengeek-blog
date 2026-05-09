<template>
  <header class="site-header">
    <div class="header-container">
      
      <!-- Left: Logo -->
      <div class="logo-container">
        <RouterLink to="/" class="logo">
          ZHENGEEK
        </RouterLink>
      </div>

      <!-- Right: Navigation -->
      <nav class="main-nav">
        <!-- Use exact-active-class for Home so it doesn't stay highlighted on other routes -->
        <RouterLink to="/" class="nav-link" exact-active-class="active-link">
          // HOME
        </RouterLink>
        <RouterLink to="/about" class="nav-link" active-class="active-link">
          // ABOUT
        </RouterLink>
        <RouterLink to="/projects" class="nav-link" active-class="active-link">
          // PROJECTS
        </RouterLink>
        <RouterLink to="/blog" class="nav-link" active-class="active-link">
          // BLOG
        </RouterLink>
        <RouterLink to="/lab" class="nav-link" active-class="active-link">
          // LAB
        </RouterLink>
      </nav>

    </div>
  </header>
</template>

<script setup lang="ts">
// Basic static header using vue-router for navigation
</script>

<style scoped>
/* Header Wrapper */
.site-header {
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: #f4f4f0; /* Paper white background */
  border-bottom: 4px solid #000;
  padding: 1.5rem 2rem;
  /* Adds a subtle grid texture to the header background */
  background-image: 
    linear-gradient(#e5e5df 1px, transparent 1px),
    linear-gradient(90deg, #e5e5df 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Layout Container */
.header-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* Allows wrapping on smaller screens */
  gap: 1.5rem;
}

/* Logo Styling - Neo-Brutalist Block */
.logo {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  text-decoration: none;
  color: #000;
  background-color: #00ffff; /* Memphis Cyan */
  padding: 0.5rem 1rem;
  border: 4px solid #000;
  box-shadow: 6px 6px 0px 0px #000;
  display: inline-block;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.logo:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0px 0px #000;
}

.logo:active {
  transform: translate(2px, 2px);
  box-shadow: 4px 4px 0px 0px #000;
}

/* Navigation Menu */
.main-nav {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Navigation Links - Brutalist Buttons */
.nav-link {
  font-family: 'Fira Code', monospace;
  font-size: 1.1rem;
  font-weight: 800;
  text-decoration: none;
  color: #000;
  background-color: #fff;
  padding: 0.6rem 1.2rem;
  border: 3px solid #000;
  box-shadow: 4px 4px 0px 0px #000;
  transition: all 0.2s ease;
  white-space: nowrap;
}

/* Hover State */
.nav-link:hover {
  background-color: #fffa00; /* Memphis Yellow */
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px 0px #000;
}

/* Active State (Current Page) */
.nav-link.active-link {
  background-color: #ff00ff; /* Memphis Magenta */
  color: #fff;
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px 0px #000;
}

/* Responsive adjustments for Mobile */
@media (max-width: 768px) {
  .site-header {
    padding: 1rem;
  }
  
  .header-container {
    flex-direction: column;
    justify-content: center;
  }

  .main-nav {
    justify-content: center;
  }
}
</style>
