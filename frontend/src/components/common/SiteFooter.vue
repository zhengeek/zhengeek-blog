<template>
  <footer class="site-footer">
    <div class="footer-container">
      
      <!-- Top Section: Brand & Philosophy -->
      <div class="footer-brand">
        <h2 class="footer-logo">ZHENGEEK.OS</h2>
        <p class="footer-slogan">Built with Vue 3, TypeScript and long-term curiosity.</p>
      </div>

      <!-- Bottom Section: Links -->
      <div class="footer-links-box">
        <h3 class="box-title">[ SYS.LINKS ]</h3>
        <nav class="footer-nav">
          <!-- Placeholder links -->
          <a href="#" class="footer-link" @click.prevent>// GitHub</a>
          <RouterLink to="/blog" class="footer-link">// Blog</RouterLink>
          <a href="#" class="footer-link" @click.prevent>// Contact</a>
        </nav>
      </div>

    </div>

    <!-- Copyright Bar -->
    <div class="copyright-bar">
      <span>&copy; {{ new Date().getFullYear() }} ZhenGeek. All rights reserved. // <span class="status-ok">SYS.OK</span></span>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Static footer component
</script>

<style scoped>
/* Footer Wrapper */
.site-footer {
  margin-top: auto; /* Pushes footer to bottom if page content is short */
  background-color: #f4f4f0;
  border-top: 4px solid #000;
  /* subtle grid texture */
  background-image: 
    linear-gradient(#e5e5df 1px, transparent 1px),
    linear-gradient(90deg, #e5e5df 1px, transparent 1px);
  background-size: 20px 20px;
  display: flex;
  flex-direction: column;
}

/* Layout Container */
.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 4rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 3rem;
}

/* Brand Section */
.footer-brand {
  max-width: 400px;
}

.footer-logo {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0 0 1rem 0;
  color: #000;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  text-shadow: 4px 4px 0px #00ffff; /* Cyan shadow */
}

.footer-slogan {
  font-family: 'Fira Code', monospace;
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.6;
  color: #000;
  background-color: #fff;
  padding: 1rem;
  border: 3px solid #000;
  box-shadow: 4px 4px 0px 0px #000;
  margin: 0;
  transform: rotate(-1deg);
}

/* Links Section (Neo-Brutalist Box) */
.footer-links-box {
  background-color: #fff;
  border: 4px solid #000;
  box-shadow: 8px 8px 0px 0px #000;
  padding: 1.5rem;
  min-width: 250px;
}

.box-title {
  font-family: 'Fira Code', monospace;
  font-size: 1.2rem;
  font-weight: 900;
  margin: 0 0 1.5rem 0;
  color: #000;
  border-bottom: 3px solid #000;
  padding-bottom: 0.5rem;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-link {
  font-family: 'Fira Code', monospace;
  font-size: 1.1rem;
  font-weight: bold;
  color: #000;
  text-decoration: none;
  padding: 0.5rem;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  display: inline-block;
}

.footer-link:hover {
  background-color: #ff00ff; /* Magenta hover */
  color: #fff;
  border-color: #000;
  transform: translateX(5px);
  box-shadow: 3px 3px 0px 0px #000;
}

/* Copyright Bar */
.copyright-bar {
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 1rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  font-weight: bold;
  letter-spacing: 0.05em;
  border-top: 4px solid #000;
}

.status-ok {
  color: #00ffff;
}

/* Responsive */
@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    padding: 2rem 1.5rem;
  }
  
  .footer-links-box {
    width: 100%;
  }
}
</style>