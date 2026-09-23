# Passárgada — Sanitized Code Samples

These examples demonstrate selected frontend engineering concerns from a hospitality booking journey without publishing the production website.

## What to review

- `booking/build-booking-url.ts`: typed input validation, deterministic URL construction and separation from the external booking provider.
- `booking/build-booking-url.test.ts`: edge cases for dates, occupancy and optional campaign/coupon context.
- `analytics/marketing-context.ts`: allowlisted campaign attribution with intentional exclusion of personal data.
- `analytics/marketing-context.test.ts`: privacy and normalization behavior.

## Run the tests

```bash
cd examples
npm install
npm test
```

The booking base URL used in tests is `https://booking.example.test`; no production endpoint or account identifier is present here.
