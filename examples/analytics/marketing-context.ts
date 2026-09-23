const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

type UtmKey = (typeof UTM_KEYS)[number];

export type MarketingContext = Partial<Record<UtmKey, string>> & {
  landingPath: string;
  referrerOrigin?: string;
};

function normalize(value: string | null): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;

  return trimmed.slice(0, 120);
}

export function captureMarketingContext(
  href: string,
  referrer?: string,
): MarketingContext {
  const page = new URL(href);
  const result: MarketingContext = {
    landingPath: page.pathname,
  };

  for (const key of UTM_KEYS) {
    const value = normalize(page.searchParams.get(key));
    if (value) result[key] = value;
  }

  if (referrer) {
    try {
      result.referrerOrigin = new URL(referrer).origin;
    } catch {
      // Invalid referrer values are ignored rather than persisted.
    }
  }

  return result;
}
