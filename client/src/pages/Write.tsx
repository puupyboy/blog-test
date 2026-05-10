import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Copy, Check, Eye, FileCode } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function generateSlug(title: string): string {
  const timestamp = Date.now();
  const base = title
    .toLowerCase()
    .replace(/[\s\u4e00-\u9fa5]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);
  return `${base || "post"}-${timestamp}`;
}

function generateExcerpt(content: string): string {
  const plain = content
    .replace(/#+\s/g, "")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/`/g, "")
    .replace(/\n+/g, " ")
    .trim();
  return plain.length > 150 ? plain.slice(0, 150) + "..." : plain;
}

function generatePostCode(form: {
  title: string;
  category: string;
  content: string;
  excerpt: string;
  slug: string;
}): string {
  const now = new Date().toISOString();
  const excerpt = form.excerpt.trim() || generateExcerpt(form.content);
  const nextId = "/* 改为下一个序号 */";

  return `  {
    id: ${nextId},
    title: ${JSON.stringify(form.title)},
    slug: ${JSON.stringify(form.slug || generateSlug(form.title))},
    content: ${JSON.stringify(form.content)},
    excerpt: ${JSON.stringify(excerpt)},
    category: ${JSON.stringify(form.category || "未分类")},
    published: 1,
    createdAt: "${now}",
    updatedAt: "${now}",
  },`;
}

export default function Write() {
  const [form, setForm] = useState({
    title: "",
    category: "随笔",
    content: "",
    excerpt: "",
    slug: "",
  });
  const [preview, setPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const postCode = generatePostCode(form);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(postCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-24">
      {/* Header */}
      <div className="container mb-10">
        <Link href="/blog">
          <span className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <ArrowLeft size={12} />
            返回博客
          </span>
        </Link>
      </div>

      <section className="container pb-12">
        <div className="max-w-4xl">
          <p className="text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground mb-6">
            写作
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-black leading-tight mb-4">
            编写新文章
          </h1>
          <p className="text-sm font-sans text-muted-foreground leading-relaxed max-w-xl">
            在此处写完文章后，复制下方生成的代码，粘贴到{" "}
            <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
              client/src/data/posts.ts
            </code>{" "}
            的 allPosts 数组中即可发布。
          </p>
        </div>
      </section>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
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
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  placeholder="随笔 / 技术 / 读书..."
                  className="w-full border border-border bg-transparent px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground mb-2">
                Slug（可选，留空自动生成）
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="custom-url-slug"
                className="w-full border border-border bg-transparent px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground mb-2">
                摘要（可选，留空自动从正文提取）
              </label>
              <input
                type="text"
                value={form.excerpt}
                onChange={(e) =>
                  setForm({ ...form, excerpt: e.target.value })
                }
                placeholder="简短描述..."
                className="w-full border border-border bg-transparent px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground">
                  正文（Markdown）*
                </label>
                <button
                  type="button"
                  onClick={() => setPreview(!preview)}
                  className="inline-flex items-center gap-1.5 text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Eye size={12} />
                  {preview ? "编辑" : "预览"}
                </button>
              </div>
              {preview ? (
                <div className="min-h-[320px] border border-border p-6 prose-editorial overflow-auto bg-secondary/20">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {form.content || "（正文为空）"}
                  </ReactMarkdown>
                </div>
              ) : (
                <textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  placeholder={`# 文章标题\n\n正文内容支持 Markdown 格式...\n\n## 小节标题\n\n段落内容...`}
                  rows={16}
                  className="w-full border border-border bg-transparent px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
                />
              )}
            </div>
          </div>

          {/* Generated Code */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground">
                  生成的代码
                </label>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  {copied ? (
                    <>
                      <Check size={12} /> 已复制
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> 复制
                    </>
                  )}
                </button>
              </div>
              <pre className="border border-border bg-muted/30 p-5 text-xs font-mono whitespace-pre-wrap text-foreground overflow-auto max-h-[600px]">
                {postCode}
              </pre>
              <p className="mt-3 text-xs font-sans text-muted-foreground leading-relaxed">
                将上方代码复制后，打开{" "}
                <code className="bg-muted px-1 py-0.5 rounded">
                  client/src/data/posts.ts
                </code>{" "}
                ，添加到 allPosts 数组末尾（注意修改 id 序号），保存后重新部署即可。
              </p>
            </div>

            {/* Live Preview Card */}
            <div className="border border-border p-6">
              <div className="flex items-center gap-2 text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground mb-4">
                <FileCode size={12} />
                文章预览
              </div>
              <div className="border-t border-border pt-4">
                {form.title ? (
                  <div className="space-y-3">
                    <span className="text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground border border-border px-2 py-0.5">
                      {form.category || "未分类"}
                    </span>
                    <h3 className="font-serif text-xl font-bold">
                      {form.title}
                    </h3>
                    <p className="font-display text-sm text-muted-foreground italic leading-relaxed">
                      {form.excerpt.trim() || generateExcerpt(form.content) || "（暂无摘要）"}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    填写标题后此处会显示文章卡片预览...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
