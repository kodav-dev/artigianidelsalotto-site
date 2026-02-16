import { translations, type Locale } from './translations';

const SLUG_MAP: Record<string, { it: string; en: string }> = {
  '/our-story': { it: '/la-nostra-storia', en: '/our-story' },
  '/contact': { it: '/contatti', en: '/contact' },
  '/blog-di-laura': { it: '/blog-di-laura', en: '/lauras-blog' },
};

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en') return 'en';
  return 'it';
}

export function useTranslations(lang: Locale) {
  return function t(key: string) {
    const keys = key.split('.');
    let value: any = translations[lang];

    for (const k of keys) {
      value = value?.[k];
    }

    return value !== undefined ? value : key;
  };
}

export function getLocalizedPath(path: string, locale: Locale): string {
  // Ensure the path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // Find if any part of the path matches SLUG_MAP (from longest to shortest)
  let bestMatchKey = '';
  let remainingPath = '';

  const sortedKeys = Object.keys(SLUG_MAP).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (cleanPath === key || cleanPath.startsWith(key + '/')) {
      bestMatchKey = key;
      remainingPath = cleanPath.slice(key.length);
      break;
    }
  }

  const mappedBase = bestMatchKey ? SLUG_MAP[bestMatchKey][locale] : cleanPath;
  const finalPath = mappedBase + remainingPath;
  
  // Ensure it ends with / (trailingSlash: 'always') unless it has an extension
  const normalizedPath = finalPath.endsWith('/') || finalPath.includes('.') ? finalPath : `${finalPath}/`;

  if (locale === 'it') {
    return normalizedPath;
  }
  // For English, add /en prefix
  return `/en${normalizedPath === '/' ? '/' : normalizedPath}`;
}

/**
 * Translates a given URL to a different locale.
 */
export function translatePath(pathname: string, targetLocale: Locale): string {
  const isEn = pathname.startsWith('/en');
  const cleanPathWithTrailing = isEn ? (pathname.replace(/^\/en/, '') || '/') : pathname;
  const cleanPath = (cleanPathWithTrailing.endsWith('/') && cleanPathWithTrailing !== '/')
    ? cleanPathWithTrailing.slice(0, -1)
    : cleanPathWithTrailing;

  // Find the canonical key from the current path
  let canonicalKey = cleanPath;
  
  // Check if any mapping's locale value starts our clean path
  for (const [key, mapping] of Object.entries(SLUG_MAP)) {
    if (cleanPath === mapping.it || cleanPath.startsWith(mapping.it + '/')) {
      canonicalKey = key + cleanPath.slice(mapping.it.length);
      break;
    }
    if (cleanPath === mapping.en || cleanPath.startsWith(mapping.en + '/')) {
      canonicalKey = key + cleanPath.slice(mapping.en.length);
      break;
    }
  }

  return getLocalizedPath(canonicalKey, targetLocale);
}
