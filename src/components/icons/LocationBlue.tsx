import type { SVGProps } from 'react';
const LocationBlue = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <path
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.333}
      d="M33.333 16.665c0 8.322-9.232 16.989-12.332 19.665a1.67 1.67 0 0 1-2.003 0c-3.1-2.676-12.332-11.343-12.332-19.665a13.333 13.333 0 1 1 26.667 0"
    />
    <path
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.333}
      d="M20 21.668a5 5 0 1 0 0-10 5 5 0 0 0 0 10"
    />
  </svg>
);
export default LocationBlue;
