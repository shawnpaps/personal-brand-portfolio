import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DrJEj2ga.mjs';
import { $ as $$RootLayout } from '../../chunks/RootLayout_EsXPiWtw.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { motion } from 'motion/react';
import { a as apiUrl } from '../../chunks/variables_bKpKuaxM.mjs';
export { renderers } from '../../renderers.mjs';

const TrackCaseStudy = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const handlePlayPreview = async () => {
    const previewUrl = track.attributes.previews?.[0]?.url;
    if (!previewUrl) return;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    if (isPlaying) {
      setIsPlaying(false);
      setAudio(null);
      return;
    }
    const newAudio = new Audio(previewUrl);
    newAudio.volume = 0.7;
    newAudio.addEventListener("ended", () => {
      setIsPlaying(false);
      setAudio(null);
    });
    try {
      await newAudio.play();
      setIsPlaying(true);
      setAudio(newAudio);
    } catch (error) {
      console.error("Error playing preview:", error);
    }
  };
  const formatReleaseDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxs("section", { className: "relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-moody-900/50 to-moody-800/30" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-20 left-10 w-64 h-64 bg-warm-500/10 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-20 right-10 w-80 h-80 bg-warm-600/10 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
        /* @__PURE__ */ jsxs(
          motion.a,
          {
            href: "/music",
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            className: "inline-flex items-center space-x-2 text-warm-400 hover:text-warm-300 transition-colors duration-300 mb-8",
            children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "w-5 h-5",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M15 19l-7-7 7-7"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "font-heading tracking-wider", children: "Back to Portfolio" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.6 },
              className: "relative group",
              children: /* @__PURE__ */ jsxs("div", { className: "aspect-square rounded-2xl overflow-hidden relative", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-warm-500/20 via-warm-400/10 to-warm-600/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" }),
                /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full h-full rounded-2xl border-2 border-warm-500/30 group-hover:border-warm-400/50 transition-all duration-500 overflow-hidden", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: track.attributes.artwork.url.replace("{w}", "600").replace("{h}", "600"),
                      alt: `${track.attributes.name} by ${track.attributes.artistName}`,
                      className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    }
                  ),
                  track.attributes.previews?.[0]?.url && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-moody-900/80 via-moody-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: handlePlayPreview,
                      className: "absolute inset-0 flex items-center justify-center text-warm-400 hover:text-warm-300 transition-colors duration-300",
                      children: isPlaying ? /* @__PURE__ */ jsx(
                        motion.div,
                        {
                          animate: { rotate: 360 },
                          transition: {
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear"
                          },
                          className: "w-20 h-20 bg-moody-900/80 rounded-full flex items-center justify-center border-2 border-warm-400",
                          children: /* @__PURE__ */ jsx(
                            "svg",
                            {
                              className: "w-10 h-10",
                              fill: "currentColor",
                              viewBox: "0 0 24 24",
                              children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" })
                            }
                          )
                        }
                      ) : /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-moody-900/80 rounded-full flex items-center justify-center border-2 border-warm-400 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(
                        "svg",
                        {
                          className: "w-10 h-10 ml-1",
                          fill: "currentColor",
                          viewBox: "0 0 24 24",
                          children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7z" })
                        }
                      ) })
                    }
                  ) })
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 20 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.6, delay: 0.2 },
              className: "space-y-8",
              children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl md:text-6xl font-bold text-warm-400 mb-4 tracking-wider", children: track.attributes.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-2xl text-moody-300 font-body mb-2", children: track.attributes.artistName }),
                  /* @__PURE__ */ jsx("p", { className: "text-moody-400 font-body", children: track.attributes.albumName })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-warm-500/20 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(
                      "svg",
                      {
                        className: "w-6 h-6 text-warm-400",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /* @__PURE__ */ jsx(
                          "path",
                          {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                            d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          }
                        )
                      }
                    ) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "font-heading text-warm-400 font-semibold tracking-wider", children: "RELEASE DATE" }),
                      /* @__PURE__ */ jsx("p", { className: "text-moody-300", children: formatReleaseDate(track.attributes.releaseDate) })
                    ] })
                  ] }),
                  track.attributes.previews?.[0]?.url && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-warm-500/20 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(
                      "svg",
                      {
                        className: "w-6 h-6 text-warm-400",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /* @__PURE__ */ jsx(
                          "path",
                          {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                            d: "M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          }
                        )
                      }
                    ) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "font-heading text-warm-400 font-semibold tracking-wider", children: "PREVIEW" }),
                      /* @__PURE__ */ jsx("p", { className: "text-moody-300", children: "Available" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: track.attributes.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "px-8 py-4 bg-gradient-to-r from-warm-500 to-warm-600 text-moody-900 font-heading font-semibold tracking-wider uppercase hover:from-warm-400 hover:to-warm-500 transition-all duration-300 transform hover:scale-105 rounded-xl text-center",
                      children: "Listen on Apple Music"
                    }
                  ),
                  track.attributes.previews?.[0]?.url && /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: handlePlayPreview,
                      className: "px-8 py-4 bg-moody-800/50 border border-warm-500/20 text-warm-400 font-heading font-semibold tracking-wider uppercase hover:bg-warm-500/10 hover:border-warm-400 transition-all duration-300 transform hover:scale-105 rounded-xl",
                      children: isPlaying ? "Stop Preview" : "Play Preview"
                    }
                  )
                ] })
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-20 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: 0.4 },
        className: "space-y-12",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-warm-400 mb-6 tracking-wider", children: "CASE STUDY" }),
            /* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-gradient-to-r from-warm-500 to-warm-600 mx-auto mb-8" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-moody-800/30 backdrop-blur-sm border border-warm-500/20 rounded-2xl p-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-heading font-semibold text-warm-400 mb-4", children: "The Creative Process" }),
            /* @__PURE__ */ jsx("p", { className: "text-moody-300 leading-relaxed mb-6", children: "This case study is coming soon. Here you'll find detailed insights into the creative process, production techniques, and the story behind this track." }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-heading text-warm-400 font-semibold tracking-wider", children: "PRODUCTION NOTES" }),
                /* @__PURE__ */ jsx("p", { className: "text-moody-400 text-sm", children: "Details about the production process, equipment used, and technical decisions." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-heading text-warm-400 font-semibold tracking-wider", children: "INSPIRATION" }),
                /* @__PURE__ */ jsx("p", { className: "text-moody-400 text-sm", children: "The creative inspiration, influences, and artistic vision behind the track." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-moody-800/30 backdrop-blur-sm border border-warm-500/20 rounded-2xl p-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-heading font-semibold text-warm-400 mb-6", children: "Technical Details" }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "text-2xl font-heading font-bold text-warm-400 mb-2", children: "Genre" }),
                /* @__PURE__ */ jsx("div", { className: "text-moody-300", children: "Coming Soon" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "text-2xl font-heading font-bold text-warm-400 mb-2", children: "BPM" }),
                /* @__PURE__ */ jsx("div", { className: "text-moody-300", children: "Coming Soon" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "text-2xl font-heading font-bold text-warm-400 mb-2", children: "Key" }),
                /* @__PURE__ */ jsx("div", { className: "text-moody-300", children: "Coming Soon" })
              ] })
            ] })
          ] })
        ]
      }
    ) }) })
  ] });
};

const $$Astro = createAstro("https://shawnpapsmedia.com");
async function getStaticPaths() {
  try {
    const tracks = await fetch(`${apiUrl}/fetch-music`).then(
      (res) => res.json()
    );
    return tracks.map((track) => ({
      params: { id: track.id },
      props: { track }
    }));
  } catch (error) {
    console.error("Error generating static paths:", error);
    return [];
  }
}
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { track } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "RootLayout", $$RootLayout, { "title": `${track.name} - Case Study - Shawn Papineau` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-gradient-to-br from-moody-900 via-moody-800 to-moody-900"> ${renderComponent($$result2, "TrackCaseStudy", TrackCaseStudy, { "track": track, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/react/TrackCaseStudy", "client:component-export": "default" })} </main> ` })}`;
}, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/pages/music/[id].astro", void 0);

const $$file = "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/pages/music/[id].astro";
const $$url = "/music/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$id,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
