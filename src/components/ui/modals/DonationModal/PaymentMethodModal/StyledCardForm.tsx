import { CardFormProps } from '@/types';
import { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { CARD_FORM_OVERRIDE_CLASSES } from '@/lib/card-form-styles';
import { CardForm } from '@/components/account/settingsPage/PaymentModal/CardForm';

export const StyledCardForm = (props: CardFormProps): JSX.Element => {
  const t = useTranslations('card');

  return (
    <div
      className={`${CARD_FORM_OVERRIDE_CLASSES}
      focus:outline-none focus-within:ring-[#00c1ac]`}
    >
      <h2 className="text-base text-center mb-3">{t('title')}</h2>
      <CardForm {...props} />
    </div>
  );
};
