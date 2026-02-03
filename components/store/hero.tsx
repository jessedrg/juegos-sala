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
      tag: 'Juegos de Sala',
      title: 'Game Room\npara tu hogar',
      subtitle: 'Garantía 2 años. Presupuesto sin compromiso.',
      cta: 'Ver Catálogo',
      stats: [
        { value: '3.000+', label: 'Clientes' },
        { value: '4.8', label: 'Valoración' },
        { value: '2 años', label: 'Garantía' },
      ]
    },
    en: {
      tag: 'Game Room',
      title: 'Game Room\nfor your home',
      subtitle: '2 year warranty. Free quote.',
      cta: 'View Catalog',
      stats: [
        { value: '3,000+', label: 'Customers' },
        { value: '4.8', label: 'Rating' },
        { value: '2 years', label: 'Warranty' },
      ]
    },
    de: {
      tag: 'Spielzimmer',
      title: 'Game Room\nfür Ihr Zuhause',
      subtitle: '2 Jahre Garantie. Kostenloses Angebot.',
      cta: 'Katalog Ansehen',
      stats: [
        { value: '3.000+', label: 'Kunden' },
        { value: '4.8', label: 'Bewertung' },
        { value: '2 Jahre', label: 'Garantie' },
      ]
    },
    fr: {
      tag: 'Salle de Jeux',
      title: 'Game Room\npour votre maison',
      subtitle: 'Garantie 2 ans. Devis gratuit.',
      cta: 'Voir Catalogue',
      stats: [
        { value: '3 000+', label: 'Clients' },
        { value: '4.8', label: 'Note' },
        { value: '2 ans', label: 'Garantie' },
      ]
    },
    it: {
      tag: 'Sala Giochi',
      title: 'Game Room\nper la tua casa',
      subtitle: 'Garanzia 2 anni. Preventivo gratuito.',
      cta: 'Vedi Catalogo',
      stats: [
        { value: '3.000+', label: 'Clienti' },
        { value: '4.8', label: 'Valutazione' },
        { value: '2 anni', label: 'Garanzia' },
      ]
    },
    pt: {
      tag: 'Sala de Jogos',
      title: 'Game Room\npara a sua casa',
      subtitle: 'Garantia 2 anos. Orçamento grátis.',
      cta: 'Ver Catálogo',
      stats: [
        { value: '3.000+', label: 'Clientes' },
        { value: '4.8', label: 'Avaliação' },
        { value: '2 anos', label: 'Garantia' },
      ]
    },
    nl: {
      tag: 'Speelkamer',
      title: 'Game Room\nvoor uw huis',
      subtitle: '2 jaar garantie. Gratis offerte.',
      cta: 'Bekijk Catalogus',
      stats: [
        { value: '3.000+', label: 'Klanten' },
        { value: '4.8', label: 'Beoordeling' },
        { value: '2 jaar', label: 'Garantie' },
      ]
    },
    pl: {
      tag: 'Pokój Gier',
      title: 'Game Room\ndla Twojego domu',
      subtitle: 'Gwarancja 2 lata. Darmowa wycena.',
      cta: 'Zobacz Katalog',
      stats: [
        { value: '3 000+', label: 'Klientów' },
        { value: '4.8', label: 'Ocena' },
        { value: '2 lata', label: 'Gwarancja' },
      ]
    },
  };

  const t = texts[locale] || texts.es;
  const titleParts = t.title.split('\n');

  return (
    <section className="relative min-h-screen bg-[#fafaf9]">
      {/* Grid Layout */}
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left - Content */}
        <div className="flex flex-col justify-center px-6 lg:px-16 py-24 lg:py-32 pt-28">
          <div className="max-w-lg">
            {/* Tag */}
            <span className="inline-block text-xs tracking-widest text-neutral-400 uppercase mb-8">
              {t.tag}
            </span>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-neutral-900 leading-[1.1] mb-6">
              {titleParts.map((part, i) => (
                <span key={i} className={i === 1 ? "block text-neutral-400" : "block"}>
                  {part}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-neutral-500 leading-relaxed mb-10 max-w-md">
              {t.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link 
                href={`/${locale === 'en' ? '' : locale + '/'}mesas-billar`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white text-sm rounded-full hover:bg-neutral-800 transition-colors"
              >
                {t.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button 
                onClick={() => openIntercomChat()}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-neutral-200 text-neutral-700 text-sm rounded-full hover:bg-neutral-100 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {locale === 'es' ? 'Contactar' : locale === 'en' ? 'Contact' : locale === 'de' ? 'Kontakt' : locale === 'fr' ? 'Contact' : locale === 'it' ? 'Contatto' : locale === 'pt' ? 'Contato' : locale === 'nl' ? 'Contact' : locale === 'pl' ? 'Kontakt' : 'Contact'}
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-8 border-t border-neutral-200">
              {t.stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-2xl font-light text-neutral-900">{stat.value}</p>
                  <p className="text-xs text-neutral-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Image */}
        <div className="relative hidden lg:block">
          <Image 
            src="https://images.unsplash.com/photo-1647633391986-4614f2ee0ca4?q=80&w=2767&auto=format&fit=crop" 
            alt="Mesa de billar" 
            fill 
            className="object-cover" 
            priority 
            sizes="50vw"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#fafaf9]/20" />
        </div>
      </div>

      {/* Mobile Image */}
      <div className="relative h-80 lg:hidden">
        <Image 
          src="https://images.unsplash.com/photo-1695727008212-5d46172962b6?q=80&w=1336&auto=format&fit=crop" 
          alt="Mesa de billar" 
          fill 
          className="object-cover" 
          priority 
          sizes="100vw"
        />
      </div>
    </section>
  );
}
