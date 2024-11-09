import { mount } from 'svelte';
import './app.css';
import './ripple.css';
import App from './App.svelte';

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

const app = mount(App, {
	target: document.getElementById('app')!,
});

export default app;
