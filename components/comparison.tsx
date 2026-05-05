"use client";

import { motion } from "framer-motion";

type Status = "yes" | "no" | "partial";

const features: Array<{
  label: string;
  recall: Status;
  spotlight: Status;
  raycast: Status;
}> = [
  { label: "Natural language queries",      recall: "yes", spotlight: "no",      raycast: "partial" },
  { label: "Cross-app (Slack, email, docs)", recall: "yes", spotlight: "no",      raycast: "partial" },
  { label: "Semantic understanding",         recall: "yes", spotlight: "no",      raycast: "no"      },
  { label: "Fully offline & private",        recall: "yes", spotlight: "yes",     raycast: "no"      },
  { label: "Email + Slack search",           recall: "yes", spotlight: "no",      raycast: "partial" },
  { label: "Sub-100ms results",              recall: "yes", spotlight: "yes",     raycast: "yes"     },
  { label: "Mac-native",                     recall: "yes", spotlight: "yes",     raycast: "yes"     },
];

function Dot({ status }: { status: Status }) {
  if (status === "yes") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8.5" className="stroke-accent" strokeWidth="1.5" strokeOpacity="0.25" />
        <circle cx="10" cy="10" r="4.5" className="fill-accent" />
      </svg>
    );
  }
  if (status === "partial") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="opacity-40">
        <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 1.5 A8.5 8.5 0 0 1 10 18.5 V1.5 Z" fill="currentColor" fillOpacity="0.7" />
      </svg>
    );
  }
  return <span className="block w-3.5 h-px bg-current opacity-20 rounded-full" />;
}

export default function Comparison() {
  return (
    <section id="compare" className="relative py-20 md:py-28 border-t border-border overflow-hidden">
      {/* Dotted background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="max-w-4xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-4">
            Comparison
          </p>
          <h2 className="font-caveat text-5xl md:text-6xl text-foreground leading-tight mb-5">
            How it stacks up.
          </h2>
          <p className="text-base text-muted-foreground max-w-[58ch] leading-relaxed">
            Spotlight is fast but shallow. Raycast is powerful but cloud-bound.
            Recall is the first tool that actually understands what you&apos;re
            looking for.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          className="overflow-x-auto -mx-6 px-6"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <div className="min-w-[540px]">

            {/* Column headers */}
            <div className="grid grid-cols-[1fr_164px_116px_116px]">
              <div />

              {/* Recall — highlighted */}
              <div className="flex flex-col items-center gap-1 px-4 pt-5 pb-4 rounded-t-2xl bg-accent/[0.07] border-x border-t border-accent/20">
                <span className="font-caveat text-[30px] leading-none text-accent">Recall</span>
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-accent/55">
                  Best fit
                </span>
              </div>

              <div className="flex items-end justify-center pb-4 px-2">
                <span className="font-mono text-[11px] tracking-wider uppercase text-muted-foreground/50">
                  Spotlight
                </span>
              </div>

              <div className="flex items-end justify-center pb-4 px-2">
                <span className="font-mono text-[11px] tracking-wider uppercase text-muted-foreground/50">
                  Raycast
                </span>
              </div>
            </div>

            {/* Rows */}
            {features.map((f, i) => {
              const isLast = i === features.length - 1;
              return (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                  className={`grid grid-cols-[1fr_164px_116px_116px] ${
                    !isLast ? "border-b border-border/40" : ""
                  }`}
                >
                  <div className="flex items-center py-[18px] pr-8">
                    <span className="text-[13.5px] text-foreground/75 leading-snug">{f.label}</span>
                  </div>

                  <div
                    className={`flex items-center justify-center py-[18px] bg-accent/[0.06] border-x border-accent/[0.15] ${
                      isLast ? "rounded-b-2xl border-b" : ""
                    }`}
                  >
                    <Dot status={f.recall} />
                  </div>

                  <div className="flex items-center justify-center py-[18px] text-muted-foreground">
                    <Dot status={f.spotlight} />
                  </div>

                  <div className="flex items-center justify-center py-[18px] text-muted-foreground">
                    <Dot status={f.raycast} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2">
          <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground/55">
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8.5" className="stroke-accent" strokeWidth="1.5" strokeOpacity="0.25" />
              <circle cx="10" cy="10" r="4.5" className="fill-accent" />
            </svg>
            Full support
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground/55">
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none" className="opacity-40 text-muted-foreground">
              <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 1.5 A8.5 8.5 0 0 1 10 18.5 V1.5 Z" fill="currentColor" fillOpacity="0.7" />
            </svg>
            Partial
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground/55">
            <span className="block w-3.5 h-px bg-current opacity-25 rounded-full" />
            Not supported
          </div>
        </div>

      </div>
    </section>
  );
}
