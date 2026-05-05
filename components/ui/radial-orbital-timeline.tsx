"use client";
import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const orbitRotation = useMotionValue(0);
  const orbitRotationRef = useRef(0);
  const contentRotation = useTransform(orbitRotation, (latest) => -latest);

  useMotionValueEvent(orbitRotation, "change", (latest) => {
    orbitRotationRef.current = latest;
  });

  const normalizeAngle = (angle: number) => {
    const normalized = angle % 360;
    return normalized < 0 ? normalized + 360 : normalized;
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const nodeAngle = (nodeIndex / totalNodes) * 360;
    const targetAngle = normalizeAngle(270 - nodeAngle);
    const currentAngle = normalizeAngle(orbitRotation.get());
    const shortestDelta = ((targetAngle - currentAngle + 540) % 360) - 180;

    animate(orbitRotation, orbitRotationRef.current + shortestDelta, {
      type: "spring",
      stiffness: 120,
      damping: 22,
      mass: 0.9,
    });
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      Object.keys(prev).forEach((key) => {
        newState[parseInt(key)] = false;
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    if (!autoRotate) return;

    const controls = animate(orbitRotation, orbitRotation.get() + 360, {
      duration: 26,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });

    return () => controls.stop();
  }, [autoRotate, orbitRotation]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = (index / total) * 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    return { x, y };
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":   return "text-white bg-black border-white";
      case "in-progress": return "text-black bg-white border-black";
      case "pending":     return "text-white bg-black/40 border-white/50";
      default:            return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        {/* Central node (fixed, should not rotate with orbit) */}
        <div className="absolute w-24 h-24 rounded-full border border-white/40 bg-black/85 backdrop-blur-md flex items-center justify-center z-10 shadow-lg shadow-white/10">
          <div className="absolute w-32 h-32 rounded-full border border-white/15 animate-ping opacity-60" />
          <div
            className="absolute w-40 h-40 rounded-full border border-white/10 animate-ping opacity-40"
            style={{ animationDelay: "0.6s" }}
          />
          <span className="text-white font-semibold text-base tracking-wide">Recall</span>
        </div>

        <motion.div
          className="absolute w-full h-full flex items-center justify-center z-20"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            rotate: orbitRotation,
          }}
        >
          {/* Orbit ring */}
          <div className="absolute w-96 h-96 rounded-full border border-white/10" />

          {/* Nodes */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute cursor-pointer"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isExpanded ? 200 : 80,
                  transition: "opacity 220ms ease",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <motion.div style={{ rotate: contentRotation }}>
                  {/* Energy aura */}
                  <div
                    className={`absolute rounded-full ${isPulsing ? "animate-pulse" : ""}`}
                    style={{
                      background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
                      width: `${item.energy * 0.65 + 56}px`,
                      height: `${item.energy * 0.65 + 56}px`,
                      left: `-${(item.energy * 0.65 + 56 - 56) / 2}px`,
                      top: `-${(item.energy * 0.65 + 56 - 56) / 2}px`,
                    }}
                  />

                  {/* Icon button */}
                  <div
                    className={`
                      w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300
                      ${isExpanded  ? "bg-white text-black border-white shadow-lg shadow-white/30 scale-125"
                      : isRelated   ? "bg-white/50 text-black border-white animate-pulse"
                                    : "bg-black text-white border-white/40"}
                    `}
                  >
                    <Icon size={22} />
                  </div>

                  {/* Label */}
                  <div
                    className={`absolute top-12 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300 ${
                      isExpanded ? "text-white scale-125" : "text-white/70"
                    }`}
                    style={{ left: "50%", transform: isExpanded ? "translateX(-50%) scale(1.25)" : "translateX(-50%)" }}
                  >
                    {item.title}
                  </div>

                  {/* Expanded card */}
                  {isExpanded && (
                    <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-black/90 backdrop-blur-lg border-white/30 shadow-xl shadow-white/10 overflow-visible">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/50" />
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <Badge className={`px-2 text-xs ${getStatusStyles(item.status)}`}>
                            {item.status === "completed" ? "LIVE"
                              : item.status === "in-progress" ? "BETA"
                              : "COMING SOON"}
                          </Badge>
                          <span className="text-xs font-mono text-white/50">{item.date}</span>
                        </div>
                        <CardTitle className="text-sm mt-2 text-white">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs text-white/80">
                        <p>{item.content}</p>

                        {/* Energy bar */}
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <div className="flex justify-between items-center text-xs mb-1">
                            <span className="flex items-center gap-1">
                              <Zap size={10} />
                              Integration depth
                            </span>
                            <span className="font-mono">{item.energy}%</span>
                          </div>
                          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                              style={{ width: `${item.energy}%` }}
                            />
                          </div>
                        </div>

                        {/* Connected nodes */}
                        {item.relatedIds.length > 0 && (
                          <div className="mt-4 pt-3 border-t border-white/10">
                            <div className="flex items-center gap-1 mb-2">
                              <Link size={10} className="text-white/70" />
                              <h4 className="text-xs uppercase tracking-wider font-medium text-white/70">
                                Also searches
                              </h4>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {item.relatedIds.map((relatedId) => {
                                const relatedItem = timelineData.find((i) => i.id === relatedId);
                                return (
                                  <Button
                                    key={relatedId}
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center h-6 px-2 py-0 text-xs rounded-none border-white/20 bg-transparent hover:bg-white/10 text-white/80 hover:text-white transition-all"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleItem(relatedId);
                                    }}
                                  >
                                    {relatedItem?.title}
                                    <ArrowRight size={8} className="ml-1 text-white/60" />
                                  </Button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
