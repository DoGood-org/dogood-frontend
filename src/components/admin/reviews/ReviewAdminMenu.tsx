'use client';

import { JSX, useState } from 'react';
import { useTranslations } from 'next-intl';

import { MoreMenu } from '@/components/ui/MoreMenu';
import { Gear, TrashBinChat } from '@/components/icons';
import { MenuAction } from '@/components/ui/MenuAction';
import { useMediaQuery } from '@/hooks';
import { EditFormModal } from './EditFormModal';
import { ActionConfig, IReviewsItem } from '@/types';
import { DeleteReviewFormModal } from './DeleteReviewFormModal';

export const ReviewAdminMenu = ({
  review,
}: {
  review: IReviewsItem;
}): JSX.Element => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const t = useTranslations('adminReviews');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const actions: ActionConfig[] = [
    {
      id: 'edit',
      icon: Gear,
      label: t('edit'),
      action: (): void => {
        setIsEditModalOpen(true);
      },
    },
    {
      id: 'delete',
      icon: TrashBinChat,

      label: t('delete'),
      action: (): void => {
        setIsDeleteModalOpen(true);
      },
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
        "
      />

      <DeleteReviewFormModal
        revId={review.id}
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
      />
      <EditFormModal
        review={review}
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
      />
    </div>
  );
};
