import type { SVGProps } from 'react';
const Report = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      clipPath="url(#prefix__a)"
    >
      <path d="M9 7.5v11.313a.75.75 0 0 1-.334.623l-1.031.687a.75.75 0 0 1-1.144-.442L5.25 15" />
      <path d="M20.25 18.749a.75.75 0 0 1-1.233.574C14.105 15.2 9 14.999 9 14.999H5.25a3.75 3.75 0 0 1 0-7.5H9s5.105-.203 10.017-4.323a.75.75 0 0 1 1.233.573z" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M24 0H0v24h24z" />
      </clipPath>
    </defs>
  </svg>
);
export default Report;
