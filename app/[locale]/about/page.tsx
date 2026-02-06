import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/store/header";
import { Footer } from "@/components/store/footer";
import { SUPPORTED_LOCALES, type Locale } from "@/lib/seo-data";
import { Shield, Truck, Users, Award, Target, Gamepad2 } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const ABOUT_CONTENT: Record<string, {
  hero: { eyebrow: string; title: string; subtitle: string };
  story: { eyebrow: string; title: string; text1: string; text2: string };
  values: { title: string; items: { icon: string; title: string; desc: string }[] };
  process: { eyebrow: string; title: string; steps: { num: string; title: string; desc: string }[] };
  commitment: { eyebrow: string; title: string; text: string };
  cta: { title: string; subtitle: string; button: string };
}> = {
  en: {
    hero: {
      eyebrow: "Our Story",
      title: "Bringing the game room experience home",
      subtitle: "The Games Room was born from a passion for recreation and entertainment. We believe every home deserves a space where family and friends come together to play, compete, and create lasting memories."
    },
    story: {
      eyebrow: "Who We Are",
      title: "Experts in game room equipment since day one",
      text1: "We started with a simple mission: make professional-quality game room equipment accessible to every home in Europe. From pool tables to foosball, darts to air hockey, we curate only the best products that meet our exacting standards.",
      text2: "Today, we serve over 3,000 customers across Europe, delivering premium game room setups with free shipping and professional installation support."
    },
    values: {
      title: "What We Stand For",
      items: [
        { icon: "shield", title: "Quality Guaranteed", desc: "Every product undergoes rigorous testing. 2-year warranty on all items." },
        { icon: "truck", title: "Free European Delivery", desc: "Free shipping across Europe with real-time tracking and careful handling." },
        { icon: "users", title: "Expert Advice", desc: "Our team of game room specialists helps you choose the perfect setup." },
        { icon: "award", title: "Premium Selection", desc: "We only carry brands and models that meet professional standards." },
        { icon: "target", title: "Customer Focused", desc: "4.8/5 average rating from over 500 verified customer reviews." },
        { icon: "gamepad", title: "Passion for Play", desc: "We are gamers and enthusiasts ourselves. We know what makes a great game room." }
      ]
    },
    process: {
      eyebrow: "How We Work",
      title: "From selection to setup",
      steps: [
        { num: "01", title: "Consultation", desc: "Tell us about your space and preferences. We recommend the perfect products." },
        { num: "02", title: "Selection", desc: "Choose from our curated collection of premium game room equipment." },
        { num: "03", title: "Delivery", desc: "Free shipping across Europe with careful packaging and tracking." },
        { num: "04", title: "Enjoyment", desc: "Set up your game room and start creating memories with family and friends." }
      ]
    },
    commitment: {
      eyebrow: "Our Promise",
      title: "Your satisfaction is our priority",
      text: "Every product at The Games Room is backed by our 2-year warranty and 30-day satisfaction guarantee. If you are not completely happy with your purchase, we will make it right."
    },
    cta: {
      title: "Ready to build your game room?",
      subtitle: "Browse our collection of pool tables, foosball tables, dart boards, and more",
      button: "View Catalog"
    }
  },
  es: {
    hero: {
      eyebrow: "Nuestra Historia",
      title: "Tu sala de juegos profesional en casa",
      subtitle: "The Games Room nacio de la pasion por el entretenimiento y la diversion. Creemos que cada hogar merece un espacio donde la familia y los amigos se reunan para jugar, competir y crear recuerdos inolvidables."
    },
    story: {
      eyebrow: "Quienes Somos",
      title: "Expertos en equipamiento para salas de juegos",
      text1: "Empezamos con una mision sencilla: hacer que el equipamiento profesional para salas de juegos sea accesible para cada hogar en Europa. Desde mesas de billar hasta futbolines, dardos y air hockey, seleccionamos solo los mejores productos.",
      text2: "Hoy servimos a mas de 3.000 clientes en toda Europa, entregando equipamiento premium con envio gratis y soporte de instalacion profesional."
    },
    values: {
      title: "Nuestros Valores",
      items: [
        { icon: "shield", title: "Calidad Garantizada", desc: "Cada producto pasa controles rigurosos. Garantia de 2 anos en todo." },
        { icon: "truck", title: "Envio Gratis en Europa", desc: "Envio gratuito con seguimiento en tiempo real y embalaje cuidadoso." },
        { icon: "users", title: "Asesoria Experta", desc: "Nuestro equipo de especialistas te ayuda a elegir el setup perfecto." },
        { icon: "award", title: "Seleccion Premium", desc: "Solo trabajamos con marcas y modelos de nivel profesional." },
        { icon: "target", title: "Enfoque al Cliente", desc: "Valoracion media de 4.8/5 con mas de 500 resenas verificadas." },
        { icon: "gamepad", title: "Pasion por el Juego", desc: "Somos jugadores y entusiastas. Sabemos que hace una gran sala de juegos." }
      ]
    },
    process: {
      eyebrow: "Como Trabajamos",
      title: "De la seleccion a la instalacion",
      steps: [
        { num: "01", title: "Consulta", desc: "Cuentanos sobre tu espacio y preferencias. Te recomendamos los productos perfectos." },
        { num: "02", title: "Seleccion", desc: "Elige de nuestra coleccion de equipamiento premium para salas de juegos." },
        { num: "03", title: "Entrega", desc: "Envio gratis en toda Europa con embalaje cuidadoso y seguimiento." },
        { num: "04", title: "Disfruta", desc: "Monta tu sala de juegos y empieza a crear recuerdos con familia y amigos." }
      ]
    },
    commitment: {
      eyebrow: "Nuestro Compromiso",
      title: "Tu satisfaccion es nuestra prioridad",
      text: "Cada producto en The Games Room esta respaldado por nuestra garantia de 2 anos y 30 dias de garantia de satisfaccion. Si no estas completamente satisfecho, lo solucionamos."
    },
    cta: {
      title: "Listo para montar tu sala de juegos?",
      subtitle: "Explora nuestra coleccion de mesas de billar, futbolines, dardos y mas",
      button: "Ver Catalogo"
    }
  },
  de: {
    hero: {
      eyebrow: "Unsere Geschichte",
      title: "Das professionelle Spielzimmer fur Ihr Zuhause",
      subtitle: "The Games Room entstand aus der Leidenschaft fur Unterhaltung und Spass. Wir glauben, dass jedes Zuhause einen Raum verdient, in dem Familie und Freunde zusammenkommen."
    },
    story: {
      eyebrow: "Wer Wir Sind",
      title: "Experten fur Spielzimmerausstattung",
      text1: "Wir starteten mit einer einfachen Mission: professionelle Spielzimmerausstattung fur jedes Zuhause in Europa zuganglich zu machen.",
      text2: "Heute betreuen wir uber 3.000 Kunden in ganz Europa mit Premium-Ausstattung, kostenlosem Versand und professionellem Installationsservice."
    },
    values: {
      title: "Unsere Werte",
      items: [
        { icon: "shield", title: "Qualitat Garantiert", desc: "Jedes Produkt wird streng gepruft. 2 Jahre Garantie auf alles." },
        { icon: "truck", title: "Kostenloser Versand", desc: "Kostenlose Lieferung in ganz Europa mit Sendungsverfolgung." },
        { icon: "users", title: "Expertenberatung", desc: "Unser Spezialistenteam hilft Ihnen bei der perfekten Auswahl." },
        { icon: "award", title: "Premium Auswahl", desc: "Nur Marken und Modelle auf professionellem Niveau." },
        { icon: "target", title: "Kundenorientiert", desc: "Durchschnittliche Bewertung 4.8/5 mit uber 500 verifizierten Bewertungen." },
        { icon: "gamepad", title: "Leidenschaft", desc: "Wir sind selbst Spieler und Enthusiasten." }
      ]
    },
    process: {
      eyebrow: "Unser Prozess",
      title: "Von der Auswahl bis zum Aufbau",
      steps: [
        { num: "01", title: "Beratung", desc: "Erzahlen Sie uns von Ihrem Raum und Ihren Wunschen." },
        { num: "02", title: "Auswahl", desc: "Wahlen Sie aus unserer kuratierten Premium-Kollektion." },
        { num: "03", title: "Lieferung", desc: "Kostenloser Versand in ganz Europa mit sorgfaltiger Verpackung." },
        { num: "04", title: "Genuss", desc: "Bauen Sie Ihr Spielzimmer auf und geniessen Sie die Zeit." }
      ]
    },
    commitment: {
      eyebrow: "Unser Versprechen",
      title: "Ihre Zufriedenheit hat Prioritat",
      text: "Jedes Produkt bei The Games Room wird durch unsere 2-Jahre-Garantie und 30-Tage-Zufriedenheitsgarantie abgesichert."
    },
    cta: {
      title: "Bereit fur Ihr Spielzimmer?",
      subtitle: "Entdecken Sie unsere Kollektion an Billardtischen, Tischfussball und mehr",
      button: "Katalog Ansehen"
    }
  },
  fr: {
    hero: {
      eyebrow: "Notre Histoire",
      title: "Votre salle de jeux professionnelle a la maison",
      subtitle: "The Games Room est ne d'une passion pour le divertissement. Nous croyons que chaque foyer merite un espace ou famille et amis se retrouvent pour jouer et creer des souvenirs."
    },
    story: {
      eyebrow: "Qui Sommes-Nous",
      title: "Experts en equipement de salles de jeux",
      text1: "Notre mission: rendre l'equipement professionnel de salle de jeux accessible a chaque foyer en Europe.",
      text2: "Aujourd'hui, nous servons plus de 3.000 clients a travers l'Europe avec livraison gratuite et support d'installation."
    },
    values: {
      title: "Nos Valeurs",
      items: [
        { icon: "shield", title: "Qualite Garantie", desc: "Chaque produit est rigoureusement teste. Garantie 2 ans sur tout." },
        { icon: "truck", title: "Livraison Gratuite", desc: "Livraison gratuite dans toute l'Europe avec suivi en temps reel." },
        { icon: "users", title: "Conseil Expert", desc: "Notre equipe de specialistes vous aide a choisir le setup parfait." },
        { icon: "award", title: "Selection Premium", desc: "Uniquement des marques et modeles de niveau professionnel." },
        { icon: "target", title: "Oriente Client", desc: "Note moyenne de 4.8/5 avec plus de 500 avis verifies." },
        { icon: "gamepad", title: "Passion du Jeu", desc: "Nous sommes nous-memes joueurs et passionnes." }
      ]
    },
    process: {
      eyebrow: "Notre Processus",
      title: "De la selection a l'installation",
      steps: [
        { num: "01", title: "Consultation", desc: "Parlez-nous de votre espace et vos preferences." },
        { num: "02", title: "Selection", desc: "Choisissez parmi notre collection premium." },
        { num: "03", title: "Livraison", desc: "Livraison gratuite en Europe avec emballage soigne." },
        { num: "04", title: "Plaisir", desc: "Installez votre salle de jeux et profitez en famille." }
      ]
    },
    commitment: {
      eyebrow: "Notre Engagement",
      title: "Votre satisfaction est notre priorite",
      text: "Chaque produit est couvert par notre garantie 2 ans et garantie satisfaction 30 jours."
    },
    cta: {
      title: "Pret pour votre salle de jeux?",
      subtitle: "Decouvrez notre collection de tables de billard, baby-foot, flechettes et plus",
      button: "Voir le Catalogue"
    }
  }
};

function getIcon(name: string) {
  switch (name) {
    case 'shield': return Shield;
    case 'truck': return Truck;
    case 'users': return Users;
    case 'award': return Award;
    case 'target': return Target;
    case 'gamepad': return Gamepad2;
    default: return Shield;
  }
}

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};
  const content = ABOUT_CONTENT[locale] || ABOUT_CONTENT.en;
  
  return {
    title: locale === 'es' ? 'Sobre Nosotros - Expertos en Mesas de Billar y Juegos de Sala' : 'About Us - Game Room Equipment Experts',
    description: content.hero.subtitle,
    alternates: { canonical: `/${locale}/about` },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();
  
  const validLocale = locale as Locale;
  const content = ABOUT_CONTENT[locale] || ABOUT_CONTENT.en;

  return (
    <main className="min-h-screen bg-background">
      <Header locale={validLocale} transparent />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1647633391986-4614f2ee0ca4?w=1920&h=1080&fit=crop&q=80"
            alt="Pool table in a game room"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
          <span className="text-xs uppercase tracking-[0.4em] text-white/70 mb-6 block">
            {content.hero.eyebrow}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight mb-6 text-balance">
            {content.hero.title}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            {content.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
                {content.story.eyebrow}
              </span>
              <h2 className="text-2xl lg:text-3xl font-serif text-foreground mb-6 text-balance">
                {content.story.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {content.story.text1}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {content.story.text2}
              </p>
            </div>
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1690073938628-359f281dcabb?w=800&h=1000&fit=crop&q=80"
                alt="Foosball table in a game room"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-serif text-foreground text-balance">
              {content.values.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.values.items.map((value, index) => {
              const IconComponent = getIcon(value.icon);
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-accent/10">
                    <IconComponent className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-medium text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3 block">
              {content.process.eyebrow}
            </span>
            <h2 className="text-2xl lg:text-3xl font-serif text-foreground text-balance">
              {content.process.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.process.steps.map((step, index) => (
              <div key={index}>
                <div className="text-4xl font-serif text-muted-foreground/20 mb-3">
                  {step.num}
                </div>
                <h3 className="text-sm font-medium text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-primary-foreground/60 mb-4 block">
            {content.commitment.eyebrow}
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif leading-tight mb-6 text-balance">
            {content.commitment.title}
          </h2>
          <p className="text-lg text-primary-foreground/70 leading-relaxed max-w-2xl mx-auto">
            {content.commitment.text}
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-serif text-foreground mb-3 text-balance">
            {content.cta.title}
          </h2>
          <p className="text-muted-foreground mb-8">
            {content.cta.subtitle}
          </p>
          <Link 
            href={`/${locale}`}
            className="inline-flex items-center justify-center h-12 px-10 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 transition-colors"
          >
            {content.cta.button}
          </Link>
        </div>
      </section>

      <Footer locale={validLocale} />
    </main>
  );
}
