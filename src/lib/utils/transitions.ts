import { gsap as __gsap } from 'gsap';

type TsapCallback = (
    node: HTMLElement,
    gsap: typeof __gsap
) => gsap.core.Animation;

export function tsap(node: HTMLElement, callback: TsapCallback) {
    const animation = callback(node, __gsap);
    return {
        duration: animation.totalDuration() * 1000,
        delay: animation.delay() * 1000,
    };
}

export const iconScale = {
    in: (): TsapCallback => (node, gsap) =>
        gsap.from(node, {
            scale: 1.2,
            opacity: 0,
            duration: 0.4,
            ease: 'circ.out',
        }),
    out: (): TsapCallback => (node, gsap) =>
        gsap.to(node, { opacity: 0, duration: 0.1, ease: 'circ.in' }),
};

export const pageZoom = {
    in: (): TsapCallback => (node, gsap) =>
        gsap.from(node, {
            scale: 1.05,
            delay: 0.2,
            opacity: 0,
            duration: 0.2,
            clearProps: 'scale,opacity',
            ease: 'circ.out',
        }),
    out: (): TsapCallback => (node, gsap) =>
        gsap.to(node, {
            scale: 0.95,
            duration: 0.2,
            opacity: 0,
            ease: 'circ.in',
        }),
};
