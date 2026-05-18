export interface UTMParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
}

const STORAGE_KEY = "recall_utm_params";

export const EMPTY_UTMS: UTMParams = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
};

export function readUTMsFromSearch(search: string): UTMParams {
  const params = new URLSearchParams(search);
  return {
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    utm_content: params.get("utm_content") ?? "",
  };
}

export function hasAnyUTM(utms: UTMParams): boolean {
  return Object.values(utms).some(Boolean);
}

/** Persist first-touch UTMs for the session (e.g. scroll to form later). */
export function captureUTMsFromLocation(): void {
  if (typeof window === "undefined") return;

  const fromUrl = readUTMsFromSearch(window.location.search);
  if (!hasAnyUTM(fromUrl)) return;

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
  } catch {
    // sessionStorage unavailable
  }
}

export function getStoredUTMs(): UTMParams {
  if (typeof window === "undefined") return EMPTY_UTMS;

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_UTMS;
    return { ...EMPTY_UTMS, ...JSON.parse(raw) } as UTMParams;
  } catch {
    return EMPTY_UTMS;
  }
}

/** URL params override stored session UTMs. */
export function getEffectiveUTMs(): UTMParams {
  if (typeof window === "undefined") return EMPTY_UTMS;

  const fromUrl = readUTMsFromSearch(window.location.search);
  if (hasAnyUTM(fromUrl)) return fromUrl;
  return getStoredUTMs();
}

export function buildTrackedLandingUrl(baseUrl: string, utms: Partial<UTMParams>): string {
  const url = new URL(baseUrl);
  (Object.entries(utms) as [keyof UTMParams, string | undefined][]).forEach(
    ([key, value]) => {
      if (value) url.searchParams.set(key, value);
    }
  );
  return url.toString();
}
