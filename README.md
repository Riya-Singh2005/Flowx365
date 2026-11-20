# example.com

The FlowX365 marketing site. Astro, static output, no client framework.

```bash
source ~/.nvm/nvm.sh        # Node 24 lives in nvm on this machine
npm install
npm run dev                 # http://localhost:4321
npm run build               # static site in dist/
npm run og                  # regenerate public/og.png (needs ImageMagick)
```

`dist/` contains the static site. Cloudflare serves those assets directly and invokes the small
Worker in `src/worker.ts` only for `/api/*` requests.

## Website copy direction

The homepage opens with “Write it once. Let it flow.” and carries that idea through the product
explanation, document flow, lead, sales, stock, printing, planner, FAQ and closing sections. The
cover uses the real quotation-to-invoice document chain as its visual explanation; product claims
remain governed by `PRODUCT.md`.

The opening cover leads into an unnumbered Enterprise Data Security sheet before the numbered
product chapters. It explains the dedicated-database approach through a focused introduction and
the interactive Security at Every Layer index without changing the existing chapter sequence.

## Deploy (Cloudflare Workers, from GitHub)

Cloudflare builds and deploys on every push to `flowx` (the production branch):

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy` (reads `wrangler.jsonc`, uploads `dist/` as static assets)
- Node: pinned to 24 by `.node-version`

The Worker's name in the dashboard must match `name` in `wrangler.jsonc` (`flowx365`).
`public/_headers` sets caching and security headers; `public/.assetsignore` keeps the image
provenance notes out of the upload; unknown paths get `src/pages/404.astro`.

Test the Cloudflare setup locally (serves `dist/` exactly as the Worker will):

```bash
npm run build && npx wrangler dev
```

## Where things live

| Path | What |
|---|---|
| `src/layouts/Home.astro` | The homepage: chapters in reading order (`src/pages/index.astro` renders it) |
| `src/data/sections.ts`, `src/pages/[section].astro` | Section addresses such as `/how-it-works`: navigation clicks show them in the address bar, and each builds as `<slug>.html` (`build.format: 'file'`), a homepage copy with canonical `/` that scrolls to its section |
| `src/components/` | One file per chapter; `DocSheet` and `ui/AppFrame` rebuild product screens |
| `src/data/sample.ts` | Illustrative sample data. Totals, GST and amount-in-words are computed |
| `src/data/site.ts` | Title (“FlowX365 - Write it once. Let it flow.”: brand plus hero slogan, also used for Open Graph and Twitter), description, sales email, and app URL |
| `src/data/products.ts` | The product line shown in the No. 01 table, the Product dropdown and the Contents manifest |
| `src/components/DemoDialog.astro` | Shared Request a Demo dialog and client interaction |
| `src/server/demo-request.ts` | Server validation and email formatting |
| `src/worker.ts` | `/api/demo-request`, rate limiting, and Resend delivery |
| `src/styles/global.css` | Tokens and the shared sheet, type and button primitives |
| `src/scripts/` | The single scroll loop (`scroll.ts`) and entrance reveals (`reveal.ts`) |
| `src/pages/pricing.astro`, `src/components/pricing/` | `/pricing`, the rate card: cover, plans with a Monthly/Annual switch, schedule of capabilities, add-ons, terms, why, questions, then the shared closing cover. Static, indexed and in the sitemap |
| `src/data/pricing.ts` | Every price, plan line, add-on, term and pricing question shown on `/pricing` (checked by `tests/pricing.test.ts`) |
| `PRODUCT.md`, `DESIGN.md` | Product truth and the design system. Read both before adding a section |
| `PRICING.md` | Pricing status: what is implemented, what the owner proposed, future backend requirements, and open decisions |

## Responsive visual verification

Above 900px the Hero uses `100svh` as a minimum; on smaller screens it follows its content. Its four
line slogan is sized between two fans of real `DocSheet` documents. The fans move to the bottom on
tablets and phones, the navigation retains the demo action, and the cover's only in-flow action is the
scroll cue. The Hero's spring trail and landing ripple are disabled for reduced motion. Primary
homepage introduction paragraphs are justified only above 1080px; intermediate and phone text stays
left-aligned. The document chain remains pinned on supported screens and changes to paired, naturally
scrolling step-and-document records on short phones (up to 600px wide and 820px high). Reduced-motion
visitors receive the same natural chain and a static day timetable.

The Security sheet uses the original-paper field and remains unnumbered so the existing chapter
manifest stays stable. Its story stacks through 1080px. The five-row Security at Every Layer index is
sticky and interactive above 760px, then becomes a plain source-ordered sequence on phones. Security,
the six-product table, and the Chain retain their original reveal cadence; other sections use the
earlier incoming reveal timing. Verify the Hero-to-Security overlap, the Security-to-What Is
transition, and the absence of clipping or horizontal overflow at every audited viewport.

The 2026-10-11 layout audit covered both the homepage and 404 page:

| Viewport | Hero and navigation | Long-form sections |
|---|---|---|
| 1440×900 | Full masthead; centred four-line slogan and side document fans | Pinned scenes; desktop product tables |
| 1366×768 | Height-fitted slogan; document fans clear the cover copy | Pinned scenes; demo submit footer remains visible |
| 1024×768 | Tablet Contents control; bottom document fans | Pinned scenes; product layouts reflow |
| 768×1024 | Tablet Contents control; content-height Hero | Pinned scenes; single-column chapter layouts |
| 390×844 | Mark-only phone brand; all controls visible | Compact product layouts; pinned chain remains supported |
| 375×812 | Mark-only phone brand | Natural-flow chain fallback |
| 320×700 | Mark-only phone brand; 44px Contents control | Natural-flow chain, labelled Tracker records, contained print decoration |

At every size, check for page-level horizontal overflow, clipped copy, paper-edge placement, menu
behavior, working controls, and visible primary actions. The recurring audit commands are:

```bash
npm test
npm run build
npx wrangler deploy --dry-run
git diff --check
```

The original defects came from a fixed-height Hero combined with the first sheet's negative overlap,
a non-collapsing phone wordmark, pinned stages taller than short phone viewports, and desktop-shaped
table and paper-decoration offsets at 320px. The current Hero fits its slogan between document fans
and moves those fans below the copy on narrow screens. Responsive fixes live in `Hero.astro`,
`Nav.astro`, `Chain.astro`, `Tracker.astro`, `Print.astro`, and `404.astro`.

## Before it goes live

- Every claim was checked against the app repo (`../flowx365-app`) on 2026-09-24. When the app changes,
  re-check `Questions.astro`, `Details.astro` and the chapter copy. Ledger, banking, GST returns and
  reports remain absent. The product table lists FlowX365, FlowX Billingsuite, FlowX SalesPro, FlowX HRMS and Payroll,
  FlowX Project365 and FlowX BudgetPro with no “Coming soon” status (user decision, 2026-11-03). AI
  enablement and payroll support remain pending product-owner confirmation.
- The FlowX365 brand is two links. The X mark (navigation and 404 page) opens https://staging.example.com in a new tab.
- The FlowX365 wordmark beside it, and the FlowX365 entry in the Product dropdown and the Contents menu, go to `/`, the homepage hero (plain `/` in the address; on the homepage they scroll to the top).
- Product screens use invented sample companies and numbers and are labelled "Illustrative data".
- Request a Demo opens an inquiry form. Successful requests are sent to `sales@example.com`.
  There is deliberately no Sign in button.

## Demo request email setup

The Worker sends inquiry email through Resend. Verify `example.com` in Resend and provision
`demo@example.com`, or configure another sender on that verified domain.

For local development, copy `.env.example` to the ignored `.dev.vars` file and provide a Resend API
key. For production, add the key as a Cloudflare Worker secret:

```bash
npx wrangler secret put RESEND_API_KEY
```

`DEMO_FROM_EMAIL` defaults to `FlowX365 <demo@example.com>` in `wrangler.jsonc`. The recipient is
fixed in server code as `sales@example.com`. A failed Resend response is returned to the form as a
failed submission; the site never displays success before the provider accepts the email.

The endpoint permits five attempts per IP address per minute using Cloudflare's rate-limit binding.
It also checks origin metadata, validates and bounds every field, escapes email HTML, and rejects a
hidden honeypot field. Submitted personal details are not logged.

Run the server tests with `npm test`. `npm run build` validates the static site, and
`npx wrangler deploy --dry-run` validates the Worker bundle and bindings without deploying.
