export type BookingSearch = {
  checkIn: string;
  checkOut: string;
  adults: number;
  childrenAges?: number[];
  coupon?: string;
  campaign?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
};

function parseDate(value: string): Date {
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.valueOf())) {
    throw new Error("Invalid date.");
  }
  return date;
}

function assertSearch(search: BookingSearch): void {
  const checkIn = parseDate(search.checkIn);
  const checkOut = parseDate(search.checkOut);

  if (checkOut <= checkIn) {
    throw new Error("Check-out must be after check-in.");
  }

  if (!Number.isInteger(search.adults) || search.adults < 1) {
    throw new Error("At least one adult is required.");
  }

  for (const age of search.childrenAges ?? []) {
    if (!Number.isInteger(age) || age < 0 || age > 17) {
      throw new Error("Child ages must be integers between 0 and 17.");
    }
  }
}

function setOptional(
  params: URLSearchParams,
  key: string,
  value: string | undefined,
): void {
  const normalized = value?.trim();
  if (normalized) params.set(key, normalized);
}

export function buildBookingUrl(
  baseUrl: string,
  search: BookingSearch,
): string {
  assertSearch(search);

  const url = new URL(baseUrl);
  url.searchParams.set("checkin", search.checkIn);
  url.searchParams.set("checkout", search.checkOut);
  url.searchParams.set("adults", String(search.adults));

  (search.childrenAges ?? []).forEach((age) => {
    url.searchParams.append("childAge", String(age));
  });

  setOptional(url.searchParams, "coupon", search.coupon);
  setOptional(url.searchParams, "utm_source", search.campaign?.source);
  setOptional(url.searchParams, "utm_medium", search.campaign?.medium);
  setOptional(url.searchParams, "utm_campaign", search.campaign?.campaign);

  return url.toString();
}
