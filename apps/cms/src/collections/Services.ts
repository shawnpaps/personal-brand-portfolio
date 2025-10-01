import type { CollectionConfig } from 'payload/types';
import { lexicalRichTextField } from '@payloadcms/richtext-lexical';

const Services: CollectionConfig = {
	slug: 'services',
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'category', 'slug'],
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
			name: 'category',
			type: 'relationship',
			relationTo: 'service-categories',
			required: true,
		},
		{
			name: 'summary',
			type: 'textarea',
			required: true,
		},
		lexicalRichTextField({
			name: 'body',
			label: 'Detailed description',
			required: true,
			admin: {
				elements: ['h2', 'h3', 'h4', 'ul', 'ol', 'link', 'quote'],
			},
		}),
		{
			name: 'featuredMedia',
			type: 'upload',
			relationTo: 'media',
		},
		{
			name: 'ctaLabel',
			type: 'text',
			admin: {
				description:
					'Optional label for call-to-action buttons rendered on the web app.',
			},
		},
		{
			name: 'ctaLink',
			type: 'text',
			admin: {
				description:
					'Relative or absolute URL for the CTA. Defaults to the contact page when omitted.',
			},
		},
	],
};

export default Services;
