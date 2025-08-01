'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '@/lib/utils';

const backgroundColors = [
  '#cfcfcf',
  '#ff7d57',
  '#2c8c8c',
  '#5673c2',
  '#e4a23c',
  '#01425c',
  '#ff7d57',
  '#e4a23c',
];

function getColorFromString(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % backgroundColors.length;
  return backgroundColors[index];
}

type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root>;

function Avatar({ className, ...props }: AvatarProps): React.JSX.Element {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        'relative flex w-8 h-8 shrink-0 overflow-hidden rounded-full',
        className
      )}
      {...props}
    />
  );
}

type AvatarImageProps = React.ComponentProps<typeof AvatarPrimitive.Image>;

function AvatarImage({
  className,
  ...props
}: AvatarImageProps): React.JSX.Element {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('aspect-square size-full object-cover', className)}
      {...props}
    />
  );
}

type AvatarFallbackProps = React.ComponentProps<
  typeof AvatarPrimitive.Fallback
> & {
  name?: string;
};

function AvatarFallback({
  className,
  name = '',
  ...props
}: AvatarFallbackProps): React.JSX.Element {
  const bg = getColorFromString(name.trim());
  const letter = name.trim().charAt(0).toUpperCase() || '';

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'flex w-full h-full items-center justify-center rounded-full text-white select-none uppercase',
        className
      )}
      style={{
        backgroundColor: bg,
        fontSize: 'calc(50% + 1rem)',
        lineHeight: 1,
      }}
      {...props}
    >
      {letter}
    </AvatarPrimitive.Fallback>
  );
}

export { Avatar, AvatarImage, AvatarFallback };
