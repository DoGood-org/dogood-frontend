import type { SVGProps } from 'react';
const Binoculars = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 49 48"
    {...props}
  >
    <g
      stroke="#F1F1F1"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      clipPath="url(#prefix__a)"
    >
      <path d="M20 16.5h9M43.548 28.935l-8.184-18.623a4.5 4.5 0 0 0-6.364 0V31.5M20 31.5V10.312a4.5 4.5 0 0 0-6.364 0L5.45 28.935" />
      <path d="M12.5 39a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15M36.5 39a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M.5 0h48v48H.5z" />
      </clipPath>
    </defs>
  </svg>
);
export default Binoculars;
