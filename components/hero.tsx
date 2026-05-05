"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import {
  RecallDockIcon,
  MailDockIcon,
  SlackDockIcon,
  AppleCalendarDockIcon,
  FinderDockIcon,
  SafariDockIcon,
  NotesDockIcon,
  MessagesDockIcon,
} from "@/components/icons/dock-icons";

const HeroWave = dynamic(
  () => import("@/components/ui/dynamic-wave-canvas-background"),
  { ssr: false }
);

// ─── Spotlight queries ────────────────────────────────────────────────────────

const queries: Array<{
  text: string;
  results: Array<{ icon: string; source: string; title: string; time: string }>;
}> = [
  {
    text: "slack message about Q3 budget",
    results: [
      {
        icon: "💬",
        source: "Slack · #finance",
        title: "Budget's tight but we can squeeze it in",
        time: "3 days ago",
      },
      {
        icon: "📧",
        source: "Gmail · Inbox",
        title: "Re: Q3 Budget Review",
        time: "2 days ago",
      },
      {
        icon: "📄",
        source: "Notion · Planning",
        title: "Q3 Budget & Headcount Doc",
        time: "last week",
      },
    ],
  },
  {
    text: "article Tim sent me last week",
    results: [
      {
        icon: "💬",
        source: "Slack · #general",
        title: "Tim: 'This piece on LLM memory is wild'",
        time: "5 days ago",
      },
      {
        icon: "🌐",
        source: "Safari · History",
        title: "The Memory Problem with AI Assistants",
        time: "5 days ago",
      },
    ],
  },
  {
    text: "notes from the product sync",
    results: [
      {
        icon: "📝",
        source: "Notes · Meetings",
        title: "Product Sync — Apr 14",
        time: "last Tuesday",
      },
      {
        icon: "📄",
        source: "Notion · Team",
        title: "Product Meeting Notes",
        time: "last Tuesday",
      },
      {
        icon: "📧",
        source: "Gmail",
        title: "Fwd: Product sync recap",
        time: "last Wednesday",
      },
    ],
  },
];

const TYPING_SPEED = 55;
const PAUSE_DURATION = 2800;
const CLEARING_SPEED = 28;

// ─── Spotlight search ─────────────────────────────────────────────────────────

function SpotlightSearch() {
  const [queryIndex, setQueryIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "showing" | "clearing">(
    "typing"
  );

  useEffect(() => {
    const current = queries[queryIndex];

    if (phase === "typing") {
      if (charIndex < current.text.length) {
        const t = setTimeout(
          () => setCharIndex((c) => c + 1),
          TYPING_SPEED + Math.random() * 30
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("showing"), 400);
      return () => clearTimeout(t);
    }

    if (phase === "showing") {
      const t = setTimeout(() => setPhase("clearing"), PAUSE_DURATION);
      return () => clearTimeout(t);
    }

    if (phase === "clearing") {
      if (charIndex > 0) {
        const t = setTimeout(() => setCharIndex((c) => c - 1), CLEARING_SPEED);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => {
        setQueryIndex((i) => (i + 1) % queries.length);
        setPhase("typing");
      }, 0);
      return () => clearTimeout(t);
    }
  }, [phase, charIndex, queryIndex]);

  const current = queries[queryIndex];
  const displayText = current.text.slice(0, charIndex);
  const showResults = phase === "showing";

  return (
    <div
      aria-label="Recall search demo"
      role="region"
      className="w-full max-w-[620px] rounded-2xl overflow-hidden"
      style={{
        background: "rgba(24, 24, 27, 0.82)",
        backdropFilter: "blur(60px) saturate(180%)",
        WebkitBackdropFilter: "blur(60px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow:
          "0 32px 80px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(255,255,255,0.06)",
      }}
    >
      {/* Input row */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.07]">
        <Search className="w-5 h-5 text-white/40 shrink-0" />
        <span className="font-mono text-[17px] text-white flex-1 min-h-[1.5rem] tracking-tight">
          {displayText}
          {phase !== "showing" && (
            <span className="inline-block w-[2px] h-[18px] bg-sky-400 ml-0.5 translate-y-[2px] animate-blink rounded-full" />
          )}
        </span>
        {showResults && (
          <span className="font-mono text-[11px] text-white/30 bg-white/8 border border-white/10 px-2 py-0.5 rounded-md">
            ⏎ open
          </span>
        )}
      </div>

      {/* Results */}
      <div
        className={`transition-all duration-300 ease-out ${
          showResults ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Category label */}
        <div className="px-5 pt-3 pb-1.5">
          <span
            className="font-mono text-[10px] text-white/35 tracking-[0.18em] uppercase"
          >
            Top Hits
          </span>
        </div>

        {/* Result rows */}
        {current.results.map((result, i) => (
          <div
            key={`${queryIndex}-${i}`}
            className="flex items-center gap-3 mx-2 mb-0.5 px-3 py-2.5 rounded-xl hover:bg-white/[0.10] cursor-default transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-lg shrink-0">
              {result.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[10px] text-white/38 mb-0.5">
                {result.source}
              </div>
              <div className="text-[13px] text-white/88 truncate">
                {result.title}
              </div>
            </div>
            <span className="font-mono text-[10px] text-white/28 shrink-0">
              {result.time}
            </span>
          </div>
        ))}

        <div className="h-2.5" />
      </div>
    </div>
  );
}

// ─── Mac menu bar ─────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Compare", href: "#compare" },
  { label: "Waitlist", href: "#waitlist" },
];

function MacMenuBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="absolute top-0 left-0 right-0 z-30 h-8 flex items-center select-none"
      style={{
        background: "rgba(0,0,0,0.38)",
        backdropFilter: "blur(24px) saturate(150%)",
        WebkitBackdropFilter: "blur(24px) saturate(150%)",
      }}
    >
      {/* Left: logo + nav links */}
      <div className="flex items-center gap-5 px-4 text-[13px] text-white">
        <span className="font-bold text-base leading-none">⌘</span>
        <a href="#" className="font-semibold tracking-tight hover:text-white/80 transition-colors">
          Recall
        </a>
        <span className="hidden md:block w-px h-3.5 bg-white/20" />
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-white/65 hover:text-white transition-colors hidden md:inline"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Right: Join Waitlist + system status */}
      <div className="ml-auto flex items-center gap-4 px-4">
        <a
          href="#waitlist"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-0.5 rounded-md font-mono text-[11px] text-white font-medium transition-colors hover:bg-white/20"
          style={{
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          Join Waitlist →
        </a>
        <div className="flex items-center gap-3 font-mono text-[12px] text-white/60">
          <span className="hidden sm:inline">Wi-Fi</span>
          <span className="opacity-40">·</span>
          <span className="text-white/75">{time}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Mac dock ─────────────────────────────────────────────────────────────────

type DockEntry =
  | { kind: "app"; label: string; Icon: React.FC<{ size?: number }>; active?: boolean }
  | { kind: "separator" };

const DOCK_APPS: DockEntry[] = [
  { kind: "app", label: "Recall",   Icon: RecallDockIcon,          active: true },
  { kind: "app", label: "Safari",   Icon: SafariDockIcon },
  { kind: "app", label: "Mail",     Icon: MailDockIcon },
  { kind: "app", label: "Messages", Icon: MessagesDockIcon },
  { kind: "app", label: "Notes",    Icon: NotesDockIcon },
  { kind: "app", label: "Slack",    Icon: SlackDockIcon },
  { kind: "app", label: "Calendar", Icon: AppleCalendarDockIcon },
  { kind: "separator" },
  { kind: "app", label: "Finder",   Icon: FinderDockIcon },
];

const ICON_SIZE    = 44;
const MAX_SCALE    = 1.42;
const SIGMA        = 82;   // px — spread of magnification

function MacDock() {
  const iconRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const [tooltip, setTooltip] = useState<string | null>(null);

  const applyScales = useCallback((mouseX: number | null) => {
    iconRefs.current.forEach((el) => {
      if (!el) return;
      if (mouseX === null) {
        el.style.transform = "translateY(0px) scale(1)";
        return;
      }
      const rect   = el.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const d      = Math.abs(mouseX - center);
      const scale  = 1 + (MAX_SCALE - 1) * Math.exp(-(d * d) / (2 * SIGMA * SIGMA));
      const lift = Math.max(0, (scale - 1) / (MAX_SCALE - 1)) * 7;
      el.style.transform = `translateY(-${lift.toFixed(2)}px) scale(${scale.toFixed(4)})`;
    });
  }, []);

  const handleMouseMove  = useCallback((e: React.MouseEvent) => applyScales(e.clientX), [applyScales]);
  const handleMouseLeave = useCallback(() => { applyScales(null); setTooltip(null); }, [applyScales]);

  /* assign refs only to "app" entries */
  let appIdx = -1;

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 hidden sm:block select-none">
      {/* Shelf */}
      <div
        className="relative flex items-end gap-1.5 px-3 py-2.5 rounded-[22px] overflow-visible"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.09) 100%)",
          backdropFilter:         "blur(48px) saturate(205%) brightness(108%)",
          WebkitBackdropFilter:   "blur(48px) saturate(205%) brightness(108%)",
          border:                 "0.5px solid rgba(255,255,255,0.58)",
          borderBottom:           "0.5px solid rgba(255,255,255,0.22)",
          boxShadow: [
            "0 14px 56px rgba(0,0,0,0.32)",
            "0 3px 12px rgba(0,0,0,0.2)",
            "inset 0 1px 0 rgba(255,255,255,0.80)",
            "inset 0 -1px 0 rgba(255,255,255,0.08)",
          ].join(", "),
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Liquid-glass specular layer */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[48%] rounded-t-[20px]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.28), rgba(255,255,255,0))",
          }}
        />

        {DOCK_APPS.map((entry, i) => {
          if (entry.kind === "separator") {
            return (
              <div
                key={`sep-${i}`}
                className="w-px mx-1.5 self-stretch my-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.30)" }}
              />
            );
          }

          appIdx++;
          const idx = appIdx; // capture for closure
          const { label, Icon, active } = entry;

          return (
            <div
              key={label}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setTooltip(label)}
              onMouseLeave={() => setTooltip(null)}
            >
              {/* Tooltip */}
              {tooltip === label && (
                <div
                  className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-white text-[11px] font-mono whitespace-nowrap pointer-events-none z-50"
                  style={{
                    background:   "rgba(30,30,32,0.82)",
                    backdropFilter: "blur(12px)",
                    border:       "0.5px solid rgba(255,255,255,0.14)",
                    boxShadow:    "0 2px 12px rgba(0,0,0,0.4)",
                  }}
                >
                  {label}
                  {/* Caret */}
                  <div
                    className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45"
                    style={{ background: "rgba(30,30,32,0.82)" }}
                  />
                </div>
              )}

              {/* Icon wrapper — scale applied here via ref */}
              <div
                ref={(el) => { iconRefs.current[idx] = el; }}
                className="cursor-pointer"
                style={{
                  transformOrigin: "bottom center",
                  transition:      "transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)",
                  willChange:      "transform",
                }}
              >
                <Icon size={ICON_SIZE} />
              </div>

              {/* Active dot */}
              {active && (
                <div className="w-1 h-1 mt-0.5 rounded-full bg-white/70" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full h-dvh min-h-[600px] overflow-hidden"
    >
      {/* Wallpaper */}
      <HeroWave />

      {/* Scrim — improves text contrast over the 3D scene */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-black/10 to-black/40 pointer-events-none" />

      {/* Menu bar */}
      <MacMenuBar />

      {/* Center content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5 pt-7 pb-28 px-4">
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <span className="font-mono text-[10px] text-white/50 tracking-[0.2em] uppercase">
            Recall for Mac
          </span>
          <span className="w-1 h-1 rounded-full bg-white/25" />
          <span className="font-mono text-[10px] text-white/50 tracking-[0.2em] uppercase">
            Private Beta
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
        >
          <h1 className="font-caveat text-5xl md:text-6xl lg:text-7xl text-white leading-tight drop-shadow-lg">
            Everything you&apos;ve worked on.
            <br />
            <span className="text-sky-300">Instantly findable.</span>
          </h1>
          <p className="text-[15px] text-white/60 mt-4 leading-snug">
            For Mac users who live across Slack, Gmail, Notion, and Safari.
          </p>
          <p className="font-mono text-[11px] text-white/45 mt-3 tracking-widest">
            ⌘ SPACE — ASK IN PLAIN ENGLISH
          </p>
        </motion.div>

        {/* Spotlight */}
        <motion.div
          className="w-full flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
        >
          <SpotlightSearch />
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 mt-1"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.52 }}
        >
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-gray-900 font-mono text-sm font-medium hover:bg-white/90 active:scale-95 transition-all shadow-lg"
          >
            Join the waitlist →
          </a>
          <a
            href="#integrations"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono text-sm text-white/75 hover:text-white transition-colors"
            style={{
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(8px)",
            }}
          >
            Explore integrations ↓
          </a>
        </motion.div>
      </div>

      {/* Dock */}
      <MacDock />
    </section>
  );
}
