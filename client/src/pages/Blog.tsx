import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, PenLine } from "lucide-react";
import { getPosts, getCategories } from "@/data/posts";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("全部");

  const posts = getPosts(
    selectedCategory !== "全部" ? selectedCategory : undefined
  );
  const categories = getCategories();
  const allCategories = ["全部", ...categories];

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Header */}
      <section className="pb-12 md:pb-16">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground mb-6">
                博客
              </p>
              <h1 className="font-serif text-5xl md:text-6xl font-black leading-tight">
                文章
                <br />
                <em className="font-display italic font-light">与思考</em>
              </h1>
              <div className="w-12 h-px bg-foreground mt-6" />
            </div>

            <div className="pb-2">
              <Link href="/write">
                <span className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.15em] uppercase border border-foreground px-5 py-2.5 hover:bg-foreground hover:text-background transition-colors cursor-pointer">
                  <PenLine size={12} />
                  写文章
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="container mb-10">
        <div className="border-t border-border pt-6 flex flex-wrap gap-3">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-sans tracking-[0.1em] uppercase px-3 py-1.5 border transition-colors ${
                selectedCategory === cat
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles List */}
      <section className="pb-24">
        <div className="container">
          {posts.length === 0 ? (
            <div className="py-20 text-center border-t border-border">
              <p className="font-display text-xl text-muted-foreground italic mb-3">
                {selectedCategory !== "全部"
                  ? `「${selectedCategory}」分类下暂无文章`
                  : "尚无文章，敬请期待..."}
              </p>
              <Link href="/write">
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-sans tracking-[0.15em] uppercase border border-foreground px-5 py-2.5 hover:bg-foreground hover:text-background transition-colors cursor-pointer">
                  发布第一篇文章 <ArrowRight size={12} />
                </span>
              </Link>
            </div>
          ) : (
            <div className="space-y-0">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article
                    className={`grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-t border-border group cursor-pointer hover:bg-secondary/30 transition-colors px-0 -mx-0`}
                  >
                    <div className="md:col-span-2">
                      <p className="text-xs font-sans tracking-[0.08em] text-muted-foreground">
                        {new Date(post.createdAt).toLocaleDateString("zh-CN", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="md:col-span-1">
                      <span className="text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground border border-border px-2 py-0.5">
                        {post.category}
                      </span>
                    </div>
                    <div className="md:col-span-8">
                      <h2 className="font-serif text-xl md:text-2xl font-bold mb-2 group-hover:opacity-70 transition-opacity">
                        {post.title}
                      </h2>
                      <p className="font-display text-base text-muted-foreground italic leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="md:col-span-1 flex items-center justify-end">
                      <ArrowRight
                        size={16}
                        className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  </article>
                </Link>
              ))}
              {/* Bottom border */}
              <div className="border-t border-border" />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
