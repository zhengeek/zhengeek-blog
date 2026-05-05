<template>
   <div class="dream-backdrop" aria-hidden="true">
      <div class="star-field"></div>
      <div class="anime-glow"></div>
      <div class="petals"></div>
      <div class="moon"></div>
      <div class="mountains mountain-back"></div>
      <div class="mountains mountain-front"></div>
      <div class="cloud cloud-one"></div>
      <div class="cloud cloud-two"></div>
      <div class="mist"></div>
    </div>
</template>

<style scoped>
 .dream-backdrop {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background:
    radial-gradient(circle at 50% calc(18% + var(--sky-shift)), #ffffff 0 1px, transparent 1.6px),
    radial-gradient(circle at 18% calc(28% + var(--sky-shift)), rgba(255, 255, 255, 0.9) 0 1px, transparent 1.5px),
    radial-gradient(circle at 68% 36%, rgba(255, 184, 130, 0.26), transparent 0 23%),
    radial-gradient(circle at 22% 18%, rgba(177, 210, 255, 0.22), transparent 0 25%),
    linear-gradient(180deg, #08132b 0%, #192d5a 42%, #455f93 72%, #e3c5d9 100%);
}

.star-field {
  position: absolute;
  inset: 0;
  opacity: 0.86;
  transform: translateY(calc(var(--sky-shift) * -1));
  background-image:
    radial-gradient(circle, rgba(255, 255, 255, 0.95) 0 1px, transparent 1.8px),
    radial-gradient(circle, rgba(255, 227, 249, 0.9) 0 1px, transparent 1.6px),
    radial-gradient(circle, rgba(183, 226, 255, 0.8) 0 1px, transparent 1.5px);
  background-position:
    20px 36px,
    100px 90px,
    44px 140px;
  background-size:
    130px 120px,
    190px 170px,
    260px 210px;
}

.anime-glow {
  position: absolute;
  inset: 0;
  opacity: 0.72;
  transform: translateY(calc(var(--sky-shift) * -0.7));
  background:
    radial-gradient(ellipse at 68% 35%, rgba(255, 197, 128, 0.42), transparent 0 28%),
    radial-gradient(ellipse at 35% 18%, rgba(173, 205, 255, 0.24), transparent 0 26%),
    linear-gradient(115deg, transparent 0 40%, rgba(255, 255, 255, 0.12) 40.2% 40.7%, transparent 41% 100%);
  mix-blend-mode: screen;
}

.petals {
  position: absolute;
  inset: 0;
  opacity: 0.5;
  transform: translateY(calc(var(--cloud-shift) * -0.35));
  background-image:
    radial-gradient(ellipse at center, rgba(255, 186, 222, 0.86) 0 34%, transparent 36%),
    radial-gradient(ellipse at center, rgba(255, 226, 244, 0.82) 0 32%, transparent 34%),
    radial-gradient(ellipse at center, rgba(186, 218, 255, 0.72) 0 30%, transparent 33%);
  background-position:
    9vw 24vh,
    74vw 20vh,
    82vw 62vh;
  background-size:
    18px 10px,
    14px 8px,
    16px 9px;
  background-repeat: no-repeat;
  filter: blur(0.2px);
}

.moon {
  position: absolute;
  right: clamp(48px, 12vw, 170px);
  top: calc(42px + var(--moon-shift));
  width: clamp(118px, 16vw, 210px);
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle at 36% 30%, rgba(255, 255, 255, 0.86) 0 8%, transparent 9%),
    radial-gradient(circle at 64% 62%, rgba(126, 159, 190, 0.2) 0 10%, transparent 11%),
    linear-gradient(145deg, #fff9ed, #d8e8ff 70%, #b5c5ee);
  box-shadow:
    0 0 44px rgba(255, 244, 220, 0.74),
    0 0 120px rgba(255, 182, 124, 0.34);
}

.mountains {
  position: absolute;
  left: -7vw;
  right: -7vw;
  bottom: 0;
  height: 44vh;
  transform: translateY(var(--mountain-shift));
}

.mountain-back {
  bottom: 13vh;
  opacity: 0.84;
  background:
    linear-gradient(135deg, transparent 0 49%, rgba(255, 192, 121, 0.72) 49.2% 55%, transparent 55.3%),
    linear-gradient(180deg, #f7fbff 0%, #a8c8ec 42%, #31537b 100%);
  clip-path: polygon(0 84%, 12% 48%, 22% 68%, 34% 28%, 47% 72%, 60% 36%, 70% 62%, 82% 24%, 94% 66%, 100% 50%, 100% 100%, 0 100%);
  filter:
    drop-shadow(0 -12px 34px rgba(255, 180, 91, 0.2))
    saturate(1.12);
}

.mountain-front {
  bottom: -3vh;
  opacity: 0.95;
  background:
    linear-gradient(123deg, transparent 0 41%, rgba(255, 194, 118, 0.88) 41.3% 48%, transparent 48.3%),
    linear-gradient(154deg, transparent 0 55%, rgba(255, 225, 164, 0.82) 55.2% 60%, transparent 60.4%),
    linear-gradient(180deg, #fff8ef 0%, #d7edff 22%, #7aa4d4 58%, #17375d 100%);
  clip-path: polygon(0 74%, 10% 46%, 19% 64%, 30% 30%, 42% 70%, 54% 38%, 67% 68%, 79% 32%, 91% 62%, 100% 42%, 100% 100%, 0 100%);
  filter:
    drop-shadow(0 -16px 40px rgba(255, 172, 71, 0.24))
    saturate(1.16);
}

.cloud {
  position: absolute;
  width: clamp(280px, 34vw, 520px);
  height: 120px;
  border-radius: 999px;
  background: rgba(236, 246, 255, 0.28);
  filter: blur(20px);
  transform: translateY(var(--cloud-shift));
}

.cloud-one {
  left: 5vw;
  top: 27vh;
}

.cloud-two {
  right: 4vw;
  top: 56vh;
  opacity: 0.64;
}

.mist {
  position: absolute;
  inset: auto 0 0;
  height: 42vh;
  background: linear-gradient(180deg, transparent, rgba(79, 111, 150, 0.42) 58%, rgba(15, 39, 70, 0.76));
}

</style>