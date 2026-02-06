import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/store/header";
import { Footer } from "@/components/store/footer";
import { CTA } from "@/components/store/cta";
import { SUPPORTED_LOCALES, type Locale, CATEGORIES, CATEGORY_TRANSLATIONS, CITIES_BY_COUNTRY } from "@/lib/seo-data";
import { Check, ArrowRight, Phone, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ locale: string; intent: string; product: string }>;
}

// Intent types we want to rank for
const VALID_INTENTS = ['mejor', 'best', 'guia', 'guide', 'comparar', 'compare', 'precios', 'prices', 'profesional', 'professional', 'barato', 'cheap', 'comprar', 'buy', 'kaufen', 'acheter', 'opiniones', 'reviews'] as const;

const INTENT_HEADINGS: Record<string, Record<string, { h1: string; subtitle: string }>> = {
  es: {
    mejor: { h1: 'Mejores', subtitle: 'Seleccion premium de los mejores modelos del mercado con garantia de calidad' },
    guia: { h1: 'Guia de Compra:', subtitle: 'Todo lo que necesitas saber para elegir el modelo perfecto para tu hogar' },
    comparar: { h1: 'Comparar', subtitle: 'Compara modelos, precios y caracteristicas para encontrar tu opcion ideal' },
    precios: { h1: 'Precios de', subtitle: 'Tabla de precios actualizada con todos los modelos disponibles' },
    profesional: { h1: 'Profesionales', subtitle: 'Modelos de gama alta para jugadores exigentes y salas de juego profesionales' },
    barato: { h1: 'Baratos', subtitle: 'Los mejores modelos relacion calidad-precio sin renunciar a la calidad' },
    comprar: { h1: 'Comprar', subtitle: 'Tu tienda online especializada con envio gratis y garantia 2 anos' },
    opiniones: { h1: 'Opiniones sobre', subtitle: 'Resenas reales de clientes verificados que han comprado con nosotros' },
  },
  en: {
    best: { h1: 'Best', subtitle: 'Premium selection of the best models on the market with quality guarantee' },
    guide: { h1: 'Buying Guide:', subtitle: 'Everything you need to know to choose the perfect model for your home' },
    compare: { h1: 'Compare', subtitle: 'Compare models, prices and features to find your ideal option' },
    prices: { h1: 'Prices for', subtitle: 'Updated price table with all available models' },
    professional: { h1: 'Professional', subtitle: 'High-end models for discerning players and professional game rooms' },
    cheap: { h1: 'Affordable', subtitle: 'Best value-for-money models without sacrificing quality' },
    buy: { h1: 'Buy', subtitle: 'Your specialized online store with free shipping and 2-year warranty' },
    reviews: { h1: 'Reviews of', subtitle: 'Real reviews from verified customers who bought from us' },
  },
  de: {
    kaufen: { h1: 'Kaufen', subtitle: 'Ihr spezialisierter Online-Shop mit kostenlosem Versand und 2 Jahren Garantie' },
  },
  fr: {
    acheter: { h1: 'Acheter', subtitle: 'Votre boutique en ligne specialisee avec livraison gratuite et garantie 2 ans' },
  },
};

// Price data
const PRICE_DATA: Record<string, { min: number; max: number; popular: number }> = {
  'mesas-billar': { min: 800, max: 5000, popular: 1800 },
  'futbolines': { min: 300, max: 2500, popular: 800 },
  'dardos': { min: 50, max: 500, popular: 150 },
  'air-hockey': { min: 200, max: 3000, popular: 900 },
  'ping-pong': { min: 150, max: 2000, popular: 500 },
  'accesorios-juegos': { min: 10, max: 300, popular: 50 },
};

// Product tiers for comparison tables
const PRODUCT_TIERS: Record<string, Record<string, { name: string; price: string; features: string[] }[]>> = {
  'mesas-billar': {
    es: [
      { name: 'Basica', price: '800-1.200EUR', features: ['MDF', '6-7 pies', 'Pano estandar', 'Uso ocasional'] },
      { name: 'Media', price: '1.200-2.500EUR', features: ['Pizarra natural', '7-8 pies', 'Pano lana', 'Uso regular'] },
      { name: 'Premium', price: '2.500-5.000EUR', features: ['Pizarra 3 piezas', '8-9 pies', 'Pano Simonis', 'Competicion'] },
    ],
    en: [
      { name: 'Basic', price: 'EUR800-1,200', features: ['MDF surface', '6-7 foot', 'Standard cloth', 'Occasional use'] },
      { name: 'Mid-range', price: 'EUR1,200-2,500', features: ['Natural slate', '7-8 foot', 'Wool cloth', 'Regular use'] },
      { name: 'Premium', price: 'EUR2,500-5,000', features: ['3-piece slate', '8-9 foot', 'Simonis cloth', 'Competition'] },
    ],
  },
  'futbolines': {
    es: [
      { name: 'Basico', price: '300-600EUR', features: ['Barras telescopicas', 'Estructura MDF', 'Uso familiar'] },
      { name: 'Medio', price: '600-1.200EUR', features: ['Barras acero', 'Jugadores aluminio', 'Semi-profesional'] },
      { name: 'Premium', price: '1.200-2.500EUR', features: ['Homologado ITSF', 'Cristal templado', 'Competicion'] },
    ],
    en: [
      { name: 'Basic', price: 'EUR300-600', features: ['Telescoping rods', 'MDF structure', 'Family use'] },
      { name: 'Mid-range', price: 'EUR600-1,200', features: ['Steel rods', 'Aluminium players', 'Semi-professional'] },
      { name: 'Premium', price: 'EUR1,200-2,500', features: ['ITSF certified', 'Tempered glass', 'Competition'] },
    ],
  },
};

function getTopCities(limit = 20) {
  const cities: { name: string; slug: string; population: number; country: string }[] = [];
  for (const [country, countryCities] of Object.entries(CITIES_BY_COUNTRY)) {
    for (const city of countryCities) {
      cities.push({ ...city, country });
    }
  }
  return cities.sort((a, b) => b.population - a.population).slice(0, limit);
}

export const dynamicParams = true;
export const revalidate = 604800;

export async function generateStaticParams() {
  const params: { locale: string; intent: string; product: string }[] = [];
  const intentsPerLocale: Record<string, string[]> = {
    es: ['mejor', 'guia', 'comparar', 'precios', 'profesional', 'barato', 'comprar', 'opiniones'],
    en: ['best', 'guide', 'compare', 'prices', 'professional', 'cheap', 'buy', 'reviews'],
    de: ['kaufen'],
    fr: ['acheter'],
  };
  
  for (const [locale, intents] of Object.entries(intentsPerLocale)) {
    for (const intent of intents) {
      for (const cat of CATEGORIES) {
        params.push({ locale, intent, product: cat });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, intent, product } = await params;
  const validLocale = (SUPPORTED_LOCALES.includes(locale as Locale) ? locale : 'es') as Locale;
  const catName = CATEGORY_TRANSLATIONS[validLocale]?.[product as keyof typeof CATEGORY_TRANSLATIONS[typeof validLocale]] || product;
  const prices = PRICE_DATA[product] || PRICE_DATA['mesas-billar'];
  const year = new Date().getFullYear();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thegamesroom.io";

  if (!VALID_INTENTS.includes(intent as typeof VALID_INTENTS[number])) {
    return { title: 'Not found' };
  }

  const heading = INTENT_HEADINGS[validLocale]?.[intent] || INTENT_HEADINGS.es?.[intent] || INTENT_HEADINGS.en?.[intent];
  if (!heading) return { title: 'Not found' };

  const titles: Record<string, string> = {
    es: `${heading.h1} ${catName} ${year} | Desde ${prices.min}EUR | Envio Gratis`,
    en: `${heading.h1} ${catName} ${year} | From EUR${prices.min} | Free Shipping`,
    de: `${heading.h1} ${catName} ${year} | Ab ${prices.min}EUR | Gratis Versand`,
    fr: `${heading.h1} ${catName} ${year} | Des ${prices.min}EUR | Livraison Gratuite`,
  };

  const descs: Record<string, string> = {
    es: `${heading.h1} ${catName} ${year}. ${heading.subtitle}. Precios desde ${prices.min}EUR. Envio gratis, garantia 2 anos. Guia experta actualizada.`,
    en: `${heading.h1} ${catName} ${year}. ${heading.subtitle}. Prices from EUR${prices.min}. Free shipping, 2-year warranty. Updated expert guide.`,
  };

  return {
    title: (titles[validLocale] || titles.es).slice(0, 60),
    description: (descs[validLocale] || descs.es).slice(0, 160),
    alternates: { canonical: `${siteUrl}/${locale}/${intent}/${product}` },
    openGraph: { title: titles[validLocale] || titles.es, description: descs[validLocale] || descs.es, type: 'website', siteName: 'The Games Room' },
    robots: { index: true, follow: true },
  };
}

export default async function IntentProductPage({ params }: PageProps) {
  const { locale, intent, product } = await params;
  const validLocale = (SUPPORTED_LOCALES.includes(locale as Locale) ? locale : 'es') as Locale;
  
  if (!VALID_INTENTS.includes(intent as typeof VALID_INTENTS[number]) || !CATEGORIES.includes(product as typeof CATEGORIES[number])) {
    notFound();
  }

  const catName = CATEGORY_TRANSLATIONS[validLocale]?.[product as keyof typeof CATEGORY_TRANSLATIONS[typeof validLocale]] || product;
  const prices = PRICE_DATA[product] || PRICE_DATA['mesas-billar'];
  const year = new Date().getFullYear();
  const heading = INTENT_HEADINGS[validLocale]?.[intent] || INTENT_HEADINGS.es?.[intent] || INTENT_HEADINGS.en?.[intent];
  const topCities = getTopCities(12);
  const otherProducts = CATEGORIES.filter(c => c !== product);
  const tiers = PRODUCT_TIERS[product]?.[validLocale] || PRODUCT_TIERS[product]?.es || PRODUCT_TIERS['mesas-billar']?.es || [];

  if (!heading) notFound();

  const isEs = validLocale === 'es';
  const txt = {
    from: isEs ? 'Desde' : 'From',
    quote: isEs ? 'Solicitar Presupuesto' : 'Request Quote',
    catalog: isEs ? 'Ver Catalogo' : 'View Catalog',
    compare: isEs ? 'Comparativa de precios' : 'Price comparison',
    features: isEs ? 'Caracteristicas' : 'Features',
    range: isEs ? 'Rango de precio' : 'Price range',
    tier: isEs ? 'Gama' : 'Tier',
    buyIn: isEs ? 'Comprar en' : 'Buy in',
    otherGuides: isEs ? 'Otras guias' : 'Other guides',
    faq: isEs ? 'Preguntas frecuentes' : 'FAQ',
  };

  // FAQs tailored to intent
  const faqItems = isEs ? [
    { q: `Cual es ${intent === 'mejor' ? 'la mejor' : 'la mas recomendada'} ${catName.toLowerCase()}?`, a: `Depende de tu uso. Para hogar, recomendamos modelos de gama media (desde ${prices.popular}EUR). Para uso profesional, las gamas premium (desde ${Math.round(prices.max * 0.6)}EUR) ofrecen mejor rendimiento y durabilidad.` },
    { q: `Cuanto cuesta ${catName.toLowerCase()} de calidad?`, a: `Un buen modelo de ${catName.toLowerCase()} cuesta entre ${prices.min}EUR y ${prices.max}EUR. El rango mas vendido esta entre ${prices.popular}EUR y ${Math.round(prices.popular * 1.5)}EUR, ofreciendo excelente relacion calidad-precio.` },
    { q: `Merece la pena comprar ${catName.toLowerCase()} online?`, a: `Si. Comprar online te da acceso a mejor seleccion, precios competitivos y envio gratis. Ademas, ofrecemos 30 dias de satisfaccion garantizada y 2 anos de garantia.` },
  ] : [
    { q: `What is the ${intent === 'best' ? 'best' : 'most recommended'} ${catName.toLowerCase()}?`, a: `It depends on your use. For home, we recommend mid-range models (from EUR${prices.popular}). For professional use, premium ranges (from EUR${Math.round(prices.max * 0.6)}) offer better performance and durability.` },
    { q: `How much does a quality ${catName.toLowerCase()} cost?`, a: `A good ${catName.toLowerCase()} costs between EUR${prices.min} and EUR${prices.max}. The best-selling range is EUR${prices.popular} to EUR${Math.round(prices.popular * 1.5)}, offering excellent value.` },
    { q: `Is it worth buying ${catName.toLowerCase()} online?`, a: `Yes. Buying online gives you access to better selection, competitive prices and free shipping. Plus, we offer a 30-day satisfaction guarantee and 2-year warranty.` },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({ "@type": "Question", "name": item.q, "acceptedAnswer": { "@type": "Answer", "text": item.a } }))
  };

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <Header locale={validLocale} />
      
      <main className="pt-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-6 lg:px-12 pt-6">
          <ol className="flex items-center flex-wrap gap-1 text-[11px] text-muted-foreground">
            <li><Link href={`/${locale}`} className="hover:text-foreground transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href={`/${locale}/${product}`} className="hover:text-foreground transition-colors">{catName}</Link></li>
            <li>/</li>
            <li className="text-foreground capitalize">{intent}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-6">
                {`The Games Room — ${year}`}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light leading-[1.1] text-foreground mb-6">
                {heading.h1}
                <span className="block italic text-muted-foreground mt-1">{catName}</span>
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-xl">
                {heading.subtitle}
              </p>
              
              <div className="mb-8">
                <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-1">{txt.from}</p>
                <p className="text-4xl font-serif font-light text-foreground">{prices.min}{'EUR'}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-14 px-8 text-xs uppercase tracking-[0.2em] font-medium rounded-none bg-foreground text-background hover:bg-foreground/90">
                  <Phone className="mr-2 h-4 w-4" />
                  {txt.quote}
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-8 text-xs uppercase tracking-[0.2em] font-medium rounded-none" asChild>
                  <Link href={`/${locale}/${product}`}>
                    {txt.catalog}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        {tiers.length > 0 && (
          <section className="py-20 bg-secondary">
            <div className="mx-auto max-w-5xl px-6 lg:px-12">
              <h2 className="text-2xl md:text-3xl font-serif font-light text-foreground mb-12">
                {txt.compare}: {catName} {year}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {tiers.map((tier, i) => (
                  <div key={i} className={`bg-background p-8 ${i === 1 ? 'ring-2 ring-accent' : 'border border-border'}`}>
                    {i === 1 && <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-medium mb-4">{isEs ? 'Mas vendido' : 'Best seller'}</p>}
                    <h3 className="text-lg font-serif font-light text-foreground mb-2">{tier.name}</h3>
                    <p className="text-2xl font-serif font-light text-foreground mb-6">{tier.price}</p>
                    <ul className="flex flex-col gap-3">
                      {tier.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-12">
            <h2 className="text-2xl md:text-3xl font-serif font-light text-foreground mb-12">{txt.faq}</h2>
            <div className="flex flex-col">
              {faqItems.map((item, i) => (
                <details key={i} className="group border-b border-border" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden" itemProp="name">
                    <h3 className="text-[15px] font-medium text-foreground pr-4">{item.q}</h3>
                    <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="pb-5 pr-8" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-sm text-muted-foreground leading-relaxed" itemProp="text">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* City links - massive internal linking */}
        <section className="py-16 bg-secondary">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <h2 className="text-xl font-serif font-light text-foreground mb-8">{txt.buyIn}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {topCities.map((city) => (
                <Link key={city.slug} href={`/${locale}/comprar/${product}/${city.slug}`} className="p-3 bg-background hover:shadow-md transition-shadow text-center">
                  <p className="text-sm text-foreground">{city.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Other product guides */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <h2 className="text-xl font-serif font-light text-foreground mb-8">{txt.otherGuides}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {otherProducts.map((cat) => {
                const name = CATEGORY_TRANSLATIONS[validLocale]?.[cat as keyof typeof CATEGORY_TRANSLATIONS[typeof validLocale]] || cat;
                return (
                  <Link key={cat} href={`/${locale}/${intent}/${cat}`} className="p-4 bg-secondary hover:bg-muted transition-colors text-center">
                    <p className="font-medium text-sm text-foreground capitalize">{name}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <CTA locale={validLocale} />
      </main>

      <Footer locale={validLocale} />
    </div>
  );
}
