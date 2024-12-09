<script lang="ts">
    import { useRuntime } from '$lib/contexts/runtime';
    import { pageZoom, tsap } from '$lib/utils/transitions';
    import { onMount } from 'svelte';

    let { durationSeconds }: { durationSeconds: number } = $props();
    const { router } = useRuntime();

    onMount(() => {
        const interval = setInterval(() => {
            if (--durationSeconds < 0) {
                router.unmount('pursuit_countdown');
                clearInterval(interval);
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    });
</script>

<div
    in:tsap={pageZoom.in()}
    out:tsap|global={pageZoom.out()}
    class="fixed left-1/2 -translate-x-1/2 bottom-2"
>
    <p class="font-number text-2xl text-base-fg-1/40">
        Game starting in
        <span class="inline-block px-0.5 text-center text-base-fg-1/80">
            {durationSeconds}
        </span>
        seconds
    </p>
</div>
