import { IDescriptionProps } from '@/types/mapType';
import React, { FC } from 'react';

export const Description: FC<IDescriptionProps> = ({ description }) => {
  return (
    <div className="w-[478px] h-[580px] left-[-10px] bg-background p-8 rounded-[10px] shadow-lg overflow-auto">
      {description}
    </div>
  );
};
