import type { SVGProps } from 'react';
const Businesses = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      d="M21.335 26.668V5.335a2.667 2.667 0 0 0-2.667-2.667h-5.333a2.667 2.667 0 0 0-2.667 2.667v21.333"
    />
    <path
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      d="M26.668 8H5.335a2.667 2.667 0 0 0-2.667 2.667V24a2.667 2.667 0 0 0 2.667 2.667h21.333A2.667 2.667 0 0 0 29.335 24V10.667A2.667 2.667 0 0 0 26.668 8"
    />
  </svg>
);
export default Businesses;
