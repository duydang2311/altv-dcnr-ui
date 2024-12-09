import type { Router } from '$lib/services/router.svelte';
import type { Background } from '$lib/services/background.svelte';
import type { Messaging } from '$lib/services/messaging';
import type { Shortcut } from '$lib/services/shortcut';
import { getContext, setContext } from 'svelte';

interface Runtime {
    router: Router;
    messaging: Messaging;
    background: Background;
    shortcut: Shortcut;
}

const symbol = Symbol('runtime');

export const useRuntime = () => {
    return getContext(symbol) as Runtime;
};

export const setRuntime = (runtime: Runtime) => {
    return setContext(symbol, runtime);
};
