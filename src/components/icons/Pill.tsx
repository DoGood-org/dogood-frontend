import type { SVGProps } from 'react';
const Pill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="stroke-black dark:stroke-white"
    viewBox="0 0 100 100"
    {...props}
  >
    <g
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      clipPath="url(#prefix__a)"
    >
      <path d="M57.325 17.678 17.677 57.326c-6.902 6.902-6.902 18.094 0 24.997l.003.003c6.903 6.903 18.095 6.903 24.998 0l39.647-39.648c6.903-6.903 6.903-18.095 0-24.997l-.003-.003c-6.902-6.903-18.094-6.903-24.997 0M37.5 37.5l25 25M62.5 43.75l9.375-9.375" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M0 0h100v100H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default Pill;
