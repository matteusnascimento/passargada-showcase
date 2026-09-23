import { describe, expect, it } from "vitest";

import { buildBookingUrl } from "./build-booking-url";

const BASE_URL = "https://booking.example.test/search";

describe("buildBookingUrl", () => {
  it("preserves stay, occupancy and campaign context", () => {
    const url = new URL(
      buildBookingUrl(BASE_URL, {
        checkIn: "2026-10-10",
        checkOut: "2026-10-13",
        adults: 2,
        childrenAges: [5, 9],
        coupon: "DIRECT10",
        campaign: {
          source: "search",
          medium: "cpc",
          campaign: "spring",
        },
      }),
    );

    expect(url.searchParams.get("checkin")).toBe("2026-10-10");
    expect(url.searchParams.get("checkout")).toBe("2026-10-13");
    expect(url.searchParams.get("adults")).toBe("2");
    expect(url.searchParams.getAll("childAge")).toEqual(["5", "9"]);
    expect(url.searchParams.get("coupon")).toBe("DIRECT10");
    expect(url.searchParams.get("utm_source")).toBe("search");
  });

  it("rejects an invalid stay interval", () => {
    expect(() =>
      buildBookingUrl(BASE_URL, {
        checkIn: "2026-10-13",
        checkOut: "2026-10-10",
        adults: 2,
      }),
    ).toThrow("Check-out must be after check-in.");
  });

  it("rejects invalid child ages", () => {
    expect(() =>
      buildBookingUrl(BASE_URL, {
        checkIn: "2026-10-10",
        checkOut: "2026-10-13",
        adults: 2,
        childrenAges: [18],
      }),
    ).toThrow("Child ages");
  });
});
