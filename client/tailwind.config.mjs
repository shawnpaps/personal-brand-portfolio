/**
 * ⚠️ DEPRECATED - This file is NOT used in Tailwind CSS v4!
 *
 * This project uses Tailwind CSS v4, which uses CSS-based configuration.
 * All theme customization (colors, animations, fonts) must be done in:
 *
 *   → src/styles/global.css
 *
 * Use the @theme directive to define custom properties:
 *
 *   @theme {
 *     --color-your-color: #hex;
 *     --animate-your-animation: yourAnimation 1s ease;
 *   }
 *
 * See docs/TAILWIND_V4_CONFIG.md for complete migration guide.
 *
 * This file is kept for reference only and will be removed in the future.
 */

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				// Deep blacks
				"black-deep": "#000000",
				"black-soft": "#0a0a0a",
				"black-card": "#0f0f0f",
				"black-elevated": "#1a1a1a",

				// Rust orange - primary accent
				rust: {
					50: "#fff4ed",
					100: "#ffe6d5",
					200: "#ffc9aa",
					300: "#ffa374",
					400: "#ff7a3c",
					500: "#ff6b35", // Primary
					600: "#f04c1c",
					700: "#d93a13",
					800: "#b22f15",
					900: "#8f2816",
				},

				// Rust aliases for easier usage
				"rust-orange": "#d4512a", // Primary brand color
				"rust-light": "#e86942", // Lighter variant for hovers

				// Neutral grays
				concrete: {
					50: "#fafafa",
					100: "#f5f5f5",
					200: "#e5e5e5",
					300: "#d4d4d4",
					400: "#a3a3a3",
					500: "#737373",
					600: "#525252",
					700: "#404040",
					800: "#262626",
					850: "#1f1f1f",
					900: "#171717",
					950: "#0a0a0a",
				},

				// Concrete aliases
				"concrete-light": "#525252", // concrete-600

				// Steel grays for text
				steel: {
					100: "#f3f4f6",
					200: "#e5e7eb",
					300: "#d1d5db",
					400: "#9ca3af",
					500: "#6b7280",
					600: "#4b5563",
					700: "#374151",
					800: "#1f2937",
				},

				// Steel aliases
				"steel-light": "#9ca3af", // steel-400
			},

			fontFamily: {
				sans: [
					"Inter",
					"system-ui",
					"-apple-system",
					"BlinkMacSystemFont",
					"Segoe UI",
					"sans-serif",
				],
			},

			animation: {
				"fade-in": "fadeIn 0.8s ease-out",
				"fade-in-up": "fadeInUp 0.8s ease-out",
				"fade-in-down": "fadeInDown 0.8s ease-out",
				"glow-pulse": "glowPulse 4s ease-in-out infinite",
				"glow-pulse-fast": "glowPulse 2s ease-in-out infinite",
				float: "float 6s ease-in-out infinite",
				"float-slow": "float 8s ease-in-out infinite",
				shimmer: "shimmer 2.5s linear infinite",
			},

			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				fadeInUp: {
					"0%": { opacity: "0", transform: "translateY(30px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				fadeInDown: {
					"0%": { opacity: "0", transform: "translateY(-30px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				glowPulse: {
					"0%, 100%": { opacity: "0.4" },
					"50%": { opacity: "0.6" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-20px)" },
				},
				shimmer: {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(200%)" },
				},
			},
		},
	},
	plugins: [],
};
