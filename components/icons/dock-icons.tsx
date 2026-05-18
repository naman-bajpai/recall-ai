import React from "react";

interface DockIconProps {
  size?: number;
  className?: string;
}

// ── Recall ────────────────────────────────────────────────────────────────────
export const RecallDockIcon: React.FC<DockIconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="recall-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#38BDF8" />
        <stop offset="1" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="recall-shine" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="rgba(255,255,255,0.30)" />
        <stop offset="1" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
      <clipPath id="recall-clip"><rect width="100" height="100" rx="22"/></clipPath>
    </defs>
    <g clipPath="url(#recall-clip)">
      <rect width="100" height="100" fill="url(#recall-bg)" />
      <rect width="100" height="50" fill="url(#recall-shine)" />
    </g>
    <circle cx="44" cy="46" r="18" fill="none" stroke="white" strokeWidth="8.5" strokeLinecap="round" />
    <line x1="57" y1="59" x2="72" y2="74" stroke="white" strokeWidth="8.5" strokeLinecap="round" />
  </svg>
);

// ── Apple Mail ────────────────────────────────────────────────────────────────
export const MailDockIcon: React.FC<DockIconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="mail-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#5BC8FD" />
        <stop offset="1" stopColor="#0866EF" />
      </linearGradient>
      <clipPath id="mail-clip"><rect width="100" height="100" rx="22"/></clipPath>
    </defs>
    <g clipPath="url(#mail-clip)">
      <rect width="100" height="100" fill="url(#mail-bg)" />
      {/* Envelope body */}
      <rect x="11" y="32" width="78" height="50" rx="6" fill="white" />
      {/* Flap fold — classic M shape */}
      <path d="M11 38 L50 63 L89 38" fill="none" stroke="#1060E8" strokeWidth="3.5" strokeLinejoin="round" />
    </g>
  </svg>
);

// ── Slack ─────────────────────────────────────────────────────────────────────
export const SlackDockIcon: React.FC<DockIconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <clipPath id="slack-clip"><rect width="100" height="100" rx="22"/></clipPath>
    </defs>
    <g clipPath="url(#slack-clip)">
      <rect width="100" height="100" fill="white" />
      {/* Slack logo — correct scale: 70/2447.6 ≈ 0.02860 */}
      <g transform="translate(15,15) scale(0.02860)" fillRule="evenodd" clipRule="evenodd">
        <path d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z" fill="#36c5f0"/>
        <path d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z" fill="#2eb67d"/>
        <path d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z" fill="#ecb22e"/>
        <path d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0" fill="#e01e5a"/>
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
        <clipPath id="cal-dock-clip"><rect width="100" height="100" rx="22"/></clipPath>
      </defs>
      <g clipPath="url(#cal-dock-clip)">
        <rect width="100" height="100" fill="white" />
        <rect width="100" height="30" fill="#FA3A34" />
        <text x="50" y="19" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="13" fontWeight="600" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif">{weekday}</text>
        <text x="50" y="64" textAnchor="middle" dominantBaseline="middle" fill="#1C1C1E" fontSize="48" fontWeight="300" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif">{day}</text>
        <line x1="12" y1="88" x2="88" y2="88" stroke="#ECECF1" strokeWidth="1" />
      </g>
    </svg>
  );
};

// ── Finder ────────────────────────────────────────────────────────────────────
export const FinderDockIcon: React.FC<DockIconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <clipPath id="finder-clip"><rect width="100" height="100" rx="22"/></clipPath>
      <linearGradient id="finder-left" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#4C8EF7" />
        <stop offset="1" stopColor="#2550C6" />
      </linearGradient>
      <linearGradient id="finder-right" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#A8D8FF" />
        <stop offset="1" stopColor="#6AB8F5" />
      </linearGradient>
    </defs>
    <g clipPath="url(#finder-clip)">
      {/* Split face */}
      <rect width="50" height="100" fill="url(#finder-left)" />
      <rect x="50" width="50" height="100" fill="url(#finder-right)" />
      {/* Divider line */}
      <line x1="50" y1="12" x2="50" y2="88" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" />
      {/* Top highlight */}
      <ellipse cx="50" cy="16" rx="38" ry="10" fill="rgba(255,255,255,0.20)" />
      {/* Left eye */}
      <ellipse cx="33" cy="43" rx="7" ry="7.5" fill="white" />
      <circle cx="35" cy="44" r="4" fill="#16306B" />
      <circle cx="36.5" cy="42.5" r="1.2" fill="white" />
      {/* Right eye */}
      <ellipse cx="67" cy="43" rx="7" ry="7.5" fill="white" />
      <circle cx="69" cy="44" r="4" fill="#0A1E4A" />
      <circle cx="70.5" cy="42.5" r="1.2" fill="white" />
      {/* Smile */}
      <path d="M 28 64 Q 50 84 72 64" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
    </g>
  </svg>
);

// ── Safari ────────────────────────────────────────────────────────────────────
export const SafariDockIcon: React.FC<DockIconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="safari-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#26CCFF" />
        <stop offset="1" stopColor="#005EFF" />
      </linearGradient>
      <clipPath id="safari-clip"><rect width="100" height="100" rx="22"/></clipPath>
    </defs>
    <g clipPath="url(#safari-clip)">
      <rect width="100" height="100" fill="url(#safari-bg)" />
      {/* Compass bezel rings */}
      <circle cx="50" cy="50" r="40" fill="rgba(255,255,255,0.12)" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      {/* Cardinal tick marks */}
      <line x1="50" y1="11" x2="50" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="82" x2="50" y2="89" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="50" x2="18" y2="50" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="82" y1="50" x2="89" y2="50" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Diagonal ticks */}
      {[45, 135, 225, 315].map((deg) => {
        const r = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={50 + 38 * Math.sin(r)} y1={50 - 38 * Math.cos(r)}
            x2={50 + 33 * Math.sin(r)} y2={50 - 33 * Math.cos(r)}
            stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round"
          />
        );
      })}
      {/* N/S/E/W labels */}
      <text x="50" y="13.5" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="-apple-system, sans-serif">N</text>
      <text x="50" y="92.5" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="7" fontFamily="-apple-system, sans-serif">S</text>
      <text x="91" y="53" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="7" fontFamily="-apple-system, sans-serif">E</text>
      <text x="9" y="53" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="7" fontFamily="-apple-system, sans-serif">W</text>
      {/* Needle — north red, south white */}
      <polygon points="50,17 47,50 50,47 53,50" fill="#FF3B30" />
      <polygon points="50,83 47,50 50,53 53,50" fill="white" />
      <circle cx="50" cy="50" r="3.5" fill="white" />
      <circle cx="50" cy="50" r="1.8" fill="#ccc" />
    </g>
  </svg>
);

// ── Apple Notes ───────────────────────────────────────────────────────────────
export const NotesDockIcon: React.FC<DockIconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="notes-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFE566" />
        <stop offset="1" stopColor="#FFBB00" />
      </linearGradient>
      <clipPath id="notes-clip"><rect width="100" height="100" rx="22"/></clipPath>
    </defs>
    <g clipPath="url(#notes-clip)">
      <rect width="100" height="100" fill="url(#notes-bg)" />
      {/* Paper */}
      <rect x="16" y="14" width="68" height="72" rx="5" fill="rgba(255,255,255,0.85)" />
      {/* Title bar line */}
      <line x1="26" y1="32" x2="74" y2="32" stroke="#C9920A" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      {/* Body lines */}
      <line x1="26" y1="46" x2="74" y2="46" stroke="#C9920A" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
      <line x1="26" y1="58" x2="74" y2="58" stroke="#C9920A" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
      <line x1="26" y1="70" x2="58" y2="70" stroke="#C9920A" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
    </g>
  </svg>
);

// ── Messages ──────────────────────────────────────────────────────────────────
export const MessagesDockIcon: React.FC<DockIconProps> = ({ size = 48, className }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="msg-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#62F16E" />
        <stop offset="1" stopColor="#0DC420" />
      </linearGradient>
      <clipPath id="msg-clip"><rect width="100" height="100" rx="22"/></clipPath>
    </defs>
    <g clipPath="url(#msg-clip)">
      <rect width="100" height="100" fill="url(#msg-bg)" />
      {/* Speech bubble */}
      <path
        d="M18 26 Q18 16 28 16 L72 16 Q82 16 82 26 L82 58 Q82 68 72 68 L48 68 L36 82 L38 68 L28 68 Q18 68 18 58 Z"
        fill="white"
      />
    </g>
  </svg>
);

// Re-export aliases used in hero.tsx
export { SafariDockIcon as SafariLogo, NotesDockIcon as NotesLogo, MessagesDockIcon as iMessageLogo };
