"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { registerGSAP } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";
import { Sparkles, ArrowRight } from "lucide-react";

export default function FinalCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bgTextureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const { gsap, ScrollTrigger } = registerGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        {
          yPercent: 40,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.to(bgTextureRef.current, {
        scale: 1.15,
        opacity: 0.22,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[90vh] bg-[#0a0808] text-[#fbf9f5] flex items-center justify-center py-32 px-6 md:px-12 overflow-hidden border-t border-[#c5a059]/20"
    >
      {/* Background Cinematic Texture & Vignette */}
      <div
        ref={bgTextureRef}
        className="absolute inset-0 pointer-events-none opacity-10 will-change-transform"
      >
        <Image
          src="/media/images/textures/gold-zari.jpg"
          alt="Gold Zari Texture"
          fill
          sizes="100vw"
          className="object-cover filter contrast-125 brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0808] via-transparent to-[#0a0808]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-modern mb-6">
          <Sparkles className="w-3 h-3 text-[#c5a059]" />
          <span>SCENE 16 • THE FINALE</span>
        </div>

        <h2
          ref={headlineRef}
          className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-light tracking-[0.05em] uppercase text-gradient-gold leading-[0.95] mb-8"
        >
          WEAR THE STORY.
        </h2>

        <p className="max-w-xl text-xs sm:text-sm md:text-base text-[#f7f4ee]/85 font-modern tracking-[0.14em] font-light uppercase leading-relaxed mb-12">
          Discover contemporary Indian fashion shaped by craft and movement.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-5">
          <MagneticButton
            data-cursor="ENTER"
            onClick={() => {
              const el = document.getElementById("collection");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto bg-[#c5a059] hover:bg-[#dfbe7e] text-[#0a0808] font-bold border border-[#c5a059] px-10 py-4 shadow-2xl"
          >
            EXPLORE NOIRÉ
          </MagneticButton>

          <a
            href="mailto:concierge@noire-couture.com?subject=Private%20Haute%20Couture%20Appointment"
            data-cursor="APPOINTMENT"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#c5a059] hover:text-[#dfbe7e] transition-colors py-3 px-6 border border-white/10 hover:border-[#c5a059]/40 rounded-full bg-[#141212]/60"
          >
            <span>BOOK ATELIER CONSULTATION</span>
            <ArrowRight className="w-3 h-3 text-[#c5a059]" />
          </a>
        </div>
      </div>
    </section>
  );
}
