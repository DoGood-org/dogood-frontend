import { useTranslations } from 'next-intl';
import React from 'react';

export const EmptyChatMessage: React.FC = () => {
  const t = useTranslations('chat');

  return (
    <section>
      <h3 className="text-foreground text-base">
        {t('emptyState.emptyChatMessage2')}
      </h3>
    </section>
  );
};
