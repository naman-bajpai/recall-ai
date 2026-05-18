export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-WXVVB2ETRN";

export const SNAPCHAT_PIXEL_ID =
  process.env.NEXT_PUBLIC_SNAPCHAT_PIXEL_ID ?? "";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    snaptr?: (...args: unknown[]) => void;
  }
}

export function trackWaitlistSignup(): void {
  if (typeof window === "undefined") return;

  window.gtag?.("event", "sign_up", {
    method: "waitlist",
    send_to: GA_MEASUREMENT_ID,
  });

  window.snaptr?.("track", "SIGN_UP");
}

export function trackThankYouPageView(): void {
  if (typeof window === "undefined") return;

  window.gtag?.("event", "page_view", {
    page_title: "Thank You",
    page_location: window.location.href,
    send_to: GA_MEASUREMENT_ID,
  });

  window.snaptr?.("track", "PAGE_VIEW");
}
