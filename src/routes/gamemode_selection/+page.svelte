<script lang="ts">
    import AuroraGradient from '$lib/components/AuroraGradient.svelte';
    import { tsap } from '$lib/utils/transitions';
    import GamemodeCard from './GamemodeCard.svelte';
    import Pursuit from './Pursuit.svelte';
    import { fade } from 'svelte/transition';

    type Gamemode = 'pursuit' | 'freeroam' | 'shooting';

    let gamemode = $state.raw<Gamemode | null>(null);
</script>

<div class="fixed inset-0 bg-black/80"></div>
<div class="fixed inset-0 bg-primary-active/20"></div>
<AuroraGradient />
<div class="fixed inset-0 bg-black/40"></div>
{#if gamemode == null}
    <div
        out:tsap={(node, gsap) =>
            gsap.to(node, { left: '-100%', duration: 0.6, ease: 'circ.inOut' })}
        class="fixed flex size-full p-20"
    >
        <GamemodeCard
            src="https://images.hdqwalls.com/download/chase-by-police-4k-wv-2880x1800.jpg"
            text="Pursuit"
            onClick={() => {
                gamemode = 'pursuit';
            }}
        />
        <GamemodeCard
            src="https://images4.alphacoders.com/573/573742.jpg"
            text="Freeroam"
            onClick={() => {
                gamemode = 'freeroam';
            }}
        />
        <GamemodeCard
            src="https://images2.alphacoders.com/714/714122.png"
            text="Shooting"
            onClick={() => {
                gamemode = 'shooting';
            }}
        />
    </div>
{:else if gamemode === 'pursuit'}
    <div
        in:tsap={(node, gsap) =>
            gsap.from(node, {
                left: '100%',
                duration: 0.6,
                ease: 'circ.inOut',
            })}
        class="fixed size-full"
    >
        <Pursuit />
    </div>
{/if}
