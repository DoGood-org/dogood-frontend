import { RefObject, useEffect } from 'react';

type UseClickOutsideOptions = {
  enabled?: boolean;
  eventTypes?: ('mousedown' | 'click' | 'touchstart')[];
  detectEscapeKey?: boolean;
  once?: boolean;
};


type Props = {
  ref: RefObject<HTMLElement | null>;
  callback: () => void;
  options?: UseClickOutsideOptions;
};




export const useClickOutside = ({
  ref,
  callback,
  options = {}
}: Props): void => {
  const {
    enabled = true,
    eventTypes = ['mousedown'],
    detectEscapeKey = true,
    once = false,
  } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleEvent = (e: Event): void => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
        if (once) cleanup();
      }
    };

    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        callback();
        if (once) cleanup();
      }
    };

    const cleanup = () => {
      eventTypes.forEach((event) =>
        document.removeEventListener(event, handleEvent)
      );
      if (detectEscapeKey) {
        document.removeEventListener('keydown', handleEscape);
      }
    };

    eventTypes.forEach((event) =>
      document.addEventListener(event, handleEvent, { passive: true })
    );

    if (detectEscapeKey) {
      document.addEventListener('keydown', handleEscape);
    }

    return cleanup;
  }, [ref, callback, enabled, eventTypes, detectEscapeKey, once]);
};
