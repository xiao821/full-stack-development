import db from '../../utils/db'
import { getUser } from '../../utils/auth'

// GET /api/admin/users
export default defineEventHandler((event) => {
  const user = getUser(event)
  if (user.username !== 'admin') throw createError({ statusCode: 403, message: '无权限' })

  const users = db.prepare('SELECT id, username FROM users ORDER BY id ASC').all()
  return { users }
})
