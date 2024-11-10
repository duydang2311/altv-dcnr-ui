<script lang="ts">
    import { setRuntime } from '$lib/contexts/runtime';
    import Router from '$lib/router.svelte';
    import { createMessaging } from '$lib/services/messaging';
    import { onMount } from 'svelte';

    setRuntime({
        messaging: createMessaging(),
    });

    onMount(() => {
        alt.on('router.mount', Router.mount);
        alt.on('router.unmount', Router.unmount);
        Router.mount('sign_in');
        return () => {
            alt.off('router.mount', Router.mount);
            alt.off('router.unmount', Router.unmount);
        };
    });
</script>

{#each Object.entries(Router.routes) as [route, value] (route)}
    {#await value.lazyComponent then Component}
        <div class="fixed max-w-screen max-h-screen overflow-visible">
            <Component {...value.props} />
        </div>
    {/await}
{/each}
