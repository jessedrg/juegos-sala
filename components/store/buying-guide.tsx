import Image from "next/image";
import { type Locale } from "@/lib/seo-data";

interface BuyingGuideProps {
  locale: Locale;
}

export function BuyingGuide({ locale }: BuyingGuideProps) {
  const content: Record<string, {
    title: string;
    subtitle: string;
    sections: { title: string; text: string; image: string; alt: string }[];
  }> = {
    es: {
      title: 'Guia para crear tu sala de juegos perfecta',
      subtitle: 'Consejos de expertos para elegir los mejores juegos para tu hogar',
      sections: [
        {
          title: 'Mesas de billar: como elegir la ideal',
          text: 'Una mesa de billar es el corazon de cualquier sala de juegos. Para elegir la ideal, considera el espacio disponible (necesitas al menos 4.5m x 3.5m para una mesa estandar de 7 pies), el tipo de pano (lana para uso domestico, nylon para profesional) y la estructura (madera maciza para mayor durabilidad). Nuestras mesas vienen con garantia de 2 anos y entrega gratuita en toda Europa.',
          image: 'https://images.unsplash.com/photo-1695727008212-5d46172962b6?q=80&w=800&auto=format&fit=crop',
          alt: 'Mesa de billar de alta calidad para el hogar',
        },
        {
          title: 'Futbolines: diversión para toda la familia',
          text: 'Los futbolines son perfectos para reuniones familiares y con amigos. Los modelos profesionales tienen barras telescopicas (mas seguras para ninos), jugadores de aluminio fundido y superficie de juego de alta resistencia. Para uso domestico, un futbolin de gama media ofrece una excelente relacion calidad-precio. Todos nuestros futbolines incluyen montaje gratuito.',
          image: 'https://images.unsplash.com/photo-1690073938628-359f281dcabb?q=80&w=800&auto=format&fit=crop',
          alt: 'Futbolin profesional para sala de juegos',
        },
        {
          title: 'Dardos: electronicas vs. clasicas',
          text: 'Las dianas electronicas son ideales para principiantes y familias, ya que cuentan puntos automaticamente y ofrecen multiples modos de juego. Las dianas clasicas de sisal son preferidas por jugadores avanzados por su autenticidad. En ambos casos, asegurate de tener al menos 2.5 metros de distancia libre frente a la diana. Ofrecemos dianas desde 50 hasta 500 euros.',
          image: 'https://images.unsplash.com/photo-1638430325415-2f2cc6ae838f?q=80&w=800&auto=format&fit=crop',
          alt: 'Diana de dardos electronica de alta precision',
        },
      ],
    },
    en: {
      title: 'Guide to creating your perfect game room',
      subtitle: 'Expert tips for choosing the best games for your home',
      sections: [
        {
          title: 'Pool tables: how to choose the right one',
          text: 'A pool table is the heart of any game room. To choose the right one, consider available space (you need at least 4.5m x 3.5m for a standard 7-foot table), cloth type (wool for home use, nylon for professional) and frame (solid wood for greater durability). Our tables come with a 2-year warranty and free delivery across Europe.',
          image: 'https://images.unsplash.com/photo-1695727008212-5d46172962b6?q=80&w=800&auto=format&fit=crop',
          alt: 'High quality pool table for home use',
        },
        {
          title: 'Foosball tables: fun for the whole family',
          text: 'Foosball tables are perfect for family and friend gatherings. Professional models have telescopic rods (safer for children), cast aluminium players and high-resistance playing surface. For home use, a mid-range foosball table offers excellent value for money. All our foosball tables include free assembly.',
          image: 'https://images.unsplash.com/photo-1690073938628-359f281dcabb?q=80&w=800&auto=format&fit=crop',
          alt: 'Professional foosball table for game room',
        },
        {
          title: 'Dart boards: electronic vs. classic',
          text: 'Electronic dart boards are ideal for beginners and families as they count scores automatically and offer multiple game modes. Classic sisal boards are preferred by advanced players for their authenticity. In both cases, ensure you have at least 2.5 metres of free distance in front of the board. We offer dart boards from 50 to 500 euros.',
          image: 'https://images.unsplash.com/photo-1638430325415-2f2cc6ae838f?q=80&w=800&auto=format&fit=crop',
          alt: 'High precision electronic dart board',
        },
      ],
    },
    de: {
      title: 'Ratgeber fur Ihr perfektes Spielzimmer',
      subtitle: 'Expertentipps zur Auswahl der besten Spiele fur Ihr Zuhause',
      sections: [
        {
          title: 'Billardtische: Wie Sie den richtigen wahlen',
          text: 'Ein Billardtisch ist das Herzstuck jedes Spielzimmers. Berucksichtigen Sie den verfugbaren Platz (mindestens 4,5m x 3,5m fur einen Standard-7-Fuss-Tisch), den Tuchtyp und den Rahmen aus Massivholz. Unsere Tische kommen mit 2 Jahren Garantie und kostenloser Lieferung in ganz Europa.',
          image: 'https://images.unsplash.com/photo-1695727008212-5d46172962b6?q=80&w=800&auto=format&fit=crop',
          alt: 'Hochwertiger Billardtisch fur Zuhause',
        },
        {
          title: 'Tischfussball: Spass fur die ganze Familie',
          text: 'Tischfussball ist perfekt fur Familien- und Freundestreffen. Professionelle Modelle haben Teleskopstangen und Aluminium-Spieler. Alle unsere Tischfussball-Tische beinhalten kostenlosen Aufbau.',
          image: 'https://images.unsplash.com/photo-1690073938628-359f281dcabb?q=80&w=800&auto=format&fit=crop',
          alt: 'Professioneller Tischfussball',
        },
        {
          title: 'Dartscheiben: Elektronisch vs. Klassisch',
          text: 'Elektronische Dartscheiben sind ideal fur Anfanger und Familien. Klassische Sisal-Scheiben werden von fortgeschrittenen Spielern bevorzugt. Wir bieten Dartscheiben von 50 bis 500 Euro an.',
          image: 'https://images.unsplash.com/photo-1638430325415-2f2cc6ae838f?q=80&w=800&auto=format&fit=crop',
          alt: 'Hochprazise elektronische Dartscheibe',
        },
      ],
    },
    fr: {
      title: 'Guide pour creer votre salle de jeux parfaite',
      subtitle: 'Conseils d\'experts pour choisir les meilleurs jeux pour votre maison',
      sections: [
        {
          title: 'Tables de billard: comment choisir la bonne',
          text: 'Une table de billard est le coeur de toute salle de jeux. Considerez l\'espace disponible (au moins 4,5m x 3,5m), le type de tapis et le cadre en bois massif. Nos tables sont livrees avec 2 ans de garantie et livraison gratuite dans toute l\'Europe.',
          image: 'https://images.unsplash.com/photo-1695727008212-5d46172962b6?q=80&w=800&auto=format&fit=crop',
          alt: 'Table de billard de haute qualite',
        },
        {
          title: 'Baby-foot: plaisir pour toute la famille',
          text: 'Les baby-foot sont parfaits pour les reunions de famille. Les modeles professionnels ont des barres telescopiques et des joueurs en aluminium. Tous nos baby-foot incluent le montage gratuit.',
          image: 'https://images.unsplash.com/photo-1690073938628-359f281dcabb?q=80&w=800&auto=format&fit=crop',
          alt: 'Baby-foot professionnel',
        },
        {
          title: 'Flechettes: electroniques vs. classiques',
          text: 'Les cibles electroniques sont ideales pour les debutants et les familles. Les cibles classiques en sisal sont preferees par les joueurs avances. Nous proposons des cibles de 50 a 500 euros.',
          image: 'https://images.unsplash.com/photo-1638430325415-2f2cc6ae838f?q=80&w=800&auto=format&fit=crop',
          alt: 'Cible electronique de haute precision',
        },
      ],
    },
  };

  const c = content[locale as keyof typeof content] || content.es;

  return (
    <section className="py-24 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-xs tracking-widest text-muted-foreground uppercase mb-4">
            {'Blog & ' + (locale === 'es' ? 'Guias' : locale === 'de' ? 'Ratgeber' : locale === 'fr' ? 'Guides' : 'Guides')}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-4 text-balance">
            {c.title}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {c.subtitle}
          </p>
        </div>

        <div className="space-y-16">
          {c.sections.map((section, index) => (
            <article key={index} className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
                  <Image
                    src={section.image}
                    alt={section.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <h3 className="text-xl font-serif font-light text-foreground mb-4">
                  {section.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {section.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
