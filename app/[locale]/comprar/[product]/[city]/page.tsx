import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/store/header";
import { Footer } from "@/components/store/footer";
import { CTA } from "@/components/store/cta";
import { SUPPORTED_LOCALES, type Locale, CATEGORIES, CATEGORY_TRANSLATIONS, CITIES_BY_COUNTRY } from "@/lib/seo-data";
import { Check, ArrowRight, Phone, Truck, Shield, Clock, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ locale: string; product: string; city: string }>;
}

// Get all cities flat
function getAllCities() {
  const cities: { name: string; slug: string; population: number; country: string }[] = [];
  for (const [country, countryCities] of Object.entries(CITIES_BY_COUNTRY)) {
    for (const city of countryCities) {
      cities.push({ ...city, country });
    }
  }
  return cities;
}

function getCityBySlug(slug: string) {
  return getAllCities().find(c => c.slug === slug);
}

function getTopCities(limit = 50) {
  return getAllCities().sort((a, b) => b.population - a.population).slice(0, limit);
}

// Category price data
const PRICE_DATA: Record<string, { min: number; max: number; popular: number }> = {
  'mesas-billar': { min: 800, max: 5000, popular: 1800 },
  'futbolines': { min: 300, max: 2500, popular: 800 },
  'dardos': { min: 50, max: 500, popular: 150 },
  'air-hockey': { min: 200, max: 3000, popular: 900 },
  'ping-pong': { min: 150, max: 2000, popular: 500 },
  'accesorios-juegos': { min: 10, max: 300, popular: 50 },
};

export const dynamicParams = true;
export const revalidate = 604800;

export async function generateStaticParams() {
  const topCities = getTopCities(30);
  const params: { locale: string; product: string; city: string }[] = [];
  
  for (const locale of SUPPORTED_LOCALES.slice(0, 4)) { // top 4 locales
    for (const cat of CATEGORIES) {
      for (const city of topCities.slice(0, 15)) {
        params.push({ locale, product: cat, city: city.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, product, city: citySlug } = await params;
  const validLocale = (SUPPORTED_LOCALES.includes(locale as Locale) ? locale : 'es') as Locale;
  const city = getCityBySlug(citySlug);
  const catName = CATEGORY_TRANSLATIONS[validLocale]?.[product as keyof typeof CATEGORY_TRANSLATIONS[typeof validLocale]] || product;
  const prices = PRICE_DATA[product] || PRICE_DATA['mesas-billar'];
  const year = new Date().getFullYear();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thegamesroom.io";
  
  if (!city) return { title: 'Not found' };

  // MAXIMUM commercial intent titles - these are the money keywords
  const titles: Record<string, string> = {
    es: `Comprar ${catName} en ${city.name} | Desde ${prices.min}EUR | Envio Gratis ${year}`,
    en: `Buy ${catName} in ${city.name} | From EUR${prices.min} | Free Shipping ${year}`,
    de: `${catName} in ${city.name} Kaufen | Ab ${prices.min}EUR | Gratis Versand ${year}`,
    fr: `Acheter ${catName} a ${city.name} | Des ${prices.min}EUR | Livraison Gratuite ${year}`,
    it: `Comprare ${catName} a ${city.name} | Da ${prices.min}EUR | Spedizione Gratuita ${year}`,
    pt: `Comprar ${catName} em ${city.name} | Desde ${prices.min}EUR | Envio Gratis ${year}`,
    nl: `${catName} Kopen ${city.name} | Vanaf EUR${prices.min} | Gratis Verzending ${year}`,
    pl: `Kup ${catName} ${city.name} | Od ${prices.min}EUR | Darmowa Wysylka ${year}`,
  };

  const descs: Record<string, string> = {
    es: `Comprar ${catName} en ${city.name} al mejor precio. Desde ${prices.min}EUR. Envio gratis a ${city.name}, garantia 2 anos, instalacion profesional. Presupuesto sin compromiso. Entrega rapida.`,
    en: `Buy ${catName} in ${city.name} at the best price. From EUR${prices.min}. Free shipping to ${city.name}, 2-year warranty, professional installation. Free quote. Fast delivery.`,
    de: `${catName} in ${city.name} zum besten Preis kaufen. Ab ${prices.min}EUR. Kostenloser Versand nach ${city.name}, 2 Jahre Garantie, professionelle Installation.`,
    fr: `Acheter ${catName} a ${city.name} au meilleur prix. Des ${prices.min}EUR. Livraison gratuite a ${city.name}, garantie 2 ans, installation professionnelle.`,
  };

  return {
    title: (titles[validLocale] || titles.es).slice(0, 60),
    description: (descs[validLocale] || descs.es).slice(0, 160),
    alternates: { canonical: `${siteUrl}/${locale}/comprar/${product}/${citySlug}` },
    openGraph: {
      title: titles[validLocale] || titles.es,
      description: descs[validLocale] || descs.es,
      type: 'website',
      siteName: 'The Games Room',
    },
    robots: { index: true, follow: true },
  };
}

export default async function BuyProductCityPage({ params }: PageProps) {
  const { locale, product, city: citySlug } = await params;
  const validLocale = (SUPPORTED_LOCALES.includes(locale as Locale) ? locale : 'es') as Locale;
  const city = getCityBySlug(citySlug);
  
  if (!city || !CATEGORIES.includes(product as typeof CATEGORIES[number])) {
    notFound();
  }

  const catName = CATEGORY_TRANSLATIONS[validLocale]?.[product as keyof typeof CATEGORY_TRANSLATIONS[typeof validLocale]] || product;
  const prices = PRICE_DATA[product] || PRICE_DATA['mesas-billar'];
  const year = new Date().getFullYear();
  const nearbyCities = getTopCities(50).filter(c => c.slug !== citySlug).slice(0, 8);
  const otherProducts = CATEGORIES.filter(c => c !== product);

  const t: Record<string, Record<string, string>> = {
    es: { buy: 'Comprar', in: 'en', from: 'Desde', quote: 'Solicitar Presupuesto Gratis', catalog: 'Ver Catalogo Completo', warranty: 'Garantia 2 Anos', shipping: 'Envio Gratis', install: 'Instalacion Profesional', fast: 'Entrega Rapida', whyTitle: 'Por que comprar con nosotros', priceTitle: 'Precios', popularPrice: 'Precio mas popular', faq: 'Preguntas Frecuentes', otherProducts: 'Otros productos en', otherCities: 'en otras ciudades', ready: 'Listo para tu', contact: 'Contactar Ahora' },
    en: { buy: 'Buy', in: 'in', from: 'From', quote: 'Request Free Quote', catalog: 'View Full Catalog', warranty: '2 Year Warranty', shipping: 'Free Shipping', install: 'Professional Installation', fast: 'Fast Delivery', whyTitle: 'Why buy from us', priceTitle: 'Prices', popularPrice: 'Most popular price', faq: 'FAQ', otherProducts: 'Other products in', otherCities: 'in other cities', ready: 'Ready for your', contact: 'Contact Now' },
    de: { buy: 'Kaufen', in: 'in', from: 'Ab', quote: 'Kostenloses Angebot', catalog: 'Katalog Ansehen', warranty: '2 Jahre Garantie', shipping: 'Kostenloser Versand', install: 'Professionelle Installation', fast: 'Schnelle Lieferung', whyTitle: 'Warum bei uns kaufen', priceTitle: 'Preise', popularPrice: 'Beliebtester Preis', faq: 'FAQ', otherProducts: 'Andere Produkte in', otherCities: 'in anderen Stadten', ready: 'Bereit fur', contact: 'Jetzt Kontaktieren' },
    fr: { buy: 'Acheter', in: 'a', from: 'Des', quote: 'Devis Gratuit', catalog: 'Voir le Catalogue', warranty: 'Garantie 2 Ans', shipping: 'Livraison Gratuite', install: 'Installation Professionnelle', fast: 'Livraison Rapide', whyTitle: 'Pourquoi acheter chez nous', priceTitle: 'Prix', popularPrice: 'Prix le plus populaire', faq: 'FAQ', otherProducts: 'Autres produits a', otherCities: 'dans d\'autres villes', ready: 'Pret pour', contact: 'Contacter' },
  };
  const txt = t[validLocale] || t.es;

  // Product schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${catName} ${city.name}`,
    "description": `${txt.buy} ${catName} ${txt.in} ${city.name}. ${txt.from} ${prices.min}EUR.`,
    "brand": { "@type": "Brand", "name": "The Games Room" },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "EUR",
      "lowPrice": prices.min,
      "highPrice": prices.max,
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": "The Games Room" }
    },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "347", "bestRating": "5" }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `The Games Room - ${city.name}`,
    "address": { "@type": "PostalAddress", "addressLocality": city.name, "addressCountry": city.country },
    "areaServed": [{ "@type": "City", "name": city.name }, ...nearbyCities.slice(0, 4).map(c => ({ "@type": "City" as const, "name": c.name }))],
    "priceRange": "EUR-EUREUR"
  };

  // FAQs
  const faqs: Record<string, { q: string; a: string }[]> = {
    es: [
      { q: `Cuanto cuesta ${catName.toLowerCase()} en ${city.name}?`, a: `Los precios de ${catName.toLowerCase()} en ${city.name} van desde ${prices.min}EUR hasta ${prices.max}EUR. El modelo mas vendido cuesta alrededor de ${prices.popular}EUR. Todos incluyen garantia de 2 anos.` },
      { q: `El envio a ${city.name} es gratis?`, a: `Si, ofrecemos envio gratuito a ${city.name} y toda la zona. Tiempo de entrega: 5-10 dias laborables. Instalacion profesional disponible.` },
      { q: `Puedo ver los productos antes de comprar?`, a: `Puedes solicitar un presupuesto sin compromiso con fotos detalladas y especificaciones. Tambien ofrecemos 30 dias de garantia de satisfaccion.` },
      { q: `Que garantia tienen?`, a: `Todos nuestros productos tienen 2 anos de garantia completa. Incluye servicio tecnico y repuestos.` },
    ],
    en: [
      { q: `How much does ${catName.toLowerCase()} cost in ${city.name}?`, a: `${catName} prices in ${city.name} range from EUR${prices.min} to EUR${prices.max}. The best-selling model costs around EUR${prices.popular}. All include 2-year warranty.` },
      { q: `Is shipping to ${city.name} free?`, a: `Yes, we offer free shipping to ${city.name} and surrounding areas. Delivery time: 5-10 business days. Professional installation available.` },
      { q: `Can I see products before buying?`, a: `You can request a no-obligation quote with detailed photos and specifications. We also offer a 30-day satisfaction guarantee.` },
      { q: `What warranty do they have?`, a: `All our products have a full 2-year warranty. Includes technical service and spare parts.` },
    ],
  };
  const faqItems = faqs[validLocale] || faqs.es;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question", "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a }
    }))
  };

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
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
            <li className="text-foreground">{txt.buy} {txt.in} {city.name}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-6">
                {`The Games Room — ${city.name} — ${year}`}
              </p>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light leading-[1.1] text-foreground mb-6">
                {txt.buy} {catName}
                <span className="block italic text-muted-foreground mt-1">{txt.in} {city.name}</span>
              </h1>
              
              <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-xl">
                {validLocale === 'es' 
                  ? `Descubre la mejor seleccion de ${catName.toLowerCase()} en ${city.name}. Precios competitivos, envio gratuito e instalacion profesional. Garantia de 2 anos en todos los modelos.`
                  : `Discover the best selection of ${catName.toLowerCase()} in ${city.name}. Competitive prices, free shipping and professional installation. 2-year warranty on all models.`
                }
              </p>

              {/* Price highlight */}
              <div className="flex items-baseline gap-6 mb-8">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-1">{txt.from}</p>
                  <p className="text-4xl font-serif font-light text-foreground">{prices.min}{'EUR'}</p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-1">{txt.popularPrice}</p>
                  <p className="text-4xl font-serif font-light text-accent">{prices.popular}{'EUR'}</p>
                </div>
              </div>

              {/* CTAs */}
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

        {/* Trust bar */}
        <section className="py-6 border-y border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Truck, text: txt.shipping },
                { icon: Shield, text: txt.warranty },
                { icon: Clock, text: txt.fast },
                { icon: Star, text: `4.8/5 — 347+ reviews` },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-accent flex-shrink-0" />
                  <p className="text-[11px] uppercase tracking-[0.12em] text-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <h2 className="text-2xl md:text-3xl font-serif font-light text-foreground mb-12">
              {txt.whyTitle}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Truck, title: txt.shipping, desc: validLocale === 'es' ? `Entrega e instalacion gratuita en ${city.name} y alrededores. 5-10 dias laborables.` : `Free delivery and installation in ${city.name} and surrounding areas. 5-10 business days.` },
                { icon: Shield, title: txt.warranty, desc: validLocale === 'es' ? 'Garantia completa en todos los modelos. Servicio tecnico incluido.' : 'Full warranty on all models. Technical service included.' },
                { icon: Clock, title: txt.install, desc: validLocale === 'es' ? 'Equipo de instaladores profesionales. Montaje y nivelacion incluidos.' : 'Professional installation team. Assembly and leveling included.' },
                { icon: Star, title: '4.8/5', desc: validLocale === 'es' ? 'Mas de 3.000 clientes satisfechos en toda Europa. 500+ resenas verificadas.' : 'Over 3,000 happy customers across Europe. 500+ verified reviews.' },
              ].map((item, i) => (
                <div key={i} className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 border border-border rounded-full">
                    <item.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <h3 className="font-medium text-foreground text-sm mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-secondary">
          <div className="mx-auto max-w-4xl px-6 lg:px-12">
            <h2 className="text-2xl md:text-3xl font-serif font-light text-foreground mb-12">
              {txt.faq}: {catName} {txt.in} {city.name}
            </h2>
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

        {/* CTA block */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="bg-foreground text-background p-12 lg:p-16 text-center">
              <h2 className="text-2xl lg:text-4xl font-serif font-light mb-4">
                {txt.ready} {catName.toLowerCase()} {txt.in} {city.name}?
              </h2>
              <p className="text-background/60 mb-8 max-w-xl mx-auto text-sm">
                {validLocale === 'es' ? 'Solicita tu presupuesto sin compromiso. Respondemos en menos de 24 horas.' : 'Request your free quote. We respond within 24 hours.'}
              </p>
              <Button size="lg" variant="secondary" className="h-14 px-10 text-xs uppercase tracking-[0.2em] font-medium rounded-none">
                <Phone className="mr-2 h-4 w-4" />
                {txt.contact}
              </Button>
            </div>
          </div>
        </section>

        {/* Internal links - Other products in same city */}
        <section className="py-16 bg-secondary">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <h2 className="text-xl font-serif font-light text-foreground mb-8">
              {txt.otherProducts} {city.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {otherProducts.map((cat) => {
                const name = CATEGORY_TRANSLATIONS[validLocale]?.[cat as keyof typeof CATEGORY_TRANSLATIONS[typeof validLocale]] || cat;
                return (
                  <Link key={cat} href={`/${locale}/comprar/${cat}/${citySlug}`} className="p-4 bg-background hover:shadow-md transition-shadow text-center">
                    <p className="font-medium text-sm text-foreground capitalize">{name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{txt.from} {PRICE_DATA[cat]?.min || 100}{'EUR'}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Internal links - Same product in other cities */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <h2 className="text-xl font-serif font-light text-foreground mb-8">
              {catName} {txt.otherCities}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {nearbyCities.map((c) => (
                <Link key={c.slug} href={`/${locale}/comprar/${product}/${c.slug}`} className="p-3 bg-secondary hover:bg-muted transition-colors text-center">
                  <p className="text-sm text-foreground">{c.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTA locale={validLocale} />
      </main>

      <Footer locale={validLocale} />
    </div>
  );
}
