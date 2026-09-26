"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { products } from "@/data/products";
import { Product } from "@/types";
import QuickViewModal from "@/components/ui/QuickViewModal";
import MagneticButton from "@/components/ui/MagneticButton";
import { Sparkles, ShoppingBag, Eye, Check } from "lucide-react";

import { useCart } from "@/context/CartContext";

const CATEGORIES = [
  "ALL",
  "NEW",
  "SAREES",
  "LEHENGAS",
  "CONTEMPORARY",
  "ACCESSORIES",
] as const;

export default function ProductCollectionSection() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("ALL");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "ALL") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setQuickAddedId(product.id);
    setTimeout(() => setQuickAddedId(null), 1800);
  };

  return (
    <section
      id="collection"
      className="relative w-full bg-[#0a0808] text-[#fbf9f5] py-24 sm:py-32 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#c5a059]/20 pb-8 mb-12">
          <div>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-modern mb-2">
              <Sparkles className="w-3 h-3 text-[#c5a059]" />
              <span>SCENE 09 • LUXURY COMMERCE</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.06em] text-[#fbf9f5] uppercase">
              THE COLLECTION
            </h2>
          </div>

          <p className="mt-4 md:mt-0 text-xs sm:text-sm text-[#f7f4ee]/70 font-modern max-w-md tracking-wider">
            Heirloom creations hand-woven by generational masters. Available in numbered editions and bespoke made-to-order sizing.
          </p>
        </div>

        {/* Functional Animated Category Filter Tabs */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-4 mb-12 border-b border-white/5 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-cursor="FILTER"
                className={`relative px-5 py-2.5 rounded-full text-[10px] tracking-[0.25em] uppercase font-modern transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? "bg-[#c5a059] text-[#0a0808] font-bold shadow-lg shadow-[#c5a059]/20"
                    : "bg-[#141212] text-[#f7f4ee]/70 hover:text-white border border-white/10 hover:border-[#c5a059]/40"
                }`}
              >
                {cat}
                {cat === "ALL" && ` (${products.length})`}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredProducts.map((product) => {
            const isJustAdded = quickAddedId === product.id;

            return (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                data-cursor="SHOP"
                className="group relative flex flex-col bg-[#141212]/80 rounded-sm border border-[#c5a059]/15 hover:border-[#c5a059]/60 p-3 transition-all duration-500 shadow-xl cursor-pointer"
              >
                {/* Visual Image Container */}
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xs bg-[#0a0808]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover filter contrast-[1.04] group-hover:scale-106 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0808]/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="text-[8px] tracking-[0.25em] text-[#c5a059] px-2.5 py-1 bg-[#0a0808]/85 backdrop-blur-sm border border-white/10 uppercase font-modern">
                      {product.collection}
                    </span>
                    <span className="text-[8px] tracking-[0.2em] text-white/80 px-2.5 py-1 bg-[#0a0808]/85 backdrop-blur-sm border border-white/10 uppercase font-modern">
                      {product.availability}
                    </span>
                  </div>

                  {/* Hover Quick Action Overlay */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                      }}
                      className="p-3 rounded-full bg-[#141212] text-white hover:text-[#c5a059] border border-white/20 hover:border-[#c5a059] transition-colors"
                      title="Inspect Details"
                      aria-label="Inspect Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className="px-4 py-2.5 rounded-full bg-[#c5a059] hover:bg-[#dfbe7e] text-[#0a0808] font-bold text-[10px] tracking-[0.2em] uppercase font-modern flex items-center gap-1.5 transition-colors shadow-lg"
                      title="Acquire Piece"
                      aria-label="Acquire Piece"
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>ADDED</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>ACQUIRE</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Information Card Body */}
                <div className="p-3 pt-4 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[9px] tracking-[0.25em] text-[#c5a059] uppercase font-modern block mb-1">
                      {product.category} • {product.fabric}
                    </span>
                    <h3 className="font-editorial text-lg sm:text-xl text-[#fbf9f5] font-light leading-snug group-hover:text-[#c5a059] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-[#f7f4ee]/60 font-modern line-clamp-1 mt-1">
                      {product.color}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                    <span className="font-editorial text-lg text-[#c5a059]">
                      {product.formattedPrice}
                    </span>
                    <span className="text-[9px] tracking-[0.2em] uppercase text-white/50 group-hover:text-white transition-colors">
                      VIEW SPEC →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p) => addToCart(p)}
      />
    </section>
  );
}
