# Configurazione Form di Contatto

Il form di contatto utilizza Cloudflare Functions per inviare email in modo sicuro tramite il microservizio `sender.marf.cloud`.

## Struttura

```
functions/
  └── api/
      └── send-email.ts    # Cloudflare Function per l'invio email

src/
  └── components/
      └── Footer.astro     # Form di contatto con logica client-side

.dev.vars                  # Variabili d'ambiente per sviluppo locale (NON commitare!)
```

## Configurazione Locale

1. **Modifica il file `.dev.vars`** con la tua API key:
   ```
   SENDER_API_KEY=la_tua_api_key_vera
   ```

2. **Testa in locale** con Wrangler (CLI di Cloudflare):
   ```bash
   npm install -g wrangler
   npx wrangler pages dev dist
   ```

## Configurazione in Produzione su Cloudflare Pages

1. Vai su **Cloudflare Dashboard** → **Pages** → Il tuo progetto

2. Vai su **Settings** → **Environment variables**

3. Aggiungi la variabile:
   - **Variable name**: `SENDER_API_KEY`
   - **Value**: La tua API key per sender.marf.cloud
   - **Environment**: Production (e Preview se necessario)

4. Salva e rideploy il sito

## Come Funziona

### Lato Client (Footer.astro)
1. L'utente compila il form con: nome, email, telefono, numero ospiti (opzionale), data/ora (opzionali)
2. Il form valida i campi obbligatori (HTML5 validation)
3. Al submit, JavaScript invia i dati a `/api/send-email` (Cloudflare Function)
4. Mostra un messaggio di successo/errore all'utente

### Lato Server (send-email.ts)
1. Riceve i dati dal form
2. Valida i dati (campi obbligatori, formato email)
3. Costruisce il body dell'email con tutti i dettagli
4. Chiama `sender.marf.cloud` con l'API key (protetta lato server)
5. Ritorna successo o errore al client

## Schema Email Inviata

Il microservizio si aspetta questo formato:
```typescript
{
  type: 'email',
  recipient: 'info@kodav.dev',
  subject: 'Nuova prenotazione - [Nome Cliente]',
  body: 'Dettagli della prenotazione...'
}
```

## Sicurezza

✅ **API key protetta** - Mai esposta al client, solo nella Cloudflare Function
✅ **Validazione input** - Sia lato client che server
✅ **CORS configurato** - Per permettere le richieste dal sito
✅ **Rate limiting** - Cloudflare fornisce protezione DDoS automatica

## Costi

Cloudflare Functions è **GRATUITO** per:
- Fino a 100,000 richieste al giorno
- Fino a 10ms CPU time per richiesta

Per un sito di ristorante, questo è più che sufficiente e **non ci sono costi aggiuntivi**.

## Test

Per testare il form in locale:

1. Assicurati di aver configurato `.dev.vars` con l'API key vera
2. Esegui il build di Astro: `npm run build`
3. Avvia Wrangler: `npx wrangler pages dev dist`
4. Apri il browser su `http://localhost:8788`
5. Compila e invia il form

## Troubleshooting

**Errore 500 - "Errore durante l'invio dell'email"**
- Verifica che l'API key sia corretta in Cloudflare Dashboard
- Controlla i logs in Cloudflare Dashboard → Pages → Functions

**Form non risponde**
- Apri la console del browser (F12) per vedere eventuali errori JavaScript
- Verifica che il path `/api/send-email` sia accessibile

**Email non arrivano**
- Controlla che il microservizio sender.marf.cloud sia operativo
- Verifica che l'API key abbia i permessi corretti
