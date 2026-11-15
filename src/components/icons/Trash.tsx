import type { SVGProps } from 'react';
const Trash = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 19 19"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2.375 4.75h14.25M15.042 4.75v11.083a1.583 1.583 0 0 1-1.584 1.584H5.542a1.583 1.583 0 0 1-1.584-1.584V4.75m2.375 0V3.167a1.583 1.583 0 0 1 1.584-1.584h3.166a1.583 1.583 0 0 1 1.584 1.584V4.75M7.917 8.708v4.75M11.083 8.708v4.75"
    />
  </svg>
);
export default Trash;
