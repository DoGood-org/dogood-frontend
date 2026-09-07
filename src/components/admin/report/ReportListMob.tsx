'use client';

import { IReportItem } from '@/types/reportType';
import React, { JSX, useState } from 'react';
import { ReportItemMob } from './ReportItemMob';
import { useTranslations } from 'next-intl';
import { SearchInput } from './SearchInput';
import { OrgNoFound } from '../organizations/OrgNoFound';

export const ReportListMob = ({
  reports,
}: {
  reports: IReportItem[];
}): JSX.Element => {
  const t = useTranslations('adminReport');
  const [filteredReports, setFilteredReports] =
    useState<IReportItem[]>(reports);

  const handleSearch = (query: string): void => {
    if (!query || !query.trim()) {
      setFilteredReports(reports);
      return;
    }

    const searchQuery = query.toLowerCase().trim();
    const filtered = reports.filter((report) => {
      return report.id.toLowerCase().includes(searchQuery);
    });

    setFilteredReports(filtered);
  };

  return (
    <div>
      <div className="mb-2 w-full">
        <SearchInput
          onSearch={handleSearch}
          placeholder={t('searchPlaceholder')}
        />
      </div>

      {filteredReports.length === 0 ? (
        <OrgNoFound />
      ) : (
        <ul>
          {filteredReports.map((report, index) => (
            <li key={index}>
              <ReportItemMob report={report} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
