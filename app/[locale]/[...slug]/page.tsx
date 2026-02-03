import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/store/header";
import { Features } from "@/components/store/features";
import { CTA } from "@/components/store/cta";
import { Footer } from "@/components/store/footer";
import { SUPPORTED_LOCALES, type Locale } from "@/lib/seo-data";
import { ArrowRight, Check, Star } from "lucide-react";
import { SEOHead, FAQSection, type SEOData } from "@/components/seo/programmatic-seo";
import { IntercomButton } from "@/components/pages/intercom-button";
import { ShopifyProducts } from "@/components/store/shopify-products";

interface PageProps {
  params: Promise<{ locale: string; slug: string[] }>;
}

// Category data for game room products
const CATEGORIES = [
  { 
    slug: 'mesas-billar',
    image: 'https://images.unsplash.com/photo-1695727008212-5d46172962b6?q=80&w=1336&auto=format&fit=crop',
    price: '800€',
    names: { es: 'Mesas de Billar', en: 'Pool Tables', de: 'Billardtische', fr: 'Tables de Billard' },
    desc: { es: 'Mesas de billar profesionales y domésticas. Calidad premium garantizada.', en: 'Professional and home pool tables. Premium quality guaranteed.', de: 'Professionelle und Heim-Billardtische. Premium-Qualität garantiert.', fr: 'Tables de billard professionnelles et domestiques. Qualité premium garantie.' }
  },
  { 
    slug: 'futbolines',
    image: 'https://images.unsplash.com/photo-1690073938628-359f281dcabb?q=80&w=1287&auto=format&fit=crop',
    price: '300€',
    names: { es: 'Futbolines', en: 'Foosball Tables', de: 'Tischfußball', fr: 'Baby-foot' },
    desc: { es: 'Futbolines para toda la familia. Diversión garantizada.', en: 'Foosball tables for the whole family. Fun guaranteed.', de: 'Tischfußball für die ganze Familie. Spaß garantiert.', fr: 'Baby-foot pour toute la famille. Plaisir garanti.' }
  },
  { 
    slug: 'dardos',
    image: 'https://images.unsplash.com/photo-1638430325415-2f2cc6ae838f?q=80&w=1287&auto=format&fit=crop',
    price: '50€',
    names: { es: 'Dianas y Dardos', en: 'Dart Boards', de: 'Dartscheiben', fr: 'Cibles de Fléchettes' },
    desc: { es: 'Dianas electrónicas y clásicas. Para profesionales y aficionados.', en: 'Electronic and classic dart boards. For professionals and amateurs.', de: 'Elektronische und klassische Dartscheiben. Für Profis und Amateure.', fr: 'Cibles électroniques et classiques. Pour professionnels et amateurs.' }
  },
  { 
    slug: 'air-hockey',
    image: 'https://images.unsplash.com/photo-1650916099935-3c32281bc0e3?q=80&w=1287&auto=format&fit=crop',
    price: '200€',
    names: { es: 'Air Hockey', en: 'Air Hockey Tables', de: 'Airhockey-Tische', fr: 'Tables Air Hockey' },
    desc: { es: 'Mesas de air hockey. Acción y velocidad en tu sala de juegos.', en: 'Air hockey tables. Action and speed in your game room.', de: 'Airhockey-Tische. Action und Geschwindigkeit in Ihrem Spielzimmer.', fr: 'Tables air hockey. Action et vitesse dans votre salle de jeux.' }
  },
];

function getCategoryBySlug(slug: string) {
  return CATEGORIES.find(c => c.slug === slug || slug.includes(c.slug));
}

const SITE_URL = "https://thegamesroom.io";

// Dynamic metadata for Google SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const validLocale = (SUPPORTED_LOCALES.includes(locale as Locale) ? locale : 'es') as Locale;
  const category = getCategoryBySlug(slug?.[0] || '');
  
  const catName = category?.names[validLocale as keyof typeof category.names] || category?.names.es || 'Juegos de Sala';
  const catDesc = category?.desc[validLocale as keyof typeof category.desc] || category?.desc.es || 'Mesas de billar, futbolines, dardos y air hockey para tu hogar.';
  const ogImage = category?.image ? `${category.image.split('?')[0]}?w=1200&h=630&fit=crop&q=80` : 'https://images.unsplash.com/photo-1647633391986-4614f2ee0ca4?w=1200&h=630&fit=crop&q=80';
  
  const title = `${catName} | The Games Room`;
  const description = `${catDesc} Garantía 2 años, envío gratis en toda España.`;
  const canonicalUrl = `${SITE_URL}/${locale}/${slug?.join('/') || ''}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'The Games Room',
      locale: locale === 'es' ? 'es_ES' : locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: catName }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const validLocale = SUPPORTED_LOCALES.includes(locale as Locale) ? locale as Locale : 'es';
  const category = getCategoryBySlug(slug?.[0] || '');
  
  const catName = category?.names[validLocale as keyof typeof category.names] || category?.names.es || 'Juegos de Sala';
  const catDesc = category?.desc[validLocale as keyof typeof category.desc] || category?.desc.es || '';
  const catImage = category?.image || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=800&fit=crop';
  const catPrice = category?.price || '2.500€';
  
  // Related categories
  const relatedCategories = CATEGORIES.filter(c => c.slug !== category?.slug).slice(0, 3);

  // SEO Data for Schema and FAQs
  const seoData: SEOData = {
    locale: validLocale as SEOData['locale'],
    pageType: 'category',
    product: catName,
    productSlug: category?.slug || 'juegos-sala',
    priceMin: parseInt(catPrice.replace(/[^0-9]/g, '')) || 200,
    priceMax: parseInt(catPrice.replace(/[^0-9]/g, '')) * 10 || 5000,
    brand: 'The Games Room',
    domain: 'thegamesroom.io',
    warranty: '2 años',
    relatedProducts: relatedCategories.map(c => ({
      name: c.names[validLocale as keyof typeof c.names] || c.names.es,
      slug: c.slug,
      price: c.price
    }))
  };
  
  // Translations
  const texts: Record<string, { from: string; quote: string; features: string; related: string; warranty: string; delivery: string }> = {
    es: { from: 'Desde', quote: 'Solicitar Presupuesto', features: 'Características', related: 'Otros productos', warranty: 'Garantía 2 años', delivery: 'Entrega rápida' },
    en: { from: 'From', quote: 'Request Quote', features: 'Features', related: 'Other products', warranty: '2 year warranty', delivery: 'Fast delivery' },
    de: { from: 'Ab', quote: 'Angebot Anfordern', features: 'Eigenschaften', related: 'Andere Produkte', warranty: '2 Jahre Garantie', delivery: 'Schnelle Lieferung' },
    fr: { from: 'À partir de', quote: 'Demander un Devis', features: 'Caractéristiques', related: 'Autres produits', warranty: 'Garantie 2 ans', delivery: 'Livraison rapide' },
  };
  const t = texts[validLocale] || texts.es;

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <Header locale={validLocale} />
      
      <main className="pt-14">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <span className="inline-block text-xs tracking-widest text-neutral-400 uppercase mb-6">
                  Game Room
                </span>
                <h1 className="text-4xl md:text-5xl font-light text-neutral-900 leading-tight mb-6">
                  {catName}
                </h1>
                <p className="text-lg text-neutral-500 mb-8 leading-relaxed">
                  {catDesc}
                </p>
                
                {/* Price */}
                <div className="mb-8">
                  <span className="text-sm text-neutral-400">{t.from}</span>
                  <p className="text-3xl font-light text-neutral-900">{catPrice}</p>
                </div>
                
                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <IntercomButton 
                    text={t.quote}
                    className="px-8 py-4 bg-neutral-900 text-white text-sm rounded-full hover:bg-neutral-800 transition-colors"
                  />
                  <Link 
                    href={`/${locale}`}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-neutral-200 text-neutral-700 text-sm rounded-full hover:bg-neutral-100 transition-colors"
                  >
                    Ver Catálogo
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={catImage}
                  alt={catName}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 border-t border-neutral-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: t.warranty, desc: 'Cobertura completa en todos los productos' },
                { title: 'Calidad Premium', desc: 'Materiales de primera calidad' },
                { title: t.delivery, desc: 'Entrega en toda España' },
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-neutral-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">{feature.title}</p>
                    <p className="text-sm text-neutral-500 mt-1">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="py-16 bg-white border-t border-neutral-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 bg-neutral-50 rounded-2xl">
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-600 mb-4">
                    "Excelente calidad y servicio. La instalación fue rápida y profesional."
                  </p>
                  <p className="text-xs text-neutral-400">Cliente verificado</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shopify Products */}
        <ShopifyProducts 
          locale={validLocale} 
          collection={category?.slug} 
          title={`${catName} - Productos Destacados`}
          limit={8}
        />

        {/* Related Products */}
        <section className="py-16 border-t border-neutral-100">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-light text-neutral-900 mb-8">{t.related}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCategories.map((cat) => (
                <Link 
                  key={cat.slug}
                  href={`/${locale}/${cat.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 mb-4">
                    <Image
                      src={cat.image}
                      alt={cat.names[validLocale as keyof typeof cat.names] || cat.names.es}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors">
                    {cat.names[validLocale as keyof typeof cat.names] || cat.names.es}
                  </h3>
                  <p className="text-sm text-neutral-400 mt-1">
                    {t.from} <span className="font-medium text-neutral-900">{cat.price}</span>
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section with Schema */}
        <FAQSection data={seoData} />

        <Features locale={validLocale} />
        <CTA locale={validLocale} />
      </main>

      {/* SEO Schema Markup */}
      <SEOHead data={seoData} />

      <Footer locale={validLocale} />
    </div>
  );
}
