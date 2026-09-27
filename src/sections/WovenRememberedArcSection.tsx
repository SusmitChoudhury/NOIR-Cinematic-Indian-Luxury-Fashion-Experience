"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "@/context/CartContext";
import { ChevronLeft, ChevronRight, Sparkles, Eye, ArrowRight, X, ShieldCheck, Check, ShoppingBag, Clock } from "lucide-react";

interface ArcItem {
  id: string;
  categoryLabel: string;
  categoryThumb: string;
  title: string;
  subtitle: string;
  price: number;
  formattedPrice: string;
  image: string;
  technique: string;
  origin: string;
  weaveHours: number;
  zariType: string;
  description: string;
  fabric: string;
}

const ARC_ITEMS: ArcItem[] = [
  {
    id: "arc-01",
    categoryLabel: "WEDDING EDIT",
    categoryThumb: "/media/images/products/catalog/banarasi-red.jpg",
    title: "Leela Crimson Saree",
    subtitle: "Pure Katan Silk & Antique Zari",
    price: 88000,
    formattedPrice: "₹88,000",
    image: "/media/images/products/catalog/banarasi-red.jpg",
    technique: "Bespoke Kadhwa Floral Jaal",
    origin: "Varanasi, Uttar Pradesh",
    weaveHours: 240,
    zariType: "Pure Silver Gilded in 24k Gold",
    description: "An aristocratic bridal heirloom drape woven on a traditional pit loom over 30 days. Featuring imperial shikargah motifs intertwined with blooming lotuses in molten antique zari.",
    fabric: "100% Hand-Spun Katan Silk",
  },
  {
    id: "arc-02",
    categoryLabel: "FESTIVE COLLECTION",
    categoryThumb: "/media/images/products/catalog/paithani-purple.jpg",
    title: "Tara Peacock Paithani",
    subtitle: "Tapestry Weave with Asawali Border",
    price: 94500,
    formattedPrice: "₹94,500",
    image: "/media/images/products/catalog/paithani-purple.jpg",
    technique: "Double-Interlocking Twill Tapestry",
    origin: "Yeola, Maharashtra",
    weaveHours: 320,
    zariType: "Real Gold Coated Wire",
    description: "Centuries-old royal Maratha splendour woven with kaleidoscopic mor-bangadi (peacock in bangle) motifs and a luminous solid gold tissue pallu that glows in natural candlelight.",
    fabric: "Pure Mulbari Silk & Fine Metallic Threads",
  },
  {
    id: "arc-03",
    categoryLabel: "BANARASI HEIRLOOM",
    categoryThumb: "/media/images/products/catalog/kanjivaram-emerald.jpg",
    title: "Aaranya Emerald Kanjivaram",
    subtitle: "Heavy Korvai Temple Silk",
    price: 112000,
    formattedPrice: "₹1,12,000",
    image: "/media/images/products/catalog/kanjivaram-emerald.jpg",
    technique: "Tripartite Korvai Interlock",
    origin: "Kanchipuram, Tamil Nadu",
    weaveHours: 410,
    zariType: "Govt. Tested 0.6% Genuine Gold Zari",
    description: "Handcrafted by master generational weavers using two weavers simultaneously. The saturated imperial emerald body seamlessly interlocks into an ornate crimson temple gopuram border.",
    fabric: "High-Twist 3-Ply Mulberry Silk",
  },
  {
    id: "arc-04",
    categoryLabel: "RAW SILK MAJESTY",
    categoryThumb: "/media/images/products/catalog/tissue-gold.jpg",
    title: "Kalyani Temple Silk",
    subtitle: "Authentic Chanderi Tissue & Dabka",
    price: 78000,
    formattedPrice: "₹78,000",
    image: "/media/images/products/catalog/tissue-gold.jpg",
    technique: "Eknaliya Handloom Extra-Weft",
    origin: "Chanderi, Madhya Pradesh",
    weaveHours: 195,
    zariType: "Burnished Muted Champagne Zari",
    description: "Gossamer sheer handloom silk layered with feather-light gold zari warp. Drapes with fluid poise, carrying the whisper of ancient palace corridors and timeless Indian aristocracy.",
    fabric: "Handspun Cotton-Silk with Metallic Filament",
  },
  {
    id: "arc-05",
    categoryLabel: "TEMPLE HERITAGE",
    categoryThumb: "/media/images/products/catalog/rangkat-multi.jpg",
    title: "Saanvi Heirloom Banarasi",
    subtitle: "Rangkat Multi-Hued Jangla",
    price: 135000,
    formattedPrice: "₹1,35,000",
    image: "/media/images/products/catalog/rangkat-multi.jpg",
    technique: "Master Class Rangkat Dye & Kadwa",
    origin: "Varanasi, Uttar Pradesh",
    weaveHours: 520,
    zariType: "Certified Pure Silver Zari",
    description: "A pinnacle masterpiece of the handloom art. The warp is painstakingly hand-blocked in five jewel tones before weaving a continuous golden jangla vine across the entire 6 yards.",
    fabric: "High-Density 4-Ply Pure Katan Silk",
  },
  {
    id: "arc-06",
    categoryLabel: "ROYAL ATELIER",
    categoryThumb: "/media/images/products/catalog/velvet-noir.jpg",
    title: "Rohini Velvet Embroidered",
    subtitle: "Couture Zardozi & Precious Pearls",
    price: 145000,
    formattedPrice: "₹1,45,000",
    image: "/media/images/products/catalog/velvet-noir.jpg",
    technique: "Hand-Framed Adda Zardozi",
    origin: "NOIRÉ Private Haute Atelier, Delhi",
    weaveHours: 380,
    zariType: "Gilded Dabka, Cutdana & Natural Seed Pearls",
    description: "An evening masterpiece sculpted from sumptuous deep velvet. Ornate Mughal arched jali motifs are encrusted with beaten bullion wire, micro crystals, and iridescent natural pearls.",
    fabric: "Silk-Blend Italian Micro Velvet",
  },
];

export default function WovenRememberedArcSection() {
  const { addToCart } = useCart();
  const [activeIndex, setActiveIndex] = useState(2); // Center on Aaranya initially
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState<ArcItem | null>(null);
  const [addedToast, setAddedToast] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Stepping navigation: precisely 1 card at a time
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : ARC_ITEMS.length - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < ARC_ITEMS.length - 1 ? prev + 1 : 0));
  }, []);

  // Gentle low-speed auto-drift (advances 1 card every 4.5 seconds if not hovering or scrolling)
  useEffect(() => {
    if (!isAutoPlay || isHovered || selectedItemForModal) return;

    autoPlayTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev < ARC_ITEMS.length - 1 ? prev + 1 : 0));
    }, 4500);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlay, isHovered, selectedItemForModal]);

  // ScrollTrigger pinned sequence:
  // Pins the section, steps through the cards 1 by 1 on scroll, then cleanly unpins and scrolls down!
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    // Pin section for 1800px of scroll distance
    const totalSteps = ARC_ITEMS.length;
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=1800",
      pin: true,
      anticipatePin: 1,
      scrub: 0.6,
      onUpdate: (self) => {
        // Map scroll progress (0 to 1) into discrete step indices (0 to totalSteps - 1)
        const rawStep = Math.floor(self.progress * totalSteps);
        const clampedStep = Math.min(Math.max(rawStep, 0), totalSteps - 1);
        setActiveIndex(clampedStep);
      },
    });

    triggerRef.current = trigger;

    return () => {
      if (trigger) trigger.kill();
    };
  }, []);

  const handleAddToCart = (item: ArcItem) => {
    addToCart({
      id: item.id,
      name: item.title,
      category: "SAREES",
      collection: "The Atelier Signatures",
      price: item.price,
      formattedPrice: item.formattedPrice,
      color: item.categoryLabel,
      fabric: item.fabric,
      craftsmanship: item.technique,
      image: item.image,
      availability: "Available",
      description: item.description,
      details: [
        `Craft Origin: ${item.origin}`,
        `Weave Time: ${item.weaveHours} Artisan Hours`,
        `Zari Specification: ${item.zariType}`,
      ],
      size: "Free Size Handloom (6.3m)",
    });

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2600);
  };

  return (
    <section
      ref={sectionRef}
      id="woven-remembered"
      className="relative w-full min-h-screen bg-[#080606] text-[#fbf9f5] flex flex-col justify-between py-8 md:py-12 px-4 sm:px-6 md:px-12 overflow-hidden select-none border-t border-b border-[#c5a059]/15"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.08)_0%,rgba(8,6,6,0)_70%)] blur-3xl" />
        <div className="absolute -top-40 right-10 w-96 h-96 bg-[radial-gradient(circle,rgba(158,27,50,0.06)_0%,rgba(8,6,6,0)_70%)] blur-2xl" />
      </div>

      {/* TOP FABRIC / COLLECTION PREVIEW ROW (As seen in Image 2) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mb-6">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {ARC_ITEMS.map((item, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={`thumb-${item.id}`}
                onClick={() => {
                  setActiveIndex(idx);
                  setIsAutoPlay(false);
                }}
                className={`group relative flex flex-col items-center text-left transition-all duration-300 ${
                  isSelected ? "scale-105" : "opacity-60 hover:opacity-100"
                }`}
              >
                {/* Thumbnail Image */}
                <div
                  className={`relative w-full aspect-[16/10] rounded-sm overflow-hidden border transition-all duration-300 ${
                    isSelected
                      ? "border-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.3)] ring-1 ring-[#c5a059]/40"
                      : "border-white/10 group-hover:border-white/30"
                  }`}
                >
                  <Image
                    src={item.categoryThumb}
                    alt={item.categoryLabel}
                    fill
                    sizes="(max-width: 640px) 33vw, 16vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  {isSelected && (
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#c5a059] shadow-[0_0_6px_#c5a059]" />
                  )}
                </div>

                {/* Subtitle Label */}
                <span
                  className={`mt-1.5 text-[9px] sm:text-[10px] tracking-[0.16em] uppercase font-sans font-medium line-clamp-1 transition-colors ${
                    isSelected ? "text-[#c5a059]" : "text-white/60 group-hover:text-white/90"
                  }`}
                >
                  {item.categoryLabel}
                </span>

                {/* Active indicator bar */}
                <div
                  className={`w-full h-0.5 mt-1 transition-all duration-300 ${
                    isSelected ? "bg-[#c5a059]" : "bg-transparent group-hover:bg-white/20"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION HEADER: "Woven to Be Remembered" (Exact Match to Image 2) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 md:mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#c5a059] font-sans font-medium">
              THE ATELIER SIGNATURES
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-editorial font-light tracking-tight text-[#fbf9f5] leading-[1.1]">
            Woven to Be{" "}
            <span className="font-script text-[#d4af37] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal italic drop-shadow-[0_2px_12px_rgba(212,175,55,0.3)]">
              Remembered
            </span>
          </h2>
        </div>

        {/* Right side interactive indicators & quick step */}
        <div className="flex items-center gap-4 sm:gap-6 self-start md:self-end">
          <div className="hidden sm:flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/50">
            <span className="text-[#c5a059] font-semibold">0{activeIndex + 1}</span>
            <span className="w-6 h-[1px] bg-white/20" />
            <span>0{ARC_ITEMS.length}</span>
          </div>

          {/* Stepping controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                handlePrev();
                setIsAutoPlay(false);
              }}
              aria-label="Previous Royal Look"
              className="w-10 h-10 rounded-full border border-white/20 hover:border-[#c5a059] bg-white/[0.03] hover:bg-[#c5a059]/10 flex items-center justify-center transition-all duration-300 text-white/80 hover:text-[#c5a059]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                handleNext();
                setIsAutoPlay(false);
              }}
              aria-label="Next Royal Look"
              className="w-10 h-10 rounded-full border border-white/20 hover:border-[#c5a059] bg-white/[0.03] hover:bg-[#c5a059]/10 flex items-center justify-center transition-all duration-300 text-white/80 hover:text-[#c5a059]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => setSelectedItemForModal(ARC_ITEMS[activeIndex])}
            className="group hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c5a059] hover:text-[#f3e5ab] transition-colors"
          >
            <span>Explore The Edit</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* CURVED 3D ARC CAROUSEL CONTAINER */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex items-center justify-center py-4 my-auto min-h-[380px] sm:min-h-[460px] md:min-h-[500px]"
        style={{ perspective: "1400px" }}
      >
        <div className="relative w-full h-[360px] sm:h-[440px] md:h-[480px] flex items-center justify-center">
          {ARC_ITEMS.map((item, index) => {
            const diff = index - activeIndex;
            const absDiff = Math.abs(diff);
            const isCenter = diff === 0;

            // Curved arc calculations:
            // Center is elevated and forward. Wings curve down and angle back in 3D Y-rotation.
            const xOffset = diff * 240; // spacing between cards
            const yOffset = absDiff * 24; // parabolic downward arc curve
            const zOffset = -absDiff * 60; // depth offset
            const rotateY = diff * -12; // tilt towards center
            const rotateZ = diff * 2.2; // slight tangential roll
            const scale = isCenter ? 1.05 : Math.max(0.82, 1 - absDiff * 0.08);
            const opacity = Math.max(0.35, 1 - absDiff * 0.22);
            const zIndex = 20 - absDiff;

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!isCenter) {
                    setActiveIndex(index);
                    setIsAutoPlay(false);
                  }
                }}
                className={`absolute w-[220px] sm:w-[270px] md:w-[310px] h-[330px] sm:h-[410px] md:h-[450px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isCenter
                    ? "ring-2 ring-[#c5a059]/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(197,160,89,0.25)]"
                    : "hover:ring-1 hover:ring-white/40 shadow-xl opacity-70 hover:opacity-95"
                }`}
                style={{
                  transform: `translateX(${xOffset}px) translateY(${yOffset}px) translateZ(${zOffset}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
              >
                {/* Product/Model Full Bleed Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, 320px"
                  priority={isCenter}
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Cinematic Vignette Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

                {/* Center subtle golden border glow */}
                {isCenter && (
                  <div className="absolute inset-0 border border-[#c5a059]/40 rounded-2xl pointer-events-none" />
                )}

                {/* Top Badge: Category & Weave Tag */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-[0.16em]">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[#c5a059] font-sans font-medium">
                    {item.categoryLabel}
                  </span>
                  {isCenter && (
                    <span className="px-2 py-0.5 rounded-full bg-[#c5a059]/20 backdrop-blur-md border border-[#c5a059]/40 text-[#f3e5ab] text-[9px] flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-[#c5a059]" />
                      Royal Heirloom
                    </span>
                  )}
                </div>

                {/* Bottom Content Card Details */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex flex-col gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-editorial font-light text-white tracking-wide leading-tight drop-shadow-md">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-white/70 line-clamp-1 font-sans mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-white/15">
                    <span className="text-sm sm:text-base font-editorial text-[#c5a059] font-normal tracking-wide">
                      {item.formattedPrice}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-white/50">
                      {item.origin.split(",")[0]}
                    </span>
                  </div>

                  {/* Center Card Interactive Action Buttons */}
                  {isCenter && (
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItemForModal(item);
                        }}
                        className="flex-1 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-[11px] uppercase tracking-[0.14em] font-sans transition-all flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#c5a059]" />
                        <span>View Details</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(item);
                        }}
                        className="py-2 px-3 rounded-lg bg-[#c5a059] hover:bg-[#d4af37] text-black text-[11px] uppercase tracking-[0.14em] font-sans font-semibold transition-all shadow-[0_4px_15px_rgba(197,160,89,0.4)] flex items-center justify-center gap-1"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-black" />
                        <span>Add</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM CONTROL & STATUS BAR */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50 pt-2 border-t border-white/10">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.18em]">
            Step 1-at-a-time • Scroll down to glide through the royal collection
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-full border border-white/20 hover:border-[#c5a059] text-white/70 hover:text-white transition-colors"
          >
            {isAutoPlay ? "Auto Drift: ON" : "Auto Drift: PAUSED"}
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {ARC_ITEMS.map((_, i) => (
              <button
                key={`dot-${i}`}
                onClick={() => {
                  setActiveIndex(i);
                  setIsAutoPlay(false);
                }}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === i
                    ? "w-6 h-1.5 bg-[#c5a059]"
                    : "w-1.5 h-1.5 bg-white/20 hover:bg-white/50"
                }`}
                aria-label={`Jump to look ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* QUICK VIEW / ATELIER DETAILS MODAL */}
      {selectedItemForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#120f0f] border border-[#c5a059]/40 rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)] grid grid-cols-1 md:grid-cols-2">
            {/* Close Button */}
            <button
              onClick={() => setSelectedItemForModal(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 border border-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image Column */}
            <div className="relative w-full aspect-[4/5] md:aspect-auto md:h-full min-h-[340px]">
              <Image
                src={selectedItemForModal.image}
                alt={selectedItemForModal.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
            </div>

            {/* Right Details Column */}
            <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-sans font-medium">
                    {selectedItemForModal.categoryLabel}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span className="text-[10px] uppercase tracking-wider text-white/60">
                    {selectedItemForModal.origin}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-editorial font-light text-white mb-1">
                  {selectedItemForModal.title}
                </h3>
                <p className="text-xs text-white/60 font-sans mb-4">
                  {selectedItemForModal.subtitle}
                </p>

                <div className="text-2xl font-editorial text-[#c5a059] mb-5">
                  {selectedItemForModal.formattedPrice}
                </div>

                <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed mb-6">
                  {selectedItemForModal.description}
                </p>

                {/* Provenance Specifications */}
                <div className="space-y-2.5 py-4 border-t border-b border-white/10 text-xs font-sans">
                  <div className="flex items-center justify-between text-white/70">
                    <span className="text-white/40">Weaving Technique</span>
                    <span className="text-right text-[#f3e5ab]">{selectedItemForModal.technique}</span>
                  </div>
                  <div className="flex items-center justify-between text-white/70">
                    <span className="text-white/40">Zari Purity</span>
                    <span className="text-right text-[#c5a059]">{selectedItemForModal.zariType}</span>
                  </div>
                  <div className="flex items-center justify-between text-white/70">
                    <span className="text-white/40">Handloom Loom Time</span>
                    <span className="text-right flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#c5a059]" />
                      {selectedItemForModal.weaveHours} Artisan Hours
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-white/70">
                    <span className="text-white/40">Base Fabric</span>
                    <span className="text-right">{selectedItemForModal.fabric}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 space-y-3">
                <button
                  onClick={() => {
                    handleAddToCart(selectedItemForModal);
                    setSelectedItemForModal(null);
                  }}
                  className="w-full py-3.5 rounded-full bg-[#c5a059] hover:bg-[#d4af37] text-black font-sans text-xs uppercase tracking-[0.18em] font-semibold transition-all shadow-[0_8px_25px_rgba(197,160,89,0.35)] flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-black" />
                  <span>Reserve This Royal Drape</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-white/50">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Silk Mark Certified • Complimentary Global Insured Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Added to cart toast */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-[#161212] border border-[#c5a059] shadow-2xl text-white animate-slideUp">
          <div className="w-6 h-6 rounded-full bg-[#c5a059] flex items-center justify-center text-black">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Added to Luxury Bag</div>
            <div className="text-[10px] text-[#c5a059]">Complimentary Royal Packaging Included</div>
          </div>
        </div>
      )}
    </section>
  );
}
