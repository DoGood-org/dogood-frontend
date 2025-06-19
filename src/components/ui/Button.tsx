import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-base transition-all disabled:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-btn-hover aria-invalid:border-destructive cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-btn hover:bg-btn-hover active:bg-btn-hover text-btn-primary rounded-sm px-3 text-base',
        ghost:
          'text-btn-text text-base border-1 border-transparent active:border-btn-outline-hover',
        primary:
          'text-btn-primary text-base bg-btn overflow-hidden hover:bg-btn-hover active:bg-btn-active group transition-colors duration-500',
        secondary:
          'text-btn-secondary border-1 border-btn-outline hover:border-btn-outline-hover',
        filters: 'bg-card text-base',
        tag: 'bg-tag text-base gap-2',
      },
      size: {
        default: 'h-12 px-8 py-3',
        sm: 'h-9 px-4 py-2 rounded-sm',
        md: 'h-10 rounded-lg px-3',
        lg: 'h-12 rounded-sm px-12',
        xl: 'h-[52px] rounded-[10px] px-[35px] py-[15px]',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps): React.JSX.Element {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
