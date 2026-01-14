import Image from 'next/image';

interface ImagePlaceholderProps {
  className?: string;
  imageUrl?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  className = '',
  imageUrl,
}) => {
  const src = imageUrl || '/task/no-image.png';
  const altText = imageUrl ? 'Task image' : 'No image available';

  return (
    <Image
      className={`rounded-lg object-cover ${className}`}
      src={src}
      alt={altText}
      width={415}
      height={364}
      unoptimized
    />
  );
};
