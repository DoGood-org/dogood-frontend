import { Label } from '@/components';
import { Photo } from '@/components/icons';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { Dispatch, JSX, SetStateAction } from 'react';

interface ImageUploadWithPreviewProps {
  image: any;
  setImage: Dispatch<SetStateAction<any>>;
  defaultImage?: string | null;
  label?: string;
}

export const ImageUploadWithPreview = ({
  image,
  setImage,
  defaultImage,
  label = 'Profile Photo',
}: ImageUploadWithPreviewProps): JSX.Element => (
  <div className="space-y-2 text-center mx-auto md:ml-0">
    {label && <Label className="block text-base text-white">{label}</Label>}

    <div className="relative w-[225px] h-[225px] md:w-[250px] md:h-[250px] lg:w-[335px] lg:h-[335px] rounded-md overflow-hidden border border-card group">
      {image?.secure_url || defaultImage ? (
        <Image
          src={image?.secure_url || defaultImage || ''}
          alt="Upload preview"
          className="object-cover mx-auto w-[225px] h-[225px] md:w-[250px] md:h-[250px] lg:w-[335px] lg:h-[335px]"
          fill
        />
      ) : (
        <div className="w-full h-full bg-card" />
      )}

      <CldUploadWidget
        uploadPreset="dogood"
        onSuccess={(result) => {
          setImage(result.info);
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="absolute bottom-0 left-0 right-0 h-[30px] bg-[#D9D9D9]/60 flex items-center justify-center hover:bg-opacity-70 transition-opacity"
            aria-label="Upload image"
          >
            <div className="w-[20px] h-[20px] relative">
              <Photo className="w-[25px] h-[25px]" />
            </div>
          </button>
        )}
      </CldUploadWidget>
    </div>
  </div>
);
