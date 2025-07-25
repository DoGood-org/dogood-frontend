import type { SVGProps } from 'react';
const ChevronRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="m8.594 7.41 4.58 4.59-4.58 4.59 1.41 1.41 6-6-6-6z"
    />
  </svg>
);
export default ChevronRight;
