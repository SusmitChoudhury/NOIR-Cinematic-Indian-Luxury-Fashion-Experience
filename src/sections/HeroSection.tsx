"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { registerGSAP } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowDown, Sparkles } from "lucide-react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const metaLeftRef = useRef<HTMLDivElement>(null);
  const metaRightRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { gsap, ScrollTrigger } = registerGSAP();

    // Ensure video plays smoothly
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    if (prefersReducedMotion) {
      if (videoWrapperRef.current) {
        videoWrapperRef.current.style.opacity = "1";
        videoWrapperRef.current.style.transform = "scale(1)";
      }
      return;
    }

    const ctx = gsap.context(() => {
      // Intro choreography (Entry timeline)
      const introTl = gsap.timeline({ delay: 0.3 });

      // Video scale 1.08 -> 1, opacity 0 -> 1, mask expand
      introTl.fromTo(
        videoWrapperRef.current,
        {
          opacity: 0,
          scale: 1.08,
          clipPath: "polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)",
        },
        {
          opacity: 1,
          scale: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 2.2,
          ease: "power3.inOut",
        }
      );

      // Headline lines reveal line by line
      const lines = headlineRef.current?.querySelectorAll(".hero-line");
      if (lines) {
        introTl.fromTo(
          lines,
          {
            yPercent: 120,
            opacity: 0,
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          },
          {
            yPercent: 0,
            opacity: 1,
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            duration: 1.4,
            stagger: 0.18,
            ease: "power3.out",
          },
          "-=1.2"
        );
      }

      // Subtitle & CTAs
      introTl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" },
        "-=0.8"
      );

      introTl.fromTo(
        ctaGroupRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
        "-=0.6"
      );

      // Metadata elements
      introTl.fromTo(
        [metaLeftRef.current, metaRightRef.current, scrollIndicatorRef.current],
        { opacity: 0 },
        { opacity: 1, duration: 1.2, stagger: 0.1, ease: "power2.out" },
        "-=0.4"
      );

      // Scroll choreography (Parallax, subtle crop & horizontal shift on scroll)
      gsap.to(videoWrapperRef.current, {
        scale: 1.12,
        yPercent: 14,
        xPercent: -2,
        opacity: 0.45,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Text parallax lift
      gsap.to(headlineRef.current, {
        yPercent: -28,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[750px] overflow-hidden flex items-center justify-center bg-[#0a0808]"
    >
      {/* Background Video Layer */}
      <div
        ref={videoWrapperRef}
        className="absolute inset-0 w-full h-full will-change-transform will-change-[clip-path]"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={siteConfig.media.heroVideo.poster}
          className="w-full h-full object-cover filter brightness-[0.72] contrast-[1.08] saturate-[1.12]"
        >
          <source src={siteConfig.media.heroVideo.webm} type="video/webm" />
          <source src={siteConfig.media.heroVideo.mp4Fallback} type="video/mp4" />
        </video>

        {/* Cinematic Vignette & Color Grading Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0808] via-transparent to-[#0a0808]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0808]/80 via-transparent to-[#0a0808]/80" />
        <div className="absolute inset-0 bg-[#330d15]/15 mix-blend-color" />
      </div>

      {/* Main Editorial Hero Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 md:px-12 text-center flex flex-col items-center mt-12 sm:mt-8">
        {/* Top Collection Micro-Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c5a059]/30 bg-[#0a0808]/60 backdrop-blur-md text-[10px] tracking-[0.3em] uppercase text-[#c5a059] font-modern mb-8">
          <Sparkles className="w-2.5 h-2.5 text-[#c5a059]" />
          <span>AUTUMN / WINTER 2026 CAMPAIGN</span>
        </div>

        {/* Large Editorial Headline */}
        <h1
          ref={headlineRef}
          className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] font-light tracking-[0.04em] text-[#fbf9f5] leading-[0.92] uppercase select-none"
        >
          <div className="overflow-hidden">
            <span className="hero-line block">CRAFTED FOR</span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-line block text-gold-gradient font-normal italic">
              THE WOMAN
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-line block">WHO MOVES.</span>
          </div>
        </h1>

        {/* Supporting Editorial Copy */}
        <p
          ref={subtitleRef}
          className="mt-8 max-w-xl text-xs sm:text-sm md:text-base text-[#f7f4ee]/85 font-modern tracking-[0.12em] font-light leading-relaxed uppercase"
        >
          Contemporary Indian silhouettes shaped by craft, movement and memory.
        </p>

        {/* CTAs with Magnetic Buttons */}
        <div
          ref={ctaGroupRef}
          className="mt-10 flex flex-col sm:flex-row items-center gap-5 sm:gap-6"
        >
          <MagneticButton
            data-cursor="ENTER"
            onClick={() => {
              const el = document.getElementById("collection");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto bg-[#c5a059] hover:bg-[#dfbe7e] text-[#0a0808] font-bold border border-[#c5a059] shadow-lg hover:shadow-[#c5a059]/20"
          >
            EXPLORE THE COLLECTION
          </MagneticButton>

          <MagneticButton
            data-cursor="STORY"
            onClick={() => {
              const el = document.getElementById("craft");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto border border-[#f7f4ee]/30 hover:border-[#c5a059] text-[#fbf9f5] hover:text-[#c5a059] bg-[#0a0808]/40 backdrop-blur-sm"
          >
            DISCOVER THE STORY
          </MagneticButton>
        </div>
      </div>

      {/* Left Vertical Metadata */}
      <div
        ref={metaLeftRef}
        className="hidden md:flex absolute left-8 bottom-16 z-20 flex-col items-start gap-3 text-[9px] tracking-[0.3em] uppercase text-[#f7f4ee]/60 font-modern"
      >
        <span className="text-[#c5a059]">COLLECTION NO. 01</span>
        <span className="w-8 h-[1px] bg-[#c5a059]/30" />
        <span>KATAN SILK • REAL ZARI</span>
        <span>DELHI ATELIER PROVENANCE</span>
      </div>

      {/* Right Vertical Metadata */}
      <div
        ref={metaRightRef}
        className="hidden md:flex absolute right-8 bottom-16 z-20 flex-col items-end gap-3 text-[9px] tracking-[0.3em] uppercase text-[#f7f4ee]/60 font-modern text-right"
      >
        <span className="text-[#c5a059]">LIMITED EDITION</span>
        <span className="w-8 h-[1px] bg-[#c5a059]/30" />
        <span>140 LOOM DAYS PER PIECE</span>
        <span>LAT: 28.6139° N, 77.2090° E</span>
      </div>

      {/* Bottom Scroll Indicator with Circular Marker */}
      <div
        ref={scrollIndicatorRef}
        onClick={() => {
          const el = document.getElementById("moods");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
        data-cursor="SCROLL"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <div className="relative w-8 h-8 rounded-full border border-[#c5a059]/30 flex items-center justify-center group-hover:border-[#c5a059] transition-colors">
          <ArrowDown className="w-3.5 h-3.5 text-[#c5a059] animate-bounce" />
        </div>
        <span className="text-[8px] tracking-[0.3em] text-[#f7f4ee]/60 uppercase font-modern group-hover:text-[#c5a059] transition-colors">
          SCROLL TO EXPLORE
        </span>
      </div>
    </section>
  );
}
