import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';

/**
 * This file creates a sitemap (sitemap.xml) for the application. Learn more about sitemaps in Next.js here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * Be sure to update the `changeFrequency` and `priority` values to match your application's content.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const sitemap: MetadataRoute.Sitemap = [];
  const domain: string = headersList.get('host') as string;
  sitemap.push({
    url: domain as string,
    lastModified: new Date(),
    priority: 1,
    changeFrequency: 'monthly',
  });

  return sitemap;
}
