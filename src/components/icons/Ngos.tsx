import type { SVGProps } from 'react';
const Ngos = (props: SVGProps<SVGSVGElement>) => (
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
      d="M8 29.335v-24a2.667 2.667 0 0 1 2.667-2.667h10.666A2.667 2.667 0 0 1 24 5.335v24z"
    />
    <path
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      d="M8.001 16H5.335a2.667 2.667 0 0 0-2.667 2.667v8a2.667 2.667 0 0 0 2.667 2.666H8M24 12h2.667a2.667 2.667 0 0 1 2.666 2.667v12a2.667 2.667 0 0 1-2.666 2.666H24M13.332 8h5.333M13.332 13.332h5.333M13.332 18.668h5.333M13.332 24h5.333"
    />
  </svg>
);
export default Ngos;
