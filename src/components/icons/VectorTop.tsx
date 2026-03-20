import type { SVGProps } from 'react';
const VectorTop = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 22 12"
    {...props}
  >
    <path
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m21 1-8.5 8.5-5-5L1 11"
    />
  </svg>
);
export default VectorTop;
