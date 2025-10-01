import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const payloadProxyTarget =
	process.env.PAYLOAD_API_URL ?? 'http://localhost:3001';
const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	output: 'server',
	adapter: node({ mode: 'standalone' }),
	integrations: [tailwind({ applyBaseStyles: false })],
	vite: {
		resolve: {
			alias: {
				'@': path.resolve(dirname, 'src'),
			},
		},
		server: {
			proxy: {
				'/cms': {
					target: payloadProxyTarget,
					changeOrigin: true,
					rewrite: (requestPath) => requestPath.replace(/^\/cms/, '/api'),
				},
			},
		},
	},
});
