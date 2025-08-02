import { JSX } from 'react';

export const Layers = ({
  className = 'w-6 h-6',
  fill = 'none',
  stroke = 'currentColor',
}: {
  className?: string;
  fill?: string;
  stroke?: string;
}): JSX.Element => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_9007_4591)">
        <path
          d="M3.98535 17.0469L12.9854 22.2969L21.9854 17.0469"
          stroke="#F1F1F1"
          strokeWidth="1.125"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.98535 12.5469L12.9854 17.7969L21.9854 12.5469"
          stroke="#F1F1F1"
          strokeWidth="1.125"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.98535 8.04688L12.9854 13.2969L21.9854 8.04688L12.9854 2.79688L3.98535 8.04688Z"
          stroke="#F1F1F1"
          strokeWidth="1.125"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_9007_4591">
          <rect
            width={24}
            height={24}
            transform="translate(0.985352 0.546875)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
