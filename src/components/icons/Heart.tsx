import type { SVGProps } from 'react';
const Heart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="stroke-black dark:stroke-white"
    viewBox="0 0 100 100"
    {...props}
  >
    <g strokeLinecap="round" strokeLinejoin="round" clipPath="url(#prefix__a)">
      <path
        strokeWidth={3}
        d="M50 87.5S9.375 65.625 9.375 39.844A21.094 21.094 0 0 1 30.469 18.75c8.824 0 16.383 4.809 19.531 12.5 3.148-7.691 10.707-12.5 19.531-12.5a21.094 21.094 0 0 1 21.094 21.094C90.625 65.625 50 87.5 50 87.5"
      />
      <path
        strokeWidth={2}
        d="M55.86 47.164a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M40.36 55.975s8.4-7.684 13.2-3.63c2.69 2.268 4.8 5.82 10.8 5.82M56.36 72.164v-8.433l-7-4.567M52.36 52.164l-9 20"
      />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M0 0h100v100H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default Heart;
