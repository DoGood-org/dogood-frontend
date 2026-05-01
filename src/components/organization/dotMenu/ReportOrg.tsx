'use client';

import { useTranslations } from 'next-intl';
import { JSX, useCallback, useEffect, useRef, useState } from 'react';
import { LinkCopied, More, Settings } from '@/components/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReportModal } from '@/components/publicAccount/ReportModal';
import { ReportItem } from './ReportItem';
import { CopyLink } from './CopyLink';
import { LeaveOrg } from './LeaveOrg';
import { LeaveModal } from './LeaveModal';
import { Role } from '@/types';

export const ReportOrg = ({
  role,
  orgId,
}: {
  role: Role;
  orgId: string;
}): JSX.Element => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const t = useTranslations('organization');
  const pathname = usePathname();

  const handleClickOutside = useCallback(
    (e: MouseEvent): void => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleToggleMenu = (e: React.MouseEvent<SVGSVGElement>): void => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const adminVersion = (
    <Link
      href={`${pathname}/profile`}
      className="flex gap-3 hover:text-btn-hover active:text-btn-active"
    >
      <Settings className="size-5 stroke-current" />
      {t('settings')}
    </Link>
  );

  const baseList = (
    <>
      <ReportItem setIsOpen={setIsOpen} setIsModalOpen={setIsModalOpen} />
      <CopyLink setIsOpen={setIsOpen} setCopied={setCopied} />
    </>
  );

  const guestVersion = <CopyLink setIsOpen={setIsOpen} setCopied={setCopied} />;

  const memberVersion = (
    <ul>
      {baseList}
      <LeaveOrg setIsOpen={setIsOpen} setIsModalOpen={setIsLeaveModalOpen} />
    </ul>
  );

  const userVersion = <ul>{baseList}</ul>;

  const reportVersions = {
    ADMIN: adminVersion,
    MODERATOR: adminVersion,
    MEMBER: memberVersion,
    USER: userVersion,
    GUEST: guestVersion,
  };

  return (
    <>
      <div ref={buttonRef} className="relative">
        <More
          className="absolute top-0 right-2 w-5 h-5 text-foreground cursor-pointer 
              hover:text-btn-hover active:text-btn-active"
          onClick={handleToggleMenu}
        />
        {isOpen && (
          <div className="absolute top-[25px] right-2  rounded-lg bg-card p-4">
            {reportVersions[role]}
          </div>
        )}
        {copied && (
          <div className="absolute top-[25px] right-2 rounded-lg bg-card p-4 p-3 text-nowrap flex gap-4 justify-start items-center text-foreground">
            <LinkCopied className="size-5 fill-current" />
            {t('linkCopied')}
          </div>
        )}
      </div>
      {isModalOpen && (
        <ReportModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
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
