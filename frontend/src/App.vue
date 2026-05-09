<template>
  <MainLayout />
</template>

<script setup lang="ts">
import MainLayout from './layouts/MainLayout.vue';
</script>

<style>
/* 
  Global Resets & Base Styles for ZhenGeek.OS 
  Neo-Brutalism & Memphis Pop-Art Fundamentals
*/

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  /* 
    The background texture is primarily handled by MainLayout, 
    but we set a fallback color here to prevent white flashes on load.
  */
  background-color: #f4f4f0; 
  color: #000;
  /* Primary font stack for general UI */
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* Ensure scrolling is smooth, helpful for long portfolio pages */
  scroll-behavior: smooth;
}

/* 
  Selection styling to match the pop-art theme 
*/
::selection {
  background-color: #00ffff; /* Cyan highlight */
  color: #000;
}

/* 
  Scrollbar styling (Webkit) for an extra geeky touch 
*/
::-webkit-scrollbar {
  width: 12px;
  background-color: #f4f4f0;
  border-left: 2px solid #000;
}

::-webkit-scrollbar-thumb {
  background-color: #000;
  border: 2px solid #000;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #ff00ff; /* Magenta hover */
}
</style>
