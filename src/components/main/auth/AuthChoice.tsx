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
    human: {
      title: t('personalAccount'),
      icon: <UserAuthIcon />,
    },
    company: {
      title: t('businessAccount'),
      icon: <GroupAuthIcon />,
    },
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
    <div
      className="flex flex-col items-center justify-center gap-[24px]  max-w-full text-foreground z-10 my-0 mx-auto

    md:gap-[48px] lg:max-w-[670px] lg:gap-[48px] "
    >
      <div className="montserrat text-center">
        <h2 className="text-[24px] leading-[32px] md:text-[44px] font-normal md:leading-[52px] text-foreground">
          {title}
        </h2>
      </div>
      <div className="flex gap-[48px] md:gap-[44px] justify-center">
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
