"use client";

import { useEffect, useRef } from "react";
import { registerGSAP } from "@/lib/gsap";

export default function CollectionMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap, ScrollTrigger } = registerGSAP();

    const ctx = gsap.context(() => {
      // Layer 1 moves left with scroll scrub
      gsap.to(layer1Ref.current, {
        xPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Layer 2 moves right with opposite speed for differential parallax
      gsap.to(layer2Ref.current, {
        xPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const marqueeText1 = [
    "NOIRÉ",
    "INDIAN CRAFT",
    "CONTEMPORARY FORM",
    "AUTUMN / WINTER 2026",
    "KATAN SILK",
    "REAL ZARI",
  ];

  const marqueeText2 = [
    "BANARASI WEAVE",
    "DOUBLE IKAT",
    "ARCHITECTURAL VELVET",
    "HAUTE COUTURE",
    "SACRED GEOMETRY",
    "SCULPTED SOVEREIGNTY",
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#0a0808] py-14 border-y border-[#c5a059]/15 select-none"
    >
      {/* Layer 1: Leftward moving, large elegant serif */}
      <div
        ref={layer1Ref}
        className="flex whitespace-nowrap will-change-transform gap-12 sm:gap-16 items-center"
      >
        {Array.from({ length: 4 }).flatMap((_, i) =>
          marqueeText1.map((item, idx) => (
            <div key={`l1-${i}-${idx}`} className="flex items-center gap-12 sm:gap-16">
              <span className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.1em] text-[#fbf9f5]/85 uppercase font-light hover:text-[#c5a059] transition-colors">
                {item}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#c5a059]/60" />
            </div>
          ))
        )}
      </div>

      {/* Layer 2: Rightward moving, delicate sans with gold outline */}
      <div
        ref={layer2Ref}
        className="flex whitespace-nowrap will-change-transform gap-10 sm:gap-14 items-center mt-4 sm:mt-6 -ml-96"
      >
        {Array.from({ length: 4 }).flatMap((_, i) =>
          marqueeText2.map((item, idx) => (
            <div key={`l2-${i}-${idx}`} className="flex items-center gap-10 sm:gap-14">
              <span
                style={{
                  WebkitTextStroke: "1px rgba(197, 160, 89, 0.45)",
                  color: "transparent",
                }}
                className="font-modern text-2xl sm:text-4xl md:text-5xl tracking-[0.25em] uppercase font-light hover:text-[#c5a059] transition-colors"
              >
                {item}
              </span>
              <span className="text-[#c5a059]/50 text-xs tracking-widest">•</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
