import type { Config } from 'tailwindcss';
import tailwindcssMotion from 'tailwindcss-motion';

export default {
	content: ['./src/**/*.svelte'],
	theme: {
		extend: {
			fontFamily: {
				body: 'var(--font-family-body)',
				title: 'var(--font-family-title)',
			},
			colors: {
				primary: {
					DEFAULT: 'hsl(var(--theme-tw-primary) / <alpha-value>)',
					border: 'hsl(var(--theme-tw-primary-border) / <alpha-value>)',
					hover: 'hsl(var(--theme-tw-primary-hover) / <alpha-value>)',
					active: 'hsl(var(--theme-tw-primary-active) / <alpha-value>)',
					fg: 'hsl(var(--theme-tw-primary-fg) / <alpha-value>)',
				},
				base: {
					DEFAULT: 'hsl(var(--theme-tw-base) / <alpha-value>)',
					border: 'hsl(var(--theme-tw-base-border) / <alpha-value>)',
					hover: 'hsl(var(--theme-tw-base-hover) / <alpha-value>)',
					active: 'hsl(var(--theme-tw-base-active) / <alpha-value>)',
					fg: 'hsl(var(--theme-tw-base-fg) / <alpha-value>)',
					'fg-2': 'hsl(var(--theme-tw-base-fg-2) / <alpha-value>)',
					'fg-3': 'hsl(var(--theme-tw-base-fg-3) / <alpha-value>)',
				},
			},
			animation: {
				aurora: 'aurora 120s linear infinite',
			},
			keyframes: {
				aurora: {
					from: {
						backgroundPosition: '50% 50%, 50% 50%',
					},
					to: {
						backgroundPosition: '350% 50%, 350% 50%',
					},
				},
			},
		},
	},
	plugins: [tailwindcssMotion],
	corePlugins: {
		preflight: false,
	},
} satisfies Config;
