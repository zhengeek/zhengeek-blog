<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <span class="status-pill">{{ text }}</span>
</template>

<style scoped>
.status-pill {
  flex: 0 0 auto;
  padding: 0.65rem 0.9rem;
  border: 1px solid rgba(204, 255, 0, 0.55);
  border-radius: 999px;
  background: rgba(204, 255, 0, 0.08);
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 800;
}
</style>
