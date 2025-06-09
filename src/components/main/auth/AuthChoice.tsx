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
  const title = t('chooseAccountType');
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
    <div className=" flex flex-col max-w-[670px] w-full gap-[48px] text-white z-10">
      <div className="montserrat text-center">
        <h2 className="text-[44px] font-bold leading-[52px] ">
          {title}
        </h2>
      </div>
      <div className="flex  gap-[48px] justify-center ">
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
