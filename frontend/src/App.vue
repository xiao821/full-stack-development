<template>
  <div style="max-width: 720px; margin: 24px auto;">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>示例：物品列表</span>
        </div>
      </template>

      <div style="display:flex; gap:8px; margin-bottom: 16px;">
        <el-input v-model="name" placeholder="输入名称..." @keyup.enter="add" />
        <el-button type="primary" :loading="adding" @click="add">添加</el-button>
      </div>

      <el-table :data="items" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="created_at" label="创建时间" />
      </el-table>

      <div style="margin-top: 12px; display:flex; align-items:center; gap:8px;">
        <el-tag type="success" v-if="healthy">后端健康</el-tag>
        <el-tag type="danger" v-else>后端不可用</el-tag>
        <span style="color:#666">API: {{ baseURL }}</span>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import http from './api/http'

const items = ref([])
const name = ref('')
const adding = ref(false)
const healthy = ref(false)
const baseURL = http.defaults.baseURL

async function load() {
  try {
    const [h, list] = await Promise.all([
      http.get('/health'),
      http.get('/api/items')
    ])
    healthy.value = !!h.data?.status
    items.value = list.data
  } catch (e) {
    healthy.value = false
  }
}

async function add() {
  if (!name.value) return
  adding.value = true
  try {
    const { data } = await http.post('/api/items', { name: name.value })
    items.value = [...items.value, data]
    name.value = ''
  } finally {
    adding.value = false
  }
}

onMounted(load)
</script>

<style>
body { background: #f6f6f6; }
</style>

