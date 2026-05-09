import { Link } from "wouter";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border mt-24">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-serif text-lg font-bold tracking-tight">JOURNAL</p>
            <p className="text-xs text-muted-foreground tracking-widest uppercase mt-1">
              个人博客与作品集
            </p>
          </div>
          <nav className="flex gap-6">
            {[
              { href: "/", label: "首页" },
              { href: "/about", label: "关于我" },
              { href: "/projects", label: "项目" },
              { href: "/blog", label: "博客" },
              { href: "/contact", label: "联系我" },
            ].map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="text-xs text-muted-foreground hover:text-foreground tracking-widest uppercase transition-colors cursor-pointer">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>
          <p className="text-xs text-muted-foreground tracking-wide">
            © {year} — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
