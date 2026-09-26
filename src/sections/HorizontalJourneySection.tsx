"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { registerGSAP } from "@/lib/gsap";
import { journeyPanels, JourneyPanel } from "@/data/collections";
import { Sparkles, ArrowRight, Layers } from "lucide-react";

export default function HorizontalJourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinTrackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current || !pinTrackRef.current) return;

    const { gsap, ScrollTrigger } = registerGSAP();

    const ctx = gsap.context(() => {
      const panels = pinTrackRef.current?.querySelectorAll(".journey-panel");
      const totalPanels = panels ? panels.length : 6;

      // Horizontal translation controlled by vertical scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${(totalPanels - 1) * 100}%`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      tl.to(pinTrackRef.current, {
        xPercent: -100 * ((totalPanels - 1) / totalPanels),
        ease: "none",
      });

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#0a0808] text-[#fbf9f5]"
    >
      {/* Top Header Fixed Bar inside Pinned Viewport */}
      <div className="absolute top-0 left-0 right-0 z-30 py-6 px-6 sm:px-12 flex items-center justify-between border-b border-[#c5a059]/15 bg-[#0a0808]/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <span className="text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-modern flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-[#c5a059]" />
            SCENE 08
          </span>
          <span className="w-1 h-1 rounded-full bg-[#c5a059]" />
          <h2 className="font-editorial text-xl sm:text-2xl tracking-[0.1em] uppercase text-[#fbf9f5]">
            HORIZONTAL COLLECTION JOURNEY
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[9px] tracking-[0.25em] text-[#c5a059] uppercase font-modern hidden sm:inline">
            PANEL 01 TO 06
          </span>
          <div className="w-24 sm:w-40 h-[1px] bg-white/10 relative overflow-hidden">
            <div
              ref={progressBarRef}
              className="absolute left-0 top-0 bottom-0 w-full bg-[#c5a059] origin-left scale-x-0"
            />
          </div>
        </div>
      </div>

      {/* Horizontal Sliding Track (600vw wide) */}
      <div
        ref={pinTrackRef}
        className="flex h-full w-[600vw] will-change-transform pt-20"
      >
        {journeyPanels.map((panel, idx) => (
          <div
            key={panel.id}
            className="journey-panel w-[100vw] h-full flex items-center justify-center px-6 sm:px-16 md:px-24 relative select-none"
          >
            {/* Dramatic Asymmetric Panel Variants */}
            {panel.composition === "asymmetric-overlap" && (
              <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 relative">
                  <div
                    data-cursor="EXAMINE"
                    className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-sm border border-[#c5a059]/25 shadow-2xl"
                  >
                    <Image
                      src={panel.image}
                      alt={panel.title}
                      fill
                      sizes="100vw"
                      className="object-cover filter contrast-[1.08]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0808]/80 via-transparent to-transparent" />
                  </div>
                  {panel.secondaryImage && (
                    <div className="hidden sm:block absolute -bottom-10 -right-8 w-44 aspect-[3/4] border border-[#c5a059]/40 rounded-sm overflow-hidden shadow-2xl">
                      <Image
                        src={panel.secondaryImage}
                        alt="Detail"
                        fill
                        sizes="200px"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                <div className="lg:col-span-5 text-left">
                  <span className="text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-modern block mb-2">
                    PANEL {panel.step}
                  </span>
                  <h3 className="font-editorial text-4xl sm:text-6xl text-[#fbf9f5] font-light uppercase mb-4">
                    {panel.title}
                  </h3>
                  <p className="text-sm font-editorial italic text-[#dfbe7e] mb-4">
                    {panel.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-white/75 font-modern leading-relaxed tracking-wider mb-6">
                    {panel.narrative}
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-[10px] tracking-wider font-modern border-t border-white/10 pt-4 text-white/60">
                    <div>ORIGIN: <span className="text-[#c5a059]">{panel.metadata.origin}</span></div>
                    <div>TECHNIQUE: <span className="text-[#c5a059]">{panel.metadata.technique}</span></div>
                  </div>
                </div>
              </div>
            )}

            {panel.composition === "split-editorial" && (
              <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className="text-left order-2 md:order-1">
                  <span className="text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-modern block mb-2">
                    PANEL {panel.step}
                  </span>
                  <h3 className="font-editorial text-4xl sm:text-6xl text-[#fbf9f5] font-light uppercase mb-4">
                    {panel.title}
                  </h3>
                  <p className="text-sm font-editorial italic text-[#c5a059] mb-4">
                    {panel.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-white/75 font-modern leading-relaxed tracking-wider mb-6">
                    {panel.narrative}
                  </p>
                  <div className="p-4 bg-[#141212] border border-[#c5a059]/20 text-[10px] space-y-1 font-modern">
                    <div>TIMELINE: <span className="text-white/90">{panel.metadata.timeline}</span></div>
                    <div>MATERIAL: <span className="text-white/90">{panel.metadata.fiber}</span></div>
                  </div>
                </div>
                <div
                  data-cursor="LOOM"
                  className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-sm border border-[#c5a059]/25 shadow-2xl order-1 md:order-2"
                >
                  <Image
                    src={panel.image}
                    alt={panel.title}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {panel.composition === "monolithic-center" && (
              <div className="w-full max-w-5xl flex flex-col items-center text-center">
                <span className="text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-modern mb-2">
                  PANEL {panel.step}
                </span>
                <h3 className="font-editorial text-5xl sm:text-7xl text-[#fbf9f5] font-light uppercase mb-4">
                  {panel.title}
                </h3>
                <p className="text-sm sm:text-base font-editorial italic text-[#c5a059] max-w-xl mb-6">
                  {panel.tagline}
                </p>
                <div
                  data-cursor="PIGMENT"
                  className="relative w-full max-w-3xl aspect-[16/8] sm:aspect-[21/9] overflow-hidden rounded-sm border border-[#c5a059]/25 shadow-2xl mb-6"
                >
                  <Image
                    src={panel.image}
                    alt={panel.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0808]/90 via-transparent to-transparent" />
                </div>
                <p className="text-xs sm:text-sm text-white/75 font-modern leading-relaxed tracking-wider max-w-2xl">
                  {panel.narrative}
                </p>
              </div>
            )}

            {panel.composition === "typography-dominant" && (
              <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 text-left">
                  <span className="text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-modern block mb-3">
                    PANEL {panel.step} • GEOMETRIC DISCIPLINE
                  </span>
                  <h3 className="font-editorial text-5xl sm:text-7xl lg:text-8xl text-gradient-gold font-light leading-[0.9] uppercase mb-6">
                    {panel.title}
                  </h3>
                  <blockquote className="font-editorial text-xl sm:text-2xl text-white/90 italic border-l-2 border-[#c5a059] pl-4 py-1 mb-6">
                    {panel.tagline}
                  </blockquote>
                  <p className="text-xs sm:text-sm text-white/70 font-modern leading-relaxed tracking-wider">
                    {panel.narrative}
                  </p>
                </div>
                <div
                  data-cursor="DRAPE"
                  className="lg:col-span-6 relative aspect-[3/4] overflow-hidden rounded-sm border border-[#c5a059]/25 shadow-2xl"
                >
                  <Image
                    src={panel.image}
                    alt={panel.title}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {panel.composition === "portrait-statuesque" && (
              <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div
                  data-cursor="MUSE"
                  className="relative aspect-[3/4] max-h-[70vh] overflow-hidden rounded-sm border border-[#c5a059]/30 shadow-2xl"
                >
                  <Image
                    src={panel.image}
                    alt={panel.title}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <span className="text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-modern block mb-2">
                    PANEL {panel.step}
                  </span>
                  <h3 className="font-editorial text-4xl sm:text-6xl text-[#fbf9f5] font-light uppercase mb-4">
                    {panel.title}
                  </h3>
                  <p className="text-sm font-editorial italic text-[#c5a059] mb-4">
                    {panel.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-white/75 font-modern leading-relaxed tracking-wider mb-6">
                    {panel.narrative}
                  </p>
                  <div className="p-4 bg-[#141212] border border-[#c5a059]/20 text-[10px] space-y-1 font-modern">
                    <div>IDENTITY: <span className="text-white/90">Contemporary Sovereign</span></div>
                    <div>ESSENCE: <span className="text-white/90">Unapologetic Cultural Command</span></div>
                  </div>
                </div>
              </div>
            )}

            {panel.composition === "wide-landscape" && (
              <div className="w-full max-w-6xl flex flex-col items-center text-center">
                <span className="text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-modern mb-2">
                  PANEL {panel.step} • THE APOTHEOSIS
                </span>
                <h3 className="font-editorial text-5xl sm:text-7xl lg:text-8xl text-[#fbf9f5] font-light uppercase mb-6">
                  {panel.title}
                </h3>
                <div
                  data-cursor="CINEMA"
                  className="relative w-full aspect-[21/9] overflow-hidden rounded-sm border border-[#c5a059]/30 shadow-2xl mb-6"
                >
                  <Image
                    src={panel.image}
                    alt={panel.title}
                    fill
                    sizes="100vw"
                    className="object-cover filter contrast-[1.1]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0808]/90 via-transparent to-transparent" />
                </div>
                <p className="text-xs sm:text-sm text-white/80 font-modern leading-relaxed tracking-wider max-w-2xl">
                  {panel.narrative}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Horizontal Drag Indicator */}
      <div className="absolute bottom-4 left-6 sm:left-12 z-20 text-[9px] tracking-[0.25em] text-[#f7f4ee]/40 uppercase font-modern">
        VERTICAL SCROLL DRIVES HORIZONTAL CHOREOGRAPHY
      </div>
    </section>
  );
}
