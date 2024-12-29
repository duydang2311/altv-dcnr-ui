<script lang="ts">
    import BackgroundBuilder from '$lib/components/BackgroundBuilder.svelte';
    import LifecycleAwareRoute from '$lib/components/LifecycleAwareRoute.svelte';
    import { setRuntime } from '$lib/contexts/runtime';
    import { createRouter, type Route } from '$lib/services/router.svelte';
    import { createBackground } from '$lib/services/background.svelte';
    import {
        createLifecycleAwareMessaging,
        createMessaging,
    } from '$lib/services/messaging';
    import { createShortcut } from '$lib/services/shortcut';
    import { onMount } from 'svelte';

    const runtime = setRuntime({
        messaging: createLifecycleAwareMessaging(),
        background: createBackground(),
        shortcut: createShortcut(),
        router: createRouter(),
    });

    onMount(() => {
        const mount = (route: Route, props?: Record<string, unknown>) => {
            if (runtime.router.routes[route] != null) {
                alt.emit('router.mount', route, false);
            } else {
                runtime.router.mount(route, props);
            }
        };

        const unmount = (route: Route) => {
            if (runtime.router.routes[route] == null) {
                alt.emit('router.unmount', route, false);
            } else {
                runtime.router.unmount(route);
            }
        };

        runtime.router.mount('chat');

        alt.on('router.mount', mount);
        alt.on('router.unmount', unmount);
        return () => {
            alt.off('router.mount', mount);
            alt.off('router.unmount', unmount);
        };
    });
</script>

<BackgroundBuilder types={runtime.background.visible} />

{#if alt.isBrowser}
    <div class="fixed inset-0 bg-green-500"></div>
{/if}

{#each Object.entries(runtime.router.routes) as [route, value] (route)}
    {#if value}
        {#await value.lazyComponent then Component}
            <div class="fixed max-w-screen max-h-screen overflow-visible">
                <LifecycleAwareRoute {route}>
                    <Component {...value.props} />
                </LifecycleAwareRoute>
            </div>
        {/await}
    {/if}
{/each}
