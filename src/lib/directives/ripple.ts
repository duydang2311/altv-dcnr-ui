import { JSX, onCleanup } from 'solid-js';
import styles from './ripple.module.css';

export const useRipple = () => ripple;

const findFurthestPoint = (
  clickPointX: number,
  elementWidth: number,
  offsetX: number,
  clickPointY: number,
  elementHeight: number,
  offsetY: number,
) => {
  const x = clickPointX - offsetX > elementWidth / 2 ? 0 : elementWidth;
  const y = clickPointY - offsetY > elementHeight / 2 ? 0 : elementHeight;
  const d = Math.hypot(
    x - (clickPointX - offsetX),
    y - (clickPointY - offsetY),
  );

  return d;
};

function ripple(
  el: HTMLElement,
  props: () => JSX.HTMLAttributes<HTMLDivElement>,
) {
  const handler = (e: PointerEvent) => {
    e.stopPropagation();
    const rect = el.getBoundingClientRect();
    const radius = findFurthestPoint(
      e.clientX,
      el.offsetWidth,
      rect.left,
      e.clientY,
      el.offsetHeight,
      rect.top,
    );
    const size = radius * 2;
    const top = e.clientY - rect.top - radius;
    const left = e.clientX - rect.left - radius;

    const { class: className } = props();

    const div = document.createElement('div');
    div.className = className;
    div.classList.add(styles.ripple);
    div.style.left = left + 'px';
    div.style.top = top + 'px';
    div.style.width = div.style.height = size + 'px';

    el.appendChild(div);
    setTimeout(() => {
      div.style.opacity = '0';
    }, 400);
    setTimeout(() => {
      div.remove();
    }, 600);
  };

  el.style.overflow = 'hidden';
  el.addEventListener('pointerup', handler);

  onCleanup(() => {
    el.removeEventListener('pointerup', handler);
  });
}
