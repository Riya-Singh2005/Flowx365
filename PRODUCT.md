# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (user's choice), static output. Node 24 is available through nvm
(`source ~/.nvm/nvm.sh`). The product itself is a separate Flutter (web +
Android) client and Go API in `../flowx365-app`; the marketing site shares no
code with it and must not depend on it at build or run time.

Deploy (user confirmed, 2026-10-19): Cloudflare Workers, serving `dist/` as
static assets on the `example.com` apex custom domain; `www` redirects to the
apex via a Cloudflare Redirect Rule. A small Worker (`src/worker.ts`) handles
only `/api/*` (the demo-request endpoint, rate limited, email sent via Resend).

## Users

Owners and operators of growing Indian small and mid-sized businesses (user
confirmed: single-company SMBs are the primary audience). They run sales,
purchasing, stock, and billing on disconnected spreadsheets, WhatsApp threads,
and separate billing tools, and want one system where work started as a lead
ends as a GST invoice without re-keying.

Inside the product the same business has several roles: sales reps (leads,
quotations, planner), purchase staff (requisitions, POs, receipts), stores
(stock, transfers, delivery notes), accounts (invoices, expenses, payables),
HR (attendance, leave), and admins (companies, users, roles).

## Product Purpose

FlowX365 is a business management platform (the brand mark says "ERP") that
carries one piece of work through every stage it passes: lead, approval,
quotation, sales order, proforma, delivery note, sales invoice; and on the
buying side requisition, purchase order, goods/service receipt, purchase
invoice, payment. Stock moves because documents move. Success is a business
that can open any document and see where it came from and what it produced.

## Positioning

- **One record, carried forward.** A lead is picked once on the quotation and
  every downstream document inherits it ("One lead. One id. One history.").
  Each detail screen shows its origin and the documents it generated.
- **Documents that cannot disagree.** A Sales Invoice is a locked copy of its
  Sales Order; line fidelity and edit locks are enforced in the database, not
  just the form. Same for Proforma and Purchase Invoices.
- **Stock follows paperwork.** Posted GRNs add stock; delivery notes reserve on
  dispatch and issue on delivery; drafts never count as arrived.
- **Nothing prints that the user cannot control.** Every printed field is
  editable on the document's own form.

## Operating Context

Indian business context: GST (CGST/SGST/IGST split, HSN, place of supply),
rupee amounts in Indian units (₹12.5L, ₹1.2Cr), amount in words, financial-year
document series of the form `{CO}/{FY}/{DOC}/{NNN}` (e.g. `…/26-27/SO/001`).
Web app at app.example.com plus an Android app. Accounts are created by an
administrator (no self sign-up); sign-in by email/password or Google.
Biometric attendance from an eSSL X2008 terminal. Scheduled emails at 07:30
(morning plan), 19:00 (overdue digest), and 21:00 IST (attendance cutoff).

## Capabilities and Constraints

Shipped (safe to market):
- **CRM**: lead generation wizard, Lead Management command center (KPIs,
  stage funnel, board), Lead Approval, Sales Pipeline, CRM Performance
  (sales targets with rule-based insights).
- **Sales**: customers (branch hierarchy), quotations (revisions, PDF),
  sales orders (converted from quotation), delivery notes, Sales Tracker.
- **Purchase**: vendors, purchase requisitions, purchase orders (from PR or
  SO), GRN / SRN receipts, purchase returns and replacements, Purchase Tracker.
- **Inventory**: items (bulk upload), real-time stock tracking with warehouse
  breakdown and an inventory pipeline (pending GRNs / in-transit deliveries),
  warehouses, stock transfers.
- **Accounting**: proforma invoices, sales invoices, purchase invoices,
  expenses/vouchers, payment – payable.
- **Planner**: daily/weekly/monthly views, team schedule, meetings with GPS
  location capture, follow-ups; field-visit categories auto-file attendance
  field-visit requests.
- **HR**: biometric attendance with half-day cutoff and field visits, leave
  management, HR desk.
- **Platform**: multi-company with a company switcher, company-specific
  document series, three per-company PDF themes (Classic, Professional Blue,
  Executive Green), roles with granular permissions, revision history.
- **Data security** (user confirmed, 2026-10-19): each customer runs on a
  dedicated database (separate database environment per customer), customer
  data is isolated from other customers, and encryption controls protect
  sensitive business information. Safe to market; do not inflate into
  certifications, compliance standards, or audits that have not been stated.

Not shipped (sidebar shows "Soon" or a placeholder; must NOT be marketed):
chart of accounts, journal entries, banking, fixed assets, GST management
and TDS modules, all of Budget Planning, purchase quotations, standalone
reports. (Payment – Receivable has shipped: `ReceivablesScreen`, checked
2026-11-11.)

Product line on the site (user decision, 2026-11-03): FlowX365, FlowX
Billingsuite, FlowX SalesPro, FlowX HRMS and Payroll, FlowX Project365 (project lifecycle:
planning, budgeting, scheduling, resource allocation, execution, tracking) and
FlowX BudgetPro, all listed without a “Coming soon” status. The site also
offers custom software (“Customize Software Builder”) through the demo form.

Pending product-owner confirmation (2026-10-23): whether FlowX365 is AI-enabled
and whether payroll support is shipped. Current marketing copy mentions both;
do not add, remove, or strengthen either claim until confirmation. Performance
insights observed in the product code are rule-based.

## Brand Commitments

- Name: **FlowX365** (app title and docs use this casing). Mark: "FLOWX 365
  ERP" wordmark, `../flowx365-app/app/assets/images/logo.png`; app icon "X"
  mark, `../flowx365-app/app/assets/images/favicon.webp`.
- In-app palette: orange `#F5820A` / `#E06B00` primary, navy sidebar
  `#1A2340 → #0F1520`, surface `#F0F2F8`. Classic PDF theme uses navy + orange.
- Developed by Example Technologies.
- Primary CTA: request a demo through the on-site demo-request form
  (`POST /api/demo-request`), with email to **sales@example.com** shown as
  the fallback (user confirmed, 2026-10-19). No Sign in button anywhere on the site (user decision,
  2026-09-24); the app lives at https://app.example.com.

## Evidence on Hand

- Product truth: `../flowx365-app/docs/modules/*.md`, routes in
  `../flowx365-app/app/lib/app/router.dart`, sidebar labels in
  `../flowx365-app/app/lib/shared/widgets/sidebar.dart`.
- No customer names, testimonials, logos, user counts, statistics, awards,
  integrations, or partnerships are available. None may be invented.
- Pricing (owner decisions, 2026-11-11 to 2026-11-13): three final plans
  (Basic, Professional, Enterprise) with monthly and annual prices, included
  users and companies, and plan inclusions appear only on `/pricing`. Prices
  exclude GST. Discounts, warehouse limits and add-on rates are not set and
  must not be invented. The homepage carries no
  pricing. See `PRICING.md` for what is live, proposed, and pending.
  Real client company names and document series prefixes seen in the repo are
  private and must not appear on the site; product scenes use clearly
  illustrative sample data.

## Product Principles

1. Show the real product working; never describe a feature the app lacks.
2. The connected document chain is the story; modules are supporting cast.
3. Trust is earned through specifics (locks, origins, audit trails), not
   adjectives.
4. Speak to a busy owner in plain words; use the app's own terms for
   documents (Quotation, Sales Order, GRN, Delivery Note).

## Accessibility & Inclusion

WCAG 2.2 AA for contrast, keyboard access, and visible focus; readable
product UI on phones. `prefers-reduced-motion` removes non-essential entrances
and transitions, changes the document chain to natural flow, and shows the day
as a static timetable. Content remains visible without JavaScript; the global
enhancement marker is added only after homepage setup succeeds.
