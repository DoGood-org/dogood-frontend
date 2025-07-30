// hooks/useScrollToActive.ts
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

    const btnRect = activeBtn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const width = btnRect.width;

    if (!isTabletOrLarger && container.scrollWidth > container.clientWidth) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }

    const left = isTabletOrLarger
      ? btnRect.left - containerRect.left
      : btnRect.left - containerRect.left + container.scrollLeft;

    setRect({ left, width });
  }, [activeView, isTabletOrLarger, containerRef, setRect]);
};
