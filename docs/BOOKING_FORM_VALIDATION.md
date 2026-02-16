# Sistema di Prenotazione con Validazione Orari

Il form di prenotazione nel footer è stato aggiornato con validazione automatica degli orari di apertura.

## ✅ Funzionalità Implementate

### 1. Orari di Apertura

Gli orari sono configurati nel file [src/components/Footer.astro](src/components/Footer.astro):

```javascript
const OPENING_HOURS = {
  0: { open: true, times: [{ start: 12, end: 22 }] }, // Domenica: 12:00-22:00
  1: { open: false },                                   // Lunedì: Chiuso
  2: { open: false },                                   // Martedì: Chiuso
  3: { open: false },                                   // Mercoledì: Chiuso
  4: { open: true, times: [{ start: 19, end: 22 }] }, // Giovedì: 19:00-22:00
  5: { open: true, times: [{ start: 19, end: 22 }] }, // Venerdì: 19:00-22:00
  6: { open: true, times: [{ start: 19, end: 22 }] }, // Sabato: 19:00-22:00
};
```

### 2. Validazione in Tempo Reale

Il form valida:

- **Data minima**: Non è possibile prenotare per date passate
- **Giorni di chiusura**: Blocca le prenotazioni per lunedì, martedì e mercoledì
- **Orari validi**:
  - Domenica: 12:00-22:00
  - Giovedì, Venerdì, Sabato: 19:00-22:00

### 3. Messaggi di Errore

Il form mostra messaggi chiari all'utente:

- "Non puoi prenotare per una data passata"
- "Il ristorante è chiuso di [giorno]"
- "L'orario deve essere tra le 12:00-22:00" (domenica)
- "L'orario deve essere tra le 19:00-22:00" (gio-ven-sab)

### 4. UX Migliorata

- Campo data con `min` impostato alla data odierna
- Reset automatico dell'orario se si cambia una data non valida
- Feedback visivo immediato (messaggio rosso per errori)
- Prevenzione dell'invio se i dati non sono validi

## 🔄 Sincronizzazione con Dati Strutturati

Gli orari di apertura sono anche nei dati strutturati Schema.org nel file [src/components/StructuredData.astro](src/components/StructuredData.astro):

```json
{
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Sunday"],
      "opens": "12:00",
      "closes": "22:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Thursday", "Friday", "Saturday"],
      "opens": "19:00",
      "closes": "22:00"
    }
  ]
}
```

Questo migliora la SEO e consente a Google di mostrare gli orari nei risultati di ricerca.

## 🛠️ Modificare gli Orari

Se gli orari cambiano, devi aggiornare **DUE file**:

### 1. Footer.astro (riga ~160)
Aggiorna l'oggetto `OPENING_HOURS` per modificare la validazione del form.

### 2. StructuredData.astro (riga ~40)
Aggiorna `openingHoursSpecification` per i dati strutturati.

**IMPORTANTE**: Mantieni sempre sincronizzati questi due file!

## 📱 Test del Form

### Test Manuali da Fare

1. **Prova a selezionare un lunedì** → Deve mostrare errore
2. **Prova a selezionare una domenica alle 10:00** → Deve mostrare errore
3. **Prova a selezionare una domenica alle 13:00** → Deve funzionare
4. **Prova a selezionare un venerdì alle 20:00** → Deve funzionare
5. **Prova a selezionare una data passata** → Deve bloccare

### Verifica Dati Strutturati

Dopo il deploy, testa con:
- Google Rich Results Test: https://search.google.com/test/rich-results
- Cerca il ristorante su Google Maps e verifica che gli orari siano corretti

## 📧 Integrazione Email

Il form invia i dati all'endpoint `/api/send-email`. Assicurati che questo endpoint sia configurato correttamente per ricevere le prenotazioni.

I dati inviati includono:
```json
{
  "name": "Nome Cognome",
  "email": "user@example.com",
  "phone": "+39 123 456 7890",
  "guests": 4,
  "date": "2026-01-15",
  "time": "19:30"
}
```

## 🎯 Prossimi Miglioramenti Opzionali

- [ ] Aggiungere una conferma via SMS
- [ ] Integrare con un sistema di gestione tavoli
- [ ] Mostrare disponibilità in tempo reale
- [ ] Aggiungere reminder automatici
- [ ] Gestire le cancellazioni

## 📚 File Correlati

- [src/components/Footer.astro](src/components/Footer.astro) - Form di prenotazione
- [src/components/StructuredData.astro](src/components/StructuredData.astro) - Dati strutturati
- [STRUCTURED_DATA.md](STRUCTURED_DATA.md) - Documentazione dati strutturati
- [TESTING_STRUCTURED_DATA.md](TESTING_STRUCTURED_DATA.md) - Come testare i dati
