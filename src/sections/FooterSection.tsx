"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Sparkles, ArrowRight, Check } from "lucide-react";

export default function FooterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer id="contact" className="relative w-full bg-[#070505] text-[#fbf9f5] pt-20 pb-12 px-6 md:px-12 border-t border-[#c5a059]/20">
      <div className="max-w-7xl mx-auto">
        {/* Top Newsletter & Brand Line */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-6">
            <span className="text-[10px] tracking-[0.35em] text-[#c5a059] uppercase font-modern block mb-3">
              THE NOIRÉ DISPATCH
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#fbf9f5] font-light leading-snug uppercase mb-4">
              RECEIVE PRIVATE INVITATIONS & ATELIER PREVIEWS.
            </h3>
            <p className="text-xs text-[#f7f4ee]/70 font-modern max-w-md leading-relaxed tracking-wider">
              Issued four times annually. Dedicated to archival handloom releases, private gallery exhibitions, and private salon fittings.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR CONCIERGE EMAIL"
                className="flex-1 bg-[#141212] border border-[#c5a059]/30 px-5 py-3.5 text-xs text-white placeholder:text-white/30 font-modern tracking-[0.15em] focus:outline-none focus:border-[#c5a059] rounded-sm"
              />
              <button
                type="submit"
                data-cursor="JOIN"
                className="px-8 py-3.5 bg-[#c5a059] hover:bg-[#dfbe7e] text-[#0a0808] font-bold text-[10px] tracking-[0.25em] uppercase font-modern transition-colors flex items-center justify-center gap-2 rounded-sm"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>SUBSCRIBED</span>
                  </>
                ) : (
                  <>
                    <span>INVITATION</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
            <span className="text-[9px] tracking-wider text-white/40 font-modern mt-3">
              We respect your privacy. Unsubscribe at any time.
            </span>
          </div>
        </div>

        {/* Navigation & Flagship Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10 py-16 border-b border-white/10 text-xs font-modern tracking-wider">
          {/* Col 1: Collections */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#c5a059] mb-4">
              COLLECTIONS
            </h4>
            <ul className="space-y-2.5 text-white/70">
              <li><a href="#collection" className="hover:text-[#c5a059] transition-colors">Banarasi Kadhwa Sarees</a></li>
              <li><a href="#collection" className="hover:text-[#c5a059] transition-colors">Zardozi Bridal Lehengas</a></li>
              <li><a href="#collection" className="hover:text-[#c5a059] transition-colors">Raw Tussar Contemporary Capes</a></li>
              <li><a href="#collection" className="hover:text-[#c5a059] transition-colors">Chanderi Tissue Drapes</a></li>
              <li><a href="#collection" className="hover:text-[#c5a059] transition-colors">Heirloom Minaudières</a></li>
            </ul>
          </div>

          {/* Col 2: About & Journal */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#c5a059] mb-4">
              ATELIER & JOURNAL
            </h4>
            <ul className="space-y-2.5 text-white/70">
              <li><a href="#craft" className="hover:text-[#c5a059] transition-colors">The Weaver Provenance</a></li>
              <li><a href="#film" className="hover:text-[#c5a059] transition-colors">Campaign Documentary</a></li>
              <li><a href="#moods" className="hover:text-[#c5a059] transition-colors">Six Moods Philosophical Study</a></li>
              <li><a href="#journey" className="hover:text-[#c5a059] transition-colors">The Six-Yard Horizon</a></li>
              <li><a href="#orbit" className="hover:text-[#c5a059] transition-colors">Archival Orbit Index</a></li>
            </ul>
          </div>

          {/* Col 3: Flagships */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#c5a059] mb-4">
              SALONS & FLAGSHIPS
            </h4>
            <ul className="space-y-3 text-white/70">
              {siteConfig.contact.flagships.map((f) => (
                <li key={f.city}>
                  <strong className="text-white/90 block">{f.city}</strong>
                  <span className="text-[11px] text-white/50">{f.address}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Concierge & Contact */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#c5a059] mb-4">
              CONCIERGE
            </h4>
            <ul className="space-y-2.5 text-white/70">
              <li>
                <span className="text-white/40 block text-[9px]">PRIVATE APPOINTMENTS:</span>
                <a href={`mailto:${siteConfig.contact.conciergeEmail}`} className="hover:text-[#c5a059] transition-colors">
                  {siteConfig.contact.conciergeEmail}
                </a>
              </li>
              <li>
                <span className="text-white/40 block text-[9px]">PRESS & EDITORIAL:</span>
                <a href={`mailto:${siteConfig.contact.pressEmail}`} className="hover:text-[#c5a059] transition-colors">
                  {siteConfig.contact.pressEmail}
                </a>
              </li>
              <li>
                <span className="text-white/40 block text-[9px]">ATELIER DIRECT:</span>
                <a href={`tel:${siteConfig.contact.atelierPhone}`} className="hover:text-[#c5a059] transition-colors">
                  {siteConfig.contact.atelierPhone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Giant Brand Monolith & Copyright */}
        <div className="pt-12 flex flex-col items-center">
          <Link
            href="/"
            className="font-editorial text-6xl sm:text-8xl md:text-9xl tracking-[0.25em] font-light text-[#1a1717] hover:text-[#c5a059]/25 transition-colors uppercase select-none text-center"
          >
            {siteConfig.brand.name}
          </Link>

          <div className="mt-8 w-full flex flex-col sm:flex-row items-center justify-between text-[9px] tracking-[0.25em] text-white/40 uppercase font-modern gap-4">
            <div>
              © {new Date().getFullYear()} {siteConfig.brand.name} HAUTE COUTURE. ALL RIGHTS RESERVED.
            </div>
            <div className="flex items-center gap-6">
              <span className="hover:text-white cursor-pointer">PRIVACY POLICY</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">TERMS OF CONCIERGE</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">ACCESSIBILITY</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
