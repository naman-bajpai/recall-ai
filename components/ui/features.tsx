"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureItem {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  detail?: string;
  label?: string;
}

interface FeaturesProps {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  features: FeatureItem[];
  primaryColor?: string;
  progressGradientLight?: string;
  progressGradientDark?: string;
  className?: string;
}

export function Features({
  id,
  eyebrow,
  title,
  description,
  features,
  primaryColor = "text-accent",
  progressGradientLight = "bg-gradient-to-r from-foreground/70 to-accent",
  progressGradientDark = "bg-gradient-to-r from-foreground/70 to-accent",
  className,
}: FeaturesProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 100) return;

    const timeout = setTimeout(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
      setProgress(0);
    }, 200);

    return () => clearTimeout(timeout);
  }, [features.length, progress]);

  useEffect(() => {
    const activeFeatureElement = featureRefs.current[currentFeature];
    const container = containerRef.current;

    if (!activeFeatureElement || !container) return;

    const containerRect = container.getBoundingClientRect();
    const elementRect = activeFeatureElement.getBoundingClientRect();

    container.scrollTo({
      left:
        activeFeatureElement.offsetLeft -
        (containerRect.width - elementRect.width) / 2,
      behavior: "smooth",
    });
  }, [currentFeature]);

  const handleFeatureClick = (index: number) => {
    setCurrentFeature(index);
    setProgress(0);
  };

  return (
    <section
      id={id}
      className={cn("py-24 md:py-32 border-t border-border", className)}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {eyebrow}
          </p>
          <h2 className="font-caveat text-5xl leading-tight text-foreground md:text-6xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div
            ref={containerRef}
            className="order-2 flex snap-x gap-4 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] lg:order-1 lg:flex-col lg:gap-6 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = currentFeature === index;

              return (
                <div
                  key={feature.id}
                  ref={(el) => {
                    featureRefs.current[index] = el;
                  }}
                  className="relative min-w-[17rem] shrink-0 snap-center cursor-pointer lg:min-w-0"
                  onClick={() => handleFeatureClick(index)}
                >
                  <article
                    className={cn(
                      "grid h-full grid-cols-[auto_1fr] gap-4 rounded-xl p-4 transition-all duration-300 md:p-5",
                      isActive
                        ? "bg-card shadow-xl shadow-foreground/5 ring-1 ring-border"
                        : "bg-transparent opacity-70 hover:bg-muted/40 hover:opacity-100"
                    )}
                  >
                    <div
                      className={cn(
                        "flex size-11 items-center justify-center rounded-lg transition-all duration-300",
                        isActive
                          ? "bg-foreground text-background"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <Icon size={22} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0">
                      <div className="mb-2 flex items-center gap-3">
                        {feature.label ? (
                          <span
                            className={cn(
                              "font-mono text-xs tabular-nums",
                              isActive ? primaryColor : "text-muted-foreground"
                            )}
                          >
                            {feature.label}
                          </span>
                        ) : null}
                        <h3
                          className={cn(
                            "text-lg font-semibold text-foreground",
                            isActive ? "opacity-100" : "opacity-80"
                          )}
                        >
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                      {feature.detail ? (
                        <p className="mt-3 font-mono text-xs text-accent">
                          {feature.detail}
                        </p>
                      ) : null}
                      <div className="mt-4 h-1 overflow-hidden rounded-full bg-muted">
                        {isActive ? (
                          <motion.div
                            className={cn(
                              "h-full",
                              progressGradientLight,
                              progressGradientDark
                            )}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1, ease: "linear" }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          <div className="relative order-1 mx-auto w-full max-w-xl lg:order-2">
            <div className="absolute -inset-4 rounded-[2rem] bg-accent/10 blur-2xl" />
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/10"
            >
              <Image
                className="aspect-[4/3] w-full object-cover"
                src={features[currentFeature].image}
                alt={features[currentFeature].title}
                width={900}
                height={675}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
