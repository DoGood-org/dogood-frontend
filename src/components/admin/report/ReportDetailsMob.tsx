import { IReportDetailsMob } from '@/types/reportType';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { RenderUser } from './RenderUser';
import { RenderField } from './RenderField';
import { RenderRow } from './RenderRow';
import { CloseIcon } from '@/components/icons';
import { ButtonControls } from './ButtonControls';
import { FilterSelect } from '../reviews/FilterSelect';

export const ReportDetailsMob: React.FC<IReportDetailsMob> = ({
  setIsOpen,
  report,
}): React.JSX.Element => {
  const t = useTranslations('adminReport');
  const [selectedStatus, setSelectedStatus] = useState<string>(report.status);

  const statusOptions = [
    { value: 'pending', label: t('pending') },
    { value: 'reviewed', label: t('reviewed') },
    { value: 'resolved', label: t('resolved') },
  ];

  const handleStatusChange = (value: string): void => {
    setSelectedStatus(value);
  };

  const handleReject = (): void => {
    //TODO: Add Reject Logic
    console.log('Rejected report:', report.id);
  };

  const handleApprove = (): void => {
    // TODO: Add Approve Logic
    console.log('Approved report:', report.id);
  };

  return (
    <div className="flex flex-col gap-3 rounded-sm p-5 w-full">
      <RenderRow className="justify-between items-center">
        <RenderField
          label={t('id')}
          value={<span>{report.id}</span>}
          className="flex-row items-center gap-2"
          labelClassName="font-medium"
          valueClassName="min-w-0"
        />
        <CloseIcon
          className="w-6 h-6 cursor-pointer flex-shrink-0"
          onClick={() => setIsOpen(false)}
        />
      </RenderRow>
      <RenderRow className="flex-col gap-3">
        <RenderField
          label={t('reportedUser')}
          value={<RenderUser user={report.reportedUser} />}
        />
        <RenderField
          label={t('reportedBy')}
          value={<RenderUser user={report.reportedBy} />}
        />
      </RenderRow>
      <div className="border-t border-text-gray w-full"></div>
      <RenderRow className="flex justify-between">
        <RenderField
          label={t('reason')}
          value={
            <span className="truncate block " title={report.reason}>
              {report.reason}
            </span>
          }
          className="flex-2"
        />
        <RenderField
          label={t('date')}
          value={<span className="whitespace-nowrap">{report.date}</span>}
          className="flex-1"
        />
      </RenderRow>
      <div className="border-t border-text-gray w-full"></div>
      <RenderField
        label={t('status')}
        labelClassName="mb-2"
        value={
          <FilterSelect
            value={selectedStatus}
            onValueChange={handleStatusChange}
            options={statusOptions}
            placeholder={t('selectStatus') || 'Select status'}
          />
        }
      />
      <ButtonControls
        onReject={handleReject}
        onApprove={handleApprove}
        buttonClassName="w-[131px]"
      />
    </div>
  );
};
