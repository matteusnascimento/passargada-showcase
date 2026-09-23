import { describe, expect, it } from "vitest";

import { captureMarketingContext } from "./marketing-context";

describe("captureMarketingContext", () => {
  it("keeps only allowlisted campaign fields", () => {
    const context = captureMarketingContext(
      "https://hotel.example/reservar?utm_source=search&utm_campaign=brand&email=guest@example.com",
      "https://search.example/results?q=hotel",
    );

    expect(context).toEqual({
      landingPath: "/reservar",
      utm_source: "search",
      utm_campaign: "brand",
      referrerOrigin: "https://search.example",
    });

    expect("email" in context).toBe(false);
  });

  it("does not persist a full referrer path or query string", () => {
    const context = captureMarketingContext(
      "https://hotel.example/",
      "https://partner.example/private/path?token=secret",
    );

    expect(context.referrerOrigin).toBe("https://partner.example");
  });
});
