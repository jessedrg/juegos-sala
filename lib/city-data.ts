// City data for dynamic SEO pages - WORLDWIDE
import citiesData from './cities-processed.json';

export type Locale = 'es' | 'en' | 'de' | 'fr' | 'it' | 'pt' | 'nl' | 'pl' | 'cs' | 'el';

export interface CityData {
  name: string;
  slug: string;
  population: number;
  country?: string;
}

// All cities from all countries
const allCitiesData = citiesData as Record<string, CityData[]>;

// Get all cities worldwide with country info
export function getAllCities(): CityData[] {
  const cities: CityData[] = [];
  for (const [country, countryCities] of Object.entries(allCitiesData)) {
    for (const city of countryCities) {
      cities.push({ ...city, country });
    }
  }
  return cities;
}

// Get top cities by population for pre-rendering
export function getTopCities(limit: number = 100): CityData[] {
  return getAllCities()
    .sort((a, b) => b.population - a.population)
    .slice(0, limit);
}

// Get city by slug (searches all countries)
export function getCityBySlug(slug: string): CityData | undefined {
  for (const [country, cities] of Object.entries(allCitiesData)) {
    const city = cities.find(c => c.slug === slug);
    if (city) return { ...city, country };
  }
  return undefined;
}

// Get all city slugs for static params
export function getAllCitySlugs(): string[] {
  return getAllCities().map(city => city.slug);
}

// Product categories with translations - Game Room products
export const PRODUCT_CATEGORIES = [
  { 
    slug: 'mesas-billar', 
    translations: {
      es: 'Mesas de Billar', en: 'Pool Tables', de: 'Billardtische', 
      fr: 'Tables de Billard', it: 'Tavoli da Biliardo', pt: 'Mesas de Bilhar',
      nl: 'Pooltafels', pl: 'Stoly Bilardowe', cs: 'Kulecnikove Stoly', el: 'Trapezia Mpiliardou'
    },
    keywords: ['mesa billar', 'pool table', 'billar casa', 'mesa billar precio', 'billar profesional'],
    priceRange: '800 - 5.000',
  },
  { 
    slug: 'futbolines', 
    translations: {
      es: 'Futbolines', en: 'Foosball Tables', de: 'Tischfussball',
      fr: 'Baby-foot', it: 'Calcio Balilla', pt: 'Matraquilhos',
      nl: 'Tafelvoetbal', pl: 'Pilkarzyki', cs: 'Stolni Fotbaly', el: 'Podosfairakia'
    },
    keywords: ['futbolin', 'foosball table', 'futbolin profesional', 'futbolin comprar'],
    priceRange: '300 - 2.500',
  },
  { 
    slug: 'dardos', 
    translations: {
      es: 'Dianas y Dardos', en: 'Dart Boards', de: 'Dartscheiben',
      fr: 'Cibles de Flechettes', it: 'Bersagli Freccette', pt: 'Alvos de Dardos',
      nl: 'Dartborden', pl: 'Tarcze do Darta', cs: 'Sipkove Tarce', el: 'Stochoi Velakia'
    },
    keywords: ['diana electronica', 'dart board', 'dardos profesionales', 'diana dardos'],
    priceRange: '50 - 500',
  },
  { 
    slug: 'air-hockey', 
    translations: {
      es: 'Mesas Air Hockey', en: 'Air Hockey Tables', de: 'Airhockey-Tische',
      fr: 'Tables Air Hockey', it: 'Tavoli Air Hockey', pt: 'Mesas Air Hockey',
      nl: 'Airhockey Tafels', pl: 'Stoly Air Hockey', cs: 'Stoly Air Hockey', el: 'Trapezia Air Hockey'
    },
    keywords: ['air hockey', 'mesa air hockey', 'air hockey table', 'air hockey casa'],
    priceRange: '200 - 3.000',
  },
  { 
    slug: 'ping-pong', 
    translations: {
      es: 'Mesas Ping Pong', en: 'Table Tennis', de: 'Tischtennisplatten',
      fr: 'Tables de Ping Pong', it: 'Tavoli Ping Pong', pt: 'Mesas Ping Pong',
      nl: 'Tafeltennistafels', pl: 'Stoly do Ping Ponga', cs: 'Stolni Tenis', el: 'Trapezia Ping Pong'
    },
    keywords: ['mesa ping pong', 'table tennis', 'ping pong plegable', 'mesa tenis mesa'],
    priceRange: '150 - 2.000',
  },
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number];

// Get category by slug
export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find(cat => cat.slug === slug);
}

// Generate SEO description for city + category by locale
export function generateCityDescription(city: CityData, category: ProductCategory, locale: Locale): string {
  const catName = category.translations[locale] || category.translations.en;
  
  const templates: Record<Locale, string[]> = {
    es: [
      `Comprar ${catName.toLowerCase()} en ${city.name}. Envio gratis y garantia 2 anos. Presupuesto sin compromiso.`,
      `${catName} en ${city.name} al mejor precio. Entrega gratuita, garantia 2 anos.`,
    ],
    en: [
      `Buy ${catName.toLowerCase()} in ${city.name}. Free shipping and 2-year warranty. Free quote.`,
      `${catName} in ${city.name} at the best price. Free delivery, 2 year warranty.`,
    ],
    de: [
      `${catName} in ${city.name} kaufen. Kostenloser Versand und 2 Jahre Garantie.`,
      `${catName} in ${city.name} zum besten Preis. Kostenlose Lieferung, 2 Jahre Garantie.`,
    ],
    fr: [
      `Acheter ${catName.toLowerCase()} a ${city.name}. Livraison gratuite et garantie 2 ans.`,
      `${catName} a ${city.name} au meilleur prix. Livraison gratuite, garantie 2 ans.`,
    ],
    it: [
      `Comprare ${catName.toLowerCase()} a ${city.name}. Spedizione gratuita e garanzia 2 anni.`,
      `${catName} a ${city.name} al miglior prezzo. Consegna gratuita, garanzia 2 anni.`,
    ],
    pt: [
      `Comprar ${catName.toLowerCase()} em ${city.name}. Envio gratis e garantia 2 anos.`,
      `${catName} em ${city.name} ao melhor preco. Entrega gratuita, garantia 2 anos.`,
    ],
    nl: [
      `${catName.toLowerCase()} kopen in ${city.name}. Gratis verzending en 2 jaar garantie.`,
      `${catName} in ${city.name} voor de beste prijs. Gratis levering, 2 jaar garantie.`,
    ],
    pl: [
      `Kup ${catName.toLowerCase()} w ${city.name}. Darmowa wysylka i gwarancja 2 lata.`,
      `${catName} w ${city.name} w najlepszej cenie. Darmowa dostawa, gwarancja 2 lata.`,
    ],
    cs: [
      `Koupit ${catName.toLowerCase()} v ${city.name}. Doprava zdarma a zaruka 2 roky.`,
      `${catName} v ${city.name} za nejlepsi cenu. Doprava zdarma, zaruka 2 roky.`,
    ],
    el: [
      `Agorase ${catName.toLowerCase()} stin ${city.name}. Dorean apostoli kai eggyisi 2 eton.`,
      `${catName} stin ${city.name} stin kalyteri timi. Dorean paradosi, eggyisi 2 eton.`,
    ],
  };
  
  const localeTemplates = templates[locale] || templates.en;
  return localeTemplates[city.name.length % localeTemplates.length];
}

// Generate dynamic stats for city
export function getCityStats(city: CityData): {
  instalaciones: number;
  tiempoEntrega: string;
  satisfaccion: number;
} {
  const seed = city.population % 100;
  return {
    instalaciones: 50 + (seed * 3),
    tiempoEntrega: `${3 + (seed % 5)} - ${7 + (seed % 5)}`,
    satisfaccion: 4.7 + ((seed % 3) * 0.1),
  };
}

// Generate reviews for city
export function generateCityReviews(city: CityData, category: ProductCategory, locale: Locale) {
  const catName = category.translations[locale] || category.translations.en;
  
  const namesByLocale: Record<Locale, string[]> = {
    es: ["María García", "Carlos Pérez", "Ana Martínez", "José López", "Laura Sánchez"],
    en: ["John Smith", "Sarah Johnson", "Michael Brown", "Emily Davis", "James Wilson"],
    de: ["Thomas Müller", "Anna Schmidt", "Michael Weber", "Julia Fischer", "Stefan Wagner"],
    fr: ["Jean Dupont", "Marie Martin", "Pierre Bernard", "Sophie Dubois", "Lucas Moreau"],
    it: ["Marco Rossi", "Giulia Bianchi", "Luca Ferrari", "Francesca Romano", "Alessandro Colombo"],
    pt: ["João Silva", "Maria Santos", "Pedro Costa", "Ana Oliveira", "Carlos Ferreira"],
    nl: ["Jan de Vries", "Anna Jansen", "Pieter Bakker", "Sophie Visser", "Thomas Smit"],
    pl: ["Jan Kowalski", "Anna Nowak", "Piotr Wiśniewski", "Maria Wójcik", "Tomasz Kamiński"],
    cs: ["Jan Novák", "Marie Svobodová", "Petr Dvořák", "Jana Černá", "Tomáš Procházka"],
    el: ["Γιώργος Παπαδόπουλος", "Μαρία Νικολάου", "Κώστας Αντωνίου", "Ελένη Γεωργίου", "Νίκος Δημητρίου"],
  };
  
  const names = namesByLocale[locale] || namesByLocale.en;
  const seed = city.population % 10;
  
  const reviewTemplates: Record<Locale, (name: string) => string> = {
    es: () => `Excelente servicio en ${city.name}. Muy contentos con nuestra ${catName.toLowerCase()}.`,
    en: () => `Excellent service in ${city.name}. Very happy with our ${catName.toLowerCase()}.`,
    de: () => `Ausgezeichneter Service in ${city.name}. Sehr zufrieden mit unserer ${catName}.`,
    fr: () => `Excellent service à ${city.name}. Très satisfaits de notre ${catName.toLowerCase()}.`,
    it: () => `Servizio eccellente a ${city.name}. Molto soddisfatti della nostra ${catName.toLowerCase()}.`,
    pt: () => `Excelente serviço em ${city.name}. Muito satisfeitos com a nossa ${catName.toLowerCase()}.`,
    nl: () => `Uitstekende service in ${city.name}. Zeer tevreden met onze ${catName.toLowerCase()}.`,
    pl: () => `Doskonała obsługa w ${city.name}. Bardzo zadowoleni z naszej ${catName.toLowerCase()}.`,
    cs: () => `Vynikající služby v ${city.name}. Velmi spokojeni s naší ${catName.toLowerCase()}.`,
    el: () => `Εξαιρετική εξυπηρέτηση στην ${city.name}. Πολύ ευχαριστημένοι με την ${catName.toLowerCase()}.`,
  };
  
  const template = reviewTemplates[locale] || reviewTemplates.en;
  
  return [
    { name: names[seed % names.length], location: city.name, rating: 5 as const, text: template(names[seed % names.length]), verified: true },
    { name: names[(seed + 1) % names.length], location: city.name, rating: 5 as const, text: template(names[(seed + 1) % names.length]), verified: true },
    { name: names[(seed + 2) % names.length], location: city.name, rating: 5 as const, text: template(names[(seed + 2) % names.length]), verified: true },
  ];
}
