# Nira & Nora

An editorial clothing-sourcing storefront where customers can buy confirmed products or enquire about items that still need sourcing.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/nira-nora-store run dev` — run the storefront
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/nira-nora-store/src/App.tsx` — route map and shared page shell
- `artifacts/nira-nora-store/src/pages/` — home, catalogue, product, request, cart, checkout, confirmation, information, FAQ, and not-found pages
- `artifacts/nira-nora-store/src/components/store-ui.tsx` — shared header, footer, product display, labels, and form field
- `artifacts/nira-nora-store/src/data/products.ts` — explicit demo catalogue and fulfilment status values
- `artifacts/nira-nora-store/src/lib/store.ts` — product lookup, ready-to-order eligibility, and cart calculations
- `artifacts/nira-nora-store/src/hooks/use-demo-cart.ts` — browser-only demo cart state
- `artifacts/nira-nora-store/src/index.css` — design tokens and responsive storefront styling
- `lib/api-spec/openapi.yaml` — shared API contract (not yet extended for store operations)
- `artifacts/api-server/` — shared API server (not yet connected to storefront operations)

## Routes and customer journeys

- `/` — brand introduction and routes into the catalogue or request flow
- `/shop` — searchable, filterable, sortable demonstration catalogue
- `/product/:id` — product details and status-dependent purchase or enquiry action
- `/request` — validated, local-only request preview
- `/cart` — editable browser-only demo cart
- `/checkout` and `/confirmation` — simulated checkout for ready-to-order demo items; no payment or order is created
- `/about`, `/delivery`, `/faq`, and `/contact` — business-information placeholders and clear answers

## Handoff before a real launch

- Replace demo product data, images, prices, sizes, and statuses with business-approved listings.
- Confirm the selling regions, delivery fees and timelines, returns and cancellation policies, contact channels, and business story before replacing their placeholders.
- Connect product and enquiry persistence, supplier review, and order management through the shared API and database. Keep special requests enquiry-only until pricing and payment policies are explicitly approved.
- Select and configure a payment provider before enabling real checkout. The current checkout is only a browser preview.
- The request and checkout flows do not send or persist customer contact details. The demo cart stores product IDs, sizes, and quantities in this browser only.

## Architecture decisions

- The storefront's first pass is a frontend-only prototype; product, enquiry, and checkout interactions are not persisted or connected to payment services.
- Only products explicitly marked ready to order may enter checkout; sourced-on-request and special-request items must remain enquiries.
- Demo products and prices are for interface demonstration only and must not be represented as confirmed inventory or real offers.
- The art direction is provisional and should remain easy to adjust before final branding is approved.

## Product

Nira & Nora sources clothing from suppliers and supports both confirmed-product purchases and sourcing enquiries. The user supplied NGN as the working currency; sales regions, delivery terms, inventory, contact information, business story, returns, and payment policy are not yet confirmed. Do not assume the business manufactures clothing or provides tailoring or alterations.

## User preferences

- Keep the visual identity distinctive and editorial rather than using a generic shop template.
- Do not invent business facts, supplier availability, delivery promises, or policies.
- Keep all unconfirmed checkout, enquiry, and payment behavior clearly identified as a prototype.

## Gotchas

- Do not treat an enquiry as an order or charge for an unconfirmed sourcing request.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
