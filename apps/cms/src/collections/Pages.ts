import type { CollectionConfig } from 'payload/types';
import { lexicalRichTextField } from '@payloadcms/richtext-lexical';

const Pages: CollectionConfig = {
	slug: 'pages',
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'slug', 'status'],
	},
	versions: {
		drafts: true,
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
		},
		{
			name: 'slug',
			type: 'text',
			required: true,
			unique: true,
		},
		{
			name: 'status',
			type: 'select',
			defaultValue: 'draft',
			options: [
				{
					label: 'Draft',
					value: 'draft',
				},
				{
					label: 'Published',
					value: 'published',
				},
			],
		},
		{
			name: 'hero',
			type: 'group',
			fields: [
				{
					name: 'eyebrow',
					type: 'text',
				},
				{
					name: 'headline',
					type: 'text',
					required: true,
				},
				{
					name: 'subheadline',
					type: 'textarea',
				},
				{
					name: 'ctaLabel',
					type: 'text',
				},
				{
					name: 'ctaHref',
					type: 'text',
				},
				{
					name: 'backgroundMedia',
					type: 'upload',
					relationTo: 'media',
				},
			],
		},
		{
			name: 'seo',
			type: 'group',
			fields: [
				{
					name: 'metaTitle',
					type: 'text',
				},
				{
					name: 'metaDescription',
					type: 'textarea',
				},
			],
		},
		{
			name: 'category',
			type: 'relationship',
			relationTo: 'service-categories',
		},
		{
			name: 'layout',
			type: 'blocks',
			minRows: 1,
			blocks: [
				{
					slug: 'rich-text-section',
					labels: {
						singular: 'Rich text',
						plural: 'Rich text sections',
					},
					fields: [
						lexicalRichTextField({
							name: 'content',
							label: 'Body content',
							required: true,
						}),
					],
				},
				{
					slug: 'feature-grid',
					labels: {
						singular: 'Feature grid',
						plural: 'Feature grids',
					},
					fields: [
						{
							name: 'title',
							type: 'text',
						},
						{
							name: 'features',
							type: 'array',
							minRows: 1,
							fields: [
								{
									name: 'icon',
									type: 'text',
								},
								{
									name: 'heading',
									type: 'text',
									required: true,
								},
								{
									name: 'description',
									type: 'textarea',
									required: true,
								},
							],
						},
					],
				},
				{
					slug: 'cta-banner',
					labels: {
						singular: 'CTA banner',
						plural: 'CTA banners',
					},
					fields: [
						{
							name: 'heading',
							type: 'text',
							required: true,
						},
						{
							name: 'body',
							type: 'textarea',
						},
						{
							name: 'ctaLabel',
							type: 'text',
						},
						{
							name: 'ctaHref',
							type: 'text',
						},
					],
				},
			],
		},
	],
};

export default Pages;
