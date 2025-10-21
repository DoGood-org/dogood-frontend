import type { SVGProps } from 'react';

const EditIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_8270_56811)">
      <path
        d="M9.28344 20.8771H5.09375C4.89484 20.8771 4.70407 20.7981 4.56342 20.6574C4.42277 20.5168 4.34375 20.326 4.34375 20.1271V15.9374C4.34384 15.7387 4.42274 15.5482 4.56313 15.4077L16.1244 3.84645C16.265 3.7059 16.4557 3.62695 16.6545 3.62695C16.8534 3.62695 17.044 3.7059 17.1847 3.84645L21.3744 8.03332C21.5149 8.17396 21.5939 8.36465 21.5939 8.56348C21.5939 8.76231 21.5149 8.953 21.3744 9.09364L9.81312 20.6577C9.67258 20.7981 9.48209 20.877 9.28344 20.8771Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3438 6.62695L18.5938 11.877"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_8270_56811">
        <rect width="24" height="24" fill="white" transform="translate(0.59375 0.626953)" />
      </clipPath>
    </defs>
  </svg>
);

export default EditIcon;