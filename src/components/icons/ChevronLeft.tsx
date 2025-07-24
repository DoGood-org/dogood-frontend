import type { SVGProps } from 'react';
const ChevronLeft = (props: SVGProps<SVGSVGElement>) => (
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
      d="M15.406 16.59 10.826 12l4.58-4.59L13.996 6l-6 6 6 6z"
    />
  </svg>
);
export default ChevronLeft;
