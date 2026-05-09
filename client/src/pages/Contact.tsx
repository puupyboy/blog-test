import { useState } from "react";
import { Mail, Github, Twitter, Send } from "lucide-react";
import { toast } from "sonner";

const contactLinks = [
  {
    icon: Mail,
    label: "邮件",
    value: "2434059108@qq.com",
    href: "mailto:2434059108@qq.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@puupyboy",
    href: "https://github.com/puupyboy",
  },
  {
    icon: Twitter,
    label: "微信WeChat",
    value: "y1363053589",
    href: "https://twitter.com/puupyboy",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("请填写所有字段");
      return;
    }
    setSending(true);
    // Simulate send
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    toast.success("消息已发送，感谢你的联系！");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Header */}
      <section className="pb-16 md:pb-20">
        <div className="container">
          <p className="text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground mb-6">
            联系我
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <h1 className="font-serif text-5xl md:text-6xl font-black leading-tight">
              让我们
              <br />
              <em className="font-display italic font-light">保持联系</em>
            </h1>
            <p className="font-display text-lg text-muted-foreground italic leading-relaxed pb-2">
              无论是项目合作、技术探讨，还是单纯想打个招呼，都欢迎通过以下方式联系我。我会尽快回复。
            </p>
          </div>
          <div className="w-12 h-px bg-foreground mt-8" />
        </div>
      </section>

      <section className="pb-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            {/* Contact Info */}
            <div className="md:col-span-4">
              <h2 className="font-serif text-2xl font-bold mb-8">联系方式</h2>
              <div className="space-y-6">
                {contactLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="mt-0.5 w-8 h-8 border border-border flex items-center justify-center flex-shrink-0 group-hover:border-foreground transition-colors">
                      <item.icon size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground mb-0.5">
                        {item.label}
                      </p>
                      <p className="font-display text-base text-foreground group-hover:opacity-70 transition-opacity">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-border">
                <p className="text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground mb-3">
                  响应时间
                </p>
                <p className="font-display text-base text-muted-foreground italic">
                  目前邮箱功能还未开通，请手动添加我~
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-8">
              <h2 className="font-serif text-2xl font-bold mb-8">发送消息</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground mb-2">
                      姓名
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="你的姓名"
                      className="w-full border border-border bg-transparent px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground mb-2">
                      邮箱
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full border border-border bg-transparent px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground mb-2">
                    消息
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="你想说的话..."
                    rows={6}
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.15em] uppercase border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? "发送中..." : <>发送消息 <Send size={13} /></>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
