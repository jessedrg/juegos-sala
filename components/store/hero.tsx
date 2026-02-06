"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { type Locale } from "@/lib/seo-data";
import { openIntercomChat } from "@/components/intercom";

interface HeroProps {
  locale: Locale;
  cityName?: string;
}

export function Hero({ locale }: HeroProps) {
  const texts: Record<string, { tag: string; title: string; subtitle: string; cta: string; stats: { value: string; label: string }[] }> = {
    es: {
      tag: 'Mesas de Billar, Futbolines, Dardos y Air Hockey',
      title: 'The Games Room\npara tu hogar',
      subtitle: 'Mesas de billar, futbolines profesionales, dianas de dardos y mesas de air hockey. Envio gratis, garantia 2 anos y presupuesto sin compromiso.',
      cta: 'Ver Catalogo',
      stats: [
        { value: '3.000+', label: 'Clientes' },
        { value: '4.8', label: 'Valoracion' },
        { value: '2 anos', label: 'Garantia' },
      ]
    },
    en: {
      tag: 'Pool Tables, Foosball, Darts & Air Hockey',
      title: 'The Games Room\nfor your home',
      subtitle: 'Pool tables, professional foosball tables, dart boards and air hockey tables. Free shipping, 2-year warranty and free quote.',
      cta: 'View Catalog',
      stats: [
        { value: '3,000+', label: 'Customers' },
        { value: '4.8', label: 'Rating' },
        { value: '2 years', label: 'Warranty' },
      ]
    },
    de: {
      tag: 'Billardtische, Tischfussball, Darts & Airhockey',
      title: 'The Games Room\nfur Ihr Zuhause',
      subtitle: 'Billardtische, professionelle Tischfussball, Dartscheiben und Airhockey-Tische. Kostenloser Versand und 2 Jahre Garantie.',
      cta: 'Katalog Ansehen',
      stats: [
        { value: '3.000+', label: 'Kunden' },
        { value: '4.8', label: 'Bewertung' },
        { value: '2 Jahre', label: 'Garantie' },
      ]
    },
    fr: {
      tag: 'Billard, Baby-foot, Flechettes & Air Hockey',
      title: 'The Games Room\npour votre maison',
      subtitle: 'Tables de billard, baby-foot professionnels, cibles de flechettes et tables de air hockey. Livraison gratuite et garantie 2 ans.',
      cta: 'Voir Catalogue',
      stats: [
        { value: '3 000+', label: 'Clients' },
        { value: '4.8', label: 'Note' },
        { value: '2 ans', label: 'Garantie' },
      ]
    },
    it: {
      tag: 'Biliardo, Calcio Balilla, Freccette & Air Hockey',
      title: 'The Games Room\nper la tua casa',
      subtitle: 'Tavoli da biliardo, calcio balilla professionali, bersagli freccette e tavoli air hockey. Spedizione gratuita e garanzia 2 anni.',
      cta: 'Vedi Catalogo',
      stats: [
        { value: '3.000+', label: 'Clienti' },
        { value: '4.8', label: 'Valutazione' },
        { value: '2 anni', label: 'Garanzia' },
      ]
    },
    pt: {
      tag: 'Bilhar, Matraquilhos, Dardos & Air Hockey',
      title: 'The Games Room\npara a sua casa',
      subtitle: 'Mesas de bilhar, matraquilhos profissionais, alvos de dardos e mesas de air hockey. Envio gratis e garantia 2 anos.',
      cta: 'Ver Catalogo',
      stats: [
        { value: '3.000+', label: 'Clientes' },
        { value: '4.8', label: 'Avaliacao' },
        { value: '2 anos', label: 'Garantia' },
      ]
    },
    nl: {
      tag: 'Pooltafels, Tafelvoetbal, Darts & Airhockey',
      title: 'The Games Room\nvoor uw huis',
      subtitle: 'Pooltafels, professionele tafelvoetbal, dartborden en airhockey tafels. Gratis verzending en 2 jaar garantie.',
      cta: 'Bekijk Catalogus',
      stats: [
        { value: '3.000+', label: 'Klanten' },
        { value: '4.8', label: 'Beoordeling' },
        { value: '2 jaar', label: 'Garantie' },
      ]
    },
    pl: {
      tag: 'Bilard, Pilkarzyki, Darts & Air Hockey',
      title: 'The Games Room\ndla Twojego domu',
      subtitle: 'Stoly bilardowe, profesjonalne pilkarzyki, tarcze do darta i stoly do air hockey. Darmowa wysylka i gwarancja 2 lata.',
      cta: 'Zobacz Katalog',
      stats: [
        { value: '3 000+', label: 'Klientow' },
        { value: '4.8', label: 'Ocena' },
        { value: '2 lata', label: 'Gwarancja' },
      ]
    },
  };

  const t = texts[locale] || texts.es;
  const titleParts = t.title.split('\n');

  return (
    <section className="relative min-h-screen bg-background">
      {/* Grid Layout */}
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left - Content */}
        <div className="flex flex-col justify-center px-6 lg:px-16 py-24 lg:py-32 pt-28">
          <div className="max-w-lg">
            {/* Tag */}
            <span className="inline-block text-xs tracking-widest text-muted-foreground uppercase mb-8">
              {t.tag}
            </span>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-foreground leading-[1.1] mb-6">
              {titleParts.map((part, i) => (
                <span key={i} className={i === 1 ? "block text-muted-foreground" : "block"}>
                  {part}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-md">
              {t.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <button 
                onClick={() => {
                  const collectionsSection = document.getElementById('collections');
                  if (collectionsSection) {
                    collectionsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm rounded-full hover:bg-primary/90 transition-colors cursor-pointer"
              >
                {t.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => openIntercomChat()}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-foreground text-sm rounded-full hover:bg-muted transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {locale === 'es' ? 'Contactar' : locale === 'en' ? 'Contact' : locale === 'de' ? 'Kontakt' : locale === 'fr' ? 'Contact' : locale === 'it' ? 'Contatto' : locale === 'pt' ? 'Contato' : locale === 'nl' ? 'Contact' : locale === 'pl' ? 'Kontakt' : 'Contact'}
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-8 border-t border-border">
              {t.stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-2xl font-light text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Image */}
        <div className="relative hidden lg:block">
          <Image 
            src="https://images.unsplash.com/photo-1647633391986-4614f2ee0ca4?q=80&w=2767&auto=format&fit=crop" 
            alt="Mesa de billar profesional en salon de juegos" 
            fill 
            className="object-cover" 
            priority 
            sizes="50vw"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/20" />
        </div>
      </div>

      {/* Mobile Image */}
      <div className="relative h-80 lg:hidden">
        <Image 
          src="https://images.unsplash.com/photo-1695727008212-5d46172962b6?q=80&w=1336&auto=format&fit=crop" 
          alt="Mesa de billar de alta calidad" 
          fill 
          className="object-cover" 
          priority 
          sizes="100vw"
        />
      </div>
    </section>
  );
}
