import { e as createAstro, f as createComponent, r as renderTemplate, u as unescapeHTML, h as addAttribute, m as maybeRenderHead } from './astro/server_DrJEj2ga.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://shawnpapsmedia.com");
const $$Breadcrumbs = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Breadcrumbs;
  const { items } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["", '<nav class="flex" aria-label="Breadcrumb"> <ol class="inline-flex items-center space-x-1 md:space-x-3"> ', ' </ol> </nav> <!-- Structured Data for Breadcrumbs --> <script type="application/ld+json">', "<\/script>"])), maybeRenderHead(), items.map((item, index) => renderTemplate`<li class="inline-flex items-center"> ${index > 0 && renderTemplate`<svg class="w-6 h-6 text-moody-400 mx-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path> </svg>`} ${item.current ? renderTemplate`<span class="text-warm-400 font-medium" aria-current="page"> ${item.label} </span>` : item.url ? renderTemplate`<a${addAttribute(item.url, "href")} class="text-moody-400 hover:text-warm-400 transition-colors duration-200"> ${item.label} </a>` : renderTemplate`<span class="text-moody-400">${item.label}</span>`} </li>`), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...item.url && { item: item.url }
    }))
  })));
}, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/astro/Breadcrumbs.astro", void 0);

export { $$Breadcrumbs as $ };
