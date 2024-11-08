<script lang="ts">
	import { ripple } from 'svelte-ripple-action';
	import type { DiscordUser } from './+page.svelte';
	import Discord from '~icons/custom/discord-black';

	const { user, onBack }: { user: DiscordUser; onBack: () => void } =
		$props();
</script>

<div class="text-center">
	<img
		alt={user.username}
		src={user.avatar == null
			? `https://cdn.discordapp.com/embed/avatars/0.png?size=512`
			: `https://cdn.discordapp.com/avatars/${user.id}/${
					user.avatar
				}.png?size=512`}
		class="h-32 rounded-full mx-auto border border-base-border ring-1 ring-base-border"
	/>
	<p class="text-4xl font-normal">{user.username}</p>
</div>
<div class="flex gap-4 justify-center mt-4 mx-auto">
	<button
		type="button"
		class="group flex-1 relative font-title bg-base rounded-sm duration-75 hover:bg-base-hover active:bg-base-active text-base-fg
          px-6 py-1.5 flex items-center justify-center gap-3 transition ease-in-out border border-base-border"
		use:ripple={{
			color: 'color-mix(in srgb, var(--theme-base-fg) 8%, transparent)',
		}}
		onclick={onBack}
	>
		Back
	</button>
	<button
		class="group flex-1 relative font-title bg-primary rounded-sm duration-75 hover:bg-primary-hover active:bg-primary-active text-primary-fg
          px-6 py-1.5 flex items-center justify-center gap-3 transition ease-in-out border border-primary-border min-w-max"
		use:ripple={{
			color: 'color-mix(in srgb, var(--theme-base-fg) 12%, transparent)',
		}}
	>
		<Discord />
		Continue
	</button>
</div>
