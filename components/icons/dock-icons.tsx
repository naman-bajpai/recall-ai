import React from "react";
import { SlackLogo, SafariLogo, NotesLogo, iMessageLogo } from "./integration-logos";

interface DockIconProps {
  size?: number;
  className?: string;
}

// ── Recall ────────────────────────────────────────────────────────────────────
export const RecallDockIcon: React.FC<DockIconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="recall-dock-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#38BDF8" />
        <stop offset="1" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="recall-dock-shine" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="rgba(255,255,255,0.30)" />
        <stop offset="1" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#recall-dock-bg)" />
    {/* Glass shine */}
    <rect width="100" height="50" rx="22" fill="url(#recall-dock-shine)" />
    <rect y="28" width="100" height="22" fill="url(#recall-dock-shine)" />
    {/* Search circle */}
    <circle cx="44" cy="45" r="19" fill="none" stroke="white" strokeWidth="9" strokeLinecap="round" />
    {/* Handle */}
    <line x1="58" y1="59" x2="73" y2="74" stroke="white" strokeWidth="9" strokeLinecap="round" />
  </svg>
);

// ── Apple Mail ────────────────────────────────────────────────────────────────
export const MailDockIcon: React.FC<DockIconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="mail-dock-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#72C8FF" />
        <stop offset="1" stopColor="#0F6AEF" />
      </linearGradient>
      <linearGradient id="mail-dock-shine" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="rgba(255,255,255,0.35)" />
        <stop offset="1" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#mail-dock-bg)" />
    <rect width="100" height="46" rx="22" fill="url(#mail-dock-shine)" />
    <rect x="10" y="30" width="80" height="52" rx="8" fill="white" opacity="0.97" />
    <path
      d="M10 36 L50 62 L90 36"
      fill="none"
      stroke="#1672F0"
      strokeWidth="4.5"
      strokeLinejoin="round"
    />
    <path d="M10 80 L35 55 M90 80 L65 55" stroke="#1672F0" strokeWidth="2.2" opacity="0.25" />
  </svg>
);

// ── Slack (white background wrapper) ─────────────────────────────────────────
export const SlackDockIcon: React.FC<DockIconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="22" fill="white" />
    {/* Slack logo — centered and scaled */}
    <g transform="translate(15, 15) scale(0.286)">
      <g clipRule="evenodd" fillRule="evenodd">
        <path
          d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z"
          fill="#36c5f0"
        />
        <path
          d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z"
          fill="#2eb67d"
        />
        <path
          d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z"
          fill="#ecb22e"
        />
        <path
          d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0"
          fill="#e01e5a"
        />
      </g>
    </g>
  </svg>
);

// ── Apple Calendar ────────────────────────────────────────────────────────────
export const AppleCalendarDockIcon: React.FC<DockIconProps> = ({ size = 48, className }) => {
  const now = new Date();
  const day = now.getDate();
  const weekday = now.toLocaleString("en-US", { weekday: "short" }).toUpperCase();

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <clipPath id="cal-dock-clip">
          <rect width="100" height="100" rx="22" />
        </clipPath>
      </defs>
      <g clipPath="url(#cal-dock-clip)">
        <rect width="100" height="100" fill="white" />
        <rect width="100" height="32" fill="#FA3A34" />
        <rect y="32" width="100" height="1" fill="#F1C9C9" />
        <text
          x="50" y="20"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="13"
          fontWeight="600"
          fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
        >
          {weekday}
        </text>
        <text
          x="50" y="65"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#1C1C1E"
          fontSize="46"
          fontWeight="300"
          fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
        >
          {day}
        </text>
        <line x1="12" y1="86" x2="88" y2="86" stroke="#ECECF1" strokeWidth="1" />
      </g>
    </svg>
  );
};

// ── Finder ────────────────────────────────────────────────────────────────────
export const FinderDockIcon: React.FC<DockIconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <clipPath id="finder-dock-clip">
        <rect width="100" height="100" rx="22" />
      </clipPath>
      <linearGradient id="finder-dock-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#4B8EF5" />
        <stop offset="1" stopColor="#2B5DC7" />
      </linearGradient>
      <linearGradient id="finder-dock-right" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#85C4FC" />
        <stop offset="1" stopColor="#5BA8F5" />
      </linearGradient>
    </defs>
    <g clipPath="url(#finder-dock-clip)">
      <rect width="100" height="100" fill="url(#finder-dock-bg)" />
      <rect x="50" width="50" height="100" fill="url(#finder-dock-right)" />
      <line x1="50" y1="16" x2="50" y2="84" stroke="rgba(0,0,0,0.28)" strokeWidth="1.6" />
      <circle cx="35" cy="42" r="4" fill="#0E2F71" />
      <circle cx="65" cy="42" r="4" fill="#0E2F71" />
      <path d="M30 62 Q50 79 70 62" fill="none" stroke="#0E2F71" strokeWidth="3.8" strokeLinecap="round" />
      <path d="M30 61 L50 49 L70 61" fill="none" stroke="rgba(0,0,0,0.24)" strokeWidth="1.6" />
      <ellipse cx="50" cy="18" rx="36" ry="13" fill="rgba(255,255,255,0.22)" />
    </g>
  </svg>
);

// Re-export integration logos for use in dock
export { SafariLogo as SafariDockIcon, NotesLogo as NotesDockIcon, iMessageLogo as MessagesDockIcon };
