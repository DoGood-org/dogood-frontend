import { Account, AccountContent } from '@/components';
import React from 'react';

const AccountPage: React.FC = () => {
  return (
    <div className="h-full">
      <Account />
      <AccountContent />
    </div>
  );
};

export default AccountPage;
