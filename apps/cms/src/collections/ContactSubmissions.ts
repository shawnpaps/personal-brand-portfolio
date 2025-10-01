import type { CollectionConfig, PayloadRequest } from 'payload/types';

const isAuthenticated = ({ req }: { req: PayloadRequest }) =>
	Boolean(req?.user);

const ContactSubmissions: CollectionConfig = {
	slug: 'contact-submissions',
	admin: {
		useAsTitle: 'name',
		defaultColumns: ['name', 'email', 'createdAt'],
	},
	access: {
		read: isAuthenticated,
		create: () => true,
		update: isAuthenticated,
		delete: isAuthenticated,
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			required: true,
		},
		{
			name: 'email',
			type: 'email',
			required: true,
		},
		{
			name: 'company',
			type: 'text',
		},
		{
			name: 'phone',
			type: 'text',
		},
		{
			name: 'serviceInterest',
			type: 'select',
			hasMany: true,
			options: [
				{ label: 'Website development', value: 'website-development' },
				{ label: 'App & integrations', value: 'app-integration' },
				{ label: 'Photography', value: 'photography' },
				{ label: 'Videography', value: 'videography' },
				{ label: 'Brand strategy', value: 'brand-strategy' },
				{ label: 'IT support', value: 'it-support' },
			],
		},
		{
			name: 'budgetRange',
			type: 'select',
			options: [
				{ label: 'Under $2k', value: 'under-2k' },
				{ label: '$2k - $5k', value: '2-5k' },
				{ label: '$5k - $10k', value: '5-10k' },
				{ label: '$10k+', value: '10k-plus' },
			],
		},
		{
			name: 'timeline',
			type: 'text',
		},
		{
			name: 'message',
			type: 'textarea',
			required: true,
		},
		{
			name: 'subscribe',
			type: 'checkbox',
			label: 'Opt-in to studio updates',
		},
	],
};

export default ContactSubmissions;
