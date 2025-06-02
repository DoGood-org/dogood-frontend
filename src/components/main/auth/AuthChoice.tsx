'use client';

import GroupAuthIcon from '@/components/icons/GroupAuthIcon';
import UserAuthIcon from '@/components/icons/UserAuthIcon';
import React from 'react';
import AuthChoiceButton from './AuthChoiceButton';
import { useTranslations } from 'next-intl';

type AuthChoiceProps = {
  onChoice: (choice: 'human' | 'company') => void;
};

export const AuthChoice: React.FC<AuthChoiceProps> = ({ onChoice }) => {
  const t = useTranslations('auth');
  const AuthChoiceConfig = {
    human: { title: t('personalAccount'), icon: <UserAuthIcon /> },
    company: { title: t('businessAccount'), icon: <GroupAuthIcon /> },
  };
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
    <div className=" flex flex-col items-center justify-center text-white max-w-[812px] w-full">
      <h2 className="font-bold text-[32px] mb-[100px] text-center">
        {t('choose')}
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
