import type { PageContent, ServiceCategoryContent } from '@/lib/types';

export const fallbackPages: Record<string, PageContent> = {
	home: {
		slug: 'home',
		title: 'Shawn Paps Media',
		hero: {
			eyebrow: 'Shawn Paps Media',
			headline:
				'Visual storytelling + digital craftsmanship for standout creative brands.',
			subheadline:
				'From launch-ready websites to cinematic photo & video, we help coffee shops, barbers, studios, and gaming communities show up with swagger.',
			ctaPrimary: {
				label: 'Book a discovery call',
				href: '/contact',
				tone: 'primary',
			},
			ctaSecondary: {
				label: 'Explore our work',
				href: '/marketing',
				tone: 'pink',
			},
		},
		sections: [
			{
				type: 'feature-grid',
				title: 'Solutions built for experience-driven businesses',
				intro:
					'Choose a collaborative partner who gets your vibe and your bottom line.',
				items: [
					{
						title: 'Marketing solutions',
						description:
							'Custom websites, mobile apps, and integrations engineered to run your business smoothly and convert fans into customers.',
						icon: '🛠️',
						accent: 'orange',
					},
					{
						title: 'Visual media',
						description:
							'Photography and video shoots designed to capture your energy—product drops, behind-the-scenes, content libraries, and more.',
						icon: '🎥',
						accent: 'pink',
					},
					{
						title: 'Tech concierge',
						description:
							'Reliable support for POS, studio streaming rigs, booking tools, and the rest of your creative stack.',
						icon: '🛰️',
						accent: 'teal',
					},
				],
			},
			{
				type: 'cta-banner',
				title: 'Ready for a vibe check? Let’s build something magnetic.',
				body: 'Tell us about your brand, and we’ll bring a holistic plan that elevates your visuals and digital experience.',
				ctaLabel: 'Start a project brief',
				ctaHref: '/contact',
				tone: 'primary',
			},
		],
	},
	marketing: {
		slug: 'marketing',
		title: 'Marketing Solutions',
		hero: {
			eyebrow: 'Marketing Solutions',
			headline:
				'Launch digital experiences that feel handcrafted and convert on day one.',
			subheadline:
				'Websites, apps, and integrations tuned for hospitality, lifestyle, and creative culture brands.',
			ctaPrimary: {
				label: 'Website development',
				href: '/marketing/website-development',
				tone: 'primary',
			},
			ctaSecondary: {
				label: 'Apps & integrations',
				href: '/marketing/app-integration-development',
				tone: 'teal',
			},
		},
		sections: [
			{
				type: 'copy',
				title: 'Design-led engineering',
				body: [
					'We pair brand-forward design with fast, accessible, and secure builds. Expect lightning-fast sites, clean API integrations, and dashboards that keep your team dialed in.',
					'Our stack features Astro.js for front-end performance, Payload CMS for flexible content workflows, and modern tooling to maintain momentum as you scale.',
				],
				accent: 'orange',
			},
		],
	},
	'marketing/website-development': {
		slug: 'marketing/website-development',
		title: 'Website Development',
		hero: {
			eyebrow: 'Marketing Solutions',
			headline: 'Websites that look cinematic and load instantly.',
			subheadline:
				'Tailored Astro builds with headless CMS editing, conversion-driven UX, and custom integrations for bookings, menus, or merch.',
			ctaPrimary: {
				label: 'Request a web audit',
				href: '/contact',
				tone: 'primary',
			},
		},
		sections: [
			{
				type: 'feature-grid',
				title: 'Where we shine',
				items: [
					{
						title: 'Cinematic design systems',
						description:
							'Motion, gradients, and storytelling that feel handcrafted for your audience.',
						icon: '🌌',
						accent: 'pink',
					},
					{
						title: 'High-performance builds',
						description:
							'Static-first Astro builds tuned for SEO, speed, and ADA accessibility.',
						icon: '⚡',
						accent: 'orange',
					},
					{
						title: 'CMS freedom',
						description:
							'Payload CMS lets your team update pages, galleries, and menus without breaking layout.',
						icon: '🧰',
						accent: 'teal',
					},
				],
			},
			{
				type: 'cta-banner',
				title: 'Looking for a redesign or ground-up build?',
				body: 'We’ll map the customer journey, design the UI kit, and deploy production-ready infrastructure.',
				ctaLabel: 'Schedule a strategy session',
				ctaHref: '/contact',
				tone: 'primary',
			},
		],
	},
	'marketing/app-integration-development': {
		slug: 'marketing/app-integration-development',
		title: 'App & Integration Development',
		hero: {
			eyebrow: 'Marketing Solutions',
			headline: 'Automate the busywork so your team can create.',
			subheadline:
				'Custom dashboards, booking flows, and API bridges that connect your CRM, POS, and marketing stack without duct tape.',
			ctaPrimary: {
				label: 'Talk integrations',
				href: '/contact',
				tone: 'teal',
			},
		},
		sections: [
			{
				type: 'feature-grid',
				title: 'Popular builds',
				items: [
					{
						title: 'Client portals',
						description:
							'Share proofs, invoices, and project updates in one branded experience.',
						icon: '🗂️',
						accent: 'orange',
					},
					{
						title: 'POS + booking sync',
						description:
							'Link Square, GlossGenius, Mindbody, or Shopify with custom automations.',
						icon: '🔁',
						accent: 'teal',
					},
					{
						title: 'Content pipelines',
						description:
							'Automate reels, lookbooks, or blog posts to publish directly from shoots.',
						icon: '🚀',
						accent: 'pink',
					},
				],
			},
		],
	},
	'visual-media': {
		slug: 'visual-media',
		title: 'Visual Media Solutions',
		hero: {
			eyebrow: 'Visual Media',
			headline: 'Capture the essence of your brand in motion and still.',
			subheadline:
				'Photography and videography campaigns engineered for lifestyle products, experiences, and culture-led brands.',
			ctaPrimary: {
				label: 'Photography services',
				href: '/visual-media/photography',
				tone: 'pink',
			},
			ctaSecondary: {
				label: 'Videography services',
				href: '/visual-media/videography',
				tone: 'orange',
			},
		},
		sections: [
			{
				type: 'copy',
				title: 'Full-cycle production',
				body: [
					'From moodboards and shot lists to final edits, we manage every detail while keeping the vibe collaborative and fun.',
					'Need monthly content drops? We’ll build a consistent capture cadence that keeps your feeds and ads fresh.',
				],
				accent: 'pink',
			},
		],
	},
	'visual-media/photography': {
		slug: 'visual-media/photography',
		title: 'Photography',
		hero: {
			eyebrow: 'Visual Media',
			headline: 'Editorial-quality imagery that tells your story at a glance.',
			subheadline:
				'Brand, product, lifestyle, and event photography crafted to showcase your team, space, and experience.',
			ctaPrimary: {
				label: 'Book a photography shoot',
				href: '/contact',
				tone: 'pink',
			},
		},
		sections: [
			{
				type: 'feature-grid',
				title: 'Capture what matters most',
				items: [
					{
						title: 'Signature sessions',
						description:
							'Perfect for new product drops, menu refreshes, or seasonal campaigns.',
						icon: '📸',
						accent: 'pink',
					},
					{
						title: 'Team & culture',
						description:
							'Showcase the personalities that make your studio unforgettable.',
						icon: '🤝',
						accent: 'teal',
					},
					{
						title: 'Spaces & interiors',
						description:
							'Highlight architectural details, ambiance, and design intent for hospitality spaces.',
						icon: '🏙️',
						accent: 'orange',
					},
				],
			},
		],
	},
	'visual-media/videography': {
		slug: 'visual-media/videography',
		title: 'Videography',
		hero: {
			eyebrow: 'Visual Media',
			headline: 'Dynamic, cinematic storytelling—short form or long.',
			subheadline:
				'Brand films, docu-style stories, recap edits, and looping content tailored for socials, ads, or in-store displays.',
			ctaPrimary: {
				label: 'Plan a video concept',
				href: '/contact',
				tone: 'orange',
			},
		},
		sections: [
			{
				type: 'feature-grid',
				title: 'Video experiences',
				items: [
					{
						title: 'Launch trailers',
						description:
							'Create hype for product releases, pop-ups, or tour stops.',
						icon: '🎬',
						accent: 'orange',
					},
					{
						title: 'Story-driven mini docs',
						description:
							'Capture the heart of your community with cinematic storytelling.',
						icon: '🪄',
						accent: 'pink',
					},
					{
						title: 'Content libraries',
						description:
							'Batch shoot and deliver a month of reels and vertical clips ready to publish.',
						icon: '📱',
						accent: 'teal',
					},
				],
			},
		],
	},
	about: {
		slug: 'about',
		title: 'About Shawn Paps Media',
		hero: {
			eyebrow: 'About Us',
			headline:
				'A crew of visual storytellers and technologists with studio roots.',
			subheadline:
				'We speak creative, hospitality, and tech. Expect collaborative builds, intentional visuals, and reliable support post-launch.',
		},
		sections: [
			{
				type: 'copy',
				title: 'Why we exist',
				body: [
					'Shawn Paps Media was born inside creative studios and independent venues. We saw how hard it was to find a partner who could shoot campaigns *and* build the tech to support them.',
					'Today we blend direction, production, and code to help ambitious brands show up with confidence across every channel.',
				],
				accent: 'teal',
			},
			{
				type: 'feature-grid',
				title: 'Values we live by',
				items: [
					{
						title: 'Create cinematic experiences',
						description:
							'Every project should feel like your highlight reel—immersive, bold, and intentional.',
						icon: '🌠',
						accent: 'pink',
					},
					{
						title: 'Design with empathy',
						description:
							'We build with your team and customers in mind, making complex systems feel effortless.',
						icon: '💫',
						accent: 'teal',
					},
					{
						title: 'Iterate together',
						description:
							'Projects are collaborative labs. We prototype, test, and evolve alongside your team.',
						icon: '🧪',
						accent: 'orange',
					},
				],
			},
		],
	},
	contact: {
		slug: 'contact',
		title: 'Contact',
		hero: {
			eyebrow: 'Contact',
			headline: 'Let’s build your next flagship experience.',
			subheadline:
				'Share a few details and we’ll curate a plan that fits your vibe, goals, and budget.',
		},
		sections: [
			{
				type: 'copy',
				title: 'What to expect',
				body: [
					'We’ll respond within two business days, with a tailored next step—discovery call, studio tour, or quote.',
					'Need to move fast? Call or text us at (313) 555-0152 after submitting the form.',
				],
				accent: 'pink',
			},
		],
	},
};

export const fallbackServiceCategories: ServiceCategoryContent[] = [
	{
		slug: 'marketing',
		title: 'Marketing Solutions',
		description:
			'Strategy, design, and engineering for digital products and growth-ready brands.',
		accent: 'orange',
		services: [
			{
				slug: 'marketing/website-development',
				title: 'Website development',
				summary:
					'Astro.js sites powered by Payload CMS, built for conversions and storytelling.',
				icon: '🖥️',
				accent: 'orange',
			},
			{
				slug: 'marketing/app-integration-development',
				title: 'App & integration development',
				summary:
					'API integrations, custom dashboards, and operational tooling that keep the studio running 24/7.',
				icon: '🔌',
				accent: 'teal',
			},
		],
	},
	{
		slug: 'visual-media',
		title: 'Visual Media',
		description:
			'Immersive photography and video experiences for hospitality and creative culture.',
		accent: 'pink',
		services: [
			{
				slug: 'visual-media/photography',
				title: 'Photography',
				summary:
					'Editorial and lifestyle imagery for product drops, team culture, events, and interiors.',
				icon: '📸',
				accent: 'pink',
			},
			{
				slug: 'visual-media/videography',
				title: 'Videography',
				summary:
					'Cinematic storytelling, recap edits, and vertical content libraries ready for socials.',
				icon: '🎬',
				accent: 'orange',
			},
		],
	},
];
