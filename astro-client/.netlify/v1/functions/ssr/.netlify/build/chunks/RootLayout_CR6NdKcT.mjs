import { e as createComponent, m as maybeRenderHead, r as renderTemplate, f as createAstro, n as renderHead, k as renderComponent, o as renderSlot } from './astro/server_DCM2VGeU.mjs';
/* empty css                           */

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header> <nav class="absolute top-0 left-0 right-0 z-50 bg-moody-900/80 backdrop-blur-md border-b border-warm-500/20"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex justify-between items-center h-16"> <!-- Logo --> <a href="/" class="flex items-center"> <h1 class="font-display text-2xl font-bold text-warm-400 tracking-wider">
SP
</h1> </a> <!-- Navigation Links --> <div class="hidden md:flex items-center space-x-8"> <!-- hidden for now --> <!-- <a
						href="/work"
						class="font-heading text-moody-300 hover:text-warm-400 transition-colors duration-300"
						>WORK</a
					> --> <a href="/music" class="font-heading text-moody-300 hover:text-warm-400 transition-colors duration-300">MUSIC</a> <a href="/photography" class="font-heading text-moody-300 hover:text-warm-400 transition-colors duration-300">PHOTOGRAPHY</a> <a href="/contact" class="font-heading text-moody-300 hover:text-warm-400 transition-colors duration-300">CONTACT</a> </div> <!-- Mobile Menu Button --> <div class="md:hidden"> <button class="text-moody-300 hover:text-warm-400"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> </button> </div> </div> </div> </nav> </header>`;
}, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/astro/Header.astro", void 0);

const $$Astro = createAstro();
const $$RootLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$RootLayout;
  const { title = "Shawn Papineau | Music Producer & Photographer" } = Astro2.props;
  return renderTemplate`<html lang="en" class="scroll-smooth" data-astro-cid-mdysn4oi> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator" content="Astro"><title>${title}</title><!-- Google Fonts - Edgy Typefaces --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-moody-900 text-moody-100 font-body antialiased overflow-x-hidden" data-astro-cid-mdysn4oi> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-mdysn4oi": true })} <!-- Gradient Background --> <div class="fixed inset-0 bg-gradient-to-br from-moody-900 via-moody-800 to-warm-900/20 pointer-events-none" data-astro-cid-mdysn4oi></div> <!-- Animated Background Elements --> <div class="fixed inset-0 overflow-hidden pointer-events-none" data-astro-cid-mdysn4oi> <div class="absolute top-20 left-10 w-72 h-72 bg-warm-500/10 rounded-full blur-3xl animate-float" data-astro-cid-mdysn4oi></div> <div class="absolute bottom-20 right-10 w-96 h-96 bg-warm-600/5 rounded-full blur-3xl animate-float" style="animation-delay: -3s;" data-astro-cid-mdysn4oi></div> <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-warm-400/5 rounded-full blur-3xl animate-pulse-slow" data-astro-cid-mdysn4oi></div> </div> <!-- Main Content --> <div class="relative z-10" data-astro-cid-mdysn4oi> ${renderSlot($$result, $$slots["default"])} </div> <footer class="py-8 px-4 sm:px-6 lg:px-8 border-t border-warm-500/20 z-30" data-astro-cid-mdysn4oi> <div class="max-w-7xl mx-auto text-center" data-astro-cid-mdysn4oi> <p class="font-body text-moody-400" data-astro-cid-mdysn4oi>
© 2024 Shawn Papineau. Crafted with passion and precision.
</p> </div> </footer> <!-- Custom Scrollbar -->  </body> </html>`;
}, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/layouts/RootLayout.astro", void 0);

export { $$RootLayout as $ };
