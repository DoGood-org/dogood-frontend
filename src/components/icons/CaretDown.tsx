import type { SVGProps } from 'react';
const CaretDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 25 25"
    {...props}
  >
    <g clipPath="url(#prefix__a)">
      <path
        stroke="#F1F1F1"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m20.438 9.5-7.5 7.5-7.5-7.5"
      />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M.938.5h24v24h-24z" />
      </clipPath>
    </defs>
  </svg>
);
export default CaretDown;
