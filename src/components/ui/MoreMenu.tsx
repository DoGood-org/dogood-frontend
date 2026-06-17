import { JSX, ReactNode } from 'react';
import { More } from '@/components/icons';
import { cn } from '@/lib/utils';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { stopEvent } from '@/lib/stopEvent';

export type MoreMenuItem = {
  id: string;
  content: (close: () => void) => ReactNode;
};

type MoreMenuProps = {
  items: MoreMenuItem[];
  className?: string;
  triggerClassName?: string;
  menuWrapperClassName?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
};

export const MoreMenu = ({
  items,
  className = '',
  triggerClassName = '',
  menuWrapperClassName = '',
  side = 'bottom',
  align = 'end',
}: MoreMenuProps): JSX.Element => {
  return (
    <div className={cn('relative', className)}>
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            className={cn(
              'px-2 w-10 h-10 flex justify-center align-center',
              triggerClassName
            )}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={stopEvent}
          >
            <More className="cursor-pointer size-5 text-foreground hover:text-btn-hover active:text-btn-active" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            side={side}
            align={align}
            avoidCollisions
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'rounded-lg bg-admin-more p-4 shadow-lg translate-y-3 z-[999] relative',
              menuWrapperClassName
            )}
          >
            <ul className="flex flex-col gap-3 text-white">
              {items.map((item) => (
                <li key={item.id}>
                  {item.content(() => {
                    const event = new KeyboardEvent('keydown', {
                      key: 'Escape',
                    });

                    document.dispatchEvent(event);
                  })}
                </li>
              ))}
            </ul>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};
