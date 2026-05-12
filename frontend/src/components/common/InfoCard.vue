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
  border: 2px solid rgba(250, 250, 250, 0.9);
  background: rgba(24, 24, 27, 0.74);
  box-shadow: 10px 10px 0 rgba(250, 250, 250, 0.12);
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
  color: #d4d4d8;
  font-size: 1rem;
  line-height: 1.85;
}
</style>
