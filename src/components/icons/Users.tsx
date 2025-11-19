import type { SVGProps } from 'react';
const Users = (props: SVGProps<SVGSVGElement>) => (
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
      strokeWidth={1.5}
      clipPath="url(#prefix__a)"
    >
      <path d="M7.875 15a4.875 4.875 0 1 0 0-9.75 4.875 4.875 0 0 0 0 9.75" />
      <path d="M.96 18.749a8.25 8.25 0 0 1 13.833 0M16.125 15a8.24 8.24 0 0 1 6.916 3.75" />
      <path d="M14.313 5.597A4.875 4.875 0 1 1 16.122 15" />
    </g>
  </svg>
);
export default Users;
