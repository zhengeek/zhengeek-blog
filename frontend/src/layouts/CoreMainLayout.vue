<template>
  <div class="core-main-layout">
    <RouterView v-slot="{ Component, route }">
      <Transition name="page-fade" mode="out-in">
        <component :is="Component" :key="route.fullPath.split('#')[0]" />
      </Transition>
    </RouterView>
  </div>
</template>

<style scoped>
.core-main-layout { position: relative; z-index: 5; min-height: 100vh; color: #e2e8f0; }
.page-fade-enter-active,
.page-fade-leave-active { transition: opacity 0.22s ease; }
.page-fade-enter-from,
.page-fade-leave-to { opacity: 0; }
</style>
