import Link from "next/link";
import { type Locale } from "@/lib/seo-data";

interface FooterProps {
  locale: Locale;
}

const CATEGORIES: Record<string, { slug: string; name: string }[]> = {
  es: [{ slug: 'mesas-billar', name: 'Billar' }, { slug: 'futbolines', name: 'Futbolines' }, { slug: 'dardos', name: 'Dardos' }, { slug: 'air-hockey', name: 'Air Hockey' }],
  en: [{ slug: 'pool-tables', name: 'Pool Tables' }, { slug: 'foosball-tables', name: 'Foosball' }, { slug: 'dart-boards', name: 'Darts' }, { slug: 'air-hockey', name: 'Air Hockey' }],
  de: [{ slug: 'billardtische', name: 'Billard' }, { slug: 'tischfussball', name: 'Tischfussball' }, { slug: 'dartscheiben', name: 'Darts' }, { slug: 'airhockey', name: 'Airhockey' }],
  fr: [{ slug: 'tables-billard', name: 'Billard' }, { slug: 'baby-foot', name: 'Baby-foot' }, { slug: 'cibles-flechettes', name: 'Flechettes' }, { slug: 'air-hockey', name: 'Air Hockey' }],
  it: [{ slug: 'tavoli-biliardo', name: 'Biliardo' }, { slug: 'calcio-balilla', name: 'Calcio Balilla' }, { slug: 'bersagli-freccette', name: 'Freccette' }, { slug: 'air-hockey', name: 'Air Hockey' }],
  pt: [{ slug: 'mesas-bilhar', name: 'Bilhar' }, { slug: 'matraquilhos', name: 'Matraquilhos' }, { slug: 'alvos-dardos', name: 'Dardos' }, { slug: 'air-hockey', name: 'Air Hockey' }],
  nl: [{ slug: 'pooltafels', name: 'Pool' }, { slug: 'tafelvoetbal', name: 'Tafelvoetbal' }, { slug: 'dartborden', name: 'Darts' }, { slug: 'airhockey', name: 'Airhockey' }],
  pl: [{ slug: 'stoly-bilardowe', name: 'Bilard' }, { slug: 'pilkarzyki', name: 'Pilkarzyki' }, { slug: 'tarcze-darta', name: 'Dart' }, { slug: 'air-hockey', name: 'Air Hockey' }],
};

export function Footer({ locale }: FooterProps) {
  const texts: Record<string, { desc: string; products: string; company: string; privacy: string; terms: string; about: string; contact: string; faq: string; legal: string }> = {
    es: { desc: 'Mesas de billar, futbolines y juegos de sala de alta calidad para hogares exigentes.', products: 'Productos', company: 'Empresa', privacy: 'Privacidad', terms: 'Terminos', about: 'Nosotros', contact: 'Contacto', faq: 'FAQ', legal: 'Legal' },
    en: { desc: 'High quality pool tables, foosball and game room equipment for discerning homes.', products: 'Products', company: 'Company', privacy: 'Privacy', terms: 'Terms', about: 'About', contact: 'Contact', faq: 'FAQ', legal: 'Legal' },
    de: { desc: 'Hochwertige Billardtische, Tischfussball und Spielzimmerausstattung fur anspruchsvolle Hauser.', products: 'Produkte', company: 'Unternehmen', privacy: 'Datenschutz', terms: 'AGB', about: 'Uber uns', contact: 'Kontakt', faq: 'FAQ', legal: 'Impressum' },
    fr: { desc: 'Tables de billard, baby-foot et equipements de salle de jeux de haute qualite.', products: 'Produits', company: 'Entreprise', privacy: 'Confidentialite', terms: 'CGV', about: 'A propos', contact: 'Contact', faq: 'FAQ', legal: 'Mentions legales' },
    it: { desc: 'Tavoli da biliardo, calcio balilla e attrezzature per sala giochi di alta qualita.', products: 'Prodotti', company: 'Azienda', privacy: 'Privacy', terms: 'Termini', about: 'Chi siamo', contact: 'Contatto', faq: 'FAQ', legal: 'Note legali' },
    pt: { desc: 'Mesas de bilhar, matraquilhos e equipamentos de sala de jogos de alta qualidade.', products: 'Produtos', company: 'Empresa', privacy: 'Privacidade', terms: 'Termos', about: 'Sobre', contact: 'Contato', faq: 'FAQ', legal: 'Legal' },
    nl: { desc: 'Hoogwaardige pooltafels, tafelvoetbal en speelkameruitrusting.', products: 'Producten', company: 'Bedrijf', privacy: 'Privacy', terms: 'Voorwaarden', about: 'Over ons', contact: 'Contact', faq: 'FAQ', legal: 'Juridisch' },
    pl: { desc: 'Wysokiej jakosci stoly bilardowe, pilkarzyki i wyposazenie pokoju gier.', products: 'Produkty', company: 'Firma', privacy: 'Prywatnosc', terms: 'Regulamin', about: 'O nas', contact: 'Kontakt', faq: 'FAQ', legal: 'Nota prawna' },
  };
  const t = texts[locale] || texts.es;
  const cats = CATEGORIES[locale] || CATEGORIES.es;

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href={`/${locale === 'en' ? '' : locale}`} className="font-serif text-xl text-background">
              The Games Room
            </Link>
            <p className="text-sm text-background/40 mt-6 max-w-xs leading-relaxed">
              {t.desc}
            </p>
          </div>

          {/* Products */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-background/40 mb-5">{t.products}</h4>
            <ul className="flex flex-col gap-3">
              {cats.map((cat) => (
                <li key={cat.slug}>
                  <Link 
                    href={`/${locale === 'en' ? '' : locale + '/'}${cat.slug}`}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-background/40 mb-5">{t.company}</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}about`} className="text-sm text-background/60 hover:text-background transition-colors">{t.about}</Link></li>
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}contact`} className="text-sm text-background/60 hover:text-background transition-colors">{t.contact}</Link></li>
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}faq`} className="text-sm text-background/60 hover:text-background transition-colors">{t.faq}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-background/40 mb-5">{t.legal}</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}privacidad`} className="text-sm text-background/60 hover:text-background transition-colors">{t.privacy}</Link></li>
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}terminos`} className="text-sm text-background/60 hover:text-background transition-colors">{t.terms}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-8 border-t border-background/10">
          <p className="text-[11px] text-background/30 tracking-wider">
            {'Copyright'} {new Date().getFullYear()} The Games Room. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
