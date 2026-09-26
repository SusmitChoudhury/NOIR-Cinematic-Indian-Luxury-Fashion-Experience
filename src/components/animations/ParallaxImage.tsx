"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { registerGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number; // e.g. -20 to 20 percent
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  priority?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  speed = 15,
  className,
  containerClassName,
  aspectRatio = "aspect-[3/4]",
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current || !imageRef.current) return;

    const { gsap, ScrollTrigger } = registerGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        {
          yPercent: -speed,
          scale: 1.12,
        },
        {
          yPercent: speed,
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", aspectRatio, containerClassName)}
    >
      <div
        ref={imageRef}
        className="absolute inset-[-10%] w-[120%] h-[120%] will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn("object-cover", className)}
        />
      </div>
    </div>
  );
}
