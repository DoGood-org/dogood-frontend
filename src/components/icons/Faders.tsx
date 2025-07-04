import type { SVGProps } from 'react';

const Faders = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props} 
  >
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <path d="M12 11.25v9M12 3.75v4.5M18.75 18.75v1.5M18.75 3.75v12M21 15.75h-4.5M5.25 15.75v4.5M5.25 3.75v9M3 12.75h4.5M14.25 8.25h-4.5" />
    </g>
  </svg>
);

export default Faders;
