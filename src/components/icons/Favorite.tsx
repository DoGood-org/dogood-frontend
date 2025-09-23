import type { SVGProps } from 'react';

const Favorite = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_8270_56689)">
      <path
        d="M12.3438 21.627C12.3438 21.627 2.59375 16.377 2.59375 10.1895C2.59375 8.84679 3.12712 7.55913 4.07652 6.60973C5.02592 5.66032 6.31359 5.12695 7.65625 5.12695C9.77406 5.12695 11.5881 6.28102 12.3438 8.12695C13.0994 6.28102 14.9134 5.12695 17.0312 5.12695C18.3739 5.12695 19.6616 5.66032 20.611 6.60973C21.5604 7.55913 22.0937 8.84679 22.0938 10.1895C22.0938 16.377 12.3438 21.627 12.3438 21.627Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_8270_56689">
        <rect width="24" height="24" fill="white" transform="translate(0.34375 0.626953)" />
      </clipPath>
    </defs>
  </svg>
);

export default Favorite;
