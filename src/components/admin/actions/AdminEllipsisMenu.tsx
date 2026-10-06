'use client';

import { AdminChatModal } from './AdminChatModal';
import { MoreMenu } from '@/components/ui/MoreMenu';

export const AdminEllipsisMenu: React.FC = () => {
  return (
    <MoreMenu
      items={[
        {
          id: 'admin-modal-content',
          content: (close) => <AdminChatModal onClose={close} />,
        },
      ]}
    />
  );
};
