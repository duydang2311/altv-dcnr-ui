import { gsap as __gsap } from 'gsap';

type TsapCallback = (
	node: HTMLElement,
	gsap: typeof __gsap
) => gsap.core.Animation;

export function tsap(node: HTMLElement, callback: TsapCallback) {
	const animation = callback(node, __gsap);
	return {
		duration: animation.totalDuration() * 1000,
	};
}
