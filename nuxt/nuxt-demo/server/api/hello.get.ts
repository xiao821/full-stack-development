// server/api/ 下的文件自动成为 API 路由
// 访问路径：GET /api/hello
export default defineEventHandler(() => {
  return { message: 'Hello from server!' }
})
