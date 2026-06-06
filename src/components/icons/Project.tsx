import type { SVGProps } from 'react';
const Project = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <g clipPath="url(#prefix__a)">
      <path
        fill="#00C1AC"
        d="M5.5 6.5A.5.5 0 0 1 6 6h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5M6 9h4a.5.5 0 0 0 0-1H6a.5.5 0 1 0 0 1m8 3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a1 1 0 0 0-2 0c0 .359.302.601.305.604a.5.5 0 0 1-.604.795C.628 5.346 0 4.851 0 4a2 2 0 0 1 2-2h8.5a2 2 0 0 1 2 2v6.5h.5a.5.5 0 0 1 .3.1c.075.054.7.55.7 1.4m-8.484-1.158A.5.5 0 0 1 6 10.5h5.5V4a1 1 0 0 0-1-1H3.73c.177.304.27.649.27 1v8a1 1 0 1 0 2 0c0-.359-.302-.601-.305-.604a.49.49 0 0 1-.179-.554M13 12a.8.8 0 0 0-.202-.5H6.923q.075.244.076.5c0 .351-.092.696-.268 1H12a1 1 0 0 0 1-1"
      />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default Project;
