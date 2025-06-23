import type { SVGProps } from 'react';
const UsersThree = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M18.5 11.25A5.62 5.62 0 0 1 23 13.5M2 13.5a5.62 5.62 0 0 1 4.5-2.25M12.5 17.25a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5" />
      <path d="M7.25 20.25a6.094 6.094 0 0 1 10.5 0M15.594 7.5a3 3 0 1 1 2.906 3.75M6.5 11.25A3 3 0 1 1 9.406 7.5" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M.5 0h24v24H.5z" />
      </clipPath>
    </defs>
  </svg>
);
export default UsersThree;
