'use client';

import { EditIcon } from '@/components/icons';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import { JSX } from 'react';
import { UploadResultInfo } from '@/types/createTask.type';

interface ImageUploadProps {
  image?: UploadResultInfo | null;
  setImage?: (image: UploadResultInfo | null) => void;
  defaultImage?: string | null;
  label?: string;
  className?: string;
}

export const ImageUpload = ({
  className = '',
  image,
  setImage,
  defaultImage,
  label = 'Change picture',
}: ImageUploadProps): JSX.Element => {
  return (
    <div className={`relative ${className}`}>
      <div
        className="
          relative shrink-0
          w-[320px] h-[238px]
          md:w-[432px] md:h-[238px]
          lg:w-[415px] lg:h-[336px]
        "
      >
        <Image
          className="rounded-lg object-cover"
          src={image?.secure_url || defaultImage || ''}
          alt="Uploaded image"
          fill
          unoptimized
        />
      </div>
      <CldUploadWidget
        uploadPreset="dogood"
        onSuccess={(result) => {
          const info = result.info;
          if (info && typeof info === 'object' && 'secure_url' in info) {
            setImage?.(info as UploadResultInfo);
          }
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            aria-label="Upload image"
            className="absolute bottom-4 right-5 z-10
                      flex items-center gap-2 group cursor-pointer
                      text-black hover:text-[#696969] transition-colors duration-300 ease-out"
          >
            <span className="text-sm font-medium underline underline-offset-4">
              {label}
            </span>
            <EditIcon className="w-4 h-4 transition-colors group-hover:text-[#696969]" />
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
};
