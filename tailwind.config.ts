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
            fontSize: {
                xs: 'var(--font-size-xs)',
                sm: 'var(--font-size-sm)',
                base: 'var(--font-size-base)',
                lg: 'var(--font-size-lg)',
                xl: 'var(--font-size-xl)',
            },
            colors: {
                primary: {
                    DEFAULT: 'hsl(var(--theme-tw-primary) / <alpha-value>)',
                    border: 'hsl(var(--theme-tw-primary-border) / <alpha-value>)',
                    hover: 'hsl(var(--theme-tw-primary-hover) / <alpha-value>)',
                    active: 'hsl(var(--theme-tw-primary-active) / <alpha-value>)',
                    'fg-1': 'hsl(var(--theme-tw-primary-fg-1) / <alpha-value>)',
                    'fg-2': 'hsl(var(--theme-tw-primary-fg-2) / <alpha-value>)',
                    'fg-3': 'hsl(var(--theme-tw-primary-fg-3) / <alpha-value>)',
                    'fg-4': 'hsl(var(--theme-tw-primary-fg-4) / <alpha-value>)',
                    'fg-5': 'hsl(var(--theme-tw-primary-fg-5) / <alpha-value>)',
                },
                base: {
                    1: 'hsl(var(--theme-tw-base-1) / <alpha-value>)',
                    2: 'hsl(var(--theme-tw-base-2) / <alpha-value>)',
                    3: 'hsl(var(--theme-tw-base-3) / <alpha-value>)',
                    4: 'hsl(var(--theme-tw-base-4) / <alpha-value>)',
                    5: 'hsl(var(--theme-tw-base-5) / <alpha-value>)',
                    border: 'hsl(var(--theme-tw-base-border) / <alpha-value>)',
                    hover: 'hsl(var(--theme-tw-base-hover) / <alpha-value>)',
                    active: 'hsl(var(--theme-tw-base-active) / <alpha-value>)',
                    'fg-1': 'hsl(var(--theme-tw-base-fg-1) / <alpha-value>)',
                    'fg-2': 'hsl(var(--theme-tw-base-fg-2) / <alpha-value>)',
                    'fg-3': 'hsl(var(--theme-tw-base-fg-3) / <alpha-value>)',
                    'fg-4': 'hsl(var(--theme-tw-base-fg-4) / <alpha-value>)',
                    'fg-5': 'hsl(var(--theme-tw-base-fg-5) / <alpha-value>)',
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
