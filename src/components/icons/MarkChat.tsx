import type { SVGProps } from 'react';

const MarkChat = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0)">
      <path
        d="M20.25 10.5V5.25C20.25 5.05109 20.171 4.86032 20.0303 4.71967C19.8897 4.57902 19.6989 4.5 19.5 4.5H4.5C4.30109 4.5 4.11032 4.57902 3.96967 4.71967C3.82902 4.86032 3.75 5.05109 3.75 5.25V10.5C3.75 19.5 12 21.75 12 21.75C12 21.75 20.25 19.5 20.25 10.5Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 12.75L10.5 15L15.75 9.75"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width={24} height={24} />
      </clipPath>
    </defs>
  </svg>
);

export default MarkChat;