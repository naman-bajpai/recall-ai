"use client";

import { useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { EyeOff, KeyRound, Lock, UserX } from "lucide-react";
import { Features6 } from "@/components/ui/features-6";

// ── Feature cards ─────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Lock,
    title: "On-device only",
    description:
      "All indexing and search runs entirely on your Mac. Nothing is ever sent to a server.",
  },
  {
    icon: EyeOff,
    title: "Zero telemetry",
    description:
      "We track nothing. No analytics, no crash reports, no search queries leave your machine.",
  },
  {
    icon: UserX,
    title: "No account required",
    description:
      "Download and run. No email, no sign-up, no subscription needed to get started.",
  },
  {
    icon: KeyRound,
    title: "Encrypted index",
    description:
      "Your search index is encrypted with your Mac's Keychain. Only you hold the key.",
  },
];

// ── Layout constants ──────────────────────────────────────────────────────────

const VW = 860;
const VH = 320;

const MAC   = { x: 460, y: VH / 2 };
const CLOUD = { x: 768, y: VH / 2 };
const BLOCK = { x: 622, y: VH / 2 };

const APPS = [
  { name: "Slack",    color: "#E01E5A" },
  { name: "Gmail",    color: "#EA4335" },
  { name: "Notion",   color: "#A78BFA" },
  { name: "Safari",   color: "#38BDF8" },
  { name: "Notes",    color: "#FBBF24" },
  { name: "iMessage", color: "#34D399" },
];

const CHIP_W     = 86;
const CHIP_H     = 28;
const CHIP_GAP   = 11;
const CHIP_X     = 16;
const TOTAL_H    = APPS.length * CHIP_H + (APPS.length - 1) * CHIP_GAP;
const CHIP_START = (VH - TOTAL_H) / 2;

const N_PARTICLES = 3;   // per path
const SPEED       = 0.00021; // progress per ms  (full path ≈ 4.8 s)

// ── Helpers ───────────────────────────────────────────────────────────────────

const chipCY = (i: number) =>
  CHIP_START + i * (CHIP_H + CHIP_GAP) + CHIP_H / 2;

const pathD = (i: number) => {
  const sx = CHIP_X + CHIP_W;
  const sy = chipCY(i);
  const ex = MAC.x - 30;
  const ey = MAC.y;
  const mx = (sx + ex) / 2;
  return `M ${sx} ${sy} C ${mx} ${sy} ${mx} ${ey} ${ex} ${ey}`;
};

// ── Flow animation visual ─────────────────────────────────────────────────────

function FlowVisual() {
  const pathEls = useRef<(SVGPathElement | null)[]>([]);
  const dotEls  = useRef<(SVGCircleElement | null)[]>([]);
  const lengths = useRef<number[]>([]);

  // Stagger initial positions so particles are spread along each path
  const progress = useRef<number[]>(
    APPS.flatMap((_, ai) =>
      Array.from({ length: N_PARTICLES }, (_, pi) =>
        (pi / N_PARTICLES + ai * 0.19) % 1
      )
    )
  );

  useAnimationFrame((_, dt) => {
    APPS.forEach((app, ai) => {
      const path = pathEls.current[ai];
      if (!path) return;

      // Cache total length to avoid forced reflows every frame
      if (!lengths.current[ai]) {
        lengths.current[ai] = path.getTotalLength();
      }
      const L = lengths.current[ai];

      for (let pi = 0; pi < N_PARTICLES; pi++) {
        const idx = ai * N_PARTICLES + pi;
        progress.current[idx] = (progress.current[idx] + dt * SPEED) % 1;

        const dot = dotEls.current[idx];
        if (!dot) continue;

        const t  = progress.current[idx];
        const pt = path.getPointAtLength(t * L);

        dot.setAttribute("cx", pt.x.toFixed(1));
        dot.setAttribute("cy", pt.y.toFixed(1));

        // Fade in over first 10%, full opacity, fade out over last 12%
        const op = t < 0.10 ? t / 0.10 : t > 0.88 ? (1 - t) / 0.12 : 1;
        dot.setAttribute("opacity", op.toFixed(2));
      }
    });
  });

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #060911 0%, #0b1421 55%, #060911 100%)",
      }}
    >
      {/* Edge fades so it blends into the section background */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-background/70 via-transparent to-background/70" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-background/85" />

      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="relative z-20 block w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Shared particle glow */}
          <filter id="pglow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="2.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Mac center glow */}
          <filter id="mac-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="7" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Red blocker glow */}
          <filter id="red-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feColorMatrix
              in="b" type="matrix"
              values="1 0 0 0 0.25  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0"
              result="rb"
            />
            <feMerge>
              <feMergeNode in="rb" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Guide paths (faint coloured trails) ─── */}
        {APPS.map((app, i) => (
          <path
            key={`guide-${i}`}
            ref={el => { pathEls.current[i] = el; }}
            d={pathD(i)}
            fill="none"
            stroke={app.color}
            strokeOpacity={0.10}
            strokeWidth={1.4}
          />
        ))}

        {/* ── Particles ─── */}
        {APPS.flatMap((app, ai) =>
          Array.from({ length: N_PARTICLES }, (_, pi) => (
            <circle
              key={`dot-${ai}-${pi}`}
              ref={el => { dotEls.current[ai * N_PARTICLES + pi] = el; }}
              r={pi === 0 ? 3.5 : 2.2}
              fill={app.color}
              filter="url(#pglow)"
            />
          ))
        )}

        {/* ── App chips (left column) ─── */}
        {APPS.map((app, i) => {
          const ty = CHIP_START + i * (CHIP_H + CHIP_GAP);
          const cy = ty + CHIP_H / 2;
          return (
            <g key={app.name}>
              {/* Background pill */}
              <rect
                x={CHIP_X} y={ty}
                width={CHIP_W} height={CHIP_H} rx={6}
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.07)"
                strokeWidth={0.5}
              />
              {/* Left accent bar */}
              <rect
                x={CHIP_X} y={ty + 5}
                width={2.5} height={CHIP_H - 10} rx={1.5}
                fill={app.color} opacity={0.75}
              />
              {/* Coloured dot */}
              <circle cx={CHIP_X + 14} cy={cy} r={3.5} fill={app.color} opacity={0.88} />
              {/* Name */}
              <text
                x={CHIP_X + 23} y={cy + 4}
                fontSize={10} fill="rgba(255,255,255,0.62)"
                fontFamily="ui-monospace, SFMono-Regular, monospace"
              >
                {app.name}
              </text>
            </g>
          );
        })}

        {/* ── Mac node (center) ─── */}
        <g>
          {/* Ambient halo */}
          <circle cx={MAC.x} cy={MAC.y} r={52} fill="#0EA5E9" fillOpacity={0.04} />
          {/* Breathing ring via framer-motion */}
          <motion.circle
            cx={MAC.x} cy={MAC.y} r={40} fill="none"
            stroke="#38BDF8" strokeWidth={1}
            animate={{ r: [37, 44, 37], strokeOpacity: [0.08, 0.22, 0.08] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Body rect */}
          <rect
            x={MAC.x - 30} y={MAC.y - 19}
            width={60} height={38} rx={8}
            fill="rgba(14,165,233,0.10)"
            stroke="#38BDF8" strokeOpacity={0.45} strokeWidth={1}
            filter="url(#mac-glow)"
          />
          {/* Lock icon (inline SVG paths, no lucide dependency in SVG context) */}
          <g
            transform={`translate(${MAC.x - 8}, ${MAC.y - 9})`}
            stroke="#7DD3FC" strokeWidth={1.3} strokeLinecap="round" fill="none"
          >
            <rect x={0.5} y={6.5} width={15} height={10} rx={2.5}
              fill="rgba(125,211,252,0.12)" stroke="#7DD3FC" strokeWidth={1.1} />
            <path d="M3.5 6.5 V4.5 a4.5 4.5 0 0 1 9 0 V6.5" />
            <circle cx={8} cy={12} r={1.3} fill="#7DD3FC" stroke="none" />
          </g>
          {/* Label */}
          <text
            x={MAC.x} y={MAC.y + 29}
            textAnchor="middle" fontSize={7.5}
            fill="#38BDF8" fillOpacity={0.5}
            fontFamily="ui-monospace, SFMono-Regular, monospace"
            letterSpacing={1.5}
          >
            YOUR MAC
          </text>
        </g>

        {/* ── Dashed blocked line → cloud ─── */}
        <line
          x1={MAC.x + 30} y1={MAC.y}
          x2={CLOUD.x - 28} y2={CLOUD.y}
          stroke="#EF4444" strokeOpacity={0.12}
          strokeWidth={1} strokeDasharray="4 5"
        />

        {/* ── Blocker X ─── */}
        <g filter="url(#red-glow)">
          <motion.circle
            cx={BLOCK.x} cy={BLOCK.y} r={11}
            fill="rgba(239,68,68,0.08)"
            stroke="#EF4444" strokeWidth={0.8}
            animate={{ strokeOpacity: [0.3, 0.75, 0.3], r: [10, 12, 10] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <line
            x1={BLOCK.x - 4.5} y1={BLOCK.y - 4.5}
            x2={BLOCK.x + 4.5} y2={BLOCK.y + 4.5}
            stroke="#EF4444" strokeWidth={1.6} strokeLinecap="round"
          />
          <line
            x1={BLOCK.x + 4.5} y1={BLOCK.y - 4.5}
            x2={BLOCK.x - 4.5} y2={BLOCK.y + 4.5}
            stroke="#EF4444" strokeWidth={1.6} strokeLinecap="round"
          />
        </g>

        {/* ── Cloud node (right, dimmed) ─── */}
        <g opacity={0.28}>
          <circle
            cx={CLOUD.x} cy={CLOUD.y} r={30}
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.18)" strokeWidth={0.8}
          />
          <path
            d={`M ${CLOUD.x - 16} ${CLOUD.y + 5}
                C ${CLOUD.x - 23} ${CLOUD.y + 5} ${CLOUD.x - 24} ${CLOUD.y - 3} ${CLOUD.x - 15} ${CLOUD.y - 6}
                C ${CLOUD.x - 19} ${CLOUD.y - 16} ${CLOUD.x - 6}  ${CLOUD.y - 17} ${CLOUD.x - 2} ${CLOUD.y - 9}
                C ${CLOUD.x + 2}  ${CLOUD.y - 18} ${CLOUD.x + 17} ${CLOUD.y - 13} ${CLOUD.x + 17} ${CLOUD.y - 4}
                C ${CLOUD.x + 23} ${CLOUD.y - 2}  ${CLOUD.x + 22} ${CLOUD.y + 6}  ${CLOUD.x + 15} ${CLOUD.y + 5}
                Z`}
            fill="none"
            stroke="rgba(255,255,255,0.38)"
            strokeWidth={1}
          />
          <text
            x={CLOUD.x} y={CLOUD.y + 22}
            textAnchor="middle" fontSize={7}
            fill="rgba(255,255,255,0.3)"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
            letterSpacing={1.5}
          >
            CLOUD
          </text>
        </g>

        {/* ── Bottom caption labels ─── */}
        <text
          x={(CHIP_X + CHIP_W + MAC.x) / 2} y={VH - 10}
          textAnchor="middle" fontSize={7}
          fill="rgba(56,189,248,0.28)"
          fontFamily="ui-monospace, SFMono-Regular, monospace"
          letterSpacing={2.5}
        >
          INDEXED LOCALLY · ENCRYPTED
        </text>
        <text
          x={(MAC.x + CLOUD.x) / 2} y={VH - 10}
          textAnchor="middle" fontSize={7}
          fill="rgba(239,68,68,0.28)"
          fontFamily="ui-monospace, SFMono-Regular, monospace"
          letterSpacing={2.5}
        >
          NEVER UPLOADED
        </text>
      </svg>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export function Privacy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Features6
        eyebrow="Privacy"
        heading={
          <>
            Your data stays on{" "}
            <span className="text-sky-400">your Mac.</span>
          </>
        }
        subheading="Unlike cloud-based tools, Recall never uploads your files, messages, or browsing history. Everything is indexed locally, searched locally, and stays local — always."
        visual={<FlowVisual />}
        features={FEATURES}
      />
    </motion.div>
  );
}
