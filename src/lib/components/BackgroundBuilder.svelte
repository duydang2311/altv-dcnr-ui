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
        in:tsap|global={(node, gsap) =>
            gsap.from(node, { opacity: 0, duration: 0.2, ease: 'circ.out' })}
        out:tsap|global={(node, gsap) =>
            gsap.to(node, {
                opacity: 0,
                duration: 0.2,
                ease: 'circ',
            })}
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
