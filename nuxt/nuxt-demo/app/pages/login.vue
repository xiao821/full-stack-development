<template>
  <div class="login-container">
    <ClientOnly>
      <vue-particles id="particles" :options="particlesOptions" />
    </ClientOnly>
    <div class="login-box">
      <h2>登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="field">
          <label>用户名</label>
          <input v-model="form.username" type="text" placeholder="请输入用户名" />
        </div>
        <div class="field">
          <label>密码</label>
          <input v-model="form.password" type="password" placeholder="请输入密码" />
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit">登录</button>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

const form = reactive({ username: '', password: '' })
const error = ref('')

const particlesOptions = {
  background: { color: '#0d1117' },
  particles: {
    number: { value: 80, density: { enable: true, area: 800 } },
    color: { value: '#4f46e5' },
    links: { enable: true, color: '#4f46e5', distance: 150, opacity: 0.4 },
    move: { enable: true, speed: 2 },
    size: { value: 3 },
    opacity: { value: 0.5 }
  }
}

async function handleLogin() {
  try {
    const { token } = await $fetch('/api/auth/login', {
      method: 'POST',
      body: form
    })
    useCookie('token').value = token
    navigateTo('/')
  } catch {
    error.value = '用户名或密码错误'
  }
}
</script>

<style scoped>
.login-container {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
#particles {
  position: absolute;
  inset: 0;
}
.login-box {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 16px;
  width: 360px;
  animation: fadeUp 0.6s ease-out;
}
h2 {
  text-align: center;
  margin-bottom: 28px;
  font-size: 24px;
  color: #fff;
}
.field {
  margin-bottom: 16px;
}
label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #a0aec0;
}
input {
  width: 100%;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  font-size: 14px;
  color: #fff;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}
input::placeholder { color: #4a5568; }
input:focus { border-color: #4f46e5; }
button {
  width: 100%;
  padding: 11px;
  background: linear-gradient(135deg, #667eea, #4e65d9);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  margin-top: 8px;
  transition: opacity 0.2s, transform 0.2s;
}
button:hover { opacity: 0.9; transform: translateY(-1px); }
.error {
  color: #ef4444;
  font-size: 13px;
  margin-bottom: 8px;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

