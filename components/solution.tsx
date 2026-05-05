"use client";

import { Binoculars, FolderSearch, Gauge } from "lucide-react";
import { Features } from "@/components/ui/features";

const solutionFeatures = [
  {
    id: 1,
    icon: Binoculars,
    label: "01",
    title: "Always watching",
    description:
      "Recall runs quietly in the background, indexing your work as it happens: messages, documents, emails, and tabs. On-device only. Nothing leaves your Mac.",
    detail: "No cloud. No account. No data policy to read.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 2,
    icon: FolderSearch,
    label: "02",
    title: "Understands context",
    description:
      "Not keyword matching. Recall builds a semantic index, so 'that email about the contract renewal' finds the email even if you never typed those words.",
    detail: "Powered by local ML models. Private by design.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 3,
    icon: Gauge,
    label: "03",
    title: "Surfaces instantly",
    description:
      "Results appear in under 100ms. Before you've finished your thought, Recall has closed the case. Exactly what you needed, exactly when you needed it.",
    detail: "Sub-100ms. Mac-native speed.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function Solution() {
  return (
    <Features
      id="solution"
      eyebrow="How it works"
      title="Recall keeps the case file."
      description="Everything you've ever seen on your Mac, indexed, searchable, and ready to surface the moment you need it."
      features={solutionFeatures}
      primaryColor="text-accent"
      progressGradientLight="bg-gradient-to-r from-foreground/60 to-accent"
      progressGradientDark="dark:from-foreground/70 dark:to-accent"
      className="bg-muted/20"
    />
  );
}
