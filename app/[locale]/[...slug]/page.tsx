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

// Category data for game room products with localized slugs
const CATEGORIES = [
  { 
    slug: 'mesas-billar',
    slugs: { es: 'mesas-billar', en: 'pool-tables', de: 'billardtische', fr: 'tables-billard', it: 'tavoli-biliardo', pt: 'mesas-bilhar', nl: 'pooltafels', pl: 'stoly-bilardowe' },
    image: 'https://images.unsplash.com/photo-1695727008212-5d46172962b6?q=80&w=1336&auto=format&fit=crop',
    price: '800€',
    names: { es: 'Mesas de Billar', en: 'Pool Tables', de: 'Billardtische', fr: 'Tables de Billard', it: 'Tavoli da Biliardo', pt: 'Mesas de Bilhar', nl: 'Pooltafels', pl: 'Stoły Bilardowe' },
    desc: { 
      es: 'Mesas de billar profesionales y domésticas. Calidad premium garantizada.', 
      en: 'Professional and home pool tables. Premium quality guaranteed.', 
      de: 'Professionelle und Heim-Billardtische. Premium-Qualität garantiert.', 
      fr: 'Tables de billard professionnelles et domestiques. Qualité premium garantie.',
      it: 'Tavoli da biliardo professionali e domestici. Qualità premium garantita.',
      pt: 'Mesas de bilhar profissionais e domésticas. Qualidade premium garantida.',
      nl: 'Professionele en huishoudelijke pooltafels. Premium kwaliteit gegarandeerd.',
      pl: 'Profesjonalne i domowe stoły bilardowe. Gwarantowana jakość premium.'
    }
  },
  { 
    slug: 'futbolines',
    slugs: { es: 'futbolines', en: 'foosball-tables', de: 'tischfussball', fr: 'baby-foot', it: 'calcio-balilla', pt: 'matraquilhos', nl: 'tafelvoetbal', pl: 'pilkarzyki' },
    image: 'https://images.unsplash.com/photo-1690073938628-359f281dcabb?q=80&w=1287&auto=format&fit=crop',
    price: '300€',
    names: { es: 'Futbolines', en: 'Foosball Tables', de: 'Tischfußball', fr: 'Baby-foot', it: 'Calcio Balilla', pt: 'Matraquilhos', nl: 'Tafelvoetbal', pl: 'Piłkarzyki' },
    desc: { 
      es: 'Futbolines para toda la familia. Diversión garantizada.', 
      en: 'Foosball tables for the whole family. Fun guaranteed.', 
      de: 'Tischfußball für die ganze Familie. Spaß garantiert.', 
      fr: 'Baby-foot pour toute la famille. Plaisir garanti.',
      it: 'Calcio balilla per tutta la famiglia. Divertimento garantito.',
      pt: 'Matraquilhos para toda a família. Diversão garantida.',
      nl: 'Tafelvoetbal voor het hele gezin. Plezier gegarandeerd.',
      pl: 'Piłkarzyki dla całej rodziny. Gwarantowana zabawa.'
    }
  },
  { 
    slug: 'dardos',
    slugs: { es: 'dardos', en: 'dart-boards', de: 'dartscheiben', fr: 'cibles-flechettes', it: 'bersagli-freccette', pt: 'alvos-dardos', nl: 'dartborden', pl: 'tarcze-darta' },
    image: 'https://images.unsplash.com/photo-1638430325415-2f2cc6ae838f?q=80&w=1287&auto=format&fit=crop',
    price: '50€',
    names: { es: 'Dianas y Dardos', en: 'Dart Boards', de: 'Dartscheiben', fr: 'Cibles de Fléchettes', it: 'Bersagli Freccette', pt: 'Alvos de Dardos', nl: 'Dartborden', pl: 'Tarcze do Darta' },
    desc: { 
      es: 'Dianas electrónicas y clásicas. Para profesionales y aficionados.', 
      en: 'Electronic and classic dart boards. For professionals and amateurs.', 
      de: 'Elektronische und klassische Dartscheiben. Für Profis und Amateure.', 
      fr: 'Cibles électroniques et classiques. Pour professionnels et amateurs.',
      it: 'Bersagli elettronici e classici. Per professionisti e dilettanti.',
      pt: 'Alvos eletrônicos e clássicos. Para profissionais e amadores.',
      nl: 'Elektronische en klassieke dartborden. Voor professionals en amateurs.',
      pl: 'Elektroniczne i klasyczne tarcze do darta. Dla profesjonalistów i amatorów.'
    }
  },
  { 
    slug: 'air-hockey',
    slugs: { es: 'air-hockey', en: 'air-hockey', de: 'airhockey', fr: 'air-hockey', it: 'air-hockey', pt: 'air-hockey', nl: 'airhockey', pl: 'air-hockey' },
    image: 'https://images.unsplash.com/photo-1650916099935-3c32281bc0e3?q=80&w=1287&auto=format&fit=crop',
    price: '200€',
    names: { es: 'Air Hockey', en: 'Air Hockey Tables', de: 'Airhockey-Tische', fr: 'Tables Air Hockey', it: 'Tavoli Air Hockey', pt: 'Mesas Air Hockey', nl: 'Airhockey Tafels', pl: 'Stoły do Air Hockey' },
    desc: { 
      es: 'Mesas de air hockey. Acción y velocidad en tu sala de juegos.', 
      en: 'Air hockey tables. Action and speed in your game room.', 
      de: 'Airhockey-Tische. Action und Geschwindigkeit in Ihrem Spielzimmer.', 
      fr: 'Tables air hockey. Action et vitesse dans votre salle de jeux.',
      it: 'Tavoli air hockey. Azione e velocità nella tua sala giochi.',
      pt: 'Mesas de air hockey. Ação e velocidade na sua sala de jogos.',
      nl: 'Airhockey tafels. Actie en snelheid in je speelkamer.',
      pl: 'Stoły do air hockey. Akcja i prędkość w Twoim pokoju gier.'
    }
  },
];

// Find category by any localized slug
function getCategoryBySlug(slug: string) {
  return CATEGORIES.find(c => {
    if (c.slug === slug) return true;
    const allSlugs = Object.values(c.slugs);
    return allSlugs.includes(slug) || allSlugs.some(s => slug.includes(s));
  });
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
  
  const defaultNames: Record<string, string> = { es: 'Juegos de Sala', en: 'Game Room', de: 'Spielzimmer', fr: 'Salle de Jeux', it: 'Sala Giochi', pt: 'Sala de Jogos', nl: 'Speelkamer', pl: 'Pokój Gier' };
  const defaultDescs: Record<string, string> = { es: 'Mesas de billar, futbolines y juegos de sala de alta calidad.', en: 'High quality pool tables, foosball and game room equipment.', de: 'Hochwertige Billardtische, Tischfußball und Spielzimmerausstattung.', fr: 'Tables de billard, baby-foot et équipements de salle de jeux.', it: 'Tavoli da biliardo, calcio balilla e attrezzature per sala giochi.', pt: 'Mesas de bilhar, matraquilhos e equipamentos de sala de jogos.', nl: 'Pooltafels, tafelvoetbal en speelkameruitrusting.', pl: 'Stoły bilardowe, piłkarzyki i wyposażenie pokoju gier.' };
  const catName = category?.names[validLocale as keyof typeof category.names] || category?.names.es || defaultNames[validLocale] || defaultNames.es;
  const catDesc = category?.desc[validLocale as keyof typeof category.desc] || category?.desc.es || defaultDescs[validLocale] || defaultDescs.es;
  const catImage = category?.image || 'https://images.unsplash.com/photo-1695727008212-5d46172962b6?q=80&w=1336&auto=format&fit=crop';
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
  const texts: Record<string, { from: string; quote: string; features: string; related: string; warranty: string; delivery: string; catalog: string; quality: string }> = {
    es: { from: 'Desde', quote: 'Solicitar Presupuesto', features: 'Características', related: 'Otros productos', warranty: 'Garantía 2 años', delivery: 'Entrega rápida', catalog: 'Ver Catálogo', quality: 'Calidad Premium' },
    en: { from: 'From', quote: 'Request Quote', features: 'Features', related: 'Other products', warranty: '2 year warranty', delivery: 'Fast delivery', catalog: 'View Catalog', quality: 'Premium Quality' },
    de: { from: 'Ab', quote: 'Angebot Anfordern', features: 'Eigenschaften', related: 'Andere Produkte', warranty: '2 Jahre Garantie', delivery: 'Schnelle Lieferung', catalog: 'Katalog Ansehen', quality: 'Premium Qualität' },
    fr: { from: 'À partir de', quote: 'Demander un Devis', features: 'Caractéristiques', related: 'Autres produits', warranty: 'Garantie 2 ans', delivery: 'Livraison rapide', catalog: 'Voir Catalogue', quality: 'Qualité Premium' },
    it: { from: 'Da', quote: 'Richiedi Preventivo', features: 'Caratteristiche', related: 'Altri prodotti', warranty: 'Garanzia 2 anni', delivery: 'Consegna rapida', catalog: 'Vedi Catalogo', quality: 'Qualità Premium' },
    pt: { from: 'Desde', quote: 'Solicitar Orçamento', features: 'Características', related: 'Outros produtos', warranty: 'Garantia 2 anos', delivery: 'Entrega rápida', catalog: 'Ver Catálogo', quality: 'Qualidade Premium' },
    nl: { from: 'Vanaf', quote: 'Offerte Aanvragen', features: 'Kenmerken', related: 'Andere producten', warranty: '2 jaar garantie', delivery: 'Snelle levering', catalog: 'Bekijk Catalogus', quality: 'Premium Kwaliteit' },
    pl: { from: 'Od', quote: 'Poproś o Wycenę', features: 'Cechy', related: 'Inne produkty', warranty: 'Gwarancja 2 lata', delivery: 'Szybka dostawa', catalog: 'Zobacz Katalog', quality: 'Jakość Premium' },
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
                    {t.catalog}
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

        {/* Shopify Products - Right after hero */}
        <ShopifyProducts 
          locale={validLocale} 
          collection={category?.slug} 
          title={`${catName} - Productos Destacados`}
          limit={8}
        />

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
              {(() => {
                const reviews: Record<string, { text: string; author: string }[]> = {
                  es: [
                    { text: 'Excelente calidad y servicio. La instalación fue rápida y profesional.', author: 'Cliente verificado' },
                    { text: 'Muy contentos con nuestra mesa de billar. Superó todas nuestras expectativas.', author: 'Cliente verificado' },
                    { text: 'El equipo fue muy profesional. Recomendado 100%.', author: 'Cliente verificado' },
                  ],
                  en: [
                    { text: 'Excellent quality and service. Installation was quick and professional.', author: 'Verified customer' },
                    { text: 'Very happy with our pool table. Exceeded all our expectations.', author: 'Verified customer' },
                    { text: 'The team was very professional. 100% recommended.', author: 'Verified customer' },
                  ],
                  de: [
                    { text: 'Ausgezeichnete Qualität und Service. Die Installation war schnell und professionell.', author: 'Verifizierter Kunde' },
                    { text: 'Sehr zufrieden mit unserem Billardtisch. Hat alle Erwartungen übertroffen.', author: 'Verifizierter Kunde' },
                    { text: 'Das Team war sehr professionell. 100% empfohlen.', author: 'Verifizierter Kunde' },
                  ],
                  fr: [
                    { text: 'Excellente qualité et service. L\'installation a été rapide et professionnelle.', author: 'Client vérifié' },
                    { text: 'Très satisfaits de notre table de billard. A dépassé toutes nos attentes.', author: 'Client vérifié' },
                    { text: 'L\'équipe était très professionnelle. Recommandé à 100%.', author: 'Client vérifié' },
                  ],
                  it: [
                    { text: 'Qualità e servizio eccellenti. L\'installazione è stata rapida e professionale.', author: 'Cliente verificato' },
                    { text: 'Molto soddisfatti del nostro tavolo da biliardo. Ha superato tutte le aspettative.', author: 'Cliente verificato' },
                    { text: 'Il team è stato molto professionale. Consigliato al 100%.', author: 'Cliente verificato' },
                  ],
                  pt: [
                    { text: 'Excelente qualidade e serviço. A instalação foi rápida e profissional.', author: 'Cliente verificado' },
                    { text: 'Muito satisfeitos com nossa mesa de bilhar. Superou todas as expectativas.', author: 'Cliente verificado' },
                    { text: 'A equipe foi muito profissional. Recomendado 100%.', author: 'Cliente verificado' },
                  ],
                  nl: [
                    { text: 'Uitstekende kwaliteit en service. Installatie was snel en professioneel.', author: 'Geverifieerde klant' },
                    { text: 'Zeer tevreden met onze pooltafel. Overtrof al onze verwachtingen.', author: 'Geverifieerde klant' },
                    { text: 'Het team was zeer professioneel. 100% aanbevolen.', author: 'Geverifieerde klant' },
                  ],
                  pl: [
                    { text: 'Doskonała jakość i obsługa. Instalacja była szybka i profesjonalna.', author: 'Zweryfikowany klient' },
                    { text: 'Bardzo zadowoleni z naszego stołu bilardowego. Przekroczył wszystkie oczekiwania.', author: 'Zweryfikowany klient' },
                    { text: 'Zespół był bardzo profesjonalny. Polecam w 100%.', author: 'Zweryfikowany klient' },
                  ],
                };
                const r = reviews[validLocale] || reviews.es;
                return r.map((review, i) => (
                  <div key={i} className="p-6 bg-neutral-50 rounded-2xl">
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-neutral-600 mb-4">"{review.text}"</p>
                    <p className="text-xs text-neutral-400">{review.author}</p>
                  </div>
                ));
              })()}
            </div>
          </div>
        </section>

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
