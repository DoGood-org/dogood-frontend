'use client';

import {
  LocationSelect,
  Section,
  SelectField,
  DatePicker,
  Textarea,
  ImageUploadWithPreview,
  Label,
  StripeProvider,
} from '@/components';
import { Button } from '@/components';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import csc from 'country-state-city';
import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import {
  SettingsFormValues,
  settingsSchema,
} from '@/lib/validation/settingsSchema';
import { useTranslations } from 'next-intl';
import { InputField } from '@/components';
import { PaymentList } from './PaymentList';
import { CardPreviewService } from '@/zustand/services/cardPreviewService';

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

export const Settings = (): React.JSX.Element => {
  const [image, setImage] = useState<any>(null);
  const t = useTranslations('settings');
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

  const handleCountryChange = useCallback(
    (value: string) => {
      setValue('country', value);
    },
    [setValue]
  );

  const handleStateChange = useCallback(
    (value: string) => {
      setValue('state', value);
    },
    [setValue]
  );

  const handleCityChange = useCallback(
    (value: string) => {
      setValue('city', value);
    },
    [setValue]
  );

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
    CardPreviewService.cleanupUnattachedCard();
    CardPreviewService.clearAll();
  };

  useEffect(() => {
    return (): void => {
      CardPreviewService.cleanupUnattachedCard();
    };
  }, []);

  return (
    <StripeProvider>
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
                  label={t('basic.name.title')}
                  name="fullName"
                  register={register}
                  errors={errors.fullName}
                  placeholder={t('basic.name.placeholder')}
                />

                {/* Date of Birth Field */}
                <Label
                  htmlFor="dateOfBirth"
                  className="text-white text-base mb-2"
                >
                  {t('basic.birth.title')}
                </Label>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={t('basic.birth.placeholder')}
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
                      placeholder={t('basic.gender.placeholder')}
                      label={t('basic.gender.title')}
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
              <h3 className="text-h3 text-white lg:hidden">
                {t('basic.title')}
              </h3>
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
              onCountryChange={handleCountryChange}
              onStateChange={handleStateChange}
              onCityChange={handleCityChange}
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
              label={t('contact.mail.title')}
              name="email"
              register={register}
              errors={errors.email}
              placeholder={t('contact.mail.placeholder')}
              type="email"
            />

            {/* Phone Field */}
            <InputField
              label={t('contact.phone.title')}
              name="phone"
              register={register}
              errors={errors.phone}
              placeholder={t('contact.phone.placeholder')}
              type="tel"
            />
          </div>

          {/* Payment field */}
          <PaymentList />

          {/* About me field */}
          <div className="space-y-12 bg-text-help p-8 rounded-xl">
            <h3 className="text-h3 text-white">{t('about.title')}</h3>
            <Textarea
              {...register('about')}
              placeholder={t('about.placeholder')}
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
        </form>
      </Section>
    </StripeProvider>
  );
};
