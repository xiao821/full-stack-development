import jwt from 'jsonwebtoken'

export default defineEventHandler((event) => {
  const token = getCookie(event, 'token')

  if (!token) {
    throw createError({ statusCode: 401, message: '未登录' })
  }

  try {
    const config = useRuntimeConfig()
    const decoded = jwt.verify(token, config.jwtSecret)
    return { user: decoded }
  } catch {
    throw createError({ statusCode: 401, message: 'Token 无效' })
  }
})
