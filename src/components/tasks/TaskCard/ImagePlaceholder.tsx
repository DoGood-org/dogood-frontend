import Image from 'next/image';

export const ImagePlaceholder: React.FC = () => {
  return (
    <Image src="/task/no-image.png" alt="No image" width={353} height={418} />
  );
};
