'use client';

import { JSX } from 'react';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { Link } from '../../icons';

type CopyLinkProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCopied: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CopyLink = ({
  setIsOpen,
  setCopied,
}: CopyLinkProps): JSX.Element => {
  const t = useTranslations('organization');

  const handleCopy = async (): Promise<void> => {
    const url = window.location.href;

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setIsOpen(false);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <li>
      <Button
        variant="ghost"
        onClick={handleCopy}
        className="p-3 hover:text-btn-hover active:text-btn-active flex gap-4 justify-start text-foreground"
      >
        <Link className="size-5 fill-current stroke-current" />
        {t('dotMenu.copyLink')}
      </Button>
    </li>
  );
};
