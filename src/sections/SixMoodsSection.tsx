"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { registerGSAP } from "@/lib/gsap";
import { moods } from "@/data/moods";
import { Sparkles, ArrowRight } from "lucide-react";

export default function SixMoodsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeMoodIndex, setActiveMoodIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current || !pinContainerRef.current) return;

    const { gsap, ScrollTrigger } = registerGSAP();

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      const totalCards = cards.length;

      // Master Pinned Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=450%", // 450vh scroll duration for deliberate choreography
          pin: pinContainerRef.current,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.min(
              totalCards - 1,
              Math.floor(self.progress * totalCards)
            );
            setActiveMoodIndex(index);
          },
        },
      });

      // Update progress bar width
      if (progressBarRef.current) {
        tl.to(
          progressBarRef.current,
          {
            scaleX: 1,
            ease: "none",
          },
          0
        );
      }

      // Animate each card transition in sequence
      cards.forEach((card, i) => {
        if (i === 0) {
          // First card starts visible in center
          gsap.set(card, {
            opacity: 1,
            scale: 1,
            rotate: 0,
            xPercent: 0,
            yPercent: 0,
            zIndex: 10,
          });
        } else {
          // Subsequent cards start scaled down and offset
          gsap.set(card, {
            opacity: 0,
            scale: 0.85,
            xPercent: i % 2 === 0 ? 30 : -30,
            yPercent: 15,
            rotate: i % 2 === 0 ? 4 : -4,
            zIndex: 10 + i,
            clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
          });

          const startTime = (i - 1) / (totalCards - 1);
          const endTime = i / (totalCards - 1);

          // Previous card fades out / pushes back with depth
          if (cards[i - 1]) {
            tl.to(
              cards[i - 1],
              {
                scale: 0.92,
                opacity: 0.15,
                filter: "blur(6px)",
                yPercent: -12,
                ease: "power2.inOut",
              },
              startTime
            );
          }

          // Current card enters with rotation, un-clip, and scale
          tl.to(
            card,
            {
              opacity: 1,
              scale: 1,
              xPercent: 0,
              yPercent: 0,
              rotate: 0,
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              ease: "power2.out",
            },
            startTime + 0.05
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="moods"
      ref={sectionRef}
      className="relative w-full bg-[#0a0808] text-[#fbf9f5]"
    >
      {/* Pinned Stage Viewport */}
      <div
        ref={pinContainerRef}
        className="w-full h-screen overflow-hidden flex flex-col justify-between py-10 px-6 sm:px-12 relative"
      >
        {/* Top Section Header & Timeline Indicator */}
        <div className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between border-b border-[#c5a059]/15 pb-4">
          <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-modern">
              SCENE 04
            </span>
            <span className="w-1 h-1 rounded-full bg-[#c5a059]" />
            <h2 className="font-editorial text-2xl sm:text-3xl tracking-[0.1em] uppercase text-[#fbf9f5]">
              SIX MOODS
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-editorial text-[#c5a059] tracking-widest">
              0{activeMoodIndex + 1} / 0{moods.length}
            </span>
            <div className="w-24 sm:w-32 h-[1px] bg-white/10 relative overflow-hidden">
              <div
                ref={progressBarRef}
                className="absolute left-0 top-0 bottom-0 w-full bg-[#c5a059] origin-left scale-x-0"
              />
            </div>
          </div>
        </div>

        {/* Central Cinematic Card Deck */}
        <div className="relative w-full max-w-5xl mx-auto flex-1 flex items-center justify-center my-4">
          {moods.map((mood, idx) => (
            <div
              key={mood.id}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 will-change-transform will-change-[clip-path]"
            >
              {/* Image Frame */}
              <div
                data-cursor="VIEW"
                className="relative w-full md:w-3/5 h-[48vh] sm:h-[55vh] md:h-[65vh] overflow-hidden rounded-sm border border-[#c5a059]/20 shadow-2xl group"
              >
                <Image
                  src={mood.image}
                  alt={mood.title}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover filter contrast-[1.06] brightness-95 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Atmosphere tint overlay */}
                <div
                  className="absolute inset-0 opacity-20 mix-blend-color pointer-events-none"
                  style={{ backgroundColor: mood.colorHex }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0808] via-transparent to-transparent opacity-80" />

                {/* Floating Micro Metadata */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 bg-[#0a0808]/70 backdrop-blur-sm border border-white/10 text-[9px] tracking-[0.25em] text-[#c5a059] font-modern uppercase">
                  <Sparkles className="w-2.5 h-2.5 text-[#c5a059]" />
                  <span>{mood.tag}</span>
                </div>

                <div className="absolute bottom-4 left-4 z-10">
                  <span className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#fbf9f5]/90 tracking-widest">
                    {mood.number}
                  </span>
                </div>
              </div>

              {/* Text Narrative Column */}
              <div className="w-full md:w-2/5 flex flex-col justify-center text-left px-2 sm:px-0">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#c5a059] font-modern mb-2">
                  MOOD EXPLORATION 0{idx + 1}
                </span>

                <h3 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#fbf9f5] font-light tracking-[0.05em] uppercase mb-4">
                  {mood.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#f7f4ee]/85 font-modern leading-relaxed tracking-wider mb-6">
                  {mood.fullDesc}
                </p>

                <blockquote className="font-editorial italic text-base sm:text-lg text-[#c5a059] border-l border-[#c5a059]/40 pl-4 py-1 mb-8">
                  {mood.quote}
                </blockquote>

                <div className="flex items-center gap-4 text-[10px] tracking-[0.25em] text-white/50 uppercase font-modern">
                  <span className="flex items-center gap-2 text-[#c5a059]">
                    <span>AUTUMN / WINTER 2026</span>
                    <ArrowRight className="w-3 h-3 text-[#c5a059]" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Mood Category Tabs */}
        <div className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/10 pt-4 text-[10px] tracking-[0.25em] uppercase font-modern">
          <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto py-1">
            {moods.map((m, i) => (
              <span
                key={m.id}
                className={`transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  activeMoodIndex === i
                    ? "text-[#c5a059] font-semibold border-b border-[#c5a059] pb-0.5"
                    : "text-[#f7f4ee]/40 hover:text-white"
                }`}
              >
                0{i + 1} {m.title}
              </span>
            ))}
          </div>

          <span className="hidden sm:inline-block text-[#f7f4ee]/40 text-[9px]">
            SCROLL TO CHOREOGRAPH
          </span>
        </div>
      </div>
    </section>
  );
}
