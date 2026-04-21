import db from '../../utils/db'
import { getUser } from '../../utils/auth'

// POST /api/notes
export default defineEventHandler(async (event) => {
  const user = getUser(event)
  const { title = '', content = '' } = await readBody(event)

  const result = db.prepare(
    'INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)'
  ).run(user.id, title, content)

  return db.prepare('SELECT * FROM notes WHERE id = ?').get(result.lastInsertRowid)
})
