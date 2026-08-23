import { getStatusStyles } from '@/lib/utils';
import { IReportItem } from '@/types/reportType';
import React, { JSX, useState } from 'react';
import { RenderUser } from './RenderUser';
import { useTranslations } from 'next-intl';
import { ReportModal } from './ReportModal';
import { RenderField } from './RenderField';
import { RenderRow } from './RenderRow';

export const ReportItemMob = ({
  report,
}: {
  report: IReportItem;
}): JSX.Element => {
  const t = useTranslations('adminReport');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="bg-modal flex flex-col gap-3 mb-2 rounded-sm py-2.5 px-4.5 w-full">
      <RenderRow className="justify-between items-center">
        <RenderField
          label={t('id')}
          value={<span>{report.id}</span>}
          className="flex-row items-center gap-2"
          labelClassName="font-medium"
          valueClassName="min-w-0"
        />
        <RenderField
          className="items-end"
          value={
            <button
              className={getStatusStyles(report.status).className}
              style={getStatusStyles(report.status).style}
            >
              {report.status}
            </button>
          }
        />
      </RenderRow>

      <RenderRow onClick={handleRowClick} className="gap-3">
        <div className="border border-text-gray w-[1px] h-[43px]"></div>

        <RenderField
          label={t('reportedUser')}
          value={<RenderUser user={report.reportedUser} />}
        />
      </RenderRow>

      {isModalOpen && (
        <ReportModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          report={report}
        />
      )}
    </div>
  );
};
