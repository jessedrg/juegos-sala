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
    price: '800€',
    names: { es: 'Mesas de Billar', en: 'Pool Tables', de: 'Billardtische', fr: 'Tables de Billard', it: 'Tavoli da Biliardo', pt: 'Mesas de Bilhar', nl: 'Pooltafels', pl: 'Stoły Bilardowe' },
    desc: { es: 'Profesionales y domésticas', en: 'Professional and home use', de: 'Professionell und für Zuhause', fr: 'Professionnelles et domestiques', it: 'Professionali e domestici', pt: 'Profissionais e domésticas', nl: 'Professioneel en voor thuis', pl: 'Profesjonalne i domowe' }
  },
  { 
    slug: 'futbolines',
    image: 'https://images.unsplash.com/photo-1690073938628-359f281dcabb?q=80&w=1287&auto=format&fit=crop',
    price: '300€',
    names: { es: 'Futbolines', en: 'Foosball Tables', de: 'Tischfußball', fr: 'Baby-foot', it: 'Calcio Balilla', pt: 'Matraquilhos', nl: 'Tafelvoetbal', pl: 'Piłkarzyki' },
    desc: { es: 'Diversión para todos', en: 'Fun for everyone', de: 'Spaß für alle', fr: 'Plaisir pour tous', it: 'Divertimento per tutti', pt: 'Diversão para todos', nl: 'Plezier voor iedereen', pl: 'Zabawa dla wszystkich' }
  },
  { 
    slug: 'dardos',
    image: 'https://images.unsplash.com/photo-1638430325415-2f2cc6ae838f?q=80&w=1287&auto=format&fit=crop',
    price: '50€',
    names: { es: 'Dianas y Dardos', en: 'Dart Boards', de: 'Dartscheiben', fr: 'Cibles de Fléchettes', it: 'Bersagli Freccette', pt: 'Alvos de Dardos', nl: 'Dartborden', pl: 'Tarcze do Darta' },
    desc: { es: 'Electrónicas y clásicas', en: 'Electronic and classic', de: 'Elektronisch und klassisch', fr: 'Électroniques et classiques', it: 'Elettroniche e classiche', pt: 'Eletrônicas e clássicas', nl: 'Elektronisch en klassiek', pl: 'Elektroniczne i klasyczne' }
  },
  { 
    slug: 'air-hockey',
    image: 'https://images.unsplash.com/photo-1650916099935-3c32281bc0e3?q=80&w=1287&auto=format&fit=crop',
    price: '200€',
    names: { es: 'Air Hockey', en: 'Air Hockey Tables', de: 'Airhockey-Tische', fr: 'Tables Air Hockey', it: 'Tavoli Air Hockey', pt: 'Mesas Air Hockey', nl: 'Airhockey Tafels', pl: 'Stoły do Air Hockey' },
    desc: { es: 'Acción y velocidad', en: 'Action and speed', de: 'Action und Geschwindigkeit', fr: 'Action et vitesse', it: 'Azione e velocità', pt: 'Ação e velocidade', nl: 'Actie en snelheid', pl: 'Akcja i prędkość' }
  },
];

export function Categories({ locale }: CategoriesProps) {
  const texts: Record<string, { title: string; subtitle: string; from: string }> = {
    es: { title: 'Nuestros Productos', subtitle: 'Calidad premium para tu hogar', from: 'Desde' },
    en: { title: 'Our Products', subtitle: 'Premium quality for your home', from: 'From' },
    de: { title: 'Unsere Produkte', subtitle: 'Premium-Qualität für Ihr Zuhause', from: 'Ab' },
    fr: { title: 'Nos Produits', subtitle: 'Qualité premium pour votre maison', from: 'À partir de' },
    it: { title: 'I Nostri Prodotti', subtitle: 'Qualità premium per la tua casa', from: 'Da' },
    pt: { title: 'Nossos Produtos', subtitle: 'Qualidade premium para sua casa', from: 'Desde' },
    nl: { title: 'Onze Producten', subtitle: 'Premium kwaliteit voor uw huis', from: 'Vanaf' },
    pl: { title: 'Nasze Produkty', subtitle: 'Jakość premium dla Twojego domu', from: 'Od' },
  };
  const t = texts[locale] || texts.es;

  return (
    <section id="collections" className="py-24 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-4">
            {t.title}
          </h2>
          <p className="text-muted-foreground">
            {t.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.slug}
              href={`/${locale === 'en' ? '' : locale + '/'}${cat.slug}`}
              className="group"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted mb-4">
                <Image
                  src={cat.image}
                  alt={cat.names[locale as keyof typeof cat.names] || cat.names.es}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                {/* Arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-card rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="w-4 h-4 text-foreground" />
                </div>
              </div>
              
              {/* Content */}
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-foreground group-hover:text-muted-foreground transition-colors">
                  {cat.names[locale as keyof typeof cat.names] || cat.names.es}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {cat.desc[locale as keyof typeof cat.desc] || cat.desc.es}
                </p>
                <p className="text-sm text-muted-foreground pt-2">
                  <span className="text-muted-foreground">{t.from}</span>{' '}
                  <span className="font-medium text-foreground">{cat.price}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
