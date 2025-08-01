import type { SVGProps } from 'react';

const ChatSearch = (props: SVGProps<SVGSVGElement>) => (
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
        d="M10.6071 15.2143C13.5658 15.2143 15.9643 12.8158 15.9643 9.85714C15.9643 6.89847 13.5658 4.5 10.6071 4.5C7.64847 4.5 5.25 6.89847 5.25 9.85714C5.25 12.8158 7.64847 15.2143 10.6071 15.2143Z"
        stroke="currentColor"
        strokeWidth={1.42857}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.75 15.4277L19.4618 19.1396"
        stroke="currentColor"
        strokeWidth={1.42857}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width={24} height={24} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default ChatSearch;
