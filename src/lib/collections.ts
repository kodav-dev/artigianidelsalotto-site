// TODO: Replace with Directus SDK

import type { ImageMetadata } from "astro";
import imgAbudhabi from "@/assets/home/Abudhabi.jpg";
import imgAston from "@/assets/home/Aston.jpg";
import imgDubai from "@/assets/home/Dubai.jpg";
import imgRitz from "@/assets/home/Ritz.jpg";
import imgHero from "@/assets/home/hero.jpg";

export interface Category {
  slug: string;
  name: { it: string; en: string };
  image: ImageMetadata;
}

export interface Product {
  id: string;
  slug: string;
  category: string;
  name: { it: string; en: string };
  heroTitle: { it: string; en: string };
  heroSubtitle: { it: string; en: string };
  description: { it: string; en: string };
  heroImage: ImageMetadata;
  detailImages: ImageMetadata[];
}

export const CATEGORIES: Category[] = [
  { slug: "salotti", name: { it: "Salotti", en: "Living Rooms" }, image: imgAbudhabi },
  { slug: "poltrone", name: { it: "Poltrone", en: "Armchairs" }, image: imgAston },
  { slug: "divani-letto", name: { it: "Divani Letto", en: "Sofa Beds" }, image: imgDubai },
  { slug: "letti", name: { it: "Letti", en: "Beds" }, image: imgRitz },
  { slug: "poltrone-relax", name: { it: "Poltrone Relax", en: "Recliners" }, image: imgHero },
  { slug: "materassi", name: { it: "Materassi", en: "Mattresses" }, image: imgAbudhabi },
];

// TODO: Replace with Directus SDK
export const PRODUCTS: Product[] = [
  // Salotti
  {
    id: "salotto-abudhabi",
    slug: "abudhabi",
    category: "salotti",
    name: { it: "Abudhabi", en: "Abudhabi" },
    heroTitle: { it: "Collezione Abudhabi", en: "Abudhabi Collection" },
    heroSubtitle: { it: "Eleganza modulare per il tuo living", en: "Modular elegance for your living space" },
    description: {
      it: "Divano modulare a 3 posti dal design elegante e raffinato. Disponibile in diverse configurazioni per adattarsi ad ogni ambiente.",
      en: "3-seater modular sofa with an elegant and refined design. Available in different configurations to suit any space.",
    },
    heroImage: imgAbudhabi,
    detailImages: [imgDubai, imgRitz],
  },
  {
    id: "salotto-dubai",
    slug: "dubai",
    category: "salotti",
    name: { it: "Dubai", en: "Dubai" },
    heroTitle: { it: "Collezione Dubai", en: "Dubai Collection" },
    heroSubtitle: { it: "Lusso e comfort senza compromessi", en: "Luxury and comfort without compromise" },
    description: {
      it: "Salotto angolare di lusso con imbottitura ad alta densità. Comfort e stile per il vostro living.",
      en: "Luxury corner living room set with high-density padding. Comfort and style for your living space.",
    },
    heroImage: imgDubai,
    detailImages: [imgAbudhabi, imgAston],
  },
  // Poltrone
  {
    id: "poltrona-aston",
    slug: "aston",
    category: "poltrone",
    name: { it: "Aston", en: "Aston" },
    heroTitle: { it: "Collezione Aston", en: "Aston Collection" },
    heroSubtitle: { it: "Design contemporaneo, comfort senza tempo", en: "Contemporary design, timeless comfort" },
    description: {
      it: "Poltrona dal design contemporaneo con struttura in legno massello. Seduta ampia e avvolgente.",
      en: "Contemporary design armchair with solid wood frame. Wide and enveloping seat.",
    },
    heroImage: imgAston,
    detailImages: [imgRitz, imgHero],
  },
  {
    id: "poltrona-ritz",
    slug: "ritz",
    category: "poltrone",
    name: { it: "Ritz", en: "Ritz" },
    heroTitle: { it: "Collezione Ritz", en: "Ritz Collection" },
    heroSubtitle: { it: "Eleganza classica rivisitata", en: "Revisited classic elegance" },
    description: {
      it: "Poltrona classica rivisitata in chiave moderna. Eleganza senza tempo per ogni ambiente.",
      en: "Classic armchair reinterpreted in a modern key. Timeless elegance for any room.",
    },
    heroImage: imgRitz,
    detailImages: [imgAston, imgDubai],
  },
  // Divani Letto
  {
    id: "divano-letto-comfort",
    slug: "comfort",
    category: "divani-letto",
    name: { it: "Comfort", en: "Comfort" },
    heroTitle: { it: "Collezione Comfort", en: "Comfort Collection" },
    heroSubtitle: { it: "Due funzioni, un unico design", en: "Two functions, one design" },
    description: {
      it: "Divano letto con meccanismo di apertura facile e materasso ortopedico. Ideale per gli ospiti.",
      en: "Sofa bed with easy opening mechanism and orthopedic mattress. Ideal for guests.",
    },
    heroImage: imgDubai,
    detailImages: [imgAbudhabi, imgRitz],
  },
  {
    id: "divano-letto-elegance",
    slug: "elegance",
    category: "divani-letto",
    name: { it: "Elegance", en: "Elegance" },
    heroTitle: { it: "Collezione Elegance", en: "Elegance Collection" },
    heroSubtitle: { it: "Raffinatezza che si trasforma", en: "Refinement that transforms" },
    description: {
      it: "Divano letto dal design raffinato che non rinuncia al comfort. Trasformazione semplice e veloce.",
      en: "Sofa bed with refined design that doesn't compromise on comfort. Simple and fast transformation.",
    },
    heroImage: imgAston,
    detailImages: [imgHero, imgDubai],
  },
  // Letti
  {
    id: "letto-royal",
    slug: "royal",
    category: "letti",
    name: { it: "Royal", en: "Royal" },
    heroTitle: { it: "Collezione Royal", en: "Royal Collection" },
    heroSubtitle: { it: "Il riposo diventa arte", en: "Rest becomes art" },
    description: {
      it: "Letto matrimoniale con testiera imbottita e contenitore. Design moderno e funzionale.",
      en: "Double bed with upholstered headboard and storage. Modern and functional design.",
    },
    heroImage: imgRitz,
    detailImages: [imgAbudhabi, imgHero],
  },
  {
    id: "letto-dream",
    slug: "dream",
    category: "letti",
    name: { it: "Dream", en: "Dream" },
    heroTitle: { it: "Collezione Dream", en: "Dream Collection" },
    heroSubtitle: { it: "Semplicità e comfort per ogni notte", en: "Simplicity and comfort for every night" },
    description: {
      it: "Letto dal design minimalista con struttura rinforzata. Comfort e semplicità per il vostro riposo.",
      en: "Minimalist design bed with reinforced frame. Comfort and simplicity for your rest.",
    },
    heroImage: imgHero,
    detailImages: [imgRitz, imgAston],
  },
  // Poltrone Relax
  {
    id: "relax-supreme",
    slug: "supreme",
    category: "poltrone-relax",
    name: { it: "Supreme", en: "Supreme" },
    heroTitle: { it: "Collezione Supreme", en: "Supreme Collection" },
    heroSubtitle: { it: "Il massimo del relax artigianale", en: "The ultimate in artisanal relaxation" },
    description: {
      it: "Poltrona relax con meccanismo reclinabile manuale. Massimo comfort per i momenti di relax.",
      en: "Recliner with manual reclining mechanism. Maximum comfort for relaxation moments.",
    },
    heroImage: imgHero,
    detailImages: [imgAbudhabi, imgDubai],
  },
  {
    id: "relax-premium",
    slug: "premium",
    category: "poltrone-relax",
    name: { it: "Premium", en: "Premium" },
    heroTitle: { it: "Collezione Premium", en: "Premium Collection" },
    heroSubtitle: { it: "Tecnologia e tradizione italiana", en: "Technology and Italian tradition" },
    description: {
      it: "Poltrona relax elettrica con poggiapiedi integrato. Tecnologia e artigianato italiano.",
      en: "Electric recliner with integrated footrest. Technology and Italian craftsmanship.",
    },
    heroImage: imgAbudhabi,
    detailImages: [imgHero, imgRitz],
  },
  // Materassi
  {
    id: "materasso-ortho",
    slug: "ortho",
    category: "materassi",
    name: { it: "Ortho", en: "Ortho" },
    heroTitle: { it: "Collezione Ortho", en: "Ortho Collection" },
    heroSubtitle: { it: "Sostegno ottimale, sonno rigenerante", en: "Optimal support, regenerating sleep" },
    description: {
      it: "Materasso ortopedico a molle insacchettate. Sostegno ottimale per un sonno rigenerante.",
      en: "Orthopedic pocket spring mattress. Optimal support for regenerating sleep.",
    },
    heroImage: imgDubai,
    detailImages: [imgRitz, imgAbudhabi],
  },
  {
    id: "materasso-memory",
    slug: "memory",
    category: "materassi",
    name: { it: "Memory", en: "Memory" },
    heroTitle: { it: "Collezione Memory", en: "Memory Collection" },
    heroSubtitle: { it: "Comfort personalizzato per ogni corpo", en: "Personalized comfort for every body" },
    description: {
      it: "Materasso in memory foam ad alta densità. Si adatta alla forma del corpo per un comfort personalizzato.",
      en: "High-density memory foam mattress. Adapts to your body shape for personalized comfort.",
    },
    heroImage: imgAston,
    detailImages: [imgDubai, imgHero],
  },
];

// TODO: Replace with Directus SDK
export function getCategories(): Category[] {
  return CATEGORIES;
}

// TODO: Replace with Directus SDK
export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

// TODO: Replace with Directus SDK
export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.category === categorySlug);
}

// TODO: Replace with Directus SDK
export function getProduct(categorySlug: string, productSlug: string): Product | undefined {
  return PRODUCTS.find((p) => p.category === categorySlug && p.slug === productSlug);
}
