"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { registerGSAP } from "@/lib/gsap";
import { stackImages } from "@/data/editorial";
import { Sparkles, Layers } from "lucide-react";

export default function ImageStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current || !pinContainerRef.current) return;

    const { gsap, ScrollTrigger } = registerGSAP();

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const total = cards.length;

      // Pinned Card Deck ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=380%", // 380vh for distinct card peel pacing
          pin: pinContainerRef.current,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(total - 1, Math.floor(self.progress * total));
            setActiveCardIndex(idx);
          },
        },
      });

      // Choreograph each card's peeling exit with different subtle visual transitions:
      // Card 0: lifts up and scales down with rotation
      // Card 1: slides left with clip-path wipe
      // Card 2: flips slightly on Y axis and scales out
      // Card 3: slides right with motion blur feel
      // Card 4: dissolves upward with vertical scale
      // Card 5: rotates -8deg and drops
      // Card 6: diagonal peel
      // Card 7: final dominant anchor
      cards.forEach((card, i) => {
        if (i < total - 1) {
          const stepStart = i / (total - 1);
          const stepEnd = (i + 0.9) / (total - 1);

          let exitProps = {};
          if (i === 0) {
            exitProps = { yPercent: -120, rotate: -6, opacity: 0, scale: 0.85 };
          } else if (i === 1) {
            exitProps = { xPercent: -130, rotate: 4, opacity: 0 };
          } else if (i === 2) {
            exitProps = { rotateY: 45, yPercent: -100, opacity: 0, scale: 0.8 };
          } else if (i === 3) {
            exitProps = { xPercent: 130, rotate: -5, opacity: 0 };
          } else if (i === 4) {
            exitProps = { yPercent: -130, scale: 1.15, opacity: 0 };
          } else if (i === 5) {
            exitProps = { rotate: -12, xPercent: -90, yPercent: 40, opacity: 0 };
          } else if (i === 6) {
            exitProps = { xPercent: 100, yPercent: -100, rotate: 8, opacity: 0 };
          }

          tl.to(
            card,
            {
              ...exitProps,
              ease: "power2.inOut",
            },
            stepStart
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0a0808] text-[#fbf9f5] select-none"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinContainerRef}
        className="w-full h-screen overflow-hidden flex flex-col justify-between py-10 px-6 sm:px-12 relative"
      >
        {/* Top Header */}
        <div className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between border-b border-[#c5a059]/15 pb-4">
          <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-modern flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-[#c5a059]" />
              SCENE 11
            </span>
            <span className="w-1 h-1 rounded-full bg-[#c5a059]" />
            <h2 className="font-editorial text-2xl sm:text-3xl tracking-[0.1em] uppercase text-[#fbf9f5]">
              CINEMATIC IMAGE STACK
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-editorial text-[#c5a059] tracking-widest">
              0{activeCardIndex + 1} / 0{stackImages.length}
            </span>
          </div>
        </div>

        {/* Central Deck Stage */}
        <div className="relative w-full max-w-2xl sm:max-w-3xl mx-auto flex-1 flex items-center justify-center my-4">
          {stackImages.map((item, idx) => {
            // Stack depth offset
            const zIndex = stackImages.length - idx;
            const initialRotation = ((idx % 3) - 1) * 1.5;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                style={{
                  zIndex,
                  transform: `rotate(${initialRotation}deg) scale(${1 - idx * 0.02})`,
                }}
                data-cursor="PEEL"
                className="absolute w-[85vw] sm:w-[520px] md:w-[600px] aspect-[4/5] p-3 sm:p-4 bg-[#141212] rounded-sm border border-[#c5a059]/30 shadow-2xl will-change-transform"
              >
                <div className="relative w-full h-full overflow-hidden bg-[#0a0808] rounded-xs">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 90vw, 600px"
                    className="object-cover filter contrast-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0808]/90 via-transparent to-transparent opacity-85" />

                  {/* Micro Metadata */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 bg-[#0a0808]/80 backdrop-blur-sm border border-white/10 text-[9px] tracking-[0.25em] text-[#c5a059] uppercase font-modern">
                    <Sparkles className="w-2.5 h-2.5 text-[#c5a059]" />
                    <span>{item.subtitle}</span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#c5a059] font-modern block mb-1">
                      CHOREOGRAPHED ARCHIVE
                    </span>
                    <h3 className="font-editorial text-2xl sm:text-4xl text-[#fbf9f5] font-light uppercase tracking-wide">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Guide */}
        <div className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/10 pt-4 text-[10px] tracking-[0.25em] uppercase font-modern">
          <span className="text-[#c5a059]">
            SCROLL DOWN TO PEEL EACH ARCHIVAL FORM
          </span>
          <span className="text-white/40">
            8 REVERSIBLE CHOREOGRAPHIES
          </span>
        </div>
      </div>
    </section>
  );
}
