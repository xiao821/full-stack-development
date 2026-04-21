import db from '../../utils/db'

// POST /api/auth/register
export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)

  if (!username || !password) {
    throw createError({ statusCode: 400, message: '用户名和密码不能为空' })
  }

  const exists = db.prepare('SELECT id FROM users WHERE username = ?').get(username)
  if (exists) {
    throw createError({ statusCode: 400, message: '用户名已存在' })
  }

  db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username, password)
  return { success: true }
})
