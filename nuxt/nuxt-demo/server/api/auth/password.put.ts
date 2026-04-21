import db from '../../utils/db'
import { getUser } from '../../utils/auth'

// PUT /api/auth/password
export default defineEventHandler(async (event) => {
  const user = getUser(event)
  const { oldPassword, newPassword } = await readBody(event)

  const exists = db.prepare('SELECT id FROM users WHERE id = ? AND password = ?').get(user.id, oldPassword)
  if (!exists) throw createError({ statusCode: 400, message: '原密码错误' })

  db.prepare('UPDATE users SET password = ? WHERE id = ?').run(newPassword, user.id)
  return { success: true }
})
