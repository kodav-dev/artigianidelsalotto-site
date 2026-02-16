# TODO SEO - Cose da fare

## ✅ Completato

- [x] Installato `astro-seo` e `@astrojs/sitemap`
- [x] Creato componente SEO con Open Graph e Twitter Cards
- [x] Integrato SEO in tutti i layout (Base, Blog, Wiki)
- [x] Configurato sitemap multilingua
- [x] Creato robots.txt
- [x] Aggiunto supporto hreflang automatico
- [x] Documentazione completa (README-SEO.md)

## 🔴 Da Fare Subito

### 1. Creare Immagine Open Graph Default
**File**: `public/og-image.jpg`
- Dimensioni: 1200x630px
- Contenuto: Logo kodav.dev + tagline
- Tool: Canva o Figma

**Comando rapido con ImageMagick (se installato)**:
```bash
# Crea placeholder
convert -size 1200x630 -background '#6366f1' -fill white \
  -gravity center -pointsize 72 -annotate +0+0 'kodav.dev' \
  public/og-image.jpg
```

### 2. Aggiungere Immagini ai Blog Post
Aggiorna lo schema blog in `src/content/config.ts`:

```typescript
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Kodav'),
    image: z.string().optional(), // ← Aggiungi questo
    tags: z.array(z.string()).default([]),
  }),
});
```

Poi nei post:
```markdown
---
title: "..."
description: "..."
pubDate: 2025-01-15
image: "/images/blog/post-image.jpg"  # ← Aggiungi
---
```

### 3. Aggiornare Blog Post Template
In `src/pages/blog/[slug].astro`:

```astro
<BlogLayout
  title={`${post.data.title} - kodav.dev`}
  description={post.data.description}
  image={post.data.image}  // ← Aggiungi
  publishedTime={post.data.pubDate.toISOString()}
  author={post.data.author}
  tags={post.data.tags}
>
```

### 4. Verificare Social Tags
Testa su:
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/

## 🟡 Ottimizzazioni Future

### Schema.org / JSON-LD
Aggiungere structured data per:
- Organization
- WebSite
- BlogPosting
- BreadcrumbList

**Esempio**:
```astro
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "kodav.dev",
  "url": "https://kodav.dev",
  "logo": "https://kodav.dev/logo.png",
  "sameAs": [
    "https://twitter.com/kodavdev",
    "https://github.com/kodav"
  ]
}
</script>
```

### Google Analytics / Search Console
1. Creare property Google Analytics 4
2. Aggiungere tracking code
3. Verificare sito in Search Console
4. Inviare sitemap

### Performance
- Lazy load immagini OG
- Preconnect a social networks
- Ottimizzare Core Web Vitals

### Contenuto
- Meta description uniche (no duplicati)
- Alt text per tutte le immagini
- Heading hierarchy (H1 → H2 → H3)
- Internal linking

## 📊 Monitoraggio

Dopo il deploy, monitorare:

1. **Google Search Console**
   - Errori indicizzazione
   - Coverage report
   - Performance query
   - Core Web Vitals

2. **Metriche SEO**
   - Organic traffic
   - Click-through rate
   - Posizione media
   - Impressioni

3. **Social Shares**
   - OG tags corretti?
   - Immagini appaiono?
   - Preview card OK?

## 🔧 Testing Locale

Prima del deploy:

```bash
# Build
npm run build

# Verifica sitemap
cat dist/sitemap-0.xml | grep "<loc>"

# Verifica robots.txt
cat public/robots.txt

# Preview
npm run preview
```

Poi testa manualmente:
- [ ] Ogni pagina ha title unico
- [ ] Description < 160 caratteri
- [ ] Immagini OG presenti
- [ ] Link hreflang per IT/EN
- [ ] Canonical URL corretti

## 📝 Note

- Il componente SEO gestisce automaticamente canonical URLs
- Hreflang viene generato per tutte le pagine IT/EN
- Il sitemap viene rigenerato ad ogni build
- robots.txt è statico in `/public`
