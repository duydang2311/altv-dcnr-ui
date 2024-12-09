<script lang="ts">
    import { useRuntime } from '$lib/contexts/runtime';
    import { pageZoom, tsap } from '$lib/utils/transitions';
    import GamemodeCard from './GamemodeCard.svelte';
    import Pursuit from './Pursuit.svelte';

    type Gamemode = 'pursuit' | 'freeroam' | 'shooting';

    const { router, background, shortcut } = useRuntime();

    background.use('gradient-1');

    shortcut('escape', () => {
        if (gamemode != null) {
            gamemode = null;
        } else {
            router.unmount('gamemode_selection');
        }
    });

    let gamemode = $state.raw<Gamemode | null>(null);
</script>

<div
    class="fixed inset-0"
    in:tsap={pageZoom.in()}
    out:tsap|global={pageZoom.out()}
>
    {#if gamemode == null}
        <div
            in:tsap={pageZoom.in()}
            out:tsap={pageZoom.out()}
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
            in:tsap={pageZoom.in()}
            out:tsap={pageZoom.out()}
            class="fixed size-full"
        >
            <Pursuit />
        </div>
    {/if}
</div>
