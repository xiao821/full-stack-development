import db from '../../../utils/db'
import { getUser } from '../../../utils/auth'

// DELETE /api/admin/users/:id
export default defineEventHandler((event) => {
  const user = getUser(event)
  if (user.username !== 'admin') throw createError({ statusCode: 403, message: '无权限' })

  const id = getRouterParam(event, 'id')
  const target = db.prepare('SELECT username FROM users WHERE id = ?').get(id) as { username: string } | undefined
  if (!target) throw createError({ statusCode: 404, message: '用户不存在' })
  if (target.username === 'admin') throw createError({ statusCode: 400, message: '不能删除 admin' })

  db.prepare('DELETE FROM notes WHERE user_id = ?').run(id)
  db.prepare('DELETE FROM users WHERE id = ?').run(id)
  return { success: true }
})
