# NOIRÉ — Cinematic Indian Luxury Fashion Experience

> **Contemporary Indian Luxury Fashion. Clean-room build from absolute zero.**

NOIRÉ celebrates contemporary Indian women's fashion through modern architectural silhouettes, master handloom traditions, Banarasi silks, Kanjivaram weaves, real beaten zari, and international fashion-film choreography.

---

## 🌟 Visual Art Direction & Palette

- **Deep Burgundy & Wine**: `#330d15`, `#4a121e`
- **Crimson & Sindoori**: `#721a28`
- **Terracotta & Burnt Orange**: `#a84c35`, `#c46436`
- **Antique Muted Gold**: `#c5a059`, `#dfbe7e`
- **Ivory & Warm White**: `#f7f4ee`, `#fbf9f5`
- **Noir Black & Charcoal**: `#0a0808`, `#141212`

---

## 🎭 The 16 Choreographed Scenes

1. **Scene 01 — Cinematic Opening / Preloader**: Faint warm textile texture, NOIRÉ logo with upward letter-spacing settling, metadata: *NOIRÉ CONTEMPORARY INDIAN COUTURE EST. 2026*.
2. **Scene 02 — Hero Section**: Actual WebM & MP4 fashion film playback with poster fallback, mask expansion, line-by-line editorial headline reveal, magnetic CTAs.
3. **Scene 03 — Organic Textile Transition**: Organic fabric curve mask revealing raw silk and the atelier manifesto.
4. **Scene 04 — Six Moods**: Pinned 450vh sequence (Dawn, Drift, Atelier, Ritual, Afterglow, Noir) featuring sequential card scale, translation, rotation, and clip-path transitions.
5. **Scene 05 — Circular Editorial Orbit**: 14 editorial objects floating around an invisible 3D mathematical ellipse with depth scaling, velocity-driven acceleration, continuous drift, and a 10-stage pinned narrative.
6. **Scene 06 — Collection Marquee**: Multi-layer differential parallax marquee moving in opposite directions.
7. **Scene 07 — Featured Collection (The New Edit)**: Asymmetrical layout with dominant visual, overlapping macro weave detail, and differential parallax scrolling.
8. **Scene 08 — Horizontal Collection Journey**: Pinned 600vw horizontal story controlled by vertical scroll across 6 distinct panels: *01 The Silk, 02 The Craft, 03 The Color, 04 The Form, 05 The Woman, 06 The Moment*.
9. **Scene 09 — Product Collection**: 12 luxury products across categories (All, New, Sarees, Lehengas, Contemporary, Accessories), animated filter tabs, quick view inspection modal, and archival bag acquisition.
10. **Scene 10 — Editorial Lookbook**: 10 intentional asymmetric compositions with a pinned central monolith and surrounding floating parallax frames.
11. **Scene 11 — Cinematic Image Stack**: 8 layered cards peeling with distinct visual exit choreography.
12. **Scene 12 — Craft Story**: 6 pinned stages: *The Thread, The Hand, The Pattern, The Silhouette, The Woman, The Story*.
13. **Scene 13 — Cinematic Campaign Video**: 4K documentary video of authentic Bishnupur Swarnachari silk weaving with editorial framing and interactive playback controls.
14. **Scene 14 — Latest Trends**: 2026 Contemporary Indian forecast with offset card compositions.
15. **Scene 15 — Social Editorial (Follow the Story)**: 8 campaign journal frames with hover zoom, handles, and captions.
16. **Scene 16 — Final Cinematic CTA & Minimal Luxury Footer**: "WEAR THE STORY" finale, newsletter invitation, salon flagships in Delhi, Mumbai, and London, and concierge contact.

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS v4 & Vanilla CSS custom tokens
- **Motion & Pinning**: GSAP 3.15, ScrollTrigger, `@gsap/react`
- **Smooth Scrolling**: Lenis with synchronized GSAP ticker
- **Audio Experience**: Web Audio API synthesized tanpura drone
- **Icons**: Lucide React

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Visit [http://localhost:3000](http://localhost:3000) to view the experience.

---

## 📡 Deployment Architecture

```
USER
  │
  ▼
NETLIFY (Frontend)
  ├── Next.js App Router
  └── Optimized Static & Media CDN
  │
  ▼
RAILWAY (Backend / API)
  ├── /api/health (Health check & uptime)
  └── Dynamic Forms & Concierge Consultation
```

- **Netlify**: Configured via `netlify.toml` with `@netlify/plugin-nextjs`.
- **Railway Backend**: Health check endpoint ready at `/api/health`.
