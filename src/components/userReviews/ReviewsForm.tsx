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
import { IReviewsProps } from '@/types/userReviewsType';
import { ReviewsSuccessContent } from './ReviewsSuccessContent';

export const ReviewsForm: React.FC<IReviewsProps> = ({
  user,
  setIsOpen,
}): React.JSX.Element => {
  const t = useTranslations('reviews');
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
      targetUserId: user.id,
      rating: undefined,
      comment: undefined,
    },
  });

  const onSubmit = async (
    data: yup.InferType<typeof reviewsSchema>
  ): Promise<void> => {
    const response = await sendReview({
      targetUserId: user.id,
      rating: data.rating,
      comment: data.comment,
    });

    if (response?.ok) {
      toast.success(t('success'));
      setIsSubmitted(true);
    } else {
      toast.error(t('error'));
    }
  };
  const onReset = (): void => {
    setValue('rating', 0);
    setValue('comment', '');
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return <ReviewsSuccessContent setIsOpen={setIsOpen} />;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full bg-card p-10 rounded-[10px]">
        <div className="flex gap-6 mb-8">
          <Image
            src={user.avatar || '/account/avatar.png'}
            alt={t('imageAlt')}
            width={64}
            height={80}
            className="w-[64px] h-[80px] object-cover"
          />
          <h2 className="text-xl md:text-h2-m lg:text-h2 mb-4">
            {t('title') + ' ' + user.name}
          </h2>
        </div>
        <h3 className="text-base font-semibold mb-5">{t('subtitle')}</h3>
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
