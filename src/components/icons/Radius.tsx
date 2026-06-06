import type { SVGProps } from 'react';
const Radius = (props: SVGProps<SVGSVGElement>) => (
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
      d="M20 36.665c9.205 0 16.667-7.462 16.667-16.666S29.205 3.332 20.001 3.332 3.334 10.794 3.334 19.999c0 9.204 7.462 16.666 16.667 16.666"
    />
    <path
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.333}
      d="M20 30c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10"
    />
    <path
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.333}
      d="M20 23.335a3.333 3.333 0 1 0 0-6.667 3.333 3.333 0 0 0 0 6.667"
    />
  </svg>
);
export default Radius;
