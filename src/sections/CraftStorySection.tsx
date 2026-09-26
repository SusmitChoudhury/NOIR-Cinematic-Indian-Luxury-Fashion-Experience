"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { registerGSAP } from "@/lib/gsap";
import { craftStoryStages } from "@/data/editorial";
import { Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function CraftStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const stageImagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current || !pinContainerRef.current) return;

    const { gsap, ScrollTrigger } = registerGSAP();

    const ctx = gsap.context(() => {
      const images = stageImagesRef.current.filter(Boolean) as HTMLDivElement[];
      const total = craftStoryStages.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%", // 400vh scroll
          pin: pinContainerRef.current,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(total - 1, Math.floor(self.progress * total));
            setActiveStageIndex(idx);
          },
        },
      });

      // Cross-fade image compositions based on scroll progress
      images.forEach((img, i) => {
        if (i === 0) {
          gsap.set(img, { opacity: 1, scale: 1 });
        } else {
          gsap.set(img, { opacity: 0, scale: 1.08 });
          const start = (i - 1) / (total - 1);
          const end = i / (total - 1);

          tl.to(
            img,
            {
              opacity: 1,
              scale: 1,
              ease: "power2.inOut",
            },
            start
          );

          if (images[i - 1]) {
            tl.to(
              images[i - 1],
              {
                opacity: 0,
                scale: 0.95,
                ease: "power2.inOut",
              },
              start
            );
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeStage = craftStoryStages[activeStageIndex] || craftStoryStages[0];

  return (
    <section
      id="craft"
      ref={sectionRef}
      className="relative w-full bg-[#0a0808] text-[#fbf9f5] select-none"
    >
      {/* Pinned Stage Container */}
      <div
        ref={pinContainerRef}
        className="w-full h-screen overflow-hidden flex flex-col justify-between py-10 px-6 sm:px-12 relative"
      >
        {/* Top Header */}
        <div className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between border-b border-[#c5a059]/15 pb-4">
          <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-modern flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#c5a059]" />
              SCENE 12
            </span>
            <span className="w-1 h-1 rounded-full bg-[#c5a059]" />
            <h2 className="font-editorial text-2xl sm:text-3xl tracking-[0.1em] uppercase text-[#fbf9f5]">
              CRAFT STORY • 6 STAGES
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-editorial text-[#c5a059] tracking-widest">
              STAGE 0{activeStageIndex + 1} OF 0{craftStoryStages.length}
            </span>
          </div>
        </div>

        {/* Central Split Composition: Left Image Crossfade, Right Dynamic Text */}
        <div className="relative w-full max-w-7xl mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center my-4">
          {/* Left: Cross-fading Stage Image Canvas (Spans 7 cols) */}
          <div
            data-cursor="CRAFT"
            className="lg:col-span-7 relative w-full h-[40vh] sm:h-[50vh] lg:h-[65vh] rounded-sm overflow-hidden border border-[#c5a059]/25 shadow-2xl bg-[#141212]"
          >
            {craftStoryStages.map((stage, idx) => (
              <div
                key={stage.id}
                ref={(el) => {
                  stageImagesRef.current[idx] = el;
                }}
                className="absolute inset-0 w-full h-full will-change-transform will-change-opacity"
              >
                <Image
                  src={stage.image}
                  alt={stage.title}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover filter contrast-[1.08] brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0808]/90 via-transparent to-transparent" />

                {/* Floating Stamp */}
                <div className="absolute bottom-4 left-4 z-10 px-3 py-1 bg-black/80 backdrop-blur-sm border border-[#c5a059]/30 text-[9px] tracking-[0.25em] text-[#c5a059] uppercase font-modern">
                  STAGE {stage.step} • {stage.subtitle}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Stage Narrative Text (Spans 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left transition-opacity duration-300">
            <span className="text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-modern mb-2">
              PROVENANCE STAGE 0{activeStageIndex + 1}
            </span>

            <h3 className="font-editorial text-4xl sm:text-6xl text-[#fbf9f5] font-light uppercase tracking-wide mb-3">
              {activeStage.title}
            </h3>

            <p className="font-editorial text-sm sm:text-base italic text-[#dfbe7e] mb-4">
              {activeStage.subtitle}
            </p>

            <p className="text-xs sm:text-sm text-white/80 font-modern leading-relaxed tracking-wider mb-6">
              {activeStage.leadParagraph}
            </p>

            {/* Stage Specifications */}
            <div className="space-y-2 mb-6">
              {activeStage.details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-white/70 font-modern">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            {/* Material Badges */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
              {activeStage.materials.map((m, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#141212] border border-[#c5a059]/30 text-[9px] tracking-wider text-[#c5a059] uppercase font-modern"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stage Progress Timeline */}
        <div className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/10 pt-4 text-[10px] tracking-[0.25em] uppercase font-modern">
          <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto py-1">
            {craftStoryStages.map((s, idx) => (
              <span
                key={s.id}
                className={`transition-colors whitespace-nowrap ${
                  activeStageIndex === idx
                    ? "text-[#c5a059] font-bold border-b border-[#c5a059] pb-0.5"
                    : "text-white/40"
                }`}
              >
                0{idx + 1} {s.title}
              </span>
            ))}
          </div>

          <span className="hidden sm:inline-block text-[#f7f4ee]/40 text-[9px]">
            SCROLL CONTROLS TIMELINE
          </span>
        </div>
      </div>
    </section>
  );
}
