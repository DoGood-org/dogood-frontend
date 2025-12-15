import { Account } from '@/components/account/accountPage/Account';
import React from 'react';
import { mockUser } from '@/data/mockUser';

const AccountPage: React.FC = () => {
  return <Account user={mockUser} />;
};

export default AccountPage;
