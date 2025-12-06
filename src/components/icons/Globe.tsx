import type { SVGProps } from 'react';
const Globe = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <g
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <path d="M16 28c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12" />
      <path d="M21 16c0 8-5 12-5 12s-5-4-5-12 5-12 5-12 5 4 5 12M4.683 12h22.635M4.683 20h22.635" />
    </g>
  </svg>
);
export default Globe;
