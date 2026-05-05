<template>
        <section class="slogan-section" aria-labelledby="slogan-title">
      <p class="section-kicker">MY CREATIVE RULE</p>
      <h2 id="slogan-title">Envision. Nurture. Forge. Pioneer.</h2>
      <p>把灵感养成作品，把技术写成旅途。</p>
    </section>
</template>

<style scoped>
.slogan-section {
  display: grid;
  align-content: center;
  justify-items: start;
  padding: 80px min(8vw, 110px);
}

.section-kicker {
  margin: 0 0 18px;
  color: rgba(255, 205, 135, 0.78);
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 0.18em;
}

.slogan-section h2 {
  max-width: 1050px;
  margin: 0;
  color: rgba(255, 255, 255, 0.96);
  font-size: clamp(54px, 10vw, 144px);
  line-height: 0.96;
  font-weight: 950;
  letter-spacing: 0;
  text-shadow:
    0 10px 48px rgba(77, 111, 160, 0.36),
    0 0 60px rgba(255, 255, 255, 0.38);
}

.slogan-section p:last-child {
  max-width: 640px;
  margin: 28px 0 0;
  color: rgba(231, 242, 255, 0.86);
  font-size: 22px;
  line-height: 1.7;
  font-weight: 700;
}

@media (max-width: 640px) {
  .slogan-section {
    padding: 24px;
  }

  .slogan-section h2 {
    font-size: clamp(46px, 16vw, 78px);
  }

  .slogan-section p:last-child {
    font-size: 18px;
  }
}
</style>