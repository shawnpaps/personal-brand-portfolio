import { f as createComponent, m as maybeRenderHead, k as renderComponent, r as renderTemplate } from './astro/server_DrJEj2ga.mjs';
import { C as ContactForm } from './ContactForm_CVpsOgbc.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { SiInstagram, SiYoutube, SiX, SiLinkedin, SiGithub } from 'react-icons/si';
import { g as getTestimonials } from './supabase_BiQPTC9b.mjs';
import { motion, AnimatePresence } from 'motion/react';

const SocialLink = ({ href, icon }) => {
  return /* @__PURE__ */ jsx(
    "a",
    {
      href,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "w-14 h-14 bg-moody-800/50 border border-warm-500/20 rounded-full flex items-center justify-center text-warm-400 hover:bg-warm-500/10 hover:border-warm-400 transition-all duration-300 transform hover:scale-110",
      children: icon
    }
  );
};

const socials = [
	{
		name: 'Instagram',
		url: 'https://instagram.com/shawnpapsmusic',
		icon: SiInstagram(),
	},
	{
		name: 'YouTube',
		url: 'https://youtube.com/@ShawnPapsMusic',
		icon: SiYoutube(),
	},
	{
		name: 'X',
		url: 'https://x.com/shawnpapsmusic',
		icon: SiX(),
	},
	{
		name: 'LinkedIn',
		url: 'https://linkedin.com/in/shawn-papineau',
		icon: SiLinkedin(),
	},
	{
		name: 'GitHub',
		url: 'https://github.com/shawnpaps',
		icon: SiGithub(),
	},
];

const $$SocialLinks = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="bg-moody-800/30 backdrop-blur-sm border border-warm-500/20
    rounded-2xl p-8"> <h3 class="font-heading text-2xl font-bold text-warm-400 mb-6 tracking-wider">
CONNECT
</h3> <div class="flex space-x-4"> ${socials.map((social) => renderTemplate`${renderComponent($$result, "SocialLink", SocialLink, { "href": social.url, "icon": social.icon })}`)} </div> </div>`;
}, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/astro/SocialLinks.astro", void 0);

const TestimonialCard = ({
  testimonial,
  index
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: {
          duration: 0.6,
          delay: index * 0.2,
          ease: "easeOut"
        },
        whileHover: {
          y: -8,
          scale: 1.02,
          transition: { duration: 0.3 }
        },
        className: "group relative",
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-warm-500/0 via-warm-400/0 to-warm-500/0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" }),
          /* @__PURE__ */ jsxs("div", { className: "relative bg-gradient-to-br from-moody-800/80 to-moody-900/80 backdrop-blur-sm border border-warm-500/20 p-8 rounded-xl hover:border-warm-400/40 transition-all duration-500 overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-5", children: /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-full bg-gradient-to-br from-warm-400 via-transparent to-warm-500 animate-pulse" }) }),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "absolute top-4 right-4 text-warm-500/30 text-4xl",
                initial: { scale: 0, rotate: -180 },
                animate: { scale: 1, rotate: 0 },
                transition: { delay: index * 0.2 + 0.3, duration: 0.5 },
                children: '"'
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "flex items-center mb-6",
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: index * 0.2 + 0.4, duration: 0.5 },
                children: /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-heading text-lg font-semibold text-warm-400 group-hover:text-warm-300 transition-colors duration-300", children: testimonial.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-moody-400 text-sm group-hover:text-moody-300 transition-colors duration-300", children: testimonial.company })
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              motion.blockquote,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: index * 0.2 + 0.5, duration: 0.5 },
                children: /* @__PURE__ */ jsx("p", { className: "text-moody-300 italic leading-relaxed group-hover:text-moody-200 transition-colors duration-300 line-clamp-4", children: testimonial.testimonial })
              }
            ),
            /* @__PURE__ */ jsx(
              motion.button,
              {
                onClick: openModal,
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: index * 0.2 + 0.6, duration: 0.5 },
                className: "relative z-10 mt-4 px-4 py-2 bg-warm-500/10 border border-warm-500/30 text-warm-400 text-sm font-heading tracking-wider uppercase hover:bg-warm-500/20 hover:border-warm-400/50 transition-all duration-300 rounded-lg cursor-pointer",
                children: "Read More"
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "absolute -top-2 -right-2 w-3 h-3 bg-warm-400/40 rounded-full pointer-events-none",
                animate: {
                  y: [0, -8, 0],
                  opacity: [0.4, 0.8, 0.4]
                },
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5
                }
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "absolute -bottom-1 -left-1 w-2 h-2 bg-warm-500/30 rounded-full pointer-events-none",
                animate: {
                  y: [0, -6, 0],
                  opacity: [0.3, 0.6, 0.3]
                },
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5 + 1
                }
              }
            )
          ] })
        ]
      },
      testimonial.id
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isModalOpen && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 bg-moody-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4",
        onClick: closeModal,
        children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9, y: 20 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.9, y: 20 },
            transition: { duration: 0.3, ease: "easeOut" },
            className: "relative bg-gradient-to-br from-moody-800 to-moody-900 border border-warm-500/30 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: closeModal,
                  className: "absolute top-4 right-4 text-moody-400 hover:text-warm-400 transition-colors duration-300",
                  children: /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "w-6 h-6",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: "2",
                          d: "M6 18L18 6M6 6l12 12"
                        }
                      )
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "flex items-center mb-6", children: /* @__PURE__ */ jsxs("div", { className: "ml-6", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-heading text-2xl font-bold text-warm-400", children: testimonial.name }),
                /* @__PURE__ */ jsx("p", { className: "text-moody-400 text-lg", children: testimonial.company })
              ] }) }),
              /* @__PURE__ */ jsxs("blockquote", { className: "relative", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute -top-2 -left-2 text-warm-500/30 text-6xl", children: '"' }),
                /* @__PURE__ */ jsx("p", { className: "text-moody-300 text-lg leading-relaxed pl-8", children: testimonial.testimonial })
              ] })
            ]
          }
        )
      }
    ) })
  ] });
};

const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const testimonials = await getTestimonials();
  const randomTestimonial = testimonials[Math.floor(Math.random() * testimonials.length)];
  return renderTemplate`${maybeRenderHead()}<section id="contact" class="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"> <!-- Background decorative elements --> <div class="absolute inset-0 bg-gradient-to-br from-moody-900/50 to-moody-800/30"></div> <div class="absolute top-20 left-10 w-32 h-32 bg-warm-500/10 rounded-full blur-3xl"></div> <div class="absolute bottom-20 right-10 w-40 h-40 bg-warm-600/10 rounded-full blur-3xl"></div> <div class="max-w-6xl mx-auto relative z-10"> <div class="text-center mb-16"> <h2 class="font-display text-4xl md:text-6xl font-bold text-warm-400 mb-6 tracking-wider">
LET'S CREATE
</h2> <p class="font-body text-xl text-moody-400 mb-8 max-w-3xl mx-auto leading-relaxed">
Ready to bring your vision to life? Let's collaborate on something
				extraordinary.
</p> </div> <div class="grid lg:grid-cols-2 gap-12 items-start"> <!-- Contact Form Section --> <div class="order-2 lg:order-1 space-y-8"> ${renderComponent($$result, "ContactForm", ContactForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/react/ContactForm", "client:component-export": "default" })} <!-- Testimonial Section --> ${renderComponent($$result, "TestimonialCard", TestimonialCard, { "testimonial": randomTestimonial, "index": 0, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/react/TestimonialCard", "client:component-export": "default" })} </div> <!-- Contact Info Section --> <div class="order-1 lg:order-2 space-y-8"> <!-- Photo Section --> <div class="relative group"> <div class="absolute inset-0 bg-gradient-to-br from-warm-500/20 to-warm-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div> <div class="relative bg-moody-800/30 backdrop-blur-sm border border-warm-500/20 rounded-2xl overflow-hidden"> <img src="https://iiyjiikbtsckevydbcsj.supabase.co/storage/v1/object/public/portfolio-assets/Images/Portraits/PAPS2994.jpg" alt="Shawn Papineau in studio" class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"> <div class="absolute inset-0 bg-gradient-to-t from-moody-900/60 via-transparent to-transparent"></div> <div class="absolute bottom-4 left-4 right-4"> <h3 class="font-heading text-xl font-bold text-warm-400 mb-2 tracking-wider">
IN THE STUDIO
</h3> <p class="text-moody-200 text-sm">
Creating something extraordinary
</p> </div> </div> </div> <div class="bg-moody-800/30 backdrop-blur-sm border border-warm-500/20 rounded-2xl p-8"> <h3 class="font-heading text-2xl font-bold text-warm-400 mb-6 tracking-wider">
GET IN TOUCH
</h3> <div class="space-y-6"> <div class="flex items-center space-x-4"> <div class="w-12 h-12 bg-warm-500/20 rounded-full flex items-center justify-center"> <svg class="w-6 h-6 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg> </div> <div> <p class="font-heading text-warm-400 font-semibold tracking-wider">
EMAIL
</p> <a href="mailto:spapineau@spaptechnology.com" class="text-moody-300 hover:text-warm-400 transition-colors duration-300">
spapineau@spaptechnology.com
</a> </div> </div> <div class="flex items-center space-x-4"> <div class="w-12 h-12 bg-warm-500/20 rounded-full flex items-center justify-center"> <svg class="w-6 h-6 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> </div> <div> <p class="font-heading text-warm-400 font-semibold tracking-wider">
LOCATION
</p> <p class="text-moody-300">Tampa, Florida</p> </div> </div> <div class="flex items-center space-x-4"> <div class="w-12 h-12 bg-warm-500/20 rounded-full flex items-center justify-center"> <svg class="w-6 h-6 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <div> <p class="font-heading text-warm-400 font-semibold tracking-wider">
RESPONSE TIME
</p> <p class="text-moody-300">Within 24 hours</p> </div> </div> </div> </div> <!-- Social Links --> ${renderComponent($$result, "SocialLinks", $$SocialLinks, {})} </div> </div> </div> </section>`;
}, "/Users/shawnpapineau/Developer/SPAP/personal-brand-portfolio/astro-client/src/components/astro/Contact.astro", void 0);

export { $$Contact as $, TestimonialCard as T };
