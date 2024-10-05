import { AuroraBackground } from '$lib/components/AuroraGradient';
import { useRipple } from '$lib/directives/ripple';
import Discord from '~icons/custom/discord-black';

export default () => {
  const ripple = useRipple();

  return (
    <>
      <div class="fixed inset-0 bg-black/50"></div>
      <AuroraBackground />
      <div class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <button
          type="button"
          class="group relative font-title bg-primary rounded-sm hover:bg-primary-hover active:bg-primary-active text-primary-fg
          px-6 py-1.5 flex items-center gap-4 transition ease-in-out border border-primary-border"
          use:ripple={{ class: 'bg-primary-fg/10' }}
        >
          <Discord />
          Sign in with Discord
        </button>
      </div>
    </>
  );
};
