import { EditorialStory } from "@/types";

export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  season: string;
  image: string;
  aspect: "portrait" | "landscape" | "tall" | "wide";
  caption: string;
  quote?: string;
  year: string;
}

export const lookbookItems: LookbookItem[] = [
  {
    id: "lb-01",
    title: "Varanasi Ghats at Blue Hour",
    subtitle: "Vermillion Kadhwa Zari Pallu",
    season: "AUTUMN / WINTER 2026",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
    aspect: "tall",
    caption: "Woven in the ancient sacred alleys of Varanasi on wooden pit looms.",
    quote: "“The six-yard horizon is limitless.”",
    year: "2026",
  },
  {
    id: "lb-02",
    title: "Architectural Noir Lehenga",
    subtitle: "Fluted Velvet & Matte Zardozi",
    season: "AUTUMN / WINTER 2026",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85",
    aspect: "portrait",
    caption: "Sharp structured pleating meeting heavy silver bullion embroidery.",
    year: "2026",
  },
  {
    id: "lb-03",
    title: "Terracotta Chanderi Fluidity",
    subtitle: "Sheer Tissue Organza",
    season: "AUTUMN / WINTER 2026",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85",
    aspect: "landscape",
    caption: "Weightless breathability of wild tussar silk.",
    year: "2026",
  },
  {
    id: "lb-04",
    title: "The Sculptural Cape Silhouette",
    subtitle: "Raw Wild Tussar Tailoring",
    season: "AUTUMN / WINTER 2026",
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85",
    aspect: "portrait",
    caption: "Contemporary asymmetric cut engineered for international gala.",
    quote: "“Form born from absolute presence.”",
    year: "2026",
  },
  {
    id: "lb-05",
    title: "Sacred Sindoori Reverence",
    subtitle: "Ceremonial Silk & Real Zari",
    season: "AUTUMN / WINTER 2026",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=85",
    aspect: "tall",
    caption: "A celebration of sovereign femininity draped in antique gold borders.",
    year: "2026",
  },
  {
    id: "lb-06",
    title: "Twilight Gold Tissue",
    subtitle: "Muted Champagne Jacquard",
    season: "AUTUMN / WINTER 2026",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=85",
    aspect: "portrait",
    caption: "Reflecting candlelight across handcrafted metallic weaves.",
    year: "2026",
  },
  {
    id: "lb-07",
    title: "Noir Monochrome Elegance",
    subtitle: "Crushed Matka & Dabka",
    season: "AUTUMN / WINTER 2026",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85",
    aspect: "portrait",
    caption: "Quiet luxury in midnight hues.",
    year: "2026",
  },
  {
    id: "lb-08",
    title: "Double Ikat Geometry",
    subtitle: "Patan Patola Silk Weave",
    season: "AUTUMN / WINTER 2026",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
    aspect: "wide",
    caption: "Eight months of mathematical alignment in natural madder and indigo.",
    year: "2026",
  },
  {
    id: "lb-09",
    title: "Jadau & Basra Pearl Collar",
    subtitle: "Royal Court Adornment",
    season: "AUTUMN / WINTER 2026",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=85",
    aspect: "portrait",
    caption: "Solid 24k gold leaf foil Jadau setting with untreated pearls.",
    year: "2026",
  },
  {
    id: "lb-10",
    title: "Weaver Hands at the Loom",
    subtitle: "Ancestral Guild Provenance",
    season: "AUTUMN / WINTER 2026",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=85",
    aspect: "landscape",
    caption: "Generations of muscle memory guiding 4,000 warp threads simultaneously.",
    year: "2026",
  },
];

export const stackImages = [
  {
    id: "stk-01",
    title: "THE VERMILLION KADHWA",
    subtitle: "01 — Varanasi Handloom",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
    accent: "#721a28",
  },
  {
    id: "stk-02",
    title: "THE MIDNIGHT LEHENGA",
    subtitle: "02 — Zardozi Architecture",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85",
    accent: "#330d15",
  },
  {
    id: "stk-03",
    title: "THE TERRACOTTA CHANDERI",
    subtitle: "03 — Gossamer Wild Silk",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85",
    accent: "#c46436",
  },
  {
    id: "stk-04",
    title: "THE TUSSAR CAPE SUIT",
    subtitle: "04 — International Silhouette",
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85",
    accent: "#c5a059",
  },
  {
    id: "stk-05",
    title: "THE SINDOORI CEREMONIAL",
    subtitle: "05 — Sacred Royal Velvet",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=85",
    accent: "#721a28",
  },
  {
    id: "stk-06",
    title: "THE GOLD METALLIC TISSUE",
    subtitle: "06 — Twilight Jacquard",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85",
    accent: "#dfbe7e",
  },
  {
    id: "stk-07",
    title: "THE NOIR MATKA ENSEMBLE",
    subtitle: "07 — Monochromatic Depth",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
    accent: "#0a0808",
  },
  {
    id: "stk-08",
    title: "THE PATOLA DOUBLE IKAT",
    subtitle: "08 — Heritage Masterwork",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
    accent: "#a84c35",
  },
];

export const craftStoryStages: EditorialStory[] = [
  {
    id: "craft-thread",
    step: "01",
    title: "THE THREAD",
    subtitle: "Cultivation of Raw Mulberry & Wild Tussar",
    leadParagraph:
      "Every NOIRÉ creation begins in the soil. We partner with regenerative sericulture reserves across Bengal and Karnataka to cultivate mulberry and wild tussar cocoons.",
    details: [
      "Natural filament reeling without chemical solvents",
      "Hand-twisting of warps to resist humidity variations",
      "Unbleached golden luster preserved in raw state",
      "Fair-trade verified farmer collectives",
    ],
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
    materials: ["Wild Tussar Silk", "Mulberry Katan", "Organic Sericulture"],
  },
  {
    id: "craft-hand",
    step: "02",
    title: "THE HAND",
    subtitle: "The Master Weaver as Living Mathematician",
    leadParagraph:
      "No computer can replicate the instinctive micro-adjustments of an Indian master weaver's fingers on a wooden pit loom. Tensions change as the day heats up; the artisan's breath adapts to the loom's rhythm.",
    details: [
      "Generational guild masters averaging 35+ years experience",
      "Calculated geometric punch-card drafting for jacquards",
      "Kadhwa technique where individual motifs are woven separately",
      "Zero reverse floating threads on the underside",
    ],
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=85",
    materials: ["Traditional Pit Looms", "Shuttle Carving", "Acoustic Reed Rhythm"],
  },
  {
    id: "craft-pattern",
    step: "03",
    title: "THE PATTERN",
    subtitle: "Sacred Geometries from Temple Steppes & Mughal Jaal",
    leadParagraph:
      "Motifs in NOIRÉ garments are not decorative afterthoughts; they are an ancient visual lexicon. The Paisley (Kalka), the Lotus (Padma), the Trellis (Jaal), and the Temple Chevron (Korvai) represent cosmos, renewal, and timeless dignity.",
    details: [
      "Drawn by hereditary Nakshaband artisans",
      "Translating architectural friezes into thread coordinates",
      "Continuous interlocking borders with zero raw cuts",
      "Subtle micro-variations that prove authentic human origin",
    ],
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=85",
    materials: ["Pure Beaten Zari", "Electroplated Silver", "Nakshaband Blueprint"],
  },
  {
    id: "craft-silhouette",
    step: "04",
    title: "THE SILHOUETTE",
    subtitle: "Deconstructing Traditional Drapes into Modern Form",
    leadParagraph:
      "In our New Delhi pattern rooms, ancestral handlooms are merged with European bias-cutting techniques. We drape directly onto the body, allowing the heavy drape of pure silk to carve sharp, flowing contours.",
    details: [
      "Custom internal corseting with flexible bone structures",
      "Asymmetric wing sleeves and architectural capes",
      "Laser-clean selvedges honouring the handloom edge",
      "Weight distribution balanced for effortless evening wear",
    ],
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85",
    materials: ["Silk Velvet kalis", "Laser-cut Organza", "Engineered Muslin Lining"],
  },
  {
    id: "craft-woman",
    step: "05",
    title: "THE WOMAN",
    subtitle: "Motion, Command, and Intellectual Splendor",
    leadParagraph:
      "The NOIRÉ garment is incomplete without movement. When the wearer steps forward, the six yards of pleated silk ignite, transforming the room with whisper-soft acoustic rustle and kinetic grace.",
    details: [
      "Designed for global travel and international stages",
      "Unshakable poise rooted in sovereign Indian heritage",
      "Seamless integration with contemporary jewelry or modern tailoring",
      "Commanding presence without shouting",
    ],
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
    materials: ["Kinetic Silk Flow", "Bespoke Fitting", "Sovereign Poise"],
  },
  {
    id: "craft-story",
    step: "06",
    title: "THE STORY",
    subtitle: "Heirlooms Destined to Outlive Generations",
    leadParagraph:
      "A NOIRÉ couture piece is never discarded. It is catalogued in our provenance register, treasured, and passed from mother to daughter, grandmother to grandchild — gaining luster, narrative, and reverence with every passing decade.",
    details: [
      "Digital provenance passport and NFC security thread",
      "Lifetime repair, restoration, and re-weaving atelier service",
      "Archival preservation muslin bag and scented cedar casing",
      "Registered in the NOIRÉ Global Couture Registry",
    ],
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
    materials: ["Archival Preservation", "Generational Heirloom", "Provenance Deed"],
  },
];
