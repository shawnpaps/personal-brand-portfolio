export type AccentTone = 'pink' | 'orange' | 'teal' | 'violet' | 'gray';

export interface HeroMedia {
	type: 'image' | 'video';
	url: string;
	alt?: string;
}

export interface HeroCTA {
	label: string;
	href: string;
	tone?: AccentTone | 'primary' | 'secondary';
}

export interface Hero {
	eyebrow?: string;
	headline: string;
	subheadline?: string;
	kicker?: string;
	ctaPrimary?: HeroCTA;
	ctaSecondary?: HeroCTA;
	media?: HeroMedia;
}

export interface CopySection {
	type: 'copy';
	title?: string;
	body: string[];
	accent?: AccentTone;
}

export interface FeatureItem {
	title: string;
	description: string;
	icon?: string;
	accent?: AccentTone;
}

export interface FeatureGridSection {
	type: 'feature-grid';
	title?: string;
	intro?: string;
	items: FeatureItem[];
}

export interface CTABannerSection {
	type: 'cta-banner';
	title: string;
	body?: string;
	ctaLabel?: string;
	ctaHref?: string;
	tone?: AccentTone | 'primary';
}

export type PageSection = CopySection | FeatureGridSection | CTABannerSection;

export interface PageContent {
	slug: string;
	title: string;
	category?: string;
	hero: Hero;
	sections: PageSection[];
	seo?: {
		title?: string;
		description?: string;
	};
}

export interface ServiceSummary {
	slug: string;
	title: string;
	summary: string;
	icon?: string;
	accent?: AccentTone;
}

export interface ServiceCategoryContent {
	slug: string;
	title: string;
	description: string;
	accent?: AccentTone;
	services: ServiceSummary[];
	hero?: Hero;
}
