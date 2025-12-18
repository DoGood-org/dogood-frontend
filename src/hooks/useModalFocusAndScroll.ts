import { useEffect, RefObject } from 'react';

let openModals: number = 0;
const focusStack: (HTMLElement | null)[] = [];
let prevOverflow: string = '';

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function useModalFocusAndScroll(
  ref: RefObject<HTMLElement | null>,
  isOpen: boolean
): void {
  useEffect(() => {
    const modal = ref.current;

    if (typeof window === 'undefined') return;

    if (!isOpen || !modal) return;

    const body = document.body;

    focusStack.push(document.activeElement as HTMLElement | null);

    if (openModals === 0) {
      prevOverflow = body.style.overflow;
      body.style.overflow = 'hidden';
    }

    openModals++;

    const focusableElements = Array.from(
      modal.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    ).filter((el) => !el.hasAttribute('disabled'));

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    } else {
      modal.tabIndex = -1;
      modal.focus();
    }

    // Focus trap
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key !== 'Tab') return;

      if (focusableElements.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleKeyDown);

    return (): void => {
      modal.removeEventListener('keydown', handleKeyDown);
      openModals--;

      const lastActiveElement = focusStack.pop();
      if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
        lastActiveElement.focus();
      }

      if (openModals === 0) {
        body.style.overflow = prevOverflow;
      }
    };
  }, [isOpen, ref]);
}
