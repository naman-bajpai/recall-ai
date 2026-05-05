"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
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
    date: "Live",
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
    date: "Live",
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
    date: "Live",
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
    date: "Live",
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
    date: "Live",
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
    date: "Beta",
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
    date: "Beta",
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
    date: "Coming",
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
              Click any orbit node to see how Recall integrates with it. Live
              integrations ship with early access.
            </p>
          </motion.div>

          {/* Orbital timeline */}
          <motion.div
            className="w-full h-[520px] md:h-[620px] lg:h-[680px] lg:justify-self-end"
            style={{ y: timelineY, opacity: timelineOpacity }}
          >
            <RadialOrbitalTimeline timelineData={integrationData} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
