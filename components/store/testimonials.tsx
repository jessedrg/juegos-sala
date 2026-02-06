import { type Locale } from "@/lib/seo-data";

interface TestimonialsProps {
  locale: Locale;
}

const REVIEWS = {
  es: [
    { name: 'Miguel R.', location: 'Madrid', text: 'La mesa de billar quedo perfecta en nuestro salon. El equipo de instalacion fue muy profesional y la calidad es excepcional.', product: 'Mesa de Billar Clasica' },
    { name: 'Laura G.', location: 'Barcelona', text: 'Compramos un futbolin para los ninos y es increible. Calidad muy superior a lo que encontramos en otras tiendas.', product: 'Futbolin Profesional' },
    { name: 'Carlos M.', location: 'Valencia', text: 'La diana electronica funciona de maravilla. Envio rapido y bien embalado. Muy recomendable.', product: 'Diana Electronica Pro' },
  ],
  en: [
    { name: 'James T.', location: 'London', text: 'The pool table fits perfectly in our living room. The installation team was very professional and the quality is exceptional.', product: 'Classic Pool Table' },
    { name: 'Sarah K.', location: 'Berlin', text: 'We bought a foosball table for the kids and it is incredible. Much better quality than what we found in other stores.', product: 'Professional Foosball' },
    { name: 'Tom W.', location: 'Paris', text: 'The electronic dart board works wonderfully. Fast shipping and well packaged. Highly recommended.', product: 'Electronic Dart Board Pro' },
  ],
  de: [
    { name: 'Thomas M.', location: 'Munchen', text: 'Der Billardtisch passt perfekt in unser Wohnzimmer. Das Installationsteam war sehr professionell.', product: 'Klassischer Billardtisch' },
    { name: 'Anna S.', location: 'Berlin', text: 'Wir haben einen Tischfussball fur die Kinder gekauft. Die Qualitat ist hervorragend.', product: 'Profi Tischfussball' },
    { name: 'Stefan W.', location: 'Hamburg', text: 'Die elektronische Dartscheibe funktioniert wunderbar. Schneller Versand und gut verpackt.', product: 'Elektronische Dartscheibe' },
  ],
  fr: [
    { name: 'Pierre D.', location: 'Paris', text: 'La table de billard est parfaite dans notre salon. L\'equipe d\'installation etait tres professionnelle.', product: 'Table de Billard Classique' },
    { name: 'Marie M.', location: 'Lyon', text: 'Nous avons achete un baby-foot pour les enfants. La qualite est exceptionnelle.', product: 'Baby-foot Professionnel' },
    { name: 'Lucas B.', location: 'Marseille', text: 'La cible de flechettes electronique fonctionne parfaitement. Livraison rapide et bien emballee.', product: 'Cible Electronique Pro' },
  ],
};

export function Testimonials({ locale }: TestimonialsProps) {
  const texts: Record<string, { tag: string; title: string; verified: string }> = {
    es: { tag: 'Testimonios', title: 'Lo que dicen nuestros clientes', verified: 'Compra verificada' },
    en: { tag: 'Testimonials', title: 'What our customers say', verified: 'Verified purchase' },
    de: { tag: 'Bewertungen', title: 'Was unsere Kunden sagen', verified: 'Verifizierter Kauf' },
    fr: { tag: 'Temoignages', title: 'Ce que disent nos clients', verified: 'Achat verifie' },
    it: { tag: 'Testimonianze', title: 'Cosa dicono i nostri clienti', verified: 'Acquisto verificato' },
    pt: { tag: 'Depoimentos', title: 'O que dizem nossos clientes', verified: 'Compra verificada' },
    nl: { tag: 'Beoordelingen', title: 'Wat onze klanten zeggen', verified: 'Geverifieerde aankoop' },
    pl: { tag: 'Opinie', title: 'Co mowia nasi klienci', verified: 'Zweryfikowany zakup' },
  };
  const t = texts[locale] || texts.es;
  const reviews = REVIEWS[locale as keyof typeof REVIEWS] || REVIEWS.es;

  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
            {t.tag}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground text-balance">
            {t.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {reviews.map((review, index) => (
            <div key={index} className="bg-background p-8 lg:p-10">
              <blockquote className="text-base text-foreground leading-relaxed mb-8 font-serif italic">
                {`"${review.text}"`}
              </blockquote>
              <div className="border-t border-border pt-5">
                <p className="text-sm font-medium text-foreground">{review.name}</p>
                <p className="text-[11px] text-muted-foreground mt-1">{review.location}</p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-accent font-medium mt-3">
                  {t.verified}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
