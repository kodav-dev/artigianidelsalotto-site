# Guida ai Dati Strutturati (Schema.org JSON-LD)

I dati strutturati sono stati implementati nel sito per migliorare la SEO e l'apparizione nei risultati di ricerca.

## Implementazione Attuale

### 1. Dati Globali del Ristorante

Automaticamente inclusi in tutte le pagine tramite il componente `SEO.astro`:

```typescript
{
  "@type": "Restaurant",
  "name": "La Corte di Laura",
  "description": "...",
  "address": {...},
  "geo": {...},
  "servesCuisine": ["Italian", "Mediterranean"],
  "priceRange": "$$"
}
```

### 2. Dati per Articoli del Blog

Automaticamente inclusi nelle pagine blog quando passi la prop `article` al componente SEO:

```astro
<SEO
  title={post.title}
  description={post.description}
  article={{
    publishedTime: post.publishedDate,
    modifiedTime: post.updatedDate,
    author: "Laura",
    tags: post.tags
  }}
/>
```

## Come Personalizzare

### Aggiornare i Dati del Ristorante

Modifica il file `src/components/StructuredData.astro` e aggiorna:

1. **Telefono**: Sostituisci `"+39-XXX-XXXXXXX"`
2. **Email**: Sostituisci `"info@lacortedilaura.com"`
3. **Indirizzo**: Aggiorna l'oggetto `address`
4. **Coordinate GPS**: Aggiorna `latitude` e `longitude`
5. **Social Media**: Aggiungi link nell'array `sameAs`

### Aggiungere Dati Strutturati al Menu

Per aggiungere schema.org al menu, modifica `src/components/pages/Menu.astro`:

```astro
---
import StructuredData from "@/components/StructuredData.astro";

// Prepara i dati del menu
const menuSections = [
  {
    "@type": "MenuSection",
    "name": t("home.menu.categories.antipasti"),
    "hasMenuItem": [
      {
        "@type": "MenuItem",
        "name": "Bruschetta",
        "description": "Pane tostato con pomodoro fresco",
        "offers": {
          "@type": "Offer",
          "price": "8.00",
          "priceCurrency": "EUR"
        }
      }
      // ... altri piatti
    ]
  }
  // ... altre sezioni
];
---

<BaseLayout ...>
  <!-- Nel head o nel layout -->
  <StructuredData
    type="menu"
    data={{
      menuName: t("ilMenu.seo.title"),
      menuDescription: t("ilMenu.seo.description"),
      menuSections: menuSections
    }}
  />

  <!-- resto del contenuto -->
</BaseLayout>
```

### Aggiungere Breadcrumb

Per pagine con navigazione gerarchica:

```astro
<StructuredData
  type="breadcrumb"
  data={{
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Menu", url: "/menu" },
      { name: "Antipasti", url: "/menu/antipasti" }
    ]
  }}
/>
```

## Tipi di Dati Strutturati Disponibili

Il componente `StructuredData.astro` supporta:

- **restaurant**: Dati generali del ristorante (usato automaticamente)
- **article**: Per post del blog (usato automaticamente)
- **menu**: Per la pagina del menu (da implementare)
- **breadcrumb**: Per la navigazione (da implementare dove necessario)

## Testare i Dati Strutturati

Usa questi strumenti Google:

1. **Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema Markup Validator**: https://validator.schema.org/

Inserisci l'URL della pagina per verificare che i dati strutturati siano corretti.

## Benefici SEO

I dati strutturati implementati aiutano Google a:

- Mostrare informazioni del ristorante direttamente nei risultati
- Creare rich snippets per gli articoli del blog
- Mostrare orari di apertura e contatti
- Migliorare la visibilità locale
- Creare caroselli di ricette/menu

## Prossimi Passi Consigliati

1. ✅ Dati base del ristorante - IMPLEMENTATO
2. ✅ Dati articoli blog - IMPLEMENTATO
3. ⬜ Completare i dati del menu con piatti e prezzi
4. ⬜ Aggiungere orari di apertura
5. ⬜ Aggiungere recensioni (se disponibili)
6. ⬜ Aggiungere dati per ricette (se hai ricette nel blog)
