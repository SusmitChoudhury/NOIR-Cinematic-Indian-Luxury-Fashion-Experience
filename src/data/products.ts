import { Product } from "@/types";

/* ─────────────────────────────────────────────
   COLOR VARIANT SYSTEM
   Each product has a base entry and color variants.
   The colorVariants array lets the UI show swatches.
   ───────────────────────────────────────────── */

export interface ColorVariant {
  colorName: string;
  hex: string;
  image: string;
}

export interface ProductWithVariants extends Product {
  colorVariants: ColorVariant[];
  activeColorIndex?: number;
}

/* ─────────────────────────────────────────────
   7 PRODUCT CATALOG — Each with 4-5 color options
   All images are on-theme Indian luxury couture.
   ───────────────────────────────────────────── */

export const productsWithVariants: ProductWithVariants[] = [
  // ═══════════════════════════════════════════
  // PRODUCT 1: BANARASI KATAN SILK SAREE
  // ═══════════════════════════════════════════
  {
    id: "prod-01",
    name: "The Kashi Banarasi Katan Silk Saree",
    category: "SAREES",
    collection: "Ritual / AW26",
    price: 185000,
    formattedPrice: "₹1,85,000",
    color: "Royal Crimson",
    fabric: "100% Pure Mulberry Katan Silk",
    craftsmanship: "Hand-woven over 140 days using Kadhwa zari technique in Varanasi.",
    image: "/media/images/products/catalog/banarasi-red.jpg",
    availability: "Available",
    description: "An homage to the sacred ghats of Varanasi. Woven with pure real zari beaten into micro-filaments, draped in rich katan silk.",
    details: [
      "Real gold and silver electroplated zari",
      "Kadhwa hand-loom weaving technique",
      "Includes unstitched blouse piece in brocade silk",
      "Dry clean only, store wrapped in pure muslin",
    ],
    colorVariants: [
      { colorName: "Royal Crimson", hex: "#9E1B32", image: "/media/images/products/catalog/banarasi-red.jpg" },
      { colorName: "Imperial Navy", hex: "#1B2A4A", image: "/media/images/products/catalog/banarasi-navy.jpg" },
      { colorName: "Emerald Forest", hex: "#1B4D3E", image: "/media/images/products/catalog/kanjivaram-emerald.jpg" },
      { colorName: "Champagne Gold", hex: "#D4AF37", image: "/media/images/products/catalog/chanderi-gold.jpg" },
      { colorName: "Midnight Noir", hex: "#181818", image: "/media/images/products/catalog/velvet-noir.jpg" },
    ],
  },

  // ═══════════════════════════════════════════
  // PRODUCT 2: KANJIVARAM TEMPLE SILK SAREE
  // ═══════════════════════════════════════════
  {
    id: "prod-02",
    name: "The Kanjivaram Temple Border Saree",
    category: "SAREES",
    collection: "Heritage / AW26",
    price: 265000,
    formattedPrice: "₹2,65,000",
    color: "Deep Emerald",
    fabric: "Triple Ply Mulberry Silk",
    craftsmanship: "Interlocking Korvai weaving technique connecting body and heavy temple border.",
    image: "/media/images/products/catalog/kanjivaram-emerald.jpg",
    availability: "Available",
    description: "Woven in the temple town of Kanchipuram. Heavy three-ply silk with authentic solid gold korvai joints that never unravel.",
    details: [
      "Traditional Korvai interlocking technique",
      "Weight: 840g of pure hand-twisted silk",
      "Govt Silk Mark & Handloom certified",
      "Heirloom longevity guarantee",
    ],
    colorVariants: [
      { colorName: "Deep Emerald", hex: "#1B4D3E", image: "/media/images/products/catalog/kanjivaram-emerald.jpg" },
      { colorName: "Royal Crimson", hex: "#9E1B32", image: "/media/images/products/catalog/katan-crimson.jpg" },
      { colorName: "Regal Purple", hex: "#5B2C6F", image: "/media/images/products/catalog/paithani-purple.jpg" },
      { colorName: "Champagne Gold", hex: "#D4AF37", image: "/media/images/products/catalog/chanderi-gold.jpg" },
    ],
  },

  // ═══════════════════════════════════════════
  // PRODUCT 3: FRENCH NET EMBROIDERED SAREE
  // ═══════════════════════════════════════════
  {
    id: "prod-03",
    name: "The Atelier French Net Embroidered Saree",
    category: "NEW",
    collection: "The New Edit / AW26",
    price: 135000,
    formattedPrice: "₹1,35,000",
    color: "Rosé Blush",
    fabric: "Soft French Net & Pure Silk Border",
    craftsmanship: "Hand cutdana embroidery with micro-sequin and zari flora detail.",
    image: "/media/images/products/catalog/net-rose.jpg",
    availability: "Available",
    description: "A whisper-soft French net drape in ethereal blush, intricately hand-embroidered with micro-cutdana work and tonal silk threads.",
    details: [
      "Hand-embroidered cutdana & zari flora",
      "Delicate scalloped borders",
      "Includes embroidered blouse piece (0.8m)",
      "Dry clean only",
    ],
    colorVariants: [
      { colorName: "Rosé Blush", hex: "#E0A4A8", image: "/media/images/products/catalog/net-rose.jpg" },
      { colorName: "Crimson", hex: "#9E1B32", image: "/media/images/products/catalog/net-crimson.jpg" },
      { colorName: "Champagne Gold", hex: "#D4AF37", image: "/media/images/products/catalog/tissue-gold.jpg" },
      { colorName: "Emerald", hex: "#1B4D3E", image: "/media/images/products/catalog/net-emerald.jpg" },
      { colorName: "Noir", hex: "#181818", image: "/media/images/products/catalog/velvet-noir.jpg" },
    ],
  },

  // ═══════════════════════════════════════════
  // PRODUCT 4: PAITHANI SILK SAREE
  // ═══════════════════════════════════════════
  {
    id: "prod-04",
    name: "The Tara Paithani Peacock Saree",
    category: "SAREES",
    collection: "Heritage / AW26",
    price: 94500,
    formattedPrice: "₹94,500",
    color: "Regal Purple",
    fabric: "Pure Mulbari Silk & Fine Metallic Threads",
    craftsmanship: "Double-interlocking twill tapestry weave with gold-coated wire.",
    image: "/media/images/products/catalog/paithani-purple.jpg",
    availability: "Available",
    description: "Centuries-old royal Maratha splendour with kaleidoscopic peacock motifs and a luminous solid gold tissue pallu.",
    details: [
      "Authentic Yeola Paithani technique",
      "Real gold coated wire in pallu",
      "Handwoven over 320 artisan hours",
      "GI-tagged certification",
    ],
    colorVariants: [
      { colorName: "Regal Purple", hex: "#5B2C6F", image: "/media/images/products/catalog/paithani-purple.jpg" },
      { colorName: "Royal Crimson", hex: "#9E1B32", image: "/media/images/products/catalog/katan-crimson.jpg" },
      { colorName: "Deep Emerald", hex: "#1B4D3E", image: "/media/images/products/catalog/kanjivaram-emerald.jpg" },
      { colorName: "Champagne Gold", hex: "#D4AF37", image: "/media/images/products/catalog/chanderi-gold.jpg" },
    ],
  },

  // ═══════════════════════════════════════════
  // PRODUCT 5: CHANDERI TISSUE SAREE
  // ═══════════════════════════════════════════
  {
    id: "prod-05",
    name: "The Awadh Chanderi Tissue Saree",
    category: "NEW",
    collection: "Afterglow / AW26",
    price: 78000,
    formattedPrice: "₹78,000",
    color: "Champagne Gold",
    fabric: "Handspun Cotton-Silk with Metallic Filament",
    craftsmanship: "Gossamer weaving with hand-spun wild tussar and real metallic tissue warps.",
    image: "/media/images/products/catalog/chanderi-gold.jpg",
    availability: "Available",
    description: "Gossamer sheer handloom silk layered with feather-light gold zari warp. Drapes with fluid poise and timeless Indian aristocracy.",
    details: [
      "Ashavali peacock feather motif border",
      "Featherweight silk-zari handloom blend",
      "Hand-rolled French hems",
      "GI-tag certified authentic Chanderi",
    ],
    colorVariants: [
      { colorName: "Champagne Gold", hex: "#D4AF37", image: "/media/images/products/catalog/chanderi-gold.jpg" },
      { colorName: "Rosé Blush", hex: "#E0A4A8", image: "/media/images/products/catalog/net-rose.jpg" },
      { colorName: "Emerald", hex: "#1B4D3E", image: "/media/images/products/catalog/net-emerald.jpg" },
      { colorName: "Crimson", hex: "#9E1B32", image: "/media/images/products/catalog/net-crimson.jpg" },
      { colorName: "Noir", hex: "#181818", image: "/media/images/products/catalog/velvet-noir.jpg" },
    ],
  },

  // ═══════════════════════════════════════════
  // PRODUCT 6: VELVET ZARDOZI SAREE
  // ═══════════════════════════════════════════
  {
    id: "prod-06",
    name: "The Rohini Velvet Zardozi Saree",
    category: "SAREES",
    collection: "Noir Atelier / AW26",
    price: 145000,
    formattedPrice: "₹1,45,000",
    color: "Midnight Noir",
    fabric: "Silk-Blend Italian Micro Velvet",
    craftsmanship: "Hand-framed Adda Zardozi with gilded dabka and natural seed pearls.",
    image: "/media/images/products/catalog/velvet-zardozi.jpg",
    availability: "Made to Order",
    description: "An evening masterpiece from sumptuous velvet. Ornate Mughal jali motifs encrusted with beaten bullion wire and iridescent pearls.",
    details: [
      "Premium Italian micro velvet",
      "Hand-embroidered Mughal arch motifs",
      "Natural seed pearl accents",
      "Lead time 6-8 weeks",
    ],
    colorVariants: [
      { colorName: "Midnight Noir", hex: "#181818", image: "/media/images/products/catalog/velvet-zardozi.jpg" },
      { colorName: "Royal Crimson", hex: "#9E1B32", image: "/media/images/products/catalog/katan-crimson.jpg" },
      { colorName: "Deep Emerald", hex: "#1B4D3E", image: "/media/images/products/catalog/kanjivaram-emerald.jpg" },
      { colorName: "Imperial Navy", hex: "#1B2A4A", image: "/media/images/products/catalog/banarasi-navy.jpg" },
    ],
  },

  // ═══════════════════════════════════════════
  // PRODUCT 7: RANGKAT MULTI-HUE BANARASI
  // ═══════════════════════════════════════════
  {
    id: "prod-07",
    name: "The Saanvi Rangkat Heirloom Banarasi",
    category: "SAREES",
    collection: "Ritual / AW26",
    price: 135000,
    formattedPrice: "₹1,35,000",
    color: "Multi-Hue Jewel",
    fabric: "High-Density 4-Ply Pure Katan Silk",
    craftsmanship: "Master class rangkat hand-block dye with continuous golden jangla vine zari.",
    image: "/media/images/products/catalog/rangkat-multi.jpg",
    availability: "Atelier Exclusive",
    description: "A pinnacle masterpiece. The warp is hand-blocked in five jewel tones before weaving a continuous golden jangla vine across the full 6 yards.",
    details: [
      "Hand-blocked five-tone rangkat dye",
      "Continuous golden jangla vine pattern",
      "520+ artisan hours",
      "Certified pure silver zari",
    ],
    colorVariants: [
      { colorName: "Multi-Hue Jewel", hex: "#C5A059", image: "/media/images/products/catalog/rangkat-multi.jpg" },
      { colorName: "Royal Crimson", hex: "#9E1B32", image: "/media/images/products/catalog/banarasi-red.jpg" },
      { colorName: "Imperial Navy", hex: "#1B2A4A", image: "/media/images/products/catalog/banarasi-navy.jpg" },
      { colorName: "Regal Purple", hex: "#5B2C6F", image: "/media/images/products/catalog/paithani-purple.jpg" },
      { colorName: "Deep Emerald", hex: "#1B4D3E", image: "/media/images/products/catalog/kanjivaram-emerald.jpg" },
    ],
  },
];

/* Backward-compatible flat products array for existing sections */
export const products: Product[] = productsWithVariants.map((p) => {
  const { colorVariants, activeColorIndex, ...base } = p;
  return base;
});
