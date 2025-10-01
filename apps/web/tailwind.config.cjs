/**** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				background: '#05060a',
				surface: '#0f111a',
				'surface-muted': '#171a28',
				primary: {
					50: '#f4f5ff',
					100: '#e8e9ff',
					200: '#c7cbff',
					300: '#9ba5ff',
					400: '#6473ff',
					500: '#4b59f6',
					600: '#2831d3',
					700: '#1c239c',
					800: '#151b78',
					900: '#11155d',
					DEFAULT: '#4b59f6',
				},
				accent: {
					pink: '#ff4ecd',
					orange: '#ff8a3d',
					teal: '#38f6e1',
				},
				neutral: {
					100: '#f5f7ff',
					200: '#dde1f5',
					300: '#bcc3e4',
					400: '#949eca',
					500: '#6a75a6',
					600: '#4c557c',
					700: '#333a57',
					800: '#1f2438',
					900: '#121625',
				},
			},
			fontFamily: {
				display: ['"Space Grotesk"', 'sans-serif'],
				body: ['"Inter"', 'sans-serif'],
			},
			boxShadow: {
				glow: '0 0 45px rgba(76, 85, 236, 0.35)',
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
