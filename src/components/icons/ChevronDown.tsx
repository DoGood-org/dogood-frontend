import * as React from 'react';
import type { SVGProps } from 'react';
const SvgChevronDown = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 14 8"
    {...props}
  >
    <path
      fill="#17814B"
      d="M12.712.395a.61.61 0 0 1 .88.847L7.721 7.346a1 1 0 0 1-1.442 0L.406 1.24a.61.61 0 0 1 .878-.845l4.995 5.188a1 1 0 0 0 1.441 0z"
    />
  </svg>
);
export default SvgChevronDown;
