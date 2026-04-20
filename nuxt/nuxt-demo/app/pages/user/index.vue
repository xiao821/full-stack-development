<template>
  <div>
    <h1>用户列表</h1>
    <!-- 用 NuxtLink 跳转到动态路由 -->
    <NuxtLink to="/user/1">用户 1</NuxtLink>
    <NuxtLink to="/user/2">用户 2</NuxtLink>

    <!-- 用 navigateTo 跳转 -->
    <button @click="navigateTo('/user/3')">跳转到用户 3</button>
  </div>
</template>
