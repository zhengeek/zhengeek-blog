<template>
  <section class="modules-section">
    <!-- Section Header -->
    <header class="section-header">
      <h2 class="section-title">[ SYS.MODULES ]</h2>
      <p class="section-subtitle">// 导航枢纽 // NAVIGATION_HUB</p>
    </header>

    <!-- Navigation Grid -->
    <div class="nav-grid">
      
      <!-- Home Module -->
      <RouterLink to="/" class="nav-card bg-white">
        <div class="card-content">
          <span class="icon">⌂</span>
          <h3 class="title">HOME</h3>
          <span class="desc">// 主页</span>
        </div>
      </RouterLink>

      <!-- Projects Module -->
      <RouterLink to="/projects" class="nav-card bg-cyan">
        <div class="card-content">
          <span class="icon">⚒</span>
          <h3 class="title">PROJECTS</h3>
          <span class="desc">// 项目</span>
        </div>
      </RouterLink>

      <!-- Blog Module -->
      <RouterLink to="/blog" class="nav-card bg-yellow">
        <div class="card-content">
          <span class="icon">✍</span>
          <h3 class="title">BLOG</h3>
          <span class="desc">// 博客</span>
        </div>
      </RouterLink>

      <!-- About Module -->
      <RouterLink to="/about" class="nav-card bg-magenta text-white">
        <div class="card-content">
          <span class="icon">☺</span>
          <h3 class="title">ABOUT</h3>
          <span class="desc">// 关于</span>
        </div>
      </RouterLink>

      <!-- Lab Module (Distinct styling for experimental feel) -->
      <RouterLink to="/lab" class="nav-card bg-black text-cyan border-dashed">
        <div class="card-content">
          <span class="icon">⚡</span>
          <h3 class="title">LAB</h3>
          <span class="desc">// 实验室</span>
        </div>
      </RouterLink>

    </div>
  </section>
</template>

<script setup lang="ts">
// Clean, static navigation module component
</script>

<style scoped>
/* Section Container */
.modules-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Header Styling */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-family: 'Fira Code', monospace;
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0;
  color: #000;
  text-shadow: 4px 4px 0px #00ffff; /* Cyan shadow */
}

.section-subtitle {
  font-family: 'Fira Code', monospace;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #000;
  color: #fff;
  display: inline-block;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border: 3px solid #000;
  transform: rotate(2deg);
}

/* Grid Layout */
.nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  width: 100%;
}

/* Neo-Brutalist Nav Cards */
.nav-card {
  text-decoration: none;
  color: #000;
  border: 4px solid #000;
  box-shadow: 8px 8px 0px 0px #000;
  padding: 2rem 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 180px;
}

.nav-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0px 0px #000;
}

.nav-card:active {
  transform: translate(2px, 2px);
  box-shadow: 4px 4px 0px 0px #000;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Typography inside cards */
.icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  line-height: 1;
}

.title {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 1.8rem;
  font-weight: 900;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.05em;
}

.desc {
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  font-weight: bold;
}

/* Memphis Color Utilities */
.bg-white { background-color: #fff; }
.bg-cyan { background-color: #00ffff; }
.bg-yellow { background-color: #fffa00; }
.bg-magenta { background-color: #ff00ff; }
.bg-black { background-color: #000; }

.text-white { color: #fff; }
.text-cyan { color: #00ffff; }

.border-dashed { border-style: dashed; }

/* Responsive Adjustments */
@media (max-width: 768px) {
  .modules-section {
    padding: 3rem 1.5rem;
  }
  .nav-grid {
    grid-template-columns: 1fr; /* Stack vertically on small mobile */
    gap: 1.5rem;
  }
}
</style>