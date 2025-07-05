import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_DCM2VGeU.mjs';
import { $ as $$RootLayout } from '../chunks/RootLayout_CR6NdKcT.mjs';
import { $ as $$Contact } from '../chunks/Contact_CJvjmQD1.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const recentProjects = [
    {
      id: "project-1",
      title: "Atmospheric Soundscape Collection",
      category: "Music Production",
      description: "A series of experimental tracks exploring ambient textures and spatial audio design.",
      image: "https://iiyjiikbtsckevydbcsj.supabase.co/storage/v1/object/public/portfolio-assets/Images/Portraits/PAPS2968.jpg",
      year: "2024",
      readTime: "5 min read",
      excerpt: "How I created immersive soundscapes using modular synthesis and field recordings...",
      link: "/music/project-1"
    },
    {
      id: "project-2",
      title: "Brand Photography Series",
      category: "Photography",
      description: "Complete visual identity package for emerging tech startup.",
      image: "https://iiyjiikbtsckevydbcsj.supabase.co/storage/v1/object/public/portfolio-assets/Images/Portraits/PAPS2959.jpg",
      year: "2024",
      readTime: "8 min read",
      excerpt: "Behind the scenes of creating a cohesive brand story through strategic photography...",
      link: "/photography/project-1"
    },
    {
      id: "project-3",
      title: "Interactive Music Player",
      category: "Web Development",
      description: "Custom-built music player with real-time waveform visualization.",
      image: "https://iiyjiikbtsckevydbcsj.supabase.co/storage/v1/object/public/portfolio-assets/Images/Portraits/PAPS2968.jpg",
      year: "2024",
      readTime: "6 min read",
      excerpt: "Building an immersive audio experience using Web Audio API and Canvas...",
      link: "/work/project-3"
    }
  ];
  const categories = [
    {
      name: "Web Development",
      description: "Modern, responsive web applications built with cutting-edge technologies",
      projects: [
        {
          title: "Personal Portfolio",
          description: "A modern portfolio built with Astro and React",
          image: "/images/portfolio.jpg",
          tags: ["Astro", "React", "TailwindCSS"],
          link: "https://shawnpaps.dev"
        }
      ]
    },
    {
      name: "Music Production",
      description: "Original productions and sonic experiments",
      projects: [
        {
          title: "Original Productions",
          description: "Collection of electronic and experimental music",
          image: "/images/music.jpg",
          tags: ["Production", "Mixing", "Mastering"],
          link: "/music"
        }
      ]
    },
    {
      name: "Photography",
      description: "Visual storytelling through the lens",
      projects: [
        {
          title: "Studio Photography",
          description: "Professional brand and portrait photography",
          image: "/images/photography.jpg",
          tags: ["Portrait", "Brand", "Studio"],
          link: "/photography"
        }
      ]
    }
  ];
  return renderTemplate`${renderComponent($$result, "RootLayout", $$RootLayout, { "title": "Work - Shawn Papineau" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-gradient-to-br from-moody-900 via-moody-800 to-moody-900"> <!-- Hero Section --> <section class="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"> <div class="absolute inset-0 bg-gradient-to-br from-moody-900/50 to-moody-800/30"></div> <div class="absolute top-20 left-10 w-64 h-64 bg-warm-500/10 rounded-full blur-3xl"></div> <div class="absolute bottom-20 right-10 w-80 h-80 bg-warm-600/10 rounded-full blur-3xl"></div> <div class="max-w-7xl mx-auto relative z-10"> <div class="text-center mb-16"> <h1 class="font-display text-5xl md:text-7xl font-bold text-warm-400 mb-6 tracking-wider">
MY WORK
</h1> <div class="w-32 h-1 bg-gradient-to-r from-warm-500 to-warm-600 mx-auto mb-8"></div> <p class="font-body text-xl text-moody-400 max-w-3xl mx-auto leading-relaxed">
Explore my diverse portfolio spanning web development, music
						production, and photography. Each project represents a unique blend
						of technical expertise and creative vision.
</p> </div> </div> </section> <!-- Recent Projects Section --> <section class="py-20 px-4 sm:px-6 lg:px-8"> <div class="max-w-7xl mx-auto"> <!-- Section Header --> <div class="text-center mb-16"> <h2 class="font-display text-4xl md:text-5xl font-bold text-warm-400 mb-4 tracking-wider">
RECENT PROJECTS
</h2> <div class="w-24 h-1 bg-gradient-to-r from-warm-500 to-warm-600 mx-auto mb-8"></div> <p class="font-body text-xl text-moody-400 max-w-3xl mx-auto leading-relaxed">
Dive deep into my latest work with detailed case studies exploring the creative process, technical challenges, and final outcomes.
</p> </div> <!-- Projects Grid --> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> ${recentProjects.map((project) => renderTemplate`<article class="group bg-moody-800/30 backdrop-blur-sm border border-warm-500/20 rounded-2xl overflow-hidden hover:border-warm-400/40 transition-all duration-500 hover:transform hover:scale-105"> <!-- Project Image --> <div class="aspect-[4/3] relative overflow-hidden"> <img${addAttribute(project.image, "src")}${addAttribute(project.title, "alt")} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"> <div class="absolute inset-0 bg-gradient-to-t from-moody-900/80 via-moody-900/20 to-transparent"></div> <div class="absolute bottom-4 left-4 right-4"> <div class="flex items-center gap-3 mb-2"> <span class="text-xs font-medium bg-warm-500/20 text-warm-400 px-3 py-1 rounded-full"> ${project.category} </span> <span class="text-xs text-moody-400">${project.year}</span> </div> </div> </div> <!-- Project Content --> <div class="p-6"> <h3 class="font-display text-xl font-bold text-warm-400 mb-3 group-hover:text-warm-300 transition-colors"> ${project.title} </h3> <p class="text-moody-400 text-sm mb-4 leading-relaxed"> ${project.description} </p> <p class="text-moody-300 text-sm mb-6 italic">
"${project.excerpt}"
</p> <!-- Read More Button --> <a${addAttribute(project.link, "href")} class="inline-flex items-center gap-2 text-warm-400 hover:text-warm-300 font-heading font-semibold text-sm tracking-wider uppercase transition-colors group/btn"> <span>Read Case Study</span> <svg class="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </a> <div class="mt-4 pt-4 border-t border-warm-500/20"> <div class="flex items-center justify-between text-xs text-moody-400"> <span>${project.readTime}</span> <span>→ Full case study</span> </div> </div> </div> </article>`)} </div> <!-- View All Projects CTA --> <div class="text-center mt-16"> <p class="text-moody-400 mb-6">
Want to see more? Explore my complete portfolio across all categories.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <a href="/music" class="px-6 py-3 bg-gradient-to-r from-warm-500 to-warm-600 text-moody-900 font-heading font-semibold tracking-wider uppercase hover:from-warm-400 hover:to-warm-500 transition-all duration-300 transform hover:scale-105 rounded-xl">
View Music Portfolio
</a> <a href="/photography" class="px-6 py-3 bg-moody-800/50 border border-warm-500/20 text-warm-400 font-heading font-semibold tracking-wider uppercase hover:bg-warm-500/10 hover:border-warm-400 transition-all duration-300 transform hover:scale-105 rounded-xl">
View Photography
</a> </div> </div> </div> </section> <!-- Categories Section --> <section class="py-20 px-4 sm:px-6 lg:px-8"> <div class="max-w-7xl mx-auto"> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${categories.map((category) => renderTemplate`<div class="group relative bg-moody-800/30 backdrop-blur-sm border border-warm-500/20 rounded-2xl overflow-hidden hover:border-warm-400/40 transition-all duration-500"> <div class="p-8"> <h3 class="font-display text-2xl font-bold text-warm-400 mb-4"> ${category.name} </h3> <p class="text-moody-400 mb-6">${category.description}</p> <div class="space-y-6"> ${category.projects.map((project) => renderTemplate`<a${addAttribute(project.link, "href")} class="block group/project"> <div class="bg-moody-900/30 rounded-xl p-6 hover:bg-warm-500/10 transition-all duration-300"> <h4 class="font-heading text-xl font-semibold text-warm-400 mb-2"> ${project.title} </h4> <p class="text-moody-400 text-sm mb-4"> ${project.description} </p> <div class="flex flex-wrap gap-2"> ${project.tags.map((tag) => renderTemplate`<span class="text-xs font-medium bg-warm-500/20 text-warm-400 px-2 py-1 rounded-full"> ${tag} </span>`)} </div> </div> </a>`)} </div> </div> </div>`)} </div> </div> </section> <!-- Call to Action --> ${renderComponent($$result2, "Contact", $$Contact, {})} </main> ` })}`;
}, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/pages/work/index.astro", void 0);

const $$file = "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/pages/work/index.astro";
const $$url = "/work";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
