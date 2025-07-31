'use client';

import {
  LocationSelect,
  Section,
  SelectField,
  DatePicker,
  Textarea,
  ImageUploadWithPreview,
  Label,
} from '@/components';
import { Button } from '@/components';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import csc from 'country-state-city';
import { format } from 'date-fns';
import { useState } from 'react';
import {
  SettingsFormValues,
  settingsSchema,
} from '@/lib/validation/settingsSchema';
import { useTranslations } from 'next-intl';
import { Close, Plus } from '@/components/icons';
import { InputField } from '@/components';

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

export const Settings = (): React.JSX.Element => {
  const [image, setImage] = useState<any>(null);
  const t = useTranslations('settings');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const onClickButton = (): void => {
    setIsPaymentOpen(!isPaymentOpen);
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<SettingsFormValues>({
    resolver: yupResolver(settingsSchema),
    defaultValues: {
      fullName: '',
      gender: '',
      dateOfBirth: undefined as unknown as Date,
      country: '',
      state: '',
      city: '',
      email: '',
      phone: '',
      about: '',
      img: '',
    },
  });
  const countryValue = watch('country');
  const stateValue = watch('state');
  const cityValue = watch('city');

  const onSubmit = (data: yup.InferType<typeof settingsSchema>): void => {
    const selectedCountryObj = csc
      .getAllCountries()
      .find((c) => c.isoCode === data.country);
    const selectedStateObj = csc
      .getStatesOfCountry(data.country)
      .find((s) => s.isoCode === data.state);

    console.log('Form submitted:', {
      fullName: data.fullName,
      gender: data.gender,
      dateOfBirth: format(data.dateOfBirth, 'yyyy-MM-dd'),
      country: selectedCountryObj?.name || data.country,
      state: selectedStateObj?.name || data.state,
      city: data.city,
      email: data.email,
      phone: data.phone,
      about: data.about,
      img: image?.secure_url || data.img,
    });
  };

  const onReset = (): void => {
    setValue('fullName', '');
    setValue('gender', '');
    setValue('dateOfBirth', undefined as unknown as Date);
    setValue('country', '');
    setValue('state', '');
    setValue('city', '');
    setValue('email', '');
    setValue('phone', '');
    setValue('about', '');
    setValue('img', '');
    setImage(null);
  };

  return (
    <Section withContainer={false} className="pt-15 md:pt-16 lg:pt-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-12 rounded-xl bg-card w-[353px] md:w-[648px] lg:w-[976px] p-8"
      >
        <div className="flex flex-col lg:flex-row justify-between bg-text-help p-8 rounded-xl">
          <div className="order-2 md:w-[477px]">
            <div className="space-y-4">
              <h3 className="text-h3 text-white hidden lg:block">
                {t('basic.title')}
              </h3>

              {/* Full Name Field */}
              <InputField
                label={t('basic.name')}
                name="fullName"
                register={register}
                errors={errors.fullName}
                placeholder="Enter your full name"
              />

              {/* Date of Birth Field */}
              <Label
                htmlFor="dateOfBirth"
                className="text-white text-base mb-2"
              >
                {t('basic.birth')}
              </Label>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select birth date"
                  />
                )}
              />
              {errors.dateOfBirth && (
                <p className="text-sm font-medium text-error mt-1">
                  {errors.dateOfBirth.message}
                </p>
              )}

              {/* Gender Field */}
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <SelectField
                    value={field.value}
                    onValueChange={field.onChange}
                    options={genderOptions}
                    placeholder="Select gender"
                    label={t('basic.gender')}
                  />
                )}
              />
              {errors.gender && (
                <p className="text-sm font-medium text-error mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 order-1 mb-4 lg:mb-0 lg:order-last justify-center">
            <h3 className="text-h3 text-white lg:hidden">{t('basic.title')}</h3>
            {/* Image Upload Field */}
            <ImageUploadWithPreview
              image={image}
              setImage={(img) => {
                setImage(img);
                setValue('img', img?.secure_url || '');
              }}
              defaultImage={watch('img') || '/account/avatar.png'}
            />
            {errors.img && (
              <p className="text-sm font-medium text-error mt-1">
                {errors.img.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4 bg-text-help p-8 rounded-xl">
          <h3 className="text-h3 text-white">{t('location.title')}</h3>
          {/* Location Fields - Hidden Inputs */}
          <input type="hidden" {...register('country')} />
          <input type="hidden" {...register('state')} />
          <input type="hidden" {...register('city')} />

          <LocationSelect
            onCountryChange={(value) => setValue('country', value)}
            onStateChange={(value) => setValue('state', value)}
            onCityChange={(value) => setValue('city', value)}
            selectedCountry={countryValue}
            selectedState={stateValue}
            selectedCity={cityValue}
            countryError={errors.country?.message}
            stateError={errors.state?.message}
          />
        </div>

        <div className="space-y-4 bg-text-help p-8 rounded-xl">
          <h3 className="text-h3 text-white">{t('contact.title')}</h3>

          {/* Email Field */}
          <InputField
            label={t('contact.mail')}
            name="email"
            register={register}
            errors={errors.email}
            placeholder="Enter your email"
            type="email"
          />

          {/* Phone Field */}
          <InputField
            label={t('contact.phone')}
            name="phone"
            register={register}
            errors={errors.phone}
            placeholder="Enter your phone number"
            type="tel"
          />
        </div>

        {/* Payment field */}
        <div className="space-y-4 bg-text-help p-8 rounded-xl">
          <h3 className="text-h3 text-white">{t('payment.title')}</h3>
          <button
            className="w-[227px] md:w-[284px] h-[126px] bg-white rounded-xl"
            onClick={onClickButton}
          >
            <span className="text-[#1FAC63] flex gap-2 justify-center align-middle">
              <Plus />
              {t('payment.add')}
            </span>
          </button>
        </div>

        {/* About me field */}
        <div className="space-y-12 bg-text-help p-8 rounded-xl">
          <h3 className="text-h3 text-white">{t('about')}</h3>
          <Textarea
            {...register('about')}
            placeholder="Type your message here..."
            className="w-full bg-white border-none h-[120px] text-form-field text-base"
          />
          {errors.about && (
            <p className="text-sm font-medium text-error mt-1">
              {errors.about.message}
            </p>
          )}
        </div>

        <div className="flex gap-5 justify-end">
          <Button
            variant="primary"
            size="xl"
            type="submit"
            className="w-[119px] text-[#ffffff]"
            onClick={handleSubmit(onSubmit)}
          >
            {t('submitBtn')}
          </Button>
          <Button
            variant="ghost"
            size="xl"
            className="w-[119px] text-[#ffffff]"
            type="button"
            onClick={onReset}
          >
            {t('resetBtn')}
          </Button>
        </div>

        {isPaymentOpen && (
          <Section className="fixed inset-0 w-screen h-screen z-[9991] flex items-center justify-center bg-text-help/90 overflow-y-auto">
            <div className="bg-background p-10 relative mx-auto rounded-xl">
              <button
                className="absolute top-6 right-1 md:top-11 md:right-4 p-1"
                onClick={onClickButton}
              >
                <Close className="stroke-foreground w-6 h-6" />
              </button>
              Payment form
            </div>
          </Section>
        )}
      </form>
    </Section>
  );
};
