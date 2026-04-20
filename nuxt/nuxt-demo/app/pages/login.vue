<template>
  <div class="login-container">
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

function handleLogin() {
  if (form.username === 'admin' && form.password === '123456') {
    const token = useCookie('token')
    token.value = 'logged-in'
    navigateTo('/protected')
  } else {
    error.value = '用户名或密码错误'
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
}
.login-box {
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  width: 360px;
}
h2 {
  text-align: center;
  margin-bottom: 28px;
  font-size: 24px;
  color: #333;
}
.field {
  margin-bottom: 16px;
}
label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #555;
}
input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}
input:focus {
  border-color: #4f46e5;
}
button {
  width: 100%;
  padding: 11px;
  background: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s;
}
button:hover {
  background: #4338ca;
}
.error {
  color: #ef4444;
  font-size: 13px;
  margin-bottom: 8px;
}
</style>
