"use client";

import Image from "next/image";
import { socialPosts } from "@/data/social";
import { Sparkles, Heart } from "lucide-react";

export default function SocialEditorialSection() {
  return (
    <section className="relative w-full bg-[#0a0808] text-[#fbf9f5] py-24 sm:py-32 px-6 md:px-12 border-t border-[#c5a059]/15">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#c5a059]/20 pb-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-modern mb-2">
              <svg className="w-3.5 h-3.5 text-[#c5a059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              <span>SCENE 15 • DIGITAL DIALOGUE</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.06em] text-[#fbf9f5] uppercase">
              FOLLOW THE STORY
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="INSTA"
            className="mt-4 sm:mt-0 text-[10px] tracking-[0.25em] uppercase text-[#c5a059] hover:text-[#dfbe7e] transition-colors border border-[#c5a059]/30 px-4 py-2 rounded-full font-modern"
          >
            @NOIRE.COUTURE
          </a>
        </div>

        {/* 8 Curated Luxury Editorial Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {socialPosts.map((post) => (
            <div
              key={post.id}
              data-cursor="JOURNAL"
              className="group relative aspect-square overflow-hidden rounded-sm border border-[#c5a059]/15 bg-[#141212] shadow-xl cursor-pointer"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out filter contrast-[1.05]"
              />

              {/* Hover Dark/Gold Overlay with Caption */}
              <div className="absolute inset-0 bg-[#0a0808]/85 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5">
                <div className="flex items-center justify-between text-[9px] tracking-[0.2em] text-[#c5a059] font-modern uppercase">
                  <span>{post.handle}</span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-[#c5a059] text-[#c5a059]" />
                    {post.likes}
                  </span>
                </div>

                <p className="text-[11px] sm:text-xs text-white/90 font-modern leading-relaxed tracking-wide line-clamp-3">
                  {post.caption}
                </p>

                <div className="flex items-center gap-1.5 text-[8px] tracking-[0.25em] text-[#c5a059] uppercase font-modern">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>VIEW CAMPAIGN POST</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
