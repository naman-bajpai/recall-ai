"use client";

import { type LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeaturesProps {
  eyebrow?: string;
  heading: React.ReactNode;
  subheading: string;
  visual: React.ReactNode;
  features: Feature[];
}

export function Features6({
  eyebrow,
  heading,
  subheading,
  visual,
  features,
}: FeaturesProps) {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl space-y-12 px-6">
        {/* Header */}
        <div className="relative z-10 grid items-center gap-4 md:grid-cols-2 md:gap-12">
          <div className="space-y-3">
            {eyebrow && (
              <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                {eyebrow}
              </p>
            )}
            <h2 className="font-caveat text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
              {heading}
            </h2>
          </div>
          <p className="max-w-sm sm:ml-auto text-muted-foreground leading-relaxed">
            {subheading}
          </p>
        </div>

        {/* Visual */}
        <div className="relative rounded-3xl overflow-hidden md:-mx-8">
          {visual}
        </div>

        {/* Feature grid */}
        <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="space-y-3">
              <div className="flex items-center gap-2">
                <Icon className="size-4 shrink-0" />
                <h3 className="text-sm font-medium">{title}</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
