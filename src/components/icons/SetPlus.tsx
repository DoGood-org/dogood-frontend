import type { SVGProps } from 'react';
const SetPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 12 12"
    {...props}
  >
    <path fill="#0D0D0D" d="M9.5 6.5h-3v3h-1v-3h-3v-1h3v-3h1v3h3z" />
  </svg>
);
export default SetPlus;
