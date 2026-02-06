import { type Locale } from "@/lib/seo-data";

interface FeaturesProps {
  locale: Locale;
}

export function Features({ locale }: FeaturesProps) {
  const texts: Record<string, { features: { title: string; desc: string }[] }> = {
    es: {
      features: [
        { title: 'Garantia 2 anos', desc: 'Cobertura completa en todos los productos sin excepciones.' },
        { title: 'Envio incluido', desc: 'Entrega profesional a domicilio en toda Europa.' },
        { title: 'Instalacion experta', desc: 'Equipo tecnico especializado a su servicio.' },
        { title: 'Atencion personalizada', desc: 'Asesoria de expertos para elegir lo mejor.' },
      ]
    },
    en: {
      features: [
        { title: '2 year warranty', desc: 'Full coverage on all products without exceptions.' },
        { title: 'Free shipping', desc: 'Professional home delivery across Europe.' },
        { title: 'Expert installation', desc: 'Specialized technical team at your service.' },
        { title: 'Personal service', desc: 'Expert advice to help you choose the best.' },
      ]
    },
    de: {
      features: [
        { title: '2 Jahre Garantie', desc: 'Volle Abdeckung auf alle Produkte ohne Ausnahmen.' },
        { title: 'Kostenloser Versand', desc: 'Professionelle Lieferung in ganz Europa.' },
        { title: 'Experteninstallation', desc: 'Spezialisiertes technisches Team.' },
        { title: 'Persoenlicher Service', desc: 'Expertenberatung fuer die beste Wahl.' },
      ]
    },
    fr: {
      features: [
        { title: 'Garantie 2 ans', desc: 'Couverture complete sur tous les produits.' },
        { title: 'Livraison gratuite', desc: 'Livraison professionnelle dans toute l\'Europe.' },
        { title: 'Installation experte', desc: 'Equipe technique specialisee a votre service.' },
        { title: 'Service personnel', desc: 'Conseil expert pour choisir le meilleur.' },
      ]
    },
    it: {
      features: [
        { title: 'Garanzia 2 anni', desc: 'Copertura completa su tutti i prodotti.' },
        { title: 'Spedizione gratuita', desc: 'Consegna professionale in tutta Europa.' },
        { title: 'Installazione esperta', desc: 'Team tecnico specializzato al vostro servizio.' },
        { title: 'Servizio personale', desc: 'Consulenza esperta per la scelta migliore.' },
      ]
    },
    pt: {
      features: [
        { title: 'Garantia 2 anos', desc: 'Cobertura completa em todos os produtos.' },
        { title: 'Envio gratis', desc: 'Entrega profissional em toda a Europa.' },
        { title: 'Instalacao especializada', desc: 'Equipe tecnica especializada.' },
        { title: 'Atendimento pessoal', desc: 'Orientacao especializada para a melhor escolha.' },
      ]
    },
    nl: {
      features: [
        { title: '2 jaar garantie', desc: 'Volledige dekking op alle producten.' },
        { title: 'Gratis verzending', desc: 'Professionele levering in heel Europa.' },
        { title: 'Expertinstallatie', desc: 'Gespecialiseerd technisch team.' },
        { title: 'Persoonlijke service', desc: 'Deskundig advies voor de beste keuze.' },
      ]
    },
    pl: {
      features: [
        { title: 'Gwarancja 2 lata', desc: 'Pelne pokrycie wszystkich produktow.' },
        { title: 'Darmowa wysylka', desc: 'Profesjonalna dostawa w calej Europie.' },
        { title: 'Fachowy montaz', desc: 'Wyspecjalizowany zespol techniczny.' },
        { title: 'Obsluga indywidualna', desc: 'Fachowe doradztwo przy wyborze.' },
      ]
    },
  };

  const t = texts[locale] || texts.es;

  return (
    <section className="py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {t.features.map((feature, index) => (
            <div key={index}>
              <div className="w-8 h-px bg-accent mb-5" />
              <h3 className="text-[11px] uppercase tracking-[0.2em] font-medium text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
