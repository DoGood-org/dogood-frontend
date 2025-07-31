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

    <div className="relative w-[160px] h-[185px] rounded-md overflow-hidden border border-card group">
      {image?.secure_url || defaultImage ? (
        <Image
          src={image?.secure_url || defaultImage || ''}
          alt="Upload preview"
          className="object-cover mx-auto"
          fill
          sizes="w-[160px] h-[185px]"
        />
      ) : (
        <div className="w-full h-full bg-card" />
      )}

      <CldUploadWidget
        uploadPreset="dogood"
        onSuccess={(result, { widget }) => {
          setImage(result.info);
          widget.close();
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
