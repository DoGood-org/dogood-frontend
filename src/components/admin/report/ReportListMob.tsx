'use client';

import { IReportItem } from '@/types/reportType';
import React, { JSX } from 'react';
import { ReportItemMob } from './ReportItemMob';
import { OrgNoFound } from '../organizations/OrgNoFound';

export const ReportListMob = ({
  reports,
}: {
  reports: IReportItem[];
}): JSX.Element => {
  return (
    <>
      {reports.length === 0 ? (
        <OrgNoFound />
      ) : (
        <ul>
          {reports.map((report, index) => (
            <li key={index}>
              <ReportItemMob report={report} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
