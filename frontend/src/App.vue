<template>
  <MainLayout />
  <CustomCursor />
</template>

<script setup lang="ts">
import MainLayout from './layouts/MainLayout.vue'
import CustomCursor from './components/home/CustomCursor.vue'
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  background: #05050f;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  background: #05050f;
  color: #ffffff;
  font-family: 'Noto Sans SC', Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
}

button,
a {
  font: inherit;
}
</style>
