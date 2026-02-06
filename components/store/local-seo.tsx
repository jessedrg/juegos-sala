import { type Locale } from "@/lib/seo-lite";
import { Shield, Truck, Award, HelpCircle, ChevronDown, BookOpen, Star } from "lucide-react";

interface LocalSEOProps {
  locale: Locale;
}

const CONTENT: Record<string, {
  buyingGuide: {
    title: string;
    subtitle: string;
    sections: { title: string; text: string }[];
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
  trust: {
    title: string;
    items: { title: string; desc: string }[];
  };
}> = {
  es: {
    buyingGuide: {
      title: 'Guia de Compra: Como Elegir tu Mesa de Juegos',
      subtitle: 'Todo lo que necesitas saber antes de comprar una mesa de billar, futbolin, diana de dardos o mesa de air hockey para tu hogar.',
      sections: [
        {
          title: 'Mesas de Billar: Que Tener en Cuenta',
          text: 'Al elegir una mesa de billar para casa, considera el espacio disponible (necesitas al menos 1,5m de margen alrededor de la mesa), el tipo de pizarra (las profesionales usan pizarra natural), y el tamano (las mas populares para hogar son las de 7 y 8 pies). Las mesas con patas regulables son ideales si tu suelo no esta perfectamente nivelado. El pano de la mesa tambien importa: los panos de lana son mas economicos pero los de mezcla nylon-lana duran mas y ofrecen mejor juego.'
        },
        {
          title: 'Futbolines: Guia de Seleccion',
          text: 'Un buen futbolin debe tener barras de acero cromado (no de plastico), munecas de goma para buen agarre, y un cuerpo robusto que no se mueva durante el juego. Para uso domestico, los futbolines de mesa cerrada son mas silenciosos. Si buscas competicion, opta por modelos homologados con barras pasantes y superficie de juego de vidrio templado. El peso es indicador de calidad: un futbolin bueno pesa entre 60 y 90 kg.'
        },
        {
          title: 'Dianas de Dardos: Electronicas vs Tradicionales',
          text: 'Las dianas electronicas son perfectas para familias: llevan puntuacion automatica, multiples juegos programados y usan dardos de punta blanda (mas seguros). Las dianas de sisal (tradicionales) son para puristas y jugadores avanzados: ofrecen mejor sensacion, son mas silenciosas y aceptan dardos de acero. Si tienes ninos en casa, la diana electronica es la mejor opcion. Para un bar o sala de juegos adulta, la de sisal es superior.'
        },
        {
          title: 'Air Hockey: Tamano y Potencia',
          text: 'El factor mas importante en una mesa de air hockey es el sistema de ventilacion: necesitas un motor potente que genere un colchon de aire uniforme. Las mesas profesionales usan motores de alta velocidad con multiples salidas de aire. Para casa, una mesa de 6-7 pies es ideal. Asegurate de que la superficie sea lisa y resistente a aranazos. Los marcadores electronicos son un plus para llevar la cuenta de los partidos.'
        },
      ]
    },
    faq: {
      title: 'Preguntas Frecuentes',
      items: [
        { q: 'Cuanto cuesta una mesa de billar para casa?', a: 'Las mesas de billar para uso domestico van desde 800EUR para modelos basicos hasta 5.000EUR o mas para mesas profesionales con pizarra natural. Las mesas de 7 pies son las mas populares para hogar y suelen estar entre 1.200EUR y 2.500EUR.' },
        { q: 'Cuanto espacio necesito para una mesa de billar?', a: 'Necesitas la superficie de la mesa mas 1,5 metros de margen por cada lado para poder jugar comodamente. Para una mesa de 7 pies (213 x 122 cm), necesitas una sala de al menos 4,5 x 3,5 metros.' },
        { q: 'El envio y la instalacion estan incluidos?', a: 'Si, en The Games Room ofrecemos envio gratuito en toda Europa. La instalacion profesional esta disponible como servicio adicional. Nuestro equipo se encarga del montaje completo y nivelacion.' },
        { q: 'Que garantia tienen los productos?', a: 'Todos nuestros productos cuentan con 2 anos de garantia completa que cubre defectos de fabricacion y materiales. Tambien ofrecemos servicio tecnico post-venta.' },
        { q: 'Puedo devolver el producto si no me convence?', a: 'Si, ofrecemos 30 dias de garantia de satisfaccion. Si el producto no cumple tus expectativas, puedes devolverlo sin coste. Solo pedimos que este en su embalaje original.' },
        { q: 'Cuanto tarda la entrega?', a: 'El tiempo de entrega estandar es de 5-10 dias laborables en la peninsula. Para islas y zonas remotas puede tardar hasta 15 dias. Recibiras un email de seguimiento cuando tu pedido sea enviado.' },
        { q: 'Hacen presupuestos personalizados?', a: 'Por supuesto. Puedes solicitar un presupuesto sin compromiso a traves de nuestro chat o formulario de contacto. Respondemos en menos de 24 horas laborables.' },
        { q: 'Que diferencia hay entre una mesa profesional y una domestica?', a: 'Las mesas profesionales usan pizarra natural (mas pesada y precisa), pano de competicion y dimensiones reglamentarias. Las domesticas son mas ligeras, usan MDF o pizarra sintetica, y suelen tener tamanos mas compactos. Ambas ofrecen excelente diversión.' },
      ]
    },
    trust: {
      title: 'Por Que Comprar en The Games Room',
      items: [
        { title: 'Mas de 3.000 Clientes Satisfechos', desc: 'Valoracion media de 4.8/5 con mas de 500 resenas verificadas en toda Europa.' },
        { title: 'Envio Gratis y Rapido', desc: 'Entrega gratuita en toda Europa. 5-10 dias laborables con seguimiento en tiempo real.' },
        { title: 'Garantia 2 Anos Completa', desc: 'Garantia que cubre defectos de fabricacion y materiales. Servicio tecnico incluido.' },
        { title: 'Atencion Personalizada', desc: 'Equipo de expertos disponible por chat, email y telefono para asesorarte en tu compra.' },
      ]
    }
  },
  en: {
    buyingGuide: {
      title: 'Buying Guide: How to Choose Your Game Room Equipment',
      subtitle: 'Everything you need to know before buying a pool table, foosball table, dart board, or air hockey table for your home.',
      sections: [
        {
          title: 'Pool Tables: What to Consider',
          text: 'When choosing a home pool table, consider the available space (you need at least 5 feet of clearance around the table), the slate type (professional tables use natural slate), and the size (7-foot and 8-foot tables are most popular for homes). Tables with adjustable legs are ideal if your floor is not perfectly level. The cloth also matters: wool cloths are more affordable but nylon-wool blends last longer and offer better playability.'
        },
        {
          title: 'Foosball Tables: Selection Guide',
          text: 'A good foosball table should have chrome-plated steel rods (not plastic), rubber grips for good handling, and a sturdy body that does not move during play. For home use, closed-body foosball tables are quieter. If you want competition-grade play, opt for certified models with through-bars and tempered glass playing surfaces. Weight indicates quality: a good foosball table weighs between 130 and 200 pounds.'
        },
        {
          title: 'Dart Boards: Electronic vs Traditional',
          text: 'Electronic dart boards are perfect for families: they feature automatic scoring, multiple pre-programmed games, and use soft-tip darts (safer). Sisal (traditional) boards are for purists and advanced players: they offer better feel, are quieter, and accept steel-tip darts. If you have children at home, electronic boards are the best choice. For an adult game room or bar, sisal boards are superior.'
        },
        {
          title: 'Air Hockey: Size and Power',
          text: 'The most important factor in an air hockey table is the ventilation system: you need a powerful motor that generates a uniform air cushion. Professional tables use high-speed motors with multiple air outlets. For home use, a 6-7 foot table is ideal. Make sure the surface is smooth and scratch-resistant. Electronic scoreboards are a nice bonus for keeping track of matches.'
        },
      ]
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        { q: 'How much does a home pool table cost?', a: 'Home pool tables range from EUR 800 for basic models to EUR 5,000 or more for professional tables with natural slate. 7-foot tables are the most popular for homes and typically cost between EUR 1,200 and EUR 2,500.' },
        { q: 'How much space do I need for a pool table?', a: 'You need the table surface plus 5 feet of clearance on each side for comfortable play. For a 7-foot table (7 x 4 feet), you need a room of at least 15 x 12 feet.' },
        { q: 'Is shipping and installation included?', a: 'Yes, at The Games Room we offer free shipping across Europe. Professional installation is available as an additional service. Our team handles complete assembly and leveling.' },
        { q: 'What warranty do the products have?', a: 'All our products come with a full 2-year warranty covering manufacturing defects and materials. We also offer post-sale technical service.' },
        { q: 'Can I return the product if I am not satisfied?', a: 'Yes, we offer a 30-day satisfaction guarantee. If the product does not meet your expectations, you can return it at no cost. We only ask that it be in its original packaging.' },
        { q: 'How long does delivery take?', a: 'Standard delivery time is 5-10 business days within mainland Europe. For islands and remote areas, it may take up to 15 days. You will receive a tracking email when your order ships.' },
        { q: 'Do you provide custom quotes?', a: 'Absolutely. You can request a no-obligation quote through our chat or contact form. We respond within 24 business hours.' },
        { q: 'What is the difference between a professional and a home table?', a: 'Professional tables use natural slate (heavier and more precise), competition cloth, and regulation dimensions. Home tables are lighter, use MDF or synthetic slate, and typically come in more compact sizes. Both offer excellent entertainment.' },
      ]
    },
    trust: {
      title: 'Why Buy from The Games Room',
      items: [
        { title: 'Over 3,000 Happy Customers', desc: 'Average rating of 4.8/5 with over 500 verified reviews across Europe.' },
        { title: 'Free and Fast Shipping', desc: 'Free delivery across Europe. 5-10 business days with real-time tracking.' },
        { title: 'Full 2-Year Warranty', desc: 'Warranty covering manufacturing defects and materials. Technical service included.' },
        { title: 'Personalized Service', desc: 'Expert team available by chat, email, and phone to help with your purchase.' },
      ]
    }
  },
};

export function LocalSEO({ locale }: LocalSEOProps) {
  const content = CONTENT[locale] || CONTENT.en || CONTENT.es;
  
  if (!content) return null;

  const trustIcons = [Star, Truck, Shield, Award];

  // FAQ JSON-LD for Google rich snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": content.faq.items.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Trust Section */}
      <section className="py-16 bg-[#fafaf8]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-serif text-neutral-900 text-center mb-12 text-balance">
            {content.trust.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.trust.items.map((item, i) => {
              const Icon = trustIcons[i];
              return (
                <div key={i} className="bg-background p-6 rounded-lg border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-sm font-medium text-foreground leading-tight">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Buying Guide - Rich content for SEO */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-accent" strokeWidth={1.5} />
            <span className="text-xs tracking-widest text-muted-foreground uppercase">
              {'Guide'}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-3 text-balance">
            {content.buyingGuide.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-12 max-w-2xl">
            {content.buyingGuide.subtitle}
          </p>
          
          <div className="flex flex-col gap-10">
            {content.buyingGuide.sections.map((section, i) => (
              <article key={i} className="border-l-2 border-accent/30 pl-6">
                <h3 className="text-lg font-medium text-foreground mb-3">
                  {section.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  {section.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Structured for rich snippets */}
      <section className="py-16 md:py-24 bg-[#fafaf8]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-5 h-5 text-accent" strokeWidth={1.5} />
            <span className="text-xs tracking-widest text-muted-foreground uppercase">FAQ</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-12 text-balance">
            {content.faq.title}
          </h2>
          
          <div className="flex flex-col gap-0">
            {content.faq.items.map((item, i) => (
              <details key={i} className="group border-b border-border">
                <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[15px] font-medium text-foreground pr-4 text-balance">
                    {item.q}
                  </h3>
                  <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="pb-5 pr-8">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
