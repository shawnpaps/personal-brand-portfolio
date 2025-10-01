import path from 'path';
import { buildConfig } from 'payload/config';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { seoPlugin } from '@payloadcms/plugin-seo';

import Users from './src/collections/Users';
import Media from './src/collections/Media';
import ServiceCategories from './src/collections/ServiceCategories';
import Services from './src/collections/Services';
import Pages from './src/collections/Pages';
import ContactSubmissions from './src/collections/ContactSubmissions';
import SiteSettings from './src/globals/SiteSettings';

const serverURL =
	process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001';
const siteURL = process.env.PAYLOAD_PUBLIC_SITE_URL || 'http://localhost:4321';
const databasePath =
	process.env.PAYLOAD_DATABASE_PATH || './storage/database.sqlite';

export default buildConfig({
	serverURL,
	cors: [siteURL],
	csrf: [siteURL],
	admin: {
		user: Users.slug,
		meta: {
			titleSuffix: ' | Shawn Paps Media CMS',
		},
		components: {
			beforeDashboard: [],
		},
	},
	collections: [
		Users,
		Media,
		ServiceCategories,
		Services,
		Pages,
		ContactSubmissions,
	],
	globals: [SiteSettings],
	graphQL: {
		schemaOutputFile: path.resolve(__dirname, './generated-schema.graphql'),
	},
	typescript: {
		outputFile: path.resolve(__dirname, './payload-types.ts'),
	},
	plugins: [
		seoPlugin({
			collections: ['pages'],
			uploadsCollection: 'media',
		}),
	],
	db: sqliteAdapter({
		filename: path.resolve(__dirname, databasePath),
	}),
});
