# Digital Marketing Foundation — Galvanite-Inspired UI Overhaul

## Current State
The site uses a neural network dark theme (deep black + electric blue/purple, Satoshi + JetBrains Mono fonts, glass cards, live interactive neural network canvas animation). The homepage (LandingPage.tsx) exists with a hero, stats strip, course highlights, courses carousel, DM categories grid, pricing cards, WhatsApp chatbot section, testimonials, blogs preview, and FAQ. Header.tsx has sticky nav + auth buttons. Footer.tsx has 4-column grid. All functional features (auth, payments, videos, quizzes, certificates, AI hub, admin) are live and must be preserved.

## Requested Changes (Diff)

### Add
- **Marquee trust bar**: Horizontal infinite-scroll row of logos/stats below hero (like Galvanite's client logos ticker). Show course titles + stat numbers cycling.
- **Oversized editorial section numbers**: Every major section gets a giant dimmed number (01, 02, 03...) behind the section label — Galvanite editorial style.
- **Bento grid stats section**: Replace the plain stats strip with a dramatic bento grid layout. 4 large stat tiles with huge numbers, subtle background glow, and hover depth effect.
- **Galvanite-style case study / course cards**: Course cards get full-bleed thumbnail, hover-reveal arrow indicator, tag chips at bottom, dramatic lift on hover. More editorial, less carousel-widget.
- **Magnetic CTA buttons**: Primary buttons get a subtle magnet effect (CSS transform tracks cursor proximity).
- **Diagonal section dividers**: Sections alternate with a slight diagonal clip-path separator instead of flat borders.
- **Process/blueprint section**: A numbered 4-step "How It Works" section (01 Enroll → 02 Learn → 03 Practice → 04 Certify) styled like Galvanite's BLUEPRINT section, with oversized numbers and check-item lists.
- **Split testimonials**: Testimonials redesigned as large pull-quote cards with 3D tilt hover, author avatar, company chip.
- **Sticky progress indicator**: Thin electric blue line at very top of page (below header) showing scroll progress.
- **Footer glow orb**: Decorative blurred radial glow at top of footer (ethereal depth).

### Modify
- **Hero section**: Full-bleed image background using the generated `/assets/generated/hero-neural-bg.dim_1920x1080.jpg`, with the NeuralNetworkCanvas overlaid on top at reduced opacity (0.4). Hero headline becomes dramatically larger (clamp 72px–120px), left-aligned (not centered) on desktop. Pre-qualifier badge repositioned inline before headline. Stats row replaced with 3 bold inline stat chips with monospace numbers.
- **Header**: Nav links get underline-from-center hover animation. Logo gets a subtle electric glow pulse animation. Sign Up button gets a gradient border treatment instead of solid fill.
- **Course section layout**: Switch from horizontal scrollable carousel to a masonry/CSS grid with 3 columns on desktop. Each card is editorial with full-bleed image top, hover reveals an arrow + "Enroll Now" overlay. Tags (tier + AI badge) float top-left on image.
- **Pricing cards**: Give the featured (Professional) card a dramatic glass morphism treatment with an animated gradient border. All cards get animated counter numbers for price.
- **WhatsApp chatbot floating button**: Replace circular button with a pill-shaped glass button with Brain icon + "AI Advisor" label visible. Concentric glow pulse.
- **Section headings**: All section titles adopt editorial hierarchy: small mono uppercase label → massive 2-line title → short descriptor. No centered text walls.
- **Index.css**: Enhance with scroll-progress custom property support, clip-path diagonal utility classes, and marquee animation keyframes.

### Remove
- **GoldDivider component**: Replace with diagonal clip-path section transitions.
- **Horizontal carousel for courses**: Replaced with grid layout.
- **StageSpotlight component**: Remove Broadway/theatrical references (wrong era — we're going Galvanite editorial).

## Implementation Plan
1. Update `index.css` — add marquee keyframes, clip-path diagonal utilities, scroll-progress var, tilt-card CSS.
2. Rewrite `LandingPage.tsx` with all structural changes: new hero layout, marquee bar, bento stats, editorial course grid, process section, redesigned testimonials, pricing.
3. Update `Header.tsx` — underline hover animation, logo glow pulse, gradient border on CTA.
4. Update `Footer.tsx` — add decorative glow orb, tighten layout.
5. Update `WhatsAppChatbot.tsx` — pill-shaped floating button.
6. Remove StageSpotlight and GoldDivider usage.
7. Validate (lint, typecheck, build).
