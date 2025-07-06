// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	site: 'https://shawnpapsmedia.com', // Replace with your actual domain
	integrations: [react()],
	adapter: netlify(),
	vite: {
		plugins: [tailwindcss()],
	},
});
