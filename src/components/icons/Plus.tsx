import * as React from 'react';
import type { SVGProps } from 'react';
const SvgPlus = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#17814B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 1v22M1 12h22"
    />
  </svg>
);
export default SvgPlus;
