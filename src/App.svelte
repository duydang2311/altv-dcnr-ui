<script lang="ts">
    import LifecycleAwareRoute from '$lib/components/LifecycleAwareRoute.svelte';
    import { setRuntime } from '$lib/contexts/runtime';
    import Router, { type Route } from '$lib/router.svelte';
    import { createMessaging } from '$lib/services/messaging';
    import { onMount } from 'svelte';

    setRuntime({
        messaging: createMessaging(),
    });

    onMount(() => {
        const mount = (route: Route, props?: Record<string, unknown>) => {
            if (Router.routes[route] != null) {
                alt.emit('router.mount', route, false);
            } else {
                Router.mount(route, props);
            }
        };

        const unmount = (route: Route) => {
            if (Router.routes[route] == null) {
                alt.emit('router.unmount', route, false);
            } else {
                Router.unmount(route);
            }
        };

        alt.on('router.mount', mount);
        alt.on('router.unmount', unmount);
        return () => {
            alt.off('router.mount', mount);
            alt.off('router.unmount', unmount);
        };
    });
</script>

{#each Object.entries(Router.routes) as [route, value] (route)}
    {#await value.lazyComponent then Component}
        <div class="fixed max-w-screen max-h-screen overflow-visible">
            <LifecycleAwareRoute {route}>
                <Component {...value.props} />
            </LifecycleAwareRoute>
        </div>
    {/await}
{/each}
