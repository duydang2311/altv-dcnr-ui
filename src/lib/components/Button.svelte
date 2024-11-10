<script lang="ts">
    import type { RippleOptions } from "node_modules/svelte-ripple-action/dist/constants";
	import { ripple } from "svelte-ripple-action";
	import type { HTMLButtonAttributes } from "svelte/elements";

    interface RippleActionProps extends RippleOptions {
        disabled?: boolean;
    }

    interface Props extends HTMLButtonAttributes
    {
        variant?: 'base' | 'primary';
    }

    const { children, variant = 'base', class: cls, ...props }: Props = $props();
    
    const rippleAction = (node: HTMLElement, props?: RippleActionProps) => {
        let ret: ReturnType<typeof ripple> | null = null;
        if (!props?.disabled) {
            ret = ripple(node, props);
        }
        return {
            update: (props: RippleActionProps) => {
                if (props.disabled) {
                    if(ret) {
                        ret.destroy();
                        ret = null;
                    }
                    return;
                }

                if (ret) {
                    ret.update(props);
                    return;
                }

                ret = ripple(node, props);
            },
            destroy: () => {
                if (ret) {
                    ret.destroy();
                    ret = null;
                }
            }
        }
    }
</script>

<button
    {...props}
    class="c-button c-button--{variant}{cls ? ` ${cls}` : ''}"
    use:rippleAction={{ disabled: props.disabled ?? undefined, color: `var(--theme-${variant}-ripple)` }}
>
    {@render children?.()}
</button>
