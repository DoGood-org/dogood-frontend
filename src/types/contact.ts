import { FormData } from '@/components/main/faq/formSchema';
import { type FieldPath } from 'react-hook-form';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone?: string;
}

export interface ContactResponse {
  status: string;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    phone?: string;
    message: string;
    createdAt: string;
  };
}

export type ValidationMessages = {
  required: string;
  invalidEmail: string;
  invalidPhone: string;
  minNameLength: string;
  minMessageLength: string;
  maxNameLength: string;
  maxMessageLength: string;
  spamMessage: string;
};

export type FormFieldConfig = {
  name: FieldPath<FormData>;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  placeholder: string;
  required?: boolean;
  maxLength?: number;
  rows?: number;
  className?: string;
};
