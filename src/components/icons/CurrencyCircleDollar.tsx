import type { SVGProps } from 'react';
const CurrencyCircleDollar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 25 24"
    {...props}
  >
    <g
      stroke="#F1F1F1"
      strokeLinecap="round"
      strokeLinejoin="round"
      clipPath="url(#prefix__a)"
    >
      <path d="M12.5 6.75v1.5M12.5 15.75v1.5M12.5 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18" />
      <path d="M10.25 15.75h3.375a1.875 1.875 0 1 0 0-3.75h-2.25a1.875 1.875 0 1 1 0-3.75h3.375" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M.5 0h24v24H.5z" />
      </clipPath>
    </defs>
  </svg>
);
export default CurrencyCircleDollar;
