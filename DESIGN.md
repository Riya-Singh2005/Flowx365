---
name: FlowX365
description: Marketing surface for FlowX365, built as a triplicate bill book.
colors:
  cover: "#0f1520"
  cover-deep: "#0b101b"
  cover-mid: "#141b30"
  cover-high: "#1a2340"
  on-cover: "#f7f8fa"
  on-cover-muted: "#b9c0d0"
  on-cover-faint: "#8a93a8"
  sheet-original: "#f7f8fa"
  sheet-duplicate: "#f4c7d2"
  sheet-triplicate: "#f4e07e"
  ink: "#111827"
  ink-muted: "#374151"
  ink-faint: "#5b6472"
  ink-faint-duplicate: "#6e3b4a"
  ink-faint-triplicate: "#5c5220"
  carbon: "#2f3296"
  live: "#f5820a"
  live-hover: "#ff9426"
typography:
  display:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(4.25rem, 0.8rem + 14.2vw, 16rem)"
    fontWeight: 800
    lineHeight: 0.84
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 1.6rem + 5.6vw, 7.5rem)"
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 112"
  title:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.125rem, 1.4rem + 3.3vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 112"
  body:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.55
    fontVariation: "'wdth' 100"
  lede:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.1875rem, 1.1rem + 0.45vw, 1.4375rem)"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontWeight: 700
    letterSpacing: "0.06em"
    fontVariation: "'wdth' 125"
  serial:
    fontFamily: "Geist Mono Variable, Geist Mono, ui-monospace, monospace"
    fontSize: "clamp(0.8125rem, 0.78rem + 0.15vw, 0.875rem)"
    fontWeight: 500
    letterSpacing: "0.02em"
    fontFeature: "'tnum'"
rounded:
  sheet: "3px"
  ui: "10px"
  ui-lg: "12px"
  app-window: "14px"
spacing:
  gutter: "clamp(1rem, 0.4rem + 2.6vw, 3rem)"
  stub: "clamp(0px, -3.2rem + 11vw, 8.5rem)"
  section: "clamp(6rem, 3.5rem + 10vw, 13rem)"
  nav: "4.25rem"
components:
  button-primary:
    backgroundColor: "{colors.live}"
    textColor: "{colors.ink}"
    rounded: "{rounded.ui}"
    padding: "0 1.35rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.live-hover}"
    textColor: "{colors.ink}"
  button-primary-large:
    backgroundColor: "{colors.live}"
    textColor: "{colors.ink}"
    rounded: "{rounded.ui-lg}"
    padding: "0 1.9rem"
    height: "3.75rem"
  sheet-original:
    backgroundColor: "{colors.sheet-original}"
    textColor: "{colors.ink}"
  sheet-duplicate:
    backgroundColor: "{colors.sheet-duplicate}"
    textColor: "{colors.ink}"
  sheet-triplicate:
    backgroundColor: "{colors.sheet-triplicate}"
    textColor: "{colors.ink}"
  cover:
    backgroundColor: "{colors.cover}"
    textColor: "{colors.on-cover}"
  choice-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.sheet-original}"
    rounded: "{rounded.ui}"
    height: "3rem"
---

# Design System: FlowX365

## Overview

**Creative North Star: "The Triplicate Bill Book"**

The site is a bill book, the object every Indian business already writes in: a navy cover, numbered sheets, and carbon copies beneath each original. Write once on the top sheet and the impression passes through every copy. That is also what FlowX365 does with a quotation, a sales order, a delivery note and an invoice, so the metaphor carries the product's mechanism instead of decorating it.

The page reads like a stack of sheets slid over one another. Each chapter is a full-bleed sheet in one of the statutory copy colours, with a perforated top edge and a counterfoil stub down the left carrying its printed serial. Typography is editorial and very large: wide, heavy Archivo caps for covers, heavy sentence-case display for sheets, and a mono voice kept strictly for document numbers, times and serials. Density swings deliberately: huge statements and quiet whitespace, then a dense, faithful rebuild of the real application.

**Key Characteristics:**
- Navy covers bracket the book (first viewport and close); sheets in between.
- Flat colour fields at page scale. No gradients, glass or glow on the site's own chrome.
- Carbon blue marks anything carried forward rather than typed.
- One live colour, orange, for the primary action and the current state only.
- Real product screens rebuilt from the app's own tokens, always labelled as illustrative data.

## Colors

A committed palette: navy binding, three statutory copy colours, carbon ink, and a single live orange.

### Primary
- **Live Orange** (#f5820a): the FlowX365 brand orange. Only for the primary action (Request a demo) and the live or current state: the current node on a trail, the moving head of the day rule, the value that just changed. Hover lifts to (#ff9426). Text on it is ink, never white (white on orange fails contrast).

### Secondary
- **Carbon Blue** (#2f3296): the colour of a carbon impression. Every line, name or total that a document inherited from the one before it is set in carbon. Never on navy (1.8:1).

### Tertiary
- **Duplicate Pink** (#f4c7d2) and **Triplicate Canary** (#f4e07e): the statutory second and third copies. Used as whole-sheet fields, as the tint of a copy document, as the colour of the fanned headline copies on a cover, and as highlighter ink on the other copy colour.

### Neutral
- **Binding Navy** (#0f1520), with **Deep** (#0b101b) for the dimming veil, **Mid** (#141b30) for the chain chapter and **High** (#1a2340) for scrollbars and the app sidebar.
- **Original White** (#f7f8fa): the top sheet, and all text on navy.
- **Cover Greys** (#b9c0d0 body, #8a93a8 faint) for secondary text on navy.
- **Ink** (#111827), **Ink Muted** (#374151), **Ink Faint** (#5b6472) on white sheets. On coloured sheets the faint ink is tinted from the sheet: (#6e3b4a) on pink, (#5c5220) on canary.

### Named Rules
**The One Live Colour Rule.** Orange means "act here" or "this is happening now". Decorative orange, in a headline word, a highlighter or an ornament, is a defect.

**The Carbon Rule.** Carbon blue marks inheritance. If a value was typed on this document, it is ink; if it arrived from the document before, it is carbon.

**The Tinted Grey Rule.** Secondary text on a coloured sheet takes that sheet's hue, never a neutral grey that drops below 4.5:1.

## Typography

**Display Font:** Archivo Variable (width 62–125, weight 100–900), self-hosted
**Body Font:** Archivo Variable at width 100
**Label/Mono Font:** Geist Mono Variable, for data only

**Character:** One grotesk stretched across its width axis. Expanded caps read as the printed header of a bill ("TAX INVOICE"); normal width carries the reading. Mono appears only where a bill book would print numbers.

### Hierarchy
- **Display** (800, clamp(4.25rem → 16rem), 0.84, width 125, uppercase): covers only. Opening and closing statements. The opening cover keeps four lines (“Write it / once. / Let it / flow.”) and takes the largest size allowed by the space between its document fans and the available viewport height.
- **Headline** (800, clamp(2.75rem → 7.5rem), 0.94, width 112): one per sheet, sentence case, max 11–15ch, balanced wrapping.
- **Title** (800, clamp(2.125rem → 4.5rem), 1, width 112): step titles, questions on white, current-event titles, closing statements.
- **Lede** (400, clamp(1.1875rem → 1.4375rem), 1.5): the sheet's explanatory paragraph, max 34em.
- **Body** (400, clamp(1rem → 1.125rem), 1.55): lists, answers, notes.
- **Feature title** (700, width 100): benefit, card and index-row titles.
- **Label** (700, width 125, uppercase, 0.06em): printed-form headers ("PARTICULARS", module names, meta lines, "where" references).
- **Interface** (600, width 106): navigation and footer links, buttons, quiet links, form labels.
- **Serial** (Geist Mono 500, 0.8125–0.875rem, tabular; 0.08em when uppercase): document numbers, times, chapter serials, kickers, "Illustrative data".

### Tokens
Every site role takes its weight, width and tracking from `:root` in `src/styles/global.css`; sizes stay on `--step-*` and `--display-*`.
- Weights: `--weight-regular` 400, `--weight-semibold` 600, `--weight-bold` 700, `--weight-heavy` 800. Geist Mono stays at 500.
- Widths: `--wdth-text` 100, `--wdth-ui` 106, `--wdth-head` 112, `--wdth-caps` 125.
- Tracking: `--track-display` -0.035em, `--track-caps` 0.06em, `--track-mono-caps` 0.08em.
- A heading that sits in a narrow column (the sticky Security at Every Layer headline, its closing statement) keeps its role's weight, width, tracking and leading and bounds only its size with `min(var(--display-*), …)`.

### Exceptions
- Covers (hero, closing cover, chain and day numerals, demo dialog title) use Display: uppercase at width 125.
- The FlowX365 wordmark keeps width 115 as a logotype.
- The muted “First, what is FlowX365, actually?” question is Title at 700 so the heavy answer below it leads.
- In No. 01 the products table (columns Sr., Product Name, For) sits beside a sticky left column: the lede, then the Customize Software Builder note ruled off in 2px ink, a mono label, the 800-weight slogan “Your business. Your software.”, one line of copy and a quiet carbon link that opens the demo form. At 960px and below the note follows the table, ruled in 1px.
- Recreated product screens and documents (app windows, GST documents, printed PDFs) keep the real app's own type sizes and weights and sit outside these tokens.

### Named Rules
**The Mono Is Data Rule.** Monospace sets document numbers, clock times, serials and data labels. Descriptive prose in mono is costume.

**The No Eyebrow Rule.** Headings stand alone. Serials live in the counterfoil stub, never as a small label above a heading.

## Layout

Every sheet is full-bleed with a counterfoil stub on the left (width clamp(0 → 8.5rem), dashed right rule, vertical serial that sticks under the nav) and content inset by the stub plus a fluid gutter (clamp(1rem → 3rem)). The stub disappears below 760px. Sections breathe on a shared rhythm (clamp(6rem → 13rem)), with more space above a headline than below it. Above 900px the opening cover uses `100svh` as a minimum; at 900px and below it follows its content so the Security sheet's perforated edge appears without an empty navy interval. The centred four-line “Write it once. Let it flow.” slogan is flanked by real `DocSheet` fans: Quotation over Sales Order on the left, Tax Invoice over Delivery Note on the right. The sheets enter from the edges, lean away from the pointer on springs and open outward with the scroll lift; at 900px and below they fan up from the bottom. The cover carries one supporting line and a “Scroll to see how it flows” cue linking to `#what`, set small (0.875rem, weight 500, `--on-cover-2`) so it reads as a quiet cue under the slogan and lede; it has no separate CTA or brand lockup because the fixed navigation carries both. Only the top slogan copy is the `h1`; the decorative copies are hidden from assistive technology. Primary section introductions use editorial justification only above 1080px, while intermediate and mobile prose stays left-aligned. No sheet edge may cover the slogan or scroll cue.

An unnumbered Enterprise Data Security sheet sits between the cover and No. 01. It takes over the cover's negative paper reveal without changing the numbered chapter manifest. The sheet opens with a two-column promise-and-explanation composition above 1080px and stacks that story with naturally left-aligned prose at intermediate and mobile widths. It is followed by the Security at Every Layer index: a thin-ruled, numbered five-row index on the left, closed by the closing statement ruled off in ink, while the oversized two-line headline starts level with row 01 in the right column, then holds the vertical centre of the viewport while the rows scroll. Below 760px the layers headline comes first and nothing is sticky. The index block is a full-bleed Binding Navy band that runs to the end of the sheet, set in cover inks, and the fixed navigation turns navy over it. Each row has its own light ground mixed from the sheet palette (carbon, canary, pink, slate, and a canary-pink blend); the current row takes that ground with paper inks, a 2px ink rule and an orange current-state marker. On screens wider than 760px the row crossing the middle of the viewport becomes current, and clicking, tapping or focusing a row makes it current, without scroll-jacking. Below 760px the rows read as a plain sequence. The index and closing statement remain naturally left-aligned.

Product chapters use a full-width headline, then two columns of copy and screen that alternate sides from chapter to chapter. A screen may bleed to the viewport edge, but never past it. Three pinned scenes (the chain, the day, and the question pad) are sticky 100svh stages inside tall scroll tracks; without JavaScript they fall back to plain stacked content. Scroll-linked motion is always measured against a stage's own 100svh height, never `window.innerHeight`, so a phone's address bar cannot make it jump. The cover lift is triggered, not scrubbed: an IntersectionObserver flips the cover to lifted after about 4svh of scroll and to covered at about 44svh. The pointer trail runs a `requestAnimationFrame` loop only while its critically damped springs are moving, writes only the copies' `translate`, and stops when they settle. A scrubbed version stuttered in real use and must not return. Mobile compositions are designed separately: four-line cover type sized to the width, two-column KPIs, and the chain trail dropped in favour of the step numeral. Compact document sheets keep body data at 12px or larger and data labels at 11px or larger. Short phones up to 600px wide and 820px high cannot reliably contain both chain copy and a full document in a pinned stage, so each step is paired with its document in natural flow instead.

### Responsive and motion conventions

- The cover slogan keeps its four line breaks at every width; its duplicate and triplicate copies are visible only while lifting, trailing or performing the one-time landing ripple.
- Through 1080px Security's introductory story stacks and primary introduction prose stays left-aligned. Desktop composition and justification resume above 1080px.
- Phone navigation keeps the accessible mark, primary demo action, and 44px Contents control. The visible wordmark collapses below 560px.
- At 320px, dense tracker rows become labelled records while retaining table semantics; decorative print-copy offsets shrink without hiding PDF content.
- The global `.js` marker is applied only after homepage enhancement setup succeeds. Server-rendered and JavaScript-disabled content is visible by default.
- Incoming reveals start as an element reaches the viewport edge and run for 400–700ms with 50–60ms steps. The protected local `#security`, `#products` and `#chain` roots retain their previous 10% inset trigger, 700/900ms transitions and 70/90ms steps.
- `prefers-reduced-motion: reduce` removes entrance and transition motion, presents the chain in natural flow, and replaces the scrubbed day scene with its complete timetable. Essential copy and controls are immediately available.

## Elevation & Depth

Depth comes from paper, not from UI chrome. Sheets overlap as physical layers: a sheet sliding over the cover casts a soft upward shadow, stacked question sheets shadow the one beneath, and document copies sit on a pad at small offsets.

### Shadow Vocabulary
- **Sheet over cover** (`box-shadow: 0 -30px 60px -20px rgb(0 0 0 / 0.45)`): the first sheet lifting over the navy cover.
- **Stacked sheet** (`box-shadow: 0 -24px 48px -24px rgb(15 21 32 / 0.35)`): each question sheet over the one before.
- **Document on the desk** (`box-shadow: 0 1px 1px rgb(0 0 0 / 0.12), 0 30px 60px -24px rgb(0 0 0 / 0.55)`): paper documents and PDFs.
- **App window** (`box-shadow: 0 1px 2px rgb(15 21 32 / 0.08), 0 24px 60px -18px rgb(15 21 32 / 0.35)`): recreated product screens.

### Named Rules
**The Paper Depth Rule.** Only paper and the app window cast shadows. Buttons, chips and text never do.

## Shapes

Paper is nearly square (3px). Interactive controls are softly rounded (10px, 12px for large). The recreated app keeps its own radii (12px cards, 20px pills, 14px window). Perforation is the signature edge: a row of 3.2px holes every 14px along each sheet's top, showing the colour of the sheet beneath. Dashed rules separate stubs, counterfoils and footers, like the tear lines on a bill.

## Components

### Buttons
- **Shape:** gently rounded (10px; 12px at large size).
- **Primary:** live orange with ink text, 3rem high (3.75rem large), weight 600 at width 106; an arrow icon for forward actions.
- **Hover / Focus:** lightens to #ff9426 on fine pointers only; presses to scale(0.97) over 140ms; a 2px orange focus ring offset by 3px.
- **Quiet link:** weight 600, arrow icon that nudges 3px on hover. Used for secondary paths such as "Now write the same order once". There is no Sign in button on the site.

### Choices (segmented radios)
- **Style:** labels with a 1.5px rule border that wrap a visually hidden radio. Selected fills ink with white text. The radio sits inside its label, so clicking never scrolls the page.
- **State:** focus-visible rings the label; press scales to 0.97. Theme and pipeline switches work without JavaScript through `:has()`.

### Navigation
- **Style:** fixed 4.25rem bar: brand, chapter links, Request a demo. It is a transparent masthead on the cover, then goes quiet once the first sheet passes: the links give way to an empty centre (no section name is shown in the bar) and the bar takes the solid colour of the sheet beneath it. A Contents button opens the numbered chapter manifest (menu icon on phones); the manifest lists the six products under No. 01 and scrolls inside itself on short screens. The Product link goes to the product table (`#products`) and sits beside a separate chevron toggle that opens a products dropdown in the Contents card style; the FlowX365 entry (here and in the Contents manifest) goes to the homepage hero at `/` (on the homepage it scrolls to the top, since the hero is a sticky cover, and the address stays a plain `/`), and every other product entry goes to the product table. Links to `#products` glide there (instant under reduced motion) and close any open menu; other nav links jump as before. Every in-page link to a section shows that section's own path instead of a `#` fragment: clicking How it works scrolls to `#chain` and the address becomes `/how-it-works` (one history entry per click, so Back returns to the previous section). The paths are What it is `/what-it-is`, product table `/products`, `/how-it-works`, Leads `/leads`, `/quotes-to-orders`, `/purchase-and-stock`, `/printing`, `/a-day`, `/questions` and `/details` (`src/data/sections.ts`). Each path is a static copy of the homepage (`src/pages/[section].astro`, canonical `/`) that scrolls to its section on load; an old `#section` link is rewritten to its path. The hrefs stay real anchors for no-JS use, and the skip link moves focus to `main` without changing the address. The brand (here and on the 404 page) is two links: the X mark, a 44px target, opens https://staging.example.com in a new tab (target=_blank, rel=noopener noreferrer) with the label “FlowX365 demo environment (opens in a new tab)”; the FlowX365 wordmark goes to the homepage hero at `/` (label “FlowX365 home”), scrolling to the top when already on the homepage. The wordmark stays at every width; below 560px it steps down to 1rem and below 340px to 0.9375rem, so the demo action and 44px menu control still fit at 320px. A last primary link, Pricing, goes to the separate `/pricing` page; there it carries `aria-current="page"` and a 2px orange underline (the current state). The Contents manifest ends with an unnumbered Pricing row below a dashed tear line, so phones reach it too. On any page other than the homepage (`Nav current="pricing"`), section links use their paths (`/how-it-works`, `/products`) through `sectionHref` in `src/data/sections.ts` instead of fragments, as do the closing cover's footer links (`Close onHome={false}`).

### Sheet
The page's structural unit: a full-bleed field in original, duplicate or triplicate, with a perforated top edge, a counterfoil stub and its serial. Chapters are sheets; covers are navy fields.

The security front matter is an original sheet but not a numbered chapter. Its stub reads “Security · Original,” the fixed navigation reports “Enterprise data security” while it is current, and the existing No. 01-09 labels remain unchanged.

### Rate card (`/pricing`)
The pricing page continues the book. A navy cover (three-line Display caps “A plan / for every / stage.”, last line canary, then the lede and a “See the plans” link) leads onto the same navy desk, where three rate sheets lie side by side: Basic on Original, Professional on Duplicate and Enterprise on Triplicate, each a 3px paper sheet with a perforated top edge showing navy, the Document on the desk shadow, a mono serial, form-header caps for the plan name, a heavy tabular price, a mono “GST treatment to be confirmed” line, an indicative contents list (carried-forward lines such as “Everything indicated for Basic, and:” in carbon), and a dashed tear-line counterfoil holding the action. All three sheets take the same orange Request a Demo button. The recommended Professional sheet sits level with the others (tops align), marked only by an ink rubber stamp rotated −4° and a deeper desk shadow. On desktop the sheets share four row tracks through CSS subgrid (head, price, contents, counterfoil), so prices, capacity badges, first product headings and buttons line up across the set; every sheet lists its modules one per row inside a scrollable window that drifts slowly up and down where the list is longer than the window, and holds still under the pointer, on keyboard focus, while a module is open, and always for reduced motion and touch. The 30-Day Free Trial tag beside the switch is two centred lines: bold canary caps, then a smaller supporting line. All three open the shared demo dialog. A Monthly/Annual segmented switch (radios, CSS `:has()`, no script) replaces every price with “Annual pricing coming soon”; it never shows an invented figure. Below 1080px the sheets stack, and a sheet wider than 34rem (container query) reads like a bill with name and price on the left and contents on the right. The page is deliberately compact: each rate sheet fits within one screen below the navigation (about 600px at desktop), the following sections use a shorter rhythm (clamp(3.5rem → 7rem)) instead of the homepage's `--section`, their headlines are Title (`display-m`) with the lede beside them, and the closing cover runs in its `compact` variant. The sheets that follow cycle the copy colours (schedule Original, add-ons Duplicate, terms Triplicate, why Original, questions Duplicate) and close on the shared navy cover with a duplicate-coloured perforation. The schedule is a particulars table; below 760px a Basic/Professional/Enterprise switch shows one plan column at a time instead of a wide table. A capability not indicated for a plan reads TBC (to be confirmed), never a cross; capabilities shared by every plan are printed once as an “Every plan:” line under the table. Terms sit in three columns, and Why is a five-up strip. Terms carry printed status boxes: Planned (solid rule), To be confirmed (dashed rule) and On request (ink fill).

### Document sheet
A faithful GST document (quotation, sales order, delivery note, tax invoice) in the copy colour of its step. It carries the letterhead with form-header caps, a mono document number, bill-to and lead in carbon, ruled line items with HSN, CGST/SGST totals, amount in words, and a footer with the copy name and "Illustrative data". It adapts with container queries (HSN and rate drop below 30rem).

### App window
The product rebuilt from the app's tokens (orange #f5820a, navy sidebar gradient, #f0f2f8 ground, its own badge palette) inside a 14px window: sidebar with an orange-tinted active item, a top bar with breadcrumb and company switcher, and content. The sidebar is optional; container queries reflow KPIs to 3 and then 2 columns.

## Do's and Don'ts

### Do:
- **Do** make every chapter a sheet: full-bleed copy colour, perforated edge, stub serial.
- **Do** set inherited values in carbon (#2f3296) and typed values in ink.
- **Do** label every recreated product screen "Illustrative data" at 4.5:1 or better.
- **Do** keep display headlines inside their column. Move a headline to full width rather than letting a word clip.
- **Do** let scroll scenes explain something real: a document being made from another, stock moving, a working day passing.

### Don't:
- **Don't** use orange for anything that is not the primary action or the current state.
- **Don't** show the slogan copies at rest; a static offset reads as a drop shadow. They fan during the cover lift, trail a moving pointer on critically damped springs, and ripple once after the slogan lands. Whenever motion settles they return underneath and hide; reduced motion disables the effect.
- **Don't** put descriptive text in monospace, or put small labels above headings.
- **Don't** use gradients, glass, glow or generic icon tiles in the site's own chrome.
- **Don't** show ledger, banking or GST-return modules as shipped. Budget planning appears only as FlowX BudgetPro in the product table (no “Coming soon” status since 2026-11-03). AI enablement remains pending product-owner confirmation; do not add, remove or strengthen that claim until confirmed. The HRMS and Payroll module list on `/pricing` was confirmed live by the owner (2026-11-14); see PRICING.md.
