"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Check for touch device or small screen
    if (
      typeof window === "undefined" ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 1024
    ) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Check hovered targets for custom labels
      const target = e.target as HTMLElement | null;
      if (target) {
        const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");
        if (cursorAttr) {
          setCursorText(cursorAttr);
          setIsHovered(true);
        } else {
          setCursorText("");
          setIsHovered(false);
        }
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    // Smooth lerp loop
    const render = () => {
      const ease = 0.18;
      currentX += (mouseX - currentX) * ease;
      currentY += (mouseY - currentY) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      ref={dotRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform transition-[width,height,background-color,border-color] duration-200 ease-out flex items-center justify-center rounded-full mix-blend-difference ${
        isHovered
          ? "w-20 h-20 bg-[#fbf9f5] border border-[#fbf9f5]"
          : isClicking
          ? "w-4 h-4 bg-[#c5a059]"
          : "w-3.5 h-3.5 bg-[#fbf9f5] border border-[#fbf9f5]/80"
      }`}
    >
      {cursorText && (
        <span
          ref={textRef}
          className="text-[9px] font-modern tracking-[0.25em] font-semibold text-[#0a0808] uppercase select-none transition-opacity duration-150"
        >
          {cursorText}
        </span>
      )}
    </div>
  );
}
