"use client";

import { useEffect } from "react";
import { captureUTMsFromLocation } from "@/lib/utm";

/** Saves first-touch UTM params from the landing URL for the session. */
export default function UtmCapture() {
  useEffect(() => {
    captureUTMsFromLocation();
  }, []);

  return null;
}
