"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { registerGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface RevealImageProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
  direction?: "bottom" | "left" | "center" | "diagonal";
  priority?: boolean;
}

export default function RevealImage({
  src,
  alt,
  aspectRatio = "aspect-[3/4]",
  className,
  direction = "bottom",
  priority = false,
}: RevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current || !imgWrapperRef.current) return;

    const { gsap, ScrollTrigger } = registerGSAP();

    let initialClip = "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)";
    let finalClip = "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)";

    if (direction === "left") {
      initialClip = "polygon(0 0, 0 0, 0 100%, 0 100%)";
      finalClip = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
    } else if (direction === "center") {
      initialClip = "inset(50% 50% 50% 50%)";
      finalClip = "inset(0% 0% 0% 0%)";
    } else if (direction === "diagonal") {
      initialClip = "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)";
      finalClip = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        imgWrapperRef.current,
        {
          clipPath: initialClip,
        },
        {
          clipPath: finalClip,
          duration: 1.4,
          ease: "power3.inOut",
        }
      );

      const img = imgWrapperRef.current?.querySelector("img");
      if (img) {
        tl.fromTo(
          img,
          {
            scale: 1.15,
          },
          {
            scale: 1.0,
            duration: 1.6,
            ease: "power2.out",
          },
          0
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [direction]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", aspectRatio, className)}
    >
      <div
        ref={imgWrapperRef}
        className="w-full h-full relative will-change-[clip-path]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
