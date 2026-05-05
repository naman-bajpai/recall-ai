import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
}

export const SlackLogo: React.FC<LogoProps> = ({ size = 16, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 2447.6 2452.5"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
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
  </svg>
);

export const GmailLogo: React.FC<LogoProps> = ({ size = 16, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 512 399"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g fill="none" fillRule="evenodd">
      <g fillRule="nonzero">
        <path fill="#4285f4" d="M34.91 399h81.454V201.6L0 114.3V364.09C0 383.38 15.622 399 34.91 399z" />
        <path fill="#34a853" d="M395.636 399h81.455c19.287 0 34.909-15.622 34.909-34.909V114.3L395.636 201.6z" />
        <path fill="#fbbc04" d="M395.636 50.3V201.6L512 114.3V67.75c0-43.14-49.25-67.78-83.782-41.89z" />
      </g>
      <path fill="#ea4335" d="M116.364 201.6V50.3L256 155.05 395.636 50.3V201.6L256 306.33z" />
      <path fill="#c5221f" fillRule="nonzero" d="M0 67.75v46.55L116.364 201.6V50.3L83.782 25.86C49.25 0 0 24.61 0 67.75z" />
    </g>
  </svg>
);

export const NotionLogo: React.FC<LogoProps> = ({ size = 16, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 256 268"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fill="#FFF"
      d="M16.092 11.538 164.09.608c18.179-1.56 22.85-.508 34.28 7.801l47.243 33.282C253.406 47.414 256 48.975 256 55.207v182.527c0 11.439-4.155 18.205-18.696 19.24L65.44 267.378c-10.913.517-16.11-1.043-21.825-8.327L8.826 213.814C2.586 205.487 0 199.254 0 191.97V29.726c0-9.352 4.155-17.153 16.092-18.188Z"
    />
    <path d="M164.09.608 16.092 11.538C4.155 12.573 0 20.374 0 29.726v162.245c0 7.284 2.585 13.516 8.826 21.843l34.789 45.237c5.715 7.284 10.912 8.844 21.825 8.327l171.864-10.404c14.532-1.035 18.696-7.801 18.696-19.24V55.207c0-5.911-2.336-7.614-9.21-12.66l-1.185-.856L198.37 8.409C186.94.1 182.27-.952 164.09.608ZM69.327 52.22c-14.033.945-17.216 1.159-25.186-5.323L23.876 30.778c-2.06-2.086-1.026-4.69 4.163-5.207l142.274-10.395c11.947-1.043 18.17 3.12 22.842 6.758l24.401 17.68c1.043.525 3.638 3.637.517 3.637L71.146 52.095l-1.819.125Zm-16.36 183.954V81.222c0-6.767 2.077-9.887 8.3-10.413L230.02 60.93c5.724-.517 8.31 3.12 8.31 9.879v153.917c0 6.767-1.044 12.49-10.387 13.008l-161.487 9.361c-9.343.517-13.489-2.594-13.489-10.921ZM212.377 89.53c1.034 4.681 0 9.362-4.681 9.897l-7.783 1.542v114.404c-6.758 3.637-12.981 5.715-18.18 5.715-8.308 0-10.386-2.604-16.609-10.396l-50.898-80.079v77.476l16.1 3.646s0 9.362-12.989 9.362l-35.814 2.077c-1.043-2.086 0-7.284 3.63-8.318l9.351-2.595V109.823l-12.98-1.052c-1.044-4.68 1.55-11.439 8.826-11.965l38.426-2.585 52.958 81.113v-71.76l-13.498-1.552c-1.043-5.733 3.111-9.896 8.3-10.404l35.84-2.087Z" />
  </svg>
);

export const SafariLogo: React.FC<LogoProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="safari-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#1AC8FB" />
        <stop offset="1" stopColor="#1A6FFF" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="50" fill="url(#safari-bg)" />
    <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
    {/* Compass tick marks */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
      const r = Math.PI * angle / 180;
      const x1 = 50 + 42 * Math.sin(r);
      const y1 = 50 - 42 * Math.cos(r);
      const x2 = 50 + 36 * Math.sin(r);
      const y2 = 50 - 36 * Math.cos(r);
      return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.5)" strokeWidth={angle % 90 === 0 ? 2 : 1} />;
    })}
    {/* N / S / E / W labels */}
    <text x="50" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="600" fontFamily="sans-serif">N</text>
    <text x="50" y="90" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="sans-serif">S</text>
    <text x="88" y="53" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="sans-serif">E</text>
    <text x="12" y="53" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="sans-serif">W</text>
    {/* Needle — north red, south white */}
    <polygon points="50,20 46,50 50,46 54,50" fill="#FF3B30" />
    <polygon points="50,80 46,50 50,54 54,50" fill="white" />
    <circle cx="50" cy="50" r="3" fill="white" />
  </svg>
);

export const NotesLogo: React.FC<LogoProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="notes-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFE566" />
        <stop offset="1" stopColor="#FFCC00" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="20" fill="url(#notes-bg)" />
    {/* White paper area */}
    <rect x="18" y="18" width="64" height="64" rx="4" fill="white" opacity="0.5" />
    {/* Ruled lines */}
    <line x1="28" y1="38" x2="72" y2="38" stroke="#B8950A" strokeWidth="3" strokeLinecap="round" />
    <line x1="28" y1="50" x2="72" y2="50" stroke="#B8950A" strokeWidth="3" strokeLinecap="round" />
    <line x1="28" y1="62" x2="58" y2="62" stroke="#B8950A" strokeWidth="3" strokeLinecap="round" />
    {/* Pencil / title area */}
    <line x1="28" y1="28" x2="72" y2="28" stroke="#B8950A" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
  </svg>
);

export const CalendarLogo: React.FC<LogoProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g clipPath="url(#cal-clip)">
      <path d="M390.736 121.264H121.264V390.736H390.736V121.264Z" fill="white" />
      <path d="M390.736 512L512 390.736L451.368 380.392L390.736 390.736L379.67 446.196L390.736 512Z" fill="#EA4335" />
      <path d="M0 390.736V471.578C0 493.912 18.088 512 40.42 512H121.264L133.714 451.368L121.264 390.736L55.198 380.392L0 390.736Z" fill="#188038" />
      <path d="M512 121.264V40.42C512 18.088 493.912 0 471.58 0H390.736V121.264H512Z" fill="#1967D2" />
      <path d="M512 121.264H390.736V390.736H512V121.264Z" fill="#FBBC04" />
      <path d="M390.736 390.736H121.264V512H390.736V390.736Z" fill="#34A853" />
      <path d="M390.736 0H40.422C18.088 0 0 18.088 0 40.42V390.736H121.264V121.264H390.736V0Z" fill="#4285F4" />
      <path d="M176.54 330.308C166.468 323.504 159.494 313.568 155.688 300.428L179.066 290.796C181.186 298.88 184.891 305.145 190.182 309.592C195.436 314.038 201.836 316.228 209.314 316.228C216.959 316.228 223.527 313.903 229.018 309.254C234.51 304.606 237.272 298.678 237.272 291.504C237.272 284.16 234.375 278.164 228.582 273.516C222.788 268.868 215.512 266.544 206.822 266.544H193.314V243.404H205.44C212.917 243.404 219.216 241.382 224.336 237.338C229.456 233.298 232.016 227.772 232.016 220.732C232.016 214.468 229.726 209.482 225.146 205.744C220.566 202.004 214.77 200.118 207.73 200.118C200.858 200.118 195.402 201.938 191.36 205.608C187.319 209.289 184.282 213.937 182.534 219.116L159.394 209.482C162.458 200.792 168.084 193.112 176.336 186.476C184.588 179.84 195.132 176.506 207.932 176.506C217.398 176.506 225.92 178.326 233.466 181.996C241.01 185.668 246.938 190.754 251.216 197.222C255.496 203.722 257.616 210.998 257.616 219.082C257.616 227.334 255.63 234.308 251.656 240.034C247.682 245.76 242.796 250.138 237.002 253.204V254.584C244.483 257.669 250.982 262.735 255.798 269.238C260.682 275.806 263.142 283.654 263.142 292.818C263.142 301.978 260.816 310.164 256.168 317.338C251.52 324.514 245.088 330.172 236.934 334.282C228.75 338.392 219.554 340.482 209.348 340.482C197.524 340.514 186.612 337.112 176.54 330.308ZM320.132 214.298L294.466 232.858L281.632 213.39L327.678 180.176H345.328V336.842H320.132V214.298Z" fill="#4285F4" />
    </g>
    <defs>
      <clipPath id="cal-clip">
        <rect width="512" height="512" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const iMessageLogo: React.FC<LogoProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="imsg-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#5EF06B" />
        <stop offset="1" stopColor="#14C127" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#imsg-bg)" />
    {/* Speech bubble */}
    <path
      d="M20 28 Q20 18 30 18 L70 18 Q80 18 80 28 L80 58 Q80 68 70 68 L46 68 L34 80 L36 68 L30 68 Q20 68 20 58 Z"
      fill="white"
    />
  </svg>
);

export const MoreAppsLogo: React.FC<LogoProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="more-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#8B5CF6" />
        <stop offset="1" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#more-bg)" />
    {/* 3×3 grid of dots — 8 solid + 1 "+" hint */}
    {[22, 50, 78].flatMap((x) =>
      [22, 50, 78].map((y) => {
        const isLast = x === 78 && y === 78;
        return isLast ? null : (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="8" fill="white" opacity="0.9" />
        );
      })
    )}
    {/* Bottom-right slot: "+" instead of dot */}
    <text x="78" y="86" textAnchor="middle" fill="white" fontSize="24" fontWeight="300" fontFamily="sans-serif" opacity="0.9">+</text>
  </svg>
);
