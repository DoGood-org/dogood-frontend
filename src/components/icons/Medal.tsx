import type { SVGProps } from 'react';
const Medal = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      d="m20.636 17.188 2.02 11.368a.667.667 0 0 1-1.08.626L16.802 25.6a1.33 1.33 0 0 0-1.596 0l-4.781 3.58a.667.667 0 0 1-1.08-.625l2.019-11.367"
    />
    <path
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      d="M16 18.668a8 8 0 1 0 0-16 8 8 0 0 0 0 16"
    />
  </svg>
);
export default Medal;
