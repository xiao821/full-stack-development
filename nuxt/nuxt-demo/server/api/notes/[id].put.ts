import db from '../../utils/db'
import { getUser } from '../../utils/auth'

// PUT /api/notes/:id
export default defineEventHandler(async (event) => {
  const user = getUser(event)
  const id = getRouterParam(event, 'id')
  const { title, content } = await readBody(event)

  const note = db.prepare('SELECT id FROM notes WHERE id = ? AND user_id = ?').get(id, user.id)
  if (!note) throw createError({ statusCode: 404, message: '笔记不存在' })

  db.prepare(
    "UPDATE notes SET title = ?, content = ?, updated_at = datetime('now') WHERE id = ?"
  ).run(title, content, id)

  return db.prepare('SELECT * FROM notes WHERE id = ?').get(id)
})
