import React, { JSX, useState } from 'react';
import { IReportItem } from '@/types/reportType';
import { getStatusStyles } from '@/lib/utils';
import { RenderUser } from './RenderUser';
import { ReportModal } from './ReportModal';

export const ReportItemDesk = ({
  report,
}: {
  report: IReportItem;
}): JSX.Element => {
  const columns = [
    {
      key: 'id',
      content: (
        <span className="truncate" title={report.id}>
          {report.id}
        </span>
      ),
    },
    {
      key: 'reportedUser',
      content: <RenderUser user={report.reportedUser} />,
    },
    {
      key: 'reportedBy',
      content: <RenderUser user={report.reportedBy} />,
    },
    {
      key: 'reason',
      content: (
        <span className="truncate block" title={report.reason}>
          {report.reason}
        </span>
      ),
    },
    {
      key: 'status',
      content: (
        <button
          className={getStatusStyles(report.status).className}
          style={getStatusStyles(report.status).style}
        >
          {report.status}
        </button>
      ),
    },
    {
      key: 'date',
      content: <span className="whitespace-nowrap">{report.date}</span>,
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (): void => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <ul
      key={report.id}
      className="lg:w-[1018px] overflow-hidden grid grid-cols-6 gap-2 lg:gap-4 bg-modal px-6 py-3 rounded-sm list-none w-full md:grid-cols-[60px_130px_120px_80px_80px_60px] lg:grid-cols-[100px_200px_200px_150px_150px_80px]"
    >
      {columns.map((column) => (
        <li
          key={column.key}
          className="text-left overflow-hidden flex items-center lg:justify-start"
          onClick={handleRowClick}
        >
          {column.content}
        </li>
      ))}
      {isModalOpen && (
        <ReportModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          report={report}
        />
      )}
    </ul>
  );
};
