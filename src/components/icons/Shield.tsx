import type { SVGProps } from 'react';
const Shield = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 18 22"
    {...props}
  >
    <path
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 11.999c0 4.999-3.5 7.498-7.66 8.948a1 1 0 0 1-.67-.01C4.5 19.497 1 16.997 1 12v-7A1 1 0 0 1 2 4c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C11.51 2.81 14 4 16 4a1 1 0 0 1 1 1z"
    />
  </svg>
);
export default Shield;
