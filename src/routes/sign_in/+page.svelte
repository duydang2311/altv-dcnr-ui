<script lang="ts" module>
	export interface DiscordUser {
		id: string;
		username: string;
		avatar?: string;
		banner?: string;
	}
</script>

<script lang="ts">
	import AuroraBackground from '$lib/components/AuroraGradient.svelte';
	import { onMount } from 'svelte';
	import { ripple } from 'svelte-ripple-action';
	import Discord from '~icons/custom/discord-black';
	import DiscordSignIn from './DiscordSignIn.svelte';
	import { tsap } from '$lib/utils/transitions';

	let discordUser = $state.raw<DiscordUser | null>(null);

	onMount(() => {
		const handleDiscordRequest = (user: DiscordUser) => {
			discordUser = user;
		};
		alt.on('sign-in.discord.request', handleDiscordRequest);
		return () => {
			alt.off('sign-in.discord.request', handleDiscordRequest);
		};
	});
</script>

<div class="fixed inset-0 bg-black/80"></div>
<div class="fixed inset-0 bg-primary-active/20"></div>
<AuroraBackground />
<div class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
	<div class="overlap overlap-center">
		{#if discordUser == null}
		 <div
			in:tsap={(node, gsap) => gsap.from(node, { scale: 1.05, opacity: 0, duration: 0.4, ease: 'power1.out' })}
			out:tsap={(node, gsap) => gsap.to(node, { scale: 0.95, opacity: 0, duration: 0.1, ease: 'power1.in' })}
		 >
			<button
				type="button"
				class="group relative font-title bg-primary rounded-sm hover:bg-primary-hover active:bg-primary-active text-primary-fg
			px-6 py-1.5 flex items-center gap-3 transition ease-in-out border border-primary-border"
				use:ripple={{
					color: 'color-mix(in srgb, var(--theme-primary-fg) 12%, transparent)',
				}}
				onclick={() => {
					alt.emit('sign-in.discord.request');
					discordUser = {
						id: '287955978215882752',
						username: 'duydang',
						avatar: '56d1da76fcc4a603e50495d6472b30da',
					};
				}}
			>
				<Discord />
				Sign in with Discord
			</button>
		 </div>
		{:else}
		<div
			in:tsap={(node, gsap) => gsap.from(node, { scale: 1.05, opacity: 0, duration: 0.4, ease: 'power1.out' })}
			out:tsap={(node, gsap) => gsap.to(node, { scale: 0.95, opacity: 0, duration: 0.1, ease: 'power1.in' })}
		>
			<DiscordSignIn user={discordUser} onBack={() => {
				discordUser = null;
			}} />
		</div>
		{/if}
	</div>
</div>
