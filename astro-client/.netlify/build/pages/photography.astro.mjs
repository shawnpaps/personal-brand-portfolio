import { e as createComponent, l as renderScript, m as maybeRenderHead, r as renderTemplate, k as renderComponent } from '../chunks/astro/server_DCM2VGeU.mjs';
import { $ as $$RootLayout } from '../chunks/RootLayout_CR6NdKcT.mjs';
export { renderers } from '../renderers.mjs';

const $$PicTimeEmbed = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderScript($$result, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/astro/PicTimeEmbed.astro?astro&type=script&index=0&lang.ts")} ${maybeRenderHead()}<iframe frameborder="0" id="pictimeIntegration" src="https://photo.shawnpaps.dev/client?headless=true" style="width:100%;height:100%"></iframe>`;
}, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/astro/PicTimeEmbed.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "RootLayout", $$RootLayout, {}, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", "<section> ", " </section> <section> ", '<template data-pt-type="blog" data-pt-slideshowid="6865a6f71b602b072058df74"></template><script src="https://photo.shawnpaps.dev/-studiophotoshoot/slideswebcomponentembed.js/6865a6f71b602b072058df74?features=lightbox,pinterest&filtertags=" type="text/javascript" data-pt-scriptslideshowid="6865a6f71b602b072058df74"><\/script> </section> '])), maybeRenderHead(), renderComponent($$result2, "PicTimeEmbed", $$PicTimeEmbed, {}), renderScript($$result2, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/pages/photography/index.astro?astro&type=script&index=0&lang.ts")) })}`;
}, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/pages/photography/index.astro", void 0);

const $$file = "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/pages/photography/index.astro";
const $$url = "/photography";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
