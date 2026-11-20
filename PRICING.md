# Pricing: status and requirements

Last updated 2026-11-16. This file records what the `/pricing` page does today, what the owner has
decided, what a subscription backend might one day need, and which decisions are still open.
Nothing under "Future possibilities" is implemented.

## Current customer-facing model

- The page shows three plans: **Basic** (₹250 per month or ₹2,499 per year, 1 User and 1 Company),
  **Professional** (₹499 per month or ₹4,999 per year, Up to 5 Users and Up to 3 Companies) and
  **Enterprise** (₹999 per month or ₹9,999 per year, Up to 10 Users and Up to 5 Companies). Prices
  exclude GST.
- **Request a Demo is the only customer-facing CTA** for a plan. All three cards carry it, and it
  opens the shared demo dialog with the plan prefilled. There is no Start free trial, Buy now,
  Subscribe, checkout or sign-up action, and no link to app.example.com.
- **30-Day Free Trial.** Shown as a two-line tag beside the Monthly/Annual switch (line one "30-DAY FREE
  TRIAL" in bold canary caps, line two "Ask for it when you request a demo." in smaller text, centred in
  the same canary-ruled box), as the first term and in the FAQ. Customers who want the trial
  contact the FlowX365 team through Request a Demo; the team arranges it. No eligibility, payment or
  plan conditions are stated, because none are set.
- Add-ons are shown only as possible extensions, discussed through a demo request, with no rates. The
  section explains that needs beyond the users, licences or capacity included in a selected plan may
  require additional licences; the team discusses suitable options through Request a Demo.
- Terms carry no internal status labels (Planned, To be confirmed and the like).

## Current technical scope

FlowX365 uses a demo-enquiry-led pricing process. `/pricing` is a **static marketing page** connected
only to the existing Request a Demo dialog and its `/api/demo-request` endpoint.

**No subscription backend is required or authorized for the current phase.** Do not build one
because section 3 below lists future possibilities.

## Navigation destinations (verified 2026-11-12)

| Link | Destination | Notes |
|---|---|---|
| FlowX365 X mark (nav and 404) | https://staging.example.com, new tab | Owner decision: quick access to the demo environment. The mark alone is this link (44px target) |
| FlowX365 wordmark (nav and 404), and the FlowX365 entry in the Product dropdown and the Contents manifest | `/`, the homepage hero (https://example.com/) | A separate link from the mark. Relative, so it stays on the site's own host; the address shows a plain `/`, no fragment. On the homepage and its section-path copies the click scrolls to the top (the hero is a sticky cover) and sets the address to `/`; elsewhere it loads the homepage, which opens at the hero. The wordmark shows at every width, phones included |
| Other product entries | the product table (`#products`, or `/products` off the homepage) | Unchanged |

## 1. Implemented (static, live in this repository)

| Item | Where | Notes |
|---|---|---|
| Route `/pricing` | `src/pages/pricing.astro` (builds as `dist/pricing.html`) | Indexed (owner decision, 2026-11-13): canonical `https://example.com/pricing`, listed in `public/sitemap.xml`. The host serves `/pricing` and redirects `/pricing.html` to it. Title `FlowX365 - Pricing` |
| Navigation | `src/components/Nav.astro` | Pricing is the last primary link (`aria-current="page"` and an orange underline on `/pricing`). It is also an unnumbered row at the foot of the Contents manifest, which is the phone menu. Off the homepage, section links use paths via `sectionHref()` (`src/data/sections.ts`) |
| Footer | `src/components/Close.astro` | Pricing link. Off the homepage (`onHome={false}`, used only by `/pricing`) the footer uses section paths and omits "Product screens show illustrative data", because `/pricing` shows no product screens |
| Data | `src/data/pricing.ts` | Single source for plans, prices, period labels, users and reusable product hierarchies. The module `schedule` is derived from those products rather than maintained separately. The file also owns GST and trial wording, the additional-licence notice, add-ons, terms, reasons and FAQ |
| Demo prefill | `src/components/DemoDialog.astro` | A trigger with `data-demo-plan` prefills the existing requirement field ("I'm interested in the {Plan} plan.") and selects "Full FlowX365 demo". Both stay editable. No new field, form or endpoint |
| Product dialog | `src/components/pricing/ProductDialog.astro` | One native `<dialog>` for the Enterprise products, content from build-time templates (see Enterprise product rows below) |
| Tests | `tests/pricing.test.ts` | Exact prices, users and product order; Basic and expanded Billingsuite details; shared SalesPro and Billingsuite objects; owner-confirmed HRMS and Payroll lists; the HRMS Reports on-demand line; only Enterprise uses the product dialog; every Enterprise product has an intro; every SalesPro and Billingsuite detail is described and no HRMS detail is; derived schedule consistency; no placeholder module; trial, CTA and commercial-term safeguards; id collisions |

Page sections, in order (`src/components/pricing/`):

1. `RateCover`: the headline and supporting copy.
2. `Plans`: three rate sheets, the Monthly/Annual switch, the two-line 30-Day Free Trial tag and the "Every plan" line. Every card uses the same structure: head (name, audience, positioning, ink divider), price block (amount and period, "Prices exclude GST", "Billed once a year" on Annual, then the user and company badges below), included products, and the Request a Demo counterfoil. Basic and Professional list their products with compact expandable module rows; Enterprise lists only its three product names, each opening the product dialog (below). The derived `schedule` stays available to tests without duplicating the product data.
   - **Shared alignment (desktop, ≥1081px).** Three columns. The sheets grid defines four shared row tracks (head, price, contents, counterfoil) and each sheet uses CSS `subgrid`, so the price block, badges, first product heading and Request a Demo button start at the same height on all three sheets whatever the copy length, with no fixed heights. Opening a module grows the shared contents row, so all sheets stay equal height and nothing overlaps the button. The recommended Professional sheet is no longer raised; it is marked by its stamp and a deeper shadow. Because container queries switch subgrid off, the query container sits on the sheet head on desktop (plan-name sizing) and on the whole sheet below 1081px.
   - **Badges.** Always below the GST line, left-aligned. From 1400px they sit side by side; between 1081px and 1399px every sheet stacks them, since Enterprise's pair no longer fits on one line.
   - **Module layout.** On Basic and Professional every product lists its modules one per row, at every width, each expanding directly beneath itself.
   - **Enterprise product rows (2026-11-16).** The Enterprise sheet shows exactly three rows, one per product, in order: FlowX HRMS and Payroll, FlowX SalesPro, FlowX Billingsuite. No module or submodule is shown on the sheet. Each row is one full-width button (product name in caps, "{n} modules · View details", an arrow) with `aria-haspopup="dialog"`; it inverts to ink on hover and shows the orange focus ring. The plan's `presentation: 'modal'` in `pricing.ts` selects this; Basic and Professional are `inline`.
   - **Product dialog.** One shared native `<dialog id="product-dialog">` (`ProductDialog.astro`). Each product's content is a `<template>` rendered at build time from `pricing.ts`; opening a row replaces the dialog's content with that template, so it never shows a previous product. Layout: navy head (kicker "Enterprise · Included product", product name, one-line intro, round close button) over a paper body of modules in two columns (one column at 760px and below), each module a rule-topped block with its submodules as a check list. HRMS lists submodule names only (owner decision, 2026-11-16) and its Reports module keeps the on-demand line; SalesPro and Billingsuite add a one-line description under each submodule. The Billingsuite dialog shows the expanded Enterprise set.
   - **Dialog behaviour and accessibility.** Opened with `showModal()`, so the page behind is inert and `aria-modal` semantics apply; labelled by the product name (`aria-labelledby`). Focus moves to the close button on open, Tab cycles between the close button and the scrollable module list (a focusable labelled region, so it scrolls by keyboard), and focus returns to the row that opened it. Closes on the close button, a backdrop click and Escape. The page does not scroll while it is open (the shared `html.dialog-open` lock from the demo dialog). Fades and lifts in and out like the demo dialog; reduced motion removes the movement.
   - **Dialog sizing.** Centred, up to 54rem wide and 46rem tall (less the screen margin); the head stays fixed and the module list scrolls inside. At 768px and below it becomes a full-screen sheet, with safe-area padding and the product name sized to fit beside the close button down to 320px. Verified (2026-11-16, headless Chrome) at 1920, 1440, 1280, 1024, 820, 768, 430, 390, 360 and 320px wide: correct product each time, all three close paths, focus return, no horizontal overflow, no console errors.
   - **Module window (desktop, ≥1081px).** Each Basic and Professional sheet's product list is a scrollable window, sized by the page script so the switch, all three sheets and their buttons fit the screen below the navigation when a visitor jumps to the plans (CSS fallback `max(12rem, 100svh − 32rem)` without the script). Where a list is longer than its window it drifts slowly (24px/s) down, holds 1.6s, drifts back up and holds: no duplicated items, so ids and ARIA stay unique. It holds still under the pointer, while a module in it is open (the opened module scrolls to the top of the window), while a keyboard user has focus inside it, when the sheet is off screen or the tab is hidden, and it never moves for reduced motion or touch-only devices. Visitors can also scroll it by wheel or trackpad, and the wheel passes through to the page when the window has nothing left to scroll (no `overscroll-behavior: contain`; removed 2026-11-16 after the page seemed frozen on desktop, because the wheel did nothing while the pointer rested on a list). A window drifts only when it overflows by more than 8px. A soft fade marks the edge only where there is more to see. A list that fits (usually Basic) stays still.
   - **Height tiers.** Every sheet tightens by the same amounts on screens up to 960px tall and up to 800px tall; in the shorter tier, from 1280px wide, every sheet places its two badges in a fixed column beside the price. Verified (2026-11-14) to fit one screen at 2560×1305, 1920×937, 1600×789, 1536×730, 1440×789, 1366×657, 1280×720 and 1081×900 browser viewports; 1100×657 is 9px over.
   - **Smaller screens.** At 1080px and below the sheets become one column (max 44rem); a sheet wider than 34rem reads as a bill (name and price left, contents right). At 760px and below the switch and the trial tag each take the full width.
3. `AddOns`: possible extensions (users, warehouses, companies, optional modules, capacity), name and what each adds, plus the additional-licence enquiry explanation. Customers discuss suitable options through Request a Demo. There is no rate column or purchase action.
4. `Terms`: "The terms." Six short terms (trial, billing, GST, changing plans, payment and renewal, custom Enterprise), title and text only.
5. `Why`: five verified product strengths, each linking to a homepage chapter.
6. `PricingFaq`: ten questions in native `<details>`.
7. The shared `Close` cover in its `compact` variant, with the demo CTA and the footer.

Each section after the plans (Add-ons, Terms, Why, FAQ, the closing cover with its footer) fits one desktop screen below the navigation. Their vertical padding is the `--sheet-pad` token (`src/styles/global.css`): width-led as before, capped at 8% of the screen height. Their titles use `--sheet-title`, the `display-m` size capped at 7.5% of the screen height. On screens 740px tall or shorter (from 1024px wide), the add-ons rows, the closed FAQ questions and the closing cover tighten further. Phones and tablets scroll as before: three stacked plans, ten questions or a five-row table cannot fit one phone screen without cutting content.

Static interactions:

- **Monthly / Annual switch.** Two radios styled with CSS `:has()`, no script. Monthly shows `₹250 per month` and so on; Annual shows the yearly total (`₹2,499 per year`) with "Billed once a year". No monthly equivalent, discount or saving is shown or calculated.
- **Module window drift (desktop).** See Module window above. Script in `Plans.astro`, no dependency; `requestAnimationFrame` runs only while a window is moving and writes only its `scrollTop`.
- **Enterprise product dialog.** See Product dialog above. Script in `ProductDialog.astro`, no dependency.
- **Product module accordions (Basic and Professional).** Every product begins collapsed. A module button opens its details inside the card and closes the previously open module in that product only. Other products and plans keep their own state. Buttons expose `aria-expanded` and `aria-controls`; panels are labelled regions and respect reduced motion.
- **GST.** Every card shows the exact line "Prices exclude GST" immediately below its selected monthly or annual price. Terms and FAQ carry the same policy in sentence form.
- **FAQ.** Native `<details name="pricing-faq">`, so only one answer is open at a time.
- **Request a Demo on every plan.** All three sheets carry the same button, `Request a Demo`, with `data-demo-trigger data-demo-plan="{Plan}"`. It opens the existing demo dialog with the plan prefilled (see Demo prefill). There is no Start free trial button, no sign-up, no checkout and no link to app.example.com.

### Prices and users (owner rates, 2026-11-11, excluding GST)

| Plan | Monthly | Annual | Included users | Included companies | Sheet tint |
|---|---|---|---|---|---|
| Basic | ₹250 per month | ₹2,499 per year | 1 User | 1 Company | white |
| Professional (recommended) | ₹499 per month | ₹4,999 per year | Up to 5 Users | Up to 3 Companies | white |
| Enterprise | ₹999 per month | ₹9,999 per year | Up to 10 Users | Up to 5 Companies | white |

The annual figure is a yearly total, not a monthly rate. All three plans use the same Original White sheet so the cards read as one consistent pricing set.

### Products and modules by plan

The cards present a product hierarchy rather than a flat list. Basic uses the baseline Billingsuite. Professional and Enterprise share the same expanded Billingsuite object, and both share the same SalesPro object. Plan inclusions are final (owner, 2026-11-13).

| Plan | Products in card order |
|---|---|
| Basic | FlowX Billingsuite |
| Professional | FlowX SalesPro; FlowX Billingsuite |
| Enterprise | FlowX HRMS and Payroll; FlowX SalesPro; FlowX Billingsuite |

**FlowX Billingsuite, Basic**

| Module | Details |
|---|---|
| Sales | Customer Management, Estimation / Quotation, Sales Order Processing, Delivery Notes |
| Purchase | Vendor Management, Purchase Requisition, Purchase Orders, GRN / Goods Receipt |
| Inventory | Items, Real Time Stock Tracking |
| Accounting | Proforma Invoices, Sales Invoices, Purchase Invoices, Payment – Receivable, Payment – Payable |

**FlowX Billingsuite, Professional and Enterprise**

Uses the Basic details plus Sales Tracker under Sales, Purchase Tracker under Purchase, and Warehouse Management and Stock Transfer Management under Inventory.

**FlowX SalesPro, Professional and Enterprise**

| Module | Details |
|---|---|
| Planner | Task Planner, Team Availability |
| CRM | Lead Management, Lead Approval, Sales Pipeline, Sales Target & Performance |

**FlowX HRMS and Payroll, Enterprise** (module list supplied and confirmed live by the owner, 2026-11-14)

| Module | Details |
|---|---|
| Employee Management | Employee Directory, Onboarding – Employee Creation, Attendance, Leave Management, Performance, Training & Development, Employee Exit Form, Tax Declaration Form |
| Payroll Management | Payroll, Pay Slip, Offer Letter, Increment Letter, Tax Management, Reimbursements, Loan & Advances, Employee Exit Clearance |
| Reports | No report is named. The panel reads "Customised to your requirements on demand." |
| HRMS & Payroll Master | Holiday Master, Employee ID Generate Master, Department Master, Location Master, Shift Master, Relieving Letter |

Dashboard is part of every plan (below), so it is not repeated under HRMS.

**Source of the dialog copy.** Module and submodule names are as above. The SalesPro and Billingsuite one-line descriptions were written (2026-11-16) from the FlowX365 app's own screens (`app/lib/features/{sales,purchase,inventory,accounting,planner,crm}`) and state only what those screens do. HRMS and Payroll carries no descriptions: its submodules are owner-confirmed by name, not verified screen by screen, so no capability beyond the name is claimed. The product intros are one plain line each.

Every plan: Dashboard, Document Series, PDF Settings with three PDF designs, Excel and CSV export, web browser and Android, a dedicated database.

**Left off the page** (in the sidebar, but the route opens a `PlaceholderScreen` in `app/lib/app/router.dart`): Chart of Accounts, Journal Entries, Banking, Fixed Assets, GST Management, TDS Management, all of Budget Planning (Budget Creation, Budget Approval, Revenue Planning, Expense Planning, Budget vs Actual, Forecasting & Scenarios), Purchase Quotations, Project Management, Report. Add a capability to the applicable reusable product definition and its test allowlist when it ships; the schedule will update automatically.

### Removed from the page (2026-11-11)

"No. 01 · Original" and the other Original / Duplicate / Triplicate labels on the sheets and section stubs; "Prices per month, illustrative"; "Annual rates not yet set" and "Annual pricing coming soon"; the "Illustrative pricing…" disclosure; the per-price "GST treatment to be confirmed"; the "Indicative" and "TBC" marks; the differing per-plan button labels ("Discuss Basic", "Talk to us about Enterprise").

## 2. Commercial features and how the page presents them

| # | Feature | Shown on the page as | Today |
|---|---|---|---|
| A | Monthly / annual billing toggle | A working switch showing the monthly and annual rates | Rates set; billing is arranged with the team, not online |
| B | 30-day free trial | Tag beside the switch, first term, FAQ: ask for it when you request a demo | Offered; arranged manually by the team after a demo request |
| C | GST-inclusive / exclusive display | "Prices exclude GST" directly below every card price, plus Terms and FAQ | Decided: exclusive |
| D | Add-on modules and extra users | Add-ons section: possible extensions and additional-licence explanation, discussed through Request a Demo, with no rates or purchase action | Catalogue and rates not set |
| E | Online payment and subscription renewal | Terms: "Arranged with our team. There is no online checkout or automatic renewal." | Not online |
| F | Upgrade / downgrade between plans | Terms and FAQ: tell us through Request a Demo and the team helps | Handled by the team; no automatic plan changes |

Removed 2026-11-12: the add-ons RATE column with its five "To be confirmed" entries; the Terms status badges (Confirmed, Planned, On request); the "Not available yet" trial wording; the sales email in the FAQ's demo answer (the closing cover still shows it).

## 3. Future possibilities (not implemented, not authorized)

None of this exists, and none of it is authorized for the current phase. It must not be faked on the
static site or presented as a current feature. Online payments, automatic renewal, automatic trial
activation, subscription management, automated upgrades and downgrades, and add-on purchases all
belong here.

**A. Billing cycles**
- Monthly and annual billing periods on a subscription.
- Annual price per plan (the rates are set; see section 1), and any annual discount rule.
- Switching cycles mid-term.
- Today the page switch shows the set rates statically; a backend would bill them.

**B. Free trial**
- Trial start date, trial expiry date and trial status (active, expired, converted).
- Trial-to-paid conversion.
- Trial-expiry reminders.
- Trial eligibility rules (for example, one trial per business or GSTIN).
- Self-service sign-up or provisioning. Today an administrator creates accounts, and there is no self sign-up.

**C. GST and tax**
- Display options for GST-inclusive and GST-exclusive prices.
- Configurable tax treatment, with a tax breakdown (CGST/SGST or IGST by place of supply).
- Customer billing details, including the customer's GSTIN where applicable.
- Tax calculation on subscription invoices.

**D. Add-ons and quantities**
- A configurable catalogue of add-ons (users, warehouses, companies, modules, capacity).
- Quantities, per-unit pricing and prorated additions.
- Enforcement of plan and add-on entitlements in the ERP. Today the ERP has no plan enforcement.

**E. Payments and renewal**
- Payment gateway integration through a secure hosted checkout. No card data touches FlowX365 servers.
- Recurring payment authorisation (mandates), subscription creation and renewal processing.
- Payment success and failure handling, with retries and dunning.
- Webhook signature verification.
- Renewal reminders.
- Invoices and payment history for the customer.

**F. Plan changes**
- Upgrades and downgrades.
- The effective date of a change (immediately, or at renewal).
- Proration policy and billing adjustments (credits or charges).
- Feature entitlement changes on switch.
- Confirmation and notification emails.

**Shared**
- A subscription dashboard for the customer.
- Tenant provisioning, consistent with the dedicated-database-per-customer model.
- Audit logs of commercial changes.

## 4. Decisions

Settled (owner, 2026-11-11):

- Monthly rates: ₹250, ₹499, ₹999.
- Annual rates: ₹2,499, ₹4,999, ₹9,999. No discount or saving is stated.
- GST: prices exclude GST.
- Users per plan: 1, up to 5, up to 10.
- Companies per plan: 1, up to 3, up to 5.
- 30-day free trial: offered, arranged through Request a Demo (2026-11-12). No self-service activation.
- Request a Demo is the only plan CTA (2026-11-12).
- Additional users, licences or capacity beyond a plan may require additional licences. Customers discuss requirements and suitable options through Request a Demo; no add-on price or online purchase flow is shown (2026-11-12).
- Product hierarchy: Basic includes FlowX Billingsuite; Professional includes FlowX SalesPro and the expanded Billingsuite; Enterprise includes FlowX HRMS and Payroll, SalesPro and the expanded Billingsuite (2026-11-12).
- FlowX HRMS and Payroll in Enterprise shows Employee Management, Payroll Management, Reports (customised on demand) and HRMS & Payroll Master, with the owner-supplied details, all confirmed live (2026-11-14). This replaces the earlier high-level Payroll line (2026-11-12).

Still awaiting the owner:

1. Other limits per plan, if any, such as warehouses.
2. Free-trial conditions: which plan the trial covers, whether payment details are needed, and eligibility. The page offers the trial through Request a Demo and states no conditions until these are set.
3. Add-on catalogue and rates, including extra users; which modules are sold as add-ons. The page shows no rates until these are set.
4. Payment gateway choice; renewal, refund and cancellation policy.
5. Upgrade and downgrade rules: effective date and proration.
6. Support commitments per plan. None are stated, and none may be invented.
7. Whether Professional stays the recommended plan.
