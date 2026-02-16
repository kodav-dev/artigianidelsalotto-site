# Come Testare i Dati Strutturati

I dati strutturati sono stati implementati con successo nel sito! Ecco come testarli e validarli.

## ✅ Cosa è Stato Implementato

1. **Dati del Ristorante** (Schema.org Restaurant)
   - Nome, descrizione, URL
   - Indirizzo e coordinate geografiche
   - Telefono e email
   - Tipo di cucina e fascia di prezzo
   - Accettazione prenotazioni

2. **Dati degli Articoli** (Schema.org Article)
   - Titolo e descrizione
   - Autore e publisher
   - Date di pubblicazione e modifica
   - Immagine e URL dell'articolo
   - Lingua

## 🧪 Come Testare

### 1. Testa con Google Rich Results Test

Vai su: https://search.google.com/test/rich-results

Inserisci gli URL delle tue pagine:
- Homepage: `https://lacortedilaura.it/`
- Blog post: `https://lacortedilaura.it/blog-di-laura/ho-lasciato-il-posto-fisso/`
- Menu: `https://lacortedilaura.it/menu/`

### 2. Valida con Schema.org Validator

Vai su: https://validator.schema.org/

Incolla l'URL o il codice HTML della pagina per validare che i dati siano conformi allo standard Schema.org.

### 3. Test Locale

Dopo aver buildato il sito (`npm run build`), puoi verificare i dati localmente:

```bash
# Controlla homepage
node -e "const fs = require('fs'); const html = fs.readFileSync('dist/index.html', 'utf8'); const match = html.match(/<script[^>]*application\/ld\+json[^>]*>(.*?)<\/script>/); if (match) console.log(JSON.parse(match[1]))"

# Controlla un articolo del blog
node -e "const fs = require('fs'); const html = fs.readFileSync('dist/blog-di-laura/ho-lasciato-il-posto-fisso/index.html', 'utf8'); const match = html.match(/<script[^>]*application\/ld\+json[^>]*>(.*?)<\/script>/); if (match) console.log(JSON.parse(match[1]))"
```

## 📝 Personalizzazioni Necessarie

Prima di andare in produzione, DEVI aggiornare questi dati nel file [src/components/StructuredData.astro](src/components/StructuredData.astro):

### Dati da Aggiornare

1. **Telefono** (riga 17):
   ```javascript
   "telephone": "+39-XXX-XXXXXXX", // ← Inserisci il numero reale
   ```

2. **Email** (riga 18):
   ```javascript
   "email": "info@lacortedilaura.com", // ← Inserisci l'email reale
   ```

3. **Indirizzo** (righe 19-25):
   ```javascript
   "address": {
     "@type": "PostalAddress",
     "streetAddress": "Via Example 123", // ← Indirizzo completo
     "addressLocality": "Città", // ← Nome della città
     "postalCode": "00000", // ← CAP
     "addressCountry": "IT"
   }
   ```

4. **Coordinate GPS** (righe 26-30):
   ```javascript
   "geo": {
     "@type": "GeoCoordinates",
     "latitude": "00.0000", // ← Latitudine
     "longitude": "00.0000" // ← Longitudine
   }
   ```

   Puoi trovare le coordinate su Google Maps:
   - Cerca il ristorante
   - Click destro sulla posizione
   - Copia le coordinate

5. **Social Media** (righe 35-39):
   ```javascript
   "sameAs": [
     "https://www.facebook.com/profile.php?id=61573481385415&locale=it_IT", // ← Aggiungi i tuoi profili
     "https://www.instagram.com/lacortedilaura"
   ]
   ```

6. **Orari di Apertura** (righe 40-60):
   Decommenta e personalizza le righe degli orari di apertura

## 🎯 Benefici SEO Attesi

Una volta personalizzati i dati, dovresti vedere:

1. **Knowledge Panel** nei risultati di Google con:
   - Nome del ristorante
   - Indirizzo e mappa
   - Orari di apertura
   - Telefono e link al sito

2. **Rich Snippets** per gli articoli del blog:
   - Autore e data di pubblicazione
   - Immagine dell'articolo
   - Breadcrumb nella SERP

3. **Migliore posizionamento locale**:
   - Risultati "vicino a me"
   - Google Maps integration
   - Recensioni e valutazioni (quando disponibili)

## 📚 Documentazione Aggiuntiva

- [STRUCTURED_DATA.md](STRUCTURED_DATA.md) - Guida completa ai dati strutturati
- [Schema.org Restaurant](https://schema.org/Restaurant) - Documentazione ufficiale
- [Schema.org Article](https://schema.org/Article) - Documentazione articoli

## 🔍 Monitoraggio

Dopo il deploy in produzione:

1. Vai su **Google Search Console**
2. Controlla la sezione **Enhancements** > **Structured data**
3. Monitora eventuali errori o warning
4. Richiedi l'indicizzazione delle pagine aggiornate

## ⚠️ Note Importanti

- I dati strutturati non garantiscono automaticamente i rich results
- Google decide quando e se mostrare i rich snippets
- Potrebbero volerci alcune settimane prima di vedere i risultati
- Mantieni i dati sempre aggiornati e accurati
