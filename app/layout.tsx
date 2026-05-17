import type { Metadata } from "next";
import { Caveat, JetBrains_Mono, Montserrat } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const GA_ID = "G-WXVVB2ETRN";

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
          {children}
        </ThemeProvider>
        {/* GA4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
