import Image from "next/image";
import { type Locale } from "@/lib/seo-data";
import { Shield, Truck, Award, Clock } from "lucide-react";

interface TrustSignalsProps {
  locale: Locale;
}

export function TrustSignals({ locale }: TrustSignalsProps) {
  const texts: Record<string, {
    title: string;
    subtitle: string;
    signals: { title: string; desc: string }[];
    testimonial: { quote: string; author: string; role: string };
    since: string;
  }> = {
    es: {
      title: 'Expertos en juegos de sala desde 2018',
      subtitle: 'Mas de 3.000 hogares en toda Europa confian en nosotros para equipar sus salas de juego con mesas de billar, futbolines, dianas de dardos y mesas de air hockey de la mejor calidad.',
      signals: [
        { title: 'Envio gratis en toda Europa', desc: 'Entrega profesional a domicilio sin coste adicional. Nuestro equipo se encarga del transporte y la instalacion de tu mesa de billar, futbolin o cualquier producto.' },
        { title: 'Garantia de 2 anos incluida', desc: 'Todos nuestros productos incluyen garantia de fabricante de 2 anos. Si algo falla, lo reparamos o reemplazamos sin coste.' },
        { title: 'Asesoria personalizada', desc: 'Nuestros expertos te ayudan a elegir la mesa de billar, futbolin o diana perfecta para el tamano de tu sala y tu presupuesto.' },
        { title: 'Instalacion profesional', desc: 'Servicio de montaje e instalacion incluido. Nuestros tecnicos especializados dejan todo listo para jugar desde el primer dia.' },
      ],
      testimonial: {
        quote: 'Compramos una mesa de billar y un futbolin para nuestra sala de juegos. El servicio fue impecable, desde la asesoria hasta la instalacion. Muy recomendable.',
        author: 'Carlos M.',
        role: 'Cliente verificado, Madrid'
      },
      since: 'Desde 2018'
    },
    en: {
      title: 'Game room experts since 2018',
      subtitle: 'Over 3,000 homes across Europe trust us to equip their game rooms with the finest pool tables, foosball tables, dart boards and air hockey tables.',
      signals: [
        { title: 'Free shipping across Europe', desc: 'Professional home delivery at no extra cost. Our team handles transport and installation of your pool table, foosball table or any product.' },
        { title: '2-year warranty included', desc: 'All our products include a 2-year manufacturer warranty. If anything goes wrong, we repair or replace at no cost.' },
        { title: 'Personalized advice', desc: 'Our experts help you choose the perfect pool table, foosball table or dart board for your room size and budget.' },
        { title: 'Professional installation', desc: 'Assembly and installation service included. Our specialized technicians have everything ready to play from day one.' },
      ],
      testimonial: {
        quote: 'We bought a pool table and foosball table for our game room. The service was impeccable, from advice to installation. Highly recommended.',
        author: 'James R.',
        role: 'Verified customer, London'
      },
      since: 'Since 2018'
    },
    de: {
      title: 'Spielzimmer-Experten seit 2018',
      subtitle: 'Uber 3.000 Haushalte in ganz Europa vertrauen uns bei der Ausstattung ihrer Spielzimmer mit erstklassigen Billardtischen, Tischfussball, Dartscheiben und Airhockey-Tischen.',
      signals: [
        { title: 'Kostenloser Versand in ganz Europa', desc: 'Professionelle Lieferung nach Hause ohne Mehrkosten. Unser Team kummert sich um Transport und Installation.' },
        { title: '2 Jahre Garantie inklusive', desc: 'Alle unsere Produkte haben 2 Jahre Herstellergarantie. Bei Problemen reparieren oder ersetzen wir kostenlos.' },
        { title: 'Personliche Beratung', desc: 'Unsere Experten helfen Ihnen den perfekten Billardtisch oder Tischfussball fur Ihre Raumgrosse und Ihr Budget zu finden.' },
        { title: 'Professionelle Installation', desc: 'Montage und Installation inklusive. Unsere Techniker machen alles spielbereit ab dem ersten Tag.' },
      ],
      testimonial: {
        quote: 'Wir haben einen Billardtisch und Tischfussball fur unser Spielzimmer gekauft. Der Service war tadellos. Sehr empfehlenswert.',
        author: 'Markus S.',
        role: 'Verifizierter Kunde, Berlin'
      },
      since: 'Seit 2018'
    },
    fr: {
      title: 'Experts en salles de jeux depuis 2018',
      subtitle: 'Plus de 3 000 foyers en Europe nous font confiance pour equiper leurs salles de jeux avec les meilleures tables de billard, baby-foot, cibles de flechettes et tables de air hockey.',
      signals: [
        { title: 'Livraison gratuite dans toute l\'Europe', desc: 'Livraison professionnelle a domicile sans frais supplementaires. Notre equipe s\'occupe du transport et de l\'installation.' },
        { title: 'Garantie 2 ans incluse', desc: 'Tous nos produits incluent une garantie fabricant de 2 ans. En cas de probleme, nous reparons ou remplacons gratuitement.' },
        { title: 'Conseil personnalise', desc: 'Nos experts vous aident a choisir la table de billard, le baby-foot ou la cible parfaite pour votre espace et votre budget.' },
        { title: 'Installation professionnelle', desc: 'Service de montage et installation inclus. Nos techniciens specialises preparent tout pour jouer des le premier jour.' },
      ],
      testimonial: {
        quote: 'Nous avons achete une table de billard et un baby-foot. Le service etait impeccable, du conseil a l\'installation. Tres recommande.',
        author: 'Pierre L.',
        role: 'Client verifie, Paris'
      },
      since: 'Depuis 2018'
    },
    it: {
      title: 'Esperti di sale giochi dal 2018',
      subtitle: 'Oltre 3.000 case in tutta Europa si affidano a noi per equipaggiare le loro sale giochi con i migliori tavoli da biliardo, calcio balilla, bersagli freccette e tavoli air hockey.',
      signals: [
        { title: 'Spedizione gratuita in tutta Europa', desc: 'Consegna professionale a domicilio senza costi aggiuntivi. Il nostro team si occupa del trasporto e dell\'installazione.' },
        { title: 'Garanzia 2 anni inclusa', desc: 'Tutti i nostri prodotti includono una garanzia del produttore di 2 anni. In caso di problemi, ripariamo o sostituiamo gratuitamente.' },
        { title: 'Consulenza personalizzata', desc: 'I nostri esperti ti aiutano a scegliere il tavolo da biliardo, calcio balilla o bersaglio perfetto per il tuo spazio e budget.' },
        { title: 'Installazione professionale', desc: 'Servizio di montaggio e installazione incluso. I nostri tecnici specializzati preparano tutto per giocare dal primo giorno.' },
      ],
      testimonial: {
        quote: 'Abbiamo acquistato un tavolo da biliardo e un calcio balilla. Il servizio e stato impeccabile, dalla consulenza all\'installazione. Molto consigliato.',
        author: 'Marco B.',
        role: 'Cliente verificato, Milano'
      },
      since: 'Dal 2018'
    },
    pt: {
      title: 'Especialistas em salas de jogos desde 2018',
      subtitle: 'Mais de 3.000 lares em toda a Europa confiam em nos para equipar suas salas de jogos com as melhores mesas de bilhar, matraquilhos, alvos de dardos e mesas de air hockey.',
      signals: [
        { title: 'Envio gratis em toda a Europa', desc: 'Entrega profissional ao domicilio sem custos adicionais. Nossa equipe cuida do transporte e instalacao.' },
        { title: 'Garantia de 2 anos incluida', desc: 'Todos os nossos produtos incluem garantia de fabricante de 2 anos. Em caso de problemas, reparamos ou substituimos gratuitamente.' },
        { title: 'Aconselhamento personalizado', desc: 'Os nossos especialistas ajudam a escolher a mesa de bilhar, matraquilhos ou alvo perfeito para o seu espaco e orcamento.' },
        { title: 'Instalacao profissional', desc: 'Servico de montagem e instalacao incluido. Os nossos tecnicos especializados preparam tudo para jogar desde o primeiro dia.' },
      ],
      testimonial: {
        quote: 'Compramos uma mesa de bilhar e matraquilhos. O servico foi impecavel, desde o aconselhamento ate a instalacao. Muito recomendavel.',
        author: 'Joao P.',
        role: 'Cliente verificado, Lisboa'
      },
      since: 'Desde 2018'
    },
    nl: {
      title: 'Speelkamer-experts sinds 2018',
      subtitle: 'Meer dan 3.000 huishoudens in heel Europa vertrouwen op ons voor het uitrusten van hun speelkamers met de beste pooltafels, tafelvoetbal, dartborden en airhockey tafels.',
      signals: [
        { title: 'Gratis verzending in heel Europa', desc: 'Professionele thuislevering zonder extra kosten. Ons team verzorgt het transport en de installatie.' },
        { title: '2 jaar garantie inbegrepen', desc: 'Al onze producten hebben 2 jaar fabrieksgarantie. Bij problemen repareren of vervangen we gratis.' },
        { title: 'Persoonlijk advies', desc: 'Onze experts helpen u de perfecte pooltafel, tafelvoetbal of dartbord te kiezen voor uw ruimte en budget.' },
        { title: 'Professionele installatie', desc: 'Montage en installatie inbegrepen. Onze gespecialiseerde technici maken alles speelklaar vanaf dag een.' },
      ],
      testimonial: {
        quote: 'We hebben een pooltafel en tafelvoetbal gekocht. De service was onberispelijk, van advies tot installatie. Zeer aanbevolen.',
        author: 'Jan V.',
        role: 'Geverifieerde klant, Amsterdam'
      },
      since: 'Sinds 2018'
    },
    pl: {
      title: 'Eksperci od pokojow gier od 2018',
      subtitle: 'Ponad 3 000 domow w calej Europie ufa nam w wyposazaniu pokojow gier najlepszymi stolami bilardowymi, pilkarzykami, tarczami do darta i stolami do air hockey.',
      signals: [
        { title: 'Darmowa wysylka w calej Europie', desc: 'Profesjonalna dostawa do domu bez dodatkowych kosztow. Nasz zespol zajmuje sie transportem i instalacja.' },
        { title: 'Gwarancja 2 lata w cenie', desc: 'Wszystkie nasze produkty maja 2-letnia gwarancje producenta. W razie problemow naprawiamy lub wymieniamy bezplatnie.' },
        { title: 'Spersonalizowane doradztwo', desc: 'Nasi eksperci pomoga wybrac idealny stol bilardowy, pilkarzyki lub tarcze do darta dla Twojej przestrzeni i budzetu.' },
        { title: 'Profesjonalna instalacja', desc: 'Usluga montazu i instalacji w cenie. Nasi wyspecjalizowani technicy przygotuja wszystko do gry od pierwszego dnia.' },
      ],
      testimonial: {
        quote: 'Kupilismy stol bilardowy i pilkarzyki. Obsluga byla nienaganna, od doradztwa po instalacje. Bardzo polecam.',
        author: 'Piotr K.',
        role: 'Zweryfikowany klient, Warszawa'
      },
      since: 'Od 2018'
    },
  };

  const t = texts[locale] || texts.es;
  const icons = [Truck, Shield, Award, Clock];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <span className="inline-block text-xs tracking-widest text-muted-foreground uppercase mb-4">
            {t.since}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-tight mb-6 text-balance">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Signals grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {t.signals.map((signal, index) => {
            const Icon = icons[index];
            return (
              <div key={index} className="flex gap-5 p-6 rounded-xl bg-card border border-border">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                  <Icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">{signal.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{signal.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonial */}
        <div className="relative bg-card border border-border rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-secondary flex-shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&q=80"
                alt={t.testimonial.author}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <blockquote className="text-lg text-foreground leading-relaxed mb-4 font-serif italic">
                {`"${t.testimonial.quote}"`}
              </blockquote>
              <div>
                <p className="font-medium text-foreground">{t.testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{t.testimonial.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
