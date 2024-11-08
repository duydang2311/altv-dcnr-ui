<script lang="ts">
	import Router from '$lib/router.svelte';
	import { onMount } from 'svelte';

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
