<template>
  <div class="home-canvas">
    <!-- 纯粹视觉装饰背景 (底层 z-index 0) -->
    <DreamBackdrop/>

    <!-- 标题组件：打散的字母 (中层) -->
    <TitleSection/>

    <!-- 狂暴标语贴纸 (上层) -->
    <SloganSection/>

    <!-- 交互核心：异形导航入口 (最高交互层) -->
    <ModulesSection/>

    <!-- 极客状态栏 -->
    <div class="status-bar">
      <span>[SYS.STATUS]</span>
      <span class="warning">/// 孟菲斯失重游乐场开发中 /// UNDER DEVELOPMENT ///</span>
      <span>[ZHENGEEK.OS_v1.0]</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入组成画面的四大核心碎片
import DreamBackdrop from '../components/home/DreamBackdrop.vue'
import TitleSection from '../components/home/TitleSection.vue'
import SloganSection from '../components/home/SloganSection.vue'
import ModulesSection from '../components/home/ModulesSection.vue'
</script>

<style scoped>
/* 
  核心画布设置
  1. 撑满全屏 (100vh)
  2. 禁止滚动条 (overflow: hidden) 保证失重元素飞出屏幕时不破坏布局，不会拉出难看的白边
  3. 相对定位 (relative) 作为所有漂浮组件的绝对定位参考系
*/
.home-canvas {
  position: relative;
  width: 100%;
  height: 100vh; /* 强行撑满屏幕高度 */
  overflow: hidden; /* 锁死视口，禁止滚动 */
  background-color: #f4f4f0; /* 纸张米白底色 */
  
  /* 粗犷的孟菲斯极客网格底纹 */
  background-image: 
    linear-gradient(#e5e5df 2px, transparent 2px),
    linear-gradient(90deg, #e5e5df 2px, transparent 2px);
  background-size: 50px 50px;
}

/* 底部状态栏 - 新粗野主义风格的纯黑封边 */
.status-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #000;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 2rem;
  font-family: 'Fira Code', monospace;
  font-weight: bold;
  font-size: 0.9rem;
  border-top: 5px solid #000;
  z-index: 999; /* 永远在最上层，不被漂浮物遮挡 */
}

.warning {
  color: #fffa00; /* 孟菲斯荧光黄警告色 */
  letter-spacing: 2px;
}

/* 响应式：移动端让状态栏换行显示 */
@media (max-width: 768px) {
  .status-bar {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    padding: 1rem;
    text-align: center;
  }
}
</style>