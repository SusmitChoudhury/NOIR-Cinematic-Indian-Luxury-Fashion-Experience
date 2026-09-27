export interface JourneyPanel {
  id: string;
  step: string;
  title: string;
  tagline: string;
  narrative: string;
  metadata: {
    origin: string;
    technique: string;
    timeline: string;
    fiber: string;
  };
  image: string;
  secondaryImage?: string;
  composition: "split-editorial" | "monolithic-center" | "asymmetric-overlap" | "typography-dominant" | "wide-landscape" | "portrait-statuesque";
}

export const journeyPanels: JourneyPanel[] = [
  {
    id: "journey-silk",
    step: "01",
    title: "THE SILK",
    tagline: "Spun from wild tussar cocoons and mulberry trees of the Deccan plateau.",
    narrative:
      "Before a garment possesses form, it possesses voice. In the southern river valleys and eastern hill tracts, wild silks are harvested without harming the moth, yielding threads of irregular, raw, and untamed luster that hold memory in every knot.",
    metadata: {
      origin: "Bhagalpur & Murshidabad",
      technique: "Ahimsa Wild Cocoon Reel",
      timeline: "45 Days of Cultivation",
      fiber: "Natural Gold Mulberry",
    },
    image: "/media/images/products/catalog/banarasi-navy.jpg",
    secondaryImage: "/media/images/products/catalog/banarasi-red.jpg",
    composition: "asymmetric-overlap",
  },
  {
    id: "journey-craft",
    step: "02",
    title: "THE CRAFT",
    tagline: "Pit looms that respond to the weaver’s breath and heartbeat.",
    narrative:
      "A handloom is an acoustic instrument. The rhythmic thud of the reed against the warp marks the passage of hours. We preserve generational guilds whose hands remember geometries drafted before the invention of paper.",
    metadata: {
      origin: "Varanasi Ghats & Chanderi",
      technique: "Kadhwa Extra-Weft Jacquard",
      timeline: "140–200 Loom Days",
      fiber: "Real Beaten Zari Wire",
    },
    image: "/media/images/products/catalog/velvet-zardozi.jpg",
    composition: "split-editorial",
  },
  {
    id: "journey-color",
    step: "03",
    title: "THE COLOR",
    tagline: "Pigments brewed from madder root, pomegranate rind, and river minerals.",
    narrative:
      "Our colors are not synthetic calculations. They are cooked over open flame in copper cauldrons — madder root yielding deep terracotta, indigo leaves fermenting into midnight blues, and myrobalan nuts imparting ancestral antique ochres that deepen with age.",
    metadata: {
      origin: "Bagru & Kutch Region",
      technique: "Natural Fermentation Vat Dye",
      timeline: "21 Days Immersion & Sun-Dry",
      fiber: "Alum-Mordanted Katan Silk",
    },
    image: "/media/images/products/catalog/paithani-purple.jpg",
    secondaryImage: "/media/images/products/catalog/chanderi-gold.jpg",
    composition: "monolithic-center",
  },
  {
    id: "journey-form",
    step: "04",
    title: "THE FORM",
    tagline: "The unstitched cloth as sovereign geometry.",
    narrative:
      "The Indian drape rejects rigid western darting in pursuit of universal elegance. A single six-yard expanse transforms into sovereign power, flowing sculpture, or tailored armor — adapted to the body's movement without constraining its spirit.",
    metadata: {
      origin: "NOIRÉ Atelier New Delhi",
      technique: "Architectural Bias Drape",
      timeline: "75 Prototype Cycles",
      fiber: "Silk Velvet & Structured Mesh",
    },
    image: "/media/images/products/catalog/kanjivaram-emerald.jpg",
    composition: "typography-dominant",
  },
  {
    id: "journey-woman",
    step: "05",
    title: "THE WOMAN",
    tagline: "Not a muse to be clothed, but the sovereign creator of the space she enters.",
    narrative:
      "She moves effortlessly between New York, New Delhi, Paris, and Tokyo. She does not disguise her heritage; she wears it as intellectual confidence, command, and unapologetic artistic distinction.",
    metadata: {
      origin: "Global Diaspora",
      technique: "Sculpted Sovereignty",
      timeline: "Endless Presence",
      fiber: "Haute Couture Identity",
    },
    image: "/media/images/products/catalog/velvet-noir.jpg",
    secondaryImage: "/media/images/products/catalog/net-rose.jpg",
    composition: "portrait-statuesque",
  },
  {
    id: "journey-moment",
    step: "06",
    title: "THE MOMENT",
    tagline: "The instant when textile, light, and movement coalesce into cinema.",
    narrative:
      "When the heavy zari pallu catches the draft of a ballroom or architectural gallery, time suspends. That fleeting, irreversible gesture of fabric trailing across ancient marble — this is NOIRÉ.",
    metadata: {
      origin: "Cinematic Eternity",
      technique: "Kinetic Couture Expression",
      timeline: "AW 2026 Climax",
      fiber: "Pure Liquid Metallics",
    },
    image: "/media/images/products/catalog/net-crimson.jpg",
    composition: "wide-landscape",
  },
];
