import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-modern",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0808",
};

export const metadata: Metadata = {
  title: "NOIRÉ — Contemporary Indian Luxury Couture & Haute Couture",
  description:
    "NOIRÉ celebrates contemporary Indian women's fashion through modern silhouettes, master handloom weaving, Banarasi silks, and high-fashion editorial craftsmanship.",
  keywords: [
    "Indian luxury fashion",
    "contemporary couture",
    "Banarasi saree",
    "Lehenga couture",
    "handloom silk",
    "NOIRÉ fashion",
    "Zari craftsmanship",
  ],
  authors: [{ name: "NOIRÉ Atelier" }],
  openGraph: {
    title: "NOIRÉ — Contemporary Indian Luxury Couture",
    description:
      "Crafted for the woman who moves. Contemporary Indian silhouettes shaped by craft, movement and memory.",
    url: "https://noire-fashion.netlify.app",
    siteName: "NOIRÉ",
    images: [
      {
        url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "NOIRÉ Indian Luxury Fashion Campaign",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOIRÉ — Contemporary Indian Luxury Couture",
    description:
      "Contemporary Indian silhouettes shaped by craft, movement and memory.",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <body className="bg-[#0a0808] text-[#fbf9f5] font-modern selection:bg-[#c5a059] selection:text-[#0a0808]">
        {children}
      </body>
    </html>
  );
}
