import jwt from 'jsonwebtoken'
import db from '../../utils/db'

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)

  const user = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?').get(username, password) as { id: number, username: string } | undefined

  if (!user) {
    throw createError({ statusCode: 401, message: '用户名或密码错误' })
  }

  const config = useRuntimeConfig()
  const token = jwt.sign(
    { id: user.id, username: user.username },
    config.jwtSecret,
    { expiresIn: '7d' }
  )

  return { token }
})
