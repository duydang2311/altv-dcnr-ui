import { createMemo, For, type Component } from 'solid-js';
import { useRouter } from './lib/contexts/router_context';

const App: Component = () => {
  const { mount } = useRouter();
  const routes = createMemo(() => Object.values(useRouter().routes));

  mount('sign_in');

  return (
    <For each={routes()}>
      {({ Component, props }) => (
        <div class="fixed max-w-screen max-h-screen overflow-visible">
          <Component {...props}></Component>
        </div>
      )}
    </For>
  );
};

export default App;
