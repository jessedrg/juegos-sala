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
    image: 'https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?q=80&w=1200&auto=format&fit=crop',
    price: '800€',
    names: { es: 'Mesas de Billar', en: 'Pool Tables', de: 'Billardtische', fr: 'Tables de Billard' },
    desc: { es: 'Profesionales y domésticas', en: 'Professional and home use', de: 'Professionell und für Zuhause', fr: 'Professionnelles et domestiques' }
  },
  { 
    slug: 'futbolines',
    image: 'https://images.unsplash.com/photo-1595912679957-4d0e0e0e0e0e?q=80&w=1200&auto=format&fit=crop',
    price: '300€',
    names: { es: 'Futbolines', en: 'Foosball Tables', de: 'Tischfußball', fr: 'Baby-foot' },
    desc: { es: 'Diversión para todos', en: 'Fun for everyone', de: 'Spaß für alle', fr: 'Plaisir pour tous' }
  },
  { 
    slug: 'dardos',
    image: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?q=80&w=1200&auto=format&fit=crop',
    price: '50€',
    names: { es: 'Dianas y Dardos', en: 'Dart Boards', de: 'Dartscheiben', fr: 'Cibles de Fléchettes' },
    desc: { es: 'Electrónicas y clásicas', en: 'Electronic and classic', de: 'Elektronisch und klassisch', fr: 'Électroniques et classiques' }
  },
  { 
    slug: 'air-hockey',
    image: 'https://images.unsplash.com/photo-1610296669228-602fa827fc1f?q=80&w=1200&auto=format&fit=crop',
    price: '200€',
    names: { es: 'Air Hockey', en: 'Air Hockey Tables', de: 'Airhockey-Tische', fr: 'Tables Air Hockey' },
    desc: { es: 'Acción y velocidad', en: 'Action and speed', de: 'Action und Geschwindigkeit', fr: 'Action et vitesse' }
  },
];

export function Categories({ locale }: CategoriesProps) {
  const texts: Record<string, { title: string; subtitle: string; from: string }> = {
    es: { title: 'Nuestros Productos', subtitle: 'Calidad premium para tu hogar', from: 'Desde' },
    en: { title: 'Our Products', subtitle: 'Premium quality for your home', from: 'From' },
    de: { title: 'Unsere Produkte', subtitle: 'Premium-Qualität für Ihr Zuhause', from: 'Ab' },
    fr: { title: 'Nos Produits', subtitle: 'Qualité premium pour votre maison', from: 'À partir de' },
  };
  const t = texts[locale] || texts.es;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-neutral-900 mb-4">
            {t.title}
          </h2>
          <p className="text-neutral-500">
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
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100 mb-4">
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
                <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="w-4 h-4 text-neutral-900" />
                </div>
              </div>
              
              {/* Content */}
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors">
                  {cat.names[locale as keyof typeof cat.names] || cat.names.es}
                </h3>
                <p className="text-sm text-neutral-400">
                  {cat.desc[locale as keyof typeof cat.desc] || cat.desc.es}
                </p>
                <p className="text-sm text-neutral-500 pt-2">
                  <span className="text-neutral-400">{t.from}</span>{' '}
                  <span className="font-medium text-neutral-900">{cat.price}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
