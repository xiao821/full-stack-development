<template>
  <div class="admin-page">
    <div class="admin-header">
      <NuxtLink to="/" class="back">← 返回</NuxtLink>
      <h2>用户管理</h2>
    </div>
    <el-table :data="users" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button
            v-if="row.username !== 'admin'"
            type="danger"
            size="small"
            @click="deleteUser(row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
definePageMeta({ layout: false, middleware: 'auth' })

const users = ref([])

const { users: list } = await $fetch('/api/admin/users')
users.value = list

const deleteUser = async (row) => {
  try {
    await ElMessageBox.confirm(`确定删除用户 "${row.username}" 吗？`, '提示', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await $fetch(`/api/admin/users/${row.id}`, { method: 'DELETE' })
    users.value = users.value.filter(u => u.id !== row.id)
    ElMessage.success('删除成功')
  } catch {}
}
</script>

<style scoped>
.admin-page {
  padding: 32px;
  max-width: 800px;
  margin: 0 auto;
}
.admin-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}
.admin-header h2 { font-size: 20px; color: #1a1a2e; }
.back {
  color: #4f46e5;
  text-decoration: none;
  font-size: 14px;
}
.back:hover { text-decoration: underline; }
</style>
