<script lang="ts">
	import type { DiscordUser } from './+page.svelte';
	import Discord from '~icons/custom/discord-black';
	import Button from '$lib/components/Button.svelte';

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
	<Button variant="base" type="button" onclick={onBack}>Back</Button>
	<Button
		variant="primary"
		class="flex items-center justify-center gap-3 min-w-max"
	>
		<Discord />
		Continue
	</Button>
</div>
