export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a
            href="#"
            className="font-caveat text-2xl text-foreground tracking-tight"
          >
            Recall
          </a>

          {/* Links */}
          <nav className="flex items-center gap-6 flex-wrap justify-center">
            {[
              { label: "Features", href: "#features" },
              { label: "Compare", href: "#compare" },
              { label: "Waitlist", href: "#waitlist" },
              { label: "Privacy", href: "#" },
              { label: "Terms", href: "#" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="font-mono text-xs text-muted-foreground">
            © {year} Recall
          </p>
        </div>
      </div>
    </footer>
  );
}
