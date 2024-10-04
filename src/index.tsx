/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';

/* polyfills */
if (!('alt' in globalThis)) {
  globalThis.alt = {
    emit: (_eventName: string, ..._args: any[]) => {},
    off: (_eventName: string, _listener: (...args: any[]) => void) => {},
    on: (_eventName: string, _listener: (...args: any[]) => void) => {},
    once: (_eventName: string, _listener: (...args: any[]) => void) => {},
    getEventListeners: (_eventName: string) => [],
    getVersion: () => '',
    getBranch: () => '',
    getLocale: () => '',
    getPermissionState: (_permId: AltPermission) => false,
  };
}

import App from './App';
import { RouterProvider } from './lib/contexts/router_context';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(
  () => (
    <RouterProvider>
      <App />
    </RouterProvider>
  ),
  root!,
);
