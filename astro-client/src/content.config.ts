import { defineCollection, z } from 'astro:content';

const caseStudies = defineCollection({
	type: 'content',
	// All markdown/mdx in src/content/case-studies will be validated by this:
	schema: z.object({
		title: z.string(),
		date: z.string().transform((s) => new Date(s)),
		excerpt: z.string().max(280),
		client: z.string().optional(),
		services: z.array(z.string()).default([]),
		coverImage: z.string().optional(), // e.g. "/images/foo.jpg"
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
		// add anything else you want to query against
	}),
});

export const collections = { caseStudies };
