import type { SVGProps } from 'react';
const AboutUs = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M12 2.25A9.75 9.75 0 1 0 21.75 12 9.76 9.76 0 0 0 12 2.25m0 18A8.25 8.25 0 1 1 20.25 12 8.26 8.26 0 0 1 12 20.25m1.5-3.75a.75.75 0 0 1-.75.75 1.5 1.5 0 0 1-1.5-1.5V12a.75.75 0 1 1 0-1.5 1.5 1.5 0 0 1 1.5 1.5v3.75a.75.75 0 0 1 .75.75m-3-8.625a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0"
    />
  </svg>
);
export default AboutUs;
