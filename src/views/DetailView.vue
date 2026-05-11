<template>
  <main class="detail-page">
    <section class="detail-hero section-panel">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </section>

    <section class="section-panel detail-list">
      <article v-for="item in items" :key="item" class="glass-card">
        <span>✦</span>
        <p>{{ item }}</p>
      </article>
    </section>
  </main>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  items: { type: Array, required: true },
})
</script>
