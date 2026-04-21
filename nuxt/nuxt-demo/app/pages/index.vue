<template>
  <div class="app">
    <!-- 左侧侧边栏 -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>我的笔记</h2>
        <button class="btn-new">+ 新建</button>
      </div>
      <div class="search">
        <input placeholder="搜索笔记..." />
      </div>
      <ul class="note-list">
        <li class="note-item active">
          <div class="note-title">笔记标题 1</div>
          <div class="note-preview">这是笔记的预览内容...</div>
          <div class="note-date">2026-04-20</div>
        </li>
        <li class="note-item">
          <div class="note-title">笔记标题 2</div>
          <div class="note-preview">这是笔记的预览内容...</div>
          <div class="note-date">2026-04-19</div>
        </li>
      </ul>
      <div class="sidebar-footer">
        <button class="btn-logout" @click="logout">退出登录</button>
      </div>
    </aside>

    <!-- 右侧编辑区 -->
    <main class="editor">
      <div class="editor-header">
        <input class="editor-title" placeholder="笔记标题" />
        <div class="editor-actions">
          <button class="btn-save">保存</button>
          <button class="btn-delete">删除</button>
        </div>
      </div>
      <textarea class="editor-body" placeholder="开始记录..."></textarea>
    </main>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  useCookie('token').value = null
  navigateTo('/login')
}
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

