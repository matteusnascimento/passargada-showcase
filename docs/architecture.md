# Pousada Passárgada — Digital Architecture

## Architecture

```text
Visitor
  |
  v
TanStack Start / React / TypeScript
  |
  +--> Public content
  +--> Accommodation pages
  +--> Offers / experiences / restaurant
  +--> Reservation CTAs
            |
            v
         OmniBees
  availability / rates / payment / confirmation
```

## Responsibility boundary

The public site presents the property, captures reservation intent and forwards booking parameters.

The booking engine remains responsible for availability, inventory, rates, commercial restrictions, payment and booking confirmation.

The frontend must not invent or duplicate those operational truths.

## SEO and migration

```text
Legacy URL → Permanent redirect → New route → Canonical / sitemap / structured data
```

## Measurement

```text
Campaign / UTM → Landing page → Allowed events after consent → GA4 / GTM → Analysis
```

Personally identifiable guest data is not intended to be sent as marketing-event payload.
