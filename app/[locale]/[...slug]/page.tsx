import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/store/header";
import { Features } from "@/components/store/features";
import { CTA } from "@/components/store/cta";
import { Footer } from "@/components/store/footer";
import { SUPPORTED_LOCALES, type Locale } from "@/lib/seo-data";
import { ArrowRight, Check, Star, ChevronDown } from "lucide-react";
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
    priceMin: 800, priceMax: 5000,
    names: { es: 'Mesas de Billar', en: 'Pool Tables', de: 'Billardtische', fr: 'Tables de Billard', it: 'Tavoli da Biliardo', pt: 'Mesas de Bilhar', nl: 'Pooltafels', pl: 'Stoly Bilardowe' },
    desc: { 
      es: 'Mesas de billar profesionales y domesticas. Madera maciza, pano de competicion y pizarra natural. Para salones de juego exigentes.', 
      en: 'Professional and home pool tables. Solid wood, competition cloth and natural slate. For discerning game rooms.', 
      de: 'Professionelle und Heim-Billardtische. Massivholz, Wettkampftuch und Naturschiefer. Fur anspruchsvolle Spielzimmer.', 
      fr: 'Tables de billard professionnelles et domestiques. Bois massif, drap de competition et ardoise naturelle.',
      it: 'Tavoli da biliardo professionali e domestici. Legno massello, panno da competizione e ardesia naturale.',
      pt: 'Mesas de bilhar profissionais e domesticas. Madeira macica, pano de competicao e ardosia natural.',
      nl: 'Professionele en huishoudelijke pooltafels. Massief hout, wedstrijdlaken en natuurlijke lei.',
      pl: 'Profesjonalne i domowe stoly bilardowe. Lite drewno, sukno turniejowe i naturalne lupki.'
    },
    buyingGuide: {
      es: [
        { q: 'Que tamano de mesa de billar necesito?', a: 'Para una mesa de 7 pies (la mas popular para uso domestico), necesitas una sala de al menos 4.5m x 3.5m. Para 8 pies, 5m x 4m. Mide siempre incluyendo 1.5m de espacio para el taco por cada lado.' },
        { q: 'Pizarra natural o sintetica?', a: 'La pizarra natural es superior: ofrece una superficie de juego perfectamente plana que no se deforma. Las mesas con MDF son mas ligeras y economicas pero no ofrecen la misma precision.' },
        { q: 'Que pano elegir?', a: 'El pano de lana (80/20) es ideal para uso domestico - buena relacion calidad-precio. Para juego profesional, el pano Simonis (nylon/lana) es el estandar de competicion.' },
        { q: 'Se incluye instalacion?', a: 'Si, todas nuestras mesas incluyen entrega, montaje y nivelacion profesional. Nuestro equipo tecnico se desplaza a tu domicilio.' },
      ],
      en: [
        { q: 'What size pool table do I need?', a: 'For a 7-foot table (most popular for home use), you need a room at least 15x12 feet. For 8-foot, 17x13 feet. Always measure including 5 feet of cue clearance on each side.' },
        { q: 'Natural slate or synthetic?', a: 'Natural slate is superior: it provides a perfectly flat playing surface that does not warp. MDF tables are lighter and cheaper but cannot match the precision.' },
        { q: 'Which cloth to choose?', a: 'Wool cloth (80/20 blend) is ideal for home use - great value. For professional play, Simonis cloth (nylon/wool) is the competition standard.' },
        { q: 'Is installation included?', a: 'Yes, all our tables include delivery, assembly and professional leveling. Our technical team comes to your home.' },
      ],
    }
  },
  { 
    slug: 'futbolines',
    slugs: { es: 'futbolines', en: 'foosball-tables', de: 'tischfussball', fr: 'baby-foot', it: 'calcio-balilla', pt: 'matraquilhos', nl: 'tafelvoetbal', pl: 'pilkarzyki' },
    image: 'https://images.unsplash.com/photo-1690073938628-359f281dcabb?q=80&w=1287&auto=format&fit=crop',
    priceMin: 300, priceMax: 2500,
    names: { es: 'Futbolines', en: 'Foosball Tables', de: 'Tischfussball', fr: 'Baby-foot', it: 'Calcio Balilla', pt: 'Matraquilhos', nl: 'Tafelvoetbal', pl: 'Pilkarzyki' },
    desc: { 
      es: 'Futbolines profesionales y de competicion. Barras de acero, munequeras de goma y estructura reforzada. Para toda la familia.', 
      en: 'Professional and competition foosball tables. Steel rods, rubber grips and reinforced structure. For the whole family.', 
      de: 'Professionelle und Wettkampf-Tischfussball. Stahlstangen, Gummigriffe und verstarkter Rahmen.',
      fr: 'Baby-foot professionnel et de competition. Barres en acier, poignees en caoutchouc et structure renforcee.',
      it: 'Calcio balilla professionale e da competizione. Aste in acciaio, impugnature in gomma e struttura rinforzata.',
      pt: 'Matraquilhos profissionais e de competicao. Barras de aco, pegas de borracha e estrutura reforcada.',
      nl: 'Professionele en wedstrijdtafelvoetbal. Stalen stangen, rubberen grepen en versterkte structuur.',
      pl: 'Profesjonalne i turniejowe pilkarzyki. Stalowe drążki, gumowe uchwyty i wzmocniona konstrukcja.'
    },
    buyingGuide: {
      es: [
        { q: 'Barras pasantes o telescopicas?', a: 'Las barras telescopicas son mas seguras (no sobresalen por el otro lado) y perfectas para familias con ninos. Las barras pasantes ofrecen mejor control para juego competitivo.' },
        { q: 'Cuanto debe pesar un buen futbolin?', a: 'Un futbolin de calidad pesa entre 60 y 90 kg. El peso es indicador de estabilidad - un futbolin ligero se mueve durante el juego.' },
      ],
      en: [
        { q: 'Through rods or telescoping?', a: 'Telescoping rods are safer (they do not protrude from the other side) and perfect for families with children. Through rods offer better control for competitive play.' },
        { q: 'How much should a good foosball table weigh?', a: 'A quality foosball table weighs between 130 and 200 pounds. Weight indicates stability - a light table moves during play.' },
      ],
    }
  },
  { 
    slug: 'dardos',
    slugs: { es: 'dardos', en: 'dart-boards', de: 'dartscheiben', fr: 'cibles-flechettes', it: 'bersagli-freccette', pt: 'alvos-dardos', nl: 'dartborden', pl: 'tarcze-darta' },
    image: 'https://images.unsplash.com/photo-1638430325415-2f2cc6ae838f?q=80&w=1287&auto=format&fit=crop',
    priceMin: 50, priceMax: 500,
    names: { es: 'Dianas y Dardos', en: 'Dart Boards', de: 'Dartscheiben', fr: 'Cibles de Flechettes', it: 'Bersagli Freccette', pt: 'Alvos de Dardos', nl: 'Dartborden', pl: 'Tarcze do Darta' },
    desc: { 
      es: 'Dianas electronicas con puntuacion automatica y dianas de sisal profesionales. Para principiantes y expertos.', 
      en: 'Electronic dart boards with automatic scoring and professional sisal boards. For beginners and experts.', 
      de: 'Elektronische Dartscheiben mit automatischer Wertung und professionelle Sisal-Dartscheiben.',
      fr: 'Cibles electroniques avec score automatique et cibles en sisal professionnelles.',
      it: 'Bersagli elettronici con punteggio automatico e bersagli in sisal professionali.',
      pt: 'Alvos eletronicos com pontuacao automatica e alvos de sisal profissionais.',
      nl: 'Elektronische dartborden met automatische score en professionele sisal dartborden.',
      pl: 'Elektroniczne tarcze z automatycznym liczeniem i profesjonalne tarcze sizalowe.'
    },
    buyingGuide: {
      es: [
        { q: 'Diana electronica o de sisal?', a: 'Electronica: perfecta para familias, puntuacion automatica, dardos de punta blanda (seguros). Sisal: para jugadores avanzados, mas silenciosa, dardos de acero.' },
        { q: 'Cuanta distancia necesito?', a: 'La distancia oficial de lanzamiento es 2.37m desde la diana. Necesitas al menos 3 metros libres frente a ella.' },
      ],
      en: [
        { q: 'Electronic or sisal dart board?', a: 'Electronic: perfect for families, automatic scoring, soft-tip darts (safe). Sisal: for advanced players, quieter, steel-tip darts.' },
        { q: 'How much distance do I need?', a: 'The official throwing distance is 7 feet 9.25 inches from the board. You need at least 10 feet of free space in front of it.' },
      ],
    }
  },
  { 
    slug: 'air-hockey',
    slugs: { es: 'air-hockey', en: 'air-hockey', de: 'airhockey', fr: 'air-hockey', it: 'air-hockey', pt: 'air-hockey', nl: 'airhockey', pl: 'air-hockey' },
    image: 'https://images.unsplash.com/photo-1650916099935-3c32281bc0e3?q=80&w=1287&auto=format&fit=crop',
    priceMin: 200, priceMax: 3000,
    names: { es: 'Air Hockey', en: 'Air Hockey Tables', de: 'Airhockey-Tische', fr: 'Tables Air Hockey', it: 'Tavoli Air Hockey', pt: 'Mesas Air Hockey', nl: 'Airhockey Tafels', pl: 'Stoly do Air Hockey' },
    desc: { 
      es: 'Mesas de air hockey con motor de alta potencia y superficie de juego profesional. Accion y velocidad en tu hogar.', 
      en: 'Air hockey tables with high-power motor and professional playing surface. Action and speed in your home.', 
      de: 'Airhockey-Tische mit Hochleistungsmotor und professioneller Spielflache.',
      fr: 'Tables air hockey avec moteur haute puissance et surface de jeu professionnelle.',
      it: 'Tavoli air hockey con motore ad alta potenza e superficie di gioco professionale.',
      pt: 'Mesas de air hockey com motor de alta potencia e superficie de jogo profissional.',
      nl: 'Airhockey tafels met krachtige motor en professioneel speeloppervlak.',
      pl: 'Stoly do air hockey z silnikiem o duzej mocy i profesjonalna powierzchnia gry.'
    },
    buyingGuide: {
      es: [
        { q: 'Que potencia de motor necesito?', a: 'Para juego casual, un motor de 100-120V es suficiente. Para juego competitivo, busca motores de alta velocidad con multiples salidas de aire.' },
        { q: 'Que tamano elegir?', a: 'Para uso domestico, mesas de 6-7 pies son ideales. Las de 8 pies son para salas mas grandes o uso semi-profesional.' },
      ],
      en: [
        { q: 'What motor power do I need?', a: 'For casual play, a 100-120V motor is sufficient. For competitive play, look for high-speed motors with multiple air outlets.' },
        { q: 'What size to choose?', a: 'For home use, 6-7 foot tables are ideal. 8-foot tables are for larger rooms or semi-professional use.' },
      ],
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

// HIGH-INTENT SEO metadata - optimized for transactional queries
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const validLocale = (SUPPORTED_LOCALES.includes(locale as Locale) ? locale : 'es') as Locale;
  const category = getCategoryBySlug(slug?.[0] || '');
  
  const catName = category?.names[validLocale as keyof typeof category.names] || category?.names.es || 'Juegos de Sala';
  const catDesc = category?.desc[validLocale as keyof typeof category.desc] || category?.desc.es || '';
  const ogImage = category?.image ? `${category.image.split('?')[0]}?w=1200&h=630&fit=crop&q=80` : 'https://images.unsplash.com/photo-1647633391986-4614f2ee0ca4?w=1200&h=630&fit=crop&q=80';
  const year = new Date().getFullYear();
  
  // High-intent title patterns
  const titleTemplates: Record<string, string> = {
    es: `Comprar ${catName} Online | Precios ${year} | Desde ${category?.priceMin || 200}EUR - Envio Gratis`,
    en: `Buy ${catName} Online | ${year} Prices | From EUR${category?.priceMin || 200} - Free Shipping`,
    de: `${catName} Kaufen | Preise ${year} | Ab ${category?.priceMin || 200}EUR - Kostenloser Versand`,
    fr: `Acheter ${catName} | Prix ${year} | Des ${category?.priceMin || 200}EUR - Livraison Gratuite`,
    it: `Comprare ${catName} | Prezzi ${year} | Da ${category?.priceMin || 200}EUR - Spedizione Gratuita`,
    pt: `Comprar ${catName} | Precos ${year} | Desde ${category?.priceMin || 200}EUR - Envio Gratis`,
    nl: `${catName} Kopen | Prijzen ${year} | Vanaf EUR${category?.priceMin || 200} - Gratis Verzending`,
    pl: `Kup ${catName} | Ceny ${year} | Od ${category?.priceMin || 200}EUR - Darmowa Wysylka`,
  };
  
  const descTemplates: Record<string, string> = {
    es: `${catName} al mejor precio. ${catDesc} Desde ${category?.priceMin || 200}EUR. Envio gratis en toda Europa. Garantia 2 anos. Instalacion profesional incluida.`,
    en: `${catName} at the best price. ${catDesc} From EUR${category?.priceMin || 200}. Free shipping across Europe. 2-year warranty. Professional installation included.`,
    de: `${catName} zum besten Preis. ${catDesc} Ab ${category?.priceMin || 200}EUR. Kostenloser Versand in Europa. 2 Jahre Garantie.`,
    fr: `${catName} au meilleur prix. ${catDesc} Des ${category?.priceMin || 200}EUR. Livraison gratuite en Europe. Garantie 2 ans.`,
  };

  const title = titleTemplates[validLocale] || titleTemplates.es;
  const description = (descTemplates[validLocale] || descTemplates.es).slice(0, 160);
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
  const year = new Date().getFullYear();
  
  const defaultNames: Record<string, string> = { es: 'Juegos de Sala', en: 'Game Room', de: 'Spielzimmer', fr: 'Salle de Jeux', it: 'Sala Giochi', pt: 'Sala de Jogos', nl: 'Speelkamer', pl: 'Pokoj Gier' };
  const catName = category?.names[validLocale as keyof typeof category.names] || category?.names.es || defaultNames[validLocale] || defaultNames.es;
  const catDesc = category?.desc[validLocale as keyof typeof category.desc] || category?.desc.es || '';
  const catImage = category?.image || 'https://images.unsplash.com/photo-1695727008212-5d46172962b6?q=80&w=1336&auto=format&fit=crop';
  
  const relatedCategories = CATEGORIES.filter(c => c.slug !== category?.slug).slice(0, 3);
  const buyingGuideItems = category?.buyingGuide?.[validLocale as keyof typeof category.buyingGuide] || category?.buyingGuide?.es || [];

  const seoData: SEOData = {
    locale: validLocale as SEOData['locale'],
    pageType: 'category',
    product: catName,
    productSlug: category?.slug || 'juegos-sala',
    priceMin: category?.priceMin || 200,
    priceMax: category?.priceMax || 5000,
    brand: 'The Games Room',
    domain: 'thegamesroom.io',
    warranty: '2 anos',
    relatedProducts: relatedCategories.map(c => ({
      name: c.names[validLocale as keyof typeof c.names] || c.names.es,
      slug: c.slug,
      price: `${c.priceMin}EUR`
    }))
  };
  
  const texts: Record<string, { from: string; quote: string; related: string; warranty: string; delivery: string; catalog: string; guide: string; reviews: string }> = {
    es: { from: 'Desde', quote: 'Solicitar Presupuesto', related: 'Otras colecciones', warranty: 'Garantia 2 anos', delivery: 'Entrega en toda Europa', catalog: 'Ver Catalogo', guide: 'Guia de compra', reviews: 'Opiniones' },
    en: { from: 'From', quote: 'Request Quote', related: 'Other collections', warranty: '2 year warranty', delivery: 'Delivery across Europe', catalog: 'View Catalog', guide: 'Buying guide', reviews: 'Reviews' },
    de: { from: 'Ab', quote: 'Angebot Anfordern', related: 'Andere Kollektionen', warranty: '2 Jahre Garantie', delivery: 'Lieferung in Europa', catalog: 'Katalog Ansehen', guide: 'Kaufratgeber', reviews: 'Bewertungen' },
    fr: { from: 'A partir de', quote: 'Demander un Devis', related: 'Autres collections', warranty: 'Garantie 2 ans', delivery: 'Livraison en Europe', catalog: 'Voir Catalogue', guide: 'Guide d\'achat', reviews: 'Avis' },
    it: { from: 'Da', quote: 'Richiedi Preventivo', related: 'Altre collezioni', warranty: 'Garanzia 2 anni', delivery: 'Consegna in Europa', catalog: 'Vedi Catalogo', guide: 'Guida all\'acquisto', reviews: 'Recensioni' },
    pt: { from: 'Desde', quote: 'Solicitar Orcamento', related: 'Outras colecoes', warranty: 'Garantia 2 anos', delivery: 'Entrega na Europa', catalog: 'Ver Catalogo', guide: 'Guia de compra', reviews: 'Avaliacoes' },
    nl: { from: 'Vanaf', quote: 'Offerte Aanvragen', related: 'Andere collecties', warranty: '2 jaar garantie', delivery: 'Levering in Europa', catalog: 'Bekijk Catalogus', guide: 'Koopgids', reviews: 'Beoordelingen' },
    pl: { from: 'Od', quote: 'Popros o Wycene', related: 'Inne kolekcje', warranty: 'Gwarancja 2 lata', delivery: 'Dostawa w Europie', catalog: 'Zobacz Katalog', guide: 'Poradnik', reviews: 'Opinie' },
  };
  const t = texts[validLocale] || texts.es;

  // Reviews data
  const reviewTexts: Record<string, { text: string; author: string }[]> = {
    es: [
      { text: 'Excelente calidad y servicio. La instalacion fue rapida y profesional.', author: 'Cliente verificado' },
      { text: 'Superó todas nuestras expectativas. Muy recomendable.', author: 'Cliente verificado' },
      { text: 'El equipo fue muy profesional. Recomendado 100%.', author: 'Cliente verificado' },
    ],
    en: [
      { text: 'Excellent quality and service. Installation was quick and professional.', author: 'Verified customer' },
      { text: 'Exceeded all our expectations. Highly recommended.', author: 'Verified customer' },
      { text: 'The team was very professional. 100% recommended.', author: 'Verified customer' },
    ],
  };
  const reviews = reviewTexts[validLocale] || reviewTexts.es;

  // Product schema for rich results
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": catName,
    "description": catDesc,
    "brand": { "@type": "Brand", "name": "The Games Room" },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "EUR",
      "lowPrice": category?.priceMin || 200,
      "highPrice": category?.priceMax || 5000,
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": "The Games Room" }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "347",
      "bestRating": "5"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "The Games Room", "item": `${SITE_URL}/${locale}` },
      { "@type": "ListItem", "position": 2, "name": catName, "item": `${SITE_URL}/${locale}/${slug?.join('/') || ''}` },
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      
      <Header locale={validLocale} />
      
      <main className="pt-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-6 lg:px-12 pt-6">
          <ol className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <li><Link href={`/${locale}`} className="hover:text-foreground transition-colors">Home</Link></li>
            <li><span className="mx-1">/</span></li>
            <li className="text-foreground">{catName}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-6">
                  {`The Games Room — ${year}`}
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-foreground leading-[1.1] mb-6">
                  {catName}
                </h1>
                <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-lg">
                  {catDesc}
                </p>
                
                {/* Price */}
                <div className="mb-8">
                  <span className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{t.from}</span>
                  <p className="text-3xl font-serif font-light text-foreground mt-1">{category?.priceMin || 200}{'EUR'}</p>
                </div>
                
                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <IntercomButton 
                    text={t.quote}
                    className="px-8 py-4 bg-foreground text-background text-xs uppercase tracking-[0.2em] font-medium hover:bg-foreground/90 transition-colors"
                  />
                  <Link 
                    href={`/${locale}`}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-foreground text-xs uppercase tracking-[0.2em] font-medium hover:bg-secondary transition-colors"
                  >
                    {t.catalog}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={catImage}
                  alt={`${catName} - The Games Room`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features bar */}
        <section className="py-8 border-y border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: t.warranty },
                { title: t.delivery },
                { title: `4.8/5 — 347+ ${t.reviews}` },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-accent flex-shrink-0" />
                  <p className="text-[11px] uppercase tracking-[0.15em] text-foreground">{feature.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shopify Products */}
        <ShopifyProducts 
          locale={validLocale} 
          collection={category?.slug} 
          title={catName}
          limit={8}
        />

        {/* Buying Guide - Critical for SEO */}
        {buyingGuideItems.length > 0 && (
          <section className="py-20 bg-secondary">
            <div className="max-w-4xl mx-auto px-6 lg:px-12">
              <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                {t.guide}
              </p>
              <h2 className="text-2xl md:text-3xl font-serif font-light text-foreground mb-12">
                {catName}: {t.guide} {year}
              </h2>
              
              <div className="flex flex-col gap-0">
                {buyingGuideItems.map((item, i) => (
                  <details key={i} className="group border-b border-border">
                    <summary className="flex items-center justify-between gap-4 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <h3 className="text-base font-medium text-foreground pr-4">
                        {item.q}
                      </h3>
                      <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="pb-6 pr-8">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Reviews */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-3 gap-px bg-border">
              {reviews.map((review, i) => (
                <div key={i} className="bg-background p-8">
                  <div className="flex gap-0.5 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground mb-6 font-serif italic leading-relaxed">{`"${review.text}"`}</p>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-[0.15em]">{review.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-20 border-t border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-2xl font-serif font-light text-foreground mb-10">{t.related}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCategories.map((cat) => (
                <Link 
                  key={cat.slug}
                  href={`/${locale}/${cat.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary mb-4">
                    <Image
                      src={cat.image}
                      alt={cat.names[validLocale as keyof typeof cat.names] || cat.names.es}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="text-base font-medium text-foreground group-hover:text-muted-foreground transition-colors">
                    {cat.names[validLocale as keyof typeof cat.names] || cat.names.es}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.from} <span className="font-medium text-foreground">{cat.priceMin}{'EUR'}</span>
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FAQSection data={seoData} />
        <Features locale={validLocale} />
        <CTA locale={validLocale} />
      </main>

      <SEOHead data={seoData} />
      <Footer locale={validLocale} />
    </div>
  );
}
