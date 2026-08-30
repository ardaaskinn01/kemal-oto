import { MetadataRoute } from 'next';
import { getProducts } from './lib/actions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.onlinehizliparca.com';

  // Static routes
  const staticRoutes = [
    '',
    '/shop',
    '/shop/categories',
    '/about',
    '/contact',
    '/policies/privacy',
    '/policies/terms',
    '/policies/returns',
    '/policies/warranty',
    '/policies/distance-sales',
    '/policies/kvkk',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic product routes
  try {
    const products = await getProducts();
    const productRoutes = products.map((product) => ({
      url: `${baseUrl}/shop/products/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

    return [...staticRoutes, ...productRoutes];
  } catch (e) {
    return staticRoutes;
  }
}
