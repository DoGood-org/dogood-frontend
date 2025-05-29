import { GroupAuthIcon } from '@/components/icons/GroupAuthIcon';
import { UserAuthIcon } from '@/components/icons/UserAuthIcon';
import { Button } from '@/components/ui/Button';
import React from 'react';

export const AuthChoice: React.FC = () => {
  const handleHumanAuth = (): void => {};
  const handleCompanyAuth = (): void => {};
  const handleAuthChoice = (choice: 'human' | 'company'): void => {
    if (choice === 'human') {
      handleHumanAuth();
    } else {
      handleCompanyAuth();
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-188px)] bg-gray-100">
      AuthChoice
      <h2>Choose how you want to join</h2>
      <div className="flex">
        <Button
          onClick={() => handleAuthChoice('human')}
          variant="outline"
          className="flex items-center bg-[var(--card)] text-white"
        >
          <span> I’m a human</span>

          <UserAuthIcon className="ml-2" />
        </Button>
        <Button
          onClick={() => handleAuthChoice('company')}
          variant="outline"
          className="flex items-center bg-[var(--card)] text-white"
        >
          <span>I’m a company or organization</span>
          <GroupAuthIcon className="ml-2" />
        </Button>
      </div>
    </div>
  );
};
