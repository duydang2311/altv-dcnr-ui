import type { SvelteComponent } from 'svelte';

export type Route =
    | 'sign_in'
    | 'gamemode_selection'
    | 'pursuit_countdown'
    | 'chat';

export interface Router {
    get routes(): {
        [k in Route]?: {
            lazyComponent: Promise<typeof SvelteComponent>;
            props?: Record<string, unknown>;
        };
    };
    mount(route: Route, props?: Record<string, unknown>): void;
    unmount(route: Route): void;
}

const pages = Object.fromEntries(
    Object.entries(import.meta.glob('../../routes/*/+page.svelte')).map(
        ([k, v]) => {
            const start = '../../routes/'.length;
            const end = k.indexOf('/', start);
            return [
                k.substring(start, end),
                v as () => Promise<{ default: typeof SvelteComponent }>,
            ] as const;
        }
    )
);

let routes = $state.raw<Router['routes']>({});

const mount = (route: Route, props?: Record<string, unknown>) => {
    routes = {
        ...routes,
        [route]: {
            lazyComponent: pages[route]().then((v) => v.default),
            props,
        },
    };
};

const unmount = (route: Route) => {
    const { [route]: _, ...rest } = routes;
    routes = rest;
};

export const createRouter = (): Router => {
    return {
        mount,
        unmount,
        get routes() {
            return routes;
        },
    };
};
