import type { SVGProps } from 'react';
const CubeTransparent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <g
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <path d="M27 12H12v15h15z" />
      <path d="M20 5H5v15h15zM20 5l7 7M5 5l7 7M5 20l7 7M20 20l7 7" />
    </g>
  </svg>
);
export default CubeTransparent;
