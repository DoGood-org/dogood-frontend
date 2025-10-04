import type { SVGProps } from 'react';

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_8438_54376)">
      <path
        d="M19.4141 6.1377L5.91406 19.6377"
        stroke="currentColor" 
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.4141 19.6377L5.91406 6.1377"
        stroke="currentColor"  
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_8438_54376">
        <rect width="24" height="24" fill="white" transform="translate(0.664062 0.887695)"/>
      </clipPath>
    </defs>
  </svg>
);

export default CloseIcon;