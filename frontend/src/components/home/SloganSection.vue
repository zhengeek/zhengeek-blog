<template>
  <div class="slogan-section">
    <!-- 带有轻微呼吸浮动的标语标签 -->
    <div class="slogan-tag tag-magenta float-bob-1">ENVISION.</div>
    <div class="slogan-tag tag-cyan float-bob-2">NURTURE.</div>
    <div class="slogan-tag tag-yellow float-bob-1">FORGE.</div>
    <div class="slogan-tag tag-black float-bob-2">PIONEER.</div>
  </div>
</template>

<script setup lang="ts">
// 散落的四字箴言拼贴标语
</script>

<style scoped>
/* 容器定位在右上角 */
.slogan-section {
  position: absolute;
  top: 10%;
  right: 5%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* 标签之间的间距 */
  z-index: 15; /* 在背景之上，导航模块之下 */
  pointer-events: none; /* 让鼠标穿透，不影响下方交互 */
}

/* 新粗野主义标签样式 */
.slogan-tag {
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 900;
  font-size: 1.5rem;
  padding: 0.8rem 1.5rem;
  border: 4px solid #000;
  box-shadow: 6px 6px 0px 0px #000;
  text-transform: uppercase;
  width: fit-content;
}

/* 错落的颜色与倾斜排版 */
.tag-magenta { background-color: #ff00ff; color: #fff; transform: rotate(5deg); }
.tag-cyan { background-color: #00ffff; color: #000; transform: rotate(-3deg); margin-left: -20px; }
.tag-yellow { background-color: #fffa00; color: #000; transform: rotate(4deg); margin-left: 20px; }
.tag-black { background-color: #000; color: #fff; transform: rotate(-2deg); margin-left: -10px; }

/* 轻微的上下呼吸浮动动画 */
@keyframes bob {
  0%, 100% { transform: translateY(0) rotate(inherit); }
  50% { transform: translateY(-5px) rotate(inherit); }
}

.float-bob-1 { animation: bob 3s ease-in-out infinite; }
.float-bob-2 { animation: bob 4s ease-in-out infinite reverse; }

/* 移动端空间有限，选择隐藏这些装饰标语 */
@media (max-width: 768px) {
  .slogan-section { display: none; }
}
</style>
