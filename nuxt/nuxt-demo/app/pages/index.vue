<template>
  <div class="app">
    <!-- 左侧侧边栏 -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>我的笔记</h2>
      <button class="btn-new" @click="buildnote">+ 新建</button>
      </div>
      <div class="search">
        <input placeholder="搜索笔记..." />
      </div>
      <ul class="note-list">
        <li
          v-for="note in noteList"
          :key="note.id"
          class="note-item"
          :class="{ active: current?.id === note.id }"
          @click="selectNote(note)"
        >
          <div class="note-title">{{ note.title || '无标题' }}</div>
          <div class="note-preview">{{ note.content }}</div>
          <div class="note-date">{{ note.updated_at?.slice(0, 10) }}</div>
        </li>
      </ul>
      <div class="sidebar-footer">
        <button class="btn-footer" @click="showPwdDialog = true">修改密码</button>
        <NuxtLink v-if="isAdmin" to="/admin/users" class="btn-footer admin">用户管理</NuxtLink>
        <button class="btn-logout" @click="logout">退出登录</button>
      </div>
    </aside>

    <!-- 修改密码弹窗 -->
    <el-dialog v-model="showPwdDialog" title="修改密码" width="360px">
      <div class="field">
        <label>原密码</label>
        <el-input v-model="pwdForm.oldPassword" type="password" placeholder="请输入原密码" />
      </div>
      <div class="field" style="margin-top:12px">
        <label>新密码</label>
        <el-input v-model="pwdForm.newPassword" type="password" placeholder="请输入新密码" />
      </div>
      <template #footer>
        <el-button @click="showPwdDialog = false">取消</el-button>
        <el-button type="primary" @click="changePassword">确认修改</el-button>
      </template>
    </el-dialog>

    <!-- 右侧编辑区 -->
    <main class="editor">
      <div class="editor-header">
        <input class="editor-title" placeholder="笔记标题" v-model="form.title" />
        <div class="editor-actions">
          <button class="btn-save" @click="savenote" v-show="form.title || form.content">保存</button>
          <button class="btn-delete" @click="deletenote" v-show="current?.id">删除</button>
        </div>
      </div>
      <textarea class="editor-body" placeholder="开始记录..." v-model="form.content"></textarea>
    </main>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

const noteList = ref([])
const current = ref(null)
const form = reactive({ title: '', content: '' })
const showPwdDialog = ref(false)
const pwdForm = reactive({ oldPassword: '', newPassword: '' })
const isAdmin = ref(false)

// 加载笔记列表
const getnotes = async () => {
  const { list } = await $fetch('/api/notes')
  noteList.value = list
}

// 获取当前用户信息
const getMe = async () => {
  const { user } = await $fetch('/api/auth/me')
  isAdmin.value = user.username === 'admin'
}

// 选中笔记
const selectNote = (note) => {
  current.value = note
  form.title = note.title
  form.content = note.content
}

// 新建笔记
const buildnote = async () => {
  const note = await $fetch('/api/notes', { method: 'POST', body: { title: '', content: '' } })
  noteList.value.unshift(note)
  selectNote(note)
}

// 保存笔记
const savenote = async () => {
  if (!current.value) return
  const updated = await $fetch(`/api/notes/${current.value.id}`, { method: 'PUT', body: form })
  const idx = noteList.value.findIndex(n => n.id === current.value.id)
  if (idx !== -1) noteList.value[idx] = updated
  current.value = updated
}

// 删除笔记
const deletenote = async () => {
  if (!current.value) return
  try {
    await ElMessageBox.confirm('确定要删除这篇笔记吗？', '提示', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await $fetch(`/api/notes/${current.value.id}`, { method: 'DELETE' })
    noteList.value = noteList.value.filter(n => n.id !== current.value.id)
    current.value = null
    form.title = ''
    form.content = ''
    ElMessage.success('删除成功')
  } catch {}
}

// 修改密码
const changePassword = async () => {
  try {
    await $fetch('/api/auth/password', { method: 'PUT', body: pwdForm })
    ElMessage.success('密码修改成功')
    showPwdDialog.value = false
    pwdForm.oldPassword = ''
    pwdForm.newPassword = ''
  } catch (e) {
    ElMessage.error(e?.data?.message || '修改失败')
  }
}

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  useCookie('token').value = null
  navigateTo('/login')
}

onMounted(() => {
  getnotes()
  getMe()
})
</script>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }

.app {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: #f7f8fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* 侧边栏 */
.sidebar {
  width: 280px;
  min-width: 280px;
  background: #fff;
  border-right: 1px solid #e8eaed;
  display: flex;
  flex-direction: column;
}
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 16px 12px;
}
.sidebar-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
}
.btn-new {
  padding: 6px 12px;
  background: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-new:hover { background: #4338ca; }

.search {
  padding: 0 16px 12px;
}
.search input {
  width: 100%;
  padding: 8px 12px;
  background: #f1f3f5;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  outline: none;
  color: #333;
}

.note-list {
  flex: 1;
  overflow-y: auto;
  list-style: none;
  padding: 4px 8px;
}
.note-item {
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 4px;
  transition: background 0.15s;
}
.note-item:hover { background: #f1f3f5; }
.note-item.active { background: #eef2ff; }
.note-title {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.note-preview {
  font-size: 12px;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}
.note-date {
  font-size: 11px;
  color: #bbb;
}

.sidebar-footer {
  padding: 12px 16px;
  border-top: 1px solid #e8eaed;
}
.btn-logout {
  width: 100%;
  padding: 8px;
  background: none;
  border: 1px solid #e8eaed;
  border-radius: 8px;
  font-size: 13px;
  color: #888;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-logout:hover { border-color: #ef4444; color: #ef4444; }
.btn-footer {
  width: 100%;
  padding: 8px;
  background: none;
  border: 1px solid #e8eaed;
  border-radius: 8px;
  font-size: 13px;
  color: #555;
  cursor: pointer;
  margin-bottom: 6px;
  transition: all 0.2s;
  display: block;
  text-align: center;
  text-decoration: none;
}
.btn-footer:hover { border-color: #4f46e5; color: #4f46e5; }
.btn-footer.admin { color: #4f46e5; border-color: #c7d2fe; }
.field label { font-size: 13px; color: #555; margin-bottom: 6px; display: block; }

/* 编辑区 */
.editor {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.editor-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  border-bottom: 1px solid #e8eaed;
  background: #fff;
}
.editor-title {
  flex: 1;
  font-size: 20px;
  font-weight: 600;
  border: none;
  outline: none;
  color: #1a1a2e;
  background: transparent;
}
.editor-title::placeholder { color: #ccc; }
.editor-actions { display: flex; gap: 8px; }
.btn-save {
  padding: 7px 18px;
  background: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-save:hover { background: #4338ca; }
.btn-delete {
  padding: 7px 18px;
  background: none;
  border: 1px solid #e8eaed;
  border-radius: 8px;
  font-size: 13px;
  color: #888;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-delete:hover { border-color: #ef4444; color: #ef4444; }

.editor-body {
  flex: 1;
  padding: 24px;
  font-size: 15px;
  line-height: 1.8;
  color: #333;
  border: none;
  outline: none;
  resize: none;
  background: #f7f8fa;
}
.editor-body::placeholder { color: #ccc; }
</style>

