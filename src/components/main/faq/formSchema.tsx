import { VALIDATION_ERRORS } from '@/constants/formValidation';
import { isSpamMessage } from '@/utils/isSpamMessage';
import * as yup from 'yup';

export const formSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required(VALIDATION_ERRORS.required)
    .min(2, VALIDATION_ERRORS.minNameLength)
    .max(100, VALIDATION_ERRORS.maxNameLength),

  email: yup
    .string()
    .trim()
    .required(VALIDATION_ERRORS.required)
    .email(VALIDATION_ERRORS.invalidEmail)
    .test('valid-domain', VALIDATION_ERRORS.invalidEmail, (value) => {
      if (!value) return true;

      const domain = value.split('@')[1];

      return (
        !!domain &&
        domain.includes('.') &&
        domain.split('.').every((part) => part.length >= 2)
      );
    }),

  phone: yup
    .string()
    .trim()
    .defined()
    .test('phone', VALIDATION_ERRORS.invalidPhone, (value) => {
      if (!value) return true;

      return (
        /^[+]?[\d\s()-]+$/.test(value) &&
        value.replace(/\D/g, '').length >= 7 &&
        value.replace(/\D/g, '').length <= 15
      );
    }),

  message: yup
    .string()
    .trim()
    .required(VALIDATION_ERRORS.required)
    .min(10, VALIDATION_ERRORS.minMessageLength)
    .max(200, VALIDATION_ERRORS.maxMessageLength)
    .test('spam-check', VALIDATION_ERRORS.spamMessage, (value) => {
      if (!value) return true;
      return !isSpamMessage(value);
    }),
});

export type FormData = yup.InferType<typeof formSchema>;
