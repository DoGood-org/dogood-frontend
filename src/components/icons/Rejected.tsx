import type { SVGProps } from 'react';
const Rejected = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="#EE0606"
      d="M13.553 7.278 10.83 10l2.722 2.722a.587.587 0 1 1-.831.83L10 10.833l-2.722 2.72a.588.588 0 0 1-.83-.83L9.167 10l-2.72-2.722a.588.588 0 0 1 .83-.83L10 9.167l2.722-2.72a.588.588 0 0 1 .83.83M20 10A10 10 0 1 1 10 0a10.01 10.01 0 0 1 10 10m-1.177 0A8.824 8.824 0 1 0 10 18.824 8.833 8.833 0 0 0 18.824 10"
    />
  </svg>
);
export default Rejected;
