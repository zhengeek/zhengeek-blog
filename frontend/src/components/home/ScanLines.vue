<template>
  <div class="scanlines" aria-hidden="true" />
</template>

<style scoped>
.scanlines {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0) 50%,
    rgba(0, 0, 0, 0.15) 50%,
    rgba(0, 0, 0, 0.15)
  );
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 9998;
  opacity: 0.8;
}
</style>
