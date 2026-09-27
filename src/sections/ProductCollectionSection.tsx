"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { productsWithVariants, ProductWithVariants } from "@/data/products";
import QuickViewModal from "@/components/ui/QuickViewModal";
import MagneticButton from "@/components/ui/MagneticButton";
import { Sparkles, ShoppingBag, Eye, Check, Heart } from "lucide-react";
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
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);
  const [wishlisted, setWishlisted] = useState<Set<string>>(new Set());

  // Track the active color index per product
  const [activeColors, setActiveColors] = useState<Record<string, number>>({});

  // Inline quick-view modal state
  const [selectedProduct, setSelectedProduct] = useState<ProductWithVariants | null>(null);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "ALL") return productsWithVariants;
    return productsWithVariants.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleColorChange = (productId: string, colorIndex: number) => {
    setActiveColors((prev) => ({ ...prev, [productId]: colorIndex }));
  };

  const getActiveImage = (product: ProductWithVariants) => {
    const idx = activeColors[product.id] || 0;
    return product.colorVariants[idx]?.image || product.image;
  };

  const getActiveColorName = (product: ProductWithVariants) => {
    const idx = activeColors[product.id] || 0;
    return product.colorVariants[idx]?.colorName || product.color;
  };

  const handleQuickAdd = (product: ProductWithVariants, e: React.MouseEvent) => {
    e.stopPropagation();
    const idx = activeColors[product.id] || 0;
    const variant = product.colorVariants[idx];
    addToCart({
      ...product,
      color: variant?.colorName || product.color,
      image: variant?.image || product.image,
    });
    setQuickAddedId(product.id);
    setTimeout(() => setQuickAddedId(null), 1800);
  };

  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlisted((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
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
              <span>THE ROYAL CATALOG</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.06em] text-[#fbf9f5] uppercase">
              THE COLLECTION
            </h2>
          </div>

          <p className="mt-4 md:mt-0 text-xs sm:text-sm text-[#f7f4ee]/70 font-modern max-w-md tracking-wider">
            7 royal creations, each available in 4-5 curated colorways. Click any swatch to preview the saree in that hue.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-4 mb-12 border-b border-white/5 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const count = cat === "ALL"
              ? productsWithVariants.length
              : productsWithVariants.filter((p) => p.category === cat).length;

            if (count === 0 && cat !== "ALL") return null;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2.5 rounded-full text-[10px] tracking-[0.25em] uppercase font-modern transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? "bg-[#c5a059] text-[#0a0808] font-bold shadow-lg shadow-[#c5a059]/20"
                    : "bg-[#141212] text-[#f7f4ee]/70 hover:text-white border border-white/10 hover:border-[#c5a059]/40"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredProducts.map((product) => {
            const isJustAdded = quickAddedId === product.id;
            const isWishlisted = wishlisted.has(product.id);
            const activeImage = getActiveImage(product);
            const activeColorName = getActiveColorName(product);
            const activeColorIdx = activeColors[product.id] || 0;

            return (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group relative flex flex-col bg-[#141212]/80 rounded-sm border border-[#c5a059]/15 hover:border-[#c5a059]/60 p-3 transition-all duration-500 shadow-xl cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xs bg-[#0a0808]">
                  <Image
                    src={activeImage}
                    alt={`${product.name} — ${activeColorName}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Availability Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 rounded-full text-[9px] uppercase tracking-[0.2em] font-modern bg-black/70 backdrop-blur-md border border-white/15 text-[#c5a059]">
                      {product.availability}
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => toggleWishlist(product.id, e)}
                    className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center transition-all hover:bg-[#c5a059]/20"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${
                        isWishlisted ? "text-red-400 fill-red-400" : "text-white/70"
                      }`}
                    />
                  </button>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Hover action buttons */}
                  <div className="absolute bottom-4 inset-x-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                      }}
                      className="flex-1 py-2.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] uppercase tracking-[0.16em] font-modern flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className={`py-2.5 px-4 rounded-lg text-[10px] uppercase tracking-[0.16em] font-modern flex items-center justify-center gap-1.5 transition-all ${
                        isJustAdded
                          ? "bg-green-600 text-white border border-green-500"
                          : "bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold shadow-[0_4px_15px_rgba(197,160,89,0.4)]"
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-editorial tracking-wide text-white line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-white/50 font-modern mt-0.5">
                        {activeColorName} • {product.fabric}
                      </p>
                    </div>
                    <span className="text-sm font-editorial text-[#c5a059] font-normal whitespace-nowrap ml-2">
                      {product.formattedPrice}
                    </span>
                  </div>

                  {/* ═══ COLOR SWATCHES ═══ */}
                  <div className="flex items-center gap-1.5 mt-1">
                    {product.colorVariants.map((variant, idx) => (
                      <button
                        key={`${product.id}-${variant.colorName}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleColorChange(product.id, idx);
                        }}
                        title={variant.colorName}
                        className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                          activeColorIdx === idx
                            ? "border-[#c5a059] ring-2 ring-[#c5a059]/40 scale-110"
                            : "border-white/20 hover:border-white/60"
                        }`}
                        style={{ backgroundColor: variant.hex }}
                      />
                    ))}
                    <span className="text-[9px] text-white/40 ml-1 font-modern">
                      {product.colorVariants.length} colors
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
