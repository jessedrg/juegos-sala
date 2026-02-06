import Link from "next/link";
import { type Locale } from "@/lib/seo-data";

interface FooterProps {
  locale: Locale;
}

const CATEGORIES: Record<string, { slug: string; name: string }[]> = {
  es: [{ slug: 'mesas-billar', name: 'Billar' }, { slug: 'futbolines', name: 'Futbolines' }, { slug: 'dardos', name: 'Dardos' }, { slug: 'air-hockey', name: 'Air Hockey' }],
  en: [{ slug: 'pool-tables', name: 'Pool Tables' }, { slug: 'foosball-tables', name: 'Foosball' }, { slug: 'dart-boards', name: 'Darts' }, { slug: 'air-hockey', name: 'Air Hockey' }],
  de: [{ slug: 'billardtische', name: 'Billard' }, { slug: 'tischfussball', name: 'Tischfußball' }, { slug: 'dartscheiben', name: 'Darts' }, { slug: 'airhockey', name: 'Airhockey' }],
  fr: [{ slug: 'tables-billard', name: 'Billard' }, { slug: 'baby-foot', name: 'Baby-foot' }, { slug: 'cibles-flechettes', name: 'Fléchettes' }, { slug: 'air-hockey', name: 'Air Hockey' }],
  it: [{ slug: 'tavoli-biliardo', name: 'Biliardo' }, { slug: 'calcio-balilla', name: 'Calcio Balilla' }, { slug: 'bersagli-freccette', name: 'Freccette' }, { slug: 'air-hockey', name: 'Air Hockey' }],
  pt: [{ slug: 'mesas-bilhar', name: 'Bilhar' }, { slug: 'matraquilhos', name: 'Matraquilhos' }, { slug: 'alvos-dardos', name: 'Dardos' }, { slug: 'air-hockey', name: 'Air Hockey' }],
  nl: [{ slug: 'pooltafels', name: 'Pool' }, { slug: 'tafelvoetbal', name: 'Tafelvoetbal' }, { slug: 'dartborden', name: 'Darts' }, { slug: 'airhockey', name: 'Airhockey' }],
  pl: [{ slug: 'stoly-bilardowe', name: 'Bilard' }, { slug: 'pilkarzyki', name: 'Piłkarzyki' }, { slug: 'tarcze-darta', name: 'Dart' }, { slug: 'air-hockey', name: 'Air Hockey' }],
};

export function Footer({ locale }: FooterProps) {
  const texts: Record<string, { desc: string; products: string; company: string; legal: string; privacy: string; terms: string; about: string; contact: string; faq: string }> = {
    es: { desc: 'Mesas de billar, futbolines y juegos de sala de alta calidad.', products: 'Productos', company: 'Empresa', legal: 'Legal', privacy: 'Privacidad', terms: 'Términos', about: 'Nosotros', contact: 'Contacto', faq: 'FAQ' },
    en: { desc: 'High quality pool tables, foosball and game room equipment.', products: 'Products', company: 'Company', legal: 'Legal', privacy: 'Privacy', terms: 'Terms', about: 'About', contact: 'Contact', faq: 'FAQ' },
    de: { desc: 'Hochwertige Billardtische, Tischfußball und Spielzimmerausstattung.', products: 'Produkte', company: 'Unternehmen', legal: 'Impressum', privacy: 'Datenschutz', terms: 'AGB', about: 'Über uns', contact: 'Kontakt', faq: 'FAQ' },
    fr: { desc: 'Tables de billard, baby-foot et équipements de salle de jeux de haute qualité.', products: 'Produits', company: 'Entreprise', legal: 'Mentions légales', privacy: 'Confidentialité', terms: 'CGV', about: 'À propos', contact: 'Contact', faq: 'FAQ' },
    it: { desc: 'Tavoli da biliardo, calcio balilla e attrezzature per sala giochi di alta qualità.', products: 'Prodotti', company: 'Azienda', legal: 'Note legali', privacy: 'Privacy', terms: 'Termini', about: 'Chi siamo', contact: 'Contatto', faq: 'FAQ' },
    pt: { desc: 'Mesas de bilhar, matraquilhos e equipamentos de sala de jogos de alta qualidade.', products: 'Produtos', company: 'Empresa', legal: 'Legal', privacy: 'Privacidade', terms: 'Termos', about: 'Sobre', contact: 'Contato', faq: 'FAQ' },
    nl: { desc: 'Hoogwaardige pooltafels, tafelvoetbal en speelkameruitrusting.', products: 'Producten', company: 'Bedrijf', legal: 'Juridisch', privacy: 'Privacy', terms: 'Voorwaarden', about: 'Over ons', contact: 'Contact', faq: 'FAQ' },
    pl: { desc: 'Wysokiej jakości stoły bilardowe, piłkarzyki i wyposażenie pokoju gier.', products: 'Produkty', company: 'Firma', legal: 'Nota prawna', privacy: 'Prywatność', terms: 'Regulamin', about: 'O nas', contact: 'Kontakt', faq: 'FAQ' },
  };
  const t = texts[locale] || texts.es;
  const cats = CATEGORIES[locale] || CATEGORIES.es;

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href={`/${locale === 'en' ? '' : locale}`} className="text-lg font-serif font-light text-foreground">
              The Games Room
            </Link>
            <p className="text-sm text-muted-foreground mt-4 max-w-xs leading-relaxed">
              {t.desc}
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">{t.products}</h4>
            <ul className="space-y-3">
              {cats.map((cat) => (
                <li key={cat.slug}>
                  <Link 
                    href={`/${locale === 'en' ? '' : locale + '/'}${cat.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">{t.company}</h4>
            <ul className="space-y-3">
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}about`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.about}</Link></li>
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}contact`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.contact}</Link></li>
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}faq`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.faq}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} The Games Room
          </p>
          <div className="flex items-center gap-6">
            <Link href={`/${locale === 'en' ? '' : locale + '/'}privacidad`} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {t.privacy}
            </Link>
            <Link href={`/${locale === 'en' ? '' : locale + '/'}terminos`} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {t.terms}
            </Link>
            <Link href={`/${locale === 'en' ? '' : locale + '/'}legal`} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {t.legal}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
