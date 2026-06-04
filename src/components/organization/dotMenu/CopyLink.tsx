'use client';

import { JSX } from 'react';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { Link } from '../../icons';

type CopyLinkProps = {
  onCopied: () => void;
};

export const CopyLink = ({ onCopied }: CopyLinkProps): JSX.Element => {
  const t = useTranslations('organization');

  const handleCopy = async (): Promise<void> => {
    const url = window.location.href;

    await navigator.clipboard.writeText(url);
    onCopied();
  };

  return (
    <li>
      <Button
        variant="ghost"
        onClick={handleCopy}
        className="flex justify-start gap-4 p-3 hover:text-btn-hover active:text-btn-active text-foreground"
      >
        <Link className="fill-current stroke-current size-5" />
        {t('dotMenu.copyLink')}
      </Button>
    </li>
  );
};
