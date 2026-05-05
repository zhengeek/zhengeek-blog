<script setup lang="ts">
import DreamBackdrop from '../components/home/DreamBackdrop.vue'
import TitleSection from '../components/home/TitleSection.vue'
import SloganSection from '../components/home/SloganSection.vue'
import ModulesSection from '../components/home/ModulesSection.vue'
import { useParallax } from '../composables/useParallax'

const { parallaxVars } = useParallax()
</script>

<template>
  <div class="dream-page" :style="parallaxVars">
    <DreamBackdrop />
    <TitleSection />
    <SloganSection />
    <ModulesSection />
  </div>
</template>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

:global(html) {
  background: #09152b;
  scroll-behavior: smooth;
}

:global(body) {
  margin: 0;
  min-width: 320px;
  color: #f7fbff;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: #09152b;
}

:global(#app) {
  width: 100%;
  max-width: none;
  min-height: 100vh;
  margin: 0;
  border: 0;
  text-align: left;
  display: block;
}

:global(button) {
  font: inherit;
}

.dream-page {
  --sky-shift: 0px;
  --moon-shift: 0px;
  --mountain-shift: 0px;
  --cloud-shift: 0px;
  min-height: 300vh;
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(8, 18, 42, 0.28), rgba(45, 54, 98, 0.34) 52%, #142b4a 100%),
    #09152b;
}


</style>
