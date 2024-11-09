<script lang="ts">
	import { ripple } from "svelte-ripple-action";
	import type { HTMLButtonAttributes } from "svelte/elements";

    interface Props extends HTMLButtonAttributes
    {
        variant?: 'base' | 'primary';
    }

    const { children, variant = 'base', ...props }: Props = $props();
</script>

<button
    {...props}
    class="c-button c-button--{variant} {props.class}"
    use:ripple={{ color: `var(--theme-${variant}-ripple)` }}
>
    {@render children?.()}
</button>
