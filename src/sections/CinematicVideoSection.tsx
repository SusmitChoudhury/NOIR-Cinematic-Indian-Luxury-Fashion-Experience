"use client";

import { useEffect, useRef, useState } from "react";
import { registerGSAP } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { Film, Play, Pause, Sparkles } from "lucide-react";

export default function CinematicVideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoFrameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current || !videoFrameRef.current) return;

    const { gsap, ScrollTrigger } = registerGSAP();

    // Ensure playback
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    const ctx = gsap.context(() => {
      // Entry Animation: Scale 1.08 -> 1, opacity 0 -> 1, clip-path expands
      gsap.fromTo(
        videoFrameRef.current,
        {
          scale: 1.08,
          opacity: 0,
          clipPath: "inset(12% 12% 12% 12%)",
        },
        {
          scale: 1,
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.6,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Subtle crop & parallax during scroll
      gsap.to(videoRef.current, {
        scale: 1.08,
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const togglePlayback = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      id="film"
      ref={sectionRef}
      className="relative w-full bg-[#0a0808] text-[#fbf9f5] py-24 sm:py-32 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full text-center mb-12">
        <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-modern mb-3">
          <Film className="w-3 h-3 text-[#c5a059]" />
          <span>SCENE 13 • CINEMATIC CAMPAIGN FILM</span>
        </div>
        <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.06em] text-[#fbf9f5] uppercase">
          THE SWARNACHARI WEAVE
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-xs sm:text-sm text-[#f7f4ee]/75 font-modern tracking-wider leading-relaxed">
          Archival footage capturing master artisans of Bishnupur weaving real electroplated zari threads into heritage silk sarees.
        </p>
      </div>

      {/* Editorial Framed Video Container (85% width) */}
      <div
        ref={videoFrameRef}
        data-cursor="PLAY"
        onClick={togglePlayback}
        className="relative w-full max-w-6xl aspect-[16/9] rounded-sm overflow-hidden border border-[#c5a059]/30 shadow-2xl bg-[#141212] group cursor-pointer will-change-[clip-path,transform]"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={siteConfig.media.cinematicVideo.poster}
          className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.05]"
        >
          <source src={siteConfig.media.cinematicVideo.webm} type="video/webm" />
          <source src={siteConfig.media.cinematicVideo.mp4Fallback} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0808]/80 via-transparent to-[#0a0808]/40 pointer-events-none" />

        {/* Video Overlay Info */}
        <div className="absolute top-6 left-6 z-10 flex items-center gap-3">
          <span className="text-[9px] tracking-[0.25em] text-[#c5a059] uppercase px-3 py-1 bg-black/70 backdrop-blur-sm border border-white/10 font-modern">
            4K ARCHIVAL CAPTURE
          </span>
          <span className="text-[9px] tracking-[0.2em] text-white/60 uppercase font-modern hidden sm:inline">
            BISHNUPUR, WEST BENGAL
          </span>
        </div>

        {/* Interactive Play/Pause Indicator on Hover */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full bg-[#0a0808]/85 backdrop-blur-md border border-[#c5a059] flex items-center justify-center text-[#c5a059] shadow-2xl">
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between pointer-events-none">
          <span className="text-xs font-editorial text-white/90 tracking-widest">
            NOIRÉ DOCUMENTARY SERIES • EPISODE 01
          </span>
          <span className="text-[9px] tracking-[0.25em] text-[#c5a059] uppercase font-modern">
            {isPlaying ? "PLAYING" : "PAUSED"}
          </span>
        </div>
      </div>
    </section>
  );
}
