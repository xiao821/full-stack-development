import db from '../../utils/db'
import { getUser } from '../../utils/auth'

// DELETE /api/notes/:id
export default defineEventHandler((event) => {
  const user = getUser(event)
  const id = getRouterParam(event, 'id')

  const note = db.prepare('SELECT id FROM notes WHERE id = ? AND user_id = ?').get(id, user.id)
  if (!note) throw createError({ statusCode: 404, message: '笔记不存在' })

  db.prepare('DELETE FROM notes WHERE id = ?').run(id)
  return { success: true }
})
