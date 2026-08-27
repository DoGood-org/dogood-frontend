import { IReportDetailsMob } from '@/types/reportType';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { RenderUser } from './RenderUser';
import { RenderField } from './RenderField';
import { RenderRow } from './RenderRow';
import { CloseIcon } from '@/components/icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { ButtonControls } from './ButtonControls';

export const ReportDetailsDesk: React.FC<IReportDetailsMob> = ({
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
    //TODO: Add Approve Logic
    console.log('Approved report:', report.id);
  };

  return (
    <div className="flex flex-col gap-3 rounded-sm p-10 pb-20 w-full">
      <RenderRow className="justify-between items-center mb-7">
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
      <RenderRow className="flex justify-between">
        <RenderField
          label={t('reason')}
          value={
            <span className="truncate block " title={report.reason}>
              {report.reason}
            </span>
          }
          className="flex-5"
        />
        <RenderField
          label={t('date')}
          value={<span className="whitespace-nowrap">{report.date}</span>}
          className="flex-1"
        />
      </RenderRow>
      <div className="flex gap-7 justify-between">
        <div className="border border-text-gray w-full p-[20px] flex-1">
          <RenderRow className="flex-col gap-10">
            <RenderField
              label={t('reportedUser')}
              value={<RenderUser user={report.reportedUser} />}
            />
            <RenderField
              label={t('reportedBy')}
              value={<RenderUser user={report.reportedBy} />}
            />
          </RenderRow>
        </div>
        <div className="border border-text-gray w-full p-[10px] flex-1">
          <RenderField
            label={t('status')}
            labelClassName="mb-2"
            value={
              <Select value={selectedStatus} onValueChange={handleStatusChange}>
                <SelectTrigger
                  className="w-full"
                  style={{
                    height: '48px',
                    borderRadius: '4px',
                    borderColor: 'var(--text-help)',
                    marginBottom: '20px',
                  }}
                >
                  <SelectValue
                    placeholder={t('selectStatus') || 'Select status'}
                  />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            }
          />
          <ButtonControls
            onReject={handleReject}
            onApprove={handleApprove}
            buttonClassName="w-[112px]"
          />
        </div>
      </div>
    </div>
  );
};
