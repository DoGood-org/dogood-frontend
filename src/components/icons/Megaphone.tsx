import type { SVGProps } from 'react';
const Megaphone = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M9.5 7.5v11.313a.75.75 0 0 1-.334.623l-1.031.687a.75.75 0 0 1-1.144-.442L5.75 15" />
      <path d="M20.75 18.749a.75.75 0 0 1-1.233.574C14.605 15.2 9.5 14.999 9.5 14.999H5.75a3.75 3.75 0 0 1 0-7.5H9.5s5.105-.203 10.017-4.323a.75.75 0 0 1 1.233.573z" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M24.5 0H.5v24h24z" />
      </clipPath>
    </defs>
  </svg>
);
export default Megaphone;
