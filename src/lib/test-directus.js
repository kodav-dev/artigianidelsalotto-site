import { createDirectus, rest, staticToken, readItems } from '@directus/sdk';

// This script can be run with:
// op run --env-file=.env.1password -- node src/lib/test-directus.js

const url = process.env.DIRECTUS_URL;
const token = process.env.DIRECTUS_TOKEN;

console.log('--- Directus Connection Test ---');
console.log('URL:', url ? 'Defined' : 'UNDEFINED');
console.log('Token:', token ? 'Defined' : 'UNDEFINED');

if (!url || url.startsWith('op://')) {
  console.error('ERROR: DIRECTUS_URL is missing or not resolved by 1Password CLI.');
  process.exit(1);
}

const directus = createDirectus(url)
  .with(rest())
  .with(staticToken(token || ''));

async function test() {
  try {
    console.log('Fetching categories...');
    const categories = await directus.request(readItems('categories', { fields: ['id', 'slug', 'image'] }));
    console.log('SUCCESS! Categories found:', categories.length);
    
    if (categories.length > 0 && categories[0].image) {
      const imageId = categories[0].image;
      const baseUrl = url.endsWith("/") ? url.slice(0, -1) : url;
      let assetUrl = `${baseUrl}/assets/${imageId}`;
      if (token) {
        assetUrl += `?access_token=${token}`;
      }
      console.log('\nTesting Asset URL:', assetUrl);
      
      try {
        const assetResponse = await fetch(assetUrl, { method: 'HEAD' });
        console.log('Asset Status:', assetResponse.status, assetResponse.statusText);
        if (assetResponse.status === 403) {
          console.warn('CAUTION: 403 Forbidden. The role associated with your token lacks Read permission on "directus_files".');
        } else if (assetResponse.status === 200) {
          console.log('GREAT! The image is accessible with the token.');
        }
      } catch (assetErr) {
        console.error('Failed to connect to asset URL:', assetErr.message);
      }
    }

    console.log('\nCategory Data Sample:');
    console.log(JSON.stringify(categories.slice(0, 2), null, 2));

    console.log('\nFetching products...');
    const products = await directus.request(readItems('products', { fields: ['id', 'slug'] }));
    console.log('SUCCESS! Products found:', products.length);
  } catch (error) {
    console.error('FAILED!');
    if (error.errors && error.errors.length > 0) {
      console.error('Directus Errors:', JSON.stringify(error.errors, null, 2));
    } else if (error.message) {
      console.error('Error Message:', error.message);
    }
    
    if (error.response) {
      console.error('Status:', error.response.status);
    }
  }
}

test();
