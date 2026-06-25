<template>
  <div class="marquee-banner" aria-hidden="true">
    <div class="marquee-track">
      <template v-for="index in 2" :key="index">
        <span>打破一切常规</span>
        <b>/</b>
        <span>拒绝平庸的代码</span>
        <b>/</b>
        <span>只有偏执狂才能生存</span>
        <b>/</b>
      </template>
    </div>
  </div>
</template>

<style scoped>
.marquee-banner {
  position: relative;
  z-index: 20;
  width: 100%;
  margin: 96px 0;
  padding: 20px 0;
  overflow: hidden;
  border-top: 4px solid var(--vg-dark);
  border-bottom: 4px solid var(--vg-dark);
  background: var(--vg-accent);
  transform: rotate(-2deg) scale(1.05);
  box-shadow: 0 0 50px rgba(0, 210, 255, 0.22), 0 0 80px rgba(176, 38, 255, 0.14);
}

.marquee-track {
  display: flex;
  align-items: center;
  width: max-content;
  white-space: nowrap;
  animation: marquee 25s linear infinite;
}

span,
b {
  color: var(--vg-dark);
  font-family: var(--font-display);
  font-size: clamp(40px, 6vw, 72px);
  line-height: 1;
}

span {
  margin: 0 24px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.06em;
}

b {
  font-weight: 700;
}
</style>
