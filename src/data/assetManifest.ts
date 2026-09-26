export interface AssetEntry {
  id: string;
  url: string;
  type: "image" | "video" | "font";
  priority: "critical" | "hero" | "next" | "lazy";
  targetDevice: "all" | "desktop" | "mobile";
  description: string;
}

export const assetManifest: AssetEntry[] = [
  // Critical assets needed immediately for initial viewport & preloader
  {
    id: "hero-poster",
    url: "/media/images/hero/hero-poster.jpg",
    type: "image",
    priority: "critical",
    targetDevice: "all",
    description: "High-definition hero editorial poster featuring Indian couture model",
  },
  {
    id: "raw-silk-texture",
    url: "/media/images/textures/raw-silk.jpg",
    type: "image",
    priority: "critical",
    targetDevice: "all",
    description: "Raw wild tussar silk texture used in opening and transition",
  },
  {
    id: "hero-video-webm",
    url: "/media/video/hero/hero-fashion.webm",
    type: "video",
    priority: "hero",
    targetDevice: "desktop",
    description: "Primary high-fashion editorial film showing fabric movement and silhouette",
  },
  // Next assets to prefetch as user scrolls through Hero & Moods
  {
    id: "mood-dawn-img",
    url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1400&q=85",
    type: "image",
    priority: "next",
    targetDevice: "all",
    description: "Scene 04 Six Moods: Dawn composition",
  },
  {
    id: "mood-drift-img",
    url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1400&q=85",
    type: "image",
    priority: "next",
    targetDevice: "all",
    description: "Scene 04 Six Moods: Drift composition",
  },
  {
    id: "craft-hands-img",
    url: "/media/images/editorial/craft-hands.jpg",
    type: "image",
    priority: "next",
    targetDevice: "all",
    description: "Master artisan weaver hands guiding 4,000 warp threads",
  },
  // Below-fold / lazy loaded assets
  {
    id: "cinematic-craft-video",
    url: "/media/video/editorial/craft-weaving.webm",
    type: "video",
    priority: "lazy",
    targetDevice: "all",
    description: "Scene 13 Cinematic Video: Authentic Bishnupur Swarnachari silk weaving",
  },
  {
    id: "gold-zari-texture",
    url: "/media/images/textures/gold-zari.jpg",
    type: "image",
    priority: "lazy",
    targetDevice: "all",
    description: "Real beaten gold zari filament closeup",
  },
];
