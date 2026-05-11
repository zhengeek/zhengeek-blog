<template>
  <div class="modules-scattered">
    
    <!-- 波点圆：关于 -->
    <RouterLink class="nav-shape shape-circle bg-magenta" to="/about">
      <span class="shape-text">ABOUT</span>
    </RouterLink>

    <!-- 锋利多边形：项目 -->
    <RouterLink class="nav-shape shape-polygon bg-yellow" to="/projects">
      <span class="shape-text">PROJECTS</span>
    </RouterLink>

    <!-- 粗壮矩形：博客 -->
    <RouterLink class="nav-shape shape-rect bg-cyan" to="/blog">
      <span class="shape-text">BLOG</span>
    </RouterLink>

    <!-- 纯黑药丸形：实验室 -->
    <RouterLink class="nav-shape shape-pill bg-black text-white" to="/lab">
      <span class="shape-text">LAB_</span>
    </RouterLink>

  </div>
</template>

<script setup lang="ts">
// 打破网格的异形导航模块
</script>

<style scoped>
/* 这个容器把所有导航限制在右下角 */
.modules-scattered {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 50vw;
  height: 60vh;
  z-index: 20;
  pointer-events: auto; /* 确保这些元素可以被点击 */
}

/* 基础形状与新粗野主义交互设定 */
.nav-shape {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border: 4px solid #000;
  box-shadow: 10px 10px 0px 0px #000;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Hover 时产生剧烈的弹跳感和加深的阴影 */
.nav-shape:hover {
  transform: scale(1.1) translateY(-10px) !important; /* 强制覆盖原本定位 */
  box-shadow: 20px 20px 0px 0px #000;
  z-index: 30; /* hover 时确保置顶不被遮挡 */
}

/* 极客等宽字体 */
.shape-text {
  font-family: 'Fira Code', monospace;
  font-weight: 900;
  font-size: 1.5rem;
  color: inherit;
}

/* === 具体异形设计与错落定位 === */

/* 1. 圆形 - ABOUT */
.shape-circle {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  top: 10%;
  left: 10%;
  /* 孟菲斯波点纹理模拟 */
  background-image: radial-gradient(#fff 15%, transparent 16%);
  background-size: 20px 20px;
}
.shape-circle .shape-text { background: #000; padding: 0.2rem 0.5rem; color: #fff; transform: rotate(-10deg); }

/* 2. 多边形 - PROJECTS */
.shape-polygon {
  width: 180px;
  height: 140px;
  /* 使用 clip-path 裁切出一个锋利的四边形 */
  clip-path: polygon(10% 0, 100% 10%, 90% 100%, 0 90%);
  top: 40%;
  left: 35%;
  transform: rotate(8deg);
}

/* 3. 矩形 - BLOG */
.shape-rect {
  width: 180px;
  height: 80px;
  top: 20%;
  right: 15%;
  transform: rotate(-5deg);
}

/* 4. 药丸形 - LAB */
.shape-pill {
  width: 150px;
  height: 60px;
  border-radius: 30px;
  bottom: 20%;
  right: 10%;
  transform: rotate(-15deg);
}
.shape-pill .shape-text { color: #00ffff; } /* 黑底发光青字 */

/* 颜色工具类 */
.bg-magenta { background-color: #ff00ff; color: #000; }
.bg-yellow { background-color: #fffa00; color: #000; }
.bg-cyan { background-color: #00ffff; color: #000; }
.bg-black { background-color: #000; }
.text-white { color: #fff; }

/* 移动端适配防重叠 */
@media (max-width: 768px) {
  .modules-scattered { width: 100vw; height: 50vh; bottom: 10%; right: 0; }
  .shape-polygon { clip-path: none; } /* 移动端防重叠取消裁切 */
}
</style>
