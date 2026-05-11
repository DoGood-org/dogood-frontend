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
  const tCard = useTranslations('card');
  const tSettings = useTranslations('settings');

  const createValidation = (field: Field): RegisterOptions<CardFormData> => ({
    required: tCard('validation.required'),
    minLength: {
      value: 2,
      message:
        field === 'name'
          ? tCard('validation.nameTooShort')
          : tCard('validation.nameTooShort'),
    },
  });

  const inputData = [
    {
      name: 'fullName',
      placeholder: tSettings('basic.name.title'),
      validation: createValidation('name'),
    },
    {
      name: 'country',
      placeholder: tSettings('location.country.title'),
      validation: createValidation('country'),
    },
    {
      name: 'city',
      placeholder: tSettings('location.city.title'),
      validation: createValidation('city'),
    },
  ] as const;

  return { inputData, createValidation };
};
