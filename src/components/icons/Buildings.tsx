import type { SVGProps } from 'react';
const Buildings = (props: SVGProps<SVGSVGElement>) => (
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
      d="M22.5 19.687h-1.687V8.999A1.313 1.313 0 0 0 19.5 7.687h-6.187V2.999a1.313 1.313 0 0 0-2.041-1.09l-7.5 4.999A1.31 1.31 0 0 0 3.188 8v11.687H1.5a.563.563 0 0 0 0 1.125h21a.562.562 0 1 0 0-1.125m-3-10.875a.19.19 0 0 1 .188.187v10.688h-6.375V8.812zM4.313 8a.19.19 0 0 1 .083-.156l7.5-5a.187.187 0 0 1 .291.155v16.688H4.314zm6 2.5V12a.563.563 0 0 1-1.126 0v-1.5a.563.563 0 0 1 1.126 0m-3 0V12a.563.563 0 1 1-1.125 0v-1.5a.563.563 0 0 1 1.125 0m0 5.25v1.5a.563.563 0 1 1-1.125 0v-1.5a.563.563 0 0 1 1.125 0m3 0v1.5a.563.563 0 0 1-1.126 0v-1.5a.563.563 0 0 1 1.126 0"
    />
  </svg>
);
export default Buildings;
