# 全栈开发起步项目

本仓库包含一个最小化前端（Vue 3 + Vite + Axios + Element Plus）与后端（Node.js + Express）。后端的数据层可插拔：默认使用内存存储以便开发/测试，后续可通过环境变量切换到 PostgreSQL。

## 目录结构

- `frontend/` — 使用 Vite 的 Vue 3 前端
- `backend/` — Express API，支持内存存储或 PostgreSQL

## 开发模式快速启动

请打开两个终端分别运行前后端：

1) 启动后端

```
cd backend
cp .env.example .env   # 先使用内存存储 DB_DRIVER=memory
npm install
npm run dev
```

2) 启动前端

```
cd frontend
echo "VITE_API_URL=http://localhost:3000" > .env
npm install
npm run dev
```

前端地址：http://localhost:5173
后端地址：http://localhost:3000

## 后续切换到 PostgreSQL

准备就绪后，安装 PostgreSQL（或使用 Docker），在 `backend/.env` 中设置：

```
DB_DRIVER=pg
DATABASE_URL=postgres://user:password@localhost:5432/app
```

重新安装依赖并启动后端即可生效。
