import type { APIRoute } from 'astro';
import { categories } from '../lib/categories';
import { LANGS, localizePath, type Lang } from '../lib/i18n';

type Route = {
  path: string;
  priority: string;
  changefreq: string;
  images?: string[];
};

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export const GET: APIRoute = ({ site }) => {
  const origin = site?.toString().replace(/\/$/, '') ?? 'https://hennatattooalbania.com';
  const today = new Date().toISOString().slice(0, 10);

  const baseRoutes: Route[] = [
    {
      path: '/',
      priority: '1.0',
      changefreq: 'weekly',
      images: ['/og-cover.jpg', ...categories.flatMap((c) => (c.image ? [c.image] : []))],
    },
    {
      path: '/contact',
      priority: '0.8',
      changefreq: 'monthly',
    },
    {
      path: '/studio',
      priority: '0.7',
      changefreq: 'monthly',
    },
    ...categories.map((c) => ({
      path: `/categories/${c.slug}`,
      priority: '0.9',
      changefreq: 'weekly',
      images: [
        ...(c.heroImage ? [c.heroImage] : []),
        ...(c.image ? [c.image] : []),
        ...c.gallery.slice(0, 15),
      ],
    })),
  ];

  const renderImage = (src: string) =>
    `    <image:image><image:loc>${escapeXml(origin + src)}</image:loc></image:image>`;

  const renderAlternates = (basePath: string) =>
    LANGS.map(
      (l) =>
        `    <xhtml:link rel="alternate" hreflang="${l}" href="${escapeXml(origin + localizePath(basePath, l))}" />`,
    ).join('\n') +
    `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(origin + localizePath(basePath, 'sq'))}" />`;

  const urls = baseRoutes
    .flatMap((r) =>
      LANGS.map((lang: Lang) => {
        const path = localizePath(r.path, lang);
        const imgs = (r.images ?? []).map(renderImage).join('\n');
        const alts = renderAlternates(r.path);
        return `  <url>
    <loc>${escapeXml(origin + path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
${alts}${imgs ? '\n' + imgs : ''}
  </url>`;
      }),
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
