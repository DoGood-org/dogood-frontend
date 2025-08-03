import { RefObject, useEffect, useRef, useState } from 'react';

type UseClickOutsideOptions = {
  enabled?: boolean;
  eventTypes?: ('mousedown' | 'click' | 'touchstart')[];
  detectEscapeKey?: boolean;
  once?: boolean;
  delay?: number;
  ignoreSelectors?: string[];
};
type Props = {
  ref: RefObject<HTMLElement | null>;
  callback: () => void;
  options?: UseClickOutsideOptions;
};

export const useClickOutside = ({
  ref,
  callback,
  options = {},
}: Props): void => {
  const {
    enabled = true,
    detectEscapeKey = true,
    once = false,
    ignoreSelectors = [],
    delay = 50,
  } = options;
  const [delayGuard, setDelayGuard] = useState(false);
  const startedInsideRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    const timeout = setTimeout(() => setDelayGuard(true), delay);
    return (): void => clearTimeout(timeout);
  }, [enabled, delay]);

  useEffect(() => {
    if (!enabled || !delayGuard) return;

    const handlePointerDown = (e: Event): void => {
      const target = e.target as HTMLElement;
      startedInsideRef.current =
        !!ref.current?.contains(target) ||
        ignoreSelectors?.some((sel) => target.closest(sel));
    };

    const handlePointerUp = (e: Event): void => {
      const target = e.target as HTMLElement;
      const isInsidePanel = ref.current?.contains(target);
      const isIgnored = ignoreSelectors.some((sel) => target.closest(sel));

      if (!isInsidePanel && !isIgnored && !startedInsideRef.current) {
        callback();
        if (once) cleanup();
      }

      startedInsideRef.current = false;
    };

    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        callback();
        if (once) cleanup();
      }
    };

    const cleanup = (): void => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointerup', handlePointerUp);
      if (detectEscapeKey) {
        document.removeEventListener('keydown', handleEscape);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown, {
      passive: true,
    });
    document.addEventListener('pointerup', handlePointerUp, {
      passive: true,
    });

    if (detectEscapeKey) {
      document.addEventListener('keydown', handleEscape);
    }

    return cleanup;
  }, [
    ref,
    callback,
    enabled,
    detectEscapeKey,
    once,
    ignoreSelectors,
    delayGuard,
  ]);
};
