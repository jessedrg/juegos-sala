// Postal code data system for dynamic SEO pages
import postalCodesData from './postal-codes.json';

export type CountryCode = 'ES' | 'DE' | 'FR' | 'IT' | 'PT' | 'NL' | 'PL' | 'AT' | 'BE' | 'CH';

export interface PostalCodeData {
  name: string;
  region: string;
  lat: number;
  lng: number;
}

const data = postalCodesData as Record<CountryCode, Record<string, PostalCodeData>>;

// Country to locale mapping
export const COUNTRY_LOCALE: Record<CountryCode, string> = {
  ES: 'es', DE: 'de', FR: 'fr', IT: 'it', PT: 'pt', 
  NL: 'nl', PL: 'pl', AT: 'de', BE: 'fr', CH: 'de'
};

// Country names
export const COUNTRY_NAMES: Record<CountryCode, Record<string, string>> = {
  ES: { es: 'España', en: 'Spain' },
  DE: { de: 'Deutschland', en: 'Germany' },
  FR: { fr: 'France', en: 'France' },
  IT: { it: 'Italia', en: 'Italy' },
  PT: { pt: 'Portugal', en: 'Portugal' },
  NL: { nl: 'Nederland', en: 'Netherlands' },
  PL: { pl: 'Polska', en: 'Poland' },
  AT: { de: 'Österreich', en: 'Austria' },
  BE: { fr: 'Belgique', en: 'Belgium' },
  CH: { de: 'Schweiz', en: 'Switzerland' },
};

// Get postal code data
export function getPostalCode(country: CountryCode, postalCode: string): PostalCodeData | undefined {
  return data[country]?.[postalCode];
}

// Get all postal codes for a country
export function getPostalCodesForCountry(country: CountryCode): string[] {
  return Object.keys(data[country] || {});
}

// Get top postal codes by population centers (major cities)
export function getTopPostalCodes(country: CountryCode, limit: number = 100): string[] {
  const codes = Object.keys(data[country] || {});
  // Return first N codes (they're typically ordered by importance)
  return codes.slice(0, limit);
}

// Validate postal code exists
export function isValidPostalCode(country: CountryCode, postalCode: string): boolean {
  return !!data[country]?.[postalCode];
}

// Create slug from postal code and name
export function createPostalSlug(postalCode: string, name: string): string {
  const slug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${postalCode}-${slug}`;
}

// Parse postal slug back to postal code
export function parsePostalSlug(slug: string): { postalCode: string; name: string } | null {
  const match = slug.match(/^(\d+)-(.+)$/);
  if (!match) return null;
  return { postalCode: match[1], name: match[2] };
}

// Product categories with translations and localized slugs
export const PRODUCT_CATEGORIES = [
  { 
    slug: 'mesas-billar',
    slugs: {
      es: 'mesas-billar', en: 'pool-tables', de: 'billardtische',
      fr: 'tables-billard', it: 'tavoli-biliardo', pt: 'mesas-bilhar',
      nl: 'pooltafels', pl: 'stoly-bilardowe'
    },
    icon: '🎱',
    image: 'https://images.unsplash.com/photo-1695727008212-5d46172962b6?q=80&w=1336&auto=format&fit=crop',
    translations: {
      es: 'Mesas de Billar', en: 'Pool Tables', de: 'Billardtische', 
      fr: 'Tables de Billard', it: 'Tavoli da Biliardo', pt: 'Mesas de Bilhar',
      nl: 'Pooltafels', pl: 'Stoły Bilardowe'
    },
    priceRange: { min: 800, max: 8000 },
  },
  { 
    slug: 'futbolines',
    slugs: {
      es: 'futbolines', en: 'foosball-tables', de: 'tischfussball',
      fr: 'baby-foot', it: 'calcio-balilla', pt: 'matraquilhos',
      nl: 'tafelvoetbal', pl: 'pilkarzyki'
    },
    icon: '⚽',
    image: 'https://images.unsplash.com/photo-1690073938628-359f281dcabb?q=80&w=1287&auto=format&fit=crop',
    translations: {
      es: 'Futbolines', en: 'Foosball Tables', de: 'Tischfußball',
      fr: 'Baby-foot', it: 'Calcio Balilla', pt: 'Matraquilhos',
      nl: 'Tafelvoetbal', pl: 'Piłkarzyki'
    },
    priceRange: { min: 300, max: 3000 },
  },
  { 
    slug: 'dardos',
    slugs: {
      es: 'dardos', en: 'dart-boards', de: 'dartscheiben',
      fr: 'cibles-flechettes', it: 'bersagli-freccette', pt: 'alvos-dardos',
      nl: 'dartborden', pl: 'tarcze-darta'
    },
    icon: '🎯',
    image: 'https://images.unsplash.com/photo-1638430325415-2f2cc6ae838f?q=80&w=1287&auto=format&fit=crop',
    translations: {
      es: 'Dianas y Dardos', en: 'Dart Boards', de: 'Dartscheiben',
      fr: 'Cibles de Fléchettes', it: 'Bersagli Freccette', pt: 'Alvos de Dardos',
      nl: 'Dartborden', pl: 'Tarcze do Darta'
    },
    priceRange: { min: 50, max: 500 },
  },
  { 
    slug: 'air-hockey',
    slugs: {
      es: 'air-hockey', en: 'air-hockey', de: 'airhockey',
      fr: 'air-hockey', it: 'air-hockey', pt: 'air-hockey',
      nl: 'airhockey', pl: 'air-hockey'
    },
    icon: '🏒',
    image: 'https://images.unsplash.com/photo-1650916099935-3c32281bc0e3?q=80&w=1287&auto=format&fit=crop',
    translations: {
      es: 'Air Hockey', en: 'Air Hockey Tables', de: 'Airhockey-Tische',
      fr: 'Tables Air Hockey', it: 'Tavoli Air Hockey', pt: 'Mesas Air Hockey',
      nl: 'Airhockey Tafels', pl: 'Stoły do Air Hockey'
    },
    priceRange: { min: 200, max: 2500 },
  },
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number];

// Get category by any slug (supports all localized slugs)
export function getCategoryByAnySlug(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find(cat => {
    if (cat.slug === slug) return true;
    const slugValues = Object.values(cat.slugs) as string[];
    return slugValues.includes(slug);
  });
}

// Get localized slug for a category
export function getLocalizedSlug(category: ProductCategory, locale: string): string {
  const slugs = category.slugs as Record<string, string>;
  return slugs[locale] || category.slug;
}

// Get category by slug (supports localized slugs)
export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return getCategoryByAnySlug(slug);
}

export function formatPrice(amount: number, locale: string): string {
  return new Intl.NumberFormat(locale, { 
    style: 'currency', 
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
