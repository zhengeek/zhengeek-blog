<template>
    <section class="title-section" aria-labelledby="main-title">
      <p class="brand-chip">ZhenGeek Blog</p>
      <h1 id="main-title">ZhenGeek</h1>
      <p class="scroll-note">Scroll into the dream</p>
    </section>
</template>

<style scoped>
.title-section {
  min-height:100svh;
  position:relative;
  z-index:1;
  display: grid;
  place-items: center;
  padding: 40px;
}

.brand-chip {
  position: absolute;
  top: 32px;
  right: 38px;
  margin: 0;
  padding: 10px 18px;
  border: 1px solid rgba(255, 255, 255, 0.64);
  border-radius: 999px;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(16px);
  box-shadow: 0 18px 48px rgba(61, 102, 140, 0.22);
  font-size: 16px;
  font-weight: 850;
}

.title-section h1 {
  margin: 0;
  color: rgba(255, 255, 255, 0.94);
  font-size: clamp(76px, 14vw, 210px);
  line-height: 0.82;
  font-weight: 950;
  letter-spacing: 0;
  text-align: center;
  text-shadow:
    0 10px 42px rgba(36, 79, 120, 0.44),
    0 0 80px rgba(255, 255, 255, 0.5),
    5px 5px 0 rgba(255, 188, 224, 0.24);
}

.scroll-note {
  position: absolute;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  margin: 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
</style>