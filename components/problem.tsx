"use client";

import { FilePenLine, MessageSquareText, TimerReset } from "lucide-react";
import { Features } from "@/components/ui/features";

const problemFeatures = [
  {
    id: 1,
    icon: TimerReset,
    label: "20 min lost",
    title: "The link was in Slack",
    description:
      "You spent twenty minutes digging through Slack for a link someone sent last month. You knew it was there.",
    detail: "The information existed. Retrieval failed.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 2,
    icon: FilePenLine,
    label: "2nd time written",
    title: "The summary already existed",
    description:
      "You rewrote a summary you know you typed somewhere in March. It existed. You just couldn't find it.",
    detail: "Your Mac had seen it. You had to recreate it.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 3,
    icon: MessageSquareText,
    label: "Again asked",
    title: "The specs were already read",
    description:
      "You asked a colleague for the specs. You'd already read them. You just couldn't remember where.",
    detail: "The problem isn't memory. It's retrieval.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function Problem() {
  return (
    <Features
      id="problem"
      eyebrow="The problem"
      title="You've found it before. You just can't find it again."
      description="The information exists. You put it there. Your Mac has seen everything you've worked on. It just never knew how to give it back."
      features={problemFeatures}
      primaryColor="text-accent"
      progressGradientLight="bg-gradient-to-r from-foreground/60 to-accent"
      progressGradientDark="dark:from-foreground/70 dark:to-accent"
    />
  );
}
