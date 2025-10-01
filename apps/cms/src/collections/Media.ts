import path from 'path';
import type { CollectionConfig } from 'payload/types';

const Media: CollectionConfig = {
	slug: 'media',
	access: {
		read: () => true,
	},
	admin: {
		defaultColumns: ['filename', 'mimeType', 'filesize'],
	},
	upload: {
		staticDir: path.resolve(__dirname, '../../storage/media'),
		staticURL: '/media',
		imageSizes: [
			{
				name: 'hero',
				width: 1920,
				height: 1080,
				fit: 'cover',
			},
			{
				name: 'card',
				width: 1280,
				height: 720,
				fit: 'cover',
			},
			{
				name: 'thumb',
				width: 480,
				height: 480,
				fit: 'cover',
			},
		],
		adminThumbnail: 'thumb',
	},
	fields: [
		{
			name: 'altText',
			type: 'text',
			required: true,
			label: 'Accessible description',
		},
		{
			name: 'attribution',
			type: 'text',
			admin: {
				description: 'Optional credit line or shoot details for this asset',
			},
		},
	],
};

export default Media;
