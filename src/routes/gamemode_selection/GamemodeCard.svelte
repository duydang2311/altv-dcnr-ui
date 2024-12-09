<script lang="ts">
    const {
        src,
        text,
        onClick,
    }: { src: string; text: string; onClick: () => void } = $props();
</script>

<button
    type="button"
    class="flex-1 h-full parallelogram p-px transition duration-75 ease-in-out bg-transparent hover:bg-primary active:scale-95"
    onclick={onClick}
>
    <div class="relative h-full parallelogram group">
        <img
            alt=""
            {src}
            class="select-none h-full w-full object-cover brightness-50 transition duration-75 ease-in-out group-hover:scale-105 group-hover:brightness-100"
        />
        <div
            class="absolute inset-0 transition-opacity duration-75 ease-in-out bg-gradient-to-b from-transparent from-60% to-black group-hover:opacity-0"
        ></div>
        <div
            class="absolute inset-0 transition-opacity duration-75 ease-out bg-gradient-to-b from-transparent from-20% to-primary/60 opacity-0 group-hover:opacity-100"
        ></div>
        <div class="absolute bottom-4 left-[45%] -translate-x-1/2">
            <h1
                class="select-none text-5xl uppercase font-bold italic transition duration-75 ease-in-out text-base-fg/5 group-hover:text-base-fg"
            >
                {text}
            </h1>
        </div>
    </div>
</button>
