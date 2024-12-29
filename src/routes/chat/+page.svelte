<script lang="ts">
    import { useRuntime } from '$lib/contexts/runtime';
    import { tsap } from '$lib/utils/transitions';
    import { flip } from 'svelte/animate';
    import { cubicOut } from 'svelte/easing';

    interface Message {
        id: number;
        content: string;
    }

    const MAX = 512;
    const MAX_VISIBLE = 64;
    const { shortcut, messaging } = useRuntime();

    let counter = 0;
    let show = $state.raw(false);
    let messages = $state.raw<Message[]>([]);
    let inputRef = $state.raw<HTMLInputElement>();
    const visibleMessages = $derived(messages.slice(0, MAX_VISIBLE));

    const toggleShow = (value: boolean) => {
        show = value;
        if (show) {
            inputRef?.focus();
        } else {
            inputRef?.blur();
        }
    };

    const addMessage = (message: Omit<Message, 'id'>) => {
        messages = [
            { ...message, id: ++counter },
            ...(messages.length === MAX ? messages.slice(0, -1) : messages),
        ];
    };

    const handleInputKeyUp = (e: KeyboardEvent) => {
        const input = e.currentTarget as HTMLInputElement;
        switch (e.key) {
            case 'Escape':
                toggleShow(false);
                break;
            case 'Enter':
                toggleShow(false);
                messaging.publish('chat.message', input.value.trim());
                input.value = '';
                break;
        }
    };

    shortcut('t', () => {
        toggleShow(true);
    });

    shortcut('escape', () => {
        toggleShow(false);
    });

    messaging.on('chat.message', (_, message: Omit<Message, 'id'>) =>
        addMessage(message),
    );
</script>

<div class="fixed top-4 left-4 w-[32rem] tracking-tight">
    <div
        class="chat-wrapper bg-base-1/20 h-60 p-2 rounded-sm mb-2 overflow-hidden border border-base-border/10 transition duration-300 ease-in-out"
        class:inactive={!show}
    >
        <ol
            class="h-full overflow-auto scrollbar gap-1 flex flex-col-reverse leading-tight text-base-fg-1 focus:outline-none"
        >
            {#each visibleMessages as { id, content } (id)}
                <li
                    in:tsap={(node, gsap) =>
                        gsap.from(node, {
                            scale: 0.96,
                            opacity: 0,
                            y: '50%',
                            duration: 0.1,
                            ease: 'power1.out',
                            clearProps: 'y,scale,opacity',
                        })}
                    animate:flip={{ duration: 100, easing: cubicOut }}
                >
                    {content}
                </li>
            {/each}
        </ol>
    </div>
    <input
        bind:this={inputRef}
        type="text"
        class="w-full bg-base-1/40 border border-base-1/10 rounded-sm px-2 py-1 focus:outline-none cursor-default
        transition ease-out overflow-hidden opacity-[var(--\_opacity)] placeholder:text-base-fg-1/20 caret-base-fg-1"
        placeholder="Enter your message..."
        style:--_opacity={show ? '1' : '0'}
        onkeyup={handleInputKeyUp}
    />
</div>

<style>
    .chat-wrapper > ol {
        mask-image: linear-gradient(to top, rgb(0 0 0) 92%, transparent);
    }

    .inactive {
        animation: 3s ease-in-out 5s 1 normal forwards running fadeout;

        & > .scrollbar::-webkit-scrollbar,
        & > .scrollbar::-webkit-scrollbar-track,
        & > .scrollbar::-webkit-scrollbar-thumb {
            background-color: transparent;
        }
    }

    @keyframes fadeout {
        from {
            border-color: hsl(var(--theme-tw-base-border) / 0.1);
            background-color: hsl(var(--theme-tw-base-1) / 0.2);
            opacity: 1;
        }
        to {
            background-color: transparent;
            border-color: transparent;
            opacity: 0.75;
        }
    }
</style>
