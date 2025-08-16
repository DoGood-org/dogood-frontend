import type { SVGProps } from 'react';
const CardGeneric = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 120 80"
    {...props}
  >
    <rect width={120} height={80} fill="url(#prefix__cardGeneric)" rx={4} />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={4}
      d="M97.026 65h-14M75.853 65h-14M54.68 65h-14M33.506 65h-14"
    />
    <path
      fill="#EDEDED"
      d="M32.173 23.987H18.84a5.333 5.333 0 0 0-5.334 5.333v9.333a5.333 5.333 0 0 0 5.334 5.334h13.333a5.333 5.333 0 0 0 5.333-5.334V29.32a5.333 5.333 0 0 0-5.333-5.333"
    />
    <path
      stroke="#000"
      strokeWidth={1.333}
      d="M22.52 25v18m0-6h-8m22 0h-8m-6-6h-8m21.973 0h-8.24v12.053m-9.413-18.4h13.333a4.667 4.667 0 0 1 4.667 4.667v9.333a4.667 4.667 0 0 1-4.667 4.667H18.84a4.667 4.667 0 0 1-4.667-4.667V29.32a4.667 4.667 0 0 1 4.667-4.667Z"
    />
    <path
      stroke="#EDEDED"
      strokeLinecap="round"
      strokeWidth={4}
      d="M106.493 15h-14"
    />
    <defs>
      <linearGradient
        id="prefix__cardGeneric"
        x1={34.933}
        x2={54.938}
        y1={15.467}
        y2={59.992}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C1C1C1" />
        <stop offset={1} stopColor="#9F9F9F" />
      </linearGradient>
    </defs>
  </svg>
);
export default CardGeneric;
