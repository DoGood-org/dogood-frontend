'use client';

import GroupAuthIcon from '@/components/icons/GroupAuthIcon';
import UserAuthIcon from '@/components/icons/UserAuthIcon';
import React from 'react';
import AuthChoiceButton from './AuthChoiceButton';

type AuthChoiceProps = {
  onChoice: (choice: 'human' | 'company') => void;
};

const AuthChoiceConfig = {
  human: { title: 'I’m a human', icon: <UserAuthIcon /> },
  company: { title: 'I’m a company or organization', icon: <GroupAuthIcon /> },
};

export const AuthChoice: React.FC<AuthChoiceProps> = ({ onChoice }) => {
  const handleHumanAuth = (): void => {
    onChoice('human');
  };
  const handleCompanyAuth = (): void => {
    onChoice('company');
  };
  const handleAuthChoice = (choice: 'human' | 'company'): void => {
    if (choice === 'human') {
      handleHumanAuth();
    } else {
      handleCompanyAuth();
    }
  };
  return (
    <div className=" flex flex-col items-center justify-center h-[calc(100vh-188px)] text-white max-w-[812px] w-full">
      <h2 className="font-bold text-[32px] mb-[100px] text-center">
        Choose how you want to join
      </h2>
      <div className="flex justify-between w-full">
        <AuthChoiceButton
          icon={AuthChoiceConfig.human.icon}
          title={AuthChoiceConfig.human.title}
          handleAuthChoice={() => handleAuthChoice('human')}
        />
        <AuthChoiceButton
          icon={AuthChoiceConfig.company.icon}
          title={AuthChoiceConfig.company.title}
          handleAuthChoice={() => handleAuthChoice('company')}
        />
      </div>
    </div>
  );
};
