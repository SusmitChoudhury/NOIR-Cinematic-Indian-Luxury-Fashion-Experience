"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { X, Check, Sparkles, ShieldCheck, Clock } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { useCart } from "@/context/CartContext";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart?: (product: Product) => void;
}

export default function QuickViewModal({
  product,
  onClose,
  onAddToCart,
}: QuickViewModalProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[950] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-fade-in">
      {/* Backdrop click */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#141212] border border-[#c5a059]/25 shadow-2xl rounded-sm grid grid-cols-1 md:grid-cols-2">
        {/* Close Button */}
        <button
          onClick={onClose}
          data-cursor="CLOSE"
          className="absolute top-4 right-4 z-20 p-2 text-[#fbf9f5]/70 hover:text-[#c5a059] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Visual */}
        <div className="relative aspect-[3/4] md:aspect-auto md:h-full bg-[#0a0808] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4 z-10">
            <span className="text-[9px] tracking-[0.25em] uppercase px-3 py-1 bg-[#0a0808]/80 backdrop-blur-sm border border-[#c5a059]/30 text-[#c5a059]">
              {product.collection}
            </span>
          </div>
        </div>

        {/* Product Details & Actions */}
        <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] tracking-[0.25em] text-[#c5a059] uppercase font-modern mb-2">
              <span>{product.category}</span>
              <span>{product.availability}</span>
            </div>

            <h2 className="font-editorial text-2xl sm:text-3xl text-[#fbf9f5] font-light tracking-wide leading-tight mb-4">
              {product.name}
            </h2>

            <div className="text-xl sm:text-2xl font-light text-[#c5a059] mb-6 font-editorial">
              {product.formattedPrice}
            </div>

            <p className="text-xs sm:text-sm text-[#f7f4ee]/80 font-modern leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Spec Highlights */}
            <div className="space-y-3 py-4 border-y border-white/10 text-xs font-modern mb-6">
              <div className="flex justify-between">
                <span className="text-white/50 tracking-wider">FABRIC</span>
                <span className="text-white/90 text-right">{product.fabric}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50 tracking-wider">COLOR</span>
                <span className="text-white/90 text-right">{product.color}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50 tracking-wider">CRAFT</span>
                <span className="text-white/90 text-right max-w-[240px] text-xs">
                  {product.craftsmanship}
                </span>
              </div>
            </div>

            {/* Inclusions */}
            <div className="mb-8">
              <span className="text-[10px] tracking-[0.25em] text-[#c5a059] uppercase block mb-2">
                ATELIER INCLUSIONS
              </span>
              <ul className="space-y-1.5 text-xs text-white/70">
                {product.details.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#c5a059]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4">
            <MagneticButton
              onClick={handleAdd}
              data-cursor="ORDER"
              className="w-full bg-[#c5a059] hover:bg-[#dfbe7e] text-[#0a0808] font-bold tracking-[0.25em] py-4 transition-all"
            >
              {added ? (
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  ADDED TO ARCHIVAL BAG
                </span>
              ) : (
                "ACQUIRE PIECE"
              )}
            </MagneticButton>

            <a
              href={`mailto:concierge@noire-couture.com?subject=Private%20Appointment%20for%20${encodeURIComponent(
                product.name
              )}`}
              data-cursor="INQUIRE"
              className="w-full text-center block text-[10px] tracking-[0.25em] uppercase text-[#c5a059] hover:text-[#dfbe7e] py-2 transition-colors border border-transparent hover:border-[#c5a059]/30"
            >
              REQUEST PRIVATE ATELIER FITTING
            </a>

            <div className="flex items-center justify-center gap-4 text-[9px] tracking-[0.2em] text-white/40 uppercase pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#c5a059]" />
                GI & SILK MARK CERTIFIED
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#c5a059]" />
                WHITE-GLOVE COUTURE DELIVERY
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
