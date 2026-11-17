# Stage — MVP Technical & Product Specification

**Read this alongside the Stage Vision document.** That document explains *why* Stage exists and what it should feel like. This document explains *what to actually build* for the MVP — screens, data, flows, and the rules that should never be broken regardless of how the implementation is built.

---

## 1. What Stage is, in one paragraph

Stage is a social-commerce platform where small businesses ("performers") get a storefront, and discovery of those businesses — not isolated products — is the core mechanic. A shopper ("audience") finds a business, reads the performer's own words about why they started, explores their storefront, and buys through a WhatsApp order flow that Stage routes but never holds payment for.

**Decision heuristic for anything ambiguous below:** Stage's first sellers have only ever been found by people who already knew them. A good implementation makes it easier for a stranger to find and trust that person. A bad one makes that harder, even by accident.

---

## 2. Core principle (governs every feature below)

> **Money can buy utility or amplification. It can never buy trust, rank, or relevance.**

Concretely:
- A seller can pay to confirm their identity. That payment has **zero effect on where they appear in discovery.**
- A seller can pay to boost a listing (a "Spotlight"), but **only after they've accumulated real, receipt-confirmed sales.** Money amplifies existing proof; it cannot manufacture proof from nothing.
- A seller can pay for utility — storefront themes, analytics, event participation. None of this touches rank or trust.
- The organic feed and search are **always ranked by peer proof and relevance, never by who paid.**

Any future feature should be checked against this rule before being built.

---

## 3. The two user types

### Performer (seller)
Builds a Stage before registering an account. Manages it through three simple surfaces: **My Stage** (storefront, products, categories, updates), **Backstage** (order management), **Stage Buzz** (views, followers, shares).

### Audience (buyer)
Picks a few interests (skippable) at onboarding. Browses through **Your Stage** (personalized feed), **Explore** (search + discovery, bubble and list views), **Following**, and **Orders**.

---

## 4. Performer journey (build order)

1. **Curtain / entry fork** — "I'm here to perform" vs. "I'm here for the show."
2. **Create Your Stage** (before registration):
   - Business name, logo/mark, short description
   - **Opening note** — free text, the single most important field on the page (see §8). Framed as its own step, not a buried form field.
   - **Categories** — seller-named, free text, not chosen from a fixed list (see §6.3)
   - **Products** — name, price, category, optional customization type (see §6.2)
   - **Order-routing channel** — the seller picks WhatsApp or Telegram and provides the matching contact handle (see §12). This is where buyer messages and orders will actually land, so it should be asked plainly, not assumed.
3. **Preview** — the storefront rendered exactly as a customer will see it.
4. **Register** — account details (name, phone, email, password). Deliberately asked *after* the seller has already seen what they built, not before.
5. **Go Live** — confirmation screen. This is the trigger for **Opening Night** (§7).
6. **Lands on My Stage** — dashboard with the three tabs below.

### My Stage / Backstage / Stage Buzz
- **My Stage**: edit storefront, products, categories, opening note.
- **Backstage**: order list, each with status (see §6.4), accept/decline, status advance.
- **Stage Buzz**: see §10 for the specific "no bare zeros" requirement — this is a UX rule, not a cosmetic one.

---

## 5. Audience journey (build order)

1. **Curtain / entry fork** — "I'm here for the show."
2. **Interest selection** — multi-select chips from a small fixed list (Fashion, Gifts, Decor, Beauty, Food, Tech, etc.). Skippable. Not a permanent restriction — just shapes the initial feed.
3. **Your Stage** — masonry feed (two-column), filterable by interest chips. Mix of product pins, text/promo cards, and business cards.
4. **Explore** — toggle between two views:
   - **Bubble view**: businesses rendered as floating bubbles, size loosely tied to recent activity, with a rotating "shout" callout surfacing a business's latest update above its bubble every few seconds. Tapping a bubble opens a quick preview (Follow / View Stage).
   - **List view**: same businesses as scannable rows, sortable (busiest / newest / A–Z), each row showing the latest shout and a thumbnail strip of products.
   - Search with recent searches, trending terms, and live result highlighting across both Businesses and Products.
5. **Business storefront** — see §6.1 for layout and required elements.
6. **Product page** — see §6.2 for the three customization tiers.
7. **Cart** — grouped by seller, each with its own subtotal, one grand total (see §6.5).
8. **Checkout** — splits the cart into one order per seller.
9. **Orders** — each order shows a status stepper (see §6.4).

---

## 6. Data structures

### 6.1 Business / Stage object
```
Business {
  id, name, logo, description,
  opening_note: string,              // see §8 — required field, shown above products
  opening_note_media: {type: enum [none, video, voice], url} | null,  // optional, see §9
  order_channel: enum [whatsapp, telegram],  // seller's choice — see §12
  contact_handle: string,            // phone number (WhatsApp) or @username (Telegram)
  city, category: enum,
  verified: boolean,                 // identity only — see §11
  opening_night_until: datetime|null, // see §7
  categories: [string],              // seller-defined, free text
  products: [Product],
  follower_count: int,               // only rendered in UI if > 0, see §10
  drop: Drop | null                  // see §6.6
}
```

### 6.2 Product object and the three customization tiers
```
Product {
  id, name, price (nullable — null = "ask price" / custom request),
  category: string,                  // matches one of the business's own categories
  availability: enum [available, sold_out, restocking],
  customization_type: enum [none, configurable, personalized, request],
  media: [{type: enum [image, video], url}]  // video freely encouraged here, see §9
}
```
- **none** — fixed product, straight add-to-cart.
- **configurable** — buyer picks from seller-defined options (size, color, etc.). Required selection before add-to-cart.
- **personalized** — buyer fills in free fields (name to engrave, message, font choice). Required before add-to-cart.
- **request** — buyer describes what they want in free text; no price shown upfront. Seller reviews and confirms a price before anything is made. This is **not** a standard cart item — it should route as a message/request, not an instant add-to-cart.

Do not build a generic rules-based configuration engine. These three tiers are intentionally the entire scope.

### 6.3 Categories
Categories belong to the business, not to a platform-wide taxonomy. Do not hardcode a fixed category list for products within a storefront — the seller names their own ("Arabian Mists," "Two Pieces," "Gift Boxes"). The fixed interest list in §5 (Fashion, Gifts, etc.) is a separate, higher-level thing used only for discovery filtering — never conflate the two.

### 6.4 Order object and status lifecycle
```
Order {
  id, business_id, buyer_id,
  items: [CartItem],
  status: enum [pending, confirmed, processing, ready, completed] (+ optional: declined, cancelled),
  receipt_code: 4-digit string,       // see §12
  total: number,
  created_at
}
```
Status changes are seller-driven (via Backstage), visible to the buyer in Orders as a stepper, not a raw status string.

### 6.5 Cart
Cart items are grouped by seller. Each group shows its own subtotal; the cart as a whole shows one grand total. **Checkout creates one Order per seller group** — never one combined cross-seller order. This has been a settled decision since early in the vision work; do not flatten it.

### 6.6 Drop object
```
Drop {
  title, note, reveal_time: datetime,
  extra_product: Product | null   // revealed into the storefront when the drop opens
}
```
A Drop is a performer's own scheduled reveal — curtain, countdown, optional "peek" preview. **Never use the word "Drop" for a paid placement or promotion** (see §11) — it is reserved for this feature only.

---

## 7. Opening Night (cold-start discovery — do not skip this)

**The problem:** every ranking mechanism elsewhere in this spec (bubble size, feed position, search relevance) rewards existing activity. A brand-new seller with zero followers and zero sales has no activity to be ranked on, which means a naive implementation will systematically bury exactly the sellers Stage exists to help.

**The fix:** for a fixed window after a performer goes live (`opening_night_until` on the Business object), that business gets **guaranteed placement** in discovery — a protected slot in the feed and Explore, visually marked (e.g. a distinct ring color or "Opening Night" label), **outside of and never competing with the normal engagement-based ranking.**

- The exact window length (days, or a fixed number of impressions) should be treated as a pilot variable to test, not a number to lock in blindly.
- When the window ends, do not frame it in the UI as a loss. Suggested approach: tie future spotlighting to the already-existing **Drop** feature (a seller can always schedule another moment of guaranteed attention) rather than implying "your one chance is over."
- Do not silently show the seller a "why didn't this work" diagnostic tied to the end of the window. If their note genuinely needs revision, that should be an always-available action, not a reaction prompted by a quiet launch.

---

## 8. The opening note (not a form field — a discovery mechanic)

The opening note is free text answering something like "why did you start this, what do you want people to feel." It is **not** cosmetic copy. For a brand-new seller with no sales, no reviews, and no history, the note is the only thing capable of doing the entire job of persuading a stranger to look closer. Build it accordingly:

- It must render **above product listings** on the storefront, not below or in a secondary "About" tab.
- It should be asked for as its own dedicated step during Create Your Stage, not bundled into the general description field.
- Editing the note should be available at any time, framed as normal upkeep ("update your note anytime"), never surfaced as a correction prompted by poor performance.

---

## 9. Optional video and voice media (presentation, never a requirement)

Some sellers are ready to be on camera. Others are not — and the shy, not-yet-confident seller is explicitly part of who Stage's MVP is for (§1). The rule that resolves this: **video is additive, never a substitute, and never advantaged by the system.**

- **The opening note stays text-required.** A seller who wants to can attach a short video or voice clip alongside it. The text is never optional; the media always is.
- **A text-only storefront must never read as incomplete.** No "finish your profile" nagging, no visual sense of absence next to a seller who added video. Both are simply a finished Stage, presented two honest ways.
- **Discovery must be fully blind to this choice.** Opening Night placement, bubble size, feed ranking, and search relevance must never weight whether a seller used video, voice, or text alone. The moment video-equipped sellers quietly outrank text-only ones, capability has become a new, unintended form of paid-for trust — the exact thing §2 exists to prevent, just arriving through equipment instead of money.
- **Product pages are a lower-stakes, better home for video.** A demo clip showing a product in use is presentation, not identity — freely encouraged for any seller who has one, with no fairness concern attached, since product media was never the thing carrying a stranger's first trust decision (the note is).
- **Keep clips short — 30 to 90 seconds is enough for an opening-note attachment.** This matches the note's actual job (a quick, honest introduction) and keeps hosting costs predictable.
- **Cost is genuinely small at MVP scale.** A per-minute billed provider (e.g. Cloudflare Stream: ~$0.005/min stored, ~$0.001/min delivered) comfortably handles a few hundred sellers for a few dollars a month. Do not over-invest in custom video infrastructure for the MVP.
- **Moderation is new surface area text didn't require.** Any uploaded video or voice clip needs a basic review step before going live — manual review is sufficient at MVP scale, but it must exist; do not skip it because it feels like a small feature.

---

## 10. "Absence isn't negative" — a UI rule, not a suggestion

A brand-new seller has 0 followers, 0 reviews, 0 sales. **Never render that as a bare "0."** A zero reads as a warning to a stranger, even though a brand-new honest seller and a struggling one would show the identical number.

- If a stat has no real data yet, **do not display the stat at all.** Replace it with a neutral, honest marker — e.g. "New to Stage" / "Opening Night" instead of "0 reviews."
- The moment real data exists (first follower, first view, first share), switch permanently to showing the real number. Do not revert to a waiting-state after a quiet period once something real has happened once.
- This applies identically to the **seller's own Stage Buzz dashboard**, not just the public storefront. A seller checking their own dashboard and seeing flat zeros for days is a real churn risk — use waiting-state language there too ("Waiting for your first view — once people start finding your Stage, you'll see it here"), not raw stat tiles.
- Never show a brand-new seller comparative numbers from other sellers on their own dashboard.

---

## 11. Trust and verification — two separate things, do not merge them

- **Identity verification** (one-time, paid or free — a business decision, not a technical one): confirms a seller is a real person. Produces a "Verified" badge. **Must have zero effect on search ranking or feed placement.**
- **Spotlights** (paid, repeatable): a boost that places a listing in a clearly labeled, separate zone (never blended into organic ranking, never called a "Drop"). **Gated** — only purchasable after a seller crosses a minimum threshold of real, receipt-confirmed sales (exact number is a pilot variable, not a fixed constant — do not hardcode without testing).

A subscription or badge that grants both identity confirmation *and* improved ranking in exchange for one payment violates the core principle in §2 and should not be built.

---

## 12. Order flow, channel choice, and the receipt code

- **Stage does not assume every seller uses WhatsApp.** A seller chooses their order-routing channel — currently WhatsApp or Telegram — during Create Your Stage (§4), and every "message seller" or "order" action on their storefront routes there. Build this as a real choice on the Business object (§6.1), not a hardcoded WhatsApp-only flow.
- Both channels work the same free way: a **pre-filled deep link** that the *buyer* taps to open their own chat with the seller, order details already in the message.
  - WhatsApp: `wa.me/<number>?text=<encoded order>`
  - Telegram: `t.me/<username>?text=<encoded order>` — note this requires the seller to have a public Telegram @username set. A phone number alone, which is enough for WhatsApp, is not enough for Telegram's version of this link.
- **Do not build either channel on its paid official API** (WhatsApp Business API, Telegram Bot API) for MVP. The free deep-link approach works for both and is sufficient at this stage; moving either one to a paid API is a deliberate future decision, not a default.
- After a sale, the buyer and seller confirm it with a **4-digit receipt code**, regardless of which channel the order went through — the receipt flow is channel-agnostic by design. This receipt history is what powers: Backstage order status, Stage Buzz stats, and Spotlight eligibility (§11).
- Payment itself stays directly between buyer and seller for the MVP, on whichever channel they're already talking on. (Note: in-app payments are a planned future phase, not in MVP scope — see §13.)

---

## 13. Explicitly out of scope for MVP

Do not build these now. They are acknowledged future phases, not oversights:
- In-app / Stage-held payment processing
- Logistics / delivery management or dispatch booking
- Content-creation *tooling* for sellers — i.e. in-app filming, editing, or production tools. Uploading a video or voice clip a seller already made elsewhere is in scope (§9); building the tools to produce one is not.
- Advanced seller analytics beyond basic Stage Buzz counts
- Any AI-driven recommendation engine (discovery is interest-tag + organic ranking only for MVP)
- Sales chatbot / automated seller-side assistant
- Coupons, haggling, or in-app spending limiters
- Mandatory KYC/ID/permit requirements before a seller can list a product (identity verification exists, but it is **optional** and **never a listing gate**)

---

## 14. Quick checklist for any new feature not covered above

- [ ] Money, equipment, or technical confidence influences rank, trust, or relevance (§2, §9, §11)?
- [ ] Lists a seller's absence of data as a negative number instead of a neutral "new" state (§10)?
- [ ] Collects a seller's physical address or room-level location — a real safety risk, not just a privacy preference?
- [ ] Only useful to a seller who's already established, rather than one whose only customers so far are people who already knew them?

Any "yes" means stop and reconsider before building.
