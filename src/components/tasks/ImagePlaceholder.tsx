import Image from 'next/image';

interface ImagePlaceholderProps {
  className?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  className,
}) => {
  return (
    <Image
      className={`rounded-lg ${className}`}
      src="/task/no-image.png"
      alt="No image"
      width={354}
      height={418}
      unoptimized
    />
  );
};
