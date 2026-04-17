# 后端（Node.js + Express）

最小化的 API 服务，支持可插拔数据存储。

- 默认存储：内存（无需任何外部依赖，适合开发/测试）
- 可选存储：PostgreSQL（通过 `pg` 驱动，后续可随时切换）

## 快速开始

1) 复制环境变量示例并保持使用内存存储：

```
cp .env.example .env
# DB_DRIVER=memory（默认）
```

2) 安装依赖并启动开发模式：

```
npm install
npm run dev
```

接口默认监听 `http://localhost:3000`。

接口列表：
- `GET /health` 健康检查
- `GET /api/items` 获取物品列表
- `POST /api/items` 新增物品，请求体 `{ "name": "..." }`

## 未来切换到 PostgreSQL

当你准备好使用 PostgreSQL 时，在 `.env` 中设置 `DB_DRIVER=pg`，并提供 `DATABASE_URL`（或独立的 PG 连接环境变量），然后重新安装并启动：

```
DB_DRIVER=pg
DATABASE_URL=postgres://user:password@localhost:5432/app

npm install
npm start
```

首次以 PostgreSQL 方式启动时，会自动创建表 `items`。
