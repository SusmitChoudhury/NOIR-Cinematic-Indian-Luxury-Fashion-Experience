"use client";

import React from "react";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Preloader from "@/components/ui/Preloader";
import Cursor from "@/components/ui/Cursor";
import GrainOverlay from "@/components/ui/GrainOverlay";
import AudioAmbience from "@/components/ui/AudioAmbience";
import Navigation from "@/components/ui/Navigation";
import { CartProvider, useCart } from "@/context/CartContext";

function CartDrawerAndNav() {
  const { cart, cartCount, cartDrawerOpen, setCartDrawerOpen, removeFromCart, clearCart } = useCart();
  const totalValue = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <Navigation
        cartCount={cartCount}
        onOpenCart={() => setCartDrawerOpen(true)}
      />

      {cartDrawerOpen && (
        <div className="fixed inset-0 z-[960] flex justify-end bg-black/75 backdrop-blur-md">
          <div
            className="absolute inset-0"
            onClick={() => setCartDrawerOpen(false)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-md h-full bg-[#141212] border-l border-[#c5a059]/30 p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-[9px] tracking-[0.3em] text-[#c5a059] uppercase font-modern">
                    ATELIER ARCHIVES
                  </span>
                  <h3 className="font-editorial text-2xl text-white font-light">
                    ACQUISITIONS ({cart.length})
                  </h3>
                </div>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="text-xs uppercase text-white/50 hover:text-[#c5a059] tracking-wider"
                >
                  CLOSE [ESC]
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="py-20 text-center text-xs tracking-wider text-white/50 font-modern">
                  YOUR ARCHIVAL BAG IS CURRENTLY EMPTY.
                </div>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {cart.map((item, idx) => (
                    <div
                      key={`${item.id}-${idx}`}
                      className="p-3 bg-[#0a0808] border border-white/10 flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-editorial text-base text-white font-light">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-[#c5a059] font-modern">
                          {item.formattedPrice}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromCart(idx)}
                        className="text-[9px] text-white/40 hover:text-red-400 tracking-wider"
                      >
                        REMOVE
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-white/10 pt-6 space-y-4">
                <div className="flex justify-between text-xs tracking-widest text-white/70">
                  <span>TOTAL ESTIMATE</span>
                  <span className="text-[#c5a059] font-editorial text-xl">
                    ₹{totalValue.toLocaleString("en-IN")}
                  </span>
                </div>
                <button
                  onClick={() => {
                    alert(
                      "Your private acquisition dossier has been transmitted to the NOIRÉ concierge. An atelier advisor will connect within 2 hours."
                    );
                    clearCart();
                    setCartDrawerOpen(false);
                  }}
                  data-cursor="CHECKOUT"
                  className="w-full py-4 bg-[#c5a059] text-black font-bold text-xs tracking-[0.25em] uppercase rounded-sm hover:bg-[#dfbe7e] transition-colors"
                >
                  TRANSMIT ACQUISITION
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default function ExperienceShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <SmoothScroll>
        <Preloader />
        <Cursor />
        <GrainOverlay />
        <AudioAmbience />
        <CartDrawerAndNav />
        {children}
      </SmoothScroll>
    </CartProvider>
  );
}
