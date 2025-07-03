import type { SVGProps } from 'react';

const GPSicon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 25 25"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0)">
      <path
        d="M12.959 22.6953V19.6953"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.959 19.6953C17.1011 19.6953 20.459 16.3374 20.459 12.1953C20.459 8.05318 17.1011 4.69531 12.959 4.69531C8.81685 4.69531 5.45898 8.05318 5.45898 12.1953C5.45898 16.3374 8.81685 19.6953 12.959 19.6953Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.959 1.69531V4.69531"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.45898 12.1953H5.45898"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.459 12.1953H20.459"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.959 15.1953C14.6158 15.1953 15.959 13.8522 15.959 12.1953C15.959 10.5385 14.6158 9.19531 12.959 9.19531C11.3021 9.19531 9.95898 10.5385 9.95898 12.1953C9.95898 13.8522 11.3021 15.1953 12.959 15.1953Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect
          width={24}
          height={24}
          fill="white"
          transform="translate(0.958984 0.195312)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default GPSicon;
