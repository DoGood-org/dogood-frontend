import type { SVGProps } from 'react';
const Check1 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 23 23"
    {...props}
  >
    <path
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m9 11 2.77 3L21 4"
    />
    <path
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 11.5v6.611A1.89 1.89 0 0 1 18.111 20H4.89A1.89 1.89 0 0 1 3 18.111V4.89A1.89 1.89 0 0 1 4.889 3h10.389"
    />
  </svg>
);
export default Check1;
