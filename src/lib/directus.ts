import { createDirectus, rest, staticToken } from '@directus/sdk';

const url = import.meta.env.DIRECTUS_URL || process.env.DIRECTUS_URL;
const token = import.meta.env.DIRECTUS_TOKEN || process.env.DIRECTUS_TOKEN;

const isValidUrl = (urlString: string | undefined): boolean => {
  if (!urlString || urlString.startsWith('op://')) return false;
  try {
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
};

if (!isValidUrl(url)) {
  console.warn('DIRECTUS_URL is not a valid URL or is a 1Password placeholder (op://). Directus integration will not work until secrets are resolved.');
}

export const directus = createDirectus(isValidUrl(url) ? url! : 'https://placeholder.directus.app')
  .with(rest())
  .with(staticToken(token || ''));
