import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于我" },
  { href: "/projects", label: "项目" },
  { href: "/blog", label: "博客" },
  { href: "/contact", label: "联系我" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.98_0.008_80)/95] backdrop-blur-md border-b border-[oklch(0.85_0.01_70)]"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/">
            <span className="font-serif text-xl font-bold tracking-tight text-foreground cursor-pointer select-none">
              JOURNAL
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <span
                    className={`text-xs font-sans tracking-[0.15em] uppercase transition-colors cursor-pointer ${
                      location === link.href
                        ? "text-foreground border-b border-foreground pb-0.5"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[oklch(0.98_0.008_80)] border-t border-[oklch(0.85_0.01_70)] shadow-sm">
          <ul className="container py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <span
                    className={`block text-sm font-sans tracking-[0.12em] uppercase cursor-pointer ${
                      location === link.href
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
