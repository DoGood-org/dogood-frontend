import { EditIcon } from '@/components/icons';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import { JSX } from 'react';

interface UploadResultInfo {
  secure_url?: string;
  public_id?: string;
}

interface ImageUploadProps {
  image?: UploadResultInfo | null;
  setImage?: React.Dispatch<React.SetStateAction<UploadResultInfo | null>>;
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
      <Image
        className="rounded-lg object-cover w-full h-full"
        src={image?.secure_url || defaultImage || '/task/no-image.png'}
        alt="Uploaded image"
        width={415}
        height={364}
        unoptimized
      />

      <CldUploadWidget
        uploadPreset="dogood"
        onSuccess={({ info }) =>
          info && typeof info !== 'string' && setImage?.(info)
        }
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
