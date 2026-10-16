import type { SVGProps } from 'react';
const UserReview = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M18 11.25a5.62 5.62 0 0 1 4.5 2.25M1.5 13.5A5.62 5.62 0 0 1 6 11.25M12 17.25a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5" />
      <path d="M6.75 20.25a6.094 6.094 0 0 1 10.5 0M15.094 7.5A3 3 0 1 1 18 11.25M6 11.25A3 3 0 1 1 8.907 7.5" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default UserReview;
