"use client";

import { useEffect } from "react";
import { trackThankYouPageView, trackWaitlistSignup } from "@/lib/analytics";

export default function ThankYouTracking() {
  useEffect(() => {
    trackThankYouPageView();
    trackWaitlistSignup();
  }, []);

  return null;
}
