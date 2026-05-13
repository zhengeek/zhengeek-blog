<script setup lang="ts">
import { useRouter } from 'vue-router'
import InfoCard from '../../components/common/InfoCard.vue'

const router = useRouter()

const enterAdmin = () => {
  router.push('/admin')
}
</script>

<template>
  <main class="admin-login-page">
    <InfoCard class="login-card">
      <p class="eyebrow">后台 // 静态原型</p>
      <h1>ZhenGeek 管理后台</h1>
      <form class="login-form" @submit.prevent="enterAdmin">
        <label>
          <span>用户名</span>
          <input type="text" autocomplete="username" placeholder="请输入用户名" />
        </label>
        <label>
          <span>密码</span>
          <input type="password" autocomplete="current-password" placeholder="请输入密码" />
        </label>
        <button type="submit">进入后台</button>
      </form>
    </InfoCard>
  </main>
</template>

<style scoped>
.admin-login-page {
  min-height: calc(100vh - 76px);
  display: grid;
  place-items: center;
  padding: 3rem 1rem 5rem;
}

.login-card {
  width: min(480px, 100%);
  border-radius: 28px;
  padding: clamp(1.5rem, 5vw, 2.4rem);
}

.eyebrow,
label span {
  color: var(--vg-accent);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 800;
}

.eyebrow {
  margin: 0 0 1rem;
  letter-spacing: 0.1em;
}

h1 {
  margin: 0 0 2rem;
  font-family: var(--font-display);
  font-size: clamp(3rem, 9vw, 5.5rem);
  line-height: 0.92;
  letter-spacing: -0.055em;
}

.login-form {
  display: grid;
  gap: 1rem;
}

label {
  display: grid;
  gap: 0.55rem;
}

input {
  border: 1px solid rgba(250, 250, 250, 0.18);
  border-radius: 12px;
  background: rgba(9, 9, 11, 0.76);
  color: #fafafa;
  font: inherit;
  padding: 0.9rem 1rem;
  outline: none;
}

input:focus {
  border-color: rgba(204, 255, 0, 0.72);
  box-shadow: 0 0 0 3px rgba(204, 255, 0, 0.08);
}

button {
  margin-top: 0.6rem;
  border: 1px solid rgba(204, 255, 0, 0.58);
  border-radius: 999px;
  background: rgba(204, 255, 0, 0.12);
  color: var(--vg-accent);
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 800;
  padding: 0.9rem 1rem;
}
</style>
