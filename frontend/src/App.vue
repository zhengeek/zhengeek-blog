<template>
  <MainLayout />
</template>

<script setup lang="ts">
import MainLayout from './layouts/MainLayout.vue'
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  background: #09090b;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  background: #09090b;
  color: #fafafa;
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
