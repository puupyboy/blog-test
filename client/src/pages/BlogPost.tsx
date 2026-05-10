import { Link, useParams } from "wouter";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug } from "@/data/posts";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";

  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen pt-32">
        <div className="container text-center py-20">
          <p className="font-serif text-4xl font-bold mb-4">404</p>
          <p className="font-display text-xl text-muted-foreground italic mb-8">
            文章不存在或已被删除
          </p>
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.15em] uppercase border border-foreground px-5 py-3 hover:bg-foreground hover:text-background transition-colors cursor-pointer">
              <ArrowLeft size={13} />
              返回博客
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Back */}
      <div className="container mb-10">
        <Link href="/blog">
          <span className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <ArrowLeft size={12} />
            返回博客
          </span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="container mb-12 md:mb-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground border border-border px-2.5 py-1">
              <Tag size={10} />
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-sans text-muted-foreground">
              <Calendar size={10} />
              {new Date(post.createdAt).toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="font-display text-xl text-muted-foreground italic leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>
      </header>

      {/* Divider */}
      <div className="container mb-12">
        <div className="border-t border-border" />
      </div>

      {/* Article Content */}
      <article className="container pb-24">
        <div className="max-w-3xl">
          <div className="prose-editorial">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      {/* Footer Nav */}
      <div className="container pb-24">
        <div className="border-t border-border pt-10 flex items-center justify-between">
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              <ArrowLeft size={12} />
              所有文章
            </span>
          </Link>
          <p className="text-xs font-sans text-muted-foreground tracking-wide">
            {new Date(post.updatedAt).toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            更新
          </p>
        </div>
      </div>
    </div>
  );
}
