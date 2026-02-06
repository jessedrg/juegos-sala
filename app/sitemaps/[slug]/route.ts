import { SUPPORTED_LOCALES, CATEGORIES, CATEGORY_TRANSLATIONS, LOCALES, INTENT_TRANSLATIONS, type Locale } from "@/lib/seo-data";
import citiesData from "@/lib/cities-processed.json";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://thegamesroom.io";

// Type for cities data
type CityData = { name: string; slug: string; population: number };
const CITIES_DB = citiesData as Record<string, CityData[]>;

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const cleanLocale = slug.replace('.xml', '') as Locale;
  
  if (!SUPPORTED_LOCALES.includes(cleanLocale)) {
    return new Response("Not found", { status: 404 });
  }

  const urls: string[] = [];
  const prefix = `${BASE_URL}/${cleanLocale}`;
  const catTranslations = CATEGORY_TRANSLATIONS[cleanLocale] || CATEGORY_TRANSLATIONS.en;
  const intentTranslations = INTENT_TRANSLATIONS[cleanLocale] || INTENT_TRANSLATIONS.en;

  // Get cities for this locale's countries from massive database
  const localeData = LOCALES[cleanLocale];
  const cities: string[] = [];
  for (const country of localeData.countries) {
    const countryCities = CITIES_DB[country];
    if (countryCities) {
      // Take top 500 cities per country by population for manageable sitemap size
      cities.push(...countryCities.slice(0, 500).map((c: CityData) => c.slug));
    }
  }

  // 1. PURE CATEGORY PAGES (10 URLs)
  for (const cat of CATEGORIES) {
    const catSlug = catTranslations[cat].replace(/ /g, '-');
    urls.push(`${prefix}/${catSlug}`);
  }

  // 2. INTENT + CATEGORY combinations (20 intents x 10 categories = 200 URLs)
  const topIntents = ['buy', 'best', 'cheap', 'premium', 'organic', 'online', 'delivery', 'near-me'] as const;
  for (const intentKey of topIntents) {
    const intentSlug = intentTranslations[intentKey]?.replace(/ /g, '-');
    if (!intentSlug) continue;
    for (const cat of CATEGORIES) {
      const catSlug = catTranslations[cat].replace(/ /g, '-');
      urls.push(`${prefix}/${intentSlug}-${catSlug}`);
    }
  }

  // 3. CATEGORY + CITY (10 categories x cities = many URLs)
  for (const city of cities) {
    for (const cat of CATEGORIES) {
      const catSlug = catTranslations[cat].replace(/ /g, '-');
      urls.push(`${prefix}/${catSlug}-${city}`);
    }
  }

  // 4. HIGH-VALUE: INTENT + CATEGORY + CITY
  const highIntents = ['buy', 'best', 'online', 'delivery'] as const;
  const topCategories = CATEGORIES.slice(0, 5); // Top 5 categories
  
  for (const city of cities.slice(0, 20)) { // Top 20 cities
    for (const intentKey of highIntents) {
      const intentSlug = intentTranslations[intentKey]?.replace(/ /g, '-');
      if (!intentSlug) continue;
      for (const cat of topCategories) {
        const catSlug = catTranslations[cat].replace(/ /g, '-');
        urls.push(`${prefix}/${intentSlug}-${catSlug}-${city}`);
      }
    }
  }

  // 5. NEW: /comprar/[product]/[city] transactional pages (highest intent)
  for (const cat of CATEGORIES) {
    for (const city of cities.slice(0, 30)) {
      urls.push(`${prefix}/comprar/${cat}/${city}`);
    }
  }

  // 6. NEW: /guias/[intent]/[product] guide pages
  const intentSlugs: Record<string, string[]> = {
    es: ['mejor', 'guia', 'comparar', 'precios', 'profesional', 'barato', 'comprar', 'opiniones'],
    en: ['best', 'guide', 'compare', 'prices', 'professional', 'cheap', 'buy', 'reviews'],
    de: ['kaufen'],
    fr: ['acheter'],
  };
  const localeIntents = intentSlugs[cleanLocale] || [];
  for (const intentSlug of localeIntents) {
    for (const cat of CATEGORIES) {
      urls.push(`${prefix}/guias/${intentSlug}/${cat}`);
    }
  }

  // 7. Game room-specific modifiers
  const gameModifiers: Record<string, string[]> = {
    es: ['profesional', 'domestico', 'barato', 'premium', 'oferta', 'calidad'],
    en: ['professional', 'home', 'cheap', 'premium', 'sale', 'quality'],
    de: ['professionell', 'heim', 'guenstig', 'premium', 'angebot', 'qualitaet'],
    fr: ['professionnel', 'maison', 'pas-cher', 'premium', 'promo', 'qualite'],
    it: ['professionale', 'casa', 'economico', 'premium', 'offerta', 'qualita'],
    pt: ['profissional', 'casa', 'barato', 'premium', 'oferta', 'qualidade'],
    nl: ['professioneel', 'thuis', 'goedkoop', 'premium', 'aanbieding', 'kwaliteit'],
    pl: ['profesjonalny', 'domowy', 'tani', 'premium', 'promocja', 'jakosc'],
    cs: ['profesionalni', 'domaci', 'levny', 'premium', 'akce', 'kvalita'],
    el: ['epaggelmatiko', 'spitiko', 'ftino', 'premium', 'prosfora', 'poiotita'],
  };

  const modifiers = gameModifiers[cleanLocale] || gameModifiers.en;
  for (const modifier of modifiers) {
    for (const cat of CATEGORIES.slice(0, 5)) {
      const catSlug = catTranslations[cat].replace(/ /g, '-');
      urls.push(`${prefix}/${catSlug}-${modifier}`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url><loc>${url}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
