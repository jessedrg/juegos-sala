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
    es: { title: 'Listo para transformar tu espacio?', subtitle: 'Presupuesto sin compromiso. Envio e instalacion incluidos en toda Europa.', cta: 'Solicitar Presupuesto', catalog: 'Ver Catalogo' },
    en: { title: 'Ready to transform your space?', subtitle: 'Free quote. Shipping and installation included across Europe.', cta: 'Request Quote', catalog: 'View Catalog' },
    de: { title: 'Bereit, Ihren Raum zu verwandeln?', subtitle: 'Kostenloses Angebot. Versand und Installation in ganz Europa inklusive.', cta: 'Angebot Anfordern', catalog: 'Katalog Ansehen' },
    fr: { title: 'Pret a transformer votre espace?', subtitle: 'Devis gratuit. Livraison et installation incluses dans toute l\'Europe.', cta: 'Demander un Devis', catalog: 'Voir Catalogue' },
    it: { title: 'Pronto a trasformare il tuo spazio?', subtitle: 'Preventivo gratuito. Spedizione e installazione incluse in tutta Europa.', cta: 'Richiedi Preventivo', catalog: 'Vedi Catalogo' },
    pt: { title: 'Pronto para transformar seu espaco?', subtitle: 'Orcamento sem compromisso. Envio e instalacao incluidos em toda Europa.', cta: 'Pedir Orcamento', catalog: 'Ver Catalogo' },
    nl: { title: 'Klaar om uw ruimte te transformeren?', subtitle: 'Gratis offerte. Verzending en installatie in heel Europa inbegrepen.', cta: 'Offerte Aanvragen', catalog: 'Bekijk Catalogus' },
    pl: { title: 'Gotowy, by zmienic swoja przestrzen?', subtitle: 'Bezplatna wycena. Wysylka i instalacja w calej Europie w cenie.', cta: 'Popros o Wycene', catalog: 'Zobacz Katalog' },
  };
  const t = texts[locale] || texts.es;

  return (
    <section className="py-24 lg:py-32 bg-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-background leading-tight mb-6">
            {t.title}
          </h2>
          <p className="text-background/50 text-base leading-relaxed mb-10 max-w-md">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <button 
              onClick={() => openIntercomChat()}
              className="inline-flex items-center gap-3 px-8 py-4 bg-background text-foreground text-xs uppercase tracking-[0.2em] font-medium hover:bg-background/90 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              {t.cta}
            </button>
            <Link 
              href={`/${locale === 'en' ? '' : locale + '/'}mesas-billar`}
              className="inline-flex items-center gap-3 px-8 py-4 border border-background/20 text-background text-xs uppercase tracking-[0.2em] font-medium hover:bg-background/5 transition-colors"
            >
              {t.catalog}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
