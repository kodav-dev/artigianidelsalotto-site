/**
 * Astro Actions per gestire l'invio del form di prenotazione
 * Sostituisce la Cloudflare Function mantenendo la stessa logica
 */

import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

// Domini autorizzati per origin validation
const ALLOWED_ORIGINS = [
  'https://lacortedilaura.it',
  'https://www.lacortedilaura.it',
  'http://localhost:4321',
  'http://localhost:8788',
];

// Schema di validazione con Zod
const bookingSchema = z.object({
  name: z.string().min(1, 'Nome obbligatorio').max(100, 'Nome troppo lungo'),
  email: z.string().email('Formato email non valido').max(255, 'Email troppo lunga'),
  phone: z.string().min(1, 'Telefono obbligatorio').max(20, 'Telefono troppo lungo'),
  guests: z.number().int().min(1, 'Il numero di ospiti deve essere almeno 1').max(50, 'Numero ospiti non valido').optional(),
  date: z.string().max(10).optional(),
  time: z.string().max(5).optional(),
  // Honeypot field - se compilato è un bot
  website: z.string().max(0, 'Spam rilevato').optional(),
}).refine(
  (data) => {
    // Validazione: data e ora devono essere entrambi presenti o assenti
    if ((data.date && !data.time) || (!data.date && data.time)) {
      return false;
    }
    return true;
  },
  {
    message: 'Data e ora devono essere entrambi specificati',
  }
);

export const server = {
  sendBooking: defineAction({
    accept: 'form',
    input: bookingSchema,
    handler: async (input, context) => {
      try {
        // Validazione origine richiesta (protezione CORS)
        const origin = context.request.headers.get('origin');
        const referer = context.request.headers.get('referer');

        const isAllowedOrigin = origin
          ? ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed))
          : referer
          ? ALLOWED_ORIGINS.some(allowed => referer.startsWith(allowed))
          : false;

        if (!isAllowedOrigin) {
          console.warn('Richiesta da origine non autorizzata:', origin || referer);
          throw new Error('Origine non autorizzata');
        }

        // Validazione honeypot (anti-bot)
        if (input.website) {
          console.warn('Tentativo di spam rilevato tramite honeypot');
          throw new Error('Richiesta non valida');
        }

        // Recupera l'API key dalle variabili d'ambiente
        // Con l'adapter Cloudflare, le env vars sono in context.locals.runtime.env
        const apiKey = context.locals.runtime?.env?.SENDER_API_KEY || import.meta.env.SENDER_API_KEY;

        const apiUrl = context.locals.runtime?.env?.SENDER_URL|| import.meta.env.SENDER_URL;

        console.log('DEBUG - context.locals.runtime?.env:', context.locals.runtime?.env);
        console.log('DEBUG - import.meta.env.SENDER_API_KEY:', import.meta.env.SENDER_API_KEY);
        console.log('DEBUG - apiKey finale:', apiKey);

        if (!apiKey) {
          console.error('SENDER_API_KEY non configurata');
          throw new Error('Configurazione server non valida');
        }

        console.log('Form data ricevuto:', input);
        console.log('API Key presente:', !!apiKey);
        console.log('API Key length:', apiKey.length);
        console.log('API Key primi 10 caratteri:', apiKey.substring(0, 10));

        // Prepara il payload per il microservizio
        const payload = {
          type: 'email' as const,
          recipient: 'info@lacortedilaura.it',
          metadata: {
            restaurantName: 'La Corte di Laura',
            logoUrl: 'https://assets.marf.cloud/logos/lacortedilaura.webp',
            primaryColor: '#d9b130',
            managerName: 'Laura',
            subject: 'Prenotazione La Corte di Laura - ' + input.name, 
          },
          template: {
            name: 'reservation' as const,
            data: {
              customerName: input.name,
              customerEmail: input.email,
              customerPhone: input.phone,
              reservationDate: input.date || new Date().toISOString().split('T')[0],
              reservationTime: input.time || '12:00',
              numberOfPeople: input.guests || 1,
            },
          },
        };

        console.log('Chiamata a sender.marf.cloud con payload:', JSON.stringify(payload, null, 2));

        // Chiama il microservizio
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
          },
          body: JSON.stringify(payload),
        });

        console.log('Risposta dal microservizio:', response.status, response.statusText);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Errore dal microservizio:', response.status, errorText);
          throw new Error('Errore durante l\'invio dell\'email. Riprova più tardi.');
        }

        // Successo
        return {
          success: true,
          message: 'Richiesta inviata con successo!',
        };

      } catch (error) {
        console.error('Errore nella action:', error);

        // Astro Actions gestisce automaticamente gli errori
        throw error;
      }
    },
  }),
};
