"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Locale } from "@/lib/seo-data";
import { openIntercomChat } from "@/components/intercom";

const CATEGORIES = [
  { slug: 'mesas-billar', name: { es: 'Billar', en: 'Pool', de: 'Billard', fr: 'Billard' } },
  { slug: 'futbolines', name: { es: 'Futbolines', en: 'Foosball', de: 'Tischfußball', fr: 'Baby-foot' } },
  { slug: 'dardos', name: { es: 'Dardos', en: 'Darts', de: 'Darts', fr: 'Fléchettes' } },
  { slug: 'air-hockey', name: { es: 'Air Hockey', en: 'Air Hockey', de: 'Airhockey', fr: 'Air Hockey' } },
];

interface HeaderProps {
  locale: Locale;
  transparent?: boolean;
}

export function Header({ locale, transparent = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getCatName = (cat: typeof CATEGORIES[0]) => {
    return cat.name[locale as keyof typeof cat.name] || cat.name.en;
  };

  const texts = {
    es: { contact: 'Contacto', quote: 'Presupuesto' },
    en: { contact: 'Contact', quote: 'Quote' },
    de: { contact: 'Kontakt', quote: 'Angebot' },
    fr: { contact: 'Contact', quote: 'Devis' },
  };
  const t = texts[locale as keyof typeof texts] || texts.en;

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        transparent 
          ? "bg-transparent" 
          : "bg-card/80 backdrop-blur-md border-b border-border"
      )}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex h-14 items-center justify-between">
            {/* Logo */}
            <Link 
              href={`/${locale === 'en' ? '' : locale}`} 
              className={cn(
                "text-lg font-light tracking-wide transition-colors",
                transparent ? "text-primary-foreground" : "text-foreground"
              )}
            >
              The Games Room
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {CATEGORIES.map((cat) => (
                <Link 
                  key={cat.slug}
                  href={`/${locale === 'en' ? '' : locale + '/'}${cat.slug}`} 
                  className={cn(
                    "text-sm transition-colors",
                    transparent 
                      ? "text-primary-foreground/70 hover:text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {getCatName(cat)}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => openIntercomChat()}
                className={cn(
                  "hidden sm:flex items-center gap-2 text-sm px-4 py-2 rounded-full transition-all",
                  transparent 
                    ? "bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20" 
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                {t.quote}
              </button>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(true)}
                className={cn(
                  "md:hidden p-2 -mr-2",
                  transparent ? "text-primary-foreground" : "text-foreground"
                )}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-[100] transition-all duration-300",
        isMenuOpen ? "visible" : "invisible"
      )}>
        {/* Backdrop */}
        <div 
          className={cn(
            "absolute inset-0 bg-black/50 transition-opacity duration-300",
            isMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Panel */}
        <div className={cn(
          "absolute right-0 top-0 bottom-0 w-full max-w-sm bg-card transition-transform duration-300",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex items-center justify-between p-6 border-b border-border">
            <span className="text-lg font-light">Menu</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 -mr-2">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="p-6 space-y-1">
            {CATEGORIES.map((cat) => (
              <Link 
                key={cat.slug}
                href={`/${locale === 'en' ? '' : locale + '/'}${cat.slug}`}
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 text-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                {getCatName(cat)}
              </Link>
            ))}
            <div className="pt-6 mt-6 border-t border-border">
              <button 
                onClick={() => { openIntercomChat(); setIsMenuOpen(false); }}
                className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground rounded-full"
              >
                <MessageCircle className="w-4 h-4" />
                {t.quote}
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
