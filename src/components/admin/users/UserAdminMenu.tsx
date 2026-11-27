'use client';

import { JSX, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MoreMenu } from '@/components/ui/MoreMenu';
import {
  TrashBinChat,
  ChevronDown,
  View,
  StarOrg,
  Notebook,
  UserList,
  LockIcon,
} from '@/components/icons';
import { MenuAction } from '@/components/ui/MenuAction';
import { useMediaQuery } from '@/hooks';
import { ActionConfig, IAdminUser } from '@/types/admin';
import { cn } from '@/lib/utils';
import { DeleteUserFormModal } from './DeleteUserFormModal';

export const UserAdminMenu = ({ user }: { user: IAdminUser }): JSX.Element => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewExpanded, setIsViewExpanded] = useState(false);
  const t = useTranslations('adminUsers');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const blockAction: ActionConfig = {
    id: 'block',
    icon: LockIcon,
    label: t('blockAccount'),
    action: (): void => {
      // Handle block action
    },
  };

  const deleteAction: ActionConfig = {
    id: 'delete',
    icon: TrashBinChat,
    label: t('deleteAccount'),
    action: (): void => {
      setIsDeleteModalOpen(true);
    },
  };

  const items = [
    // 1. Expandable "View account" item
    {
      id: 'view-account',
      content: (close: () => void): JSX.Element => (
        <div className="flex flex-col w-full">
          <MenuAction
            icon={View}
            label={
              <div className="flex items-center justify-between w-full gap-3">
                <span>{t('viewAccount')}</span>
                <ChevronDown
                  className={cn(
                    'stroke-current size-4 transition-transform duration-500',
                    isViewExpanded && 'rotate-180 stroke-btn'
                  )}
                />
              </div>
            }
            onClick={() => setIsViewExpanded((prev) => !prev)}
            className={
              isViewExpanded ? 'text-white hover:text-white' : 'text-current'
            }
            asChild
          />

          {/* Submenu */}
          {isViewExpanded && (
            <div className="flex flex-col pl-8 mt-2 gap-3">
              <MenuAction
                icon={StarOrg}
                label={t('reviews')}
                href={`/user/${user.id}/reviews`}
                onClick={close}
              />
              <MenuAction
                icon={UserList}
                label={t('tasksList')}
                href={`/user/${user.id}/tasks`}
                onClick={close}
              />
              <MenuAction
                icon={Notebook}
                label={t('reportsList')}
                href={`/user/${user.id}/reports`}
                onClick={close}
              />
            </div>
          )}
        </div>
      ),
    },
    // 2. Block Action
    {
      id: blockAction.id,
      content: (close: () => void): JSX.Element => (
        <MenuAction
          icon={blockAction.icon}
          label={blockAction.label}
          href={blockAction.href}
          onClick={() => {
            close();
            blockAction.action?.();
          }}
        />
      ),
    },
    // 3. Divider (Under Block)
    {
      id: 'divider',
      content: (): JSX.Element => (
        <div className="flex w-40 h-px bg-[#CFCFCF] mx-auto" />
      ),
    },
    // 4. Delete Action
    {
      id: deleteAction.id,
      content: (close: () => void): JSX.Element => (
        <MenuAction
          icon={deleteAction.icon}
          label={deleteAction.label}
          href={deleteAction.href}
          onClick={() => {
            close();
            deleteAction.action?.();
          }}
        />
      ),
    },
  ];

  return (
    <div className="rotate-90">
      <MoreMenu
        items={items}
        side={isMobile ? 'bottom' : 'left'}
        align={isMobile ? 'end' : 'start'}
        menuWrapperClassName="
          translate-y-2
          md:translate-y-3
          md:-translate-x-[14px]
          px-[30px] py-7
          min-w-[200px]
        "
      />
      <DeleteUserFormModal
        userId={user.id}
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
      />
    </div>
  );
};
