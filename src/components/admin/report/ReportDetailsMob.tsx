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
import { Button } from '@/components/ui/Button';

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
          <Select value={selectedStatus} onValueChange={handleStatusChange}>
            <SelectTrigger
              className="w-full"
              style={{
                height: '48px',
                borderRadius: '4px',
                borderColor: 'var(--text-help)',
              }}
            >
              <SelectValue placeholder={t('selectStatus') || 'Select status'} />
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
      <div className="flex justify-between">
        <Button variant="secondary" className="w-[131px]">
          Reject
        </Button>
        <Button variant="primary" className="w-[131px]">
          Approve
        </Button>
      </div>
    </div>
  );
};
