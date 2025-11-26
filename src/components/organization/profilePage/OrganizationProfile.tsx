'use client';
import {
  SettingsOrgFormValues,
  settingsOrgSchema,
} from '@/lib/validation/settingsOrgSchema';
import { OrganizationDetailedProps } from '@/types';
import { cardPreviewStore } from '@/zustand/stores/cardPreviewStore';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import React, { JSX, useCallback, useEffect, useRef, useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import * as yup from 'yup';
import csc from 'country-state-city';
import { sendOrgProfile } from '@/services/profileOrgService';
import { deleteFromCloudinary } from '@/services/cloudinary';
import { toast } from 'react-toastify';
import { cardPreviewService } from '@/services/cardPreviewService';
import { Section } from '@/components/ui/Section';
import { InputField } from '@/components/account/settingsPage/InputField';
import { ImageUploadWithPreview } from '@/components/account/settingsPage/ImageUploadWithPreview';
import { LocationSelect } from '@/components/account/settingsPage/LocationSelect';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { lazyImport } from '@/lib/lazyImport';
import { getInitialLocation } from '@/lib/utils';
import DeleteFormModal from './DeleteFormModal';
import { getUserRole } from '@/lib/getUserRole';

const PaymentList = lazyImport(
  () => import('@/components/account/settingsPage/PaymentList'),
  'PaymentList'
);

const OrganizationProfile = ({
  organization,
}: {
  organization: OrganizationDetailedProps;
}): JSX.Element => {
  const [image, setImage] = useState<any>(null);
  const t = useTranslations('settings');
  const f = useTranslations('faq');
  const [isDelete, setIsDelete] = useState(false);
  const oldAvatarRef = useRef<string>('');
  const downText = (f.raw('downtext') as any[])[0];
  const userRole = getUserRole(organization.members);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SettingsOrgFormValues>({
    resolver: yupResolver(settingsOrgSchema) as Resolver<SettingsOrgFormValues>,
    defaultValues: {
      name: organization.name,
      avatar: organization.avatar,
      location: getInitialLocation(organization.location),
      phoneNumber: organization.phoneNumber,
      paymentOptionIds: organization.paymentOptionIds,
      description: organization.description,
      moreInfo: organization.moreInfo,
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
    data: yup.InferType<typeof settingsOrgSchema>
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
    const response = await sendOrgProfile(
      {
        name: data.name,
        avatar: data.avatar,
        location: data.location
          ? {
              country: selectedCountryObj?.name || data.location.country,
              region: selectedStateObj?.name || data.location.region,
              city: data.location.city,
            }
          : undefined,
        phoneNumber: data.phoneNumber || undefined,
        paymentOptionIds:
          paymentOptionIds.length > 0 ? paymentOptionIds : undefined,
        description: data.description || undefined,
        moreInfo: data.moreInfo || undefined,
      },
      organization.id
    );
    if (!response.ok) {
      toast.error(downText.error);
      return;
    }
    oldAvatarRef.current = data.avatar || '';
    toast.success(downText.success);
    reset();
  };

  const onReset = (): void => {
    setValue('name', organization.name);
    setValue('avatar', organization.avatar);
    setValue('location', getInitialLocation(organization.location));
    setValue('phoneNumber', organization.phoneNumber);
    setValue('description', organization.description);
    setValue('moreInfo', organization.moreInfo);

    oldAvatarRef.current = organization.avatar || '';
    cardPreviewService.cleanupUnattachedCard();
    cardPreviewService.clearAll();
  };

  useEffect(() => {
    return (): void => {
      cardPreviewService.cleanupUnattachedCard();
    };
  }, []);

  return (
    <Section withContainer={false} className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-12 rounded-xl bg-card w-full p-8"
      >
        <h1 className="text-h2-d text-foreground mb-10">
          {t('basic.titleSect')}
        </h1>
        <div className="flex flex-col lg:flex-row lg:justify-start lg:gap-25 justify-between bg-text-help p-8 rounded-xl">
          <div className="order-2 md:w-[477px]">
            <div className="space-y-4">
              <h3 className="text-h3 text-white hidden lg:block">
                {t('basic.title')}
              </h3>

              {/* Name of Organization Field */}
              <InputField
                label={t('basic.orgName.title')}
                name="name"
                register={register}
                errors={errors.name}
                placeholder={t('basic.orgName.placeholder')}
                disabled={false}
              />
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
          </div>
          <div className="flex flex-col gap-4 order-1 mb-4 lg:mb-0 lg:order-first justify-center">
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
        <div className="bg-text-help p-8 rounded-xl">
          <h3 className="text-h3 text-white">{t('contact.title')}</h3>
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-10">
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
        </div>
        {/* Payment field */}
        <PaymentList />
        {/* Description */}
        <div className="space-y-12 bg-text-help p-8 rounded-xl">
          <h3 className="text-h3 text-white">{t('aboutOrg.title')}</h3>
          <h4 className="text-h3 text-white">{t('aboutOrg.description')}</h4>

          <Textarea
            {...register('description')}
            placeholder={t('about.placeholder')}
            className="w-full bg-white border-none text-form-field text-base"
          />
          {errors.description && (
            <p className="text-sm font-medium text-error mt-1">
              {errors.description.message}
            </p>
          )}
          {/* More info field */}
          <h3 className="text-h3 text-white">{t('aboutOrg.moreInfo')}</h3>
          <Textarea
            {...register('moreInfo')}
            placeholder={t('about.placeholder')}
            className="w-full bg-white border-none text-form-field text-base"
          />
          {errors.moreInfo && (
            <p className="text-sm font-medium text-error mt-1">
              {errors.moreInfo.message}
            </p>
          )}
        </div>
        {userRole === 'ADMIN' && (
          <div className="bg-text-help p-8 rounded-xl">
            <h3 className="text-h3 text-white mb-2">
              {t('aboutOrg.deleteOrg')}
            </h3>
            <p className="text-base text-white mb-8">
              {t('aboutOrg.deleteAlert')}
            </p>
            <Button
              variant="secondary"
              className="text-white"
              onClick={() => setIsDelete(!isDelete)}
            >
              {t('aboutOrg.deleteBtn')}
            </Button>
          </div>
        )}
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
      {isDelete && (
        <DeleteFormModal
          orgId={organization.id}
          isOpen={isDelete}
          setIsOpen={setIsDelete}
        />
      )}
    </Section>
  );
};

export default OrganizationProfile;
