import Link from "next/link";
import { type Locale } from "@/lib/seo-data";

interface FooterProps {
  locale: Locale;
}

const CATEGORIES = [
  { slug: 'mesas-billar', name: 'Billar' },
  { slug: 'futbolines', name: 'Futbolines' },
  { slug: 'dardos', name: 'Dardos' },
  { slug: 'air-hockey', name: 'Air Hockey' },
];

export function Footer({ locale }: FooterProps) {
  const texts: Record<string, { desc: string; products: string; company: string; legal: string; privacy: string; terms: string }> = {
    es: { desc: 'Mesas de billar, futbolines y juegos de sala de alta calidad.', products: 'Productos', company: 'Empresa', legal: 'Legal', privacy: 'Privacidad', terms: 'Términos' },
    en: { desc: 'High quality pool tables, foosball and game room equipment.', products: 'Products', company: 'Company', legal: 'Legal', privacy: 'Privacy', terms: 'Terms' },
    de: { desc: 'Hochwertige Billardtische, Tischfußball und Spielzimmerausstattung.', products: 'Produkte', company: 'Unternehmen', legal: 'Rechtliches', privacy: 'Datenschutz', terms: 'AGB' },
    fr: { desc: 'Tables de billard, baby-foot et équipements de salle de jeux de haute qualité.', products: 'Produits', company: 'Entreprise', legal: 'Mentions légales', privacy: 'Confidentialité', terms: 'CGV' },
  };
  const t = texts[locale] || texts.es;

  return (
    <footer className="bg-neutral-50 border-t border-neutral-100">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href={`/${locale === 'en' ? '' : locale}`} className="text-lg font-light text-neutral-900">
              Game Room
            </Link>
            <p className="text-sm text-neutral-500 mt-4 max-w-xs leading-relaxed">
              {t.desc}
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-4">{t.products}</h4>
            <ul className="space-y-3">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link 
                    href={`/${locale === 'en' ? '' : locale + '/'}${cat.slug}`}
                    className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-4">{t.company}</h4>
            <ul className="space-y-3">
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}about`} className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">About</Link></li>
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}contacto`} className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Contacto</Link></li>
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}faq`} className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} Game Room
          </p>
          <div className="flex items-center gap-6">
            <Link href={`/${locale === 'en' ? '' : locale + '/'}privacidad`} className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors">
              {t.privacy}
            </Link>
            <Link href={`/${locale === 'en' ? '' : locale + '/'}terminos`} className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors">
              {t.terms}
            </Link>
            <Link href={`/${locale === 'en' ? '' : locale + '/'}legal`} className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors">
              {t.legal}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
