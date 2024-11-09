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
	import Button from '$lib/components/Button.svelte';
	import { tsap } from '$lib/utils/transitions';
	import { onMount } from 'svelte';
	import Discord from '~icons/custom/discord-black';
	import DiscordSignIn from './DiscordSignIn.svelte';

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
			in:tsap={(node, gsap) => gsap.from(node, { scale: 1.05, y: '0.25rem', opacity: 0, duration: 0.4, ease: 'power1.out' })}
			out:tsap={(node, gsap) => gsap.to(node, { scale: 0.95, opacity: 0, duration: 0.1, ease: 'power1.in' })}
		 >
			<Button
				type="button"
				class="group relative flex items-center gap-3"
				variant="primary"
				onclick={() => {
					alt.emit('sign-in.discord.request');
					// discordUser = {
					// 	id: '287955978215882752',
					// 	username: 'duydang',
					// 	avatar: '56d1da76fcc4a603e50495d6472b30da',
					// };
				}}
			>
				<Discord />
				Sign in with Discord
			</Button>
		 </div>
		{:else}
		<div
			in:tsap={(node, gsap) => gsap.from(node, { scale: 1.05, y: '0.25rem', opacity: 0, duration: 0.4, ease: 'power1.out' })}
			out:tsap={(node, gsap) => gsap.to(node, { scale: 0.95, opacity: 0, duration: 0.1, ease: 'power1.in' })}
		>
			<DiscordSignIn user={discordUser} onBack={() => {
				discordUser = null;
			}} />
		</div>
		{/if}
	</div>
</div>
