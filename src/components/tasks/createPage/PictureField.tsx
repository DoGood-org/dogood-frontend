'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { JSX } from 'react';
import { ImageUpload } from './ImageUpload';
import { BasicInfoFormValues, UploadResultInfo } from '@/types/createTask.type';

type PictureFieldProps = {
  className?: string;
};

export const PictureField = ({
  className = '',
}: PictureFieldProps): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = useFormContext<BasicInfoFormValues>();
  const defaultImage = '/task/no-image.png';

  return (
    <div className={className}>
      <Controller
        name="picture"
        control={control}
        render={({ field }) => (
          <ImageUpload
            image={field.value ? { secure_url: field.value } : null}
            setImage={(img: UploadResultInfo | null) =>
              field.onChange(img?.secure_url || '')
            }
            defaultImage={defaultImage}
          />
        )}
      />
      {errors.picture?.message && (
        <p className="text-sm font-medium text-error mt-1">
          {errors.picture.message}
        </p>
      )}
    </div>
  );
};
