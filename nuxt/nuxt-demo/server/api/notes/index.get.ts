import db from '../../utils/db'
import { getUser } from '../../utils/auth'

// GET /api/notes?page=1&size=20
export default defineEventHandler((event) => {
  const user = getUser(event)
  const { page = 1, size = 20 } = getQuery(event)
  const offset = (Number(page) - 1) * Number(size)

  const list = db.prepare(
    'SELECT id, title, content, created_at, updated_at FROM notes WHERE user_id = ? ORDER BY updated_at DESC LIMIT ? OFFSET ?'
  ).all(user.id, Number(size), offset)

  const { total } = db.prepare('SELECT COUNT(*) as total FROM notes WHERE user_id = ?').get(user.id) as { total: number }

  return { list, total, page: Number(page), size: Number(size) }
})
