import { f as createComponent, m as maybeRenderHead, r as renderTemplate, e as createAstro, l as renderScript, u as unescapeHTML, h as addAttribute, k as renderComponent, n as renderHead, o as renderSlot } from './astro/server_DrJEj2ga.mjs';
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

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$1 = createAstro("https://shawnpapsmedia.com");
const $$SEO = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SEO;
  const {
    title = "Shawn Papineau | Music Producer & Photographer | Creative Professional",
    description = "Shawn Papineau is a professional music producer and photographer based in [Your Location]. Specializing in atmospheric beats, moody photography, and creative direction. View portfolio and book sessions.",
    keywords = "music producer, photographer, creative director, atmospheric music, moody photography, professional photographer, music production, creative services, portfolio",
    image = "https://iiyjiikbtsckevydbcsj.supabase.co/storage/v1/object/public/portfolio-assets/Images/Portraits/PAPS2968.jpg",
    url = Astro2.url.href,
    type = "website",
    author = "Shawn Papineau",
    publishedTime,
    modifiedTime,
    section,
    tags = ["music producer", "photographer", "creative director"],
    canonical,
    noindex = false,
    nofollow = false
  } = Astro2.props;
  const siteName = "Shawn Papineau";
  const twitterHandle = "@shawnpapineau";
  const siteUrl = "https://shawnpapsmedia.com";
  const canonicalUrl = canonical || url;
  const robots = [];
  if (noindex) robots.push("noindex");
  if (nofollow) robots.push("nofollow");
  if (robots.length === 0) robots.push("index", "follow");
  const robotsContent = robots.join(", ");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shawn Papineau",
    alternateName: "Shawn Paps",
    jobTitle: "Music Producer & Photographer",
    description,
    url: siteUrl,
    image,
    sameAs: [
      "https://instagram.com/shawnpapsmusic",
      // Replace with actual social media URLs
      "https://x.com/shawnpapsmusic",
      "https://linkedin.com/in/shawn-papineau",
      "https://spotify.com/artist/shawnpaps"
    ],
    knowsAbout: [
      "Music Production",
      "Photography",
      "Creative Direction",
      "Atmospheric Music",
      "Portrait Photography",
      "Lifestyle Photography",
      "Music Photography",
      "Music Production",
      "Music Composition",
      "Music Arrangement",
      "Music Mixing",
      "Music Mastering",
      "Brand Identity"
    ],
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "Music Producer",
        description: "Creating atmospheric beats and sonic landscapes"
      },
      {
        "@type": "Occupation",
        name: "Photographer",
        description: "Capturing raw emotion through moody, warm-toned photography"
      }
    ],
    worksFor: {
      "@type": "Organization",
      name: "SPAP Technology Solutions LLC",
      url: siteUrl
    }
  };
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "SPAP Technology Solutions LLC",
    description,
    url: siteUrl,
    telephone: "+1-XXX-XXX-XXXX",
    // Replace with actual phone
    email: "spapineau@spaptechnology.com",
    // Replace with actual email
    address: {
      "@type": "PostalAddress",
      streetAddress: "7901 4th Street N, Suite 300",
      // Replace with actual address
      addressLocality: "St. Petersburg",
      addressRegion: "FL",
      postalCode: "33702",
      addressCountry: "US"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "27.7672",
      // Replace with actual coordinates
      longitude: "-82.6617"
    },
    openingHours: "Mo-Fr 09:00-20:00",
    priceRange: "$$",
    image,
    sameAs: [
      "https://instagram.com/shawnpapsmusic",
      "https://x.com/shawnpapsmusic",
      "https://linkedin.com/in/shawn-papineau",
      "https://spotify.com/artist/shawnpaps"
    ]
  };
  return renderTemplate(_a$1 || (_a$1 = __template$1(["<!-- Primary Meta Tags --><title>", '</title><meta name="title"', '><meta name="description"', '><meta name="keywords"', '><meta name="author"', '><meta name="robots"', '><link rel="canonical"', '><!-- Open Graph / Facebook --><meta property="og:type"', '><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:site_name"', '><meta property="og:locale" content="en_US"><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><meta property="twitter:site"', '><meta property="twitter:creator"', '><!-- Additional Meta Tags --><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="theme-color" content="#f27522"><meta name="msapplication-TileColor" content="#f27522"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><meta name="apple-mobile-web-app-title"', "><!-- Article specific meta tags -->", "", "", "", "", '<!-- Preconnect to external domains for performance --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="preconnect" href="https://iiyjiikbtsckevydbcsj.supabase.co"><!-- DNS Prefetch for performance --><link rel="dns-prefetch" href="//fonts.googleapis.com"><link rel="dns-prefetch" href="//iiyjiikbtsckevydbcsj.supabase.co"><!-- Structured Data --><script type="application/ld+json">', '<\/script><script type="application/ld+json">', "<\/script><!-- Additional SEO Scripts -->", ""])), title, addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(keywords, "content"), addAttribute(author, "content"), addAttribute(robotsContent, "content"), addAttribute(canonicalUrl, "href"), addAttribute(type, "content"), addAttribute(url, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(image, "content"), addAttribute(siteName, "content"), addAttribute(url, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(image, "content"), addAttribute(twitterHandle, "content"), addAttribute(twitterHandle, "content"), addAttribute(siteName, "content"), type === "article" && publishedTime && renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime, "content")}>`, type === "article" && modifiedTime && renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime, "content")}>`, type === "article" && author && renderTemplate`<meta property="article:author"${addAttribute(author, "content")}>`, type === "article" && section && renderTemplate`<meta property="article:section"${addAttribute(section, "content")}>`, type === "article" && tags && tags.length > 0 && tags.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`), unescapeHTML(JSON.stringify(structuredData)), unescapeHTML(JSON.stringify(localBusinessSchema)), renderScript($$result, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/astro/SEO.astro?astro&type=script&index=0&lang.ts"));
}, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/astro/SEO.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$GoogleAnalytics = createComponent(($$result, $$props, $$slots) => {
  const GA_MEASUREMENT_ID = "G-K2Q1L3E4DB";
  return renderTemplate(_a || (_a = __template(["<!-- Google tag (gtag.js) --><script async", "><\/script> ", " <!-- Google Tag Manager -->", " <!-- Google Tag Manager (noscript) -->", '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K2Q1L3E4DB" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>'])), addAttribute(`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`, "src"), renderScript($$result, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/astro/GoogleAnalytics.astro?astro&type=script&index=0&lang.ts"), renderScript($$result, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/astro/GoogleAnalytics.astro?astro&type=script&index=1&lang.ts"), maybeRenderHead());
}, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/astro/GoogleAnalytics.astro", void 0);

const $$PerformanceOptimizer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Preload critical resources --><link rel="preload" href="/favicon.svg" as="image" type="image/svg+xml"><link rel="preload" href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" as="style"><!-- DNS Prefetch for external domains --><link rel="dns-prefetch" href="//fonts.googleapis.com"><link rel="dns-prefetch" href="//fonts.gstatic.com"><link rel="dns-prefetch" href="//iiyjiikbtsckevydbcsj.supabase.co"><link rel="dns-prefetch" href="//photo.shawnpaps.dev"><!-- Resource Hints --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="preconnect" href="https://iiyjiikbtsckevydbcsj.supabase.co"><link rel="preconnect" href="https://photo.shawnpaps.dev"><!-- Performance monitoring script -->${renderScript($$result, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/astro/PerformanceOptimizer.astro?astro&type=script&index=0&lang.ts")}<!-- Critical CSS inline -->`;
}, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/astro/PerformanceOptimizer.astro", void 0);

const $$Astro = createAstro("https://shawnpapsmedia.com");
const $$RootLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$RootLayout;
  const {
    title = "Shawn Papineau | Music Producer & Photographer",
    description,
    keywords,
    image,
    url,
    type,
    author,
    publishedTime,
    modifiedTime,
    section,
    tags,
    canonical,
    noindex,
    nofollow
  } = Astro2.props;
  return renderTemplate`<html lang="en" class="scroll-smooth" data-astro-cid-mdysn4oi> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="manifest" href="/manifest.json"><meta name="generator" content="Astro">${renderComponent($$result, "SEO", $$SEO, { "title": title, "description": description, "keywords": keywords, "image": image, "url": url, "type": type, "author": author, "publishedTime": publishedTime, "modifiedTime": modifiedTime, "section": section, "tags": tags, "canonical": canonical, "noindex": noindex, "nofollow": nofollow, "data-astro-cid-mdysn4oi": true })}<!-- Google Analytics -->${renderComponent($$result, "GoogleAnalytics", $$GoogleAnalytics, { "data-astro-cid-mdysn4oi": true })}<!-- Performance Optimizer -->${renderComponent($$result, "PerformanceOptimizer", $$PerformanceOptimizer, { "data-astro-cid-mdysn4oi": true })}<!-- Google Fonts - Edgy Typefaces --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-moody-900 text-moody-100 font-body antialiased overflow-x-hidden" data-astro-cid-mdysn4oi> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-mdysn4oi": true })} <!-- Gradient Background --> <div class="fixed inset-0 bg-gradient-to-br from-moody-900 via-moody-800 to-warm-900/20 pointer-events-none" data-astro-cid-mdysn4oi></div> <!-- Animated Background Elements --> <div class="fixed inset-0 overflow-hidden pointer-events-none" data-astro-cid-mdysn4oi> <div class="absolute top-20 left-10 w-72 h-72 bg-warm-500/10 rounded-full blur-3xl animate-float" data-astro-cid-mdysn4oi></div> <div class="absolute bottom-20 right-10 w-96 h-96 bg-warm-600/5 rounded-full blur-3xl animate-float" style="animation-delay: -3s;" data-astro-cid-mdysn4oi></div> <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-warm-400/5 rounded-full blur-3xl animate-pulse-slow" data-astro-cid-mdysn4oi></div> </div> <!-- Main Content --> <div class="relative z-10" data-astro-cid-mdysn4oi> ${renderSlot($$result, $$slots["default"])} </div> <footer class="py-8 px-4 sm:px-6 lg:px-8 border-t border-warm-500/20 z-30" data-astro-cid-mdysn4oi> <div class="max-w-7xl mx-auto text-center" data-astro-cid-mdysn4oi> <p class="font-body text-moody-400" data-astro-cid-mdysn4oi>
© 2024 Shawn Papineau. Crafted with passion and precision.
</p> </div> </footer> <!-- Custom Scrollbar -->  </body> </html>`;
}, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/layouts/RootLayout.astro", void 0);

export { $$RootLayout as $ };
