import type { SVGProps } from 'react';
const House = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 25 24"
    {...props}
  >
    <g clipPath="url(#prefix__a)">
      <path
        stroke="#F1F1F1"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.25 20.25v-6h4.5v6h6v-9a.75.75 0 0 0-.22-.53l-7.5-7.5a.75.75 0 0 0-1.06 0l-7.5 7.5a.75.75 0 0 0-.22.53v9z"
      />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M.5 0h24v24H.5z" />
      </clipPath>
    </defs>
  </svg>
);
export default House;
