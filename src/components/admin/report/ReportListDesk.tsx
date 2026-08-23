'use client';

import React, { JSX, useState, useCallback } from 'react';
import {
  HeaderItem,
  IReportItem,
  ReportListDeskProps,
} from '@/types/reportType';
import { ReportItemDesk } from './ReportItemDesk';
import { Slider } from '@/components/ui/Slider';
import { useTranslations } from 'next-intl';
import { SearchInput } from './SearchInput';
import { OrgNoFound } from '../organizations/OrgNoFound';

export const ReportListDesk = ({
  reports,
}: ReportListDeskProps): JSX.Element => {
  const t = useTranslations('adminReport');
  const [filteredReports, setFilteredReports] =
    useState<IReportItem[]>(reports);

  const HEADER_ITEMS: HeaderItem[] = [
    { label: t('id') },
    { label: t('reportedUser') },
    { label: t('reportedBy') },
    { label: t('reason') },
    { label: t('status') },
    { label: t('date') },
  ];

  // Use useCallback to memoize the handleSearch function
  const handleSearch = useCallback(
    (query: string): void => {
      if (!query || !query.trim()) {
        setFilteredReports(reports);
        return;
      }

      const searchQuery = query.toLowerCase().trim();
      const filtered = reports.filter((report) => {
        return report.id.toLowerCase().includes(searchQuery);
      });

      setFilteredReports(filtered);
    },
    [reports]
  );

  return (
    <>
      <div className="flex items-center gap-2 mb-6 w-full">
        <SearchInput
          onSearch={handleSearch}
          placeholder={t('searchPlaceholder')}
        />
      </div>

      <ul className="lg:w-[1018px] overflow-hidden grid grid-cols-6 gap-2 lg:gap-4 mb-6 bg-card px-6 py-3 rounded-sm font-semibold list-none w-full md:grid-cols-[60px_130px_120px_80px_80px_60px] lg:grid-cols-[100px_200px_200px_150px_150px_80px]">
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

      {filteredReports.length === 0 ? (
        <OrgNoFound />
      ) : (
        <Slider
          containerClassName="lg:max-w-[1018px]"
          itemClassName="p-0 w-full"
          listClassName="gap-6 w-full"
          showPagination={true}
          items={filteredReports}
          itemsPerSlide={6}
          renderItem={(report, idx) => (
            <ReportItemDesk key={`${idx}-${report.id}`} report={report} />
          )}
        />
      )}
    </>
  );
};
