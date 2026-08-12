# Handoff: "The Next Layer of Intelligence" — full-bleed video hero

## Overview
A single-viewport, dark cinematic landing hero for an AI-infrastructure product. One composition: brand mark, centered nav, one headline, one sub, a CTA pair, a full-bleed looping background video, and a four-logo partner strip sitting in the bottom fade. No scrolling, no cards, no secondary marketing blocks.

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype showing intended look and behavior, not production code to copy directly. The task is to **recreate this design in the target codebase's existing environment** (React, Vue, Next.js, SwiftUI, etc.) using its established patterns and libraries. If no environment exists yet, pick the most appropriate framework and implement it there.

`The Next Layer of Intelligence.dc.html` opens directly in a browser (it loads `support.js`, a runtime that renders the markup). Read it as HTML + CSS — the CSS in its `<style>` block is the spec; the small JS class only wires the mobile menu and forces video autoplay.

## Fidelity
**High-fidelity.** Every position, size, and color is measured against a reference canvas of **1487 × 1058**. A 1487×1058 desktop screenshot should match to the pixel. Recreate exactly.

## The unit system (implement this first — everything depends on it)
Layout is **locked to viewport height**, not width, so the vertical rhythm always fills the screen.

```css
:root{
  --u:  calc(100vh / 1058);   /* 1 design px, height-locked */
  --uw: calc(100vw / 1487);
  --h:  clamp(var(--u), calc(var(--u) * .65 + var(--uw) * .35), calc(var(--u) * 1.16));
}
@supports (height:100dvh){ :root{ --u: calc(100dvh / 1058); } }
```
- `--u` drives structure (nav, brand, logo strip, video plate, edge fades).
- `--h` drives hero type and CTAs — grows up to **+16%** on ultra-wide, never shrinks below `--u`.
- Every measurement below written as `Nu` means `calc(N * var(--u))`; `Nh` means `calc(N * var(--h))`.

Portrait (`max-aspect-ratio: 11/10`) switches to a flex-column flow layout:
- phone: `--m: min(100vw/430, 1.34px)`; `--u: var(--m)`
- tablet band (`min-width:600px` and same aspect cap): `--m: min(100vw/860, 100vh/760, 1.25px)`

## Screens / Views

### Hero (the only view)
**Purpose:** state the product proposition and route the user to "Get Started".
**Layout:** `.stage` is `position:fixed; inset:0; overflow:hidden;` on `#050505`, with `env(safe-area-inset-*)` padding. `html, body { height:100%; overflow:hidden }`. Desktop children are absolutely positioned inside the stage; z-order is plate (0) → hero (2) / logos (2) → topbar (3) → mobile menu (5).

**Components (desktop, absolute):**

| Element | Position | Size | Type | Color |
|---|---|---|---|---|
| `.brand` (SVG mark) | left `75u`, top `27u` | `31.5u × 48.5u` | — | gradient, see Assets |
| `.links` nav | left `50%`, top `51u`, `translate(-50%,-50%)` | auto | 19u / 400 | `--nav` #b6b5b5 |
| `.pill-nav` | right `75.4u`, top `27u` | `175u × 49u`, radius 999px | 20.6u / 500 | #fff bg, #050505 text |
| `.headline` | left `75.5u`, top `230.5u` | nowrap, 2 block spans | 71.6h / lh 80.5h / 400 / ls 0.3h | `--ink` #fafafa |
| `.sub` | left `75.5u`, top `230.5u + 189h` | 2 nowrap block spans | 20.7h / lh 23.5h / 400 / word-spacing 1.8h | `--muted` #a7a6a6 |
| `.pill-cta` | left `74.9u`, top `230.5u + 264.5h` | `175.6h × 50h`, radius 999px | 20.6h / 500 | #fff bg, #050505 text |
| `.ghost` | left `74.9u + 220.6h`, top `230.5u + 279.5h` | auto | 20.6h / 500 / ls 0.12h | #fff, no underline |
| `.logos` | left `50%`, `translateX(calc(-50% + 20u))` | width `741u` | — | `--strip` #8b8a8a |

Nav gaps: `About →(24.5u) Features →(23.5u) FAQ →(26u) Contact`. No underlines.
Pill labels are optically nudged: inner `<span>` gets `translateY(1u)` (nav) / `translateY(1h)` (CTA).

**Copy (exact):**
- Headline: `The Next Layer` / `of Intelligence` (two lines, each its own `<span style="display:block">`)
- Sub: `A unified infrastructure platform to help teams build,` / `ship, and scale AI systems with confidence.`
- Buttons: `Get Started` (pill, ×2 — nav + hero), `View Architecture` (ghost)
- Nav: `About`, `Features`, `FAQ`, `Contact`

**Partner strip (`.logos`, 4 marks, absolute within the 741u-wide box):**

| | left | top | mark size | word left / top / size |
|---|---|---|---|---|
| lg1 | -0.5u | 994.7u | 30.5 × 31u | 37u / 5.6u / 18.1u |
| lg2 | 206.5u | 995.7u | 24.5 × 30u | 31u / 7.3u / 18.5u |
| lg3 | 416.5u | 996.7u | 28.5 × 28u | 35u / 7.3u / 16.15u |
| lg4 | 620.5u | 998.7u | 28.5 × 25.5u | 37u / 8.3u / 15.3u |

Each word is `logoipsum`, `font-family:'IpsumMark','Manrope',sans-serif; font-weight:700`. lg2 has a trailing dot: inline-block circle `0.09em`, `vertical-align:.62em`, `margin-left:.06em`, `background:currentColor`.

## The video plate (the one mandatory asset)
```
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4
```
`<video autoplay muted loop playsinline preload="auto" aria-hidden="true">` inside an absolute `.plate` that covers the stage.

Desktop geometry: `position:absolute; left:50%; top:1u; width:1492u; height:1054u; transform:translateX(calc(-50% - 0.5u)); object-fit:cover; pointer-events:none;`
Portrait: `inset:0; width/height 100%; transform:none; object-position:43% center` (tablet portrait: `44% center`).

**Autoplay gotcha (already hit once in the prototype):** in JSX/React, bare boolean attributes on `<video>` can be dropped. Set the properties imperatively on mount:
```js
v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true;
v.play().catch(() => {});
```

**Fades — `.plate::after`, `position:absolute; inset:0; pointer-events:none`, both gradients stacked in this order:**
```css
/* bottom fade */
linear-gradient(to bottom, rgba(5,5,5,0) 78.8%, rgba(5,5,5,.23) 79.6%, rgba(5,5,5,.45) 81.4%,
  rgba(5,5,5,.75) 83.3%, rgba(5,5,5,.84) 85.2%, rgba(5,5,5,.888) 88%,
  rgba(5,5,5,.905) 91%, rgba(5,5,5,.96) 95%, #050505 100%),
/* side letterbox */
linear-gradient(to right, #050505 calc(50% - 746 * var(--u)), transparent calc(50% - 676 * var(--u)),
  transparent calc(50% + 676 * var(--u)), #050505 calc(50% + 746 * var(--u)))
```
Portrait replaces both:
- to-right: `.86 → .66 @42% → .20 @78% → .10 @100%`
- to-bottom: `.72 @0% → .34 @24% → .34 @56% → .80 @82% → .97 @94% → #050505`
- tablet portrait, lighter: side `.84/.60/.16/.06`, bottom `.66/.28/.30/.78/.96`

No other overlays, stickers or badges on the video.

## Interactions & Behavior
**Entrance stagger** — only under `@media (prefers-reduced-motion: no-preference)`. Easing `cubic-bezier(.22,1,.36,1)`.

| Target | Animation | Duration | Delay |
|---|---|---|---|
| `.brand`, `.pill-nav` | `rise` (opacity 0 → 1, `translateY(14u)` → 0) | .8s | 0 |
| `.links` | `riseNav` (same, but preserving `translate(-50%,-50%)`) | .8s | 0 |
| `.headline` | `rise` | .9s | .06s |
| `.sub` | `rise` | .9s | .14s |
| `.pill-cta`, `.ghost` | `rise` | .9s | .22s |
| `.lg` | `fade` | 1.1s | .34s |

All use `animation-fill-mode: both`. Reduced motion: skip entrances, collapse menu/burger transitions to `.001s`.

**Mobile menu (portrait only):** `.links` and `.pill-nav` hide; a frosted pill burger appears (`rgba(255,255,255,.06)` fill, `1px rgba(255,255,255,.14)` border, `backdrop-filter: blur(12px)`, `52m × 44m`, radius 999px, two 18m × 1.5px bars, 6m gap).
- Toggling adds `.is-open` to `.stage`.
- Bars morph to X: bar1 `translateY(4.3m) rotate(45deg)`, bar2 `translateY(-4.3m) rotate(-45deg)`, .3s.
- Overlay `.menu`: full-screen `linear-gradient(180deg, rgba(5,5,5,.94), rgba(5,5,5,.99))` + `blur(18px)`, `opacity`/`visibility` transition `.42s`.
- Staggered reveal (opacity + `translateY(12px)`) with delays `.06 / .10 / .16 / .22 / .28 / .34s` for eyebrow, the four `li`s, and the foot.
- Menu links `max(25px, 31m)`, each with a small `›` chevron `::after`.
- Foot: white pill `Get Started` + ghost `View Architecture`.

**JS (the only logic):** toggle `.is-open`; keep `aria-expanded`, `aria-hidden` and the burger's `aria-label` ("Open menu" / "Close menu") in sync; close on `Escape`, on any menu-link click, and on resize when aspect ratio > 1.1.

**Responsive:** headline wraps inline on phone (`46m / 52m`), returns to two nowrap lines on the tablet band (`64m / 72m`). Logos are a 2×2 grid on phone, a single row of 4 at ≥600px.

## State Management
One boolean: `menuOpen`. Drives the `.is-open` class on the stage plus the three ARIA attributes. No data fetching.

## Design Tokens
```
--ink:      #fafafa   headline / primary text
--muted:    #a7a6a6   subcopy
--nav:      #b6b5b5   header links
--strip:    #8b8a8a   partner logos
--pill:     #ffffff   CTA fill
--pill-ink: #050505   CTA text
stage/page: #050505
ease:       cubic-bezier(.22, 1, .36, 1)
radius:     999px (pills only); no other radii in the composition
```
Type: **Manrope**, variable 200–800 (Google Fonts), `font-family:'Manrope',system-ui,-apple-system,'Segoe UI',sans-serif`, antialiased, `text-rendering: geometricPrecision`. Weights used: 400 (headline, sub, nav), 500 (pills, ghost), 700 (partner wordmarks).

## Assets
- **Background video** — the CloudFront MP4 above. Mandatory; do not substitute. Subject: silhouetted figure walking toward a tall glowing white vertical portal on misty ground, pure black surroundings. Should loop seamlessly.
- **Brand mark** — inline SVG, `viewBox="0 0 31.5 48.5"`. Angular "S"/bolt: `path M21.5 0 L21.5 19.5 L31.5 19.5 L31.5 29 L10 48.5 L10 28.5 L0.5 28.5 L0.5 18.5 Z` filled with a `userSpaceOnUse` linear gradient `(8,0) → (34.1,28.9)`, stops `0 #9e9e9e, .28 #a6a6a6, .34 #a3a3a3, .40 #3a3a3a, .55 #414141, .60 #7a7a7a, .68 #8e8e8e, .80 #a9a9a9, .95 #c4c4c4, 1 #cccccc`; plus two `#fdfdfd` rects — `0.5,18.5 9×10` and `22,19.5 9.5×9.5`. Copy verbatim from the HTML.
- **Partner icons** — four inline SVGs using `currentColor` (viewBoxes `30×31`, `25×30`, `28×28`, `28×25.5`). ⚠️ **These are silhouette approximations**, not the original path data — if the source page's SVGs are available, swap them in.
- **"IpsumMark" font** — the specified display face for the wordmarks was not available; the build falls back to heavy Manrope via `@font-face { font-family:'IpsumMark'; src: local('Manrope ExtraBold') }`. If the real binary exists, drop it in and keep the `'IpsumMark','Manrope',sans-serif` stack.

## Composition rules (do not violate)
- First viewport is ONE composition. No stats, cards, badge chips, or secondary marketing blocks.
- The brand mark is a hero-level left signal, not tiny nav decoration.
- The video is an edge-to-edge background plane, never an inset media card.
- Nothing sits on the video except the measured edge/bottom fades.
- White fully-rounded pills for primary CTAs only; ghost text for secondary.

## Files
- `The Next Layer of Intelligence.dc.html` — the design reference (markup + full CSS + menu/video JS).
- `support.js` — runtime needed only to open the HTML file locally; not part of the design.
