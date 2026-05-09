import { Link } from "wouter";
import { ArrowRight, ExternalLink } from "lucide-react";
import { trpc } from "@/lib/trpc";

const featuredProjects = [
  {
    name: "数据可视化平台",
    description: "基于 D3.js 与 React 构建的交互式数据可视化工具，支持多维度数据探索。",
    tags: ["React", "D3.js", "TypeScript"],
    link: "#",
  },
  {
    name: "AI 写作助手",
    description: "利用大语言模型辅助创意写作，提供风格建议与内容扩展功能。",
    tags: ["Python", "OpenAI API", "FastAPI"],
    link: "#",
  },
  {
    name: "极简任务管理器",
    description: "专注于深度工作的任务管理应用，采用番茄工作法与 GTD 方法论。",
    tags: ["React Native", "SQLite", "Expo"],
    link: "#",
  },
];

export default function Home() {
  const { data: posts } = trpc.posts.list.useQuery({});

  const recentPosts = posts?.slice(0, 3) ?? [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-8">
              <p className="text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground mb-6">
                个人博客 · 作品集
              </p>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight text-foreground mb-8">
                思考、
                <br />
                <em className="font-display italic font-light">创作</em>
                <br />
                与探索
              </h1>
              <div className="w-12 h-px bg-foreground mb-8" />
              <p className="font-display text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-lg italic">
                记录技术探索与人文思考，在代码与文字之间寻找共鸣。
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col items-start md:items-end gap-4 pb-2">
              <Link href="/blog">
                <span className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.15em] uppercase border border-foreground px-5 py-3 hover:bg-foreground hover:text-background transition-colors cursor-pointer">
                  阅读博客 <ArrowRight size={14} />
                </span>
              </Link>
              <Link href="/about">
                <span className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  了解我 <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container">
        <div className="border-t border-border" />
      </div>

      {/* Latest Articles */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground mb-3">
                最新文章
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold">近期思考</h2>
            </div>
            <Link href="/blog">
              <span className="hidden md:inline-flex items-center gap-2 text-xs font-sans tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                全部文章 <ArrowRight size={12} />
              </span>
            </Link>
          </div>

          {recentPosts.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display text-xl text-muted-foreground italic">
                尚无文章，敬请期待...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-border">
              {recentPosts.map((post, i) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article
                    className={`py-8 pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-border cursor-pointer group ${
                      i === 0 ? "" : "md:pl-8"
                    }`}
                  >
                    <p className="text-xs font-sans tracking-[0.15em] uppercase text-muted-foreground mb-3">
                      {post.category} ·{" "}
                      {new Date(post.createdAt).toLocaleDateString("zh-CN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h3 className="font-serif text-xl font-bold mb-3 group-hover:opacity-70 transition-opacity leading-snug">
                      {post.title}
                    </h3>
                    <p className="font-display text-base text-muted-foreground italic leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-xs font-sans tracking-widest uppercase text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      阅读全文 <ArrowRight size={12} />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-8 md:hidden">
            <Link href="/blog">
              <span className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                全部文章 <ArrowRight size={12} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container">
        <div className="border-t border-border" />
      </div>

      {/* Featured Projects */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground mb-3">
                精选项目
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold">近期作品</h2>
            </div>
            <Link href="/projects">
              <span className="hidden md:inline-flex items-center gap-2 text-xs font-sans tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                全部项目 <ArrowRight size={12} />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, i) => (
              <div
                key={i}
                className="group border border-border p-6 hover:border-foreground transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-sans tracking-[0.15em] uppercase text-muted-foreground">
                    0{i + 1}
                  </span>
                  <a
                    href={project.link}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
                <h3 className="font-serif text-xl font-bold mb-3 group-hover:opacity-70 transition-opacity">
                  {project.name}
                </h3>
                <p className="font-display text-sm text-muted-foreground italic leading-relaxed mb-5">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-sans tracking-wide px-2 py-0.5 bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-foreground text-background">
        <div className="container text-center">
          <p className="text-xs font-sans tracking-[0.2em] uppercase opacity-60 mb-6">
            保持联系
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            有什么想聊的？
          </h2>
          <p className="font-display text-xl italic opacity-70 mb-10 max-w-md mx-auto">
            无论是项目合作、技术探讨还是单纯的问候，都欢迎联系。
          </p>
          <Link href="/contact">
            <span className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.15em] uppercase border border-background px-6 py-3 hover:bg-background hover:text-foreground transition-colors cursor-pointer">
              联系我 <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
