import type { SVGProps } from 'react';
const ListChecks = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#prefix__a)"
    >
      <path d="M12 12h8.25M12 6h8.25M12 18h8.25M3.75 6l1.5 1.5 3-3M3.75 12l1.5 1.5 3-3M3.75 18l1.5 1.5 3-3" />
    </g>
  </svg>
);
export default ListChecks;
