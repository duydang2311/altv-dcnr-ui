<script lang="ts">
    import type { DiscordUser } from './+page.svelte';
    import Discord from '~icons/custom/discord-black';
    import Button from '$lib/components/Button.svelte';
    import { useRuntime } from '$lib/contexts/runtime';
    import { isRight } from '@baetheus/fun/either';
    import { iconScale, tsap } from '$lib/utils/transitions';
    import Spinner from '$lib/components/Spinner.svelte';

    const { messaging } = useRuntime();
    const { user, onBack }: { user: DiscordUser; onBack: () => void } =
        $props();
    let status = $state.raw<'pending' | null>(null);

    const handleContinue = async () => {
        status = 'pending';
        const send = await messaging.send<[string]>(
            'sign-in.discord.confirm',
        )();
        status = null;
        if (isRight(send)) {
            const [code] = send.right;
            switch (code) {
                case 'success':
                    break;
                case 'oauth_failed':
                    break;
                case 'register_failed':
                    break;
            }
        }
    };
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
        type="button"
        class="flex items-center justify-center gap-3 min-w-max"
        onclick={handleContinue}
        disabled={status != null}
    >
        <div class="overlap overlap-center">
            {#if status === 'pending'}
                <div in:tsap={iconScale.in()} out:tsap={iconScale.out()}>
                    <Spinner />
                </div>
            {:else}
                <div in:tsap={iconScale.in()} out:tsap={iconScale.out()}>
                    <Discord />
                </div>
            {/if}
        </div>
        Continue
    </Button>
</div>
