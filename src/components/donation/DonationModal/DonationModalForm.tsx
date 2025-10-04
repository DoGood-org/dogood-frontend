'use client';

// ✅ Додаємо необхідні імпорти: React, useForm, та типи
import React, { JSX } from 'react';
// import { useForm, UseFormRegister, FieldError } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { FormControl } from '@/components';

// 1. Інтерфейс для даних, які буде збирати форма
interface DonationFormData {
  name: string;
}

// 2. Оновлений інтерфейс для пропсів FormControl
// interface CustomFormControlProps {
//   label?: string;
//   name: keyof DonationFormData; // name має бути ключем з даних форми
//   register: UseFormRegister<DonationFormData>; // ✅ Правильний тип
//   errors?: FieldError; // Додаємо тип помилок
//   placeholder?: string;
// }

// 3. Компонент форми не приймає пропсів
export const DonationModalForm = (): JSX.Element => {
  // 4. Викликаємо useForm, щоб отримати register, handleSubmit та errors
  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm<DonationFormData>();

  return (
    // 5. Обгортаємо форму у тег <form> та використовуємо handleSubmit
    <form>
      <FormControl
        label="Повне Ім'я" // Додаємо label
        name="name"
        // ✅ Передаємо register та errors
        register={register}
        errors={errors.name} // Передаємо помилки для поля 'name'
        placeholder={'Ваше ім’я'}
      />
      <button type="submit">Надіслати</button>
    </form>
  );
};
