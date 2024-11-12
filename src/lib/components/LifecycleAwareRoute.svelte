<script lang="ts">
    import { useRuntime } from '$lib/contexts/runtime';
    import { onMount, type Snippet } from 'svelte';

    const { route, children }: { route: string; children: Snippet } = $props();
    const { messaging } = useRuntime();

    onMount(() => {
        messaging.emit('router.mount', route, true);
        return () => {
            messaging.emit('router.unmount', route, true);
        };
    });
</script>

{@render children()}
