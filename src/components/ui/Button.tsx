import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-10 whitespace-nowrap rounded-lg text-p2-d font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-btn text-btn-text shadow-xs rounded-lg px-3 text-p2-d font-semibold',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        // secondary:
        //   'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'text-foreground text-lg font-normal hover:border-btn-outline-hover',
        link: 'text-primary underline-offset-4 hover:underline',
        primary:
          'relative text-btn-text text-lg bg-btn overflow-hidden group transition-colors duration-500',
        outline:
          'relative text-primary-foreground border font-semibold overflow-hidden group transition-colors duration-500',
        filters: 'bg-card text-base',
      },
      size: {
        default: 'h-11 px-3 py-3 rounded-lg has-[>svg]:px-3',
        xs: 'h-9 rounded-md text-p2-d px-3 font-normal xl:h-11 xl:px-4 text-h4-d has-[>svg]:px-2.5', //header
        sm: 'h-[42px] px-[18px] rounded-md text-p2-h font-normal md:h-11 md:px-3 md:rounded-lg xl:h-12 xl:rounded-md xl:text-h4-d', //about
        md: 'h-11 rounded-lg px-3', //forms
        lg: 'h-[50px] rounded-md px-[18px] font-semibold  text-p2-d  md:h-10 md:px-[15px] xl:h-12 xl:rounded-sm xl:text-h4-d has-[>svg]:px-4 ', //hero
        xl: 'h-[52px] rounded-[10px] px-[35px] py-[15px]', //filter
        '2xl':
          'h-[54px] rounded-md px-[15px] text-p2-d font-semibold md:h-11 md:px-3 md:rounded-lg xl:h-12 xl:text-h5-d', //about-button
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
