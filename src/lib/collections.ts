import { directus } from "./directus";
import { readItems } from "@directus/sdk";

export interface Category {
  id: string;
  slug: string;
  name: { it: string; en: string };
  image: string; // URL to the image
}

export interface Product {
  id: string;
  slug: string;
  category: string;
  name: { it: string; en: string };
  heroTitle: { it: string; en: string };
  heroSubtitle: { it: string; en: string };
  description: { it: string; en: string };
  heroImage: string; // URL to the image
  detailImages: string[]; // Array of strings (URLs)
}

const DIRECTUS_URL = import.meta.env.DIRECTUS_URL || process.env.DIRECTUS_URL || "";
const DIRECTUS_TOKEN = import.meta.env.DIRECTUS_TOKEN || process.env.DIRECTUS_TOKEN || "";

function getImageUrl(imageId: string | null): string {
  if (!imageId) return "";
  // Ensure DIRECTUS_URL doesn't have a trailing slash for consistent joining
  const baseUrl = DIRECTUS_URL.endsWith("/") ? DIRECTUS_URL.slice(0, -1) : DIRECTUS_URL;
  let url = `${baseUrl}/assets/${imageId}`;
  
  // If not using Public access, we must append the token to the URL for the browser to load it
  if (DIRECTUS_TOKEN) {
    url += `?access_token=${DIRECTUS_TOKEN}`;
  }
  
  return url;
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await directus.request(
      readItems("categories", {
        fields: ["id", "slug", "image", { translations: ["languages_code", "name"] }],
      })
    );

    return response.map((item: any, index: number) => {
      const it = item.translations?.find((t: any) => t.languages_code === "it-IT")?.name || item.name || "";
      const en = item.translations?.find((t: any) => t.languages_code === "en-US")?.name || it;

      const imageUrl = getImageUrl(item.image);
      if (index === 0) console.log(`[Directus] First category image URL: ${imageUrl}`);

      return {
        id: item.id,
        slug: item.slug,
        name: { it, en },
        image: imageUrl,
      };
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug);
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    // First find the category ID by slug
    const category = await getCategoryBySlug(categorySlug);
    if (!category) return [];

    const response = await directus.request(
      readItems("products", {
        filter: {
          category: { _eq: category.id },
        },
        fields: [
          "id",
          "slug",
          "hero_image",
          { detail_images: ["directus_files_id"] },
          { translations: ["languages_code", "name", "hero_title", "hero_subtitle", "description"] },
        ],
      })
    );

    return response.map((item: any) => {
      const itTrans = item.translations.find((t: any) => t.languages_code === "it-IT") || {};
      const enTrans = item.translations.find((t: any) => t.languages_code === "en-US") || itTrans;

      return {
        id: item.id,
        slug: item.slug,
        category: categorySlug,
        name: { it: itTrans.name || "", en: enTrans.name || itTrans.name || "" },
        heroTitle: { it: itTrans.hero_title || "", en: enTrans.hero_title || itTrans.hero_title || "" },
        heroSubtitle: { it: itTrans.hero_subtitle || "", en: enTrans.hero_subtitle || itTrans.hero_subtitle || "" },
        description: { it: itTrans.description || "", en: enTrans.description || itTrans.description || "" },
        heroImage: getImageUrl(item.hero_image),
        detailImages: item.detail_images?.map((f: any) => getImageUrl(f.directus_files_id)) || [],
      };
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProduct(categorySlug: string, productSlug: string): Promise<Product | undefined> {
  const products = await getProductsByCategory(categorySlug);
  return products.find((p) => p.slug === productSlug);
}
