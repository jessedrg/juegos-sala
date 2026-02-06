"use client";

import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { type Locale } from "@/lib/seo-data";
import { openIntercomChat } from "@/components/intercom";

interface HeroProps {
  locale: Locale;
  cityName?: string;
}

export function Hero({ locale }: HeroProps) {
  const texts: Record<string, { tag: string; line1: string; line2: string; subtitle: string; cta: string; contact: string; stats: { value: string; label: string }[] }> = {
    es: {
      tag: 'Salas de juegos de autor',
      line1: 'Tu espacio de juegos,',
      line2: 'a medida.',
      subtitle: 'Mesas de billar, futbolines profesionales, dianas de dardos y mesas de air hockey. Materiales nobles, envio incluido y garantia de 2 anos.',
      cta: 'Explorar Catalogo',
      contact: 'Presupuesto',
      stats: [
        { value: '3.000+', label: 'Hogares equipados' },
        { value: '4.8/5', label: 'Valoracion media' },
        { value: '2 anos', label: 'Garantia completa' },
      ]
    },
    en: {
      tag: 'Bespoke game rooms',
      line1: 'Your game room,',
      line2: 'made to measure.',
      subtitle: 'Pool tables, professional foosball tables, dart boards and air hockey tables. Noble materials, free shipping and 2-year warranty.',
      cta: 'Explore Catalog',
      contact: 'Get a Quote',
      stats: [
        { value: '3,000+', label: 'Homes equipped' },
        { value: '4.8/5', label: 'Average rating' },
        { value: '2 years', label: 'Full warranty' },
      ]
    },
    de: {
      tag: 'Individuelle Spielzimmer',
      line1: 'Ihr Spielzimmer,',
      line2: 'nach Mass.',
      subtitle: 'Billardtische, professionelle Tischfussball, Dartscheiben und Airhockey-Tische. Edle Materialien, kostenloser Versand und 2 Jahre Garantie.',
      cta: 'Katalog Entdecken',
      contact: 'Angebot',
      stats: [
        { value: '3.000+', label: 'Eingerichtete Hauser' },
        { value: '4.8/5', label: 'Durchschnittsbewertung' },
        { value: '2 Jahre', label: 'Volle Garantie' },
      ]
    },
    fr: {
      tag: 'Salles de jeux sur mesure',
      line1: 'Votre salle de jeux,',
      line2: 'sur mesure.',
      subtitle: 'Tables de billard, baby-foot professionnels, cibles de flechettes et tables de air hockey. Materiaux nobles, livraison gratuite et garantie 2 ans.',
      cta: 'Decouvrir',
      contact: 'Devis',
      stats: [
        { value: '3 000+', label: 'Maisons equipees' },
        { value: '4.8/5', label: 'Note moyenne' },
        { value: '2 ans', label: 'Garantie complete' },
      ]
    },
    it: {
      tag: 'Sale giochi su misura',
      line1: 'La tua sala giochi,',
      line2: 'su misura.',
      subtitle: 'Tavoli da biliardo, calcio balilla professionali, bersagli freccette e tavoli air hockey. Materiali nobili, spedizione gratuita e garanzia 2 anni.',
      cta: 'Esplora Catalogo',
      contact: 'Preventivo',
      stats: [
        { value: '3.000+', label: 'Case arredate' },
        { value: '4.8/5', label: 'Valutazione media' },
        { value: '2 anni', label: 'Garanzia completa' },
      ]
    },
    pt: {
      tag: 'Salas de jogos sob medida',
      line1: 'A sua sala de jogos,',
      line2: 'sob medida.',
      subtitle: 'Mesas de bilhar, matraquilhos profissionais, alvos de dardos e mesas de air hockey. Materiais nobres, envio gratis e garantia 2 anos.',
      cta: 'Explorar Catalogo',
      contact: 'Orcamento',
      stats: [
        { value: '3.000+', label: 'Casas equipadas' },
        { value: '4.8/5', label: 'Avaliacao media' },
        { value: '2 anos', label: 'Garantia completa' },
      ]
    },
    nl: {
      tag: 'Speelkamers op maat',
      line1: 'Uw speelkamer,',
      line2: 'op maat.',
      subtitle: 'Pooltafels, professionele tafelvoetbal, dartborden en airhockey tafels. Edele materialen, gratis verzending en 2 jaar garantie.',
      cta: 'Catalogus',
      contact: 'Offerte',
      stats: [
        { value: '3.000+', label: 'Huizen ingericht' },
        { value: '4.8/5', label: 'Gemiddelde score' },
        { value: '2 jaar', label: 'Volledige garantie' },
      ]
    },
    pl: {
      tag: 'Pokoje gier na wymiar',
      line1: 'Twoj pokoj gier,',
      line2: 'na wymiar.',
      subtitle: 'Stoly bilardowe, profesjonalne pilkarzyki, tarcze do darta i stoly do air hockey. Szlachetne materialy, darmowa wysylka i gwarancja 2 lata.',
      cta: 'Odkryj Katalog',
      contact: 'Wycena',
      stats: [
        { value: '3 000+', label: 'Wyposazonych domow' },
        { value: '4.8/5', label: 'Srednia ocena' },
        { value: '2 lata', label: 'Pelna gwarancja' },
      ]
    },
  };

  const t = texts[locale] || texts.es;

  return (
    <section className="relative bg-background overflow-hidden">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20 lg:pt-40 lg:pb-28">
        {/* Tag */}
        <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-10">
          {t.tag}
        </p>

        {/* Big editorial headline */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-foreground leading-[1.05] mb-8 max-w-4xl">
          <span className="block">{t.line1}</span>
          <span className="block italic text-muted-foreground">{t.line2}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-12 max-w-xl">
          {t.subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-start gap-4 mb-20">
          <button 
            onClick={() => {
              const collectionsSection = document.getElementById('collections');
              if (collectionsSection) {
                collectionsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background text-xs uppercase tracking-[0.2em] font-medium hover:bg-foreground/90 transition-colors cursor-pointer"
          >
            {t.cta}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => openIntercomChat()}
            className="inline-flex items-center gap-3 px-8 py-4 border border-border text-foreground text-xs uppercase tracking-[0.2em] font-medium hover:bg-secondary transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            {t.contact}
          </button>
        </div>

        {/* Image - full width editorial */}
        <div className="relative w-full aspect-[21/9] overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1647633391986-4614f2ee0ca4?q=80&w=2767&auto=format&fit=crop" 
            alt="Mesa de billar profesional en salon de juegos elegante" 
            fill 
            className="object-cover" 
            priority 
            sizes="100vw"
          />
        </div>

        {/* Stats bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-16 pt-12 mt-12 border-t border-border">
          {t.stats.map((stat, i) => (
            <div key={i}>
              <p className="text-2xl lg:text-3xl font-serif font-light text-foreground">{stat.value}</p>
              <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
