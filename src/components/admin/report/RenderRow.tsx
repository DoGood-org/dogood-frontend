import { RenderRowProps } from '@/types/reportType';
import React, { JSX } from 'react';

export const RenderRow = ({
  children,
  className = '',
  onClick,
}: RenderRowProps): JSX.Element => (
  <div className={`flex w-full ${className}`} onClick={onClick}>
    {children}
  </div>
);
