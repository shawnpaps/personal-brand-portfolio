export { renderers } from '../renderers.mjs';

const GET = async ({ site }) => {
  if (!site) {
    throw new Error("site is not defined in astro.config.mjs");
  }
  const pages = [
    {
      url: "/",
      lastmod: (/* @__PURE__ */ new Date()).toISOString(),
      changefreq: "weekly",
      priority: 1
    },
    {
      url: "/music/",
      lastmod: (/* @__PURE__ */ new Date()).toISOString(),
      changefreq: "weekly",
      priority: 0.9
    },
    {
      url: "/photography/",
      lastmod: (/* @__PURE__ */ new Date()).toISOString(),
      changefreq: "weekly",
      priority: 0.9
    },
    {
      url: "/work/",
      lastmod: (/* @__PURE__ */ new Date()).toISOString(),
      changefreq: "monthly",
      priority: 0.8
    },
    {
      url: "/contact/",
      lastmod: (/* @__PURE__ */ new Date()).toISOString(),
      changefreq: "monthly",
      priority: 0.7
    }
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(
    (page) => `  <url>
    <loc>${site}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  ).join("\n")}
</urlset>`;
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
