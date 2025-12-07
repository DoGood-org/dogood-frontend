import React from 'react';
import { CaretDown } from '../icons';
import { Button } from '../ui/Button';
import { useTranslations } from 'next-intl';

interface BackToTopButtonProps {
  show: boolean;
}

export default function BackToTopButton({
  show,
}: BackToTopButtonProps): React.ReactElement | null {
  const t = useTranslations('cookies');

  if (!show) return null;

  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const title = t('backToTop.title');

  return (
    <div className="w-full flex justify-center mt-[50px]">
      <Button
        variant="ghost"
        onClick={handleClick}
        title={title}
        className="text-foreground text-[20px] md:text-h2-m lg:text-h2 flex gap-2 flex-col hover:text-btn-hover focus:text-btn-hover active:text-btn-active h-auto p-0"
      >
        <CaretDown className="size-8 rotate-180" />
        {t('backToTop.text')}
      </Button>
    </div>
  );
}
