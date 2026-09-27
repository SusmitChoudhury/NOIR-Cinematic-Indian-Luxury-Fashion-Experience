"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Eye, ArrowUpRight } from "lucide-react";
import QuickViewModal from "@/components/ui/QuickViewModal";
import { productsWithVariants } from "@/data/products";

const MARQUEE_TEXT_1 = [
  "NOIRÉ COUTURE",
  "VARANASI PIT LOOM",
  "24K GOLD BULLION",
  "AUTUMN / WINTER 2026",
  "KORVAI INTERLOCK",
  "IMPERIAL HERITAGE",
];

const MARQUEE_TEXT_2 = [
  "HAUTE COUTURE ARCHIVE",
  "ANATOLIAN & MUGHAL JAAL",
  "TRIPLE-PLY MULBERRY SILK",
  "PURE SILVER RESHAM",
  "SCULPTURAL SOVEREIGNTY",
  "SACRED GEOMETRY",
];

const RUNWAY_CARDS = [
  {
    id: "runway-01",
    title: "The Kashi Banarasi Katan Silk",
    technique: "Bespoke Kadhwa Jaal",
    provenance: "Varanasi, Uttar Pradesh",
    price: "₹1,85,000",
    image: "/media/images/products/catalog/banarasi-red.jpg",
    tag: "IMPERIAL CRIMSON",
    badge: "COL. 01/26",
  },
  {
    id: "runway-02",
    title: "The Kanjivaram Temple Border",
    technique: "Triple Ply Korvai Joint",
    provenance: "Kanchipuram, Tamil Nadu",
    price: "₹2,65,000",
    image: "/media/images/products/catalog/kanjivaram-emerald.jpg",
    tag: "DEEP EMERALD",
    badge: "COL. 02/26",
  },
  {
    id: "runway-03",
    title: "The Atelier French Net Saree",
    technique: "Cutdana & Zari Flora",
    provenance: "NOIRÉ Private Haute Atelier",
    price: "₹1,35,000",
    image: "/media/images/products/catalog/net-rose.jpg",
    tag: "ROSÉ BLUSH",
    badge: "COL. 03/26",
  },
  {
    id: "runway-04",
    title: "The Tara Paithani Peacock",
    technique: "Double-Interlocking Tapestry",
    provenance: "Yeola, Maharashtra",
    price: "₹94,500",
    image: "/media/images/products/catalog/paithani-purple.jpg",
    tag: "REGAL PURPLE",
    badge: "COL. 04/26",
  },
  {
    id: "runway-05",
    title: "The Mughal Velvet Zardozi",
    technique: "Hand-Framed Adda Wire",
    provenance: "Mughal Imperial Archives",
    price: "₹2,10,000",
    image: "/media/images/products/catalog/velvet-noir.jpg",
    tag: "MIDNIGHT NOIR",
    badge: "COL. 05/26",
  },
  {
    id: "runway-06",
    title: "The Rangkat Multi-Hued Jangla",
    technique: "5-Jewel Block Warp Dye",
    provenance: "Varanasi, Uttar Pradesh",
    price: "₹1,95,000",
    image: "/media/images/products/catalog/rangkat-multi.jpg",
    tag: "NAVRATNA PALETTE",
    badge: "COL. 06/26",
  },
  {
    id: "runway-07",
    title: "The Chanderi Tissue Gossamer",
    technique: "Eknaliya Fine Gold Warp",
    provenance: "Chanderi, Madhya Pradesh",
    price: "₹1,15,000",
    image: "/media/images/products/catalog/tissue-gold.jpg",
    tag: "CHAMPAGNE GOLD",
    badge: "COL. 07/26",
  },
  {
    id: "runway-08",
    title: "The Imperial Navy Brocade",
    technique: "Shikargah Golden Meena",
    provenance: "Varanasi, Uttar Pradesh",
    price: "₹1,85,000",
    image: "/media/images/products/catalog/banarasi-navy.jpg",
    tag: "IMPERIAL NAVY",
    badge: "COL. 08/26",
  },
];

export default function CollectionMarquee() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleCardClick = (cardId: string) => {
    // Map to a product for modal view if exists
    const prod = productsWithVariants.find((p) => p.id === cardId) || productsWithVariants[0];
    setSelectedProduct(prod);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0808] py-16 sm:py-24 border-y border-[#c5a059]/15 select-none">
      {/* Header bar indicator */}
      <div className="max-w-7xl mx-auto px-6 mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-modern flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
            SCENE 06 • INFINITE RUNWAY RIBBON
          </span>
          <span className="w-1 h-1 rounded-full bg-[#c5a059]" />
          <span className="text-[10px] tracking-[0.25em] text-white/50 uppercase font-modern hidden sm:inline">
            CONTINUOUS LOW-SPEED DRIFT
          </span>
        </div>
        <div className="text-right">
          <span className="text-[9px] tracking-[0.25em] text-[#c5a059] uppercase font-modern">
            HOVER TO PAUSE & EXAMINE
          </span>
        </div>
      </div>

      {/* Row 1: Top Typography Marquee (drifting leftward at very low speed) */}
      <div className="w-full overflow-hidden mb-8">
        <div className="flex whitespace-nowrap animate-marquee-slow gap-12 sm:gap-16 items-center">
          {Array.from({ length: 4 }).flatMap((_, i) =>
            MARQUEE_TEXT_1.map((item, idx) => (
              <div key={`m1-${i}-${idx}`} className="flex items-center gap-12 sm:gap-16">
                <span className="font-editorial text-3xl sm:text-5xl md:text-6xl tracking-[0.12em] text-[#fbf9f5]/70 uppercase font-light hover:text-[#c5a059] transition-colors">
                  {item}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#c5a059]/60" />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Row 2: Master Visual Runway Rail (auto-scrolling leftwards at very slow speed, pauses on hover) */}
      <div className="relative w-full overflow-hidden py-4 group/rail">
        {/* Soft edge gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#0a0808] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#0a0808] to-transparent z-10 pointer-events-none" />

        <div className="flex whitespace-nowrap animate-marquee-runway gap-6 sm:gap-8 items-center group-hover/rail:[animation-play-state:paused]">
          {/* Double array for seamless continuous infinite loop */}
          {[...RUNWAY_CARDS, ...RUNWAY_CARDS].map((card, idx) => (
            <div
              key={`runway-${card.id}-${idx}`}
              onClick={() => handleCardClick(card.id)}
              className="inline-block relative w-64 sm:w-80 flex-shrink-0 cursor-pointer group bg-[#141212]/95 border border-[#c5a059]/25 hover:border-[#c5a059] rounded-sm p-3.5 transition-all duration-500 hover:shadow-[0_0_35px_rgba(197,160,89,0.25)] hover:-translate-y-1.5"
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#0a0808] rounded-xs mb-3">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 640px) 256px, 320px"
                  className="object-cover group-hover:scale-106 transition-transform duration-700 filter contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0808] via-transparent to-transparent opacity-80" />

                {/* Top badges */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                  <span className="text-[8px] tracking-[0.25em] text-[#c5a059] bg-[#0a0808]/85 backdrop-blur-sm px-2 py-0.5 border border-white/10 uppercase font-modern">
                    {card.badge}
                  </span>
                  <span className="text-[8px] tracking-[0.2em] text-white/90 bg-[#c5a059]/20 backdrop-blur-sm px-2 py-0.5 border border-[#c5a059]/40 uppercase font-modern">
                    {card.tag}
                  </span>
                </div>

                {/* Hover Quick View pill */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bg-black/35 backdrop-blur-[2px]">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#c5a059] text-black text-[9px] tracking-[0.25em] font-modern uppercase font-medium rounded-full shadow-lg">
                    <Eye className="w-3 h-3" />
                    EXAMINE COUTURE
                  </span>
                </div>
              </div>

              {/* Card Meta */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-[9px] tracking-[0.2em] text-[#c5a059] font-modern uppercase">
                  <span>{card.technique}</span>
                  <span className="font-editorial text-sm text-[#fbf9f5] font-light">
                    {card.price}
                  </span>
                </div>
                <h4 className="font-editorial text-base sm:text-lg text-[#fbf9f5] font-light tracking-wide line-clamp-1 group-hover:text-[#c5a059] transition-colors">
                  {card.title}
                </h4>
                <div className="flex items-center justify-between text-[8px] tracking-[0.2em] text-white/50 font-modern uppercase pt-1 border-t border-white/10 mt-1">
                  <span>{card.provenance}</span>
                  <ArrowUpRight className="w-3 h-3 text-[#c5a059] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3: Bottom Typography Marquee (drifting rightward at very low speed) */}
      <div className="w-full overflow-hidden mt-8">
        <div className="flex whitespace-nowrap animate-marquee-slow-reverse gap-10 sm:gap-14 items-center">
          {Array.from({ length: 4 }).flatMap((_, i) =>
            MARQUEE_TEXT_2.map((item, idx) => (
              <div key={`m2-${i}-${idx}`} className="flex items-center gap-10 sm:gap-14">
                <span
                  style={{
                    WebkitTextStroke: "1px rgba(197, 160, 89, 0.45)",
                    color: "transparent",
                  }}
                  className="font-modern text-xl sm:text-3xl md:text-4xl tracking-[0.25em] uppercase font-light hover:text-[#c5a059] transition-colors"
                >
                  {item}
                </span>
                <span className="text-[#c5a059]/40 text-xs tracking-widest">•</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick View Modal integration */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Custom Styles for Very Low Speed Continuous Marquee */}
      <style jsx>{`
        @keyframes marqueeSlow {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marqueeSlowReverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        @keyframes marqueeRunway {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee-slow {
          display: flex;
          width: max-content;
          animation: marqueeSlow 45s linear infinite;
        }
        .animate-marquee-slow-reverse {
          display: flex;
          width: max-content;
          animation: marqueeSlowReverse 50s linear infinite;
        }
        .animate-marquee-runway {
          display: flex;
          width: max-content;
          animation: marqueeRunway 55s linear infinite;
        }
      `}</style>
    </section>
  );
}
