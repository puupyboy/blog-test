import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Lock, Unlock, X, Send, Eye } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// ---- Publish Modal ----
function PublishModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    title: "",
    category: "技术",
    content: "",
    excerpt: "",
  });
  const [preview, setPreview] = useState(false);

  const utils = trpc.useUtils();
  const createPost = trpc.posts.create.useMutation({
    onSuccess: (data) => {
      toast.success("文章发布成功！");
      utils.posts.list.invalidate();
      utils.posts.categories.invalidate();
      onClose();
    },
    onError: (err) => {
      toast.error(err.message || "发布失败，请重试");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("标题和正文不能为空");
      return;
    }
    createPost.mutate({ password: "666", ...form });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/60 backdrop-blur-sm overflow-y-auto py-8 px-4">
      <div className="bg-background w-full max-w-3xl border border-border shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-border">
          <div>
            <p className="text-xs font-sans tracking-[0.15em] uppercase text-muted-foreground">
              发布文章
            </p>
            <h2 className="font-serif text-xl font-bold mt-0.5">新建文章</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPreview(!preview)}
              className="inline-flex items-center gap-1.5 text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 border border-border hover:border-foreground"
            >
              <Eye size={12} />
              {preview ? "编辑" : "预览"}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground mb-2">
                标题 *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="文章标题..."
                className="w-full border border-border bg-transparent px-4 py-3 font-serif text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground mb-2">
                分类
              </label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="技术 / 随笔 / 读书..."
                className="w-full border border-border bg-transparent px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground mb-2">
              摘要（可选）
            </label>
            <input
              type="text"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              placeholder="简短描述，留空则自动从正文提取..."
              className="w-full border border-border bg-transparent px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground mb-2">
              正文（Markdown）*
            </label>
            {preview ? (
              <div className="min-h-[320px] border border-border p-6 prose-editorial overflow-auto">
                <p className="text-muted-foreground italic text-sm">
                  预览功能将在文章详情页完整呈现，此处显示原始内容：
                </p>
                <pre className="mt-4 text-sm font-mono whitespace-pre-wrap text-foreground">
                  {form.content || "（正文为空）"}
                </pre>
              </div>
            ) : (
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder={`# 文章标题\n\n正文内容支持 Markdown 格式...\n\n## 小节标题\n\n段落内容...`}
                rows={14}
                className="w-full border border-border bg-transparent px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
              />
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-xs font-sans text-muted-foreground">
              支持 Markdown 格式 · 发布后立即公开可见
            </p>
            <button
              type="submit"
              disabled={createPost.isPending}
              className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.15em] uppercase bg-foreground text-background px-6 py-3 hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createPost.isPending ? "发布中..." : <>发布文章 <Send size={13} /></>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---- Password Gate ----
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd === "666") {
      onUnlock();
      setError(false);
    } else {
      setError(true);
      setPwd("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <input
        type="password"
        value={pwd}
        onChange={(e) => {
          setPwd(e.target.value);
          setError(false);
        }}
        placeholder="输入密码..."
        maxLength={10}
        className={`border px-3 py-2 text-sm font-sans bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors w-32 ${
          error ? "border-destructive" : "border-border focus:border-foreground"
        }`}
      />
      <button
        type="submit"
        className="text-xs font-sans tracking-[0.1em] uppercase border border-border px-3 py-2 hover:border-foreground hover:text-foreground text-muted-foreground transition-colors"
      >
        解锁
      </button>
      {error && (
        <span className="text-xs text-destructive font-sans">密码错误</span>
      )}
    </form>
  );
}

// ---- Blog Page ----
export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [unlocked, setUnlocked] = useState(false);
  const [showPublish, setShowPublish] = useState(false);

  const { data: posts, isLoading } = trpc.posts.list.useQuery(
    selectedCategory !== "全部" ? { category: selectedCategory } : {}
  );
  const { data: categories } = trpc.posts.categories.useQuery();

  const allCategories = ["全部", ...(categories ?? [])];

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {showPublish && <PublishModal onClose={() => setShowPublish(false)} />}

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

            {/* Admin unlock */}
            <div className="pb-2">
              {!unlocked ? (
                <div className="flex flex-col items-start md:items-end gap-2">
                  <div className="flex items-center gap-2 text-xs font-sans text-muted-foreground">
                    <Lock size={11} />
                    <span className="tracking-[0.1em] uppercase">作者入口</span>
                  </div>
                  <PasswordGate onUnlock={() => setUnlocked(true)} />
                </div>
              ) : (
                <div className="flex flex-col items-start md:items-end gap-2">
                  <div className="flex items-center gap-2 text-xs font-sans text-foreground">
                    <Unlock size={11} />
                    <span className="tracking-[0.1em] uppercase">已解锁</span>
                  </div>
                  <button
                    onClick={() => setShowPublish(true)}
                    className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.15em] uppercase bg-foreground text-background px-5 py-2.5 hover:opacity-80 transition-opacity"
                  >
                    发布新文章 <ArrowRight size={12} />
                  </button>
                </div>
              )}
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
          {isLoading ? (
            <div className="py-20 text-center">
              <p className="font-display text-lg text-muted-foreground italic">加载中...</p>
            </div>
          ) : !posts || posts.length === 0 ? (
            <div className="py-20 text-center border-t border-border">
              <p className="font-display text-xl text-muted-foreground italic mb-3">
                {selectedCategory !== "全部"
                  ? `「${selectedCategory}」分类下暂无文章`
                  : "尚无文章，敬请期待..."}
              </p>
              {unlocked && (
                <button
                  onClick={() => setShowPublish(true)}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-sans tracking-[0.15em] uppercase border border-foreground px-5 py-2.5 hover:bg-foreground hover:text-background transition-colors"
                >
                  发布第一篇文章 <ArrowRight size={12} />
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-0">
              {posts.map((post, i) => (
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
