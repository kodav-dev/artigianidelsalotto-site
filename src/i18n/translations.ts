export const translations = {
  it: {
    // Navigation
    nav: {
      home: "Home",
      menu: "Divani",
      ourStory: "La nostra storia",
      blog: "Blog",
    },
    // Homepage
    home: {
      title: "Artigiani del Salotto: l'eccellenza artigiana nel cuore del tuo living",
      description: "Artigiani del Salotto rappresenta l'eccellenza nella produzione artigianale di divani e poltrone. Ogni pezzo è realizzato a mano con materiali di pregio, unendo il design contemporaneo alla maestria della tradizione artigiana italiana. Creiamo soluzioni su misura che trasformano il tuo salotto in un'oasi di comfort e stile, garantendo qualità e durata nel tempo.",
      galleryTitle: "I nostri modelli",
      gallerySubtitle: "Artigianalità e design in ogni dettaglio",
      closureTitle: "Contattaci per un preventivo",
      H1_top: "Artigiani del Salotto",
      H1_main: "Maestri del",
      H1_highlight: "Comfort",
      seo: {
        title: "Artigiani del Salotto | Divani Artigianali su Misura",
        description: "Scopri l'eccellenza di Artigiani del Salotto. Produzione artigianale di divani e poltrone di qualità superiore, realizzati a mano in Italia. Design, comfort e personalizzazione.",
      },
      menu: {
        title: "Le nostre Collezioni",
        categories: {
          moderno: "Moderno",
          classico: "Classico",
          relax: "Relax",
          accessori: "Accessori"
        },
        items: {
          // Placeholder per prodotti divani
          divano1: {
            category: "Moderno",
            name: "Modulo",
            price: "Su richiesta",
            description: "Divano modulare dal design essenziale e contemporaneo"
          }
        }
      }
    },
    // Footer
    footer: {
      address: "In attesa di indirizzo",
      city: "Città",
      phoneFixed: "000 000000",
      phoneMobile: "000 000000",
      phoneFixedLabel: "Fisso",
      phoneMobileLabel: "Mobile",
      hours: "Lun - Ven: 09:00 - 18:00",
      description: "L'eccellenza del comfort artigianale, direttamente a casa tua.",
      quickLinks: "Link Rapidi",
      connect: "Connettiti",
      copyright: "Tutti i diritti riservati.",
      privacy: "Privacy Policy",
      terms: "Termini di Servizio",
      cookiePolicy: "Cookie Policy",
      directions: "Come raggiungerci",
      bookTableCTA: "Richiedi un preventivo",
      openingHours: {
        title: "Orari di Apertura",
        days: {
          monday: "Lunedì",
          tuesday: "Martedì",
          wednesday: "Mercoledì",
          thursday: "Giovedì",
          friday: "Venerdì",
          saturday: "Sabato",
          sunday: "Domenica"
        },
        closed: "Chiuso",
        from: "dalle",
        to: "alle",
        and: "e",
        closedDaysTitle: "Giorni di chiusura"
      },
      form: {
        title: "Contattaci",
        name: "Nome e Cognome",
        email: "Email",
        phone: "Telefono",
        date: "Data",
        time: "Orario",
        guests: "Informazioni richieste",
        send: "Invia richiesta",
        privacyConsent: "Ho letto e accetto la",
        privacyLink: "Privacy Policy",
        privacyRequired: "Devi accettare la Privacy Policy per procedere",
      }
    }
  },
  en: {
    // Navigation
    nav: {
      home: "Home",
      menu: "Sofas",
      ourStory: "Our Story",
      blog: "Blog",
    },
    // Homepage
    home: {
      title: "Artigiani del Salotto: artisan excellence in the heart of your living room",
      description: "Artigiani del Salotto represents excellence in the artisanal production of sofas and armchairs. Each piece is handmade with premium materials, blending contemporary design with the mastery of Italian craft tradition. We create custom solutions that transform your living room into an oasis of comfort and style, ensuring quality and durability over time.",
      galleryTitle: "Our Models",
      gallerySubtitle: "Craftsmanship and design in every detail",
      closureTitle: "Contact us for a quote",
      H1_top: "Artigiani del Salotto",
      H1_main: "Masters of",
      H1_highlight: "Comfort",
      seo: {
        title: "Artigiani del Salotto | Custom Artisanal Sofas",
        description: "Discover the excellence of Artigiani del Salotto. Artisanal production of superior quality sofas and armchairs, handmade in Italy. Design, comfort, and customization.",
      },
      menu: {
        title: "Our Collections",
        categories: {
          moderno: "Modern",
          classico: "Classic",
          relax: "Relax",
          accessori: "Accessories"
        },
        items: {
          divano1: {
            category: "Modern",
            name: "Modulo",
            price: "On request",
            description: "Modular sofa with an essential and contemporary design"
          }
        }
      }
    },
    // Footer
    footer: {
      address: "Address Pending",
      city: "City",
      phoneFixed: "000 000000",
      phoneMobile: "000 000000",
      phoneFixedLabel: "Fixed",
      phoneMobileLabel: "Mobile",
      hours: "Mon - Fri: 09:00 AM - 06:00 PM",
      description: "Excellence in artisanal comfort, directly to your home.",
      quickLinks: "Quick Links",
      connect: "Connect",
      copyright: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      cookiePolicy: "Cookie Policy",
      directions: "Get directions",
      bookTableCTA: "Request a quote",
      openingHours: {
        title: "Opening Hours",
        days: {
          monday: "Monday",
          tuesday: "Tuesday",
          wednesday: "Wednesday",
          thursday: "Thursday",
          friday: "Friday",
          saturday: "Saturday",
          sunday: "Sunday"
        },
        closed: "Closed",
        from: "from",
        to: "to",
        and: "and",
        closedDaysTitle: "Closing Days"
      },
      form: {
        title: "Contact Us",
        name: "Full Name",
        email: "Email",
        phone: "Phone",
        date: "Date",
        time: "Time",
        guests: "Requested information",
        send: "Send request",
        privacyConsent: "I have read and accept the",
        privacyLink: "Privacy Policy",
        privacyRequired: "You must accept the Privacy Policy to proceed",
      }
    }
  }
} as const;

export type Locale = keyof typeof translations;
