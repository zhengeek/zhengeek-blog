<script setup lang="ts">
defineProps<{
  label?: string
  title?: string
  description?: string
}>()
</script>

<template>
  <article class="info-card">
    <span v-if="label" class="label">{{ label }}</span>
    <strong v-if="title" class="title">{{ title }}</strong>
    <p v-if="description" class="description">{{ description }}</p>
    <slot />
  </article>
</template>

<style scoped>
.info-card {
  border: 1px solid var(--vg-card-border);
  background: var(--vg-panel);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 243, 255, 0.07);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: border-color 0.35s ease, box-shadow 0.35s ease, background 0.35s ease, transform 0.35s ease;
}

.info-card:hover {
  border-color: rgba(0, 243, 255, 0.3);
  background: rgba(20, 10, 40, 0.52);
  box-shadow: 0 12px 38px rgba(0, 0, 0, 0.52), 0 0 36px rgba(0, 243, 255, 0.15);
}

.label {
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 800;
}

.title {
  display: block;
  margin: 1rem 0;
  font-family: var(--font-display);
  font-size: 2rem;
  line-height: 1;
}

.description {
  margin-top: 0;
  color: var(--vg-text-soft);
  font-size: 1rem;
  line-height: 1.85;
}
</style>
