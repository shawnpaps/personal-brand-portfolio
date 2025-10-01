import type { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
	slug: 'users',
	auth: true,
	admin: {
		useAsTitle: 'fullName',
		defaultColumns: ['fullName', 'email', 'role'],
	},
	access: {
		read: () => false,
	},
	fields: [
		{
			name: 'fullName',
			type: 'text',
			required: true,
		},
		{
			name: 'role',
			type: 'select',
			options: [
				{
					label: 'Administrator',
					value: 'admin',
				},
				{
					label: 'Editor',
					value: 'editor',
				},
			],
			defaultValue: 'admin',
		},
	],
};

export default Users;
