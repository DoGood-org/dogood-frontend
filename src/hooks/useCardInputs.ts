import { useTranslations } from 'next-intl';
import { RegisterOptions } from 'react-hook-form';

type Field = 'name' | 'country' | 'city';

type InputField = {
  name: 'fullName' | 'country' | 'city';
  placeholder: string;
  validation: RegisterOptions<CardFormData>;
};

export type CardFormData = {
  fullName: string;
  country: string;
  city: string;
};

type UseCardInputsReturn = {
  inputData: readonly InputField[];
  createValidation: (field: Field) => RegisterOptions<CardFormData>;
};

export const useCardInputs = (): UseCardInputsReturn => {
  const t = useTranslations('card');

  const createValidation = (field: Field): RegisterOptions<CardFormData> => ({
    required: t('validation.required'),
    minLength: {
      value: 2,
      message: t(`validation.${field}TooShort`),
    },
  });

  const inputData = [
    {
      name: 'fullName',
      placeholder: t('fullName'),
      validation: createValidation('name'),
    },
    {
      name: 'country',
      placeholder: t('country'),
      validation: createValidation('country'),
    },
    {
      name: 'city',
      placeholder: t('city'),
      validation: createValidation('city'),
    },
  ] as const;

  return { inputData, createValidation };
};
