'use client';

import {
  ReviewsFormValues,
  reviewsSchema,
} from '@/lib/validation/reviewsSchema';
import { sendReview } from '@/services/reviewsService';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useState } from 'react';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Rating } from '../ui/Rating';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Close } from '../icons';
import { PaymentSuccessContent } from '../ui/modals/DonationModal/PaymentSuccessModal/PaymentSuccessContent';

interface ReviewsProps {
  setIsOpen?: (isOpen: boolean) => void | undefined;
  isOpen?: boolean;
}

export const ReviewsForm = ({
  setIsOpen,
  isOpen,
}: ReviewsProps): React.JSX.Element => {
  const t = useTranslations('reviews');
  const f = useTranslations('faq');
  const downText = (f.raw('downtext') as any[])[0];
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ReviewsFormValues>({
    resolver: yupResolver(reviewsSchema) as Resolver<ReviewsFormValues>,
    defaultValues: {
      authorId: undefined,
      targetId: undefined,
      rating: undefined,
      comment: undefined,
    },
  });

  const onSubmit = async (
    data: yup.InferType<typeof reviewsSchema>
  ): Promise<void> => {
    try {
      const response = await sendReview({
        authorId: data.authorId,
        targetId: data.targetId,
        rating: data.rating,
        comment: data.comment,
      });

      if (response?.status === 'success') {
        toast.success(downText.success);
        setIsSubmitted(true);
      } else {
        toast.error(response?.message || downText.error);
      }
    } catch (_error: unknown) {
      toast.error(downText.error);
      console.error('Contact form submit error:', _error);
    }

    console.log('Form submitted:', {
      authorId: data.authorId,
      targetId: data.targetId,
      rating: data.rating,
      comment: data.comment,
    });
  };

  const onReset = (): void => {
    setValue('authorId', 0);
    setValue('targetId', 0);
    setValue('rating', 0);
    setValue('comment', '');
    setIsSubmitted(false);
  };

  const handleClose = (): void => {
    setIsOpen?.(!isOpen);
  };

  if (isSubmitted) {
    return <PaymentSuccessContent />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full bg-card p-10 rounded-[10px]">
        <button
          className="absolute top-10 right-6 md:top-11 md:right-16 lg:top-12 lg:right-22 p-1"
          onClick={handleClose}
          type="button"
        >
          <Close className="stroke-foreground w-6 h-6" />
        </button>

        <div className="flex gap-6 mb-8">
          <Image
            src="/account/avatar.png"
            alt={t('imageAlt')}
            width={64}
            height={80}
            className="w-[64px] h-[80px] object-cover"
          />
          <h2 className="text-xl md:text-h2-m lg:text-h2 mb-4">{t('title')}</h2>
        </div>
        <h3 className="text-base font-semibold mb-5">{t('subtitle')}</h3>
        {/* <InputField
          label="AuthorId"
          name="authorId"
          register={register}
          errors={errors.authorId}
          placeholder="placeholder"
          disabled={false}
        />
        <InputField
          label="TargetId"
          name="targetId"
          register={register}
          errors={errors.targetId}
          placeholder="placeholder"
          disabled={false}
        /> */}
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <Rating
              isEditable={true}
              rating={field.value || 0}
              setRating={(value) => {
                field.onChange(value);
              }}
              error={errors.rating}
              tabIndex={0}
            />
          )}
        />

        {errors.rating && (
          <p className="text-sm font-medium text-error mt-1">
            {errors.rating.message}
          </p>
        )}

        <h3 className="text-base mt-6 mb-5">{t('feedback')}</h3>
        <Textarea
          {...register('comment')}
          placeholder={t('placeholder')}
          className="w-full bg-white border-none h-[174px] text-form-field text-base mb-8"
        />
        {errors.comment && (
          <p className="text-sm font-medium text-error mt-1">
            {errors.comment.message}
          </p>
        )}
        <div className="flex gap-5 justify-between md:justify-end">
          <Button
            variant="ghost"
            size="lg"
            className="text-foreground px-6"
            type="button"
            onClick={onReset}
          >
            {t('cancelBtn')}
          </Button>
          <Button
            variant="primary"
            size="lg"
            type="submit"
            className="text-white px-6"
          >
            {t('sendBtn')}
          </Button>
        </div>
      </div>
    </form>
  );
};
