import type { Metadata } from "next";
import { Caveat, JetBrains_Mono, Montserrat } from "next/font/google";
import Script from "next/script";
import UtmCapture from "@/components/utm-capture";
import { GA_MEASUREMENT_ID, SNAPCHAT_PIXEL_ID } from "@/lib/analytics";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recall — Find anything on your Mac",
  description:
    "Recall searches everything on your Mac — messages, emails, docs, and apps — the moment you need it. Natural language search for your entire digital life.",
  keywords: [
    "Mac search",
    "productivity",
    "AI search",
    "natural language",
    "Spotlight alternative",
    "Raycast alternative",
  ],
  openGraph: {
    title: "Recall — Find anything on your Mac",
    description: "Recall searches everything on your Mac — instantly.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recall — Find anything on your Mac",
    description: "Recall searches everything on your Mac — instantly.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${montserrat.variable} ${jetbrainsMono.variable} dark h-full`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="relative min-h-full flex flex-col antialiased">
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <UtmCapture />
          {children}
        </ThemeProvider>
        {/* GA4 — landing + thank-you (root layout) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {SNAPCHAT_PIXEL_ID ? (
          <Script id="snapchat-pixel" strategy="afterInteractive">
            {`
              (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){
              a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
              a.queue=[];var s='script';var r=t.createElement(s);r.async=!0;
              r.src=n;var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u);
              })(window,document,'https://sc-static.net/scevent.min.js');
              snaptr('init', '${SNAPCHAT_PIXEL_ID}');
              snaptr('track', 'PAGE_VIEW');
            `}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
