import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { type Locale } from "@/lib/seo-data";

interface CategoriesProps {
  locale: Locale;
}

const CATEGORIES = [
  { 
    slug: 'mesas-billar',
    image: 'https://images.unsplash.com/photo-1695727008212-5d46172962b6?q=80&w=1336&auto=format&fit=crop',
    price: '800',
    names: { es: 'Mesas de Billar', en: 'Pool Tables', de: 'Billardtische', fr: 'Tables de Billard', it: 'Tavoli da Biliardo', pt: 'Mesas de Bilhar', nl: 'Pooltafels', pl: 'Stoly Bilardowe' },
    desc: { es: 'Profesionales y domesticas', en: 'Professional and home use', de: 'Professionell und fur Zuhause', fr: 'Professionnelles et domestiques', it: 'Professionali e domestici', pt: 'Profissionais e domesticas', nl: 'Professioneel en voor thuis', pl: 'Profesjonalne i domowe' }
  },
  { 
    slug: 'futbolines',
    image: 'https://images.unsplash.com/photo-1690073938628-359f281dcabb?q=80&w=1287&auto=format&fit=crop',
    price: '300',
    names: { es: 'Futbolines', en: 'Foosball Tables', de: 'Tischfussball', fr: 'Baby-foot', it: 'Calcio Balilla', pt: 'Matraquilhos', nl: 'Tafelvoetbal', pl: 'Pilkarzyki' },
    desc: { es: 'Diversion para todos', en: 'Fun for everyone', de: 'Spass fur alle', fr: 'Plaisir pour tous', it: 'Divertimento per tutti', pt: 'Diversao para todos', nl: 'Plezier voor iedereen', pl: 'Zabawa dla wszystkich' }
  },
  { 
    slug: 'dardos',
    image: 'https://images.unsplash.com/photo-1638430325415-2f2cc6ae838f?q=80&w=1287&auto=format&fit=crop',
    price: '50',
    names: { es: 'Dianas y Dardos', en: 'Dart Boards', de: 'Dartscheiben', fr: 'Cibles de Flechettes', it: 'Bersagli Freccette', pt: 'Alvos de Dardos', nl: 'Dartborden', pl: 'Tarcze do Darta' },
    desc: { es: 'Electronicas y clasicas', en: 'Electronic and classic', de: 'Elektronisch und klassisch', fr: 'Electroniques et classiques', it: 'Elettroniche e classiche', pt: 'Eletronicas e classicas', nl: 'Elektronisch en klassiek', pl: 'Elektroniczne i klasyczne' }
  },
  { 
    slug: 'air-hockey',
    image: 'https://images.unsplash.com/photo-1650916099935-3c32281bc0e3?q=80&w=1287&auto=format&fit=crop',
    price: '200',
    names: { es: 'Air Hockey', en: 'Air Hockey Tables', de: 'Airhockey-Tische', fr: 'Tables Air Hockey', it: 'Tavoli Air Hockey', pt: 'Mesas Air Hockey', nl: 'Airhockey Tafels', pl: 'Stoly do Air Hockey' },
    desc: { es: 'Accion y velocidad', en: 'Action and speed', de: 'Action und Geschwindigkeit', fr: 'Action et vitesse', it: 'Azione e velocita', pt: 'Acao e velocidade', nl: 'Actie en snelheid', pl: 'Akcja i predkosc' }
  },
];

export function Categories({ locale }: CategoriesProps) {
  const texts: Record<string, { title: string; subtitle: string; from: string }> = {
    es: { title: 'Colecciones', subtitle: 'Calidad premium, diseno atemporal', from: 'Desde' },
    en: { title: 'Collections', subtitle: 'Premium quality, timeless design', from: 'From' },
    de: { title: 'Kollektionen', subtitle: 'Premium-Qualitat, zeitloses Design', from: 'Ab' },
    fr: { title: 'Collections', subtitle: 'Qualite premium, design intemporel', from: 'A partir de' },
    it: { title: 'Collezioni', subtitle: 'Qualita premium, design senza tempo', from: 'Da' },
    pt: { title: 'Colecoes', subtitle: 'Qualidade premium, design atemporal', from: 'Desde' },
    nl: { title: 'Collecties', subtitle: 'Premium kwaliteit, tijdloos ontwerp', from: 'Vanaf' },
    pl: { title: 'Kolekcje', subtitle: 'Jakosc premium, ponadczasowy design', from: 'Od' },
  };
  const t = texts[locale] || texts.es;

  return (
    <section id="collections" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
              {t.title}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-foreground text-balance">
              {t.subtitle}
            </h2>
          </div>
        </div>

        {/* Grid - 2 large + 2 below */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.slug}
              href={`/${locale === 'en' ? '' : locale + '/'}${cat.slug}`}
              className="group block"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary mb-5">
                <Image
                  src={cat.image}
                  alt={cat.names[locale as keyof typeof cat.names] || cat.names.es}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Arrow */}
                <div className="absolute bottom-5 right-5 w-10 h-10 bg-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-foreground" />
                </div>
              </div>
              
              {/* Content */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-medium text-foreground group-hover:text-muted-foreground transition-colors">
                    {cat.names[locale as keyof typeof cat.names] || cat.names.es}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {cat.desc[locale as keyof typeof cat.desc] || cat.desc.es}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground whitespace-nowrap">
                  {t.from} {cat.price}{'EUR'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
