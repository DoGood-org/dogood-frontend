import { RenderFieldProps } from '@/types/reportType';
import React, { JSX } from 'react';

export const RenderField = ({
  label,
  value,
  className = '',
  labelClassName = 'font-semibold',
  valueClassName = 'min-w-0',
}: RenderFieldProps): JSX.Element => (
  <div className={`flex flex-col gap-1 min-w-0 flex-1 ${className}`}>
    <span className={labelClassName}>{label}</span>
    <div className={valueClassName}>{value}</div>
  </div>
);
