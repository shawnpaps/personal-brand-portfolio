import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
	if (!site) {
		throw new Error('site is not defined in astro.config.mjs');
	}

	const pages = [
		{
			url: '/',
			lastmod: new Date().toISOString(),
			changefreq: 'weekly',
			priority: 1.0,
		},
		{
			url: '/music/',
			lastmod: new Date().toISOString(),
			changefreq: 'weekly',
			priority: 0.9,
		},
		{
			url: '/photography/',
			lastmod: new Date().toISOString(),
			changefreq: 'weekly',
			priority: 0.9,
		},
		{
			url: '/work/',
			lastmod: new Date().toISOString(),
			changefreq: 'monthly',
			priority: 0.8,
		},
		{
			url: '/contact/',
			lastmod: new Date().toISOString(),
			changefreq: 'monthly',
			priority: 0.7,
		},
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(page) => `  <url>
    <loc>${site}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
		},
	});
};
