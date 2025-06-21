import type { SVGProps } from 'react';
const Drop = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="stroke-black dark:stroke-white"
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    {...props}
  >
    <g strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}>
      <path d="M81.25 56.25c0-28.125-31.25-50-31.25-50s-31.25 21.875-31.25 50a31.25 31.25 0 0 0 62.5 0" />
      <path d="M53.125 75c7.813-1.316 14.3-7.812 15.625-15.625" />
    </g>
  </svg>
);
export default Drop;
