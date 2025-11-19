'use client';

import { TabScrollProps } from '@/types';
import { useLayoutEffect } from 'react';

export const useScrollToActive = ({
  containerRef,
  activeView,
  isTabletOrLarger,
  setRect,
}: TabScrollProps): void => {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeBtn = container.querySelector(
      `[data-view="${activeView}"]`
    ) as HTMLElement;

    if (!activeBtn) return;

    // ВАЖЛИВО: вимірюємо всю кнопку, а не контент
    const width = activeBtn.offsetWidth;
    const left =
      activeBtn.offsetLeft - (isTabletOrLarger ? 0 : container.scrollLeft);

    // Скрол до елементу (мобільна версія)
    if (!isTabletOrLarger && container.scrollWidth > container.clientWidth) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }

    setRect({ left, width });
  }, [activeView, isTabletOrLarger, containerRef, setRect]);
};
