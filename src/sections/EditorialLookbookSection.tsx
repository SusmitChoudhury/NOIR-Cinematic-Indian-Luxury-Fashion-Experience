"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { registerGSAP } from "@/lib/gsap";
import { lookbookItems } from "@/data/editorial";
import { Sparkles, Camera } from "lucide-react";

export default function EditorialLookbookSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedCenterRef = useRef<HTMLDivElement>(null);
  const floatItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const { gsap, ScrollTrigger } = registerGSAP();

    const ctx = gsap.context(() => {
      // Pin the central hero image while surrounding collage floats through
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinnedCenterRef.current,
        pinSpacing: false,
      });

      // Parallax and rotational motion for floating frames
      floatItemsRef.current.forEach((item, i) => {
        if (!item) return;
        const speed = (i % 3 === 0 ? 30 : i % 2 === 0 ? -25 : 18);
        const rotation = (i % 2 === 0 ? 3 : -3);

        gsap.to(item, {
          yPercent: speed,
          rotate: rotation,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="lookbook"
      ref={sectionRef}
      className="relative w-full bg-[#0a0808] text-[#fbf9f5] py-24 sm:py-32 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Lookbook Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#c5a059]/20 pb-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-modern mb-2">
              <Camera className="w-3 h-3 text-[#c5a059]" />
              <span>SCENE 10 • EDITORIAL LOOKBOOK</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.06em] text-[#fbf9f5] uppercase">
              THE MONUMENTAL GAZE
            </h2>
          </div>

          <div className="mt-4 sm:mt-0 text-right">
            <span className="text-[10px] tracking-[0.25em] text-[#f7f4ee]/50 uppercase font-modern block">
              10 INTENTIONAL COMPOSITIONS
            </span>
            <span className="text-xs font-editorial text-[#c5a059]">
              AUTUMN / WINTER 2026 CAMPAIGN
            </span>
          </div>
        </div>

        {/* Asymmetrical Collage Layout with Pinned Focal Feature */}
        <div className="relative min-h-[180vh] sm:min-h-[220vh] w-full">
          {/* Pinned Central Feature Frame (Stays anchored while user scrolls) */}
          <div
            ref={pinnedCenterRef}
            className="sticky top-28 z-10 w-full max-w-md sm:max-w-lg mx-auto aspect-[3/4] p-3 bg-[#141212]/90 backdrop-blur-md rounded-sm border border-[#c5a059]/40 shadow-2xl pointer-events-none"
          >
            <div className="relative w-full h-full overflow-hidden bg-[#0a0808]">
              <Image
                src={lookbookItems[0].image}
                alt={lookbookItems[0].title}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover filter contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0808] via-transparent to-transparent opacity-85" />
              <div className="absolute bottom-4 left-4 right-4 pointer-events-auto">
                <span className="text-[8px] tracking-[0.3em] uppercase text-[#c5a059] font-modern block">
                  PINNED MONOLITH • {lookbookItems[0].subtitle}
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl text-white font-light">
                  {lookbookItems[0].title}
                </h3>
                {lookbookItems[0].quote && (
                  <p className="font-editorial italic text-xs text-[#dfbe7e] mt-1">
                    {lookbookItems[0].quote}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Floating Asymmetrical Composition Images Surrounding the Center */}
          <div className="relative z-20 space-y-24 sm:space-y-36 -mt-[40vh] sm:-mt-[50vh]">
            {/* Row 1: Left tall + Right wide offset */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-12">
              <div
                ref={(el) => {
                  floatItemsRef.current[0] = el;
                }}
                data-cursor="LOOK"
                className="w-full sm:w-[42%] aspect-[3/4] p-2 bg-[#141212]/80 border border-[#c5a059]/20 shadow-xl group hover:border-[#c5a059] transition-colors"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={lookbookItems[1].image}
                    alt={lookbookItems[1].title}
                    fill
                    sizes="40vw"
                    className="object-cover group-hover:scale-106 transition-transform duration-700"
                  />
                  <div className="absolute bottom-2 left-2 z-10 px-2 py-1 bg-black/70 backdrop-blur-sm text-[8px] tracking-[0.25em] text-[#c5a059] uppercase font-modern">
                    {lookbookItems[1].subtitle}
                  </div>
                </div>
              </div>

              <div
                ref={(el) => {
                  floatItemsRef.current[1] = el;
                }}
                data-cursor="LOOK"
                className="w-full sm:w-[38%] aspect-[4/3] sm:mt-32 p-2 bg-[#141212]/80 border border-[#c5a059]/20 shadow-xl group hover:border-[#c5a059] transition-colors"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={lookbookItems[2].image}
                    alt={lookbookItems[2].title}
                    fill
                    sizes="40vw"
                    className="object-cover group-hover:scale-106 transition-transform duration-700"
                  />
                  <div className="absolute bottom-2 left-2 z-10 px-2 py-1 bg-black/70 backdrop-blur-sm text-[8px] tracking-[0.25em] text-[#c5a059] uppercase font-modern">
                    {lookbookItems[2].subtitle}
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Right tall + Left offset */}
            <div className="flex flex-col sm:flex-row-reverse justify-between items-center gap-12">
              <div
                ref={(el) => {
                  floatItemsRef.current[2] = el;
                }}
                data-cursor="LOOK"
                className="w-full sm:w-[45%] aspect-[3/4] p-2 bg-[#141212]/80 border border-[#c5a059]/20 shadow-xl group hover:border-[#c5a059] transition-colors"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={lookbookItems[3].image}
                    alt={lookbookItems[3].title}
                    fill
                    sizes="45vw"
                    className="object-cover group-hover:scale-106 transition-transform duration-700"
                  />
                  <div className="absolute bottom-2 left-2 z-10 px-2 py-1 bg-black/70 backdrop-blur-sm text-[8px] tracking-[0.25em] text-[#c5a059] uppercase font-modern">
                    {lookbookItems[3].subtitle}
                  </div>
                </div>
              </div>

              <div
                ref={(el) => {
                  floatItemsRef.current[3] = el;
                }}
                data-cursor="LOOK"
                className="w-full sm:w-[35%] aspect-square p-2 bg-[#141212]/80 border border-[#c5a059]/20 shadow-xl group hover:border-[#c5a059] transition-colors"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={lookbookItems[4].image}
                    alt={lookbookItems[4].title}
                    fill
                    sizes="35vw"
                    className="object-cover group-hover:scale-106 transition-transform duration-700"
                  />
                  <div className="absolute bottom-2 left-2 z-10 px-2 py-1 bg-black/70 backdrop-blur-sm text-[8px] tracking-[0.25em] text-[#c5a059] uppercase font-modern">
                    {lookbookItems[4].subtitle}
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Full width panoramic crop + detail inset */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {[lookbookItems[5], lookbookItems[6], lookbookItems[7]].map((item, idx) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    floatItemsRef.current[4 + idx] = el;
                  }}
                  data-cursor="LOOK"
                  className="w-full aspect-[3/4] p-2 bg-[#141212]/80 border border-[#c5a059]/20 shadow-xl group hover:border-[#c5a059] transition-colors"
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="33vw"
                      className="object-cover group-hover:scale-106 transition-transform duration-700"
                    />
                    <div className="absolute bottom-2 left-2 z-10 px-2 py-1 bg-black/70 backdrop-blur-sm text-[8px] tracking-[0.25em] text-[#c5a059] uppercase font-modern">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 4: Craft closeup frames */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-10">
              <div
                ref={(el) => {
                  floatItemsRef.current[7] = el;
                }}
                data-cursor="CRAFT"
                className="w-full sm:w-[50%] aspect-[16/9] p-2 bg-[#141212]/80 border border-[#c5a059]/20 shadow-xl group hover:border-[#c5a059] transition-colors"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={lookbookItems[8].image}
                    alt={lookbookItems[8].title}
                    fill
                    sizes="50vw"
                    className="object-cover group-hover:scale-106 transition-transform duration-700"
                  />
                  <div className="absolute bottom-2 left-2 z-10 px-2 py-1 bg-black/70 backdrop-blur-sm text-[8px] tracking-[0.25em] text-[#c5a059] uppercase font-modern">
                    {lookbookItems[8].subtitle}
                  </div>
                </div>
              </div>

              <div
                ref={(el) => {
                  floatItemsRef.current[8] = el;
                }}
                data-cursor="CRAFT"
                className="w-full sm:w-[45%] aspect-[16/9] p-2 bg-[#141212]/80 border border-[#c5a059]/20 shadow-xl group hover:border-[#c5a059] transition-colors"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={lookbookItems[9].image}
                    alt={lookbookItems[9].title}
                    fill
                    sizes="45vw"
                    className="object-cover group-hover:scale-106 transition-transform duration-700"
                  />
                  <div className="absolute bottom-2 left-2 z-10 px-2 py-1 bg-black/70 backdrop-blur-sm text-[8px] tracking-[0.25em] text-[#c5a059] uppercase font-modern">
                    {lookbookItems[9].subtitle}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
