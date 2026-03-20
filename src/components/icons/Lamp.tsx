import type { SVGProps } from 'react';
const Lamp = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12.5 11.668c.167-.833.583-1.417 1.25-2.083.833-.75 1.25-1.834 1.25-2.917a5 5 0 0 0-10 0c0 .833.167 1.833 1.25 2.917.583.583 1.083 1.25 1.25 2.083M7.5 15h5M8.332 18.332h3.333"
    />
  </svg>
);
export default Lamp;
