<template>
  <div class="ambient-blobs" aria-hidden="true">
    <div class="blob blob-purple"></div>
    <div class="blob blob-accent"></div>
    <div class="blob blob-blue"></div>
  </div>
</template>

<style scoped>
.ambient-blobs {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -10;
  pointer-events: none;
  opacity: 0.3;
}

.blob {
  position: absolute;
  border-radius: 999px;
  mix-blend-mode: screen;
  filter: blur(120px);
  animation: blob 7s infinite;
}

.blob-purple {
  top: -10%;
  left: -10%;
  width: 40vw;
  height: 40vw;
  background: var(--vg-purple);
}

.blob-accent {
  top: 20%;
  right: -10%;
  width: 35vw;
  height: 35vw;
  background: var(--vg-accent);
  animation-delay: 2s;
}

.blob-blue {
  bottom: -20%;
  left: 20%;
  width: 45vw;
  height: 45vw;
  background: #1d4ed8;
  filter: blur(140px);
  animation-delay: 4s;
}
</style>
