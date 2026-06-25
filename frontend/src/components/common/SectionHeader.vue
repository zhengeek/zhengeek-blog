<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description?: string
}>()
</script>

<template>
  <div class="section-header">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h2>{{ title }}</h2>
    <p v-if="description" class="description">{{ description }}</p>
  </div>
</template>

<style scoped>
.eyebrow {
  margin: 0 0 1rem;
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.1em;
}

h2,
p {
  margin-top: 0;
}

h2 {
  max-width: 820px;
  margin-bottom: 1rem;
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5vw, 4.8rem);
  line-height: 1;
  letter-spacing: -0.055em;
}

.description {
  max-width: 780px;
  color: var(--vg-text-soft);
  font-size: 1rem;
  line-height: 1.85;
}
</style>
