"use client";

import Image from "next/image";
import { Sparkles, ArrowUpRight } from "lucide-react";

const TRENDS = [
  {
    number: "01",
    tag: "SILHOUETTE FORECAST",
    title: "THE ASYMMETRIC DHOTI DRAPE",
    description: "Replacing traditional trousers with structured, pleat-locked handloom silk dhotis tailored for high-fashion galas.",
    image: "/media/images/products/catalog/banarasi-red.jpg",
    season: "2026 FORECAST",
  },
  {
    number: "02",
    tag: "COLOR THEORY",
    title: "TERRACOTTA & MOLTEN COPPER",
    description: "Moving past conventional bridal reds toward ancient mineral pigments, madder root washes, and weathered copper foils.",
    image: "/media/images/products/catalog/paithani-purple.jpg",
    season: "2026 FORECAST",
  },
  {
    number: "03",
    tag: "TEXTILE CRAFT",
    title: "BEATEN MATKA VELVET",
    description: "Wild tussar cocoons spun into textured velvet that absorbs directional light, creating sculptural shadows on stage.",
    image: "/media/images/products/catalog/katan-crimson.jpg",
    season: "2026 FORECAST",
  },
];

export default function LatestTrendsSection() {
  return (
    <section className="relative w-full bg-[#0a0808] text-[#fbf9f5] py-24 sm:py-32 px-6 md:px-12 border-t border-[#c5a059]/15">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#c5a059]/20 pb-8 mb-16">
          <div>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-modern mb-2">
              <Sparkles className="w-3 h-3 text-[#c5a059]" />
              <span>SCENE 14 • 2026 CONTEMPORARY INDIAN</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.06em] text-[#fbf9f5] uppercase">
              LATEST TRENDS
            </h2>
          </div>

          <div className="mt-4 md:mt-0 text-right">
            <span className="text-[10px] tracking-[0.25em] text-[#f7f4ee]/50 uppercase font-modern block">
              NEW SILHOUETTES
            </span>
            <span className="text-xs font-editorial text-[#c5a059]">
              CRAFT / FORM / COLOR
            </span>
          </div>
        </div>

        {/* 3 Editorial Trend Offset Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {TRENDS.map((trend, idx) => (
            <div
              key={trend.number}
              data-cursor="TREND"
              style={{ marginTop: idx === 1 ? "2.5rem" : idx === 2 ? "5rem" : "0" }}
              className="group p-4 bg-[#141212]/90 rounded-sm border border-[#c5a059]/20 hover:border-[#c5a059] transition-all duration-500 shadow-xl flex flex-col justify-between"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xs bg-[#0a0808] mb-6">
                <Image
                  src={trend.image}
                  alt={trend.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-106 transition-transform duration-700 filter contrast-[1.05]"
                />
                <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-black/75 backdrop-blur-sm text-[8px] tracking-[0.25em] text-[#c5a059] font-modern uppercase border border-white/10">
                  {trend.season}
                </div>
                <div className="absolute bottom-3 right-3 z-10 w-8 h-8 rounded-full bg-black/80 flex items-center justify-center text-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-black transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[9px] tracking-[0.25em] text-[#c5a059] font-modern uppercase mb-2">
                  <span>{trend.tag}</span>
                  <span>TREND {trend.number}</span>
                </div>
                <h3 className="font-editorial text-2xl text-[#fbf9f5] font-light leading-snug uppercase mb-3 group-hover:text-[#c5a059] transition-colors">
                  {trend.title}
                </h3>
                <p className="text-xs text-[#f7f4ee]/75 font-modern leading-relaxed tracking-wider">
                  {trend.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
