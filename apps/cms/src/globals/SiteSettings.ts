import type { GlobalConfig, PayloadRequest } from 'payload/types';

const isAuthenticated = ({ req }: { req: PayloadRequest }) =>
	Boolean(req?.user);

const SiteSettings: GlobalConfig = {
	slug: 'site-settings',
	access: {
		read: () => true,
		update: isAuthenticated,
	},
	fields: [
		{
			name: 'brandName',
			type: 'text',
			required: true,
			defaultValue: 'Shawn Paps Media',
		},
		{
			name: 'tagline',
			type: 'text',
			defaultValue:
				'Visual storytelling & digital experiences for vibrant brands.',
		},
		{
			name: 'primaryNav',
			type: 'array',
			minRows: 1,
			fields: [
				{
					name: 'label',
					type: 'text',
					required: true,
				},
				{
					name: 'href',
					type: 'text',
					required: true,
				},
			],
		},
		{
			name: 'socialLinks',
			type: 'array',
			fields: [
				{
					name: 'platform',
					type: 'text',
					required: true,
				},
				{
					name: 'url',
					type: 'text',
					required: true,
				},
			],
		},
		{
			name: 'contact',
			type: 'group',
			fields: [
				{
					name: 'email',
					type: 'email',
				},
				{
					name: 'phone',
					type: 'text',
				},
				{
					name: 'address',
					type: 'textarea',
				},
			],
		},
	],
};

export default SiteSettings;
