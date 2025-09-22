import {
  ReviewsFormValues,
  reviewsSchema,
} from '@/lib/validation/reviewsSchema';
import { sendReview } from '@/services/reviewsService';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Rating } from '../ui/Rating';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';

export const ReviewsForm = (): React.JSX.Element => {
  const t = useTranslations('reviews');
  const f = useTranslations('faq');
  const downText = (f.raw('downtext') as any[])[0];

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<ReviewsFormValues>({
    resolver: yupResolver(reviewsSchema) as Resolver<ReviewsFormValues>,
    defaultValues: {
      authorId: undefined,
      targetId: undefined,
      rating: null,
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
        reset();
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
    setValue('rating', undefined);
    setValue('comment', '');
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 bg-text-help p-8 rounded-xl">
        <div className="flex gap-6">
          <Image
            src="/account/avatar.png"
            alt={t('imageAlt')}
            width={64}
            height={80}
          />
          <h2 className="text-2xl font-semibold mb-4">{t('title')}</h2>
        </div>
        <h3 className="text-h3 text-white">{t('subtitle')}</h3>

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

        <h3 className="text-h3 text-white">{t('feedback')}</h3>
        <Textarea
          {...register('comment')}
          placeholder={t('placeholder')}
          className="w-full bg-white border-none h-[120px] text-form-field text-base"
        />
        {errors.comment && (
          <p className="text-sm font-medium text-error mt-1">
            {errors.comment.message}
          </p>
        )}
      </div>
      <div className="flex gap-5 justify-end">
        <Button
          variant="ghost"
          size="xl"
          className="w-[119px] text-[#ffffff]"
          type="button"
          onClick={onReset}
        >
          {t('cancelBtn')}
        </Button>
        <Button
          variant="primary"
          size="xl"
          type="submit"
          className="w-[119px] text-[#ffffff]"
        >
          {t('sendBtn')}
        </Button>
      </div>
    </form>
  );
};
