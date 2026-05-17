import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You're in — Recall Early Access",
  description: "Thanks for joining Recall's early access list.",
};

export default function ThankYouPage() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 bg-background">
      {/* Subtle radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, oklch(0.75 0.18 56) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-md w-full text-center">
        {/* Check mark */}
        <div className="flex items-center justify-center mb-8">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: "oklch(0.21 0.010 56)",
              border: "1px solid oklch(0.30 0.012 56)",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        {/* Eyebrow */}
        <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-4">
          Early access confirmed
        </p>

        {/* Headline */}
        <h1 className="font-caveat text-5xl md:text-6xl text-foreground leading-tight mb-4">
          You&apos;re on the early access list.
        </h1>

        {/* Subtext */}
        <p className="text-base text-muted-foreground leading-relaxed mb-10">
          Thanks for checking out Recall. We&apos;ll reach out when your spot
          opens up — no spam, just an honest note when we&apos;re ready for you.
        </p>

        {/* Divider */}
        <div className="border-t border-border mb-8" />

        {/* What's next */}
        <div className="bg-card border border-border rounded-2xl px-6 py-5 text-left mb-8">
          <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3">
            What happens next
          </p>
          <ul className="space-y-2.5">
            {[
              "We review signups and open spots in small batches.",
              "You'll get a plain-text email when your access is ready.",
              "Early users shape what Recall becomes.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="text-accent mt-0.5 shrink-0">·</span>
                <span className="text-sm text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Back link */}
        <Link
          href="/"
          className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Recall
        </Link>
      </div>
    </main>
  );
}
