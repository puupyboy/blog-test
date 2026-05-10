export interface StaticPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  published: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// 静态文章数据 —— 每次发文章直接在这里添加一条
// ============================================
export const allPosts: StaticPost[] = [
  // 示例文章（可以删除或替换）
  {
    id: 1,
    title: "欢迎使用新博客",
    slug: "welcome-to-new-blog",
    content: `# 欢迎使用新博客

这是你的第一篇文章。

## 特性

- 支持 **Markdown** 格式
- 代码高亮
- 响应式设计

## 代码示例

\`\`\`typescript
const greeting = "Hello, world!";
console.log(greeting);
\`\`\`

开始你的写作之旅吧！`,
    excerpt: "这是你的第一篇文章，开始你的写作之旅吧！",
    category: "随笔",
    published: 1,
    createdAt: "2026-05-10T00:00:00.000Z",
    updatedAt: "2026-05-10T00:00:00.000Z",
  },
];

// 辅助函数

export function getPosts(category?: string): StaticPost[] {
  const filtered = category && category !== "全部"
    ? allPosts.filter((p) => p.category === category)
    : [...allPosts];
  return filtered.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getPostBySlug(slug: string): StaticPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}

export function getCategories(): string[] {
  const set = new Set(allPosts.map((p) => p.category));
  return Array.from(set);
}
