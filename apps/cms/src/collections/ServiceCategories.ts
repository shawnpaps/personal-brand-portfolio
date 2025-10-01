import type { CollectionConfig } from 'payload/types';

const ServiceCategories: CollectionConfig = {
	slug: 'service-categories',
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'slug', 'displayOrder'],
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
			name: 'displayOrder',
			type: 'number',
			min: 0,
			defaultValue: 0,
		},
		{
			name: 'tagline',
			type: 'text',
		},
		{
			name: 'description',
			type: 'textarea',
			required: true,
		},
		{
			name: 'icon',
			label: 'Icon (emoji or short text)',
			type: 'text',
			admin: {
				description:
					'Shown in the front-end service grid to help pages read quickly.',
			},
		},
		{
			name: 'accentColor',
			type: 'text',
			admin: {
				description:
					'CSS color token for highlight elements (e.g. #F97316 or var(--amber-400)).',
			},
		},
		{
			name: 'coverImage',
			type: 'upload',
			relationTo: 'media',
		},
		{
			name: 'services',
			type: 'relationship',
			relationTo: 'services',
			hasMany: true,
		},
	],
};

export default ServiceCategories;
