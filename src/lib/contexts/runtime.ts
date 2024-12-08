import type { Background } from '$lib/services/background.svelte';
import type { Messaging } from '$lib/services/messaging';
import { getContext, setContext } from 'svelte';

interface Runtime {
    messaging: Messaging;
    background: Background;
}

const symbol = Symbol('runtime');

export const useRuntime = () => {
    return getContext(symbol) as Runtime;
};

export const setRuntime = (runtime: Runtime) => {
    return setContext(symbol, runtime);
};
