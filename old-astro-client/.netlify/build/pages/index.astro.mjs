import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, k as renderComponent } from '../chunks/astro/server_DonqQ8u2.mjs';
import { $ as $$RootLayout } from '../chunks/RootLayout_ACEhfWvR.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useScroll, useTransform, motion } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { T as TestimonialCard, $ as $$Contact } from '../chunks/Contact_DTSrsgHY.mjs';
import { getProducerPlaylist } from '../chunks/appleMusic_D5Nlofx2.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://shawnpapsmedia.com");
const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Hero;
  const { title, subtitle, cta1, cta2, bgImageUrl } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"> <!-- HERO IMAGE --> <div class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center"> <img${addAttribute(bgImageUrl, "src")}${addAttribute(title, "alt")} class="w-full h-full object-cover object-right"> </div> <!-- HERO TEXT --> <div class="text-center max-w-4xl mx-auto z-10 flex flex-col justify-end h-full sticky top-0"> <div class="p-16 bg-black/50 drop-shadow-sm"> <h1 class="text-8xl font-display font-bold text-warm-500 w-full drop-shadow-xl"> ${title} </h1> <p class="text-4xl font-heading text-warm-500 drop-shadow-xl"> ${subtitle} </p> </div> <!-- CTA BUTTONS --> <div class="flex justify-center gap-4 p-16"> <a${addAttribute(cta1.href, "href")} class="px-8 py-4 bg-warm-500/20 hover:bg-warm-500/30 border-2 border-warm-500/50 hover:border-warm-400 rounded-lg font-heading text-warm-400 hover:text-warm-300 transition-all duration-300 backdrop-blur-sm hover:scale-105 transform"> ${cta1.buttonText} </a> <a${addAttribute(cta2.href, "href")} class="px-8 py-4 bg-moody-900/20 hover:bg-moody-800/30 border-2 border-warm-500/50 hover:border-warm-400 rounded-lg font-heading text-warm-400 hover:text-warm-300 transition-all duration-300 backdrop-blur-sm hover:scale-105 transform"> ${cta2.buttonText} </a> </div> </div> <!-- Scroll Indicator --> <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"> <div class="w-6 h-10 border-2 border-warm-500/50 rounded-full flex justify-center"> <div class="w-1 h-3 bg-warm-500 rounded-full mt-2 animate-pulse"></div> </div> </div> </section>`;
}, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/astro/Hero.astro", void 0);

function AnimatedAboutSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const firstTextOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const secondTextOpacity = useTransform(scrollYProgress, [0.2, 1], [0, 1]);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: containerRef,
      id: "about",
      className: "py-20 px-4 sm:px-6 lg:px-8 relative min-h-[60rem] flex justify-between",
      children: [
        /* @__PURE__ */ jsx("div", { className: " sticky top-5", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-5", children: [
          /* @__PURE__ */ jsx(
            motion.h2,
            {
              style: { opacity: firstTextOpacity },
              className: "font-bold text-warm-400 max-w-md text-6xl font-heading",
              children: "I am obsessed with capturing creatives doing cool sh*t..."
            }
          ),
          /* @__PURE__ */ jsx(
            motion.h2,
            {
              style: { opacity: secondTextOpacity },
              className: "font-bold text-warm-400 max-w-md text-6xl font-heading  ",
              children: "...and building tools to help them do it."
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "w-1/2 h-[60rem] bg-warm-500/20 overflow-hidden rounded-2xl shadow-2xl", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "https://iiyjiikbtsckevydbcsj.supabase.co/storage/v1/object/public/portfolio-assets/Images/Portraits/PAPS2980.jpg",
            alt: "Shawn Papineau",
            className: "object-cover h-full w-full"
          }
        ) })
      ]
    }
  );
}

const TestimonialsGrid = () => {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`/api/testimonials`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        const shuffled = data.sort(() => 0.5 - Math.random());
        setTestimonials(shuffled.slice(0, 3));
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        const fallbackData = [
          {
            id: "1",
            name: "Alex Chen",
            company: "SoundWave Studios",
            testimonial: "Shawn's production skills are absolutely incredible. He transformed our raw tracks into something magical. The attention to detail and creative vision he brings is unmatched.",
            avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
          },
          {
            id: "2",
            name: "Maya Rodriguez",
            company: "Creative Collective",
            testimonial: "Working with Shawn was a game-changer for our brand. His photography captured the essence of our creative process perfectly. The warm, moody aesthetic he brings is exactly what we were looking for.",
            avatar_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
          },
          {
            id: "3",
            name: "Jordan Kim",
            company: "BeatLab Records",
            testimonial: "Shawn's ability to blend technical precision with artistic vision is rare. He doesn't just produce music - he crafts experiences. Every track he touches becomes something special.",
            avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          },
          {
            id: "4",
            name: "Sarah Williams",
            company: "Studio 404",
            testimonial: "The way Shawn captures emotion through his lens is extraordinary. Every photo tells a story, and his warm, moody style perfectly complements our artistic vision.",
            avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
          },
          {
            id: "5",
            name: "Marcus Thompson",
            company: "Rhythm Records",
            testimonial: "Shawn's production work is next level. He has an uncanny ability to understand exactly what a track needs and brings out its full potential.",
            avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
          }
        ];
        const shuffled = fallbackData.sort(() => 0.5 - Math.random());
        setTestimonials(shuffled.slice(0, 3));
      }
    };
    fetchTestimonials();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "text-center mb-16",
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
        children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl md:text-5xl font-bold text-warm-400 mb-4 tracking-wider", children: "WHAT CLIENTS SAY" }),
          /* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-gradient-to-r from-warm-500 to-warm-600 mx-auto" })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: testimonials.map((testimonial, index) => /* @__PURE__ */ jsx(
      TestimonialCard,
      {
        testimonial,
        index
      },
      testimonial.id
    )) })
  ] });
};

const $$SocialProof = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="py-20 px-4 sm:px-6 lg:px-8 bg-moody-800/30"> ${renderComponent($$result, "TestimonialsGrid", TestimonialsGrid, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/react/TestimonialsGrid", "client:component-export": "default" })} </section>`;
}, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/astro/SocialProof.astro", void 0);

let globalAudioRef = null;
let globalPlayingTrackId = null;
const TrackCard = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const handlePlay = () => {
    if (!track.attributes.previews?.[0]?.url) {
      console.log("No preview URL available for this track");
      return;
    }
    if (globalAudioRef && globalPlayingTrackId !== track.id) {
      globalAudioRef.pause();
      globalAudioRef.currentTime = 0;
    }
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        globalPlayingTrackId = null;
        globalAudioRef = null;
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        globalPlayingTrackId = track.id;
        globalAudioRef = audioRef.current;
      }
    }
  };
  const handleAudioEnded = () => {
    setIsPlaying(false);
    globalPlayingTrackId = null;
    globalAudioRef = null;
  };
  useEffect(() => {
    const checkGlobalAudio = () => {
      if (globalPlayingTrackId !== track.id && isPlaying) {
        setIsPlaying(false);
      }
    };
    const interval = setInterval(checkGlobalAudio, 100);
    return () => clearInterval(interval);
  }, [track.id, isPlaying]);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20, rotateY: -15 },
      animate: { opacity: 1, y: 0, rotateY: 0 },
      transition: { duration: 0.6, ease: "easeOut" },
      whileHover: {
        scale: 1.05,
        rotateY: 5,
        z: 50,
        transition: { duration: 0.3, ease: "easeOut" }
      },
      className: "group relative perspective-1000 cursor-pointer",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-64 h-64 bg-gradient-to-br from-moody-800 to-moody-900 rounded-full shadow-2xl border-4 border-warm-500/20 hover:border-warm-400/40 transition-all duration-500 overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-transparent via-moody-700/30 to-transparent rounded-full" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-4 bg-gradient-to-br from-moody-900 via-moody-800 to-moody-900 rounded-full border border-moody-600/30" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-moody-900 rounded-full border-2 border-warm-500/30 z-10" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-8 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
            motion.img,
            {
              src: track.attributes.artwork.url.replace("{w}", "200").replace("{h}", "200"),
              alt: track.attributes.name,
              className: "w-full h-full object-cover",
              whileHover: { scale: 1.1 },
              transition: { duration: 0.3 }
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-warm-500/0 via-warm-400/0 to-warm-500/0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500" }),
          /* @__PURE__ */ jsx(
            motion.button,
            {
              onClick: handlePlay,
              className: "absolute inset-0 bg-moody-900/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-moody-900/90",
              initial: { scale: 0.8 },
              whileHover: { scale: 1 },
              transition: { duration: 0.2 },
              children: /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-warm-500/90 rounded-full flex items-center justify-center shadow-lg hover:bg-warm-400 transition-colors duration-200", children: isPlaying ? /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "w-8 h-8 text-moody-900",
                  fill: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", { d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z" })
                }
              ) : /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "w-8 h-8 text-moody-900 ml-1",
                  fill: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7z" })
                }
              ) })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: "mt-4 text-center",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.3, duration: 0.5 },
            children: [
              /* @__PURE__ */ jsx("h3", { className: "text-warm-400 font-bold text-lg truncate max-w-64", children: track.attributes.name }),
              /* @__PURE__ */ jsx("p", { className: "text-moody-400 text-sm truncate max-w-64", children: track.attributes.artistName }),
              /* @__PURE__ */ jsxs("div", { className: "text-warm-500/60 text-xs mt-1 font-mono", children: [
                Math.floor(track.attributes.durationInMillis / 6e4),
                ":",
                String(
                  Math.floor(track.attributes.durationInMillis % 6e4 / 1e3)
                ).padStart(2, "0")
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute -top-2 -right-2 w-3 h-3 bg-warm-400/60 rounded-full",
            animate: {
              y: [0, -10, 0],
              opacity: [0.6, 1, 0.6]
            },
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute -bottom-1 -left-1 w-2 h-2 bg-warm-500/40 rounded-full",
            animate: {
              y: [0, -8, 0],
              opacity: [0.4, 0.8, 0.4]
            },
            transition: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 1.5
            }
          }
        ),
        track.attributes.previews?.[0]?.url && /* @__PURE__ */ jsx(
          "audio",
          {
            ref: audioRef,
            src: track.attributes.previews[0].url,
            onEnded: handleAudioEnded,
            preload: "none"
          }
        )
      ]
    },
    track.id
  );
};

const MusicPlayer = () => {
  const [music, setMusic] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const getMusic = async () => {
    const musicData = await getProducerPlaylist();
    const sortedMusic = musicData.sort((a, b) => {
      const dateA = new Date(a.attributes.releaseDate);
      const dateB = new Date(b.attributes.releaseDate);
      return dateB.getTime() - dateA.getTime();
    });
    setMusic(sortedMusic);
    setPreviewData(sortedMusic.slice(0, 6));
  };
  useEffect(() => {
    getMusic();
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "mx-auto bg-moody-800/50 rounded-lg border border-warm-500/20 p-8", children: music.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `grid grid-cols-2 md:grid-cols-3 gap-4 ${showMore ? "max-h-[600px] overflow-y-auto pr-2" : ""}`,
        style: {
          scrollbarWidth: "thin",
          scrollbarColor: "#f27522 #343a40"
        },
        children: !showMore ? previewData.map((track) => /* @__PURE__ */ jsx(TrackCard, { track }, track.id)) : music.map((track) => /* @__PURE__ */ jsx(TrackCard, { track }, track.id))
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setShowMore(!showMore),
        className: "mt-6 w-full py-3 bg-warm-500/10 text-warm-400 rounded-lg border border-warm-500/20 hover:bg-warm-500/20 transition-colors duration-300",
        children: showMore ? "Show Less" : "Show More"
      }
    )
  ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative w-16 h-16 mx-auto mb-4", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 border-4 border-warm-500/20 rounded-full" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 border-4 border-transparent border-t-warm-400 rounded-full animate-spin" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-2 bg-gradient-to-br from-warm-500/10 to-transparent rounded-full animate-pulse" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-warm-400 font-heading text-lg tracking-wider", children: "LOADING TRACKS" }),
    /* @__PURE__ */ jsx("div", { className: "text-moody-400 text-sm mt-2", children: "Spinning up the vinyl..." })
  ] }) });
};

const $$LatestTracks = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="music" class="py-20 relative px-4 sm:px-6 lg:px-8 bg-moody-800/30"> <div class="absolute inset-0 -z-10"> <img src="https://iiyjiikbtsckevydbcsj.supabase.co/storage/v1/object/public/portfolio-assets/Images/Portraits/PAPS3001.jpg" alt="Background image" class="absolute inset-0 w-full h-full object-cover object-center blur-sm"> </div> <div class="max-w-7xl relative z-10 mx-auto"> <div class="text-center mb-16"> <h2 class="font-display text-4xl md:text-5xl font-bold text-warm-400 mb-4 tracking-wider">
LATEST TRACKS
</h2> <div class="w-24 h-1 bg-gradient-to-r from-warm-500 to-warm-600 mx-auto"></div> </div> <!-- Music Player Placeholder --> ${renderComponent($$result, "MusicPlayer", MusicPlayer, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/react/MusicPlayer", "client:component-export": "default" })} </div> </section>`;
}, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/astro/LatestTracks.astro", void 0);

const $$Mission = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-moody-900 to-moody-800"> <div class="max-w-7xl mx-auto"> <!-- Section Header --> <div class="text-center mb-16"> <h2 class="font-display text-4xl md:text-5xl font-bold text-warm-400 mb-4 tracking-wider">
MY MISSION
</h2> <div class="w-24 h-1 bg-gradient-to-r from-warm-500 to-warm-600 mx-auto"></div> </div> <!-- Mission Content --> <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"> <!-- Left Column - Text Content --> <div class="space-y-8"> <div class="bg-gradient-to-br from-moody-800/80 to-moody-900/80 backdrop-blur-sm border border-warm-500/20 p-8 rounded-xl hover:border-warm-400/40 transition-all duration-500"> <h3 class="text-2xl font-heading font-semibold text-warm-400 mb-4">
Empowering Creatives
</h3> <p class="text-moody-300 leading-relaxed">
My mission is to empower artists and creatives by capturing their
						authentic moments and crafting tools that amplify their creative
						process. Every project is an opportunity to tell a unique story and
						push the boundaries of artistic expression.
</p> </div> <div class="bg-gradient-to-br from-moody-800/80 to-moody-900/80 backdrop-blur-sm border border-warm-500/20 p-8 rounded-xl hover:border-warm-400/40 transition-all duration-500"> <h3 class="text-2xl font-heading font-semibold text-warm-400 mb-4">
Creating Impact
</h3> <p class="text-moody-300 leading-relaxed">
Through a blend of technical expertise and artistic vision, I strive
						to create meaningful impact in the creative community. Whether it's
						through music production or photography, my goal is to help artists
						realize their full potential.
</p> </div> </div> <!-- Right Column - Visual Element --> <div class="relative"> <div class="aspect-square rounded-2xl overflow-hidden"> <img src="https://iiyjiikbtsckevydbcsj.supabase.co/storage/v1/object/public/portfolio-assets/Images/Portraits/PAPS2968.jpg" alt="Creative Process" class="w-full h-full object-cover"> <!-- Overlay --> <div class="absolute inset-0 bg-gradient-to-t from-moody-900/80 to-transparent"></div> </div> <!-- Decorative Elements --> <div class="absolute -top-4 -right-4 w-24 h-24 bg-warm-500/10 rounded-full blur-2xl"></div> <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-warm-400/10 rounded-full blur-3xl"></div> </div> </div> <!-- Bottom Quote --> <div class="text-center mt-16"> <blockquote class="text-xl md:text-2xl italic text-warm-400/80 font-heading">
"Every creative deserves to have their story told in its most authentic
				form"
</blockquote> </div> </div> </section>`;
}, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/astro/Mission.astro", void 0);

const $$WhoAmI = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-moody-900 to-moody-800"> <div class="max-w-7xl mx-auto"> <!-- Section Header --> <div class="text-center mb-16"> <h2 class="font-display text-4xl md:text-5xl font-bold text-warm-400 mb-4 tracking-wider">
WHO AM I?
</h2> <div class="w-24 h-1 bg-gradient-to-r from-warm-500 to-warm-600 mx-auto"></div> </div> <!-- Content Grid --> <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"> <!-- Left Column - Image --> <div class="relative"> <div class="aspect-square rounded-2xl overflow-hidden relative group"> <!-- Orange Glow Effect --> <div class="absolute inset-0 bg-gradient-to-br from-warm-500/20 via-warm-400/10 to-warm-600/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div> <!-- Inner Glow --> <div class="absolute inset-2 bg-gradient-to-br from-warm-500/10 via-warm-400/5 to-warm-600/15 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div> <!-- Image Container with Border Glow --> <div class="relative z-10 w-full h-full rounded-2xl border-2 border-warm-500/30 group-hover:border-warm-400/50 transition-all duration-500 overflow-hidden"> <img src="https://iiyjiikbtsckevydbcsj.supabase.co/storage/v1/object/public/portfolio-assets/Images/Portraits/PAPS2959.jpg" alt="Shawn Papineau Portrait" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"> <!-- Overlay --> <div class="absolute inset-0 bg-gradient-to-t from-moody-900/80 to-transparent"></div> </div> </div> <!-- Decorative Elements --> <div class="absolute -top-4 -right-4 w-24 h-24 bg-warm-500/10 rounded-full blur-2xl"></div> <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-warm-400/10 rounded-full blur-3xl"></div> </div> <!-- Right Column - Text Content --> <div class="space-y-8"> <div class="bg-gradient-to-br from-moody-800/80 to-moody-900/80 backdrop-blur-sm border border-warm-500/20 p-8 rounded-xl hover:border-warm-400/40 transition-all duration-500"> <h3 class="text-2xl font-heading font-semibold text-warm-400 mb-4">
Music Producer & Photographer
</h3> <p class="text-moody-300 leading-relaxed">
I'm Shawn Papineau, a passionate creative professional who lives at
						the intersection of music and visual arts. With years of experience
						in music production and photography, I've developed a unique
						perspective on capturing and creating authentic moments.
</p> </div> <div class="bg-gradient-to-br from-moody-800/80 to-moody-900/80 backdrop-blur-sm border border-warm-500/20 p-8 rounded-xl hover:border-warm-400/40 transition-all duration-500"> <h3 class="text-2xl font-heading font-semibold text-warm-400 mb-4">
My Approach
</h3> <p class="text-moody-300 leading-relaxed">
I believe in the power of authenticity and raw creativity. Whether
						I'm behind the camera or in the studio, my goal is to capture the
						essence of the moment and transform it into something extraordinary.
						I specialize in working with artists and creatives who want to push
						boundaries and create meaningful work.
</p> </div> </div> </div> </div> </section>`;
}, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/astro/WhoAmI.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "RootLayout", $$RootLayout, { "title": "Shawn Papineau | Professional Music Producer & Photographer | Creative Portfolio", "description": "Shawn Papineau is a professional music producer and photographer specializing in atmospheric beats and moody photography. View portfolio, listen to music, and book creative sessions. Based in [Your Location].", "keywords": "music producer, photographer, creative director, atmospheric music, moody photography, professional photographer, music production, creative services, portfolio, Shawn Papineau", "image": "https://iiyjiikbtsckevydbcsj.supabase.co/storage/v1/object/public/portfolio-assets/Images/Portraits/PAPS2968.jpg", "type": "website", "tags": [
    "music producer",
    "photographer",
    "creative director",
    "atmospheric music",
    "moody photography"
  ] }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen"> <!-- Hero Section --> ${renderComponent($$result2, "Hero", $$Hero, { "bgImageUrl": "https://iiyjiikbtsckevydbcsj.supabase.co/storage/v1/object/public/portfolio-assets/Images/Portraits/PAPS2968.jpg", "title": "SHAWN PAPS", "subtitle": "MUSIC PRODUCER & PHOTOGRAPHER", "cta1": { buttonText: "Listen to my work", href: "#music" }, "cta2": { buttonText: "Read my promise", href: "#about" }, "thumbnailUrl": "https://iiyjiikbtsckevydbcsj.supabase.co/storage/v1/object/public/portfolio-assets/Images/Portraits/PAPS2968.jpg" })} ${renderComponent($$result2, "AnimatedAboutSection", AnimatedAboutSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/react/AnimatedAboutSection", "client:component-export": "default" })} ${renderComponent($$result2, "WhoAmI", $$WhoAmI, {})} ${renderComponent($$result2, "Mission", $$Mission, {})} <!-- Social Proof Section --> ${renderComponent($$result2, "SocialProof", $$SocialProof, {})} <!-- Portfolio Preview Section --> <section id="work" class="py-20 px-4 sm:px-6 lg:px-8"> <div class="max-w-7xl mx-auto"> <!-- Section Header --> <div class="text-center mb-16"> <h2 class="font-display text-4xl md:text-5xl font-bold text-warm-400 mb-4 tracking-wider">
SELECTED WORK
</h2> <div class="w-24 h-1 bg-gradient-to-r from-warm-500 to-warm-600 mx-auto"></div> </div> <!-- Portfolio Grid --> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> <!-- Photography Item --> <div class="group relative overflow-hidden rounded-lg bg-moody-800/50 backdrop-blur-sm border border-warm-500/20 hover:border-warm-400/40 transition-all duration-500"> <div class="aspect-[4/5] bg-gradient-to-br from-moody-700 to-moody-800 flex items-center justify-center"> <div class="text-center p-6"> <div class="w-16 h-16 bg-warm-500/20 rounded-full flex items-center justify-center mx-auto mb-4"> <svg class="w-8 h-8 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> </div> <h3 class="font-heading text-xl font-semibold text-warm-400 mb-2">
PHOTOGRAPHY
</h3> <p class="text-moody-400 text-sm">
Warm, moody tones capturing raw emotion
</p> </div> </div> <div class="absolute inset-0 bg-gradient-to-t from-moody-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div> </div> <!-- Music Production Item --> <div class="group relative overflow-hidden rounded-lg bg-moody-800/50 backdrop-blur-sm border border-warm-500/20 hover:border-warm-400/40 transition-all duration-500"> <div class="aspect-[4/5] bg-gradient-to-br from-moody-700 to-moody-800 flex items-center justify-center"> <div class="text-center p-6"> <div class="w-16 h-16 bg-warm-500/20 rounded-full flex items-center justify-center mx-auto mb-4"> <svg class="w-8 h-8 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path> </svg> </div> <h3 class="font-heading text-xl font-semibold text-warm-400 mb-2">
MUSIC PRODUCTION
</h3> <p class="text-moody-400 text-sm">
Sonic landscapes and atmospheric beats
</p> </div> </div> <div class="absolute inset-0 bg-gradient-to-t from-moody-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div> </div> <!-- Creative Direction Item --> <div class="group relative overflow-hidden rounded-lg bg-moody-800/50 backdrop-blur-sm border border-warm-500/20 hover:border-warm-400/40 transition-all duration-500"> <div class="aspect-[4/5] bg-gradient-to-br from-moody-700 to-moody-800 flex items-center justify-center"> <div class="text-center p-6"> <div class="w-16 h-16 bg-warm-500/20 rounded-full flex items-center justify-center mx-auto mb-4"> <svg class="w-8 h-8 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path> </svg> </div> <h3 class="font-heading text-xl font-semibold text-warm-400 mb-2">
CREATIVE DIRECTION
</h3> <p class="text-moody-400 text-sm">
Visual storytelling and brand identity
</p> </div> </div> <div class="absolute inset-0 bg-gradient-to-t from-moody-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div> </div> </div> </div> </section> <!-- Music Section --> ${renderComponent($$result2, "LatestTracks", $$LatestTracks, {})} <!-- Contact Section --> ${renderComponent($$result2, "Contact", $$Contact, {})} </main> ` })}`;
}, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/pages/index.astro", void 0);

const $$file = "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
