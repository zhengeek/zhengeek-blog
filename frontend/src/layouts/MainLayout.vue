<template>
  <div class="main-layout">
    <SiteHeader />
    
    <!-- Main content area where router views are rendered -->
    <main class="page-content">
      <RouterView />
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from '../components/common/SiteHeader.vue';
import SiteFooter from '../components/common/SiteFooter.vue';
</script>

<style scoped>
/* 
  Global Layout Wrapper 
  Ensures the footer stays at the bottom even if content is sparse.
*/
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* 
    Global Memphis Background 
    We apply the paper texture here so it covers the whole viewport,
    but views can override it if they want something different.
  */
  background-color: #f4f4f0;
  background-image: 
    linear-gradient(#e5e5df 1px, transparent 1px),
    linear-gradient(90deg, #e5e5df 1px, transparent 1px);
  background-size: 40px 40px;
}

/* 
  Main content area 
  flex: 1 allows it to grow and push the footer to the bottom.
*/
.page-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  /* Ensure it takes up full width for specific view layouts */
  width: 100%;
}
</style>
