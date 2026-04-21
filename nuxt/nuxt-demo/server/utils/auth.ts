import jwt from 'jsonwebtoken'
import type { H3Event } from 'h3'

export function getUser(event: H3Event) {
  const token = getCookie(event, 'token')
  if (!token) throw createError({ statusCode: 401, message: '未登录' })

  try {
    const config = useRuntimeConfig()
    return jwt.verify(token, config.jwtSecret) as { id: number; username: string }
  } catch {
    throw createError({ statusCode: 401, message: 'Token 无效' })
  }
}
