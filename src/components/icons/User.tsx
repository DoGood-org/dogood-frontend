import type { SVGProps } from 'react';
const User = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g
      stroke="#F1F1F1"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.125}
      clipPath="url(#prefix__a)"
    >
      <path d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12M3 20.25C4.816 17.112 8.114 15 12 15s7.184 2.112 9 5.25" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default User;
