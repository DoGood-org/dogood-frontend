import { useEffect, RefObject, useCallback } from 'react';

let openModals: number = 0;
const focusStack: (HTMLElement | null)[] = [];
let prevOverflow: string = '';

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex^="-"])';

export function useModalFocusAndScroll(
  ref: RefObject<HTMLElement | null>,
  isOpen: boolean
): void {
  const getFocusableElements = useCallback((): HTMLElement[] => {
    const modal = ref.current;
    if (!modal) return [];
    return Array.from(
      modal.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    ).filter(
      (el) =>
        !el.hasAttribute('disabled') &&
        !el.hasAttribute('hidden') &&
        el.getAttribute('aria-hidden') !== 'true'
    );
  }, [ref]);

  useEffect(() => {
    const modal = ref.current;

    if (typeof window === 'undefined') return;

    if (!isOpen || !modal) return;

    const body = document.body;

    const currentActive = document.activeElement;
    if (currentActive instanceof HTMLElement) {
      focusStack.push(currentActive);
    }

    if (openModals === 0) {
      prevOverflow = window.getComputedStyle(body).overflow;
      body.style.overflow = 'hidden';
    }

    openModals++;

    requestAnimationFrame(() => {
      const focusable = getFocusableElements();
      if (focusable.length > 0) {
        focusable[0].focus();
      } else {
        modal.tabIndex = -1;
        modal.focus();
      }
    });

    // Focus trap
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        modal.dispatchEvent(new CustomEvent('modal:close'));
        return;
      }

      if (e.key !== 'Tab') return;

      const elements = getFocusableElements();
      if (elements.length === 0) {
        e.preventDefault();
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        if (active === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return (): void => {
      document.removeEventListener('keydown', handleKeyDown);
      openModals = Math.max(0, openModals - 1);

      const lastFocused = focusStack.pop();
      if (
        lastFocused &&
        typeof lastFocused.focus === 'function' &&
        document.contains(lastFocused)
      ) {
        lastFocused.focus();
      }

      if (openModals === 0) {
        body.style.overflow = prevOverflow;
      }
    };
  }, [isOpen, getFocusableElements, ref]);
}
