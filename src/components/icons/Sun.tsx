import type { SVGProps } from 'react';
const Sun = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <g
      stroke="#F1F1F1"
      strokeLinecap="round"
      strokeLinejoin="round"
      clipPath="url(#prefix__a)"
    >
      <path d="M8 2.5V1M8 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M4 4 3 3M4 12l-1 1M12 4l1-1M12 12l1 1M2.5 8H1M8 13.5V15M13.5 8H15" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default Sun;
