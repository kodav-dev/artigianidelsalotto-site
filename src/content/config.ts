import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('La Corte di Laura'),
    image: image().optional(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['it', 'en']).default('it'),
    translationId: z.string().optional(),
  }),
});

export const collections = { blog };
