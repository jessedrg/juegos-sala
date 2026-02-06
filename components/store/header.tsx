"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Locale } from "@/lib/seo-data";
import { openIntercomChat } from "@/components/intercom";

const CATEGORIES = [
  { slug: 'mesas-billar', name: { es: 'Billar', en: 'Pool', de: 'Billard', fr: 'Billard' } },
  { slug: 'futbolines', name: { es: 'Futbolines', en: 'Foosball', de: 'Tischfussball', fr: 'Baby-foot' } },
  { slug: 'dardos', name: { es: 'Dardos', en: 'Darts', de: 'Darts', fr: 'Flechettes' } },
  { slug: 'air-hockey', name: { es: 'Air Hockey', en: 'Air Hockey', de: 'Airhockey', fr: 'Air Hockey' } },
];

interface HeaderProps {
  locale: Locale;
  transparent?: boolean;
}

export function Header({ locale }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getCatName = (cat: typeof CATEGORIES[0]) => {
    return cat.name[locale as keyof typeof cat.name] || cat.name.en;
  };

  const texts = {
    es: { quote: 'Presupuesto' },
    en: { quote: 'Quote' },
    de: { quote: 'Angebot' },
    fr: { quote: 'Devis' },
  };
  const t = texts[locale as keyof typeof texts] || texts.en;

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border" 
          : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link 
              href={`/${locale === 'en' ? '' : locale}`} 
              className="font-serif text-xl tracking-wide text-foreground"
            >
              The Games Room
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {CATEGORIES.map((cat) => (
                <Link 
                  key={cat.slug}
                  href={`/${locale === 'en' ? '' : locale + '/'}${cat.slug}`} 
                  className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  {getCatName(cat)}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => openIntercomChat()}
                className="hidden sm:flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] px-5 py-2.5 bg-foreground text-background hover:bg-foreground/90 transition-colors"
              >
                <MessageCircle className="w-3 h-3" />
                {t.quote}
              </button>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden p-2 -mr-2 text-foreground"
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
        <div 
          className={cn(
            "absolute inset-0 bg-foreground/30 transition-opacity duration-300",
            isMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsMenuOpen(false)}
        />
        
        <div className={cn(
          "absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background transition-transform duration-300",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex items-center justify-between p-6 border-b border-border">
            <span className="font-serif text-lg">Menu</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 -mr-2">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="p-6">
            {CATEGORIES.map((cat) => (
              <Link 
                key={cat.slug}
                href={`/${locale === 'en' ? '' : locale + '/'}${cat.slug}`}
                onClick={() => setIsMenuOpen(false)}
                className="block py-4 text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors border-b border-border"
              >
                {getCatName(cat)}
              </Link>
            ))}
            <div className="pt-8">
              <button 
                onClick={() => { openIntercomChat(); setIsMenuOpen(false); }}
                className="flex items-center justify-center gap-2 w-full py-4 bg-foreground text-background text-[11px] uppercase tracking-[0.2em]"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                {t.quote}
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
