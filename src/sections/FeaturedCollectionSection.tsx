"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { registerGSAP } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function FeaturedCollectionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const secondaryImageRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const { gsap, ScrollTrigger } = registerGSAP();

    const ctx = gsap.context(() => {
      // Entry Animation: Main mask opens, secondary slides in, text lifts
      const entryTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      entryTl.fromTo(
        mainImageRef.current,
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          scale: 1.08,
        },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          scale: 1,
          duration: 1.6,
          ease: "power3.inOut",
        }
      );

      entryTl.fromTo(
        secondaryImageRef.current,
        {
          xPercent: 40,
          opacity: 0,
        },
        {
          xPercent: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power2.out",
        },
        "-=1.0"
      );

      entryTl.fromTo(
        textContentRef.current,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        "-=1.2"
      );

      // Differential parallax scrolling between main & secondary images
      gsap.to(mainImageRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(secondaryImageRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.6,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="edit"
      ref={sectionRef}
      className="relative w-full bg-[#0a0808] text-[#fbf9f5] py-24 sm:py-32 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Metadata Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-[#c5a059]/20 pb-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-modern mb-2">
              <Sparkles className="w-3 h-3 text-[#c5a059]" />
              <span>SCENE 07 • ARCHIVAL RELEASE</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.06em] text-[#fbf9f5] uppercase">
              THE NEW EDIT
            </h2>
          </div>

          <div className="mt-4 sm:mt-0 text-right">
            <span className="text-[10px] tracking-[0.25em] text-[#f7f4ee]/50 uppercase font-modern block">
              CAPSULE NO. 04 / 2026
            </span>
            <span className="text-xs font-editorial text-[#c5a059] tracking-wider">
              BANARASI SILK • MATKA VELVET
            </span>
          </div>
        </div>

        {/* Asymmetrical Composition Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Dominant Main Visual (Spans 7 columns) */}
          <div className="lg:col-span-7 relative">
            <div
              ref={mainImageRef}
              data-cursor="EXAMINE"
              className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-sm border border-[#c5a059]/25 shadow-2xl group"
            >
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=85"
                alt="NOIRÉ The New Edit - Vermillion Kadhwa Saree"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover filter contrast-[1.08] brightness-95 group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0808]/90 via-transparent to-transparent" />

              {/* Floating Provenance Tag */}
              <div className="absolute bottom-6 left-6 z-10">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#c5a059] font-modern block mb-1">
                  ATELIER MASTERWORK
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-white font-light">
                  The Kashi Vermillion Ensemble
                </h3>
              </div>
            </div>

            {/* Overlapping Secondary Image Offset on Right */}
            <div
              ref={secondaryImageRef}
              data-cursor="DETAIL"
              className="hidden sm:block absolute -bottom-12 -right-8 md:-right-12 w-48 sm:w-64 md:w-72 aspect-[3/4] rounded-sm overflow-hidden border border-[#c5a059]/40 shadow-2xl z-20 bg-[#141212]"
            >
              <Image
                src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
                alt="Silk Texture Detail"
                fill
                sizes="300px"
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-2 left-2 z-10 px-2 py-0.5 bg-black/70 backdrop-blur-sm text-[8px] tracking-[0.25em] text-[#c5a059] font-modern uppercase">
                MACRO ZARI WEAVE
              </div>
            </div>
          </div>

          {/* Text Content Column (Spans 5 columns) */}
          <div
            ref={textContentRef}
            className="lg:col-span-5 flex flex-col justify-center lg:pl-6 pt-8 lg:pt-0"
          >
            <div className="inline-flex items-center gap-2 text-[9px] tracking-[0.3em] text-[#c5a059] uppercase font-modern mb-4">
              <ShieldCheck className="w-3 h-3 text-[#c5a059]" />
              <span>LIMITED TO 18 EDITIONS WORLDWIDE</span>
            </div>

            <h3 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#fbf9f5] font-light leading-tight uppercase mb-6">
              A RADICAL TRIBUTE TO ANCESTRAL DRAPING.
            </h3>

            <p className="text-xs sm:text-sm text-[#f7f4ee]/80 font-modern leading-relaxed tracking-wider mb-6">
              The New Edit is a dialogue between stillness and kinetic authority. Featuring heavy 100% pure katan mulberry silk, woven with unadulterated gold zari beaten to three microns in width. Designed with structured internal corseting that holds the architectural spine while the pallu flows with effortless drama.
            </p>

            <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/10 text-xs font-modern mb-8">
              <div>
                <span className="text-[#c5a059] block text-[9px] tracking-[0.25em] uppercase mb-1">
                  ORIGIN
                </span>
                <span className="text-white/90">Varanasi, Uttar Pradesh</span>
              </div>
              <div>
                <span className="text-[#c5a059] block text-[9px] tracking-[0.25em] uppercase mb-1">
                  LOOM TIMELINE
                </span>
                <span className="text-white/90">140 Artisan Days</span>
              </div>
              <div>
                <span className="text-[#c5a059] block text-[9px] tracking-[0.25em] uppercase mb-1">
                  WARP SPECIFICATION
                </span>
                <span className="text-white/90">4,200 High-Twist Ends</span>
              </div>
              <div>
                <span className="text-[#c5a059] block text-[9px] tracking-[0.25em] uppercase mb-1">
                  WEIGHT & DRAPE
                </span>
                <span className="text-white/90">780g Sovereign Flow</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <MagneticButton
                data-cursor="SHOP"
                onClick={() => {
                  const el = document.getElementById("collection");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto bg-[#c5a059] hover:bg-[#dfbe7e] text-[#0a0808] font-bold border border-[#c5a059]"
              >
                ACQUIRE FROM EDIT
              </MagneticButton>

              <a
                href="#craft"
                data-cursor="READ"
                className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#c5a059] hover:text-[#dfbe7e] transition-colors py-2"
              >
                <span>THE WEAVER’S MEMORY</span>
                <ArrowRight className="w-3 h-3 text-[#c5a059]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
