'use client';

import React, { JSX } from 'react';
import { HeaderItem, ReportListDeskProps } from '@/types/reportType';
import { ReportItemDesk } from './ReportItemDesk';
import { Slider } from '@/components/ui/Slider';
import { useTranslations } from 'next-intl';
import { OrgNoFound } from '../organizations/OrgNoFound';

export const ReportListDesk = ({
  reports,
}: ReportListDeskProps): JSX.Element => {
  const t = useTranslations('adminReport');

  const HEADER_ITEMS: HeaderItem[] = [
    { label: t('id') },
    { label: t('reportedUser') },
    { label: t('reportedBy') },
    { label: t('reason') },
    { label: t('status') },
    { label: t('date') },
  ];

  return (
    <>
      <ul className="lg:w-254.5 overflow-hidden grid grid-cols-6 gap-2 lg:gap-4 mb-6 bg-card px-6 py-3 rounded-sm font-semibold list-none w-full md:grid-cols-[60px_130px_120px_80px_80px_60px] lg:grid-cols-[100px_200px_200px_150px_150px_80px]">
        {HEADER_ITEMS.map((item, index) => (
          <li
            key={index}
            className="flex items-center text-left justify-between"
          >
            <span>{item.label}</span>
            {index < HEADER_ITEMS.length - 1 && (
              <span className="text-muted-foreground/30 ml-1">|</span>
            )}
          </li>
        ))}
      </ul>

      {reports.length === 0 ? (
        <OrgNoFound />
      ) : (
        <Slider
          containerClassName="lg:max-w-[1018px]"
          itemClassName="p-0 w-full"
          listClassName="gap-6 w-full"
          showPagination={true}
          items={reports}
          itemsPerSlide={6}
          renderItem={(report, idx) => (
            <ReportItemDesk key={`${idx}-${report.id}`} report={report} />
          )}
        />
      )}
    </>
  );
};
