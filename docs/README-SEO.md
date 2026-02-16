# SEO Setup - kodav.dev

## Overview

Il sito utilizza `astro-seo` per la gestione completa del SEO, con supporto per:
- Open Graph (Facebook, LinkedIn)
- Twitter Cards
- Sitemap multilingua
- Meta tags strutturati
- Canonical URLs
- Hreflang per SEO multilingua

## Configurazione

### 1. Sitemap

Il sitemap viene generato automaticamente in `astro.config.mjs`:

```javascript
site: 'https://kodav.dev',
integrations: [
  sitemap({
    i18n: {
      defaultLocale: 'it',
      locales: {
        it: 'it-IT',
        en: 'en-US',
      },
    },
  }),
]
```

**Output**: `/sitemap-index.xml` con tutte le pagine IT/EN

### 2. Componente SEO

Il componente `src/components/SEO.astro` gestisce automaticamente:

#### Meta Tags Base
- Title
- Description
- Canonical URL
- Viewport
- Theme color
- Language

#### Open Graph
- og:title
- og:description
- og:image
- og:url
- og:type (website o article)
- og:locale
- og:site_name

#### Twitter Cards
- twitter:card
- twitter:title
- twitter:description
- twitter:image
- twitter:creator

#### Hreflang (SEO Multilingua)
- Link alternati per IT/EN
- x-default per lingua predefinita

#### Article Metadata (per blog)
- article:published_time
- article:modified_time
- article:author
- article:tag

## Utilizzo nei Layout

### BaseLayout (Homepage, About, Contact, etc.)

```astro
<BaseLayout
  title="Titolo Pagina - kodav.dev"
  description="Descrizione della pagina"
  image="/og-image-custom.jpg"  // Opzionale
  noindex={false}                // Opzionale
>
  <!-- Contenuto -->
</BaseLayout>
```

### BlogLayout (Articoli Blog)

```astro
<BlogLayout
  title="Titolo Articolo - kodav.dev"
  description="Descrizione articolo"
  image={post.data.image}        // Opzionale
  publishedTime={post.data.pubDate.toISOString()}
  modifiedTime={post.data.modifiedTime?.toISOString()}
  author={post.data.author}
  tags={post.data.tags}
>
  <!-- Contenuto -->
</BlogLayout>
```

### WikiLayout (Pagine Wiki)

```astro
<WikiLayout
  title="Titolo Wiki - kodav.dev"
  description="Descrizione pagina wiki"
  image="/wiki-og-image.jpg"     // Opzionale
>
  <!-- Contenuto -->
</WikiLayout>
```

## Immagini Open Graph

### Specifiche
- Dimensioni: 1200x630px
- Formato: JPG o PNG
- Peso: < 1MB
- Ratio: 1.91:1

### Default
Se non specifichi un'immagine, viene usata `/og-image.jpg` come default.

### Per pagina
Passa la prop `image`:
```astro
<BaseLayout
  title="..."
  description="..."
  image="/images/custom-og-image.jpg"
>
```

### Per blog post
Aggiungi il campo `image` nel frontmatter:
```markdown
---
title: "Titolo Post"
description: "..."
pubDate: 2025-01-15
image: "/images/blog/post-image.jpg"
---
```

## Creare Immagini OG

### Tools Consigliati
1. **Canva**: Template pre-fatti
2. **Figma**: Design personalizzato
3. **OG Image Generator**: https://og-playground.vercel.app/

### Template Base
```
┌─────────────────────────────────┐
│  Logo kodav.dev                 │
│                                 │
│  TITOLO PAGINA                  │
│  Sottotitolo o descrizione      │
│                                 │
│  kodav.dev                      │
└─────────────────────────────────┘
1200x630px
```

## Robots.txt

File: `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://kodav.dev/sitemap-index.xml
```

## Testing SEO

### Tools di Test
1. **Facebook Debugger**: https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
4. **Google Rich Results**: https://search.google.com/test/rich-results

### Checklist Pre-Deploy
- [ ] Verificare title univoci per ogni pagina
- [ ] Description tra 150-160 caratteri
- [ ] Immagini OG 1200x630px
- [ ] Sitemap generato correttamente
- [ ] robots.txt presente
- [ ] Canonical URLs corretti
- [ ] Hreflang per tutte le lingue
- [ ] Meta tags social (OG + Twitter)

## Best Practices

### Title
- Lunghezza: 50-60 caratteri
- Include parole chiave
- Termina con " - kodav.dev"
- Evita duplicati

### Description
- Lunghezza: 150-160 caratteri
- Riassunto chiaro della pagina
- Include CTA quando appropriato
- Evita duplicati

### Images
- Sempre fornire alt text
- Usare formati moderni (WebP con fallback)
- Ottimizzare per web (< 100KB)
- Responsive con srcset

### URLs
- Usare slug SEO-friendly
- Evitare parametri quando possibile
- Mantenere coerenza tra lingue

### Structured Data (Futuro)
Per implementare JSON-LD:
```astro
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "author": {
    "@type": "Person",
    "name": "..."
  }
}
</script>
```

## Monitoraggio

### Google Search Console
1. Verifica proprietà sito
2. Invia sitemap
3. Monitora performance
4. Controlla errori indicizzazione

### Metriche da Monitorare
- Click-through rate (CTR)
- Impressioni
- Posizione media
- Errori 404
- Core Web Vitals

## Troubleshooting

### Immagini OG non appaiono
1. Verifica dimensioni (1200x630)
2. Controlla URL assoluto
3. Testa con Facebook Debugger
4. Clear cache social network

### Sitemap non generato
1. Verifica `site` in astro.config.mjs
2. Controlla build output
3. Verifica integrazione sitemap

### Hreflang non funziona
1. Verifica URL assoluti
2. Controlla struttura locale
3. Testa con Google Search Console
