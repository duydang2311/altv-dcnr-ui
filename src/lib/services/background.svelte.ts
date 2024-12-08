import { onDestroy } from 'svelte';

export type BackgroundType = 'gradient-1';

export interface Background {
    visible: BackgroundType[];
    use: (type: BackgroundType) => void;
    toggle: (type: BackgroundType, toggle: boolean) => void;
}

export const createBackground = (): Background => {
    let backgroundCounts = $state.raw<{ [k in BackgroundType]?: number }>({});
    const visible = $derived(
        Object.entries(backgroundCounts)
            .filter(([, value]) => value > 0)
            .map(([key]) => key as BackgroundType)
    );
    const toggle: Background['toggle'] = (type, toggle) => {
        const count = backgroundCounts[type] ?? 0;
        if (toggle) {
        }
        backgroundCounts = {
            ...backgroundCounts,
            [type]: count + (toggle ? 1 : -1),
        };
    };
    return {
        get visible() {
            return visible;
        },
        use: (type) => {
            toggle(type, true);
            onDestroy(() => {
                toggle(type, false);
            });
        },
        toggle: (type, on) => {
            toggle(type, on);
            if (on) {
                onDestroy(() => {
                    toggle(type, false);
                });
            }
        },
    };
};
