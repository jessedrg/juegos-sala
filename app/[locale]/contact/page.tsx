"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/store/header";
import { Footer } from "@/components/store/footer";
import { Button } from "@/components/ui/button";
import { SUPPORTED_LOCALES, type Locale } from "@/lib/seo-data";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

const CONTACT_CONTENT: Record<string, {
  hero: { eyebrow: string; title: string; subtitle: string };
  form: { 
    title: string;
    name: string; 
    email: string; 
    subject: string; 
    message: string; 
    submit: string;
    sending: string;
    success: string;
    successMsg: string;
  };
  info: { 
    title: string;
    email: { label: string; value: string };
    phone: { label: string; value: string };
    address: { label: string; value: string };
  };
  faq: { 
    title: string; 
    items: { q: string; a: string }[] 
  };
}> = {
  en: {
    hero: {
      eyebrow: "Get in Touch",
      title: "We are here to help",
      subtitle: "Have questions about pool tables, foosball, darts, or air hockey? Our team of game room experts is ready to assist you."
    },
    form: {
      title: "Send us a message",
      name: "Your name",
      email: "Email address",
      subject: "Subject",
      message: "Your message",
      submit: "Send Message",
      sending: "Sending...",
      success: "Message Sent",
      successMsg: "Thank you for reaching out. We will respond within 24 hours."
    },
    info: {
      title: "Contact Information",
      email: { label: "Email", value: "hello@thegamesroom.io" },
      phone: { label: "Phone", value: "+34 900 123 456" },
      address: { label: "Warehouse", value: "European Distribution Center" }
    },
    faq: {
      title: "Common Questions",
      items: [
        { q: "What is your shipping policy?", a: "We offer free shipping on all orders across Europe. Standard delivery takes 5-10 business days." },
        { q: "Do you offer installation?", a: "Yes, professional installation is available as an additional service in most European countries." },
        { q: "What is your return policy?", a: "We offer a 30-day satisfaction guarantee on all products in original packaging." }
      ]
    }
  },
  es: {
    hero: {
      eyebrow: "Contactanos",
      title: "Estamos aqui para ayudarte",
      subtitle: "Tienes preguntas sobre mesas de billar, futbolines, dardos o air hockey? Nuestro equipo de expertos esta listo para asistirte."
    },
    form: {
      title: "Envianos un mensaje",
      name: "Tu nombre",
      email: "Correo electronico",
      subject: "Asunto",
      message: "Tu mensaje",
      submit: "Enviar Mensaje",
      sending: "Enviando...",
      success: "Mensaje Enviado",
      successMsg: "Gracias por contactarnos. Responderemos en 24 horas."
    },
    info: {
      title: "Informacion de Contacto",
      email: { label: "Email", value: "hola@thegamesroom.io" },
      phone: { label: "Telefono", value: "+34 900 123 456" },
      address: { label: "Almacen", value: "Centro de Distribucion Europeo" }
    },
    faq: {
      title: "Preguntas Frecuentes",
      items: [
        { q: "Cual es la politica de envio?", a: "Ofrecemos envio gratuito en todos los pedidos en toda Europa. La entrega estandar tarda 5-10 dias laborables." },
        { q: "Ofrecen instalacion?", a: "Si, la instalacion profesional esta disponible como servicio adicional en la mayoria de paises europeos." },
        { q: "Cual es la politica de devoluciones?", a: "Ofrecemos 30 dias de garantia de satisfaccion en todos los productos en su embalaje original." }
      ]
    }
  },
  de: {
    hero: {
      eyebrow: "Kontakt",
      title: "Wir sind fur Sie da",
      subtitle: "Haben Sie Fragen zu Billardtischen, Tischfussball, Darts oder Airhockey? Unser Expertenteam hilft Ihnen gerne."
    },
    form: {
      title: "Nachricht senden",
      name: "Ihr Name",
      email: "E-Mail-Adresse",
      subject: "Betreff",
      message: "Ihre Nachricht",
      submit: "Nachricht Senden",
      sending: "Wird gesendet...",
      success: "Nachricht Gesendet",
      successMsg: "Vielen Dank. Wir antworten innerhalb von 24 Stunden."
    },
    info: {
      title: "Kontaktinformationen",
      email: { label: "E-Mail", value: "hallo@thegamesroom.io" },
      phone: { label: "Telefon", value: "+34 900 123 456" },
      address: { label: "Lager", value: "Europaisches Distributionszentrum" }
    },
    faq: {
      title: "Haufige Fragen",
      items: [
        { q: "Wie ist Ihre Versandpolitik?", a: "Kostenloser Versand auf alle Bestellungen in ganz Europa. Standardlieferung dauert 5-10 Werktage." },
        { q: "Bieten Sie Installation an?", a: "Ja, professionelle Installation ist als zusatzlicher Service in den meisten europaischen Landern verfugbar." },
        { q: "Wie ist Ihre Ruckgabepolitik?", a: "30 Tage Zufriedenheitsgarantie auf alle Produkte in Originalverpackung." }
      ]
    }
  },
  fr: {
    hero: {
      eyebrow: "Contactez-nous",
      title: "Nous sommes la pour vous aider",
      subtitle: "Des questions sur les tables de billard, baby-foot, flechettes ou air hockey? Notre equipe d'experts est prete a vous assister."
    },
    form: {
      title: "Envoyez-nous un message",
      name: "Votre nom",
      email: "Adresse e-mail",
      subject: "Sujet",
      message: "Votre message",
      submit: "Envoyer",
      sending: "Envoi...",
      success: "Message Envoye",
      successMsg: "Merci de nous avoir contactes. Nous repondrons sous 24 heures."
    },
    info: {
      title: "Informations de Contact",
      email: { label: "Email", value: "bonjour@thegamesroom.io" },
      phone: { label: "Telephone", value: "+34 900 123 456" },
      address: { label: "Entrepot", value: "Centre de Distribution Europeen" }
    },
    faq: {
      title: "Questions Frequentes",
      items: [
        { q: "Quelle est votre politique de livraison?", a: "Livraison gratuite sur toutes les commandes en Europe. Delai standard de 5-10 jours ouvrables." },
        { q: "Proposez-vous l'installation?", a: "Oui, installation professionnelle disponible dans la plupart des pays europeens." },
        { q: "Quelle est votre politique de retour?", a: "Garantie satisfaction 30 jours sur tous les produits dans leur emballage d'origine." }
      ]
    }
  }
};

export default function ContactPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'en';
  const content = CONTACT_CONTENT[locale] || CONTACT_CONTENT.en;
  
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (!SUPPORTED_LOCALES.includes(locale)) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      <Header locale={locale} />
      
      {/* Hero Section */}
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-4 block">
            {content.hero.eyebrow}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-4 text-balance">
            {content.hero.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {content.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Form */}
            <div>
              <h2 className="text-xl font-serif mb-6">{content.form.title}</h2>
              
              {isSuccess ? (
                <div className="bg-secondary/50 p-10 rounded-lg text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-4">
                    <CheckCircle className="h-7 w-7 text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-serif mb-2">{content.form.success}</h3>
                  <p className="text-muted-foreground text-sm">{content.form.successMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      {content.form.name}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-12 px-4 bg-transparent border border-border rounded-md focus:border-accent focus:outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      {content.form.email}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-12 px-4 bg-transparent border border-border rounded-md focus:border-accent focus:outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      {content.form.subject}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full h-12 px-4 bg-transparent border border-border rounded-md focus:border-accent focus:outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      {content.form.message}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-4 bg-transparent border border-border rounded-md focus:border-accent focus:outline-none transition-colors text-sm resize-none"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-full text-sm font-medium"
                  >
                    {isSubmitting ? (
                      content.form.sending
                    ) : (
                      <>
                        {content.form.submit}
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Info & FAQ */}
            <div>
              {/* Contact Info */}
              <h2 className="text-xl font-serif mb-6">{content.info.title}</h2>
              <div className="flex flex-col gap-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">
                      {content.info.email.label}
                    </p>
                    <a href={`mailto:${content.info.email.value}`} className="text-sm hover:underline">
                      {content.info.email.value}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">
                      {content.info.phone.label}
                    </p>
                    <a href={`tel:${content.info.phone.value}`} className="text-sm hover:underline">
                      {content.info.phone.value}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4 text-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">
                      {content.info.address.label}
                    </p>
                    <p className="text-sm">{content.info.address.value}</p>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <h3 className="text-lg font-serif mb-4">{content.faq.title}</h3>
              <div className="flex flex-col gap-4">
                {content.faq.items.map((item, index) => (
                  <div key={index} className="border-b border-border/50 pb-4">
                    <h4 className="text-sm font-medium mb-1">{item.q}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer locale={locale} />
    </main>
  );
}
