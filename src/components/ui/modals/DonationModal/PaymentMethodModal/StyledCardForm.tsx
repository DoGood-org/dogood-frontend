import { CardForm } from '@/components';
import { CardFormProps } from '@/types';
import { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { CARD_FORM_OVERRIDE_CLASSES } from '@/lib/card-form-styles';

export const StyledCardForm = (props: CardFormProps): JSX.Element => {
  const t = useTranslations('card');

  return (
    <div className={CARD_FORM_OVERRIDE_CLASSES}>
      <h2 className="text-base text-center mb-3">{t('title')}</h2>
      <CardForm {...props} />
    </div>
  );
};
