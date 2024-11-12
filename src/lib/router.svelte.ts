import { create } from 'mutative';
import type { SvelteComponent } from 'svelte';

export type Route = 'sign_in';

const pages = import.meta.glob('../routes/*/+page.svelte') as Record<
    string,
    () => Promise<{ default: typeof SvelteComponent }>
>;

let routes = $state.raw<{
    [k in Route]?: {
        lazyComponent: Promise<typeof SvelteComponent>;
        props?: Record<string, unknown>;
    };
}>({});

const mount = (route: Route, props?: Record<string, unknown>) => {
    routes = create(routes, (a) => {
        a[route] = {
            lazyComponent: pages[`../routes/${route}/+page.svelte`]().then(
                (v) => v.default
            ),
            props,
        };
    });
};

const unmount = (route: Route) => {
    routes = create(routes, (a) => {
        delete a[route];
    });
};

export default {
    mount,
    unmount,
    get routes() {
        return routes;
    },
};
