'use client';

import { Controller, Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import csc from 'country-state-city';
import { format } from 'date-fns';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  SettingsFormValues,
  settingsSchema,
} from '@/lib/validation/settingsSchema';
import { useTranslations } from 'next-intl';
import { cardPreviewService } from '@/services/cardPreviewService';
import { cardPreviewStore } from '@/zustand/stores/cardPreviewStore';
import { sendProfile } from '@/services/profileUserService';
import { toast } from 'react-toastify';
import { deleteFromCloudinary } from '@/services/cloudinary';
import { lazyImport } from '@/lib/lazyImport';

import { Section } from '@/components/ui/Section';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { InputField } from './InputField';
import { DatePicker } from './DatePicker';
import { SelectField } from './SelectField';
import { ImageUploadWithPreview } from './ImageUploadWithPreview';
import { LocationSelect } from './LocationSelect';

const PaymentList = lazyImport(
  () => import('@/components/account/settingsPage/PaymentList'),
  'PaymentList'
);

const genderOptions = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' },
];

export const Settings = (): React.JSX.Element => {
  const [image, setImage] = useState<any>(null);
  const t = useTranslations('settings');
  const oldAvatarRef = useRef<string>('');
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<SettingsFormValues>({
    resolver: yupResolver(settingsSchema) as Resolver<SettingsFormValues>,
    defaultValues: {
      name: undefined,
      bio: undefined,
      avatar: undefined,
      location: {
        country: undefined,
        region: undefined,
        city: undefined,
      },
      gender: undefined,
      birthDate: undefined,
      phoneNumber: undefined,
      paymentOptionIds: undefined,
    },
  });

  const avatarValue = watch('avatar');
  useEffect(() => {
    if (!oldAvatarRef.current && avatarValue) {
      oldAvatarRef.current = avatarValue;
    }
  }, [avatarValue]);

  const countryValue = watch('location.country');
  const stateValue = watch('location.region');
  const cityValue = watch('location.city');

  const handleCountryChange = useCallback(
    (value: string) => {
      setValue('location.country', value);
    },
    [setValue]
  );

  const handleStateChange = useCallback(
    (value: string) => {
      setValue('location.region', value);
    },
    [setValue]
  );

  const handleCityChange = useCallback(
    (value: string) => {
      setValue('location.city', value);
    },
    [setValue]
  );
  const { tempCards } = cardPreviewStore();

  const onSubmit = async (
    data: yup.InferType<typeof settingsSchema>
  ): Promise<void> => {
    const paymentOptionIds = tempCards.map((card) =>
      Number(card.paymentMethodId)
    );
    const selectedCountryObj = csc
      .getAllCountries()
      .find((c) => c.isoCode === data.location?.country);
    const selectedStateObj = csc
      .getStatesOfCountry(data.location?.country || '')
      .find((s) => s.isoCode === data.location?.region);

    const oldAvatar = oldAvatarRef.current;
    const newAvatar = data.avatar;

    if (oldAvatar && oldAvatar !== newAvatar) {
      await deleteFromCloudinary(oldAvatar);
    }
    console.log(data);
    const response = await sendProfile({
      name: data.name,
      bio: data.bio,
      avatar: data.avatar,
      location: data.location
        ? {
            country: selectedCountryObj?.name || data.location.country,
            region: selectedStateObj?.name || data.location.region,
            city: data.location.city,
          }
        : undefined,
      gender: data.gender,
      birthDate: data.birthDate
        ? format(data.birthDate, 'yyyy-MM-dd')
        : undefined,
      phoneNumber: data.phoneNumber || undefined,
      paymentOptionIds:
        paymentOptionIds.length > 0 ? paymentOptionIds : undefined,
    });

    if (response.ok) {
      toast.success(t('success'));
    } else {
      toast.error(t('error'));
    }
    oldAvatarRef.current = data.avatar || '';
    reset();
  };

  const onReset = (): void => {
    setValue('name', undefined);
    setValue('bio', undefined);
    setValue('avatar', undefined);
    setValue('location.country', undefined);
    setValue('location.region', undefined);
    setValue('location.city', undefined);
    setValue('gender', undefined);
    setValue('birthDate', undefined);
    setValue('phoneNumber', undefined);

    oldAvatarRef.current = '';
    cardPreviewService.cleanupUnattachedCard();
    cardPreviewService.clearAll();
  };

  useEffect(() => {
    return (): void => {
      cardPreviewService.cleanupUnattachedCard();
    };
  }, []);

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
                label={t('basic.name.title')}
                name="name"
                register={register}
                errors={errors.name}
                placeholder={t('basic.name.placeholder')}
                disabled={false}
              />

              {/* Date of Birth Field */}
              <Label htmlFor="birthDate" className="text-white text-base mb-2">
                {t('basic.birth.title')}
              </Label>
              <Controller
                name="birthDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={t('basic.birth.placeholder')}
                  />
                )}
              />
              {errors.birthDate && (
                <p className="text-sm font-medium text-error mt-1">
                  {errors.birthDate.message}
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
            <h3 className="text-h3 text-white lg:hidden">{t('basic.title')}</h3>
            {/* Image Upload Field */}
            <ImageUploadWithPreview
              image={image}
              setImage={(img) => {
                setImage(img);
                setValue('avatar', img?.secure_url || '');
              }}
              defaultImage={watch('avatar') || '/account/avatar.png'}
            />
            {errors.avatar && (
              <p className="text-sm font-medium text-error mt-1">
                {errors.avatar.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4 bg-text-help p-8 rounded-xl">
          <h3 className="text-h3 text-white">{t('location.title')}</h3>
          {/* Location Fields - Hidden Inputs */}
          <input type="hidden" {...register('location.country')} />
          <input type="hidden" {...register('location.region')} />
          <input type="hidden" {...register('location.city')} />

          <LocationSelect
            onCountryChange={handleCountryChange}
            onStateChange={handleStateChange}
            onCityChange={handleCityChange}
            selectedCountry={countryValue}
            selectedState={stateValue}
            selectedCity={cityValue}
            countryError={errors.location?.country?.message}
            stateError={errors.location?.region?.message}
          />
        </div>

        <div className="space-y-4 bg-text-help p-8 rounded-xl">
          <h3 className="text-h3 text-white">{t('contact.title')}</h3>

          {/* Email Field */}
          <InputField
            label={t('contact.mail.title')}
            name="email"
            register={register}
            placeholder={t('contact.mail.placeholder')}
            type="email"
          />

          {/* Phone Field */}
          <InputField
            label={t('contact.phone.title')}
            name="phoneNumber"
            register={register}
            errors={errors.phoneNumber}
            placeholder={t('contact.phone.placeholder')}
            type="tel"
            disabled={false}
          />
        </div>

        {/* Payment field */}
        <PaymentList />

        {/* About me field */}
        <div className="space-y-12 bg-text-help p-8 rounded-xl">
          <h3 className="text-h3 text-white">{t('about.title')}</h3>
          <Textarea
            {...register('bio')}
            placeholder={t('about.placeholder')}
            className="w-full bg-white border-none h-[120px] text-form-field text-base"
          />
          {errors.bio && (
            <p className="text-sm font-medium text-error mt-1">
              {errors.bio.message}
            </p>
          )}
        </div>

        <div className="flex gap-5 justify-end">
          <Button
            variant="primary"
            size="xl"
            type="submit"
            className="w-[119px] text-[#ffffff]"
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
  );
};
