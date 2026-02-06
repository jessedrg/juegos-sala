import type { Metadata } from "next";
import { Header } from "@/components/store/header";
import { Hero } from "@/components/store/hero";
import { Features } from "@/components/store/features";
import { Categories } from "@/components/store/categories";
import { ShopifyProducts } from "@/components/store/shopify-products";
import { CTA } from "@/components/store/cta";
import { LocalSEO } from "@/components/store/local-seo";
import { Footer } from "@/components/store/footer";
import { TRANSLATIONS, SUPPORTED_LOCALES } from "@/lib/seo-data";

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
    languages: Object.fromEntries(
      SUPPORTED_LOCALES.map(l => [l, l === 'en' ? '/' : `/${l}`])
    ),
  },
};

export default function HomePage() {
  const t = TRANSLATIONS.en;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Games Room",
    "url": "https://thegamesroom.io",
    "logo": "https://thegamesroom.io/icon.svg",
    "description": "Pool tables, foosball tables, dart boards and air hockey tables for your home. Free shipping and 2-year warranty.",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Spanish", "English", "German", "French", "Italian", "Portuguese", "Dutch", "Polish"]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "The Games Room",
    "url": "https://thegamesroom.io",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://thegamesroom.io/en/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
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
      <main className="min-h-screen bg-background">
        <Header locale="en" />
        <Hero locale="en" />
        <Features locale="en" />
        <Categories locale="en" />
        <ShopifyProducts locale="en" title={t.products.title} />
        <CTA locale="en" />
        <LocalSEO locale="en" />
        <Footer locale="en" />
      </main>
    </>
  );
}
