"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Menu, X, ShoppingBag, Sparkles } from "lucide-react";

interface NavigationProps {
  cartCount?: number;
  onOpenCart?: () => void;
}

export default function Navigation({ cartCount = 0, onOpenCart }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-500 ${
          isScrolled
            ? "bg-[#0a0808]/90 backdrop-blur-md py-4 border-b border-[#c5a059]/15 shadow-2xl"
            : "bg-transparent py-7"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left Metadata / Brand Season */}
          <div className="hidden lg:flex items-center gap-6">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c5a059] font-modern">
              COUTURE 2026
            </span>
            <span className="w-1 h-1 rounded-full bg-[#c5a059]/40" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#f7f4ee]/60 font-modern">
              NEW DELHI • VARANASI
            </span>
          </div>

          {/* Center Brand Logo */}
          <Link
            href="/"
            data-cursor="NOIRÉ"
            className="group flex flex-col items-center justify-center transition-transform duration-300"
          >
            <span className="font-editorial text-2xl sm:text-3xl tracking-[0.3em] font-light uppercase text-[#fbf9f5] group-hover:text-[#c5a059] transition-colors duration-300">
              {siteConfig.brand.name}
            </span>
            <span className="text-[8px] tracking-[0.35em] text-[#c5a059] uppercase -mt-0.5">
              HAUTE COUTURE
            </span>
          </Link>

          {/* Right Actions: Desktop Links & Bag */}
          <div className="flex items-center gap-6 sm:gap-8">
            <nav className="hidden xl:flex items-center gap-7">
              {siteConfig.navigation.slice(0, 5).map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  data-cursor="VIEW"
                  className="text-[10px] tracking-[0.22em] uppercase text-[#f7f4ee]/75 hover:text-[#c5a059] transition-colors font-modern"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Concierge Button */}
            <a
              href="#contact"
              data-cursor="TALK"
              className="hidden sm:inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-[#c5a059] border border-[#c5a059]/30 hover:border-[#c5a059] px-3.5 py-1.5 rounded-full transition-all duration-300 bg-[#c5a059]/5 hover:bg-[#c5a059]/15"
            >
              <Sparkles className="w-2.5 h-2.5 text-[#c5a059]" />
              <span>ATELIER</span>
            </a>

            {/* Bag Button */}
            <button
              onClick={onOpenCart}
              data-cursor="BAG"
              className="relative flex items-center justify-center p-2 text-[#fbf9f5] hover:text-[#c5a059] transition-colors"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-[#721a28] text-[#fbf9f5] text-[9px] font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#fbf9f5] hover:text-[#c5a059] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[890] bg-[#0a0808]/98 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 xl:hidden">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c5a059] font-modern">
              ARCHIVAL INDEX
            </span>
            <div className="flex flex-col gap-4">
              {siteConfig.navigation.map((item, idx) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-editorial text-2xl tracking-[0.1em] text-[#fbf9f5] hover:text-[#c5a059] transition-colors flex items-center justify-between border-b border-white/5 pb-2"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-modern text-[#c5a059]">0{idx + 1}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-8 border-t border-[#c5a059]/20 text-[10px] tracking-[0.25em] text-[#f7f4ee]/60 uppercase font-modern">
            <p className="text-[#c5a059]">NOIRÉ HAUTE COUTURE ATELIER</p>
            <p>CONCIERGE@NOIRE-COUTURE.COM</p>
            <p>NEW DELHI • MUMBAI • LONDON</p>
          </div>
        </div>
      )}
    </>
  );
}
