'use client';

import { JSX, ReactNode, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LinkCopied, Settings } from '@/components/icons';

import { ReportModal } from '@/components/publicAccount/ReportModal';
import { ReportItem } from './ReportItem';
import { CopyLink } from './CopyLink';
import { LeaveOrg } from './LeaveOrg';
import { LeaveModal } from './LeaveModal';

import { Role } from '@/types';
import { MoreMenu, MoreMenuItem } from '@/components/ui/MoreMenu';

export const ReportOrg = ({
  role,
  orgId,
}: {
  role: Role;
  orgId: string;
}): JSX.Element => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const pathname = usePathname();
  const t = useTranslations('organization');

  const items = useMemo<MoreMenuItem[]>(() => {
    const adminItems: MoreMenuItem[] = [
      {
        id: 'settings',
        content: (close) => (
          <Link
            href={`${pathname}/profile`}
            onClick={close}
            className="flex gap-3 hover:text-btn-hover active:text-btn-active"
          >
            <Settings className="stroke-current size-5" />
            {t('settings')}
          </Link>
        ),
      },
    ];

    const commonItems: MoreMenuItem[] = [
      {
        id: 'report',
        content: (close): JSX.Element => (
          <ReportItem
            onClick={() => {
              close();
              setIsReportModalOpen(true);
            }}
          />
        ),
      },
      {
        id: 'copy',
        content: (close) => (
          <CopyLink
            onCopied={() => {
              setCopied(true);
              close();
            }}
          />
        ),
      },
    ];

    const memberItems: MoreMenuItem[] = [
      ...commonItems,
      {
        id: 'leave',
        content: (close): JSX.Element => (
          <LeaveOrg
            onClick={() => {
              close();
              setIsLeaveModalOpen(true);
            }}
          />
        ),
      },
    ];

    switch (role) {
      case 'ADMIN':
      case 'MODERATOR':
        return adminItems;

      case 'MEMBER':
        return memberItems;

      case 'USER':
        return commonItems;

      case 'GUEST':
        return [
          {
            id: 'copy',
            content: (close): ReactNode => (
              <CopyLink
                onCopied={() => {
                  setCopied(true);
                  close();
                }}
              />
            ),
          },
        ];

      default:
        return [];
    }
  }, [pathname, role, t]);

  return (
    <>
      <MoreMenu items={items} />

      {copied && (
        <div className="absolute top-[25px] right-2 rounded-lg bg-card p-3 text-nowrap flex gap-4 items-center text-foreground">
          <LinkCopied className="fill-current size-5" />
          {t('linkCopied')}
        </div>
      )}

      {isReportModalOpen && (
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
        />
      )}

      {isLeaveModalOpen && (
        <LeaveModal
          isOpen={isLeaveModalOpen}
          onClose={() => setIsLeaveModalOpen(false)}
          orgId={orgId}
        />
      )}
    </>
  );
};
