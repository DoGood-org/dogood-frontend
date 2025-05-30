import * as React from 'react';
import type { SVGProps } from 'react';
const SvgMoon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 11c-1.392.39-2.602.366-4 0s-2.979-.978-4-2C7.978 7.978 7.366 6.398 7 5s-.39-2.609 0-4c-1.372.382-3 .986-4 2S1.362 5.623 1 7s-.372 2.626 0 4 .993 2.993 2 4 2.625 1.628 4 2 2.623.362 4 0 2.986-1 4-2 1.618-2.628 2-4"
    />
  </svg>
);
export default SvgMoon;
