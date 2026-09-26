"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const textureRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // If user prefers reduced motion, finish quickly
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.1,
          ease: "power4.inOut",
          onComplete: () => {
            setIsVisible(false);
            onComplete?.();
          },
        });
      },
    });

    // Animate percentage count
    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 2.4,
      ease: "power2.inOut",
      onUpdate: () => setPercent(Math.floor(counter.val)),
    }, 0);

    // Subtle warm textile texture slowly manifests
    tl.fromTo(
      textureRef.current,
      { opacity: 0, scale: 1.08 },
      { opacity: 0.16, scale: 1, duration: 2.0, ease: "power1.out" },
      0.2
    );

    // NOIRÉ Logo appears with upward movement & letter-spacing settling
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: 32, letterSpacing: "0.45em" },
      { opacity: 1, y: 0, letterSpacing: "0.22em", duration: 1.6, ease: "power3.out" },
      0.4
    );

    // Editorial metadata reveals
    tl.fromTo(
      metaRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
      1.0
    );

    // Thin luxury gold progress line
    tl.fromTo(
      progressLineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 2.2, ease: "power2.inOut" },
      0.2
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0808] text-[#fbf9f5] overflow-hidden select-none"
    >
      {/* Background textile texture */}
      <div
        ref={textureRef}
        className="absolute inset-0 pointer-events-none opacity-0 mix-blend-screen"
      >
        <Image
          src="/media/images/textures/raw-silk.jpg"
          alt="Raw Silk Texture"
          fill
          priority
          sizes="100vw"
          className="object-cover filter contrast-125 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0808] via-transparent to-[#0a0808]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <span className="text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-modern mb-6 opacity-80">
          The Autumn / Winter 2026 Campaign
        </span>

        <h1
          ref={logoRef}
          className="font-editorial text-5xl sm:text-7xl md:text-8xl tracking-[0.22em] font-light text-gradient-gold uppercase"
        >
          NOIRÉ
        </h1>

        <div
          ref={metaRef}
          className="mt-6 flex flex-col items-center gap-2 text-xs tracking-[0.28em] text-[#f7f4ee]/70 uppercase font-modern"
        >
          <span className="text-[11px] text-[#c5a059] tracking-[0.3em]">
            Contemporary Indian Couture
          </span>
          <div className="flex items-center gap-3 text-[10px] text-[#f7f4ee]/50">
            <span>Varanasi</span>
            <span className="text-[#c5a059]">•</span>
            <span>New Delhi</span>
            <span className="text-[#c5a059]">•</span>
            <span>Mumbai</span>
          </div>
        </div>

        {/* Loading metric */}
        <div className="mt-14 w-48 sm:w-64 flex flex-col items-center gap-2">
          <div className="w-full h-[1px] bg-white/10 overflow-hidden relative">
            <div
              ref={progressLineRef}
              className="absolute left-0 top-0 bottom-0 w-full bg-[#c5a059] origin-left"
            />
          </div>
          <div className="flex justify-between w-full text-[9px] tracking-[0.25em] text-[#c5a059]/80 font-modern pt-1">
            <span>INITIATING ATELIER</span>
            <span>{percent}%</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 text-[9px] tracking-[0.3em] text-[#f7f4ee]/30 uppercase font-modern">
        EST. 2026 — ALL ARCHIVAL RIGHTS RESERVED
      </div>
    </div>
  );
}
