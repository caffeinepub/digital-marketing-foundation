# Digital Marketing Foundation -- Neural AI Redesign

## Current State

The site is a full-stack learning platform (React + Motoko) with:
- LandingPage.tsx -- full homepage with all sections
- Header.tsx -- navigation bar
- Footer.tsx -- site footer
- WhatsAppChatbot.tsx -- floating chat widget + homepage section (currently WhatsApp green themed)
- MoleculeBackground.tsx -- existing background (Broadway gold/spotlight, needs full replacement)
- StageSpotlight.tsx -- Broadway-era spotlights (to be removed/replaced)
- GoldDivider.tsx -- gold ornamental dividers (to be removed)
- GlowCard.tsx -- gold glow cards (to be redesigned)
- StudentDashboard.tsx, AdminPanel.tsx, AIHubPage.tsx, BlogsPage.tsx, NewsPage.tsx, CertificatePage.tsx, CourseDetailPage.tsx, VideoPlayerPage.tsx, PaymentSuccess.tsx, PaymentFailure.tsx, BlogArticlePage.tsx, NewsArticlePage.tsx
- index.css -- current color tokens (Broadway gold/black)

Current theme: Broadway luxury (gold, crimson velvet, Playfair Display, spotlight beams). This must be completely replaced.

## Requested Changes (Diff)

### Add
- Full-screen interactive Canvas neural network animation on the hero that reacts to mouse movement (nodes + connections, electric blue/purple particles, glowing)
- NeuralNetworkCanvas component -- standalone, performant, uses requestAnimationFrame
- New design tokens: deep black (#000000, #050510), electric blue (#0066FF, #00AAFF), purple accent (#7B2FBE), neon glow (#00D4FF)
- Space Grotesk (sans) as primary font, JetBrains Mono as monospace accent (already available as woff2)
- Glassmorphism cards with electric blue borders and glow on hover
- Redesigned chatbot widget: dark black/dark-navy panel with electric blue accents, monospace font for labels, AI advisor branding instead of WhatsApp green
- Subtle grid lines in background (CSS-only)
- Section reveals on scroll (intersection observer or CSS animations)
- Stat counters styled in JetBrains Mono
- Course card badges with electric blue chip style
- Header: fully transparent with electric blue logo text, blur-on-scroll behavior
- Pricing cards: dark glassy cards with electric blue glow borders

### Modify
- index.css: completely replace color palette to black/electric-blue/purple system
- LandingPage.tsx: replace all section styles, swap hero to neural network canvas, restructure stats/courses/pricing/testimonials sections
- Header.tsx: replace gold/green theme with black + electric blue
- Footer.tsx: replace gold/green with dark navy + electric blue
- WhatsAppChatbot.tsx: redesign from WhatsApp green to AI advisor dark + electric blue aesthetic
- MoleculeBackground.tsx: replace with NeuralNetworkCanvas
- GlowCard.tsx: replace gold glow with electric blue glow
- GoldDivider.tsx: replace with subtle electric blue line divider
- StageSpotlight.tsx: replace with subtle particle drift or remove entirely
- StudentDashboard.tsx: apply new dark theme tokens
- AdminPanel.tsx: apply new dark theme tokens
- All other pages: consistent dark black + electric blue theme
- tailwind.config.js / index.css: define new design system tokens

### Remove
- All Broadway/gold/crimson styling
- WhatsApp green (#25D366, #128C7E, #075E54)
- YouTube red accent
- Playfair Display font references
- Stage spotlight beam animations
- Gold ornamental dividers
- Velvet card textures

## Implementation Plan

1. **index.css** -- Define new OKLCH-based design tokens:
   - Background: near-black #000005, #050510
   - Primary accent: electric blue oklch(60% 0.25 230)
   - Secondary: purple oklch(45% 0.22 290)
   - Neon glow: #00D4FF
   - Text: white, grey-400
   - Font families: Space Grotesk (sans), JetBrains Mono (mono)
   - Remove all gold/green tokens

2. **NeuralNetworkCanvas.tsx** -- New component:
   - Canvas element, fills viewport
   - 80-120 nodes with random positions, velocities
   - Connections drawn when nodes are within threshold distance
   - Mouse proximity influences node movement (attraction/repulsion)
   - Node colors: electric blue (#0066FF) + purple (#7B2FBE), glowing
   - requestAnimationFrame loop, cleanup on unmount
   - Position: absolute, behind all content

3. **Header.tsx** -- Transparent navbar:
   - bg-transparent -> bg-black/80 backdrop-blur on scroll
   - Logo text in electric blue monospace
   - Nav links white with electric blue hover underline
   - CTA button: electric blue outline -> filled on hover

4. **LandingPage.tsx** -- Restructure all sections:
   - Hero: NeuralNetworkCanvas behind bold headline + electric blue CTA
   - Stats: monospace numbers with electric blue highlight
   - AI Advisor section: redesigned from WhatsApp to dark AI assistant
   - Courses: dark cards with electric blue glow on hover
   - Pricing: 3 tier cards with electric blue premium card highlighted
   - Testimonials: dark glassmorphism quote cards
   - Blogs/News preview: minimal dark cards

5. **WhatsAppChatbot.tsx** -- Restyle completely:
   - Remove all WhatsApp green
   - Dark panel: bg-[#050510] border border-blue-500/30
   - Header: AI brain icon + "AI Advisor" in electric blue
   - Messages: dark bubbles with electric blue for bot, grey for user
   - Input: dark with blue focus ring
   - Floating button: electric blue pulsing circle

6. **All other pages** (StudentDashboard, AdminPanel, AIHub, etc.):
   - Replace green/gold with electric blue
   - Dark card backgrounds consistent with design system

7. **Fonts**: Use JetBrains Mono (already in public/assets/fonts/) for numbers, badges, stats; Space Grotesk for body/headings (load via @font-face or CDN).
