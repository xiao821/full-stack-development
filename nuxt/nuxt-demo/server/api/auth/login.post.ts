import db from '../../utils/db'

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)

  const user = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?').get(username, password)

  if (!user) {
    throw createError({ statusCode: 401, message: '用户名或密码错误' })
  }

  return { token: `token-${username}-${Date.now()}` }
})
