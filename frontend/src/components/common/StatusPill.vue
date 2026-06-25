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
  border: 1px solid rgba(0, 210, 255, 0.44);
  border-radius: 999px;
  background: rgba(0, 210, 255, 0.08);
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 800;
  box-shadow: 0 0 20px rgba(0, 210, 255, 0.1);
}
</style>
