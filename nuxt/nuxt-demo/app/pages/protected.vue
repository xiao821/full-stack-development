<template>
  <div>
    <h1>需要登录才能访问的页面</h1>
  </div>
</template>

<script setup>
// 使用 auth 中间件保护此页面
definePageMeta({ middleware: 'auth' })
</script>
