# Nuxt 学习清单

## 第一阶段：基础概念

### 1. 项目结构
- [ ] `app.vue` — 根组件
- [ ] `pages/` — 文件路由系统
- [ ] `components/` — 自动注册组件
- [ ] `layouts/` — 页面布局

```
Read 1 file (ctrl+o to expand)                                                                                                                 
                                                            
⏺ 你的 app.vue 已经有 <NuxtLayout>，所以 layouts/default.vue 会自动对所有页面生效，不需要任何额外配置。
                                                                                                                                    
  方式2：页面指定特定布局                                                                                                                        
                                                                                                                                                 
  如果你有多个布局（比如 layouts/admin.vue），在页面里指定：                                                                                     
                                                                                                                                                 
  <script setup>                                                                                                                                 
  definePageMeta({ layout: 'admin' })                                                                                                            
  </script>                                                                                                                                      
                                                                                                                                                 
  方式3：禁用布局                                                                                                                                
                                                            
  <script setup>                                                                                                                                 
  definePageMeta({ layout: false })                         
  </script>                         
```

- [ ] `composables/` — 自动导入的组合式函数
- [ ] `plugins/` — 插件
- [ ] `middleware/` — 路由中间件
- [ ] `server/` — 服务端 API
- [ ] `public/` — 静态资源
- [ ] `assets/` — 需要构建处理的资源

┌──────────────┬────────────────────────────────────────────────────┐
│     目录     │                        用途                        │
├──────────────┼────────────────────────────────────────────────────┤
│ app.vue      │ 根组件，所有页面的入口                             │
├──────────────┼────────────────────────────────────────────────────┤
│ pages/       │ 文件即路由，index.vue → /，about.vue → /about      │
├──────────────┼────────────────────────────────────────────────────┤
│ components/  │ 自动注册的 Vue 组件，无需 import                   │
├──────────────┼────────────────────────────────────────────────────┤
│ layouts/     │ 页面布局模板，如统一的 header/footer               │
├──────────────┼────────────────────────────────────────────────────┤
│ composables/ │ 自动导入的组合式函数，封装可复用逻辑               │
├──────────────┼────────────────────────────────────────────────────┤
│ plugins/     │ 应用启动时执行的插件，如注册第三方库               │
├──────────────┼────────────────────────────────────────────────────┤
│ middleware/  │ 路由守卫，页面跳转前执行，如权限验证               │
├──────────────┼────────────────────────────────────────────────────┤
│ server/      │ 服务端代码，server/api/ 创建后端接口               │
├──────────────┼────────────────────────────────────────────────────┤
│ public/      │ 静态资源，直接通过 URL 访问，不经过构建            │
├──────────────┼────────────────────────────────────────────────────┤
│ assets/      │ 需要构建处理的资源，如 CSS、图片（会被 Vite 处理） │
└──────────────┴────────────────────────────────────────────────────┘

### 2. 路由系统
- [ ] 基础文件路由（`pages/index.vue` → `/`）
- [ ] 动态路由（`pages/user/[id].vue` → `/user/123`）
- [ ] 嵌套路由（`pages/user/index.vue` + `pages/user/[id].vue`）
- [ ] 路由参数：`useRoute()`
- [ ] 路由跳转：`navigateTo()`、`<NuxtLink>`
- [ ] 路由中间件：`definePageMeta({ middleware })`

### 3. 组件
- [ ] 自动注册（`components/` 目录）
- [ ] 目录嵌套命名（`components/base/Button.vue` → `<BaseButton />`）
- [ ] 懒加载组件（`<LazyMyComponent />`）
- [ ] `<NuxtPage />` — 渲染当前路由页面
- [ ] `<NuxtLayout />` — 渲染布局
- [ ] `<NuxtLink />` — 路由跳转
- [ ] `<NuxtRouteAnnouncer />` — 无障碍路由宣告

---

## 第二阶段：数据获取

### 4. 数据获取方式
- [ ] `useFetch()` — SSR 友好的请求
- [ ] `useAsyncData()` — 自定义异步数据
- [ ] `$fetch()` — 客户端/服务端通用请求
- [ ] `lazy` 选项（非阻塞加载）
- [ ] `refresh()` 刷新数据
- [ ] `pending`、`error` 状态处理

### 5. 服务端 API（server/）
- [ ] `server/api/` — 创建 API 路由
- [ ] `defineEventHandler()` — 处理请求
- [ ] 请求方法：GET/POST/PUT/DELETE
- [ ] `readBody()`、`getQuery()` 获取参数
- [ ] `server/middleware/` — 服务端中间件

---

## 第三阶段：状态与组合式函数

### 6. 状态管理
- [ ] `useState()` — Nuxt 内置跨组件状态
- [ ] Pinia 集成（`@pinia/nuxt`）
- [ ] Store 定义：`defineStore()`
- [ ] 持久化：`pinia-plugin-persistedstate`

### 7. Composables
- [ ] `composables/` 目录自动导入
- [ ] 常用内置：`useRoute`、`useRouter`、`useRuntimeConfig`、`useCookie`、`useHead`
- [ ] 自定义 composable 封装逻辑

---

## 第四阶段：渲染模式

### 8. 渲染策略
- [ ] SSR（服务端渲染，默认）
- [ ] SSG（静态生成）：`nuxt generate`
- [ ] CSR（纯客户端）：`ssr: false`
- [ ] ISR（增量静态再生）
- [ ] 混合渲染：`routeRules` 按路由配置

### 9. SEO 与 Head 管理
- [ ] `useHead()` — 设置 title、meta
- [ ] `useSeoMeta()` — 语义化 SEO meta
- [ ] `definePageMeta()` — 页面级配置

---

## 第五阶段：样式与 UI

### 10. 样式方案
- [ ] 全局样式：`assets/css/main.css` + `nuxt.config.ts`
- [ ] CSS Modules
- [ ] Tailwind CSS（`@nuxtjs/tailwindcss`）
- [ ] UnoCSS（`@unocss/nuxt`）
- [ ] Nuxt UI（基于 Tailwind 的组件库）

---

## 第六阶段：配置与部署

### 11. nuxt.config.ts
- [ ] `runtimeConfig` — 环境变量
- [ ] `modules` — 集成第三方模块
- [ ] `routeRules` — 路由级渲染配置
- [ ] `nitro` — 服务端配置

### 12. 部署
- [ ] Node.js 服务器：`nuxt build` + `node .output/server/index.mjs`
- [ ] Docker 部署
- [ ] 静态部署：`nuxt generate`
- [ ] Vercel / Netlify 零配置部署

---

## 推荐学习顺序

1. 路由系统 → 组件自动注册
2. 数据获取（`useFetch`）
3. 布局系统（`layouts/`）
4. 服务端 API（`server/api/`）
5. 状态管理（Pinia）
6. 渲染模式理解
7. 部署上线

## 参考资源

- 官方文档：https://nuxt.com/docs
- 官方模块列表：https://nuxt.com/modules
- Nuxt UI：https://ui.nuxt.com
