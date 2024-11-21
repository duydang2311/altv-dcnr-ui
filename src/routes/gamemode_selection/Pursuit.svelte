<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import { useRuntime } from '$lib/contexts/runtime';
    import type { MessagingContext } from '$lib/services/messaging';
    import { tsap } from '$lib/utils/transitions';
    import { onMount } from 'svelte';
    import Play from '~icons/heroicons/play-16-solid';

    interface Lobby {
        id: number;
        name: string;
        participantsCount: number;
        maxParticipants: number;
        participants?: string[];
    }

    const { messaging } = useRuntime();
    let lobbies = $state<Lobby[]>([]);
    let selectedLobbyId = $state.raw<number | null>(null);
    const selectedLobby = $derived(
        selectedLobbyId == null
            ? null
            : lobbies.find((a) => a.id === selectedLobbyId),
    );

    onMount(() => {
        const getLobbies = (ctx: MessagingContext, value: Lobby[]) => {
            lobbies = value;
        };

        const getParticipants = (
            ctx: MessagingContext,
            id: number,
            value: string[],
        ) => {
            const lobby = lobbies.find((a) => a.id === id);
            if (lobby) {
                lobby.participants = value;
            }
        };

        const cleanups = [
            messaging.on('gamemode-selection.pursuit.getLobbies', getLobbies),
            messaging.on(
                'gamemode-selection.pursuit.getParticipants',
                getParticipants,
            ),
        ];

        messaging.publish('gamemode-selection.pursuit.getLobbies');
        return () => {
            cleanups.forEach((a) => a());
        };
    });
</script>

<div
    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex overflow-hidden max-h-96 gap-4"
>
    <div
        class="relative w-[32rem] h-96 bg-gradient-to-b from-base-1 from-80% to-base-2 rounded-lg border border-base-border p-2"
    >
        <div
            class="size-full overflow-y-auto overflow-x-visible scrollbar focus:outline-none pr-2"
        >
            <div
                class="grid grid-cols-[2rem_1fr_4rem] items-center px-6 py-2 gap-2 font-title sticky -top-px bg-base-1
               text-xs tracking-tight text-base-fg-5"
            >
                <span>ID</span>
                <span>Lobby name</span>
                <span>Participants</span>
            </div>
            {#each lobbies as lobby (lobby.id)}
                <button
                    type="button"
                    data-selected={selectedLobbyId === lobby.id
                        ? true
                        : undefined}
                    class="w-full text-left grid grid-cols-[2rem_1fr_4rem] items-center px-6 py-2 gap-2 transition ease-out duration-75
                    rounded-sm border border-transparent odd:bg-base-2/40
                    outline outline-transparent -outline-offset-1 focus-visible:outline-primary-border
                    hover:border-base-3 hover:bg-base-2
                    data-[selected]:border-primary data-[selected]:bg-primary/10"
                    onclick={() => {
                        selectedLobbyId =
                            lobby.id === selectedLobbyId ? null : lobby.id;
                        if (selectedLobbyId != null) {
                            messaging.publish(
                                'gamemode-selection.pursuit.getParticipants',
                                selectedLobbyId,
                            );
                        }
                    }}
                >
                    <span>
                        {lobby.id}
                    </span>
                    <span>
                        {lobby.name}
                    </span>
                    <span
                        >{lobby.participantsCount}/{lobby.maxParticipants}</span
                    >
                </button>
            {/each}
        </div>
    </div>
    <div
        class="relative grid grid-rows-[auto_1fr_auto] gap-4 bg-gradient-to-b from-base-1 from-80% to-base-2 p-4 border border-base-border rounded-lg w-60"
    >
        {#if selectedLobby}
            <p class="text-xs tracking-tight text-base-fg-5">
                {selectedLobby.name}
            </p>
            <div class="overflow-auto scrollbar">
                <ul class="flex flex-wrap gap-2 text-sm">
                    {#if selectedLobby.participants == null || selectedLobby.participants.length === 0}
                        <p class="text-xs tracking-tight text-base-fg-3">
                            No participants joined yet.
                        </p>
                    {:else}
                        {#each selectedLobby.participants as participant}
                            <li>
                                <span>{participant}</span>
                            </li>
                        {/each}
                    {/if}
                </ul>
            </div>
            <Button
                type="button"
                variant="primary"
                class="mt-auto"
                onclick={() => {
                    messaging.publish(
                        'gamemode-selection.pursuit.joinLobby',
                        selectedLobby.id,
                    );
                }}
            >
                Join
            </Button>
        {:else}
            <p class="text-xs tracking-tight italic text-base-fg-5">
                Select a lobby to join.
            </p>
        {/if}
    </div>
</div>
