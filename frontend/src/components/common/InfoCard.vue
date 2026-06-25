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
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.36), 0 0 34px rgba(0, 210, 255, 0.08);
  backdrop-filter: blur(16px);
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
