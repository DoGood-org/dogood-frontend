import type { SVGProps } from 'react';
const Connect = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M7.501 14.165H5.835a4.167 4.167 0 0 1 0-8.333H7.5M12.5 5.832h1.667a4.167 4.167 0 0 1 0 8.333H12.5M6.668 10h6.667"
    />
  </svg>
);
export default Connect;
