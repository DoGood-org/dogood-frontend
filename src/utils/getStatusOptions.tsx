import React from 'react';
import Pending from '@/components/icons/Pending';
import Approved from '@/components/icons/Approved';
import Rejected from '@/components/icons/Rejected';
import { FilterOption } from '@/types';

export const getStatusOptions = (
  t: (key: string) => string
): FilterOption[] => [
  {
    value: 'Under consideration',
    label: (
      <span className="flex items-center gap-2">
        <Pending /> {t('pending')}
      </span>
    ),
  },
  {
    value: 'Confirmed',
    label: (
      <span className="flex items-center gap-2">
        <Approved /> {t('approved')}
      </span>
    ),
  },
  {
    value: 'Rejected',
    label: (
      <span className="flex items-center gap-2">
        <Rejected /> {t('rejected')}
      </span>
    ),
  },
];
