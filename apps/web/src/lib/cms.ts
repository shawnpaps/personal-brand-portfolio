import {
	fallbackPages,
	fallbackServiceCategories,
} from '@/content/fallbackPages';
import type {
	FeatureItem,
	Hero,
	PageContent,
	PageSection,
	ServiceCategoryContent,
	ServiceSummary,
} from '@/lib/types';
import { defaultNavigation } from '@/lib/navigation';

const FALLBACK_SITE_SETTINGS = {
	brandName: 'Shawn Paps Media',
	tagline: 'Visual media and digital experiences for creative brands.',
	primaryNav: defaultNavigation,
	socialLinks: [],
};

type PayloadPageDoc = Record<string, unknown>;
type PayloadServiceCategoryDoc = Record<string, unknown>;

type FetchOptions = {
	depth?: number;
	draft?: boolean;
};

export const getCMSBaseUrl = () =>
	import.meta.env.PAYLOAD_API_URL ?? 'http://localhost:3001';

const getJSON = async <T>(
	pathname: string,
	{ depth = 2, draft = false }: FetchOptions = {}
): Promise<T | null> => {
	try {
		const base = getCMSBaseUrl();
		const url = new URL(pathname, base);
		if (depth !== undefined) {
			url.searchParams.set('depth', String(depth));
		}
		if (!draft) {
			url.searchParams.set('draft', 'false');
		}

		const response = await fetch(url.toString(), {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			console.warn(
				`CMS request failed: ${response.status} ${response.statusText}`
			);
			return null;
		}

		return (await response.json()) as T;
	} catch (error) {
		console.warn('CMS request error', error);
		return null;
	}
};

const lexicalToParagraphs = (content: any): string[] => {
	if (!content) return [];

	const traverse = (node: any): string[] => {
		if (!node) return [];
		if (node.type === 'paragraph') {
			const text = Array.isArray(node.children)
				? node.children
						.map((child: any) => {
							if (child.type === 'text') return child.text ?? '';
							if (child.type === 'linebreak') return '\n';
							return ''; // ignore other node types for now
						})
						.join('')
						.trim()
				: '';

			return text ? [text] : [];
		}

		if (Array.isArray(node.children)) {
			return node.children.flatMap((child: any) => traverse(child));
		}

		return [];
	};

	if (content.root) {
		return traverse(content.root);
	}

	return [];
};

const mapHero = (doc: PayloadPageDoc): Hero => {
	const hero = (doc.hero ?? {}) as Record<string, any>;
	const media = hero.backgroundMedia as Record<string, any> | undefined;

	return {
		eyebrow: hero.eyebrow ?? undefined,
		headline: hero.headline ?? (doc.title as string) ?? 'Untitled Page',
		subheadline: hero.subheadline ?? undefined,
		ctaPrimary: hero.ctaLabel
			? {
					label: hero.ctaLabel,
					href: hero.ctaHref ?? '/contact',
					tone: 'primary',
				}
			: undefined,
		media:
			media && media.url
				? {
						type: 'image',
						url: media.url as string,
						alt: media.altText ?? media.filename ?? hero.headline,
					}
				: undefined,
	};
};

const mapBlockToSection = (block: Record<string, any>): PageSection | null => {
	switch (block.blockType) {
		case 'rich-text-section': {
			return {
				type: 'copy',
				title: block.heading ?? undefined,
				body: lexicalToParagraphs(block.content),
				accent: 'teal',
			};
		}
		case 'feature-grid': {
			const items: FeatureItem[] = Array.isArray(block.features)
				? block.features.map((feature: any) => ({
						title: feature.heading ?? 'Untitled feature',
						description: feature.description ?? '',
						icon: feature.icon ?? undefined,
					}))
				: [];

			return {
				type: 'feature-grid',
				title: block.title ?? block.heading ?? undefined,
				intro: block.tagline ?? undefined,
				items,
			};
		}
		case 'cta-banner': {
			return {
				type: 'cta-banner',
				title: block.heading ?? 'Ready to get started?',
				body: block.body ?? undefined,
				ctaLabel: block.ctaLabel ?? undefined,
				ctaHref: block.ctaHref ?? undefined,
				tone: 'primary',
			};
		}
		default:
			return null;
	}
};

const mapPageDoc = (doc: PayloadPageDoc): PageContent => {
	const layout = Array.isArray(doc.layout) ? doc.layout : [];
	const sections = layout
		.map((block) => mapBlockToSection(block as Record<string, any>))
		.filter((section): section is PageSection => Boolean(section));

	return {
		slug: (doc.slug as string) ?? '',
		title: (doc.title as string) ?? 'Untitled Page',
		category: (doc.category as Record<string, any> | undefined)?.slug,
		hero: mapHero(doc),
		sections:
			sections.length > 0
				? sections
				: (fallbackPages[doc.slug as string]?.sections ?? []),
		seo: doc.seo as PageContent['seo'],
	};
};

const mapServiceSummary = (service: Record<string, any>): ServiceSummary => ({
	slug: (service.slug as string) ?? '',
	title: (service.title as string) ?? 'New service',
	summary: (service.summary as string) ?? '',
	icon: service.icon ?? undefined,
	accent: 'teal',
});

const mapServiceCategoryDoc = (
	doc: PayloadServiceCategoryDoc
): ServiceCategoryContent => ({
	slug: (doc.slug as string) ?? '',
	title: (doc.title as string) ?? 'New category',
	description: (doc.description as string) ?? '',
	accent: 'orange',
	services: Array.isArray(doc.services)
		? doc.services.map((service) =>
				mapServiceSummary((service as Record<string, any>) ?? {})
			)
		: [],
});

export const loadPageContent = async (
	slug: string
): Promise<PageContent | null> => {
	try {
		const base = getCMSBaseUrl();
		const url = new URL('/api/pages', base);
		url.searchParams.set('where[slug][equals]', slug);
		url.searchParams.set('depth', '2');
		url.searchParams.set('limit', '1');
		url.searchParams.set('draft', 'false');

		const response = await fetch(url.toString(), {
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			const data = (await response.json()) as { docs?: PayloadPageDoc[] };
			if (data.docs?.length) {
				return mapPageDoc(data.docs[0]);
			}
		}
	} catch (error) {
		console.warn('Failed to load page content from Payload', error);
	}

	return fallbackPages[slug] ?? null;
};

export const loadSiteSettings = async () => {
	const cmsSettings = await getJSON<Record<string, any>>(
		'/api/globals/site-settings'
	);
	if (!cmsSettings) return FALLBACK_SITE_SETTINGS;

	return {
		brandName: cmsSettings.brandName ?? FALLBACK_SITE_SETTINGS.brandName,
		tagline: cmsSettings.tagline ?? FALLBACK_SITE_SETTINGS.tagline,
		primaryNav:
			Array.isArray(cmsSettings.primaryNav) && cmsSettings.primaryNav.length > 0
				? cmsSettings.primaryNav
				: defaultNavigation,
		socialLinks: cmsSettings.socialLinks ?? FALLBACK_SITE_SETTINGS.socialLinks,
	};
};

export const loadServiceCategories = async (): Promise<
	ServiceCategoryContent[]
> => {
	const cmsResponse = await getJSON<{ docs: PayloadServiceCategoryDoc[] }>(
		`/api/service-categories`,
		{ depth: 3 }
	);
	if (cmsResponse?.docs?.length) {
		return cmsResponse.docs.map((doc) => mapServiceCategoryDoc(doc));
	}

	return fallbackServiceCategories;
};

export const listRoutableSlugs = (): string[] => Object.keys(fallbackPages);
