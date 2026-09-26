export interface Product {
  id: string;
  name: string;
  category: 'ALL' | 'NEW' | 'SAREES' | 'LEHENGAS' | 'CONTEMPORARY' | 'ACCESSORIES';
  collection: string;
  price: number;
  formattedPrice: string;
  color: string;
  fabric: string;
  craftsmanship: string;
  image: string;
  secondaryImage?: string;
  availability: 'Available' | 'Made to Order' | 'Limited Edition' | 'Atelier Exclusive';
  description: string;
  details: string[];
}

export interface CollectionItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  season: string;
  description: string;
  image: string;
  palette: string[];
}

export interface Mood {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  quote: string;
  colorHex: string;
  tag: string;
}

export interface OrbitItem {
  id: string;
  title: string;
  collectionNumber: string;
  label: string;
  category: string;
  image: string;
  accentColor: string;
}

export interface EditorialStory {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  leadParagraph: string;
  details: string[];
  image: string;
  materials: string[];
}

export interface SocialPost {
  id: string;
  caption: string;
  handle: string;
  image: string;
  likes: string;
  aspect: string;
}
