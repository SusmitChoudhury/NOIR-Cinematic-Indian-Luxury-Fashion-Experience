"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { registerGSAP } from "@/lib/gsap";

export default function TextileTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const textureRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current || !maskRef.current) return;

    const { gsap, ScrollTrigger } = registerGSAP();

    const ctx = gsap.context(() => {
      // Scrubbed organic curve mask revealing the raw silk and quote
      gsap.fromTo(
        maskRef.current,
        {
          clipPath: "ellipse(80% 20% at 50% 100%)",
          scale: 1.15,
        },
        {
          clipPath: "ellipse(140% 100% at 50% 50%)",
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            end: "bottom 30%",
            scrub: 1.2,
          },
        }
      );

      // Subtle horizontal weave drift
      gsap.to(textureRef.current, {
        xPercent: -8,
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text scale and opacity
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[50vh] sm:min-h-[65vh] overflow-hidden bg-[#0a0808] flex items-center justify-center py-20 px-6"
    >
      {/* Organic Curved Fabric Transition Mask */}
      <div
        ref={maskRef}
        className="absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path,transform]"
      >
        <div
          ref={textureRef}
          className="absolute inset-[-10%] w-[120%] h-[120%] opacity-35 mix-blend-screen"
        >
          <Image
            src="/media/images/textures/raw-silk.jpg"
            alt="Raw Silk Weave Texture"
            fill
            sizes="100vw"
            className="object-cover filter contrast-150 brightness-90"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0808] via-[#330d15]/40 to-[#0a0808]" />
      </div>

      {/* Central Philosophical Anchor */}
      <div
        ref={textRef}
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center"
      >
        <div className="w-12 h-[1px] bg-[#c5a059] mb-8" />
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#c5a059] font-modern mb-4">
          CRAFT MANIFESTO
        </span>
        <blockquote className="font-editorial text-2xl sm:text-4xl md:text-5xl font-light text-[#fbf9f5] leading-snug tracking-wide italic">
          “In India, fabric is not an inert commodity. It is an unbroken conversation between the earth that grew the fiber, the hands that turned the spindle, and the soul that wears it.”
        </blockquote>
        <span className="mt-6 text-[10px] tracking-[0.25em] text-[#f7f4ee]/60 uppercase font-modern">
          — ARCHIVES OF NOIRÉ ATELIER
        </span>
      </div>
    </div>
  );
}
