<template>
  <div>
    <h1>首页</h1>
    <!-- Nuxt 会自动扫描 components/ 目录并全局注册所有组件，无需手动 import。  -->
    <MyButton />
    <button @click="logout">退出登录</button>
  </div>
</template>


<script setup>
async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  useCookie('token').value = null
  navigateTo('/login')
}
</script>
