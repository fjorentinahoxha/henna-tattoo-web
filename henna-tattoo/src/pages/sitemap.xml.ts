import type { APIRoute } from 'astro';
import { categories } from '../lib/categories';

export const GET: APIRoute = ({ site }) => {
  const origin = site?.toString().replace(/\/$/, '') ?? 'https://hennatattooalbania.com';
  const today = new Date().toISOString().slice(0, 10);

  const routes: Array<{ path: string; priority: string; changefreq: string }> = [
    { path: '/',        priority: '1.0', changefreq: 'monthly' },
    { path: '/contact', priority: '0.8', changefreq: 'monthly' },
    ...categories.map((c) => ({
      path: `/categories/${c.slug}`,
      priority: '0.9',
      changefreq: 'monthly',
    })),
  ];

  const urls = routes
    .map(
      (r) => `  <url>
    <loc>${origin}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
