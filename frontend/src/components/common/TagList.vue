<script setup lang="ts">
defineProps<{
  tags: string[]
}>()
</script>

<template>
  <div class="tag-list">
    <span v-for="tag in tags" :key="tag">{{ tag }}</span>
  </div>
</template>

<style scoped>
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-list span {
  padding: var(--tag-padding, 0.38rem 0.65rem);
  border: 1px solid rgba(176, 38, 255, 0.26);
  border-radius: 999px;
  background: rgba(176, 38, 255, 0.08);
  color: #eef7ff;
  font-family: var(--font-mono);
  font-size: var(--tag-font-size, 0.72rem);
}
</style>
