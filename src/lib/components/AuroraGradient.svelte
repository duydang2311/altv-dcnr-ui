<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils/styles';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		showRadialGradient?: boolean;
	}

	const { showRadialGradient, ...props }: Props = $props();
</script>

<div class={cn('fixed inset-0 overflow-hidden', props.class)} {...props}>
	<div
		class={cn(
			`[--gradient:repeating-linear-gradient(100deg,var(--theme-primary)_0%,transparent_7%,var(--theme-primary-2)_10%,transparent_12%,transparent_16%)]
[--aurora:repeating-linear-gradient(100deg,transparent_10%,var(--theme-primary-2)_15%,transparent_20%,transparent_25%,var(--theme-primary)_30%)]
[background-image:var(--gradient),var(--aurora)]
[background-size:300%,_200%]
[background-position:50%_50%,50%_50%]
filter blur-[20px] dark:invert-0
after:content-[""] after:absolute after:inset-0 after:[background-image:var(--gradient),var(--aurora)]
after:[background-size:200%,_100%]
after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
pointer-events-none
absolute -inset-[10px] opacity-10 will-change-transform`,
			showRadialGradient &&
				'[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]',
		)}
	></div>
</div>
