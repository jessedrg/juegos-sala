"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { type Locale } from "@/lib/seo-data";
import { openIntercomChat } from "@/components/intercom";

interface CTAProps {
  locale: Locale;
}

export function CTA({ locale }: CTAProps) {
  const texts: Record<string, { title: string; subtitle: string; cta: string; catalog: string }> = {
    es: { title: '¿Listo para tu sala de juegos?', subtitle: 'Presupuesto sin compromiso. Envío e instalación incluidos.', cta: 'Solicitar Presupuesto', catalog: 'Ver Catálogo' },
    en: { title: 'Ready for your game room?', subtitle: 'Free quote. Shipping and installation included.', cta: 'Request Quote', catalog: 'View Catalog' },
    de: { title: 'Bereit für Ihr Spielzimmer?', subtitle: 'Kostenloses Angebot. Versand und Installation inklusive.', cta: 'Angebot Anfordern', catalog: 'Katalog Ansehen' },
    fr: { title: 'Prêt pour votre salle de jeux?', subtitle: 'Devis gratuit. Livraison et installation incluses.', cta: 'Demander un Devis', catalog: 'Voir Catalogue' },
    it: { title: 'Pronto per la tua sala giochi?', subtitle: 'Preventivo gratuito. Spedizione e installazione incluse.', cta: 'Richiedi Preventivo', catalog: 'Vedi Catalogo' },
    pt: { title: 'Pronto para sua sala de jogos?', subtitle: 'Orçamento grátis. Envio e instalação incluídos.', cta: 'Pedir Orçamento', catalog: 'Ver Catálogo' },
    nl: { title: 'Klaar voor uw speelkamer?', subtitle: 'Gratis offerte. Verzending en installatie inbegrepen.', cta: 'Offerte Aanvragen', catalog: 'Bekijk Catalogus' },
    pl: { title: 'Gotowy na swój pokój gier?', subtitle: 'Darmowa wycena. Wysyłka i instalacja w cenie.', cta: 'Poproś o Wycenę', catalog: 'Zobacz Katalog' },
  };
  const t = texts[locale] || texts.es;

  return (
    <section className="py-24 bg-primary">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-light text-primary-foreground mb-4">
          {t.title}
        </h2>
        <p className="text-primary-foreground/60 mb-10 max-w-md mx-auto">
          {t.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => openIntercomChat()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-card text-foreground text-sm rounded-full hover:bg-secondary transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            {t.cta}
          </button>
          <Link 
            href={`/${locale === 'en' ? '' : locale + '/'}mesas-billar`}
            className="inline-flex items-center gap-2 px-8 py-4 border border-primary-foreground/30 text-primary-foreground text-sm rounded-full hover:bg-primary-foreground/10 transition-colors"
          >
            {t.catalog}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
