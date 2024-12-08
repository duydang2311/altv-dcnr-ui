<script lang="ts" module>
    export interface DiscordUser {
        id: string;
        username: string;
        avatar?: string;
        banner?: string;
    }
</script>

<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import Spinner from '$lib/components/Spinner.svelte';
    import { useRuntime } from '$lib/contexts/runtime';
    import { E } from '$lib/utils/fun';
    import { iconScale, tsap } from '$lib/utils/transitions';
    import Discord from '~icons/custom/discord-black';
    import DiscordSignIn from './DiscordSignIn.svelte';

    const { messaging, background } = useRuntime();
    background.use('gradient-1');

    let discordUser = $state.raw<DiscordUser | null>(null);
    let status = $state.raw<'pending' | null>(null);

    const handleSignInDiscord = async () => {
        status = 'pending';
        const either = await messaging.send<[DiscordUser]>(
            'sign-in.discord.request',
        )();
        status = null;

        if (E.isRight(either)) {
            discordUser = either.right[0];
        }
    };
</script>

<div class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="overlap overlap-center">
        {#if discordUser == null}
            <div
                in:tsap={(node, gsap) =>
                    gsap.from(node, {
                        scale: 1.05,
                        y: '0.25rem',
                        opacity: 0,
                        duration: 0.4,
                        ease: 'power1.out',
                    })}
                out:tsap={(node, gsap) =>
                    gsap.to(node, {
                        scale: 0.95,
                        opacity: 0,
                        duration: 0.1,
                        ease: 'power1.in',
                    })}
            >
                <Button
                    type="button"
                    class="group relative flex items-center gap-3"
                    variant="primary"
                    onclick={handleSignInDiscord}
                    disabled={status != null}
                >
                    <div class="overlap overlap-center">
                        {#if status === 'pending'}
                            <div
                                in:tsap={iconScale.in()}
                                out:tsap={iconScale.out()}
                            >
                                <Spinner />
                            </div>
                        {:else}
                            <div
                                in:tsap={iconScale.in()}
                                out:tsap={iconScale.out()}
                            >
                                <Discord />
                            </div>
                        {/if}
                    </div>
                    Sign in with Discord
                </Button>
            </div>
        {:else}
            <div
                in:tsap={(node, gsap) =>
                    gsap.from(node, {
                        scale: 1.05,
                        y: '0.25rem',
                        opacity: 0,
                        duration: 0.4,
                        ease: 'power1.out',
                    })}
                out:tsap={(node, gsap) =>
                    gsap.to(node, {
                        scale: 0.95,
                        opacity: 0,
                        duration: 0.1,
                        ease: 'power1.in',
                    })}
            >
                <DiscordSignIn
                    user={discordUser}
                    onBack={() => {
                        discordUser = null;
                    }}
                />
            </div>
        {/if}
    </div>
</div>
