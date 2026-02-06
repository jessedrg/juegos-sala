import { Star } from "lucide-react";
import { type Locale } from "@/lib/seo-data";

interface TestimonialsProps {
  locale: Locale;
}

const REVIEWS = {
  es: [
    { name: 'Miguel R.', location: 'Madrid', text: 'La mesa de billar quedo perfecta en nuestro salon. El equipo de instalacion fue muy profesional y la calidad es excepcional.', product: 'Mesa de Billar Clasica', rating: 5 },
    { name: 'Laura G.', location: 'Barcelona', text: 'Compramos un futbolin para los ninos y es increible. Calidad muy superior a lo que encontramos en otras tiendas.', product: 'Futbolin Profesional', rating: 5 },
    { name: 'Carlos M.', location: 'Valencia', text: 'La diana electronica funciona de maravilla. Envio rapido y bien embalado. Muy recomendable.', product: 'Diana Electronica Pro', rating: 5 },
    { name: 'Ana P.', location: 'Sevilla', text: 'Nos encanta la mesa de air hockey. Toda la familia disfruta jugando. La entrega fue puntual y el montaje sencillo.', product: 'Mesa Air Hockey', rating: 5 },
  ],
  en: [
    { name: 'James T.', location: 'London', text: 'The pool table fits perfectly in our living room. The installation team was very professional and the quality is exceptional.', product: 'Classic Pool Table', rating: 5 },
    { name: 'Sarah K.', location: 'Berlin', text: 'We bought a foosball table for the kids and it is incredible. Much better quality than what we found in other stores.', product: 'Professional Foosball', rating: 5 },
    { name: 'Tom W.', location: 'Paris', text: 'The electronic dart board works wonderfully. Fast shipping and well packaged. Highly recommended.', product: 'Electronic Dart Board Pro', rating: 5 },
    { name: 'Emma L.', location: 'Amsterdam', text: 'We love the air hockey table. The whole family enjoys playing. Delivery was on time and assembly was easy.', product: 'Air Hockey Table', rating: 5 },
  ],
  de: [
    { name: 'Thomas M.', location: 'Munchen', text: 'Der Billardtisch passt perfekt in unser Wohnzimmer. Das Installationsteam war sehr professionell.', product: 'Klassischer Billardtisch', rating: 5 },
    { name: 'Anna S.', location: 'Berlin', text: 'Wir haben einen Tischfussball fur die Kinder gekauft. Die Qualitat ist hervorragend.', product: 'Profi Tischfussball', rating: 5 },
    { name: 'Stefan W.', location: 'Hamburg', text: 'Die elektronische Dartscheibe funktioniert wunderbar. Schneller Versand und gut verpackt.', product: 'Elektronische Dartscheibe', rating: 5 },
    { name: 'Julia F.', location: 'Koln', text: 'Der Airhockey-Tisch begeistert die ganze Familie. Punktliche Lieferung und einfacher Aufbau.', product: 'Airhockey-Tisch', rating: 5 },
  ],
  fr: [
    { name: 'Pierre D.', location: 'Paris', text: 'La table de billard est parfaite dans notre salon. L\'equipe d\'installation etait tres professionnelle.', product: 'Table de Billard Classique', rating: 5 },
    { name: 'Marie M.', location: 'Lyon', text: 'Nous avons achete un baby-foot pour les enfants. La qualite est exceptionnelle.', product: 'Baby-foot Professionnel', rating: 5 },
    { name: 'Lucas B.', location: 'Marseille', text: 'La cible de flechettes electronique fonctionne parfaitement. Livraison rapide et bien emballee.', product: 'Cible Electronique Pro', rating: 5 },
    { name: 'Sophie R.', location: 'Toulouse', text: 'Toute la famille adore la table de air hockey. Livraison ponctuelle et montage facile.', product: 'Table Air Hockey', rating: 5 },
  ],
};

export function Testimonials({ locale }: TestimonialsProps) {
  const texts: Record<string, { title: string; subtitle: string; verified: string }> = {
    es: { title: 'Lo que dicen nuestros clientes', subtitle: 'Miles de hogares ya disfrutan de su sala de juegos', verified: 'Compra verificada' },
    en: { title: 'What our customers say', subtitle: 'Thousands of homes already enjoy their game room', verified: 'Verified purchase' },
    de: { title: 'Was unsere Kunden sagen', subtitle: 'Tausende Haushalte geniessen bereits ihr Spielzimmer', verified: 'Verifizierter Kauf' },
    fr: { title: 'Ce que disent nos clients', subtitle: 'Des milliers de foyers profitent deja de leur salle de jeux', verified: 'Achat verifie' },
    it: { title: 'Cosa dicono i nostri clienti', subtitle: 'Migliaia di case godono gia della loro sala giochi', verified: 'Acquisto verificato' },
    pt: { title: 'O que dizem nossos clientes', subtitle: 'Milhares de lares ja aproveitam sua sala de jogos', verified: 'Compra verificada' },
    nl: { title: 'Wat onze klanten zeggen', subtitle: 'Duizenden huizen genieten al van hun speelkamer', verified: 'Geverifieerde aankoop' },
    pl: { title: 'Co mowia nasi klienci', subtitle: 'Tysiace domow cieszy sie juz swoim pokojem gier', verified: 'Zweryfikowany zakup' },
  };
  const t = texts[locale] || texts.es;
  const reviews = REVIEWS[locale as keyof typeof REVIEWS] || REVIEWS.es;

  return (
    <section className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-4 text-balance">
            {t.title}
          </h2>
          <p className="text-muted-foreground">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-card border border-border p-6 rounded-lg">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-foreground mb-4 leading-relaxed">
                {`"${review.text}"`}
              </p>
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-medium text-foreground">{review.name}</p>
                <p className="text-xs text-muted-foreground">{review.location}</p>
                <p className="text-xs text-muted-foreground mt-1">{review.product}</p>
                <span className="inline-block mt-2 text-[10px] uppercase tracking-wider text-green-600 font-medium">
                  {t.verified}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
