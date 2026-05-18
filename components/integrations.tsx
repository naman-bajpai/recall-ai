"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { Zap, ChevronDown } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import {
  SlackLogo,
  GmailLogo,
  NotionLogo,
  SafariLogo,
  NotesLogo,
  CalendarLogo,
  iMessageLogo,
  MoreAppsLogo,
} from "@/components/icons/integration-logos";

const integrationData = [
  {
    id: 1,
    title: "Slack",
    date: "Planned",
    content:
      "Recall indexes every message, thread, and DM across all your Slack workspaces. Search by topic, sender, or context — not just keywords.",
    category: "Messaging",
    icon: SlackLogo,
    relatedIds: [2, 5],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 2,
    title: "Gmail",
    date: "Planned",
    content:
      "Full inbox indexing — threads, attachments, labels. Ask 'that email about the contract renewal' and get the exact thread, instantly.",
    category: "Email",
    icon: GmailLogo,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 92,
  },
  {
    id: 3,
    title: "Notion",
    date: "Planned",
    content:
      "Pages, databases, and nested docs — all searchable. Recall understands your Notion workspace structure, not just raw text.",
    category: "Docs",
    icon: NotionLogo,
    relatedIds: [2, 4, 7],
    status: "completed" as const,
    energy: 88,
  },
  {
    id: 4,
    title: "Safari",
    date: "Planned",
    content:
      "Browser history, bookmarks, and open tabs — all indexed. Find any page you've ever visited, even if you've forgotten the URL.",
    category: "Browser",
    icon: SafariLogo,
    relatedIds: [3, 5],
    status: "completed" as const,
    energy: 80,
  },
  {
    id: 5,
    title: "Notes",
    date: "Planned",
    content:
      "Apple Notes indexed in real time. Every scrap, checklist, and voice transcription — surfaced in the same search as everything else.",
    category: "Notes",
    icon: NotesLogo,
    relatedIds: [1, 6],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 6,
    title: "Calendar",
    date: "Planned",
    content:
      "Search events, invites, and meeting notes. Ask 'when did we last sync with the design team?' and get the date, attendees, and notes.",
    category: "Calendar",
    icon: CalendarLogo,
    relatedIds: [5, 7],
    status: "in-progress" as const,
    energy: 65,
  },
  {
    id: 7,
    title: "iMessage",
    date: "Planned",
    content:
      "On-device message indexing, fully private. Search conversations by topic or contact without anything leaving your Mac.",
    category: "Messaging",
    icon: iMessageLogo,
    relatedIds: [1, 3],
    status: "in-progress" as const,
    energy: 55,
  },
  {
    id: 8,
    title: "More apps",
    date: "Planned",
    content:
      "Linear, Figma, GitHub, Jira, and more — on the roadmap. Every tool you use, one place to search them all.",
    category: "Roadmap",
    icon: MoreAppsLogo,
    relatedIds: [2, 6],
    status: "pending" as const,
    energy: 30,
  },
];

export default function Integrations() {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 18,
    mass: 0.7,
  });
  const timelineY = useTransform(smoothProgress, [0, 0.5, 1], [42, 0, -42]);
  const timelineOpacity = useTransform(smoothProgress, [0, 0.18, 0.85, 1], [0.45, 1, 1, 0.6]);

  return (
    <section id="integrations" className="border-t border-border" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10 md:pt-24 md:pb-12">
        <div className="grid lg:grid-cols-[minmax(0,430px)_minmax(0,1fr)] items-center gap-10 lg:gap-14">
          {/* Section header */}
          <motion.div
            className="lg:-translate-x-3"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-4">
              Integrations
            </p>
            <h2 className="font-caveat text-5xl md:text-6xl text-foreground leading-tight mb-4">
              One search. Every app.
            </h2>
            <p className="text-base text-muted-foreground max-w-md">
              Click any node to see how Recall will integrate with it. Share your interest to help us prioritise.
            </p>
          </motion.div>

          {/* Mobile: card grid */}
          <div className="sm:hidden grid grid-cols-2 gap-3">
            {integrationData.map((item) => {
              const Icon = item.icon;
              const isOpen = expandedId === item.id;
              return (
                <motion.div
                  key={item.id}
                  layout
                  className={`rounded-xl border bg-card/40 p-3.5 flex flex-col gap-2.5 cursor-pointer transition-colors duration-200 ${
                    isOpen ? "border-foreground/20 bg-card/70" : "border-border"
                  }`}
                  onClick={() => setExpandedId(isOpen ? null : item.id)}
                >
                  {/* Header row */}
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-muted/40 flex items-center justify-center">
                      <Icon size={22} />
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={14} className="text-muted-foreground" />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>

                  {/* Collapsed: short preview */}
                  {!isOpen && (
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.content}
                    </p>
                  )}

                  {/* Expanded: full details */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                          {item.content}
                        </p>

                        {/* Integration depth bar */}
                        <div className="mb-3">
                          <div className="flex justify-between items-center text-[10px] text-muted-foreground mb-1">
                            <span className="flex items-center gap-1">
                              <Zap size={9} />
                              Integration depth
                            </span>
                            <span className="font-mono">{item.energy}%</span>
                          </div>
                          <div className="w-full h-1 bg-muted/40 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${item.energy}%` }}
                              transition={{ duration: 0.4, ease: "easeOut" }}
                            />
                          </div>
                        </div>

                        {/* Related integrations */}
                        {item.relatedIds.length > 0 && (
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono mb-1.5">
                              Also searches
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {item.relatedIds.map((relId) => {
                                const rel = integrationData.find((d) => d.id === relId);
                                return (
                                  <button
                                    key={relId}
                                    className="text-[10px] px-2 py-0.5 rounded border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setExpandedId(relId);
                                    }}
                                  >
                                    {rel?.title}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop: orbital timeline */}
          <motion.div
            className="hidden sm:block w-full h-[520px] md:h-[620px] lg:h-[680px] lg:justify-self-end"
            style={{ y: timelineY, opacity: timelineOpacity }}
          >
            <RadialOrbitalTimeline timelineData={integrationData} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
