import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, MapPin, Clock, Star, Shield, Truck, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/store/header"
import { Footer } from "@/components/store/footer"
import {
  getCityBySlug,
  getCategoryBySlug,
  getTopCities,
  generateCityDescription,
  getCityStats,
  generateCityReviews,
  PRODUCT_CATEGORIES,
  type Locale,
} from "@/lib/city-data"
import { SUPPORTED_LOCALES } from "@/lib/seo-data"

export const dynamicParams = true
export const revalidate = 604800 // 1 week

// Pre-render top cities for each locale and category
export async function generateStaticParams() {
  const topCities = getTopCities(30)
  const params: { locale: string; categoria: string; ciudad: string }[] = []

  for (const locale of SUPPORTED_LOCALES) {
    for (const category of PRODUCT_CATEGORIES) {
      for (const city of topCities) {
        params.push({ 
          locale, 
          categoria: category.slug, 
          ciudad: city.slug 
        })
      }
    }
  }

  return params
}

interface PageProps {
  params: Promise<{ locale: string; categoria: string; ciudad: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, categoria, ciudad } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thegamesroom.io"

  const category = getCategoryBySlug(categoria)
  const city = getCityBySlug(ciudad)
  const validLocale = (SUPPORTED_LOCALES.includes(locale as Locale) ? locale : 'en') as Locale

  if (!category || !city) {
    return { title: "Not found" }
  }

  const categoryName = category.translations[validLocale] || category.translations.en
  const year = new Date().getFullYear()
  
  // High-intent transactional title patterns
  const titleTemplates: Record<string, string> = {
    es: `Comprar ${categoryName} en ${city.name} | Precios ${year} | Envio Gratis`,
    en: `Buy ${categoryName} in ${city.name} | ${year} Prices | Free Shipping`,
    de: `${categoryName} in ${city.name} Kaufen | Preise ${year} | Kostenloser Versand`,
    fr: `Acheter ${categoryName} a ${city.name} | Prix ${year} | Livraison Gratuite`,
    it: `Comprare ${categoryName} a ${city.name} | Prezzi ${year} | Spedizione Gratuita`,
    pt: `Comprar ${categoryName} em ${city.name} | Precos ${year} | Envio Gratis`,
    nl: `${categoryName} ${city.name} Kopen | Prijzen ${year} | Gratis Verzending`,
    pl: `Kup ${categoryName} w ${city.name} | Ceny ${year} | Darmowa Wysylka`,
  }
  
  const descTemplates: Record<string, string> = {
    es: `${categoryName} en ${city.name}. Precios desde ${category.priceRange}EUR. Envio gratis a ${city.name}, garantia 2 anos, instalacion profesional. Presupuesto sin compromiso.`,
    en: `${categoryName} in ${city.name}. Prices from EUR${category.priceRange}. Free shipping to ${city.name}, 2-year warranty, professional installation. Free quote.`,
    de: `${categoryName} in ${city.name}. Preise ab ${category.priceRange}EUR. Kostenloser Versand, 2 Jahre Garantie, professionelle Installation.`,
    fr: `${categoryName} a ${city.name}. Prix des ${category.priceRange}EUR. Livraison gratuite, garantie 2 ans, installation professionnelle.`,
  }
  
  const title = titleTemplates[validLocale] || titleTemplates.es
  const description = (descTemplates[validLocale] || descTemplates.es || generateCityDescription(city, category, validLocale)).slice(0, 160)

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}/productos/${categoria}/${ciudad}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: 'The Games Room',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function CityProductPage({ params }: PageProps) {
  const { locale, categoria, ciudad } = await params

  const category = getCategoryBySlug(categoria)
  const city = getCityBySlug(ciudad)
  const validLocale = (SUPPORTED_LOCALES.includes(locale as Locale) ? locale : 'en') as Locale

  if (!category || !city) {
    notFound()
  }

  const categoryName = category.translations[validLocale] || category.translations.en
  const description = generateCityDescription(city, category, validLocale)
  const stats = getCityStats(city)
  const reviews = generateCityReviews(city, category, validLocale)

  // Get nearby cities for internal linking
  const nearbyCities = getTopCities(20).filter(c => c.slug !== city.slug).slice(0, 6)

  // Translations
  const t = {
    es: {
      priceRange: 'Rango de precios',
      requestQuote: 'Solicitar Presupuesto',
      viewCatalog: 'Ver Catálogo',
      installations: 'Instalaciones',
      deliveryTime: 'Tiempo de entrega',
      rating: 'Valoración',
      warranty: 'Garantía',
      years: 'años',
      whyChooseUs: '¿Por qué elegirnos?',
      deliveryTo: 'Envío a',
      deliveryDesc: 'Entrega e instalación profesional incluida',
      warrantyTitle: 'Garantia 2 Anos',
      warrantyDesc: 'Garantía completa en todos nuestros productos',
      fastInstall: 'Instalación Rápida',
      fastInstallDesc: 'Equipo de instaladores profesionales',
      premiumQuality: 'Calidad Premium',
      premiumQualityDesc: 'Materiales de primera calidad',
      reviews: 'Opiniones de clientes',
      reviewsSubtitle: 'Lo que dicen nuestros clientes',
      verified: 'Verificado',
      readyFor: '¿Listo para tu',
      inCity: 'en',
      requestQuoteDesc: 'Solicita tu presupuesto sin compromiso',
      contactNow: 'Contactar Ahora',
      otherProducts: 'Otros productos en',
      otherCities: 'en otras ciudades',
    },
    en: {
      priceRange: 'Price range',
      requestQuote: 'Request Quote',
      viewCatalog: 'View Catalog',
      installations: 'Installations',
      deliveryTime: 'Delivery time',
      rating: 'Rating',
      warranty: 'Warranty',
      years: 'years',
      whyChooseUs: 'Why choose us?',
      deliveryTo: 'Delivery to',
      deliveryDesc: 'Professional delivery and installation included',
      warrantyTitle: '2 Year Warranty',
      warrantyDesc: 'Full warranty on all products',
      fastInstall: 'Fast Installation',
      fastInstallDesc: 'Professional installation team',
      premiumQuality: 'Premium Quality',
      premiumQualityDesc: 'First-class materials',
      reviews: 'Customer reviews',
      reviewsSubtitle: 'What our customers say',
      verified: 'Verified',
      readyFor: 'Ready for your',
      inCity: 'in',
      requestQuoteDesc: 'Request your free quote',
      contactNow: 'Contact Now',
      otherProducts: 'Other products in',
      otherCities: 'in other cities',
    },
    de: {
      priceRange: 'Preisbereich',
      requestQuote: 'Angebot Anfordern',
      viewCatalog: 'Katalog Ansehen',
      installations: 'Installationen',
      deliveryTime: 'Lieferzeit',
      rating: 'Bewertung',
      warranty: 'Garantie',
      years: 'Jahre',
      whyChooseUs: 'Warum uns wählen?',
      deliveryTo: 'Lieferung nach',
      deliveryDesc: 'Professionelle Lieferung und Installation inklusive',
      warrantyTitle: '2 Jahre Garantie',
      warrantyDesc: 'Volle Garantie auf alle Produkte',
      fastInstall: 'Schnelle Installation',
      fastInstallDesc: 'Professionelles Installationsteam',
      premiumQuality: 'Premium Qualität',
      premiumQualityDesc: 'Erstklassige Materialien',
      reviews: 'Kundenbewertungen',
      reviewsSubtitle: 'Was unsere Kunden sagen',
      verified: 'Verifiziert',
      readyFor: 'Bereit für Ihre',
      inCity: 'in',
      requestQuoteDesc: 'Fordern Sie Ihr kostenloses Angebot an',
      contactNow: 'Jetzt Kontaktieren',
      otherProducts: 'Andere Produkte in',
      otherCities: 'in anderen Städten',
    },
    fr: {
      priceRange: 'Gamme de prix',
      requestQuote: 'Demander un Devis',
      viewCatalog: 'Voir le Catalogue',
      installations: 'Installations',
      deliveryTime: 'Délai de livraison',
      rating: 'Note',
      warranty: 'Garantie',
      years: 'ans',
      whyChooseUs: 'Pourquoi nous choisir?',
      deliveryTo: 'Livraison à',
      deliveryDesc: 'Livraison et installation professionnelles incluses',
      warrantyTitle: 'Garantie 2 Ans',
      warrantyDesc: 'Garantie complète sur tous les produits',
      fastInstall: 'Installation Rapide',
      fastInstallDesc: 'Équipe d\'installation professionnelle',
      premiumQuality: 'Qualité Premium',
      premiumQualityDesc: 'Matériaux de première qualité',
      reviews: 'Avis clients',
      reviewsSubtitle: 'Ce que disent nos clients',
      verified: 'Vérifié',
      readyFor: 'Prêt pour votre',
      inCity: 'à',
      requestQuoteDesc: 'Demandez votre devis gratuit',
      contactNow: 'Contacter Maintenant',
      otherProducts: 'Autres produits à',
      otherCities: 'dans d\'autres villes',
    },
  }

  const texts = t[validLocale as keyof typeof t] || t.en

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header locale={validLocale} />
      
      <main className="flex-1 pt-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-6 lg:px-12 pt-6">
          <ol className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <li><Link href={`/${locale}`} className="hover:text-foreground transition-colors">Home</Link></li>
            <li><span className="mx-1">/</span></li>
            <li><Link href={`/${locale}/${categoria}`} className="hover:text-foreground transition-colors">{categoryName}</Link></li>
            <li><span className="mx-1">/</span></li>
            <li className="text-foreground">{city.name}</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="max-w-2xl">
              {/* Location badge */}
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-8">
                <MapPin className="h-3.5 w-3.5" />
                <span>{city.name}, {city.country}</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] mb-6">
                {categoryName}
                <span className="block italic text-muted-foreground mt-1">{texts.inCity} {city.name}</span>
              </h1>

              <p className="text-base text-muted-foreground mb-8 max-w-xl leading-relaxed">
                {description}
              </p>

              {/* Price range */}
              <div className="mb-8">
                <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-1">{texts.priceRange}</p>
                <p className="text-3xl font-serif font-light text-foreground">{category.priceRange}{'EUR'}</p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-14 px-8 text-xs uppercase tracking-[0.2em] font-medium rounded-none bg-foreground text-background hover:bg-foreground/90">
                  <Phone className="mr-2 h-4 w-4" />
                  {texts.requestQuote}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-14 px-8 text-xs uppercase tracking-[0.2em] font-medium rounded-none"
                  asChild
                >
                  <Link href={`/${locale}/${categoria}`}>
                    {texts.viewCatalog}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-3xl font-serif font-light mb-2">{stats.instalaciones}+</p>
                <p className="text-sm text-muted-foreground">{texts.installations}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-serif font-light mb-2">{stats.tiempoEntrega}</p>
                <p className="text-sm text-muted-foreground">{texts.deliveryTime}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-serif font-light mb-2">{stats.satisfaccion.toFixed(1)}★</p>
                <p className="text-sm text-muted-foreground">{texts.rating}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-serif font-light mb-2">2 {texts.years}</p>
                <p className="text-sm text-muted-foreground">{texts.warranty}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-serif font-light text-center mb-12">
              {texts.whyChooseUs}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 border border-border/50 rounded-full">
                  <Truck className="h-5 w-5" />
                </div>
                <h3 className="font-medium mb-2">{texts.deliveryTo} {city.name}</h3>
                <p className="text-sm text-muted-foreground">{texts.deliveryDesc}</p>
              </div>
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 border border-border/50 rounded-full">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="font-medium mb-2">{texts.warrantyTitle}</h3>
                <p className="text-sm text-muted-foreground">{texts.warrantyDesc}</p>
              </div>
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 border border-border/50 rounded-full">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="font-medium mb-2">{texts.fastInstall}</h3>
                <p className="text-sm text-muted-foreground">{texts.fastInstallDesc}</p>
              </div>
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 border border-border/50 rounded-full">
                  <Star className="h-5 w-5" />
                </div>
                <h3 className="font-medium mb-2">{texts.premiumQuality}</h3>
                <p className="text-sm text-muted-foreground">{texts.premiumQualityDesc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-serif font-light text-center mb-4">
              {texts.reviews} {texts.inCity} {city.name}
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              {texts.reviewsSubtitle}
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <div key={index} className="bg-background p-6 rounded-lg shadow-sm">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm mb-4">&ldquo;{review.text}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.location}</p>
                    </div>
                    {review.verified && (
                      <span className="inline-flex items-center gap-1 text-xs text-green-600">
                        <Check className="h-3 w-3" />
                        {texts.verified}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="bg-foreground text-background p-12 lg:p-16 text-center">
              <h2 className="text-2xl lg:text-4xl font-serif font-light mb-4">
                {texts.readyFor} {categoryName.toLowerCase()} {texts.inCity} {city.name}?
              </h2>
              <p className="text-background/70 mb-8 max-w-xl mx-auto">
                {texts.requestQuoteDesc}
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="h-14 px-10 text-xs uppercase tracking-[0.2em] font-medium rounded-none"
              >
                <Phone className="mr-2 h-4 w-4" />
                {texts.contactNow}
              </Button>
            </div>
          </div>
        </section>

        {/* Other Categories */}
        <section className="py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-serif font-light mb-8">
              {texts.otherProducts} {city.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {PRODUCT_CATEGORIES.filter(c => c.slug !== categoria).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${locale}/productos/${cat.slug}/${ciudad}`}
                  className="p-4 bg-background rounded-lg hover:shadow-md transition-shadow text-center"
                >
                  <p className="font-medium text-sm">{cat.translations[validLocale] || cat.translations.en}</p>
                  <p className="text-xs text-muted-foreground mt-1">{cat.priceRange}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby Cities */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-serif font-light mb-8">
              {categoryName} {texts.otherCities}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {nearbyCities.map((nearbyCity) => (
                <Link
                  key={nearbyCity.slug}
                  href={`/${locale}/productos/${categoria}/${nearbyCity.slug}`}
                  className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-center"
                >
                  <p className="font-medium text-sm">{nearbyCity.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer locale={validLocale} />
    </div>
  )
}
