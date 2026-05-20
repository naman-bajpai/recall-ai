"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { EMPTY_UTMS, getEffectiveUTMs, type UTMParams } from "@/lib/utm";

const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_WEBHOOK_URL ??
  "https://script.google.com/macros/s/AKfycbyxuWxWeaaXQPNzqBByPpDTheRpKAhd05Tro3Hgw56hLEKrnH6k-mu6VjXh-12VSM7N/exec";

function useUTMParams(): UTMParams {
  const [utms, setUtms] = useState<UTMParams>(EMPTY_UTMS);

  useEffect(() => {
    setUtms(getEffectiveUTMs());
  }, []);

  return utms;
}

export default function Waitlist() {
  const router = useRouter();
  const utms = useUTMParams();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [intent, setIntent] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");

    const payload = {
      candidate_id: "recall",
      product_name: "Recall",
      product_slug: "recall",
      subdomain: "https://recall.remyndai.com",
      lead_name: name,
      lead_email: email,
      lead_company_role: role,
      company_school: "",
      source: utms.utm_source || "direct",
      channel: utms.utm_medium || "organic",
      campaign: utms.utm_campaign || "phase2",
      utm_source: utms.utm_source,
      utm_medium: utms.utm_medium,
      utm_campaign: utms.utm_campaign,
      utm_content: utms.utm_content,
      referrer: typeof document !== "undefined" ? document.referrer : "",
      landing_page_url:
        typeof window !== "undefined" ? window.location.href : "",
      confirmation_page_url: "https://recall.remyndai.com/thank-you",
      intent_signal: intent,
      notes_from_lead: intent,
      custom_question: "What would you use Recall for?",
      custom_answer: intent,
      consent_captured: "Yes",
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });
      router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="waitlist" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="max-w-xl mx-auto text-center"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-4">
            Early access
          </p>
          <h2 className="font-caveat text-5xl md:text-6xl text-foreground leading-tight mb-4">
            Join early access.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
            We are looking for early interest and we&apos;ll contact you once
            we start our testing.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 text-left"
          >
            {/* Email — required */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="wl-email"
                className="font-mono text-xs text-muted-foreground"
              >
                Email <span className="text-accent">*</span>
              </label>
              <input
                id="wl-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                aria-label="Email address"
                className="px-4 py-3 rounded-xl border border-border bg-card font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
              />
            </div>

            {/* Name — optional */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="wl-name"
                className="font-mono text-xs text-muted-foreground"
              >
                Name{" "}
                <span className="opacity-50 font-normal">(optional)</span>
              </label>
              <input
                id="wl-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex"
                aria-label="Your name"
                className="px-4 py-3 rounded-xl border border-border bg-card font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
              />
            </div>

            {/* Role — optional */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="wl-role"
                className="font-mono text-xs text-muted-foreground"
              >
                Role / context{" "}
                <span className="opacity-50 font-normal">(optional)</span>
              </label>
              <select
                id="wl-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                aria-label="Your role or context"
                className="px-4 py-3 rounded-xl border border-border bg-card font-mono text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow appearance-none"
              >
                <option value="" disabled>Select your role…</option>
                <option value="Founder">Founder</option>
                <option value="Student">Student</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Engineer">Engineer</option>
                <option value="Designer">Designer</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Researcher">Researcher</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Intent — optional */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="wl-intent"
                className="font-mono text-xs text-muted-foreground"
              >
                What would you use Recall for?{" "}
                <span className="opacity-50 font-normal">(optional)</span>
              </label>
              <textarea
                id="wl-intent"
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                placeholder="e.g. Tracking follow-ups after sales calls, finding links people shared with me…"
                aria-label="What would you use Recall for?"
                rows={3}
                className="px-4 py-3 rounded-xl border border-border bg-card font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-2 w-full px-6 py-3.5 rounded-xl bg-foreground text-background font-mono text-sm font-medium hover:opacity-80 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Submitting…" : "Join early access →"}
            </button>

            {status === "error" && (
              <p className="font-mono text-xs text-destructive text-center mt-1">
                Something went wrong. Please try again.
              </p>
            )}
          </form>

          <p className="font-mono text-xs text-muted-foreground mt-6">
            No spam. No data sharing. Unsubscribe any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
