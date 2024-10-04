import {
  Component,
  createContext,
  JSX,
  lazy,
  onCleanup,
  useContext,
} from 'solid-js';
import { createStore } from 'solid-js/store';

const RouterContext = createContext<{
  routes: Record<
    string,
    {
      Component: Component & { preload: () => Promise<Component> };
      props?: object;
    }
  >;
  mount: (route: string, props?: object) => void;
  unmount: (route: string) => void;
}>();

export const useRouter = () => useContext(RouterContext);

export const RouterProvider = (props: { children: JSX.Element }) => {
  const [routes, setRoutes] = createStore<
    Record<
      string,
      {
        Component: Component & { preload: () => Promise<Component> };
        props?: object;
      }
    >
  >({});

  const mount = (route: string, props?: object) => {
    setRoutes((a) => ({
      ...a,
      [route]: {
        Component: lazy(() => import(`../../routes/${route}/Index.tsx`)),
        props,
      },
    }));
  };

  const unmount = (route: string) => {
    setRoutes(({ [route]: _, ...a }) => a);
  };

  alt.on('router.mount', mount);
  alt.on('router.unmount', unmount);

  onCleanup(() => {
    alt.off('router.mount', mount);
    alt.off('router.unmount', unmount);
  });

  return (
    <RouterContext.Provider value={{ routes, mount, unmount }}>
      {props.children}
    </RouterContext.Provider>
  );
};
