"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Sparkles, Star, ChevronLeft, ChevronRight, Play, Heart, Share2, ShieldCheck, Check, ArrowRight, X } from "lucide-react";

export interface SareeLook {
  id: string;
  colorKey: "rose" | "crimson" | "gold" | "emerald" | "noir";
  colorName: string;
  hex: string;
  title: string;
  price: number;
  formattedPrice: string;
  image: string;
  description: string;
  fabric: string;
  embroidery: string;
  blouseInclusion: string;
  care: string;
  rating: number;
  reviewsCount: number;
}

const SAREE_LOOKS: SareeLook[] = [
  {
    id: "look-01",
    colorKey: "rose",
    colorName: "ROSÉ",
    hex: "#E0A4A8",
    title: "ROSÉ NET EMBROIDERED",
    price: 21600,
    formattedPrice: "₹21,600",
    image: "/media/images/products/look-rose.jpg",
    description: "A whisper-soft French net drape in ethereal blush rosé, intricately hand-embroidered with micro-cutdana work, tonal silk threads, and delicate scalloped borders.",
    fabric: "Soft French Net & Pure Silk Border",
    embroidery: "Hand Cutdana & Zari Flora",
    blouseInclusion: "Unstitched Heavy Embroidered Silk Blouse (0.8m)",
    care: "Dry Clean Only",
    rating: 4.8,
    reviewsCount: 142,
  },
  {
    id: "look-02",
    colorKey: "crimson",
    colorName: "CRIMSON",
    hex: "#9E1B32",
    title: "CRIMSON ZARI EMBROIDERED",
    price: 24800,
    formattedPrice: "₹24,800",
    image: "/media/images/products/look-crimson.jpg",
    description: "Royal sindoori crimson net infused with antique molten gold zari embroidery, hand-beaten dabka wire, and heirloom floral jaal patterns fit for queens.",
    fabric: "Royal Crimson Net with Brocade Selvedge",
    embroidery: "Antique Gold Kadhwa & Bullion Dabka",
    blouseInclusion: "Embroidered Sweetheart Neckline Blouse Piece",
    care: "Dry Clean Only",
    rating: 4.9,
    reviewsCount: 189,
  },
  {
    id: "look-03",
    colorKey: "gold",
    colorName: "CHAMPAGNE",
    hex: "#D4AF37",
    title: "CHAMPAGNE GOLD TISSUE",
    price: 23500,
    formattedPrice: "₹23,500",
    image: "/media/images/products/look-gold.jpg",
    description: "Luminous champagne gold tissue net woven with micro metallic warp filaments, reflecting candlelight with liquid grace and architectural poise.",
    fabric: "Metallic Tissue Net & Tissue Chanderi",
    embroidery: "Gold Filigree Sequins & Pearls",
    blouseInclusion: "Bespoke Golden Brocade Blouse Piece",
    care: "Dry Clean Only",
    rating: 4.9,
    reviewsCount: 164,
  },
  {
    id: "look-04",
    colorKey: "emerald",
    colorName: "EMERALD",
    hex: "#1B4D3E",
    title: "EMERALD SILK EMBROIDERED",
    price: 26200,
    formattedPrice: "₹26,200",
    image: "/media/images/products/look-emerald.jpg",
    description: "Deep jewel-toned imperial emerald green net adorned with intricate silver-gold resham threadwork, evoking ancient stepwell geometry and royal court gardens.",
    fabric: "Heavy Imperial Net & Matka Silk Trims",
    embroidery: "Resham Thread & Semi-Precious Jade Beads",
    blouseInclusion: "Imperial Emerald Silk Velvet Blouse Piece",
    care: "Dry Clean Only",
    rating: 4.7,
    reviewsCount: 118,
  },
  {
    id: "look-05",
    colorKey: "noir",
    colorName: "NOIR",
    hex: "#181818",
    title: "NOIR VELVET EMBROIDERED",
    price: 28500,
    formattedPrice: "₹28,500",
    image: "/media/images/products/look-noir.jpg",
    description: "The definitive NOIRÉ signature: midnight black sheer net contrasted with deep black velvet borders and subtle smoked gunmetal zari detailing.",
    fabric: "Micro Velvet & Italian Sheer Net",
    embroidery: "Smoked Gunmetal Zardozi & Onyx Sequins",
    blouseInclusion: "Structured Corseted Noir Velvet Blouse Piece",
    care: "Dry Clean Only",
    rating: 5.0,
    reviewsCount: 204,
  },
];

const SIZES = ["S", "M", "L", "XL", "2XL"] as const;

export default function AtelierCustomizerSection() {
  const { addToCart } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<(typeof SIZES)[number]>("M");
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [lookbookVideoOpen, setLookbookVideoOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const currentLook = SAREE_LOOKS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? SAREE_LOOKS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === SAREE_LOOKS.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    addToCart({
      id: `${currentLook.id}-${selectedSize}`,
      name: `${currentLook.title} (${currentLook.colorName}, Size ${selectedSize})`,
      category: "SAREES",
      collection: "New Drop 2026",
      price: currentLook.price * quantity,
      formattedPrice: `₹${(currentLook.price * quantity).toLocaleString("en-IN")}`,
      color: currentLook.colorName,
      fabric: currentLook.fabric,
      craftsmanship: currentLook.embroidery,
      image: currentLook.image,
      availability: "Available",
      description: currentLook.description,
      details: [
        currentLook.fabric,
        currentLook.embroidery,
        currentLook.blouseInclusion,
        `Selected Size: ${selectedSize}`,
        `Quantity: ${quantity}`,
      ],
    });

    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2200);
  };

  return (
    <section id="customizer" className="relative w-full bg-[#0d0b0b] text-[#fbf9f5] py-20 sm:py-28 px-4 sm:px-8 md:px-12 border-t border-[#c5a059]/20 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-[#c5a059]/20 pb-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-modern mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>THE ATELIER BESPOKE SUITE</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.04em] text-[#fbf9f5] uppercase">
              CHOOSE YOUR LOOK
            </h2>
          </div>

          <a
            href="#collection"
            data-cursor="SHOP"
            className="mt-4 sm:mt-0 text-[10px] tracking-[0.25em] uppercase text-[#c5a059] hover:text-[#dfbe7e] transition-colors flex items-center gap-2 font-modern"
          >
            <span>SHOP ALL SAREES</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 3-Column Layout Matching User Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: 'Change look' Vertical Thumbnails */}
          <div className="lg:col-span-2 order-2 lg:order-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            <div className="hidden lg:block mb-2">
              <span className="font-script text-2xl text-[#c5a059] block -mb-1">
                Change look
              </span>
              <span className="text-[9px] tracking-[0.25em] text-white/40 uppercase font-modern">
                5 COLORWAYS
              </span>
            </div>

            {SAREE_LOOKS.map((look, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={look.id}
                  onClick={() => setActiveIndex(idx)}
                  data-cursor={look.colorName}
                  className={`group relative w-16 sm:w-20 lg:w-24 aspect-[3/4] rounded-sm overflow-hidden border transition-all duration-300 shrink-0 ${
                    isSelected
                      ? "border-[#c5a059] shadow-lg shadow-[#c5a059]/30 ring-1 ring-[#c5a059]"
                      : "border-white/15 opacity-60 hover:opacity-100 hover:border-white/40"
                  }`}
                >
                  <Image
                    src={look.image}
                    alt={look.title}
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-1 left-1 text-[8px] tracking-wider text-white uppercase font-modern font-semibold">
                    {look.colorName}
                  </span>
                </button>
              );
            })}
          </div>

          {/* CENTER STAGE: Model Portrait + Arrows + Lookbook Trigger */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-sm overflow-hidden bg-[#141212] border border-[#c5a059]/30 shadow-2xl group">
              {/* Active Model Image */}
              <div className="relative w-full h-full">
                <Image
                  key={currentLook.id}
                  src={currentLook.image}
                  alt={currentLook.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover transition-all duration-700 filter contrast-[1.06] brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0808]/70 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Prev Arrow */}
              <button
                onClick={handlePrev}
                data-cursor="PREV"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:border-[#c5a059] flex items-center justify-center text-white hover:text-[#c5a059] transition-all"
                aria-label="Previous look"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Arrow */}
              <button
                onClick={handleNext}
                data-cursor="NEXT"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:border-[#c5a059] flex items-center justify-center text-white hover:text-[#c5a059] transition-all"
                aria-label="Next look"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Top Corner Badge: New Drop 2026 */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/75 backdrop-blur-sm border border-white/15 text-[9px] tracking-[0.25em] text-[#c5a059] uppercase font-modern">
                NEW DROP 2026
              </div>

              {/* Bottom Micro Lookbook Button */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                <button
                  onClick={() => setLookbookVideoOpen(true)}
                  data-cursor="WATCH"
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#c5a059]/40 hover:border-[#c5a059] text-[9px] tracking-[0.2em] text-white uppercase font-modern transition-all shadow-xl group/btn"
                >
                  <span className="w-4 h-4 rounded-full bg-[#c5a059] flex items-center justify-center text-black">
                    <Play className="w-2.5 h-2.5 fill-black ml-0.5" />
                  </span>
                  <span>WATCH LOOKBOOK</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Product Details, Color Swatches, Size, Add to Cart */}
          <div className="lg:col-span-5 order-3 flex flex-col justify-center text-left">
            {/* Reviews & Star Rating */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1 text-[#c5a059]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#c5a059]" />
                ))}
              </div>
              <span className="text-xs text-white/80 font-modern font-semibold">
                {currentLook.rating}
              </span>
              <span className="text-xs text-white/40 font-modern">
                ({currentLook.reviewsCount} Atelier Reviews)
              </span>
            </div>

            {/* Dynamic Saree Title */}
            <h3 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#fbf9f5] font-light leading-tight uppercase mb-2">
              {currentLook.title}
            </h3>

            {/* Price */}
            <div className="text-2xl sm:text-3xl font-editorial text-[#c5a059] font-light mb-4">
              {currentLook.formattedPrice}
              <span className="text-xs text-white/40 font-modern ml-3 font-normal">
                Taxes included • Free Global Shipping
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-white/75 font-modern leading-relaxed tracking-wider mb-6">
              {currentLook.description}
            </p>

            {/* Inclusions Feature Badges */}
            <div className="grid grid-cols-2 gap-2.5 py-4 border-y border-white/10 text-[11px] font-modern text-white/80 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                <span>{currentLook.fabric}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                <span>{currentLook.embroidery}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                <span>Matching Blouse Piece</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                <span>Dry Clean Only</span>
              </div>
            </div>

            {/* SELECT BLOUSE SIZE */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-[10px] tracking-[0.25em] uppercase font-modern mb-2.5">
                <span className="text-[#c5a059]">SELECT BLOUSE SIZE</span>
                <button
                  onClick={() => setSizeChartOpen(true)}
                  className="text-white/50 hover:text-[#c5a059] underline underline-offset-4 cursor-pointer"
                >
                  SIZE CHART
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    data-cursor={size}
                    className={`w-10 h-10 rounded-sm font-modern text-xs font-semibold uppercase flex items-center justify-center transition-all ${
                      selectedSize === size
                        ? "bg-[#c5a059] text-black shadow-lg shadow-[#c5a059]/20"
                        : "bg-[#141212] text-white/70 border border-white/15 hover:border-white/40"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* SELECT COLOUR SWATCHES */}
            <div className="mb-8">
              <div className="text-[10px] tracking-[0.25em] uppercase font-modern mb-2.5">
                <span className="text-[#c5a059]">SELECT COLOUR: </span>
                <span className="text-white font-bold">{currentLook.colorName}</span>
              </div>

              <div className="flex items-center gap-3">
                {SAREE_LOOKS.map((look, idx) => {
                  const isSelected = idx === activeIndex;
                  return (
                    <button
                      key={look.id}
                      onClick={() => setActiveIndex(idx)}
                      data-cursor={look.colorName}
                      className={`relative w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center ${
                        isSelected
                          ? "ring-2 ring-[#c5a059] ring-offset-2 ring-offset-[#0d0b0b] scale-110"
                          : "hover:scale-105 opacity-80 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: look.hex }}
                      title={look.colorName}
                      aria-label={`Select ${look.colorName}`}
                    >
                      {isSelected && (
                        <Check className={`w-3.5 h-3.5 ${look.colorKey === "gold" || look.colorKey === "rose" ? "text-black" : "text-white"}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity & ADD TO CART Distinctive Curved Button */}
            <div className="flex items-center gap-4">
              {/* Quantity Picker */}
              <div className="flex items-center border border-white/20 bg-[#141212] rounded-full px-3 py-2 text-xs font-modern">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2 text-white/60 hover:text-white"
                >
                  -
                </button>
                <span className="px-3 text-white font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2 text-white/60 hover:text-white"
                >
                  +
                </button>
              </div>

              {/* Big Curved Pill ADD TO CART */}
              <button
                onClick={handleAddToCart}
                data-cursor="CART"
                className="flex-1 py-3.5 px-6 rounded-full bg-[#721a28] hover:bg-[#8e2233] text-white font-bold text-xs tracking-[0.25em] uppercase font-modern flex items-center justify-between transition-all duration-300 shadow-xl shadow-[#721a28]/30 group"
              >
                <span>{addedSuccess ? "ADDED TO ARCHIVE" : "ADD TO CART"}</span>
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
                  {addedSuccess ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                data-cursor="WISH"
                className={`p-3 rounded-full border transition-colors ${
                  isWishlisted
                    ? "bg-[#c5a059] border-[#c5a059] text-black"
                    : "border-white/20 hover:border-[#c5a059] text-white/70 hover:text-white"
                }`}
                aria-label="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-black" : ""}`} />
              </button>

              {/* Share Button */}
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: currentLook.title, url: window.location.href }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Atelier link copied to clipboard!");
                  }
                }}
                data-cursor="SHARE"
                className="p-3 rounded-full border border-white/20 hover:border-[#c5a059] text-white/70 hover:text-white transition-colors"
                aria-label="Share Look"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* White-Glove Reassurance */}
            <div className="flex items-center gap-4 text-[9px] tracking-[0.2em] text-white/40 uppercase font-modern mt-6 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                100% AUTHENTIC HANDLOOM PROVENANCE
              </span>
              <span>•</span>
              <span>BESPOKE FITTING AVAILABLE</span>
            </div>
          </div>
        </div>
      </div>

      {/* SIZE CHART MODAL */}
      {sizeChartOpen && (
        <div className="fixed inset-0 z-[970] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#141212] border border-[#c5a059]/40 p-6 sm:p-8 rounded-sm text-left">
            <button
              onClick={() => setSizeChartOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="font-editorial text-2xl text-white mb-2 uppercase">
              BLOUSE MEASUREMENT GUIDE
            </h4>
            <p className="text-xs text-white/60 font-modern mb-6">
              All sizes are tailored with 2-inch internal side seam margins for effortless bespoke alterations.
            </p>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-xs font-modern border border-white/10 text-left">
                <thead className="bg-[#0a0808] text-[#c5a059]">
                  <tr>
                    <th className="p-2.5 border-b border-white/10">SIZE</th>
                    <th className="p-2.5 border-b border-white/10">BUST (IN)</th>
                    <th className="p-2.5 border-b border-white/10">WAIST (IN)</th>
                    <th className="p-2.5 border-b border-white/10">SHOULDER</th>
                  </tr>
                </thead>
                <tbody className="text-white/80 divide-y divide-white/10">
                  <tr><td className="p-2.5 font-bold">S</td><td className="p-2.5">34 - 35</td><td className="p-2.5">27 - 28</td><td className="p-2.5">14.0</td></tr>
                  <tr><td className="p-2.5 font-bold">M</td><td className="p-2.5">36 - 37</td><td className="p-2.5">29 - 30</td><td className="p-2.5">14.5</td></tr>
                  <tr><td className="p-2.5 font-bold">L</td><td className="p-2.5">38 - 39</td><td className="p-2.5">31 - 32</td><td className="p-2.5">15.0</td></tr>
                  <tr><td className="p-2.5 font-bold">XL</td><td className="p-2.5">40 - 41</td><td className="p-2.5">33 - 34</td><td className="p-2.5">15.5</td></tr>
                  <tr><td className="p-2.5 font-bold">2XL</td><td className="p-2.5">42 - 44</td><td className="p-2.5">35 - 37</td><td className="p-2.5">16.0</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* LOOKBOOK VIDEO MODAL */}
      {lookbookVideoOpen && (
        <div className="fixed inset-0 z-[970] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl aspect-[16/9] bg-black border border-[#c5a059]/40 rounded-sm overflow-hidden">
            <button
              onClick={() => setLookbookVideoOpen(false)}
              className="absolute top-4 right-4 z-20 text-white/80 hover:text-white bg-black/60 p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <video
              autoPlay
              controls
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/media/video/hero/hero-fashion.webm" type="video/webm" />
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
