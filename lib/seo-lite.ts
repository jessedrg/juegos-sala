// THE GAMES ROOM - LIGHTWEIGHT SEO SYSTEM
// Mesas de billar, futbolines, dardos y air hockey

export const LOCALES = ['es', 'en', 'de', 'fr', 'it', 'pt', 'nl', 'pl', 'cs', 'el'] as const;
export type Locale = typeof LOCALES[number];

type Trans = {
  products: string;
  in: string;
  shipping: string;
  warranty: string;
  support: string;
  home: string;
  contact: string;
  viewAll: string;
  shop: string;
  description: string;
  qualityDesc: string;
  deliveryDesc: string;
  supportDesc: string;
};

// Complete translations for The Games Room
export const T: Record<Locale, Trans> = {
  es: { products: 'The Games Room', in: 'en', shipping: 'Envio Gratis', warranty: 'Garantia 2 Anos', support: 'Asesoria Experta', home: 'Inicio', contact: 'Contacto', viewAll: 'Ver Todo', shop: 'Catalogo', description: 'Mesas de billar, futbolines profesionales, dianas de dardos y air hockey para tu hogar.', qualityDesc: 'Materiales de primera calidad', deliveryDesc: 'Entrega gratuita en toda Europa', supportDesc: 'Equipo de expertos disponible' },
  en: { products: 'The Games Room', in: 'in', shipping: 'Free Shipping', warranty: '2 Year Warranty', support: 'Expert Guidance', home: 'Home', contact: 'Contact', viewAll: 'View All', shop: 'Catalog', description: 'Pool tables, foosball tables, dart boards and air hockey tables for your home.', qualityDesc: 'Professional-grade materials', deliveryDesc: 'Free delivery across Europe', supportDesc: 'Expert team available' },
  de: { products: 'The Games Room', in: 'in', shipping: 'Kostenloser Versand', warranty: '2 Jahre Garantie', support: 'Expertenberatung', home: 'Startseite', contact: 'Kontakt', viewAll: 'Alle Anzeigen', shop: 'Katalog', description: 'Billardtische, Tischfussball, Dartscheiben und Airhockey-Tische fur Ihr Zuhause.', qualityDesc: 'Erstklassige Materialien', deliveryDesc: 'Kostenlose Lieferung in ganz Europa', supportDesc: 'Expertenteam verfugbar' },
  fr: { products: 'The Games Room', in: 'a', shipping: 'Livraison Gratuite', warranty: 'Garantie 2 Ans', support: 'Conseil Expert', home: 'Accueil', contact: 'Contact', viewAll: 'Voir Tout', shop: 'Catalogue', description: 'Tables de billard, baby-foot, cibles de flechettes et tables de air hockey pour votre maison.', qualityDesc: 'Materiaux professionnels', deliveryDesc: 'Livraison gratuite dans toute l\'Europe', supportDesc: 'Equipe d\'experts disponible' },
  it: { products: 'The Games Room', in: 'a', shipping: 'Spedizione Gratuita', warranty: 'Garanzia 2 Anni', support: 'Consulenza Esperta', home: 'Home', contact: 'Contatto', viewAll: 'Vedi Tutto', shop: 'Catalogo', description: 'Tavoli da biliardo, calcio balilla, bersagli freccette e tavoli air hockey per la tua casa.', qualityDesc: 'Materiali professionali', deliveryDesc: 'Consegna gratuita in tutta Europa', supportDesc: 'Team di esperti disponibile' },
  pt: { products: 'The Games Room', in: 'em', shipping: 'Envio Gratis', warranty: 'Garantia 2 Anos', support: 'Orientacao Especializada', home: 'Inicio', contact: 'Contato', viewAll: 'Ver Tudo', shop: 'Catalogo', description: 'Mesas de bilhar, matraquilhos, alvos de dardos e mesas de air hockey para sua casa.', qualityDesc: 'Materiais profissionais', deliveryDesc: 'Entrega gratuita em toda a Europa', supportDesc: 'Equipe de especialistas disponivel' },
  nl: { products: 'The Games Room', in: 'in', shipping: 'Gratis Verzending', warranty: '2 Jaar Garantie', support: 'Expert Advies', home: 'Home', contact: 'Contact', viewAll: 'Bekijk Alles', shop: 'Catalogus', description: 'Pooltafels, tafelvoetbal, dartborden en airhockey tafels voor uw huis.', qualityDesc: 'Professionele materialen', deliveryDesc: 'Gratis levering in heel Europa', supportDesc: 'Expertteam beschikbaar' },
  pl: { products: 'The Games Room', in: 'w', shipping: 'Darmowa Wysylka', warranty: 'Gwarancja 2 Lata', support: 'Porada Eksperta', home: 'Strona glowna', contact: 'Kontakt', viewAll: 'Zobacz Wszystko', shop: 'Katalog', description: 'Stoly bilardowe, pilkarzyki, tarcze do darta i stoly do air hockey dla Twojego domu.', qualityDesc: 'Profesjonalne materialy', deliveryDesc: 'Darmowa dostawa w calej Europie', supportDesc: 'Zespol ekspertow dostepny' },
  cs: { products: 'The Games Room', in: 'v', shipping: 'Doprava Zdarma', warranty: 'Zaruka 2 Roky', support: 'Odborne Poradenstvi', home: 'Domu', contact: 'Kontakt', viewAll: 'Zobrazit Vse', shop: 'Katalog', description: 'Kulecnikove stoly, stolni fotbaly, sipkove tarce a stoly na air hockey pro vas domov.', qualityDesc: 'Profesionalni materialy', deliveryDesc: 'Doprava zdarma po cele Evrope', supportDesc: 'Tym odborniku k dispozici' },
  el: { products: 'The Games Room', in: 'se', shipping: 'Dorean Apostoli', warranty: 'Eggyisi 2 Eton', support: 'Eidiki Kathodigisi', home: 'Arxiki', contact: 'Epikoinonia', viewAll: 'Deite Ola', shop: 'Katalogos', description: 'Trapezia mpiliardou, podosfairakia, stochoi velakia kai trapezia air hockey gia to spiti sas.', qualityDesc: 'Epaggelmatika ylika', deliveryDesc: 'Dorean paradosi se oli tin Evropi', supportDesc: 'Omada eidikon diathesimi' },
};

// Format ANY slug to readable title - NEVER fails, ZERO memory
export function formatSlugToTitle(slug: string): string {
  if (!slug) return '';
  // Decode URL-encoded characters (e.g., %C3%A4 -> ä)
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    // If decode fails, use original
  }
  return decoded
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Get locale safely - defaults to 'en'
export function getLocale(locale: string): Locale {
  return LOCALES.includes(locale as Locale) ? locale as Locale : 'en';
}

// Get translations safely
export function getT(locale: string) {
  return T[getLocale(locale)] || T.en;
}
