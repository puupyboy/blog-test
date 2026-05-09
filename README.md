# 个人博客

一个基于 React + tRPC + Drizzle ORM 的简洁个人博客系统。

## 技术栈

- **前端**: React 19, TypeScript, Tailwind CSS, shadcn/ui, wouter
- **后端**: Express, tRPC, Drizzle ORM
- **数据库**: MySQL
- **构建工具**: Vite, esbuild, tsx

## 功能特性

- 首页个人简介与最新文章展示
- 博客文章列表（支持分类筛选）
- Markdown 文章详情页
- 密码保护的文章发布入口（密码：666）
- 响应式设计，支持移动端
- 明暗主题切换

## 快速开始

### 环境要求

- Node.js 20+
- pnpm
- MySQL 数据库

### 安装依赖

```bash
pnpm install
```

### 配置环境变量

创建 `.env` 文件：

```env
DATABASE_URL=mysql://user:password@localhost:3306/blog
```

### 数据库初始化

```bash
pnpm db:push
```

### 开发模式

```bash
pnpm dev
```

### 生产构建

```bash
pnpm build
pnpm start
```

## 项目结构

```
├── client/           # 前端代码
│   ├── src/
│   │   ├── components/   # UI 组件
│   │   ├── pages/        # 页面组件
│   │   ├── contexts/     # React Context
│   │   ├── hooks/        # 自定义 Hooks
│   │   └── lib/          # 工具函数
│   └── index.html
├── server/           # 后端代码
│   ├── _core/        # 核心模块（tRPC, 上下文）
│   ├── db.ts         # 数据库操作
│   └── routers.ts    # tRPC 路由
├── drizzle/          # 数据库 Schema 与迁移
├── shared/           # 前后端共享代码
└── package.json
```

## License

MIT
