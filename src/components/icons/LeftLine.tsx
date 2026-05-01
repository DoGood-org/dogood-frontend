import type { SVGProps } from 'react';
const LeftLine = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 109 77"
    {...props}
  >
    <path
      stroke="#00C1AC"
      strokeDasharray="4 8"
      d="M0 .5h84c13.255 0 24 10.745 24 24v52"
    />
  </svg>
);
export default LeftLine;
