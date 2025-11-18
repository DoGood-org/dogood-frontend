import type { SVGProps } from 'react';
const StarOrg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g clipPath="url(#prefix__a)">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m12 17.727 5.13 3.155a.787.787 0 0 0 1.173-.86l-1.395-5.886 4.565-3.938a.793.793 0 0 0-.449-1.385l-5.991-.488-2.308-5.587a.784.784 0 0 0-1.452 0L8.965 8.325l-5.991.488a.793.793 0 0 0-.45 1.39L7.09 14.14l-1.395 5.882a.788.788 0 0 0 1.174.86z"
      />
    </g>
  </svg>
);
export default StarOrg;
