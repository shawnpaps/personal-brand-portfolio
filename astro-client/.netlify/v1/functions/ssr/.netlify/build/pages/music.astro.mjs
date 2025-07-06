import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DonqQ8u2.mjs';
import { $ as $$RootLayout } from '../chunks/RootLayout_ACEhfWvR.mjs';
import { getProducerPlaylist } from '../chunks/appleMusic_D5Nlofx2.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { motion } from 'motion/react';
import { $ as $$Breadcrumbs } from '../chunks/Breadcrumbs_C2R6MLDn.mjs';
export { renderers } from '../renderers.mjs';

const MusicPortfolio = ({ tracks }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [audio, setAudio] = useState(null);
  const handlePlayPreview = async (track) => {
    const previewUrl = track.attributes.previews?.[0]?.url;
    if (!previewUrl) return;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    if (currentlyPlaying === track.id) {
      setCurrentlyPlaying(null);
      setAudio(null);
      return;
    }
    const newAudio = new Audio(previewUrl);
    newAudio.volume = 0.7;
    newAudio.addEventListener("ended", () => {
      setCurrentlyPlaying(null);
      setAudio(null);
    });
    try {
      await newAudio.play();
      setCurrentlyPlaying(track.id);
      setAudio(newAudio);
    } catch (error) {
      console.error("Error playing preview:", error);
    }
  };
  const formatReleaseDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long"
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl md:text-5xl font-bold text-warm-400 mb-6 tracking-wider", children: "DEFINE YOUR SONIC IDENTITY" }),
      /* @__PURE__ */ jsx("p", { className: "font-body text-xl text-moody-400 max-w-3xl mx-auto leading-relaxed", children: "See & hear how I've helped artists & brands just like you bring their vision to life." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: tracks.map((track, index) => /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: index * 0.1, duration: 0.6 },
        className: "group",
        children: /* @__PURE__ */ jsxs("div", { className: "relative bg-moody-800/30 backdrop-blur-sm border border-warm-500/20 rounded-2xl overflow-hidden hover:border-warm-400/40 transition-all duration-500", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative aspect-square overflow-hidden", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: track.attributes.artwork.url.replace("{w}", "600").replace("{h}", "600"),
                alt: `${track.attributes.name} by ${track.attributes.artistName}`,
                className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-moody-900/80 via-moody-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handlePlayPreview(track),
                className: "absolute inset-0 flex items-center justify-center text-warm-400 hover:text-warm-300 transition-colors duration-300",
                children: currentlyPlaying === track.id ? /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    animate: { rotate: 360 },
                    transition: {
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear"
                    },
                    className: "w-16 h-16 bg-moody-900/80 rounded-full flex items-center justify-center border-2 border-warm-400",
                    children: /* @__PURE__ */ jsx(
                      "svg",
                      {
                        className: "w-8 h-8",
                        fill: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" })
                      }
                    )
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-moody-900/80 rounded-full flex items-center justify-center border-2 border-warm-400 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "w-8 h-8 ml-1",
                    fill: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7z" })
                  }
                ) })
              }
            ) }),
            track.attributes.previews?.[0]?.url && /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-3 bg-warm-500/90 text-moody-900 text-xs font-heading font-semibold px-2 py-1 rounded-full", children: "PREVIEW" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-heading text-xl font-bold text-warm-400 tracking-wider line-clamp-2", children: track.attributes.name }),
            /* @__PURE__ */ jsx("p", { className: "text-moody-300 font-body", children: track.attributes.artistName }),
            /* @__PURE__ */ jsx("p", { className: "text-moody-400 text-sm font-body", children: track.attributes.albumName }),
            /* @__PURE__ */ jsx("p", { className: "text-moody-500 text-xs font-body", children: formatReleaseDate(track.attributes.releaseDate) })
          ] }) })
        ] })
      },
      track.id
    )) }),
    tracks.length === 0 && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "text-center py-20",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-warm-500/20 rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsx(
            "svg",
            {
              className: "w-12 h-12 text-warm-400",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-heading font-bold text-warm-400 mb-4", children: "No Tracks Available" }),
          /* @__PURE__ */ jsx("p", { className: "text-moody-400", children: "Check back soon for new music releases." })
        ]
      }
    )
  ] });
};

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const tracks = await getProducerPlaylist();
  return renderTemplate`${renderComponent($$result, "RootLayout", $$RootLayout, { "title": "Music Portfolio | Shawn Papineau - Professional Music Producer & Atmospheric Beats", "description": "Explore Shawn Papineau's music portfolio featuring original productions, atmospheric beats, and sonic experiments. Professional music producer specializing in moody, atmospheric soundscapes. Listen to tracks and book collaborations.", "keywords": "music producer, atmospheric music, original productions, sonic experiments, Shawn Papineau music, professional music production, atmospheric beats, music portfolio", "image": "https://iiyjiikbtsckevydbcsj.supabase.co/storage/v1/object/public/portfolio-assets/Images/Portraits/PAPS2968.jpg", "type": "website", "tags": [
    "music producer",
    "atmospheric music",
    "original productions",
    "sonic experiments"
  ] }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-gradient-to-br from-moody-900 via-moody-800 to-moody-900"> <!-- Breadcrumbs --> <section class="py-8 px-4 sm:px-6 lg:px-8"> <div class="max-w-7xl mx-auto"> ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": [
    { label: "Home", url: "/" },
    { label: "Music Portfolio", current: true }
  ] })} </div> </section> <!-- Hero Section --> <section class="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"> <!-- Background Elements --> <div class="absolute inset-0 bg-gradient-to-br from-moody-900/50 to-moody-800/30"></div> <div class="absolute top-20 left-10 w-64 h-64 bg-warm-500/10 rounded-full blur-3xl"></div> <div class="absolute bottom-20 right-10 w-80 h-80 bg-warm-600/10 rounded-full blur-3xl"></div> <div class="max-w-7xl mx-auto relative z-10"> <div class="text-center mb-16"> <h1 class="font-display text-5xl md:text-7xl font-bold text-warm-400 mb-6 tracking-wider">
MUSIC PORTFOLIO
</h1> <div class="w-32 h-1 bg-gradient-to-r from-warm-500 to-warm-600 mx-auto mb-8"></div> <p class="font-body text-xl text-moody-400 max-w-3xl mx-auto leading-relaxed">
Explore my collection of original productions, collaborations, and
						sonic experiments. Each track tells a story of creative exploration
						and musical innovation.
</p> </div> <!-- Stats Section --> <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"> <div class="bg-moody-800/30 backdrop-blur-sm border border-warm-500/20 rounded-2xl p-8 text-center"> <div class="text-3xl font-heading font-bold text-warm-400 mb-2"> ${tracks.length} </div> <div class="text-moody-300 font-body">Tracks</div> </div> <div class="bg-moody-800/30 backdrop-blur-sm border border-warm-500/20 rounded-2xl p-8 text-center"> <div class="text-3xl font-heading font-bold text-warm-400 mb-2">
∞
</div> <div class="text-moody-300 font-body">Possibilities</div> </div> <div class="bg-moody-800/30 backdrop-blur-sm border border-warm-500/20 rounded-2xl p-8 text-center"> <div class="text-3xl font-heading font-bold text-warm-400 mb-2">
100%
</div> <div class="text-moody-300 font-body">Original</div> </div> </div> </div> </section> <!-- Music Portfolio Section --> <section class="py-20 px-4 sm:px-6 lg:px-8"> <div class="max-w-7xl mx-auto"> ${renderComponent($$result2, "MusicPortfolio", MusicPortfolio, { "tracks": tracks, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/react/MusicPortfolio", "client:component-export": "default" })} </div> </section> <!-- Call to Action Section --> <section class="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"> <div class="absolute inset-0 bg-gradient-to-t from-moody-900/80 to-transparent"></div> <div class="max-w-4xl mx-auto text-center relative z-10"> <h2 class="font-display text-4xl md:text-5xl font-bold text-warm-400 mb-6 tracking-wider">
READY TO COLLABORATE?
</h2> <p class="font-body text-xl text-moody-400 mb-8 leading-relaxed">
Let's create something extraordinary together. Whether you need
					original music, production work, or creative direction, I'm here to
					bring your vision to life.
</p> <div class="flex flex-col sm:flex-row gap-6 justify-center"> <a href="/#contact" class="px-8 py-4 bg-gradient-to-r from-warm-500 to-warm-600 text-moody-900 font-heading font-semibold tracking-wider uppercase hover:from-warm-400 hover:to-warm-500 transition-all duration-300 transform hover:scale-105 rounded-xl">
Get In Touch
</a> <a href="/photography" class="px-8 py-4 bg-moody-800/50 border border-warm-500/20 text-warm-400 font-heading font-semibold tracking-wider uppercase hover:bg-warm-500/10 hover:border-warm-400 transition-all duration-300 transform hover:scale-105 rounded-xl">
View Photography
</a> </div> </div> </section> </main> ` })}`;
}, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/pages/music/index.astro", void 0);

const $$file = "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/pages/music/index.astro";
const $$url = "/music";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
