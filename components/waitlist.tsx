"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");

    // Replace with your actual waitlist endpoint (Mailchimp, Loops, etc.)
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("done");
  };

  return (
    <section id="waitlist" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-4">
            Early access
          </p>
          <h2 className="font-caveat text-5xl md:text-6xl text-foreground leading-tight mb-4">
            Get early access.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
            Recall is in private beta. Join the waitlist and we&apos;ll let you
            know when your spot opens up. Mac only. No credit card needed.
          </p>

          {status === "done" ? (
            <div className="inline-flex flex-col items-center gap-3 p-8 rounded-2xl border border-accent/30 bg-accent/5">
              <span className="text-3xl">✓</span>
              <p className="font-caveat text-2xl text-foreground">
                You&apos;re on the list.
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                We&apos;ll reach out when your spot opens up.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                aria-label="Email address"
                className="flex-1 px-4 py-3 rounded-xl border border-border bg-card font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 rounded-xl bg-foreground text-background font-mono text-sm hover:opacity-80 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === "loading" ? "Joining..." : "Join waitlist →"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="font-mono text-xs text-destructive mt-3">
              Something went wrong. Try again?
            </p>
          )}

          <p className="font-mono text-xs text-muted-foreground mt-6">
            No spam. No data sharing. Unsubscribe any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
