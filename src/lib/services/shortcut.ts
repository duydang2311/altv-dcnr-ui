import hotkeys, { type KeyHandler } from 'hotkeys-js';
import { onDestroy } from 'svelte';

export interface Options {
    scope?: string;
    element?: HTMLElement | null;
    keyup?: boolean | null;
    keydown?: boolean | null;
    capture?: boolean;
    splitKey?: string;
    single?: boolean;
}

export interface Shortcut {
    (key: string, method: KeyHandler): void;
    (key: string, scope: string, method: KeyHandler): void;
    (key: string, options: Options, method: KeyHandler): void;
}

export const createShortcut = (): Shortcut => {
    return (
        key: string,
        options: KeyHandler | string | Options,
        method?: KeyHandler
    ) => {
        const handler = typeof options === 'function' ? options : method!;
        options = {
            keydown: false,
            keyup: true,
            ...(typeof options === 'object'
                ? options
                : typeof options === 'string'
                ? { scope: options }
                : {}),
        };
        hotkeys(key, options as unknown as any, handler);
        onDestroy(() => {
            hotkeys.unbind(key, handler);
        });
    };
};
