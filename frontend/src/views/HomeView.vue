<script setup lang="ts">
import TitleSection from '../components/home/TitleSection.vue'
import SloganSection from '../components/home/SloganSection.vue'
import ModulesSection from '../components/home/ModulesSection.vue'
</script>

<template>
  <!-- 交互层：所有内容都在失重空间中 -->
  <div class="physics-space">
    <!-- 散落的巨大字母 ZHENGEEK -->
    <TitleSection />

    <!-- 粗犷的标语贴纸 -->
    <SloganSection />

    <!-- 变成孟菲斯图形的导航入口 -->
    <ModulesSection />
  </div>

  <!-- 极客风格的状态栏 (代替普通的 Coming Soon) -->
  <div class="sys-status-badge">
    <span class="blink-cursor">█</span> ZHENGEEK.OS // V1.0 SKELETON_MODE // ACTIVE DEVELOPMENT
  </div>
</template>
