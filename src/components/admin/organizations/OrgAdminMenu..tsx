'use client';

import { JSX, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { MoreMenu } from '@/components/ui/MoreMenu';
import { DeleteFormModal } from '@/components/organization/profilePage/DeleteFormModal';
import { ChatCircle, Gear, TrashBinChat } from '@/components/icons';
import { MenuAction } from '@/components/ui/MenuAction';
import { useMediaQuery } from '@/hooks';

type OrganizationAdminMenuProps = {
  orgId: string;
};

type ActionConfig = {
  id: string;
  icon: React.ElementType;
  label: string;
  href?: string;
  action?: () => void;
};

export const OrganizationAdminMenu = ({
  orgId,
}: OrganizationAdminMenuProps): JSX.Element => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const t = useTranslations('adminOrg');
  const locale = useLocale();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const actions: ActionConfig[] = [
    {
      id: 'edit',
      icon: Gear,
      label: t('edit'),
      href: `/organization/${orgId}/profile`,
    },
    {
      id: 'delete',
      icon: TrashBinChat,
      label: t('delete'),
      action: (): void => {
        setIsDeleteModalOpen(true);
      },
    },
    {
      id: 'contact',
      icon: ChatCircle,
      label: t('contact'),
      href: `${locale}/account/chat`,
    },
  ];

  const items = actions.map((action) => ({
    id: action.id,
    content: (close: () => void): JSX.Element => (
      <MenuAction
        icon={action.icon}
        label={action.label}
        href={action.href}
        onClick={() => {
          close();
          action.action?.();
        }}
      />
    ),
  }));

  return (
    <>
      <MoreMenu
        items={items}
        side={isMobile ? 'bottom' : 'left'}
        align={isMobile ? 'end' : 'start'}
        menuWrapperClassName="
          translate-y-2
          md:translate-y-3
          md:-translate-x-[14px]
        "
      />

      <DeleteFormModal
        orgId={orgId}
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
      />
    </>
  );
};
