"use client";

import { useEffect, useRef } from "react";
import { registerGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  children: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  delay?: number;
}

export default function RevealText({
  children,
  tag = "h2",
  className,
  delay = 0,
}: RevealTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const { gsap, ScrollTrigger } = registerGSAP();

    const el = containerRef.current;
    const lines = el.querySelectorAll(".reveal-line");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        {
          yPercent: 105,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.12,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay]);

  const Tag = tag as React.ElementType;

  return (
    <Tag
      ref={containerRef}
      className={cn("overflow-hidden leading-tight", className)}
    >
      <span className="reveal-line inline-block will-change-transform">
        {children}
      </span>
    </Tag>
  );
}
