import type { SVGProps } from 'react';
const Check3 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 23 23"
    {...props}
  >
    <g
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#prefix__a)"
    >
      <path d="M13 23v-6M1 4c3.183 0 6.235.913 8.485 2.538C11.735 8.164 13 10.368 13 12.667V17c-3.183 0-6.235-.913-8.485-2.538C2.265 12.836 1 10.632 1 8.333zM13 17v-4.333c0-2.299.948-4.503 2.636-6.129S19.613 4 22 4v4.333c0 2.299-.948 4.503-2.636 6.129S15.387 17 13 17M7 20l5 3 5-3M7 5c1.444-2.667 4.5-4 4.5-4s3.056 1.333 4.5 4" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M0 0h23v23H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default Check3;
