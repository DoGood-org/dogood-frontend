import * as React from 'react';
import type { SVGProps } from 'react';
const SvgSun = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 14c2.485 0 4-1.515 4-4s-1.515-5-4-5-5 2.515-5 5 2.515 4 5 4M9 2V1M4 4 3 3M2 9H1M4 14l-1 1M9 16v1M14 14l1 1M16 9h1M14 4l1-1"
    />
  </svg>
);
export default SvgSun;
