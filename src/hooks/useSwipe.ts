import { SwipeProps } from '@/types';
import { useEffect } from 'react';

export const useSwipe = ({
  ref,
  onSwipeLeft,
  onSwipeRight,
  isEnabled = true,
}: SwipeProps): void | (() => void) => {
  useEffect((): void | (() => void) => {
    const element = ref.current;
    if (!element) return;
    if (!isEnabled) return;

    let startX: number;

    const onTouchStart = (e: TouchEvent): void => {
      startX = e.touches[0].clientX;
    };

    const onTouchEnd = (e: TouchEvent): void => {
      const endX = e.changedTouches[0].clientX;
      const deltaX = endX - startX;

      if (deltaX > 50) {
        onSwipeRight?.();
      } else if (deltaX < -50) {
        onSwipeLeft();
      }
    };

    element.addEventListener('touchstart', onTouchStart, { passive: true });
    element.addEventListener('touchend', onTouchEnd);

    return () => {
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchend', onTouchEnd);
    };
  }, [ref, onSwipeLeft, onSwipeRight, isEnabled]);
};
