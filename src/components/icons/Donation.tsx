import type { SVGProps } from 'react';
const Donation = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 12 12"
    {...props}
  >
    <path
      fill="#000"
      d="M11 6v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a.5.5 0 0 1-.5-.5V4a1 1 0 0 1 1-1h1.585a1.5 1.5 0 0 1 2.63-1.38v-.005L6 2l.285-.385v.005A1.5 1.5 0 0 1 8.915 3H10.5a1 1 0 0 1 1 1v1.5a.5.5 0 0 1-.5.5m-9 4h3.5V6H2zm8 0V6H6.5v4zM4.5 2a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1m3 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1m-6 2v1h4V4zm5 0v1h4V4z"
    />
  </svg>
);
export default Donation;
