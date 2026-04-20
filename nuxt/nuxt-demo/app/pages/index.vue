<template>
  <div>
    <h1>首页</h1>
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

