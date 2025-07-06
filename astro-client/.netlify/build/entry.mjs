import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_LDHyJDUt.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/apple-token.astro.mjs');
const _page2 = () => import('./pages/api/contact.astro.mjs');
const _page3 = () => import('./pages/api/fetch-music.astro.mjs');
const _page4 = () => import('./pages/api/test-notion.astro.mjs');
const _page5 = () => import('./pages/api/testimonials.astro.mjs');
const _page6 = () => import('./pages/contact.astro.mjs');
const _page7 = () => import('./pages/music/_id_.astro.mjs');
const _page8 = () => import('./pages/music.astro.mjs');
const _page9 = () => import('./pages/photography.astro.mjs');
const _page10 = () => import('./pages/sitemap.xml.astro.mjs');
const _page11 = () => import('./pages/work.astro.mjs');
const _page12 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.10.2_@netlify+blobs@8.2.0_@types+node@24.0.10_jiti@2.4.2_lightningcss@1.30.1_rollup@4.44.1_typescript@5.8.3/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/apple-token.ts", _page1],
    ["src/pages/api/contact.ts", _page2],
    ["src/pages/api/fetch-music.ts", _page3],
    ["src/pages/api/test-notion.ts", _page4],
    ["src/pages/api/testimonials.ts", _page5],
    ["src/pages/contact.astro", _page6],
    ["src/pages/music/[id].astro", _page7],
    ["src/pages/music/index.astro", _page8],
    ["src/pages/photography/index.astro", _page9],
    ["src/pages/sitemap.xml.ts", _page10],
    ["src/pages/work/index.astro", _page11],
    ["src/pages/index.astro", _page12]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "df1387fd-7579-4f23-b56a-3820a84f5b30"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
