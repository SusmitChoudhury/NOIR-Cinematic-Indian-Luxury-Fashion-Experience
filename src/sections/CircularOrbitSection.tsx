"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { registerGSAP } from "@/lib/gsap";
import { orbitItems } from "@/data/orbitItems";
import { Sparkles, Eye, Compass } from "lucide-react";

export default function CircularOrbitSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const orbitStageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const focalCardRef = useRef<HTMLDivElement>(null);
  const stageLabelRef = useRef<HTMLSpanElement>(null);
  const stageTitleRef = useRef<HTMLHeadingElement>(null);

  const [activeFocalItem, setActiveFocalItem] = useState(orbitItems[0]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!sectionRef.current || !pinContainerRef.current) return;

    const { gsap, ScrollTrigger } = registerGSAP();

    // Orbit state variables managed outside of React state for 60fps performance
    let baseAngle = 0;
    let scrollVelocityAngle = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    let orbitScale = 1;
    let orbitRadiusX = 440;
    let orbitRadiusY = 190;
    let isHovered = false;
    let currentScrollProgress = 0;

    // Resize handler for responsive radii
    const updateRadii = () => {
      const width = window.innerWidth;
      if (width < 640) {
        orbitRadiusX = 180;
        orbitRadiusY = 100;
      } else if (width < 1024) {
        orbitRadiusX = 300;
        orbitRadiusY = 140;
      } else {
        orbitRadiusX = 460;
        orbitRadiusY = 200;
      }
    };
    updateRadii();
    window.addEventListener("resize", updateRadii, { passive: true });

    // Mouse movement subtle parallax
    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 35;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      targetTiltX = x;
      targetTiltY = y;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // GSAP Pinned Story Timeline (10 Stages over 500vh)
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=500%", // 500vh for luxury pacing
        pin: pinContainerRef.current,
        scrub: 1.2,
        anticipatePin: 1,
        onUpdate: (self) => {
          currentScrollProgress = self.progress;

          // Velocity-driven rotation boost (sign determines clockwise / counter-clockwise)
          const velocity = self.getVelocity();
          scrollVelocityAngle += velocity * 0.000035;

          // 10-Stage Choreography parameters based on scroll progress
          if (self.progress < 0.15) {
            // Stage 1 & 2: Wide composition pulling in
            orbitScale = 0.85 + self.progress * 1.5;
            if (stageLabelRef.current) stageLabelRef.current.innerText = "STAGE 01 — THE CELESTIAL ORBIT";
            if (stageTitleRef.current) stageTitleRef.current.innerText = "COSMIC WEAVE ENSEMBLE";
          } else if (self.progress < 0.45) {
            // Stage 3, 4, 5: Accelerating rotation into focal alignment
            orbitScale = 1.05;
            const focalIndex = Math.floor(self.progress * orbitItems.length) % orbitItems.length;
            setActiveFocalItem(orbitItems[focalIndex]);
            if (stageLabelRef.current) stageLabelRef.current.innerText = "STAGE 04 — FOCAL ARTISAN ALIGNMENT";
            if (stageTitleRef.current) stageTitleRef.current.innerText = "ANATOLIAN & BANARASI PROVENANCE";
          } else if (self.progress < 0.75) {
            // Stage 6, 7: Rearrangement & dominant grouping
            orbitScale = 1.15;
            if (stageLabelRef.current) stageLabelRef.current.innerText = "STAGE 07 — KINETIC SILHOUETTE GROUPING";
            if (stageTitleRef.current) stageTitleRef.current.innerText = "ARCHITECTURAL GOLD DRAPES";
          } else {
            // Stage 8, 9, 10: Outward expansion & graceful handoff
            orbitScale = 1.25 - (self.progress - 0.75) * 0.8;
            if (stageLabelRef.current) stageLabelRef.current.innerText = "STAGE 10 — ATELIER ASCENSION";
            if (stageTitleRef.current) stageTitleRef.current.innerText = "RELEASING INTO THE NEW EDIT";
          }
        },
      });
    }, sectionRef);

    // Continuous 60fps Animation Loop
    let animId: number;
    const render = () => {
      if (!prefersReducedMotion) {
        // Natural gentle drift
        baseAngle += 0.0022;

        // Dampen scroll velocity smoothly back to zero
        baseAngle += scrollVelocityAngle;
        scrollVelocityAngle *= 0.94;

        // Smooth lerp for mouse tilt
        currentTiltX += (targetTiltX - currentTiltX) * 0.08;
        currentTiltY += (targetTiltY - currentTiltY) * 0.08;
      }

      // Position each of the 14 orbit cards around the ellipse
      const total = orbitItems.length;
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        const theta = baseAngle + (i * 2 * Math.PI) / total;
        const x = Math.cos(theta) * (orbitRadiusX * orbitScale) + currentTiltX;
        const y = Math.sin(theta) * (orbitRadiusY * orbitScale) + currentTiltY;
        const depth = Math.sin(theta); // -1 (back) to +1 (front)

        // Math for depth scaling, opacity, z-index and blur
        // When depth > 0 (front): scale up to 1.18, opacity 1, zero blur
        // When depth < 0 (back): scale down to 0.58, opacity 0.35, blur 3px
        const normalDepth = (depth + 1) / 2; // 0 to 1
        const scale = 0.58 + normalDepth * 0.6;
        const opacity = 0.28 + normalDepth * 0.72;
        const blur = Math.max(0, (1 - normalDepth) * 3.5);
        const zIndex = Math.round(normalDepth * 50);

        card.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        card.style.opacity = `${opacity}`;
        card.style.filter = `blur(${blur}px)`;
        card.style.zIndex = `${zIndex}`;
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", updateRadii);
      window.removeEventListener("mousemove", onMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="orbit"
      ref={sectionRef}
      className="relative w-full bg-[#0a0808] text-[#fbf9f5] select-none"
    >
      {/* Pinned Stage Container */}
      <div
        ref={pinContainerRef}
        className="w-full h-screen overflow-hidden flex flex-col justify-between py-10 px-6 sm:px-12 relative"
      >
        {/* Top Header with Signature Indicator */}
        <div className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between border-b border-[#c5a059]/15 pb-4">
          <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-modern flex items-center gap-1.5">
              <Compass className="w-3 h-3 text-[#c5a059] animate-spin-slow" />
              SCENE 05
            </span>
            <span className="w-1 h-1 rounded-full bg-[#c5a059]" />
            <h2 className="font-editorial text-2xl sm:text-3xl tracking-[0.1em] uppercase text-[#fbf9f5]">
              CIRCULAR EDITORIAL ORBIT
            </h2>
          </div>

          <div className="flex flex-col items-end text-right">
            <span
              ref={stageLabelRef}
              className="text-[9px] tracking-[0.25em] text-[#c5a059] font-modern uppercase"
            >
              STAGE 01 — THE CELESTIAL ORBIT
            </span>
            <span
              ref={stageTitleRef}
              className="text-xs font-editorial text-white/80 tracking-wider"
            >
              COSMIC WEAVE ENSEMBLE
            </span>
          </div>
        </div>

        {/* Orbit Canvas Center */}
        <div className="relative w-full flex-1 flex items-center justify-center">
          {/* Subtle Orbital Elliptical Rings Guide */}
          <div className="absolute w-[360px] sm:w-[600px] md:w-[920px] h-[180px] sm:h-[280px] md:h-[400px] rounded-full border border-[#c5a059]/10 pointer-events-none -rotate-2" />
          <div className="absolute w-[280px] sm:w-[480px] md:w-[740px] h-[140px] sm:h-[220px] md:h-[320px] rounded-full border border-dashed border-[#c5a059]/15 pointer-events-none rotate-3" />

          {/* Central Core Emblem */}
          <div className="relative z-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none">
            <span className="text-[9px] tracking-[0.35em] text-[#c5a059] uppercase font-modern mb-1">
              THE PERPETUAL HORIZON
            </span>
            <h3 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-[#fbf9f5]/85 tracking-[0.15em] font-light">
              NOIRÉ
            </h3>
            <span className="text-[10px] tracking-[0.25em] text-[#f7f4ee]/40 uppercase mt-2">
              14 ARCHIVAL FORMS IN ROTATION
            </span>
          </div>

          {/* 14 Circular Orbit Editorial Objects */}
          <div
            ref={orbitStageRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {orbitItems.map((item, idx) => (
              <div
                key={item.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                data-cursor="EXAMINE"
                className="absolute w-44 sm:w-56 md:w-64 aspect-[3/4] p-2 bg-[#141212]/95 backdrop-blur-md rounded-sm border border-[#c5a059]/20 shadow-2xl pointer-events-auto transition-shadow hover:shadow-[0_0_30px_rgba(197,160,89,0.3)] hover:border-[#c5a059] group cursor-pointer"
              >
                {/* Visual Image */}
                <div className="relative w-full h-full overflow-hidden bg-[#0a0808]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 180px, 260px"
                    className="object-cover group-hover:scale-108 transition-transform duration-500 filter contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0808] via-transparent to-transparent opacity-85" />

                  {/* Micro Metadata inside card */}
                  <div className="absolute top-2 left-2 z-10">
                    <span className="text-[8px] tracking-[0.25em] text-[#c5a059] bg-[#0a0808]/80 backdrop-blur-sm px-2 py-0.5 border border-white/10 uppercase font-modern">
                      {item.collectionNumber}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10">
                    <span className="text-[8px] tracking-[0.2em] text-white/60 uppercase font-modern block mb-0.5">
                      {item.label}
                    </span>
                    <h4 className="font-editorial text-sm sm:text-base text-[#fbf9f5] font-light tracking-wide line-clamp-1">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Interactive Guide */}
        <div className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/10 pt-4 text-[10px] tracking-[0.25em] uppercase font-modern">
          <span className="text-[#c5a059]">
            SCROLL CONTROLS SPEED • CURSOR SHIFTS TILT
          </span>
          <span className="text-[#f7f4ee]/40">
            TOTAL ASSETS: 14 • 3D MATHEMATICAL ELLIPSE
          </span>
        </div>
      </div>
    </section>
  );
}
