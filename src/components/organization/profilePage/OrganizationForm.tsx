'use client';

import {
  createOrgSchema,
  SettingsOrgFormValues,
  updateOrgSchema,
} from '@/lib/validation/settingsOrgSchema';
import { OrganizationFormProps } from '@/types';
// import { cardPreviewStore } from '@/zustand/stores/cardPreviewStore';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import React, { JSX, useCallback, useEffect, useRef, useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import csc from 'country-state-city';
import { sendOrgProfile, createOrg } from '@/services/profileOrgService';
import { deleteFromCloudinary } from '@/services/cloudinary';
import { toast } from 'react-toastify';
import { cardPreviewService } from '@/services/cardPreviewService';
import { InputField } from '@/components/account/settingsPage/InputField';
import { ImageUploadWithPreview } from '@/components/account/settingsPage/ImageUploadWithPreview';
import { LocationSelect } from '@/components/account/settingsPage/LocationSelect';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { lazyImport } from '@/lib/lazyImport';
import { getUserRole } from '@/lib/getUserRole';
import { DeleteFormModal } from './DeleteFormModal';
import { useRouter } from 'next/navigation';
import { refreshUserData } from '@/app/actions/userActions';

const PaymentList = lazyImport(
  () => import('@/components/account/settingsPage/PaymentList'),
  'PaymentList'
);

export const OrganizationForm = ({
  organization,
  mode = 'update',
  setIsOpen,
}: OrganizationFormProps): JSX.Element => {
  const [image, setImage] = useState<any>(null);
  const t = useTranslations('settings');
  const [isDelete, setIsDelete] = useState(false);
  const oldAvatarRef = useRef<string>('');
  const userRole = organization ? getUserRole(organization.members) : null;
  const router = useRouter();
  const getDefaultValues = (): SettingsOrgFormValues => {
    if (mode === 'update' && organization) {
      return {
        name: organization.name,
        description: organization.description || undefined,
        moreInfo: organization.moreInfo || undefined,
        avatar: organization.avatar || undefined,
        phoneNumber: organization.phoneNumber || undefined,
        email: organization.email || undefined,
        location: {
          country: organization.location?.country || undefined,
          region: organization.location?.region || undefined,
          city: organization.location?.city || undefined,
        },
      };
    }

    // Default values for create mode
    return {
      name: '',
      description: undefined,
      moreInfo: undefined,
      avatar: undefined,
      phoneNumber: undefined,
      email: undefined,
      location: {
        country: undefined,
        region: undefined,
        city: undefined,
      },
    };
  };
  const currentSchema = mode === 'create' ? createOrgSchema : updateOrgSchema;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SettingsOrgFormValues>({
    resolver: yupResolver(currentSchema) as Resolver<SettingsOrgFormValues>,
    defaultValues: getDefaultValues(),
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

  // const { tempCards } = cardPreviewStore();

  const onSubmit = async (data: SettingsOrgFormValues): Promise<void> => {
    // const paymentOptionIds = tempCards.map((card) =>
    //   Number(card.paymentMethodId)
    // );

    const selectedCountryObj = csc
      .getAllCountries()
      .find((c) => c.isoCode === data.location?.country);
    const selectedStateObj = csc
      .getStatesOfCountry(data.location?.country || '')
      .find((s) => s.isoCode === data.location?.region);

    const formattedData = {
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
      email: data.email || undefined,
      description: data.description || undefined,
      moreInfo: data.moreInfo || undefined,
    };

    let response;

    if (mode === 'update' && organization) {
      // Handle avatar deletion only in update mode
      const oldAvatar = oldAvatarRef.current;
      const newAvatar = data.avatar;
      if (oldAvatar && oldAvatar !== newAvatar) {
        await deleteFromCloudinary(oldAvatar);
      }

      response = await sendOrgProfile(formattedData, organization.id);
    } else {
      // Create mode
      response = await createOrg(formattedData);
    }

    if (response.ok) {
      toast.success(mode === 'update' ? t('success') : t('createSuccess'));

      // Clean up cards after successful submission
      cardPreviewService.cleanupUnattachedCard();
      cardPreviewService.clearAll();
      if (mode === 'create') {
        await refreshUserData();
        router.refresh();
      }
      if (mode === 'update') {
        await refreshUserData();
        router.refresh();
        router.back();
      }

      if (setIsOpen) {
        setIsOpen(false);
      }
      reset();
    } else {
      toast.error(mode === 'update' ? t('error') : t('createError'));
    }

    if (mode === 'update') {
      oldAvatarRef.current = data.avatar || '';
    }
  };

  const onReset = (): void => {
    if (mode === 'update' && organization) {
      setValue('name', organization.name);
      setValue('avatar', organization.avatar);
      setValue('location.country', undefined);
      setValue('location.region', undefined);
      setValue('location.city', undefined);
      setValue('phoneNumber', organization.phoneNumber);
      setValue('email', organization.email);
      setValue('description', organization.description || undefined);
      setValue('moreInfo', organization.moreInfo || undefined);
      oldAvatarRef.current = organization.avatar || '';
    } else {
      setValue('name', '');
      setValue('avatar', '');
      setValue('location', {
        country: '',
        region: '',
        city: '',
      });
      setValue('phoneNumber', '');
      setValue('email', '');
      setValue('description', undefined);
      setValue('moreInfo', undefined);
      oldAvatarRef.current = '';

      if (mode === 'create' && setIsOpen) {
        setIsOpen(false);
      }
    }

    cardPreviewService.cleanupUnattachedCard();
    cardPreviewService.clearAll();
  };

  useEffect(() => {
    return (): void => {
      cardPreviewService.cleanupUnattachedCard();
    };
  }, []);

  const showDeleteSection = mode === 'update' && userRole === 'ADMIN';

  return (
    <div className="m-5 custom-scrollbar-reviews max-h-[75vh] overflow-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-12 rounded-xl bg-card w-full p-8"
      >
        <h1 className="text-h2-d text-foreground mb-10">
          {mode === 'update' ? t('basic.titleSect') : t('basic.createSect')}
        </h1>

        <div className="flex flex-col lg:flex-row lg:justify-start lg:gap-25 justify-between bg-text-help p-8 rounded-xl">
          <div className="order-2 md:w-[477px]">
            <div className="space-y-4">
              <h3 className="text-h3 text-white hidden lg:block">
                {t('basic.title')}
              </h3>

              <InputField
                label={t('basic.orgName.title')}
                name="name"
                register={register}
                errors={errors.name}
                placeholder={t('basic.orgName.placeholder')}
                disabled={false}
              />

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
            <InputField
              label={t('contact.mail.title')}
              name="email"
              register={register}
              placeholder={t('contact.mail.placeholder')}
              type="email"
              disabled={false}
            />
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

        <PaymentList />

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

        {showDeleteSection && (
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
              type="button"
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
            {mode === 'update' ? t('submitBtn') : t('createBtn')}
          </Button>
          <Button
            variant="ghost"
            size="xl"
            className="w-[119px] text-[#ffffff]"
            type="button"
            onClick={onReset}
          >
            {mode === 'update' ? t('resetBtn') : t('closeBtn')}
          </Button>
        </div>
      </form>
      {isDelete && mode === 'update' && organization && (
        <DeleteFormModal
          orgId={organization.id}
          isOpen={isDelete}
          setIsOpen={setIsDelete}
        />
      )}
    </div>
  );
};
