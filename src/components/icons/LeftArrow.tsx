import type { SVGProps } from 'react';
const LeftArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#2C8C8C"
      d="M18.75 7.876a1.125 1.125 0 0 1-1.124 1.125H3.845l4.83 4.83a1.127 1.127 0 1 1-1.594 1.593L.33 8.674a1.125 1.125 0 0 1 0-1.594L7.08.33a1.127 1.127 0 1 1 1.594 1.594L3.845 6.75h13.78a1.125 1.125 0 0 1 1.126 1.125"
    />
  </svg>
);
export default LeftArrow;
