<template>
  <main class="home">
    <p class="eyebrow">ZhenGeek Blog</p>
    <h1>Envision. Nurture. Forge. Pioneer.</h1>
    <p class="description">
      A long-term full-stack personal digital platform.
    </p>
  </main>
</template>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
  padding: 24px;
}

.eyebrow {
  font-size: 18px;
  letter-spacing: 4px;
  text-transform: uppercase;
}

h1 {
  max-width: 900px;
  font-size: 56px;
  line-height: 1.1;
  margin: 0;
}

.description {
  font-size: 20px;
  color: #666;
  margin: 0;
}
</style>