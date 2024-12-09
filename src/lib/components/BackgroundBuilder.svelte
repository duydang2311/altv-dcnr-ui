<script lang="ts">
    import type { BackgroundType } from '$lib/services/background.svelte';
    import { type Snippet } from 'svelte';
    import AuroraGradient from './AuroraGradient.svelte';
    import { tsap } from '$lib/utils/transitions';

    interface Props {
        types: BackgroundType[];
    }

    const { types }: Props = $props();

    const snippets: Record<BackgroundType, Snippet> = {
        'gradient-1': gradient1,
    };
</script>

{#each types as type (type)}
    <div
        in:tsap={(node, gsap) =>
            gsap.from(node, { opacity: 0, duration: 0.4, ease: 'circ.out' })}
        out:tsap={(node, gsap) =>
            gsap.to(node, {
                opacity: 0,
                duration: 0.4,
                ease: 'circ.out',
            })}
        class="fixed"
    >
        {@render snippets[type]()}
    </div>
{/each}

{#snippet gradient1()}
    <div class="fixed inset-0 bg-black/80"></div>
    <div class="fixed inset-0 bg-primary-active/20"></div>
    <AuroraGradient />
    <div class="fixed inset-0 bg-black/40"></div>
{/snippet}
