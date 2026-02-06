import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/store/header";
import { Hero } from "@/components/store/hero";
import { Features } from "@/components/store/features";
import { Categories } from "@/components/store/categories";
import { ShopifyProducts } from "@/components/store/shopify-products"; // Updated import
import { CTA } from "@/components/store/cta";
import { Testimonials } from "@/components/store/testimonials";
import { BuyingGuide } from "@/components/store/buying-guide";
import { LocalSEO } from "@/components/store/local-seo";
import { Footer } from "@/components/store/footer";
import { SUPPORTED_LOCALES, TRANSLATIONS, type Locale } from "@/lib/seo-data";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.filter(l => l !== 'en').map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
    return {};
  }

  const t = TRANSLATIONS[locale as Locale];
  const title = t.hero.title.replace('\n', ' ');
  const description = t.hero.subtitle;
  const canonicalUrl = `/${locale}`;
  
  return {
    title: `The Games Room | ${title}`,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map(l => [l, l === 'en' ? '/' : `/${l}`])
      ),
    },
    openGraph: {
      title: `The Games Room | ${title}`,
      description,
      url: canonicalUrl,
      siteName: 'The Games Room',
      locale: locale === 'es' ? 'es_ES' : locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      type: 'website',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1647633391986-4614f2ee0ca4?w=1200&h=630&fit=crop&q=80',
          width: 1200,
          height: 630,
          alt: `The Games Room - ${title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `The Games Room | ${title}`,
      description,
      images: ['https://images.unsplash.com/photo-1647633391986-4614f2ee0ca4?w=1200&h=630&fit=crop&q=80'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocalePage({ params }: PageProps) {
  const { locale } = await params;
  
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
    notFound();
  }

  const validLocale = locale as Locale;
  const t = TRANSLATIONS[validLocale];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Games Room",
    "url": "https://thegamesroom.io",
    "logo": "https://thegamesroom.io/icon.svg",
    "description": t.hero.subtitle,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Spanish", "English", "German", "French", "Italian", "Portuguese", "Dutch", "Polish"]
    },
    "sameAs": []
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "The Games Room",
    "url": "https://thegamesroom.io",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `https://thegamesroom.io/${locale}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": t.products.title,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === 'es' ? "Mesas de Billar" : "Pool Tables",
        "url": `https://thegamesroom.io/${locale}/mesas-billar`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": locale === 'es' ? "Futbolines" : "Foosball Tables",
        "url": `https://thegamesroom.io/${locale}/futbolines`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": locale === 'es' ? "Dardos" : "Dart Boards",
        "url": `https://thegamesroom.io/${locale}/dardos`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Air Hockey",
        "url": `https://thegamesroom.io/${locale}/air-hockey`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <main className="min-h-screen bg-background">
        <Header locale={validLocale} />
        <Hero locale={validLocale} />
        <Features locale={validLocale} />
        <Categories locale={validLocale} />
        <ShopifyProducts locale={validLocale} title={t.products.title} />
        <Testimonials locale={validLocale} />
        <BuyingGuide locale={validLocale} />
        <CTA locale={validLocale} />
        <LocalSEO locale={validLocale} />
        <Footer locale={validLocale} />
      </main>
    </>
  );
}
